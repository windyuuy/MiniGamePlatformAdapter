/** gdkjsb */
namespace GDK {
	/**
	 * jsb
	 */
	export interface IHotUpdate {
		
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

	}
}