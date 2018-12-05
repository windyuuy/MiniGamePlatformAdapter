namespace GDK {
	/**
	 * 振动器
	 */
	export interface IVibration {
		/**
		 * 使手机发生较长时间的振动（400 ms)
		 */
		vibrateLong(): Promise<void>
		/**
		 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
		 */
		vibrateShort(): Promise<void>
	}

	export interface MemoryWarningInfo {
		level: number
	}

	export interface IPerformance {
		getMicroTime?(): TMicroSecond
		tryGC?(): void
		onMemoryWarning?(callback: (res: MemoryWarningInfo) => void): void
	}

	export interface IHardware extends IModule {
		/**
		 * 振动器
		 */
		vibration?: IVibration
		performance?: IPerformance
	}
}