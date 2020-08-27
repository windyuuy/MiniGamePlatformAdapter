
namespace AppV2GDK {
	export class Support extends GDK.SupportBase {
		requireManagerAdLifecycle: boolean = false
		isNativePlugin: boolean = true
		supportShare: boolean = true
		supportShareTickets: boolean = false
		requireSubDomainRank: boolean = false
		requireAuthorize: boolean = false
		supportBuiltinCommitLog: boolean = true
		supportBuiltinOnlineLoopLog: boolean = true
		supportBuiltinIdentityCertification: boolean = true
	}
}