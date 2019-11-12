
namespace BytedanceGDK {
	export class Support implements GDK.ISupport {
		pluginName = "bytedance"
		supportShare: boolean = false
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = true
		apiPlatform = "bytedance"
		requireAuthorize: boolean = true
		apiNameLocale: string = "头条"
	}
}