
namespace webGDK {

	const devlog = Common.devlog

	export class APISystem extends GDK.APISystemBase {
		init() {
			devlog.warn("Web APISystem");
			if (window['wx'] && window['wx'].authorize) {
				devlog.error("当前平台疑似微信平台，当前 gdk.js 为develop版，请确认发布配置是否正确")
			}
			super.init()
		}
	}
}
