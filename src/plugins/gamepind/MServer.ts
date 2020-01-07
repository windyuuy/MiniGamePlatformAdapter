declare function GamepindReLoginAndRedirect(url: string): void;

namespace GamepindGDK {

	export type LoginCallbackData = {
		succeed: boolean,
		code: 0 | number,
		message: "success" | string,
		data: {
			userId: number,
			openId?: string,
			serviceTimestamp: number
			service24Timestamp: number
			/**
			 * 上次存档的时间戳
			 */
			dataTimestamp: number
			nickname: string,
			profileImg: string,
			/**
			 * 上传存档时间 秒
			 */
			backupTime: number,
			/**
			 * 是否为新用户
			 */
			userNew: false,
			shareSwitch: {

			},
			gameCurrency: {
				gold: string,
				diamond: string,
				seed: string
			},
			/**
			 * 创建时间 毫秒
			 */
			createTime: number,
			/**
			 * 渠道id
			 */
			channelId: number

			/**
			 * 存档加密key
			 */
			encryptKey: string,
			/**
			 * 登陆token
			 */
			token: string,

			gametoken: string,

			noticeSign: string,

			heart: number,

			custom: string,

			/**
			 * 性别
			 */
			gender: number

			/** 是否已关注公众号
			 * - 0 未关注
			 * - 1 已关注
			 **/
			followGzh: 0 | 1

			tableConf: {
				tableSign: string,
			},

		}
	}

	export class MServer extends GDK.APIServer {
		static readonly inst: MServer = new MServer()

		private _gamepindAuthClient: slib.HttpClient = null;

		get gameClient() {
			return Common.httpClient
		}

		get gamepindAuthClient() {
			if (!this._gamepindAuthClient) {
				this._gamepindAuthClient = new slib.HttpClient();
			}
			return this._gamepindAuthClient;
		}

		/**
			 * 用户登录接口(用户首次进入游戏调用)
			 */
		loginTest(
			data: {
				loginCode: number
			},
			callback: (data: LoginCallbackData) => void, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginTest", data, (data) => {
				callback(data);
			}, { modal: false, errorCallback: errorCallback })
		}

		userLogin(
			data: {
				token: string,
				launchOptionsQuery?: any,//启动参数query 
				launchOptionsPath?: any, //启动参数path
				channelId?: number;//渠道id
				clientSystemInfo?: any;//系统信息
				extraData?: any;
			},
			callback: (data: LoginCallbackData) => void,
			errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginGamePind", data, (data) => {
				callback(data);
			}, { errorCallback: errorCallback })
		}

		gamepindAuth(auth: {
			redirect_uri: string,
			device_id: string,
			source: string,
			property: string,
		}, domain: string, mapperid: string, callback?: (data) => void, failcall?: (error) => void) {
			// https://securebox.gamepind.com/cas
			// https://secure.gamepind.com/cas

			let suffix: string = "";
			Object.keys(auth).forEach((v, i, arr) => {
				suffix += v + "=" + auth[v] + "&";
			})
			suffix = suffix.substr(0, suffix.length - 1)

			let url: string = `${domain}/v1/open-id/oauth/${mapperid}?${suffix}`;
			GamepindReLoginAndRedirect(url);
			/*
			let data;
			let headMap: any = {}
			headMap["Content-Type"] = "application/json;charset=utf-8"
			Common.devlog.warn("req url:", url);
			this.gamepindAuthClient.request({
				method: "GET",
				url: url,
				data: data,
				headMap: headMap,
				onDone: (data) => {
					//进行回调
					if (typeof (data) == 'string' && data.length > 4000) {
						//log.warn("response", url, action, data.substr(0, 4000))
					} else {
						//log.warn("response", url, action, data);
					}
					Common.devlog.warn("req url onError:", JSON.stringify(data));
					callback(data)
					//let newData = JSON.parse(data);
				},
				onError: (error) => {

					let retry = () => {
						//重试函数
					}
					Common.devlog.warn("req url onError:", JSON.stringify(error));
				},
				onTimeout: () => {
					//超时进行重试
					let retry = () => {
						//重试函数
					}
					Common.devlog.warn("req url onTimeout:");
				},
				onProgress: (loaded: number, total: number) => {

				},
				onUploadProgress: (loaded: number, total: number) => {

				}
			})
			*/
		}
	}
}
