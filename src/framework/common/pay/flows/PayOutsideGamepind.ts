
namespace GSSDK.PayFlow.PayOutsideGamepind {

    const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
	 */
    export class PayFlow extends APayBase.PayFlow {

        payFlowName = "PayOutsideWithOrder"

        get isPayCallbackValid(): boolean {
            return false
        }

        // 请求服务器创建并回发订单信息
        genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function) {
            payNetClient.orderGenOrder({
                payWay: config.payWay,
                price: config.price,
                priceCNY: config.priceCNY,
                priceUSD: config.priceUSD,
                quantity: config.money,
                goodsId: config.id,
                title: config.title,
                districtId: extra && extra.customExtra || null,
                itemId: this.getCoinId(config),
                qqGoodid: config.productId,
                token: (gdk.userData as any).token,
                // channelId: this._parent.channelId,
                extra: extra,
                others: { redirectUrl: (gdk.userData as any).ext1, deviceId: (gdk.userData as any).ext2 }
            }, data => {
                if (data.succeed) {
                    log.info("gamepind: 订单获取成功", data)
                    successCallback(data.data)
                } else {
                    failCallback()
                    if (gdk.pluginName === "oppo") {
                        log.info("oppo请求订单失败")
                        if (data.code && data.code == 501) {
                            log.info("oppo 重新登录")
                            // oppo 游客账号需要登录
                            let res = payDeps.login()
                        }
                    }

                }
            }, true, (err, retry) => {
                log.info("请求订单失败", err);
                failCallback()
            })
        }

		/**
		 * app内sdk支付
		 * @param config 配置信息
		 * @param successCallback 支付成功回调
		 * @param failCallback
		 */
        public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {

            log.info('开始充值', config)

            this.enableRechargeBlock()

            const options = config.options || {}
            const customExtra = slib.defaultValue(options.customExtra, null)
            const customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}")

            let curOrderInfo: OrderInfo = null

            let onPayFailed = () => {
                this.disableRechargeBlock()
                try {
                    log.warn('支付不成功')
                    let ___unused = failCallback && failCallback()
                } catch (e) {
                    log.error('支付失败,失败回调内异常')
                    log.error(e)
                }
            }

            let onPayOk = () => {
                this.disableRechargeBlock()
                try {
                    log.info('支付成功')
                    let ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo })
                } catch (e) {
                    log.warn('购买成功,成功回调内处理失败')
                    log.error(e)
                }
            }

            // ApiPay支付成功/校验前后有差异,则需要备份
            let needBackUp = false

            let onContinueFailed = () => {
                onPayFailed()
            }

            let onContinueOk = (needSync: boolean) => {

                if (needBackUp) {
                    // pass
                    if (needSync) {
                        // 支付成功后,缺回滚的情况
                        // 已经回调过成功,不作回滚处理
                        // pass
                    } else {
                        // 支付成功,服务器扣款成功
                        // 已经回调过成功,不作其他处理
                        // pass
                    }
                } else {
                    if (needSync) {
                        // 支付失败,扣款成功
                        onPayOk()
                    } else {
                        // 支付失败,扣款失败
                        // 充值失败
                        onPayFailed()
                    }
                }
            }

            this.genOrder(config, {
                customExtra,
                customJsonExtra,
                payWay: config.payWay,
            }, (orderInfo) => {
                let orderno: string = orderInfo.outTradeNo
                let time: number = orderInfo.time
                log.info('genOrder success', orderno)

                curOrderInfo = orderInfo
                this.saveOrder(orderInfo, config)

                const checkRechargeOrder = (orderno: string, extra: wxPayState, config: RechargeConfigRow) => {
                    onPayOk();
                }

                this.commitPayLog('OnPayStart', config, orderInfo)
                this.payAPICall(config, orderInfo, (extra: wxPayState) => {
                    log.info('payApiPay success，支付api调起成功，但是该回调结果不可信，将一律回调失败，通过补单发放奖励。', orderno)
                    checkRechargeOrder(orderno, extra, config)
                }, (extra: wxPayState) => {
                    log.info('payApiPay failed', orderno)

                    onContinueFailed()
                })

            }, () => {
                log.info('genOrder failed: 创建订单失败')
                onPayFailed()
            })
        }

    }
}
