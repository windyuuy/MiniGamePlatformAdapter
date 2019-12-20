
namespace webGDK {

	const devlog = Common.devlog

	export class APISystem extends GDK.APISystemBase {
		init() {
			devlog.warn("Web APISystem");
			super.init()
		}
	}
}
