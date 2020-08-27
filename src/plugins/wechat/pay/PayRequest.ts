
namespace WechatGDK.PayFlow {

	export class WechatPayRequests extends GDK.PayFlow.PayRequestsNormal {

		get requireCustomServicePay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireCustomServicePay)
		}

		get requireMiniAppPay() {
			return payDeps.api.getAppInfoBoolean(AppInfoKeys.requireMiniAppPay)
		}

		/**
		 * 请求服务器生成订单
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderGenOrder(
			data: GenOrderParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: OrderInfo, //订单信息
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			(async () => {
				let path = 'order/createOrder'
				this.client.request(path, data, (data) => {
					if (data.succeed && (data.data instanceof Object)) {
						data.data.time = data.data.createTime
					}

					if (data.code == 800) {
						payDeps.api.showAlert({ okLabel: "确定", content: data.message, title: "提示" })
					}

					callback(data);
				}, { modal: modal, errorCallback: errorCallback })
			})();
		}

		/**
		 * 检查订单状态
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderCheckOrderState(
			data: CheckOrderStateParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: 0 | 1//0未充值 1已充值
			}) => void, modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {
			let path = "order/wx/synchronizeWxOrder"
			this.client.request(path, data, (data) => {
				if (payDeps.api.pluginName == "develop") {
					// 浏览器上模拟测试充值
					data.succeed = true
					data.code = 0
					data.data = Math.random() < 0.9 ? 1 : 2
				}
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

		/**
		 * 请求历史差异订单
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderReqDiffOrderList(
			data: ReqDiffOrderListParams,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: OrderInfoRaw[], // 历史订单列表
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			const pluginPathMap = {
				'wechat': {
					normal: "order/wx/getWxOrderList",
					thirdApp: "order/getOrderList",
				},
			}
			let path = pluginPathMap.wechat.normal
			if (this.requireMiniAppPay || this.requireCustomServicePay) {
				path = pluginPathMap.wechat.thirdApp
				data.state = 1
			}

			this.client.request(path, data, (data) => {
				// if (true) {
				//     data.succeed = true
				//     data.code = 0
				//     data.data = [
				//         { createTime: 1530360114000, goodsId: 1, id: null, outTradeNo: "20002_209_1530360114388", quantity: 1, state: 1, time: 1530360114000, title: "com.farm.p60", userId: 209 }
				//     ]
				// }
				// if (data.succeed && (data.data instanceof Array)) {
				// 	for (let info of data.data) {
				// 		info.time = info.createTime
				// 		if (info.extra) {
				// 			try {
				// 				info.extra = JSON.parse(info.extra)
				// 				info.purchaseToken = info.extra.purchaseToken
				// 			} catch (e) {
				// 				console.error("orderReqDiffOrderList::parse extra failed:", info.extra)
				// 			}
				// 		}
				// 	}
				// }
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}
	}

}
