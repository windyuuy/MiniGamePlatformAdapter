
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
       public advertType: AdvertType;
   }

   export class AdvertType {
       public FullscreenVideoAdvert: string;
       public InterstitialAdvert: string;
       public FeedAdvert: string;
       public SplashAdvert: string;
       public FloatIconAdvert: string;
       public RewardedVideoAdvert: string;
       public BannerAdvert: string;
   }

   export class AdPlatformConfigs {
       public defaultBannerAdvertPlacementId: string;
       public defaultRewardedVideoAdvertPlacementId: string;
       public defaultFullscreenVideoAdvertPlacementId: string;
       public defaultInterstitialAdvertPlacementId: string;
       public appId: string;
       public defaultFeedAdvertPlacementId: string;
       public defaultFloatIconAdvertPlacementId: string;
       public defaultSplashAdvertPlacementId: string;
   }

   export class AdCreateInfo {
       public appId: string;
       public advertType: string;
       public placementId: string;
       public isDebug: boolean;
   }

   export class CreateAdUnitResult {
       public info: AdUnitQueryInfo;
   }

   export class AdUnitQueryInfo {
       public placementId: string;
       public unitId: string;
       public sdkName: string;
       public advertType: string;
   }

   export class AdUnitOpInfo {
       public opInfo: ShowAdUnitOpInfo;
       public queryInfo: AdUnitQueryInfo;
   }

   export class ShowAdUnitOpInfo {
       public scene: string;
   }

   export class ShowAdUnityResult {
       public isEnded: boolean;
       public couldReward: boolean;
   }

   export class SetAdUnitStyleInfo {
       public queryInfo: AdUnitQueryInfo;
       public styleInfo: AdUnitStyle;
   }

   export class AdUnitStyle {
       public x: number;
       public width: number;
       public height: number;
       public bottom: number;
       public y: number;
       public top: number;
   }

   export class AdUnitStatus {
   }

   export class AdUnitInfo {
       public placementId: string;
       public appId: string;
       public sdkName: string;
       public advertType: string;
   }

   export class AdvertEvent {
       public data: any;
       public key: string;
   }

}
