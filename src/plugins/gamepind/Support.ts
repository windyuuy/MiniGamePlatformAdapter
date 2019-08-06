
namespace GamepindGDK {
	export class Support implements GDK.ISupport {
		pluginName = "Gamepind"
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "Gamepind"
		requireAuthorize: boolean = false
		apiNameLocale: string = "gampind"
	}
}