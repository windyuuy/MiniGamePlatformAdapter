namespace GDK {

	/**
	 * 分享时所使用的数据
	 */
	export class ShareData {
		/**
		 * 分享的标题内容
		 */
		title: string

		/**
		 * 分享的内容文本，某些目标不会使用该属性
		 */
		summary?: string

		/**
		 * 分享的图片url
		 */
		imageUrl: string

		/**
		 * 分享的数据
		 */
		data: { [key: string]: string }
	}

	export class ShareUrlData {

		/**
		 * 分享的标题内容
		 */
		title: string

		/**
		 * 分享的内容文本
		 */
		summary: string

		/**
		 * 分享的图片url
		 */
		imageUrl: string

		/**
		 * 分享的URL
		 */
		url: string
	}

	export class ShareResult {

		/**
		 * 分享结果
		 * * 0 成功
		 * * 1 失败
		 * * 2 取消
		 */
		result: number

		/**
		 * 返回信息，如果失败可以弹出对话框让玩家确定
		 */
		message?: string

		/**
		 * 原生返回数据
		 */
		extra?: any
	}

	export interface IShare extends IModule {

		/**
		 * 分享到聊天窗口
		 * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
		 * * 如果当前环境无法分享，则分享失败
		 * @param data 
		 */
		share(data: ShareData): Promise<ShareResult>;

		/**
		 * 社会化分享
		 * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
		 * * 如果当前环境无法分享，则分享失败
		 * @param data 
		 */
		socialShare(data: ShareData): Promise<ShareResult>;

		/**
		 * 分享网址
		 * * 如果当前环境无法进行URL分享，则分享失败
		 * * 当前仅 QQPlay 环境支持
		 * @param data 
		 */
		shareUrl(data: ShareUrlData): Promise<ShareResult>

	}
}