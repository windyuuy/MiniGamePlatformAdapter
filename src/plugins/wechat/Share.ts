namespace WechatGDK {


    /**
     * 由于微信官方没有微信回调的数据，
     * 该接口是用于分享回调的判断接口
     * add 2018-11-08
     */
	class ShareProxy {
        /**
         * 保存参数,分享回调
         * @param shareReq 
         */
		static apiSetValue(server: string, openId: string, timeStamp: number, url: string) {
			let params = "?openId=" + openId + "&timeStamp=" + timeStamp + "&url=" + url;
			let api = server + "/api/Client/SetValue" + params;
			console.log("apiSetValue url=", api);
			return api;
		}

        /**
         * 获取参数
         * 返回的值是true或false，分享是否有到好友聊天框里
         * @param shareReq 
         */
		static apiGetValue(server: string, openId, timeStamp, callback?) {
			if (window['wx']) {
				let params = "?openId=" + openId + "&timeStamp=" + timeStamp;
				let url = server + "/api/Client/GetValue" + params;
				console.log("apiGetValue url=", url);
				wx['request']({
					url: url,
					method: 'get',
					success: (res) => {
						console.log("apiGetValue res=", res);
						if (typeof (callback) == 'function') {
							callback(res);
						}
					}
				})
			}
		}
	}

	export class Share implements GDK.IShare {
		api?: GDK.UserAPI

		/**
		 * 分享的启动参数
		 */
		protected _shareParam: { [key: string]: string } = {}

		init() {
			wx.onShow((res) => {
				//获取对应的分享启动参数
				this._shareParam = res.query
			})
		}

		/**
		 * 判断今天是否分享过。这里未实现。
		 */
		protected _isLastTimeYeasterDay: boolean = false;

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				let query = "";
				if (data.data) {
					for (let k in data.data) {
						query += `${k}=${data.data[k]}&`
					}
					query = query.substr(0, query.length - 1)//去除结尾&符号
				}


				let shareInvaterl: number = 1.5	//分享必须消耗该时间，才可能成功
				let sharesSucPro: number = 0.7   //分享判定成功概率  0.7
				let sharesSucFail: number = 0.2  //分享判定调用接口失败概率  0.2
				let sharesSucFailSame: number = 0.1  //分享判定不同群提示概率  0.1

				let beginShareTime = new Date().getTime();//开始分享时间

				let imageUrl = data.imageUrl

				let platform = wx.getSystemInfoSync().platform
				if (platform == "android") {
					imageUrl = ShareProxy.apiSetValue(this.api.gameInfo.shareProxyUrl, this.api.gameInfo.appId, beginShareTime, data.imageUrl)
				}
				console.log("share", {
					title: data.title,
					imageUrl: imageUrl,
					query: query,
				})
				wx.shareAppMessage({
					title: data.title,
					imageUrl: imageUrl,
					query: query,
				})

				let onShow = () => {
					wx.offShow(onShow);

					let shareMaySuc = () => {
						/**
						 *  一定概率（配表）判定本次分享成功（每天第一次必然成功）
							一定概率（配表）判定本次分享失败，返回提示 调用微信分享接口失败,请重试，采用微信的提示弹框
							一定概率（配表）判定本次分享失败，返回提示 请不要频繁打扰同个用户/群哦，采用微信的提示弹框
						* */
						if (this._isLastTimeYeasterDay) {
							shareSuc()
						} else {
							let r = Math.random()

							if (r <= sharesSucPro) {
								shareSuc()
								return
							}

							r -= sharesSucPro
							if (r <= sharesSucFail) {
								shareFail()
								return
							}

							shareFail("请不要频繁打扰同个用户/群哦")
						}
					}

					let shareSuc = () => {
						this._isLastTimeYeasterDay = true;

						let result = new GDK.ShareResult()
						result.result = 0;
						resolve(result)
					}
					let shareFail = (msg: string = "微信分享接口调用失败，请重试") => {
						let result = new GDK.ShareResult()
						result.result = 1;
						result.message = msg;
						resolve(result)
					}

					let ec = (Common.getServerTime().getTime() - beginShareTime) / 1000
					if (ec > shareInvaterl) {

						//安卓平台使用
						let platform = wx.getSystemInfoSync().platform
						if (platform == "android") {
							ShareProxy.apiGetValue(this.api.gameInfo.shareProxyUrl, this.api.gameInfo.appId, beginShareTime, (rep) => {
								if (rep && rep.data) {
									shareMaySuc()
								} else {
									shareFail()
								}
							})
						} else if (platform == "ios") {
							//根据时间进行假判断
							shareMaySuc()
						} else {
							reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SHARE_UNSUPPORTED, { message: "不支持的平台" + platform }))
						}

					} else {
						shareFail()
					}



				}
				wx.onShow(onShow);

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

		async showShareMenu(): Promise<void> {
			wx.showShareMenu({ withShareTicket: true })
		}

		async hideShareMenu(): Promise<void> {
			wx.hideShareMenu({});
		}

		/**
		 * 分享菜单数据回调接口
		 */
		protected _shareMenuDataCallback: (res: { title?: string, imageUrl?: string, query?: string }) => { title?: string, imageUrl?: string, query?: string } = null;

		protected _shareMenuData: GDK.ShareData = null;

		async setShareMenuData(data: GDK.ShareData): Promise<void> {
			this._shareMenuData = data;
			if (this._shareMenuDataCallback == null) {
				this._shareMenuDataCallback = (res) => {
					if (res == null) {
						res = {}
					}
					let query = "";
					if (this._shareMenuData.data) {
						for (let k in this._shareMenuData.data) {
							query += `${k}=${this._shareMenuData.data[k]}&`
						}
						query = query.substr(0, query.length - 1)//去除结尾&符号
					}

					res.title = this._shareMenuData.title
					res.imageUrl = this._shareMenuData.imageUrl
					res.query = query

					return res;
				}
				wx.onShareAppMessage(this._shareMenuDataCallback)
			}
		}

		async getShareParam(): Promise<{ [key: string]: string }> {

			if (this._shareParam) {
				return this._shareParam;
			}

			let data = wx.getLaunchOptionsSync()
			return data.query;
		}

	}
}