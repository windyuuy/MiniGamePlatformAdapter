
namespace GDK {
	export abstract class GameInfoBase implements IGameInfo {
		abstract mode: "develop" | "test" | "release"

		abstract appId: string
		abstract gameChannelId: number
		/** 沙盒模式支付 */
		abstract isPayInSandbox: boolean
		/** 支付侧应用id */
		abstract offerId: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		abstract shareProxyUrl: string;

		/** 小游戏启动时的参数。 */
		abstract launchOptions: LaunchOptions
		/**
		 * 游戏版本号
		 **/
		abstract gameVersion?: string
		/**
		 * 游戏id
		 **/
		abstract gameId?: number
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		abstract gameType: number
		requireCustomServicePay: boolean = false
		requireMiniAppPay: boolean = false
		requireIndiaSPSPay: boolean = false

		abstract init?()

		abstract async initWithConfig(info: GDKConfig):Promise<void>

	}
}
