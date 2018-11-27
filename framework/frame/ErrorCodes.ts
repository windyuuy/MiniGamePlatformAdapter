/// <reference path="ErrorMap.ts" />
namespace GDK {

	/** 基本请求错误码 */
	export const GDKErrorCode = {
		/** Normal Error */
		/** 请求成功 */
		SUCCESS: 0,
		/** 未知错误 */
		UNKNOWN: 100,
		/** 请求超时 */
		TIMEOUT: 101,
		/** 网络错误 */
		NETWORK_ERROR: 102,

		/** GameHttpClient Error */
		/** 无效的OPENID */
		INVALID_OPENID: 2001,

		/** API Error */
		/** API 登录失败 */
		API_LOGIN_FAILED: 30001,
	}

	/**
	 * 请求结果模板，用于生成错误结果
	 **/
	export const GDKResultTemplates = new ResultTemplatesExtractor([
		{ errcode: GDKErrorCode.SUCCESS, message: '请求成功', reason: '请求成功', data: null },
		{ errcode: GDKErrorCode.UNKNOWN, message: '请求失败', reason: '未知错误' },
		{ errcode: GDKErrorCode.TIMEOUT, message: '请求超时', reason: '请求超时' },
		{ errcode: GDKErrorCode.NETWORK_ERROR, message: '网络错误', reason: '网络错误' },

		{ errcode: GDKErrorCode.INVALID_OPENID, message: '登录失败', reason: 'openId验证失败' },

		{ errcode: GDKErrorCode.API_LOGIN_FAILED, message: 'Api登录失败', reason: 'Api登录失败' },
	])


}
