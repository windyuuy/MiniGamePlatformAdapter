namespace OPPOGDK {

	const devlog = Common.devlog

	class VideoAdForRelaxFarm implements GDK.IRewardedVideoAd {

		api?: GDK.UserAPI

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;
		protected _isShowing: boolean = false
		protected _isAdInited: boolean = false;
		protected _videoAd = null;

		adUnitId: string
		constructor(
			params: {
				adUnitId: string
			},
			api: GDK.UserAPI
		) {
			this.adUnitId = params.adUnitId || "35667"; // 默认id是彩虹岛的id
			this.api = api

			qg.initAdService({
				appId: gdk.appId,
				isDebug: false,
				success: (res) => {
					this._isAdInited = true;
					devlog.info("gdk oppo 广告初始化成功~");
					this.createVideoAd(this.adUnitId);
				},
				fail: (err) => {
					this._isAdInited = false;
					devlog.info("gdk oppo 广告初始化失败~");
				}
			});

		}

		createVideoAd(posId: string) {
			this._videoAd = qg.createRewardedVideoAd({ posId: this.adUnitId });

			this._videoAd.onLoad(() => {
				devlog.info("gdk oppo videoad load success!");
				this.onRewardedVideoAvailabilityChanged(true);
			})
			this._videoAd.onVideoStart(() => {
				devlog.info("gdk oppo videoad start play");
				this.onRewardedVideoAdOpened();
			})
			this._videoAd.onClose((res) => {
				devlog.info("gdk oppo videoad closed")
				devlog.info(res);
				this._isEnded = res.isEnded;
				setTimeout(() => {
					this.onRewardedVideoAdClosed()
				}, 0)
			})
			this._videoAd.onError((err) => {
				devlog.info("gdk oppo videoad error")
				devlog.info(err);
				this.onRewardedVideoAdShowFailed(err)
			})
		}

		onRewardedVideoAdOpened() {

		}
		onRewardedVideoAdShowFailed(error) {
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
				this._videoAd.load()
			}, 0)
		}

		protected _onLoadedCallbacks: Function[] = []
		protected _available: boolean = false
		get isAvailable() {
			return this._available
		}
		async checkAvailable?(): Promise<boolean> {
			return this._available
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

		async load(): Promise<void> {
			devlog.info("gdk oppo load videoad")
			const ret = new GDK.RPromise<void>()
			if (this._available) {
				devlog.info("gdk oppo videoad already cached")
				ret.success(undefined)
				this.onRewardedVideoAvailabilityChanged(this._available)
			} else {
				devlog.info("gdk oppo videoad start load")
				this._onLoadedCallbacks.push(() => {
					ret.success(undefined);
				})
				if (this._videoAd) {
					this._videoAd.load();
				}
			}
			return ret.promise
		}

		async show(): Promise<void> {
			devlog.info("gdk oppo show videoad")
			const ret = new GDK.RPromise<void>()
			if (this._videoAd) {
				devlog.info("gdk oppo videoad call show")
				this._isShowing = true
				this._videoAd.show();
			}
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

		protected _style: GDK.BannerStyleAccessor = new GDK.BannerStyleAccessor()
		get style(): GDK.BannerStyleAccessor {
			return this._style
		}
		set style(value: GDK.BannerStyleAccessor) {
			this._style = value
		}


		protected _bannerAd = null
		constructor(params: { adUnitId: string, viewId: number, style?: GDK.BannerStyle }) {
			this.adUnitId = params.adUnitId || "35668"; // 默认是彩虹岛的banner
			this.viewId = params.viewId;
			this._bannerAd = qg.createBannerAd({ posId: params.adUnitId });
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			if (this._bannerAd) {
				devlog.info("gdk oppo show banner");
				this._bannerAd.show();
			}
			ret.success(undefined)
			return ret.promise
		}
		async hide() {
			if (this._bannerAd) {
				this._bannerAd.hide()
			}
		}
		async destroy() {
			this._bannerAd = null
		}
		onResize(callback: Function) {
			devlog.warn('oppo bannerAd dose not support resize')
		}
		offResize(callback: Function) {
			devlog.warn('oppo bannerAd dose not support resize')
		}
		onLoad(callback: Function) {

		}

		offLoad(callback: Function) {

		}
		onError(callback: (code: number, msg: string) => void) {
			if (this._bannerAd) {
				this._bannerAd.onError(callback)
			}
		}
		offError(callback: Function) {
			if (this._bannerAd) {
				this._bannerAd.offError(callback)
			}
		}
	}

	export class RewardedVideoAd implements GDK.IRewardedVideoAd {
		adUnitId: string;

		protected _adv: GDK.IRewardedVideoAd
		constructor(params: {
			adUnitId: string
		}) {
			const adv = qg.createRewardedVideoAd({ posId: params.adUnitId }) as GDK.IRewardedVideoAd
			adv.adUnitId = params.adUnitId
			this._adv = adv
			this.adUnitId = params.adUnitId

			this.isAvailable = false
			adv.onLoad((...args) => {
				this.isAvailable = true

				this._loadFuncList.forEach((f) => {
					try {
						f(...args)
					} catch (e) {
						devlog.error(e)
					}
				})
			})
			adv.onClose((...args) => {
				this.isAvailable = false

				this._closeFuncList.forEach((f) => {
					try {
						f(...args)
					} catch (e) {
						devlog.error(e)
					}
				})
			})
			adv.onError((...args) => {
				// this.isAvailable = false

				this._errorFuncList.forEach((f) => {
					try {
						f(...args)
					} catch (e) {
						devlog.error(e)
					}
				})
			})
		}

		async load(): Promise<void> {
			if (!this.isAvailable) {
				return this._adv.load()
			}
		}
		async show(): Promise<void> {
			this.isAvailable = false
			return this._adv.show()
		}

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}
		offLoad(callback: Function) {
			let index = this._loadFuncList.indexOf(callback)
			if (index >= 0) {
				this._loadFuncList.splice(index, 1)
			}
		}

		onError(callback: (res: GDK.RewardedVideoAdOnErrorParam) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			let index = this._errorFuncList.indexOf(callback)
			if (index >= 0) {
				this._errorFuncList.splice(index, 1)
			}
		}

		onClose(callback: Function) {
			this._closeFuncList.push(callback)
		}
		offClose(callback: Function) {
			let index = this._closeFuncList.indexOf(callback)
			if (index >= 0) {
				this._closeFuncList.splice(index, 1)
			}
		}

		isAvailable?: boolean;
	}

	export class Advert implements GDK.IAdvert {

		api?: GDK.UserAPI
		async initWithConfig?(_info: GDK.GDKConfig) {
			devlog.info("gdk oppo advert initConfig");
			devlog.info(_info);

			// await new Promise((resolve, reject) => {
			// 	qg.initAdService({
			// 		appId: this.api.appId,
			// 		isDebug: false,
			// 		success: (res) => {
			// 			devlog.info("gdk oppo 广告初始化成功~");
			// 			resolve(res)
			// 		},
			// 		fail: (err) => {
			// 			devlog.error("gdk oppo 广告初始化失败~");
			// 			reject(err)
			// 		}
			// 	});
			// })
		}

		protected _video: GDK.IRewardedVideoAd
		protected _banner: BannerAd

		createRewardedVideoAd(params: {
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (params.adUnitId === "35667") {
				// 农场先保持不变
				if (!this._video) {
					this._video = new VideoAdForRelaxFarm(params, this.api)
				}
				return this._video;
			} else {
				// const adv = qg.createRewardedVideoAd({ posId: params.adUnitId }) as GDK.IRewardedVideoAd
				// adv.adUnitId = params.adUnitId
				if (!this._video) {
					this._video = new RewardedVideoAd(params)
				}
				return this._video
			}
		}

		createBannerAd(params: {
			adUnitId: string,
			viewId: number,
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			return new BannerAd(params)
		}

		get needInitAdServiceFirst() {
			return true
		}

		async initAdService(params: GDK.AdvertInitParams): Promise<void> {
			params = params || {} as GDK.AdvertInitParams
			params.isDebug = !!params.isDebug

			return new Promise((resolve, reject) => {
				qg.initAdService({
					appId: this.api.appId,
					isDebug: !!params.isDebug,
					success: (res) => {
						devlog.info("gdk oppo 广告初始化成功~");
						resolve(res)
					},
					fail: (err) => {
						devlog.error("gdk oppo 广告初始化失败~");
						reject(err)
					}
				});
			})
		}
	}
}
