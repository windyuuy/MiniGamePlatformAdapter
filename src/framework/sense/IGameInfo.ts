namespace GDK {

	export interface GetSystemInfoResult {
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

	export interface LaunchOptions {
		/** 打开小游戏的场景值 */
		scene: number,
		/** 打开小游戏的启动参数 query */
		query: { [key: string]: string },
		path?: string,
		isSticky?: boolean,
		/** shareTicket，详见获取更多转发信息 */
		shareTicket: string,
		/**
		 * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。(参见后文注意) *
		 * - 部分版本在无referrerInfo的时候会返回 undefined，建议使用 options.referrerInfo && options.referrerInfo.appId 进行判断。
		 **/
		referrerInfo?: {
			/** 来源小程序、公众号或 App 的 appId */
			extraData: object,
			/** 来源小程序传过来的数据，scene=1037或1038时支持 */
			appId: string
		}
	}
	export interface IGameInfo extends IModule {
		/**
         * 游戏的启动模式。
         * 可以是 开发、测试、发布
		 */
		mode: "develop" | "test" | "release"

		/**
		 * 程序appid
		 */
		appId: string

		/**
		 * 游戏启动的渠道id
		 */
		gameChannelId: number

		/** 沙盒模式支付 */
		isPayInSandbox: boolean

		/** 跳转支付app模式 */
		payAppEnvVersion?: "trial" | "release" | "develop"

		/** 支付侧应用id */
		offerId: string
		/**
		 * 跳转小程序支付offerid
		 * - 填对方小程序appid
		 **/
		miniAppOfferId?: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		shareProxyUrl?: string;

		/** 小游戏启动时的参数。 */
		launchOptions: LaunchOptions
		/**
		 * 游戏版本号
		 **/
		gameVersion?: string
		/**
		 * 游戏id
		 **/
		gameId?: number
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number

		/** 优先只启用小程序跳转支付 */
		requireMiniAppPay: boolean

	}

}
