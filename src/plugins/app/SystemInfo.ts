
namespace AppGDK {
	export class SystemInfo extends GDK.SystemInfoBase {

		api: GDK.UserAPI

		platform = "browser 1.0.0"
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
		gameDeviceId?: string

		versionCode?: number
		versionName?: number

		async fetchNetworkInfo(): Promise<void> {

		}

		init() {
			if (window["gdkjsb"] == null) {
				return;
			}
			this.deviceId = gdkjsb.deviceId
			this.gameDeviceId = gdkjsb.gameDeviceId
			this.system = gdkjsb.platform + gdkjsb.systemVersion
			this.platform = gdkjsb.platform
			this.brand = gdkjsb.brand
			this.model = gdkjsb.model
			this.version = gdkjsb.systemVersion
			this.SDKVersion = this.api.nativeVersion.toString();
			this.language = gdkjsb.language
			this.versionCode = gdkjsb.versionCode
			this.versionName = gdkjsb.versionName
		}
	}
}