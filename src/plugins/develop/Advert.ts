namespace DevelopGDK {
	const devlog = Common.devlog

	class VideoAd implements GDK.IRewardedVideoAd {

		api?: GDK.UserAPI

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;

		adUnitId: string
		constructor(
			params: {
				adUnitId: string
			},
			api: GDK.UserAPI
		) {
			this.adUnitId = params.adUnitId
			this.api = api
		}

		async load(): Promise<void> {
			if (this._isLoad) {
				return;
			}

			return new Promise<void>((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() > 0.9) {
						const reason = { errCode: -1, errMsg: "10%的概率模拟广告加载失败" }
						reject(reason);
						for (let f of this._errorFuncList.concat()) {
							f(reason)
						}
					} else {
						this._isLoad = true;
						resolve(undefined);
						for (let f of this._loadFuncList.concat()) {
							f()
						}
					}
				}, 1000)
			})
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()

			if (!this._isLoad) {
				ret.fail("请先加载，再显示");
			} else {
				this._isLoad = false;
				setTimeout(() => {
					this.api.showConfirm({ title: "你是否观看完广告？", content: "你是否观看完广告？" }).then((value) => {
						let r = value.confirm
						ret.success(undefined)
						for (let f of this._closeFuncList.concat()) {
							f({ isEnded: r });
						}
						setTimeout(async () => {
							try {
								await this.load()
							} catch (e) {
								console.error("加载广告失败:", e)
							}
						}, 1)
					})
				}, 100)
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

	class FullscreenVideoAd extends VideoAd {

	}
	class InterstitialAd extends VideoAd {

	}

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string
		viewId?: number

		style: GDK.BannerStyleAccessor = new GDK.BannerStyleAccessor()

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _resizeFuncList: Function[] = []

		protected _destroy: boolean = false;

		protected _ad: HTMLImageElement = null;//假装的广告

		constructor(params: { viewId: number, style?: GDK.BannerStyle }) {
			setTimeout(() => {
				for (let f of this._loadFuncList.concat()) {
					f();
				}
			}, 1000)
			this.style.x = params.style.x
			this.style.y = params.style.y
			this.style.left = params.style.left
			this.style.top = params.style.top
		}

		async show(): Promise<void> {
			if (this._ad) {
				return;
			}
			const ret = new GDK.RPromise<void>()
			if (this._destroy) {
				ret.fail("已经调用过destroy")
			} else {

				//假装显示一个广告
				this._ad = document.createElement("img")
				this._ad.style.position = "absolute"
				this._ad.style.bottom = "0px"
				this._ad.style.width = "500px"
				this._ad.style.height = "100px"
				this._ad.src = "https://www.baidu.com/img/bd_logo1.png"

				document.body.appendChild(this._ad)

				ret.success(undefined)
			}
			return ret.promise
		}
		async hide() {
			if (this._ad) {
				this._ad.remove();
				this._ad = null;
			}
		}
		async destroy() {
			this._destroy = true;
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

	export class Advert extends GDK.AdvertBase {

		api?: GDK.UserAPI

		protected static _videoAd: VideoAd
		protected static _bannerAd: BannerAd
		protected static _fullscreenAd: FullscreenVideoAd
		protected static _interstitialAd: InterstitialAd
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (!Advert._videoAd) {
				Advert._videoAd = new VideoAd(params, this.api)
			}
			return Advert._videoAd
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
			// return new BannerAd(params)
		}

		get supportFullscreenAd(): boolean {
			return this.supportFullscreenVideoAd
		}
		get supportFullscreenVideoAd(): boolean {
			return true
		}
		createFullscreenVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IFullscreedVideoAd {
			if (!Advert._fullscreenAd) {
				if (this.supportFullscreenVideoAd) {
					Advert._fullscreenAd = new FullscreenVideoAd(params, this.api)
				} else {
					// Advert._fullscreenAd = new VideoAd(params, this.api)
					devlog.error("当前平台版本过低，不支持插屏广告(Interstitial)")
				}
			}
			return Advert._fullscreenAd
		}

		get supportInterstitialAd(): boolean {
			return true
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
					devlog.error("当前平台版本过低，不支持插屏广告(Interstitial)")
				}
			}
			return Advert._interstitialAd
		}

		protected _currentPlatform: string = null
		async selectAdvertPlatform(params: { platform: string }): Promise<void> {
			devlog.warn(`切换广告平台：${params.platform}`)
			this._currentPlatform = params.platform
		}

		async initAdService(params: GDK.AdvertInitParams): Promise<void> {
			return new Promise((resolve, reject) => {
				resolve()
			})
		}
	}
}
