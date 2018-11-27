
namespace WechatGDK {
	export class Auth implements GDK.IAuth {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton {
			return wx.createUserInfoButton(obj)
		}
	}
}
