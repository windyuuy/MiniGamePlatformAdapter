/// <reference path="./native/NativeAdvert.ts" />
/// <reference path="./native/NativePay.ts" />
/// <reference path="./native/NativeLocalPush.ts" />


namespace UnityAppGDK {
	/**
	 * 用户信息本地存储的key
	 */
	const USER_INFO_KEY = "$OFNIRESU$";
	const USER_INFO_XXTEA_KEY = "key$OFNIRESU$key";

	export type LoginType = "account" | "visitor" | "facebook" | "google" | "silent" | "gamecenter" | "wxapp" | "quick" | "huawei" | "vivoapp" | "OppoApp" | "baiduapp" | "aligame" | "yingyongbaoApp" | "meituApp" | "xiao7" | "chongchong" | "lufeifan" | "jingyou"


	/**
	 * 登陆的用户信息结构
	 */
	export type UserInfo = {
		/**
		 * 用户id
		 */
		userId: number | null,

		/**
		 * 登陆时的openId
		 */
		openId?: string,

		/**
		 * 记录上次的登陆类型
		 */
		loginType: LoginType,

		/**
		 * 玩家的昵称
		 */
		name: string,

		/**
		 * 创建的时间
		 */
		createTime: number,

		token: string | null,
	}

	export class SDKProxy {

		static support: {
			google: boolean,
			visitor: boolean,
			facebook: boolean,
			wechat: boolean,
			gamecenter: boolean,
		} = { google: true, visitor: true, facebook: true, wechat: true, gamecenter: true }

		static appInfo : any

		static getGdkjsb() : any {
			return window["gdkjsb"]
		}

		static getBridge() : any {
			let gdkjsb_obj = window["gdkjsb"];
			return gdkjsb_obj.bridge;
		}

		static gdkjsbExist() {
			return window["gdkjsb"] != null;
		}

		static country() {
			if (!this.gdkjsbExist()) return "CN";
			return this.getGdkjsb().country;
		}

		static deviceId() {
			if (!this.gdkjsbExist()) return "CESHI123456789";
			return this.getGdkjsb().deviceId;
		}


		static appShow(callback: (data: string) => void) {

			//侦听show hide
			if (this.gdkjsbExist()) {
				this.getBridge().on("app:show", (data: string) => {
					callback(data);
				})
			} else {
				// 网页监听var _this = this;
				if (document == null) {
					return;
				}
				var win = window, hiddenPropName;
				if (typeof document.hidden !== 'undefined') {
					hiddenPropName = 'hidden';
				} else if (typeof document['mozHidden'] !== 'undefined') {
					hiddenPropName = 'mozHidden';
				} else if (typeof document['msHidden'] !== 'undefined') {
					hiddenPropName = 'msHidden';
				} else if (typeof document['webkitHidden'] !== 'undefined') {
					hiddenPropName = 'webkitHidden';
				}
				var hidden = false;
				const onHidden = () => {
					if (!hidden) {
						hidden = true;
						
					}
				}
				const onShown = () => {
					if (hidden) {
						hidden = false;
						callback("{}");
					}
				}
				if (hiddenPropName) {
					var changeList = [
						'visibilitychange',
						'mozvisibilitychange',
						'msvisibilitychange',
						'webkitvisibilitychange',
						'qbrowserVisibilityChange'
					];
					for (var i = 0; i < changeList.length; i++) {
						document.addEventListener(changeList[i], function (event) {
							var visible = document[hiddenPropName];
							if (visible == undefined) {
								visible = event['hidden'];
							}
							if (visible)
								onHidden();
							else
								onShown();
						});
					}
				} else {
					win.addEventListener('blur', onHidden);
					win.addEventListener('focus', onShown);
				}
				if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
					win.onfocus = onShown;
				}
				if (null != window && window['onpageshow'] != null && window['onpagehide'] != null) {
					win.addEventListener('pagehide', onHidden);
					win.addEventListener('pageshow', onShown);
					document.addEventListener('pagehide', onHidden);
					document.addEventListener('pageshow', onShown);
				}
			}
			
		}

		static appHide(callback: (data: string) => void) {

			//侦听show hide
			if (this.gdkjsbExist()) {
				this.getBridge().on("app:hide", (data: string) => {
					callback(data);
				})
			} else {
				var _this = this;
				if (document == null) {
					return;
				}
				var win = window, hiddenPropName;
				if (typeof document.hidden !== 'undefined') {
					hiddenPropName = 'hidden';
				} else if (typeof document['mozHidden'] !== 'undefined') {
					hiddenPropName = 'mozHidden';
				} else if (typeof document['msHidden'] !== 'undefined') {
					hiddenPropName = 'msHidden';
				} else if (typeof document['webkitHidden'] !== 'undefined') {
					hiddenPropName = 'webkitHidden';
				}
				var hidden = false;
				const onHidden = () => {
					if (!hidden) {
						hidden = true;
						callback("{}");
					}
				}
				const onShown = () => {
					if (hidden) {
						hidden = false;
					}
				}
				if (hiddenPropName) {
					var changeList = [
						'visibilitychange',
						'mozvisibilitychange',
						'msvisibilitychange',
						'webkitvisibilitychange',
						'qbrowserVisibilityChange'
					];
					for (var i = 0; i < changeList.length; i++) {
						document.addEventListener(changeList[i], function (event) {
							var visible = document[hiddenPropName];
							if (visible == undefined) {
								visible = event['hidden'];
							}
							if (visible)
								onHidden();
							else
								onShown();
						});
					}
				} else {
					win.addEventListener('blur', onHidden);
					win.addEventListener('focus', onShown);
				}
				if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
					win.onfocus = onShown;
				}
				if (null != window && window['onpageshow'] != null && window['onpagehide'] != null) {
					win.addEventListener('pagehide', onHidden);
					win.addEventListener('pageshow', onShown);
					document.addEventListener('pagehide', onHidden);
					document.addEventListener('pageshow', onShown);
				}
			}
		}

		static nativeVersion() {
			if (!this.gdkjsbExist()) return 1;
			return this.getGdkjsb().nativeVersion || 1;
		}

		static openURL(url: string) {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().openURL(url);
			} else {
				// 网页打开
				open(url);
			}
		}

		static showHackWeb(url: string, duration: number) {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().showHackWeb(url, duration)
			} else {
				// 网页打开
				this.openURL(url);
				console.log("gdkjsb log : showHackWeb")
			}
		}
		static setSDKLanguage(lang: string) {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().setSDKLanguage(lang)
			} else {
				// 网页
				console.log("gdkjsb log : setSDKLanguage")
			}
		}

		static checkAppSystemPermissions(param: string, calback: (p: string) => void) {

			if (this.gdkjsbExist()) {
				this.getGdkjsb().checkAppSystemPermissions(JSON.stringify(param), (p) => {
					calback(p);
				})
			} else {
				// 网页
				calback("true");
			}
		}

		static gotoAppSystemSettings(param: string, calback: (p: string) => void) {

			if (this.gdkjsbExist()) {
				this.getGdkjsb().gotoAppSystemSettings(JSON.stringify(param), (p) => {
					calback(p);
				})
			} else {
				// 网页
				calback("true");
			}
		}
		
		static exitProgram(){
			if (this.gdkjsbExist()) {
				this.getGdkjsb().exitProgram()
			} else {
				// 网页
				close();
			}
		}

		static sdkFrameworkVersion () {
			if (this.gdkjsbExist()) {
				return this.getBridge().sdkFrameworkVersion() || "2.0";
			} else {
				// 网页
			}
			return "2.0"
		}

		static startYunkefu(accessId: string, name: string, id: string, customField: Object, native?: boolean) {

			if (this.gdkjsbExist()) {
				if (native) {
					this.getBridge().callAction("showsAssistantCenter", JSON.stringify({ name, id, customField }), (data, func) => { })
					return
				}
				let otherParams = {
					nickName: name
				}
				this.openURL(encodeURI(`https://ykf-webchat.7moor.com/wapchat.html?accessId=${accessId}&clientId=${id}&otherParams=${JSON.stringify(otherParams)}&fromUrl=${gdk.systemInfo.packageName}&urlTitle=${gdk.systemInfo.packageTag}&customField=${JSON.stringify(customField)}`))
			} else {
				// 网页
				let otherParams = {
					nickName: name
				}
				this.openURL(encodeURI(`https://ykf-webchat.7moor.com/wapchat.html?accessId=${accessId}&clientId=${id}&otherParams=${JSON.stringify(otherParams)}&fromUrl=${gdk.systemInfo.packageName}&urlTitle=${gdk.systemInfo.packageTag}&customField=${JSON.stringify(customField)}`))
			}
				
		}

		static hasNativeAssistantCenter() {

			if (this.gdkjsbExist()) {
				return this.getBridge().checkActionExist("showsAssistantCenter");
			} else {
				// 网页
			}
			return false;
		}

		static getSafeArea(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {

			if (this.gdkjsbExist()) {
				this.getBridge().callAction("DisplayCutout:getSafeArea", "{}", (data: string, func) => {
					callback(JSON.parse(data));
				})
			} else {
				// 网页
				callback({ left: 0, right: 0, top: 0, bottom: 0 });
			}
		}

		/**
		 * 加载用户登陆信息
		 */
		static loadUserRecord(removeNullUser: boolean = false): UserInfo[] {
			let ret: UserInfo[]
			try {
				let data = localStorage.getItem(USER_INFO_KEY);
				if (data && data != "") {
					console.log("loadUserRecord:", slib.xxtea.decryptFromBase64(data, USER_INFO_XXTEA_KEY))
					let d = JSON.parse(slib.xxtea.decryptFromBase64(data, USER_INFO_XXTEA_KEY))
					let list = d instanceof Array ? d : [d];
					if (list.length == 0 || list[0].loginType == null) {//简单验证一下
						return [];
					}

					//删除openId等于空的记录，一般由登陆失败产生
					if (removeNullUser) for (let i = list.length - 1; i >= 0; i--) {
						if (list[i].openId == null) {
							list.splice(i, 1);
						}
					}
					return list;
				} else {
					console.log("loadUserRecord: nil")
				}
				return [];
			} catch (e) {
				return [];
			}
		}

		static checkActionExist(key: string): boolean {

			if (this.gdkjsbExist()) {
				return this.getGdkjsb().checkActionExist(key)
			} else {
				// 网页
			}
			return false
		}

		static async callAction<T = void>(key: string, params: Object): Promise<T> {

			if (this.gdkjsbExist()) {
				return new Promise<T>((resolve, reject) => {
					this.getBridge().callAction(key, JSON.stringify(params), (data, func) => {
						resolve(JSON.parse(data || null))
					});
				})
			} else {
				// 网页
				return new Promise<T>((resolve, reject) => {
					resolve("{}" as any)
					// if (gdkjsb == undefined || gdkjsb.bridge == undefined || gdkjsb.bridge.callAction == undefined) {
					// 	console.log("不支持gdkjsb.bridge.callAction方法")
					// 	reject()
					// 	return
					// }
					// gdkjsb.bridge.callAction(key, JSON.stringify(params), (data, func) => {
					// 	resolve(JSON.parse(data || null))
					// });
				})
			}
		}

		static async onEvent<T>(key: string, callback: (data: T) => void) {

			if (this.gdkjsbExist()) {

				let id = this.getBridge().on(key, (data) => {
					console.log('ironsrc:onEvent:', key, data)
					callback(JSON.parse(data)["params"])
				});
			} else {
				console.log("gdkjsb log : onDoneEvent")
				callback("{}" as any);
			}
		}

		static async onDoneEvent(key: string, callback: Function) {
			if (this.gdkjsbExist()) {
				let id = this.getBridge().on(key, (data) => {
					console.log('ironsrc:onEvent:', key, data)
					callback()
				});
			} else {
				console.log("gdkjsb log : onDoneEvent")
				callback()
			}
			// if (gdkjsb == undefined || gdkjsb.bridge == undefined || gdkjsb.bridge.on == undefined) {
			// 	console.log("不支持gdkjsb.bridge.on方法")
			// 	return
			// }
		}

		static makeTestCertificate(qa : string) {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().makeTestCertificate && this.getGdkjsb().makeTestCertificate(qa);
			} else {
				console.log("gdkjsb log : 生成测试证书")
			}
		}

		static clearTestCerificate() {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().clearTestCerificate && this.getGdkjsb().clearTestCerificate();
			} else {
				console.log("gdkjsb log : 清除测试证书")
			}
		}


		/**
		 * 显示对话框
		 * @param content 
		 * @param title 
		 * @param okLabel 
		 * @param callback 
		 */
		static showAlert(object: GDK.ShowAlertOptions): Promise<GDK.ShowAlertResult> {
			if (this.gdkjsbExist()) {
				return new Promise<GDK.ShowAlertResult>((resolve, reject) => {
					this.getGdkjsb().showAlert(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), () => {
						let r = new GDK.ShowAlertResult()
						resolve(r);
					})
				})
			}
			// 兼容网页
			return new Promise<GDK.ShowAlertResult>((resolve, reject) => {
				alert(object.content);
				let r = new GDK.ShowAlertResult()
				resolve(r);
			})
		}

		/**
		 * 显示确认框
		 * @param content 
		 * @param title 
		 * @param okLabel 
		 * @param cancelLabel 
		 * @param callback 
		 */
		static showConfirm(object: GDK.ShowConfirmOptions): Promise<GDK.ShowConfirmResult> {
			if (this.gdkjsbExist()) {
				return new Promise<GDK.ShowConfirmResult>((resolve, reject) => {
					this.getGdkjsb().showConfirm(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), object.cancelLabel || slib.i18n.locSDKString("cancel"), isOk => {
						let r = new GDK.ShowConfirmResult()
						r.confirm = isOk == true
						r.cancel = isOk == false
						resolve(r);
					})
				})
			}
			// 兼容网页
			return new Promise<GDK.ShowConfirmResult>((resolve, reject) => {
				let isOk = confirm(object.content)
				let r = new GDK.ShowConfirmResult()
				r.confirm = isOk == true
				r.cancel = isOk == false
				resolve(r);
			})
		}

		/**
		 * 显示输入框
		 * @param content 
		 * @param title 
		 * @param okLabel 
		 * @param cancelLabel 
		 * @param callback 
		 * @param defaultValue
		 */
		static showPrompt(object: GDK.ShowPromptOptions): Promise<GDK.ShowPromptResult> {
			if (this.gdkjsbExist()) {
				return new Promise<GDK.ShowPromptResult>((resolve, reject) => {
					if (this.getGdkjsb().showPrompt == null) {
						let r = new GDK.ShowPromptResult()
						r.cancel = true;
						r.confirm = false;
						r.result = "{}";
						resolve(r);
						return;
					}
					this.getGdkjsb().showPrompt(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), object.cancelLabel || slib.i18n.locSDKString("cancel"), (isOk, result) => {
						let r = new GDK.ShowPromptResult()
						r.confirm = isOk == true
						r.cancel = isOk == false
						r.result = result
						resolve(r);
					}, object.defaultValue || "")
				})
			}
			// 兼容网页
			return new Promise<GDK.ShowPromptResult>((resolve, reject) => {
				let res = prompt(object.content, object.defaultValue);
				let r = new GDK.ShowPromptResult()
				r.confirm = res != null ? true : false
				r.cancel = res != null ? false : true
				r.result = res || ""
				resolve(r);
			})
		}

		static webAction(str : string, callback : (isOk : boolean)=>void) {
			console.error("webAction 模拟事件 : ", str);
			let isOk = confirm(str)
			callback && callback(isOk);
		}

		static logAction(str: string) {
			console.log("网页兼容 ===>>> " + str);
		}


		/**
		 * 游戏热更新功能
		 * @returns tid 供暂停、恢复、取消使用
		*/
		static hotupdateInGame(json : string, callback : (cur : number, total : number)=>void) : string {
			if (this.gdkjsbExist()) {
				return this.getGdkjsb().hotupdateInGame(json, callback);
			} else {
				this.logAction("hotupdateInGame");
				return "";
			}
		}
		// 暂停
		static hotupdatePause(tid : string) : void {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().hotupdatePause(tid);
			} else {
				this.logAction("hotupdatePause");
			}

		}
		// 恢复
		static hotupdateResume(tid : string) : void {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().hotupdateResume(tid);
			} else {
				this.logAction("hotupdateResume");
			}

		}
		// 取消
		static hotupdateCancel(tid : string) : void {
			if (this.gdkjsbExist()) {
				this.getGdkjsb().hotupdateCancel(tid);
			} else {
				this.logAction("hotupdateCancel");
			}

		}

		/**
		 * 生成Info文件
		 */
		static makeAppInfo() {
			if (this.appInfo) {
				// 只拿一次
				return
			}
			if (this.gdkjsbExist()) {
				this.appInfo = {} as any;
				let info : any = JSON.parse(this.getGdkjsb().makeAppInfo());
				for (let key of info.parameters) {
					this.appInfo[key] = info.parameters[key];
				}
			} else {
				this.appInfo = {};
			}
			return this.appInfo;
		}

		static getAppInfo(key : string) : (string | number | boolean| null) {
			if (!this.appInfo) {
				// 没有数据，先去拿一次
				this.makeAppInfo();
			}
			if (this.appInfo[key]) {
				return this.appInfo[key]
			}
			return null;
		}

		/**
		 * 获取热更新版本号
		*/
		static getResVersion():number {
			if (this.gdkjsbExist()) {
				return this.getGdkjsb().getResVersion();
			} else {
				return -1;
			}
		}

		// 设置appinfo的参数
		static setAppInfo(key : string, value : string | number | boolean) : void {
			if (!this.appInfo) {
				// 没有数据，先去拿一次
				this.makeAppInfo();
			}
			this.appInfo[key] = value;
			if (this.gdkjsbExist()) {
				this.getGdkjsb().setAppInfo(key, value);
			} else {
				this.logAction("setAppInfo => key : " + key + "    value : " + value);
			}
		}

		/**
		 * 获取systeminfo
		 */
		static getSystemInfo() {
			if (this.gdkjsbExist()) {
				return this.getGdkjsb().getSystemInfo();
			} else {
				return undefined;
			}
		}
		

		/**
		 * 隐藏启动屏
		 */
		static hideLaunchingView() {
			// console.log("hideLaunchingView已弃用. 在原生SDK内实现，不需要JS调用")
			return this.callAction("hideLaunchingView", "{}");
		}

		static nativeAdvert: UnityAppGDK.NativeAdvert = new UnityAppGDK.NativeAdvert()
		static nativePay: UnityAppGDK.NativePay = new UnityAppGDK.NativePay()
		static nativeLocalPush: UnityAppGDK.NativeLocalPush = new UnityAppGDK.NativeLocalPush()

	}
}
