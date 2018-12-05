namespace GDK {
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

    support(name: string): boolean {
      return false;
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
      return this._m.user.login(params);
    }

    checkSession?(params?: ReqParams) {
      return this._m.user.checkSession(params);
    }

    updateUser(): Promise<{}> {
      return this._m.user.update();
    }

    getFriendCloudStorage(obj: {
      keyList: string[];
    }): Promise<{ data: UserGameData[] }> {
      return this._m.user.getFriendCloudStorage(obj);
    }

    setUserCloudStorage(obj: { KVDataList: KVData[] }): Promise<void> {
      return this._m.user.setUserCloudStorage(obj);
    }

    get openId(): string {
      return this._m.userData.openId;
    }

    get openKey(): string {
      return this._m.userData.openKey;
    }

    get password(): string {
      return this._m.userData.password;
    }

    get nickName(): string {
      return this._m.userData.nickName;
    }

    get userId(): number {
      return this._m.userData.userId;
    }
    /** 是否新用户 */
    get isNewUser(): boolean {
      return this._m.userData.isNewUser;
    }

    get avatarUrl(): string {
      return this._m.userData.avatarUrl;
    }
    /** 上传存档时间(秒) */
    get backupTime(): number {
      return this._m.userData.backupTime;
    }
    /** 0 未关注,1 已关注 */
    get followGzh(): number {
      return this._m.userData.followGzh;
    }
    /** 渠道id */
    get channelId(): number {
      return this._m.userData.channelId;
    }
    /** 创建时间 */
    get createTime(): string {
      return this._m.userData.createTime;
    }
    /** 0 未知 1 男 2 女 */
    get sex(): number {
      return this._m.userData.sex;
    }
    /**
     * 是否为该游戏管理账号用户，1是，0否
     **/
    get isWhiteUser(): number {
      return this._m.userData.isWhiteUser;
    }
    /**
     * 是否房主，1房主，0参加者
     **/
    get isMaster(): number {
      return this._m.userData.isMaster;
    }
    /**
     * 房间号
     **/
    get roomId(): number {
      return this._m.userData.roomId;
    }
    /**
     * 游戏的启动模式。
     * 可以是 开发、测试、发布
     */
    get mode(): "develop" | "test" | "release" {
      return this._m.gameInfo.mode;
    }
    /**
     * 程序appid
     */
    get appId(): string {
      return this._m.gameInfo.appId;
    }
    /**
     * 游戏启动的渠道id
     */
    get gameChannelId(): number {
      return this._m.gameInfo.gameChannelId;
    }
    /** 沙盒模式支付 */
    get isPayInSandbox(): boolean {
      return this._m.gameInfo.isPayInSandbox;
    }
    /** 支付侧应用id */
    get offerId(): string {
      return this._m.gameInfo.offerId;
    }
    /**
     * 跳转小程序支付offerid
     * - 填对方小程序appid
     **/
    get miniAppOfferId(): string {
      return this._m.gameInfo.miniAppOfferId;
    }
    /**
     * 分享结果检测的代理网址
     * * 仅微信使用
     */
    get shareProxyUrl(): string {
      return this._m.gameInfo.shareProxyUrl;
    }
    /** 小游戏启动时的参数。 */
    get launchOptions(): LaunchOptions {
      return this._m.gameInfo.launchOptions;
    }
    /**
     * 游戏版本号
     **/
    get gameVersion(): string {
      return this._m.gameInfo.gameVersion;
    }
    /**
     * 游戏id
     **/
    get gameId(): number {
      return this._m.gameInfo.gameId;
    }
    /**
     * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
     **/
    get gameType(): number {
      return this._m.gameInfo.gameType;
    }
    /** 优先只启用小程序跳转支付 */
    get requireMiniAppPay(): boolean {
      return this._m.gameInfo.requireMiniAppPay;
    }
    /**
     * 手机品牌	1.5.0
     **/
    get brand(): string {
      return this._m.systemInfo.brand;
    }
    /**
     * 手机型号
     * 具体机型(手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
     **/
    get model(): string {
      return this._m.systemInfo.model;
    }
    /**
     * 设备像素比，-1代表未知
     **/
    get pixelRatio(): number {
      return this._m.systemInfo.pixelRatio;
    }
    /**
     * 屏幕宽度	1.1.0
     **/
    get screenWidth(): number {
      return this._m.systemInfo.screenWidth;
    }
    /**
     * 屏幕高度	1.1.0
     **/
    get screenHeight(): number {
      return this._m.systemInfo.screenHeight;
    }
    /**
     * 可使用窗口宽度
     **/
    get windowWidth(): number {
      return this._m.systemInfo.windowWidth;
    }
    /**
     * 可使用窗口高度
     **/
    get windowHeight(): number {
      return this._m.systemInfo.windowHeight;
    }
    /**
     * 状态栏的高度	1.9.0
     **/
    get statusBarHeight(): number {
      return this._m.systemInfo.statusBarHeight;
    }
    /**
     * 平台（微信、QQ等）设置的语言
     **/
    get language(): string {
      return this._m.systemInfo.language;
    }
    /**
     * 平台(微信、QQ等）版本号
     **/
    get version(): string {
      return this._m.systemInfo.version;
    }
    /**
     * 操作系统版本
     * - "android" | "ios" | "devtools" | ...
     **/
    get system(): string {
      return this._m.systemInfo.system;
    }
    /**
     * 客户端平台
     **/
    get platform(): string {
      return this._m.systemInfo.platform;
    }
    /**
     * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。	1.5.0
     **/
    get fontSizeSetting(): number {
      return this._m.systemInfo.fontSizeSetting;
    }
    /**
     * 客户端基础库版本	1.1.0
     **/
    get SDKVersion(): string {
      return this._m.systemInfo.SDKVersion;
    }
    /**
     * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>= 1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
     **/
    get benchmarkLevel(): number {
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
      return this._m.systemInfo.networkType;
    }
    /**
     * 网络类型 1 电信 ，2 联通 ，3 移动 0: wifi或未知
     * -1 无网络
     * -2 2G/3G/4G/nG 网络
     **/
    get networkClass(): number {
      return this._m.systemInfo.networkClass;
    }
    /**
     * 是否首次安装 1为首次安装 0非首次安装
     **/
    get isFirstInstall(): number {
      return this._m.systemInfo.isFirstInstall;
    }
    /**
     * 仅在开发环境下可以，手q环境下无该字段
     **/
    get devPlatform(): string {
      return this._m.systemInfo.devPlatform;
    }

    fetchNetworkInfo(): Promise<void> {
      return this._m.systemInfo.fetchNetworkInfo();
    }
    /**
     * 分享到聊天窗口
     * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
     * * 如果当前环境无法分享，则分享失败
     * @param data
     */
    share(data: ShareData): Promise<ShareResult> {
      return this._m.share.share(data);
    }
    /**
     * 社会化分享
     * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
     * * 如果当前环境无法分享，则分享失败
     * @param data
     */
    socialShare(data: ShareData): Promise<ShareResult> {
      return this._m.share.socialShare(data);
    }
    /**
     * 分享网址
     * * 如果当前环境无法进行URL分享，则分享失败
     * * 当前仅 QQPlay 环境支持
     * @param data
     */
    shareUrl(data: ShareUrlData): Promise<ShareResult> {
      return this._m.share.shareUrl(data);
    }
    /**
     * 显示分享菜单
     * * 微信平台必须调用该函数才会显示转发按钮
     * * QQ平台默认就有转发按钮
     */
    showShareMenu(): Promise<void> {
      return this._m.share.showShareMenu();
    }
    /**
     * 隐藏分享菜单
     */
    hideShareMenu(): Promise<void> {
      return this._m.share.hideShareMenu();
    }
    /**
     * 在某些平台可以设置分享按钮所分享的内容
     * * 微信支持
     * * QQplay 无效
     */
    setShareMenuData(data: ShareData): Promise<void> {
      return this._m.share.setShareMenuData(data);
    }
    /**
     * 获取通过点击分享链接时或传递的参数
     */
    getShareParam(): Promise<{ [key: string]: string }> {
      return this._m.share.getShareParam();
    }

    payPurchase(
      item: GDK.PayItemInfo,
      options?: PayOptions
    ): Promise<PayResult> {
      return this._m.pay.payPurchase(item, options);
    }

    createRewardedVideoAd(params: {
      /** 广告单元 id */
      adUnitId: string;
    }): IRewardedVideoAd {
      return this._m.advert.createRewardedVideoAd(params);
    }

    createBannerAd(params: {
      /** 广告单元 id */
      adUnitId: string;
      /** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
      viewId: number;
      /** banner 广告组件的样式 */
      style: BannerStyle;
    }): IBannerAd {
      return this._m.advert.createBannerAd(params);
    }

    openCustomerServiceConversation(params: OpenParam) {
      return this._m.customer.openCustomerServiceConversation(params);
    }

    get keyboard(): IKeyBoard {
      return this._m.widgets.keyboard;
    }

    showLoading(object: ShowLoadingParams): Promise<void> {
      return this._m.widgets.showLoading(object);
    }

    hideLoading(): Promise<void> {
      return this._m.widgets.hideLoading();
    }

    showToast(object: ShowToastOptions): Promise<void> {
      return this._m.widgets.showToast(object);
    }

    hideToast(): Promise<void> {
      return this._m.widgets.hideToast();
    }

    showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult> {
      return this._m.widgets.showConfirm(object);
    }

    showAlert(object: ShowAlertOptions): Promise<ShowAlertResult> {
      return this._m.widgets.showAlert(object);
    }

    get canvas(): HTMLCanvasElement {
      return this._m.subContext.canvas;
    }

    onMessage(callback: (message: PrimitiveMap) => void) {
      return this._m.subContext.onMessage(callback);
    }

    getOpenDataContext(): IOpenDataContext {
      return this._m.subContext.getOpenDataContext();
    }
    /** api平台名称 */
    get apiPlatform():
      | "wechatgame"
      | "browser"
      | "qqplay"
      | "unknown"
      | string {
      return this._m.support.apiPlatform;
    }
    /** 是否支持群分享 */
    get supportShareTickets(): boolean {
      return this._m.support.supportShareTickets;
    }
    /** 是否需要支持子域 */
    get requireSubDomainRank(): boolean {
      return this._m.support.requireSubDomainRank;
    }
    /** 是否需要鉴权认证 */
    get requireAuthorize(): boolean {
      return this._m.support.requireAuthorize;
    }
    /** api名字 */
    get apiNameLocale(): string {
      return this._m.support.apiNameLocale;
    }
    /**
     * 注册全局的错误回调函数
     * @param callback
     */
    setErrorCallback(
      callback: (err: { message: string; stack: string }) => void
    ) {
      return this._m.except.setErrorCallback(callback);
    }
    /**
     * 创建用户信息授权按钮
     * * 当前仅微信有效
     */
    createUserInfoButton(obj: IUserInfoButton): UserInfoButton {
      return this._m.auth.createUserInfoButton(obj);
    }
    /**
     * 判断是否拥有获取用户信息的权限
     */
    isUserInfoAuthAlready(): Promise<boolean> {
      return this._m.auth.isUserInfoAuthAlready();
    }

    // $batch_export() end
  }
}
