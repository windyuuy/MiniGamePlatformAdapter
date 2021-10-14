
declare namespace CS.Glee.Bridge {
   export class SDKPushAddonWrapper {

		/**
		* 启用推送
		*/
        public EnablePush (info: AnyParams): boolean;

		/**
		* 关闭推送
		*/
        public DisablePush (info: AnyParams): boolean;

    }

}
