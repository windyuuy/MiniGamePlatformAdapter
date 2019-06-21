
namespace OPPOGDK {
	export class SystemInfo extends GDK.SystemInfoBase {
		brand: string
		model: string
		pixelRatio: number
		screenWidth: number
		screenHeight: number
		windowWidth: number
		windowHeight: number
		statusBarHeight: number
		language: string
		version: string
		system: string
		platform: string
		fontSizeSetting: number
		SDKVersion: string
		benchmarkLevel: number

		networkClass: number
		networkType: string

		deviceId?: string
		gameDeviceId?: string

		isFirstInstall?: number
		devPlatform?: string

		update() {
			let data = qg.getSystemInfoSync()
			this.initSysInfo(data)
		}

		async fetchNetworkInfo() {
			this.update()
		}

		init() {
			this.update()
		}

		protected initSysInfo(sysinfo: qg.OPPO_SystemInfo) {
			this.brand = sysinfo.brand
			this.model = "" + sysinfo.model
			this.pixelRatio = sysinfo.pixelRatio
			this.screenWidth = sysinfo.screenWidth
			this.screenHeight = sysinfo.screenHeight
			this.windowWidth = sysinfo.windowWidth
			this.windowHeight = sysinfo.windowHeight
			this.statusBarHeight = -1
			this.language = sysinfo.language
			this.version = sysinfo.COREVersion
			this.system = sysinfo.system
			this.platform = sysinfo.platform
			this.fontSizeSetting = -1
			// 手填一个QQPlayCore.js里的发布版本号
			this.SDKVersion = 'undefined'
			this.benchmarkLevel = -1

			this.networkClass = 0
			this.networkType = 'unknown'

			this.isFirstInstall = 0
			this.devPlatform = ""
		}
	}
}