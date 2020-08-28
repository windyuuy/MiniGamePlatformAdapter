
namespace BytedanceGDK {
	export class UserData extends GDK.UserDataBase {
		openId: string
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
		sex: number
	}
}
