namespace GDK {
	export interface IUserData {
		openId: string
		openKey: string
		password?: string
		nickName: string
		userId: number
		/** 是否新用户 */
		isNewUser: boolean
		avatarUrl: string
		/** 上传存档时间(秒) */
		backupTime: number
		/** 0 未关注,1 已关注 */
		followGzh: number
		token: string
		gameToken: string
		/** 渠道id */
		channelId: number
		/** 创建时间 */
		createTime: string
	}
}
