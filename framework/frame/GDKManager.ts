declare let gdk: GDK.UserAPI
namespace GDK {

	export class GDKManager {
		protected _configMap = {}
		protected _pluginMap = {}

		registPluginConfig(name: string, config: PackConfig) {
			slib.assert(!this._configMap[name], `config name ${name} exists already!`)
			this._configMap[name] = config
			defaultGDKName = name
		}

		protected genGdk(temp: ModuleClassMap) {
			let map: IModuleMap = {} as IModuleMap
			for (let k in temp) {
				let pname = k[0].toLocaleLowerCase() + k.substr(1);
				map[pname] = new temp[k]();
			}
			let api = new UserAPI(map)
			return api;
		}

		setDefaultGdk(name: string) {
			const api: UserAPI = this._pluginMap[name]
			slib.assert(!gdk, '-[GDK] default gdk instance shall not be set twice')
			gdk = api
			window["gdk"] = api
		}

		getPlugin(name: string): UserAPI {
			return slib.assert(this._pluginMap[name], `plugin [${name}] not exist`)
		}

		initWithGDKConfig(info: GDKConfig) {
			for (let k in this._pluginMap) {
				const plugin = this.getPlugin(k)
				plugin._initWithConfig(info)
			}
		}

		initializeGDKInstance() {
			for (let k in this._configMap) {
				const plugin = this.genGdk(this._configMap[k])
				this._pluginMap[k] = plugin
			}
		}
	}

	export const gdkManager = new GDKManager()
}
