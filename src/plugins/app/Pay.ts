
namespace AppGDK {

	const paylog = Common.paylog

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI

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
			SDKProxy.nativePay.requestPay({
				sku: sku,
				price: config.money,
				count: config.amount,
				currency: "dollar",
				channelAppId: config.channelAppId,
				packageValue: "Sign=WXPay",
				nonceStr: config.nonceStr,
				partnerId: config.partnerId,
				paySign: config.paySign,
				prepayId: config.prepayId,
				timestamp: config.timestamp,
				payWay: options.payWay,
				extraStr: config.extraStr,
				title: config.title,
				orderNo: config.orderNo
			}).then((payret) => {
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
			/*
			// 1. do wechat pay
			if (options.payWay == "WechatPay") {
				SDKProxy.nativePay.requestPay({
					sku: sku,
					price: config.money,
					count: 1,
					currency: "dollar",

					channelAppId: config.channelAppId,
					packageValue: "Sign=WXPay",
					nonceStr: config.nonceStr,
					partnerId: config.partnerId,
					paySign: config.paySign,
					prepayId: config.prepayId,
					timestamp: config.timestamp,
				}).then((payret) => {
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
			}

			// 2. aliPay
			else if (options.payWay == "AliPay") {
				paylog.info("alipay_requestPay")
				SDKProxy.nativePay.alipay_requestPay({
					sku: sku,
					price: config.price,
					count: 1,
					currency: "dollar",
					channelAppId: config.channelAppId,
					packageValue: "AliPay",
					nonceStr: config.nonceStr,
					partnerId: config.partnerId,
					paySign: config.paySign,
					prepayId: config.prepayId,
					timestamp: config.timestamp,
					aliOrderInfo: config.aliOrderInfo
				}).then((payret) => {
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
			}
			*/

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

			return SDKProxy.nativePay.queryItemInfo({ sku: params.productId })
		}

	}
}