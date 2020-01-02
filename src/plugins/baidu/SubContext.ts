
namespace BaiduGDK {

	export class SubContext implements GDK.ISubContext {
		onMessage(callback: (message: GDK.OpenDataContextMessage) => void) {
			return wx.onMessage(callback)
		}

		getOpenDataContext(): GDK.IOpenDataContext {
			return wx.getOpenDataContext()
		}
	}
}
