namespace GDK.PayFlow {

    const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

    export type ApplyOrderInfo = {
        /**
         * 订单信息
         */
        orderInfo: OrderInfo,
        /**
         * 购买项
         */
        config: RechargeConfigRow,
        /**
         * 是否延后补发的订单
         */
        isDelayedApply: boolean,

        /**
         * 其他附加值
         */
        options?: PaymentMergeOptions,
    }

    @slib.SafeClass('OrderRecord')
    export class OrderRecord {
        orderno: string = 'invalid'
        state: OrderState = 2
        /** 订单生成时间 */
        time: number = 0

        // 以下下兼容老版本游戏存档
        /** 序号 */
        Id: number = 0
        /** 金额 */
        Money: number = 0
        /** 精灵石数量 */
        Amt: number = 0
        /** 商品名称 */
        ItemName: string = ''

        /** 用户ID */
        userId: string = ''
        purchaseToken: string = '' //订单唯一消耗标志

        constructor(orderInfo: OrderInfo, state: OrderState, config: RechargeConfigRow) {

            if (!orderInfo) {
                return
            }

            this.orderno = orderInfo.outTradeNo
            this.state = state
            this.time = orderInfo.time
            this.purchaseToken = orderInfo.purchaseToken

            this.Id = config.id
            this.Money = config.money
            this.Amt = config.amount
            this.ItemName = config.title

            this.userId = `${gdk.userData.userId}`
        }

    }

    @slib.SafeClass("PayRecords")
    export class PayRecords {

        /**
         * 订单最近同步时间
         */
        lastOrdersSyncTime: number = 0

        /**
         * 充值记录列表
         */
        orderRecordList: OrderRecord[] = [];

        addRecord(orderInfo: OrderInfo, config: RechargeConfigRow) {
            this.orderRecordList.push(new OrderRecord(orderInfo, OrderState.unknown, config))
            payDeps.storage.saveToLocalStorage()
        }

        addRecordRaw(orderInfo: OrderInfo, config: RechargeConfigRow) {
            this.orderRecordList.push(new OrderRecord(orderInfo, orderInfo.state, config))
        }

        deapplyRecord(orderInfo: OrderInfo, config: RechargeConfigRow) {
            log.error('产生订单回滚,暂不作处理')
        }

        commitPayLog(key: string, config: PaymentParams, orderInfo: OrderInfo) {
            try {
                payStatistic.commitLog(key, config, orderInfo)
            } catch (e) {
                log.error("提交支付统计信息失败", e)
            }
        }

        commitPaidLog(key: string, config: PaymentParams, orderInfo: OrderInfo) {
            try {
                payStatistic.commitPaidLog(key, config, orderInfo)
            } catch (e) {
                log.error("提交支付统计信息失败", e)
            }
        }

        applyRecord(orderInfo: OrderInfo, config: RechargeConfigRow, options: PaymentMergeOptions) {
            // 由于没有记录历史商品配置,如果发生了订单记录丢失,那么就按照现在的商品配置来计量

            this.commitPayLog('OnPaySuccess', config, orderInfo)
            this.commitPaidLog("Paid", config, orderInfo);

            // //log order
            // gdk.commitChannelsLog("Paid", {
            //     id: config.productId,
            //     count: config.amount,
            //     currency: "$",
            //     price: config.money || config.price,
            //     succ: true,
            // })
            let notifyData: ApplyOrderInfo = { orderInfo: orderInfo, config: config, isDelayedApply: options.isMakingUpOrder, options: options }
            try {
                //每次有成功订单被应用时,都会通知
                // 包括微信回调成功,补单成功,登录时补单成功
                gevent.emit("onBeforeApplyOrder", notifyData);
                gevent.emit("onApplyOrder", notifyData);
                gevent.emit("onAfterApplyOrder", notifyData);
            } catch (e) {
                log.error('应用订单异常', notifyData)
                log.error(e)
                // 这里不抛出异常,只打印日志
                // 改为：如果发奖励抛异常，那么不保存订单状态
                return
            }

            let orderno = orderInfo.outTradeNo

            //变更充值记录
            let hisRecord = this.orderRecordList.find(info => info.orderno == orderno)
            if (!hisRecord) {
                hisRecord = new OrderRecord(orderInfo, OrderState.ok, config)
                this.orderRecordList.push(hisRecord)
            } else {
                // cc.assert(hisRecord.state!=OrderState.ok,'')
                if (hisRecord.state == OrderState.ok) {
                    log.error('错误的可应用成功订单状态')
                    return
                }
                hisRecord.state = OrderState.ok
            }

            // payDeps.storage.saveToLocalStorage(false);//立即同步保存

            try {
                gevent.emit("refreshPay", notifyData);//刷新部分界面
            } catch (e) {
                log.error('显示充值结果异常', notifyData)
                log.error(e)
                // 这里不抛出异常,只打印日志
            }

        }

        isItemBoughtEver(config: RechargeConfigRow): boolean {
            return !!this.orderRecordList.find(info => info.Id == config.id && info.state == OrderState.ok)
        }

        /**
         * 获取存档中的实例
         */
        static get saved(): PayRecords {
            let data: PayRecords = payDeps.storage.getSavedData("payRecords")
            if (!data) {
                data = new PayRecords()
                payDeps.storage.setSavedData("payRecords", data)
            }
            return data;
        }
    }
}