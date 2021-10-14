
namespace BytedanceGDK {
	export class SDKProxy {
		static get wx() {
			return window["wx"] || window["tt"]
		}

		static createRewardedVideoAd(obj: { adUnitId: string }): any{
			if (SDKProxy.wx) {
				return SDKProxy.wx.createRewardedVideoAd(obj);
			} else {
				console.log("浏览器模式，跳过方法:createRewardedVideoAd")
				return {};
			}
		}

		static requestMidasPayment(req: wx.MidasPaymentParams & {
			success?: Function//		否	接口调用成功的回调函数	
			fail?: (res: { errMsg: string, errCode: number }) => void//		否	接口调用失败的回调函数	
			complete?: Function//		否	接口调用结束的回调函数（调用成功、失败都会执行）
		}): any{
			if (SDKProxy.wx) {
				SDKProxy.wx.requestMidasPayment(req);
			} else {
				console.log("浏览器模式，跳过方法:requestMidasPayment")
			}
		}

		static navigateToMiniProgram(res: wx.AppCallUpParams){
			if (SDKProxy.wx) {
				SDKProxy.wx.navigateToMiniProgram(res);
			} else {
				console.log("浏览器模式，跳过方法:navigateToMiniProgram")
			}
		}

		static openCustomerServiceConversation(object: wx.CustomerServiceConversationParams){
			if (SDKProxy.wx) {
				SDKProxy.wx.openCustomerServiceConversation(object);
			} else {
				console.log("浏览器模式，跳过方法:openCustomerServiceConversation")
			}
		}

		static login(options: wx.LoginOptions){
			if (SDKProxy.wx) {
				SDKProxy.wx.login(options);
			} else {
				console.log("浏览器模式，跳过方法:login")
				options.success && options.success({code:"1234", errMsg: "浏览器模式", anonymousCode: ""});
			}
		}

		static getLaunchOptionsSync(): { scene: number, query: any, path?: string, isSticky: boolean, shareTicket: string, referrerInfo: { appId: string, extraData: any } }{
			if (SDKProxy.wx) {
				return SDKProxy.wx.getLaunchOptionsSync();
			} else {
				console.log("浏览器模式，跳过方法:getLaunchOptionsSync")
				return {} as any;
			}
		}
	}
}