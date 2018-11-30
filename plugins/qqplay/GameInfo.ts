
namespace WechatGDK {
	export class GameInfo extends GDK.GameInfoBase {
		appId: string
		channelId: number
		launchOptions: GDK.LaunchOptions
		/** 沙盒模式支付 */
		isPayInSandbox: boolean
		/** 支付侧应用id */
		offerId: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		shareProxyUrl: string;
		/**
		 * 游戏版本号
		 **/
		get gameVersion(): string {
			return GameStatusInfo.gameVersion
		}
		/**
		 * 游戏id
		 **/
		get gameId(): number {
			return GameStatusInfo.gameId
		}
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		get gameType(): number {
			return GameStatusInfo.gameType
		}

		init() {
		}

		setGameInfo(info) {
			this.appId = info.appId
			this.channelId = info.channelId
			this.isPayInSandbox = info.isPayInSandbox
			this.offerId = info.offerId
		}
	}
}