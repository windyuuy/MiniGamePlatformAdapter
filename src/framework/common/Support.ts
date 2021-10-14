
namespace GDK {
	const devlog = new lang.libs.Log({ tags: ["DEVELOP"] })

	export abstract class SupportBase implements ISupport{
		supportShare: boolean=false
		supportShareTickets: boolean=false
		requireSubDomainRank: boolean = false
		requireAuthorize: boolean = false
		supportBuiltinCommitLog: boolean = false
		supportBuiltinOnlineLoopLog: boolean = false
		supportBuiltinIdentityCertification: boolean = false
		requireManagerAdLifecycle: boolean = false
		isNativePlugin: boolean = false

	}
}
