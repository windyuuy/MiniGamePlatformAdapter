
namespace GDK {
	export abstract class SystemInfoBase implements ISystemInfo {
		platform = "devtools"
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
		system: string = "devtools"
		fontSizeSetting: number = -1
		SDKVersion: string = '1.0.0'
		benchmarkLevel: number = -1

		networkClass: number = -1
		networkType: string = 'unknown'

		isFirstInstall?: number
		devPlatform?: string = "devtools"

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


		abstract fetchNetworkInfo(): Promise<void>

		clone(): ISystemInfo {
			const obj: any = {}
			for (let k in this) {
				obj[k] = this[k]
			}
			obj["uiLanguage"] = slib.i18n.language
			obj.api = undefined
			return obj
		}
	}
}