
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
		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			let sysInfo = qg.getSystemInfoSync()
			callback({ left: 0, right: 0, top: sysInfo.notchHeight, bottom: 0 });
		}
		setLoadingProgress(param:{progress:number}){
			qg.setLoadingProgress(param);
			if(param && param.progress && param.progress>=100){
				this.loadComplete({});
			}
		}
		loadComplete(param:object){
			qg.loadingComplete({});
		}
		setEnableDebug(res: { enableDebug: boolean }) {
			const ret = new GDK.RPromise<void>()
			qg.setEnableDebug({
				enableDebug: res.enableDebug,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail
			})
			return ret.promise
		}
	}
}
