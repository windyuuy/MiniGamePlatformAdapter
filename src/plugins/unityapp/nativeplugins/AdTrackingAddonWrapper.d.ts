
declare namespace CS.ujlib {
   export class AdTrackingAddonWrapper {

        public LogCustomEvent (info: LogCustomEventParams, callbacks: TaskCallback<LogEventResult>):void;

        public OnLogin (info: LogLoginParams, callbacks: TaskCallback<LogEventResult>):void;

        public OnRegister (info: LogRegisterParams, callbacks: TaskCallback<LogEventResult>):void;

		/**
		* 发起支付
		*/
		/**
		* 发起支付
		*/
        public OnRequestPay (info: LogRequestPayParams, callbacks: TaskCallback<LogEventResult>):void;

		/**
		* 完成支付
		*/
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
       public type!: string;
       public userId!: string;
   }

   export class LogRegisterParams {
       public userId!: string;
       public type!: string;
   }

   export class LogRequestPayParams {
       public price!: double;
       public payTime!: number;
       public goodsId!: string;
       public userId!: string;
       public orderNo!: string;
       public count!: number;
       public currency!: string;
       public payWay!: string;
       public coopOrder!: string;
       public name!: string;
   }

   export class LogPurchasedParams {
       public goodsId!: string;
       public revenue!: double;
       public name!: string;
       public price!: double;
       public succeed!: boolean;
       public coopOrder!: string;
       public currency!: string;
       public userId!: string;
       public count!: number;
       public payTime!: number;
       public orderNo!: string;
       public payWay!: string;
   }

}
