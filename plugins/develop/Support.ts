
namespace DevelopGDK {
	export class Support implements GDK.ISupport {
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "wechatgame"
		requireAuthorize: boolean = true
		apiNameLocale: string = "微信"
	}
}