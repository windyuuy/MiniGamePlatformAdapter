
namespace VIVOGDK {
	export class Support implements GDK.ISupport {
		pluginName = "vivo"
		supportShare: boolean = true
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "vivo"
		requireAuthorize: boolean = true
		apiNameLocale: string = "vivo小游戏"
	}
}