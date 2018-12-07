namespace GDK {
	/** 登录请求结果 */
	export class UserDataUpdateResult {
		extra?: any
	}

	//https://developers.weixin.qq.com/minigame/dev/document/open-api/data/KVData.html
	export class KVData {
		key: string
		value: string
	}

	//https://developers.weixin.qq.com/minigame/dev/document/open-api/data/UserGameData.html
	export class UserGameData {
		//用户的微信头像 url
		avatarUrl: string

		//用户的微信昵称
		nickname: string

		//用户的 openid
		openid: string

		//用户的托管 KV 数据列表
		KVDataList: KVData[]
	}

	export interface IUserData extends IModule {
		openId: string
		openKey: string
		/** 密码 */
		password?: string
		/** 昵称 */
		nickName: string
		/** 用户ID */
		userId: number
		/** 是否新用户 */
		isNewUser: boolean
		/** 用户头像 */
		avatarUrl: string
		/** 上传存档时间(秒) */
		backupTime: number
		/** 是否已关注公众号
		 * - 0 未关注
		 * - 1 已关注
		 **/
		followGzh: number
		/** 渠道id */
		channelId: number
		/** 创建时间 */
		createTime: string
		/**
		 * 性别
		 * - 0 未知
		 * - 1 男
		 * - 2 女
		 **/
		sex: number

		/**
		 * 是否为该游戏管理账号用户
		 * - 1 是
		 * - 0 否
		 **/
		isWhiteUser?: number
		/**
		 * 是否房主，1房主，0参加者
		 **/
		isMaster?: number
		/**
		 * 房间号
		 **/
		roomId?: number
	}
}
