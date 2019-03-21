namespace AppGDK {
	export class LogBase implements GDK.ILog {

		/**
		 * 提交自定义日志到服务器
		 * @param key key
		 * @param params 参数
		 */
		async commitLog(key: string, params: { [key: string]: string }) {
			LogBridge.logCustomEvent(key, params);
		}

		async commitChannelsLog(logType: 'PayLog', params: GDK.PayLogParams) {
			if (logType == 'PayLog') {
				let p = <GDK.PayLogParams>params
				LogBridge.logRequestPay(p.id, p.price, p.count, p.currency)
			} else {
				console.error("unsupport log type")
			}
		}
	}
}