namespace GDK {
	export interface ISystemInfo {
		/**
		 * 手机品牌	1.5.0
		 **/
		brand: string
		/**
		 * - 手机型号
		 * - 具体机型(手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
		 **/
		model: string
		/**
		 * 设备像素比，-1代表未知
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
		statusBarHeight?: number
		/**
		 * 平台（微信、QQ等）设置的语言
		 **/
		language: string
		/**
		 * 平台(微信、QQ等）版本号
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
		fontSizeSetting?: number
		/**
		 * 客户端基础库版本	1.1.0
		 **/
		SDKVersion: string
		/**
		 * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>= 1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)	1.8.0
		 **/
		benchmarkLevel: number
		/**
		 * 网络类型
		 * - `wifi`	wifi 网络
		 * - `2g`	2g 网络
		 * - `3g`	3g 网络
		 * - `4g`	4g 网络
		 * - `unknown`	Android 下不常见的网络类型
		 * - `none`	无网络
		 */
		networkType: string

		// qqplay
		/**
		 * 网络类型 1 电信 ，2 联通 ，3 移动 0: wifi或未知
		 * -1 无网络
		 * -2 2G/3G/4G/nG 网络
		 **/
		networkClass: number
		/**
		 * 是否首次安装 1为首次安装 0非首次安装
		 **/
		isFirstInstall?: number
		/**
		 * 仅在开发环境下可以，手q环境下无该字段
		 **/
		devPlatform?: string

		init?()

		/**
		 * 获取网络状况信息
		 */
		fetchNetworkInfo(): Promise<void>
	}

}
