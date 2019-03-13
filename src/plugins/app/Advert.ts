namespace AppGDK {
	class VideoAd implements GDK.IRewardedVideoAd {

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;

		adUnitId: string
		constructor(params: {
			adUnitId: string
		}) {
			this.adUnitId = this.adUnitId
		}

		async load(): Promise<void> {
			if (this._isLoad) {
				return;
			}
			const ret = new GDK.RPromise<void>()
			setTimeout(() => {
				if (Math.random() > 0.9) {
					const reason = { errCode: -1, errMsg: "10%的概率模拟广告加载失败" }
					ret.fail(reason);
					for (let f of this._errorFuncList) {
						f(reason)
					}
				} else {
					this._isLoad = true;
					ret.success(undefined);
					for (let f of this._loadFuncList) {
						f()
					}
				}
			}, 1000)

			return ret.promise
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()

			if (!this._isLoad) {
				ret.fail("请先加载，再显示");
			} else {
				this._isLoad = false;
				setTimeout(() => {
					let r = confirm("你是否观看完广告？")
					ret.success(undefined)
					for (let f of this._closeFuncList) {
						f({ isEnded: r });
					}
					setTimeout(() => {
						this.load()
					}, 1)
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

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string
		viewId?: number

		style: GDK.BannerStyleAccessor = new GDK.BannerStyleAccessor()

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _resizeFuncList: Function[] = []

		protected _destroy: boolean = false;

		protected _ad: HTMLImageElement = null;//假装的广告

		constructor(params: { viewId: number, style?: { x: number, y?: number, left?: number, top?: number } }) {
			setTimeout(() => {
				for (let f of this._loadFuncList) {
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
		hide(): void {
			if (this._ad) {
				this._ad.remove();
				this._ad = null;
			}
		}
		destroy(): void {
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

	export class Advert implements GDK.IAdvert {

		protected static _videoAd: VideoAd
		protected static _bannerAd: BannerAd
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			if (!Advert._videoAd) {
				Advert._videoAd = new VideoAd(params)
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
		}
	}
}
