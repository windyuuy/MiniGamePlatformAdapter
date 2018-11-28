
namespace QQPlayGDK {
	class VideoAd implements GDK.IRewardedVideoAd {
		adUnitId: string
		isEnded: boolean = false

		protected _advertObj: BK.Advertisement.VideoAd = null
		constructor(params: {
			adUnitId: string
		}) {
			this.adUnitId = this.adUnitId
		}

		protected _loaded: boolean = false
		load(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			if (this._loaded) {
				// 不重复加载
				ret.success(undefined)
				return ret.promise
			}

			this._loaded = true

			this._advertObj = BK.Advertisement.createVideoAd()
			const offListen = () => {
				this._advertObj.offLoad(onLoad)
				this._advertObj.offError(onError)
			}
			const onLoad = () => {
				offListen()
				ret.success(undefined)
			}
			const onError = (code, msg) => {
				offListen()
				if (code !== BK.Advertisement.AdvertErrorCode.SUCCESS) {
					ret.fail()
				}
			}
			this._advertObj.onLoad(onLoad)
			this._advertObj.onError(onError)
			return ret.promise
		}

		isShowing: boolean = false
		protected _showPromise: Promise<void> = null
		show(): Promise<void> {
			GDKLIB.assert(this._advertObj)

			if (this.isShowing) {
				// 不重复show
				return this._showPromise
			}
			this.isShowing = true

			this.isEnded = false
			const ret = new GDK.RPromise<void>()
			this._showPromise = ret.promise

			this._advertObj.show()
			const offListen = () => {
				this._advertObj.offPlayStart(onPlayStart)
				this._advertObj.offError(onError)
				this._advertObj.offPlayFinish(onPlayFinish)
				this.isShowing = false
			}
			const onPlayStart = () => {
				offListen()
				ret.success(undefined)
			}
			const onPlayFinish = () => {
				this.isEnded = true
			}
			const onError = (code, msg) => {
				offListen()
				if (code !== BK.Advertisement.AdvertErrorCode.SUCCESS) {
					ret.fail()
				}
			}
			this._advertObj.onPlayStart(onPlayStart)
			this._advertObj.onPlayFinish(onPlayFinish)
			this._advertObj.onError(onError)
			return ret.promise
		}

		onLoad(callback: Function) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.onLoad(callback)
		}
		offLoad(callback: Function) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.offLoad(callback)
		}

		onError(callback: (code: number, msg: string) => void) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.onError(callback)
		}
		offError(callback: Function) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.offError(callback)
		}

		onClose(callback: (params: { isEnded: boolean }) => void) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.onClose(() => {
				callback({ isEnded: this.isEnded })
			})
		}
		offClose(callback: Function) {
			GDKLIB.assert(this._advertObj)
			this._advertObj.offClose(callback)
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
