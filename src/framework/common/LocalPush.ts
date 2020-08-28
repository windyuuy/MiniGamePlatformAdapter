
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class LocalPushBase implements ILocalPush {
		/**
		 * 添加本地推送
		 */
		abstract addLocalNotices?(notices: LocalPushBundle[]): Promise<void>;
		/**
		 * 移除对应的推送
		 * - identifier 和 identifiers 只有其中一个生效
		 */
		abstract removeLocalNoticeWithID?(params: { identifier?: string, identifiers?: string[] }): Promise<void>;

		/**
		 * 移除所有推送
		 */
		abstract removeAllLocalNotices?(): Promise<void>;

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		abstract requireLocalNoticePermission?(): Promise<void>;

		/**
		 * 用户是否开启通知权限
		 */
		abstract isLocalNoticeEnabled?(): Promise<{ enabled: boolean }>;
	}
}
