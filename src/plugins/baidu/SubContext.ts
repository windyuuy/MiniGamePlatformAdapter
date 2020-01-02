
namespace BaiduGDK {

	export class SubContext implements GDK.ISubContext {
		onMessage(callback: (message: GDK.OpenDataContextMessage) => void) {
			return swan.onMessage(callback)
		}

		getOpenDataContext(): GDK.IOpenDataContext {
			return swan.getOpenDataContext()
		}
	}
}
