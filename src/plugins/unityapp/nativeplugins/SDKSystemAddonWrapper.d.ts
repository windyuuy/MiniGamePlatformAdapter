
declare namespace CS.ujlib {
   export class SDKSystemAddonWrapper {

		/**
		* 渠道退出接口
		*/
		/**
		* 渠道退出接口
		*/
        public ExitSDK (info: AnyParams, callbacks: TaskCallback<SDKExitInfo>):void;

    }

   export class SDKExitInfo {
       public bQuitDirectly!: boolean;
   }

}
