declare namespace GDK {
    class PackConfig {
        platform: string;
        register: new () => RegisterListTemp;
    }
}
declare namespace GDK {
    class RegisterListTemp {
        static init(temp: new () => RegisterListTemp): UserAPI;
        Login: new () => ILogin;
    }
}
declare namespace GDK {
    class UserAPI {
        private _login;
        login(params: LoginParams): MyPromise<LoginResult, LoginError>;
        support(): void;
        platform: string | "oppo" | "qqplay";
        settings: ISystemSettings;
        userdata: IUserData;
    }
    const api: UserAPI;
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
    /** 基本请求错误码 */
    const ReqErrorCode: {
        /** 请求成功 */
        SUCCESS: number;
        /** 未知错误 */
        UNKNOWN: number;
        /** 请求超时 */
        TIMEOUT: number;
    };
    /** 请求错误扩展参数 */
    class ExtraReqError {
        errcode?: number;
        msg?: string;
        reason?: string;
        data?: any;
    }
    /** 请求错误结果 */
    class ReqError extends ExtraReqError {
        errcode: number;
        msg: string;
        reason: string;
        data?: any;
    }
    /** 请求结果 */
    class ReqResult extends ReqError {
    }
    /** 请求结果模板生成器 */
    class ResultTemplatesExtractor<T extends ReqError> {
        protected _temps: T[];
        readonly temps: T[];
        constructor(temps: T[]);
        /**
         * 根据错误码和扩展参数构造请求结果
         */
        make<F extends ExtraReqError>(errcode: number, extra?: F): T;
    }
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
    const ReqResultTemplates: ResultTemplatesExtractor<ReqError>;
    /**
     * 增强类型限定的Promise
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    class MyPromise<T, F> extends Promise<T> {
        constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: F) => void) => void);
    }
    /**
     * 反转 MyPromise
     * - 外部调用 success时相当于调用了 resolve
     * - 外部调用 fail 时，相当于调用了 reject
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    class YmPromise<T, F> {
        success: Function;
        fail: Function;
        promise: MyPromise<T, F>;
        constructor(params?: any);
        protected init(params?: any): void;
    }
    class RPromise<T, F> extends YmPromise<T, F> {
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
    interface IAd {
    }
}
declare namespace GDK {
    class LoginError extends ReqError {
    }
    /** 登录请求结果 */
    class LoginResult extends ReqError {
        data?: {
            openid: string;
            sessionKey: string;
        };
    }
    /** 登录错误码 */
    const LoginErrorCode: {
        INVALID_OPENID: number;
        SUCCESS: number;
        UNKNOWN: number;
        TIMEOUT: number;
    };
    /** 登录结果模板 */
    const LoginResultTemplates: ResultTemplatesExtractor<ReqError>;
    /** 登录请求参数 */
    class LoginParams extends ReqParams {
    }
    class LoginPromise extends MyPromise<LoginResult, LoginError> {
    }
    /** 登录接口 */
    interface ILogin {
        api?: GDK.UserAPI;
        init?(): any;
        login(params?: LoginParams): MyPromise<LoginResult, LoginError>;
        checkSession?(params?: ReqParams): any;
    }
}
declare namespace GDK {
    enum OrderState {
        fail = 2,
        ok = 1,
        unknown = 0
    }
    class RechargeConfig {
        id?: number;
        money?: number;
        amount?: number;
        title?: string;
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
        config: RechargeConfig;
        isDelayedApply: boolean;
    };
    interface IPay {
        /**
         * 支付
         * @param config 配置信息
         * @param success 支付成功回调
         * @param fail 支付失败回调
         */
        pay(config: RechargeConfig, success: Function, fail?: Function): any;
        /**
         * 检查充值是否已经购买过一次
         * @param config 配置信息
         * @returns
         */
        isBoughtOnce(config: RechargeConfig): boolean;
        /**
         * 校验补发订单
         * @returns
         */
        pullDiffOrders(successCallback: Function, failCallback: Function): any;
    }
}
declare namespace GDK {
    interface ISystemSettings {
        system: number;
        channelId: number;
        clientSystemInfo: any;
        launchOptionsPath: any;
        launchOptionsQuery: any;
        init?(): any;
    }
}
declare namespace GDK {
    interface IShare {
    }
}
declare namespace GDK {
    interface IUserData {
        openId: string;
        openKey: string;
        password?: string;
        nickName: string;
        userId: number;
        isNewUser: boolean;
        avatarUrl: string;
    }
}
