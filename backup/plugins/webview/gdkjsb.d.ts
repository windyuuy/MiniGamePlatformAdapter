declare namespace gdkjsb {

	/**
	 * 当前原生包的版本号（不推荐，尽量用 nativeHelper 中的函数代替）
	 * * 0 或 undefined 表示最初始版本，不包含新的的GooglePay支付
	 * * 1 新的googlepay支付，并添加了 getSafeArea 接口
	 */
	// export var nativeVersion: number

	export function nativeVersion(): number;

	/**
	 * 语言
	 */
	export function language(): string

	/**
	 * 平台
	 */
	export function platform(): string

	/**
	 * 设备ID
	 */
	export function deviceId(): string


	/**
	 * 设备uuid
	 */
	export function uuid(): string

	/**
	 * 游戏设备ID
	 */
	export function gameDeviceId(): string


	/**
	 * 手机品牌
	 */
	export function brand(): string

	/**
	 * 手机型号
	 */
	export function model(): string

	/**
	 * 系统版本号
	 */
	export function systemVersion(): string


	/**
	 * 版本号
	 */
	export function versionCode(): number

	/**
	 * 版本名称
	 */
	export function versionName(): string

	/**
	 * 渠道
	 */
	export function channel(): string

	/**
	 * quick渠道id
	 */
	export function quickChannelId(): string

	/**
	 * 国家
	 */
	export function country(): string

	/**
	 * 安装时间
	 */
	export function installTime(): number

	/**
	 * imei 信息
	 */
	export function imei(): string

	/**
	 * 包名
	 */
	export function packageName(): string

	/**
	 * 发行渠道
	 */
	export function packageTag(): string

	/**
	 * 测试用 account server
	 */
	export function debugAccountServer(): string

	/**
	 * 是否支持按packageTag 定制后端参数
	 */
	export function isCustomBackendCfg(): boolean

	/**
	 * android id
	 */
	export function androidId(): string

	/**
	 * mac address
	 */
	export function mac(): string


	/**
	 * http user Agent
	 */
	export function userAgent(): string

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
	 * set native sdk language
	 * @param lang 
	 */
	export function setSDKLanguage(lang: string);
	/**
	 * 显示对话框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param callback 
	 */
	// export function showAlert(content: string, title: string, okLabel: string, callback: () => void);
	export function showAlert(content: string, title: string, okLabel: string, actionId: string);

	/**
	 * 显示确认框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param cancelLabel 
	 * @param callback 
	 */
	// export function showConfirm(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean) => void);
	export function showConfirm(content: string, title: string, okLabel: string, cancelLabel: string, actionId: string);

	/**
	 * 显示输入框
	 * @param content 
	 * @param title 
	 * @param okLabel 
	 * @param cancelLabel 
	 * @param callback 
	 * @param defaultValue
	 */
	// export function showPrompt(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean, result: string) => void, defaultValue: string);
	export function showPrompt(content: string, title: string, okLabel: string, cancelLabel: string, defaultValue: string, actionId: string);

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



	/**
	 * 调用某个action
	 * @param action 名称
	 * @param data 输入数据
	 * @param callback 回掉函数
	 * @returns action是否存在
	 */
	// export function callAction(action: string, data: string, callback: (/**返回结果 */data: string) => void): boolean;
	export function callAction(action: string, data: string, actionId: string): boolean;

	/**
	 * 注册action
	 * @param name 动作名称
	 * @param action 动作
	 */
	// export function registerAction(name: string, action: (/** 收到的数据 */ data: string, /**回掉的函数指针 */ callbackIndex: number) => void);
	export function registerAction(name: string, action: (/** 收到的数据 */ data: string, /**回掉的函数指针 */ callbackIndex: number) => void);

	/**
	 * 回掉某个动作
	 * @param callbackIndex 回掉的函数指针
	 * @param data 返回结果数据
	 */
	export function actionCallback(callbackIndex: number, data: string);


	/**
	 * 发送事件
	 * @param eventName 事件名称
	 * @param data 数据
	 */
	export function emit(eventName: string, data: string);

	/**
	 * 侦听某个事件
	 * @param eventName 事件名称
	 * @param callback 回掉函数
	 * @returns 事件id（用于取消）
	 */
	// export function on(eventName: string, callback: (data: string) => void): number;
	export function on(eventName: string, actionId: string): number;

	/**
	 * 取消某个事件的侦听
	 * @param id 事件的id
	 */
	export function off(id: number);

	/**
	 * 检查action是否存在（不推荐，用 nativeHelper.checkActionExist("apiname") 代替）
	 * @param action 动作名称
	 */
	export function checkActionExist(action: string): boolean;


	export class bridge {
	}

	// class Bridge {
	// 	static onResponse(): boolean {

	// 		let actionId = "1234" + (++current_actionId);

	// 		return false;
	// 	}
	// }

}