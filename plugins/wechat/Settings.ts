
namespace WechatGDK {
	export class Settings implements GDK.ISettings {
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