namespace GDK {
	export interface IUserData {
		openId: string
		openKey: string
		password?: string
		nickName: string
		userId: number
		isNewUser: boolean
		avatarUrl: string
	}
}