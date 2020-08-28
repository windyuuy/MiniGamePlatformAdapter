/// <reference path="Common.ts" />
namespace AppV2GDK {
	const devlog = Common.devlog

	export class Advert extends GDK.AdvertBase {

		api!: GDK.UserAPI
		async initWithConfig?(_info: GDK.GDKConfigV2) {

			let advertPlatforms = []
			let strAdvertPlatforms = this.api.getAppInfoString(AppInfoKeys.advertPlatforms, null)
			if (strAdvertPlatforms != null) {
				advertPlatforms = strAdvertPlatforms.split("|")
			}
			let advertPlatform = this.api.getAppInfoString(AppInfoKeys.advertPlatform, null)

			advertPlatforms = advertPlatforms || []
			if (advertPlatforms.length == 0) {
				advertPlatform = advertPlatform || 'ironsource'
			}
			if (advertPlatform) {
				advertPlatforms.remove(advertPlatform)
				advertPlatforms.push(advertPlatform)
			}

			for (let key of advertPlatforms) {
				// 选择广告平台
				await SDKProxy.nativeAdvert.advertPlatformSelect(key)

				await SDKProxy.nativeAdvert.setRewardedVideoListener()
				if (this.supportInterstitialAd) {
					await SDKProxy.nativeAdvert.setInterstitialListener()
				}
				await SDKProxy.nativeAdvert.init({
					appKey: "ironsrcappkey", modules: {
						REWARDED_VIDEO: true,
						BANNER: true,
						INTERSTITIAL: this.supportInterstitialAd,
					}
				})
				let debug = false
				SDKProxy.nativeAdvert.setAdaptersDebug({ debug: debug })
				SDKProxy.nativeAdvert.shouldTrackNetworkState({ track: debug })
			}

		}

		protected static _videoAd: GDK.IRewardedVideoAd
		protected static _interstitialAd: GDK.IInterstitialAd
		protected static _fullscreenAd: GDK.IFullscreedVideoAd
		protected static _bannerAd: BannerAd
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (!Advert._videoAd) {
				Advert._videoAd = new VideoAd(params, this.api)
			}
			return Advert._videoAd
		}

		get supportFullscreenAd(): boolean {
			return this.supportFullscreenVideoAd
		}
		get supportFullscreenVideoAd(): boolean {
			return nativeHelper.checkActionExist("ironsrc:IronSource.showFullScreenVideo")
		}
		createFullscreenVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IFullscreedVideoAd {
			if (!Advert._fullscreenAd) {
				if (this.supportFullscreenVideoAd) {
					Advert._fullscreenAd = new FullscreenVedioAd(params, this.api)
				} else {
					// Advert._fullscreenAd = new VideoAd(params, this.api)
					devlog.error("当前app版本过低，不支持插屏广告(Interstitial)")
				}
			}
			return Advert._fullscreenAd
		}

		get supportInterstitialAd(): boolean {
			return nativeHelper.checkActionExist("ironsrc:IronSource.showInterstitial")
		}

		createInterstitialAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IInterstitialAd {
			if (!Advert._interstitialAd) {
				if (this.supportInterstitialAd) {
					Advert._interstitialAd = new InterstitialAd(params, this.api)
				} else {
					// Advert._interstitialAd = new VideoAd(params, this.api)
					devlog.error("当前app版本过低，不支持插屏广告(Interstitial)")
				}
			}
			return Advert._interstitialAd
		}

		createBannerAd(params: {
			adUnitId: string,
			viewId: number,
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			if (!Advert._bannerAd) {
				Advert._bannerAd = new BannerAd(params)
			} else {
				Advert._bannerAd.reset(params)
			}
			return Advert._bannerAd
		}

		get supportFeedAd(): boolean {
			return SDKProxy.country() == "CN" && nativeHelper.checkActionExist("ironsrc:IronSource.createFeedAd")
		}

		createFeedAd?(params: GDK.FeedAdCreateParam): GDK.IFeedAd {
			return new FeedAd(params)
		}

		async selectAdvertPlatform(params: { platform: string }): Promise<void> {
			let ret = await SDKProxy.nativeAdvert.advertPlatformSelect(params.platform || "ironsource")
			let videoAd = Advert._videoAd
			if (videoAd != null && videoAd instanceof VideoAd) {
				videoAd['onRewardedVideoAvailabilityChanged'](await videoAd.checkAvailable())
			}
			return ret
		}

		async initMultAdSlot(params: GDK.VideoAdSlot[]): Promise<void> {
			let ret = await SDKProxy.nativeAdvert.initMultAdSlot(params)
			return ret
		}

		async initAdService(params: GDK.AdvertInitParams): Promise<void> {
			return new Promise((resolve, reject) => {
				resolve()
			})
		}
	}
}
