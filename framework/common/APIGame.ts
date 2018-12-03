
namespace GDK {
	export abstract class GameInfoBase implements IGameInfo {
		mode: "develop" | "test" | "release"

		abstract appId: string
		abstract channelId: number
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
		requireMiniAppPay: boolean = false

		abstract init?()

		abstract initWithConfig(info: GDKConfig)

		// setGameInfo(info: IGameInfo) {
		// 	this.appId = info.appId
		// 	this.channelId = info.channelId
		// 	this.isPayInSandbox = info.isPayInSandbox
		// 	this.offerId = info.offerId

		// 	this.gameVersion = info.gameVersion
		// 	this.gameId = info.gameId
		// 	this.gameType = info.gameType

		// }
	}
}
