
namespace QQMiniAppGDK {
	const devlog = Common.devlog

	export class SystemInfo extends GDK.SystemInfoBase {
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
		 * 操作系统版本号
		 **/
		system: string
		/**
		 * 客户端平台
		 * - "android" | "ios" | "devtools" | ...
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

		networkType: string
		networkClass: number


		deviceId?: string
		gameDeviceId?: string

		fetchNetworkInfo() {
			const ret = new GDK.RPromise<void>()
			wx.getNetworkType({
				success: (res) => {
					this.networkType = res.networkType
					ret.success(undefined)
				},
				fail: () => {
					ret.fail()
				}
			})
			return ret.promise
		}

		protected updateNetworkInfo(networkType: string, isConnected: boolean = null) {
			this.networkType = networkType
			if (this.networkType == 'wifi') {
				this.networkClass = 0
			} else if (this.networkType == '2g' || this.networkType == '3g' || this.networkType == '4g') {
				this.networkClass = -2
			} else if (this.networkType == 'none') {
				this.networkClass = -1
			} else {
				this.networkClass = 0
			}
		}

		init() {
			const info = wx.getSystemInfoSync()
			slib.JSHelper.merge(info, this)
			this.fetchNetworkInfo()
			this.updateNetworkInfo(this.networkType)

			devlog.info('wx systeminfo:', this)

			wx.onNetworkStatusChange((res) => {
				this.updateNetworkInfo(res.networkType, res.isConnected)
			})

			var gameDeviceId = wx.getStorageSync("glee_systeminfo_gameDeviceId");
			if (gameDeviceId == null || gameDeviceId == "") {
				gameDeviceId = new Date().getTime().toString(36) + (Math.random() * 2 ** 64).toString(36) + (Math.random() * 2 ** 64).toString(36);
				wx.setStorageSync("glee_systeminfo_gameDeviceId", gameDeviceId);
			}
			this.gameDeviceId = gameDeviceId;

		}
	}
}