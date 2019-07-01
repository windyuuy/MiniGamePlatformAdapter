
namespace VIVOGDK {
	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {

			if (qg.getSystemInfoSync().platformVersionCode >= 1041) {
				return qg.createRewardedVideoAd({ posId: params.adUnitId })
			} else
				return null
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
				return null
		}
	}
}
