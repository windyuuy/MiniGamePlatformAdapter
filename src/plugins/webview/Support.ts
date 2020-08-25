
namespace WebViewGDK {
	export class Support extends GDK.SupportBase {
		pluginName = "webview"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "androidWebview"
	}
}