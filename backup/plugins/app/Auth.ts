
namespace AppGDK {

	const devlog = Common.devlog

	export class Auth extends GDK.AuthBase {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton {
			devlog.info("createUserInfoButton")
			return null;
		}

		async isUserInfoAuthAlready() {
			return true;
		}
	}
}
