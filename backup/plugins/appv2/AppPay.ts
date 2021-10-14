


namespace AppV2GDK {

	const paylog = Common.paylog

	export class AppPay extends GDK.AppPayBase {
		api!: GDK.UserAPI

		protected getAddon(): CS.Glee.Bridge.ServedShopAddonWrapper {
			return nativeManager.getWrapper().servedShop;
		}
        public isSupport() : boolean {
            if (SDKProxy.getAppInfo(AppInfoKeys.unityEnv) == "UNITY_EDITOR") {
                console.log("编辑器环境不支持支付")
                return false
            }
            return nativeManager.isSupport();
        }

		payPurchaseApp(item: GDK.ServedPayInfo): Promise<GDK.ServedPayResult> {
			if (!this.isSupport()) {
				const ret = new GDK.RPromise<GDK.ServedPayResult>()
				ret.fail("当前模式不支持支付")
				return ret.promise;
			}
			const ret = new GDK.RPromise<GDK.ServedPayResult>()

			this.getAddon().Pay(item, new FTaskCallback<CS.Glee.Bridge.ServedPayResult, CS.Glee.Bridge.PayErrorInfo>({
				onSuccess: (p: CS.Glee.Bridge.ServedPayResult) => {
					ret.success(p)
				},
				onFailed: (e) => {
					ret.fail(e)
				}
			}));

			return ret.promise
		}
		checkOrderState?(params: GDK.CheckOrderStateInfo): Promise<GDK.CheckOrderStateResult> {
			if (!this.isSupport()) {
				const ret = new GDK.RPromise<GDK.CheckOrderStateResult>()
				ret.fail("当前模式不支持支付")
				return ret.promise;
			}
			const ret = new GDK.RPromise<GDK.CheckOrderStateResult>()

			this.getAddon().CheckOrderState(params, new FTaskCallback<CS.Glee.Bridge.CheckOrderStateResult, CS.Glee.Bridge.PayErrorInfo>({
				onSuccess: (p: CS.Glee.Bridge.CheckOrderStateResult) => {
					ret.success(p)
				},
				onFailed: (e) => {
					ret.fail(e)
				}
			}));

			return ret.promise
		}

		// payPurchase1(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
		// 	if (!this.isSupport()) {
		// 		const ret = new GDK.RPromise<GDK.PayResult>()
		// 		ret.fail("当前模式不支持支付")
		// 		return ret.promise;
		// 	}
		// 	const ret = new GDK.RPromise<GDK.PayResult>()
		// 	let sku = config.productId
		// 	if (!sku) {
		// 		const msg = 'payPurchase: productId 为空， 原生app需要传入productId'
		// 		paylog.error(msg)
		// 		ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
		// 			message: msg
		// 		}))
		// 		return ret.promise
		// 	}

		// 	let info: CS.Glee.Bridge.PayInfo = {
		// 		productId: sku,
		// 		price: config.money,
		// 		count: config.amount,
		// 		currency: config.currencyUnit,
		// 		title: config.title,
		// 		TAG: "",
		// 		coopOrder: "",
		// 		extra: {},
		// 	}
		// 	let extra = info.extra
		// 	for (let key in config) {
		// 		if (extra[key] == null) {
		// 			extra[key] = config[key]
		// 		}
		// 	}
		// 	for (let key in options) {
		// 		if (extra[key] == null) {
		// 			extra[key] = options[key]
		// 		}
		// 	}

		// 	this.getAddon().Pay(info, new FTaskCallback<CS.Glee.Bridge.PayResult, CS.Glee.Bridge.PayErrorInfo>({
		// 		onSuccess: (p: CS.Glee.Bridge.PayResult) => {
		// 			let result: GDK.PayResult = {
		// 				result: {
		// 					errCode: p.code,
		// 				},
		// 				extra: p.data,
		// 			}
		// 			result.extra.data = p.data.extra;
		// 			ret.success(result)
		// 		},
		// 		onFailed: (e) => {
		// 			ret.fail(e)
		// 		}
		// 	}));

		// 	return ret.promise
		// }
	}
}