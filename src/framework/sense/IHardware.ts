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

		/**
		 * 当前仅原生平台支持
		 */
		vibrate?(params: { duration: number }): Promise<void>
	}

	export interface MemoryWarningInfo {
		level: number
	}

	/**
	 * 性能
	 */
	export interface IPerformance {
		getMicroTime?(): TMicroSecond
		tryGC?(): void
		onMemoryWarning?(callback: (res: MemoryWarningInfo) => void): void
	}

	export interface BrightnessData {
		value: number
	}

	/**
	 * 屏幕
	 */
	export interface IScreen {
		getBrightness(): Promise<BrightnessData>
		setBrightness(data: BrightnessData): Promise<void>
		setKeepScreenOn(res: { keepon: boolean }): Promise<void>
	}

	/**
	 * 陀螺仪
	 */
	export interface IGyroscope {
		start?()
		stop?()
		onChange?()
	}

	/**
	 * 罗盘
	 */
	export interface ICompass {
		start?()
		stop?()
		onChange?()
	}

	/**
	 * 电池
	 */
	export interface IBattery {
		getInfo?()
		getInfoSync?()
	}

	/**
	 * 加速计
	 */
	export interface IAccelerometer {
		start?()
		stop?()
		onChange?()
	}

	/**
	 * - 设备方向
	 * - 转屏相关
	 * - 重力感应
	 */
	export interface IGravity {
		/**
		 * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听。
		 */
		onDeviceMotionChange?()
		/**
		 * 开始监听设备方向的变化。
		 */
		startDeviceMotionListening?()
		/**
		 * 停止监听设备方向的变化。
		 */
		stopDeviceMotionListening?()

		/**
		 * 取消监听横竖屏切换事件
		 */
		offDeviceOrientationChange?()
		/**
		 * 监听横竖屏切换事件
		 */
		onDeviceOrientationChange?()
	}

	/**
	 * 触屏
	 */
	export interface IScreenTouch {
		onStart?()
		offStart?()
		onMove?()
		offMove?()
		onEnd?()
		offEnd?()
		onCancel?()
		offCancel?()
	}

	/**
	 * 管理各种硬件功能
	 */
	export interface IHardware extends IModule {
		/**
		 * 振动器
		 */
		vibration?: IVibration
		/**
		 * 性能
		 */
		performance?: IPerformance
		/**
		 * 屏幕亮度
		 */
		screen?: IScreen
		/**
		 * 陀螺仪
		 */
		gyroscope?: IGyroscope
		/**
		 * 罗盘
		 */
		compass?: ICompass
		/**
		 * 电池
		 */
		battery?: IBattery
		/**
		 * 加速计
		 */
		accelerometer?: IAccelerometer
		/**
		 * - 设备方向
		 * - 转屏相关
		 * - 重力感应
		 */
		gravity?: IGravity
		/**
		 * 触屏
		 */
		screenTouch?: IScreenTouch
	}
}