
namespace QQMiniAppGDK {

	class KeyBoard implements GDK.IKeyBoard {
		hideKeyboard(): Promise<void> {
			return wrapReq((obj) => { return wx.hideKeyboard(obj) }, {}, GDK.GDKErrorCode.API_HIDE_KEYBOARD_FAILED)
		}
	}

	export class Widgets implements GDK.IWidgets {
		keyboard = new KeyBoard()
		showLoading(object: GDK.ShowLoadingParams) {
			return wrapReq<void>((obj) => { return wx.showLoading(obj) }, object, GDK.GDKErrorCode.API_SHOW_LOADING_FAILED)
		}
		hideLoading() {
			return wrapReq((obj) => { return wx.hideLoading(obj) }, {}, GDK.GDKErrorCode.API_HIDE_LOADING_FAILED)
		}
		showToast(object) {
			return wrapReq((obj) => { return wx.showToast(obj) }, object, GDK.GDKErrorCode.API_SHOW_TOAST_FAILED)
		}
		hideToast() {
			return wrapReq((obj) => { return wx.hideToast(obj) }, {}, GDK.GDKErrorCode.API_HIDE_TOAST_FAILED)
		}
		showConfirm(object: GDK.ShowConfirmOptions): Promise<GDK.ShowConfirmResult> {

			const ret = new GDK.RPromise<GDK.ShowConfirmResult>()

			let opt: any = {}
			opt.success = (data) => {
				var result = new GDK.ShowConfirmResult()
				result.confirm = data.confirm
				result.cancel = data.confirm
				result.extra = data;
				ret.success(result)
			}
			opt.fail = () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHOW_MODAL_FAILED))
			}

			opt.title = object.title
			opt.content = object.content
			opt.confirmText = object.okLabel || "确定"
			opt.cancelText = object.cancelLabel || "取消"

			wx.showModal(opt)

			return ret.promise

		}

		showAlert(object: GDK.ShowAlertOptions): Promise<GDK.ShowAlertResult> {
			const ret = new GDK.RPromise<GDK.ShowAlertResult>()

			let opt: any = {}
			opt.success = (data) => {
				var result = new GDK.ShowAlertResult()
				result.extra = data;
				ret.success(result)
			}
			opt.fail = () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHOW_MODAL_FAILED))
			}

			opt.title = object.title
			opt.content = object.content
			opt.confirmText = object.okLabel || "确定"
			opt.showCancel = false

			wx.showModal(opt)

			return ret.promise
		}

		async hideLaunchingView(): Promise<void> {

		}

	}
}