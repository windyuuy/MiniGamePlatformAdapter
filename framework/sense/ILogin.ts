
namespace GDK {
	// export class LoginError extends ReqError { }

	/** 登录请求结果 */
	export class LoginResult {
		data?: {
			openid: string,
			sessionKey: string,
		}
	}

	/** 登录错误码 */
	// export const LoginErrorCode = {
	// 	...ReqErrorCode,
	// 	INVALID_OPENID: 10001,
	// }

	/** 登录结果模板 */
	// export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
	// 	...ReqResultTemplates.temps,
	// 	{ errcode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
	// ])

	/** 登录请求参数 */
	export class LoginParams extends ReqParams {
	}

	export class LoginPromise extends Promise<LoginResult>{ }

	// export class LoginCallbacks extends ReqCallbacks {
	// 	success?: (params: LoginResult) => void
	// 	fail?: (params: LoginError) => void
	// }

	// export interface LoginDelegate {
	// 	login(params: LoginParams, callbacks: LoginCallbacks): void;
	// }

	// 自动生成
	/** 登录接口 */
	export interface ILogin extends IModule {
		login(params?: LoginParams): Promise<LoginResult>
		checkSession?(params?: LoginParams)
	}
}
