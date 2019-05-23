
namespace QQMiniAppGDK {
	export class Support implements GDK.ISupport {
		pluginName = "qqminiapp"
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "QQMiniAppGDKgame"
		requireAuthorize: boolean = true
		apiNameLocale: string = "新手Q"
	}
}