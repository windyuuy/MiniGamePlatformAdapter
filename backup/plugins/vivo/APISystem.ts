
namespace VIVOGDK {

	const devlog = Common.devlog

	class Clipboard implements GDK.IClipboard {
		getData(): Promise<GDK.ClipboardData> {
			const ret = new GDK.RPromise<GDK.ClipboardData>()
			qg.getClipboardData({
				success: (res) => {
					ret.success({ data: res.text })
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setData(res: GDK.ClipboardData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			qg.setClipboardData({
				text: res.data,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail
			})
			return ret.promise
		}
	}

	export class APISystem extends GDK.APISystemBase {
		clipboard?: GDK.IClipboard = new Clipboard()

		init() {
		}

		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			qg.exitApplication()
			ret.success()
			return ret.promise
		}

		updateProgramForce(): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				qg.onUpdateReady(function (res) {
					if (res == 1) {
						qg.showDialog(
							{
								title: "提示",
								message: "新版本已经下载完成！",
								buttons: [
									{
										text: '更新',
										color: '#33dd44'
									}
								],
								success: function (data) {
									console.log('handling callback')
									qg.applyUpdate();
								},
							}
						)

					} else
						resolve()
				});
			})
		}

		onShow?(callback: (data: any) => void): void {
			return qg.onShow(callback)
		}
		offShow?(callback: Function): void {
			return qg.offShow(callback)
		}
		onHide?(callback: Function): void {
			return qg.onHide(callback)
		}
		offHide?(callback: Function): void {
			return qg.offHide(callback)
		}

	}

}
