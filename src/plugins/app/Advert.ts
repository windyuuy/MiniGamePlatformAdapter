namespace AppGDK {
	const devlog = Common.devlog

	export class Advert implements GDK.IAdvert {

		api?: GDK.UserAPI
		async initWithConfig?(_info: GDK.GDKConfig) {

			let info = _info //as GDK.GDKAPPConfig

			info.app.advertPlatforms = info.app.advertPlatforms || []
			if (info.app.advertPlatforms.length == 0) {
				info.app.advertPlatform = info.app.advertPlatform || 'ironsource'
			}
			if (info.app.advertPlatform) {
				info.app.advertPlatforms.remove(info.app.advertPlatform)
				info.app.advertPlatforms.push(info.app.advertPlatform)
			}
			for (let key of info.app.advertPlatforms) {
				// 选择广告平台
				await SDKProxy.nativeAdvert.advertPlatformSelect(key)

				await SDKProxy.nativeAdvert.setRewardedVideoListener()
				if (this.supportInterstitial) {
					await SDKProxy.nativeAdvert.setInterstitialListener()
				}
				await SDKProxy.nativeAdvert.init({
					appKey: "ironsrcappkey", modules: {
						REWARDED_VIDEO: true,
						BANNER: true,
						INTERSTITIAL: this.supportInterstitial,
					}
				})
				let debug = true
				SDKProxy.nativeAdvert.setAdaptersDebug({ debug: debug })
				SDKProxy.nativeAdvert.shouldTrackNetworkState({ track: debug })
			}

			// <<<begin:以下旧版代码，不支持多平台广告
			// // 选择广告平台
			// if (info.app && info.app.advertPlatform != undefined) {
			// 	await SDKProxy.nativeAdvert.advertPlatformSelect(info.app.advertPlatform)
			// } else {
			// 	await SDKProxy.nativeAdvert.advertPlatformSelect("ironsource")
			// }

			// await SDKProxy.nativeAdvert.setRewardedVideoListener()
			// if (this.supportInterstitial) {
			// 	await SDKProxy.nativeAdvert.setInterstitialListener()
			// }
			// await SDKProxy.nativeAdvert.init({
			// 	appKey: "ironsrcappkey", modules: {
			// 		REWARDED_VIDEO: !this.supportInterstitial,
			// 		BANNER: true,
			// 		INTERSTITIAL: this.supportInterstitial,
			// 	}
			// })
			// let debug = true
			// SDKProxy.nativeAdvert.setAdaptersDebug({ debug: debug })
			// SDKProxy.nativeAdvert.shouldTrackNetworkState({ track: debug })
			// <<<end:以下旧版代码，不支持多平台广告
		}

		protected static _videoAd: GDK.IRewardedVideoAd
		protected static _interstitialAd: GDK.IInterstitialVideoAd
		protected static _bannerAd: BannerAd
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (!Advert._videoAd) {
				// if (this.supportInterstitial) {
				// 	Advert._videoAd = new InterstitialAd(params, this.api)
				// } else {
				Advert._videoAd = new VideoAd(params, this.api)
				// }
			}
			return Advert._videoAd
		}

		get supportInterstitial(): boolean {
			return nativeHelper.checkActionExist("ironsrc:IronSource.loadInterstitial")
		}

		createInterstitialVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IInterstitialVideoAd {
			if (!Advert._interstitialAd) {
				if (this.supportInterstitial) {
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

		selectAdvertPlatform(params: { platform: string }): Promise<void> {
			return SDKProxy.nativeAdvert.advertPlatformSelect(params.platform || "ironsource")
		}
	}
}
