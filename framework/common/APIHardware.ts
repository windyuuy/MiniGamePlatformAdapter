
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
	class Performance implements IPerformance {
		getMicroTime(): TMicroSecond {
			return new Date().getTime() * 1000
		}
		tryGC?(): void {
			devlog.info('tryGC')
		}
		onMemoryWarning?(callback: (res: MemoryWarningInfo) => void): void {
			devlog.info('register onMemoryWarning')
		}
	}

	export class HardwareBase implements IHardware {
		vibration: IVibration = new Vibration()
		performance: IPerformance = new Performance()
	}
}
