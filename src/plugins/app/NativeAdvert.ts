namespace AppGDK {
	export namespace IronSrc {
		export class Placement {
			rewardName: string
			rewardAmount: number
			placementName: string
			placementId: number
			placementAvailabilitySettings: {
				pacingValue: number
				cappingValue: number
				deliveryEnabled: boolean
				pacingEnabled: boolean
				cappingEnabled: boolean
				cappingType: string
			}
		}

		export class IronSourceError {
			errorMsg: string
			errorCode: number
		}
	}

	export class NativeAdvert {
		async callAction<T=void>(key: string, params: Object): Promise<T> {
			return new Promise<T>((resolve, reject) => {
				gdkjsb.bridge.callAction(key, JSON.stringify(params), (data) => {
					resolve(JSON.parse(data || null))
				});
			})
		}

		async onEvent<T>(key: string, callback: (data: T) => void) {
			let id = gdkjsb.bridge.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback(JSON.parse(data)["params"])
			});
		}

		async onDoneEvent(key: string, callback: Function) {
			let id = gdkjsb.bridge.on(key, (data) => {
				console.log('ironsrc:onEvent:', key, data)
				callback()
			});
		}

		async init(params: { appKey: string, modules: { [key: string]: boolean } }) {
			return this.callAction("ironsrc:IronSource.init", params)
		}

		async validateIntegration() {
			return this.callAction("ironsrc:IntegrationHelper.validateIntegration", {})
		}

		/**
		 * 事件通知流程
		 * # 从播放视频到重新加载
		 * - onRewardedVideoAvailabilityChanged -> true
		 * - onRewardedVideoAdOpened
		 * - onRewardedVideoAdRewarded
		 * - onRewardedVideoAvailabilityChanged -> false
		 * - onRewardedVideoAdClosed
		 * - onRewardedVideoAvailabilityChanged -> true
		 */
		async setRewardedVideoListener() {
			return this.callAction("ironsrc:IronSource.setRewardedVideoListener", {})
		}

		async onRewardedVideoAdOpened(callback: Function) {
			return this.onDoneEvent("ironsrc:onRewardedVideoAdOpened", callback)
		}
		async onRewardedVideoAdClosed(callback: Function) {
			return this.onDoneEvent("ironsrc:onRewardedVideoAdClosed", callback)
		}
		/**
		 * 通知当前视频是否已加载
		 */
		async onRewardedVideoAvailabilityChanged(callback: (data: { available: boolean }) => void) {
			return this.onEvent("ironsrc:onRewardedVideoAvailabilityChanged", callback)
		}
		async onRewardedVideoAdStarted(callback: Function) {
			return this.onDoneEvent("ironsrc:onRewardedVideoAdStarted", callback)
		}
		async onRewardedVideoAdEnded(callback: Function) {
			return this.onDoneEvent("ironsrc:onRewardedVideoAdEnded", callback)
		}
		async onRewardedVideoAdRewarded(callback: (data: IronSrc.Placement) => void) {
			return this.onEvent("ironsrc:onRewardedVideoAdRewarded", callback)
		}
		async onRewardedVideoAdShowFailed(callback: (data: IronSrc.IronSourceError) => void) {
			return this.onEvent<IronSrc.IronSourceError>("ironsrc:onRewardedVideoAdShowFailed", callback)
		}
		async onRewardedVideoAdClicked(callback: (data: IronSrc.Placement) => void) {
			return this.onEvent("ironsrc:onRewardedVideoAdClicked", callback)
		}

		async shouldTrackNetworkState(params: { track: boolean }) {
			return this.callAction("ironsrc:IronSource.shouldTrackNetworkState", params)
		}

		async isRewardedVideoAvailable() {
			return this.callAction<{ available: boolean }>("ironsrc:IronSource.isRewardedVideoAvailable", {})
		}

		async showRewardedVideo(params: { placementName: string }) {
			return this.callAction("ironsrc:IronSource.showRewardedVideo", params)
		}

		// banner advert
		async createBanner(params: {}) {
			return this.callAction("ironsrc:IronSource.createBanner", params)
		}

		async setBannerListener() {
			return this.callAction("ironsrc:banner.setBannerListener", {})
		}

		async setBannerAdvertVisibility(params: { visible: boolean }) {
			return this.callAction("ironsrc:banner.setVisibility", params)
		}

		async loadBanner(params: { placementName?: string }) {
			return this.callAction("ironsrc:IronSource.loadBanner", params)
		}

		async destroyBanner() {
			return this.callAction("ironsrc:IronSource.destroyBanner", {})
		}

		// banner advert 事件
		async onBannerAdLoaded(callback: Function) {
			return this.onDoneEvent("ironsrc:onBannerAdLoaded", callback)
		}
		async onBannerAdLoadFailed(callback: (error: IronSrc.IronSourceError) => void) {
			return this.onEvent("ironsrc:onBannerAdLoadFailed", callback)
		}
		async onBannerAdClicked(callback: Function) {
			return this.onDoneEvent("ironsrc:onBannerAdClicked", callback)
		}
		async onBannerAdScreenPresented(callback: Function) {
			return this.onDoneEvent("ironsrc:onBannerAdScreenPresented", callback)
		}
		async onBannerAdScreenDismissed(callback: Function) {
			return this.onDoneEvent("ironsrc:onBannerAdScreenDismissed", callback)
		}
		async onBannerAdLeftApplication(callback: Function) {
			return this.onDoneEvent("ironsrc:onBannerAdLeftApplication", callback)
		}
	}
}
