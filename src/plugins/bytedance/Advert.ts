
namespace BytedanceGDK {
	export class Advert extends WechatGDK.Advert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {

			if (!this.compareVersion(gdk.SDKVersion, "1.3.0")) {
				//不是最新版本直接下发奖励
				console.log("头条不是最新版本，请升级！(头条基础库 1.3.0 开始支持，低版本需做兼容处理。)")
				return null
			}

			return wx.createRewardedVideoAd(params)
		}

	}
}
