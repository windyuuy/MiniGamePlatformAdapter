
namespace AppV2GDK {

	const devlog = Common.devlog

	class KeyBoard implements GDK.IKeyBoard {
		async hideKeyboard(): Promise<void> {
			devlog.info("hideKeyboard")
		}
	}

	export class Widgets extends GDK.WidgetsBase {

		api!: GDK.UserAPI

		init(data) {
			setTimeout(() => {
				this.api.hideLaunchingView();
			})
		}

		keyboard = new KeyBoard()
		async showLoading(object: GDK.ShowLoadingParams) {
			devlog.info("showLoading")
		}
		async hideLoading() {
			devlog.info("hideLoading")
		}
		async showToast(object) {
			devlog.info("showToast")
		}
		async hideToast() {
			devlog.info("hideToast")
		}
		showConfirm(object: GDK.ShowConfirmOptions): Promise<GDK.ShowConfirmResult> {
			return SDKProxy.showConfirm(object);
		}

		showAlert(object: GDK.ShowAlertOptions): Promise<GDK.ShowAlertResult> {
			return SDKProxy.showAlert(object);
		}

		showPrompt(object: GDK.ShowPromptOptions): Promise<GDK.ShowPromptResult> {
			return SDKProxy.showPrompt(object);
		}

		async hideLaunchingView(): Promise<void> {
			return SDKProxy.hideLaunchingView();
		}
		showLaunchingView() {
			return SDKProxy.showLaunchingView();
		}
	}
}