
namespace WechatGDK {

	export const AppInfoKeys = {
		/** string */
		shareProxyUrl: "mini.wechat.shareProxyUrl",
		/** boolean */
		requireMiniAppPay: "mini.wechat.requireMiniAppPay",
		/** boolean */
		requireCustomServicePay: "mini.wechat.requireCustomServicePay",
		/** boolean */
		isPayInSandbox: "mini.wechat.isPayInSandbox",
		/** string */
		offerId: "mini.wechat.offerId",
		/** string */
		miniAppOfferId: "mini.wechat.miniAppOfferId",
		/** string */
		/**
		 * 小程序跳转所需 envVersion 参数
		 */
		payAppEnvVersion: "mini.wechat.payAppEnvVersion",
	}

	export class GameInfo extends GDK.GameInfoBase {

		init() {
		}
	}
}