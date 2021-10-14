
namespace GDK {
	const devlog = new lang.libs.Log({ tags: ["DEVELOP"] })

	export abstract class HotUpdateBase implements IHotUpdate {
		/**
		 * 游戏热更新功能
		 * @returns tid 供暂停、恢复、取消使用
		*/
		abstract hotupdateInGame(json: string, callback: (cur: number, total: number) => void): string;
		// 暂停
		abstract hotupdatePause(tid: string): void;
		// 恢复
		abstract hotupdateResume(tid: string): void;
		// 取消
		abstract hotupdateCancel(tid: string): void;

	}
}
