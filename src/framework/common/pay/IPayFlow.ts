
namespace GDK.PayFlow {

    /**
     * 订单状态
     */
    export type wxPayState = {
        errCode: number,
        state: OrderState,
        extra?: any
    }

    /**
     * 支付成功回调参数
     */
    export type PaymentSuccessCallbackParams = { config: PaymentParams, orderInfo?: OrderInfo }
    /**
     * 支付成功回调
     */
    export type PaymentSuccessCallback = (res: PaymentSuccessCallbackParams) => void

    /**
     * 支付合并选项
     */
    export type PaymentMergeOptions = {
        /**
         * 是否补单流程中补发的订单
         */
        isMakingUpOrder: boolean
    }

    /** 道具充值配置项 */
    export interface RechargeConfigRow {
        /** 支付方式 */
        payWay?: PayWay
        /** 序号，同时也是我们的商品ID */
        id?: number
        /** 金额 */
        money?: number
        /** 中间货币数量 */
        amount?: number
        /** 商品名称 */
        title?: string
        /** 后台二级货币ID */
        coinId?: number
        /** 第三方后台商品ID */
        productId?: string
        /** 商品实际付款价格 */
        price?: number
        /**
         * 人民币总额（用于后台统计）
         */
        priceCNY?: number
        /**
         * 美元总额（用于后台统计）
         */
        priceUSD?: number
    }

    /**
     * 发起支付选项
     */
    export interface PaymentParamsOptions {
        /**
         * （正在弃用，用payUrl代替）每日给力支付app分区 ID
         * - 0 测试版
         * - 1 fox应用
		 * - 2 海洋馆应用
         */
        gleeZoneId?: number
        /**
         * 支付服务器地址（通常是账号服）
         * - 用于代替gleeZoneId判断app分区
         * - 用于客服跳转支付和app跳转支付
         * - 默认会检测传入 游戏地址 或 账号服地址
         * - 也可能需要手动填写此参数，形如 "https://sandbox.focus.mosoga.net"
         */
        payUrl?: string
        /**
         * 屏幕方向
         * - 1 竖屏(默认)
         * - 2.横屏（home键在左边）
         * - 3.横屏 （home键在右边）
         */
        gameOrientation?: number

		/**
		 * - 副标题
		 * - 客服跳转支付，会话内消息卡片标题
		 */
        subTitle?: string
		/**
		 * - 客服跳转支付，会话内消息卡片图片路径
		 */
        imagePath?: string
        /**
		 * 自定义附加参数
		 */
        customExtra?: string
        /**
		 * 自定义附加参数(JSON格式)
		 */
        customJsonExtra?: string
        /**
         * 自动补单重试次数
         */
        autoMakeupRetryTimes?: number
    }
    export type PayWay = 'WechatPay' | 'AliPay' | 'UnifiedSdk' | 'VivoAppPay' | 'OppoApp' | 'GooglePay' | 'IosPay' | 'BaiduAppPay' | 'YYBPay' | 'AliGameAppPay' | 'meituAppPay' | 'xiao7'
    export interface PaymentParams extends RechargeConfigRow {
        /**
         * 这里加自定义选项
         */
        options?: PaymentParamsOptions
        qqGoodid?: string
        others?: object
        /*
        *the key used to specify using a new set of pay params
        * usally used for different package tag requirng different pay params
        */
        customKey?: string
        /**
         * 合作商订单ID
         */
        coopOrder?: string
    }

    export interface Parent {
        /**
         * 支付平台ID，仅支持单个
         * - 如果需要多个，用 payWays 字段
         */
        channelId?: PayWay

        /**
         * 多个支付平台ID
         * - 当前发布渠道需要支持几个支付平台，那么在当前渠道对应的代码里填几个支付平台的payWay
         * - 补单需要遍历
         */
        payWays?: PayWay[]

        /**
         * 充值配置表
         */
        chargeconfig: RechargeConfigRow[]
    }

    // 用于暴露订单历史
    export interface OrderRecordExported {
        orderno: string
        state: OrderState
        /** 订单生成时间 */
        time: number

        // 以下下兼容老版本游戏存档
        /** 配表序号 */
        id: number
        /** 金额 */
        money: number
        /** 精灵石数量 */
        amount: number
        /** 商品名称 */
        itemName: string

        /** 用户ID */
        userId: string
    }

    /**
     * 订单合并结果
     */
    export interface MakeupOrdersResult {
        /** 合并顺利无异常 */
        isMergeOk: boolean,
        /** 有差异订单 */
        isDiffExist: boolean,
    }

    /**
     * 订单支付成功通知
     * 登录补单之前就要一直监听
     * example: GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",<ApplyOrderInfo>notifyData);
     */
    export interface IPayFlow {
        /**
         * 支付流程状态
         */
        _status: PayFlowStatus

        /**
         * 设置充值配置
         * @param parent
         */
        initConfig(parent: Parent): void

        /**
         * 发起支付
         * - 如果是微信app跳转支付，successCallback 接口不会生效，需要通过补单流程完成支付，即监听 'onApplyOrder' 事件
         * - 如果是app内充值，那么 successCallback 和 'onApplyOrder' 事件都会生效
         * @param config 配置信息
         * @param successCallback 支付成功回调
         * @param failCallback 支付失败回调
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;

        /**
         * 检查充值是否已经购买过一次
         * @param config 配置信息
         * @returns
         */
        isItemBoughtEver(config: RechargeConfigRow): boolean;

        /**
         * 校验补发订单
         * @returns
         */
        pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions): any;

        /**
         * 设置监听，用于微信app跳转支付
         * - 不再需要外部传入onShow方法
         */
        initListener(onShow?: (callback: Function) => void): void;

        /**
         * - false: 充值回调不可信（一律回调失败，但是实际上可能充值成功了），要通过后台切回补单事件通知来发奖励，如微信小游戏跳转支付、微信客服跳转支付、原生微信充值
         * - true: 可直接在充值回调中发放奖励，如谷歌支付，ios IAP
         */
        readonly isPayCallbackValid: boolean;

        /**
         * 订单历史
         * - 序号为0的订单是最早的订单
         */
        readonly orderRecordList: OrderRecordExported[]

        /**
         * 流程名
         */
        readonly payFlowName: string

    }

}