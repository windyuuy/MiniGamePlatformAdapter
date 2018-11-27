namespace GDK {
	export interface ISupport {
		/** api平台名称 */
		apiPlatform: "wechatgame" | "browser" | "qqplay" | "unknown" | string
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