
namespace AppShare.PayFlow.GooglePayFlow {

    const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

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

    export class GooglePayRequests extends GDK.PayFlow.PayRequestsNormal {

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
            let path = "order/gg/synchronizeGGOrder"
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
            let path = "order/getOrderList"

            this.client.request(path, data, (data) => {
                // if (true) {
                //     data.succeed = true
                //     data.code = 0
                //     data.data = [
                //         { createTime: 1530360114000, goodsId: 1, id: null, outTradeNo: "20002_209_1530360114388", quantity: 1, state: 1, time: 1530360114000, title: "com.farm.p60", userId: 209 }
                //     ]
                // }
                callback(data);
            }, { modal: modal, errorCallback: errorCallback })
        }
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
	 * GoogleApp 渠道
     * - 针对 GoogleApp 渠道支付在安卓平台特有的一些问题等进行定制
	 */
    export class PayFlow extends GDK.PayFlow.PayInsideLocalV2.PayFlow {
        payFlowName = "GooglePayFlow"

        /** 重载支付网络请求 */
        payNetClient = new GooglePayRequests()

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
