
declare namespace CS.Glee.Bridge {
   export class LocalPushAddonWrapper {

		/**
		* 批量增加通知
		*/
        public AddPushes (info: AddNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 批量移除通知
		*/
        public RemovePushesByID (info: RemoveLocalNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 移除所有通知
		*/
        public RemoveAllPushes (info: RemoveAllLocalNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 判断用户是否允许通知
		*/
        public IsPushEnabled (): boolean;

		/**
		* 启用推送
		*/
        public EnablePush (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 关闭推送
		*/
        public DisablePush (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

    }

   export class AddNotifiesParams {
       public notices!: NotifyTemplate[];
   }

   export class NotifyTemplate {
       public enableVibrateTip!: boolean;
       public isBigText!: boolean;
       public title!: string;
       public userInfo!: string;
       public badge!: number;
       public subText!: string;
       public ticker!: string;
       public enableSoundTip!: boolean;
       public enableLightTip!: boolean;
       public subtitle!: string;
       public identifier!: string;
       public soundName!: string;
       public interval!: number;
       public availableStage!: number;
       public content!: string;
       public repeat!: number;
   }

   export class RemoveLocalNotifiesParams {
       public identifiers!: string;
   }

   export class RemoveAllLocalNotifiesParams {
   }

}
