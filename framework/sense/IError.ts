namespace GDK {
	export interface IError extends IModule {

		/**
		 * 注册全局的错误回调函数
		 * @param callback 
		 */
		setErrorCallback(callback: (err: { message: string, stack: string }) => void);
	}
}