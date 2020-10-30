
namespace WechatGDK {

	export class SubContext implements GDK.ISubContext {
		onMessage(callback: (message: GDK.OpenDataContextMessage) => void) {
			return SDKProxy.onMessage(callback)
		}

		getOpenDataContext(): GDK.IOpenDataContext {
			return SDKProxy.getOpenDataContext()
		}
	}
}
