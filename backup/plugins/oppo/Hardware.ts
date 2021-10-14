
namespace OPPOGDK {
	class Vibration implements GDK.IVibration {
		async vibrateLong() {
			const ret = new GDK.RPromise<void>()
			qg.vibrateLong({
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail()
				}
			})
			return ret.promise
		}
		async vibrateShort() {
			const ret = new GDK.RPromise<void>()
			qg.vibrateShort({
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail()
				}
			})
			return ret.promise
		}
	}

	class Performance implements GDK.IPerformance {
		_performance: qg.Performance = qg.getPerformance()
		getMicroTime(): GDK.TMicroSecond {
			return this._performance.now()
		}
		tryGC(): void {
			qg.triggerGC()
		}
		onMemoryWarning(callback: (res: GDK.MemoryWarningInfo) => void): void {
			// qg.onMemoryWarning(callback)
		}
	}

	class Screen implements GDK.IScreen {
		getBrightness(): Promise<GDK.BrightnessData> {
			const ret = new GDK.RPromise<GDK.BrightnessData>()
			qg.getScreenBrightness({
				success: (res) => {
					ret.success(res)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setBrightness(data: GDK.BrightnessData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			qg.setScreenBrightness({
				value: data.value,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setKeepScreenOn(res: { keepon: boolean }): Promise<void> {
			const ret = new GDK.RPromise<void>()
			qg.setKeepScreenOn({
				keepScreenOn: res.keepon,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail,
			})
			return ret.promise
		}
	}

	export class Hardware implements GDK.IHardware {
		vibration = new Vibration()
		performance = new Performance()
		screen = new Screen()
	}
}
