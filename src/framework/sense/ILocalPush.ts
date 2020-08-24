
namespace GDK {
	export enum LocalPushAvailableStage {
		/**
		 * 允许后台通知
		 */
		BACKGROUND = 1,
		/**
		 * 允许前台通知
		 */
		FOREGROUND = 2,
	}

	export class LocalPushBundle {
		/**
		 * 推送ID，最好填纯数字
		 * - 相同id的通知会被覆盖更新
		 */
		identifier: string = null
		/**
		 * 推送标题
		 */
		title?: string = '标题'
		/**
		 * 推送副标题
		 * - 某些手机不显示副标题
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
		 * 重复推送方式（仅ios支持）
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
		/**
		 * 开启声音提示
		 */
		enableSoundTip?: boolean = true
		/**
		 * 振动提示
		 */
		enableVibrateTip?: boolean = false
		/**
		 * 呼吸灯提示（仅安卓）
		 */
		enableLightTip?: boolean = false

		/**
		 * 设置某些情景推送权限
		 * - 只支持安卓
		 * - 可以叠加，比如：info.availableStage=LocalPushAvailableStage.BACKGROUND | LocalPushAvailableStage.FOREGROUND
		 */
		availableStage?: number = LocalPushAvailableStage.BACKGROUND

		/**
		 * 支持长文本完整显示
		 * - 目前仅安卓生效
		 */
		isBigText?: boolean = false
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
		 * - identifier 和 identifiers 只有其中一个生效
		 */
		removeLocalNoticeWithID?(params: { identifier?: string, identifiers?: string[] }): Promise<void>;

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