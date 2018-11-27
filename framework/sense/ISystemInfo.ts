namespace GDK {
	export interface ISystemInfo {
		system: "android" | "ios" | "devtools"

		init?()
	}

}
