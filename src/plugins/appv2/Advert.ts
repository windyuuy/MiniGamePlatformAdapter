/// <reference path="Common.ts" />
namespace AppV2GDK {
	const devlog = Common.devlog

	export class Advert extends GDK.AdvertBase {
		createRewardedVideoAd(params: GDK.VideoAdCreateParam): GDK.IRewardedVideoAd {
			return null;
		}
		createBannerAd(params: GDK.BannerAdCreateParam): GDK.IBannerAd {
			return null;
		}
	}
}
