namespace GDK {

    export enum AdvertType {
        /**
         * 条幅广告
         */
        BannerAdvert = "BannerAdvert",
        /**
         * 激励视频广告
         */
        RewardedVideoAdvert = "RewardedVideoAdvert",

        /**
         * 全屏视频广告
         */
        FullscreenVideoAdvert = "FullscreenVideoAdvert",

        /**
         * 原生信息流广告
         */
        FeedAdvert = "FeedAdvert",

        /**
         * 插屏广告
         */
        InterstitialAdvert = "InterstitialAdvert",
    }

    export class AdCreateInfo {
        constructor(info: AdCreateInfo) {
            this.advertType = info.advertType
            this.appId = info.appId
            this.placementId = info.placementId
            this.isDebug = info.isDebug
        }
        advertType!: AdvertType;
        appId?: string;
        placementId?: string;
        isDebug?: boolean = false;
    }

    export class ShowAdUnityResult {
        public couldReward: boolean = false;
        public isEnded: boolean = false;
    }

    export interface IAdvertUnit {
        load(): Promise<void>
        show(): Promise<ShowAdUnityResult>
        readonly isReady: boolean
        readonly isAlive: boolean
        destroy(): void
    }

    export interface IAdvertV2 extends IModule {
		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
        createAdvertUnit(createInfo: AdCreateInfo): Promise<IAdvertUnit>
        /**
         * 是否支持该类型广告
         * @param advertType 广告类型
         */
        isAdvertTypeSupported(advertType: AdvertType): boolean
    }
}
