
declare namespace CS.Glee.Bridge {
	export class UserAddonWrapper {

		/**
		* 登录
		*/
		/**
		* 登录
		*/
		public Login(info: LoginInfo, callbacks: TaskCallback<LoginResult>): void;

		/**
		* 绑定账号到SDK渠道账号
		*/
		/**
		* 绑定账号到SDK渠道账号
		*/
		public Bind(info: LoginInfo, callbacks: TaskCallback<LoginResult>): void;

		/**
		* 登出
		*/
		/**
		* 登出
		*/
		public Logout(info: AnyParams, callbacks: TaskCallback<AnyResult>): void;

		/**
		* 切换账号
		*/
		/**
		* 切换账号
		*/
		public AccountSwitch(info: LoginInfo, callbacks: TaskCallback<AnyResult>): void;

		/**
		* 进入平台中心
		*/
		/**
		* 进入平台中心
		*/
		public EnterPlatform(info: AnyParams, callbacks: TaskCallback<EnterPlatformResult>): void;

		/**
		* 显示悬浮工具栏
		*/
		/**
		* 显示悬浮工具栏
		*/
		public ShowToolBar(info: String): bool;

		/**
		* 提交游戏数据接口
		*/
		/**
		* 提交游戏数据接口
		*/
		public SubmitLoginGameRole(info: String, callbacks: TaskCallback<AnyResult>): void;

		/**
		* 实名注册
		*/
		/**
		* 实名注册
		*/
		public RealNameRegister(info: RealNameRegisterParams, callbacks: TaskCallback<AnyResult>): void;

		/**
		* 防沉迷查询
		*/
		/**
		* 防沉迷查询
		*/
		public AntiAddictionQuery(info: AnyParams, callbacks: TaskCallback<AnyResult>): void;

	}

	export class LoginInfo {
	}

	export class LoginResult {
		public openId!: string;
		public email!: string;
		public platform!: string;
		public type!: string;
		public nickName!: string;
		public head!: string;
		public token!: string;
	}

	export class EnterPlatformResult {
	}

	export class RealNameRegisterParams {
	}

}
