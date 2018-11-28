
namespace QQPlay {

	export class UserData implements GDK.IUserData {
		api?: GDK.UserAPI
		server: QQServer

		get openId() { return GameStatusInfo.openId }
		openKey: string
		password?: string
		nickName: string
		userId: number
		isNewUser: boolean
		avatarUrl: string
		backupTime: number
		followGzh: number
		token: string
		gameToken: string
		channelId: number
		createTime: string
		get sex(): number { return GameStatusInfo.sex }

	}
}
