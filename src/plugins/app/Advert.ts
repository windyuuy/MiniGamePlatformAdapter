namespace AppGDK {
	class VideoAd implements GDK.IRewardedVideoAd {
		api?: GDK.UserAPI

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _closeFuncList: Function[] = []

		protected _isLoad: boolean = false;

		adUnitId: string
		constructor(params: {
			adUnitId: string
		}) {
			this.adUnitId = this.adUnitId
		}

		load(): Promise<void> {
			if (this._isLoad) {
				return;
			}
			const ret = new GDK.RPromise<void>()
			setTimeout(() => {
				if (false) {
					// if (Math.random() > 0.9) {
					ret.fail();
					for (let f of this._errorFuncList) {
						f({ errCode: -1, errMsg: "1%的概率模拟广告加载失败" })
					}
				} else {
					this._isLoad = true;
					ret.success(undefined);
					for (let f of this._loadFuncList) {
						f()
					}
				}
			}, 100)

			return ret.promise
		}

		show(): Promise<void> {
			const ret = new GDK.RPromise<void>()

			if (!this._isLoad) {
				ret.fail("请先加载，再显示");
			} else {
				this._isLoad = false;
				setTimeout(() => {
					let isOk = true
					// this.api.showConfirm({ content: "你是否观看完广告？", title: "广告测试" }).then((isOk) => {
					for (let f of this._closeFuncList) {
						f({ isEnded: isOk });
					}
				})
			}

			return ret.promise
		}

		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}
		offLoad(callback: Function) {
			this._loadFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}

		onError(callback: (res: GDK.RewardedVideoAdOnErrorParam) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			this._errorFuncList.splice(this._errorFuncList.indexOf(callback), 1)
		}

		onClose(callback: Function) {
			this._closeFuncList.push(callback)
		}
		offClose(callback: Function) {
			this._closeFuncList.splice(this._closeFuncList.indexOf(callback), 1)
		}
	}

	class BannerAd implements GDK.IBannerAd {
		adUnitId?: string
		viewId?: number

		protected _loadFuncList: Function[] = []
		protected _errorFuncList: Function[] = []
		protected _resizeFuncList: Function[] = []

		protected _destroy: boolean = false;

		protected _ad: HTMLImageElement = null;//假装的广告

		constructor(params: { viewId: number, style?: { x: number, y: number } }) {
			setTimeout(() => {
				for (let f of this._loadFuncList) {
					f();
				}
			}, 1000)
		}

		async show(): Promise<void> {
			if (this._ad) {
				return;
			}
			const ret = new GDK.RPromise<void>()
			if (this._destroy) {
				ret.fail("已经调用过destroy")
			} else {

				//假装显示一个广告
				this._ad = document.createElement("img")
				this._ad.style.position = "absolute"
				this._ad.style.bottom = "0px"
				this._ad.style.width = "500px"
				this._ad.style.height = "100px"
				this._ad.src = "https://www.baidu.com/img/bd_logo1.png"

				document.body.appendChild(this._ad)

				ret.success(undefined)
			}
			return ret.promise
		}
		hide(): void {
			if (this._ad) {
				this._ad.remove();
				this._ad = null;
			}
		}
		destroy(): void {
			this._destroy = true;
		}
		onResize(callback: Function) {
			this._resizeFuncList.push(callback)
		}
		offResize(callback: Function) {
			this._resizeFuncList.splice(this._resizeFuncList.indexOf(callback), 1)
		}
		onLoad(callback: Function) {
			this._loadFuncList.push(callback)
		}

		offLoad(callback: Function) {
			this._loadFuncList.splice(this._loadFuncList.indexOf(callback), 1)
		}
		onError(callback: (code: number, msg: string) => void) {
			this._errorFuncList.push(callback)
		}
		offError(callback: Function) {
			this._errorFuncList.splice(this._errorFuncList.indexOf(callback), 1)
		}
	}

	export class Advert implements GDK.IAdvert {

		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): GDK.IRewardedVideoAd {
			return new VideoAd(params)
		}

		createBannerAd(params: {
			adUnitId: string,
			viewId: number,
			style: GDK.BannerStyle
		}): GDK.IBannerAd {
			return new BannerAd(params)
		}
	}
}
