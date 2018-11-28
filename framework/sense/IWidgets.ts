
namespace GDK {

	export class ShowDialogResult {
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
	export interface ShowDialogOptions {

		/**
		 * 提示的标题
		 */
		title: string;

		/**
		 * 提示的内容
		 */
		content: string;
	}

	export interface IKeyBoard {
		hideKeyboard(object: Object): Promise<void>
	}
	export interface IWidgets {
		readonly keyboard: IKeyBoard

		showLoading(object: ShowLoadingParams): Promise<void>
		hideLoading(): Promise<void>
		showToast(object: ShowToastOptions): Promise<void>
		hideToast(): Promise<void>
		showDialog(object: ShowDialogOptions): Promise<ShowDialogResult>
	}
}
