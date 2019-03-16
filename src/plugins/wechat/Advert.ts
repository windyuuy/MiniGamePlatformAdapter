
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
			let top = 0
			if (params.style.top != undefined) {
				top = params.style.top
			} else if (params.style.y != undefined) {
				top = wx.getSystemInfoSync().screenHeight - (params.style.y + params.style.height)
			}

			let left = 0
			if (params.style.left != undefined) {
				left = params.style.left
			} else if (params.style.x != undefined) {
				left = params.style.x
			}
			const params2 = {
				adUnitId: params.adUnitId,
				style: {
					...params.style,
					top: top,
					left: left,
				}
			}
			return wx.createBannerAd(params2)
		}
	}
}
