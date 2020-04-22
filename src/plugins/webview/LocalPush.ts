
namespace AppGDK {

	const devlog = Common.devlog

	export class LocalPush implements GDK.ILocalPush {
		api?: GDK.UserAPI

		init() {
			SDKProxy.nativeLocalPush.init()

			// setTimeout(async () => {
			// 	await this.api.requireLocalNoticePermission()
			// 	let { enabled } = await this.api.isLocalNoticeEnabled()
			// 	console.log("isLocalNoticeEnabled:", enabled)
			// 	// await this.api.removeAllLocalNotices()

			// 	let bundles = []

			// 	{
			// 		let bundle = new GDK.LocalPushBundle()
			// 		bundle.identifier = "1"
			// 		bundle.interval = 20000
			// 		bundle.title = "标题1"
			// 		bundle.content = "测试内容"
			// 		bundle.ticker = "哈哈哈1"
			// 		bundles.push(bundle)
			// 	}
			// 	{
			// 		let bundle = new GDK.LocalPushBundle()
			// 		bundle.identifier = "2"
			// 		bundle.interval = 5000
			// 		bundle.title = "标题2"
			// 		bundle.content = "测试内容"
			// 		bundle.ticker = "哈哈哈2"
			// 		bundles.push(bundle)
			// 	}
			// 	{
			// 		let bundle = new GDK.LocalPushBundle()
			// 		bundle.identifier = "3"
			// 		bundle.interval = 3000
			// 		bundle.title = "标题3"
			// 		bundle.content = "测试内容"
			// 		bundle.ticker = "哈哈哈3"
			// 		bundles.push(bundle)
			// 	}
			// 	{
			// 		let bundle = new GDK.LocalPushBundle()
			// 		bundle.identifier = "3"
			// 		bundle.interval = 3000
			// 		bundle.title = "标题4"
			// 		bundle.content = "测试内容"
			// 		bundle.ticker = "哈哈哈4"
			// 		bundles.push(bundle)
			// 	}
			// 	await this.api.addLocalNotices([{
			// 		identifier: "4343",
			// 		interval: 2332,
			// 		enableVibrateTip: true,
			// 		enableLightTip: true,
			// 	}])
			// 	await this.api.addLocalNotices([bundles[0], bundles[1], bundles[2],])
			// 	await this.api.removeLocalNoticeWithID({ identifier: "3" })
			// 	await this.api.addLocalNotices([bundles[3]])
			// }, 2000)
		}

		/**
		 * 添加本地推送
		 */
		async addLocalNotices?(params: GDK.LocalPushBundle[]): Promise<void> {
			return SDKProxy.nativeLocalPush.addLocalNotices(params)
		}

		/**
		 * 移除对应的推送
		 */
		async removeLocalNoticeWithID?(params: { identifier: string }): Promise<void> {
			return SDKProxy.nativeLocalPush.removeLocalNoticeWithID(params)
		}

		/**
		 * 移除所有推送
		 */
		async removeAllLocalNotices?(): Promise<void> {
			return SDKProxy.nativeLocalPush.removeAllLocalNotices()
		}

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		async requireLocalNoticePermission?(): Promise<void> {
			return SDKProxy.nativeLocalPush.requireLocalNoticePermission()
		}

		/**
		 * 用户是否开启通知权限
		 */
		isLocalNoticeEnabled?(): Promise<{ enabled: boolean }> {
			return SDKProxy.nativeLocalPush.isLocalNoticeEnabled()
		}
	}
}