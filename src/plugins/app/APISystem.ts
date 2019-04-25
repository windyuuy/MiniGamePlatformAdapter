
namespace AppGDK {

	export class APISystem extends GDK.APISystemBase {

		protected _showList: Function[] = [];
		protected _hideList: Function[] = [];

		init() {
			super.init();

			//侦听show hide
			if (gdkjsb.bridge) {
				gdkjsb.bridge.on("app:show", (data: string) => {
					let jsonData: any = null;
					try {
						jsonData = JSON.parse(data);
					} catch (e) {
					}
					for (let f of this._showList) {
						f(jsonData)
					}
				})
				gdkjsb.bridge.on("app:hide", (data: string) => {
					let jsonData: any = null;
					try {
						jsonData = JSON.parse(data);
					} catch (e) {
					}
					for (let f of this._hideList) {
						f(jsonData)
					}
				})
			}
		}

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			if (gdkjsb.bridge == undefined) {
				//兼容无gdkjsb的包
				callback({ left: 0, right: 0, top: 0, bottom: 0 });
			} else {
				if (gdkjsb.bridge.callAction("DisplayCutout:getSafeArea", "{}", (data: string) => {
					callback(JSON.parse(data));
				}) != true) {
					//兼容 nativeVersion == 0
					callback({ left: 0, right: 0, top: 0, bottom: 0 });
				}
			}
		}

		get nativeVersion() {
			return gdkjsb.nativeVersion || 0;
		}


		onShow?(callback: (data: any) => void): void {
			this._showList.push(callback);
		}
		offShow?(callback: Function): void {
			this._showList.remove(callback);
		}
		onHide?(callback: Function): void {
			this._hideList.push(callback);
		}
		offHide?(callback: Function): void {
			this._hideList.remove(callback);
		}

	}
}
