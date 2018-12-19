
namespace WechatGDK {
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
			for (let k in info.wechat) {
				this[k] = info.wechat[k]
			}

			Common.getServerTime = info.wechat.getServerTime
			Common.httpClient = info.wechat.httpClient
		}
		init() {
			this._launchOptions = wx.getLaunchOptionsSync()
			wx.onShow((res) => {
				//刷新启动参数
				this._launchOptions.query = res.query
				this._launchOptions.shareTicket = res.shareTicket
				this._launchOptions.scene = res.scene
				this._launchOptions.referrerInfo = res.referrerInfo
			})
		}
	}
}