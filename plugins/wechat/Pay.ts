
namespace WechatGDK {
	const log = new GDKLIB.Log({ tags: ['api'] })
	export class Pay implements GDK.IPay {
		api?: GDK.UserAPI

		payPurchase(config: GDK.PayItemInfo): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const info = this.api.gameInfo
			const env = info.isPayInSandbox ? 1 : 0
			const successCode = 999999
			wx.requestMidasPayment({
				mode: "game",
				env: env,
				offerId: info.offerId,
				currencyType: config.currencyUnit || "CNY",
				platform: this.api.systemInfo.system,
				zoneId: "1",
				buyQuantity: config.money * 10,
				success: () => {
					log.info("微信充值成功", config)
					ret.success({
						result: {
							errCode: successCode,
						},
						extra: { errCode: successCode, state: GDK.OrderState.ok },
					})
				},
				fail: (res: { errCode: number }) => {
					if (res.errCode == 1) {
						log.info("微信充值取消", res, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
					} else {
						log.warn("微信充值失败", res, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
							data: {
								extra: res
							}
						}))
					}
				}
			})

			return ret.promise
		}

	}
}