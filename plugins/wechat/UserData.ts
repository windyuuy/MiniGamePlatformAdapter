
namespace WechatGDK {
	export class UserData implements GDK.IUserData {
		openId: string
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
		sex: number
	}
}
