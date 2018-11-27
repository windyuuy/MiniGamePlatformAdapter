
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
	export class Widgets implements GDK.IWidgets {
		showLoading(object) {
			return wrapReq((obj) => { return wx.showLoading(obj) }, object, GDK.GDKErrorCode.API_SHOW_LOADING_FAILED)
		}
		hideLoading(object) {
			return wrapReq((obj) => { return wx.hideLoading(obj) }, object, GDK.GDKErrorCode.API_HIDE_LOADING_FAILED)
		}
		showToast(object) {
			return wrapReq((obj) => { return wx.showToast(obj) }, object, GDK.GDKErrorCode.API_SHOW_TOAST_FAILED)
		}
		hideToast(object) {
			return wrapReq((obj) => { return wx.hideToast(obj) }, object, GDK.GDKErrorCode.API_HIDE_TOAST_FAILED)
		}
		showModal(object) {
			return wrapReq((obj) => { return wx.showModal(obj) }, object, GDK.GDKErrorCode.API_SHOW_MODAL_FAILED)
		}
	}
}