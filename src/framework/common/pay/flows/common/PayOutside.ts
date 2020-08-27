
namespace GDK.PayFlow.PayOutside {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 这种流程只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
	 */
	export class PayFlow extends APayBase.PayFlow {

		payFlowName = "PayOutside"

		get isPayCallbackValid(): boolean {
			return false
		}

		/**
		 * 小程序跳转支付和客服支付
		 * @param config 
		 * @param successCallback 
		 * @param failCallback 
		 */
		public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {

			log.info('开始充值', config)

			this.enableRechargeBlock()

			/** 无回调支付不会直接返回成功 */
			// const onPayOk = () => {
			// 	this.disableRechargeBlock()
			// 	log.info('支付成功')
			// 	try {
			// 		successCallback && successCallback({ config: config, orderInfo: null })
			// 	} catch (e) {
			// 		log.warn('购买成功,成功回调内处理失败')
			// 		log.error(e)
			// 	}
			// }

			const onPayFailed = () => {
				this.disableRechargeBlock()
				log.warn('支付不成功')
				try {
					let ___unused = failCallback && failCallback({ status: 1 })
				} catch (e) {
					log.error('支付失败,失败回调内异常')
					log.error(e)
				}
			}

			const onPayWaitting = () => {
				this.disableRechargeBlock()
				log.warn('等待支付')
				try {
					let ___unused = failCallback && failCallback({ status: 0 })
				} catch (e) {
					log.error('支付失败,失败回调内异常')
					log.error(e)
				}
			}

			try {
				this.commitPayLog('OnPayStart', config, null)
				this.payAPICall(config, {}, (extra: wxPayState) => {
					onPayWaitting()
					log.info('payApiPay waitting')
				}, (extra: wxPayState) => {
					onPayFailed()
					log.info('payApiPay failed', extra)
				})
			} catch (e) {
				onPayFailed()
				log.error('payApiPay failed', e)
			}

		}

	}
}
