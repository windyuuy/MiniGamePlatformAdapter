
namespace GDK.PayFlow.YYBPayFlow {

    const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 类似微信、玩一玩等内购支付流程
	 */
    export class PayFlow extends APayBase.PayFlow {
        payFlowName = "YYBPayFlow"

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
            gdk.queryItemInfo({ payWay: "YYBPay", productId: "xxxx" }).then((ret) => {
                if (ret.code == 0) {
                    payNetClient.orderReqDiffOrderList({
                        time: time,
                        gameId: gdk.gameInfo.gameId,
                        openKey: gdk.userData.openKey,
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
}
