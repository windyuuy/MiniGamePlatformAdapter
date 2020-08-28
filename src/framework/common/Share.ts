
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class ShareBase implements IShare {
		/**
		 * 分享到聊天窗口
		 * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
		 * * 如果当前环境无法分享，则分享失败
		 */
		abstract share(data: ShareData): Promise<ShareResult>;

		/**
		 * 社会化分享
		 * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
		 * * 如果当前环境无法分享，则分享失败
		 */
		abstract socialShare(data: ShareData): Promise<ShareResult>;

		/**
		 * 分享网址
		 * * 如果当前环境无法进行URL分享，则分享失败
		 * * 当前仅 QQPlay 环境支持
		 */
		abstract shareUrl(data: ShareUrlData): Promise<ShareResult>


		/**
		 * 显示分享菜单
		 * * 微信平台必须调用该函数才会显示转发按钮
		 * * QQ平台默认就有转发按钮
		 */
		abstract showShareMenu(): Promise<void>

		/**
		 * 隐藏分享菜单
		 */
		abstract hideShareMenu(): Promise<void>

		/**
		 * 在某些平台可以设置分享按钮所分享的内容
		 * * 微信支持
		 * * QQplay 无效
		 */
		abstract setShareMenuData(data: ShareData): Promise<void>

		/**
		 * 获取通过点击分享链接时或传递的参数
		 */
		abstract getShareParam(): Promise<{ [key: string]: string }>

		/**
		 * 获取通过点击分享链接时或传递的参数
		 */
		abstract getShareTicket(): Promise<string>

		/**
		 * 获取分享的信息
		 * * 当前仅微信环境有效
		 */
		abstract getShareInfo(shareTicket: string): Promise<any>
	}
}
