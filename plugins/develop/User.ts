
namespace DevelopGDK {
	export class User implements GDK.IUser {
		api?: GDK.UserAPI
		server: WXServer

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()
			wx.login({
				success: (res) => {
					// 解密数据
					const system = this.api.systemInfo.system == "android" ? 0 : 1
					this.server.userLogin({ code: res.code, system: system, clientSystemInfo: this.api.gameInfo.clientSystemInfo }, (resp) => {
						const data = resp.data
						if (resp.succeed) {
							const newdata = {
								openId: data.openId,
								isNewUser: data.userNew,
								userId: data.userId,
								avatarUrl: data.profileImg,
								nickName: data.nickname,
								backupTime: data.backupTime,
								channelId: data.channelId,
								createTime: data.createTime,
								followGzh: data.followGzh,
								gameToken: data.gameToken,
								token: data.token,
							}
							for (let key in newdata) {
								this.api.userdata[key] = newdata[key]
							}
							ret.success({
								extra: data,
							})
						} else {
							ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
								data: {
									extra: resp,
								}
							}))
						}
					}, () => {
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
					})
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED))
				}
			})
			return ret.promise
		}

		checkSession() {
			return wrapReq(wx.checkSession, wx, {
				okmsg: "session_key 未过期，并且在本生命周期一直有效",
				failmsg: "session_key 已经失效，需要重新执行登录流程"
			})
		}

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
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_UPDATE_USERDATA_FAILED))
				}
			})
			return ret.promise
		}

		getFriendCloudStorage(obj: { keyList: string[] }): Promise<{ data: GDK.UserGameData[] }> {
			const ret = new GDK.RPromise<{ data: GDK.UserGameData[] }>()
			wx.getFriendCloudStorage({
				keyList: obj.keyList,
				success: (res) => {
					ret.success(res)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_GET_FRIEND_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}
	}
}