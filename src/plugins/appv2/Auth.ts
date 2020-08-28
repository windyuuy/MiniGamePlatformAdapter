/// <reference path="./Common.ts" />
namespace AppV2GDK {

	const devlog = Common.devlog

	export class Auth extends GDK.AuthBase {
		createUserInfoButton(obj: GDK.IUserInfoButton): GDK.UserInfoButton | null {
			devlog.info("createUserInfoButton")
			return null;
		}

		async isUserInfoAuthAlready() {
			return true;
		}
	}
}
