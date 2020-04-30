
namespace CS.ujlib {
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
       public rawData!: any;
       public serverData!: ServerData;
       public recordData!: RecordData;
   }

   export class ServerData {
       public gameCurrency!: GameCurrency;
       public serviceTimestamp!: number;
       public nickname!: string;
       public bindingInfo!: any[];
       public gender!: number;
       public encryptKey!: string;
       public custom!: string;
       public token!: string;
       public createTime!: number;
       public backupTime!: number;
       public followGzh!: number;
       public holidays!: boolean;
       public heart!: number;
       public dataTimestamp!: number;
       public tableConf!: TableConf;
       public ad!: any;
       public verified!: boolean;
       public noticeSign!: string;
       public profileImg!: string;
       public service24Timestamp!: number;
       public verifiedInfo!: VerifiedInfo;
       public userNew!: boolean;
       public shareSwitch!: any;
       public channelId!: number;
       public gametoken!: string;
       public qa!: string;
       public openId!: string;
       public userId!: number;
   }

   export class GameCurrency {
       public diamond!: string;
       public seed!: string;
       public gold!: string;
   }

   export class TableConf {
       public tableSign!: string;
   }

   export class VerifiedInfo {
       public age!: number;
       public name!: string;
       public birthday!: string;
       public idCard!: string;
   }

   export class RecordData {
       public type!: string;
       public gameUserId!: string;
       public token!: string;
       public openId!: string;
       public head!: string;
       public bindingInfo!: any[];
       public gameRegDate!: number;
       public nickName!: string;
       public accountName!: string;
   }

   export class ServedBindInfo {
       public serverData!: ServerData;
       public visitorOpenId!: string;
       public loginNode!: string;
   }

}
