namespace WebGDK {

	const devlog = Common.devlog

	export class Share implements GDK.IShare {
		api?: GDK.UserAPI

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				setTimeout(() => {
					let d: string = ""
					if (data.data) {
						d = JSON.stringify(data.data)
					}
					let result = confirm("请点击一下按钮决定是否分享成功。" + d)
					let r = new GDK.ShareResult
					r.isGroup = false
					r.result = result ? 0 : 2;
					resolve(r);
				}, 1000)
			})
		}

		async socialShare(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return this.share(data);
		}

		async shareUrl(data: GDK.ShareUrlData): Promise<GDK.ShareResult> {
			return new Promise<GDK.ShareResult>((resolve, reject) => {
				alert("分享了一个url：" + data.url)
				let d = new GDK.ShareResult
				d.result = 0
				resolve(d)
			})
		}

		async showShareMenu(): Promise<void> {
			devlog.info("showShareMenu")
		}

		async hideShareMenu(): Promise<void> {
			devlog.info("showShareMenu")
		}
		async setShareMenuData(data: GDK.ShareData): Promise<void> {
			devlog.info("showShareMenu", data)
		}

		async getShareParam(): Promise<{ [key: string]: string }> {
			devlog.info("getShareParam")
			return null;
		}

		async getShareInfo(shareTicket: string): Promise<any> {
			return null;
		}

		async getShareTicket(): Promise<string> {
			return "";
		}
	}
}