
namespace GDK {
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		private _login: ILogin
		login(params: LoginParams): MyPromise<LoginResult, LoginError> { return this._login.login(params) }
		support() { }
		platform: string | "oppo" | "qqplay"
		settings: ISettings
		userdata: IUserData
	}

	export const api = new UserAPI

}
