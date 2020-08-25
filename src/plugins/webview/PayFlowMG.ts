
namespace WebViewGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	type IPayFlow = GDK.PayFlow.IPayFlow
	type PayFlowStatus = GDK.PayFlow.PayFlowStatus
	type Parent = GDK.PayFlow.Parent
	type PayWay = GDK.PayFlow.PayWay
	const PayInApp = GDK.PayFlow.PayInApp
	const PayInAppWithAutoMakeup = GDK.PayFlow.PayInAppWithAutoMakeup
	const YYBPayFlow = GDK.PayFlow.YYBPayFlow
	const PayInsideLocalV2 = GDK.PayFlow.PayInsideLocalV2
	const PayOutside = GDK.PayFlow.PayOutside

	const payDeps = GDK.PayFlow.payDeps

	type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	type PaymentParams = GDK.PayFlow.PaymentParams
	type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	type OrderRecordExported = GDK.PayFlow.OrderRecordExported

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 针对小游戏平台
	 */
	export class PayFlowMG extends GDK.PayFlow.PayFlowMGForMiniApp {

		initConfig(parent: Parent) {
			this._parent = parent

			if (gdk.gameInfo.requireCustomServicePay) {
				this._payFlow = new PayOutside.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			} else if (gdk.gameInfo.requireMiniAppPay) {
				this._payFlow = new PayOutside.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			} else {
				this._payFlow = new PayInAppWithAutoMakeup.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			}
		}

	}
}
