declare namespace gdkjsb {

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
		 */
		static callAction(action: string, data: string, callback: (/**返回结果 */data: string) => void);

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
	}
}