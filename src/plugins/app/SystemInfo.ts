
namespace AppGDK {
	export class SystemInfo extends GDK.SystemInfoBase {

		api: GDK.UserAPI

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


		async fetchNetworkInfo(): Promise<void> {

		}

		init() {
			if (window["gdkjsb"] == null) {
				return;
			}
			this.deviceId = gdkjsb.deviceId
			this.uuid = gdkjsb.uuid
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

			this.channel = gdkjsb.channel
			this.quickChannelId = gdkjsb.quickChannelId
			this.country = gdkjsb.country
			this.installTime = gdkjsb.installTime;
			this.imei = gdkjsb.imei
			this.packageName = gdkjsb.packageName
			this.packageTag = gdkjsb.packageTag
		}
	}
}