
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
		userdata: IUserData
		gameInfo: IGameInfo
		systemInfo: ISystemInfo
		share: IShare
		pay: IPay
		adver: IAdvert

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