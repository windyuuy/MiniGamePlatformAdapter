/// <reference path="./NativeHelper.ts" />

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

		async init(params: { appKey: string, modules: { [key: string]: boolean } }) {
			return nativeHelper.callAction("ironsrc:IronSource.init", params)
		}

		async validateIntegration() {
			return nativeHelper.callAction("ironsrc:IntegrationHelper.validateIntegration", {})
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
			return nativeHelper.callAction("ironsrc:IronSource.setRewardedVideoListener", {})
		}

		async onRewardedVideoAdOpened(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdOpened", callback)
		}
		async onRewardedVideoAdClosed(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdClosed", callback)
		}
		/**
		 * 通知当前视频是否已加载
		 */
		async onRewardedVideoAvailabilityChanged(callback: (data: { available: boolean }) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAvailabilityChanged", callback)
		}
		async onRewardedVideoAdStarted(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdStarted", callback)
		}
		async onRewardedVideoAdEnded(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdEnded", callback)
		}
		async onRewardedVideoAdRewarded(callback: (data: IronSrc.Placement) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAdRewarded", callback)
		}
		async onRewardedVideoAdShowFailed(callback: (data: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent<IronSrc.IronSourceError>("ironsrc:onRewardedVideoAdShowFailed", callback)
		}
		async onRewardedVideoAdClicked(callback: (data: IronSrc.Placement) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAdClicked", callback)
		}

		async shouldTrackNetworkState(params: { track: boolean }) {
			return nativeHelper.callAction("ironsrc:IronSource.shouldTrackNetworkState", params)
		}

		async isRewardedVideoAvailable() {
			return nativeHelper.callAction<{ available: boolean }>("ironsrc:IronSource.isRewardedVideoAvailable", {})
		}

		async showRewardedVideo(params: { placementName: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.showRewardedVideo", params)
		}

		// banner advert
		async createBanner(params: {}) {
			return nativeHelper.callAction("ironsrc:IronSource.createBanner", params)
		}

		async setBannerListener() {
			return nativeHelper.callAction("ironsrc:banner.setBannerListener", {})
		}

		async setBannerAdvertVisibility(params: { visible: boolean }) {
			return nativeHelper.callAction("ironsrc:banner.setVisibility", params)
		}

		async setAdaptersDebug(params: { debug: boolean }) {
			return nativeHelper.callAction("ironsrc:banner.setAdaptersDebug", params)
		}

		async loadBanner(params: { placementName?: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.loadBanner", params)
		}

		async destroyBanner() {
			return nativeHelper.callAction("ironsrc:IronSource.destroyBanner", {})
		}

		// banner advert 事件
		async onBannerAdLoaded(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onBannerAdLoaded", callback)
		}
		async onBannerAdLoadFailed(callback: (error: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent("ironsrc:onBannerAdLoadFailed", callback)
		}
		async onBannerAdClicked(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onBannerAdClicked", callback)
		}
		async onBannerAdScreenPresented(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onBannerAdScreenPresented", callback)
		}
		async onBannerAdScreenDismissed(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onBannerAdScreenDismissed", callback)
		}
		async onBannerAdLeftApplication(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onBannerAdLeftApplication", callback)
		}
	}
}
