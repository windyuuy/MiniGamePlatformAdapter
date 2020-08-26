
namespace GDK.PayFlow {
	export interface IGameClient {
		getLoadingIndex: () => number;
		showModalCallback: (index: number, url: string) => void
		closeModalCallback: (index: number, url: string) => void
		request(action: any, data: any, callback: (data: any) => void, ps: {
			version?: number;
			tag?: string;
			name?: string;
			modal?: boolean;
			downloadProgress?: (loaded: number, total: number) => void;
			uploadProgress?: (loaded: number, total: number) => void;
			errorCallback?: (error: any, retry: () => void) => void;
			customUrl?: string;
		}): void
	}

	export class PayNetClient {
		get client(): IGameClient {
			return payDeps.gameClient
		}


		/**
		 * 请求服务器生成订单
		 * @param data 
		 * @param callback 
		 * @param modal 
		 * @param errorCallback 
		 */
		orderGenOrder(
			data: {
				payWay: PayFlow.PayWay,
				price?: number,//商品实际付款价格
				priceCNY: number,//人民币价格
				priceUSD: number,//美元价格
				quantity: number,//消费金额
				goodsId: number,//商品id
				title: string,//商品标题
				itemId: number, //二级货币ID
				districtId?: string,//分服ID，用于统计
				qqGoodid?: string,//新手q商品id
				token?: string,
				// channelId?: string, //支付平台或渠道（不是发行渠道）
				extra?: Object,
				others?: Object, //!!!其他请求订单需要的参数，前面没有请放在 others 对象里面
				customKey?: string,
			},
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: PayFlow.OrderInfo, //订单信息
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			(async () => {
				let path = 'order/createOrder'
				if (payDeps.api.pluginName == 'app' || payDeps.api.pluginName == 'appv2') {
					if (data.payWay == "WechatPay") {
						path = 'order/wx/createWxAppOrder'
					} else if (data.payWay == "AliPay") {
						path = 'alipay/createOrder'
					} else if (data.payWay == "VivoAppPay") {
						path = 'vivo/createOrder'
						let metaInfo = await payDeps.api.getSDKMetaInfo({ key: "vivo:SDKVersionCode" })
						if (metaInfo != null && metaInfo.version == 2) {
							path = "vivo/app/createOrder"
						}
					} else if (data.payWay == "OppoApp") {
						path = 'order/createOrder'
					} else if (data.payWay == "BaiduAppPay") {
						path = 'order/createOrder'
					} else if (data.payWay == "YYBPay") {
						path = 'order/createOrder'
					} else if (data.payWay == 'AliGameAppPay') {
						path = 'jy/createOrder'
					} else if (data.payWay == "meituAppPay") {
						path = 'mt/createOrder'
					} else if (data.payWay == "xiao7") {
						path = 'x7/createOrder'
					} else if (data.payWay == "IosPay") {
						path = 'order/createOrder';
					}
				} else if (payDeps.api.pluginName == 'oppo') {
					path = 'oppok/createOrder'
					data["userToken"] = (payDeps.api.userData as any).token
				} else if (payDeps.api.pluginName == 'qqminiapp') {
					path = 'qqn/createOrder'
				} else if (payDeps.api.pluginName == 'vivo') {
					path = 'vivo/createOrder'
				} else if (payDeps.api.pluginName == 'gamepind') {
					path = 'pind/createOrder'
				}
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
			data: {
				payWay: PayFlow.PayWay,
				quantity?: number,//消费金额
				goodsId?: number,//商品id
				title?: string,//商品名称
				state?: 2 | 1 | 0,//0未知 1成功 2失败
				errCode?: number,//错误码
				gameId?: number
				openKey?: string
				outTradeNo: string//客户端自己形成的唯一订单标识

				// 谷歌支付返回信息
				purchaseData?: string
				signature?: string

				// channelId?: string //支付平台或渠道（不是发行渠道）
			},
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: 0 | 1//0未充值 1已充值
			}) => void, modal: boolean = false, errorCallback: (error: any, retry: () => void) => void = null) {

            /**
             * 不同游戏平台 url path
             */
			const pluginPathMap = {
				'develop': {
					normal: "order/wx/synchronizeWxOrder"
				},
				// 微信小游戏
				'wechat': {
					normal: "order/wx/synchronizeWxOrder"
				},
				'qqplay': {
					normal: 'order/synchronizeQQOrder'
				},
				// oppo小游戏
				'oppo': {
					normal: 'order/getOrderStatus'
				},
				// vivo小游戏
				'vivo': {
					normal: 'order/getOrderStatus'
				},
				// app版默认配置
				'app': {
					normal: 'order/gg/synchronizeGGOrder',
					// android默认用谷歌支付
					android: 'order/gg/synchronizeGGOrder',
					// ios默认用ios支付
					ios: 'order/apple/synchronizeAppleOrder',
				},
				// app版默认配置
				'appv2': {
					normal: 'order/gg/synchronizeGGOrder',
					// android默认用谷歌支付
					android: 'order/gg/synchronizeGGOrder',
					// ios默认用ios支付
					ios: 'order/apple/synchronizeAppleOrder',
				},
				'qqminiapp': {
					normal: 'order/getOrderStatus'
				},
				'gamepind': {
					normal: 'order/getOrderStatus'
				}

			}
            /**
             * app版细分不同渠道下 url path
             */
			const appChannelPathMap = {
				'WechatPay': {
					normal: 'order/getOrderStatus',
				},
				'UnifiedSdk': {
					normal: 'order/getOrderStatus',
				},
				'xiao7': {
					normal: 'order/getOrderStatus',
				},
				'OppoApp': {
					normal: 'order/getOrderStatus',
				},
				'VivoAppPay': {
					normal: 'order/getOrderStatus',
				},
				'BaiduAppPay': {
					normal: 'order/getOrderStatus',
				},
				'YYBPay': {
					normal: 'yyb/synchronizeYybOrder',
				},
				'AliGameAppPay': {
					normal: 'order/getOrderStatus',
				},
				'meituAppPay': {
					normal: 'order/getOrderStatus',
				},
				'AliPay': {
					normal: 'order/getOrderStatus',
				},
				'IosPay': {
					normal: 'order/apple/synchronizeAppleOrder',
				},
			}
			let pathInfo = pluginPathMap[payDeps.api.pluginName]
			let path = pathInfo.normal
			// 细分app渠道
			if ((payDeps.api.pluginName == 'app' || payDeps.api.pluginName == 'appv2') && (!!appChannelPathMap[data.payWay])) {
				const payWay = data.payWay
				path = appChannelPathMap[payWay].normal || appChannelPathMap['default'].normal
			} else if (payDeps.api.platform == "android") {
				path = pathInfo.android || path
			} else if (payDeps.api.platform == "ios") {
				path = pathInfo.ios || path
			}
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
			data: {
                /*
                 * 历史订单检查点时间
                 *  如果为0,则返回全部历史订单
                 *  如果不为0,则返回该时间点之后的所有历史订单
                 */
				gameId: number
				openKey: string
				time: number,
				state?: number, // 用于按状态过滤订单
				purchaseData: any,
			},
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: PayFlow.OrderInfoRaw[], // 历史订单列表
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			const pluginPathMap = {
				'develop': {
					normal: "order/wx/getWxOrderList",
					thirdApp: "order/getOrderList",
				},
				'wechat': {
					normal: "order/wx/getWxOrderList",
					thirdApp: "order/getOrderList",
				},
				'qqplay': {
					normal: "order/getQQOrderList",
				},
				'oppo': {
					normal: "order/getOrderList",
				},
				'vivo': {
					normal: "order/getOrderList",
				},
				'YYB': {
					normal: "yyb/getYybOrderList",
				},
				'app': {
					normal: "order/getOrderList",
				},
				'qqminiapp': {
					normal: "order/getOrderList",
				},
				'gamepind': {
					normal: "order/getOrderList",
				}
			}
			let info = pluginPathMap[payDeps.api.pluginName]
			if ((payDeps.api.pluginName == 'app' || payDeps.api.pluginName == 'appv2') && payDeps.api.systemInfo.packageTag == "yingyongbaoApp") {
				info = pluginPathMap['YYB']
			}
			let path = ''
			if (payDeps.api.requireMiniAppPay || payDeps.api.requireCustomServicePay) {
				path = info.thirdApp
				data.state = 1

				if (!path) {
					console.error(`充值配置不正确，生成参数异常，检查 requireMiniAppPay 值是否正确，当前值：${payDeps.api.requireMiniAppPay}`)
					path = info.normal
				}
			} else {
				path = info.normal
			}

			this.client.request(path, data, (data) => {
				// if (true) {
				//     data.succeed = true
				//     data.code = 0
				//     data.data = [
				//         { createTime: 1530360114000, goodsId: 1, id: null, outTradeNo: "20002_209_1530360114388", quantity: 1, state: 1, time: 1530360114000, title: "com.farm.p60", userId: 209 }
				//     ]
				// }
				if (data.succeed && (data.data instanceof Array)) {
					for (let info of data.data) {
						info.time = info.createTime
						if (info.extra) {
							try {
								info.extra = JSON.parse(info.extra)
								info.purchaseToken = info.extra.purchaseToken
							} catch (e) {
								console.error("orderReqDiffOrderList::parse extra failed:", info.extra)
							}
						}
					}
				}
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}
	}

	export const payNetClient = new PayNetClient()

}
