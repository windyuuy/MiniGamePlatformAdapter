namespace AppGDK {

	const devlog = Common.devlog

	export class Share extends GDK.ShareBase {
		api?: GDK.UserAPI

		async share(data: GDK.ShareData): Promise<GDK.ShareResult> {
			let d: string = ""
			if (data.data) {
				d = JSON.stringify(data.data)
			}
			let result = await this.api.showConfirm({ content: "请点击一下按钮决定是否分享成功。" + d, title: "分享测试" });
			let r = new GDK.ShareResult
			r.isGroup = false
			r.result = result ? 0 : 2;
			return r;
		}

		async socialShare(data: GDK.ShareData): Promise<GDK.ShareResult> {
			return this.share(data);
		}

		async shareUrl(data: GDK.ShareUrlData): Promise<GDK.ShareResult> {
			await this.api.showAlert({ content: "分享了一个url：" + data.url, title: "分享测试" });
			let d = new GDK.ShareResult
			d.result = 0
			return d
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