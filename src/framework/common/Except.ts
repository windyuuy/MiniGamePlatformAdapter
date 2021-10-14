
namespace GDK {
	const devlog = new lang.libs.Log({ tags: ["DEVELOP"] })

	export abstract class ExceptBase implements IExcept {

		/**
		 * 注册全局的错误回调函数
		 */
		abstract setErrorCallback(callback: (err: { message: string, stack: string }) => void);
	}
}
