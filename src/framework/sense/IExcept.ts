namespace GDK {
	export interface IExcept extends IModule {

		/**
		 * 注册全局的错误回调函数
		 */
		setErrorCallback(callback: (err: { message: string, stack: string }) => void);
	}
}