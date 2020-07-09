
namespace UnityAppGDK {

	const paylog = Common.paylog

	export class Shop extends GDK.PayBase {
		api?: GDK.UserAPI

		protected getAddon(): CS.Glee.Bridge.ShopAddonWrapper {
			return nativeManager.getWrapper().shop;
		}

		payPurchase(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()
			let sku = config.productId
			if (!sku) {
				const msg = 'payPurchase: productId 为空， 原生app需要传入productId'
				paylog.error(msg)
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
					message: msg
				}))
				return ret.promise
			}

			let info = new CS.Glee.Bridge.PayInfo();
			info.productId = sku,
			info.price = config.money,
			info.count = config.amount,
			info.currency = "dollar",
			info.title = config.title,
			info.TAG = "";
			info.coopOrder = "";
			info.extra = "";

			this.getAddon().Pay(info, new FTaskCallback<CS.Glee.Bridge.PayResult, CS.Glee.Bridge.PayErrorInfo>({
				onSuccess: (p : GDK.PayResult) => {
                    ret.success(p)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));



			// SDKProxy.nativePay.requestPay({
			// 	productId: sku,
			// 	sku: sku,
			// 	price: config.money,
			// 	count: config.amount,
			// 	currency: "dollar",
			// 	channelAppId: config.channelAppId,
			// 	packageValue: "Sign=WXPay",
			// 	nonceStr: config.nonceStr,
			// 	partnerId: config.partnerId,
			// 	paySign: config.paySign,
			// 	prepayId: config.prepayId,
			// 	timestamp: config.timestamp,
			// 	payWay: options.payWay,
			// 	extraStr: config.extraStr,
			// 	title: config.title,
			// 	orderNo: config.orderNo,
			// 	payUrl: options.payUrl,
			// 	gleeOrderNo: config.gleeOrderNo,
			// 	accountId: config.accountId,
			// 	notifyUrl: config.notifyUrl,
			// 	aliamount: config.aliamount,
			// 	gameSign: config.gameSign
			// }).then((payret) => {
			// 	if (payret.code == 0) {
			// 		paylog.info("原生充值成功", config)
			// 		ret.success({
			// 			result: {
			// 				errCode: 0,
			// 			},
			// 			extra: payret,
			// 		})
			// 	} else {
			// 		if (payret.code == UnityAppGDK.PayErrorCode.PURCHASE_CANCELLED) {
			// 			paylog.info("原生充值取消", payret, config)
			// 			ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
			// 		} else {
			// 			paylog.warn("原生充值失败", payret, config)
			// 			ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
			// 				data: {
			// 					extra: payret
			// 				}
			// 			}))
			// 		}
			// 	}
			// }, (payret) => {
			// 	ret.fail(payret)
			// })

			return ret.promise
		}


		/**
		 * 消耗商品
		 */
		async consumePurchase?(params: GDK.ConsumePurchaseParams): Promise<GDK.ConsumePurchaseResult> {
			const ret = new GDK.RPromise<GDK.ConsumePurchaseResult>();
			let info = new CS.Glee.Bridge.ConsumePurchaseInfo();
			info.payWay = params.payWay;
			info.purchaseToken = params.purchaseToken;
			this.getAddon().ConsumePurchase(info, new TaskCallback<CS.Glee.Bridge.ConsumePurchaseResult>({
				onSuccess: (p) => {
                    ret.success(p)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));
			return ret.promise;
		}
		/**
		 * 获取未消耗商品列表
		 */
		async queryItemInfo?(params: GDK.PayQueryItemInfoParams): Promise<GDK.PayQueryItemInfoResult> {

			let sku = params.productId
			if (!sku) {
				const msg = 'queryItemInfo: productId 为空， 原生app需要传入productId'
				paylog.error(msg)
				const ret = new GDK.RPromise<GDK.PayQueryItemInfoResult>()
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_QUERYITEMINFO_FAILED, {
					message: msg
				}))
				return ret.promise
			}
			const ret = new GDK.RPromise<GDK.PayQueryItemInfoResult>()
			let info = new CS.Glee.Bridge.QueryItemInfoSource();
			info.payWay = params.payWay;
			info.productId = params.productId;
			this.getAddon().QueryItemInfo(info, new TaskCallback<CS.Glee.Bridge.QueryItemInfoResult>({
				onSuccess: (p) => {
                    ret.success(p)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));

			return ret.promise
		}

	}
}