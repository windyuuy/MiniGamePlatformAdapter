
namespace WechatGDK.PayFlow {

	const mdebug = (window as any)['wdebug'] && true
	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	type IPayFlow = GDK.PayFlow.IPayFlow
	type Parent = GDK.PayFlow.Parent
	type PayWay = GDK.PayFlow.PayWay
	const PayInApp = GDK.PayFlow.PayInApp
	type OrderInfo = GDK.PayFlow.OrderInfo

	const payDeps = GDK.PayFlow.payDeps

	type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	type PaymentParams = GDK.PayFlow.PaymentParams
	type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	type OrderRecordExported = GDK.PayFlow.OrderRecordExported
	type GenOrderParams = GDK.PayFlow.GenOrderParams
	type CheckOrderStateParams = GDK.PayFlow.CheckOrderStateParams
	type ReqDiffOrderListParams = GDK.PayFlow.ReqDiffOrderListParams
	type OrderInfoRaw = GDK.PayFlow.OrderInfoRaw

	export interface CustomNativeAppPayParams extends GDK.PayItemInfo {
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


	export class WechatPayRequests extends GDK.PayFlow.PayRequestsNormal {

		get requireCustomServicePay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireCustomServicePay)
		}

		get requireMiniAppPay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireMiniAppPay)
		}

		/**
		 * 请求服务器生成订单
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderGenOrder(
			data: GenOrderParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: OrderInfo, //订单信息
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			(async () => {
				let path = 'order/createOrder'
				this.client.request(path, data, (data) => {
					if (data.succeed && (data.data instanceof Object)) {
						data.data.time = data.data.createTime
					}

					if (data.code == 800) {
						payDeps.api.showAlert({ okLabel: "确定", content: data.message, title: "提示" })
					}

					callback(data);
				}, { modal: modal, errorCallback: errorCallback })
			})();
		}

		/**
		 * 检查订单状态
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderCheckOrderState(
			data: CheckOrderStateParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: 0 | 1//0未充值 1已充值
			}) => void, modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			let path = "order/wx/synchronizeWxOrder"
			this.client.request(path, data, (data) => {
				if (payDeps.api.pluginName == "develop") {
					// 浏览器上模拟测试充值
					data.succeed = true
					data.code = 0
					data.data = Math.random() < 0.9 ? 1 : 2
				}
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
		 * 请求历史差异订单
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderReqDiffOrderList(
			data: ReqDiffOrderListParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: OrderInfoRaw[], // 历史订单列表
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			const pluginPathMap = {
				'wechat': {
					normal: "order/wx/getWxOrderList",
					thirdApp: "order/getOrderList",
				},
			}
			let path = pluginPathMap.wechat.normal
			if (this.requireMiniAppPay || this.requireCustomServicePay) {
				path = pluginPathMap.wechat.thirdApp
				data.state = 1
			}

			this.client.request(path, data, (data) => {
				// if (true) {
				//     data.succeed = true
				//     data.code = 0
				//     data.data = [
				//         { createTime: 1530360114000, goodsId: 1, id: null, outTradeNo: "20002_209_1530360114388", quantity: 1, state: 1, time: 1530360114000, title: "com.farm.p60", userId: 209 }
				//     ]
				// }
				if (data.succeed && (data.data instanceof Array)) {
					for (let info of data.data) {
						info.time = info.createTime
						if (info.extra) {
							try {
								info.extra = JSON.parse(info.extra)
								info.purchaseToken = info.extra.purchaseToken
							} catch (e) {
								console.error("orderReqDiffOrderList::parse extra failed:", info.extra)
							}
						}
					}
				}
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}
	}

	/**
	 * 针对小游戏平台
	 */
	export class WechatPayOutside extends GDK.PayFlow.PayOutside.PayFlow {
		get isPayCallbackValid(): boolean {
			return false
		}

		get requireCustomServicePay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireCustomServicePay)
		}

		get requireMiniAppPay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireMiniAppPay)
		}

		payNetClient = new WechatPayRequests()

        /**
		 * 包装调起原生支付的参数
		 * @param config 
		 * @param orderInfo 
		 */
		protected wrapPayAPICallParams(config: PaymentParams, orderInfo: any): GDK.PayItemInfo {
			const item: RechargeConfigRow = config

			let extraStr = orderInfo.alipayOrderInfo
			const params: CustomNativeAppPayParams = {
				goodsId: item.id,
				coinId: item.coinId,
				productId: item.productId,
				money: item.money,
				price: item.price,
				amount: item.amount,
				title: item.title,
				gleeOrderNo: orderInfo.outTradeNo,
				paySign: orderInfo.sign || orderInfo.accessKey,
				orderNo: orderInfo.platOrderNo || orderInfo.vivoOrderNumber,
				timestamp: orderInfo.timeStamp || orderInfo.createTime,
				prepayId: orderInfo.prepayId,
				channelAppId: orderInfo.appid,
				partnerId: orderInfo.mch_id,
				nonceStr: orderInfo.nonce_str,
				extraStr: extraStr,
				vivoOrderInfo: orderInfo.vivoOrderNumber,
				accountId: orderInfo.accountId,
				notifyUrl: orderInfo.notifyUrl,
				aliamount: orderInfo.amount,
				gameSign: orderInfo.game_sign
			}
			return params
		}

		/**
		 * 包装调起原生支付时需要的一些定制选项
		 * @param config 
		 * @param orderInfo 
		 */
		protected wrapPayAPICallOptions(config: PaymentParams, orderInfo: any): GDK.PayOptions {
			const options = config.options || {}
			const gleeZoneId = options.gleeZoneId
			const subTitle = options.subTitle
			const imagePath = options.imagePath
			const gameOrientation = slib.defaultValue(options.gameOrientation, 1)
			const payUrl: string = slib.defaultValue(options.payUrl, options.payUrl)
			const customExtra: string = slib.defaultValue(options.customExtra, null)

			let channelType: GDK.ChannelType
			if (this.requireCustomServicePay) {
				channelType = "customer_service"
			} else if (this.requireMiniAppPay) {
				channelType = "miniapp"
			} else {
				channelType = "origion"
			}

			var nativePayInfo: GDK.PayOptions = {
				gameOrientation: gameOrientation,
				payWay: config.payWay,
				channelType: channelType,
				gleeZoneId: gleeZoneId,
				payUrl: payUrl,
				subTitle: subTitle,
				imagePath: imagePath,
				customExtra: customExtra,
			}

			return nativePayInfo
		}

	}

}