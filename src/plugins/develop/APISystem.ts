
namespace DevelopGDK {

	export class APISystem extends GDK.APISystemBase {
		init() {
			console.error("当前 gdk.js 为develop版，仅适用于发开自测流程，没有特殊需求请勿用于发布到微信等平台上！！！")
			if (window['wx'] && window['wx'].authorize) {
				console.error("当前平台疑似微信平台，请确认发布配置是否正确")
			}
		}
	}
}
