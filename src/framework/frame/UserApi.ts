namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] });
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		/**
		 * 附件map
		 */
		private _m!: IModuleMap;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}

		protected readonly metaInfo = getGDKMetaInfo();

		/**
		 * gdk的框架版本号
		 **/
		get gdkVersion(): string {
			return this.metaInfo.version;
		}

		init() {
			devlog.warn("redundant init for gdk, skipped");
		}

		protected beInitConfigOnce = false;
		async initConfig(config: GDKConfigV2) {
			if (this.beInitConfigOnce) {
				devlog.warn("redundant initConfig for gdk, skipped");
			} else {
				return await gdkManager.initWithGDKConfig(config);
			}
		}

		/**
		 * 初始化插件内各个模块
		 * @param info 外部传入的配置
		 */
		protected _init() {
			for (let key in this._m) {
				// 初始化广告等具体模块
				let addon = <IModule>this._m[key];
				if (addon.init) {
					addon.init();
				}
			}
		}

		/**
		 * 初始化插件内各个模块
		 * @param info 外部传入的配置
		 */
		protected async _initWithConfig(info: GDKConfigV2): Promise<void> {
			this._m["gameInfo"].initWithConfig(info);
			for (let key in this._m) {
				if (key == "gameInfo") {
					continue;
				}
				// 初始化广告等具体模块
				let addon = <IModule>this._m[key];
				if (addon.initWithConfig) {
					await addon.initWithConfig(info);
				}
			}
		}

		protected checkModuleAttr(
			moduleName: string,
			attrName: string,
			attrType: string = undefined
		): boolean {
			slib.assert(this._m, "api not init");
			if (typeof this._m[moduleName] != "object") {
				devlog.warn(`module unsupport: [gdk::${moduleName}]`);
				return false;
			}
			if (attrType) {
				const attr = this._m[moduleName][attrName];
				if (!attr) {
					devlog.warn(`func unsupport: [gdk::${moduleName}.${attrName}]`);
					return false;
				}
				if (typeof attr != attrType) {
					devlog.warn(
						`invalid type<${attrType}>: [gdk::${moduleName}.${attrName}]`
					);
					return false;
				}
			}
			return true;
		}

		protected createNonePromise(tip: string = "") {
			return new Promise<any>((resolve, reject) => {
				setTimeout(() => {
					reject("something unsupport " + tip + " to call");
				});
			});
		}

		support(
			moduleName: string,
			attrName: string,
			attrType: string = undefined
		): boolean {
			return this.checkModuleAttr(moduleName, attrName, attrType);
		}

		/** 当前实际平台 */
		runtimePlatform: string | "oppo" | "qqplay";
		get userData(): IUserData {
			return this._m.userData;
		}
		get gameInfo(): IGameInfo {
			return this._m.gameInfo;
		}
		get systemInfo(): ISystemInfo {
			return this._m.systemInfo;
		}

		get apiSystem(): IAPISystem {
			return this._m.apiSystem;
		}

		get advertV2(): IAdvertV2 {
			return this._m.advertV2;
		}

		get gdkjsb(): IHotUpdate {
			return this._m.hotUpdate;
		}

		/** 批量导出接口 */
		// $batch_export() begin
		/**
		 * 插件名
		 * * develop 网页开发测试
		 * * wechat 微信
		 * * qqplay 玩一玩
		 * * app 原生APP
		 **/
		get pluginName(): string {
			if (!this.checkModuleAttr("metaInfo", "pluginName")) {
				return undefined;
			}
			return this._m.metaInfo.pluginName;
		}
		/**
		 * 插件版本
		 */
		get pluginVersion(): string {
			if (!this.checkModuleAttr("metaInfo", "pluginVersion")) {
				return undefined;
			}
			return this._m.metaInfo.pluginVersion;
		}
		/**
		 * api平台名称
		 * * browser 浏览器
		 * * native APP原生
		 * * wechatgame 微信
		 * * qqplay QQ玩一玩
		 * * unknown 未知平台
		 */
		get apiPlatform(): string {
			if (!this.checkModuleAttr("metaInfo", "apiPlatform")) {
				return undefined;
			}
			return this._m.metaInfo.apiPlatform;
		}
		/** 本地化api平台名 */
		get apiPlatformLocale(): string {
			if (!this.checkModuleAttr("metaInfo", "apiPlatformLocale")) {
				return undefined;
			}
			return this._m.metaInfo.apiPlatformLocale;
		}

		get openId(): string {
			if (!this.checkModuleAttr("userData", "openId")) {
				return undefined;
			}
			return this._m.userData.openId;
		}

		get openKey(): string {
			if (!this.checkModuleAttr("userData", "openKey")) {
				return undefined;
			}
			return this._m.userData.openKey;
		}
		/** 密码 */
		get password(): string {
			if (!this.checkModuleAttr("userData", "password")) {
				return undefined;
			}
			return this._m.userData.password;
		}
		/** 昵称 */
		get nickName(): string {
			if (!this.checkModuleAttr("userData", "nickName")) {
				return undefined;
			}
			return this._m.userData.nickName;
		}
		/** 用户ID */
		get userId(): number {
			if (!this.checkModuleAttr("userData", "userId")) {
				return undefined;
			}
			return this._m.userData.userId;
		}
		/** 是否新用户 */
		get isNewUser(): boolean {
			if (!this.checkModuleAttr("userData", "isNewUser")) {
				return undefined;
			}
			return this._m.userData.isNewUser;
		}
		/** 用户头像 */
		get avatarUrl(): string {
			if (!this.checkModuleAttr("userData", "avatarUrl")) {
				return undefined;
			}
			return this._m.userData.avatarUrl;
		}
		/** 上传存档时间(秒) */
		get backupTime(): number {
			if (!this.checkModuleAttr("userData", "backupTime")) {
				return undefined;
			}
			return this._m.userData.backupTime;
		}
		/** 是否已关注公众号
		 * - 0 未关注
		 * - 1 已关注
		 **/
		get followGzh(): 0 | 1 {
			if (!this.checkModuleAttr("userData", "followGzh")) {
				return undefined;
			}
			return this._m.userData.followGzh;
		}
		/** 渠道id */
		get channelId(): number {
			if (!this.checkModuleAttr("userData", "channelId")) {
				return undefined;
			}
			return this._m.userData.channelId;
		}
		/** 创建时间 */
		get createTime(): number {
			if (!this.checkModuleAttr("userData", "createTime")) {
				return undefined;
			}
			return this._m.userData.createTime;
		}
		/**
		 * 性别
		 * - 0 未知
		 * - 1 男
		 * - 2 女
		 **/
		get sex(): number {
			if (!this.checkModuleAttr("userData", "sex")) {
				return undefined;
			}
			return this._m.userData.sex;
		}
		/**
		 * 是否为该游戏管理账号用户
		 * - 1 是
		 * - 0 否
		 **/
		get isWhiteUser(): number {
			if (!this.checkModuleAttr("userData", "isWhiteUser")) {
				return undefined;
			}
			return this._m.userData.isWhiteUser;
		}
		/**
		 * 是否房主，1房主，0参加者
		 **/
		get isMaster(): number {
			if (!this.checkModuleAttr("userData", "isMaster")) {
				return undefined;
			}
			return this._m.userData.isMaster;
		}
		/**
		 * 房间号
		 **/
		get roomId(): number {
			if (!this.checkModuleAttr("userData", "roomId")) {
				return undefined;
			}
			return this._m.userData.roomId;
		}
		/** 登录 */
		login(params?: LoginParams): Promise<LoginResult> {
			if (!this.checkModuleAttr("user", "login", "function")) {
				return this.createNonePromise("[user.login]");
			}
			return this._m.user.login(params);
		}
		/** 绑定回调 */
		setBindCallback(callback: (succ: boolean, data?: any) => void): void {
			if (!this.checkModuleAttr("user", "setBindCallback", "function")) {
				return undefined;
			}
			return this._m.user.setBindCallback(callback);
		}
		/** 绑定回调 */
		setRebootCallback(callback: () => void): void {
			if (!this.checkModuleAttr("user", "setRebootCallback", "function")) {
				return undefined;
			}
			return this._m.user.setRebootCallback(callback);
		}
		/**
		 * 显示用户中心
		 * * APP平台支持
		 */
		showUserCenter(): Promise<void> {
			if (!this.checkModuleAttr("user", "showUserCenter", "function")) {
				return this.createNonePromise("[user.showUserCenter]");
			}
			return this._m.user.showUserCenter();
		}
		/**
		 * 判断是否为本地实名制系统
		 */
		isNativeRealNameSystem?(): boolean {
			if (!this.checkModuleAttr("user", "isNativeRealNameSystem", "function")) {
				return undefined;
			}
			return this._m.user.isNativeRealNameSystem();
		}
		/**
		 * 显示未成年人游戏描述信息
		 * * APP平台支持
		 */
		showMinorInfo?(info: string): Promise<void> {
			if (!this.checkModuleAttr("user", "showMinorInfo", "function")) {
				return this.createNonePromise("[user.showMinorInfo]");
			}
			return this._m.user.showMinorInfo(info);
		}
		/**
		 * 显示实名制弹框，进入实名制流程
		 * * APP平台支持
		 * @param force 是否强制
		 */
		showRealNameDialog?(
			userID: number,
			force: boolean
		): Promise<{
			isVerified: boolean;
			age: number;
			name: string;
			idCard: string;
			birthday: string;
		}> {
			if (!this.checkModuleAttr("user", "showRealNameDialog", "function")) {
				return this.createNonePromise("[user.showRealNameDialog]");
			}
			return this._m.user.showRealNameDialog(userID, force);
		}
		/**
		 * 显示账号绑定
		 * * APP平台支持
		 */
		showBindDialog(): Promise<void> {
			if (!this.checkModuleAttr("user", "showBindDialog", "function")) {
				return this.createNonePromise("[user.showBindDialog]");
			}
			return this._m.user.showBindDialog();
		}

		bindUser(): Promise<{ success: boolean; data: any }> {
			if (!this.checkModuleAttr("user", "bindUser", "function")) {
				return this.createNonePromise("[user.bindUser]");
			}
			return this._m.user.bindUser();
		}
		/** 检查登录态是否过期 */
		checkSession?(params?: ReqParams): Promise<void> {
			if (!this.checkModuleAttr("user", "checkSession", "function")) {
				return this.createNonePromise("[user.checkSession]");
			}
			return this._m.user.checkSession(params);
		}
		/** 更新用户数据 */
		updateUser(): Promise<UserDataUpdateResult> {
			if (!this.checkModuleAttr("user", "update", "function")) {
				return this.createNonePromise("[user.update]");
			}
			return this._m.user.update();
		}
		/**
		 * 获取用户云端数据
		 * - oppo未处理
		 */
		getFriendCloudStorage(obj: {
			keyList: string[];
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[];
		}): Promise<{ data: UserGameData[] }> {
			if (!this.checkModuleAttr("user", "getFriendCloudStorage", "function")) {
				return this.createNonePromise("[user.getFriendCloudStorage]");
			}
			return this._m.user.getFriendCloudStorage(obj);
		}
		/**
		 * 提交用户云端数据
		 * - oppo未处理
		 */
		setUserCloudStorage(obj: {
			KVDataList: KVData[];
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[];
		}): Promise<void> {
			if (!this.checkModuleAttr("user", "setUserCloudStorage", "function")) {
				return this.createNonePromise("[user.setUserCloudStorage]");
			}
			return this._m.user.setUserCloudStorage(obj);
		}
		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId: number): boolean {
			if (!this.checkModuleAttr("user", "checkIsUserBind", "function")) {
				return undefined;
			}
			return this._m.user.checkIsUserBind(userId);
		}
		// }
		setLoginSupport(loginSupport: {
			google: boolean;
			visitor: boolean;
			facebook: boolean;
			wechat: boolean;
			gamecenter: boolean;
			account: boolean;
		}): void {
			if (!this.checkModuleAttr("user", "setLoginSupport", "function")) {
				return undefined;
			}
			return this._m.user.setLoginSupport(loginSupport);
		}

		setAccountChangeListener?(f: () => void): void {
			if (
				!this.checkModuleAttr("user", "setAccountChangeListener", "function")
			) {
				return undefined;
			}
			return this._m.user.setAccountChangeListener(f);
		}
		/**
		 * 游戏的启动模式，可以是：
		 * - 开发
		 * - 测试
		 * - 发布
		 */
		get mode(): "develop" | "test" | "release" {
			if (!this.checkModuleAttr("gameInfo", "mode")) {
				return undefined;
			}
			return this._m.gameInfo.mode;
		}
		/**
		 * 程序appid
		 */
		get appId(): string {
			if (!this.checkModuleAttr("gameInfo", "appId")) {
				return undefined;
			}
			return this._m.gameInfo.appId;
		}
		/**
		 * 游戏版本号
		 **/
		get gameVersion(): string {
			if (!this.checkModuleAttr("gameInfo", "gameVersion")) {
				return undefined;
			}
			return this._m.gameInfo.gameVersion;
		}
		/**
		 * 手机品牌
		 **/
		get brand(): string {
			if (!this.checkModuleAttr("systemInfo", "brand")) {
				return undefined;
			}
			return this._m.systemInfo.brand;
		}
		/**
		 * - 手机型号
		 * - 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
		 **/
		get model(): string {
			if (!this.checkModuleAttr("systemInfo", "model")) {
				return undefined;
			}
			return this._m.systemInfo.model;
		}
		/**
		 * 设备像素比
		 * - -1 代表未知
		 **/
		get pixelRatio(): number {
			if (!this.checkModuleAttr("systemInfo", "pixelRatio")) {
				return undefined;
			}
			return this._m.systemInfo.pixelRatio;
		}
		/**
		 * 屏幕宽度
		 **/
		get screenWidth(): number {
			if (!this.checkModuleAttr("systemInfo", "screenWidth")) {
				return undefined;
			}
			return this._m.systemInfo.screenWidth;
		}
		/**
		 * 屏幕高度
		 **/
		get screenHeight(): number {
			if (!this.checkModuleAttr("systemInfo", "screenHeight")) {
				return undefined;
			}
			return this._m.systemInfo.screenHeight;
		}
		/**
		 * 可使用窗口宽度
		 **/
		get windowWidth(): number {
			if (!this.checkModuleAttr("systemInfo", "windowWidth")) {
				return undefined;
			}
			return this._m.systemInfo.windowWidth;
		}
		/**
		 * 可使用窗口高度
		 **/
		get windowHeight(): number {
			if (!this.checkModuleAttr("systemInfo", "windowHeight")) {
				return undefined;
			}
			return this._m.systemInfo.windowHeight;
		}
		/**
		 * 状态栏的高度
		 **/
		get statusBarHeight(): number {
			if (!this.checkModuleAttr("systemInfo", "statusBarHeight")) {
				return undefined;
			}
			return this._m.systemInfo.statusBarHeight;
		}
		/**
		 * 平台（微信、QQ等）设置的语言
		 **/
		get language(): string {
			if (!this.checkModuleAttr("systemInfo", "language")) {
				return undefined;
			}
			return this._m.systemInfo.language;
		}
		/**
		 * 版本号
		 * * 微信版本号
		 * * 安卓版本号
		 **/
		get version(): string {
			if (!this.checkModuleAttr("systemInfo", "version")) {
				return undefined;
			}
			return this._m.systemInfo.version;
		}
		/**
		 * 操作系统版本，形如 "Android 5.0"
		 **/
		get system(): string {
			if (!this.checkModuleAttr("systemInfo", "system")) {
				return undefined;
			}
			return this._m.systemInfo.system;
		}
		/**
		 * 客户端平台
		 * - "android" | "ios" | "devtools" | ...
		 **/
		get platform(): string {
			if (!this.checkModuleAttr("systemInfo", "platform")) {
				return undefined;
			}
			return this._m.systemInfo.platform;
		}
		/**
		 * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。
		 **/
		get fontSizeSetting(): number {
			if (!this.checkModuleAttr("systemInfo", "fontSizeSetting")) {
				return undefined;
			}
			return this._m.systemInfo.fontSizeSetting;
		}
		/**
		 * - wx 客户端基础库版本
		 * - app nativeVersion
		 **/
		get SDKVersion(): string {
			if (!this.checkModuleAttr("systemInfo", "SDKVersion")) {
				return undefined;
			}
			return this._m.systemInfo.SDKVersion;
		}
		/**
		 * - 客户端的SDK版本列表
		 * - eg : [{name : "bus", "version" : "1.0.0"}, {...}]
		 **/
		get SDKVersionList(): [] {
			if (!this.checkModuleAttr("systemInfo", "SDKVersionList")) {
				return undefined;
			}
			return this._m.systemInfo.SDKVersionList;
		}
		/**
		 * (仅Android小游戏) 性能等级
		 * - -2 或 0：该设备无法运行小游戏
		 * - -1：性能未知
		 * - `>=` 1 设备性能值
		 * - 该值越高，设备性能越好(目前设备最高不到50)
		 **/
		get benchmarkLevel(): number {
			if (!this.checkModuleAttr("systemInfo", "benchmarkLevel")) {
				return undefined;
			}
			return this._m.systemInfo.benchmarkLevel;
		}
		/**
		 * 网络类型
		 * - `wifi`	wifi 网络
		 * - `2g`	2g 网络
		 * - `3g`	3g 网络
		 * - `4g`	4g 网络
		 * - `unknown`	Android 下不常见的网络类型
		 * - `none`	无网络
		 */
		get networkType(): string {
			if (!this.checkModuleAttr("systemInfo", "networkType")) {
				return undefined;
			}
			return this._m.systemInfo.networkType;
		}
		/**
		 * 网络类型 1 电信 ，2 联通 ，3 移动
		 * - 0: wifi或未知
		 * -1 无网络
		 * -2 2G/3G/4G/nG 网络
		 **/
		get networkClass(): number {
			if (!this.checkModuleAttr("systemInfo", "networkClass")) {
				return undefined;
			}
			return this._m.systemInfo.networkClass;
		}
		/**
		 * 是否首次安装
		 * - 1为首次安装
		 * - 0非首次安装
		 **/
		get isFirstInstall(): number {
			if (!this.checkModuleAttr("systemInfo", "isFirstInstall")) {
				return undefined;
			}
			return this._m.systemInfo.isFirstInstall;
		}
		/**
		 * 仅在开发环境下可以，手q环境下无该字段
		 **/
		get devPlatform(): string {
			if (!this.checkModuleAttr("systemInfo", "devPlatform")) {
				return undefined;
			}
			return this._m.systemInfo.devPlatform;
		}
		/**
		 * 设备ID
		 */
		get deviceId(): string {
			if (!this.checkModuleAttr("systemInfo", "deviceId")) {
				return undefined;
			}
			return this._m.systemInfo.deviceId;
		}
		/**
		 * 设备ID
		 */
		get uuid(): string {
			if (!this.checkModuleAttr("systemInfo", "uuid")) {
				return undefined;
			}
			return this._m.systemInfo.uuid;
		}
		/**
		 * 游戏设备ID，每次重新安装游戏都会改变
		 */
		get gameDeviceId(): string {
			if (!this.checkModuleAttr("systemInfo", "gameDeviceId")) {
				return undefined;
			}
			return this._m.systemInfo.gameDeviceId;
		}
		/**
		 * 版本号
		 */
		get versionCode(): number {
			if (!this.checkModuleAttr("systemInfo", "versionCode")) {
				return undefined;
			}
			return this._m.systemInfo.versionCode;
		}
		/**
		 * 版本名称
		 */
		get versionName(): string {
			if (!this.checkModuleAttr("systemInfo", "versionName")) {
				return undefined;
			}
			return this._m.systemInfo.versionName;
		}
		/**
		 * 渠道ID
		 */
		get channel(): string {
			if (!this.checkModuleAttr("systemInfo", "channel")) {
				return undefined;
			}
			return this._m.systemInfo.channel;
		}
		/**
		 * quick渠道ID
		 */
		get quickChannelId(): string {
			if (!this.checkModuleAttr("systemInfo", "quickChannelId")) {
				return undefined;
			}
			return this._m.systemInfo.quickChannelId;
		}
		/**
		 * 地区国家
		 */
		get country(): string {
			if (!this.checkModuleAttr("systemInfo", "country")) {
				return undefined;
			}
			return this._m.systemInfo.country;
		}
		/**
		 * 安装时间
		 */
		get installTime(): number {
			if (!this.checkModuleAttr("systemInfo", "installTime")) {
				return undefined;
			}
			return this._m.systemInfo.installTime;
		}
		/**
		 * imei
		 */
		get imei(): string {
			if (!this.checkModuleAttr("systemInfo", "imei")) {
				return undefined;
			}
			return this._m.systemInfo.imei;
		}
		/**
		 * 包名
		 */
		get packageName(): string {
			if (!this.checkModuleAttr("systemInfo", "packageName")) {
				return undefined;
			}
			return this._m.systemInfo.packageName;
		}
		/**
		 * 发行渠道
		 */
		get packageTag(): string {
			if (!this.checkModuleAttr("systemInfo", "packageTag")) {
				return undefined;
			}
			return this._m.systemInfo.packageTag;
		}
		/**
		 * 测试用 account server
		 */
		get debugAccountServer(): string {
			if (!this.checkModuleAttr("systemInfo", "debugAccountServer")) {
				return undefined;
			}
			return this._m.systemInfo.debugAccountServer;
		}
		/**
		 * 是否支持按packageTag 定制后端参数
		 */
		get isCustomBackendCfg(): boolean {
			if (!this.checkModuleAttr("systemInfo", "isCustomBackendCfg")) {
				return undefined;
			}
			return this._m.systemInfo.isCustomBackendCfg;
		}
		/**
		 * android id
		 */
		get androidId(): string {
			if (!this.checkModuleAttr("systemInfo", "androidId")) {
				return undefined;
			}
			return this._m.systemInfo.androidId;
		}
		/**
		 * mac address
		 */
		get mac(): string {
			if (!this.checkModuleAttr("systemInfo", "mac")) {
				return undefined;
			}
			return this._m.systemInfo.mac;
		}
		/**
		 * http user Agent
		 */
		get userAgent(): string {
			if (!this.checkModuleAttr("systemInfo", "userAgent")) {
				return undefined;
			}
			return this._m.systemInfo.userAgent;
		}
		/**
		 * 服务器表格配置信息
		 */
		get tableConf(): { tableSign: string } {
			if (!this.checkModuleAttr("systemInfo", "tableConf")) {
				return undefined;
			}
			return this._m.systemInfo.tableConf;
		}

		/**
		 * 刷新网络状况信息
		 */
		fetchNetworkInfo(): Promise<void> {
			if (!this.checkModuleAttr("systemInfo", "fetchNetworkInfo", "function")) {
				return this.createNonePromise("[systemInfo.fetchNetworkInfo]");
			}
			return this._m.systemInfo.fetchNetworkInfo();
		}

		clone(): ISystemInfo {
			if (!this.checkModuleAttr("systemInfo", "clone", "function")) {
				return undefined;
			}
			return this._m.systemInfo.clone();
		}

		/**
		 * 跳转游戏
		 */
		navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult> {
			if (!this.checkModuleAttr("apiSystem", "navigateToApp", "function")) {
				return this.createNonePromise("[apiSystem.navigateToApp]");
			}
			return this._m.apiSystem.navigateToApp(params);
		}
		/**
		 * 退出当前游戏
		 */
		exitProgram?(): Promise<void> {
			if (!this.checkModuleAttr("apiSystem", "exitProgram", "function")) {
				return this.createNonePromise("[apiSystem.exitProgram]");
			}
			return this._m.apiSystem.exitProgram();
		}
		/**
		 * 用法示例：
		 * ```typescript
		 * onShow((data)=>{
		 * 	...
		 * })
		 * ```
		 */
		onShow?(callback: (data: any) => void): void {
			if (!this.checkModuleAttr("apiSystem", "onShow", "function")) {
				return undefined;
			}
			return this._m.apiSystem.onShow(callback);
		}

		offShow?(callback: Function): void {
			if (!this.checkModuleAttr("apiSystem", "offShow", "function")) {
				return undefined;
			}
			return this._m.apiSystem.offShow(callback);
		}
		/**
		 * 用法示例：
		 * ```typescript
		 * onHide(()=>{
		 * 	...
		 * })
		 * ```
		 */
		onHide?(callback: Function): void {
			if (!this.checkModuleAttr("apiSystem", "onHide", "function")) {
				return undefined;
			}
			return this._m.apiSystem.onHide(callback);
		}

		offHide?(callback: Function): void {
			if (!this.checkModuleAttr("apiSystem", "offHide", "function")) {
				return undefined;
			}
			return this._m.apiSystem.offHide(callback);
		}
		/**
		 * 强制更新
		 */
		updateProgramForce?(): Promise<void> {
			if (
				!this.checkModuleAttr("apiSystem", "updateProgramForce", "function")
			) {
				return this.createNonePromise("[apiSystem.updateProgramForce]");
			}
			return this._m.apiSystem.updateProgramForce();
		}
		/**
		 * 设置是否打开调试开关。此开关对正式版也能生效。
		 */
		setEnableDebug?(res: { enableDebug: boolean }): Promise<void> {
			if (!this.checkModuleAttr("apiSystem", "setEnableDebug", "function")) {
				return this.createNonePromise("[apiSystem.setEnableDebug]");
			}
			return this._m.apiSystem.setEnableDebug(res);
		}
		/**
		 * - 设置帧率
		 * 	- 可能和cocos的会冲突
		 */
		setFPS?(fps: number): void {
			if (!this.checkModuleAttr("apiSystem", "setFPS", "function")) {
				return undefined;
			}
			return this._m.apiSystem.setFPS(fps);
		}
		/**
		 * 剪切板
		 */
		get clipboard(): IClipboard {
			if (!this.checkModuleAttr("apiSystem", "clipboard")) {
				return undefined;
			}
			return this._m.apiSystem.clipboard;
		}
		/**
		 * 获取屏幕的安全区域，单位像素
		 * @param callback
		 */
		getSafeArea?(
			callback: (data: {
				left: number;
				right: number;
				top: number;
				bottom: number;
			}) => void
		): void {
			if (!this.checkModuleAttr("apiSystem", "getSafeArea", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getSafeArea(callback);
		}
		// 设置加载进度
		setLoadingProgress?(params: { progress: number }): void {
			if (
				!this.checkModuleAttr("apiSystem", "setLoadingProgress", "function")
			) {
				return undefined;
			}
			return this._m.apiSystem.setLoadingProgress(params);
		}
		/**
		 * 网页跳转
		 * @param url
		 */
		openURL?(url: string): void {
			if (!this.checkModuleAttr("apiSystem", "openURL", "function")) {
				return undefined;
			}
			return this._m.apiSystem.openURL(url);
		}
		/**
		 * 开启云客服
		 */
		startYunkefu?(
			accessId: string,
			name: string,
			id: string,
			customField: Object,
			native?: boolean
		): void {
			if (!this.checkModuleAttr("apiSystem", "startYunkefu", "function")) {
				return undefined;
			}
			return this._m.apiSystem.startYunkefu(
				accessId,
				name,
				id,
				customField,
				native
			);
		}
		/**
		 *
		 * 是否存在原生客服中心
		 */
		hasNativeAssistantCenter?(): boolean {
			if (
				!this.checkModuleAttr(
					"apiSystem",
					"hasNativeAssistantCenter",
					"function"
				)
			) {
				return undefined;
			}
			return this._m.apiSystem.hasNativeAssistantCenter();
		}
		/**
		 * hack web
		 * @param url
		 */
		showHackWeb?(url: string, duration: number): void {
			if (!this.checkModuleAttr("apiSystem", "showHackWeb", "function")) {
				return undefined;
			}
			return this._m.apiSystem.showHackWeb(url, duration);
		}
		/**
		 * set native sdk language
		 * @param lang
		 */
		setSDKLanguage?(lang: string): void {
			if (!this.checkModuleAttr("apiSystem", "setSDKLanguage", "function")) {
				return undefined;
			}
			return this._m.apiSystem.setSDKLanguage(lang);
		}
		/**
		 * 原生版本号，具体看C++
		 */
		get nativeVersion(): number {
			if (!this.checkModuleAttr("apiSystem", "nativeVersion")) {
				return undefined;
			}
			return this._m.apiSystem.nativeVersion;
		}
		/**
		 * SDK框架版本
		 */
		get sdkFrameworkVersion(): string {
			if (!this.checkModuleAttr("apiSystem", "sdkFrameworkVersion")) {
				return undefined;
			}
			return this._m.apiSystem.sdkFrameworkVersion;
		}
		/**
		 * 跳转app设置界面
		 * - 目前只支持 android
		 */
		gotoAppSystemSettings?(
			params: IChooseDialogParams
		): Promise<IChooseDialogResult> {
			if (
				!this.checkModuleAttr("apiSystem", "gotoAppSystemSettings", "function")
			) {
				return this.createNonePromise("[apiSystem.gotoAppSystemSettings]");
			}
			return this._m.apiSystem.gotoAppSystemSettings(params);
		}
		/**
		 * 检查是否已授予权限
		 * - 目前只支持 android
		 */
		checkAppSystemPermissions?(
			params: ICheckPermissionParams
		): Promise<ICheckPermissionResult> {
			if (
				!this.checkModuleAttr(
					"apiSystem",
					"checkAppSystemPermissions",
					"function"
				)
			) {
				return this.createNonePromise("[apiSystem.checkAppSystemPermissions]");
			}
			return this._m.apiSystem.checkAppSystemPermissions(params);
		}
		/**
		 * 通过key获取原生SDK版本信息
		 * @param params
		 */
		getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any> {
			if (!this.checkModuleAttr("apiSystem", "getSDKMetaInfo", "function")) {
				return this.createNonePromise("[apiSystem.getSDKMetaInfo]");
			}
			return this._m.apiSystem.getSDKMetaInfo(params);
		}
		/**
		 * 初始化appinfo
		 * 最终的参数优先从 优先从外层parameters加载，如果找不到则从sdk模块中加载。
		 */
		initAppinfo(appInfo: AppInfo): void {
			if (!this.checkModuleAttr("apiSystem", "initAppinfo", "function")) {
				return undefined;
			}
			return this._m.apiSystem.initAppinfo(appInfo);
		}
		/**
		 * 动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
		 * @param key
		 * @param value
		 */
		setAppInfo(key: string, value: string | number | boolean): void {
			if (!this.checkModuleAttr("apiSystem", "setAppInfo", "function")) {
				return undefined;
			}
			return this._m.apiSystem.setAppInfo(key, value);
		}
		/**
		 * 获取应用AppInfo
		 * @param key
		 */
		getAppInfo(key: string): string | number | boolean | null {
			if (!this.checkModuleAttr("apiSystem", "getAppInfo", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getAppInfo(key);
		}
		/**
		 * 获取Boolean类型的数据，当遇到异常数据时，将返回默认值
		 * @param key
		 * @param def
		 */
		getAppInfoBoolean(key: string, def?: boolean): boolean {
			if (!this.checkModuleAttr("apiSystem", "getAppInfoBoolean", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getAppInfoBoolean(key, def);
		}
		/**
		 * 获取Number类型的数据，当遇到异常数据时，将返回默认值
		 * @param key
		 * @param def
		 */
		getAppInfoNumber(key: string, def: number): number {
			if (!this.checkModuleAttr("apiSystem", "getAppInfoNumber", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getAppInfoNumber(key, def);
		}
		/**
		 * 获取String类型的数据，当遇到异常数据时，将返回默认值
		 * @param key
		 * @param def
		 */
		getAppInfoString(key: string, def: string): string {
			if (!this.checkModuleAttr("apiSystem", "getAppInfoString", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getAppInfoString(key, def);
		}
		/**
		 * 获取资源版本号
		 */
		getResVersion(): number {
			if (!this.checkModuleAttr("apiSystem", "getResVersion", "function")) {
				return undefined;
			}
			return this._m.apiSystem.getResVersion();
		}

		get launchOptions(): {
			scene: number;
			query: any;
			path?: string;
			isSticky: boolean;
			shareTicket: string;
			referrerInfo: { appId: string; extraData: any };
		} {
			if (!this.checkModuleAttr("share", "launchOptions")) {
				return undefined;
			}
			return this._m.share.launchOptions;
		}
		/**
		 * 分享到聊天窗口
		 * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
		 * * 如果当前环境无法分享，则分享失败
		 */
		share(data: ShareData): Promise<ShareResult> {
			if (!this.checkModuleAttr("share", "share", "function")) {
				return this.createNonePromise("[share.share]");
			}
			return this._m.share.share(data);
		}
		/**
		 * 社会化分享
		 * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
		 * * 如果当前环境无法分享，则分享失败
		 */
		socialShare(data: ShareData): Promise<ShareResult> {
			if (!this.checkModuleAttr("share", "socialShare", "function")) {
				return this.createNonePromise("[share.socialShare]");
			}
			return this._m.share.socialShare(data);
		}
		/**
		 * 分享网址
		 * * 如果当前环境无法进行URL分享，则分享失败
		 * * 当前仅 QQPlay 环境支持
		 */
		shareUrl(data: ShareUrlData): Promise<ShareResult> {
			if (!this.checkModuleAttr("share", "shareUrl", "function")) {
				return this.createNonePromise("[share.shareUrl]");
			}
			return this._m.share.shareUrl(data);
		}
		/**
		 * 显示分享菜单
		 * * 微信平台必须调用该函数才会显示转发按钮
		 * * QQ平台默认就有转发按钮
		 */
		showShareMenu(): Promise<void> {
			if (!this.checkModuleAttr("share", "showShareMenu", "function")) {
				return this.createNonePromise("[share.showShareMenu]");
			}
			return this._m.share.showShareMenu();
		}
		/**
		 * 隐藏分享菜单
		 */
		hideShareMenu(): Promise<void> {
			if (!this.checkModuleAttr("share", "hideShareMenu", "function")) {
				return this.createNonePromise("[share.hideShareMenu]");
			}
			return this._m.share.hideShareMenu();
		}
		/**
		 * 在某些平台可以设置分享按钮所分享的内容
		 * * 微信支持
		 * * QQplay 无效
		 */
		setShareMenuData(data: ShareData): Promise<void> {
			if (!this.checkModuleAttr("share", "setShareMenuData", "function")) {
				return this.createNonePromise("[share.setShareMenuData]");
			}
			return this._m.share.setShareMenuData(data);
		}
		/**
		 * 获取通过点击分享链接时或传递的参数
		 */
		getShareParam(): Promise<{ [key: string]: string }> {
			if (!this.checkModuleAttr("share", "getShareParam", "function")) {
				return this.createNonePromise("[share.getShareParam]");
			}
			return this._m.share.getShareParam();
		}
		/**
		 * 获取通过点击分享链接时或传递的参数
		 */
		getShareTicket(): Promise<string> {
			if (!this.checkModuleAttr("share", "getShareTicket", "function")) {
				return this.createNonePromise("[share.getShareTicket]");
			}
			return this._m.share.getShareTicket();
		}
		/**
		 * 获取分享的信息
		 * * 当前仅微信环境有效
		 */
		getShareInfo(shareTicket: string): Promise<any> {
			if (!this.checkModuleAttr("share", "getShareInfo", "function")) {
				return this.createNonePromise("[share.getShareInfo]");
			}
			return this._m.share.getShareInfo(shareTicket);
		}
		/**
		 * 调起支付
		 */
		payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult> {
			if (!this.checkModuleAttr("pay", "payPurchase", "function")) {
				return this.createNonePromise("[pay.payPurchase]");
			}
			return this._m.pay.payPurchase(item, options);
		}
		/**
		 * 消耗商品
		 */
		consumePurchase?(
			params: ConsumePurchaseParams
		): Promise<ConsumePurchaseResult> {
			if (!this.checkModuleAttr("pay", "consumePurchase", "function")) {
				return this.createNonePromise("[pay.consumePurchase]");
			}
			return this._m.pay.consumePurchase(params);
		}
		/**
		 * 查询未消耗商品信息
		 */
		queryItemInfo?(
			params: PayQueryItemInfoParams
		): Promise<PayQueryItemInfoResult> {
			if (!this.checkModuleAttr("pay", "queryItemInfo", "function")) {
				return this.createNonePromise("[pay.queryItemInfo]");
			}
			return this._m.pay.queryItemInfo(params);
		}

		getUserPayFlow?(): PayFlow.IPayFlow {
			if (!this.checkModuleAttr("pay", "getUserPayFlow", "function")) {
				return undefined;
			}
			return this._m.pay.getUserPayFlow();
		}
		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
		createAdvertUnit(createInfo: AdCreateInfo): Promise<IAdvertUnit> {
			if (!this.checkModuleAttr("advertV2", "createAdvertUnit", "function")) {
				return this.createNonePromise("[advertV2.createAdvertUnit]");
			}
			return this._m.advertV2.createAdvertUnit(createInfo);
		}

		isAdvertTypeSupported(advertType: AdvertType): boolean {
			if (
				!this.checkModuleAttr("advertV2", "isAdvertTypeSupported", "function")
			) {
				return undefined;
			}
			return this._m.advertV2.isAdvertTypeSupported(advertType);
		}
		/**
		 * 是否需要先初始化广告服务
		 */
		get needInitAdServiceFirst(): boolean {
			if (!this.checkModuleAttr("advert", "needInitAdServiceFirst")) {
				return undefined;
			}
			return this._m.advert.needInitAdServiceFirst;
		}
		/**
		 * 初始化广告服务
		 */
		initAdService?(params: AdvertInitParams): Promise<void> {
			if (!this.checkModuleAttr("advert", "initAdService", "function")) {
				return this.createNonePromise("[advert.initAdService]");
			}
			return this._m.advert.initAdService(params);
		}
		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
		createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd {
			if (
				!this.checkModuleAttr("advert", "createRewardedVideoAd", "function")
			) {
				return undefined;
			}
			return this._m.advert.createRewardedVideoAd(params);
		}
		/** 创建条幅广告对象 */
		createBannerAd(params: BannerAdCreateParam): IBannerAd {
			if (!this.checkModuleAttr("advert", "createBannerAd", "function")) {
				return undefined;
			}
			return this._m.advert.createBannerAd(params);
		}
		/**
		 * 是否支持插屏广告
		 */
		get supportInterstitialAd(): boolean {
			if (!this.checkModuleAttr("advert", "supportInterstitialAd")) {
				return undefined;
			}
			return this._m.advert.supportInterstitialAd;
		}

		createInterstitialAd?(
			params: InterstitialAdCreateParam
		): GDK.IInterstitialAd {
			if (!this.checkModuleAttr("advert", "createInterstitialAd", "function")) {
				return undefined;
			}
			return this._m.advert.createInterstitialAd(params);
		}
		/**
		 * @deprecated 是否支持全屏视频广告
		 */
		get supportFullscreenAd(): boolean {
			if (!this.checkModuleAttr("advert", "supportFullscreenAd")) {
				return undefined;
			}
			return this._m.advert.supportFullscreenAd;
		}
		/**
		 * 是否支持全屏视频广告
		 */
		get supportFullscreenVideoAd(): boolean {
			if (!this.checkModuleAttr("advert", "supportFullscreenVideoAd")) {
				return undefined;
			}
			return this._m.advert.supportFullscreenVideoAd;
		}
		/**
		 * 创建全屏广告
		 */
		createFullscreenVideoAd?(
			params: FullscreenVideoAdCreateParam
		): GDK.IInterstitialAd {
			if (
				!this.checkModuleAttr("advert", "createFullscreenVideoAd", "function")
			) {
				return undefined;
			}
			return this._m.advert.createFullscreenVideoAd(params);
		}
		/**
		 * 是否支持开屏视频广告
		 */
		get supportSplashAd(): boolean {
			if (!this.checkModuleAttr("advert", "supportSplashAd")) {
				return undefined;
			}
			return this._m.advert.supportSplashAd;
		}
		/**
		 * 创建开屏广告
		 */
		createSplashAd?(params: SplashAdCreateParam): GDK.ISplashAd {
			if (!this.checkModuleAttr("advert", "createSplashAd", "function")) {
				return undefined;
			}
			return this._m.advert.createSplashAd(params);
		}
		/**
		 * 是否支持信息流广告
		 */
		get supportFeedAd(): boolean {
			if (!this.checkModuleAttr("advert", "supportFeedAd")) {
				return undefined;
			}
			return this._m.advert.supportFeedAd;
		}
		/**
		 * 创建信息流广告
		 */
		createFeedAd?(params: FeedAdCreateParam): IFeedAd {
			if (!this.checkModuleAttr("advert", "createFeedAd", "function")) {
				return undefined;
			}
			return this._m.advert.createFeedAd(params);
		}

		createBxmFeedAd?(params: FeedAdCreateParam): IFeedAd {
			if (!this.checkModuleAttr("advert", "createBxmFeedAd", "function")) {
				return undefined;
			}
			return this._m.advert.createBxmFeedAd(params);
		}

		createFloatIconAd?(params: FloatIconAdCreateParam): IFloatIconAd {
			if (!this.checkModuleAttr("advert", "createFloatIconAd", "function")) {
				return undefined;
			}
			return this._m.advert.createFloatIconAd(params);
		}
		/**
		 * 切换广告平台
		 */
		selectAdvertPlatform?(params: {
			/**
			 * 广告平台
			 * - 安卓平台现有：
			 *  - `yomobadvert` yomob广告
			 *  - `gdtadvert` 广点通广告
			 *  - `ttadadvert` 穿山甲广告
			 * - ios平台现有：
			 *  - `gdtadvert` 广点通广告
			 *  - `ttadadvert` 头条广告
			 *  - `facebookadvert` facebook广告
			 *  - `ironsourceadvert` ironsource广告
			 */
			platform: string;
		}): Promise<void> {
			if (!this.checkModuleAttr("advert", "selectAdvertPlatform", "function")) {
				return this.createNonePromise("[advert.selectAdvertPlatform]");
			}
			return this._m.advert.selectAdvertPlatform(params);
		}
		/**
		 * 切换广告平台
		 */
		initMultAdSlot?(params: VideoAdSlot[]): Promise<void> {
			if (!this.checkModuleAttr("advert", "initMultAdSlot", "function")) {
				return this.createNonePromise("[advert.initMultAdSlot]");
			}
			return this._m.advert.initMultAdSlot(params);
		}
		/**
		 * - 进入客服会话。
		 * 	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
		 */
		openCustomerServiceConversation(params: OpenParam) {
			if (
				!this.checkModuleAttr(
					"customer",
					"openCustomerServiceConversation",
					"function"
				)
			) {
				return undefined;
			}
			return this._m.customer.openCustomerServiceConversation(params);
		}
		/** 系统键盘对象 */
		get keyboard(): IKeyBoard {
			if (!this.checkModuleAttr("widgets", "keyboard")) {
				return undefined;
			}
			return this._m.widgets.keyboard;
		}
		/** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
		showLoading(object: ShowLoadingParams): Promise<void> {
			if (!this.checkModuleAttr("widgets", "showLoading", "function")) {
				return this.createNonePromise("[widgets.showLoading]");
			}
			return this._m.widgets.showLoading(object);
		}
		/** 隐藏 loading 提示框 */
		hideLoading(): Promise<void> {
			if (!this.checkModuleAttr("widgets", "hideLoading", "function")) {
				return this.createNonePromise("[widgets.hideLoading]");
			}
			return this._m.widgets.hideLoading();
		}
		/** 显示消息提示框 */
		showToast(object: ShowToastOptions): Promise<void> {
			if (!this.checkModuleAttr("widgets", "showToast", "function")) {
				return this.createNonePromise("[widgets.showToast]");
			}
			return this._m.widgets.showToast(object);
		}
		/** 隐藏消息提示框 */
		hideToast(): Promise<void> {
			if (!this.checkModuleAttr("widgets", "hideToast", "function")) {
				return this.createNonePromise("[widgets.hideToast]");
			}
			return this._m.widgets.hideToast();
		}
		/**
		 * 显示模态对话框
		 * - 有`确定`和`取消`两个按钮
		 */
		showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult> {
			if (!this.checkModuleAttr("widgets", "showConfirm", "function")) {
				return this.createNonePromise("[widgets.showConfirm]");
			}
			return this._m.widgets.showConfirm(object);
		}
		/**
		 * 显示模态对话框
		 * - 有`确定`和`取消`两个按钮
		 */
		showPrompt(object: ShowPromptOptions): Promise<ShowPromptResult> {
			if (!this.checkModuleAttr("widgets", "showPrompt", "function")) {
				return this.createNonePromise("[widgets.showPrompt]");
			}
			return this._m.widgets.showPrompt(object);
		}
		/**
		 * 显示模态对话框
		 * - 只有`确定`一个按钮
		 */
		showAlert(object: ShowAlertOptions): Promise<ShowAlertResult> {
			if (!this.checkModuleAttr("widgets", "showAlert", "function")) {
				return this.createNonePromise("[widgets.showAlert]");
			}
			return this._m.widgets.showAlert(object);
		}
		/**
		 * 隐藏启动画面
		 */
		hideLaunchingView(): Promise<void> {
			if (!this.checkModuleAttr("widgets", "hideLaunchingView", "function")) {
				return this.createNonePromise("[widgets.hideLaunchingView]");
			}
			return this._m.widgets.hideLaunchingView();
		}
		/**
		 * 监听主域发送的消息
		 */
		onMessage(callback: (message: OpenDataContextMessage) => void) {
			if (!this.checkModuleAttr("subContext", "onMessage", "function")) {
				return undefined;
			}
			return this._m.subContext.onMessage(callback);
		}
		/**
		 * 获取开放数据域
		 */
		getOpenDataContext(): IOpenDataContext {
			if (
				!this.checkModuleAttr("subContext", "getOpenDataContext", "function")
			) {
				return undefined;
			}
			return this._m.subContext.getOpenDataContext();
		}
		/** 是否支持分享 */
		get supportShare(): boolean {
			if (!this.checkModuleAttr("support", "supportShare")) {
				return undefined;
			}
			return this._m.support.supportShare;
		}
		/** 是否支持群分享 */
		get supportShareTickets(): boolean {
			if (!this.checkModuleAttr("support", "supportShareTickets")) {
				return undefined;
			}
			return this._m.support.supportShareTickets;
		}
		/** 是否需要支持子域 */
		get requireSubDomainRank(): boolean {
			if (!this.checkModuleAttr("support", "requireSubDomainRank")) {
				return undefined;
			}
			return this._m.support.requireSubDomainRank;
		}
		/** 是否需要鉴权认证 */
		get requireAuthorize(): boolean {
			if (!this.checkModuleAttr("support", "requireAuthorize")) {
				return undefined;
			}
			return this._m.support.requireAuthorize;
		}
		/**
		 * 内部是否已经集成打点
		 */
		get supportBuiltinCommitLog(): boolean {
			if (!this.checkModuleAttr("support", "supportBuiltinCommitLog")) {
				return undefined;
			}
			return this._m.support.supportBuiltinCommitLog;
		}
		/**
		 * 是否已集成在线时长打点
		 */
		get supportBuiltinOnlineLoopLog(): boolean {
			if (!this.checkModuleAttr("support", "supportBuiltinOnlineLoopLog")) {
				return undefined;
			}
			return this._m.support.supportBuiltinOnlineLoopLog;
		}
		/**
		 * 是否自带实名认证
		 */
		get supportBuiltinIdentityCertification(): boolean {
			if (
				!this.checkModuleAttr("support", "supportBuiltinIdentityCertification")
			) {
				return undefined;
			}
			return this._m.support.supportBuiltinIdentityCertification;
		}
		/**
		 * 是否需要自己维护广告生命周期
		 * （部分小游戏平台需要自己维护）
		 */
		get requireManagerAdLifecycle(): boolean {
			if (!this.checkModuleAttr("support", "requireManagerAdLifecycle")) {
				return undefined;
			}
			return this._m.support.requireManagerAdLifecycle;
		}
		/**
		 * 是否是原生插件
		 */
		get isNativePlugin(): boolean {
			if (!this.checkModuleAttr("support", "isNativePlugin")) {
				return undefined;
			}
			return this._m.support.isNativePlugin;
		}
		/**
		 * 注册全局的错误回调函数
		 */
		setErrorCallback(
			callback: (err: { message: string; stack: string }) => void
		) {
			if (!this.checkModuleAttr("except", "setErrorCallback", "function")) {
				return undefined;
			}
			return this._m.except.setErrorCallback(callback);
		}
		/**
		 * 创建用户信息授权按钮
		 * * 当前仅微信有效
		 */
		createUserInfoButton(obj: IUserInfoButton): UserInfoButton | null {
			if (!this.checkModuleAttr("auth", "createUserInfoButton", "function")) {
				return undefined;
			}
			return this._m.auth.createUserInfoButton(obj);
		}
		/**
		 * 判断是否拥有获取用户信息的权限
		 */
		isUserInfoAuthAlready(): Promise<boolean> {
			if (!this.checkModuleAttr("auth", "isUserInfoAuthAlready", "function")) {
				return this.createNonePromise("[auth.isUserInfoAuthAlready]");
			}
			return this._m.auth.isUserInfoAuthAlready();
		}
		/**
		 * 振动器
		 */
		get vibration(): IVibration {
			if (!this.checkModuleAttr("hardware", "vibration")) {
				return undefined;
			}
			return this._m.hardware.vibration;
		}
		/**
		 * 性能
		 */
		get performance(): IPerformance {
			if (!this.checkModuleAttr("hardware", "performance")) {
				return undefined;
			}
			return this._m.hardware.performance;
		}
		/**
		 * 屏幕亮度
		 */
		get screen(): IScreen {
			if (!this.checkModuleAttr("hardware", "screen")) {
				return undefined;
			}
			return this._m.hardware.screen;
		}
		/**
		 * 陀螺仪
		 */
		get gyroscope(): IGyroscope {
			if (!this.checkModuleAttr("hardware", "gyroscope")) {
				return undefined;
			}
			return this._m.hardware.gyroscope;
		}
		/**
		 * 罗盘
		 */
		get compass(): ICompass {
			if (!this.checkModuleAttr("hardware", "compass")) {
				return undefined;
			}
			return this._m.hardware.compass;
		}
		/**
		 * 电池
		 */
		get battery(): IBattery {
			if (!this.checkModuleAttr("hardware", "battery")) {
				return undefined;
			}
			return this._m.hardware.battery;
		}
		/**
		 * 加速计
		 */
		get accelerometer(): IAccelerometer {
			if (!this.checkModuleAttr("hardware", "accelerometer")) {
				return undefined;
			}
			return this._m.hardware.accelerometer;
		}
		/**
		 * - 设备方向
		 * - 转屏相关
		 * - 重力感应
		 */
		get gravity(): IGravity {
			if (!this.checkModuleAttr("hardware", "gravity")) {
				return undefined;
			}
			return this._m.hardware.gravity;
		}
		/**
		 * 触屏
		 */
		get screenTouch(): IScreenTouch {
			if (!this.checkModuleAttr("hardware", "screenTouch")) {
				return undefined;
			}
			return this._m.hardware.screenTouch;
		}
		/**
		 * 提交日志
		 */
		commitLog(key: string, params: { [key: string]: String }): Promise<void> {
			if (!this.checkModuleAttr("log", "commitLog", "function")) {
				return this.createNonePromise("[log.commitLog]");
			}
			return this._m.log.commitLog(key, params);
		}

		commitChannelsLog(logType: string, params: PayLogParams): Promise<void> {
			if (!this.checkModuleAttr("log", "commitChannelsLog", "function")) {
				return this.createNonePromise("[log.commitChannelsLog]");
			}
			return this._m.log.commitChannelsLog(logType, params);
		}
		/**
		 * 付费打点
		 * @param index 1-6  代表6种不同金额
		 */
		commitPayLog(index: number) {
			if (!this.checkModuleAttr("log", "commitPayLog", "function")) {
				return undefined;
			}
			return this._m.log.commitPayLog(index);
		}
		/**
		 * 添加本地推送
		 */
		addLocalNotices?(notices: LocalPushBundle[]): Promise<void> {
			if (!this.checkModuleAttr("localPush", "addLocalNotices", "function")) {
				return this.createNonePromise("[localPush.addLocalNotices]");
			}
			return this._m.localPush.addLocalNotices(notices);
		}
		/**
		 * 移除对应的推送
		 * - identifier 和 identifiers 只有其中一个生效
		 */
		removeLocalNoticeWithID?(params: {
			identifier?: string;
			identifiers?: string[];
		}): Promise<void> {
			if (
				!this.checkModuleAttr(
					"localPush",
					"removeLocalNoticeWithID",
					"function"
				)
			) {
				return this.createNonePromise("[localPush.removeLocalNoticeWithID]");
			}
			return this._m.localPush.removeLocalNoticeWithID(params);
		}
		/**
		 * 移除所有推送
		 */
		removeAllLocalNotices?(): Promise<void> {
			if (
				!this.checkModuleAttr("localPush", "removeAllLocalNotices", "function")
			) {
				return this.createNonePromise("[localPush.removeAllLocalNotices]");
			}
			return this._m.localPush.removeAllLocalNotices();
		}
		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		requireLocalNoticePermission?(): Promise<void> {
			if (
				!this.checkModuleAttr(
					"localPush",
					"requireLocalNoticePermission",
					"function"
				)
			) {
				return this.createNonePromise(
					"[localPush.requireLocalNoticePermission]"
				);
			}
			return this._m.localPush.requireLocalNoticePermission();
		}
		/**
		 * 用户是否开启通知权限
		 */
		isLocalNoticeEnabled?(): Promise<{ enabled: boolean }> {
			if (
				!this.checkModuleAttr("localPush", "isLocalNoticeEnabled", "function")
			) {
				return this.createNonePromise("[localPush.isLocalNoticeEnabled]");
			}
			return this._m.localPush.isLocalNoticeEnabled();
		}
		/**
		 * 游戏热更新功能
		 * @returns tid 供暂停、恢复、取消使用
		 */
		hotupdateInGame(
			json: string,
			callback: (cur: number, total: number) => void
		): string {
			if (!this.checkModuleAttr("hotUpdate", "hotupdateInGame", "function")) {
				return undefined;
			}
			return this._m.hotUpdate.hotupdateInGame(json, callback);
		}
		// 暂停
		hotupdatePause(tid: string): void {
			if (!this.checkModuleAttr("hotUpdate", "hotupdatePause", "function")) {
				return undefined;
			}
			return this._m.hotUpdate.hotupdatePause(tid);
		}
		// 恢复
		hotupdateResume(tid: string): void {
			if (!this.checkModuleAttr("hotUpdate", "hotupdateResume", "function")) {
				return undefined;
			}
			return this._m.hotUpdate.hotupdateResume(tid);
		}
		// 取消
		hotupdateCancel(tid: string): void {
			if (!this.checkModuleAttr("hotUpdate", "hotupdateCancel", "function")) {
				return undefined;
			}
			return this._m.hotUpdate.hotupdateCancel(tid);
		}

		// $batch_export() end
	}
}
