
namespace OPPOGDK.PayFlow {

	/**
	 * 自定义原生支付请求参数
	 */
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
	}

    /**
     * 自定义订单信息
     */
	export interface CustomNetOrderInfo extends GDK.PayFlow.NetOrderInfo {
		sign?: string;
		accessKey?: string;
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
	export class CustomPayInApp extends GDK.PayFlow.PayInAppWithAutoMakeup.PayFlow {
		get isPayCallbackValid(): boolean {
			return false
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
				orderNo: orderInfo.platOrderNo,
				timestamp: orderInfo.timeStamp || orderInfo.createTime,
				prepayId: orderInfo.prepayId,
				channelAppId: orderInfo.appid,
				partnerId: orderInfo.mch_id,
				nonceStr: orderInfo.nonce_str,
				notifyUrl: orderInfo.notifyUrl,
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

			let channelType: GDK.ChannelType = "origion"

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