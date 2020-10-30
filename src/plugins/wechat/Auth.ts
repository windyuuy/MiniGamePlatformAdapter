
namespace WechatGDK {
	export class Auth extends GDK.AuthBase {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton {
			return SDKProxy.createUserInfoButton(obj)
		}

		async isUserInfoAuthAlready() {
			return new Promise<boolean>((resolve, reject) => {
				SDKProxy.getSetting({
					success: (res) => {
						resolve(res["scope.userInfo"])
					},
					fail: (res) => {
						reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, { data: { extra: res } }))
					}
				})
			})
		}
	}
}
