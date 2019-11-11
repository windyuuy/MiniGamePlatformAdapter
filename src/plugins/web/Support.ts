
namespace webGDK {
	export class Support implements GDK.ISupport {
		pluginName = "web"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "web"
		requireAuthorize: boolean = false
		apiNameLocale: string = "web"
	}
}