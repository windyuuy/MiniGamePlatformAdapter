
namespace AppGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "app"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "原生APP"
	}
}