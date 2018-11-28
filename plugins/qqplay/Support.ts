
namespace QQPlayGDK {
	export class Support implements GDK.ISupport {
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = false
		apiPlatform = "qqplay"
		requireAuthorize: boolean = false
		apiNameLocale: string = "QQ"
	}
}