
namespace GDK {
	interface BaseOptions {

		/**
		 * 接口调用成功的回调函数
		 */
		success?: () => void;

		/**
		 * 接口调用失败的回调函数
		 */
		fail?: () => void;

		/**
		 * 接口调用结束的回调函数（调用成功、失败都会执行）
		 */
		complete?: () => void;
	}
	export class ShowLoadingParams {
		/** 提示的内容 */
		title: string
		/** 是否显示透明蒙层，防止触摸穿透 */
		mask?: boolean = false
		/**  接口调用成功的回调函数 */
		success?: Function
		/**  接口调用失败的回调函数 */
		fail?: Function
		/**  接口调用结束的回调函数（调用成功、失败都会执行） */
		complete?: Function
	}
	export interface ShowToastOptions extends BaseOptions {

		/**
		 * 提示的内容
		 */
		title: string;

		/**
		 * 图标，只支持"success"、"loading"
		 */
		icon?: 'success' | 'loading';

		/**
		 * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
		 */
		duration?: number;
	}
	export interface ShowModalResult {

		/**
		 * confirm==1时，表示用户点击确定按钮
		 */
		confirm: number;
	}
	export interface ShowModalOptions extends BaseOptions {

		/**
		 * 提示的标题
		 */
		title: string;

		/**
		 * 提示的内容
		 */
		content: string;

		/**
		 * 是否显示取消按钮，默认为 true
		 */
		showCancel?: boolean;

		/**
		 * 取消按钮的文字，默认为"取消"
		 */
		cancelText?: string;

		/**
		 * 取消按钮的文字颜色，默认为"#000000"
		 */
		cancelColor?: string;

		/**
		 * 确定按钮的文字，默认为"确定"
		 */
		confirmText?: string;

		/**
		 * 确定按钮的文字颜色，默认为"#3CC51F"
		 */
		confirmColor?: string;

		/**
		 * 接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
		 */
		success?: (res?: ShowModalResult) => void;
	}

	export interface IKeyBoard {
		hideKeyboard(object: Object): Promise<null>
	}
	export interface IWidgets {
		readonly keyboard: IKeyBoard

		showLoading(object: ShowLoadingParams): Promise<null>
		hideLoading(object: Object): Promise<null>
		showToast(object: ShowToastOptions): Promise<null>
		hideToast(object: Object): Promise<null>
		showModal(object: ShowModalOptions): Promise<null>
	}
}
