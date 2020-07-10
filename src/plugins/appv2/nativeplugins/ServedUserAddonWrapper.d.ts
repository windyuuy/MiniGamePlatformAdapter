
declare namespace CS.Glee.Bridge {
   export class ServedUserAddonWrapper {

		/**
		* 登录
		*/
        public Login (info: ServedLoginInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 绑定账号到SDK渠道账号
		*/
        public Bind (info: ServedBindInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 判断是否已登录
		*/
        public IsLogined (): boolean;

		/**
		* 登出
		*/
        public Logout (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 切换账号
		*/
        public AccountSwitch (info: ServedLoginInfo, callbacks: TaskCallback<LoginServerResult>):void;

		/**
		* 获取登陆记录信息，昵称等
		*/
        public GetRecordData (): LoginServerResult.RecordData;

		/**
		* 进入平台中心
		*/
        public EnterPlatform (info: ServedBindInfo, callbacks: TaskCallback<LoginServerResult>):void;

    }

   export class ServedLoginInfo {
       public loginNode!: string;
   }

   export class LoginServerResult {
       public recordData!: RecordData;
       public serverData!: ServerData;
       public rawData!: any;
   }

   export class RecordData {
       public type!: string;
       public nickName!: string;
       public gameRegDate!: number;
       public token!: string;
       public bindingInfo!: any[];
       public accountName!: string;
       public head!: string;
       public openId!: string;
       public gameUserId!: string;
   }

   export class ServerData {
       public backupTime!: number;
       public heart!: number;
       public custom!: string;
       public encryptKey!: string;
       public noticeSign!: string;
       public bindingInfo!: any[];
       public gameCurrency!: GameCurrency;
       public tableConf!: TableConf;
       public gametoken!: string;
       public dataTimestamp!: number;
       public ad!: any;
       public service24Timestamp!: number;
       public serviceTimestamp!: number;
       public openId!: string;
       public profileImg!: string;
       public gender!: number;
       public userNew!: boolean;
       public token!: string;
       public verifiedInfo!: VerifiedInfo;
       public nickname!: string;
       public channelId!: number;
       public userId!: number;
       public createTime!: number;
       public shareSwitch!: any;
       public qa!: string;
       public followGzh!: number;
       public verified!: boolean;
       public holidays!: boolean;
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
       public idCard!: string;
       public birthday!: string;
       public name!: string;
   }

   export class ServedBindInfo {
       public serverData!: ServerData;
       public visitorOpenId!: string;
       public loginNode!: string;
   }

}
