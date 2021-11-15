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
		content: string,
		/**
		 * 是否弹系统确认框
		 */
		toShowChoices: boolean,
	}

	export interface IChooseDialogResult {
		/**
		 * 用户选择的动作
		 * - cancel
		 * - sure
		 */
		action: "cancel" | "sure",
		/**
		 * 调用过程中是否崩溃
		 */
		crashed: boolean,
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

	export interface IGetSDKMetaInfo {
		key: string,
	}

	export type AppInfo = {
		/**
		 * sdk的相关配置
		 */
		sdkConfigs?: {
			/**
			 * sdk名称
			 */
			name: string,
			/**
			 * 需要禁用的功能
			 */
			disables?: { [key: string]: boolean },
			/**
			 * sdk中的参数列表
			 */
			parameters?: { [key: string]: string | number | boolean }
		}[]
		/**
		 * 全局参数，往往存放一些自定义参数
		 */
		parameters?: { [key: string]: string | number | boolean }
	}

	export interface ICheckPermissionResult {
		/**
		 * 缺失的权限列表
		 */
		lackedPermissions: string[],
		error: {
			message?: string,
			stack?: string,
		}
	}

	/**
	 * 内存警告等级
	 */
	export enum MemoryWarningLevel {
		TRIM_MEMORY_RUNNING_MODERATE = 5,
		TRIM_MEMORY_RUNNING_LOW = 10,
		TRIM_MEMORY_RUNNING_CRITICAL = 15,
	}

	export interface IOnMemoryWarningResult {
		/**
		 * 内存告警等级，只有 Android 才有，对应系统宏定义
		 */
		level: MemoryWarningLevel
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
		setFPS(fps: number): void

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
		 * 开启云客服
		 */
		startYunkefu?(accessId: string, name: string, id: string, customField: Object, native?: boolean): void;

		/**
		 * 
		 * 是否存在原生客服中心
		 */
		hasNativeAssistantCenter?(): boolean;

		/**
		 * hack web
		 * @param url 
		 */
		showHackWeb?(url: string, duration: number): void;

		/**
		 * set native sdk language
		 * @param lang 
		 */
		setSDKLanguage?(lang: string): void;
		/**
		 * 原生版本号，具体看C++
		 */
		readonly nativeVersion: number;

		/**
		 * SDK框架版本
		 */
		readonly sdkFrameworkVersion: string;

		/**
		 * 跳转app设置界面
		 * - 目前只支持 android
		 */
		gotoAppSystemSettings?(params: IChooseDialogParams): Promise<IChooseDialogResult>;
		/**
		 * 检查是否已授予权限
		 * - 目前只支持 android
		 */
		checkAppSystemPermissions?(params: ICheckPermissionParams): Promise<ICheckPermissionResult>;

		/**
		 * 通过key获取原生SDK版本信息
		 * @param params 
		 */
		getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any>

		/**
		 * 初始化appinfo
		 * 最终的参数优先从 优先从外层parameters加载，如果找不到则从sdk模块中加载。 
		 */
		initAppinfo(appInfo: AppInfo): void;

		/**
		 * 动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
		 * @param key 
		 * @param value 
		 */
		setAppInfo(key: string, value: string | number | boolean): void;

		/**
		 * 获取应用AppInfo
		 * @param key 
		 */
		getAppInfo(key: string): string | number | boolean | null;

		/**
		 * 获取Boolean类型的数据，当遇到异常数据时，将返回默认值
		 * @param key 
		 * @param def 
		 */
		getAppInfoBoolean(key: string, def?: boolean): boolean;

		/**
		  * 获取Number类型的数据，当遇到异常数据时，将返回默认值
		  * @param key 
		  * @param def 
		  */
		getAppInfoNumber(key: string, def: number): number

		/**
		 * 获取String类型的数据，当遇到异常数据时，将返回默认值
		 * @param key 
		 * @param def 
		 */
		getAppInfoString(key: string, def: string): string;

		/**
		 * 获取资源版本号
		 */
		getResVersion(): number

		/**
		 * 监听内存不足告警事件。
		 */
		onMemoryWarning(call: (res: IOnMemoryWarningResult) => void): void
	}

}
