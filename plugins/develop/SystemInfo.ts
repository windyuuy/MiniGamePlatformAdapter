
namespace DevelopGDK {
	export class SystemInfo implements GDK.ISystemInfo {
		platform = "devtools"
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
		fontSizeSetting: number
		SDKVersion: string
		benchmarkLevel: number

		networkClass: number
		networkType: string

		isFirstInstall?: number
		devPlatform?: string

		async fetchNetworkInfo(): Promise<void> {

		}
	}
}