/// <reference path="ErrorMap.ts" />
namespace GDK {

	/** 基本请求错误码 */
	export const GDKErrorCode = {
		/** 请求成功 */
		SUCCESS: 0,
		/** 未知错误 */
		UNKNOWN: 100,
		/** 请求超时 */
		TIMEOUT: 101,

		/** 无效的OPENID */
		INVALID_OPENID: 10001,
	}

	/**
	 * 请求结果模板，用于生成错误结果
	 **/
	export const GDKResultTemplates = new ResultTemplatesExtractor([
		{ errcode: GDKErrorCode.SUCCESS, message: '请求成功', reason: '请求成功', data: null },
		{ errcode: GDKErrorCode.UNKNOWN, message: '请求失败', reason: '未知错误' },
		{ errcode: GDKErrorCode.TIMEOUT, message: '请求超时', reason: '请求超时' },

		{ errcode: GDKErrorCode.INVALID_OPENID, message: '登录失败', reason: 'openId验证失败' },
	])


}
