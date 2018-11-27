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
		/** API 登录 */
		API_LOGIN_SUCCESS: 30001,
		API_LOGIN_FAILED: 30002,

		/** API 支付 */
		API_PAY_SUCCESS: 30011,
		API_PAY_FAILED: 30012,
		API_PAY_CANCEL: 30013,

		/** API 更新用户数据 */
		API_UPDATE_USERDATA_FAILED: 30102,

		/** 获取好友排行数据 */
		API_GET_FRIEND_CLOUD_STORAGE_FAILED: 30112,

		/** 打开客服反馈界面失败 */
		API_OPEN_FEEDBACK_FAILED: 30122,

		API_SHOW_LOADING_FAILED: 30131,
		API_HIDE_LOADING_FAILED: 30132,
		API_SHOW_TOAST_FAILED: 3013,
		API_HIDE_TOAST_FAILED: 30134,
		API_SHOW_MODAL_FAILED: 30135,

		API_HIDE_KEYBOARD_FAILED: 30141,


		/**
		 * 分享不被支持
		 */
		API_SHARE_UNSUPPORTED: 30201,

		/**
		 * 不支持的平台
		 */
		API_SHARE_UNSUPPORTED_PLATFORM: 30202,

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

		{ errcode: GDKErrorCode.API_LOGIN_SUCCESS, message: 'Api登录成功', reason: 'Api登录成功' },
		{ errcode: GDKErrorCode.API_LOGIN_FAILED, message: 'Api登录失败', reason: 'Api登录失败' },

		{ errcode: GDKErrorCode.API_PAY_SUCCESS, message: 'Api支付失败', reason: 'Api支付失败' },
		{ errcode: GDKErrorCode.API_PAY_FAILED, message: 'Api支付失败', reason: 'Api支付失败' },
		{ errcode: GDKErrorCode.API_PAY_CANCEL, message: 'Api支付取消', reason: 'Api支付取消' },

		{ errcode: GDKErrorCode.API_UPDATE_USERDATA_FAILED, message: 'Api更新用户数据失败', reason: 'Api更新用户数据失败' },

		{ errcode: GDKErrorCode.API_GET_FRIEND_CLOUD_STORAGE_FAILED, message: '获取好友排行数据失败' },

		{ errcode: GDKErrorCode.API_SHOW_LOADING_FAILED, message: '显示 loading 失败' },
		{ errcode: GDKErrorCode.API_HIDE_LOADING_FAILED, message: '隐藏 loading 失败' },
		{ errcode: GDKErrorCode.API_SHOW_TOAST_FAILED, message: '显示 toast 失败' },
		{ errcode: GDKErrorCode.API_HIDE_TOAST_FAILED, message: '隐藏 toast 失败' },
		{ errcode: GDKErrorCode.API_SHOW_MODAL_FAILED, message: '显示 modal 失败' },
		{ errcode: GDKErrorCode.API_HIDE_KEYBOARD_FAILED, message: '隐藏 键盘 失败' },

		{ errcode: GDKErrorCode.API_SHARE_UNSUPPORTED, message: '分享不被支持' },
		{ errcode: GDKErrorCode.API_SHARE_UNSUPPORTED_PLATFORM, message: '不支持的平台' },
	])


}
