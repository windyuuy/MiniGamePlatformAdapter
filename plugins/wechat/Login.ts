
namespace WechatGDK {
	export class Login implements GDK.ILogin {
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
							this.api.userdata = {
								...this.api.userdata,
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
	}
}