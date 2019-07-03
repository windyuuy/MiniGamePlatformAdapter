namespace VIVOGDK {

	const devlog = Common.devlog

	export class Share implements GDK.IShare {
		api?: GDK.UserAPI

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				// oppo 暂无分享
			})
		}

		async socialShare(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {

				let shareLogic = (socialpic: boolean) => {
					// oppo 暂无分享
				}
				/*
				if (data.socialPicUrl) {
					devlog.info("开始下载社会化分享图片", data.socialPicUrl)
					devlog.info(data.socialPicUrl)
					BK.Http.request({
						url: data.socialPicUrl,
						method: "GET",
						success: (data) => {
							if (data.statusCode !== 200) {
								devlog.info("社会化分享图片下载失败")
								devlog.info(data.statusCode)
								shareLogic(false);
								return;
							}
							devlog.info("社会化分享图片下载成功")
							//buffer
							BK.fileSystem.writeFileSync("GameSandBox://share/socialpic.png", data.arrayBuffer());
							shareLogic(true);
						},
						fail: (err) => {
							shareLogic(false);
						}
					});
				} else {
					shareLogic(false);
				}
				*/
			})
		}

		async shareUrl(data: GDK.ShareUrlData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				// oppo 暂无分享
				let result = new GDK.ShareResult()
				result.result = 0;
				resolve(result)
			})
		}

		async showShareMenu(): Promise<void> {
			//QQ平台什么也不用做
		}

		async hideShareMenu(): Promise<void> {
			//QQ平台什么也不用做
		}

		async setShareMenuData(data: GDK.ShareData): Promise<void> {
			//QQ平台什么也不用做
		}

		async getShareParam(): Promise<{ [key: string]: string }> {
			/*
			let data = window['GameStatusInfo'].gameParam
			if (typeof data == "string") {
				try {
					return JSON.parse(data)
				} catch{
					return null;
				}
			}*/
			return null;
		}

		async getShareTicket(): Promise<string> {
			return "";
		}

		async getShareInfo(shareTicket: string): Promise<any> {
			return null;
		}

	}
}