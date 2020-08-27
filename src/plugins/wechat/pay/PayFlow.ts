
namespace WechatGDK.PayFlow {

	/**
	 * 自定义原生支付请求参数
	 */
	export interface CustomNativeAppPayParams extends GDK.PayItemInfo {
		/** 支付签名 */
		paySign?: string
		/** 商户id */
		partnerId?: string
		/** 随机字符串 */
		nonceStr?: string
		/** glee自定义商户id(客服跳转支付) */
		merchantId?: string
	}

    /**
     * 自定义订单信息
     */
	export interface CustomNetOrderInfo extends GDK.PayFlow.NetOrderInfo {
		sign?: string;
		accessKey?: string;
		vivoOrderNumber?: string;
		prepayId?: string;
		appid?: string;
		mch_id?: string;
		nonce_str?: string;
		accountId?: string;
		amount?: string;
		game_sign?: string;
	}

	/**
	 * 针对小游戏平台
	 */
	export class CustomPayOutside extends GDK.PayFlow.PayOutside.PayFlow {
		get isPayCallbackValid(): boolean {
			return false
		}

		get requireCustomServicePay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireCustomServicePay)
		}

		get requireMiniAppPay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireMiniAppPay)
		}

		/** 重载支付网络请求 */
		payNetClient = new CustomPayRequests()

        /**
		 * 包装调起原生支付的参数
		 * @param config 
		 * @param orderInfo 
		 */
		protected wrapPayAPICallParams(config: PaymentParams, orderInfo: CustomNetOrderInfo): GDK.PayItemInfo {
			const item: RechargeConfigRow = config

			let extraStr = ""
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
				partnerId: orderInfo.mch_id,
				nonceStr: orderInfo.nonce_str,
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