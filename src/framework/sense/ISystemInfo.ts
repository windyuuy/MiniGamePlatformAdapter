namespace GDK {
	/**
	 * 用于获取系统、设备信息
	 */
	export interface ISystemInfo {
		/**
		 * 手机品牌
		 **/
		brand: string
		/**
		 * - 手机型号
		 * - 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
		 **/
		model: string
		/**
		 * 设备像素比
		 * - -1 代表未知
		 **/
		pixelRatio: number
		/**
		 * 屏幕宽度
		 **/
		screenWidth: number
		/**
		 * 屏幕高度
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
		 * 状态栏的高度
		 **/
		statusBarHeight?: number
		/**
		 * 平台（微信、QQ等）设置的语言
		 **/
		language: string
		/**
		 * 版本号
		 * * 微信版本号
		 * * 安卓版本号
		 **/
		version: string
		/**
		 * 操作系统版本，形如 "Android 5.0"
		 **/
		system: string
		/**
		 * 客户端平台
		 * - "android" | "ios" | "devtools" | ...
		 **/
		platform: string
		/**
		 * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。
		 **/
		fontSizeSetting?: number
		/**
		 * - wx 客户端基础库版本
		 * - app nativeVersion
		 **/
		SDKVersion: string
		/**
		 * (仅Android小游戏) 性能等级
		 * - -2 或 0：该设备无法运行小游戏
		 * - -1：性能未知
		 * - `>=` 1 设备性能值
		 * - 该值越高，设备性能越好(目前设备最高不到50)
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
		 * 网络类型 1 电信 ，2 联通 ，3 移动
		 * - 0: wifi或未知
		 * -1 无网络
		 * -2 2G/3G/4G/nG 网络
		 **/
		networkClass: number
		/**
		 * 是否首次安装
		 * - 1为首次安装
		 * - 0非首次安装
		 **/
		isFirstInstall?: number
		/**
		 * 仅在开发环境下可以，手q环境下无该字段
		 **/
		devPlatform?: string

		/**
		 * 设备ID
		 */
		deviceId?: string

		/**
	     * 设备ID
	    */
		uuid?: string

		/**
		 * 游戏设备ID，每次重新安装游戏都会改变
		 */
		gameDeviceId?: string

		/**
		 * 版本号
		 */
		versionCode?: number

		/**
		 * 版本名称
		 */
		versionName?: string

		/**
		 * 渠道ID
		 */
		channel?: string

		/**
		 * quick渠道ID
		 */
		quickChannelId?: string

		/**
		 * 地区国家
		 */
		country?: string

		/**
		 * 安装时间
		 */
		installTime?: number

		/**
		 * imei
		 */
		imei?: string

		/**
		 * 包名
		 */
		packageName?: string

		/**
		 * 发行渠道
		 */
		packageTag?: string

		/**
		 * 测试用 account server
		 */
		debugAccountServer?: string

		/**
		 * 是否支持按packageTag 定制后端参数
		 */
		isCustomBackendCfg?: boolean

		init?()

		/**
		 * 刷新网络状况信息
		 */
		fetchNetworkInfo(): Promise<void>
		clone(): ISystemInfo
	}

}
