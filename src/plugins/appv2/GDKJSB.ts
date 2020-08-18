
namespace UnityAppGDK {
	export class GDKJSB implements GDK.IGDKJSB {

		/**
		 * 游戏热更新功能
		 * @returns tid 供暂停、恢复、取消使用
		*/
		hotupdateInGame(json : string, callback : (cur : number, total : number)=>void) : string {
			return SDKProxy.hotupdateInGame(json, callback);
		}
		// 暂停
		hotupdatePause(tid : string) : void {
			SDKProxy.hotupdatePause(tid);
		}
		// 恢复
		hotupdateResume(tid : string) : void {
			SDKProxy.hotupdateResume(tid);
		}
		// 取消
		hotupdateCancel(tid : string) : void {
			SDKProxy.hotupdateCancel(tid);
		}

		/**
		 * 生成Info文件
		 */
		makeAppInfo() : string {
			return SDKProxy.makeAppInfo();
		}
		// 设置appinfo的参数
		setAppInfo(key : string, value : string) : void {
			SDKProxy.setAppInfo(key, value);
		}

	}
}