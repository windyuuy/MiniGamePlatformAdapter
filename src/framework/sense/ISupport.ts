namespace GDK {
	export interface ISupport {
		/** api平台名称 */
		apiPlatform: "wechatgame" | "browser" | "qqplay" | "unknown" | string
		/**
		 * - 插件名，如：
		 * ```
		 * develop(网页版)
		 * wechat(微信)
		 * qqplay(玩一玩)
		 * ```
		 **/
		pluginName: string
		/** 是否支持群分享 */
		supportShareTickets: boolean
		/** 是否需要支持子域 */
		requireSubDomainRank: boolean
		/** 是否需要鉴权认证 */
		requireAuthorize: boolean
		/** api名字 */
		apiNameLocale: string
	}
}