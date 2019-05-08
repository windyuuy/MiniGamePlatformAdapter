declare let gdk: GDK.UserAPI
namespace GDK {

	export class GDKManager {
		protected _configMap: { [key: string]: PackConfig } = {}
		protected _pluginMap: { [key: string]: UserAPI } = {}

		registPluginConfig(name: string, config: PackConfig) {
			slib.assert(!this._configMap[name], `config name ${name} exists already!`)
			this._configMap[name] = config
			defaultGDKName = name
		}

		protected genGdk(temp: ModuleClassMap) {
			let map: IModuleMap = {} as IModuleMap
			const addonList = []
			for (let k in temp) {
				// let pname = k[0].toLocaleLowerCase() + k.substr(1);
				let headLen = 0
				for (let c of k) {
					if (c.toLocaleLowerCase() == c) {
						break
					}
					headLen++
				}
				let pname = k
				if (headLen == 1) {
					pname = k[0].toLocaleLowerCase() + k.substr(1)
				} else {
					pname = k.substring(0, headLen - 1).toLocaleLowerCase() + k.substring(headLen - 1)
				}
				map[pname] = new temp[k]();
				addonList.push(map[pname])
			}
			let api = new UserAPI(map)
			for (let addon of addonList) {
				addon.api = api
			}
			return api;
		}

		/**
		 * 设置默认插件
		 */
		setDefaultGdk(name: string) {
			const api: UserAPI = this._pluginMap[name]
			slib.assert(!!api, `invalid api instance [${name}]`)
			if (gdk instanceof UserAPI) {
				slib.assert(!gdk, '-[GDK] default gdk instance shall not be set twice')
			}
			gdk = api
			window["gdk"] = api
		}

		getPlugin(name: string): UserAPI {
			return slib.assert(this._pluginMap[name], `plugin [${name}] not exist`)
		}

		/**
		 * 传入配置并初始化
		 */
		initWithGDKConfig(info: GDKConfig) {
			for (let k in this._pluginMap) {
				const plugin = this.getPlugin(k)
				// 初始化插件内各个模块
				plugin['_initWithConfig'](info)
			}
		}

		/**
		 * 创建插件对象
		 */
		initializeGDKInstance() {
			for (let k in this._configMap) {
				const plugin = this.genGdk(new this._configMap[k].register)
				this._pluginMap[k] = plugin
			}
		}
	}

	export const gdkManager = new GDKManager()

	/**
	 * 初始入口
	 */
	class FakeUserApi {
		get pluginName(): string {
			return defaultGDKName
		}

		initConfig(config: GDKConfig) {
			gdkManager.initializeGDKInstance()
			gdkManager.setDefaultGdk(defaultGDKName)
			gdkManager.initWithGDKConfig(config)
		}
	}

	window['gdk'] = new FakeUserApi()
}
