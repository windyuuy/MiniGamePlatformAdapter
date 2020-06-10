namespace UnityAppGDK {
    const devlog = Common.devlog

    export class AdvertUnitRaw {

        protected _nativeAdvert!: CS.Glee.Bridge.AdvertAddonWrapper;
        protected getAddon(): CS.Glee.Bridge.AdvertAddonWrapper {
            if (this._nativeAdvert != null) {
                return this._nativeAdvert;
            }
            this._nativeAdvert = CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus").advert
            return this._nativeAdvert;
        }

        nativeUnitInfo: AdUnitQueryInfo = new AdUnitQueryInfo();

        constructor(
            params: AdCreateInfo
        ) {
            this.getAddon().CreateAdUnit(params, new TaskCallback<CreateAdUnitResult>({
                onSuccess: (p) => {
                    this.nativeUnitInfo = p.info;
                },
                onFailed: (e) => {
                    console.error("创建广告单元失败:", JSON.stringify(e));
                }
            }))
        }

        public static isAdvertTypeSupported(advertType: string): boolean {
            return CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus").advert.IsAdvertTypeSupported(advertType)
        }

        public load(callbacks: TaskCallback<AnyResult>) {
            this.getAddon().LoadAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()), callbacks);
        }

        public show(callbacks: TaskCallback<ShowAdUnityResult>) {
            this.getAddon().ShowAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()), callbacks);
        }

        get isReady(): boolean {
            return this.getAddon().IsAdUnitReady(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()))
        }

        get isAlive(): boolean {
            return this.getAddon().IsAdUnitAlive(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()))
        }

        public destroy() {
            this.getAddon().DestroyAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo())
                , new TaskCallback<AnyResult>({
                    onSuccess: (p) => {
                    },
                    onFailed: (e) => {
                        console.error("destory advert unit failed: " + e);
                    }
                }))
        }
    }
}
