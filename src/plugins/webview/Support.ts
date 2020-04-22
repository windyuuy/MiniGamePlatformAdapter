
namespace AppGDK {
	export class Support implements GDK.ISupport {
		pluginName = "webview"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "androidWebview"
	}
}