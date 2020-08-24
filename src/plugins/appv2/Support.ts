
namespace UnityAppGDK {
	export class Support implements GDK.ISupport {
		pluginName = "appv2"
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		apiPlatform = "native"
		requireAuthorize: boolean = false
		apiNameLocale: string = "原生APP"
		supportBuiltinCommitLog:boolean=true
		supportBuiltinOnlineLoopLog:boolean=true
		supportBuiltinIdentityCertification:boolean=true
	}
}