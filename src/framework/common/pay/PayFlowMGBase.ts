/// <reference path="./PayFlowStatus.ts" />

namespace GDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	export abstract class PayFlowMGBase implements IPayFlow {

		_status: PayFlowStatus = new PayFlowStatus()

		protected get _parent() {
			return this._status._parent
		}
		protected set _parent(value: Parent) {
			this._status._parent = value
		}

		protected get _isRecharging() {
			return this._status._isRecharging
		}
		protected set _isRecharging(value: boolean) {
			this._status._isRecharging = value
		}

		protected get _rechargeBlockLayerIndex() {
			return this._status._rechargeBlockLayerIndex
		}
		protected set _rechargeBlockLayerIndex(value: [number, string]) {
			this._status._rechargeBlockLayerIndex = value
		}

		init(api: UserAPI) {
			payDeps.api = api
			this._rechargeBlockLayerIndex = [payNetClient.client.getLoadingIndex(), 'payflow://index.html']
			return this
		}

		abstract readonly payFlowName: string
		abstract initConfig(parent: Parent): void
		abstract payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void
		abstract isItemBoughtEver(config: RechargeConfigRow): boolean
		abstract pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions)
		abstract initListener(onShow?: (callback: Function) => void): void
		abstract isPayCallbackValid: boolean
		abstract orderRecordList: OrderRecordExported[]

	}
}
