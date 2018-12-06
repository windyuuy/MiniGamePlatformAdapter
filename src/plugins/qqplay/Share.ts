namespace QQPlayGDK {

	export class Share implements GDK.IShare {
		api?: GDK.UserAPI

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				BK.Share.share({
					qqImgUrl: data.imageUrl,
					isToFriend: true,
					summary: data.title,
					extendInfo: data.data ? JSON.stringify(data.data) : null,
					success: function (succObj) {
						// BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
						let result = new GDK.ShareResult
						result.result = succObj.data.ret
						result.isGroup = succObj.data.aioType == 4 || succObj.data.aioType == 5
						result.extra = succObj
						resolve(result);
					},
					fail: function (failObj) {
						// BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
						let result = new GDK.ShareResult
						result.result = 1
						result.extra = failObj
						resolve(result);
					},
					complete: () => {
						// BK.Console.log('分享完成，不论成功失败');
					}
				});
			})
		}

		async socialShare(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {

				let shareLogic = (socialpic: boolean) => {
					BK.Share.share({
						qqImgUrl: data.imageUrl,
						socialPicPath: socialpic ? 'GameSandBox://share/socialpic.png' : null,
						title: data.title,
						summary: data.summary,
						extendInfo: data.data ? JSON.stringify(data.data) : null,
						success: function (succObj) {
							// BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
							let result = new GDK.ShareResult
							result.result = succObj.data.ret
							result.isGroup = succObj.data.aioType == 4 || succObj.data.aioType == 5
							result.extra = succObj
							resolve(result);
						},
						fail: function (failObj) {
							// BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
							let result = new GDK.ShareResult
							result.result = 1
							result.extra = failObj
							resolve(result);
						},
						complete: () => {
							// BK.Console.log('分享完成，不论成功失败');
						}
					});
				}

				if (data.socialPicUrl) {
					console.log("开始下载社会化分享图片", data.socialPicUrl)
					console.log(data.socialPicUrl)
					BK.Http.request({
						url: data.socialPicUrl,
						method: "GET",
						success: (data) => {
							if (data.statusCode !== 200) {
								console.log("社会化分享图片下载失败")
								console.log(data.statusCode)
								shareLogic(false);
								return;
							}
							console.log("社会化分享图片下载成功")
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

			})
		}

		async shareUrl(data: GDK.ShareUrlData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				BK.Share.share({
					qqImgUrl: data.imageUrl,
					msgUrl: data.url,
					title: data.title,
					summary: data.summary,
				});
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
			let data = window['GameStatusInfo'].gameParam
			if (typeof data == "string") {
				try {
					return JSON.parse(data)
				} catch{
					return null;
				}
			}
			return null;
		}


	}
}