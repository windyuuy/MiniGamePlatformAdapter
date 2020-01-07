
namespace BaiduGDK {
	export class Auth implements GDK.IAuth {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton {
			return swan.createUserInfoButton(obj)
		}

		async isUserInfoAuthAlready() {
			return new Promise<boolean>((resolve, reject) => {
				swan.getSetting({
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
