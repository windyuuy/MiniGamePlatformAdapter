namespace DevelopGDK {
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

		load(): Promise<void> {
			if (this._isLoad) {
				return;
			}
			const ret = new GDK.RPromise<void>()
			setTimeout(() => {
				if (Math.random() > 0.9) {
					ret.fail();
					for (let f of this._errorFuncList) {
						f(-1, "1%的概率模拟广告加载失败")
					}
				} else {
					this._isLoad;
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
				setTimeout(() => {
					let r = confirm("你是否观看完广告？")
					for (let f of this._closeFuncList) {
						f({ isEnded: r });
					}
				}, 1000)
			}

			return ret.promise
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
			this._errorFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}

		onClose(callback: Function) {
			this._closeFuncList.push(callback)
		}
		offClose(callback: Function) {
			this._closeFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}
	}

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string
		viewId?: number

		protected _advertObj: BK.Advertisement.BannerAd
		constructor(params: { viewId: number, style?: { x: number, y: number } }) {
			this._advertObj = BK.Advertisement.createBannerAd(params)
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			this._advertObj.show()
			ret.success(undefined)
			return ret.promise
		}
		hide(): void {
			this._advertObj.hide()
		}
		destroy(): void {
			this._advertObj.destory()
		}
		onResize(callback: Function) {
			console.warn('qqplay bannerAd dose not support resize')
		}
		offResize(callback: Function) {
			console.warn('qqplay bannerAd dose not support resize')
		}
		onLoad(callback: Function) {
			this._advertObj.onLoad(callback)
		}

		offLoad(callback: Function) {
			this._advertObj.offLoad(callback)
		}
		onError(callback: (code: number, msg: string) => void) {
			this._advertObj.onError(callback)
		}
		offError(callback: Function) {
			this._advertObj.offError(callback)
		}
	}

	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			return new VideoAd(params)
		}

		createBannerAd(params: {
			adUnitId: string,
			viewId: number,
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			return new BannerAd(params)
		}
	}
}
