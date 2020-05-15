namespace GDK {

	export class GDKConfigBase {
		/**
         * 游戏的启动模式。
         * 可以是 开发、测试、发布
		 */
		mode: "develop" | "test" | "release" = "develop"

		/**
		 * APPID
		 */
		appId: string = ""

		/**
		 * 游戏版本号
		 **/
		gameVersion?: string

		/**
		 * 服务器对象
		 */
		httpClient!: slib.HttpGameClient

		/**
		 * 优先只启用客服跳转支付
		 * - 支持ios和安卓
		 */
		requireCustomServicePay: boolean = false

		/**
		 * 优先只启用小程序跳转支付
		 * 只支持安卓
		 */
		requireMiniAppPay: boolean = false

		requireIndiaSPSPay: boolean = false

		/**
		 * 获取当前服务器时间
		 */
		getServerTime!: () => Date;
	}

	export class GDKDevelopConfig extends GDKConfigBase {

	}

	export class GDKWechatConfig extends GDKConfigBase {

        /**
         * 支付id
         */
		offerId: string = "";

		/**
         * 支付时，是否使用安全沙箱
         */
		isPayInSandbox: boolean = true;

		/** 跳转支付app模式 */
		payAppEnvVersion: "trial" | "release" | "develop"

		/**
		 * 安卓分享时，所使用的代理网址
		 */
		shareProxyUrl: string = "";
		userId?: number = 0

        /**
         * 跳转支付appid
         */
		miniAppOfferId?: string = ""

	}

	export class GDKBytedanceConfig extends GDKWechatConfig {

	}

	export class GDKQQMINIAPPConfig extends GDKConfigBase {

        /**
         * 支付id
         */
		offerId: string = "";

		/**
         * 支付时，是否使用安全沙箱
         */
		isPayInSandbox: boolean = true;

		/** 跳转支付app模式 */
		payAppEnvVersion: "trial" | "release" | "develop"

		/**
		 * 安卓分享时，所使用的代理网址
		 */
		shareProxyUrl: string = "";
		userId?: number = 0

        /**
         * 跳转支付appid
         */
		miniAppOfferId?: string = ""

	}

	export class GDKQQPlayConfig extends GDKConfigBase {
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number

	}

	export class GDKOPPOConfig extends GDKConfigBase {
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number
	}

	export class GDKVIVOConfig extends GDKConfigBase {
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number
	}

	export type AdvertsAllPlatforms = "ironsource" | "adtiming" | "gdtadvert"
	export class GDKAPPConfig extends GDKConfigBase {
		/**
		 * 广告平台
		 * - ironsource
		 * - adtiming
		 * - gdtadvert 腾讯广点通
		 */
		advertPlatform?: AdvertsAllPlatforms = "ironsource"
		advertPlatforms?: AdvertsAllPlatforms[] = []
	}

	export class GDKGamepindConfig extends GDKConfigBase {

	}

	export class GDKWebConfig extends GDKConfigBase {

	}
	export class GDKWEBVIEWConfig extends GDKConfigBase {
		/**
		 * 广告平台
		 * - ironsource
		 * - adtiming
		 * - gdtadvert 腾讯广点通
		 */
		advertPlatform?: AdvertsAllPlatforms = "ironsource"
		advertPlatforms?: AdvertsAllPlatforms[] = []
	}

	export class GDKConfig {

		develop?: GDKDevelopConfig
		baidu?: GDKWechatConfig
		wechat?: GDKWechatConfig

		bytedance?: GDKBytedanceConfig

		qqplay?: GDKQQPlayConfig

		oppo?: GDKOPPOConfig
		app?: GDKAPPConfig
		unityapp?: GDKAPPConfig
		qqminiapp?: GDKQQMINIAPPConfig
		vivo?: GDKVIVOConfig
		gamepind?: GDKGamepindConfig
		web?: GDKWebConfig
		webview?: GDKWEBVIEWConfig
	}


}