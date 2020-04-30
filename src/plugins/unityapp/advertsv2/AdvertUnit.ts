namespace UnityAppGDK {
    const devlog = Common.devlog

    export class AdvertUnit implements GDK.IAdvertUnit {

        adUnitRaw!: AdvertUnitRaw
        constructor(
            params: GDK.AdCreateInfo
        ) {
            let createInfo = new AdCreateInfo();
            createInfo.advertType = params.advertType;
            createInfo.appId = params.appId!;
            createInfo.placementId = params.placementId!;
            createInfo.isDebug = params.isDebug!;
            this.adUnitRaw = new AdvertUnitRaw(createInfo)
        }

        load(): Promise<void> {
            let ret = new GDK.RPromise<void>()

            this.adUnitRaw.load(new TaskCallback<AnyResult>({
                onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(new ErrorInfo(e))
                },
            }))

            return ret.promise
        }
        show(): Promise<GDK.ShowAdUnityResult> {
            let ret = new GDK.RPromise<GDK.ShowAdUnityResult>()

            this.adUnitRaw.show(new TaskCallback<GDK.ShowAdUnityResult>({
                onSuccess: (p) => {
                    ret.success(p)
                },
                onFailed: (e) => {
                    ret.fail(new ErrorInfo(e))
                },
            }))

            return ret.promise
        }

        get isReady(): boolean {
            return this.adUnitRaw.isReady
        }

        get isAlive(): boolean {
            return this.adUnitRaw.isAlive
        }

        destroy(): void {
            this.adUnitRaw.destroy()
        }

    }
}
