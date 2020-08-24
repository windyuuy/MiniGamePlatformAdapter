
declare namespace CS.Glee.Bridge {
   export class ShopAddonWrapper {

		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
        public Pay (info: PayInfo, callbacks: FTaskCallback<PayResult,PayErrorInfo> ):void;

		/**
		* 消耗中间商品
		*/
		/**
		* 消耗中间商品
		*/
        public ConsumePurchase (info: ConsumePurchaseInfo, callbacks: TaskCallback<ConsumePurchaseResult>):void;

		/**
		* 查询商品项
		*/
		/**
		* 查询商品项
		*/
        public QueryItemInfo (info: QueryItemInfoSource, callbacks: TaskCallback<QueryItemInfoResult>):void;

    }

   export class PayInfo {
       public title: string;
       public currency: string;
       public price: number;
       public extra: any;
       public TAG: string;
       public coopOrder: string;
       public count: number;
       public productId: string;
   }

   export class PayResult {
       public data: PayResultRaw;
       public payWay: string;
       public goodsId: string;
       public coopOrder: string;
       public reason: string;
       public productId: string;
       public message: string;
       public code: number;
   }

   export class ConsumePurchaseInfo {
       public purchaseToken: string;
       public payWay: string;
   }

   export class ConsumePurchaseResult {
       public code: number;
   }

   export class QueryItemInfoSource {
       public payWay: string;
       public productId: string;
   }

   export class QueryItemInfoResult {
       public code: number;
       public data: PayQueryItemInfoResultData;
       public message: string;
   }

   export class PayQueryItemInfoResultData {
       public productId: string;
       public dataSignature: string;
       public purchaseData: string;
       public purchaseToken: string;
   }

}
