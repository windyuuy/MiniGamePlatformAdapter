
namespace WechatGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	const PayInApp = GDK.PayFlow.PayInApp
	const payDeps = GDK.PayFlow.payDeps

	/**
	 * 针对小游戏平台
	 */
	export class PayFlowMG extends GDK.PayFlow.PayFlowMGForMiniApp {

		get isPayCallbackValid(): boolean {
			/**
			 * 客服支付回调不可用
			 */
			if (this.requireCustomServicePay) {
				return false
			}
			/**
			 * 小程序跳转支付回调不可用
			 */
			if (this.requireMiniAppPay) {
				return false
			}

			let payFlow = this.getPayFlow()
			return payFlow.isPayCallbackValid
		}

		get requireCustomServicePay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireCustomServicePay)
		}

		get requireMiniAppPay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireMiniAppPay)
		}

		initConfig(parent: GDK.PayFlow.Parent) {
			this._parent = parent

			if (this.requireCustomServicePay) {
				this._payFlow = new CustomPayOutside()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			} else if (this.requireMiniAppPay) {
				this._payFlow = new CustomPayOutside()
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
