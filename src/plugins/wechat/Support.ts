
namespace WechatGDK {
	export class Support implements GDK.ISupport {
		pluginName = "wechat"
		supportShare: boolean = true
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "wechatgame"
		requireAuthorize: boolean = true
		apiNameLocale: string = "微信"
	}
}