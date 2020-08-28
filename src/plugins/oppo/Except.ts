namespace OPPOGDK {
	export class Except extends GDK.ExceptBase {
		protected _errorCallback: (err: { message: string, stack: string }) => void
		protected _isListener: boolean = false;

		setErrorCallback(callback: (err: { message: string, stack: string }) => void) {
			this._errorCallback = callback;

			if (!this._isListener) {
				this._isListener = true;

				qg.onError((res) => {
					//检查该错误是否提交过
					this._errorCallback({ message: res.message, stack: null });
				})
			}
		}
	}

}