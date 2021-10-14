
namespace AppGDK {
	const devlog = Common.devlog

	export class FloatIconAd implements GDK.IFloatIconAd {

		protected _style: GDK.FeedAdStyleAccessor = new GDK.FeedAdStyleAccessor()

		get style(): GDK.FeedAdStyleAccessor {
			return this._style
		}
		set style(value: GDK.FeedAdStyleAccessor) {
			this._style = value
			this.setStyle(this._style)
		}

		constructor(params: GDK.FeedAdCreateParam) {

			let style = params.style
			if (style != null) {
				this.style.x = style.x
				this.style.y = style.y
				this.style.left = style.left
				this.style.top = style.top
				this.style.width = style.width;
				this.style.height = style.height;
			}
		}

		async load() {

			return new Promise<void>((resolve, reject) => {
				SDKProxy.nativeAdvert.loadFloatIconAd().then((ret)=> {
					SDKProxy.nativeAdvert.setFloatIconStyle(this._style as any).then((ret)=> {
						resolve();
					}).catch((e)=> {
						reject();
					})
				}).catch((e)=> {
					reject();
				})
			})
		}

		async show() {
			return SDKProxy.nativeAdvert.showFloatIconAd()
		}
		async hide() {
			return SDKProxy.nativeAdvert.hideFloatIconAd()
		}

		async destroy() {
			return SDKProxy.nativeAdvert.destroyFloatIconAd()
		}

		async setStyle(style: GDK.FeedAdStyle) {
			return SDKProxy.nativeAdvert.setFloatIconStyle(style)
		}
	}
}
