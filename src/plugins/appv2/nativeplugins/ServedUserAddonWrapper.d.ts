
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
        public GetRecordData (): RecordData;

		/**
		* 进入平台中心
		*/
        public EnterPlatform (info: ServedBindInfo, callbacks: TaskCallback<LoginServerResult>):void;

        public IsBind (): boolean;

    }

   export class ServedLoginInfo {
       public loginNode: string;
   }

   export class LoginServerResult {
       public rawData: any;
       public recordData: RecordData;
       public serverData: ServerData;
   }

   export class RecordData {
       public type: string;
       public token: string;
       public head: string;
       public openId: string;
       public bindingInfo: any[];
       public accountName: string;
       public nickName: string;
       public gameUserId: string;
       public gameRegDate: number;
   }

   export class ServerData {
       public gameCurrency: GameCurrency;
       public qa: string;
       public gender: number;
       public serviceTimestamp: number;
       public gametoken: string;
       public profileImg: string;
       public channelId: number;
       public token: string;
       public followGzh: number;
       public tableConf: TableConf;
       public dataTimestamp: number;
       public heart: number;
       public nickname: string;
       public backupTime: number;
       public userNew: boolean;
       public bindingInfo: any[];
       public service24Timestamp: number;
       public verifiedInfo: VerifiedInfo;
       public openId: string;
       public custom: string;
       public holidays: boolean;
       public shareSwitch: any;
       public createTime: number;
       public verified: boolean;
       public noticeSign: string;
       public userId: number;
       public ad: any;
       public encryptKey: string;
   }

   export class GameCurrency {
       public gold: string;
       public diamond: string;
       public seed: string;
   }

   export class TableConf {
       public tableSign: string;
   }

   export class VerifiedInfo {
       public idCard: string;
       public birthday: string;
       public name: string;
       public age: number;
   }

   export class ServedBindInfo {
       public serverData: ServerData;
       public loginNode: string;
       public visitorOpenId: string;
   }

}
