/// <reference path="../PayFlowStatus.ts" />

namespace GDK.PayFlow.APayBase {
	const mdebug = window['wdebug'] && true

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 基本支付流程
	 */
	export class PayFlow implements IPayFlow {

		payFlowName = "APayBase"

		_status: PayFlowStatus = new PayFlowStatus()

		protected get _parent() {
			return this._status._parent
		}
		protected set _parent(value: Parent) {
			this._status._parent = value
		}

		protected get _isRecharging() {
			return this._status._isRecharging
		}
		protected set _isRecharging(value: boolean) {
			this._status._isRecharging = value
		}

		protected get _rechargeBlockLayerIndex() {
			return this._status._rechargeBlockLayerIndex
		}
		protected set _rechargeBlockLayerIndex(value: [number, string]) {
			this._status._rechargeBlockLayerIndex = value
		}

		get isPayCallbackValid(): boolean {
			return true
		}

		constructor() {
			this.init()
		}

		init(){
			this._rechargeBlockLayerIndex = [payNetClient.client.getLoadingIndex(), 'payflow://index.html']
		}

		initConfig(parent: Parent) {
			this._parent = parent
		}

		initListener(onShow?: (callback: Function) => void) {
			if (onShow) {
				log.info('设置自定义补单监听')
				onShow(() => {
					if (gdk.gameInfo.requireMiniAppPay || gdk.gameInfo.requireCustomServicePay || gdk.gameInfo.requireIndiaSPSPay) {
						// 小程序跳转支付和客服跳转支付才需要每次切换回来补单
						this.pullDiffOrders(() => { })
					}
				})
			} else {
				log.info('设置补单监听')
				gdk.onShow(() => {
					log.info('程序切回前台 paybase', gdk.gameInfo.requireMiniAppPay, gdk.gameInfo.requireCustomServicePay)
					if (gdk.gameInfo.requireMiniAppPay || gdk.gameInfo.requireCustomServicePay || gdk.gameInfo.requireIndiaSPSPay) {
						// 小程序跳转支付和客服跳转支付才需要每次切换回来补单
						this.pullDiffOrders(() => { })
					}

					this.disableRechargeBlock()
				})
			}
		}

		// 充值屏蔽层
		enableRechargeBlock() {
			if (this._isRecharging) {
				return false
			}
			this._isRecharging = true

			if (!payNetClient.client.showModalCallback) {
				console.error('no such showModalCallback set!!!')
			}
			payNetClient.client.showModalCallback(...this._rechargeBlockLayerIndex)
			return true
		}
		// 取消充值屏蔽层
		disableRechargeBlock() {
			this._isRecharging = false

			if (!payNetClient.client.showModalCallback) {
				console.error('no such showModalCallback set!!!')
			}
			payNetClient.client.closeModalCallback(...this._rechargeBlockLayerIndex)
		}

		// 获取合适的历史订单检查点时间
		getHistoryCutline(): number {
			// 0表示本地没有历史订单,需要服务器全数返回
			let reqTime = 0

			let targets = this.paysdk.orderRecordList
			// 从本地历史清单中找到最早的未知订单,或最晚的已完成/失败订单
			let imcompletes = targets.filter((a, b) => a.state == OrderState.unknown)
			let oldestImcomplete = imcompletes.min(info => info.time)

			let latestImcomplete: OrderRecord = null
			if (!oldestImcomplete) {
				let completes = targets.filter(info => info.state != OrderState.unknown)
				latestImcomplete = completes.max(info => info.time)
			}

			if (oldestImcomplete) {
				// 不减1,服务器只会返回该时间点之后的订单,那么这个订单就永远得不到校验
				reqTime = oldestImcomplete.time - 1000
			} else if (latestImcomplete) {
				reqTime = latestImcomplete.time
			}

			return reqTime
		}

		/**
		 * 获取尽量早的订单同步时间点
		 */
		getLastOrdersSyncTime() {

			let reqTime = this.getHistoryCutline()
			if (isNaN(reqTime)) {
				reqTime = 0
			}

			// 避免补单流程挪到游戏内之后，导致补单时间点滞后，导致老的已完成订单补不到问题。
			let lastOrdersSyncTime = this.paysdk.lastOrdersSyncTime
			if (reqTime < lastOrdersSyncTime) {
				this.paysdk.lastOrdersSyncTime = reqTime
				lastOrdersSyncTime = reqTime
			}
			if (reqTime > lastOrdersSyncTime) {
				reqTime = lastOrdersSyncTime
			}

			return reqTime
		}

		/**
		 * 仅在补单成功之后，立即更新最早未知订单时间点，用于同步订单
		 */
		updateLastOrdersSyncTime() {
			let reqTime = this.getHistoryCutline()
			if (isNaN(reqTime)) {
				reqTime = 0
			}

			this.paysdk.lastOrdersSyncTime = reqTime
		}

		/**
		 * 以可读形式打印订单信息
		 */
		getPrettyLocalRechargeRecords() {
			return this.paysdk.orderRecordList
				.map(info => {
					return {
						time: info.time,
						state: info.state,
						orderno: info.orderno,
						Money: info.Money,
						Amt: info.Amt,
					}
				})
		}

		// 校验历史订单
		public pullDiffOrders(successCallback: (result: MakeupOrdersResult) => void, failCallback?: Function) {

			log.info('开始校验订单历史')

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

			let time = this.getLastOrdersSyncTime()
			log.info('订单检查点时间:', time)
			//log.info('本地订单:', this.getPrettyLocalRechargeRecords())
			this.reqDiffOrderList({ time: time, }, (diffList) => {
				log.info('reqDiffOrderList success', time, diffList)

				// 过滤掉谷歌支付和ios支付等需要消耗中间物品的订单
				diffList = diffList.filter(info => info.purchaseToken == null)

				// for(let info of diffList){
				// 	info.state=OrderState.ok
				// }

				let mergeOk: boolean = false
				try {
					this.mergeOrderList(diffList, { isMakingUpOrder: true }, (result, diffExist, needSync) => {
						log.info('mergeOrderList success', diffList)
						log.info('合并后本地订单:', this.getPrettyLocalRechargeRecords())

						mergeOk = true
						makeupResult.isMergeOk = mergeOk
						makeupResult.isDiffExist = diffExist

						onMergeSucceed()

						this.updateLastOrdersSyncTime()

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
			}, () => {
				log.info('reqDiffOrderList failed', time)
				onMergeFailed()
			})

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
				payStatistic.commitGSDevLog({ index: 5, eventName: "onPayOk " });
				this.disableRechargeBlock()
				try {
					log.info('支付成功')
					payStatistic.commitGSDevLog({ index: 6, eventName: "payok callback " });
					if (!successCallback) {
						payStatistic.commitGSDevLog({ index: 7, eventName: "successCallback function error " });
					}
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
					this.checkOrderState({ orderno, extra, config }, (state) => {
						log.info('checkOrderState success, order state:', orderno, state, extra)
						log.info(`服务器校验订单状态（1成功，2失败，0未知）：${state}`)

						payStatistic.commitGSDevLog({ index: 2, eventName: "checkOrderState: " + state });
						// 用于判定合并阶段是否成功
						let mergeOk: boolean = false
						let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra && extra.extra.purchaseToken || '' }
						try {
							this.mergeOrderList([record], { isMakingUpOrder: false }, (result, diffExist, needSync) => {
								log.info('mergeOrderList success', orderno)
								mergeOk = true

								payStatistic.commitGSDevLog({ index: 4, eventName: "mergeOrderList over " });
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
					}, () => {
						log.info('checkOrderState failed', orderno)
						onContinueFailed()
					})
				}

				this.commitPayLog('OnPayStart', config, orderInfo)
				this.payAPICall(config, orderInfo, (extra: wxPayState) => {
					log.info('payApiPay success', orderno)

					payStatistic.commitGSDevLog({ index: 1, eventName: "start checkRechargeOrder" });
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

		getCoinId(config: RechargeConfigRow): number {
			let itemId = config.coinId
			return itemId
		}

		// 请求服务器创建并回发订单信息
		genOrder(config: RechargeConfigRow, extra: any, successCallback: (orderInfo: OrderInfo) => void, failCallback?: Function) {
			payNetClient.orderGenOrder({
				payWay: config.payWay,
				price: config.price,
				priceCNY: config.priceCNY,
				priceUSD: config.priceUSD,
				quantity: config.money,
				goodsId: config.id,
				title: config.title,
				districtId: extra && extra.customExtra || null,
				itemId: this.getCoinId(config),
				qqGoodid: config.productId,
				token: (gdk.userData as any).token,
				others: (config as PaymentParams).others,
				// channelId: this._parent.channelId,
				extra: extra,
				customKey: (config as PaymentParams).customKey,
			}, data => {
				if (data.succeed) {
					log.info("订单获取成功", data)
					data.data.payWay = config.payWay
					successCallback(data.data)
				} else {
					failCallback()
					if (gdk.pluginName === "oppo") {
						log.info("oppo请求订单失败")
						if (data.code && data.code == 501) {
							log.info("oppo 重新登录")
							// oppo 游客账号需要登录
							// let res = new Login({}).logic(null);
							payDeps.login()
						}
					}

				}
			}, true, (err, retry) => {
				log.info("请求订单失败", err);
				failCallback()
			})
		}

		hintPayAPIErrorCode(errCode: number) {
			let msgMap = {
				35308: "道具没有配置",
				35311: "道具已下架",
				35312: "绝版道具已过期",
				35313: "用户已经拥有该道具",
				35315: "所选的道具有多种货货类型",
				35316: "用户货币余额不足",
			}
			let msg = msgMap[errCode]
			log.info(`errCode: ${errCode}, msg: ${msg}`)
			if (mdebug && msg) {
				setTimeout(() => {
					gdk.showToast({ title: msg })
				})
			}
		}

		// 提交充值日志
		commitPayLog(key: string, config: PaymentParams, orderInfo: OrderInfo) {
			try {
				payStatistic.commitLog(key, config, orderInfo)
			} catch (e) {
				log.error("提交支付统计信息失败", e)
			}
		}

		// 调起gdk中充值api
		payAPICall(config: PaymentParams, orderInfo: any, successCallback: (res: wxPayState) => void, failCallback: (res: wxPayState) => void) {
			const item: RechargeConfigRow = config
			const options = config.options || {}
			const gleeZoneId = options.gleeZoneId
			const subTitle = options.subTitle
			const imagePath = options.imagePath
			const gameOrientation = slib.defaultValue(options.gameOrientation, 1)
			const payUrl: string = slib.defaultValue(options.payUrl, options.payUrl)
			const customExtra: string = slib.defaultValue(options.customExtra, null)

			try {
				log.info('ApiPay call payPurchase', JSON.stringify(item))
				log.info('ApiPay call orderInfo', JSON.stringify(orderInfo))
				let extraStr = ""
				if (config.payWay == "meituAppPay") {
					extraStr = orderInfo.payInfo
				} else if (gdk.pluginName == "gamepind") {
					extraStr = orderInfo.payInfo
				} else if (config.payWay == "UnifiedSdk") {
					extraStr = JSON.stringify({ outTradeNo: orderInfo.outTradeNo })
				} else {
					extraStr = orderInfo.alipayOrderInfo
				}

				const params: GDK.PayItemInfo = {
					goodsId: item.id,
					coinId: item.coinId,
					productId: item.productId,
					money: item.money,
					price: item.price,
					amount: item.amount,
					title: item.title,
					currencyUnit: "CNY",
					gleeOrderNo: orderInfo.outTradeNo,
					paySign: orderInfo.sign || orderInfo.accessKey,
					orderNo: orderInfo.platOrderNo || orderInfo.vivoOrderNumber,
					timestamp: orderInfo.timeStamp || orderInfo.createTime,
					prepayId: orderInfo.prepayId,
					channelAppId: orderInfo.appid,
					partnerId: orderInfo.mch_id,
					nonceStr: orderInfo.nonce_str,
					extraStr: extraStr,
					vivoOrderInfo: orderInfo.vivoOrderNumber,
					accountId: orderInfo.accountId,
					notifyUrl: orderInfo.notifyUrl,
					aliamount: orderInfo.amount,
					gameSign: orderInfo.game_sign
				}
				let channelType: GDK.ChannelType
				if (gdk.gameInfo.requireCustomServicePay) {
					channelType = "customer_service"
				} else if (gdk.gameInfo.requireMiniAppPay) {
					channelType = "miniapp"
				} else if (gdk.gameInfo.requireIndiaSPSPay) {
					channelType = "gamepind"
				} else {
					channelType = "origion"
				}

				var nativePayInfo = {
					gameOrientation: gameOrientation,
					payWay: config.payWay,
					channelType: channelType,
					gleeZoneId: gleeZoneId,
					payUrl: payUrl,
					subTitle: subTitle,
					imagePath: imagePath,
					customExtra: customExtra,
				}
				log.info("ApiPay payWay", config.payWay);
				gdk.payPurchase(params, nativePayInfo).then((data) => {
					log.info("ApiPay充值结果", 0, item);
					let errCode = 0
					if (errCode == 0) {
						log.info("ApiPay充值成功", item);
						successCallback({ errCode: errCode, state: OrderState.ok, extra: data.extra })
					} else {
						log.info("ApiPay充值失败", item);

						try {
							payStatistic.commitGSCommonLog({
								eventId: 20001,
								index: 3,
								eventName: "gdk.payPurchase",
								eventValue: JSON.stringify({
									reason: { errCode: errCode, state: OrderState.unknown, extra: data.extra },
									config: config,
									orderInfo: orderInfo,
									nativePayInfo: nativePayInfo,
								}),
							})
						} catch (e) {
							log.error(e)
						}

						failCallback({ errCode: errCode, state: OrderState.unknown, extra: data.extra })
					}
				}).catch((reason) => {
					try {
						payStatistic.commitGSCommonLog({
							eventId: 20001,
							index: 2,
							eventName: "gdk.payPurchase",
							eventValue: JSON.stringify({
								reason: reason,
								config: config,
								orderInfo: orderInfo,
								nativePayInfo: nativePayInfo,
							}),
						})
					} catch (e) {
						log.error(e)
					}

					if (reason.data) {
						const errCode = reason.data.extra.errCode
						const errMsg = reason.data.extra.errMsg
						log.warn("ApiPay充值失败", errCode, item, errMsg)
						this.hintPayAPIErrorCode(errCode)
						failCallback({ errCode: errCode, state: OrderState.unknown });
					} else {
						log.error('ApiPay充值期间异常:' + JSON.stringify(reason))
						console.error(reason)
						failCallback({ errCode: -101, state: OrderState.unknown })
					}
				})
			} catch (e) {
				try {
					payStatistic.commitGSCommonLog({
						eventId: 20001,
						index: 1,
						eventName: "gdk.payPurchase",
						eventValue: JSON.stringify({
							reason: e && e.toString(),
							config: config,
							orderInfo: orderInfo,
							nativePayInfo: nativePayInfo,
						}),
					})
				} catch (e) {
					log.error(e)
				}

				log.error('ApiPay充值期间异常:' + JSON.stringify(e))
				console.error(e)
				failCallback({ errCode: -101, state: OrderState.unknown })
			}
		}

		// 检查订单状态
		checkOrderState({ orderno, extra, config }: { orderno: string, extra: wxPayState, config: RechargeConfigRow }, successCallback: (state: number) => void, failCallback?: Function) {
			let nativePayData: { purchaseData?: string, dataSignature?: string } = {}
			if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
				try {
					nativePayData = typeof (extra.extra.data) == 'string' ? JSON.parse(extra.extra.data) : extra.extra.data
					log.info('原生支付订单验证信息:', nativePayData.purchaseData, nativePayData.dataSignature)
				} catch (e) {
					log.warn('获取原生支付订单验证信息失败', extra)
				}
			}

			payNetClient.orderCheckOrderState({
				payWay: config.payWay,
				outTradeNo: orderno,
				errCode: extra.errCode,
				state: extra.state,
				goodsId: config.id,
				gameId: gdk.gameInfo.gameId,
				openKey: gdk.userData.openKey,
				purchaseData: nativePayData && nativePayData.purchaseData,
				signature: nativePayData && nativePayData.dataSignature,
				// channelId: this._parent.channelId,
			}, (data) => {
				// 测试数据
				// if(false){
				//     data.succeed=true
				//     data.data=1
				// }
				if (data.succeed) {
					let state = data.data
					successCallback(state)
				} else {
					failCallback()
				}
			}, false, () => [
				failCallback()
			])
		}

		// 请求订单清单
		reqDiffOrderList({ time }: { time: number }, successCallback: (result: OrderInfo[]) => void, failCallback?: Function) {
			log.info("[APayBase]reqDiffOrderList:")
			payNetClient.orderReqDiffOrderList({
				time: time,
				gameId: gdk.gameInfo.gameId,
				openKey: gdk.userData.openKey,
				// purchaseData: {},
				purchaseData: null,
			}, (data) => {
				if (data.succeed) {
					let recordInfos = data.data
					successCallback(recordInfos)
				} else {
					failCallback()
				}
			}, false, () => {
				failCallback()
			})
		}

		/**
		 * 求出差异的订单列表
		 * @param infos 输入订单列表
		 * @param targets 现存订单列表
		 * @param chargeconfig 配表
		 */
		diffOrderList(infos: OrderInfo[], targets: OrderRecord[], chargeconfig: RechargeConfigRow[]): { result: OrderInfo[], diffExist: boolean, needSync: boolean } {
			let diffExist = false
			// 有补发的时候才同步
			let needSync = false
			// 存在差异的订单
			let result: OrderInfo[] = []
			for (let remoteInfo of infos) {
				let localInfo = targets.find(info => info.orderno == remoteInfo.outTradeNo)
				// 本地不存在的订单,如果服务器列表中变为存在并且不成功,则加入这一单到本地历史订单中
				// 本地非成功或不存在的订单,如果服务器列表中变为存在并且成功,则表示这一单变为成功
				// 本地未知的订单如果服务器中为失败,则回滚
				// 如果两者同时存在并且都不成功,则把本地的重置为服务器的状态
				if (!localInfo) {
					const config = chargeconfig.find(info => info.id == remoteInfo.goodsId)
					targets.push(new OrderRecord(remoteInfo, OrderState.unknown, config))
					if (remoteInfo.state == OrderState.ok) {
						log.warn('查询到本地不存在的订单', remoteInfo.outTradeNo)
						log.warn('需要补发道具', remoteInfo.outTradeNo)
						diffExist = true
						needSync = true
						result.push(remoteInfo)
					} else {
						// 保存好收到的本地不存在的不成功订单之后,不作其他处理
					}
				} else {
					if (localInfo.state == OrderState.ok) {
						if (remoteInfo.state == OrderState.fail) {
							// 需要回档
							log.error('需要回滚订单', remoteInfo, localInfo)
							diffExist = true
							result.push(remoteInfo)
						} else if (remoteInfo.state == OrderState.unknown) {
							// 本地应用过的订单,服务器状态未知,那么不作处理
							log.warn('未确定的已应用订单', localInfo.orderno)
						} else {
							// 本地应用过的同状态订单,不作处理
						}
					} else {
						if (remoteInfo.state == OrderState.ok) {
							// 由非成功变为成功,则加入返回
							log.info(`local order <${localInfo.orderno}> will set state: ${localInfo.state} => ${remoteInfo.state}`)
							log.warn('需要补发道具', localInfo.orderno)
							diffExist = true
							needSync = true
							result.push(remoteInfo)
						} else {
							if (localInfo.state != remoteInfo.state) {
								log.info(`local order <${localInfo.orderno}> set state: ${localInfo.state} => ${remoteInfo.state}`)
								diffExist = true
								localInfo.state = remoteInfo.state
							} else {
								// 本地和服务器状态相同,不作处理
							}
							// 都表示没有完成订单,则不作其他处理
						}
					}
				}
			}

			return { result: result, diffExist: diffExist, needSync: needSync }
		}

		// 应用有差异的订单列表，有需要补发的补发，需要回滚的暂时不作回滚处理
		applyOrderList(infos: OrderInfo[], options: PaymentMergeOptions) {
			for (let remoteInfo of infos) {
				const config = this._parent.chargeconfig.find(info => info.id == remoteInfo.goodsId)
				if (remoteInfo.state == OrderState.ok) {
					log.warn('存在成功的差异订单,正在发送道具', remoteInfo.outTradeNo)
					this.applyOrder(remoteInfo, config, options)
					log.info('补发完成', remoteInfo.outTradeNo)

					// PayRecords 已经加过，此处不需要再加
					// //log order
					// gdk.commitChannelsLog("Paid", {
					// 	id: config.productId,
					// 	count: config.amount,
					// 	currency: "$",
					// 	price: config.money || config.price,
					// 	succ: true,
					// })

				} else if (remoteInfo.state == OrderState.fail) {
					log.warn('存在实际上失败的已生效订单,暂时不回扣道具')
					this.paysdk.deapplyRecord(remoteInfo, config)
				} else {
					log.error('其中不应该有未知订单')
				}
			}
		}

		// 合并订单历史
		mergeOrderList(infos: OrderInfo[], options: PaymentMergeOptions, successCallback: (result: OrderInfo[], diffExist: boolean, needSync: boolean) => void, failCallback?: Function) {
			let { result, diffExist, needSync } = this.diffOrderList(infos, this.paysdk.orderRecordList,this._parent.chargeconfig)
			this.applyOrderList(result, options)
			log.info('订单合并完成,开始充值回调')
			payStatistic.commitGSDevLog({ index: 3, eventName: "mergeOrderList sync: " + needSync });
			successCallback(result, diffExist, needSync)
		}

		// 同步存档
		syncStorage(successCallback?: Function, failCallback?: Function) {
			log.info('GameProxy.backupSave')

			successCallback = successCallback || (() => { })
			failCallback = failCallback || (() => { })
			payDeps.storage.saveToLocalStorage();//立即同步保存
			payDeps.storage.backup()

			log.info('自动备份重新开始计时')
			payDeps.storage.rescheduleBackup()
		}

		// 保存订单
		saveOrder(orderInfo: OrderInfo, config: RechargeConfigRow) {
			this.paysdk.addRecord(orderInfo, config)
		}

		applyOrder(orderInfo: OrderInfo, config: RechargeConfigRow, options: PaymentMergeOptions) {
			log.info('应用成功订单:', orderInfo, config, options)
			this.paysdk.applyRecord(orderInfo, config, options)
		}

		/**
		 * 检查充值是否已经购买
		 * @@export
		 * @param config 配置信息
		 */
		public isItemBoughtEver(config: RechargeConfigRow): boolean {
			return this.paysdk.isItemBoughtEver(config)
		}

		get paysdk() {
			return PayRecords.saved
		}

		get orderRecordList(): OrderRecordExported[] {
			return PayRecords.saved.orderRecordList.map(info => {
				let clone: OrderRecordExported = {
					orderno: info.orderno,
					state: info.state,
					time: info.time,
					id: info.Id,
					money: info.Money,
					amount: info.Amt,
					itemName: info.ItemName,
					userId: info.userId,
				}
				return clone as OrderRecordExported
			})
		}

	}
}
