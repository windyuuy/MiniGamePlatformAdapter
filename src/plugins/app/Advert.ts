namespace AppGDK {
	const devlog = Common.devlog

	class VideoAd implements GDK.IRewardedVideoAd {

		api?: GDK.UserAPI

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;
		protected _isShowing: boolean = false

		adUnitId: string
		constructor(
			params: {
				adUnitId: string
			},
			api: GDK.UserAPI
		) {
			this.adUnitId = params.adUnitId
			this.api = api

			SDKProxy.nativeAdvert.onRewardedVideoAvailabilityChanged((data) => {
				this.onRewardedVideoAvailabilityChanged(data.available)
			})

			SDKProxy.nativeAdvert.onRewardedVideoAdRewarded((data) => {
				this.onRewardedVideoAdRewarded()
			})
			SDKProxy.nativeAdvert.onRewardedVideoAdClosed(() => {
				// 避免可能的黑屏
				setTimeout(() => {
					this.onRewardedVideoAdClosed()
				}, 0)
			})

			SDKProxy.nativeAdvert.onRewardedVideoAdOpened(() => {
				this.onRewardedVideoAdOpened()
			})
			SDKProxy.nativeAdvert.onRewardedVideoAdShowFailed((error) => {
				this.onRewardedVideoAdShowFailed(error)
			})
		}

		onRewardedVideoAdOpened() {

		}
		onRewardedVideoAdShowFailed(error: IronSrc.IronSourceError) {
			this._isShowing = false

			let err = new GDK.RewardedVideoAdOnErrorParam()
			err.errCode = error.errorCode
			err.errMsg = error.errorMsg
			for (let f of this._errorFuncList) {
				f(err)
			}
		}

		protected _isEnded: boolean = false
		onRewardedVideoAdRewarded() {
			this._isEnded = true
		}
		onRewardedVideoAdClosed() {
			this._isShowing = false

			let isEnded = this._isEnded
			this._isEnded = false
			for (let f of this._closeFuncList) {
				try {
					f({ isEnded: isEnded });
				} catch (e) {
					devlog.error('视频广告发放奖励回调异常：', e)
				}
			}

			setTimeout(async () => {
				// ironsource广告只要第一次加载到，后面如果没有加载
				let { available } = await SDKProxy.nativeAdvert.isRewardedVideoAvailable()
				this.onRewardedVideoAvailabilityChanged(available)
			}, 0)
		}

		protected _onLoadedCallbacks: Function[] = []
		protected _available: boolean = false
		onRewardedVideoAvailabilityChanged(available: boolean) {
			this._available = available
			if (available) {
				// load() promise 回调
				let onLoadedCallbacks = this._onLoadedCallbacks
				this._onLoadedCallbacks = []
				for (let f of onLoadedCallbacks) {
					try {
						f()
					} catch (e) {
						devlog.error('广告已加载回调异常：', e)
					}
				}
				// onLoaded 回调
				for (let f of this._loadFuncList) {
					f()
				}
			}
		}

		async load(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			let { available } = await SDKProxy.nativeAdvert.isRewardedVideoAvailable()
			this._available = available
			if (this._available) {
				ret.success(undefined)
			} else {
				this._onLoadedCallbacks.push(() => {
					ret.success(undefined);
				})
			}
			return ret.promise
		}

		async show(): Promise<void> {
			devlog.info('ironsrc:show video advert')
			this._isShowing = true

			let waitting = true
			const ret = new GDK.RPromise<void>()
			setTimeout(() => {
				if (!waitting) {
					return
				}
				waitting = false
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHOW_ADVERT_TIMEOUT))
			}, 5000);
			SDKProxy.nativeAdvert.showRewardedVideo({ placementName: "DefaultRewardedVideo" }).then(() => {
				if (!waitting) {
					return
				}
				waitting = false
				ret.success()
			}).catch((e) => {
				if (!waitting) {
					return
				}
				waitting = false
				ret.fail(e)
			})
			return ret.promise
		}

		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}
		offLoad(callback: Function) {
			this._loadFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}

		onError(callback: (res: GDK.RewardedVideoAdOnErrorParam) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			this._errorFuncList.splice(this._errorFuncList.indexOf(callback), 1)
		}

		onClose(callback: Function) {
			this._closeFuncList.push(callback)
		}
		offClose(callback: Function) {
			this._closeFuncList.splice(this._closeFuncList.indexOf(callback), 1)
		}
	}

	class InterstitialAd implements GDK.IRewardedVideoAd {

		api?: GDK.UserAPI

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;
		protected _isShowing: boolean = false

		adUnitId: string
		constructor(
			params: {
				adUnitId: string
			},
			api: GDK.UserAPI
		) {
			this.adUnitId = params.adUnitId
			this.api = api

			SDKProxy.nativeAdvert.onInterstitialAdReady(() => {
				this.onRewardedVideoAvailabilityChanged(true)
			})
			SDKProxy.nativeAdvert.onInterstitialAdLoadFailed((error) => {
				this.onInterstitialAdLoadFailed(error)
			})

			SDKProxy.nativeAdvert.onInterstitialAdRewarded((data) => {
				this.onRewardedVideoAdRewarded()
			})
			SDKProxy.nativeAdvert.onInterstitialAdClosed(() => {
				// 避免可能的黑屏
				setTimeout(() => {
					this.onRewardedVideoAdClosed()
				}, 0)
			})

			SDKProxy.nativeAdvert.onInterstitialAdOpened(() => {
				this.onRewardedVideoAdOpened()
			})
			SDKProxy.nativeAdvert.onInterstitialAdShowFailed((error) => {
				this.onRewardedVideoAdShowFailed(error)
			})
			SDKProxy.nativeAdvert.onInterstitialAdShowSucceeded(() => {
				this.onRewardedVideoAdShowSucceeded()
			})
		}

		protected onReceivedError(error: IronSrc.IronSourceError) {
			let err = new GDK.RewardedVideoAdOnErrorParam()
			err.errCode = error.errorCode
			err.errMsg = error.errorMsg
			for (let f of this._errorFuncList) {
				try {
					f(err)
				} catch (e) {
					devlog.error('广告错误处理回调异常：', e)
				}
			}
		}

		protected _isEnded: boolean = false
		onRewardedVideoAdRewarded() {
			this._isEnded = true
		}
		onRewardedVideoAdClosed() {
			this._isShowing = false

			let isEnded = this._isEnded
			this._isEnded = false
			for (let f of this._closeFuncList) {
				try {
					f({ isEnded: isEnded });
				} catch (e) {
					devlog.error('视频广告发放奖励回调异常：', e)
				}
			}

			setTimeout(async () => {
				// ironsource广告只要第一次加载到，后面如果没有加载
				let { available } = await SDKProxy.nativeAdvert.isRewardedVideoAvailable()
				this.onRewardedVideoAvailabilityChanged(available)
			}, 0)
		}

		protected _onLoadedCallbacks: Function[] = []
		protected _available: boolean = false
		protected onRewardedVideoAvailabilityChanged(available: boolean) {
			this._available = available
			if (available) {
				// load() promise 回调
				let onLoadedCallbacks = this._onLoadedCallbacks
				this._onLoadedCallbacks = []
				for (let f of onLoadedCallbacks) {
					try {
						f()
					} catch (e) {
						devlog.error('广告已加载回调异常：', e)
					}
				}
				// onLoaded 回调
				for (let f of this._loadFuncList) {
					f()
				}
			}
		}

		onInterstitialAdLoadFailed(error) {
			this.onRewardedVideoAvailabilityChanged(false)
			this.onReceivedError(error)
		}

		async load(): Promise<void> {
			devlog.info('ironsrc:load Interstitial video advert')
			const ret = new GDK.RPromise<void>()
			let { available } = await SDKProxy.nativeAdvert.isInterstitialReady()
			this._available = available
			if (this._available) {
				ret.success(undefined)
			} else {
				await SDKProxy.nativeAdvert.loadInterstitial()
				this._onLoadedCallbacks.push(() => {
					ret.success(undefined);
				})
			}
			return ret.promise
		}

		onRewardedVideoAdOpened() {

		}

		onRewardedVideoAdShowSucceeded() {
			let onShownCallbacks = this._onShownCallbacks
			this._onShownCallbacks = []
			for (let ret of onShownCallbacks) {
				try {
					ret.success()
				} catch (e) {
					devlog.error('广告播放成功回调异常：', e)
				}
			}
		}

		onRewardedVideoAdShowFailed(error: IronSrc.IronSourceError) {
			this._isShowing = false

			let onShownCallbacks = this._onShownCallbacks
			this._onShownCallbacks = []
			for (let ret of onShownCallbacks) {
				try {
					ret.fail(error)
				} catch (e) {
					devlog.error('广告播放失败回调异常：', e)
				}
			}

			this.onReceivedError(error)
		}

		protected _onShownCallbacks: GDK.RPromise<void>[] = []
		async show(): Promise<void> {
			devlog.info('ironsrc:show Interstitial video advert')
			this._isShowing = true

			const ret = new GDK.RPromise<void>()
			await SDKProxy.nativeAdvert.showInterstitial({ placementName: "DefaultInterstitial" })
			this._onShownCallbacks.push(ret)
			return ret.promise
		}

		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}
		offLoad(callback: Function) {
			this._loadFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}

		onError(callback: (res: GDK.RewardedVideoAdOnErrorParam) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			this._errorFuncList.splice(this._errorFuncList.indexOf(callback), 1)
		}

		onClose(callback: Function) {
			this._closeFuncList.push(callback)
		}
		offClose(callback: Function) {
			this._closeFuncList.splice(this._closeFuncList.indexOf(callback), 1)
		}
	}

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string
		viewId?: number
		placementName?: string

		protected _style: GDK.BannerStyleAccessor = new GDK.BannerStyleAccessor()
		get style(): GDK.BannerStyleAccessor {
			return this._style
		}
		set style(value: GDK.BannerStyleAccessor) {
			this._style = value
			SDKProxy.nativeAdvert.setBannerStyle(value)
		}

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _resizeFuncList: Function[] = []

		constructor(params: { placementName?: string, style?: GDK.BannerStyle }) {
			SDKProxy.nativeAdvert.createBanner(params)
			SDKProxy.nativeAdvert.setBannerListener()
			SDKProxy.nativeAdvert.loadBanner(params)

			this.style.x = params.style.x
			this.style.y = params.style.y
			this.style.left = params.style.left
			this.style.top = params.style.top

			SDKProxy.nativeAdvert.onBannerAdLoaded(() => {
				this.onBannerAdLoaded()
			})
			SDKProxy.nativeAdvert.onBannerAdLoadFailed((error) => {
				this.onBannerAdLoadFailed(error)
			})
			SDKProxy.nativeAdvert.onBannerAdLoadFailed((error) => {
				this.onBannerAdLoadFailed(error)
			})
		}

		onBannerAdLoaded() {
			for (let f of this._loadFuncList) {
				try {
					f()
				} catch (e) {
					devlog.error('条幅广告加载成功回调异常', e)
				}
			}
		}

		onBannerAdLoadFailed(error: IronSrc.IronSourceError) {
			let err = new GDK.RewardedVideoAdOnErrorParam()
			err.errCode = error.errorCode
			err.errMsg = error.errorMsg
			for (let f of this._errorFuncList) {
				f(err)
			}
		}

		async show(): Promise<void> {
			await SDKProxy.nativeAdvert.setBannerAdvertVisibility({ visible: true })
		}
		async hide(): Promise<void> {
			await SDKProxy.nativeAdvert.setBannerAdvertVisibility({ visible: false })
		}

		async destroy(): Promise<void> {
			await SDKProxy.nativeAdvert.destroyBanner()
		}
		onResize(callback: Function) {
			this._resizeFuncList.push(callback)
		}
		offResize(callback: Function) {
			this._resizeFuncList.splice(this._resizeFuncList.indexOf(callback), 1)
		}
		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}

		offLoad(callback: Function) {
			this._loadFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}
		onError(callback: (code: number, msg: string) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			this._errorFuncList.splice(this._errorFuncList.indexOf(callback), 1)
		}
	}

	export class Advert implements GDK.IAdvert {

		api?: GDK.UserAPI
		async init?(data?: any) {
			await SDKProxy.nativeAdvert.setRewardedVideoListener()
			if (this.supportInterstitial) {
				await SDKProxy.nativeAdvert.setInterstitialListener()
			}
			await SDKProxy.nativeAdvert.init({
				appKey: "ironsrcappkey", modules: {
					REWARDED_VIDEO: !this.supportInterstitial,
					BANNER: true,
					INTERSTITIAL: this.supportInterstitial,
				}
			})
			let debug = true
			SDKProxy.nativeAdvert.setAdaptersDebug({ debug: debug })
			SDKProxy.nativeAdvert.shouldTrackNetworkState({ track: debug })
		}

		protected static _videoAd: GDK.IRewardedVideoAd
		protected static _bannerAd: BannerAd
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (!Advert._videoAd) {
				if (this.supportInterstitial) {
					Advert._videoAd = new InterstitialAd(params, this.api)
				} else {
					Advert._videoAd = new VideoAd(params, this.api)
				}
			}
			return Advert._videoAd
		}

		protected get supportInterstitial(): boolean {
			// return this.api.nativeVersion >= 1
			return false
		}

		createBannerAd(params: {
			adUnitId: string,
			viewId: number,
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			if (!Advert._bannerAd) {
				Advert._bannerAd = new BannerAd(params)
			}
			return Advert._bannerAd
		}
	}
}
