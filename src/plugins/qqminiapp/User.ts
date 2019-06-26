
namespace QQMiniAppGDK {
	const devlog = Common.devlog

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		initWithConfig(info: GDK.GDKConfig) {
			this.api.userData.userId = info.qqminiapp.userId
		}

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()
			wx.login({
				success: (res) => {
					// 解密数据
					const system = this.api.systemInfo.platform == "android" ? 1 : this.api.systemInfo.platform == "ios" ? 2 : 0
					let option = wx.getLaunchOptionsSync()
					devlog.info("LaunchOptions", option);
					let launchOptionsPath = option.path
					let launchOptionsQuery = option.query
					let extraData = option.referrerInfo ? option.referrerInfo.extraData : null;
					this.server.userLogin({
						code: res.code,
						system: system,
						clientSystemInfo: wx.getSystemInfoSync(),
						launchOptionsPath: launchOptionsPath,
						launchOptionsQuery: launchOptionsQuery,
						extraData: extraData,
					},
						(resp) => {
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

								//添加openId日志
								this.api.systemInfo.deviceId = data.openId;

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

		async showUserCenter() {
		}
		async showBindDialog() {
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

		getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: GDK.UserGameData[] }> {
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

		setUserCloudStorage(obj: { KVDataList: wx.KVData[], typeIndex: string[] }): Promise<void> {
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
		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId: number): boolean {
			return false;
		}
	}
}