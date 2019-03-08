
namespace QQPlayGDK {

	export class UserData implements GDK.IUserData {
		get openId() { return GameStatusInfo.openId }
		openKey: string
		password?: string
		nickName: string
		userId: number
		isNewUser: boolean
		avatarUrl: string
		backupTime: number
		followGzh: 0 | 1
		token: string
		gameToken: string
		channelId: number
		createTime: number
		get sex(): number { return GameStatusInfo.sex }

		get isWhiteUser(): number { return BK.getSystemInfoSync().isWhiteUser }
		get isMaster(): number { return BK.getSystemInfoSync().isWhiteUser }
		get roomId(): number { return BK.getSystemInfoSync().roomId }
	}
}
