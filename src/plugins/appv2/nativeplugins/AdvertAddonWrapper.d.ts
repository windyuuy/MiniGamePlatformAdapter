
declare namespace CS.Glee.Bridge {
   export class AdvertAddonWrapper {

		/**
		* 判断广告类型是否支持
		*/
        public IsAdvertTypeSupported (info: String): boolean;

		/**
		* 预加载广告
		*/
        public PreloadAdvert (info: AdvertPreloadInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 对广告平台进行一些设置
		*/
        public SetAdPlatformConfigs (info: AdPlatformConfigs, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 创建广告单元
		*/
        public CreateAdUnit (info: AdCreateInfo, callbacks: TaskCallback<CreateAdUnitResult>):void;

		/**
		* 加载
		*/
        public LoadAdUnit (info: AdUnitOpInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 展示
		*/
        public ShowAdUnit (info: AdUnitOpInfo, callbacks: TaskCallback<ShowAdUnityResult>):void;

		/**
		* 隐藏
		*/
        public HideAdUnit (info: AdUnitOpInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 销毁
		*/
        public DestroyAdUnit (info: AdUnitOpInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 广告是否已经加载
		*/
        public IsAdUnitReady (info: AdUnitOpInfo): boolean;

		/**
		* 广告单元是否还可用
		*/
        public IsAdUnitAlive (info: AdUnitOpInfo): boolean;

		/**
		* 设置广告样式（比如banner广告）
		*/
        public SetAdUnitStyle (info: SetAdUnitStyleInfo, callbacks: TaskCallback<AdUnitStyle>):void;

		/**
		* 设置广告点击区域样式
		*/
        public SetAdUnitClickZoneStyle (info: SetAdUnitStyleInfo, callbacks: TaskCallback<AdUnitStyle>):void;

		/**
		* 判断广告单元是否可用（如判断视频广告、banner广告是否已经加载）
		*/
        public GetAdUnitStatus (info: AdUnitOpInfo): AdUnitStatus;

		/**
		* 获取广告单元信息
		*/
        public GetAdUnitInfo (info: AdUnitOpInfo): AdUnitInfo;

        public SetAdUnitEventListener (info: AdUnitOpInfo, callbacks: TaskCallback<AdvertEvent>):void;

    }

   export class AdvertPreloadInfo {
       public advertType!: AdvertType;
   }

   export class AdvertType {
       public BannerAdvert!: string;
       public RewardedVideoAdvert!: string;
       public FullscreenVideoAdvert!: string;
       public InterstitialAdvert!: string;
       public SplashAdvert!: string;
       public FeedAdvert!: string;
   }

   export class AdPlatformConfigs {
       public defaultSplashAdvertPlacementId!: string;
       public defaultRewardedVideoAdvertPlacementId!: string;
       public defaultInterstitialAdvertPlacementId!: string;
       public appId!: string;
       public defaultFullscreenVideoAdvertPlacementId!: string;
       public defaultBannerAdvertPlacementId!: string;
       public defaultFeedAdvertPlacementId!: string;
   }

   export class AdCreateInfo {
       public appId!: string;
       public isDebug!: boolean;
       public placementId!: string;
       public advertType!: string;
   }

   export class CreateAdUnitResult {
       public info!: AdUnitQueryInfo;
   }

   export class AdUnitQueryInfo {
       public advertType!: string;
       public placementId!: string;
       public sdkName!: string;
       public unitId!: string;
   }

   export class AdUnitOpInfo {
       public opInfo!: ShowAdUnitOpInfo;
       public queryInfo!: AdUnitQueryInfo;
   }

   export class ShowAdUnitOpInfo {
       public scene!: string;
   }

   export class ShowAdUnityResult {
       public isEnded!: boolean;
       public couldReward!: boolean;
   }

   export class SetAdUnitStyleInfo {
       public styleInfo!: AdUnitStyle;
       public queryInfo!: AdUnitQueryInfo;
   }

   export class AdUnitStyle {
       public top!: number;
       public bottom!: number;
       public x!: number;
       public height!: number;
       public width!: number;
       public y!: number;
   }

   export class AdUnitStatus {
   }

   export class AdUnitInfo {
       public advertType!: string;
       public sdkName!: string;
       public placementId!: string;
       public appId!: string;
   }

   export class AdvertEvent {
       public key!: string;
       public data!: any;
   }

}
