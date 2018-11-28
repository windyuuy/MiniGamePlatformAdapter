namespace GDKLIB {
	export class SimpleEvent<T> {
		protected _callbacks: ((message: T) => void)[] = []
		on(callback) {
			this._callbacks.push(callback)
		}

		off(callback) {
			this._callbacks.splice(this._callbacks.indexOf(callback), 1)
		}

		emit(value: T) {
			this._callbacks.forEach((callback) => {
				callback(value)
			})
		}
	}
}
