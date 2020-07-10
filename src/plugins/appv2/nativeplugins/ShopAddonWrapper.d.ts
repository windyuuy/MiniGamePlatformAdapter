
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
       public productId!: string;
       public currency!: string;
       public TAG!: string;
       public price!: number;
       public title!: string;
       public coopOrder!: string;
       public count!: number;
       public extra!: any;
   }

   export class PayResult {
       public productId!: string;
       public coopOrder!: string;
       public payWay!: string;
       public reason!: string;
       public data!: PayResultRaw;
       public goodsId!: string;
       public code!: number;
       public message!: string;
   }

   export class ConsumePurchaseInfo {
       public purchaseToken!: string;
       public payWay!: string;
   }

   export class ConsumePurchaseResult {
       public code!: number;
   }

   export class QueryItemInfoSource {
       public productId!: string;
       public payWay!: string;
   }

   export class QueryItemInfoResult {
       public message!: string;
       public code!: number;
       public data!: PayQueryItemInfoResultData;
   }

   export class PayQueryItemInfoResultData {
       public purchaseToken!: string;
       public dataSignature!: string;
       public productId!: string;
       public purchaseData!: string;
   }

}
