namespace GDK {
	export interface AppCallUpParams {
		/**
		 * 要打开的外部程序类型
		 */
		apptype: "MiniProgram" | "NativeApp"
		/**
		 * 要打开的小程序 appId
		 **/
		appId: string
		/**
		 * 打开的页面路径，如果为空则打开首页
		 **/
		path?: string
		/**
		 * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
		 **/
		extraData?: object
		/**
		 * - 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
		 * - 默认值 release
		 **/
		envVersion?: string
	}

	export interface AppCallUpResult {

	}

	export interface ClipboardData {
		data: string
	}
	export interface IClipboard {
		getData(): Promise<ClipboardData>
		setData(res: ClipboardData): Promise<void>
	}

	export interface IAPISystem {
		init?()
		/**
		 * 跳转游戏
		 */
		navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult>
		/**
		 * 退出当前游戏
		 */
		exitProgram?(): Promise<void>
		/**
		 * 强制更新
		 */
		updateProgramForce?(): Promise<void>
		/**
		 * 设置是否打开调试开关。此开关对正式版也能生效。
		 */
		setEnableDebug?(res: { enableDebug: boolean }): Promise<void>

		/**
		 * 设置帧率
		 */
		setFPS?(fps: number): void

		/**
		 * 剪切板
		 */
		clipboard?: IClipboard
	}

}
