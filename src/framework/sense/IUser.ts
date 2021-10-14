
namespace GDK {
	// export class LoginError extends ReqError { }

	/** 登录请求结果 */
	export class LoginResult {
		openId?: string
		code?: string
		extra?: any
	}

	/** 登录请求参数 */
	export class LoginParams extends ReqParams {
		pkgName?: string // oppo 包名
		/**
		 * 是否禁止游客登陆
		 */
		disableVisitor?: boolean = false;
		/**
		 * 是否静默登陆
		 */
		silent?: boolean = false;

		/**
		 * 是否需要实名制
		 */
		realName?: boolean;

		/**
		 * 是否允许自动登陆
		 * * 如果当前未绑定任何第三方账号，则执行游客登陆
		 * * 否则，执行第三方账号的自动登陆
		 */
		autoLogin?: boolean = true;
		/**
		* gamepind 登录token
		*/
		token?: string;

	}

	export class LoginPromise extends Promise<LoginResult>{ }

	// 自动生成
	/**
	 * 用户接口
	 * @usage 包括登录、用户存档管理等
	 */
	export interface IUser extends IModule {
		/** 登录 */
		login(params?: LoginParams): Promise<LoginResult>
		/** 绑定回调 */
		setBindCallback(callback: (succ: boolean, data?: any) => void): void

		/** 绑定回调 */
		setRebootCallback(callback: () => void): void
		/**
		 * 显示用户中心
		 * * APP平台支持
		 */
		showUserCenter(): Promise<void>;

		/**
		 * 判断是否为本地实名制系统
		 */
		isNativeRealNameSystem?(): boolean;

		/**
		 * 显示未成年人游戏描述信息
		 * * APP平台支持
		 */
		showMinorInfo?(info: string): Promise<void>;

		/**
		 * 显示实名制弹框，进入实名制流程
		 * * APP平台支持
		 * @param force 是否强制
		 */
		showRealNameDialog?(userID: number, force: boolean): Promise<{
			isVerified: boolean,
			age: number,
			name: string,
			idCard: string,
			birthday: string
		}>

		/**
		 * 显示账号绑定
		 * * APP平台支持
		 */
		showBindDialog(): Promise<void>;

		bindUser(): Promise<{ success: boolean, data: any }>;

		/** 检查登录态是否过期 */
		checkSession?(params?: ReqParams): Promise<void>

		/** 更新用户数据 */
		update(): Promise<UserDataUpdateResult>
		/**
		 * 获取用户云端数据
		 * - oppo未处理
		 */
		getFriendCloudStorage(obj: {
			keyList: string[],
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[],
		}): Promise<{ data: UserGameData[] }>;
		/**
		 * 提交用户云端数据
		 * - oppo未处理
		 */
		setUserCloudStorage(obj: {
			KVDataList: KVData[],
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[],
		}): Promise<void>;
		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId: number): boolean;

		setLoginSupport(loginSupport: {
			google: boolean,
			visitor: boolean,
			facebook: boolean,
			wechat: boolean,
			gamecenter: boolean,
			account: boolean,
		}): void

		setAccountChangeListener?(f: () => void): void
	}
}
