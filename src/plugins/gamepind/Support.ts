
namespace GamepindGDK {
	export class Support implements GDK.ISupport {
		pluginName = "gamepind"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "gamepind"
		requireAuthorize: boolean = false
		apiNameLocale: string = "gampind"
	}
}