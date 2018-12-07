namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] });
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		private _m: IModuleMap = null;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}

		initConfig(config: GDKConfig) {
			console.warn("redundant init for gdk, ignored");
		}

		protected _initWithConfig(info: GDKConfig) {
			for (let key in this._m) {
				let addon = <IModule>this._m[key];
				if (addon.init) {
					addon.init();
				}
				if (addon.initWithConfig) {
					addon.initWithConfig(info);
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
				devlog.warn("module unsupport: [gdk::${mvarname}]");
				return false;
			}
			if (attrType) {
				const attr = this._m[moduleName][attrName];
				if (!attr) {
					devlog.warn("func unsupport: [gdk::${mvarname}.${key}]");
					return false;
				}
				if (typeof attr != attrType) {
					devlog.warn("invalid func: [gdk::${mvarname}.${key}]");
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

		/** 批量导出接口 */
		// $batch_export() begin

		login(params?: LoginParams): Promise<LoginResult> {
			if (!this.checkModuleAttr("user", "login", "function")) {
				return this.createNonePromise("[user.login]");
			}
			return this._m.user.login(params);
		}

		checkSession?(params?: ReqParams) {
			if (!this.checkModuleAttr("user", "checkSession", "function")) {
				return undefined;
			}
			return this._m.user.checkSession(params);
		}

		updateUser(): Promise<UserDataUpdateResult> {
			if (!this.checkModuleAttr("user", "update", "function")) {
				return this.createNonePromise("[user.update]");
			}
			return this._m.user.update();
		}

		getFriendCloudStorage(obj: {
			keyList: string[];
		}): Promise<{ data: UserGameData[] }> {
			if (!this.checkModuleAttr("user", "getFriendCloudStorage", "function")) {
				return this.createNonePromise("[user.getFriendCloudStorage]");
			}
			return this._m.user.getFriendCloudStorage(obj);
		}

		setUserCloudStorage(obj: { KVDataList: KVData[] }): Promise<void> {
			if (!this.checkModuleAttr("user", "setUserCloudStorage", "function")) {
				return this.createNonePromise("[user.setUserCloudStorage]");
			}
			return this._m.user.setUserCloudStorage(obj);
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

		get password(): string {
			if (!this.checkModuleAttr("userData", "password")) {
				return undefined;
			}
			return this._m.userData.password;
		}

		get nickName(): string {
			if (!this.checkModuleAttr("userData", "nickName")) {
				return undefined;
			}
			return this._m.userData.nickName;
		}

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
		/** 0 未关注,1 已关注 */
		get followGzh(): number {
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
		get createTime(): string {
			if (!this.checkModuleAttr("userData", "createTime")) {
				return undefined;
			}
			return this._m.userData.createTime;
		}
		/** 0 未知 1 男 2 女 */
		get sex(): number {
			if (!this.checkModuleAttr("userData", "sex")) {
				return undefined;
			}
			return this._m.userData.sex;
		}
		/**
		 * 是否为该游戏管理账号用户，1是，0否
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
		/**
		 * 游戏的启动模式。
		 * 可以是 开发、测试、发布
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
		 * 游戏启动的渠道id
		 */
		get gameChannelId(): number {
			if (!this.checkModuleAttr("gameInfo", "gameChannelId")) {
				return undefined;
			}
			return this._m.gameInfo.gameChannelId;
		}
		/** 沙盒模式支付 */
		get isPayInSandbox(): boolean {
			if (!this.checkModuleAttr("gameInfo", "isPayInSandbox")) {
				return undefined;
			}
			return this._m.gameInfo.isPayInSandbox;
		}
		/** 支付侧应用id */
		get offerId(): string {
			if (!this.checkModuleAttr("gameInfo", "offerId")) {
				return undefined;
			}
			return this._m.gameInfo.offerId;
		}
		/**
		 * 跳转小程序支付offerid
		 * - 填对方小程序appid
		 **/
		get miniAppOfferId(): string {
			if (!this.checkModuleAttr("gameInfo", "miniAppOfferId")) {
				return undefined;
			}
			return this._m.gameInfo.miniAppOfferId;
		}
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		get shareProxyUrl(): string {
			if (!this.checkModuleAttr("gameInfo", "shareProxyUrl")) {
				return undefined;
			}
			return this._m.gameInfo.shareProxyUrl;
		}
		/** 小游戏启动时的参数。 */
		get launchOptions(): LaunchOptions {
			if (!this.checkModuleAttr("gameInfo", "launchOptions")) {
				return undefined;
			}
			return this._m.gameInfo.launchOptions;
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
		 * 游戏id
		 **/
		get gameId(): number {
			if (!this.checkModuleAttr("gameInfo", "gameId")) {
				return undefined;
			}
			return this._m.gameInfo.gameId;
		}
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		get gameType(): number {
			if (!this.checkModuleAttr("gameInfo", "gameType")) {
				return undefined;
			}
			return this._m.gameInfo.gameType;
		}
		/** 优先只启用小程序跳转支付 */
		get requireMiniAppPay(): boolean {
			if (!this.checkModuleAttr("gameInfo", "requireMiniAppPay")) {
				return undefined;
			}
			return this._m.gameInfo.requireMiniAppPay;
		}
		/**
		 * 手机品牌	1.5.0
		 **/
		get brand(): string {
			if (!this.checkModuleAttr("systemInfo", "brand")) {
				return undefined;
			}
			return this._m.systemInfo.brand;
		}
		/**
		 * 手机型号
		 * 具体机型(手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
		 **/
		get model(): string {
			if (!this.checkModuleAttr("systemInfo", "model")) {
				return undefined;
			}
			return this._m.systemInfo.model;
		}
		/**
		 * 设备像素比，-1代表未知
		 **/
		get pixelRatio(): number {
			if (!this.checkModuleAttr("systemInfo", "pixelRatio")) {
				return undefined;
			}
			return this._m.systemInfo.pixelRatio;
		}
		/**
		 * 屏幕宽度	1.1.0
		 **/
		get screenWidth(): number {
			if (!this.checkModuleAttr("systemInfo", "screenWidth")) {
				return undefined;
			}
			return this._m.systemInfo.screenWidth;
		}
		/**
		 * 屏幕高度	1.1.0
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
		 * 状态栏的高度	1.9.0
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
		 * 平台(微信、QQ等）版本号
		 **/
		get version(): string {
			if (!this.checkModuleAttr("systemInfo", "version")) {
				return undefined;
			}
			return this._m.systemInfo.version;
		}
		/**
		 * 操作系统版本
		 * - "android" | "ios" | "devtools" | ...
		 **/
		get system(): string {
			if (!this.checkModuleAttr("systemInfo", "system")) {
				return undefined;
			}
			return this._m.systemInfo.system;
		}
		/**
		 * 客户端平台
		 **/
		get platform(): string {
			if (!this.checkModuleAttr("systemInfo", "platform")) {
				return undefined;
			}
			return this._m.systemInfo.platform;
		}
		/**
		 * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。	1.5.0
		 **/
		get fontSizeSetting(): number {
			if (!this.checkModuleAttr("systemInfo", "fontSizeSetting")) {
				return undefined;
			}
			return this._m.systemInfo.fontSizeSetting;
		}
		/**
		 * 客户端基础库版本	1.1.0
		 **/
		get SDKVersion(): string {
			if (!this.checkModuleAttr("systemInfo", "SDKVersion")) {
				return undefined;
			}
			return this._m.systemInfo.SDKVersion;
		}
		/**
		 * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>= 1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
		 **/
		get benchmarkLevel(): number {
			if (!this.checkModuleAttr("systemInfo", "benchmarkLevel")) {
				return undefined;
			}
			return this._m.systemInfo.benchmarkLevel;
		}
		/**
		 * 网络类型
		 * - wifi	wifi 网络
		 * - 2g	2g 网络
		 * - 3g	3g 网络
		 * - 4g	4g 网络
		 * - unknown	Android 下不常见的网络类型
		 * - none	无网络
		 */
		get networkType(): string {
			if (!this.checkModuleAttr("systemInfo", "networkType")) {
				return undefined;
			}
			return this._m.systemInfo.networkType;
		}
		/**
		 * 网络类型 1 电信 ，2 联通 ，3 移动 0: wifi或未知
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
		 * 是否首次安装 1为首次安装 0非首次安装
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
		 * 获取网络状况信息
		 */
		fetchNetworkInfo(): Promise<void> {
			if (!this.checkModuleAttr("systemInfo", "fetchNetworkInfo", "function")) {
				return this.createNonePromise("[systemInfo.fetchNetworkInfo]");
			}
			return this._m.systemInfo.fetchNetworkInfo();
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
		 * 设置帧率
		 * - 可能和cocos的会冲突
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
		 * 分享到聊天窗口
		 * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
		 * * 如果当前环境无法分享，则分享失败
		 * @param data
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
		 * @param data
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
		 * @param data
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

		payPurchase(
			item: GDK.PayItemInfo,
			options?: PayOptions
		): Promise<PayResult> {
			if (!this.checkModuleAttr("pay", "payPurchase", "function")) {
				return this.createNonePromise("[pay.payPurchase]");
			}
			return this._m.pay.payPurchase(item, options);
		}

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId?: string;
		}): IRewardedVideoAd {
			if (
				!this.checkModuleAttr("advert", "createRewardedVideoAd", "function")
			) {
				return undefined;
			}
			return this._m.advert.createRewardedVideoAd(params);
		}

		createBannerAd(params: {
			/** 广告单元 id */
			adUnitId?: string;
			/** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
			viewId?: number;
			/** banner 广告组件的样式 */
			style: BannerStyle;
		}): IBannerAd {
			if (!this.checkModuleAttr("advert", "createBannerAd", "function")) {
				return undefined;
			}
			return this._m.advert.createBannerAd(params);
		}

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

		get keyboard(): IKeyBoard {
			if (!this.checkModuleAttr("widgets", "keyboard")) {
				return undefined;
			}
			return this._m.widgets.keyboard;
		}

		showLoading(object: ShowLoadingParams): Promise<void> {
			if (!this.checkModuleAttr("widgets", "showLoading", "function")) {
				return this.createNonePromise("[widgets.showLoading]");
			}
			return this._m.widgets.showLoading(object);
		}

		hideLoading(): Promise<void> {
			if (!this.checkModuleAttr("widgets", "hideLoading", "function")) {
				return this.createNonePromise("[widgets.hideLoading]");
			}
			return this._m.widgets.hideLoading();
		}

		showToast(object: ShowToastOptions): Promise<void> {
			if (!this.checkModuleAttr("widgets", "showToast", "function")) {
				return this.createNonePromise("[widgets.showToast]");
			}
			return this._m.widgets.showToast(object);
		}

		hideToast(): Promise<void> {
			if (!this.checkModuleAttr("widgets", "hideToast", "function")) {
				return this.createNonePromise("[widgets.hideToast]");
			}
			return this._m.widgets.hideToast();
		}

		showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult> {
			if (!this.checkModuleAttr("widgets", "showConfirm", "function")) {
				return this.createNonePromise("[widgets.showConfirm]");
			}
			return this._m.widgets.showConfirm(object);
		}

		showAlert(object: ShowAlertOptions): Promise<ShowAlertResult> {
			if (!this.checkModuleAttr("widgets", "showAlert", "function")) {
				return this.createNonePromise("[widgets.showAlert]");
			}
			return this._m.widgets.showAlert(object);
		}

		onMessage(callback: (message: PrimitiveMap) => void) {
			if (!this.checkModuleAttr("subContext", "onMessage", "function")) {
				return undefined;
			}
			return this._m.subContext.onMessage(callback);
		}

		getOpenDataContext(): IOpenDataContext {
			if (
				!this.checkModuleAttr("subContext", "getOpenDataContext", "function")
			) {
				return undefined;
			}
			return this._m.subContext.getOpenDataContext();
		}
		/** api平台名称 */
		get apiPlatform():
			| "wechatgame"
			| "browser"
			| "qqplay"
			| "unknown"
			| string {
			if (!this.checkModuleAttr("support", "apiPlatform")) {
				return undefined;
			}
			return this._m.support.apiPlatform;
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
		/** api名字 */
		get apiNameLocale(): string {
			if (!this.checkModuleAttr("support", "apiNameLocale")) {
				return undefined;
			}
			return this._m.support.apiNameLocale;
		}
		/**
		 * 注册全局的错误回调函数
		 * @param callback
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
		createUserInfoButton(obj: IUserInfoButton): UserInfoButton {
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

		// $batch_export() end
	}
}