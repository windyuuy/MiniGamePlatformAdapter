
namespace WechatGDK {
	const log = new slib.Log({ tags: ['api-pay'] })

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI

		payOrigion(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const info = this.api.gameInfo
			const env = info.isPayInSandbox ? 1 : 0
			const successCode = 999999
			const zoneId = slib.defaultValue(options.wxZoneId, "1")
			const mp: wx.MidasPaymentParams = {
				mode: "game",
				env: env,
				offerId: info.offerId,
				currencyType: config.currencyUnit || "CNY",
				platform: 'android',
				zoneId: zoneId,
				buyQuantity: config.money * 10,
			}
			log.info("requestMidasPayment", mp)
			wx.requestMidasPayment({
				mode: mp.mode,
				env: mp.env,
				offerId: mp.offerId,
				currencyType: mp.currencyType,
				platform: mp.platform,
				zoneId: mp.zoneId,
				buyQuantity: mp.buyQuantity,
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

		protected _miniPayListener: Function
		payMiniApp(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const successCode = 0

			const myAppId = this.api.gameInfo.appId
			const miniAppOfferId = this.api.gameInfo.miniAppOfferId
			const userId = this.api.userData.userId
			const goodsId = config.goodsId
			const quantity = config.amount
			const title = config.title
			const zoneId = slib.defaultValue(options.gleeZoneId, 1)
			const extraData = {
				field: zoneId
			}

			// test
			// const myAppId = "wxcfc7f0661463ee36"
			// const miniAppOfferId = "wx013e541d77408fc3"
			// const userId = "1919"
			// const goodsId = 1
			// const quantity = 6
			// const title = "60钻石"
			// const extraData = {
			// 	field: 1
			// }

			const jpPath = `pages/payment/payment?appId=${myAppId}&userId=${userId}&goodsId=${goodsId}&quantity=${quantity}&title=${title}`
			const info = this.api.gameInfo
			let envVersion = 'release'
			if (info.payAppEnvVersion) {
				envVersion = info.payAppEnvVersion
			}

			log.info(`navigateToMiniProgram: { path: ${jpPath}, miniAppId: ${miniAppOfferId}, envVersion:${envVersion} }`, extraData)
			wx.navigateToMiniProgram({
				appId: miniAppOfferId,
				path: jpPath,
				envVersion: envVersion,
				extraData: extraData,
				success: () => {
					log.info("调起app成功", config)
					ret.success({
						result: {
							errCode: successCode,
						},
						extra: { errCode: successCode, state: GDK.OrderState.ok },
					})
				},
				fail: (res) => {
					log.warn("调起app失败", config)
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
						data: {
							extra: res
						}
					}))
				}
			})

			return ret.promise
		}

		payPurchase(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			if (options && options.channelType == 'miniapp') {
				return this.payMiniApp(config, options)
			} else {
				return this.payOrigion(config, options)
			}
		}

	}
}