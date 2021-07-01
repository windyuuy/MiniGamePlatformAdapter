
namespace WechatGDK {
	export class SDKProxy {
		static get wx() {
			return window["wx"] || window["tt"]
		}

		static createInterstitialAd(obj: { adUnitId: string }): any {
			if (SDKProxy.wx) {
				return SDKProxy.wx.createInterstitialAd(obj);
			} else {
				console.log("浏览器模式，跳过方法:createInterstitialAd")
				return {};
			}
		}
		static createRewardedVideoAd(obj: { adUnitId: string }): any {
			if (SDKProxy.wx) {
				return SDKProxy.wx.createRewardedVideoAd(obj);
			} else {
				console.log("浏览器模式，跳过方法:createRewardedVideoAd")
				return {};
			}
		}
		static createBannerAd(obj: { adUnitId: string, style: { left?: number, top?: number, width?: number, height?: number } }): wx.BannerAd {
			if (SDKProxy.wx) {
				return SDKProxy.wx.createBannerAd(obj);
			} else {
				console.log("浏览器模式，跳过方法:createBannerAd")
				return null;
			}
		}

		static getSystemInfoSync(): wx.GetSystemInfoResult {
			if (SDKProxy.wx) {
				return SDKProxy.wx.getSystemInfoSync();
			} else {
				console.log("浏览器模式，跳过方法:getSystemInfoSync")
				return null;
			}
		}

		static setClipboardData(data: { data: string, success?: () => void, fail?: () => void, complete?: () => void, }): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.setClipboardData(data);
			} else {
				console.log("浏览器模式，跳过方法:setClipboardData")
			}

		}
		static getClipboardData(data: { success: (res: { data: string }) => void, fail?: () => void, complete?: () => void, }): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.getClipboardData(data);
			} else {
				console.log("浏览器模式，跳过方法:getClipboardData")
			}
		}

		static setEnableDebug(res: { enableDebug: boolean } & wx.BaseOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.setEnableDebug(res);
			} else {
				console.log("浏览器模式，跳过方法:setEnableDebug")
			}
		}

		static navigateToMiniProgram(res: wx.AppCallUpParams) {
			if (SDKProxy.wx) {
				SDKProxy.wx.navigateToMiniProgram(res);
			} else {
				console.log("浏览器模式，跳过方法:navigateToMiniProgram")
			}

		}

		static exitMiniProgram(res: wx.BaseOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.exitMiniProgram(res);
			} else {
				console.log("浏览器模式，跳过方法:exitMiniProgram")
			}

		}

		static showLoading(object: Object) {
			if (SDKProxy.wx) {
				SDKProxy.wx.showLoading(object);
			} else {
				console.log("浏览器模式，跳过方法:showLoading")
			}
		}

		static hideLoading(object: Object) {
			if (SDKProxy.wx) {
				SDKProxy.wx.hideLoading(object);
			} else {
				console.log("浏览器模式，跳过方法:hideLoading")
			}
		}

		static showModal(options: wx.ShowModalOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.showModal(options);
			} else {
				setTimeout(() => {
					if (options.showCancel) {
						let r = confirm("[" + options.title + "]" + options.content);
						if (options.success) {
							options.success({ confirm: r ? 1 : 0 });
						}
					} else {
						alert("[" + options.title + "]" + options.content)
						if (options.success)
							options.success();
					}
				}, 1);
			}

		}

		static getUpdateManager(): wx.UpdateManager {
			if (SDKProxy.wx) {
				return SDKProxy.wx.getUpdateManager();
			} else {
				console.log("浏览器模式，跳过方法:getUpdateManager")
				return null
			}
		}

		static onShow(callback: (res: { scene: number, query: any, shareTicket: string, referrerInfo: any }) => void) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onShow(callback);
			} else {
				console.log("浏览器模式，跳过方法:onShow")
			}
		}
		static onHide(callback: Function) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onHide(callback);
			} else {
				console.log("浏览器模式，跳过方法:onHide")
			}
		}
		static offHide(callback: Function) {
			if (SDKProxy.wx) {
				SDKProxy.wx.offHide(callback);
			} else {
				console.log("浏览器模式，跳过方法:offHide")
			}
		}
		static offShow(callback: Function) {
			if (SDKProxy.wx) {
				SDKProxy.wx.offShow(callback);
			} else {
				console.log("浏览器模式，跳过方法:offShow")
			}
		}

		static createUserInfoButton(obj: wx.IUserInfoButton): wx.UserInfoButton {
			if (SDKProxy.wx) {
				return SDKProxy.wx.createUserInfoButton(obj);
			} else {
				console.log("浏览器模式，跳过方法:createUserInfoButton")
			}
			return null
		}

		static getSetting(data: {
			success?: (authSetting: wx.AuthSetting) => void, fail?: Function, complete?: Function
		}) {
			if (SDKProxy.wx) {
				SDKProxy.wx.getSetting(data);
			} else {
				console.log("浏览器模式，跳过方法:getSetting")
			}
		}

		static openCustomerServiceConversation(object: wx.CustomerServiceConversationParams) {
			if (SDKProxy.wx) {
				SDKProxy.wx.openCustomerServiceConversation(object);
			} else {
				console.log("浏览器模式，跳过方法:openCustomerServiceConversation")
			}
		}

		static onError(callback: (res: { message: string, stack: string }) => void) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onError(callback);
			} else {
				console.log("浏览器模式，跳过方法:onError")
			}
		}

		static getScreenBrightness(res: wx.GetScreenBrightnessData): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.getScreenBrightness(res);
			} else {
				console.log("浏览器模式，跳过方法:getScreenBrightness")
			}

		}
		static setKeepScreenOn(res: { keepScreenOn: boolean } & wx.BaseOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.setKeepScreenOn(res);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}
		static setScreenBrightness(res: { value: number } & wx.BaseOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.setScreenBrightness(res);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static vibrateLong(params: wx.BaseOptions) {
			if (SDKProxy.wx) {
				SDKProxy.wx.vibrateLong(params);
			} else {
				console.log("浏览器模式，跳过方法")
			}

		}
		static vibrateShort(params: wx.BaseOptions) {
			if (SDKProxy.wx) {
				SDKProxy.wx.vibrateLong(params);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getPerformance(): wx.Performance {
			if (SDKProxy.wx) {
				return SDKProxy.wx.getPerformance();
			} else {
				console.log("浏览器模式，跳过方法")
			}
			return null
		}

		static triggerGC(): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.triggerGC();
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static onMemoryWarning(callback: (res: { level: number }) => void): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.onMemoryWarning(callback);
			} else {
				console.log("浏览器模式，跳过方法")
			}

		}

		static shareAppMessage(obj?: { desc?: string, title?: string, imageUrl?: string, query?: string, success?: Function, fail?: Function, complete?: Function, cancel?: Function }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.shareAppMessage(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}
		static showShareMenu(obj: { withShareTicket: boolean, success?: Function, fail?: Function, complete?: Function }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.showShareMenu(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static hideShareMenu(obj: { success?: Function, fail?: Function, complete?: Function }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.hideShareMenu(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static onShareAppMessage(callback: (obj: { title?: string, imageUrl?: string, query?: string }) => { title?: string, imageUrl?: string, query?: string }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onShareAppMessage(callback);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getShareInfo(obj: { shareTicket: string, success?: (res: { errMsg: string, encryptedData: string, iv: string }) => void, fail?: Function, complete?: Function }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.getShareInfo(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static onMessage(callback) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onMessage(callback);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getOpenDataContext(): wx.OpenDataContext {
			if (SDKProxy.wx) {
				return SDKProxy.wx.getOpenDataContext();
			} else {
				console.log("浏览器模式，跳过方法")
			}
			return null;
		}

		static getNetworkType(options: wx.GetNetworkTypeOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.getNetworkType(options);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getUserInfo(options: wx.GetUserInfoOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.getUserInfo(options);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getStorageSync(key: string): any {
			if (SDKProxy.wx) {
				SDKProxy.wx.getStorageSync(key);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static setStorageSync(key: string, data: any): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.setStorageSync(key, data);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static onNetworkStatusChange(callback: (res: { isConnected: boolean, networkType: string }) => void) {
			if (SDKProxy.wx) {
				SDKProxy.wx.onNetworkStatusChange(callback);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static checkSession(options: wx.CheckSessionOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.checkSession(options);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static getFriendCloudStorage(obj: { keyList: string[], success?: (res: { data: wx.UserGameData[] }) => void, fail?: Function, complete?: Function }): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.getFriendCloudStorage(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static setUserCloudStorage(obj: { KVDataList: wx.KVData[], success?: Function, fail?: Function, complete?: Function }) {
			if (SDKProxy.wx) {
				SDKProxy.wx.setUserCloudStorage(obj);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static showToast(options: wx.ShowToastOptions): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.showToast(options);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static hideToast(object: Object): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.hideToast(object);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}

		static hideKeyboard(object: Object): void {
			if (SDKProxy.wx) {
				SDKProxy.wx.hideKeyboard(object);
			} else {
				console.log("浏览器模式，跳过方法")
			}
		}


		static requestMidasPayment(req: wx.MidasPaymentParams & {
			success?: Function//		否	接口调用成功的回调函数	
			fail?: (res: { errMsg: string, errCode: number }) => void//		否	接口调用失败的回调函数	
			complete?: Function//		否	接口调用结束的回调函数（调用成功、失败都会执行）
		}): any {
			if (SDKProxy.wx) {
				SDKProxy.wx.requestMidasPayment(req);
			} else {
				console.log("浏览器模式，跳过方法:requestMidasPayment")
			}
		}
		static login(options: wx.LoginOptions) {
			if (SDKProxy.wx) {
				SDKProxy.wx.login(options);
			} else {
				console.log("浏览器模式，跳过方法:login")
				options.fail && options.fail();
				options.complete && options.complete();
			}
		}

		static getLaunchOptionsSync(): { scene: number, query: any, path?: string, isSticky: boolean, shareTicket: string, referrerInfo: { appId: string, extraData: any } } {
			if (SDKProxy.wx) {
				return SDKProxy.wx.getLaunchOptionsSync();
			} else {
				console.log("浏览器模式，跳过方法:getLaunchOptionsSync")
				return {} as any;
			}
		}
	}
}