
namespace DevelopGDK {
	class KeyBoard implements GDK.IKeyBoard {
		async hideKeyboard(): Promise<void> {
			devlog.info("hideKeyboard")
		}
	}

	export class Widgets implements GDK.IWidgets {
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

	}
}