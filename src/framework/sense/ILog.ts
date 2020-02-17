/** 开发数据域 */
namespace GDK {

	export interface PayLogParams {
		id: string,
		price: number,
		count: number,
		currency: string,
		succ?: boolean
	}

	/**
	 * 埋点统计
	 */
	export interface ILog {
		/**
		 * 提交日志
		 */
		commitLog(key: string, params: { [key: string]: String }): Promise<void>

		commitChannelsLog(logType: string, params: PayLogParams): Promise<void>;
	}
}