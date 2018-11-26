import { LoginParams, LoginCallbacks, LoginResultTemplates, LoginResult, LoginErrorCode, ILogin } from "../../sense/ILogin";
import { oppoapi, qqplay } from "./config";

export class Login implements ILogin {
	login(params: LoginParams) {
		if (params.platform == 'oppo') {
			return oppoapi.login(params)
		} else if (params.platform == 'qqplay') {
			return qqplay.login(params)
		}
	}
}
