
namespace WechatAPI {
	export class Login implements GDK.ILogin {
		api?: GDK.UserAPI
		server: WXServer

		init() {
			this.api.settings.clientSystemInfo = wx.getSystemInfoSync()
		}

		login(params?: GDK.LoginParams) {
			const obj = new RLoginPromise<wx.LoginResult>({ okmsg: '登录成功', failmsg: '登录失败' })
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
							obj.success(res)
						} else {
							obj.fail()
						}
					}, () => {
						obj.fail()
					})
				},
				fail: obj.fail,
			})
			return obj.promise
		}

		checkSession(params?: GDK.LoginParams) {
			return wrapReq(wx.checkSession, wx, {
				okmsg: "session_key 未过期，并且在本生命周期一直有效",
				failmsg: "session_key 已经失效，需要重新执行登录流程"
			})
		}
	}
}