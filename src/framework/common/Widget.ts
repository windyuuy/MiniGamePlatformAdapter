
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class WidgetsBase implements IWidgets {
		/** 系统键盘对象 */
		abstract readonly keyboard: IKeyBoard

		/** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
		abstract showLoading(object: ShowLoadingParams): Promise<void>
		/** 隐藏 loading 提示框 */
		abstract hideLoading(): Promise<void>
		/** 显示消息提示框 */
		abstract showToast(object: ShowToastOptions): Promise<void>
		/** 隐藏消息提示框 */
		abstract hideToast(): Promise<void>
		/**
		 * 显示模态对话框
		 * - 有`确定`和`取消`两个按钮
		 */
		abstract showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult>

		/**
		 * 显示模态对话框
		 * - 有`确定`和`取消`两个按钮
		 */
		abstract showPrompt(object: ShowPromptOptions): Promise<ShowPromptResult>

		/**
		 * 显示模态对话框
		 * - 只有`确定`一个按钮
		 */
		abstract showAlert(object: ShowAlertOptions): Promise<ShowAlertResult>

		/**
		 * 隐藏启动画面
		 */
		abstract hideLaunchingView(): Promise<void>;
	}
}
