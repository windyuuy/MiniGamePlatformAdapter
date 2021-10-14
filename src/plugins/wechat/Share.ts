/// <reference path="./GameInfo.ts" />
namespace WechatGDK {
	const devlog = Common.devlog

	export class Share extends GDK.ShareBase {
		api?: GDK.UserAPI

		launchOptions?: { scene: number, query: any, path?: string, isSticky: boolean, shareTicket: string, referrerInfo: { appId: string, extraData: any } }

		/**
		 * 分享的启动参数
		 */
		protected _shareParam: { [key: string]: string } = null

		protected _shareTicket: string = null

		init() {
			this.launchOptions = SDKProxy.getLaunchOptionsSync()
			SDKProxy.onShow((res) => {
				//获取对应的分享启动参数
				this._shareParam = res.query
				this._shareTicket = res.shareTicket

				//刷新启动参数
				this.launchOptions.query = res.query
				this.launchOptions.shareTicket = res.shareTicket
				this.launchOptions.scene = res.scene
				this.launchOptions.referrerInfo = res.referrerInfo
			})
		}

		/**
		 * 判断今天是否分享过。这里未实现。 用于V1分享
		 */
		protected _isLastTimeYeasterDay: boolean = false;

		/**
		 * 上次分享失败，则下次必然成功。 用于V1分享
		 */
		protected _shareDefeated: boolean = false;

		/**
		 * 分享成功次数 用于V2分享
		 */
		protected _shareSucceedCount: number = 0;


		/**
		 * 微信分享
		 * @param data 
		 */
		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			//默认分享版本
			return this.shareV0(data);
		}

		/**
		 * 必然分享成功
		 * @param data 必然分享成功
		 */
		async shareV0(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				let query = "";
				if (data.data) {
					for (let k in data.data) {
						query += `${k}=${data.data[k]}&`
					}
					query = query.substr(0, query.length - 1)//去除结尾&符号
				}

				devlog.info("share", {
					title: data.title,
					imageUrl: data.imageUrl,
					query: query,
				})
				SDKProxy.shareAppMessage({
					title: data.title,
					desc: data.summary,
					imageUrl: data.imageUrl,
					query: query,
				})

				let onShow = () => {
					SDKProxy.offShow(onShow);
					let result = new GDK.ShareResult()
					result.result = 0;
					resolve(result)
				}
				SDKProxy.onShow(onShow);
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
			SDKProxy.showShareMenu({ withShareTicket: true })
		}

		async hideShareMenu(): Promise<void> {
			SDKProxy.hideShareMenu({});
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
				SDKProxy.onShareAppMessage(this._shareMenuDataCallback)
			}
		}

		async getShareParam(): Promise<{ [key: string]: string }> {

			if (this._shareParam) {
				return this._shareParam;
			}

			let data = SDKProxy.getLaunchOptionsSync()
			return data.query;
		}

		async getShareTicket(): Promise<string> {
			if (this._shareTicket) {
				return this._shareTicket;
			}

			let data = SDKProxy.getLaunchOptionsSync()
			return data.shareTicket;
		}

		async getShareInfo(shareTicket: string): Promise<any> {
			return new Promise<any>((resolve, reject) => {
				SDKProxy.getShareInfo({
					shareTicket: shareTicket, success: (res) => {
						resolve(res);
					},
					fail: (err) => {
						reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, err))
					}
				})
			})
		}


	}
}