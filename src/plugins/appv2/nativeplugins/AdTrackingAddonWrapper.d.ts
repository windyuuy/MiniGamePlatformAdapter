
declare namespace CS.Glee.Bridge {
   export class AdTrackingAddonWrapper {

        public LogCustomEvent (info: LogCustomEventParams, callbacks: TaskCallback<LogEventResult>):void;

        public OnLogin (info: LogLoginParams, callbacks: TaskCallback<LogEventResult>):void;

        public OnRegister (info: LogRegisterParams, callbacks: TaskCallback<LogEventResult>):void;

		/**
		* 发起支付
		*/
        public OnRequestPay (info: LogRequestPayParams, callbacks: TaskCallback<LogEventResult>):void;

		/**
		* 完成支付
		*/
        public OnPurchased (info: LogPurchasedParams, callbacks: TaskCallback<LogEventResult>):void;

    }

   export class LogCustomEventParams {
       public key!: string;
       public data!: Dictionary<string,string>;
   }

   export class LogEventResult {
   }

   export class LogLoginParams {
       public userId!: string;
       public type!: string;
   }

   export class LogRegisterParams {
       public userId!: string;
       public type!: string;
   }

   export class LogRequestPayParams {
       public coopOrder!: string;
       public payWay!: string;
       public name!: string;
       public currency!: string;
       public orderNo!: string;
       public price!: number;
       public userId!: string;
       public goodsId!: string;
       public payTime!: number;
       public count!: number;
   }

   export class LogPurchasedParams {
       public price!: number;
       public coopOrder!: string;
       public count!: number;
       public name!: string;
       public currency!: string;
       public payTime!: number;
       public revenue!: number;
       public succeed!: boolean;
       public userId!: string;
       public orderNo!: string;
       public payWay!: string;
       public goodsId!: string;
   }

}
