namespace AppGDK {
	export class NativeHelper {
		async callAction<T=void>(key: string, params: Object): Promise<T> {
			return new Promise<T>((resolve, reject) => {
				gdkjsb.bridge.callAction(key, JSON.stringify(params), (data) => {
					resolve(JSON.parse(data || null))
				});
			})
		}

		async onEvent<T>(key: string, callback: (data: T) => void) {
			let id = gdkjsb.bridge.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback(JSON.parse(data)["params"])
			});
		}

		async onDoneEvent(key: string, callback: Function) {
			let id = gdkjsb.bridge.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback()
			});
		}
	}
	export const nativeHelper = new NativeHelper()
}
