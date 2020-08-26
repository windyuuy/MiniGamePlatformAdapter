
namespace GDK.PayFlow.PayInsideLocalV1 {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 兼容类似谷歌支付等有本地支付缓存的老版本apk
	 * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
	 */
	export class PayFlow extends APayBase.PayFlow {
		payFlowName = "PayInsideLocalV1"

		// payAPICall(config: PaymentParams,{}, successCallback: (res: wxPayState) => void, failCallback: (res: wxPayState) => void) {

		// 	const item: RechargeConfigRow = config
		// 	const options = config.options || {}
		// 	const gleeZoneId = options.gleeZoneId
		// 	const subTitle = options.subTitle
		// 	const imagePath = options.imagePath
		// 	const gameOrientation = slib.defaultValue(options.gameOrientation, 1)
		// 	const payUrl: string = slib.defaultValue(options.payUrl, Info.instance.accountServer)

		// 	try {
		// 		log.info('ApiPay call payPurchase', item)
		// 		const params: GDK.PayItemInfo = {
		// 			goodsId: item.id,
		// 			coinId: item.coinId,
		// 			productId: item.productId,
		// 			money: item.money,
		// 			amount: item.amount,
		// 			title: item.title,
		// 			currencyUnit: "CNY",
		// 		}
		// 		let channelType: GDK.ChannelType
		// 		if (payDeps.api.gameInfo.requireCustomServicePay) {
		// 			channelType = "customer_service"
		// 		} else if (payDeps.api.gameInfo.requireMiniAppPay) {
		// 			channelType = "miniapp"
		// 		} else {
		// 			channelType = "origion"
		// 		}

		// 		let consumeLeft = (onDone: Function) => {
		// 			payDeps.api.queryItemInfo({ productId: config.productId }).then((ret) => {
		// 				if (ret.code == 0) {
		// 					payDeps.api.consumePurchase({ purchaseToken: ret.data.purchaseToken }).then((ret) => {
		// 						onDone()
		// 					}, () => {
		// 						onDone()
		// 					})
		// 				} else {
		// 					onDone()
		// 				}
		// 			}, () => {
		// 				onDone()
		// 			})
		// 		}

		// 		let payMoney = () => {
		// 			payDeps.api.payPurchase(params, {
		// 				gameOrientation: gameOrientation,
		// 				channelType: channelType,
		// 				gleeZoneId: gleeZoneId,
		// 				payUrl: payUrl,
		// 				subTitle: subTitle,
		// 				imagePath: imagePath,
		// 			}).then((data) => {
		// 				log.info("ApiPay充值结果", 0, item);
		// 				let errCode = 0
		// 				if (errCode == 0) {
		// 					let checkSign: { purchaseToken: string } = data.extra.data
		// 					log.info("ApiPay充值成功", item);
		// 					successCallback({ errCode: errCode, state: OrderState.ok, extra: data.extra })
		// 					payDeps.api.consumePurchase({ purchaseToken: checkSign.purchaseToken })
		// 				} else {
		// 					log.info("ApiPay充值失败", item);
		// 					failCallback({ errCode: errCode, state: OrderState.unknown, extra: data.extra })
		// 				}
		// 			}).catch((reason) => {
		// 				if (reason.data) {
		// 					const errCode = reason.data.extra.errCode
		// 					const errMsg = reason.data.extra.errMsg
		// 					log.warn("ApiPay充值失败", errCode, item, errMsg)
		// 					this.hintPayAPIErrorCode(errCode)
		// 					failCallback({ errCode: errCode, state: OrderState.unknown });
		// 				} else {
		// 					log.error('ApiPay充值期间异常:' + JSON.stringify(reason))
		// 					console.error(reason)
		// 					failCallback({ errCode: -101, state: OrderState.unknown })
		// 				}
		// 			})
		// 		}
		// 		consumeLeft(payMoney)
		// 	} catch (e) {
		// 		log.error('ApiPay充值期间异常:' + JSON.stringify(e))
		// 		console.error(e)
		// 		failCallback({ errCode: -101, state: OrderState.unknown })
		// 	}
		// }
	}

}
