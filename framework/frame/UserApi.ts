import { LoginParams, LoginResult, LoginError, ILogin } from "../sense/ILogin";
import { MyPromise } from "../sense/Basic";
import { ISettings } from "../sense/ISettings";

export class UserData {
	openId: string
	openKey: string
	password?: string
	nickName: string
	userId: number
	isNewUser: boolean
	avatarUrl: string
}

// 自动生成，成员使用register函数注册
export class UserAPI {
	private _login: ILogin
	login(params: LoginParams): MyPromise<LoginResult, LoginError> { return this._login.login(params) }
	support() { }
	platform: string | "oppo" | "qqplay"
	settings: ISettings
	userdata: UserData
}

export const api = new UserAPI
