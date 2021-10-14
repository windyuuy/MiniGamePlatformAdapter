
namespace GDK {
	class SimpleEvent<T> extends fsync.event.SimpleEvent<T> { }

	class OpenDataContext implements IOpenDataContext {
		protected _event: SimpleEvent<OpenDataContextMessage> = null
		constructor(event: SimpleEvent<OpenDataContextMessage>) {
			this._event = event
		}

		postMessage(message: OpenDataContextMessage) {
			this._event.emit(message)
		}
	}

	export class SubContextBase implements ISubContext {
		protected _event: SimpleEvent<OpenDataContextMessage> = new SimpleEvent()
		protected _context: OpenDataContext = new OpenDataContext(this._event)

		onMessage(callback: (message: OpenDataContextMessage) => void) {
			return this._event.on(callback)
		}

		getOpenDataContext(): IOpenDataContext {
			return this._context
		}
	}
}
