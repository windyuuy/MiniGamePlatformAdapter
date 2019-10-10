
namespace VIVOGDK {
	const devlog = Common.devlog

	class DummyVideoAd implements GDK.IRewardedVideoAd {
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
			}
		) {

		}

		protected _available: boolean = false
		get isAvailable() {
			return this._available
		}
		async checkAvailable?(): Promise<boolean> {
			return this._available
		}

		async load(): Promise<void> {
			console.log("gdk oppo load videoad")
			const ret = new GDK.RPromise<void>()
			return ret.promise
		}

		async show(): Promise<void> {
			console.log("gdk oppo show videoad")
			const ret = new GDK.RPromise<void>()
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

	export class RewardedVideoAd implements GDK.IRewardedVideoAd {
		adUnitId: string;

		lastLoadTime: number = -1;

		protected _adv: GDK.IRewardedVideoAd
		constructor(params: {
			adUnitId: string
		}) {
			const adv = qg.createRewardedVideoAd({ posId: params.adUnitId }) as GDK.IRewardedVideoAd
			adv.adUnitId = params.adUnitId
			this._adv = adv
			this.adUnitId = params.adUnitId

			this.isAvailable = false
			this.onLoad(() => {
				this.isAvailable = true
			})
			this.onClose(() => {
				this.isAvailable = false
			})
		}

		async load(): Promise<void> {
			if (!this.isAvailable) {
				let now = new Date().getTime()
				if (this.lastLoadTime == -1 || now - this.lastLoadTime > 60 * 1000) {
					this.lastLoadTime = now
					return this._adv.load()
				}
			}
		}
		async show(): Promise<void> {
			this.isAvailable = false
			return this._adv.show()
		}
		onLoad(callback: Function) {
			return this._adv.onLoad(callback)
		}
		offLoad(callback: Function) {
			return this._adv.offLoad(callback)
		}
		onError(callback: (res: GDK.RewardedVideoAdOnErrorParam) => void) {
			return this._adv.onError(callback)
		}
		offError(callback: Function) {
			return this._adv.offError(callback)
		}
		onClose(callback: (params: { isEnded: boolean; }) => void) {
			return this._adv.onClose(callback)
		}
		offClose(callback: Function) {
			return this._adv.offClose(callback)
		}
		isAvailable?: boolean;
	}

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string

		protected _style: GDK.BannerStyleAccessor = new GDK.BannerStyleAccessor()
		get style(): GDK.BannerStyleAccessor {
			return this._style
		}
		set style(value: GDK.BannerStyleAccessor) {
			this._style = value
		}

		constructor(params: { posId: string, style?: GDK.BannerStyle }) {
			this.adUnitId = params.posId || "35668"; // 默认是彩虹岛的banner
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			ret.success(undefined)
			return ret.promise
		}
		async hide() {
		}
		async destroy() {
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
		}
		offError(callback: Function) {
		}
	}

	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {

			if (qg.getSystemInfoSync().platformVersionCode >= 1041) {
				return new RewardedVideoAd(params)
			} else
				return new DummyVideoAd(params)
		}

		createBannerAd(params: {
			/** 广告单元 id */
			adUnitId: string,
			viewId: number,
			/** banner 广告组件的样式 */
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			if (qg.getSystemInfoSync().platformVersionCode >= 1031) {
				return qg.createBannerAd({ posId: params.adUnitId, style: {} })
			} else
				return new BannerAd({ posId: params.adUnitId, style: {} })
		}
	}
}
