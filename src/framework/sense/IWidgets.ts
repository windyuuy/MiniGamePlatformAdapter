
namespace GDK {

	export class ShowConfirmResult {
		/**
		 * 点击了确定按钮
		 */
		confirm: boolean
		/**
		 * 点击了取消按钮
		 */
		cancel: boolean

		/**
		 * 原始数据
		 */
		extra?: any
	}

	export class ShowAlertResult {
		/**
		 * 原始数据
		 */
		extra?: any
	}

	export class ShowLoadingParams {
		/** 提示的内容 */
		title: string
	}
	export interface ShowToastOptions {

		/**
		 * 提示的内容
		 */
		title: string;

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
	export interface ShowConfirmOptions {

		/**
		 * 提示的标题
		 */
		title: string;

		/**
		 * 提示的内容
		 */
		content: string;

		/**
		 * 确认按钮文字
		 */
		okLabel?: string;

		/**
		 * 取消按钮文字
		 */
		cancelLabel?: string;
	}

	export interface ShowAlertOptions {

		/**
		 * 提示的标题
		 */
		title: string;

		/**
		 * 提示的内容
		 */
		content: string;

		/**
		 * 确认按钮文字
		 */
		okLabel?: string;
	}

	export interface IKeyBoard {
		/** 隐藏键盘 */
		hideKeyboard(object: Object): Promise<void>
	}
	export interface IWidgets {
		/** 系统键盘对象 */
		readonly keyboard: IKeyBoard

		/** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
		showLoading(object: ShowLoadingParams): Promise<void>
		/** 隐藏 loading 提示框 */
		hideLoading(): Promise<void>
		/** 显示消息提示框 */
		showToast(object: ShowToastOptions): Promise<void>
		/** 隐藏消息提示框 */
		hideToast(): Promise<void>
		/**
		 * 显示模态对话框
		 * - 有`确定`和`取消`两个按钮
		 */
		showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult>
		/**
		 * 显示模态对话框
		 * - 只有`确定`一个按钮
		 */
		showAlert(object: ShowAlertOptions): Promise<ShowAlertResult>
	}
}
