declare namespace gdkjsb {

	/**
	 * 当前原生包的版本号
	 * * 0 或 undefined 表示最初始版本，不包含新的的GooglePay支付
	 * * 1 新的googlepay支付，并添加了 getSafeArea 接口
	 */
	export var nativeVersion: number

	/**
	 * 语言
	 */
	export var language: string

	/**
	 * 平台
	 */
	export var platform: string

	/**
	 * 设备ID
	 */
	export var deviceId: string


	/**
	 * 设备uuid
	 */
	export var uuid: string

	/**
	 * 游戏设备ID
	 */
	export var gameDeviceId: string


	/**
	 * 手机品牌
	 */
	export var brand: string

	/**
	 * 手机型号
	 */
	export var model: string

	/**
	 * 系统版本号
	 */
	export var systemVersion: string


	/**
	 * 版本号
	 */
	export var versionCode: number

	/**
	 * 版本名称
	 */
	export var versionName: string

	/**
	 * 渠道
	 */
	export var channel: string

	/**
	 * quick渠道id
	 */
	export var quickChannelId: string

	/**
	 * 国家
	 */
	export var country: string

	/**
	 * 安装时间
	 */
	export var installTime: number

	/**
	 * imei 信息
	 */
	export var imei: string

	/**
	 * 包名
	 */
	export var packageName: string

	/**
	 * 发行渠道
	 */
	export var packageTag: string

	/**
	 * 测试用 account server
	 */
	export var debugAccountServer: string

	/**
	 * 是否支持按packageTag 定制后端参数
	 */
	export var isCustomBackendCfg: boolean

	/**
	 * 打开网页地址
	 * @param url 
	 */
	export function openURL(url: string);

	/**
	 * 打开hack web
	 * @param url 
	 */
	export function showHackWeb(url: string, duration: number);

	/**
	 * 显示对话框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param callback 
	 */
	export function showAlert(content: string, title: string, okLabel: string, callback: () => void);

	/**
	 * 显示确认框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param cancelLabel 
	 * @param callback 
	 */
	export function showConfirm(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean) => void);

	/**
	 * 显示输入框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param cancelLabel 
	 * @param callback 
	 * @param defaultValue
	 */
	export function showPrompt(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean, result: string) => void, defaultValue: string);

	/**
	 * 将qa证书保存至本地
	 * @param cert 
	 */
	export function makeTestCertificate(cert: string);

	/**
	 * 清除本地的QA证书
	 */
	export function clearTestCerificate();

	/**
	 * 退出程序
	 */
	export function exitProgram();

	export class bridge {
		/**
		 * 注册action
		 * @param name 动作名称
		 * @param action 动作
		 */
		static registerAction(name: string, action: (/** 收到的数据 */ data: string, /**回掉的函数指针 */ callbackIndex: number) => void);

		/**
		 * 回掉某个动作
		 * @param callbackIndex 回掉的函数指针
		 * @param data 返回结果数据
		 */
		static actionCallback(callbackIndex: number, data: string);

		/**
		 * 调用某个action
		 * @param action 名称
		 * @param data 输入数据
		 * @param callback 回掉函数
		 * @returns action是否存在
		 */
		static callAction(action: string, data: string, callback: (/**返回结果 */data: string) => void): boolean;

		/**
		 * 发送事件
		 * @param eventName 事件名称
		 * @param data 数据
		 */
		static emit(eventName: string, data: string);

		/**
		 * 侦听某个事件
		 * @param eventName 事件名称
		 * @param callback 回掉函数
		 * @returns 事件id（用于取消）
		 */
		static on(eventName: string, callback: (data: string) => void): number;

		/**
		 * 取消某个事件的侦听
		 * @param id 事件的id
		 */
		static off(id: number);

		/**
		 * 检查action是否存在
		 * @param action 动作名称
		 */
		static checkActionExist(action: string): boolean;
	}
}