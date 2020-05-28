namespace AppGDK {
	const devlog = Common.devlog

	export class InterstitialAd implements GDK.IInterstitialAd {

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
			for (let f of this._errorFuncList.concat()) {
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
			for (let f of this._closeFuncList.concat()) {
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
		/**
		 * 获知插屏广告是否加载成功
		 */
		get isAvailable() {
			return this._available
		}
		protected onInterstitialAvailabilityChanged(available: boolean) {
			this._available = available
			if (available) {
				// load() promise 回调
				let onLoadedCallbacks = this._onLoadedCallbacks
				this._onLoadedCallbacks = []
				for (let f of onLoadedCallbacks.concat()) {
					try {
						f()
					} catch (e) {
						devlog.error('广告已加载回调异常：', e)
					}
				}
				// onLoaded 回调
				for (let f of this._loadFuncList.concat()) {
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
			for (let ret of onShownCallbacks.concat()) {
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
			for (let ret of onShownCallbacks.concat()) {
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
}
