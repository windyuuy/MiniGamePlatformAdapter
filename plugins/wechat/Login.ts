
namespace WechatGDK {
	export class Login implements GDK.ILogin {
		api?: GDK.UserAPI
		server: WXServer

		login(params?: GDK.LoginParams) {
			const obj = new GDK.YmPromise<GDK.LoginResult>()
			wx.login({
				success: (res) => {
					// 解密数据
					this.server.userLogin({ code: res.code, system: this.api.settings.system, clientSystemInfo: this.api.settings.clientSystemInfo }, (resp) => {
						const data = resp.data
						if (resp.succeed) {
							this.api.userdata = {
								...this.api.userdata,
								openId: data.openId,
								isNewUser: data.userNew,
								userId: data.userId,
								avatarUrl: data.profileImg,
								nickName: data.nickname,
							}
							obj.success(obj.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
								message: '登录成功',
								data: data,
							})))
						} else {
							obj.fail(obj.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN)))
						}
					}, () => {
						obj.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN))
					})
				},
				fail: () => {
					obj.fail(obj.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED)))
				}
			})
			return obj.promise
		}

		checkSession() {
			return wrapReq(wx.checkSession, wx, {
				okmsg: "session_key 未过期，并且在本生命周期一直有效",
				failmsg: "session_key 已经失效，需要重新执行登录流程"
			})
		}
	}
}