
namespace WechatGDK {
	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		initWithConfig(info: GDK.GDKConfig) {
			this.api.userData.userId = info.wechat.userId
		}

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()
			wx.login({
				success: (res) => {
					// 解密数据
					const system = this.api.systemInfo.system == "android" ? 0 : 1
					this.server.userLogin({ code: res.code, system: system, clientSystemInfo: wx.getSystemInfoSync() }, (resp) => {
						if (resp.succeed) {
							const data = resp.data
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
								gameToken: data.gametoken,
							}
							const userdata = this.api.userData
							for (let key in newdata) {
								userdata[key] = newdata[key]
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
			return wrapReq((obj: wx.CheckSessionOptions) => {
				return wx.checkSession(obj)
			}, {}, GDK.GDKErrorCode.API_LOGIN_SESSION_OUTDATE)
		}

		update(): Promise<GDK.UserDataUpdateResult> {
			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()
			wx.getUserInfo({
				openIdList: ["selfOpenId"],
				lang: "zh_CN",
				success: (params) => {
					const { userInfo, rawData, signature, encryptData } = params

					for (let key in userInfo) {
						this.api.userData[key] = userInfo[key]
					}
					this.api.userData.sex = userInfo.gender

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

		setUserCloudStorage(obj: { KVDataList: wx.KVData[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()
			wx.setUserCloudStorage({
				KVDataList: obj.KVDataList,
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SET_USER_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}
	}
}