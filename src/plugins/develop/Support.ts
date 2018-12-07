
namespace DevelopGDK {
	export class Support implements GDK.ISupport {
		pluginName = "develop"
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "develop"
		requireAuthorize: boolean = false
		apiNameLocale: string = "开发模式"
	}
}