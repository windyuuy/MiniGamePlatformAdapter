
namespace BytedanceGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "bytedance"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = true
		apiPlatform = "bytedance"
		requireAuthorize: boolean = true
		apiNameLocale: string = "头条"
	}
}