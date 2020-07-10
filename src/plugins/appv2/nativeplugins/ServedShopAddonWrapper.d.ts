
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
       public priceUSD!: number;
       public customExtra!: string;
       public goodsId!: number;
       public priceCNY!: number;
   }

   export class ServedPayResult {
       public orderCreateTime!: number;
       public orderNo!: string;
   }

   export class PayErrorInfo {
       public payResult!: ServedPayResult;
       public data!: PayResultRaw;
   }

   export class PayResultRaw {
       public extraRaw!: string;
       public responseCode!: number;
       public extra!: any;
   }

   export class CheckOrderStateInfo {
       public payWay!: string;
       public orderNo!: string;
   }

   export class CheckOrderStateResult {
       public coopOrder!: string;
       public orderCreateTime!: number;
       public orderNo!: string;
       public orderState!: number;
   }

}
