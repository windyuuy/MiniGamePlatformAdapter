
namespace DevelopGDK {

	const devlog = Common.devlog

	class KeyBoard implements GDK.IKeyBoard {
		async hideKeyboard(): Promise<void> {
			devlog.info("hideKeyboard")
		}
	}

	export class Widgets extends GDK.WidgetsBase {
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
				setTimeout(() => {
					let result = confirm(object.title + ";" + object.content)
					let r = new GDK.ShowConfirmResult()
					r.confirm = result == true
					r.cancel = result == false
					resolve(r);
				}, 1000)
			})
		}

		showAlert(object: GDK.ShowAlertOptions): Promise<GDK.ShowAlertResult> {
			return new Promise<GDK.ShowAlertResult>((resolve, reject) => {
				setTimeout(() => {
					alert(object.title + ";" + object.content)
					let r = new GDK.ShowAlertResult()
					resolve(r);
				}, 1000)
			})
		}

		showPrompt(object: GDK.ShowPromptOptions): Promise<GDK.ShowPromptResult> {
			return new Promise<GDK.ShowPromptResult>((resolve, reject) => {
				setTimeout(() => {
					let result = prompt(object.title + ";" + object.content, object.defaultValue)
					let r = new GDK.ShowPromptResult()
					r.confirm = result != null;
					r.cancel = result == null;
					r.result = result;
					resolve(r);
				}, 1000)
			})
		}

		async hideLaunchingView(): Promise<void> {

		}

	}
}