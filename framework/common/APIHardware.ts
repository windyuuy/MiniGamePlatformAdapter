
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })
	class Vibration implements IVibration {
		async vibrateLong() {
			devlog.info("vibrateLong")
		}
		async vibrateShort() {
			devlog.info("vibrateShort")
		}
	}
	class Performance implements GDK.IPerformance {
		_performance: wx.Performance = wx.getPerformance()
		getMicroTime(): GDK.TMicroSecond {
			return new Date().getTime() * 1000
		}
		tryGC?(): void {
			devlog.info('tryGC')
		}
		onMemoryWarning?(callback: (res: GDK.MemoryWarningInfo) => void): void {
			devlog.info('register onMemoryWarning')
		}
	}

	export class HardwareBase implements IHardware {
		vibration: IVibration = new Vibration()
	}
}
