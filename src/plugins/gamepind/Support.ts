
namespace GamepindGDK {
	export class Support implements GDK.ISupport {
		pluginName = "gamepind"
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "gamepind"
		requireAuthorize: boolean = false
		apiNameLocale: string = "gampind"
	}
}