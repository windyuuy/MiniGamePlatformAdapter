
namespace WechatGDK {

	const devlog = Common.devlog

	class Clipboard implements GDK.IClipboard {
		getData(): Promise<GDK.ClipboardData> {
			const ret = new GDK.RPromise<GDK.ClipboardData>()
			wx.getClipboardData({
				success: (res) => {
					ret.success(res)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setData(res: GDK.ClipboardData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			wx.setClipboardData({
				data: res.data,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail
			})
			return ret.promise
		}
	}

	export class APISystem extends GDK.APISystemBase {
		clipboard?: GDK.IClipboard = new Clipboard()

		init?() {
		}

		setEnableDebug(res: { enableDebug: boolean }) {
			const ret = new GDK.RPromise<void>()
			wx.setEnableDebug({
				enableDebug: res.enableDebug,
				success: () => {
					ret.success(undefined)
				},
				fail: ret.fail
			})
			return ret.promise
		}

		navigateToApp?(params: GDK.AppCallUpParams): Promise<GDK.AppCallUpResult> {
			const ret = new GDK.RPromise<GDK.AppCallUpResult>()
			const params2 = {
				...params,
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_CALL_UP_MINI_PROGRAM_FAILED))
				}
			}
			devlog.info('wx.navigateToMiniProgram(params2)', params2)
			wx.navigateToMiniProgram(params2)
			return ret.promise
		}
		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			wx.exitMiniProgram({
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail()
				}
			})
			return ret.promise
		}

		updateProgramForce(): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				wx.showLoading({ title: "检查更新中...", mask: true })
				let updateManager = wx.getUpdateManager()
				if (updateManager) {
					updateManager.onCheckForUpdate((hasUpdate) => {
						devlog.info("检查更新开始:")
						if (hasUpdate.hasUpdate) {
							devlog.info('有更新')
							// wx.showLoading({title:"检查更新中...",mask:true})
						} else {
							devlog.info('没有更新')
							wx.hideLoading({})
							resolve()
						}
					})

					updateManager.onUpdateReady(() => {
						devlog.info("更新完成")
						wx.hideLoading({})
						wx.showModal(
							{
								title: "提示",
								content: "已更新到新版本了呦~",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										wx.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})

					updateManager.onUpdateFailed(() => {
						devlog.info("更新失败")
						wx.hideLoading({})
						wx.showModal(
							{
								title: "提示",
								content: "更新失败,请重启游戏",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										wx.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})
				}
			})
		}

		onShow?(callback: (data: any) => void): void {
			return wx.onShow(callback)
		}
		offShow?(callback: Function): void {
			return wx.offShow(callback)
		}
		onHide?(callback: Function): void {
			return wx.onHide(callback)
		}
		offHide?(callback: Function): void {
			return wx.offHide(callback)
		}

	}

}
