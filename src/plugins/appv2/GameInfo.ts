
namespace UnityAppGDK {
	export class GameInfo extends GDK.GameInfoBase {

		mode!: "develop" | "test" | "release"

		appId!: string
		gameChannelId!: number
		/** 沙盒模式支付 */
		isPayInSandbox!: boolean
		/** 支付侧应用id */
		offerId!: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		shareProxyUrl!: string;

		launchOptions!: GDK.LaunchOptions
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
		gameType!: number

		async initWithConfig(info: GDK.GDKConfig) {
			if (info == undefined) return;
			if (info.appv2 == undefined) {
				if (info.app != undefined) {
					info.appv2 = info.app;
				} else {
					return;
				}
			}
			for (let k in info.appv2) {
				this[k] = info.appv2[k]
			}

			Common.getServerTime = info.appv2.getServerTime
			Common.httpClient = info.appv2.httpClient
		}
		init() {
		}
	}
}