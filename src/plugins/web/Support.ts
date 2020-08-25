
namespace WebGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "web"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "web"
		requireAuthorize: boolean = false
		apiNameLocale: string = "web"
	}
}