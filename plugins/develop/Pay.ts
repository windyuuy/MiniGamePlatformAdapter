
namespace DevelopGDK {
	const log = new slib.Log({ tags: ['DevelopPay'] })
	export class Pay extends GDK.PayBase {

		payPurchase(config: GDK.PayItemInfo): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const ok = confirm("确定充值吗？\n" + JSON.stringify(config))
			if (ok) {
				log.info("模拟充值成功", config)
				ret.success({
					result: {
						errCode: 0,
					},
					extra: { errCode: 0, state: GDK.OrderState.ok },
				})
			} else {
				const cancel = confirm("确定取消充值吗？\n(点确定取消充值，点取消充值失败！)")
				if (cancel) {
					const res = {
						errCode: -1,
					}
					log.info("模拟充值取消", res, config)
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
				} else {
					const res = {
						errCode: 9999,
					}
					log.warn("模拟充值失败", res, config)
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
						data: {
							extra: res
						}
					}))
				}
			}

			return ret.promise
		}

	}
}