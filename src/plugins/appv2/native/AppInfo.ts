namespace AppV2GDK {

	export class AppInfo {

		platform = "unknown"
		brand: string = 'unknown'
		model: string = 'unknown'
		pixelRatio: number = -1
		screenWidth: number = -1
		screenHeight: number = -1
		windowWidth: number = -1
		windowHeight: number = -1
		statusBarHeight: number = -1
		language: string = 'zh_CN'
		version: string = '1.0.0'
		system: string = "browser"
		fontSizeSetting: number = -1
		SDKVersion: string = '1.0.0'
		benchmarkLevel: number = -1

		networkClass: number = -1
		networkType: string = 'unknown'

		isFirstInstall?: number
		devPlatform?: string = "browser"

		deviceId?: string
		uuid?: string
		gameDeviceId?: string

		versionCode?: number
		versionName?: string

		channel?: string
		quickChannelId?: string
		country?: string

		installTime?: number

		imei?: string
		packageName?: string
		packageTag?: string
		debugAccountServer?: string
		isCustomBackendCfg?: boolean


		androidId?: string
		mac?: string
		userAgent?: string
	}
}