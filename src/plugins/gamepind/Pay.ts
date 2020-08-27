//import("sps_billing_sdk")
declare function SPS(parameter: any): void

namespace GamepindGDK {

	const devlog = Common.paylog

	export interface PayItemInfoExt extends GDK.PayItemInfo{
		/** oppo包名 */
		pkgName?: string
		/** oppo登录返回的token */
		token?: string
		/** 支付签名 */
		paySign?: string
		/** 游戏在oppo快游戏的id */
		oppoId?: string
		/** 游戏在该平台的appid */
		channelAppId?: string
		merchantId?: string
		/** 手q后台生成的预支付id */
		prepayId?: string

		/** 商户id */
		partnerId?: string
		/** 随机字符串 */
		nonceStr?: string
		/** vivo订单信息 */
		vivoOrderInfo?: string
		/** 支付宝支付特有 */
		extraStr: string
		/** aligame accountId */
		accountId?: string;
		/** aligame aliamount */
		aliamount?: string;
		/** xiao7 game sign */
		gameSign?: string;
	}

	export class Pay extends GDK.PayBase {
		api!: GDK.UserAPI

		protected payFlow: PayFlow.PayFlowProxy
		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowProxy().init(this.api)
			return this.payFlow
		}

		static ret: GDK.RPromise<GDK.PayResult>
		payPurchase(config: PayItemInfoExt, options: GDK.PayOptions): Promise<GDK.PayResult> {
			devlog.warn("gamepind payPurchase:", config)
			return this.pay_gamepind(config, options)
		}

		pay_gamepind(config: PayItemInfoExt, options: GDK.PayOptions): Promise<GDK.PayResult> {
			Pay.ret = new GDK.RPromise<GDK.PayResult>()
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
			//payInfo.msisdn = Number(payInfo.msisdn);
			devlog.warn("gamepind payInfo:AccessTokenAuthorization ", payInfo.AccessTokenAuthorization)
			devlog.warn("gamepind payInfo:msisdn ", payInfo.msisdn)
			console.log(JSON.stringify(payInfo));
			let spsClient = new SPS(payInfo);
			spsClient.doBilling();
			devlog.warn("gamepind payInfo:order_id ", payInfo.order_id)
			return Pay.ret.promise
		}

		public static OnPayResult(msg: any): void {
			console.log("OnPayResult: " + JSON.stringify(msg));
			if (msg.message == "Success") {
				Pay.ret.success({
					result: {
						errCode: 0,
					},
					extra: { errCode: 0, state: GDK.OrderState.ok },
				})
			} else {
				// Pay.ret.success({
				// 	result: {
				// 		errCode: 0,
				// 	},
				// 	extra: { errCode: 0, state: GDK.OrderState.ok },
				// })
				Pay.ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
			}
		}
	}
}
