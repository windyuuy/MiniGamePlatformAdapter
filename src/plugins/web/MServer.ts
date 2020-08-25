namespace WebGDK {

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

		get gameClient() {
			return Common.httpClient
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
				code: string,
				system: number,//系统类型  0:android  1:ios
				launchOptionsQuery?: any,//启动参数query 
				launchOptionsPath?: any, //启动参数path
				channelId?: number;//渠道id
				clientSystemInfo: any;//系统信息
				extraData?: any;
			},
			callback: (data: LoginCallbackData) => void,
			errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/login", data, (data) => {
				callback(data);
			}, { errorCallback: errorCallback })
		}
	}
}
