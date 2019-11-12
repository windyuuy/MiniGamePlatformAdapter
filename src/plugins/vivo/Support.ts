
namespace VIVOGDK {
	export class Support implements GDK.ISupport {
		pluginName = "vivo"
		supportShare: boolean = false
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "vivo"
		requireAuthorize: boolean = false
		apiNameLocale: string = "vivo小游戏"
	}
}