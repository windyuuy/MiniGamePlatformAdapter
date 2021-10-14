
namespace AppV2GDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	type IPayFlow = GDK.PayFlow.IPayFlow
	type PayFlowStatus = GDK.PayFlow.PayFlowStatus
	type Parent = GDK.PayFlow.Parent
	type PayWay = GDK.PayFlow.PayWay
	const PayInsideLocalV2 = GDK.PayFlow.PayInsideLocalV2

	const payDeps = GDK.PayFlow.payDeps

	type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	type PaymentParams = GDK.PayFlow.PaymentParams
	type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	type OrderRecordExported = GDK.PayFlow.OrderRecordExported

	const payFlowManager = AppShare.PayFlow.payFlowManager

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	export class PayFlowProxy extends GDK.PayFlow.PayFlowProxyBase {

		/**
		 * 根据 PayWay 获取对应 PayFlow 的 map
		 */
		protected payWay2PayFlowMap = {
			WechatPay: "WechatPayFlow",
			AliPay: "AliPayPayFlow",
			AliGameAppPay: "AliGameAppPayFlow",
			BaiduAppPay: "BaiduAppPayFlow",
			VivoAppPay: "VivoAppPayFlow",
			YYBPay: "YYBPayFlow",
			meituAppPay: "MeituAppPayFlow",
			GooglePay: "GooglePayFlow",
			IosPay: "IosPayFlow",
			UnifiedSdk: "UnifiedSdkPayFlow",
			xiao7: "Xiao7PayFlow",
			OppoApp: "OppoAppPayFlow",
		}

		get payFlowName(): string {
			return this.getPayFlow().payFlowName
		}

		protected _appPayFlowMap: { [index: string]: IPayFlow } = {}
		protected getPayFlow(payWay: string = "WechatPay"): IPayFlow {
			return this._appPayFlowMap[payWay]
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
				// this._appPayFlowMap["WechatPay"] = payFlowManager.createPayFlow("WechatPayFlow")
				// this._appPayFlowMap["AliPay"] = payFlowManager.createPayFlow("AliPayFlow")
				// this._appPayFlowMap["AliGameAppPay"] = payFlowManager.createPayFlow("AliGameAppPayFlow")
				// this._appPayFlowMap["BaiduAppPay"] = payFlowManager.createPayFlow("BaiduAppPayFlow")
				// this._appPayFlowMap["VivoAppPay"] = payFlowManager.createPayFlow("VivoAppPayFlow")
				// this._appPayFlowMap["YYBPay"] = payFlowManager.createPayFlow("YYBPayFlow")
				// this._appPayFlowMap["meituAppPay"] = payFlowManager.createPayFlow("MeituAppPayFlow")
				// this._appPayFlowMap["GooglePay"] = payFlowManager.createPayFlow("GooglePayFlow")
				// this._appPayFlowMap["IosPay"] = payFlowManager.createPayFlow("IosPayFlow")
				// this._appPayFlowMap["UnifiedSdk"] = payFlowManager.createPayFlow("UnifiedSdkPayFlow")
				// this._appPayFlowMap["xiao7"] = payFlowManager.createPayFlow("Xiao7PayFlow")
				// this._appPayFlowMap["OppoApp"] = payFlowManager.createPayFlow("OppoAppPayFlow")
				for (let key in this.payWay2PayFlowMap) {
					this._appPayFlowMap[key] = payFlowManager.createPayFlow(this.payWay2PayFlowMap[key])
				}

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

		/**
		 * 支付
		 * @@export
		 * @param config 配置信息
		 * @param callback 支付成功回调
		 */
		public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {
			config.payWay = config.payWay || (this._parent.channelId as PayWay)
			let payFlow = this.getPayFlow(config.payWay)
			return payFlow.payment(config, successCallback, failCallback)
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
