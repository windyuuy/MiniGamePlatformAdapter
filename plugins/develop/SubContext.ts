
namespace DevelopGDK {

	export class SubContext implements GDK.ISubContext {
		onMessage(callback: (message: GDK.PrimitiveMap) => void) {
			return wx.onMessage(callback)
		}

		getOpenDataContext(): GDK.IOpenDataContext {
			return wx.getOpenDataContext()
		}
	}
}
