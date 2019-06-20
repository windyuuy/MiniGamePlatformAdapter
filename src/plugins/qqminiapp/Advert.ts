
namespace QQMiniAppGDK {
	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {

			return typeof wx.createRewardedVideoAd == `function` ? wx.createRewardedVideoAd(params) : null;
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


        /**
         * 对比版本
         * - v1>v2 -> true
         * - v2>v1 -> false
         * - v1==v2 -> dv
         */
		protected compareVersion(v1: string, v2: string, dv: boolean = true) {
			let v1s = v1.split('.')
			let v2s = v2.split('.')
			for (let index = 0; index < Math.min(v1s.length, v2s.length); index++) {
				let a1 = v1s[index]
				let a2 = v2s[index]
				if (a1 != a2) {
					return a1 > a2
				}
			}
			if (v1s.length != v2s.length) {
				return v1s.length > v2s.length
			}
			// 全等，返回 dv
			return dv
		}

	}
}
