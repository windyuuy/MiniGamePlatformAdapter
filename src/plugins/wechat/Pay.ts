
namespace WechatGDK {
	const devlog = Common.paylog

	const checkEssentialParam = (options: { [key: string]: any }, keys: string[]) => {
		if (!options || (typeof (options) != 'object')) {
			console.error("校验无效选项表", options)
			return
		}
		try {
			for (const key of keys) {
				const value = options[key]
				if (value == undefined || value == null || value == '') {
					console.error(`可能缺少必要参数 ${key}，当前值：${value}`)
				}
			}
		} catch (e) {
			console.error(`校验选项失败`, options)
		}
	}

	type MiniAppPayLaunchParams = {
		appId: string,
		userId: number,
		goodsId: number,
		quantity: number,
		title: string,
		field: number,
		payUrl: string
		customExtra?: string,
	}

	export class Pay extends GDK.PayBase {
		api!: GDK.UserAPI

		protected payFlow: PayFlow.PayFlowMG
		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowMG().init(this.api)
			return this.payFlow
		}

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
				buyQuantity: config.amount,
			}
			devlog.info("requestMidasPayment", mp)
			wx.requestMidasPayment({
				mode: mp.mode,
				env: mp.env,
				offerId: mp.offerId,
				currencyType: mp.currencyType,
				platform: mp.platform,
				zoneId: mp.zoneId,
				buyQuantity: mp.buyQuantity,
				success: () => {
					devlog.info("微信充值成功", config)
					ret.success({
						result: {
							errCode: successCode,
						},
						extra: { errCode: successCode, state: GDK.OrderState.ok },
					})
				},
				fail: (res: { errCode: number }) => {
					if (res.errCode == 1) {
						devlog.info("微信充值取消", res, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
					} else {
						devlog.warn("微信充值失败", res, config)
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
			const field = zoneId
			const payUrl = options.payUrl || null

			// test
			// const myAppId = "wxcfc7f0661463ee36"
			// const miniAppOfferId = "wx013e541d77408fc3"
			// const userId = "1919"
			// const goodsId = 1
			// const quantity = 6
			// const title = "60钻石"
			// const field = 1

			const launchParams: MiniAppPayLaunchParams = {
				appId: myAppId,
				userId: userId,
				goodsId: goodsId,
				quantity: quantity,
				title: title,
				field: field,
				payUrl: payUrl,
			}
			const extraData = {
				launchParams: launchParams,
			}

			checkEssentialParam(launchParams, ['payUrl', 'appId'])

			const jpPath = `pages/payment/payment?appId=${myAppId}&userId=${userId}&goodsId=${goodsId}&quantity=${quantity}&title=${title}&field=${field}&payUrl=${payUrl}`
			const info = this.api.gameInfo
			let envVersion = 'release'
			if (info.mode == 'develop') {
				envVersion = 'develop'
			}
			if (info.payAppEnvVersion) {
				envVersion = info.payAppEnvVersion
			}

			devlog.info(`navigateToMiniProgram: { path: ${jpPath}, miniAppId: ${miniAppOfferId}, envVersion:${envVersion} }`, extraData)
			wx.navigateToMiniProgram({
				appId: miniAppOfferId,
				path: jpPath,
				envVersion: envVersion,
				extraData: extraData,
				success: () => {
					devlog.info("调起app成功", config)
					ret.success({
						result: {
							errCode: successCode,
						},
						extra: { errCode: successCode, state: GDK.OrderState.ok },
					})
				},
				fail: (res) => {
					devlog.warn("调起app失败", config)
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
						data: {
							extra: res
						}
					}))
				}
			})

			return ret.promise
		}

		payCustomService(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const successCode = 0

			const myAppId = this.api.gameInfo.appId
			const miniAppOfferId = this.api.gameInfo.miniAppOfferId
			const userId = this.api.userData.userId
			const goodsId = config.goodsId
			const quantity = config.amount
			const title = config.title
			const zoneId = slib.defaultValue(options.gleeZoneId, 1)
			const field = zoneId
			const payUrl = options.payUrl || null
			const subTitle = options.subTitle
			const imagePath = options.imagePath
			const customExtra = options.customExtra || null

			const launchParams: MiniAppPayLaunchParams = {
				appId: myAppId,
				userId: userId,
				goodsId: goodsId,
				quantity: quantity,
				title: title,
				field: field,
				payUrl: payUrl,
				customExtra: customExtra,
			}
			const extraData = {
				launchParams: launchParams,
			}

			checkEssentialParam(launchParams, ['payUrl', 'appId'])

			const jpPath = `../index/index?appId=${myAppId}&userId=${userId}&goodsId=${goodsId}&quantity=${quantity}&title=${title}&field=${field}&payUrl=${payUrl}&customExtra=${customExtra}`
			const info = this.api.gameInfo
			let envVersion = 'release'
			if (info.mode == 'develop') {
				envVersion = 'develop'
			}
			if (info.payAppEnvVersion) {
				envVersion = info.payAppEnvVersion
			}

			devlog.info(`openCustomerServiceConversation: { path: ${jpPath}, miniAppId: ${miniAppOfferId}, envVersion:${envVersion} }`, subTitle, imagePath, extraData)
			wx.openCustomerServiceConversation({
				sessionFrom: myAppId,
				showMessageCard: true,
				sendMessagePath: jpPath,
				sendMessageTitle: subTitle,
				sendMessageImg: imagePath,
				success: () => {
					devlog.info("调起客服支付成功", config)
					ret.success({
						result: {
							errCode: successCode,
						},
						extra: { errCode: successCode, state: GDK.OrderState.ok },
					})
				},
				fail: (res) => {
					devlog.warn("调起客服支付失败", config)
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
			} else if (options && options.channelType == 'customer_service') {
				return this.payCustomService(config, options)
			} else {
				return this.payOrigion(config, options)
			}
		}

	}
}