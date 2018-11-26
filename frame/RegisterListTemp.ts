import { ILogin } from "../sense/ILogin";
import { UserAPI } from "./UserApi";

export class RegisterListTemp {
	static init(temp: new () => RegisterListTemp): UserAPI {
		return null;
	}
	Login: new () => ILogin;
}
