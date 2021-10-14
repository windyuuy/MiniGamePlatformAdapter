
namespace WechatGDK {
	const devlog = Common.devlog

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		login(params?: GDK.LoginParams) {
			if (!SDKProxy.wx) {
				return this.loginTest(params)
			}
			const ret = new GDK.RPromise<GDK.LoginResult>()
			SDKProxy.login({
				success: (res) => {
					let result = new GDK.LoginResult()
					result.extra = res
					ret.success(result)
				},
				fail: (res) => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED, {
						message: res.errMsg,
						reason: `code: ${res.code}, msg: ${res.errMsg}`,
					}))
				}
			})
			return ret.promise
		}

		loginTest(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			let userId = localStorage.getItem('sdk_glee_userId')
			let nUserId = parseInt(userId)
			if (isNaN(nUserId)) {
				nUserId = undefined
			}

			ret.success({
				openId: `openid_${Date.now() - 1628240632608}`,
			})

			return ret.promise
		}

		async showUserCenter() {
		}
		async showBindDialog() {
		}

		checkSession() {
			return wrapReq((obj: wx.CheckSessionOptions) => {
				return SDKProxy.checkSession(obj)
			}, {}, GDK.GDKErrorCode.API_LOGIN_SESSION_OUTDATE)
		}

		update(): Promise<GDK.UserDataUpdateResult> {
			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()
			SDKProxy.getUserInfo({
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

		getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: GDK.UserGameData[] }> {
			const ret = new GDK.RPromise<{ data: GDK.UserGameData[] }>()
			SDKProxy.getFriendCloudStorage({
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

		setUserCloudStorage(obj: { KVDataList: wx.KVData[], typeIndex: string[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()
			SDKProxy.setUserCloudStorage({
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

		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId: number): boolean {
			return false;
		}
	}
}