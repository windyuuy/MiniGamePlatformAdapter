
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	class Clipboard implements IClipboard {
		_data: ClipboardData
		async getData(): Promise<ClipboardData> {
			return { ...this._data }
		}
		async setData(res: ClipboardData): Promise<void> {
			this._data = { ...res }
		}
	}

	export class APISystemBase implements IAPISystem {
		clipboard?: GDK.IClipboard = new Clipboard()

		async navigateToApp?(params: GDK.AppCallUpParams): Promise<GDK.AppCallUpResult> {
			devlog.info("打开小程序成功")
			return null
		}
		async exitProgram?(): Promise<void> {
			devlog.info("正在退出")
			window.close();
		}
		async updateProgramForce() {
			devlog.info("没有更新")
		}
	}
}
