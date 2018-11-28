
namespace WechatGDK {
	function wrapReq(fun: Function, object, code: number) {
		const ret = new GDK.RPromise<any>()
		object.success = ret.success
		object.fail = () => {
			ret.fail(GDK.GDKResultTemplates.make(code))
		}
		fun(object)
		return ret.promise
	}

	class KeyBoard implements GDK.IKeyBoard {
		hideKeyboard(): Promise<void> {
			return wrapReq((obj) => { return wx.hideKeyboard(obj) }, {}, GDK.GDKErrorCode.API_HIDE_KEYBOARD_FAILED)
		}
	}

	export class Widgets implements GDK.IWidgets {
		keyboard = new KeyBoard()
		showLoading(object: GDK.ShowLoadingParams) {
			return wrapReq((obj) => { return wx.showLoading(obj) }, object, GDK.GDKErrorCode.API_SHOW_LOADING_FAILED)
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
		showConfirm(object): Promise<GDK.ShowConfirmResult> {

			const ret = new GDK.RPromise<GDK.ShowConfirmResult>()
			object.success = (data) => {
				var result = new GDK.ShowConfirmResult()
				result.confirm = data.confirm
				result.cancel = data.confirm
				result.extra = data;
				ret.success(result)
			}
			object.fail = () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHOW_MODAL_FAILED))
			}
			wx.showModal(object)

			return ret.promise

		}

		showAlert(object): Promise<GDK.ShowAlertResult> {
			const ret = new GDK.RPromise<GDK.ShowAlertResult>()
			object.success = (data) => {
				var result = new GDK.ShowAlertResult()
				result.extra = data;
				ret.success(result)
			}
			object.fail = () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHOW_MODAL_FAILED))
			}
			wx.showModal({ title: object.title, showCancel: false, content: object.content })

			return ret.promise
		}
	}
}