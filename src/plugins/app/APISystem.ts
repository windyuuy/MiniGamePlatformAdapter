
namespace AppGDK {

	export class APISystem extends GDK.APISystemBase {

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			if (gdkjsb.bridge == undefined) {
				callback({ left: 0, right: 0, top: 0, bottom: 0 });
			} else {
				gdkjsb.bridge.callAction("DisplayCutout:getSafeArea", "{}", (data: any) => {
					callback(data);
				})
			}
		}

	}
}
