
namespace WechatGDK {
	export class GameInfo implements GDK.IGameInfo {

		mode: "develop" | "test" | "release"

		appId: string
		channelId: number
		/** 沙盒模式支付 */
		isPayInSandbox: boolean
		/** 支付侧应用id */
		offerId: string
		/**
		 * 分享结果检测的代理网址
		 * * 仅微信使用
		 */
		shareProxyUrl: string;

		get launchOptions(): GDK.LaunchOptions { return wx.getLaunchOptionsSync() }
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

		setGameInfo(info: GDK.GDKConfig) {
			for (let k in info.wechat) {
				this[k] = info.wechat[k]
			}

			Common.getServerTime = info.wechat.getServerTime
			Common.httpClient = info.wechat.httpClient
		}
		init() {
		}
	}
}