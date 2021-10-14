
namespace QQMiniAppGDK.PayFlow {

	export class CustomPayRequests extends GDK.PayFlow.PayRequestsNormal {

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
			let path = "order/getOrderStatus"
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
			let path = "order/getOrderList"

			this.client.request(path, data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}
	}

}
