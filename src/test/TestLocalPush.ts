
namespace TestGDK {
	export class TestLocalPush implements ITest {
		api: GDK.UserAPI

		async main(): Promise<TestResult> {
			await this.api.requireLocalNoticePermission()
			let { enabled } = await this.api.isLocalNoticeEnabled()
			console.log("isLocalNoticeEnabled:", enabled)
			// await this.api.removeAllLocalNotices()

			let bundles = []

			{
				let bundle = new GDK.LocalPushBundle()
				bundle.identifier = "1"
				bundle.interval = 20000
				bundle.title = "标题1"
				bundle.content = "测试内容"
				bundle.ticker = "哈哈哈1"
				bundles.push(bundle)
			}
			{
				let bundle = new GDK.LocalPushBundle()
				bundle.identifier = "2"
				bundle.interval = 5000
				bundle.title = "标题2"
				bundle.content = "测试内容"
				bundle.ticker = "哈哈哈2"
				bundles.push(bundle)
			}
			{
				let bundle = new GDK.LocalPushBundle()
				bundle.identifier = "3"
				bundle.interval = 3000
				bundle.title = "标题3"
				bundle.content = "测试内容"
				bundle.ticker = "哈哈哈3"
				bundles.push(bundle)
			}
			{
				let bundle = new GDK.LocalPushBundle()
				bundle.identifier = "3"
				bundle.interval = 3000
				bundle.title = "标题4"
				bundle.content = "测试内容"
				bundle.ticker = "哈哈哈4"
				bundles.push(bundle)
			}
			await this.api.addLocalNotices([{
				identifier: "4343",
				interval: 2332,
			}])
			await this.api.addLocalNotices([bundles[0], bundles[1], bundles[2],])
			await this.api.removeLocalNoticeWithID({ identifier: "3" })
			await this.api.addLocalNotices([bundles[3]])
			return new TestResult()
		}
	}
}
