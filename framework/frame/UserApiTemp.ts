
namespace GDK {
	// 自动生成，成员使用register函数注册
	export class UserAPITemp {
		private _m: IModuleMap = null;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}

		initConfig(config: GDKConfig) {
		}

		_initWithConfig(info: GDKConfig) {
			for (let key in this._m) {
				let addon = <IModule>this._m[key]
				if (addon.init) {
					addon.init()
				}
				if (addon.initWithConfig) {
					addon.initWithConfig(info)
				}
			}
		}

		support(name: string): boolean { return false }

		/** 当前实际平台 */
		platform: string | "oppo" | "qqplay"
		get userdata(): IUserData { return this._m.userdata }
		get gameInfo(): IGameInfo { return this._m.gameInfo }
		get systemInfo(): ISystemInfo { return this._m.systemInfo }

		/** 批量导出接口 */
		$batch_export() { }

	}

}