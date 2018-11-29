
namespace WechatGDK {
	export class SystemInfo implements GDK.ISystemInfo {
		system: string

		init() {
			this.system = wx.getSystemInfoSync().system
		}
	}
}