
namespace OPPOGDK {
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
		gameVersion?: string
		/**
		 * 游戏id
		 **/
		gameId?: number
		/**
		 * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
		 **/
		gameType: number

		init() {
		}

		initWithConfig(info: GDK.GDKConfig) {
			for (let k in info.oppokyx) {
				this[k] = info.oppokyx[k]
			}

			Common.getServerTime = info.oppokyx.getServerTime
			Common.httpClient = info.oppokyx.httpClient
		}

	}
}