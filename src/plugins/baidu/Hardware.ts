
namespace BaiduGDK {
	class Vibration implements GDK.IVibration {
		async vibrateLong() {
			const ret = new GDK.RPromise<void>()
			swan.vibrateLong({
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
			swan.vibrateShort({
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
		_performance = swan.getPerformance()
		getMicroTime(): GDK.TMicroSecond {
			return this._performance.now()
		}
		tryGC(): void {
			swan.triggerGC()
		}
		onMemoryWarning(callback: (res: GDK.MemoryWarningInfo) => void): void {
			swan.onMemoryWarning(callback)
		}
	}

	class Screen implements GDK.IScreen {
		getBrightness(): Promise<GDK.BrightnessData> {
			const ret = new GDK.RPromise<GDK.BrightnessData>()
			swan.getScreenBrightness({
				success: (res) => {
					ret.success(res)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setBrightness(data: GDK.BrightnessData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			swan.setScreenBrightness({
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
			swan.setKeepScreenOn({
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
