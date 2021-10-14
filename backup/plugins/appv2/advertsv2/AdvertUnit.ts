namespace AppV2GDK {
    const devlog = Common.devlog

    export class AdvertUnit implements GDK.IAdvertUnit {

        adUnitRaw!: AdvertUnitRaw

        public async init(
            params: GDK.AdCreateInfo
        ) {
            let createInfo = new AdCreateInfo();
            createInfo.advertType = params.advertType;
            createInfo.appId = params.appId!;
            createInfo.placementId = params.placementId!;
            createInfo.isDebug = params.isDebug!;
            this.adUnitRaw = new AdvertUnitRaw()
            await this.adUnitRaw.init(createInfo)
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
        show(opInfo?: GDK.IShowAdUnitOpInfo): Promise<GDK.ShowAdUnityResult> {
            let ret = new GDK.RPromise<GDK.ShowAdUnityResult>()

            let showOpInfo = new ShowAdUnitOpInfo()
            if (opInfo != null && typeof (opInfo.scene) == "string") {
                showOpInfo.scene = opInfo.scene
            }

            this.adUnitRaw.show(showOpInfo, new TaskCallback<GDK.ShowAdUnityResult>({
                onSuccess: (p) => {
                    ret.success(p)
                },
                onFailed: (e) => {
                    ret.fail(new ErrorInfo(e))
                },
            }))

            return ret.promise
        }

        setStyle(style: AdUnitStyle): void {
            this.adUnitRaw.setStyle(style);

        }

        hide(): void {
            this.adUnitRaw.hide();
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
