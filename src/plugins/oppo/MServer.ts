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
		}
	}

	export class MServer extends GDK.APIServer {
		static readonly inst: MServer = new MServer()

		get gameClient() {
			return Common.httpClient
		}

		userLogin(
			data: {
				openId: string,
				userName: string,
				avatar: string,
				extraData?: any;
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
					createTime: string,//创建时间
					channelId: number,//渠道id

					encryptKey: string,//存档加密key
					token: string,//登陆token
					heart: number,//心数量
					gametoken: string,
				}
			}) => void,
			errorCallback: (error: any, retry: () => void) => void = null) {
			Common.httpClient.request("user/loginOpenId", data, (data) => {
				callback(data);
			}, { errorCallback: errorCallback })
		}

	}

}
