
namespace QQPlayGDK {
	class SimpleEvent<T> extends GDKLIB.SimpleEvent<T> { }

	class OpenDataContext implements GDK.IOpenDataContext {
		protected _event: SimpleEvent<GDK.PrimitiveMap> = null
		constructor(event: SimpleEvent<GDK.PrimitiveMap>) {
			this._event = event
		}

		postMessage(message: GDK.PrimitiveMap) {

		}
	}

	export class SubContext implements GDK.ISubContext {
		protected _event: SimpleEvent<GDK.PrimitiveMap> = new SimpleEvent()
		protected _context: OpenDataContext = new OpenDataContext(this._event)

		onMessage(callback: (message: GDK.PrimitiveMap) => void) {
			return this._event.on(callback)
		}

		getOpenDataContext(): GDK.IOpenDataContext {
			return this._context
		}
	}
}
