import { LoginParams, LoginResultTemplates, LoginResult, LoginErrorCode, ILogin, LoginError, RLoginPromise } from "../../sense/ILogin";
import { YmPromise } from "../../sense/Basic";

const oppo: any = {}

export class Login implements ILogin {
	login(params: LoginParams) {
		const obj = new RLoginPromise()

		oppo.login({
			params,
			success: () => {
				const msg = <LoginResult>LoginResultTemplates.make(LoginErrorCode.SUCCESS)
				msg.data = { openid: 'lkwje', sessionKey: "2r4" }
				obj.success(msg)
			},
			fail: ({ errcode }) => {
				if (errcode == 3234) {
					obj.fail(LoginResultTemplates.make(LoginErrorCode.TIMEOUT))
				} else if (errcode == 23) {
					obj.fail(LoginResultTemplates.make(LoginErrorCode.INVALID_OPENID))
				} else {
					obj.fail(LoginResultTemplates.make(LoginErrorCode.UNKNOWN))
				}
			}
		})

		return obj.promise
	}
}
