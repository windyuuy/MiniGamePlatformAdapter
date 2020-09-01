
namespace AppV2GDK {
	window["gdkjsb"] = window["gdkjsb"] || CS.Glee.Bridge.GDKJSB.inst

	export class NativeHelper {

		checkActionExist(key: string): boolean {
			return SDKProxy.checkActionExist(key);
		}

		async safeCallAction<T = void>(key: string, params: Object): Promise<T> {
			if (nativeHelper.checkActionExist(key)) {
				return this.callAction<T>(key, params)
			} else {
				console.log(`skip call <${key}> function, which not implement for current sdk version ???`)
			}
			return undefined as any;
		}

		async callAction<T = void>(key: string, params: Object): Promise<T> {
			return SDKProxy.callAction(key, params);
		}

		async onEvent<T>(key: string, callback: (data: T) => void) {
			SDKProxy.onEvent(key, callback);
		}

		async onDoneEvent(key: string, callback: Function) {
			SDKProxy.onDoneEvent(key, callback);
		}
	}
	export const nativeHelper = new NativeHelper()
}
