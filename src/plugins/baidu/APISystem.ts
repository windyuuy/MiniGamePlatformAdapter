
namespace WechatGDK {

	const devlog = Common.devlog

	class Clipboard implements GDK.IClipboard {
		getData(): Promise<GDK.ClipboardData> {
			const ret = new GDK.RPromise<GDK.ClipboardData>()
			swan.getClipboardData({
				success: (res) => {
					ret.success(res)
				},
				fail: ret.fail
			})
			return ret.promise
		}
		setData(res: GDK.ClipboardData): Promise<void> {
			const ret = new GDK.RPromise<void>()
			swan.setClipboardData({
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
			swan.setEnableDebug({
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
				appKey: params.appId,
				path: params.path,
				extraData: params.extraData,
				success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_CALL_UP_MINI_PROGRAM_FAILED))
				}
			}
			devlog.info('wx.navigateToMiniProgram(params2)', params2)
			swan.navigateToMiniProgram(params2)
			return ret.promise
		}
		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			swan.exit({
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
				swan.showLoading({ title: "检查更新中...", mask: true })
				let updateManager = swan.getUpdateManager()
				if (updateManager) {
					updateManager.onCheckForUpdate((hasUpdate) => {
						devlog.info("检查更新开始:")
						if (hasUpdate.hasUpdate) {
							devlog.info('有更新')
							// wx.showLoading({title:"检查更新中...",mask:true})
						} else {
							devlog.info('没有更新')
							swan.hideLoading({})
							resolve()
						}
					})

					updateManager.onUpdateReady(() => {
						devlog.info("更新完成")
						swan.hideLoading({})
						swan.showModal(
							{
								title: "提示",
								content: "新版本已经下载完成！",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										swan.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})

					updateManager.onUpdateFailed(() => {
						devlog.info("更新失败")
						swan.hideLoading({})
						swan.showModal(
							{
								title: "提示",
								content: "更新失败,请重启游戏",
								confirmText: "重启游戏",
								cancelText: "重启游戏",
								showCancel: false, success: (res) => {
									if (res.confirm) {
										swan.getUpdateManager().applyUpdate()
									}
								}
							}
						)
					})
				}
			})
		}

		onShow?(callback: (data: any) => void): void {
			return swan.onShow(callback)
		}
		offShow?(callback: Function): void {
			return swan.offShow(callback)
		}
		onHide?(callback: Function): void {
			return swan.onHide(callback)
		}
		offHide?(callback: Function): void {
			return swan.offHide(callback)
		}

	}

}
