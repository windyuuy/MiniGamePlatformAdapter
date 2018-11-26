
namespace WechatGDK {
	export class SystemSettings implements GDK.ISystemSettings {
		system: number
		channelId: number
		clientSystemInfo: any
		launchOptionsPath: any
		launchOptionsQuery: any

		init() {
			this.clientSystemInfo = wx.getSystemInfoSync()
		}
	}
}