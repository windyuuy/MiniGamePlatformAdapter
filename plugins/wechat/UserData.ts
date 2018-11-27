
namespace WechatGDK {
	export class UserData implements GDK.IUserData {
		server: WXServer

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

		update(): Promise<{}> {
			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()
			wx.getUserInfo({
				success: (params) => {
					const { userInfo, rawData, signature, encryptData } = params

					for (let key in userInfo) {
						this[key] = userInfo[key]
					}

					ret.success({
						extra: params
					})
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_UPDATE_USERDATA_ERROR))
				}
			})
			return ret.promise
		}
	}
}
