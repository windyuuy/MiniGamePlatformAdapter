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

	export interface IChooseDialogParams {
		/**
		 * 提示内容
		 */
		content: string
	}

	export interface ICheckPermissionParams {
		/**
		 * 要检查的权限，支持 Manifest.permission.XXXXX 中对应的字符串
		 * - "android.permission.READ_PHONE_STATE"
		 * - "android.permission.WRITE_EXTERNAL_STORAGE"
		 * - "android.permission.ACCESS_FINE_LOCATION"
		 */
		permissions: string[],
		/**
		 * 如果有缺失的权限，同时试着申请
		 * @default false
		 */
		requestAtSameTime?: boolean,
	}

	/**
	 * 支持各种系统调用、系统事件侦听
	 */
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
		 * 用法示例：
		 * ```typescript
		 * onShow((data)=>{
		 * 	...
		 * })
		 * ```
		 */
		onShow?(callback: (data: any) => void): void
		offShow?(callback: Function): void
		/**
		* 用法示例：
		* ```typescript
		* onHide(()=>{
		* 	...
		* })
		* ```
		*/
		onHide?(callback: Function): void
		offHide?(callback: Function): void

		/**
		 * 强制更新
		 */
		updateProgramForce?(): Promise<void>
		/**
		 * 设置是否打开调试开关。此开关对正式版也能生效。
		 */
		setEnableDebug?(res: { enableDebug: boolean }): Promise<void>

		/**
		 * - 设置帧率
		 * 	- 可能和cocos的会冲突
		 */
		setFPS?(fps: number): void

		/**
		 * 剪切板
		 */
		clipboard?: IClipboard

		/**
		 * 获取屏幕的安全区域，单位像素
		 * @param callback 
		 */
		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void;

		// 设置加载进度
		setLoadingProgress?(params: { progress: number }): void;

		/**
		 * 网页跳转
		 * @param url 
		 */
		openURL?(url: string): void;

		/**
		 * hack web
		 * @param url 
		 */
		showHackWeb?(url: string, duration: number): void;

		/**
		 * 原生版本号，具体看C++
		 */
		readonly nativeVersion: number;

		/**
		 * 跳转app设置界面
		 * - 目前只支持 android
		 */
		gotoAppSystemSettings?(params: IChooseDialogParams): Promise<void>;
		/**
		 * 检查是否已授予权限
		 * - 目前只支持 android
		 */
		checkPermissions?(params: ICheckPermissionParams): Promise<void>;
	}

}
