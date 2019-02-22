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
}