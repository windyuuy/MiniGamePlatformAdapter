namespace GDK {
	export interface ISystemInfo {
		/**
		 * 手机品牌	1.5.0
		 **/
		brand: string
		/**
		 * 手机型号
		 **/
		model: string
		/**
		 * 设备像素比
		 **/
		pixelRatio: number
		/**
		 * 屏幕宽度	1.1.0
		 **/
		screenWidth: number
		/**
		 * 屏幕高度	1.1.0
		 **/
		screenHeight: number
		/**
		 * 可使用窗口宽度
		 **/
		windowWidth: number
		/**
		 * 可使用窗口高度
		 **/
		windowHeight: number
		/**
		 * 状态栏的高度	1.9.0
		 **/
		statusBarHeight: number
		/**
		 * 微信设置的语言
		 **/
		language: string
		/**
		 * 微信版本号
		 **/
		version: string
		/**
		 * 操作系统版本
		 * - "android" | "ios" | "devtools" | ...
		 **/
		system: string
		/**
		 * 客户端平台
		 **/
		platform: string
		/**
		 * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。	1.5.0
		 **/
		fontSizeSetting: number
		/**
		 * 客户端基础库版本	1.1.0
		 **/
		SDKVersion: string
		/**
		 * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>= 1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
		 **/
		benchmarkLevel: number

		init?()
	}

}
