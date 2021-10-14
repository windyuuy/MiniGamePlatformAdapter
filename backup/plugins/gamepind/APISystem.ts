
namespace GamepindGDK {

	const devlog = Common.devlog

	export class APISystem extends GDK.APISystemBase {
		init() {
			devlog.warn("Gamepind APISystem");
			super.init()
		}
	}
}
