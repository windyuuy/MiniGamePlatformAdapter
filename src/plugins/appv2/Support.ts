
namespace UnityAppGDK {
	export class Support extends GDK.SupportBase {
		requireManagerAdLifecycle: boolean = false
		isNativePlugin: boolean = true
		pluginName = "appv2"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "原生APP"
		supportBuiltinCommitLog: boolean = true
		supportBuiltinOnlineLoopLog: boolean = true
		supportBuiltinIdentityCertification: boolean = true
	}
}