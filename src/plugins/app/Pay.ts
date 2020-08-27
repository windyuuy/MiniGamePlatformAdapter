
namespace AppGDK {

	const paylog = Common.paylog

	export class Pay extends GDK.PayBase {
		protected payFlow: PayFlow.PayFlowMG

		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowMG().init(this.api)
			return this.payFlow
		}

		api!: GDK.UserAPI

		payPurchase(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()
			let sku = config.productId
			if (!sku) {
				const msg = 'payPurchase: productId 为空， 原生app需要传入productId'
				paylog.error(msg)
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
					message: msg
				}))
				return ret.promise
			}

			let payParams: NativePayParams = {
				productId: sku,
				sku: sku,
				price: config.money,
				count: config.amount,
				// 默认用 "dollor" 仅仅为了兼容历史遗留问题
				currency: config.currencyUnit || "dollor",
				gleeOrderNo: config.gleeOrderNo,
				payUrl: options.payUrl,
				payWay: options.payWay,
				notifyUrl: config.notifyUrl,
				timestamp: config.timestamp,
				title: config.title,
				orderNo: config.orderNo,
			}
			for (let key in config) {
				if (payParams[key] == null) {
					payParams[key] = config[key]
				}
			}
			for (let key in options) {
				if (payParams[key] == null) {
					payParams[key] = options[key]
				}
			}


			SDKProxy.nativePay.requestPay(payParams).then((payret) => {
				if (payret.code == 0) {
					paylog.info("原生充值成功", config)
					ret.success({
						result: {
							errCode: 0,
						},
						extra: payret,
					})
				} else {
					if (payret.code == AppGDK.PayErrorCode.PURCHASE_CANCELLED) {
						paylog.info("原生充值取消", payret, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
					} else {
						paylog.warn("原生充值失败", payret, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
							data: {
								extra: payret
							}
						}))
					}
				}
			}, (payret) => {
				ret.fail(payret)
			})
			
			return ret.promise
		}


		/**
		 * 消耗商品
		 */
		async consumePurchase?(params: GDK.ConsumePurchaseParams): Promise<GDK.ConsumePurchaseResult> {
			return SDKProxy.nativePay.consumePurchase(params)
		}
		/**
		 * 获取未消耗商品列表
		 */
		async queryItemInfo?(params: GDK.PayQueryItemInfoParams): Promise<GDK.PayQueryItemInfoResult> {

			let sku = params.productId
			if (!sku) {
				const msg = 'queryItemInfo: productId 为空， 原生app需要传入productId'
				paylog.error(msg)
				const ret = new GDK.RPromise<GDK.PayQueryItemInfoResult>()
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_QUERYITEMINFO_FAILED, {
					message: msg
				}))
				return ret.promise
			}

			return SDKProxy.nativePay.queryItemInfo({ sku: params.productId, productId: params.productId })
		}

	}
}