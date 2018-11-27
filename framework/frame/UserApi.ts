
namespace GDK {
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		private _m: IModuleMap = null;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}
		login(params: LoginParams): Promise<LoginResult> { return this._m.login.login(params) }
		support() { }
		/** 当前实际平台 */
		platform: string | "oppo" | "qqplay"
		get userdata(): IUserData { return this._m.userdata }
		get gameInfo(): IGameInfo { return this._m.gameInfo }
		get systemInfo(): ISystemInfo { return this._m.systemInfo }

		/**
		 * 获取当前服务器时间
		 */
		getServerTime: () => Date;
	}

	export function genGdk(temp: ModuleClassMap) {
		let map: IModuleMap = {} as IModuleMap
		for (let k in temp) {
			let pname = k[0].toLocaleLowerCase() + k.substr(1);
			map[pname] = new temp[k]();
		}
		let api = new UserAPI(map)
		return api;
	}

}