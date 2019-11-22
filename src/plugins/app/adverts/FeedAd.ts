namespace AppGDK {
	const devlog = Common.devlog

	export class FeedAd implements GDK.IFeedAd {
		protected _style: GDK.FeedAdStyleAccessor = new GDK.FeedAdStyleAccessor()
		protected adObjectId: number = -1

		protected isDebugMode: boolean = false

		get style(): GDK.FeedAdStyleAccessor {
			return this._style
		}
		set style(value: GDK.FeedAdStyleAccessor) {
			this._style = value
			SDKProxy.nativeAdvert.setFeedAdStyle({ adObjectId: this.adObjectId, style: this._style })
		}

		async setStyle(style: GDK.FeedAdStyle) {
			for (let key in style) {
				let value = style[key]
				if (value != null) {
					this._style[key] = value
				}
			}

			await SDKProxy.nativeAdvert.setFeedAdStyle({ adObjectId: this.adObjectId, style: this._style })

			let datas = await SDKProxy.nativeAdvert.getFeedAdDatas({ adObjectId: this.adObjectId })
			this._style.realHeight = datas.style.realHeight
			this._style.realWidth = datas.style.realWidth
		}

		async setDefaultClickZoneStyle(style: GDK.FeedAdStyle) {
			await SDKProxy.nativeAdvert.setFeedAdClickZoneStyle({ adObjectId: this.adObjectId, style: style })
		}

		constructor(params: GDK.FeedAdCreateParam) {

			this.isDebugMode = params.isDebugMode

			let style = params.style
			if (style != null) {
				this.style.x = style.x
				this.style.y = style.y
				this.style.left = style.left
				this.style.top = style.top
			}
		}

		async load(): Promise<void> {
			let { adObjectId } = await SDKProxy.nativeAdvert.createFeedAd({ style: this.style, isDebugMode: this.isDebugMode })
			this.adObjectId = adObjectId

			let onLoadPromise = new Promise((resolve, reject) => {
				SDKProxy.nativeAdvert.onFeedAdLoaded((params: { adObjectId: number }) => {
					if (this.adObjectId == params.adObjectId) {
						resolve()
					}
				})

				SDKProxy.nativeAdvert.onFeedAdLoadFailed((params: { error: IronSrc.IronSourceError, adObjectId: number }) => {
					if (this.adObjectId == params.adObjectId) {
						reject(new Error(params.error.errorMsg))
					}
				})
			})

			await SDKProxy.nativeAdvert.loadFeedAd({ adObjectId })
			await SDKProxy.nativeAdvert.setFeedAdStyle({ adObjectId, style: this._style })
			await onLoadPromise

			let datas = await SDKProxy.nativeAdvert.getFeedAdDatas({ adObjectId: this.adObjectId })
			this._style.realHeight = datas.style.realHeight
			this._style.realWidth = datas.style.realWidth

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
	}
}
