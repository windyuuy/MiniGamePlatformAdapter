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
				// 清空避免重复 promise
				this._onLoadedCallbacks = []
				for (let f of onLoadedCallbacks) {
					try {
						f()
					} catch (e) {
						devlog.error('广告已加载 promise 回调异常：', e)
					}
				}

				try {
					// onLoaded 回调
					for (let f of this._loadFuncList) {
						f()
					}
				} catch (e) {
					devlog.error('广告 onLoad 回调中发生异常:', e)
				}
			}
		}

		async load(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			let { available } = await SDKProxy.nativeAdvert.isRewardedVideoAvailable()
			this._available = available
			if (this._available) {
				ret.success(undefined)

				// 和微信一致，每次 load 都调用 onLoad
				this.onRewardedVideoAvailabilityChanged(this._available)
			} else {
				this._onLoadedCallbacks.push(() => {
					ret.success(undefined);
				})
				await SDKProxy.nativeAdvert.loadRewardVideoAd()
			}
			return ret.promise
		}

		async show(): Promise<void> {
			devlog.info('ironsrc:show video advert')
			this._isShowing = true

			let waitting = true
			const ret = new GDK.RPromise<void>()
			// 5秒没有播出来，那么就报超时错误
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
				this.onInterstitialAvailabilityChanged(true)
			})
			SDKProxy.nativeAdvert.onInterstitialAdLoadFailed((error) => {
				this.onInterstitialAdLoadFailed(error)
			})

			SDKProxy.nativeAdvert.onInterstitialAdRewarded((data) => {
				this.onInterstitialAdRewarded()
			})
			SDKProxy.nativeAdvert.onInterstitialAdClosed(() => {
				// 避免可能的黑屏
				setTimeout(() => {
					this.onInterstitialAdClosed()
				}, 0)
			})

			SDKProxy.nativeAdvert.onInterstitialAdOpened(() => {
				this.onInterstitialAdOpened()
			})
			SDKProxy.nativeAdvert.onInterstitialAdShowFailed((error) => {
				this.onInterstitialAdShowFailed(error)
			})
			SDKProxy.nativeAdvert.onInterstitialAdShowSucceeded(() => {
				this.onInterstitialAdShowSucceeded()
			})
		}

		protected onReceivedError(error: IronSrc.IronSourceError) {
			let err = new GDK.InterstitialAdOnErrorParam()
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
		onInterstitialAdRewarded() {
			this._isEnded = true
		}
		onInterstitialAdClosed() {
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
				let { available } = await SDKProxy.nativeAdvert.isInterstitialReady()
				this.onInterstitialAvailabilityChanged(available)
			}, 0)
		}

		protected _onLoadedCallbacks: Function[] = []
		protected _available: boolean = false
		protected onInterstitialAvailabilityChanged(available: boolean) {
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
			this.onInterstitialAvailabilityChanged(false)
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

		onInterstitialAdOpened() {

		}

		onInterstitialAdShowSucceeded() {
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

		onInterstitialAdShowFailed(error: IronSrc.IronSourceError) {
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

		onError(callback: (res: GDK.InterstitialAdOnErrorParam) => void) {
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

		reset(params: { placementName?: string, style?: GDK.BannerStyle }) {
			this.destroy()
			SDKProxy.nativeAdvert.createBanner(params)
			SDKProxy.nativeAdvert.loadBanner(params)
			this.style.x = params.style.x
			this.style.y = params.style.y
			this.style.left = params.style.left
			this.style.top = params.style.top
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
			} else {
				Advert._bannerAd.reset(params)
			}
			return Advert._bannerAd
		}
	}
}
