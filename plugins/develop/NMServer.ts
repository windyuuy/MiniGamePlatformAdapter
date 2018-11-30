namespace DevelopGDK {
	export class NMServer extends GDK.APIServer {
		static get inst(): NMServer { return null }
		/**
			 * 用户登录接口(用户首次进入游戏调用)
			 */
		loginTest(
			data: {
				userId: number
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
					noticeSign: string//公告
					gametoken: string,
				}
			}) => void, errorCallback: (error: any, retry: () => void) => void = null) {
			this['gameClient'].request("user/loginTest", data, (data) => {
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
			this['gameClient'].request("user/login", data, (data) => {
				callback(data);
			}, { errorCallback: errorCallback })
		}
	}
}
