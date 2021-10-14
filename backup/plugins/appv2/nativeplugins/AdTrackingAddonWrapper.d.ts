
declare namespace CS.Glee.Bridge {

    export var GDKJSB : any;

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
       public key: string;
       public data: Dictionary<string,string>;
   }

   export class LogEventResult {
   }

   export class LogLoginParams {
       public type: string;
       public userId: string;
   }

   export class LogRegisterParams {
       public userId: string;
       public type: string;
   }

   export class LogRequestPayParams {
       public name: string;
       public goodsId: string;
       public payWay: string;
       public payTime: number;
       public userId: string;
       public price: number;
       public count: number;
       public coopOrder: string;
       public orderNo: string;
       public currency: string;
   }

   export class LogPurchasedParams {
       public revenue: number;
       public payTime: number;
       public succeed: boolean;
       public goodsId: string;
       public payWay: string;
       public name: string;
       public orderNo: string;
       public count: number;
       public price: number;
       public coopOrder: string;
       public userId: string;
       public currency: string;
   }

}
