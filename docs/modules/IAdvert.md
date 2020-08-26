### ** * needInitAdServiceFirst: boolean**
- 是否需要先初始化广告服务


### ** * initAdService(params: AdvertInitParams): Promise**
- 初始化广告服务


### ** * createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd**
是个单例
创建激励视频广告对象


### ** * createBannerAd(params: BannerAdCreateParam): IBannerAd**
- 创建条幅广告对象


### ** * supportInterstitialAd: boolean**
- 是否支持插屏广告


### ** * createInterstitialAd(params: InterstitialAdCreateParam): void**
- createInterstitialAd(params: InterstitialAdCreateParam): void


### ** * supportFullscreenAd: boolean**
- - @deprecated 是否支持全屏视频广告


### ** * supportFullscreenVideoAd: boolean**
- 是否支持全屏视频广告


### ** * createFullscreenVideoAd(params: FullscreenVideoAdCreateParam): void**
- 创建全屏广告


### ** * supportSplashAd: boolean**
- 是否支持开屏视频广告


### ** * createSplashAd(params: SplashAdCreateParam): void**
- 创建开屏广告


### ** * supportFeedAd: boolean**
- 是否支持信息流广告


### ** * createFeedAd(params: FeedAdCreateParam): IFeedAd**
- 创建信息流广告


### ** * createBxmFeedAd(params: FeedAdCreateParam): IFeedAd**
- createBxmFeedAd(params: FeedAdCreateParam): IFeedAd


### ** * createFloatIconAd(params: FloatIconAdCreateParam): IFloatIconAd**
- createFloatIconAd(params: FloatIconAdCreateParam): IFloatIconAd


### ** * selectAdvertPlatform(params: ParamType): Promise**
- 切换广告平台
- ***参数定义***

```typescript
type ParamType = {
	/**
	 * 广告平台
	 * - 安卓平台现有：
	 *  - `yomobadvert` yomob广告
	 *  - `gdtadvert` 广点通广告
	 *  - `ttadadvert` 穿山甲广告
	 * - ios平台现有：
	 *  - `gdtadvert` 广点通广告
	 *  - `ttadadvert` 头条广告
	 *  - `facebookadvert` facebook广告
	 *  - `ironsourceadvert` ironsource广告
	 */
	platform: string
}

```


### ** * initMultAdSlot(params: VideoAdSlot[]): Promise**
- 切换广告平台

