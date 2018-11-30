namespace slib {
	export type EventHandler<T> = (message: T) => void
	export class SimpleEvent<T> {
		protected _callbacks: EventHandler<T>[] = []
		on(callback: EventHandler<T>) {
			this._callbacks.push(callback)
		}

		off(callback: EventHandler<T>) {
			this._callbacks.splice(this._callbacks.indexOf(callback), 1)
		}

		emit(value: T) {
			this._callbacks.forEach((callback) => {
				callback(value)
			})
		}
	}

	export class SEvent<T>{
		protected _events: { [key: string]: SimpleEvent<T> } = {}

		on(key: string, callback: EventHandler<T>) {
			if (!this._events[key]) {
				this._events[key] = new SimpleEvent<T>()
			}
			const event = this._events[key]
			event.on(callback)
		}

		off(key: string, callback: EventHandler<T>) {
			if (callback == undefined) {
				this._events[key] = undefined
			} else {
				const event = this._events[key]
				event.off(callback)
			}
		}

		emit(key: string, value: T) {
			if (this._events[key]) {
				const event = this._events[key]
				event.emit(value)
			}
		}
	}
}
