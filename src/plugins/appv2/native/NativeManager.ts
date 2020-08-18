namespace UnityAppGDK {
	export class NativeManager {

		protected _nativeAdvert!: CS.Glee.Bridge.AdvertAddonWrapper;
		protected getAddon(): CS.Glee.Bridge.AdvertAddonWrapper {
			if (this._nativeAdvert != null) {
				return this._nativeAdvert;
			}
			if (window["CS"]) {
				let plugin = CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus")
				if (plugin != null) {
					this._nativeAdvert = plugin.advert
					if (this._nativeAdvert == null) {
						console.warn("bus未集成广告模块")
					}
				} else {
					console.warn("bus模块不存在")
				}
			} else {
				console.error("CS.Glee不存在")
			}
			return this._nativeAdvert;
		}

		public _channelWrapper!: CS.Glee.Bridge.ChannelPluginWrapper;
		public getWrapper(): CS.Glee.Bridge.ChannelPluginWrapper {
			if (this._channelWrapper != null) {
				return this._channelWrapper;
			}
			if (window["CS"]) {
				let plugin = CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus")
				if (plugin != null) {
					this._channelWrapper = plugin
				} else {
					console.warn("bus模块不存在")
				}
			} else {
				console.error("CS.Glee不存在")
			}
			return this._channelWrapper;
		}

		public isSupport() :boolean {
			return this.getWrapper() != null;
		}
	}
	export const nativeManager = new NativeManager()
}
