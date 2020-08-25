
namespace GDK.PayFlow.PayInAppWithAutoMakeup {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 充值之后，自带轮询补单
	 * - 默认补单 3s * 2次
	 */
	export class PayFlow extends APayBase.PayFlow {
		payFlowName = "PayInAppWithAutoMakeup"

		/**
		 * 剩余补单次数
		 */
		protected autoMakeupOrderLeftTimes: number = 0
		/**
		 * 补单定时器id
		 */
		protected autoMakeupOrderScheduleId = null
		/**
		 * 自动补单间隔
		 */
		protected autoMakeupOrderInterval: number = 3000 //ms
		/**
		 * 当前是否正在补单
		 */
		protected isAutoMakingupOrders: boolean = false
		/**
		 * 触发自动定时补单
		 */
		protected scheduleAutoMakeup(retryTimes?: number) {
			if (retryTimes == null || isNaN(retryTimes)) {
				retryTimes = 3;
			}

			// 避免重复定时
			this.pauseAutoMakeup()

			// 每次自动轮询n次
			this.autoMakeupOrderLeftTimes = retryTimes
			this.autoMakeupOrderScheduleId = setInterval(() => {
				// 已经存在补单操作就跳过
				if (this.isAutoMakingupOrders) {
					return
				}

				this.autoMakeupOrderLeftTimes -= 1
				if (this.autoMakeupOrderLeftTimes >= 0) {
					this.pullDiffOrders(() => { }, () => { })
				} else {
					// 次数达上限就取消定时
					this.pauseAutoMakeup()
				}
			}, this.autoMakeupOrderInterval)
		}
		/**
		 * 暂停自动轮询补单入口
		 */
		protected pauseAutoMakeup() {
			this.autoMakeupOrderLeftTimes = 0

			if (this.autoMakeupOrderScheduleId != null) {
				clearInterval(this.autoMakeupOrderScheduleId)
				this.autoMakeupOrderScheduleId = null
			}
		}

		// 校验历史订单
		public pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function) {
			this.isAutoMakingupOrders = true
			super.pullDiffOrders((...p1) => {
				this.isAutoMakingupOrders = false
				return successCallback(...p1)
			}, (...p2) => {
				this.isAutoMakingupOrders = false
				return failCallback(...p2)
			})
		}

		public payment(config: PaymentParams, successCallback?: PaymentSuccessCallback, failCallback?: Function) {
			// 仅仅暂停自动轮询补单入口，暂时不保证当前已触发的补单是否还在进行中
			this.pauseAutoMakeup()

			// 自动补单重试次数
			const autoMakeupRetryTimes = config.options.autoMakeupRetryTimes;
			super.payment(config, (...p1) => {
				let ___unused = successCallback && successCallback(...p1)
				// 成功不轮询补单
				// this.scheduleAutoMakeup()
			}, (...p2) => {
				let ___unused = failCallback && failCallback(...p2)
				// 失败轮询补单
				this.scheduleAutoMakeup(autoMakeupRetryTimes)
			})
		}
	}
}
