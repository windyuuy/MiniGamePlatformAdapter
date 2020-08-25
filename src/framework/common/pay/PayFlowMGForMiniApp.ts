
namespace GDK.PayFlow {
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
	export class PayFlowMGForMiniApp extends GDK.PayFlow.PayFlowMGBase {

		get payFlowName() {
			let payFlow = this.getPayFlow()
			return payFlow.payFlowName
		}

		protected _payFlow!: IPayFlow
		getPayFlow(payWay: string = "WechatPay"): IPayFlow {
			return this._payFlow
		}

		get isPayCallbackValid(): boolean {
			let payFlow = this.getPayFlow()
			return payFlow.isPayCallbackValid
		}

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
			} else if (gdk.gameInfo.requireIndiaSPSPay) {
				this._payFlow = new PayOutsideGamepind.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			} else {
				this._payFlow = new PayInApp.PayFlow()
				this._payFlow['_status'] = this._status
				this._payFlow.initConfig(this._parent)
			}
		}

		initListener(onShow?: (callback: Function) => void) {
			let payFlow = this.getPayFlow()
			if (payDeps.isUserDealingOrder()) {
				log.info('手动激活补单的设置下不添加跳转补单监听')
			} else {
				if (onShow) {
					log.info('设置自定义补单监听')
					onShow(() => {
						if ((!payFlow.isPayCallbackValid)) {
							// 小程序跳转支付和客服跳转支付才需要每次切换回来补单
							this.pullDiffOrders(() => { })
						}
					})
				} else {
					log.info('设置补单监听')
					gdk.onShow!(() => {
						log.info('程序切回前台 payflow', gdk.gameInfo.requireMiniAppPay, gdk.gameInfo.requireCustomServicePay)
						if ((!payFlow.isPayCallbackValid)) {
							// 小程序跳转支付和客服跳转支付才需要每次切换回来补单
							this.pullDiffOrders(() => { })
						}
					})
				}
			}

		}

		// 校验历史订单
		public pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions) {
			options = options || {}

			{
				// 小游戏不存在多种支付，走单payFlow的补单
				let payFlow = this.getPayFlow()
				return payFlow.pullDiffOrders(successCallback, failCallback, options)
			}
		}

		/**
		 * 支付
		 * @@export
		 * @param config 配置信息
		 * @param callback 支付成功回调
		 */
		public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {
			{
				if (payDeps.checkRealNameVerify()) {
					config.payWay = config.payWay || (this._parent.channelId as PayWay)
					let payFlow = this.getPayFlow(config.payWay)
					return payFlow.payment(config, successCallback, failCallback)
				} else {
					if (failCallback) {
						failCallback()
					}
				}
			}
		}

		/**
		 * 检查充值是否已经购买
		 * @@export
		 * @param config 配置信息
		 */
		public isItemBoughtEver(config: RechargeConfigRow): boolean {
			let payFlow = this.getPayFlow()
			return payFlow.isItemBoughtEver(config)
		}

		public get orderRecordList(): OrderRecordExported[] {
			let payFlow = this.getPayFlow()
			return payFlow.orderRecordList
		}

	}
}
