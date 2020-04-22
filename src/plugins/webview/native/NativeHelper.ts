namespace AppGDK {
	export class NativeHelper {

		checkActionExist(key: string): boolean {
			if (gdkjsb.nativeVersion() && gdkjsb.nativeVersion() >= 1) {
				return gdkjsb.checkActionExist(key)
			}
			return false
		}

		async safeCallAction<T = void>(key: string, params: Object): Promise<T> {
			if (nativeHelper.checkActionExist(key)) {
				return this.callAction<T>(key, params)
			} else {
				console.log(`skip call <${key}> function, which not implement for current sdk version ${gdkjsb.nativeVersion()}`)
			}
			return undefined
		}

		async callAction<T = void>(key: string, params: Object): Promise<T> {
			return new Promise<T>((resolve, reject) => {
				SDKProxy.callAction(key, JSON.stringify(params), (data) => {
					resolve(JSON.parse(data || null))
				});
			})
		}

		async onEvent<T>(key: string, callback: (data: T) => void) {
			let id = SDKProxy.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback(JSON.parse(data)["params"])
			});
		}

		async onDoneEvent(key: string, callback: Function) {
			let id = SDKProxy.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback()
			});
		}
	}
	export const nativeHelper = new NativeHelper()
}
