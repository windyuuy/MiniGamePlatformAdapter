namespace GDK {
	/** 订单状态 */
	export enum OrderState {
		fail = 2,
		ok = 1,
		unknown = 0,
	}

	export class PayItemInfo {
		/** 我们的商品ID */
		goodsId: number = 0
		/** 后台二级货币ID */
		coinId?: number = 0
		/** 支付金额 */
		money: number = 0
		/** 购买商品数量 */
		amount: number = 0
		/** 商品名称/标题 */
		title: string = ''
		/** 支付货币单位 */
		currencyUnit?: "CNY" | "Dollor" = "CNY"
	}

	// 订单信息
	export type OrderInfo = {
		outTradeNo: string //订单号,以此为准,例如: "20002_1_1530164811210"
		state: OrderState //状态(0:未知,1:成功,2:失败)
		goodsId: number //商品id
		time: number //订单生成时间
	}

	/**
	 * - 每次有成功订单被应用时,都会通知
	 * - 包括微信回调成功,补单成功,登录时补单成功
	 * - let notifyData:ApplyOrderInfo={orderInfo:orderInfo,config:config,isDelayedApply:isDelayedApply}
	 * - GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",notifyData);
	 */
	export type ApplyOrderInfo = {
		orderInfo: OrderInfo, //订单信息
		config: PayItemInfo, //购买项
		isDelayedApply: boolean, //是否延后补发的订单
	}

	export class PayError extends GDKError {
		data?: {
			extra?: {
				errCode?: number
			}
		}
	}

	export class PayResult {
		result: {
			errCode: number
		}
		extra?: any
	}

	export const enum WebViewOrientation {
		portrait = 1,
		landscapeLeft = 2,
		landscapeRight = 3
	}

	export type ChannelType = 'miniapp' | 'origion'

	export class PayOptions {
		/** 屏幕方向 */
		gameOrientation?: WebViewOrientation
		/**
		 * 渠道
		 * - 平台自带支付 'origion'
		 * - 跳转小程序支付 'miniapp'
		 **/
		channelType?: ChannelType
		// 这个参数代表不同数据分区
		/**
		 * 每日给力支付app分区 ID
		 * - 0 测试版
		 * - 1 fox应用
		 * - 2 海洋馆应用
		 * @default 1
		 */
		gleeZoneId?: number
		/**
		 * 微信支付分区ID
		 * @default "1"
		 */
		wxZoneId?: string
	}

	export interface IPay extends IModule {
		/**
		 * 调起支付
		 */
		payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>
	}

}