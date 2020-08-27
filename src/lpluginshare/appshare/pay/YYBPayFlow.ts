
namespace AppShare.PayFlow.YYBPayFlow {

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

    export class YYBPayRequests extends GDK.PayFlow.PayRequestsNormal {

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
            let path = "yyb/synchronizeYybOrder"
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
            let path = "yyb/getYybOrderList"

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
	 * 应用宝app渠道
     * - 针对 YYB 渠道支付在安卓平台特有的一些问题等进行定制
	 */
    export class PayFlow extends GDK.PayFlow.APayBase.PayFlow {
        payFlowName = "YYBPayFlow"


        /** 重载支付网络请求 */
        payNetClient = new YYBPayRequests()

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

        public pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function) {
            log.info('YYBPayFlow: 开始校验订单历史')
            let onMergeFailed = () => {
                try {
                    log.warn('YYBPayFlow: 校验历史订单失败')
                    let ___unused = failCallback && failCallback()
                } catch (e) {
                    log.error('YYBPayFlow: 校验历史订单失败,失败回调内异常')
                    log.error(e)
                }
            }
            const makeupResult: MakeupOrdersResult = {
                isDiffExist: false,
                isMergeOk: false,
            }
            let onMergeSucceed = () => {
                try {
                    let ___unused = successCallback && successCallback(makeupResult)
                } catch (e) {
                    log.warn('合并历史差异订单成功,成功回调内处理失败')
                    log.error(e)
                }
            }

            if (!(this._parent && this._parent.chargeconfig)) {
                log.error("未配置商品配表")
                onMergeFailed()
                return
            }

            let time = this.getLastOrdersSyncTime()
            log.info('YYBPayFlow: 订单检查点时间:', time)
            log.info('YYBPayFlow本地订单:', this.getPrettyLocalRechargeRecords())
            this.reqDiffOrderList({ time: time, }, (diffList) => {
                log.info('reqDiffOrderList success', time, diffList)

                // 过滤掉谷歌支付和ios支付等需要消耗中间物品的订单
                diffList = diffList.filter(info => info.purchaseToken == null)

                // for(let info of diffList){
                // 	info.state=OrderState.ok
                // }

                let mergeOk: boolean = false
                try {
                    this.mergeOrderList(diffList, { isMakingUpOrder: true }, (result, diffExist, needSync) => {
                        log.info('YYBPayFlow: mergeOrderList success', diffList)
                        log.info('YYBPayFlow: 合并后本地订单:', this.getPrettyLocalRechargeRecords())

                        mergeOk = true
                        makeupResult.isMergeOk = mergeOk
                        makeupResult.isDiffExist = diffExist

                        onMergeSucceed()

                        this.updateLastOrdersSyncTime()

                        if (needSync) {
                            log.info('YYBPayFlow: 校验前后存在要补发的差异,需要上传存档')
                            this.syncStorage()
                        } else {
                            log.info('YYBPayFlow: 本次订单校验,没有生成要补发的差异订单,不上传存档')
                            payDeps.storage.saveToLocalStorage();//立即同步保存
                        }

                    }, () => {
                        log.info('mergeOrderList failed', diffList)
                        onMergeFailed()
                    })
                } catch (e) {
                    log.error('YYBPayFlow: 合并订单历史出现异常,合并结果:', mergeOk)
                    log.error(e)
                    if (!mergeOk) {
                        onMergeFailed()
                    } else {
                        // 已经调用过 onMergeSucceed()
                    }
                }
            }, () => {
                log.info('YYBPayFlow: reqDiffOrderList failed', time)
                onMergeFailed()
            })
        }

        // 请求订单清单
        reqDiffOrderList({ time }: { time: number }, successCallback: (result: OrderInfo[]) => void, failCallback?: Function) {
            log.info('YYBPayFlow: queryItemInfo')
            payDeps.api.queryItemInfo({ payWay: "YYBPay", productId: "xxxx" }).then((ret) => {
                if (ret.code == 0) {
                    this.payNetClient.orderReqDiffOrderList({
                        time: time,
                        openKey: payDeps.api.userData.openKey,
                        purchaseData: { "payType": ret.data.productId, "token": ret.data.purchaseToken, "pf": ret.data.purchaseData, "pf_key": ret.data.dataSignature },
                    }, (data) => {
                        if (data.succeed) {
                            let recordInfos = data.data
                            successCallback(recordInfos)
                        } else {
                            failCallback()
                        }
                    }, false, () => {
                        failCallback()
                    })
                }
            })

        }
    }

    payFlowManager.registerPayFlow("YYBPayFlow", PayFlow)
}
