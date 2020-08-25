
namespace OPPOGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "oppo"
		supportShare: boolean = false
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "oppo"
		requireAuthorize: boolean = false
		apiNameLocale: string = "oppo快游戏"
	}
}