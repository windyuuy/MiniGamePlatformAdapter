
namespace AppGDK {

	export class APISystem extends GDK.APISystemBase {

		init() {
			super.init();

			//兼容旧版包
			if (gdkjsb.nativeVersion === undefined) {
				gdkjsb.nativeVersion = 0;
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

	}
}
