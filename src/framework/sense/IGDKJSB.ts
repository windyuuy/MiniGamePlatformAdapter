/** gdkjsb */
namespace GDK {
	/**
	 * jsb
	 */
	export interface IGDKJSB {
		
		/**
		 * 游戏热更新功能
		 * @returns tid 供暂停、恢复、取消使用
		*/
		hotupdateInGame(json : string, callback : (cur : number, total : number)=>void) : string;
		// 暂停
		hotupdatePause(tid : string) : void;
		// 恢复
		hotupdateResume(tid : string) : void;
		// 取消
		hotupdateCancel(tid : string) : void;

		/**
		 * 生成Info文件
		 */
		makeAppInfo() : string;
		// 设置appinfo的参数
		setAppInfo(key : string, value : string) : void;
	}
}