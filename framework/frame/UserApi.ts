
namespace GDK {
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		private _m: IModuleMap = null;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}
		login(params: LoginParams): Promise<LoginResult> { return this._m.login.login(params) }
		support() { }
		platform: string | "oppo" | "qqplay"
		settings: ISystemInfo
		userdata: IUserData
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
window["genGdk"] = GDK.genGdk;