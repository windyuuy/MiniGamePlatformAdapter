namespace WebViewGDK {
	export class Except implements GDK.IExcept {
		protected _errorCallback: (err: { message: string, stack: string }) => void
		protected _isListener: boolean = false;

		setErrorCallback(callback: (err: { message: string, stack: string }) => void) {
			this._errorCallback = callback;

			if (!this._isListener) {
				this._isListener = true;

				// window.onerror = (res) => {
				// 	//检查该错误是否提交过
				// 	this._errorCallback({ message: res.toString(), stack: new Error().stack });
				// }
			}
		}
	}

}