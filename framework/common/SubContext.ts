
namespace GDK {
	class SimpleEvent<T> extends slib.SimpleEvent<T> { }

	class OpenDataContext implements IOpenDataContext {
		protected _event: SimpleEvent<PrimitiveMap> = null
		constructor(event: SimpleEvent<PrimitiveMap>) {
			this._event = event
		}

		postMessage(message: PrimitiveMap) {
			this._event.emit(message)
		}
	}

	export class SubContextBase implements ISubContext {
		protected _event: SimpleEvent<PrimitiveMap> = new SimpleEvent()
		protected _context: OpenDataContext = new OpenDataContext(this._event)

		onMessage(callback: (message: PrimitiveMap) => void) {
			return this._event.on(callback)
		}

		getOpenDataContext(): IOpenDataContext {
			return this._context
		}
	}
}
