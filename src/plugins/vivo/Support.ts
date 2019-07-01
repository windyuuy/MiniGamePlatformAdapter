
namespace VIVOGDK {
	export class Support implements GDK.ISupport {
		pluginName = "vivo"
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "vivo"
		requireAuthorize: boolean = true
		apiNameLocale: string = "vivo小游戏"
	}
}