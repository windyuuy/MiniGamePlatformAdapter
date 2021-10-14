class LogBridge {

	/**
	 * 自定义日志
	 */
	static logCustomEvent(key: string, params: { [key: string]: string }) {
		SDKProxy.callAction("AppsFlyerSDK:logCustomEvent", JSON.stringify({ key, params }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logLogin(type: LoginType, userId: number) {
		SDKProxy.callAction("AppsFlyerSDK:logLogin", JSON.stringify({ type, userId }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logRegister(type: LoginType) {
		SDKProxy.callAction("AppsFlyerSDK:logRegister", JSON.stringify({ type }), (data) => { })
	}


	/**
	 * 自定义日志
	 */
	static logRequestPay(id: string, price: number, count: number, currency: string) {
		SDKProxy.callAction("AppsFlyerSDK:logRequestPay", JSON.stringify({ id, price, count, currency }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logPurchased(id: string, revenue: number, price: number, count: number, currency: string, succ: boolean) {
		SDKProxy.callAction("AppsFlyerSDK:logPurchased", JSON.stringify({ id, revenue, price, count, currency, succ }), (data) => { })
	}

}