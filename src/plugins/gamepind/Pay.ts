//import("sps_billing_sdk")
declare function SPS(parameter: any): void

namespace GamepindGDK {

	const devlog = Common.paylog

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI
		payPurchase(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			devlog.warn("gamepind payPurchase:", config)
			return this.pay_gamepind(config, options)
		}

		pay_gamepind(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()
			const payInfo = JSON.parse(config.extraStr)
			const successCode = 0
			// const myAppId = this.api.gameInfo.appId
			// const miniAppOfferId = this.api.gameInfo.miniAppOfferId
			// const userId = this.api.userData.userId
			// const goodsId = config.goodsId
			// const quantity = config.amount
			// const title = config.title
			// const zoneId = slib.defaultValue(options.gleeZoneId, 1)
			// const field = zoneId
			// const payUrl = options.payUrl || null
			// let spsClient = new SPS({
			// 	"AccessTokenAuthorization": "Basic ZWJmZDViNTgtM2NjYi00NmU5LTg3OWUtNDI3ZjAyM2UyNjkyOjEyMzQ1Ng==",
			// 	"msisdn": 919716347180,
			// 	"order_id": "sweww22dssc33z",
			// 	"billed_product_id": "ALL_BUY_PP",
			// 	"APIKeyAuthorization": "Basic dGVzdGNsaWVudDplODY3MDlkOS1iMjM4LTQ4MjMtODVkYi05zZhMTY5YjMyNTg",
			// 	"redirect_url": "http://www.sample1234.com",
			// 	"plugin": "gamepindplugin",
			// 	"callback_function": "paymentCallback",
			// 	"pid": "pid",
			// 	"device_id": "XH12QR1",
			// 	"amount": 12,
			// 	"gp_promoName": "promoName",
			// 	"utm_medium": "medium",
			// 	"utm_campaign": "campaign",
			// 	"gp_playSourcep": "playSource",
			// 	"checksumhash": "3334434wewewewe6756rty7eueur"
			// })
			payInfo.redirect_url = "";
			devlog.warn("gamepind payInfo:AccessTokenAuthorization ", payInfo.AccessTokenAuthorization)
			devlog.warn("gamepind payInfo:msisdn ", payInfo.msisdn)
			let spsClient = new SPS(payInfo);
			spsClient.doBilling();
			devlog.warn("gamepind payInfo:order_id ", payInfo.order_id)

			return ret.promise
		}

		public static OnPayResult(msg: string): void {
			console.log("OnPayResult: " + msg);
		}
	}
}
