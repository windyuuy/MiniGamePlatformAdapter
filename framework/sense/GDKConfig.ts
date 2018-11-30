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
		httpClient: slib.HttpGameClient

		/**
		 * 获取当前服务器时间
		 */
		getServerTime: () => Date;
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

		/**
		 * 安卓分享时，所使用的代理网址
		 */
		shareProxyUrl: string = "";

	}

	export class GDKQQPlayConfig extends GDKConfigBase {
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number

	}


	export class GDKConfig {


		wechat: GDKWechatConfig

		qqplay: GDKQQPlayConfig

	}


}