
namespace QQPlayGDK {
	export class GameInfo extends GDK.GameInfoBase {
		mode: "develop" | "test" | "release"
		appId: string
		gameChannelId: number
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

		initWithConfig(info: GDK.GDKConfig) {
			for (let k in info.qqplay) {
				this[k] = info.qqplay[k]
			}

			Common.getServerTime = info.qqplay.getServerTime
			Common.httpClient = info.qqplay.httpClient
		}

	}
}