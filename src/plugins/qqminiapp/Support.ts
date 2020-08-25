
namespace QQMiniAppGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "qqminiapp"
		supportShare: boolean = true
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "QQMiniAppGDKgame"
		requireAuthorize: boolean = true
		apiNameLocale: string = "新手Q"
	}
}