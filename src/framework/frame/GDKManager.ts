declare let gdk: GDK.UserAPI
namespace GDK {

	export class GDKManager {
		protected _configMap: { [key: string]: PackConfig } = {}
		protected _pluginMap: { [key: string]: UserAPI } = {}

		/**
		 * 注册GDK插件配置
		 * @param name 插件名
		 * @param config 插件配置
		 */
		registPluginConfig(name: string, config: PackConfig) {
			slib.assert(!this._configMap[name], `config name ${name} exists already!`)
			this._configMap[name] = config
			defaultGDKName = name
		}

		/**
		 * 通过配置模板生成插件
		 */
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
		init(info: GDKConfig) {
			for (let k in this._pluginMap) {
				const plugin = this.getPlugin(k)
				// 初始化插件内各个模块
				plugin['_init'](info)
			}
		}

		/**
		 * 传入配置并初始化
		 */
		async initWithGDKConfig(info: GDKConfig): Promise<void> {
			for (let k in this._pluginMap) {
				const plugin = this.getPlugin(k)
				// 初始化插件内各个模块
				await plugin['_initWithConfig'](info)
			}
		}

		/**
		 * 创建插件对象，并注册
		 */
		instantiateGDKInstance() {
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
		init() {
			gdkManager.instantiateGDKInstance()
			gdkManager.setDefaultGdk(defaultGDKName)
			return this
		}

		get pluginName(): string {
			return defaultGDKName
		}

		async initConfig(config: GDKConfig): Promise<void> {
			await gdkManager.initWithGDKConfig(config)
		}
	}

	window['gdk'] = new FakeUserApi()
}
