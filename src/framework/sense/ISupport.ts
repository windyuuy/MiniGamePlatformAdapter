namespace GDK {
	export interface ISupport {
		/** 
		 * api平台名称 
		 * * browser 浏览器
		 * * native APP原生
		 * * wechatgame 微信
		 * * qqplay QQ玩一玩
		 * * unknown 未知平台
		*/
		apiPlatform: string
		/**
		 * 插件名
		 * * develop 网页开发测试
		 * * wechat 微信
		 * * qqplay 玩一玩
		 * * app 原生APP
		 **/
		pluginName: string
		/** 是否支持群分享 */
		supportShareTickets: boolean
		/** 是否需要支持子域 */
		requireSubDomainRank: boolean
		/** 是否需要鉴权认证 */
		requireAuthorize: boolean
		/** api本地化名字 */
		apiNameLocale: string
	}
}