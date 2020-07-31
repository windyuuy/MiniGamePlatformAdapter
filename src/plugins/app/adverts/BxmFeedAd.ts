namespace AppGDK {
	const devlog = Common.devlog

	export class BxmFeedAd implements GDK.IFeedAd {


		protected _style: GDK.FeedAdStyleAccessor = new GDK.FeedAdStyleAccessor()
		

		constructor(params: GDK.FeedAdCreateParam) {

			this.isDebugMode = params.isDebugMode

			let style = params.style
			if (style != null) {
				this._style.x = style.x
				this._style.y = style.y
				this._style.left = style.left
				this._style.top = style.top
				this._style.width = style.width;
				this._style.height = style.height;
			}
		}

		async load(): Promise<void> {

			return new Promise<void>((resolve, reject) => {

				let style = this._style;
				SDKProxy.nativeAdvert.loadFeedAd({ adObjectId: 1234 }).then((ret)=> {
					SDKProxy.nativeAdvert.setFeedAdStyle(style as any).then((ret)=> {
						resolve();
					}).catch((e)=> {
						reject();
					})
				}).catch((e)=> {
					reject();
				})
				
			})
		}

		async show(): Promise<void> {
			await SDKProxy.nativeAdvert.setFeedAdVisibility({ adObjectId: this.adObjectId, visible: true })
		}
		async hide(): Promise<void> {
			await SDKProxy.nativeAdvert.setFeedAdVisibility({ adObjectId: this.adObjectId, visible: false })
		}

		async destroy(): Promise<void> {
			return await SDKProxy.nativeAdvert.destroyFeedAd({ adObjectId: this.adObjectId })
		}

		async getDatas(): Promise<GDK.FeedAdDatas> {
			return await SDKProxy.nativeAdvert.getFeedAdDatas({ adObjectId: this.adObjectId })
		}

		/*******************即将废弃*******************/
		/**
		 * 模拟点击广告
		 */
		async performClick(): Promise<void> {
			return await SDKProxy.nativeAdvert.performClick({ adObjectId: this.adObjectId })
		}

		/**
		 * 模拟点击广告
		 */
		async performCreativeClick(): Promise<void> {
			return await SDKProxy.nativeAdvert.performCreativeClick({ adObjectId: this.adObjectId })
		}
		protected adObjectId: number = -1

		protected isDebugMode: boolean = false

		get style(): GDK.FeedAdStyleAccessor {
			return this._style
		}
		set style(value: GDK.FeedAdStyleAccessor) {
			this._style = value
			SDKProxy.nativeAdvert.setFeedAdStyle(this._style as any)
		}

		async setStyle(style: GDK.FeedAdStyle) {
			for (let key in style) {
				let value = style[key]
				if (value != null) {
					this._style[key] = value
				}
			}

			await SDKProxy.nativeAdvert.setFeedAdStyle(this._style as any)
		}

		async setDefaultClickZoneStyle(style: GDK.FeedAdStyle) {
			await SDKProxy.nativeAdvert.setFeedAdClickZoneStyle({ adObjectId: this.adObjectId, style: style })
		}
	}
}
