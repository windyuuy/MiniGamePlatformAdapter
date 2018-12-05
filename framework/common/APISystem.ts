
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })
	export class APISystemBase implements IAPISystem {
		async navigateToApp?(params: GDK.AppCallUpParams): Promise<GDK.AppCallUpResult> {
			devlog.info("打开小程序成功")
			return null
		}
		async exitProgram?(): Promise<void> {
			devlog.info("正在退出")
			window.close();
		}
	}
}
