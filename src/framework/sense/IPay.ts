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
		/** 第三方后台商品id，原生app版该项必传 */
		productId?: string
		/** 支付金额 */
		money: number = 0
		/** 支付金额 */
		price: number = 0
		/** 购买商品数量 */
		amount: number = 0
		/** 商品名称/标题 */
		title: string = ''
		/** 支付货币单位 */
		currencyUnit?: "CNY" | "USD" = "CNY"
		/** oppo包名 */
		pkgName?: string
		/** oppo登录返回的token */
		token?: string
		/** 订单创建时间 */
		timestamp?: string
		/** 支付签名 */
		paySign?: string
		/** 第三方支付平台的订单号 */
		orderNo?: string
		/**
		 * glee自己的订单号
		 */
		gleeOrderNo?: string
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
		/** 服务器通知地址 */
		notifyUrl?: string;
		/** xiao7 game sign */
		gameSign?: string;
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


	export class ConsumePurchaseResult {
		/**
		 * 0 消耗成功
		 * 8 订单不存在
		 * -1 消耗异常
		 */
		code: number
	}
	export class PayQueryItemInfoResultData {
		productId: string
		purchaseToken: string
		purchaseData: string
		dataSignature: string
	}
	export class PayQueryItemInfoResult {
		code: number
		data: PayQueryItemInfoResultData
		message: string
	}

	export const enum WebViewOrientation {
		portrait = 1,
		landscapeLeft = 2,
		landscapeRight = 3
	}

	export type ChannelType = 'miniapp' | 'origion' | 'customer_service' | 'gamepind'

	export class PayOptions {
		/** 屏幕方向 */
		gameOrientation?: WebViewOrientation
		/**
		 * 支付方式
		 * - AliPay
		 * - WechatPay
		 */
		payWay?: string
		/**
		 * 渠道
		 * - 平台自带支付 'origion'
		 * - 跳转小程序支付 'miniapp'
		 * - 跳转客服支付 'customer_service'
		 **/
		channelType?: ChannelType
		// 这个参数代表不同数据分区
		/**
		 * （正在弃用，用payUrl代替）每日给力支付app分区 ID
		 * - 0 测试版
		 * - 1 fox应用
		 * - 2 海洋馆应用
		 * - 3 外部项目
		 * @default 1
		 * @deprecated
		 */
		gleeZoneId?: number
		/**
		 * 用于代替gleeZoneId判断app分区
		 */
		payUrl?: string
		/**
		 * 微信支付分区ID
		 * @default "1"
		 */
		wxZoneId?: string

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


	}

	export type PayWay = 'WechatPay' | 'AliPay' | 'UnifiedSdk' | 'VivoAppPay' | 'OppoApp' | 'GooglePay' | 'IosPay' | 'BaiduAppPay' | 'YYBPay' | 'AliGameAppPay' | 'meituAppPay' | 'xiao7'
	export class ConsumePurchaseParams {
		payWay!: PayWay
		purchaseToken!: string
	}
	export class PayQueryItemInfoParams {
		payWay!: PayWay
		productId!: string
	}

	export interface IPay extends IModule {
		/**
		 * 调起支付
		 */
		payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>


		/**
		 * 消耗商品
		 */
		consumePurchase?(params: ConsumePurchaseParams): Promise<ConsumePurchaseResult>
		/**
		 * 查询未消耗商品信息
		 */
		queryItemInfo?(params: PayQueryItemInfoParams): Promise<PayQueryItemInfoResult>

		getUserPayFlow?():PayFlow.IPayFlow
	}

}