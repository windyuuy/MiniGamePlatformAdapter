
declare namespace CS.Glee.Bridge {
   export class ServedShopAddonWrapper {

		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
        public Pay (info: ServedPayInfo, callbacks: FTaskCallback<ServedPayResult,PayErrorInfo> ):void;

		/**
		* 客户端校验
		*/
        public CheckOrderState (info: CheckOrderStateInfo, callbacks: TaskCallback<CheckOrderStateResult>):void;

    }

   export class ServedPayInfo {
       public priceCNY: number;
       public customExtra: string;
       public goodsId: number;
       public priceUSD: number;
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

   export class PayErrorInfo {
       public sCode: string;
       public code: number;
       public data: PayResultRaw;
       public reason: string;
       public message: string;
       public payResult: ServedPayResult;
   }

   export class PayResultRaw {
       public responseCode: number;
       public extraRaw: string;
       public extra: any;
   }

   export class CheckOrderStateInfo {
       public orderNo: string;
       public payWay: string;
   }

   export class CheckOrderStateResult {
       public orderState: number;
       public orderNo: string;
       public coopOrder: string;
       public orderCreateTime: number;
   }

}
