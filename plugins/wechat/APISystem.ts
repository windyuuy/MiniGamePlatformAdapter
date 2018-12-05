
namespace WechatGDK {
	export class APISystem extends GDK.APISystemBase {
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
						console.log("检查更新开始:")
						if (hasUpdate.hasUpdate) {
							console.log('有更新')
							// wx.showLoading({title:"检查更新中...",mask:true})
						} else {
							console.log('没有更新')
							wx.hideLoading({})
							resolve()
						}
					})

					updateManager.onUpdateReady(() => {
						console.log("更新完成")
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
						console.log("更新失败")
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
	}
}
