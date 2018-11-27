namespace GDK {
	export interface ISystemInfo {
		system: number
		channelId: number
		clientSystemInfo: any
		launchOptionsPath: any
		launchOptionsQuery: any

		init?()
	}

}
