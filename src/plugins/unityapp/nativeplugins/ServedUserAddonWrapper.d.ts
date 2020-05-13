
declare namespace CS.ujlib {
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
       public service24Timestamp!: number;
       public heart!: number;
       public channelId!: number;
       public holidays!: boolean;
       public tableConf!: TableConf;
       public profileImg!: string;
       public createTime!: number;
       public backupTime!: number;
       public dataTimestamp!: number;
       public userId!: number;
       public encryptKey!: string;
       public gender!: number;
       public gameCurrency!: GameCurrency;
       public noticeSign!: string;
       public bindingInfo!: any[];
       public verifiedInfo!: VerifiedInfo;
       public gametoken!: string;
       public custom!: string;
       public shareSwitch!: any;
       public qa!: string;
       public ad!: any;
       public followGzh!: number;
       public openId!: string;
       public serviceTimestamp!: number;
       public verified!: boolean;
       public nickname!: string;
       public userNew!: boolean;
       public token!: string;
   }

   export class TableConf {
       public tableSign!: string;
   }

   export class GameCurrency {
       public gold!: string;
       public seed!: string;
       public diamond!: string;
   }

   export class VerifiedInfo {
       public birthday!: string;
       public name!: string;
       public idCard!: string;
       public age!: number;
   }

   export class RecordData {
       public nickName!: string;
       public token!: string;
       public accountName!: string;
       public gameUserId!: string;
       public openId!: string;
       public type!: string;
       public head!: string;
       public gameRegDate!: number;
       public bindingInfo!: any[];
   }

   export class ServedBindInfo {
       public serverData!: ServerData;
       public visitorOpenId!: string;
       public loginNode!: string;
   }

}
