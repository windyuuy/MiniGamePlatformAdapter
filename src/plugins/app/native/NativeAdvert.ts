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

		/**
		 * @param params.appKey 可选参数，如果安卓项目中已经填写 ironsource_advert_appkey ，那么此处可不传入
		 * @param params.modules 指定支持的广告模块，可选 key 为：`REWARDED_VIDEO`,`BANNER`,`INTERSTITIAL`,`OFFERWALL`
		 */
		async init(params: { appKey: string, modules: { [key: string]: boolean } }) {
			return nativeHelper.callAction("ironsrc:IronSource.init", params)
		}

		/**
		 * 验证广告集成
		 */
		async validateIntegration() {
			return nativeHelper.callAction("ironsrc:IntegrationHelper.validateIntegration", {})
		}

		async shouldTrackNetworkState(params: { track: boolean }) {
			return nativeHelper.callAction("ironsrc:IronSource.shouldTrackNetworkState", params)
		}

		async setAdaptersDebug(params: { debug: boolean }) {
			return nativeHelper.callAction("ironsrc:banner.setAdaptersDebug", params)
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

		/**
		 * 监听广告打开播放
		 */
		async onRewardedVideoAdOpened(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdOpened", callback)
		}
		/**
		 * 监听广告关闭
		 */
		async onRewardedVideoAdClosed(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdClosed", callback)
		}
		/**
		 * 通知当前视频是否已加载
		 */
		async onRewardedVideoAvailabilityChanged(callback: (data: { available: boolean }) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAvailabilityChanged", callback)
		}
		/**
		 * 监听广告开始播放
		 */
		async onRewardedVideoAdStarted(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdStarted", callback)
		}
		/**
		 * 监听广告播放结束
		 */
		async onRewardedVideoAdEnded(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onRewardedVideoAdEnded", callback)
		}
		/**
		 * 监听广告可发放奖励
		 */
		async onRewardedVideoAdRewarded(callback: (data: IronSrc.Placement) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAdRewarded", callback)
		}
		async onRewardedVideoAdShowFailed(callback: (data: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent<IronSrc.IronSourceError>("ironsrc:onRewardedVideoAdShowFailed", callback)
		}
		async onRewardedVideoAdClicked(callback: (data: IronSrc.Placement) => void) {
			return nativeHelper.onEvent("ironsrc:onRewardedVideoAdClicked", callback)
		}

		async loadRewardVideoAd(loadParams?: GDK.RewardVideoAdLoadParams): Promise<{}> {
			if (typeof loadParams != "object") {
				loadParams = {}
			}

			const key = "ironsrc:IronSource.loadRewardVideoAd"
			// if (nativeHelper.checkActionExist(key)) {
			// 	return nativeHelper.callAction<{}>(key, {})
			// } else {
			// 	console.log(`skip call <${key}> function, which not implement for current sdk version`)
			// }
			return nativeHelper.safeCallAction<{}>(key, loadParams) || {}
		}

		async isRewardedVideoAvailable(loadParams?: GDK.RewardVideoAdLoadParams) {
			return nativeHelper.callAction<{ available: boolean }>("ironsrc:IronSource.isRewardedVideoAvailable", loadParams || {})
		}

		async showRewardedVideo(params: { placementName: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.showRewardedVideo", params)
		}










		/**
		 * 事件通知流程
		 * # 从播放视频到重新加载
		 * - onFullScreenVideoAvailabilityChanged -> true
		 * - onFullScreenVideoAdStarted
		 * - onFullScreenVideoAdSkipped
		 * - onFullScreenVideoAdComplete
		 * - onFullScreenVideoAdClosed
		 * - onFullScreenVideoAvailabilityChanged -> false
		 * - load
		 * - onFullScreenVideoAvailabilityChanged -> true
		 * - onFullScreenVideoAdCached
		 */
		async setFullScreenVideoListener() {
			return nativeHelper.callAction("ironsrc:IronSource.setFullScreenVideoListener", {})
		}

		async loadFullScreenVideoAd(): Promise<{}> {
			const key = "ironsrc:IronSource.loadFullScreenVideoAd"
			// if (nativeHelper.checkActionExist(key)) {
			// 	return nativeHelper.callAction<{}>(key, {})
			// } else {
			// 	console.log(`skip call <${key}> function, which not implement for current sdk version`)
			// }
			return nativeHelper.safeCallAction<{}>(key, {}) || {}
		}

		async isFullScreenVideoAvailable() {
			return nativeHelper.callAction<{ available: boolean }>("ironsrc:IronSource.isFullScreenVideoAvailable", {})
		}

		async showFullScreenVideo(params: { placementName: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.showFullScreenVideo", params)
		}

		// /**
		//  * 监听广告打开播放
		//  */
		// async onFullScreenVideoAdOpened(callback: Function) {
		// 	return nativeHelper.onDoneEvent("ironsrc:onFullScreenVideoAdOpened", callback)
		// }
		/**
		 * 监听广告关闭
		 */
		async onFullScreenVideoAdClosed(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onFullScreenVideoAdClosed", callback)
		}
		/**
		 * 通知当前视频是否已加载
		 */
		async onFullScreenVideoAvailabilityChanged(callback: (data: { available: boolean }) => void) {
			return nativeHelper.onEvent("ironsrc:onFullScreenVideoAvailabilityChanged", callback)
		}
		/**
		 * 监听广告开始播放
		 */
		async onFullScreenVideoAdStarted(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onFullScreenVideoAdStarted", callback)
		}
		// /**
		//  * 监听广告播放结束
		//  */
		// async onFullScreenVideoAdEnded(callback: Function) {
		// 	return nativeHelper.onDoneEvent("ironsrc:onFullScreenVideoAdEnded", callback)
		// }
		/**
		 * 全屏广告完全播完会回调
		 */
		async onFullScreenVideoAdComplete(callback: (data: IronSrc.Placement) => void) {
			return nativeHelper.onEvent("ironsrc:onFullScreenVideoAdComplete", callback)
		}
		async onFullScreenVideoAdShowFailed(callback: (data: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent<IronSrc.IronSourceError>("ironsrc:onFullScreenVideoAdShowFailed", callback)
		}
		// async onFullScreenVideoAdClicked(callback: (data: IronSrc.Placement) => void) {
		// 	return nativeHelper.onEvent("ironsrc:onFullScreenVideoAdClicked", callback)
		// }













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

		async loadBanner(params: { placementName?: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.loadBanner", params)
		}

		async setBannerStyle(style: GDK.BannerStyle) {
			return nativeHelper.callAction("ironsrc:IronSource.setBannerStyle", style)
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

		// Interstitial
		/**
		 * 验证广告集成
		 */
		async setInterstitialListener() {
			return nativeHelper.callAction("ironsrc:IronSource.setInterstitialListener", {})
		}
		async loadInterstitial() {
			return nativeHelper.callAction("ironsrc:IronSource.loadInterstitial", {})
		}
		async isInterstitialReady() {
			return nativeHelper.callAction<{ available: boolean }>("ironsrc:IronSource.isInterstitialReady", {})
		}
		async showInterstitial(params: { placementName: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.showInterstitial", params)
		}

		// Interstitial advert 事件
		async onInterstitialAdRewarded(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdRewarded", callback)
		}
		async onInterstitialAdClosed(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdClosed", callback)
		}
		/**
		 * Invoked when there is no Interstitial Ad available after calling load function.
		 */
		async onInterstitialAdReady(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdReady", callback)
		}
		async onInterstitialAdLoadFailed(callback: (error: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent("ironsrc:onInterstitialAdLoadFailed", callback)
		}
		async onInterstitialAdClicked(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdClicked", callback)
		}
		async onInterstitialAdOpened(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdOpened", callback)
		}
		async onInterstitialAdShowSucceeded(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onInterstitialAdShowSucceeded", callback)
		}
		async onInterstitialAdShowFailed(callback: (error: IronSrc.IronSourceError) => void) {
			return nativeHelper.onEvent("ironsrc:onInterstitialAdShowFailed", callback)
		}




		// feed advert
		async createFeedAd(params: { style: GDK.BannerStyleAccessor }): Promise<{ adObjectId: number }> {
			return nativeHelper.callAction("ironsrc:IronSource.createFeedAd", params)
		}

		async setFeedAdVisibility(params: { adObjectId: number, visible: boolean }) {
			return nativeHelper.callAction("ironsrc:IronSource.setFeedAdVisibility", params)
		}

		async loadFeedAd(params: { adObjectId: number, placementName?: string }) {
			return nativeHelper.callAction("ironsrc:IronSource.loadFeedAd", params)
		}

		async setFeedAdStyle(params: { adObjectId: number, style: GDK.BannerStyle }) {
			return nativeHelper.callAction("ironsrc:IronSource.setFeedAdStyle", params)
		}

		async destroyFeedAd(params: { adObjectId: number }) {
			return nativeHelper.callAction("ironsrc:IronSource.destroyFeedAd", params)
		}

		async getFeedAdDatas(params: { adObjectId: number }): Promise<GDK.FeedAdDatas> {
			return nativeHelper.callAction("ironsrc:IronSource.getFeedAdDatas", params)
		}

		async performClick(params: { adObjectId: number }): Promise<void> {
			return nativeHelper.callAction("ironsrc:IronSource.performClick", params)
		}

		async performCreativeClick(params: { adObjectId: number }): Promise<void> {
			return nativeHelper.callAction("ironsrc:IronSource.performCreativeClick", params)
		}

		// feed advert 事件
		async onFeedAdLoaded(callback: (params: { adObjectId: number }) => void) {
			return nativeHelper.onEvent("ironsrc:onFeedAdLoaded", callback)
		}
		async onFeedAdLoadFailed(callback: (params: { error: IronSrc.IronSourceError, adObjectId: number }) => void) {
			return nativeHelper.onEvent("ironsrc:onFeedAdLoadFailed", callback)
		}

		async onFeedAdClicked(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onFeedAdClicked", callback)
		}

		async onFeedAdShown(callback: Function) {
			return nativeHelper.onDoneEvent("ironsrc:onFeedAdShown", callback)
		}


		/**
		  * 广告平台选择
		  * - gdtadvert 广点通
		  * - budadadvert 头条广告
		 */
		async advertPlatformSelect(platform: string) {
			if (gdkjsb.bridge == undefined) return;
			return nativeHelper.safeCallAction("advertPlatformSelect", { message: platform });
		}

		async initMultAdSlot(params: GDK.VideoAdSlot[]) {
			if (gdkjsb.bridge == undefined) return;
			return nativeHelper.safeCallAction("initMultAdSlot", { slotInfo: params });
		}

	}
}
