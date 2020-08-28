
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class AdvertBase implements IAdvert {
		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
		abstract createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd

		/** 创建条幅广告对象 */
		abstract createBannerAd(params: BannerAdCreateParam): IBannerAd
	}
}
