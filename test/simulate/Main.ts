
namespace TestGDK {
	export const devlog = new slib.Log({ tags: ["[gdk]", "[wechat]"] });

	export class Main {
		api!: GDK.UserAPI

		constructor(api?: GDK.UserAPI) {
			this.init(this.api)
		}

		init(api: GDK.UserAPI) {
			this.api = api
		}

		async testAllModules() {
			await this.testModule(TestLocalPush)
		}

		async testModule(module: new () => ITest) {
			let obj = new module()
			obj.api = this.api
			let ret = await obj.main()
			if (ret.succeed) {
				devlog.info(`passed module <${module.name}>`)
			} else {
				devlog.error(`failed module <${module.name}>, reason: ${ret.reason}`)
			}
		}
	}
}
