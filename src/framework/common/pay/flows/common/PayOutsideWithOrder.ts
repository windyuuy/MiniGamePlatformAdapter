
namespace GDK.PayFlow.PayOutsideWithOrder {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
	 */
	export class PayFlow extends APayBase.PayFlow {

		payFlowName = "PayOutsideWithOrder"

		get isPayCallbackValid(): boolean {
			return false
		}

		/**
		 * app内sdk支付
		 * @param config 配置信息
		 * @param successCallback 支付成功回调
		 * @param failCallback
		 */
		public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {

			log.info('开始充值', config)

			this.enableRechargeBlock()

			const options = config.options || {}
			const customExtra = slib.defaultValue(options.customExtra, null)
			const customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}")

			let curOrderInfo: OrderInfo = null

			let onPayFailed = () => {
				this.disableRechargeBlock()
				try {
					log.warn('支付不成功')
					let ___unused = failCallback && failCallback()
				} catch (e) {
					log.error('支付失败,失败回调内异常')
					log.error(e)
				}
			}

			let onPayOk = () => {
				this.disableRechargeBlock()
				try {
					log.info('支付成功')
					let ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo })
				} catch (e) {
					log.warn('购买成功,成功回调内处理失败')
					log.error(e)
				}
			}

			// ApiPay支付成功/校验前后有差异,则需要备份
			let needBackUp = false

			let onContinueFailed = () => {
				onPayFailed()
			}

			let onContinueOk = (needSync: boolean) => {

				if (needBackUp) {
					// pass
					if (needSync) {
						// 支付成功后,缺回滚的情况
						// 已经回调过成功,不作回滚处理
						// pass
					} else {
						// 支付成功,服务器扣款成功
						// 已经回调过成功,不作其他处理
						// pass
					}
				} else {
					if (needSync) {
						// 支付失败,扣款成功
						onPayOk()
					} else {
						// 支付失败,扣款失败
						// 充值失败
						onPayFailed()
					}
				}
			}

			this.genOrder(config, {
				customExtra,
				customJsonExtra,
				payWay: config.payWay,
			}, (orderInfo) => {
				let orderno: string = orderInfo.outTradeNo
				let time: number = orderInfo.time
				log.info('genOrder success', orderno)

				curOrderInfo = orderInfo
				this.saveOrder(orderInfo, config)

				const checkRechargeOrder = (orderno: string, extra: wxPayState, config: RechargeConfigRow) => {
					// 充值回调不可信，一律返回失败
					onContinueFailed()

					// this.checkOrderState({ orderno, extra, config }, (state) => {
					// 	log.info('checkOrderState success, order state:', orderno, state, extra)
					// 	log.info(`服务器校验订单状态（1成功，2失败，0未知）：${state}`)

					// 	// 用于判定合并阶段是否成功
					// 	let mergeOk: boolean = false
					// 	let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra && extra.extra.purchaseToken || '' }
					// 	try {
					// 		this.mergeOrderList([record], { isMakingUpOrder: false }, (result, diffExist, needSync) => {
					// 			log.info('mergeOrderList success', orderno)
					// 			mergeOk = true

					// 			onContinueOk(needSync)

					// 			if (needSync) {
					// 				log.info('本次充值校验前后存在要补发的差异,需要上传存档')
					// 				this.syncStorage()
					// 			} else {
					// 				log.info('本次充值校验后,没有生成要补发的差异,不上传存档')
					// 				payDeps.storage.saveToLocalStorage();//立即同步保存
					// 			}

					// 		}, () => {
					// 			log.info('mergeOrderList failed', orderno)
					// 			onContinueFailed()
					// 		})
					// 	} catch (e) {
					// 		log.error('本次充值订单合并发生异常,合并结果:', mergeOk)
					// 		log.error(e)
					// 		onContinueFailed()
					// 	}
					// }, () => {
					// 	log.info('checkOrderState failed', orderno)
					// 	onContinueFailed()
					// })
				}

				this.commitPayLog('OnPayStart', config, orderInfo)
				this.payAPICall(config, orderInfo, (extra: wxPayState) => {
					log.info('payApiPay success，支付api调起成功，但是该回调结果不可信，将一律回调失败，通过补单发放奖励。', orderno)

					checkRechargeOrder(orderno, extra, config)
				}, (extra: wxPayState) => {
					log.info('payApiPay failed', orderno)

					checkRechargeOrder(orderno, extra, config)
				})

			}, () => {
				log.info('genOrder failed: 创建订单失败')
				onPayFailed()
			})
		}

	}
}
