
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
       public loginNode: string;
   }

   export class LoginServerResult {
       public serverData: ServerData;
       public rawData: any;
       public recordData: RecordData;
   }

   export class ServerData {
       public dataTimestamp: number;
       public heart: number;
       public ad: any;
       public holidays: boolean;
       public token: string;
       public openId: string;
       public createTime: number;
       public channelId: number;
       public noticeSign: string;
       public serviceTimestamp: number;
       public custom: string;
       public gender: number;
       public qa: string;
       public userNew: boolean;
       public shareSwitch: any;
       public followGzh: number;
       public tableConf: TableConf;
       public verifiedInfo: VerifiedInfo;
       public userId: number;
       public verified: boolean;
       public profileImg: string;
       public gametoken: string;
       public backupTime: number;
       public encryptKey: string;
       public bindingInfo: any[];
       public service24Timestamp: number;
       public gameCurrency: GameCurrency;
       public nickname: string;
   }

   export class TableConf {
       public tableSign: string;
   }

   export class VerifiedInfo {
       public name: string;
       public age: number;
       public idCard: string;
       public birthday: string;
   }

   export class GameCurrency {
       public gold: string;
       public seed: string;
       public diamond: string;
   }

   export class RecordData {
       public openId: string;
       public accountName: string;
       public gameUserId: string;
       public nickName: string;
       public bindingInfo: any[];
       public type: string;
       public gameRegDate: number;
       public token: string;
       public head: string;
   }

   export class ServedBindInfo {
       public visitorOpenId: string;
       public serverData: ServerData;
       public loginNode: string;
   }

}
