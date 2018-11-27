namespace WechatGDK {
	export class Share implements GDK.IShare {
		api?: GDK.UserAPI
		server: WXServer

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				let query = "";
				if (data.data) {
					for (let k in data.data) {
						query += `${k}=${data.data[k]}&`
					}
					query = query.substr(0, query.length - 1)//去除结尾&符号
				}
				wx.shareAppMessage({
					title: data.title,
					imageUrl: data.imageUrl,
					query: query,
				})

				//安卓平台使用
				let platform = wx.getSystemInfoSync().platform
				if (platform == "android") {

				} else if (platform == "ios") {
					//根据时间进行假判断

				} else {
					reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHARE_UNSUPPORTED, { message: "不支持的平台" + platform }))
				}
			})
		}

		async socialShare(data: GDK.ShareData): Promise<GDK.ShareResult> {
			//微信平台仅支持分享到聊天窗口
			return this.share(data);
		}

		async shareUrl(data: GDK.ShareUrlData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHARE_UNSUPPORTED))
			})
		}

	}
}