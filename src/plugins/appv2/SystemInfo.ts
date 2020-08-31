
namespace AppV2GDK {
	export class SystemInfo extends GDK.SystemInfoBase {

		api!: GDK.UserAPI

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

		async fetchNetworkInfo(): Promise<void> {

		}

		init() {
            if (!SDKProxy.gdkjsbExist()) {
                return;
            }
            if (CS != undefined && CS.UnityEngine != undefined && CS.UnityEngine.SystemInfo != undefined && (CS.UnityEngine.SystemInfo.deviceType == CS.UnityEngine.DeviceType.Desktop)) {
                return;
            }
			var info : any = JSON.parse(SDKProxy.getSystemInfo());

			this.deviceId = info.deviceId
			this.uuid = info.uuid
			this.gameDeviceId = info.gameDeviceId
			this.system = info.platform as string + info.systemVersion
			this.platform = info.platform
			this.brand = info.brand
			this.model = info.model
			this.version = info.systemVersion
			this.SDKVersion = this.api.nativeVersion.toString();
			this.language = info.language
			this.versionCode = info.versionCode
			this.versionName = info.versionName

			this.channel = info.channel
			this.quickChannelId = info.quickChannelId
			this.country = info.country
			this.installTime = info.installTime;
			this.imei = info.imei
			this.packageName = info.packageName
			this.packageTag = info.packageTag
			this.debugAccountServer = info.debugAccountServer
			this.isCustomBackendCfg = info.isCustomBackendCfg

			this.SDKVersionList = info.SDKVersionList

			this.screenWidth = info.screenWidth//768//window.screen.width
			this.screenHeight = info.screenHeight//window.screen.height
			this.androidId = info.androidId
			this.mac = info.mac
			this.userAgent = info.userAgent
			
		}
	}
}