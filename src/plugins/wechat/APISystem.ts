
namespace WechatGDK {

	const devlog = Common.devlog

	class Clipboard implements GDK.IClipboard {
		getData(): Promise<GDK.ClipboardData> {
			const ret = new GDK.RPromise<GDK.ClipboardData>()
			SDKProxy.getClipboardData({
				success: (res) => {
					ret.success(res)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setData(res: GDK.ClipboardData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			SDKProxy.setClipboardData({
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

		init() {
		}

		setEnableDebug(res: { enableDebug: boolean }) {
			const ret = new GDK.RPromise<void>()
			SDKProxy.setEnableDebug({
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
			devlog.info('SDKProxy.navigateToMiniProgram(params2)', params2)
			SDKProxy.navigateToMiniProgram(params2)
			return ret.promise
		}
		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			SDKProxy.exitMiniProgram({
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
				SDKProxy.showLoading({ title: "检查更新中...", mask: true })
				let updateManager = SDKProxy.getUpdateManager()
				if (updateManager) {
					updateManager.onCheckForUpdate((hasUpdate) => {
						devlog.info("检查更新开始:")
						if (hasUpdate.hasUpdate) {
							devlog.info('有更新')
							// SDKProxy.showLoading({title:"检查更新中...",mask:true})
						} else {
							devlog.info('没有更新')
							SDKProxy.hideLoading({})
							resolve()
						}
					})

					updateManager.onUpdateReady(() => {
						devlog.info("更新完成")
						SDKProxy.hideLoading({})
						SDKProxy.showModal(
							{
								title: "提示",
								content: "新版本已经下载完成！",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										SDKProxy.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})

					updateManager.onUpdateFailed(() => {
						devlog.info("更新失败")
						SDKProxy.hideLoading({})
						SDKProxy.showModal(
							{
								title: "提示",
								content: "更新失败,请重启游戏",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										SDKProxy.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})
				}
			})
		}

		onShow?(callback: (data: any) => void): void {
			return SDKProxy.onShow(callback)
		}
		offShow?(callback: Function): void {
			return SDKProxy.offShow(callback)
		}
		onHide?(callback: Function): void {
			return SDKProxy.onHide(callback)
		}
		offHide?(callback: Function): void {
			return SDKProxy.offHide(callback)
		}

		setFPS(fps: number): void {
			wx.setPreferredFramesPerSecond(fps)
		}

		onMemoryWarning(call: (res: GDK.IOnMemoryWarningResult) => void): void {
			wx.onMemoryWarning(call)
		}
	}

}
