/// <reference path="../Common.ts" />
namespace UnityAppGDK {
	const devlog = Common.devlog

	export class BannerAd implements GDK.IBannerAd {
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
			for (let f of this._loadFuncList.concat()) {
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
			for (let f of this._errorFuncList.concat()) {
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
}
