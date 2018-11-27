
namespace WechatGDK {
	export class SystemSettings implements GDK.ISystemInfo {
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