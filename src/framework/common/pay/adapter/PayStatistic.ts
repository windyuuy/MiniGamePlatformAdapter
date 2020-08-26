
namespace GDK.PayFlow {
	export interface IGSStatistic {
		commitCommon(data: { index: number, eventName: string } | any): void

		commitDevlog(data: {
			/**
			 * 事件类型参考附录
			 * 1. 新手引导
			 * 2. 分享状态 点击、成功、失败
			 * 3. 用户等级
			 * * 后续自行扩展
			 */
			eventId: number,
			/**
			 * 排序索引
			 */
			index: number,
			/**
			 * 事件名称
			 */
			eventName: string
		} | any): void
	}

	export class PayStatistic {
		enableNativeLog: boolean = true
		enableGSLog: boolean = true

		get logCommitTool(): IGSStatistic {
			return payDeps.logCommitTool
		}

		commitLog(key: string, config: PaymentParams, orderInfo: OrderInfo) {

			if(!this.enableNativeLog){
				return
			}

			// gdk.commitChannelsLog("PayLog", {
			// 	id: config.productId,
			// 	count: config.amount,
			// 	currency: '',
			// 	price: config.money,
			// })

			config = config || {} as PaymentParams
			orderInfo = orderInfo || {} as OrderInfo
			gdk.commitLog(key, {
				id: `${config.id}`,
				money: `${config.money}`,
				price: `${config.price}`,
				// 人民币数值
				priceCNY: `${config.priceCNY}`,
				// 美元数值
				priceUSD: `${config.priceUSD}`,
				amount: `${config.amount}`,
				title: `${config.title}`,
				coinId: `${config.coinId}`,
				productId: `${config.productId}`,

				outTradeNo: `${orderInfo.outTradeNo}`,
				state: `${orderInfo.state}`,
				goodsId: `${orderInfo.goodsId}`,
				time: `${orderInfo.time}`,
				purchaseToken: `${orderInfo.purchaseToken}`,
			})
		}

		commitPaidLog(logType: string, config: PaymentParams, orderInfo: OrderInfo) {

			if (!this.enableNativeLog) {
				return
			}

			let price = config.priceUSD;
			let currency = "USD"

			if (config.priceUSD != null) {
				price = config.priceUSD
				currency = "USD"

			} else if (config.priceCNY != null) {
				price = config.priceCNY
				currency = "CNY"

			} else if (config.money != null) {
				price = config.money
				currency = "CNY"

			} else if (config.price != null) {
				price = config.price
				currency = "CNY"

			}

			//log order
			gdk.commitChannelsLog(logType, {
				id: config.productId,
				count: config.amount,
				currency: currency,
				price: price,
				succ: true,
			})
		}

		commitGSCommonLog(data: { index: number, eventName: string } | any): void {

			if (!this.enableGSLog) {
				return
			}

			return this.logCommitTool.commitCommon(data)
		}

		commitGSDevLog(data: {
			/**
			 * 事件类型参考附录
			 * 1. 新手引导
			 * 2. 分享状态 点击、成功、失败
			 * 3. 用户等级
			 * * 后续自行扩展
			 */
			eventId: number,
			/**
			 * 排序索引
			 */
			index: number,
			/**
			 * 事件名称
			 */
			eventName: string
		} | any): void {

			if (!this.enableGSLog) {
				return
			}

			return this.logCommitTool.commitDevlog(data)
		}
	}
	export const payStatistic = new PayStatistic()
}
