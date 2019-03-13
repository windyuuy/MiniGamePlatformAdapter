namespace QQPlayGDK {

	class KeyBoard implements GDK.IKeyBoard {
		hideKeyboard(): Promise<void> {
			return wrapReq(() => { return BK.UI.hideKeyboard(undefined) }, {}, GDK.GDKErrorCode.API_HIDE_KEYBOARD_FAILED)
		}
	}

	export class Widgets implements GDK.IWidgets {
		keyboard = new KeyBoard()
		showLoading(object: GDK.ShowLoadingParams) {
			return wrapReq((obj) => { return BK.UI.showLoading(obj) }, object, GDK.GDKErrorCode.API_SHOW_LOADING_FAILED)
		}
		hideLoading() {
			return wrapReq(() => { return BK.UI.hideLoading(undefined) }, {}, GDK.GDKErrorCode.API_HIDE_LOADING_FAILED)
		}
		showToast(object: GDK.ShowToastOptions) {
			object.duration = object.duration || 1500
			const params = <{
				title: string,
				duration: number,
				complete: () => void
			}>object
			return wrapReq((obj) => { return BK.UI.showToast(obj) }, params, GDK.GDKErrorCode.API_SHOW_TOAST_FAILED)
		}
		hideToast() {
			return wrapReq(() => { return BK.UI.hideToast(undefined) }, {}, GDK.GDKErrorCode.API_HIDE_TOAST_FAILED)
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

		async hideLaunchingView(): Promise<void> {

		}

	}
}