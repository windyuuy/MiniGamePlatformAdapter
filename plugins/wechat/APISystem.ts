
namespace WechatGDK {
	export class APISystem implements GDK.APISystemBase {
		navigateToApp?(params: GDK.AppCallUpParams): Promise<GDK.AppCallUpResult> {
			const ret = new GDK.RPromise<GDK.AppCallUpResult>()
			const params2 = {
				...params,
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_CALL_UP_MINI_PROGRAM_FAILED))
				}
			}
			wx.navigateToMiniProgram(params2)
			return ret.promise
		}
	}
}
