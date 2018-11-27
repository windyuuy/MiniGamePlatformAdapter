declare namespace GDK {
    /** 请求错误扩展参数 */
    class GDKErrorExtra {
        errcode?: number;
        message?: string;
        reason?: string;
        data?: any;
    }
    /** 请求错误结果 */
    class GDKError extends Error {
        errcode: number;
        reason: string;
        data?: any;
        constructor();
        toString(): string;
    }
    /** 请求结果模板生成器 */
    class ResultTemplatesExtractor {
        protected _temps: GDKErrorExtra[];
        readonly temps: GDKErrorExtra[];
        constructor(temps: GDKErrorExtra[]);
        /**
         * 根据错误码和扩展参数构造请求结果
         */
        make<F extends GDKErrorExtra>(errcode: number, extra?: F): GDKError;
    }
}
declare namespace GDK {
    /** 基本请求错误码 */
    const GDKErrorCode: {
        /** Normal Error */
        /** 请求成功 */
        SUCCESS: number;
        /** 未知错误 */
        UNKNOWN: number;
        /** 请求超时 */
        TIMEOUT: number;
        /** 网络错误 */
        NETWORK_ERROR: number;
        /** GameHttpClient Error */
        /** 无效的OPENID */
        INVALID_OPENID: number;
        /** API Error */
        /** API 登录失败 */
        API_LOGIN_FAILED: number;
    };
    /**
     * 请求结果模板，用于生成错误结果
     **/
    const GDKResultTemplates: ResultTemplatesExtractor;
}
declare namespace GDK {
    class ModuleClassMap {
        Adver: new () => IAdver;
        GameInfo: new () => IGameInfo;
        Login: new () => ILogin;
        Pay: new () => IPay;
        Share: new () => IShare;
        SystemInfo: new () => ISystemInfo;
        User: new () => IUserData;
    }
}
declare namespace GDK {
    class PackConfig {
        platform: string;
        register: new () => ModuleClassMap;
    }
}
declare namespace GDK {
    class UserAPI {
        private _m;
        constructor(moduleMap: IModuleMap);
        login(params: LoginParams): Promise<LoginResult>;
        support(): void;
        /** 当前实际平台 */
        platform: string | "oppo" | "qqplay";
        settings: ISystemInfo;
        userdata: IUserData;
        gameInfo: IGameInfo;
        systemInfo: ISystemInfo;
        share: IShare;
        pay: IPay;
        adver: IAdver;
    }
    function genGdk(temp: ModuleClassMap): UserAPI;
}
declare namespace GDK {
    abstract class APIServer {
    }
}
declare namespace GDK {
    /** 毫秒 */
    type TMilliSeconds = number;
    /** 秒 */
    type TSeconds = number;
    /**
     * 请求结果模板，用于生成请求结果
     * 用法示例：
     * - ```typescript
    export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
        ...ReqResultTemplates.temps,
        { errcode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
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
        success: Function;
        fail: Function;
        promise: Promise<T>;
        constructor(params?: any);
        protected init(params?: any): void;
    }
    class RPromise<T, F = any> extends YmPromise<T, F> {
        success: (value: T) => void;
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
    interface IAdver {
    }
}
declare namespace GDK {
    interface IGameInfo {
        init?(): any;
    }
}
declare namespace GDK {
    /** 登录请求结果 */
    class LoginResult {
        data?: {
            openid: string;
            sessionKey: string;
        };
    }
    /** 登录错误码 */
    /** 登录结果模板 */
    /** 登录请求参数 */
    class LoginParams extends ReqParams {
    }
    class LoginPromise extends Promise<LoginResult> {
    }
    /** 登录接口 */
    interface ILogin extends IModule {
        login(params?: LoginParams): Promise<LoginResult>;
        checkSession?(params?: LoginParams): any;
    }
}
declare namespace GDK {
    interface IModule {
        api?: GDK.UserAPI;
        init?(): any;
    }
}
declare namespace GDK {
    interface IModuleMap {
        login: ILogin;
        pay: IPay;
        share: IShare;
        ad: IAdver;
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
        /** 商品ID */
        id?: number;
        /** 支付金额 */
        money?: number;
        /** 购买商品数量 */
        amount?: number;
        /** 商品名称/标题 */
        title?: string;
        /** 支付货币单位 */
        currencyUnit: "CNY" | "Dollor";
    }
    type OrderInfo = {
        outTradeNo: string;
        state: OrderState;
        goodsId: number;
        time: number;
    };
    /**
     * //每次有成功订单被应用时,都会通知
     * // 包括微信回调成功,补单成功,登录时补单成功
     * let notifyData:ApplyOrderInfo={orderInfo:orderInfo,config:config,isDelayedApply:isDelayedApply}
     * GlobalEmit.instance.messsgeEmit.emit("onApplyOrder",notifyData);
     */
    type ApplyOrderInfo = {
        orderInfo: OrderInfo;
        config: PayItemInfo;
        isDelayedApply: boolean;
    };
    interface IPay extends IModule {
    }
}
declare namespace GDK {
    interface IShare {
    }
}
declare namespace GDK {
    interface ISystemInfo {
        system: "android" | "ios" | "devtools";
        channelId: number;
        clientSystemInfo: any;
        launchOptionsPath: any;
        launchOptionsQuery: any;
        /** 沙盒模式支付 */
        isPayInSandbox: boolean;
        /** 支付侧应用id */
        offerId: string;
        init?(): any;
    }
}
declare namespace GDK {
    interface IUserData {
        openId: string;
        openKey: string;
        password?: string;
        nickName: string;
        userId: number;
        /** 是否新用户 */
        isNewUser: boolean;
        avatarUrl: string;
        /** 上传存档时间(秒) */
        backupTime: number;
        /** 0 未关注,1 已关注 */
        followGzh: number;
        token: string;
        gameToken: string;
        /** 渠道id */
        channelId: number;
        /** 创建时间 */
        createTime: string;
    }
}
