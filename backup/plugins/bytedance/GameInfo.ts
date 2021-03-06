
namespace BytedanceGDK {
	export const AppInfoKeys = {
		shareProxyUrl: "mini.bytedance.shareProxyUrl",

		/** boolean */
		isPayInSandbox: "mini.bytedance.isPayInSandbox",

		/** string */
		offerId: "mini.bytedance.offerId",
		/** string */
		miniAppOfferId: "mini.bytedance.miniAppOfferId",
		/** string */
		payAppEnvVersion: "mini.bytedance.payAppEnvVersion",
	}

	GDK.Tools.mergeObject(WechatGDK.AppInfoKeys, AppInfoKeys)

	export class GameInfo extends GDK.GameInfoBase {

		init() {
		}
	}
}
