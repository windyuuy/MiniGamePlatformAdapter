
namespace AppGDK {
	export class UserData implements GDK.IUserData {
		get openId(): string {
			return '0999999'
		}
		get gameId(): number {
			return -1
		}
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
