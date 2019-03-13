/** 开发数据域 */
namespace GDK {

	export interface ILog {
		/**
		 * 提交日志
		 */
		commitLog(key: string, params: { [key: string]: String }): Promise<void>
	}
}