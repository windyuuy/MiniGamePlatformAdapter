
namespace GDK {
	export class LocalPushBundle {
		/**
		 * 推送ID
		 */
		identifier: number = null
		/**
		 * 推送标题
		 */
		title?: string = '标题'
		/**
		 * 推送副标题
		 */
		subtitle?: string = ''
		/**
		 * 推送文本内容
		 */
		content?: string = '内容'
		/**
		 * 顶栏标题
		 */
		ticker?: string = ""
		/**
		 * 推送间隔
		 */
		interval: number = null
		/**
		 * 重复推送方式
		 * - 0 不重复
		 * - 1 重复推送
		 * - 大于1 其他重复方式
		 */
		repeat?: number = 0
		/**
		 * 图标样式
		 */
		badge?: number = 1
		/**
		 * 附加信息
		 */
		userInfo?: string = '{}'
		/**
		 * 声音文件名
		 */
		soundName?: string = null
	}

	/**
	 * 本地推送通知
	 */
	export interface ILocalPush extends IModule {
		/**
		 * 添加本地推送
		 */
		addLocalNotices?(notices: LocalPushBundle[]): Promise<void>;
		/**
		 * 移除对应的推送
		 */
		removeLocalNoticeWithID?(params: { identifier: number }): Promise<void>;

		/**
		 * 移除所有推送
		 */
		removeAllLocalNotices?(): Promise<void>;

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		requireLocalNoticePermission?(): Promise<void>;

		/**
		 * 用户是否开启通知权限
		 */
		isLocalNoticeEnabled?(): Promise<{ enabled: boolean }>;
	}
}