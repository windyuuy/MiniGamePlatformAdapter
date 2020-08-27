
namespace GamepindGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	const PayInApp = GDK.PayFlow.PayInApp
	const payDeps = GDK.PayFlow.payDeps

	/**
	 * 针对小游戏平台
	 */
	export class PayFlowProxy extends GDK.PayFlow.PayFlowProxyForMiniApp {

		initConfig(parent: GDK.PayFlow.Parent) {
			this._parent = parent

			if (payDeps.api.getAppInfoBoolean(AppInfoKeys.requireIndiaSPSPay)) {
				this._payFlow = new PayOutsideGamepind.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			} else {
				this._payFlow = new PayInApp.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			}
		}
	}
}
