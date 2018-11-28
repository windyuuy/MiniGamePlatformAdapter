
namespace DevelopGDK {
	export class SystemSettings implements GDK.ISystemInfo {
		system
		channelId: number
		clientSystemInfo: any
		launchOptionsPath: any
		launchOptionsQuery: any

		init() {
			this.clientSystemInfo = wx.getSystemInfoSync()
		}
	}
}