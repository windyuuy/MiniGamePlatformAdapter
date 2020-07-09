namespace UnityAppGDK {
	export class Log implements GDK.ILog {

		/**
		 * 提交自定义日志到服务器
		 * @param key key
		 * @param params 参数
		 */
		async commitLog(key: string, params: { [key: string]: string }) {
			LogBridge.logCustomEvent(key, params);
		}

		async commitChannelsLog(logType: string, params: GDK.PayLogParams) {
			if (logType == 'PayLog') {
				let p = <GDK.PayLogParams>params
				LogBridge.logRequestPay(p.id, p.price, p.count, p.currency)
			} else if (logType == 'Paid') {
				let p = <GDK.PayLogParams>params
				LogBridge.logPurchased(p.id, p.price, p.price, p.count, p.currency, p.succ)
			}
			else {
				console.error("unsupport log type")
			}
		}

		async commitPayLog(index: number) {
			let key: string = ""
			switch (index) {
				case 1:
					key = "fb_mobile_add_to_cart";
					break
				case 2:
					key = "fb_mobile_spent_credits";
					break
				case 3:
					key = "fb_mobile_content_view";
					break
				case 4:
					key = "Subscribe";
					break
				case 5:
					key = "fb_mobile_search";
					break
				case 6:
					key = "fb_mobile_tutorial_completion";
					break
			}
			if (key.length > 0) {
				this.commitLog(key, {})
			} else {
				console.error("unsupport PayLog index")
			}
		}
	}
}