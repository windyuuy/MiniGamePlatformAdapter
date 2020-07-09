namespace UnityAppGDK {
    const devlog = Common.devlog

    export class AdvertUnitRaw {

        protected getAddon(): CS.Glee.Bridge.AdvertAddonWrapper {
            return nativeManager.getWrapper().advert;
        }

        nativeUnitInfo: AdUnitQueryInfo = new AdUnitQueryInfo();

        public init(
            params: AdCreateInfo
        ): Promise<any> {
            let ret = new GDK.RPromise<any, any>();

            this.getAddon().CreateAdUnit(params, new TaskCallback<CreateAdUnitResult>({
                onSuccess: (p) => {
                    this.nativeUnitInfo = p.info;
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    console.error("创建广告单元失败:", JSON.stringify(e));
                    ret.fail(e)
                }
            }))

            return ret.promise
        }

        public static isAdvertTypeSupported(advertType: string): boolean {
            let plugin = CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus")
            if (plugin != null && plugin.advert != null) {
                return plugin.advert.IsAdvertTypeSupported(advertType)
            }
            return false
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
