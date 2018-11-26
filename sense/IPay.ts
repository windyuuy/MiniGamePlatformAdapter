
export enum OrderState {
	fail = 2,
	ok = 1,
	unknown = 0,
}

export class RechargeConfig {
	id?: number = 0	//Id
	money?: number = 0	//金额
	amount?: number = 0	//精灵石数量
	title?: string = ''	//商品名称
}

// 订单信息
export type OrderInfo = {
	outTradeNo: string //订单号,以此为准,例如: "20002_1_1530164811210"
	state: OrderState //状态(0:未知,1:成功,2:失败)
	goodsId: number //商品id
	time: number //订单生成时间
}

/**
 * //每次有成功订单被应用时,都会通知
 * // 包括微信回调成功,补单成功,登录时补单成功
 * let notifyData:ApplyOrderInfo={orderInfo:orderInfo,config:config,isDelayedApply:isDelayedApply}
 * GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",notifyData);
 */
export type ApplyOrderInfo = {
	orderInfo: OrderInfo, //订单信息
	config: RechargeConfig, //购买项
	isDelayedApply: boolean, //是否延后补发的订单
}

export interface IPay {
    /**
     * 支付
     * @param config 配置信息
     * @param success 支付成功回调
     * @param fail 支付失败回调
     */
	pay(config: RechargeConfig, success: Function, fail?: Function);

	/**
     * 检查充值是否已经购买过一次
     * @param config 配置信息
	 * @returns
     */
	isBoughtOnce(config: RechargeConfig): boolean;

    /**
     * 校验补发订单
	 * @returns
     */
	pullDiffOrders(successCallback: Function, failCallback: Function): any;
}
