
declare namespace CS.Glee.Bridge {
   export class SDKSystemAddonWrapper {

		/**
		* 渠道退出接口
		*/
        public ExitSDK (info: AnyParams, callbacks: TaskCallback<SDKExitInfo>):void;

		/**
		* 获取SDK所需权限信息
		*/
        public GetRequiredPermissionsInfo (): SDKRequiredPermissionsInfo;

    }

   export class SDKExitInfo {
       public bQuitDirectly!: boolean;
   }

   export class SDKRequiredPermissionsInfo {
       public dynamicPermissions!: PermissionInfo;
   }

   export class PermissionInfo {
       public name!: string;
       public usages!: string;
   }

}
