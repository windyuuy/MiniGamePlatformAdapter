
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

	export class HardwareBase implements IHardware {
		vibration: IVibration = new Vibration()
	}
}
