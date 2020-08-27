
namespace AppShare.PayFlow.GooglePayFlow {

    const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

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

	/**
	 * GoogleApp 渠道
     * - 针对 GoogleApp 渠道支付在安卓平台特有的一些问题等进行定制
	 */
    export class PayFlow extends GDK.PayFlow.PayInsideLocalV2.PayFlow {
        payFlowName = "GooglePayFlow"

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

    }

    payFlowManager.registerPayFlow("GooglePayFlow", PayFlow)
}
