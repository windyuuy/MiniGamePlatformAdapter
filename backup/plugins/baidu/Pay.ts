
namespace BaiduGDK {
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

	export interface PayItemInfoExt extends GDK.PayItemInfo {

		/** oppo包名 */
		pkgName?: string
		/** oppo登录返回的token */
		token?: string
		/** 支付签名 */
		paySign?: string
		/** 游戏在oppo快游戏的id */
		oppoId?: string
		/** 游戏在该平台的appid */
		channelAppId?: string
		merchantId?: string
		/** 手q后台生成的预支付id */
		prepayId?: string

		/** 商户id */
		partnerId?: string
		/** 随机字符串 */
		nonceStr?: string
		/** vivo订单信息 */
		vivoOrderInfo?: string
		/** 支付宝支付特有 */
		extraStr: string
		/** aligame accountId */
		accountId?: string;
		/** aligame aliamount */
		aliamount?: string;
		/** xiao7 game sign */
		gameSign?: string;
	}

	export class Pay extends GDK.PayBase {
		api!: GDK.UserAPI

		protected payFlow: PayFlow.PayFlowProxy
		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowProxy().init(this.api)
			return this.payFlow
		}


		payOrigion(config: PayItemInfoExt, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const info = this.api.gameInfo
			const successCode = 999999
			const orderInfo: swan.BaiduOrderParams = {
				dealId: config.partnerId,
				appKey: info.appId,//		百度电商开放平台 appKey，用以表示应用身份的唯一 ID	
				totalAmount: "" + config.price,//		订单金额
				tpOrderId: config.gleeOrderNo,//		商户平台自己记录的订单 ID
				dealTitle: config.title,//		订单的名称。	
				signFieldsRange: 1,//		固定值 1。	
				rsaSign: config.paySign//	对 appKey，dealId，tpOrderId，totalAmount RSA 加密后的签名
			}
			devlog.info("requestMidasPayment", orderInfo)
			swan.requestPolymerPayment({
				orderInfo: orderInfo,
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

		protected get miniAppOfferId(){
			return this.api.getAppInfoString(AppInfoKeys.miniAppOfferId, "")
		}

		protected get payAppEnvVersion() {
			return this.api.getAppInfoString(AppInfoKeys.payAppEnvVersion, "")
		}

		protected _miniPayListener: Function
		payMiniApp(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const successCode = 0

			const myAppId = this.api.gameInfo.appId
			const miniAppOfferId = this.miniAppOfferId
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
			if (this.payAppEnvVersion) {
				envVersion = this.payAppEnvVersion
			}

			devlog.info(`navigateToMiniProgram: { path: ${jpPath}, miniAppId: ${miniAppOfferId}, envVersion:${envVersion} }`, extraData)
			swan.navigateToMiniProgram({
				appKey: miniAppOfferId,
				path: jpPath,
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
			const miniAppOfferId = this.miniAppOfferId
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
			if (this.payAppEnvVersion) {
				envVersion = this.payAppEnvVersion
			}

			devlog.info(`openCustomerServiceConversation: { path: ${jpPath}, miniAppId: ${miniAppOfferId}, envVersion:${envVersion} }`, subTitle, imagePath, extraData)
			swan.openCustomerServiceConversation({
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

		payPurchase(config: PayItemInfoExt, options: GDK.PayOptions): Promise<GDK.PayResult> {
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