
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })
	export abstract class APISystemBase implements IAPISystem {
		abstract init?()
		async navigateToApp?(params: GDK.AppCallUpParams): Promise<GDK.AppCallUpResult> {
			devlog.info("打开小程序成功")
			return null
		}
	}
}
