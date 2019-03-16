
namespace AppGDK {

	const paylog = Common.paylog

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI

		payPurchase(config: GDK.PayItemInfo): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			let sku = config.productId
			SDKProxy.nativePay.requestPay({ sku: sku }).then((payret) => {
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

	}
}