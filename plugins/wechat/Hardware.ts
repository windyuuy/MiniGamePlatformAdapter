
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

	export class Hardware implements GDK.IHardware {
		vibration: GDK.IVibration = new Vibration()
	}
}
