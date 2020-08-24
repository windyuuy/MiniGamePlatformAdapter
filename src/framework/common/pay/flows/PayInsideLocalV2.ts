
namespace GSSDK.PayFlow.PayInsideLocalV2 {

	const waitAllFinish = (ls: Promise<any>[]) => {
		return new Promise((resolve, reject) => {
			if (ls.length <= 0) {
				resolve()
				return
			}

			let waitCount = ls.length
			let failExist = false
			let tryOnDone = () => {
				waitCount--
				if (waitCount == 0) {
					if (failExist) {
						reject()
					} else {
						resolve()
					}
				}
			}
			let tryOnFail = () => {
				failExist = true
				tryOnDone()
			}
			for (let p of ls) {
				p.then(tryOnDone, tryOnFail)
			}
		})
	}

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 支持类似谷歌支付等有本地支付缓存的支付方式
	 * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
	 */
	export class PayFlow extends APayBase.PayFlow {

		payFlowName = "PayInsideLocalV2"

		checkOutLocalOrder(purchaseToken: string, payWay: PayWay): OrderInfo {
			let result: OrderInfo[] = []
			let targets = this.paysdk.orderRecordList
			for (let record of targets) {
				if (record.purchaseToken == purchaseToken) {
					result.push({ payWay: payWay, goodsId: record.Id, outTradeNo: record.orderno, purchaseToken: record.purchaseToken, state: record.state, time: record.time })
				}
			}
			if (result.length > 1) {
				log.error("多个订单重复绑定同一支付token")
			}
			return result[0]
		}

		/**
		 * 本地化支付
		 * @param config 
		 * @param successCallback 
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

				// 目前 needBackUp 一直为 false，没有true的需求
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

			let consumeProductAndReward = (record: OrderInfo, config: RechargeConfigRow) => {
				let purchaseToken: string = record.purchaseToken
				let orderno: string = record.outTradeNo
				let state = record.state
				let mergeOrders = () => {
					// 用于判定合并阶段是否成功
					let mergeOk: boolean = false
					try {
						this.mergeOrderList([record], { isMakingUpOrder: false }, (result, diffExist, needSync) => {
							log.info('mergeOrderList success', orderno)
							mergeOk = true

							onContinueOk(needSync)

							if (needSync) {
								log.info('本次充值校验前后存在要补发的差异,需要上传存档')
								this.syncStorage()
							} else {
								log.info('本次充值校验后,没有生成要补发的差异,不上传存档')
								payDeps.storage.saveToLocalStorage();//立即同步保存
							}

						}, () => {
							log.info('mergeOrderList failed', orderno)
							onContinueFailed()
						})
					} catch (e) {
						log.error('本次充值订单合并发生异常,合并结果:', mergeOk)
						log.error(e)
						onContinueFailed()
					}
				}

				if (state == OrderState.ok || state == OrderState.fail) {
					// 成功（正常订单）、失败（异常订单）都需要消耗
					// 但合并中，只有成功的才发奖励，失败的不发
					gdk.consumePurchase({ payWay: config.payWay, purchaseToken }).then((ret) => {
						if (ret.code == 0 || ret.code == 8) {
							mergeOrders()
						} else {
							onContinueFailed()
						}
					}, () => {
						onContinueFailed()
					})
				} else if (state == OrderState.unknown) {
					// 未知（异常订单）的不消耗，形式上合并一下，实际上不生效
					mergeOrders()
				} else {
					onPayFailed()
				}
			}

			let consumeProductAndAbort = (record: OrderInfo, config: RechargeConfigRow, onContinue: Function) => {
				let purchaseToken: string = record.purchaseToken
				let orderno: string = record.outTradeNo
				let state = record.state
				let mergeOrders = () => {
					// 用于判定合并阶段是否成功
					let mergeOk: boolean = false
					try {
						this.mergeOrderList([record], { isMakingUpOrder: false }, (result, diffExist, needSync) => {
							log.info('mergeOrderList success', orderno)
							mergeOk = true

							payDeps.storage.saveToLocalStorage();//立即同步保存
							onContinue()

						}, () => {
							log.info('mergeOrderList failed', orderno)
							onContinue()
						})
					} catch (e) {
						log.error('本次充值订单合并发生异常,合并结果:', mergeOk)
						log.error(e)
						onContinue()
					}
				}

				if (state == OrderState.ok || state == OrderState.fail) {
					// 成功（正常订单）、失败（异常订单）都需要消耗
					// 但合并中，只有成功的才发奖励，失败的不发
					gdk.consumePurchase({ payWay: config.payWay, purchaseToken }).then((ret) => {
						if (ret.code == 0 || ret.code == 8) {
							mergeOrders()
						} else {
							onContinue()
						}
					}, () => {
						onContinue()
					})
				} else if (state == OrderState.unknown) {
					// 未知（异常订单）的不消耗，形式上合并一下，实际上不生效
					onContinue()
				} else {
					onContinue()
				}
			}

			const checkRechargeOrder = (orderno: string, extra: wxPayState, config: RechargeConfigRow, time: number) => {
				this.checkOrderState({ orderno, extra, config }, (state) => {
					log.info('checkOrderState success, order state:', orderno, state, extra)

					let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra.data.purchaseToken }
					consumeProductAndReward(record, config)
				}, () => {
					log.info('checkOrderState failed:', orderno)
					// 如果无法重新发起支付，那么需要改成调用一下 consumeProductAndAbort

					// 返回失败订单，则消耗并存档，并直接重新发起支付流程
					// let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: OrderState.fail, goodsId: config.id, purchaseToken: extra.extra.data.purchaseToken }
					// consumeProductAndAbort(record, config, () => {
					// 	// 	beginRequestPay()
					// })
					// 直接返回失败，避免无谓重试
					onContinueFailed()
				})
			}

			let genOrderAndConsume = (extra: { checkSign: GDK.PayQueryItemInfoResultData }) => {
				this.genOrder(config, {
					customExtra,
					customJsonExtra,
					purchaseToken: extra.checkSign.purchaseToken,
					productId: config.productId,
					goodsId: config.id,
					payWay: config.payWay,
				}, (orderInfo) => {
					let orderno: string = orderInfo.outTradeNo
					orderInfo.purchaseToken = extra.checkSign.purchaseToken
					// let time: number = orderInfo.time
					log.info('genOrder success', orderno)

					curOrderInfo = orderInfo

					this.saveOrder(orderInfo, config)

					// 新生成的绑定订单，请求校验、消耗
					checkRechargeOrder(orderInfo.outTradeNo, { errCode: 0, extra: { data: extra.checkSign }, state: orderInfo.state }, config, orderInfo.time)
				}, () => {
					log.info('genOrder failed: 创建订单失败')
					onPayFailed()
				})
			}

			var beginRequestPay = () => {
				let productId = config.productId
				gdk.queryItemInfo({ payWay: config.payWay, productId: productId }).then((ret) => {
					if (ret.code == 0) {
						// 签名数据
						let checkSign = ret.data
						// 检查有无绑定的本地历史订单
						let orderInfo = this.checkOutLocalOrder(checkSign.purchaseToken, config.payWay)
						if (orderInfo) {
							if (orderInfo.state == OrderState.fail || orderInfo.state == OrderState.ok) {
								// 本地存在不为未知的绑定订单说明有异常
								log.error("本地存在不为未知的绑定订单")
							}
							// 每次都在校验订单、消耗完之后，再去修改本地订单状态，因此，若有未消耗的商品，那么本地订单状态应为未知，需要联网校验
							checkRechargeOrder(orderInfo.outTradeNo, { errCode: 0, extra: { data: ret.data }, state: orderInfo.state }, config, orderInfo.time)
						} else {
							// 无绑定的历史订单，那么进行绑定、消耗
							genOrderAndConsume({ checkSign })
						}
					} else {
						this.payAPICall(config, {}, (extra: wxPayState) => {
							log.info('payApiPay success', extra)

							// 付款之后，进行绑定、消耗
							genOrderAndConsume({ checkSign: extra.extra.data })
						}, (extra: wxPayState) => {
							log.info('payApiPay failed', extra)

							onPayFailed()
						})
					}
				}, (ret) => {
					onPayFailed()
					return
				})
			}

			beginRequestPay()
		}

		// 校验历史订单
		public pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function, options?: PaymentParamsOptions) {

			log.info('开始校验订单历史')

			options = options || {}
			const customExtra = slib.defaultValue(options.customExtra, null)
			const customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}")

			let onMergeFailed = () => {
				try {
					log.warn('校验历史订单失败')
					let ___unused = failCallback && failCallback()
				} catch (e) {
					log.error('校验历史订单失败,失败回调内异常')
					log.error(e)
				}
			}

			const makeupResult: MakeupOrdersResult = {
				isDiffExist: false,
				isMergeOk: false,
			}
			let onMergeSucceed = () => {
				try {
					let ___unused = successCallback && successCallback(makeupResult)
				} catch (e) {
					log.warn('合并历史差异订单成功,成功回调内处理失败')
					log.error(e)
				}
			}

			if (!(this._parent && this._parent.chargeconfig)) {
				log.error("未配置商品配表")
				onMergeFailed()
				return
			}

			let time = this.getHistoryCutline()
			log.info('订单检查点时间2:', time)
			//log.info('本地订单2:', this.getPrettyLocalRechargeRecords())
			this.reqDiffOrderList({ time: time, }, (diffList) => {
				log.info('reqDiffOrderList success', time, diffList)

				// 先消耗，无法消耗的订单不补单
				let consumedList: OrderInfo[] = []
				let consumeAwaitList: Promise<any>[] = []
				let queryAwaitList: Promise<any>[] = []
				let unconsumedAwaitList: Promise<any>[] = []


				let delay = 0
				let genUnconsumedOrder = (config: RechargeConfigRow) => {
					return new Promise((resolve, reject) => {
						gdk.queryItemInfo({ payWay: config.payWay, productId: config.productId }).then((ret) => {
							if (ret.code == 0) {
								let isBindOrderExist = diffList.find(info => info.purchaseToken == ret.data.purchaseToken) || this.checkOutLocalOrder(ret.data.purchaseToken, config.payWay)
								if (isBindOrderExist) {
									reject()
									return
								}

								this.genOrder(config, {
									customExtra,
									customJsonExtra,
									purchaseToken: ret.data.purchaseToken,
									productId: config.productId,
									goodsId: config.id,
									payWay: config.payWay,
								}, (orderInfo) => {
									let orderno: string = orderInfo.outTradeNo
									orderInfo.purchaseToken = ret.data.purchaseToken
									log.info('genOrder successx', orderno)
									diffList.push(orderInfo)
									resolve()
								}, () => {
									reject()
								})
							} else {
								reject()
							}
						}, () => {
							reject()
						})
					})
				}

				let filterUnconsumedList = () => {
					for (let config of this._parent.chargeconfig) {
						unconsumedAwaitList.push(genUnconsumedOrder(config))
					}
				}

				let genQueryAwait = (info: OrderInfo, config: RechargeConfigRow) => {
					return new Promise((resolve, reject) => {
						gdk.queryItemInfo({ payWay: config.payWay, productId: config.productId }).then((ret) => {
							if (ret.code == 0) {
								// 签名数据
								let checkSign = ret.data
								// 检查有无绑定的本地历史订单
								const checkRechargeOrder = (orderno: string, extra: wxPayState, config: RechargeConfigRow) => {
									this.checkOrderState({ orderno, extra, config }, (state) => {
										log.info('checkOrderState success, order state:', orderno, state, extra)
										info.state = state
										resolve()
									}, () => {
										log.info('checkOrderState failed', orderno)
										reject()
									})
								}
								checkRechargeOrder(info.outTradeNo, { errCode: 0, extra: { data: checkSign }, state: info.state }, config)
							} else {
								reject()
							}
						}, () => {
							reject()
						})
					})
				}

				let filterQueryList = () => {
					for (let info of diffList) {
						if (info.purchaseToken) {
							if (info.state == OrderState.unknown) {
								// 只有成功、失败订单才能尝试消耗
								let orderInfo = this.checkOutLocalOrder(info.purchaseToken, info.payWay)
								let config = this._parent.chargeconfig.find(cfg => cfg.id == info.goodsId)
								let isOrderNotApplyed = (!orderInfo || orderInfo.state == OrderState.unknown)
								if (isOrderNotApplyed && config) {
									queryAwaitList.push(genQueryAwait(info, config))
								}
							}
						}
					}
				}

				let filterConsumeList = () => {
					for (let info of diffList) {
						if (info.purchaseToken) {
							if (info.state == OrderState.ok || info.state == OrderState.fail) {
								// 只有成功、失败订单才能尝试消耗
								let p = gdk.consumePurchase({ payWay: info.payWay, purchaseToken: info.purchaseToken })
								consumeAwaitList.push(p)
								p.then((ret) => {
									if (ret.code == 0 || ret.code == 8) {
										// 只有已消耗成功的订单才进行合并
										consumedList.push(info)
									}
								}, (err) => {
									log.warn("消耗订单失败", info, err)
								})
							}
						} else {
							consumedList.push(info)
						}
					}
				}

				let mergeList = () => {
					// 过滤未消耗的订单
					diffList = consumedList

					let mergeOk: boolean = false
					try {
						this.mergeOrderList(diffList, { isMakingUpOrder: true }, (result, diffExist, needSync) => {
							log.info('mergeOrderList success', diffList)
							log.info('合并后本地订单:', this.getPrettyLocalRechargeRecords())

							mergeOk = true
							makeupResult.isMergeOk = mergeOk
							makeupResult.isDiffExist = diffExist

							onMergeSucceed()

							if (needSync) {
								log.info('校验前后存在要补发的差异,需要上传存档')
								this.syncStorage()
							} else {
								log.info('本次订单校验,没有生成要补发的差异订单,不上传存档')
								payDeps.storage.saveToLocalStorage();//立即同步保存
							}

						}, () => {
							log.info('mergeOrderList failed', diffList)
							onMergeFailed()
						})
					} catch (e) {
						log.error('合并订单历史出现异常,合并结果:', mergeOk)
						log.error(e)
						if (!mergeOk) {
							onMergeFailed()
						} else {
							// 已经调用过 onMergeSucceed()
						}
					}
				}
				(async () => {
					filterUnconsumedList()
					try {
						await waitAllFinish(unconsumedAwaitList)
					} catch (e) {
					} finally {
						filterQueryList()
					}
					try {
						await waitAllFinish(queryAwaitList)
					} catch (e) {
					} finally {
						filterConsumeList()
					}
					try {
						await waitAllFinish(consumeAwaitList)
					} catch (e) {
					} finally {
						mergeList()
					}
				})()
			}, () => {
				log.info('reqDiffOrderList failed', time)
				onMergeFailed()
			})

		}

		// 请求服务器创建并回发订单信息
		genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function) {
			setTimeout(() => {
				super.genOrder(config, extra, successCallback, failCallback)
			}, 0)
		}
	}

}
