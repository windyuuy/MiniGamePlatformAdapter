/// <reference path="./Common.ts" />
namespace UnityAppGDK {

	const devlog = Common.devlog

	export class Auth implements GDK.IAuth {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton | null {
			devlog.info("createUserInfoButton")
			return null;
		}

		async isUserInfoAuthAlready() {
			return true;
		}
	}
}
