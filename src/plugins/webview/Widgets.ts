
namespace AppGDK {

	const devlog = Common.devlog

	class KeyBoard implements GDK.IKeyBoard {
		async hideKeyboard(): Promise<void> {
			devlog.info("hideKeyboard")
		}
	}

	export class Widgets implements GDK.IWidgets {

		api?: GDK.UserAPI

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
			return new Promise<GDK.ShowConfirmResult>((resolve, reject) => {
				SDKProxy.showConfirm(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), object.cancelLabel || slib.i18n.locSDKString("cancel"), isOk => {
					let r = new GDK.ShowConfirmResult()
					r.confirm = isOk == true
					r.cancel = isOk == false
					resolve(r);
				})
			})
		}

		showAlert(object: GDK.ShowAlertOptions): Promise<GDK.ShowAlertResult> {
			return new Promise<GDK.ShowAlertResult>((resolve, reject) => {
				SDKProxy.showAlert(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), () => {
					let r = new GDK.ShowAlertResult()
					resolve(r);
				})
			})
		}

		showPrompt(object: GDK.ShowPromptOptions): Promise<GDK.ShowPromptResult> {
			return new Promise<GDK.ShowPromptResult>((resolve, reject) => {
				if (SDKProxy.showPrompt == null) {
					let r = new GDK.ShowPromptResult()
					r.cancel = true;
					r.confirm = false;
					r.result = null;
					resolve(r);
					return;
				}
				SDKProxy.showPrompt(object.content, object.title || slib.i18n.locSDKString("remind_tip"), object.okLabel || slib.i18n.locSDKString("ok"), object.cancelLabel || slib.i18n.locSDKString("cancel"), (isOk, result) => {
					let r = new GDK.ShowPromptResult()
					r.confirm = isOk == true
					r.cancel = isOk == false
					r.result = result
					resolve(r);
				}, object.defaultValue || "")
			})
		}

		async hideLaunchingView(): Promise<void> {
			SDKProxy.hideLaunchingView()
		}

	}
}