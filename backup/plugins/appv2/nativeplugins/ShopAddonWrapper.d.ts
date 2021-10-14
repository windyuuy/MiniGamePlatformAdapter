
declare namespace CS.Glee.Bridge {
   export class ShopAddonWrapper {

		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
        public Pay (info: PayInfo, callbacks: FTaskCallback<PayResult,PayErrorInfo> ):void;

		/**
		* 消耗中间商品
		*/
        public ConsumePurchase (info: ConsumePurchaseInfo, callbacks: TaskCallback<ConsumePurchaseResult>):void;

		/**
		* 查询商品项
		*/
        public QueryItemInfo (info: QueryItemInfoSource, callbacks: TaskCallback<QueryItemInfoResult>):void;

    }

   export class PayInfo {
       public title: string;
       public count: number;
       public productId: string;
       public TAG: string;
       public currency: string;
       public coopOrder: string;
       public extra: any;
       public price: number;
   }

   export class PayResult {
       public payWay: string;
       public coopOrder: string;
       public data: PayResultRaw;
       public code: number;
       public productId: string;
       public goodsId: string;
       public reason: string;
       public message: string;
   }

   export class ConsumePurchaseInfo {
       public payWay: string;
       public purchaseToken: string;
   }

   export class ConsumePurchaseResult {
       public code: number;
   }

   export class QueryItemInfoSource {
       public payWay: string;
       public productId: string;
   }

   export class QueryItemInfoResult {
       public data: PayQueryItemInfoResultData;
       public message: string;
       public code: number;
   }

   export class PayQueryItemInfoResultData {
       public productId: string;
       public purchaseToken: string;
       public dataSignature: string;
       public purchaseData: string;
   }

}
