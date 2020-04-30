namespace UnityAppGDK {
	export class LogBridge {

	/**
	 * 自定义日志
	 */
	static logCustomEvent(key: string, params: { [key: string]: string }) {
		if (gdkjsb.bridge == undefined) return;
			gdkjsb.bridge.callAction("AppsFlyerSDK:logCustomEvent", JSON.stringify({ key, params, data: params }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logLogin(type: LoginType, userId: number) {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("AppsFlyerSDK:logLogin", JSON.stringify({ type, userId }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logRegister(type: LoginType) {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("AppsFlyerSDK:logRegister", JSON.stringify({ type }), (data) => { })
	}


	/**
	 * 自定义日志
	 */
	static logRequestPay(id: string, price: number, count: number, currency: string) {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("AppsFlyerSDK:logRequestPay", JSON.stringify({ id, price, count, currency }), (data) => { })
	}

	/**
	 * 自定义日志
	 */
	static logPurchased(id: string, revenue: number, price: number, count: number, currency: string, succ: boolean) {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("AppsFlyerSDK:logPurchased", JSON.stringify({ id, revenue, price, count, currency, succ }), (data) => { })
	}

	}
}