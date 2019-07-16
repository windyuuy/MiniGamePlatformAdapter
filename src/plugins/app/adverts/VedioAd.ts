namespace AppGDK {
	const devlog = Common.devlog

	export class VideoAd implements GDK.IRewardedVideoAd {

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
		/**
		 * 获知视频广告是否加载成功
		 */
		get isAvailable() {
			return this._available
		}
		/**
		 * 获取`原生`视频广告是否加载成功
		 */
		async checkAvailable?(): Promise<boolean> {
			let { available } = await SDKProxy.nativeAdvert.isRewardedVideoAvailable()
			this._available = available
			return available
		}
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

		async load(loadParams?: GDK.RewardVideoAdLoadParams): Promise<void> {
			loadParams = loadParams || {}
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
				await SDKProxy.nativeAdvert.loadRewardVideoAd(loadParams)
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
}
