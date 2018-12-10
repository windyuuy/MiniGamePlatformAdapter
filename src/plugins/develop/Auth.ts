
namespace DevelopGDK {

	const devlog = Common.devlog

	export class Auth implements GDK.IAuth {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton {
			devlog.info("createUserInfoButton")
			return null;
		}

		async isUserInfoAuthAlready() {
			return true;
		}
	}
}
