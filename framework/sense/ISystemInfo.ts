namespace GDK {
	export interface ISystemInfo {
		/** "android" | "ios" | "devtools" */
		system: string

		init?()
	}

}
