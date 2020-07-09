
declare namespace CS.Glee.Bridge {
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

   export class SDKRequiredPermissionsInfo {
       public dynamicPermissions!: PermissionInfo;
   }

   export class PermissionInfo {
       public usages!: string;
       public name!: string;
   }

}
