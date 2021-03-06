namespace OPPOGDK {

	export type UserLoginData = {
		succeed: boolean,
		code: 0 | number,
		message: "success" | string,
		data: {
			userId: number,
			openId?: string,
			serviceTimestamp: number
			dataTimestamp: number//上次存档的时间戳
			nickname: string,
			profileImg: string,
			backupTime: number//上传存档时间 秒
			userNew: false,//是否为新用户
			service24Timestamp: number,//下一天0点的时间戳
			shareSwitch: {

			},
			followGzh: 0 | 1,//0 未关注,1 已关注
			gameCurrency: {
				gold: string,
				diamond: string,
				seed: string
			},
			createTime: string,//创建时间
			channelId: number,//渠道id

			encryptKey: string,//存档加密key
			token: string,//登陆token
			heart: number,//心数量
			gametoken: string,

			tableConf: {
				tableSign: string,
			},

		}
	}

	export class MServer extends GDK.APIServer {
		static readonly inst: MServer = new MServer()

		get gameClient() {
			return GDK.CommonServer.httpClient
		}

		userLogin(
			data: {
				openId: string,
				userName: string,
				avatar: string,
				token: string,
				extraData?: any;
				clientSystemInfo: any;
			},
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: {
					userId: number,
					openId?: string,
					serviceTimestamp: number
					dataTimestamp: number//上次存档的时间戳
					nickname: string,
					profileImg: string,
					backupTime: number//上传存档时间 秒
					userNew: false,//是否为新用户
					service24Timestamp: number,//下一天0点的时间戳
					shareSwitch: {

					},
					followGzh: 0 | 1,//0 未关注,1 已关注
					gameCurrency: {
						gold: string,
						diamond: string,
						seed: string
					},
					createTime: number,//创建时间
					channelId: number,//渠道id

					encryptKey: string,//存档加密key
					token: string,//登陆token
					heart: number,//心数量
					gametoken: string,

					tableConf: {
						tableSign: string,
					},
				}
			}) => void,
			errorCallback: (error: any, retry: () => void) => void = null) {
			console.warn(`this.gameClient.request("user/loginOPPOK"`, JSON.stringify(data))
			this.gameClient.request("user/loginOPPOK", data, (data) => {
				console.warn(`login back user/loginOPPOK"`, data)
				callback(data);
			}, { errorCallback: errorCallback })
		}

		loginTest(
			data: {
				loginCode: number
			},
			callback: (data: any) => void, errorCallback: (error: any, retry: () => void) => void = null) {
			this.gameClient.request("user/loginTest", data, (data) => {
				callback(data);
			}, { modal: false, errorCallback: errorCallback })
		}
	}

}
