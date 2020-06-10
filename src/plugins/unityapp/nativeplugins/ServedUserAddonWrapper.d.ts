
declare namespace CS.Glee.Bridge {
   export class ServedUserAddonWrapper {

		/**
		* 登录
		*/
		/**
		* 登录
		*/
        public Login (info: ServedLoginInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 绑定账号到SDK渠道账号
		*/
		/**
		* 绑定账号到SDK渠道账号
		*/
        public Bind (info: ServedBindInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 登出
		*/
		/**
		* 登出
		*/
        public Logout (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 切换账号
		*/
		/**
		* 切换账号
		*/
        public AccountSwitch (info: ServedLoginInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 进入平台中心
		*/
		/**
		* 进入平台中心
		*/
        public EnterPlatform (info: ServedBindInfo, callbacks: TaskCallback<LoginServerResult>):void;

    }

   export class ServedLoginInfo {
       public loginNode!: string;
   }

   export class LoginServerResult {
       public serverData!: ServerData;
       public recordData!: RecordData;
       public rawData!: any;
   }

   export class ServerData {
       public userNew!: boolean;
       public openId!: string;
       public qa!: string;
       public holidays!: boolean;
       public custom!: string;
       public nickname!: string;
       public gametoken!: string;
       public noticeSign!: string;
       public followGzh!: number;
       public profileImg!: string;
       public ad!: any;
       public userId!: number;
       public tableConf!: TableConf;
       public verified!: boolean;
       public channelId!: number;
       public service24Timestamp!: number;
       public encryptKey!: string;
       public bindingInfo!: any[];
       public verifiedInfo!: VerifiedInfo;
       public dataTimestamp!: number;
       public serviceTimestamp!: number;
       public gameCurrency!: GameCurrency;
       public gender!: number;
       public createTime!: number;
       public heart!: number;
       public backupTime!: number;
       public token!: string;
       public shareSwitch!: any;
   }

   export class TableConf {
       public tableSign!: string;
   }

   export class VerifiedInfo {
       public age!: number;
       public birthday!: string;
       public name!: string;
       public idCard!: string;
   }

   export class GameCurrency {
       public seed!: string;
       public gold!: string;
       public diamond!: string;
   }

   export class RecordData {
       public head!: string;
       public openId!: string;
       public gameRegDate!: number;
       public bindingInfo!: any[];
       public accountName!: string;
       public nickName!: string;
       public gameUserId!: string;
       public type!: string;
       public token!: string;
   }

   export class ServedBindInfo {
       public loginNode!: string;
       public serverData!: ServerData;
       public visitorOpenId!: string;
   }

}
