
namespace OPPOGDK {
	export class Support implements GDK.ISupport {
		pluginName = "oppo"
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "oppo"
		requireAuthorize: boolean = false
		apiNameLocale: string = "oppo快游戏"
	}
}