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
            if (!this.isSupport()) {
                ret.success(undefined);
                return ret.promise;
            }

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
            if (window["CS"] == null) return false;
            let plugin = CS.Glee.Bridge.PluginManager.GetInstance().GetPlugin("bus")
            if (plugin != null && plugin.advert != null) {
                return plugin.advert.IsAdvertTypeSupported(advertType)
            }
            return false
        }

        public load(callbacks: TaskCallback<AnyResult>) {
            if (!this.isSupport()) {
                console.log("不支持广告模块")
                SDKProxy.webAction("模拟广告load功能", (isOk)=> {
                    if (isOk) {
                        callbacks.onSuccess(new AnyResult())
                    } else {
                        callbacks.onFailed(undefined as any);
                    }
                })
                return 
            }
            this.getAddon().LoadAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()), callbacks);
        }

        public show(callbacks: TaskCallback<ShowAdUnityResult>) {
            if (!this.isSupport()) {
                console.log("不支持广告模块")
                SDKProxy.webAction("模拟广告show功能", (isOk)=> {
                    if (isOk) {
                        let res = new ShowAdUnityResult();
                        res.couldReward = true;
                        res.isEnded = true;
                        callbacks.onSuccess(res)
                    } else {
                        callbacks.onFailed(undefined as any);
                    }
                })
                return 
            }
            this.getAddon().ShowAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()), callbacks);
        }

        get isReady(): boolean {
            if (!this.isSupport()) {
                console.log("不支持广告模块, 默认返回true")
                return true;
            }
            return this.getAddon().IsAdUnitReady(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()))
        }

        get isAlive(): boolean {
            if (!this.isSupport()) {
                console.log("不支持广告模块, 默认返回false")
                return false;
            }
            return this.getAddon().IsAdUnitAlive(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo()))
        }

        public destroy() {
            if (!this.isSupport()) {
                console.log("不支持广告模块")
                return;
            }
            this.getAddon().DestroyAdUnit(new AdUnitOpInfo(this.nativeUnitInfo, new ShowAdUnitOpInfo())
                , new TaskCallback<AnyResult>({
                    onSuccess: (p) => {
                    },
                    onFailed: (e) => {
                        console.error("destory advert unit failed: " + e);
                    }
                }))
        }
        public isSupport() : boolean {
            return nativeManager.isSupport();
        }
    }
}
