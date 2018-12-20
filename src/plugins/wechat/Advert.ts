
namespace WechatGDK {
	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			return wx.createRewardedVideoAd(params)
		}

		createBannerAd(params: {
			/** 广告单元 id */
			adUnitId: string,
			viewId: number,
			/** banner 广告组件的样式 */
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			const params2 = {
				adUnitId: params.adUnitId,
				style: {
					...params.style,
					top: wx.getSystemInfoSync().screenHeight - (params.style.y + params.style.height),
					left: params.style.x,
				}
			}
			return wx.createBannerAd(params2)
		}
	}
}
