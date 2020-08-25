declare namespace GDK {
    abstract class GameInfoBase implements IGameInfo {
        abstract mode: "develop" | "test" | "release";
        abstract appId: string;
        abstract gameChannelId: number;
        /** 沙盒模式支付 */
        abstract isPayInSandbox: boolean;
        /** 支付侧应用id */
        abstract offerId: string;
        /**
         * 分享结果检测的代理网址
         * * 仅微信使用
         */
        abstract shareProxyUrl: string;
        /** 小游戏启动时的参数。 */
        abstract launchOptions: LaunchOptions;
        /**
         * 游戏版本号
         **/
        abstract gameVersion?: string;
        /**
         * 游戏id
         **/
        abstract gameId?: number;
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        abstract gameType: number;
        requireCustomServicePay: boolean;
        requireMiniAppPay: boolean;
        requireIndiaSPSPay: boolean;
        abstract init?(): any;
        abstract initWithConfig(info: GDKConfig): Promise<void>;
    }
}
declare namespace GDK {
    class HardwareBase implements IHardware {
        vibration: IVibration;
        performance: IPerformance;
    }
}
declare namespace GDK {
    class APISystemBase implements IAPISystem {
        get sdkFrameworkVersion(): string;
        clipboard?: IClipboard;
        init(): void;
        get nativeVersion(): number;
        setEnableDebug(res: {
            enableDebug: boolean;
        }): Promise<void>;
        navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult>;
        exitProgram?(): Promise<void>;
        updateProgramForce(): Promise<void>;
        _initEvents(): void;
        _onShowEvent: slib.SimpleEvent<any>;
        onShow?(callback: (data: any) => void): void;
        offShow?(callback: Function): void;
        _onHideEvent: slib.SimpleEvent<void>;
        onHide?(callback: Function): void;
        offHide?(callback: Function): void;
        getSafeArea?(callback: (data: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }) => void): void;
        gotoAppSystemSettings?(params: IChooseDialogParams): Promise<IChooseDialogResult>;
        checkAppSystemPermissions?(params: ICheckPermissionParams): Promise<ICheckPermissionResult>;
        getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any>;
        setAppInfo(key: string, value: string | number | boolean): void;
        getAppInfo(key: string): (string | number | boolean | null);
        getAppInfoBoolean(key: string, def: boolean): boolean;
        getAppInfoNumber(key: string, def: number): number;
        getAppInfoString(key: string, def: string): string;
        getResVersion(): number;
    }
}
declare namespace GDK {
    abstract class SystemInfoBase implements ISystemInfo {
        SDKVersionList: [];
        gdkVersion: string;
        platform: string;
        brand: string;
        model: string;
        pixelRatio: number;
        screenWidth: number;
        screenHeight: number;
        windowWidth: number;
        windowHeight: number;
        statusBarHeight: number;
        language: string;
        version: string;
        system: string;
        fontSizeSetting: number;
        SDKVersion: string;
        benchmarkLevel: number;
        networkClass: number;
        networkType: string;
        isFirstInstall?: number;
        devPlatform?: string;
        deviceId?: string;
        uuid?: string;
        gameDeviceId?: string;
        versionCode?: number;
        versionName?: string;
        channel?: string;
        quickChannelId?: string;
        country?: string;
        installTime?: number;
        imei?: string;
        packageName?: string;
        packageTag?: string;
        debugAccountServer?: string;
        isCustomBackendCfg?: boolean;
        abstract fetchNetworkInfo(): Promise<void>;
        clone(): ISystemInfo;
    }
}
declare namespace GDK {
    class LogBase implements ILog {
        commitLog(key: string, params: {
            [key: string]: String;
        }): Promise<void>;
        commitChannelsLog(logType: string, params: GDK.PayLogParams): Promise<void>;
        commitPayLog(index: number): Promise<void>;
    }
}
declare namespace GDK {
    abstract class PayBase implements IPay {
        abstract getUserPayFlow(): PayFlow.IPayFlow;
        api?: UserAPI;
        init?(data?: any): void;
        initWithConfig?(info: GDKConfig): Promise<void>;
        abstract payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>;
        consumePurchase?(params: ConsumePurchaseParams): Promise<ConsumePurchaseResult>;
        queryItemInfo?(params: PayQueryItemInfoParams): Promise<PayQueryItemInfoResult>;
    }
}
declare namespace GDK {
    class SimpleEvent<T> extends slib.SimpleEvent<T> {
    }
    class OpenDataContext implements IOpenDataContext {
        protected _event: SimpleEvent<OpenDataContextMessage>;
        constructor(event: SimpleEvent<OpenDataContextMessage>);
        postMessage(message: OpenDataContextMessage): void;
    }
    export class SubContextBase implements ISubContext {
        protected _event: SimpleEvent<OpenDataContextMessage>;
        protected _context: OpenDataContext;
        onMessage(callback: (message: OpenDataContextMessage) => void): void;
        getOpenDataContext(): IOpenDataContext;
    }
    export {};
}
declare namespace GDK {
    abstract class SupportBase implements ISupport {
        abstract apiPlatform: string;
        abstract pluginName: string;
        abstract apiNameLocale: string;
        supportShare: boolean;
        supportShareTickets: boolean;
        requireSubDomainRank: boolean;
        requireAuthorize: boolean;
        supportBuiltinCommitLog: boolean;
        supportBuiltinOnlineLoopLog: boolean;
        supportBuiltinIdentityCertification: boolean;
        requireManagerAdLifecycle: boolean;
        isNativePlugin: boolean;
    }
}
declare namespace GDK {
    abstract class UserBase implements IUser {
        isNativeRealNameSystem?(): boolean;
        showMinorInfo?(info: string): Promise<void>;
        showRealNameDialog?(userID: number, force: boolean): Promise<{
            isVerified: boolean;
            age: number;
            name: string;
            idCard: string;
            birthday: string;
        }>;
        bindUser(): Promise<{
            success: boolean;
            data: any;
        }>;
        setAccountChangeListener?(f: () => void): void;
        init?(data?: any): void;
        initWithConfig?(info: GDKConfig): Promise<void>;
        setLoginSupport(loginSupport: {
            google: boolean;
            visitor: boolean;
            facebook: boolean;
            wechat: boolean;
            gamecenter: boolean;
            account: boolean;
        }): void;
        api?: UserAPI | undefined;
        abstract login(params?: LoginParams): Promise<LoginResult>;
        bindCallback?: (succ: boolean, data?: any) => void;
        rebootCallback?: () => void;
        setBindCallback(callback: (succ: boolean, data?: any) => void): void;
        setRebootCallback(callback: () => void): void;
        abstract showUserCenter(): Promise<void>;
        abstract showBindDialog(): Promise<void>;
        checkSession(params?: ReqParams): Promise<void>;
        abstract update(): Promise<UserDataUpdateResult>;
        abstract getFriendCloudStorage(obj: {
            keyList: string[];
            typeIndex: string[];
        }): Promise<{
            data: UserGameData[];
        }>;
        abstract setUserCloudStorage(obj: {
            KVDataList: KVData[];
            typeIndex: string[];
        }): Promise<void>;
        abstract checkIsUserBind(userId: number): boolean;
    }
}
declare namespace GDK.PayFlow {
    const gevent: slib.SEvent<any>;
}
declare namespace GDK.PayFlow {
    /**
     * 订单状态
     */
    type wxPayState = {
        errCode: number;
        state: OrderState;
        extra?: any;
    };
    type PaymentSuccessCallbackParams = {
        config: PaymentParams;
        orderInfo?: OrderInfo;
    };
    type PaymentSuccessCallback = (res: PaymentSuccessCallbackParams) => void;
    type PaymentMergeOptions = {
        /**
         * 是否补单流程中补发的订单
         */
        isMakingUpOrder: boolean;
    };
    /** 道具充值配置项 */
    interface RechargeConfigRow {
        /** 支付方式 */
        payWay?: PayWay;
        /** 序号，同时也是我们的商品ID */
        id?: number;
        /** 金额 */
        money?: number;
        /** 中间货币数量 */
        amount?: number;
        /** 商品名称 */
        title?: string;
        /** 后台二级货币ID */
        coinId?: number;
        /** 第三方后台商品ID */
        productId?: string;
        /** 商品实际付款价格 */
        price?: number;
        /**
         * 人民币总额（用于后台统计）
         */
        priceCNY?: number;
        /**
         * 美元总额（用于后台统计）
         */
        priceUSD?: number;
    }
    interface PaymentParamsOptions {
        /**
         * （正在弃用，用payUrl代替）每日给力支付app分区 ID
         * - 0 测试版
         * - 1 fox应用
         * - 2 海洋馆应用
         */
        gleeZoneId?: number;
        /**
         * 支付服务器地址（通常是账号服）
         * - 用于代替gleeZoneId判断app分区
         * - 用于客服跳转支付和app跳转支付
         * - 默认会检测传入 游戏地址 或 账号服地址
         * - 也可能需要手动填写此参数，形如 "https://sandbox.focus.mosoga.net"
         */
        payUrl?: string;
        /**
         * 屏幕方向
         * - 1 竖屏(默认)
         * - 2.横屏（home键在左边）
         * - 3.横屏 （home键在右边）
         */
        gameOrientation?: number;
        /**
         * - 副标题
         * - 客服跳转支付，会话内消息卡片标题
         */
        subTitle?: string;
        /**
         * - 客服跳转支付，会话内消息卡片图片路径
         */
        imagePath?: string;
        /**
         * 自定义附加参数
         */
        customExtra?: string;
        /**
         * 自定义附加参数(JSON格式)
         */
        customJsonExtra?: string;
        /**
         * 自动补单重试次数
         */
        autoMakeupRetryTimes?: number;
    }
    type PayWay = 'WechatPay' | 'AliPay' | 'UnifiedSdk' | 'VivoAppPay' | 'OppoApp' | 'GooglePay' | 'IosPay' | 'BaiduAppPay' | 'YYBPay' | 'AliGameAppPay' | 'meituAppPay' | 'xiao7';
    interface PaymentParams extends RechargeConfigRow {
        /**
         * 这里加自定义选项
         */
        options?: PaymentParamsOptions;
        qqGoodid?: string;
        others?: object;
        customKey?: string;
        /**
         * 合作商订单ID
         */
        coopOrder?: string;
    }
    interface Parent {
        /**
         * 支付平台ID，仅支持单个
         * - 如果需要多个，用 payWays 字段
         */
        channelId?: PayWay;
        /**
         * 多个支付平台ID
         * - 当前发布渠道需要支持几个支付平台，那么在当前渠道对应的代码里填几个支付平台的payWay
         * - 补单需要遍历
         */
        payWays?: PayWay[];
        /**
         * 充值配置表
         */
        chargeconfig: RechargeConfigRow[];
    }
    interface OrderRecordExported {
        orderno: string;
        state: OrderState;
        /** 订单生成时间 */
        time: number;
        /** 配表序号 */
        id: number;
        /** 金额 */
        money: number;
        /** 精灵石数量 */
        amount: number;
        /** 商品名称 */
        itemName: string;
        /** 用户ID */
        userId: string;
    }
    /**
     * 订单合并结果
     */
    interface MakeupOrdersResult {
        /** 合并顺利无异常 */
        isMergeOk: boolean;
        /** 有差异订单 */
        isDiffExist: boolean;
    }
    /**
     * 订单支付成功通知
     * 登录补单之前就要一直监听
     * example: GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",<ApplyOrderInfo>notifyData);
     */
    interface IPayFlow {
        _status: PayFlowStatus;
        /**
         * 设置充值配置
         * @param parent
         */
        initConfig(parent: Parent): void;
        /**
         * 发起支付
         * - 如果是微信app跳转支付，successCallback 接口不会生效，需要通过补单流程完成支付，即监听 'onApplyOrder' 事件
         * - 如果是app内充值，那么 successCallback 和 'onApplyOrder' 事件都会生效
         * @param config 配置信息
         * @param successCallback 支付成功回调
         * @param failCallback 支付失败回调
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        /**
         * 检查充值是否已经购买过一次
         * @param config 配置信息
         * @returns
         */
        isItemBoughtEver(config: RechargeConfigRow): boolean;
        /**
         * 校验补发订单
         * @returns
         */
        pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions): any;
        /**
         * 设置监听，用于微信app跳转支付
         * - 不再需要外部传入onShow方法
         */
        initListener(onShow?: (callback: Function) => void): void;
        /**
         * - false: 充值回调不可信（一律回调失败，但是实际上可能充值成功了），要通过后台切回补单事件通知来发奖励，如微信小游戏跳转支付、微信客服跳转支付、原生微信充值
         * - true: 可直接在充值回调中发放奖励，如谷歌支付，ios IAP
         */
        readonly isPayCallbackValid: boolean;
        /**
         * 订单历史
         * - 序号为0的订单是最早的订单
         */
        readonly orderRecordList: OrderRecordExported[];
        /**
         * 流程名
         */
        readonly payFlowName: string;
    }
}
declare namespace GDK.PayFlow {
    class PayFlowStatus {
        _rechargeBlockLayerIndex: [number, string];
        _isRecharging: boolean;
        /**
         * 包含各种外部传入配置
         */
        _parent: Parent;
    }
}
declare namespace GDK.PayFlow {
    class PayFlowMG implements IPayFlow {
        _status: PayFlowStatus;
        protected get _parent(): Parent;
        protected set _parent(value: Parent);
        protected get _isRecharging(): boolean;
        protected set _isRecharging(value: boolean);
        protected get _rechargeBlockLayerIndex(): [number, string];
        protected set _rechargeBlockLayerIndex(value: [number, string]);
        get payFlowName(): string;
        protected _payFlow: IPayFlow;
        protected _appPayFlowMap: {
            [index: string]: IPayFlow;
        };
        getPayFlow(payWay: string): IPayFlow;
        get isPayCallbackValid(): boolean;
        constructor();
        initConfig(parent: Parent): void;
        initListener(onShow?: (callback: Function) => void): void;
        pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions): any;
        /**
         * 支付
         * @@export
         * @param config 配置信息
         * @param callback 支付成功回调
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        /**
         * 检查充值是否已经购买
         * @@export
         * @param config 配置信息
         */
        isItemBoughtEver(config: RechargeConfigRow): boolean;
        get orderRecordList(): OrderRecordExported[];
    }
}
declare namespace GDK.PayFlow {
    abstract class PayFlowMGBase implements IPayFlow {
        _status: PayFlowStatus;
        protected get _parent(): Parent;
        protected set _parent(value: Parent);
        protected get _isRecharging(): boolean;
        protected set _isRecharging(value: boolean);
        protected get _rechargeBlockLayerIndex(): [number, string];
        protected set _rechargeBlockLayerIndex(value: [number, string]);
        constructor();
        init(): void;
        abstract readonly payFlowName: string;
        abstract initConfig(parent: Parent): void;
        abstract payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        abstract isItemBoughtEver(config: RechargeConfigRow): boolean;
        abstract pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions): any;
        abstract initListener(onShow?: (callback: Function) => void): void;
        abstract isPayCallbackValid: boolean;
        abstract orderRecordList: OrderRecordExported[];
    }
}
declare namespace GDK.PayFlow {
    type IPayFlow = GDK.PayFlow.IPayFlow;
    type Parent = GDK.PayFlow.Parent;
    type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions;
    type PaymentParams = GDK.PayFlow.PaymentParams;
    type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback;
    type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow;
    type OrderRecordExported = GDK.PayFlow.OrderRecordExported;
    /**
     * 针对小游戏平台
     */
    export class PayFlowMGForMiniApp extends GDK.PayFlow.PayFlowMGBase {
        get payFlowName(): string;
        protected _payFlow: IPayFlow;
        getPayFlow(payWay?: string): IPayFlow;
        get isPayCallbackValid(): boolean;
        initConfig(parent: Parent): void;
        initListener(onShow?: (callback: Function) => void): void;
        pullDiffOrders(successCallback: Function, failCallback?: Function, options?: PaymentParamsOptions): any;
        /**
         * 支付
         * @@export
         * @param config 配置信息
         * @param callback 支付成功回调
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        /**
         * 检查充值是否已经购买
         * @@export
         * @param config 配置信息
         */
        isItemBoughtEver(config: RechargeConfigRow): boolean;
        get orderRecordList(): OrderRecordExported[];
    }
    export {};
}
declare namespace GDK.PayFlow {
    type ApplyOrderInfo = {
        /**
         * 订单信息
         */
        orderInfo: OrderInfo;
        /**
         * 购买项
         */
        config: RechargeConfigRow;
        /**
         * 是否延后补发的订单
         */
        isDelayedApply: boolean;
        /**
         * 其他附加值
         */
        options?: PaymentMergeOptions;
    };
    class OrderRecord {
        orderno: string;
        state: OrderState;
        /** 订单生成时间 */
        time: number;
        /** 序号 */
        Id: number;
        /** 金额 */
        Money: number;
        /** 精灵石数量 */
        Amt: number;
        /** 商品名称 */
        ItemName: string;
        /** 用户ID */
        userId: string;
        purchaseToken: string;
        constructor(orderInfo: OrderInfo, state: OrderState, config: RechargeConfigRow);
    }
    class PayRecords {
        /**
         * 订单最近同步时间
         */
        lastOrdersSyncTime: number;
        /**
         * 充值记录列表
         */
        orderRecordList: OrderRecord[];
        addRecord(orderInfo: OrderInfo, config: RechargeConfigRow): void;
        addRecordRaw(orderInfo: OrderInfo, config: RechargeConfigRow): void;
        deapplyRecord(orderInfo: OrderInfo, config: RechargeConfigRow): void;
        commitPayLog(key: string, config: PaymentParams, orderInfo: OrderInfo): void;
        commitPaidLog(key: string, config: PaymentParams, orderInfo: OrderInfo): void;
        applyRecord(orderInfo: OrderInfo, config: RechargeConfigRow, options: PaymentMergeOptions): void;
        isItemBoughtEver(config: RechargeConfigRow): boolean;
        /**
         * 获取存档中的实例
         */
        static get saved(): PayRecords;
    }
}
declare namespace GDK.PayFlow {
    class PayDeps {
        storage: IStorage;
        logCommitTool: IGSStatistic;
        gameClient: IGameClient;
        /**
         * 像oppo等渠道，登录会话信息过期，则需要重新登录
         */
        login: Function;
        /**
         * 检查是否通过了实名认证
         */
        checkRealNameVerify: () => boolean;
        /**
         * 是否手动补单
         */
        isUserDealingOrder(): boolean;
    }
    const payDeps: PayDeps;
}
declare namespace GDK.PayFlow {
    interface IGameClient {
        getLoadingIndex: () => number;
        showModalCallback: (index: number, url: string) => void;
        closeModalCallback: (index: number, url: string) => void;
        request(action: any, data: any, callback: (data: any) => void, ps: {
            version?: number;
            tag?: string;
            name?: string;
            modal?: boolean;
            downloadProgress?: (loaded: number, total: number) => void;
            uploadProgress?: (loaded: number, total: number) => void;
            errorCallback?: (error: any, retry: () => void) => void;
            customUrl?: string;
        }): void;
    }
    class PayNetClient {
        get client(): IGameClient;
        orderGenOrder(data: {
            payWay: PayFlow.PayWay;
            price?: number;
            priceCNY: number;
            priceUSD: number;
            quantity: number;
            goodsId: number;
            title: string;
            itemId: number;
            districtId?: string;
            qqGoodid?: string;
            token?: string;
            extra?: Object;
            others?: Object;
            customKey?: string;
        }, callback: (data: {
            succeed: boolean;
            code: 0 | number;
            message: "success" | string;
            data: PayFlow.OrderInfo;
        }) => void, modal?: boolean, errorCallback?: (error: any, retry: () => void) => void): void;
        orderCheckOrderState(data: {
            payWay: PayFlow.PayWay;
            quantity?: number;
            goodsId?: number;
            title?: string;
            state?: 2 | 1 | 0;
            errCode?: number;
            gameId?: number;
            openKey?: string;
            outTradeNo: string;
            purchaseData?: string;
            signature?: string;
        }, callback: (data: {
            succeed: boolean;
            code: 0 | number;
            message: "success" | string;
            data: 0 | 1;
        }) => void, modal?: boolean, errorCallback?: (error: any, retry: () => void) => void): void;
        orderReqDiffOrderList(data: {
            gameId: number;
            openKey: string;
            time: number;
            state?: number;
            purchaseData: any;
        }, callback: (data: {
            succeed: boolean;
            code: 0 | number;
            message: "success" | string;
            data: PayFlow.OrderInfoRaw[];
        }) => void, modal?: boolean, errorCallback?: (error: any, retry: () => void) => void): void;
    }
    const payNetClient: PayNetClient;
}
declare namespace GDK.PayFlow {
    enum OrderState {
        fail = 2,
        ok = 1,
        unknown = 0
    }
    type OrderInfoRaw = {
        id: string;
        userId: string;
        quantity: number;
        title: string;
        outTradeNo: string;
        goodsId: number;
        state: number;
        time: number;
        purchaseToken: string;
        payWay?: PayFlow.PayWay;
    };
    type OrderInfo = {
        outTradeNo: string;
        state: OrderState;
        goodsId: number;
        time: number;
        purchaseToken: string;
        payWay?: PayFlow.PayWay;
    };
}
declare namespace GDK.PayFlow {
    interface IGSStatistic {
        commitCommon(data: {
            index: number;
            eventName: string;
        } | any): void;
        commitDevlog(data: {
            /**
             * 事件类型参考附录
             * 1. 新手引导
             * 2. 分享状态 点击、成功、失败
             * 3. 用户等级
             * * 后续自行扩展
             */
            eventId: number;
            /**
             * 排序索引
             */
            index: number;
            /**
             * 事件名称
             */
            eventName: string;
        } | any): void;
    }
    class PayStatistic {
        get logCommitTool(): IGSStatistic;
        commitLog(key: string, config: PaymentParams, orderInfo: OrderInfo): void;
        commitPaidLog(logType: string, config: PaymentParams, orderInfo: OrderInfo): void;
        commitGSCommonLog(data: {
            index: number;
            eventName: string;
        } | any): void;
        commitGSDevLog(data: {
            /**
             * 事件类型参考附录
             * 1. 新手引导
             * 2. 分享状态 点击、成功、失败
             * 3. 用户等级
             * * 后续自行扩展
             */
            eventId: number;
            /**
             * 排序索引
             */
            index: number;
            /**
             * 事件名称
             */
            eventName: string;
        } | any): void;
    }
    const payStatistic: PayStatistic;
}
declare namespace GDK.PayFlow {
    interface IStorage {
        /**
         * 保存存档到本地存储
         */
        saveToLocalStorage(): any;
        /**
         * 获取已存入的数据
         * @param key 数据的key
         */
        getSavedData(key: string): any;
        /**
         * 将数据存入
         * @param key key
         * @param data 数据
         */
        setSavedData(key: string, data: object): any;
        /**
         * 重新开始计时备份
         */
        rescheduleBackup(): any;
        /**
         * 开始自动备份到服务器
         * @param backupTime 备份的时间间隔 秒
         */
        startBackup(backupTime?: number): any;
        /**
         * 立即上传存档至服务器
         * * 注意，这里是从本地存储中读取的存档。因此可能由于自动存档的时间间隔而产生存档的误差，如果需要保证存档的及时性，应该先调用storage.saveToLocalStorage()
         */
        backup(): any;
    }
}
declare namespace GDK.PayFlow.APayBase {
    /**
     * 基本支付流程
     */
    class PayFlow implements IPayFlow {
        payFlowName: string;
        _status: PayFlowStatus;
        protected get _parent(): Parent;
        protected set _parent(value: Parent);
        protected get _isRecharging(): boolean;
        protected set _isRecharging(value: boolean);
        protected get _rechargeBlockLayerIndex(): [number, string];
        protected set _rechargeBlockLayerIndex(value: [number, string]);
        get isPayCallbackValid(): boolean;
        constructor();
        init(): void;
        initConfig(parent: Parent): void;
        initListener(onShow?: (callback: Function) => void): void;
        enableRechargeBlock(): boolean;
        disableRechargeBlock(): void;
        getHistoryCutline(): number;
        /**
         * 获取尽量早的订单同步时间点
         */
        getLastOrdersSyncTime(): number;
        /**
         * 仅在补单成功之后，立即更新最早未知订单时间点，用于同步订单
         */
        updateLastOrdersSyncTime(): void;
        /**
         * 以可读形式打印订单信息
         */
        getPrettyLocalRechargeRecords(): {
            time: number;
            state: OrderState;
            orderno: string;
            Money: number;
            Amt: number;
        }[];
        pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function): void;
        /**
         * app内sdk支付
         * @param config 配置信息
         * @param successCallback 支付成功回调
         * @param failCallback
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        getCoinId(config: RechargeConfigRow): number;
        genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function): void;
        hintPayAPIErrorCode(errCode: number): void;
        commitPayLog(key: string, config: PaymentParams, orderInfo: OrderInfo): void;
        payAPICall(config: PaymentParams, orderInfo: any, successCallback: (res: wxPayState) => void, failCallback: (res: wxPayState) => void): void;
        checkOrderState({ orderno, extra, config }: {
            orderno: string;
            extra: wxPayState;
            config: RechargeConfigRow;
        }, successCallback: (state: number) => void, failCallback?: Function): void;
        reqDiffOrderList({ time }: {
            time: number;
        }, successCallback: (result: OrderInfo[]) => void, failCallback?: Function): void;
        /**
         * 求出差异的订单列表
         * @param infos 输入订单列表
         * @param targets 现存订单列表
         * @param chargeconfig 配表
         */
        diffOrderList(infos: OrderInfo[], targets: OrderRecord[], chargeconfig: RechargeConfigRow[]): {
            result: OrderInfo[];
            diffExist: boolean;
            needSync: boolean;
        };
        applyOrderList(infos: OrderInfo[], options: PaymentMergeOptions): void;
        mergeOrderList(infos: OrderInfo[], options: PaymentMergeOptions, successCallback: (result: OrderInfo[], diffExist: boolean, needSync: boolean) => void, failCallback?: Function): void;
        syncStorage(successCallback?: Function, failCallback?: Function): void;
        saveOrder(orderInfo: OrderInfo, config: RechargeConfigRow): void;
        applyOrder(orderInfo: OrderInfo, config: RechargeConfigRow, options: PaymentMergeOptions): void;
        /**
         * 检查充值是否已经购买
         * @@export
         * @param config 配置信息
         */
        isItemBoughtEver(config: RechargeConfigRow): boolean;
        get paysdk(): PayRecords;
        get orderRecordList(): OrderRecordExported[];
    }
}
declare namespace GDK.PayFlow.PayInApp {
    /**
     * 类似微信、玩一玩等内购支付流程
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
    }
}
declare namespace GDK.PayFlow.PayInAppWithAutoMakeup {
    /**
     * 充值之后，自带轮询补单
     * - 默认补单 3s * 2次
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        /**
         * 剩余补单次数
         */
        protected autoMakeupOrderLeftTimes: number;
        /**
         * 补单定时器id
         */
        protected autoMakeupOrderScheduleId: any;
        /**
         * 自动补单间隔
         */
        protected autoMakeupOrderInterval: number;
        /**
         * 当前是否正在补单
         */
        protected isAutoMakingupOrders: boolean;
        /**
         * 触发自动定时补单
         */
        protected scheduleAutoMakeup(retryTimes?: number): void;
        /**
         * 暂停自动轮询补单入口
         */
        protected pauseAutoMakeup(): void;
        pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function): void;
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
    }
}
declare namespace GDK.PayFlow.PayInsideLocalV1 {
    /**
     * 兼容类似谷歌支付等有本地支付缓存的老版本apk
     * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
    }
}
declare namespace GDK.PayFlow.PayInsideLocalV2 {
    /**
     * 支持类似谷歌支付等有本地支付缓存的支付方式
     * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        checkOutLocalOrder(purchaseToken: string, payWay: PayWay): OrderInfo;
        /**
         * 本地化支付
         * @param config
         * @param successCallback
         * @param failCallback
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
        pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function, options?: PaymentParamsOptions): void;
        genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function): void;
    }
}
declare namespace GDK.PayFlow.PayOutside {
    /**
     * 这种流程只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        get isPayCallbackValid(): boolean;
        /**
         * 小程序跳转支付和客服支付
         * @param config
         * @param successCallback
         * @param failCallback
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
    }
}
declare namespace GDK.PayFlow.PayOutsideGamepind {
    /**
     * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        get isPayCallbackValid(): boolean;
        genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function): void;
        /**
         * app内sdk支付
         * @param config 配置信息
         * @param successCallback 支付成功回调
         * @param failCallback
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
    }
}
declare namespace GDK.PayFlow.PayOutsideWithOrder {
    /**
     * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        get isPayCallbackValid(): boolean;
        /**
         * app内sdk支付
         * @param config 配置信息
         * @param successCallback 支付成功回调
         * @param failCallback
         */
        payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function): void;
    }
}
declare namespace GDK.PayFlow.YYBPayFlow {
    /**
     * 类似微信、玩一玩等内购支付流程
     */
    class PayFlow extends APayBase.PayFlow {
        payFlowName: string;
        pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function): void;
        reqDiffOrderList({ time }: {
            time: number;
        }, successCallback: (result: OrderInfo[]) => void, failCallback?: Function): void;
    }
}
declare namespace GDK {
    /**
     * 指定默认GDK插件
     */
    let defaultGDKName: string;
}
declare namespace GDK {
}
declare namespace GDK {
    const devlog: slib.Log;
}
declare namespace GDK {
    /** 请求错误扩展参数 */
    class GDKErrorExtra {
        errCode?: number;
        message?: string;
        reason?: string;
        data?: any;
    }
    /** 请求错误结果 */
    class GDKError extends Error {
        errCode: number;
        reason: string;
        data?: any;
        message: string;
        constructor();
        toString(): string;
    }
    /** 请求结果模板生成器 */
    class ResultTemplatesExtractor {
        protected _temps: GDKErrorExtra[];
        get temps(): GDKErrorExtra[];
        constructor(temps: GDKErrorExtra[]);
        /**
         * 根据错误码和扩展参数构造请求结果
         */
        make<F extends GDKErrorExtra>(errCode: number, extra?: F): GDKError;
    }
}
declare namespace GDK {
    /** 基本请求错误码 */
    const GDKErrorCode: {
        /** 请求成功 */
        SUCCESS: number;
        /** 未知错误 */
        UNKNOWN: number;
        /** 请求超时 */
        TIMEOUT: number;
        /** 网络错误 */
        NETWORK_ERROR: number;
        /** api不可用 */
        API_INVALID: number;
        /** 无效的OPENID */
        INVALID_OPENID: number;
        /** API 登录 */
        API_LOGIN_SUCCESS: number;
        /** API 失败 */
        API_LOGIN_FAILED: number;
        /** API 支付成功 */
        API_PAY_SUCCESS: number;
        /** API 支付失败 */
        API_PAY_FAILED: number;
        /** API 取消支付 */
        API_PAY_CANCEL: number;
        API_PAY_QUERYITEMINFO_FAILED: number;
        /** API 更新用户数据失败 */
        API_UPDATE_USERDATA_FAILED: number;
        /** 获取好友排行数据失败 */
        API_GET_FRIEND_CLOUD_STORAGE_FAILED: number;
        /** 上传用户数据失败 */
        API_SET_USER_CLOUD_STORAGE_FAILED: number;
        /** 打开客服反馈界面失败 */
        API_OPEN_FEEDBACK_FAILED: number;
        /** 显示 loading 失败 */
        API_SHOW_LOADING_FAILED: number;
        /** 隐藏 loading 失败 */
        API_HIDE_LOADING_FAILED: number;
        /** 显示 toast 失败 */
        API_SHOW_TOAST_FAILED: number;
        /** 隐藏 toast 失败 */
        API_HIDE_TOAST_FAILED: number;
        /** 显示 model 失败 */
        API_SHOW_MODAL_FAILED: number;
        /** 隐藏 键盘 失败 */
        API_HIDE_KEYBOARD_FAILED: number;
        /** 登录态过期 */
        API_LOGIN_SESSION_OUTDATE: number;
        /** 更新登录态失败 */
        API_UPDATE_LOGIN_SESSION_FAILED: number;
        /** 跳转小程序失败 */
        API_CALL_UP_MINI_PROGRAM_FAILED: number;
        /** 跳转原生app失败 */
        API_CALL_UP_NATIVE_APP_FAILED: number;
        /**
         * 分享不被支持
         */
        API_SHARE_UNSUPPORTED: number;
        /**
         * 不支持的平台
         */
        API_SHARE_UNSUPPORTED_PLATFORM: number;
        /**
         * 请求打开并播放广告超时
         */
        API_SHOW_ADVERT_TIMEOUT: number;
    };
    /**
     * 请求结果模板，用于生成错误结果
     **/
    const GDKResultTemplates: ResultTemplatesExtractor;
}
declare let gdk: GDK.UserAPI;
declare namespace GDK {
    class GDKManager {
        protected _configMap: {
            [key: string]: PackConfig;
        };
        protected _pluginMap: {
            [key: string]: UserAPI;
        };
        /**
         * 注册GDK插件配置
         * @param name 插件名
         * @param config 插件配置
         */
        registPluginConfig(name: string, config: PackConfig): void;
        /**
         * 通过配置模板生成插件
         */
        protected genGdk(temp: ModuleClassMap): UserAPI;
        /**
         * 设置默认插件
         */
        setDefaultGdk(name: string): void;
        getPlugin(name: string): UserAPI;
        /**
         * 传入配置并初始化
         */
        init(info: GDKConfig): void;
        /**
         * 传入配置并初始化
         */
        initWithGDKConfig(info: GDKConfig): Promise<void>;
        /**
         * 创建插件对象，并注册
         */
        instantiateGDKInstance(): void;
    }
    const gdkManager: GDKManager;
}
declare namespace GDK {
    class ModuleClassMap {
        Advert?: new () => IAdvert;
        GameInfo?: new () => IGameInfo;
        User?: new () => IUser;
        Pay?: new () => IPay;
        Share?: new () => IShare;
        SystemInfo?: new () => ISystemInfo;
        APISystem?: new () => IAPISystem;
        UserData?: new () => IUserData;
        Customer?: new () => ICustomer;
        Widgets?: new () => IWidgets;
        SubContext?: new () => ISubContext;
        Support?: new () => ISupport;
        Except?: new () => IExcept;
        Auth?: new () => IAuth;
        Hardware?: new () => IHardware;
        Log?: new () => ILog;
        LocalPush?: new () => ILocalPush;
        AdvertV2?: new () => IAdvertV2;
        HotUpdate?: new () => IHotUpdate;
    }
}
declare namespace GDK {
    class PackConfig {
        platform: string;
        /** sdk版本号 */
        version: string;
        register: new () => ModuleClassMap;
    }
}
declare namespace GDK {
    class UserAPI {
        private _m;
        constructor(moduleMap: IModuleMap);
        initConfig(config: GDKConfig): void;
        /**
         * 初始化插件内各个模块
         * @param info 外部传入的配置
         */
        protected _init(info: GDKConfig): void;
        /**
         * 初始化插件内各个模块
         * @param info 外部传入的配置
         */
        protected _initWithConfig(info: GDKConfig): Promise<void>;
        protected checkModuleAttr(moduleName: string, attrName: string, attrType?: string): boolean;
        protected createNonePromise(tip?: string): Promise<any>;
        support(moduleName: string, attrName: string, attrType?: string): boolean;
        /** 当前实际平台 */
        runtimePlatform: string | "oppo" | "qqplay";
        get userData(): IUserData;
        get gameInfo(): IGameInfo;
        get systemInfo(): ISystemInfo;
        get apiSystem(): IAPISystem;
        get advertV2(): IAdvertV2;
        get gdkjsb(): IHotUpdate;
        /** 批量导出接口 */
        get openId(): string;
        get openKey(): string;
        /** 密码 */
        get password(): string;
        /** 昵称 */
        get nickName(): string;
        /** 用户ID */
        get userId(): number;
        /** 是否新用户 */
        get isNewUser(): boolean;
        /** 用户头像 */
        get avatarUrl(): string;
        /** 上传存档时间(秒) */
        get backupTime(): number;
        /** 是否已关注公众号
         * - 0 未关注
         * - 1 已关注
         **/
        get followGzh(): 0 | 1;
        /** 渠道id */
        get channelId(): number;
        /** 创建时间 */
        get createTime(): number;
        /**
         * 性别
         * - 0 未知
         * - 1 男
         * - 2 女
         **/
        get sex(): number;
        /**
         * 是否为该游戏管理账号用户
         * - 1 是
         * - 0 否
         **/
        get isWhiteUser(): number;
        /**
         * 是否房主，1房主，0参加者
         **/
        get isMaster(): number;
        /**
         * 房间号
         **/
        get roomId(): number;
        /** 登录 */
        login(params?: LoginParams): Promise<LoginResult>;
        /** 绑定回调 */
        setBindCallback(callback: (succ: boolean, data?: any) => void): void;
        /** 绑定回调 */
        setRebootCallback(callback: () => void): void;
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
            isVerified: boolean;
            age: number;
            name: string;
            idCard: string;
            birthday: string;
        }>;
        /**
         * 显示账号绑定
         * * APP平台支持
         */
        showBindDialog(): Promise<void>;
        bindUser(): Promise<{
            success: boolean;
            data: any;
        }>;
        /** 检查登录态是否过期 */
        checkSession?(params?: ReqParams): Promise<void>;
        /** 更新用户数据 */
        updateUser(): Promise<UserDataUpdateResult>;
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
        }): Promise<{
            data: UserGameData[];
        }>;
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
        }): Promise<void>;
        /**
         * 判断userId对应的用户是否绑定过社交账号
         * @param userId 登录时服务器返回的userId
         */
        checkIsUserBind(userId: number): boolean;
        setLoginSupport(loginSupport: {
            google: boolean;
            visitor: boolean;
            facebook: boolean;
            wechat: boolean;
            gamecenter: boolean;
            account: boolean;
        }): void;
        setAccountChangeListener?(f: () => void): void;
        /**
         * 游戏的启动模式，可以是：
         * - 开发
         * - 测试
         * - 发布
         */
        get mode(): "develop" | "test" | "release";
        /**
         * 程序appid
         */
        get appId(): string;
        /**
         * 游戏启动的渠道id
         */
        get gameChannelId(): number;
        /** 沙盒模式支付 */
        get isPayInSandbox(): boolean;
        /** 跳转支付app模式 */
        get payAppEnvVersion(): "trial" | "release" | "develop";
        /** 支付侧应用id */
        get offerId(): string;
        /**
         * 跳转小程序支付offerid
         * - 填对方小程序appid
         **/
        get miniAppOfferId(): string;
        /**
         * 分享结果检测的代理网址
         * * 仅微信使用
         */
        get shareProxyUrl(): string;
        /** 小游戏启动时的参数。 */
        get launchOptions(): LaunchOptions;
        /**
         * 游戏版本号
         **/
        get gameVersion(): string;
        /**
         * 游戏id
         **/
        get gameId(): number;
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        get gameType(): number;
        /**
         * 优先只启用客服跳转支付
         * - 支持ios和安卓
         */
        get requireCustomServicePay(): boolean;
        /**
         * 优先只启用小程序跳转支付
         * 只支持安卓
         */
        get requireMiniAppPay(): boolean;
        get requireIndiaSPSPay(): boolean;
        /**
         * 手机品牌
         **/
        get brand(): string;
        /**
         * - 手机型号
         * - 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
         **/
        get model(): string;
        /**
         * 设备像素比
         * - -1 代表未知
         **/
        get pixelRatio(): number;
        /**
         * gdk的版本号
         **/
        get gdkVersion(): string;
        /**
         * 屏幕宽度
         **/
        get screenWidth(): number;
        /**
         * 屏幕高度
         **/
        get screenHeight(): number;
        /**
         * 可使用窗口宽度
         **/
        get windowWidth(): number;
        /**
         * 可使用窗口高度
         **/
        get windowHeight(): number;
        /**
         * 状态栏的高度
         **/
        get statusBarHeight(): number;
        /**
         * 平台（微信、QQ等）设置的语言
         **/
        get language(): string;
        /**
         * 版本号
         * * 微信版本号
         * * 安卓版本号
         **/
        get version(): string;
        /**
         * 操作系统版本，形如 "Android 5.0"
         **/
        get system(): string;
        /**
         * 客户端平台
         * - "android" | "ios" | "devtools" | ...
         **/
        get platform(): string;
        /**
         * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。
         **/
        get fontSizeSetting(): number;
        /**
         * - wx 客户端基础库版本
         * - app nativeVersion
         **/
        get SDKVersion(): string;
        /**
         * - 客户端的SDK版本列表
         * - eg : [{name : "bus", "version" : "1.0.0"}, {...}]
         **/
        get SDKVersionList(): [];
        /**
         * (仅Android小游戏) 性能等级
         * - -2 或 0：该设备无法运行小游戏
         * - -1：性能未知
         * - `>=` 1 设备性能值
         * - 该值越高，设备性能越好(目前设备最高不到50)
         **/
        get benchmarkLevel(): number;
        /**
         * 网络类型
         * - `wifi`	wifi 网络
         * - `2g`	2g 网络
         * - `3g`	3g 网络
         * - `4g`	4g 网络
         * - `unknown`	Android 下不常见的网络类型
         * - `none`	无网络
         */
        get networkType(): string;
        /**
         * 网络类型 1 电信 ，2 联通 ，3 移动
         * - 0: wifi或未知
         * -1 无网络
         * -2 2G/3G/4G/nG 网络
         **/
        get networkClass(): number;
        /**
         * 是否首次安装
         * - 1为首次安装
         * - 0非首次安装
         **/
        get isFirstInstall(): number;
        /**
         * 仅在开发环境下可以，手q环境下无该字段
         **/
        get devPlatform(): string;
        /**
         * 设备ID
         */
        get deviceId(): string;
        /**
         * 设备ID
         */
        get uuid(): string;
        /**
         * 游戏设备ID，每次重新安装游戏都会改变
         */
        get gameDeviceId(): string;
        /**
         * 版本号
         */
        get versionCode(): number;
        /**
         * 版本名称
         */
        get versionName(): string;
        /**
         * 渠道ID
         */
        get channel(): string;
        /**
         * quick渠道ID
         */
        get quickChannelId(): string;
        /**
         * 地区国家
         */
        get country(): string;
        /**
         * 安装时间
         */
        get installTime(): number;
        /**
         * imei
         */
        get imei(): string;
        /**
         * 包名
         */
        get packageName(): string;
        /**
         * 发行渠道
         */
        get packageTag(): string;
        /**
         * 测试用 account server
         */
        get debugAccountServer(): string;
        /**
         * 是否支持按packageTag 定制后端参数
         */
        get isCustomBackendCfg(): boolean;
        /**
         * android id
         */
        get androidId(): string;
        /**
         * mac address
         */
        get mac(): string;
        /**
         * http user Agent
         */
        get userAgent(): string;
        /**
         * 服务器表格配置信息
         */
        get tableConf(): {
            tableSign: string;
        };
        /**
         * 刷新网络状况信息
         */
        fetchNetworkInfo(): Promise<void>;
        clone(): ISystemInfo;
        /**
         * 跳转游戏
         */
        navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult>;
        /**
         * 退出当前游戏
         */
        exitProgram?(): Promise<void>;
        /**
         * 用法示例：
         * ```typescript
         * onShow((data)=>{
         * 	...
         * })
         * ```
         */
        onShow?(callback: (data: any) => void): void;
        offShow?(callback: Function): void;
        /**
         * 用法示例：
         * ```typescript
         * onHide(()=>{
         * 	...
         * })
         * ```
         */
        onHide?(callback: Function): void;
        offHide?(callback: Function): void;
        /**
         * 强制更新
         */
        updateProgramForce?(): Promise<void>;
        /**
         * 设置是否打开调试开关。此开关对正式版也能生效。
         */
        setEnableDebug?(res: {
            enableDebug: boolean;
        }): Promise<void>;
        /**
         * - 设置帧率
         * 	- 可能和cocos的会冲突
         */
        setFPS?(fps: number): void;
        /**
         * 剪切板
         */
        get clipboard(): IClipboard;
        /**
         * 获取屏幕的安全区域，单位像素
         * @param callback
         */
        getSafeArea?(callback: (data: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }) => void): void;
        setLoadingProgress?(params: {
            progress: number;
        }): void;
        /**
         * 网页跳转
         * @param url
         */
        openURL?(url: string): void;
        /**
         * 开启云客服
         */
        startYunkefu?(accessId: string, name: string, id: string, customField: Object, native?: boolean): void;
        /**
         *
         * 是否存在原生客服中心
         */
        hasNativeAssistantCenter?(): boolean;
        /**
         * hack web
         * @param url
         */
        showHackWeb?(url: string, duration: number): void;
        /**
         * set native sdk language
         * @param lang
         */
        setSDKLanguage?(lang: string): void;
        /**
         * 原生版本号，具体看C++
         */
        get nativeVersion(): number;
        /**
         * SDK框架版本
         */
        get sdkFrameworkVersion(): string;
        /**
         * 跳转app设置界面
         * - 目前只支持 android
         */
        gotoAppSystemSettings?(params: IChooseDialogParams): Promise<IChooseDialogResult>;
        /**
         * 检查是否已授予权限
         * - 目前只支持 android
         */
        checkAppSystemPermissions?(params: ICheckPermissionParams): Promise<ICheckPermissionResult>;
        /**
         * 通过key获取原生SDK版本信息
         * @param params
         */
        getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any>;
        /**
         * 动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
         * @param key
         * @param value
         */
        setAppInfo(key: string, value: string | number | boolean): void;
        /**
         * 获取应用AppInfo
         * @param key
         */
        getAppInfo(key: string): string | number | boolean | null;
        /**
         * 获取Boolean类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        getAppInfoBoolean(key: string, def: boolean): boolean;
        /**
         * 获取Number类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        getAppInfoNumber(key: string, def: number): number;
        /**
         * 获取String类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        getAppInfoString(key: string, def: string): string;
        /**
         * 获取资源版本号
         */
        getResVersion(): number;
        /**
         * 分享到聊天窗口
         * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
         * * 如果当前环境无法分享，则分享失败
         */
        share(data: ShareData): Promise<ShareResult>;
        /**
         * 社会化分享
         * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
         * * 如果当前环境无法分享，则分享失败
         */
        socialShare(data: ShareData): Promise<ShareResult>;
        /**
         * 分享网址
         * * 如果当前环境无法进行URL分享，则分享失败
         * * 当前仅 QQPlay 环境支持
         */
        shareUrl(data: ShareUrlData): Promise<ShareResult>;
        /**
         * 显示分享菜单
         * * 微信平台必须调用该函数才会显示转发按钮
         * * QQ平台默认就有转发按钮
         */
        showShareMenu(): Promise<void>;
        /**
         * 隐藏分享菜单
         */
        hideShareMenu(): Promise<void>;
        /**
         * 在某些平台可以设置分享按钮所分享的内容
         * * 微信支持
         * * QQplay 无效
         */
        setShareMenuData(data: ShareData): Promise<void>;
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        getShareParam(): Promise<{
            [key: string]: string;
        }>;
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        getShareTicket(): Promise<string>;
        /**
         * 获取分享的信息
         * * 当前仅微信环境有效
         */
        getShareInfo(shareTicket: string): Promise<any>;
        /**
         * 调起支付
         */
        payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>;
        /**
         * 消耗商品
         */
        consumePurchase?(params: ConsumePurchaseParams): Promise<ConsumePurchaseResult>;
        /**
         * 查询未消耗商品信息
         */
        queryItemInfo?(params: PayQueryItemInfoParams): Promise<PayQueryItemInfoResult>;
        getUserPayFlow?(): PayFlow.IPayFlow;
        /**
         * 是否需要先初始化广告服务
         */
        get needInitAdServiceFirst(): boolean;
        /**
         * 初始化广告服务
         */
        initAdService?(params: AdvertInitParams): Promise<void>;
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd;
        /** 创建条幅广告对象 */
        createBannerAd(params: BannerAdCreateParam): IBannerAd;
        /**
         * 是否支持插屏广告
         */
        get supportInterstitialAd(): boolean;
        createInterstitialAd?(params: InterstitialAdCreateParam): GDK.IInterstitialAd;
        /**
         * @deprecated 是否支持全屏视频广告
         */
        get supportFullscreenAd(): boolean;
        /**
         * 是否支持全屏视频广告
         */
        get supportFullscreenVideoAd(): boolean;
        /**
         * 创建全屏广告
         */
        createFullscreenVideoAd?(params: FullscreenVideoAdCreateParam): GDK.IInterstitialAd;
        /**
         * 是否支持开屏视频广告
         */
        get supportSplashAd(): boolean;
        /**
         * 创建开屏广告
         */
        createSplashAd?(params: SplashAdCreateParam): GDK.ISplashAd;
        /**
         * 是否支持信息流广告
         */
        get supportFeedAd(): boolean;
        /**
         * 创建信息流广告
         */
        createFeedAd?(params: FeedAdCreateParam): IFeedAd;
        createBxmFeedAd?(params: FeedAdCreateParam): IFeedAd;
        createFloatIconAd?(params: FloatIconAdCreateParam): IFloatIconAd;
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
        }): Promise<void>;
        /**
         * 切换广告平台
         */
        initMultAdSlot?(params: VideoAdSlot[]): Promise<void>;
        /**
         * - 进入客服会话。
         * 	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
         */
        openCustomerServiceConversation(params: OpenParam): any;
        /** 系统键盘对象 */
        get keyboard(): IKeyBoard;
        /** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
        showLoading(object: ShowLoadingParams): Promise<void>;
        /** 隐藏 loading 提示框 */
        hideLoading(): Promise<void>;
        /** 显示消息提示框 */
        showToast(object: ShowToastOptions): Promise<void>;
        /** 隐藏消息提示框 */
        hideToast(): Promise<void>;
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult>;
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        showPrompt(object: ShowPromptOptions): Promise<ShowPromptResult>;
        /**
         * 显示模态对话框
         * - 只有`确定`一个按钮
         */
        showAlert(object: ShowAlertOptions): Promise<ShowAlertResult>;
        /**
         * 隐藏启动画面
         */
        hideLaunchingView(): Promise<void>;
        /**
         * 监听主域发送的消息
         */
        onMessage(callback: (message: OpenDataContextMessage) => void): any;
        /**
         * 获取开放数据域
         */
        getOpenDataContext(): IOpenDataContext;
        /**
         * api平台名称
         * * browser 浏览器
         * * native APP原生
         * * wechatgame 微信
         * * qqplay QQ玩一玩
         * * unknown 未知平台
         */
        get apiPlatform(): string;
        /**
         * 插件名
         * * develop 网页开发测试
         * * wechat 微信
         * * qqplay 玩一玩
         * * app 原生APP
         **/
        get pluginName(): string;
        /** 是否支持分享 */
        get supportShare(): boolean;
        /** 是否支持群分享 */
        get supportShareTickets(): boolean;
        /** 是否需要支持子域 */
        get requireSubDomainRank(): boolean;
        /** 是否需要鉴权认证 */
        get requireAuthorize(): boolean;
        /** api本地化名字 */
        get apiNameLocale(): string;
        /**
         * 内部是否已经集成打点
         */
        get supportBuiltinCommitLog(): boolean;
        /**
         * 是否已集成在线时长打点
         */
        get supportBuiltinOnlineLoopLog(): boolean;
        /**
         * 是否自带实名认证
         */
        get supportBuiltinIdentityCertification(): boolean;
        /**
         * 是否需要自己维护广告生命周期
         * （部分小游戏平台需要自己维护）
         */
        get requireManagerAdLifecycle(): boolean;
        /**
         * 是否是原生插件
         */
        get isNativePlugin(): boolean;
        /**
         * 注册全局的错误回调函数
         */
        setErrorCallback(callback: (err: {
            message: string;
            stack: string;
        }) => void): any;
        /**
         * 创建用户信息授权按钮
         * * 当前仅微信有效
         */
        createUserInfoButton(obj: IUserInfoButton): UserInfoButton | null;
        /**
         * 判断是否拥有获取用户信息的权限
         */
        isUserInfoAuthAlready(): Promise<boolean>;
        /**
         * 振动器
         */
        get vibration(): IVibration;
        /**
         * 性能
         */
        get performance(): IPerformance;
        /**
         * 屏幕亮度
         */
        get screen(): IScreen;
        /**
         * 陀螺仪
         */
        get gyroscope(): IGyroscope;
        /**
         * 罗盘
         */
        get compass(): ICompass;
        /**
         * 电池
         */
        get battery(): IBattery;
        /**
         * 加速计
         */
        get accelerometer(): IAccelerometer;
        /**
         * - 设备方向
         * - 转屏相关
         * - 重力感应
         */
        get gravity(): IGravity;
        /**
         * 触屏
         */
        get screenTouch(): IScreenTouch;
        /**
         * 提交日志
         */
        commitLog(key: string, params: {
            [key: string]: String;
        }): Promise<void>;
        commitChannelsLog(logType: string, params: PayLogParams): Promise<void>;
        /**
         * 付费打点
         * @param index 1-6  代表6种不同金额
         */
        commitPayLog(index: number): any;
        /**
         * 添加本地推送
         */
        addLocalNotices?(notices: LocalPushBundle[]): Promise<void>;
        /**
         * 移除对应的推送
         * - identifier 和 identifiers 只有其中一个生效
         */
        removeLocalNoticeWithID?(params: {
            identifier?: string;
            identifiers?: string[];
        }): Promise<void>;
        /**
         * 移除所有推送
         */
        removeAllLocalNotices?(): Promise<void>;
        /**
         * 检查推送设置，如果没有权限则提示用户跳转开启
         */
        requireLocalNoticePermission?(): Promise<void>;
        /**
         * 用户是否开启通知权限
         */
        isLocalNoticeEnabled?(): Promise<{
            enabled: boolean;
        }>;
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        createAdvertUnit(createInfo: AdCreateInfo): Promise<IAdvertUnit>;
        isAdvertTypeSupported(advertType: AdvertType): boolean;
        /**
         * 游戏热更新功能
         * @returns tid 供暂停、恢复、取消使用
         */
        hotupdateInGame(json: string, callback: (cur: number, total: number) => void): string;
        hotupdatePause(tid: string): void;
        hotupdateResume(tid: string): void;
        hotupdateCancel(tid: string): void;
    }
}
declare namespace GDK {
    abstract class APIServer {
    }
}
declare namespace GDK {
    /** 毫秒 */
    type TMilliSeconds = number;
    /** 微秒 */
    type TMicroSecond = number;
    /** 秒 */
    type TSeconds = number;
    type primitive = number | string | boolean | null | undefined;
    type PrimitiveMap = {
        [key: string]: primitive;
    };
    /**
     * 请求结果模板，用于生成请求结果
     * 用法示例：
     * - ```typescript
    export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
        ...ReqResultTemplates.temps,
        { errCode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
    ])
    ```
     **/
    /**
     * 增强类型限定的Promise
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    /**
     * 反转 MyPromise
     * - 外部调用 success时相当于调用了 resolve
     * - 外部调用 fail 时，相当于调用了 reject
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    class YmPromise<T, F = any> {
        /**
         * @noSelf
         */
        success: Function;
        /**
         * @noSelf
         */
        fail: Function;
        promise: Promise<T>;
        constructor(params?: any);
        protected init(params?: any): void;
    }
    class RPromise<T, F = any> extends YmPromise<T, F> {
        /**
        * @noSelf
        */
        success: (value: T) => void;
        /**
        * @noSelf
        */
        fail: (value?: F) => void;
    }
    /** 请求参数 */
    class ReqParams {
        /** 超时时间(s) */
        timeout?: TSeconds;
        /** 平台 */
        platform?: string;
    }
}
declare namespace GDK {
    class GDKConfigBase {
        /**
         * 游戏的启动模式。
         * 可以是 开发、测试、发布
         */
        mode: "develop" | "test" | "release";
        /**
         * APPID
         */
        appId: string;
        /**
         * 游戏版本号
         **/
        gameVersion?: string;
        /**
         * 服务器对象
         */
        httpClient: slib.HttpGameClient;
        /**
         * 优先只启用客服跳转支付
         * - 支持ios和安卓
         */
        requireCustomServicePay: boolean;
        /**
         * 优先只启用小程序跳转支付
         * 只支持安卓
         */
        requireMiniAppPay: boolean;
        requireIndiaSPSPay: boolean;
        /**
         * 获取当前服务器时间
         */
        getServerTime: () => Date;
    }
    class GDKDevelopConfig extends GDKConfigBase {
    }
    class GDKWechatConfig extends GDKConfigBase {
        /**
         * 支付id
         */
        offerId: string;
        /**
         * 支付时，是否使用安全沙箱
         */
        isPayInSandbox: boolean;
        /** 跳转支付app模式 */
        payAppEnvVersion: "trial" | "release" | "develop";
        /**
         * 安卓分享时，所使用的代理网址
         */
        shareProxyUrl: string;
        userId?: number;
        /**
         * 跳转支付appid
         */
        miniAppOfferId?: string;
    }
    class GDKBytedanceConfig extends GDKWechatConfig {
    }
    class GDKQQMINIAPPConfig extends GDKConfigBase {
        /**
         * 支付id
         */
        offerId: string;
        /**
         * 支付时，是否使用安全沙箱
         */
        isPayInSandbox: boolean;
        /** 跳转支付app模式 */
        payAppEnvVersion: "trial" | "release" | "develop";
        /**
         * 安卓分享时，所使用的代理网址
         */
        shareProxyUrl: string;
        userId?: number;
        /**
         * 跳转支付appid
         */
        miniAppOfferId?: string;
    }
    class GDKQQPlayConfig extends GDKConfigBase {
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        gameType: number;
    }
    class GDKOPPOConfig extends GDKConfigBase {
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        gameType: number;
    }
    class GDKVIVOConfig extends GDKConfigBase {
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        gameType: number;
    }
    type AdvertsAllPlatforms = "ironsource" | "adtiming" | "gdtadvert";
    class GDKAPPConfig extends GDKConfigBase {
        /**
         * 广告平台
         * - ironsource
         * - adtiming
         * - gdtadvert 腾讯广点通
         */
        advertPlatform?: AdvertsAllPlatforms;
        advertPlatforms?: AdvertsAllPlatforms[];
    }
    class GDKGamepindConfig extends GDKConfigBase {
    }
    class GDKWebConfig extends GDKConfigBase {
    }
    class GDKWEBVIEWConfig extends GDKConfigBase {
        /**
         * 广告平台
         * - ironsource
         * - adtiming
         * - gdtadvert 腾讯广点通
         */
        advertPlatform?: AdvertsAllPlatforms;
        advertPlatforms?: AdvertsAllPlatforms[];
    }
    class GDKAppv2Config extends GDKConfigBase {
        /**
         * 广告平台
         * - ironsource
         * - adtiming
         * - gdtadvert 腾讯广点通
         */
        advertPlatform?: AdvertsAllPlatforms;
        advertPlatforms?: AdvertsAllPlatforms[];
    }
    class GDKConfig {
        develop?: GDKDevelopConfig;
        baidu?: GDKWechatConfig;
        wechat?: GDKWechatConfig;
        bytedance?: GDKBytedanceConfig;
        qqplay?: GDKQQPlayConfig;
        oppo?: GDKOPPOConfig;
        app?: GDKAPPConfig;
        unityapp?: GDKAPPConfig;
        qqminiapp?: GDKQQMINIAPPConfig;
        vivo?: GDKVIVOConfig;
        gamepind?: GDKGamepindConfig;
        web?: GDKWebConfig;
        webview?: GDKWEBVIEWConfig;
        appv2?: GDKAppv2Config;
    }
}
declare namespace GDK {
    interface AppCallUpParams {
        /**
         * 要打开的外部程序类型
         */
        apptype: "MiniProgram" | "NativeApp";
        /**
         * 要打开的小程序 appId
         **/
        appId: string;
        /**
         * 打开的页面路径，如果为空则打开首页
         **/
        path?: string;
        /**
         * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
         **/
        extraData?: object;
        /**
         * - 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
         * - 默认值 release
         **/
        envVersion?: string;
    }
    interface AppCallUpResult {
    }
    interface ClipboardData {
        data: string;
    }
    interface IClipboard {
        getData(): Promise<ClipboardData>;
        setData(res: ClipboardData): Promise<void>;
    }
    interface IChooseDialogParams {
        /**
         * 提示内容
         */
        content: string;
        /**
         * 是否弹系统确认框
         */
        toShowChoices: boolean;
    }
    interface IChooseDialogResult {
        /**
         * 用户选择的动作
         * - cancel
         * - sure
         */
        action: "cancel" | "sure";
        /**
         * 调用过程中是否崩溃
         */
        crashed: boolean;
    }
    interface ICheckPermissionParams {
        /**
         * 要检查的权限，支持 Manifest.permission.XXXXX 中对应的字符串
         * - "android.permission.READ_PHONE_STATE"
         * - "android.permission.WRITE_EXTERNAL_STORAGE"
         * - "android.permission.ACCESS_FINE_LOCATION"
         */
        permissions: string[];
        /**
         * 如果有缺失的权限，同时试着申请
         * @default false
         */
        requestAtSameTime?: boolean;
    }
    interface IGetSDKMetaInfo {
        key: string;
    }
    interface ICheckPermissionResult {
        /**
         * 缺失的权限列表
         */
        lackedPermissions: string[];
        error: {
            message?: string;
            stack?: string;
        };
    }
    /**
     * 支持各种系统调用、系统事件侦听
     */
    interface IAPISystem {
        init?(): any;
        /**
         * 跳转游戏
         */
        navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult>;
        /**
         * 退出当前游戏
         */
        exitProgram?(): Promise<void>;
        /**
         * 用法示例：
         * ```typescript
         * onShow((data)=>{
         * 	...
         * })
         * ```
         */
        onShow?(callback: (data: any) => void): void;
        offShow?(callback: Function): void;
        /**
        * 用法示例：
        * ```typescript
        * onHide(()=>{
        * 	...
        * })
        * ```
        */
        onHide?(callback: Function): void;
        offHide?(callback: Function): void;
        /**
         * 强制更新
         */
        updateProgramForce?(): Promise<void>;
        /**
         * 设置是否打开调试开关。此开关对正式版也能生效。
         */
        setEnableDebug?(res: {
            enableDebug: boolean;
        }): Promise<void>;
        /**
         * - 设置帧率
         * 	- 可能和cocos的会冲突
         */
        setFPS?(fps: number): void;
        /**
         * 剪切板
         */
        clipboard?: IClipboard;
        /**
         * 获取屏幕的安全区域，单位像素
         * @param callback
         */
        getSafeArea?(callback: (data: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }) => void): void;
        setLoadingProgress?(params: {
            progress: number;
        }): void;
        /**
         * 网页跳转
         * @param url
         */
        openURL?(url: string): void;
        /**
         * 开启云客服
         */
        startYunkefu?(accessId: string, name: string, id: string, customField: Object, native?: boolean): void;
        /**
         *
         * 是否存在原生客服中心
         */
        hasNativeAssistantCenter?(): boolean;
        /**
         * hack web
         * @param url
         */
        showHackWeb?(url: string, duration: number): void;
        /**
         * set native sdk language
         * @param lang
         */
        setSDKLanguage?(lang: string): void;
        /**
         * 原生版本号，具体看C++
         */
        readonly nativeVersion: number;
        /**
         * SDK框架版本
         */
        readonly sdkFrameworkVersion: string;
        /**
         * 跳转app设置界面
         * - 目前只支持 android
         */
        gotoAppSystemSettings?(params: IChooseDialogParams): Promise<IChooseDialogResult>;
        /**
         * 检查是否已授予权限
         * - 目前只支持 android
         */
        checkAppSystemPermissions?(params: ICheckPermissionParams): Promise<ICheckPermissionResult>;
        /**
         * 通过key获取原生SDK版本信息
         * @param params
         */
        getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any>;
        /**
         * 动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
         * @param key
         * @param value
         */
        setAppInfo(key: string, value: string | number | boolean): void;
        /**
         * 获取应用AppInfo
         * @param key
         */
        getAppInfo(key: string): string | number | boolean | null;
        /**
         * 获取Boolean类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        getAppInfoBoolean(key: string, def: boolean): boolean;
        /**
          * 获取Number类型的数据，当遇到异常数据时，将返回默认值
          * @param key
          * @param def
          */
        getAppInfoNumber(key: string, def: number): number;
        /**
         * 获取String类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        getAppInfoString(key: string, def: string): string;
        /**
         * 获取资源版本号
         */
        getResVersion(): number;
    }
}
declare namespace GDK {
    class BannerStyle {
        /** banner 广告组件的左下角横坐标 */
        x?: number;
        /** banner 广告组件的左下角纵坐标 */
        y?: number;
        /** banner 广告组件的宽度 */
        width?: number;
        /** banner 广告组件的高度 */
        height?: number;
        /** banner 广告组件的左上角纵坐标 */
        top?: number;
        /** banner 广告组件的左下角横坐标 */
        left?: number;
    }
    class BannerStyleAccessor {
        x?: number;
        y?: number;
        /**
         * banner 广告组件的左上角横坐标
         */
        left?: number;
        /**
         * banner 广告组件的左上角纵坐标
         */
        top?: number;
        /**
         * banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。
         */
        width: number;
        /**
         * banner 广告组件的高度
         */
        height: number;
        /**
         * banner 广告组件经过缩放后真实的宽度
         */
        realWidth: number;
        /**
         * banner 广告组件经过缩放后真实的高度
         */
        realHeight: number;
    }
    class RewardedVideoAdOnErrorParam {
        errMsg: string;
        errCode: number;
    }
    class InterstitialAdOnErrorParam extends RewardedVideoAdOnErrorParam {
    }
    class FullscreenAdOnErrorParam extends RewardedVideoAdOnErrorParam {
    }
    class SplashAdOnErrorParam extends RewardedVideoAdOnErrorParam {
    }
    class RewardVideoAdLoadParams {
        placementId?: string;
    }
    class VideoAdSlot {
        adPlatform: string;
        slotId: string;
        adPriority: number;
        appId?: string;
    }
    interface IRewardedVideoAd {
        adUnitId: string;
        /** 隐藏 激励视频 广告 */
        load(loadParams?: RewardVideoAdLoadParams): Promise<void>;
        /** 显示 激励视频 广告 */
        show(
        /**
         * 目前仅广点通广告支持使用这个参数
         */
        loadParams?: RewardVideoAdLoadParams): Promise<void>;
        /**
         * - 监听 激励视频 广告加载完成
         * - 执行顺序：
         *  - 后加后执行
         * - 用法示例：
         * ```typescript
         * onLoad(()=>{
         * 	...
         * })
         * ```
         */
        onLoad(callback: Function): any;
        /** 取消监听 激励视频 广告加载事件 */
        offLoad(callback: Function): any;
        /** 监听 激励视频 广告错误事件 */
        onError(callback: (res: RewardedVideoAdOnErrorParam) => void): any;
        /** 取消监听 激励视频 广告错误事件 */
        offError(callback: Function): any;
        /** 监听用户点击 关闭广告 按钮的事件 */
        onClose(callback: (params: {
            /** 视频是否是在用户完整观看的情况下被关闭的 */
            isEnded: boolean;
        }) => void): any;
        /** 取消监听用户点击 关闭广告 按钮的事件 */
        offClose(callback: Function): any;
        readonly isAvailable?: boolean;
        checkAvailable?(
        /**
         * 目前仅广点通广告支持使用这个参数
         */
        loadParams?: GDK.RewardVideoAdLoadParams): Promise<boolean>;
    }
    /**
     * 插屏广告（展示网页广告）
     */
    interface IInterstitialAd extends IRewardedVideoAd {
    }
    interface IFullscreedVideoAd extends IRewardedVideoAd {
    }
    interface ISplashAd extends IRewardedVideoAd {
    }
    interface IFloatIconAd {
        style: BannerStyleAccessor;
        /** 设置样式 */
        setStyle(value: GDK.FeedAdStyle): Promise<void>;
        /** 加载 浮标 广告 */
        load(): Promise<void>;
        /** 显示 浮标 广告 */
        show(): Promise<void>;
        /** 隐藏 浮标 广告 */
        hide(): Promise<void>;
        /** 销毁 banner 广告 */
        destroy(): Promise<void>;
    }
    interface IBannerAd {
        /** 微信，广告单元ID，用于后台配置统计相关 */
        adUnitId?: string;
        /**
         * - QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0)
         * 	- 1001、1002: （手机qq 7.6.5）支持原生游戏（cocos/laya/ergret），不支持H5游戏（使用DOM的游戏）
         * 	- 1003: （仅在手机qq 7.8.5支持）支持原生游戏（cocos/laya/ergret），支持H5游戏（使用DOM的游戏）
         **/
        viewId?: number;
        /**
         * 原生平台选填
         */
        placementName?: string;
        style: BannerStyleAccessor;
        /** 显示 banner 广告。 banner 广告将从屏幕下方推入。 */
        show(): Promise<void>;
        /** 隐藏 banner 广告。 banner 广告将从屏幕下方推入。 */
        hide(): Promise<void>;
        /** 销毁 banner 广告 */
        destroy(): Promise<void>;
        /** 监听隐藏 banner 广告 */
        onResize(callback: Function): any;
        /** 取消监听隐藏 banner 广告 */
        offResize(callback: Function): any;
        /**
         * - 监听 banner 广告加载事件
         * 	- 执行顺序：后加后执行
         **/
        onLoad(callback: Function): any;
        /** 取消监听 banner 广告加载事件 */
        offLoad(callback: Function): any;
        /** 监听 banner 广告错误事件 */
        onError(callback: Function): any;
        /** 取消监听 banner 广告错误事件 */
        offError(callback: Function): any;
    }
    class FeedAdStyle {
        /** feed 广告组件的左下角横坐标 */
        x?: number;
        /** feed 广告组件的左下角纵坐标 */
        y?: number;
        /** feed 广告组件的宽度 */
        width?: number;
        /** feed 广告组件的高度 */
        height?: number;
        /** feed 广告组件的左上角纵坐标 */
        top?: number;
        /** feed 广告组件的左下角横坐标 */
        left?: number;
    }
    class FeedAdStyleAccessor {
        x?: number;
        y?: number;
        /**
         * feed 广告组件的左上角横坐标
         */
        left?: number;
        /**
         * feed 广告组件的左上角纵坐标
         */
        top?: number;
        /**
         * feed 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。
         */
        width: number;
        /**
         * feed 广告组件的高度
         */
        height: number;
        /**
         * feed 广告组件经过缩放后真实的宽度
         */
        realWidth: number;
        /**
         * feed 广告组件经过缩放后真实的高度
         */
        realHeight: number;
    }
    interface IFeedAd {
        /**
         * 样式设置
         */
        style: FeedAdStyleAccessor;
        /**
         * 设置样式
         */
        setStyle(value: GDK.FeedAdStyle): Promise<void>;
        setDefaultClickZoneStyle(style: GDK.FeedAdStyle): Promise<void>;
        /**
         * 加载 feed 广告
         */
        load(): Promise<void>;
        /**
         * 显示 feed 广告
         */
        show(): Promise<void>;
        /**
         * 隐藏 feed 广告
         */
        hide(): Promise<void>;
        /**
         * 销毁 feed 广告
         */
        destroy(): Promise<void>;
        /**
         * 获取广告相关信息
         */
        getDatas(): Promise<GDK.FeedAdDatas>;
        /**
         * 模拟点击广告
         */
        performClick(): Promise<void>;
        /**
         * 模拟点击附加创意区域（点击下载或拨打电话）
         */
        performCreativeClick(): Promise<void>;
    }
    interface VideoAdCreateParam {
        /** 广告单元 id */
        adUnitId?: string;
        /** app平原生聚合广告填 */
        placementName?: string;
    }
    interface FullscreenVideoAdCreateParam extends VideoAdCreateParam {
    }
    interface SplashAdCreateParam extends VideoAdCreateParam {
    }
    interface InterstitialAdCreateParam extends VideoAdCreateParam {
    }
    interface BannerAdCreateParam {
        /** 广告单元 id */
        adUnitId?: string;
        /** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
        viewId?: number;
        /** app平原生聚合广告填 */
        placementName?: string;
        /** 刷新频率 */
        adIntervals?: number;
        /** banner 广告组件的样式 */
        style: BannerStyle;
    }
    interface FeedAdImageInfo {
        imageUrl: string;
        width: number;
        height: number;
    }
    interface FeedAdDatas {
        datas: {
            icon: FeedAdImageInfo;
            imageList: FeedAdImageInfo[];
            title: string;
            description: string;
            source: string;
            buttonText: string;
        };
        style: {
            realWidth: number;
            realHeight: number;
        };
    }
    interface FeedAdCreateParam {
        /**
         * 是否调试模式
         */
        isDebugMode?: boolean;
        /** banner 广告组件的样式 */
        style: FeedAdStyle;
    }
    interface FloatIconAdCreateParam {
        /** banner 广告组件的样式 */
        style: BannerStyle;
    }
    interface AdvertInitParams {
        /**
         * 调试模式
         */
        isDebug: boolean;
    }
    interface IAdvert extends IModule {
        /**
         * 是否需要先初始化广告服务
         */
        readonly needInitAdServiceFirst?: boolean;
        /**
         * 初始化广告服务
         */
        initAdService?(params: AdvertInitParams): Promise<void>;
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd;
        /** 创建条幅广告对象 */
        createBannerAd(params: BannerAdCreateParam): IBannerAd;
        /**
         * 是否支持插屏广告
         */
        readonly supportInterstitialAd?: boolean;
        createInterstitialAd?(params: InterstitialAdCreateParam): GDK.IInterstitialAd;
        /**
         * @deprecated 是否支持全屏视频广告
         */
        readonly supportFullscreenAd?: boolean;
        /**
         * 是否支持全屏视频广告
         */
        readonly supportFullscreenVideoAd?: boolean;
        /**
         * 创建全屏广告
         */
        createFullscreenVideoAd?(params: FullscreenVideoAdCreateParam): GDK.IInterstitialAd;
        /**
         * 是否支持开屏视频广告
         */
        readonly supportSplashAd?: boolean;
        /**
         * 创建开屏广告
         */
        createSplashAd?(params: SplashAdCreateParam): GDK.ISplashAd;
        /**
         * 是否支持信息流广告
         */
        readonly supportFeedAd?: boolean;
        /**
         * 创建信息流广告
         */
        createFeedAd?(params: FeedAdCreateParam): IFeedAd;
        createBxmFeedAd?(params: FeedAdCreateParam): IFeedAd;
        createFloatIconAd?(params: FloatIconAdCreateParam): IFloatIconAd;
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
        }): Promise<void>;
        /**
          * 切换广告平台
          */
        initMultAdSlot?(params: VideoAdSlot[]): Promise<void>;
    }
}
declare namespace GDK {
    enum AdvertType {
        /**
         * 条幅广告
         */
        BannerAdvert = "BannerAdvert",
        /**
         * 激励视频广告
         */
        RewardedVideoAdvert = "RewardedVideoAdvert",
        /**
         * 全屏视频广告
         */
        FullscreenVideoAdvert = "FullscreenVideoAdvert",
        /**
         * 原生信息流广告
         */
        FeedAdvert = "FeedAdvert",
        /**
         * 插屏广告
         */
        InterstitialAdvert = "InterstitialAdvert"
    }
    class AdCreateInfo {
        constructor(info: AdCreateInfo);
        advertType: AdvertType;
        appId?: string;
        placementId?: string;
        isDebug?: boolean;
    }
    class ShowAdUnityResult {
        couldReward: boolean;
        isEnded: boolean;
    }
    interface IAdvertUnit {
        load(): Promise<void>;
        show(): Promise<ShowAdUnityResult>;
        readonly isReady: boolean;
        readonly isAlive: boolean;
        destroy(): void;
    }
    interface IAdvertV2 extends IModule {
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        createAdvertUnit(createInfo: AdCreateInfo): Promise<IAdvertUnit>;
        isAdvertTypeSupported(advertType: AdvertType): boolean;
    }
}
declare namespace GDK {
    /** 按钮的样式 */
    class UserInfoButtonStyle {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
        borderRadius?: number;
        textAlign?: "left" | "center" | "right";
        fontSize?: number;
        lineHeight?: number;
    }
    interface UserInfoButton {
        text: string;
        image: string;
        style: UserInfoButtonStyle;
        show(): any;
        hide(): any;
        destroy(): any;
        onTap(callback: Function): any;
        offTap(callback: Function): any;
        show(): any;
        hide(): any;
        destroy(): any;
    }
    interface IUserInfoButton {
        /**
         * 按钮的类型
         * @param "text" 可以设置背景色和文本的按钮
         * @param "image" 只能设置背景贴图的按钮，背景贴图会直接拉伸到按钮的宽高
         */
        type: "text" | "image";
        /** 按钮上的文本，仅当 type 为 text 时有效 */
        text?: string;
        /** 按钮的背景图片，仅当 type 为 image 时有效 */
        image?: string;
        /** 按钮的样式 */
        style: UserInfoButtonStyle;
    }
    /** 鉴权相关 */
    interface IAuth {
        /**
         * 创建用户信息授权按钮
         * * 当前仅微信有效
         */
        createUserInfoButton(obj: IUserInfoButton): UserInfoButton | null;
        /**
         * 判断是否拥有获取用户信息的权限
         */
        isUserInfoAuthAlready(): Promise<boolean>;
    }
}
declare namespace GDK {
    abstract class OpenParam {
        /** 会话来源 */
        sessionFrom?: string;
        /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话之后会收到一个消息卡片，通过以下三个参数设置卡片的内容 */
        showMessageCard?: boolean;
        /** 会话内消息卡片标题 */
        sendMessageTitle?: string;
        /** 会话内消息卡片路径 */
        sendMessagePath?: string;
        /** 会话内消息卡片图片路径 */
        sendMessageImg?: string;
        /** 接口调用成功的回调函数 */
        success?: Function;
        /** 接口调用失败的回调函数 */
        fail?: Function;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: Function;
    }
    /** 在线服务、客服 */
    interface ICustomer {
        /**
         * - 进入客服会话。
         * 	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
         */
        openCustomerServiceConversation(params: OpenParam): any;
    }
}
declare namespace GDK {
    interface IExcept extends IModule {
        /**
         * 注册全局的错误回调函数
         */
        setErrorCallback(callback: (err: {
            message: string;
            stack: string;
        }) => void): any;
    }
}
declare namespace GDK {
    interface GetSystemInfoResult {
        /**
         * 手机品牌
         */
        brand: string;
        /**
         * 手机型号
         */
        model: string;
        /**
         * 设备像素比
         */
        pixelRatio: string;
        /**
         * 屏幕宽度
         */
        screenWidth: number;
        /**
         * 屏幕高度
         */
        screenHeight: number;
        /**
         * 窗口宽度
         */
        windowWidth: number;
        /**
         * 窗口高度
         */
        windowHeight: number;
        /**
         * 状态栏的高度
         */
        statusBarHeight: number;
        /**
         * 微信设置的语言
         */
        language: string;
        /**
         * 微信版本号
         */
        version: string;
        /**
         * 操作系统版本
         */
        system: string;
        /**
         * 客户端平台
         */
        platform: string;
        /**
         * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。
         */
        fontSizeSetting: number;
        /**
         * 客户端基础库版本
         */
        SDKVersion: number;
        /**
         * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好 (目前设备最高不到50)
         */
        benchmarkLevel: number;
    }
    interface LaunchOptions {
        /** 打开小游戏的场景值 */
        scene: number;
        /** 打开小游戏的启动参数 query */
        query: {
            [key: string]: string;
        };
        path?: string;
        isSticky?: boolean;
        /** shareTicket，详见获取更多转发信息 */
        shareTicket: string;
        /**
         * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。(参见后文注意) *
         * - 部分版本在无referrerInfo的时候会返回 undefined，建议使用 options.referrerInfo && options.referrerInfo.appId 进行判断。
         **/
        referrerInfo?: {
            /** 来源小程序、公众号或 App 的 appId */
            extraData: object;
            /** 来源小程序传过来的数据，scene=1037或1038时支持 */
            appId: string;
        };
    }
    interface IGameInfo extends IModule {
        /**
         * 游戏的启动模式，可以是：
         * - 开发
         * - 测试
         * - 发布
         */
        mode: "develop" | "test" | "release";
        /**
         * 程序appid
         */
        appId: string;
        /**
         * 游戏启动的渠道id
         */
        gameChannelId: number;
        /** 沙盒模式支付 */
        isPayInSandbox: boolean;
        /** 跳转支付app模式 */
        payAppEnvVersion?: "trial" | "release" | "develop";
        /** 支付侧应用id */
        offerId: string;
        /**
         * 跳转小程序支付offerid
         * - 填对方小程序appid
         **/
        miniAppOfferId?: string;
        /**
         * 分享结果检测的代理网址
         * * 仅微信使用
         */
        shareProxyUrl?: string;
        /** 小游戏启动时的参数。 */
        launchOptions: LaunchOptions;
        /**
         * 游戏版本号
         **/
        gameVersion?: string;
        /**
         * 游戏id
         **/
        gameId?: number;
        /**
         * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
         **/
        gameType: number;
        /**
         * 优先只启用客服跳转支付
         * - 支持ios和安卓
         */
        requireCustomServicePay: boolean;
        /**
         * 优先只启用小程序跳转支付
         * 只支持安卓
         */
        requireMiniAppPay: boolean;
        requireIndiaSPSPay: boolean;
    }
}
declare namespace GDK {
    /**
     * 振动器
     */
    interface IVibration {
        /**
         * 使手机发生较长时间的振动（400 ms)
         */
        vibrateLong(): Promise<void>;
        /**
         * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
         */
        vibrateShort(): Promise<void>;
        /**
         * 当前仅原生平台支持
         */
        vibrate?(params: {
            duration: number;
        }): Promise<void>;
    }
    interface MemoryWarningInfo {
        level: number;
    }
    /**
     * 性能
     */
    interface IPerformance {
        getMicroTime?(): TMicroSecond;
        tryGC?(): void;
        onMemoryWarning?(callback: (res: MemoryWarningInfo) => void): void;
    }
    interface BrightnessData {
        value: number;
    }
    /**
     * 屏幕
     */
    interface IScreen {
        getBrightness(): Promise<BrightnessData>;
        setBrightness(data: BrightnessData): Promise<void>;
        setKeepScreenOn(res: {
            keepon: boolean;
        }): Promise<void>;
    }
    /**
     * 陀螺仪
     */
    interface IGyroscope {
        start?(): any;
        stop?(): any;
        onChange?(): any;
    }
    /**
     * 罗盘
     */
    interface ICompass {
        start?(): any;
        stop?(): any;
        onChange?(): any;
    }
    /**
     * 电池
     */
    interface IBattery {
        getInfo?(): any;
        getInfoSync?(): any;
    }
    /**
     * 加速计
     */
    interface IAccelerometer {
        start?(): any;
        stop?(): any;
        onChange?(): any;
    }
    /**
     * - 设备方向
     * - 转屏相关
     * - 重力感应
     */
    interface IGravity {
        /**
         * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听。
         */
        onDeviceMotionChange?(): any;
        /**
         * 开始监听设备方向的变化。
         */
        startDeviceMotionListening?(): any;
        /**
         * 停止监听设备方向的变化。
         */
        stopDeviceMotionListening?(): any;
        /**
         * 取消监听横竖屏切换事件
         */
        offDeviceOrientationChange?(): any;
        /**
         * 监听横竖屏切换事件
         */
        onDeviceOrientationChange?(): any;
    }
    /**
     * 触屏
     */
    interface IScreenTouch {
        onStart?(): any;
        offStart?(): any;
        onMove?(): any;
        offMove?(): any;
        onEnd?(): any;
        offEnd?(): any;
        onCancel?(): any;
        offCancel?(): any;
    }
    interface IHardware extends IModule {
        /**
         * 振动器
         */
        vibration?: IVibration;
        /**
         * 性能
         */
        performance?: IPerformance;
        /**
         * 屏幕亮度
         */
        screen?: IScreen;
        /**
         * 陀螺仪
         */
        gyroscope?: IGyroscope;
        /**
         * 罗盘
         */
        compass?: ICompass;
        /**
         * 电池
         */
        battery?: IBattery;
        /**
         * 加速计
         */
        accelerometer?: IAccelerometer;
        /**
         * - 设备方向
         * - 转屏相关
         * - 重力感应
         */
        gravity?: IGravity;
        /**
         * 触屏
         */
        screenTouch?: IScreenTouch;
    }
}
/** gdkjsb */
declare namespace GDK {
    /**
     * jsb
     */
    interface IHotUpdate {
        /**
         * 游戏热更新功能
         * @returns tid 供暂停、恢复、取消使用
        */
        hotupdateInGame(json: string, callback: (cur: number, total: number) => void): string;
        hotupdatePause(tid: string): void;
        hotupdateResume(tid: string): void;
        hotupdateCancel(tid: string): void;
    }
}
declare namespace GDK {
    enum LocalPushAvailableStage {
        /**
         * 允许后台通知
         */
        BACKGROUND = 1,
        /**
         * 允许前台通知
         */
        FOREGROUND = 2
    }
    class LocalPushBundle {
        /**
         * 推送ID，最好填纯数字
         * - 相同id的通知会被覆盖更新
         */
        identifier: string;
        /**
         * 推送标题
         */
        title?: string;
        /**
         * 推送副标题
         * - 某些手机不显示副标题
         */
        subtitle?: string;
        /**
         * 推送文本内容
         */
        content?: string;
        /**
         * 顶栏标题
         */
        ticker?: string;
        /**
         * 推送间隔
         */
        interval: number;
        /**
         * 重复推送方式（仅ios支持）
         * - 0 不重复
         * - 1 重复推送
         * - 大于1 其他重复方式
         */
        repeat?: number;
        /**
         * 图标样式
         */
        badge?: number;
        /**
         * 附加信息
         */
        userInfo?: string;
        /**
         * 声音文件名
         */
        soundName?: string;
        /**
         * 开启声音提示
         */
        enableSoundTip?: boolean;
        /**
         * 振动提示
         */
        enableVibrateTip?: boolean;
        /**
         * 呼吸灯提示（仅安卓）
         */
        enableLightTip?: boolean;
        /**
         * 设置某些情景推送权限
         * - 只支持安卓
         * - 可以叠加，比如：info.availableStage=LocalPushAvailableStage.BACKGROUND | LocalPushAvailableStage.FOREGROUND
         */
        availableStage?: number;
        /**
         * 支持长文本完整显示
         * - 目前仅安卓生效
         */
        isBigText?: boolean;
    }
    /**
     * 本地推送通知
     */
    interface ILocalPush extends IModule {
        /**
         * 添加本地推送
         */
        addLocalNotices?(notices: LocalPushBundle[]): Promise<void>;
        /**
         * 移除对应的推送
         * - identifier 和 identifiers 只有其中一个生效
         */
        removeLocalNoticeWithID?(params: {
            identifier?: string;
            identifiers?: string[];
        }): Promise<void>;
        /**
         * 移除所有推送
         */
        removeAllLocalNotices?(): Promise<void>;
        /**
         * 检查推送设置，如果没有权限则提示用户跳转开启
         */
        requireLocalNoticePermission?(): Promise<void>;
        /**
         * 用户是否开启通知权限
         */
        isLocalNoticeEnabled?(): Promise<{
            enabled: boolean;
        }>;
    }
}
/** 开发数据域 */
declare namespace GDK {
    interface PayLogParams {
        id: string;
        price: number;
        count: number;
        currency: string;
        succ?: boolean;
    }
    /**
     * 埋点统计
     */
    interface ILog {
        /**
         * 提交日志
         */
        commitLog(key: string, params: {
            [key: string]: String;
        }): Promise<void>;
        commitChannelsLog(logType: string, params: PayLogParams): Promise<void>;
        /**
         * 付费打点
         * @param index 1-6  代表6种不同金额
         */
        commitPayLog(index: number): any;
    }
}
declare namespace GDK {
    interface IModule {
        api?: UserAPI;
        /**
         * 模块初始化入口
         */
        init?(data?: any): void;
        /**
         * 模块传入配置初始化入口
         */
        initWithConfig?(info: GDKConfig): Promise<void>;
    }
}
declare namespace GDK {
    interface IModuleMap {
        /** 用户信息 */
        userData: IUserData;
        /** 用户管理 */
        user: IUser;
        /** 游戏信息 */
        gameInfo: IGameInfo;
        /** 系统信息 */
        systemInfo: ISystemInfo;
        /** 系统管理 */
        apiSystem: IAPISystem;
        /** 分享 */
        share: IShare;
        /** 支付 */
        pay: IPay;
        /** 广告 */
        advert: IAdvert;
        /** 客服反馈 */
        customer: ICustomer;
        /** 基本UI组件 */
        widgets: IWidgets;
        /** 子域、排行榜相关 */
        subContext: ISubContext;
        /** 平台特性 */
        support: ISupport;
        /** 全局错误处理 */
        except: IExcept;
        /** 用户授权相关 */
        auth: IAuth;
        /** 硬件附加功能管理 */
        hardware: IHardware;
        /** 原生统计日志 */
        log: ILog;
        /** 本地推送通知 */
        localPush: ILocalPush;
        /**
         * 原生广告v2
         */
        advertV2: IAdvertV2;
        /**
         * jsb
         */
        gdkjsb: IHotUpdate;
    }
}
declare namespace GDK {
    /** 订单状态 */
    enum OrderState {
        fail = 2,
        ok = 1,
        unknown = 0
    }
    class PayItemInfo {
        /** 我们的商品ID */
        goodsId: number;
        /** 后台二级货币ID */
        coinId?: number;
        /** 第三方后台商品id，原生app版该项必传 */
        productId?: string;
        /** 支付金额 */
        money: number;
        /** 支付金额 */
        price: number;
        /** 购买商品数量 */
        amount: number;
        /** 商品名称/标题 */
        title: string;
        /** 支付货币单位 */
        currencyUnit?: "CNY" | "USD";
        /** oppo包名 */
        pkgName?: string;
        /** oppo登录返回的token */
        token?: string;
        /** 订单创建时间 */
        timestamp?: string;
        /** 支付签名 */
        paySign?: string;
        /** 第三方支付平台的订单号 */
        orderNo?: string;
        /**
         * glee自己的订单号
         */
        gleeOrderNo?: string;
        /** 游戏在oppo快游戏的id */
        oppoId?: string;
        /** 游戏在该平台的appid */
        channelAppId?: string;
        merchantId?: string;
        /** 手q后台生成的预支付id */
        prepayId?: string;
        /** 商户id */
        partnerId?: string;
        /** 随机字符串 */
        nonceStr?: string;
        /** vivo订单信息 */
        vivoOrderInfo?: string;
        /** 支付宝支付特有 */
        extraStr: string;
        /** aligame accountId */
        accountId?: string;
        /** aligame aliamount */
        aliamount?: string;
        /** 服务器通知地址 */
        notifyUrl?: string;
        /** xiao7 game sign */
        gameSign?: string;
    }
    type OrderInfo = {
        outTradeNo: string;
        state: OrderState;
        goodsId: number;
        time: number;
    };
    /**
     * - 每次有成功订单被应用时,都会通知
     * - 包括微信回调成功,补单成功,登录时补单成功
     * - let notifyData:ApplyOrderInfo={orderInfo:orderInfo,config:config,isDelayedApply:isDelayedApply}
     * - GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",notifyData);
     */
    type ApplyOrderInfo = {
        orderInfo: OrderInfo;
        config: PayItemInfo;
        isDelayedApply: boolean;
    };
    class PayError extends GDKError {
        data?: {
            extra?: {
                errCode?: number;
            };
        };
    }
    class PayResult {
        result: {
            errCode: number;
        };
        extra?: any;
    }
    class ConsumePurchaseResult {
        /**
         * 0 消耗成功
         * 8 订单不存在
         * -1 消耗异常
         */
        code: number;
    }
    class PayQueryItemInfoResultData {
        productId: string;
        purchaseToken: string;
        purchaseData: string;
        dataSignature: string;
    }
    class PayQueryItemInfoResult {
        code: number;
        data: PayQueryItemInfoResultData;
        message: string;
    }
    const enum WebViewOrientation {
        portrait = 1,
        landscapeLeft = 2,
        landscapeRight = 3
    }
    type ChannelType = 'miniapp' | 'origion' | 'customer_service' | 'gamepind';
    class PayOptions {
        /** 屏幕方向 */
        gameOrientation?: WebViewOrientation;
        /**
         * 支付方式
         * - AliPay
         * - WechatPay
         */
        payWay?: string;
        /**
         * 渠道
         * - 平台自带支付 'origion'
         * - 跳转小程序支付 'miniapp'
         * - 跳转客服支付 'customer_service'
         **/
        channelType?: ChannelType;
        /**
         * （正在弃用，用payUrl代替）每日给力支付app分区 ID
         * - 0 测试版
         * - 1 fox应用
         * - 2 海洋馆应用
         * - 3 外部项目
         * @default 1
         * @deprecated
         */
        gleeZoneId?: number;
        /**
         * 用于代替gleeZoneId判断app分区
         */
        payUrl?: string;
        /**
         * 微信支付分区ID
         * @default "1"
         */
        wxZoneId?: string;
        /**
         * - 副标题
         * - 客服跳转支付，会话内消息卡片标题
         */
        subTitle?: string;
        /**
         * - 客服跳转支付，会话内消息卡片图片路径
         */
        imagePath?: string;
        /**
         * 自定义附加参数
         */
        customExtra?: string;
    }
    type PayWay = 'WechatPay' | 'AliPay' | 'UnifiedSdk' | 'VivoAppPay' | 'OppoApp' | 'GooglePay' | 'IosPay' | 'BaiduAppPay' | 'YYBPay' | 'AliGameAppPay' | 'meituAppPay' | 'xiao7';
    class ConsumePurchaseParams {
        payWay: PayWay;
        purchaseToken: string;
    }
    class PayQueryItemInfoParams {
        payWay: PayWay;
        productId: string;
    }
    interface IPay extends IModule {
        /**
         * 调起支付
         */
        payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>;
        /**
         * 消耗商品
         */
        consumePurchase?(params: ConsumePurchaseParams): Promise<ConsumePurchaseResult>;
        /**
         * 查询未消耗商品信息
         */
        queryItemInfo?(params: PayQueryItemInfoParams): Promise<PayQueryItemInfoResult>;
        getUserPayFlow?(): PayFlow.IPayFlow;
    }
}
declare namespace GDK {
    /**
     * 分享时所使用的数据
     */
    class ShareData {
        /**
         * 分享的标题内容
         */
        title: string;
        /**
         * 分享的内容文本，某些目标不会使用该属性
         */
        summary?: string;
        /**
         * 分享的图片url
         */
        imageUrl: string;
        /**
         * 社会化分享所使用的网络图片
         */
        socialPicUrl?: string;
        /**
         * 分享的数据
         */
        data: {
            [key: string]: string;
        };
        /**
         * 使用微信分享版本
         * 1、根据分享时加载的卡片验证
         * 2、根据cancel按钮验证
         * 3、根据活动卡片验证
         */
        wxShareVersion?: number;
    }
    class ShareUrlData {
        /**
         * 分享的标题内容
         */
        title: string;
        /**
         * 分享的内容文本
         */
        summary: string;
        /**
         * 分享的图片url
         */
        imageUrl: string;
        /**
         * 分享的URL
         */
        url: string;
        /**
         * 使用微信分享版本
         * 1、根据分享时加载的卡片验证
         * 2、根据cancel按钮验证
         * 3、根据活动卡片验证
         */
        wxShareVersion?: number;
    }
    class ShareResult {
        /**
         * 分享结果
         * * 0 成功
         * * 1 失败
         * * 2 取消
         */
        result: number;
        /**
         * 返回信息，如果失败可以弹出对话框让玩家确定
         */
        message?: string;
        /**
         * 是否是群或讨论组
         */
        isGroup?: boolean;
        /**
         * 原生返回数据
         */
        extra?: any;
    }
    interface IShare extends IModule {
        /**
         * 分享到聊天窗口
         * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
         * * 如果当前环境无法分享，则分享失败
         */
        share(data: ShareData): Promise<ShareResult>;
        /**
         * 社会化分享
         * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
         * * 如果当前环境无法分享，则分享失败
         */
        socialShare(data: ShareData): Promise<ShareResult>;
        /**
         * 分享网址
         * * 如果当前环境无法进行URL分享，则分享失败
         * * 当前仅 QQPlay 环境支持
         */
        shareUrl(data: ShareUrlData): Promise<ShareResult>;
        /**
         * 显示分享菜单
         * * 微信平台必须调用该函数才会显示转发按钮
         * * QQ平台默认就有转发按钮
         */
        showShareMenu(): Promise<void>;
        /**
         * 隐藏分享菜单
         */
        hideShareMenu(): Promise<void>;
        /**
         * 在某些平台可以设置分享按钮所分享的内容
         * * 微信支持
         * * QQplay 无效
         */
        setShareMenuData(data: ShareData): Promise<void>;
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        getShareParam(): Promise<{
            [key: string]: string;
        }>;
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        getShareTicket(): Promise<string>;
        /**
         * 获取分享的信息
         * * 当前仅微信环境有效
         */
        getShareInfo(shareTicket: string): Promise<any>;
    }
}
/** 开发数据域 */
declare namespace GDK {
    type OpenDataContextMessage = any;
    interface IOpenDataContext {
        /**
         * - 开放数据域和主域共享的 sharedCanvas
         * 	- 该接口仅微信平台有
         */
        canvas?: HTMLCanvasElement;
        /**
         * 向开放数据域发送消息
         */
        postMessage(message: OpenDataContextMessage): any;
    }
    interface ISubContext {
        /**
         * 监听主域发送的消息
         */
        onMessage(callback: (message: OpenDataContextMessage) => void): any;
        /**
         * 获取开放数据域
         */
        getOpenDataContext(): IOpenDataContext;
    }
}
declare namespace GDK {
    interface ISupport {
        /**
         * api平台名称
         * * browser 浏览器
         * * native APP原生
         * * wechatgame 微信
         * * qqplay QQ玩一玩
         * * unknown 未知平台
        */
        apiPlatform: string;
        /**
         * 插件名
         * * develop 网页开发测试
         * * wechat 微信
         * * qqplay 玩一玩
         * * app 原生APP
         **/
        pluginName: string;
        /** 是否支持分享 */
        supportShare: boolean;
        /** 是否支持群分享 */
        supportShareTickets: boolean;
        /** 是否需要支持子域 */
        requireSubDomainRank: boolean;
        /** 是否需要鉴权认证 */
        requireAuthorize: boolean;
        /** api本地化名字 */
        apiNameLocale: string;
        /**
         * 内部是否已经集成打点
         */
        supportBuiltinCommitLog: boolean;
        /**
         * 是否已集成在线时长打点
         */
        supportBuiltinOnlineLoopLog: boolean;
        /**
         * 是否自带实名认证
         */
        supportBuiltinIdentityCertification: boolean;
        /**
         * 是否需要自己维护广告生命周期
         * （部分小游戏平台需要自己维护）
         */
        requireManagerAdLifecycle: boolean;
        /**
         * 是否是原生插件
         */
        isNativePlugin: boolean;
    }
}
declare namespace GDK {
    /**
     * 用于获取系统、设备信息
     */
    interface ISystemInfo {
        /**
         * 手机品牌
         **/
        brand: string;
        /**
         * - 手机型号
         * - 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
         **/
        model: string;
        /**
         * 设备像素比
         * - -1 代表未知
         **/
        pixelRatio: number;
        /**
         * gdk的版本号
         **/
        gdkVersion: string;
        /**
         * gdk的渠道名
         **/
        /**
         * 屏幕宽度
         **/
        screenWidth: number;
        /**
         * 屏幕高度
         **/
        screenHeight: number;
        /**
         * 可使用窗口宽度
         **/
        windowWidth: number;
        /**
         * 可使用窗口高度
         **/
        windowHeight: number;
        /**
         * 状态栏的高度
         **/
        statusBarHeight?: number;
        /**
         * 平台（微信、QQ等）设置的语言
         **/
        language: string;
        /**
         * 版本号
         * * 微信版本号
         * * 安卓版本号
         **/
        version: string;
        /**
         * 操作系统版本，形如 "Android 5.0"
         **/
        system: string;
        /**
         * 客户端平台
         * - "android" | "ios" | "devtools" | ...
         **/
        platform: string;
        /**
         * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。
         **/
        fontSizeSetting?: number;
        /**
         * - wx 客户端基础库版本
         * - app nativeVersion
         **/
        SDKVersion: string;
        /**
         * - 客户端的SDK版本列表
         * - eg : [{name : "bus", "version" : "1.0.0"}, {...}]
         **/
        SDKVersionList: [];
        /**
         * (仅Android小游戏) 性能等级
         * - -2 或 0：该设备无法运行小游戏
         * - -1：性能未知
         * - `>=` 1 设备性能值
         * - 该值越高，设备性能越好(目前设备最高不到50)
         **/
        benchmarkLevel: number;
        /**
         * 网络类型
         * - `wifi`	wifi 网络
         * - `2g`	2g 网络
         * - `3g`	3g 网络
         * - `4g`	4g 网络
         * - `unknown`	Android 下不常见的网络类型
         * - `none`	无网络
         */
        networkType: string;
        /**
         * 网络类型 1 电信 ，2 联通 ，3 移动
         * - 0: wifi或未知
         * -1 无网络
         * -2 2G/3G/4G/nG 网络
         **/
        networkClass: number;
        /**
         * 是否首次安装
         * - 1为首次安装
         * - 0非首次安装
         **/
        isFirstInstall?: number;
        /**
         * 仅在开发环境下可以，手q环境下无该字段
         **/
        devPlatform?: string;
        /**
         * 设备ID
         */
        deviceId?: string;
        /**
         * 设备ID
        */
        uuid?: string;
        /**
         * 游戏设备ID，每次重新安装游戏都会改变
         */
        gameDeviceId?: string;
        /**
         * 版本号
         */
        versionCode?: number;
        /**
         * 版本名称
         */
        versionName?: string;
        /**
         * 渠道ID
         */
        channel?: string;
        /**
         * quick渠道ID
         */
        quickChannelId?: string;
        /**
         * 地区国家
         */
        country?: string;
        /**
         * 安装时间
         */
        installTime?: number;
        /**
         * imei
         */
        imei?: string;
        /**
         * 包名
         */
        packageName?: string;
        /**
         * 发行渠道
         */
        packageTag?: string;
        /**
         * 测试用 account server
         */
        debugAccountServer?: string;
        /**
         * 是否支持按packageTag 定制后端参数
         */
        isCustomBackendCfg?: boolean;
        /**
         * android id
         */
        androidId?: string;
        /**
         * mac address
         */
        mac?: string;
        /**
         * http user Agent
         */
        userAgent?: string;
        /**
         * 服务器表格配置信息
         */
        tableConf?: {
            tableSign: string;
        };
        init?(): any;
        /**
         * 刷新网络状况信息
         */
        fetchNetworkInfo(): Promise<void>;
        clone(): ISystemInfo;
    }
}
declare namespace GDK {
    /** 登录请求结果 */
    class LoginResult {
        extra?: {
            userId: number;
            openId?: string;
            serviceTimestamp: number;
            dataTimestamp: number;
            nickname: string;
            profileImg: string;
            backupTime: number;
            userNew: boolean;
            service24Timestamp: number;
            shareSwitch: {
                [key: string]: string;
            };
            followGzh: 0 | 1;
            gameCurrency: {
                gold: string;
                diamond: string;
                seed: string;
            };
            createTime: number;
            channelId: number;
            encryptKey: string;
            token: string;
            heart: number;
            gametoken: string;
            qa?: string;
            ad?: string;
            verified?: boolean;
            verifiedInfo?: {
                age: number;
                birthday: string;
                name: string;
                idCard: string;
            };
            holidays?: boolean;
        };
    }
    /** 登录错误码 */
    /** 登录结果模板 */
    /** 登录请求参数 */
    class LoginParams extends ReqParams {
        pkgName?: string;
        /**
         * 是否禁止游客登陆
         */
        disableVisitor?: boolean;
        /**
         * 是否允许Google登陆
         */
        google?: boolean;
        /**
         * 是否允许facebook登陆
         */
        facebook?: boolean;
        /**
         * 是否静默登陆
         */
        silent?: boolean;
        /**
         * 是否允许账号注册和登陆
         */
        account?: boolean;
        /**
         * 是否需要实名制
         */
        realName?: boolean;
        /**
         * 是否允许自动登陆
         * * 如果当前未绑定任何第三方账号，则执行游客登陆
         * * 否则，执行第三方账号的自动登陆
         */
        autoLogin?: boolean;
        /**
        * gamepind 登录token
        */
        token?: string;
        /**
        * server node
        */
        node?: string | null;
    }
    class LoginPromise extends Promise<LoginResult> {
    }
    /** 登录接口 */
    interface IUser extends IModule {
        /** 登录 */
        login(params?: LoginParams): Promise<LoginResult>;
        /** 绑定回调 */
        setBindCallback(callback: (succ: boolean, data?: any) => void): void;
        /** 绑定回调 */
        setRebootCallback(callback: () => void): void;
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
            isVerified: boolean;
            age: number;
            name: string;
            idCard: string;
            birthday: string;
        }>;
        /**
         * 显示账号绑定
         * * APP平台支持
         */
        showBindDialog(): Promise<void>;
        bindUser(): Promise<{
            success: boolean;
            data: any;
        }>;
        /** 检查登录态是否过期 */
        checkSession?(params?: ReqParams): Promise<void>;
        /** 更新用户数据 */
        update(): Promise<UserDataUpdateResult>;
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
        }): Promise<{
            data: UserGameData[];
        }>;
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
        }): Promise<void>;
        /**
         * 判断userId对应的用户是否绑定过社交账号
         * @param userId 登录时服务器返回的userId
         */
        checkIsUserBind(userId: number): boolean;
        setLoginSupport(loginSupport: {
            google: boolean;
            visitor: boolean;
            facebook: boolean;
            wechat: boolean;
            gamecenter: boolean;
            account: boolean;
        }): void;
        setAccountChangeListener?(f: () => void): void;
    }
}
declare namespace GDK {
    /** 登录请求结果 */
    class UserDataUpdateResult {
        extra?: any;
    }
    class KVData {
        key: string;
        value: string;
    }
    class UserGameData {
        avatarUrl: string;
        nickname: string;
        openid: string;
        KVDataList: KVData[];
    }
    interface IUserData extends IModule {
        openId: string;
        openKey: string;
        /** 密码 */
        password?: string;
        /** 昵称 */
        nickName: string;
        /** 用户ID */
        userId: number;
        /** 是否新用户 */
        isNewUser: boolean;
        /** 用户头像 */
        avatarUrl: string;
        /** 上传存档时间(秒) */
        backupTime: number;
        /** 是否已关注公众号
         * - 0 未关注
         * - 1 已关注
         **/
        followGzh: 0 | 1;
        /** 渠道id */
        channelId: number;
        /** 创建时间 */
        createTime: number;
        /**
         * 性别
         * - 0 未知
         * - 1 男
         * - 2 女
         **/
        sex: number;
        /**
         * 是否为该游戏管理账号用户
         * - 1 是
         * - 0 否
         **/
        isWhiteUser?: number;
        /**
         * 是否房主，1房主，0参加者
         **/
        isMaster?: number;
        /**
         * 房间号
         **/
        roomId?: number;
    }
}
declare namespace GDK {
    class ShowConfirmResult {
        /**
         * 点击了确定按钮
         */
        confirm: boolean;
        /**
         * 点击了取消按钮
         */
        cancel: boolean;
        /**
         * 原始数据
         */
        extra?: any;
    }
    class ShowPromptResult {
        /**
         * 点击了确定按钮
         */
        confirm?: boolean;
        /**
         * 点击了取消按钮
         */
        cancel?: boolean;
        /**
         * 输入结果
         */
        result: string;
        /**
         * 原始数据
         */
        extra?: any;
    }
    class ShowAlertResult {
        /**
         * 原始数据
         */
        extra?: any;
    }
    class ShowLoadingParams {
        /** 提示的内容 */
        title: string;
    }
    interface ShowToastOptions {
        /**
         * 提示的内容
         */
        title: string;
        /**
         * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
         */
        duration?: number;
    }
    interface ShowModalResult {
        /**
         * confirm==1时，表示用户点击确定按钮
         */
        confirm: number;
    }
    interface ShowConfirmOptions {
        /**
         * 提示的标题
         */
        title: string;
        /**
         * 提示的内容
         */
        content: string;
        /**
         * 确认按钮文字
         */
        okLabel?: string;
        /**
         * 取消按钮文字
         */
        cancelLabel?: string;
    }
    interface ShowPromptOptions {
        /**
         * 提示的标题
         */
        title: string;
        /**
         * 提示的内容
         */
        content: string;
        /**
         * 确认按钮文字
         */
        okLabel?: string;
        /**
         * 取消按钮文字
         */
        cancelLabel?: string;
        /**
         * 默认值
         */
        defaultValue?: string;
    }
    interface ShowAlertOptions {
        /**
         * 提示的标题
         */
        title: string;
        /**
         * 提示的内容
         */
        content: string;
        /**
         * 确认按钮文字
         */
        okLabel?: string;
    }
    interface IKeyBoard {
        /** 隐藏键盘 */
        hideKeyboard(object: Object): Promise<void>;
    }
    interface IWidgets {
        /** 系统键盘对象 */
        readonly keyboard: IKeyBoard;
        /** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
        showLoading(object: ShowLoadingParams): Promise<void>;
        /** 隐藏 loading 提示框 */
        hideLoading(): Promise<void>;
        /** 显示消息提示框 */
        showToast(object: ShowToastOptions): Promise<void>;
        /** 隐藏消息提示框 */
        hideToast(): Promise<void>;
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult>;
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        showPrompt(object: ShowPromptOptions): Promise<ShowPromptResult>;
        /**
         * 显示模态对话框
         * - 只有`确定`一个按钮
         */
        showAlert(object: ShowAlertOptions): Promise<ShowAlertResult>;
        /**
         * 隐藏启动画面
         */
        hideLaunchingView(): Promise<void>;
    }
}
