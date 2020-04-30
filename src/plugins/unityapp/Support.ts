
namespace UnityAppGDK {
	export class Support implements GDK.ISupport {
		pluginName = "app"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "原生APP"
	}
}