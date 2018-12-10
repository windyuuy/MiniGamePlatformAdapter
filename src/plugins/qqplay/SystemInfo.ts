
namespace QQPlayGDK {
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

		isFirstInstall?: number
		devPlatform?: string

		update() {
			let data = BK.getSystemInfoSync()
			this.initSysInfo({
				...GameStatusInfo,
				...data,
			})
		}

		async fetchNetworkInfo() {
			this.update()
		}

		init() {
			this.update()
		}

		protected initSysInfo(sysinfo: GAMESTATUSINFO) {
			this.brand = 'unknown'
			this.model = sysinfo.model
			this.pixelRatio = -1
			this.screenWidth = -1
			this.screenHeight = -1
			this.windowWidth = -1
			this.windowHeight = -1
			this.statusBarHeight = -1
			this.language = 'zh_CN'
			this.version = sysinfo.QQVer
			this.system = sysinfo.osVersion
			this.platform = sysinfo.platform
			this.fontSizeSetting = -1
			// 手填一个QQPlayCore.js里的发布版本号
			this.SDKVersion = 'undefined'
			this.benchmarkLevel = -1

			this.networkClass = sysinfo.networkType
			this.networkType = 'unknown'

			this.isFirstInstall = sysinfo.isFirstInstall
			this.devPlatform = sysinfo.devPlatform
		}
	}
}