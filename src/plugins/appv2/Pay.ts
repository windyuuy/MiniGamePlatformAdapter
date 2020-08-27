

namespace AppV2GDK {

	const paylog = Common.paylog

	export class Pay extends GDK.PayBase {
		protected payFlow: PayFlow.PayFlowMG

		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowMG().init(this.api)
			return this.payFlow
		}

		api!: GDK.UserAPI

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

			let info: CS.Glee.Bridge.PayInfo = {
				productId: sku,
				price: config.money,
				count: config.amount,
				currency: config.currencyUnit,
				title: config.title,
				TAG: "",
				coopOrder: "",
				extra: {},
			}
			let extra = info.extra
			for (let key in config) {
				if (extra[key] == null) {
					extra[key] = config[key]
				}
			}
			for (let key in options) {
				if (extra[key] == null) {
					extra[key] = options[key]
				}
			}

			this.getAddon().Pay(info, new FTaskCallback<CS.Glee.Bridge.PayResult, CS.Glee.Bridge.PayErrorInfo>({
				onSuccess: (p: CS.Glee.Bridge.PayResult) => {
					let result: GDK.PayResult = {
						result: {
							errCode: p.code,
						},
						extra: p.data,
					}
					result.extra.data = p.data.extra;
					ret.success(result)
				},
				onFailed: (e) => {
					ret.fail(e)
				}
			}));

			return ret.promise
		}


		/**
		 * 消耗商品
		 */
		async consumePurchase?(params: GDK.ConsumePurchaseParams): Promise<GDK.ConsumePurchaseResult> {
			const ret = new GDK.RPromise<GDK.ConsumePurchaseResult>();
			let info = {} as CS.Glee.Bridge.ConsumePurchaseInfo;
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
			let info = {} as CS.Glee.Bridge.QueryItemInfoSource;
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

		protected getAddon(): CS.Glee.Bridge.ShopAddonWrapper {
			return nativeManager.getWrapper().shop;
		}
	}
}