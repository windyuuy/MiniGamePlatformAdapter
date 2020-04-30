
namespace CS.ujlib {
   export class LocalPushAddonWrapper {

		/**
		* 批量增加通知
		*/
		/**
		* 批量增加通知
		*/
        public AddPushes (info: AddNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 批量移除通知
		*/
		/**
		* 批量移除通知
		*/
        public RemovePushesByID (info: RemoveLocalNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 移除所有通知
		*/
		/**
		* 移除所有通知
		*/
        public RemoveAllPushes (info: RemoveAllLocalNotifiesParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 启用推送
		*/
		/**
		* 启用推送
		*/
        public EnablePush (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 关闭推送
		*/
		/**
		* 关闭推送
		*/
        public DisablePush (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

    }

   export class AddNotifiesParams {
       public notices!: NotifyTemplate;
   }

   export class NotifyTemplate {
       public isBigText!: boolean;
       public subtitle!: string;
       public repeat!: number;
       public soundName!: string;
       public interval!: number;
       public badge!: number;
       public title!: string;
       public ticker!: string;
       public userInfo!: string;
       public enableSoundTip!: boolean;
       public identifier!: string;
       public content!: string;
       public enableVibrateTip!: boolean;
       public availableStage!: number;
       public enableLightTip!: boolean;
       public subText!: string;
   }

   export class RemoveLocalNotifiesParams {
       public identifiers!: string;
   }

   export class RemoveAllLocalNotifiesParams {
   }

}
