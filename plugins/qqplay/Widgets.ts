namespace QQPlayGDK {
	function wrapReq(fun: Function, object, code: number) {
		const ret = new GDK.RPromise<any>()
		object.complete = ret.success
		fun(object)
		return ret.promise
	}

	class KeyBoard implements GDK.IKeyBoard {
		hideKeyboard(): Promise<void> {
			return wrapReq((obj) => { return BK.UI.hideKeyboard(obj) }, {}, GDK.GDKErrorCode.API_HIDE_KEYBOARD_FAILED)
		}
	}

	export class Widgets implements GDK.IWidgets {
		keyboard = new KeyBoard()
		showLoading(object: GDK.ShowLoadingParams) {
			return wrapReq((obj) => { return BK.UI.showLoading(obj) }, object, GDK.GDKErrorCode.API_SHOW_LOADING_FAILED)
		}
		hideLoading() {
			return wrapReq((obj) => { return BK.UI.hideLoading(obj) }, {}, GDK.GDKErrorCode.API_HIDE_LOADING_FAILED)
		}
		showToast(object) {
			return wrapReq((obj) => { return BK.UI.showToast(obj) }, object, GDK.GDKErrorCode.API_SHOW_TOAST_FAILED)
		}
		hideToast() {
			return wrapReq((obj) => { return BK.UI.hideToast(obj) }, {}, GDK.GDKErrorCode.API_HIDE_TOAST_FAILED)
		}
		showConfirm(object): Promise<GDK.ShowConfirmResult> {

			const ret = new GDK.RPromise<GDK.ShowConfirmResult>()
			object.success = (data) => {
				var result = new GDK.ShowConfirmResult()
				result.confirm = data.confirm
				result.cancel = data.confirm
				result.extra = data
				ret.success(result)
			}
			BK.UI.showAlert(object)

			return ret.promise

		}
		showAlert(object): Promise<GDK.ShowAlertResult> {

			const ret = new GDK.RPromise<GDK.ShowAlertResult>()
			object.success = (data) => {
				var result = new GDK.ShowAlertResult()
				result.extra = data
				ret.success(result)
			}
			BK.UI.showAlert(object)

			return ret.promise

		}
	}
}