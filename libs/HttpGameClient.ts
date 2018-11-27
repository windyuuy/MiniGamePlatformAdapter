/// <reference path="Log.ts" />
namespace GDKLIB {
    type ResponseData = { succeed: boolean, code: 0 | number, message: "success" | string, data: any }
    type RequestData = { appId: any, role: any, index: number, retry: number, data: any }

    let log: Log = new Log({ tags: ["HttpClient"] })
    export class HttpGameClient {

        protected _protocol: string = "https"//协议
        protected _host: string = "localhost"//主机名
        protected _port: number = 443//端口号

        protected _errorCallback: (error: any, retry: () => void) => void;//错误信息回调
        protected _sslHandShakeErrorCallback: (index: number, url: string) => void = null;  //客户端时间不对导致握手错误

        protected _showLoadingModalCallback: (index: number, url: string) => void = null;//显示模态化遮挡层
        protected _closeLoadingModalCallback: (index: number, url: string) => void = null;//隐藏模态遮挡层


        protected _client: HttpClient = new HttpClient()
        protected _requestIndex = 0;
        protected _retryCount: number = 3;

        public searchExt: () => string;

        constructor() {
        }

        /**
         * 获取token对外接口
         */
        public getToken: () => string = null;

        /**
         * 获取账号服返回的gametoken
         */
        public getGameToken: () => string = null;

        /**
         * 获取openId
         */
        public getOpenId: () => string = null;

        /**
         * 获取roleId对外接口
         */
        public getRoleId: () => string = null;

        /**
         * 获取appid
         */
        public getAppId: () => string = () => {
            throw new Error("未设置APPID")
        };

        protected _loadingIndex: number = 0
        /**
         * 获取loading索引
         */
        public getLoadingIndex: () => number = () => {
            return this._loadingIndex++;
        };

        /**
         * 发起服务器请求
         * @param action 请求的相对url
         * @param data 请求的数据
         * @param callback 请求的回调
         * ### 扩展数据
         * * modal 是否模态窗口
         * * downloadProgress 下载进度
         * * uploadProgress 上传进度
         * * errorCallback 错误回调 这里可以拿到retry函数
         */
        request(action, data, callback: (data: ResponseData) => void,
            { modal, downloadProgress, uploadProgress, errorCallback }: {
                modal?: boolean,
                downloadProgress?: (loaded: number, total: number) => void,
                uploadProgress?: (loaded: number, total: number) => void,
                errorCallback?: (error: any, retry: () => void) => void
            } = {}
        ) {
            this._requestIndex++;//每次请求拥有新的id
            var requestData = {
                appId: this.getAppId(),
                role: this.getRoleId(),//请求用户
                // token:this._token,//token
                index: this._requestIndex,//请求索引
                retry: 0,//是否重试
                data: data
            }

            this.requestFromData(action, requestData, callback, { modal, downloadProgress, uploadProgress, errorCallback });
        }

        protected requestFromData(action, requestData: RequestData, callback: (data: ResponseData) => void,
            { modal, downloadProgress, uploadProgress, errorCallback }: { modal?: boolean, downloadProgress?: (loaded: number, total: number) => void, uploadProgress?: (loaded: number, total: number) => void, errorCallback?: (error: any, retry: () => void) => void } = {},
            isRetry = false, modalIndex = -1
        ) {

            let data = JSON.stringify(requestData)
            log.warn("request", action, data);

            let search = this.searchExt ? this.searchExt() : "";

            let url: string
            if (this._protocol == "https" && this._port == 443) {
                url = `${this._protocol}://${this._host}/${action}${search}`
            } else if (this._protocol == "http" && this._port == 80) {
                url = `${this._protocol}://${this._host}/${action}${search}`
            } else {
                url = `${this._protocol}://${this._host}:${this._port}/${action}${search}`
            }

            let index = modalIndex == -1 ? this.getLoadingIndex() : modalIndex
            //重试不重复打开模态
            if (!isRetry && modal && this._showLoadingModalCallback) {
                this._showLoadingModalCallback(index, action);
            }

            let token = this.getToken()

            let headMap: any = {}
            headMap["Content-Type"] = "application/json;charset=utf-8"
            if (token) {
                headMap["token"] = token
            }
            if (this.getRoleId && this.getRoleId()) {
                headMap["role"] = this.getRoleId()
            }
            if (this.getOpenId && this.getOpenId()) {
                headMap["openId"] = this.getOpenId()
            }
            if (this.getAppId && this.getAppId()) {
                headMap["appId"] = this.getAppId()
            }

            if (this.getGameToken && this.getGameToken()) {
                headMap["Authorization"] = "Bearer " + this.getGameToken();

                //进行数据签名
                let sign = data
                if (token != null) {
                    sign = token.substr(token.length / 2) + data
                }
                sign = tlib.MD5.hex(sign);
                headMap["sign"] = sign;
                console.log("sign", sign)

            }

            this._client.request({
                method: "POST",
                url: url,
                data: data,
                headMap: headMap,
                onDone: (data) => {
                    //进行回调
                    if (typeof (data) == 'string' && data.length > 4000) {
                        log.warn("response", action, data.substr(0, 4000))
                    } else {
                        log.warn("response", action, data);
                    }

                    let newData = JSON.parse(data);
                    if (newData.ok != undefined) {
                        callback({ succeed: newData.ok, code: newData.c, message: newData.m, data: newData.r });
                    } else {
                        callback(newData);
                    }

                    if (modal && this._closeLoadingModalCallback) {
                        this._closeLoadingModalCallback(index, action);
                    }
                },
                onError: (error) => {

                    let retry = () => {
                        //重试函数
                        if (modal) {
                            this._showLoadingModalCallback(index, action);
                        }
                        requestData.retry++
                        this.requestFromData(action, requestData, callback, { modal: modal, downloadProgress: downloadProgress, uploadProgress: uploadProgress }, true, index);
                    }

                    if (requestData.retry > this._retryCount) {
                        //多次请求无果

                        if (errorCallback) {
                            errorCallback(error, retry);//当请求捕获错误时，则不进行全局错误回调
                        } else if (this._errorCallback) {
                            this._errorCallback(error, retry)
                        }
                        if (modal && this._closeLoadingModalCallback) {
                            this._closeLoadingModalCallback(index, action);
                        }
                        log.error("多次请求无果");
                    } else {
                        requestData.retry++
                        this.requestFromData(action, requestData, callback, { modal: modal, downloadProgress: downloadProgress, uploadProgress: uploadProgress }, true, index);
                    }
                    log.error(error);
                    if (requestData.retry > this._retryCount && ((error as string).indexOf('ssl hand shake error') != -1 || (error as string).indexOf('证书无效') != -1)) {
                        if (this._sslHandShakeErrorCallback) {
                            this._sslHandShakeErrorCallback(index, action)
                        }
                    }
                },
                onTimeout: () => {
                    //超时进行重试

                    let retry = () => {
                        //重试函数
                        if (modal) {
                            this._showLoadingModalCallback(index, action);
                        }
                        requestData.retry++
                        this.requestFromData(action, requestData, callback, { modal: modal, downloadProgress: downloadProgress, uploadProgress: uploadProgress }, true, index);
                    }

                    if (requestData.retry > this._retryCount) {
                        //多次请求无果
                        if (errorCallback) {
                            errorCallback("timeout", retry);//当请求捕获错误时，则不进行全局错误回调
                        } else if (this._errorCallback) {
                            this._errorCallback("timeout", retry)
                        }
                        if (modal && this._closeLoadingModalCallback) {
                            this._closeLoadingModalCallback(index, action);
                        }
                        log.error("多次请求无果");
                    } else {
                        requestData.retry++
                        this.requestFromData(action, requestData, callback, { modal: modal, downloadProgress: downloadProgress, uploadProgress: uploadProgress }, true, index);
                    }
                },
                onProgress: (loaded: number, total: number) => {
                    if (downloadProgress) {
                        downloadProgress(loaded, total)
                    }
                },
                onUploadProgress: (loaded: number, total: number) => {
                    if (uploadProgress) {
                        uploadProgress(loaded, total)
                    }
                }
            })
        }

        get retryCount() {
            return this._retryCount
        }
        set retryCount(value) {
            this._retryCount = value
        }

        get client() {
            return this._client;
        }

        /**
         * 当发生错误时的统一回调
         */
        setErrorCallback(callback: (error: any, retry: () => void) => void) {
            this._errorCallback = callback;
        }

        /**
         * 当发生SSL握手错误时候的回调
         */
        public setSSLHandShakeErrorCallback(callback: (index: number, url: string) => void) {
            this._sslHandShakeErrorCallback = callback;
        }

        get host() {
            return this._host
        }

        set host(value) {
            this._host = value
        }

        get port() {
            return this._port
        }

        set port(value) {
            this._port = value
        }

        get protocol() {
            return this._protocol
        }

        set protocol(value) {
            this._protocol = value
        }

        set url(value: string) {
            let sp = value.split(/:\/\/|:/g)
            this._protocol = sp[0]
            this._host = sp[1]
            this._port = parseInt(sp[2])
            if (this._port == null || isNaN(this._port)) {
                if (this._protocol == "http") {
                    this._port = 80
                } else if (this._protocol == "https") {
                    this._port = 443
                } else if (this._protocol == "ws") {
                    this._port = 80
                } else if (this._protocol == "wss") {
                    this._port = 443
                }
            }
        }

        get url(): string {
            return `${this._protocol}://${this._host}:${this._port}`
        }

        public set showModalCallback(callback: (index: number, url: string) => void) {
            this._showLoadingModalCallback = callback;
        }

        public set closeModalCallback(callback: (index: number, url: string) => void) {
            this._closeLoadingModalCallback = callback;
        }

        public get showModalCallback() {
            return this._showLoadingModalCallback;
        }

        public get closeModalCallback() {
            return this._closeLoadingModalCallback;
        }

    }
}