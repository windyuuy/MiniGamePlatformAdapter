namespace GDK {
	// 统一形式：promise、callback、同步、异步等不同形式，统一为同一形式

	/** 毫秒 */
	export type TMilliSeconds = number
	/** 微秒 */
	export type TMicroSecond = number
	// export type ms=number
	/** 秒 */
	export type TSeconds = number
	// export type senconds=number
	export type primitive = number | string | boolean | null | undefined
	export type PrimitiveData = number | string | boolean
	export type PrimitiveMap = { [key: string]: primitive }

	// /** 基本请求错误码 */
	// export const ReqErrorCode = {
	// 	/** 请求成功 */
	// 	SUCCESS: 0,
	// 	/** 未知错误 */
	// 	UNKNOWN: 100,
	// 	/** 请求超时 */
	// 	TIMEOUT: 101,
	// }

	// /** 请求错误扩展参数 */
	// export class ExtraReqError {
	// 	errCode?: number
	// 	msg?: string
	// 	reason?: string
	// 	data?: any
	// }

	// /** 请求错误结果 */
	// export class ReqError extends Error {
	// 	errCode: number
	// 	msg: string
	// 	reason: string
	// 	data?: any

	// 	constructor(errCode: number, msg: string, reason: string, data?: any) {
	// 		super(msg)
	// 		this.errCode = errCode
	// 		this.reason = reason;
	// 		this.data = data;
	// 	}
	// }

	// /** 请求结果 */
	// export class ReqResult extends ReqError { }

	// /** 请求结果模板生成器 */
	// export class ResultTemplatesExtractor<T extends ReqError> {
	// 	protected _temps: T[] = []
	// 	get temps() { return this._temps }

	// 	constructor(temps: T[]) {
	// 		this._temps = temps
	// 	}


	// 	/**
	// 	 * 根据错误码和扩展参数构造请求结果
	// 	 */
	// 	make<F extends ExtraReqError>(errCode: number, extra?: F): T {
	// 		return null
	// 	}
	// }

	/**
	 * 请求结果模板，用于生成请求结果
	 * 用法示例：
	 * - ```typescript
	export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
		...ReqResultTemplates.temps,
		{ errCode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
	])
	```
	 **/
	// export const ReqResultTemplates = new ResultTemplatesExtractor<ReqError>([
	// 	{ errCode: ReqErrorCode.SUCCESS, msg: '请求成功', reason: '请求成功', data: null },
	// 	{ errCode: ReqErrorCode.UNKNOWN, msg: '请求失败', reason: '未知错误' },
	// 	{ errCode: ReqErrorCode.TIMEOUT, msg: '请求超时', reason: '请求超时' },
	// ])

	// export class ReqCallbacks {
	// 	success?: (params: ReqResult) => void
	// 	fail?: (params: ReqError) => void
	// }

	/**
	 * 增强类型限定的Promise
	 * @param T - resolve 参数类型
	 * @param F - reject 参数类型
	 */
	// export class MyPromise<T, F> extends Promise<T>{
	// 	constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: F) => void) => void) {
	// 		super(executor)
	// 	}
	// }

	/**
	 * 反转 MyPromise
	 * - 外部调用 success时相当于调用了 resolve
	 * - 外部调用 fail 时，相当于调用了 reject
	 * @param T - resolve 参数类型
	 * @param F - reject 参数类型
	 */
	export class YmPromise<T, F = any> {
		/**
		 * @noSelf
		 */
		success: Function
		/**
		 * @noSelf
		 */
		fail: Function
		promise: Promise<T>
		constructor(params?: any) {
			this.init(params)
		}

		protected init(params?: any) {
			this.promise = new Promise((resolve, reject) => {
				this.success = resolve
				this.fail = reject
			})
		}
	}

	export class RPromise<T, F = any> extends YmPromise<T, F>{
		/**
		* @noSelf
		*/
		success: (value: T) => void
		/**
		* @noSelf
		*/
		fail: (value?: F) => void
	}

	/** 请求参数 */
	export class ReqParams {
		/** 超时时间(s) */
		timeout?: TSeconds
		/** 平台 */
		platform?: string
	}

}