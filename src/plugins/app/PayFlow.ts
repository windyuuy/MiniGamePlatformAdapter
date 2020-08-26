
namespace AppGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	type IPayFlow = GDK.PayFlow.IPayFlow
	type PayFlowStatus = GDK.PayFlow.PayFlowStatus
	type Parent = GDK.PayFlow.Parent
	type PayWay = GDK.PayFlow.PayWay
	const PayInApp = GDK.PayFlow.PayInApp
	const PayInAppWithAutoMakeup = GDK.PayFlow.PayInAppWithAutoMakeup
	const YYBPayFlow = GDK.PayFlow.YYBPayFlow
	const PayInsideLocalV2 = GDK.PayFlow.PayInsideLocalV2

	const payDeps = GDK.PayFlow.payDeps

	type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	type PaymentParams = GDK.PayFlow.PaymentParams
	type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	type OrderRecordExported = GDK.PayFlow.OrderRecordExported

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	export class PayFlowMG extends GDK.PayFlow.PayFlowMGBase {

		get payFlowName() {
			let payFlow = this.getPayFlow("WechatPay")
			return payFlow.payFlowName
		}

		protected _payFlow!: IPayFlow
		protected _appPayFlowMap: { [index: string]: IPayFlow } = {}
		getPayFlow(payWay: string = "WechatPay"): IPayFlow {
			if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
				if (gdk.nativeVersion <= 0) {
					return this._appPayFlowMap["NativeVersionLessThan0"];
				} else {
					return this._appPayFlowMap[payWay]
				}
			} else {
				return this._payFlow
			}
		}

		get isPayCallbackValid(): boolean {
			let payFlow = this.getPayFlow()
			return payFlow.isPayCallbackValid
		}

		initConfig(parent: Parent) {
			this._parent = parent

			GDK.PayFlow.payStatistic.enableNativeLog = false
			GDK.PayFlow.payStatistic.enableGSLog = false

			{
				// 统一格式为payWays
				let payWays: PayWay[] = []
				if (this._parent.payWays instanceof Array) {
					payWays = payWays.concat(this._parent.payWays)
				}
				if (this._parent.channelId != null && (payWays.indexOf(this._parent.channelId) < 0)) {
					payWays.push((this._parent.channelId as PayWay))
				}

				if (payWays.length <= 0) {
					for (let i = 0; i < 200; i++) {
						log.error("未配置 payWays, 请在initConfig中配置payWays，例如：`initConfig({payWays:['GooglePay','WechatPay',......]})`")
						log.error('未配置任何有效payWay，默认设置payWays为GooglePay和IosPay')
					}
					payWays.push('GooglePay')
					payWays.push('IosPay')
				}

				this._parent.payWays = payWays
			}

			{
				console.log("nativeVersion:", gdk.nativeVersion)

				this._appPayFlowMap["WechatPay"] = new PayInApp.PayFlow()
				this._appPayFlowMap["AliPay"] = new PayInAppWithAutoMakeup.PayFlow()

				this._appPayFlowMap["AliGameAppPay"] = new PayInAppWithAutoMakeup.PayFlow()
				this._appPayFlowMap["BaiduAppPay"] = new PayInApp.PayFlow()
				this._appPayFlowMap["VivoAppPay"] = new PayInApp.PayFlow()
				this._appPayFlowMap["YYBPay"] = new YYBPayFlow.PayFlow()
				this._appPayFlowMap["meituAppPay"] = new PayInApp.PayFlow()
				this._appPayFlowMap["GooglePay"] = new PayInsideLocalV2.PayFlow()
				this._appPayFlowMap["IosPay"] = new PayInsideLocalV2.PayFlow()
				this._appPayFlowMap["UnifiedSdk"] = new PayInAppWithAutoMakeup.PayFlow()
				this._appPayFlowMap["xiao7"] = new PayInAppWithAutoMakeup.PayFlow()
				this._appPayFlowMap["OppoApp"] = new PayInApp.PayFlow()
				for (let k in this._appPayFlowMap) {
					let payFlow = this._appPayFlowMap[k]
					payFlow.initConfig(this._parent)
					payFlow['_status'] = this._status
				}
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
						log.info('程序切回前台 payflow')
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

			// let payFlow = this.getPayFlow()
			// return payFlow.pullDiffOrders(successCallback, failCallback)
			{
				let payWays = this._parent.payWays!
				let payFlows = payWays.map(thePayWay => this._appPayFlowMap[thePayWay])

				// 存在类似谷歌、ios支付的特殊补单流程
				let payInsideLocalV2 = payFlows.find(thePayFlow => {
					if (thePayFlow == null) {
						return false
					}
					return thePayFlow instanceof PayInsideLocalV2.PayFlow
				})
				// 存在普通补单流程
				let normalPayWay = payFlows.find(thePayFlow => {
					if (thePayFlow == null) {
						return false
					}
					return !(thePayFlow instanceof PayInsideLocalV2.PayFlow)
				})!

				if (payInsideLocalV2 != null && normalPayWay != null) {
					// 两种同时存在
					payInsideLocalV2.pullDiffOrders(() => {
						normalPayWay.pullDiffOrders(successCallback, failCallback, options)
					}, () => {
						let defaultfunc = () => { console.error("failCallback not defined") }
						normalPayWay.pullDiffOrders(failCallback || defaultfunc, failCallback, options)
					})
				} else if (payInsideLocalV2 != null) {
					payInsideLocalV2.pullDiffOrders(successCallback, failCallback, options)
				} else if (normalPayWay != null) {
					normalPayWay.pullDiffOrders(successCallback, failCallback, options)
				} else {
					for (let i = 0; i < 200; i++) {
						log.error('补单环节可能有异常，请检查初始化时 payWays 配置！！！')
					}
				}
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
