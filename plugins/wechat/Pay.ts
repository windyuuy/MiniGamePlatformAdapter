
namespace WechatGDK {
	const log = new slib.Log({ tags: ['api'] })
	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI

		payOrigion(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
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

		protected _miniPayListener: Function
		payMiniApp(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const successCode = 0
			const appid = this.api.gameInfo.appId
			const userId = this.api.userData.userId
			const jpPath = `pages/payment/payment?appId=${appid}&userId=${userId}&goodsId=${config.goodsId}&quantity=${config.amount}&title=${config.title}`
			const miniAppOfferId = this.api.gameInfo.miniAppOfferId
			let envVersion: string = this.api.gameInfo.mode
			if (envVersion == 'test') {
				envVersion = 'trial'
			}
			envVersion = 'release'

			log.info(`navigateToMiniProgram: { path: ${jpPath}, appId: ${miniAppOfferId}, envVersion:${envVersion} }`)
			wx.navigateToMiniProgram({
				appId: miniAppOfferId,
				path: jpPath,
				envVersion: envVersion,
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