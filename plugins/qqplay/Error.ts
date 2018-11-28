namespace QQPlayGDK {
	export class Error implements GDK.IError {
		protected _errorCallback: (err: { message: string, stack: string }) => void
		protected _isListener: boolean = false;

		setErrorCallback(callback: (err: { message: string, stack: string }) => void) {
			this._errorCallback = callback;

			if (!this._isListener) {
				this._isListener = true;

				BK.Script.onerror = message => {
					//检查该错误是否提交过
					this._errorCallback({ message: message, stack: null });
				}
			}
		}
	}

}