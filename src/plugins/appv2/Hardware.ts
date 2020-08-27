
namespace AppV2GDK {
	const devlog = Common.devlog
	class Vibration implements GDK.IVibration {
		async vibrateLong() {
			devlog.info("vibrateLong")
			// 使手机发生较长时间的振动（400 ms）
			window['jsb'].device.vibrate(0.4)
		}
		async vibrateShort() {
			devlog.info("vibrateShort")
			// 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
			window['jsb'].device.vibrate(0.015)
		}
		async vibrate(params: { duration: number }) {
			devlog.info("vibrate", params)
			window['jsb'].device.vibrate(params.duration)
		}
	}
	export class Hardware extends GDK.HardwareBase {
		vibration: GDK.IVibration = new Vibration()
	}
}
