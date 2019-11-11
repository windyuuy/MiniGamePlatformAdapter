
namespace QQPlayGDK {
	export class Support implements GDK.ISupport {
		pluginName = "qqplay"
		supportShare: boolean = true
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = false
		apiPlatform = "qqplay"
		requireAuthorize: boolean = false
		apiNameLocale: string = "QQ"
	}
}