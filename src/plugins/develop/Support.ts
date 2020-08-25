
namespace DevelopGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "develop"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "browser"
		requireAuthorize: boolean = false
		apiNameLocale: string = "开发模式"
	}
}