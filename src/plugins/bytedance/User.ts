
namespace BytedanceGDK {
	const devlog = Common.devlog

	export class User extends WechatGDK.User {
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
				force: false,
				success: (res) => {
					// 解密数据
					const system = this.api.systemInfo.platform == "android" ? 1 : this.api.systemInfo.platform == "ios" ? 2 : 0
					let option = SDKProxy.getLaunchOptionsSync()
					devlog.info("LaunchOptions", option);
					let launchOptionsPath = option.path
					let launchOptionsQuery = option.query
					let extraData = option.referrerInfo ? option.referrerInfo.extraData : null;
					this.server.userLogin({
						anonymousCode: res.anonymousCode,
						code: res.code,
						system: system,
						clientSystemInfo: this.api.systemInfo.clone(),
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

								this.api.systemInfo.tableConf = resp.data.tableConf;//记录登录时传入的表格信息

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
		// 登录服务器
		loginTest(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			let userId = localStorage.getItem('sdk_glee_userId')
			let nUserId: number | undefined = parseInt(userId!)
			if (isNaN(nUserId)) {
				nUserId = undefined
			}

			this.server.loginTest({ loginCode: nUserId!, node: params && params.node, clientSystemInfo: { deviceId: "1000000000" } }, (resp) => {
				//玩家数据
				if (resp.succeed) {
					const data = resp.data
					const userdata = this.api.userData
					userdata.channelId = data.channelId
					userdata.createTime = data.createTime
					userdata.userId = data.userId
					localStorage.setItem('sdk_glee_userId', `${data.userId}`)
					console.log("sdk_glee_userId2:" + localStorage.getItem('sdk_glee_userId'))
					userdata.followGzh = data.followGzh
					userdata.nickName = data.nickname
					userdata.isNewUser = data.userNew

					this.api.systemInfo.tableConf = resp.data.tableConf;//记录登录时传入的表格信息

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

			return ret.promise
		}
	}
}