
namespace VIVOGDK {
	export class GameInfo extends GDK.GameInfoBase {

		mode: "develop" | "test" | "release"

		appId: string
		gameChannelId: number
		/** 沙盒模式支付 */
		isPayInSandbox: boolean
		/** 支付侧应用id */
		offerId: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		shareProxyUrl: string;

		protected _launchOptions: GDK.LaunchOptions = null

		get launchOptions(): GDK.LaunchOptions { return this._launchOptions }
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

		initWithConfig(info: GDK.GDKConfig) {
			for (let k in info.vivo) {
				this[k] = info.vivo[k]
			}

			Common.getServerTime = info.vivo.getServerTime
			Common.httpClient = info.vivo.httpClient
		}
		init() {

		}
	}
}