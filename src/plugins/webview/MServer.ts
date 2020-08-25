namespace WebViewGDK {

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

			/**
			 * app端的测试证书
			 */
			qa?: string

			/**
			 * 服务器附加的日志信息，需要所有日志都附带上ad
			 */
			ad?: any

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


        /**
         * 游客登陆
         * * openId 传入空则产生新的账号
         * * 传入历史openId则表示游客再次登陆
         */
		loginOpenId(
			data: {
				openId: string,
				uuId?: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginOpenId", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * FB登陆
         * * userId 
         * * token
         */
		loginFB(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,

			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginFB", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * quick登陆
         * * userId 
         * * token
		 * * channleId
         */
		loginQuick(
			data: {
				openId: string,
				token: string,
				channelId: number,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginQuick", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * huawei登陆
         * * userId 
         * * token
		 * * channleId
         */
		loginHuawei(
			data: {
				ts: string,
				playerId: string,
				playerLevel: string,
				playerSSign: string
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginHwApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * 虫虫登陆
         */
		loginChongchong(
			data: {
				openId: String,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginCcApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * 路非凡登陆
         */
		loginLufeifan(
			data: {
				openId: String,
				token: string,
				timestamp: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginLffApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * 京游登陆
         */
		loginJingyou(
			data: {
				openId: String,
				token: string,
				timestamp: string,
				type: string
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginJinYouApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * xiao7登陆
         * * token
         */
		loginXiao7(
			data: {
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginX7App", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * WX app登陆
         * * userId 
         * * token
         */
		loginAppWX(
			data: {
				openId: string,
				code: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginAppWx", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * WX app android 登陆
         * * userId 
         * * token
         */
		loginAppWXAndroid(
			data: {
				openId: string,
				code: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginAppWxAndroid", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * WX app android 登陆
         * * userId 
         * * token
         */
		loginVivo(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginVivoApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * WX app android 登陆
         * * userId 
         * * token
         */
		loginOppoApp(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginOppoApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * WX app android 登陆
         * * userId 
         * * token
         */
		loginYYBApp(
			data: {
				openId: string,
				token: string,
				type: number,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginYybApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		loginMeituApp(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginMtApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
		 * WX app android 登陆
		 * * userId 
		 * * token
		 */
		loginBaidu(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginOpenId", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
		 * 阿里九游 登陆
		 * * userId 
		 * * token
		 */
		loginAligame(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginJyApp", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
         * FB登陆
         * * userId 
         * * token
         */
		loginGC(
			data: {
				openId: string,
				token: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginGC", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}
		/**
         * FB登陆
         * * userId 
         * * token
         */
		loginGoogle(
			data: {
				openId: string,
				token: string,
				userName: string,
				avatar: string,
				email: string,
				clientSystemInfo: any,
				node?: string,
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginGoogle", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		loginAccount(
			data: {
				account: string,
				password: string,
				type: 1 | 2//1登陆 2注册
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginAccount", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		bindingAccount(
			data: {
				/**
				 * 游客openId
				 */
				visitorOpenId: string,
				/**
				 * 第三方openId
				 */
				openId: string,
				/**
				 * 第三方token
				 */
				token: string,

				/**
				 * 第三方账号类别（1:facebook 2:google）
				 */
				type: number,

				clientSystemInfo: any
			},
			callback: (data: LoginCallbackData) => void,
			modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/bindingAccount", data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}


	}
}
