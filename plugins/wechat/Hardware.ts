
namespace WechatGDK {
	class Vibration implements GDK.IVibration {
		async vibrateLong() {
			const ret = new GDK.RPromise<void>()
			wx.vibrateLong({
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
			wx.vibrateShort({
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
		_performance: wx.Performance = wx.getPerformance()
		getMicroTime(): GDK.TMicroSecond {
			return this._performance.now()
		}
		tryGC(): void {
			wx.triggerGC()
		}
		onMemoryWarning(callback: (res: GDK.MemoryWarningInfo) => void): void {
			wx.onMemoryWarning(callback)
		}
	}

	export class Hardware implements GDK.IHardware {
		vibration: GDK.IVibration = new Vibration()
		performance: GDK.IPerformance = new Performance()
	}
}
