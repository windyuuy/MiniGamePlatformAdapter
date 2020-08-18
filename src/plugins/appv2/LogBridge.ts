
namespace UnityAppGDK {
	export class LogBridge {

		protected static getAnalytics(): CS.Glee.Bridge.AnalyticsAddonWrapper {
			return nativeManager.getWrapper().analytics;
		}
		protected static getAdTracking(): CS.Glee.Bridge.AdTrackingAddonWrapper {
			return nativeManager.getWrapper().adTracking;
		}

        protected static isSupport() : boolean {
            return nativeManager.isSupport();
        }
		/**
		 * 自定义日志
		 */
		static logCustomEvent(key: string, params: { [key: string]: string }) {
			if (!this.isSupport()) {
				console.log("不支持LogBridge模块");
				SDKProxy.logAction("logCustomEvent => key:" + key + "\tdata:" + JSON.stringify(params));
				return;
			}
			var data = {} as CS.Glee.Bridge.SimpleLogCustomEventParams;
			data.key = key;
			data.data = JSON.stringify(params);
			this.getAnalytics().LogCustomEvent(data, new TaskCallback<CS.Glee.Bridge.LogEventResult>({
				onSuccess: (data) => {

				},
				onFailed: (err) => {

				},
			}));
		}

		/**
		 * 自定义日志
		 */
		static logLogin(type: LoginType, userId: number) {
			if (!this.isSupport()) {
				console.log("不支持LogBridge模块");
				SDKProxy.logAction("logLogin => type:" + type + "\tuserId:" + userId);
				return;
			}
			let data = {} as CS.Glee.Bridge.LogLoginParams;
			data.type = type;
			data.userId = "" + userId;
			this.getAdTracking().OnLogin(data, new TaskCallback<CS.Glee.Bridge.LogEventResult>({
				onSuccess: (data) => {

				},
				onFailed: (err) => {
				},
			}));
		}

		/**
		 * 自定义日志
		 */
		static logRegister(type: LoginType) {
			if (!this.isSupport()) {
				console.log("不支持LogBridge模块");
				SDKProxy.logAction("logRegister => type:" + type);
				return;
			}
			
			let data = {} as CS.Glee.Bridge.LogRegisterParams;
			data.type = type;
			data.userId = "";
			this.getAdTracking().OnRegister(data, new TaskCallback<CS.Glee.Bridge.LogEventResult>({
				onSuccess: (data) => {
				},
				onFailed: (err) => {
				},
			}));
		}


		/**
		 * 自定义日志
		 */
		static logRequestPay(id: string, price: number, count: number, currency: string) {
			if (!this.isSupport()) {
				console.log("不支持LogBridge模块");
				SDKProxy.logAction("logRequestPay => id:" + id + "    price:" + price + "    count:" + count + "    currency:" + currency);
				return;
			}
			var data = {} as CS.Glee.Bridge.LogRequestPayParams;
			data.name = "";
			data.userId = id;
			data.count = count;
			data.price = price;
			data.currency = currency;
			this.getAdTracking().OnRequestPay(data, new TaskCallback<CS.Glee.Bridge.LogEventResult>({
				onSuccess: (data) => {

				},
				onFailed: (err) => {
				},
			}));
		}

		/**
		 * 自定义日志
		 */
		static logPurchased(id: string, revenue: number, price: number, count: number, currency: string, succ: boolean) {
			if (!this.isSupport()) {
				console.log("不支持LogBridge模块");
				return;
			}
			var data1 = {} as CS.Glee.Bridge.LogPurchasedParams;
			data1.succeed = succ;
			data1.userId = id;
			data1.count = count;
			data1.price = price;
			data1.currency = currency;
			data1.revenue = price;
			this.getAdTracking().OnPurchased(data1, new TaskCallback<CS.Glee.Bridge.LogEventResult>({
				onSuccess: (data) => {

				},
				onFailed: (err) => {
				},
			}));
		}

	}
}