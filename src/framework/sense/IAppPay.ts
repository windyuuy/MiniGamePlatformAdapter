namespace GDK {

	export class ServedPayInfo {
		public customExtra: string;
		public goodsId: number;
		public priceCNY: number;
		public priceUSD: number;
		
		public coopOrder: string;
		public productId: string
		public price: number
		public count: number
		public currency: string
		public title: string
		public extra: any
		
	}

	export class PayResultRaw {
		// sdk支付直接返回的支付代码，方便通过第三方sdk文档查询错误详情
		public responseCode: number;

		/**
		 * 返回原始数据
		 */
		public extraRaw: string;
	
		/**
		 * 以json格式返回一些原始数据
		 */
		public extra: any;
	}

	export class ServedPayResult {

		/**
		 * glee的订单号
		 */
		public orderNo: string;

		public orderCreateTime: number;

    	//    支付返回代码，其中的值使用 PayErrorCode 中的枚举定义
		public code: number;
		//    sdk支付返回的附加字段
		public data:PayResultRaw;
		//    提示信息
		public message:string;

		public reason:string;

		//    第三方后台配置的商品充值项id
		public productId:string;
		/**
		 * 合作商户自定义订单号(30位以内）（此处 唯一标志下订单会话）
		 */
		public coopOrder:string;

		/**
		 * 支付方式
		 */
		public payWay:string;

		public goodsId:string;
	}

	export class CheckOrderStateInfo {

		/**
		 * glee的订单号
		 */
		public orderNo:string;

		/**
		 * 支付方式（可选传入）
		 */
		public payWay:string;
	}

	export class CheckOrderStateResult {

		/**
		 * glee的订单号
		 */
		public orderNo: string;

		/**
		 * 合作商订单号
		 */
		public coopOrder: string;

		// 支付返回代码，其中的值使用 PayErrorCode 中的枚举定义
		public orderState:number;

		public orderCreateTime:number;
	}
	
	export interface IAppPay extends IModule {
		/**
		 * 调起支付
		 * - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		 */
		payPurchaseApp(item: ServedPayInfo): Promise<ServedPayResult>
		/**
		 * 客户端校验
		 */
		checkOrderState?(params: CheckOrderStateInfo): Promise<CheckOrderStateResult>
	}

}