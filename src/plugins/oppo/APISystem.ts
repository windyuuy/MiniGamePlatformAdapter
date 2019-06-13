
namespace OPPOGDK {

	const devlog = Common.devlog

	export class APISystem extends GDK.APISystemBase {
		init() {
			devlog.warn("oppo apisystem")
			super.init()
		}
		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			qg.exitApplication({
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail()
				}
			})
			return ret.promise
		}
		onShow?(callback: (data: any) => void): void {
			qg.onShow(callback)
		}
		offShow?(callback: Function): void {
			qg.offShow(callback)
		}
		onHide?(callback: Function): void {
			qg.onHide(callback)
		}
		offHide?(callback: Function): void {
			qg.offHide(callback)
		}
	}
}