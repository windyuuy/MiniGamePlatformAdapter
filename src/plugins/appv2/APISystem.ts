/// <reference path="./SDKProxy.ts" />
namespace UnityAppGDK {

	export class APISystem extends GDK.APISystemBase {

		protected _showList: Function[] = [];
		protected _hideList: Function[] = [];

		init() {
			super.init();

			//侦听show hide
			if (gdkjsb.bridge) {
				gdkjsb.bridge.on("app:show", (data: string) => {
					let jsonData: any = null;
					try {
						jsonData = JSON.parse(data);
					} catch (e) {
					}
					for (let f of this._showList.concat()) {
						f(jsonData)
					}
				})
				gdkjsb.bridge.on("app:hide", (data: string) => {
					let jsonData: any = null;
					try {
						jsonData = JSON.parse(data);
					} catch (e) {
					}
					for (let f of this._hideList.concat()) {
						f(jsonData)
					}
				})
			}
		}

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			callback({ left: 0, right: 0, top: 0, bottom: 0 });
			return;
			// if (gdkjsb.bridge == undefined) {
			// 	//兼容无gdkjsb的包
			// 	callback({ left: 0, right: 0, top: 0, bottom: 0 });
			// } else {
			// 	if (gdkjsb.bridge.callAction("DisplayCutout:getSafeArea", "{}", (data: string, func) => {
			// 		callback(JSON.parse(data));
			// 	}) != true) {
			// 		//兼容 nativeVersion == 0
			// 		callback({ left: 0, right: 0, top: 0, bottom: 0 });
			// 	}
			// }
		}

		get nativeVersion() {
			return gdkjsb.nativeVersion || 0;
		}

		get sdkFrameworkVersion() {
			return gdkjsb.bridge.sdkFrameworkVersion || "2.0"
		}

		openURL(url: string) {
			gdkjsb.openURL(url);
		}

		startYunkefu(accessId: string, name: string, id: string, customField: Object, native?: boolean) {
			if (native) {
				gdkjsb.bridge.callAction("showsAssistantCenter", JSON.stringify({ name, id, customField }), (data, func) => { })
				return
			}

			// if (nativeHelper.checkActionExist("StartYunkefu")) {
			// 	nativeHelper.callAction("StartYunkefu", { accessId: accessId, name: name, id: id, customField: customField })
			// } else {
			let otherParams = {
				nickName: name
			}
			gdk.openURL(encodeURI(`https://ykf-webchat.7moor.com/wapchat.html?accessId=${accessId}&clientId=${id}&otherParams=${JSON.stringify(otherParams)}&fromUrl=${gdk.systemInfo.packageName}&urlTitle=${gdk.systemInfo.packageTag}&customField=${JSON.stringify(customField)}`))
			// }
		}

		hasNativeAssistantCenter(): boolean {
			return gdkjsb.bridge.checkActionExist("showsAssistantCenter")
		}

		showHackWeb(url: string, duration: number) {
			if (gdkjsb.showHackWeb) {
				gdkjsb.showHackWeb(url, duration)
			}
		}

		setSDKLanguage(lang: string) {
			if (gdkjsb.setSDKLanguage) {
				gdkjsb.setSDKLanguage(lang)
			}
		}


		onShow?(callback: (data: any) => void): void {
			this._showList.push(callback);
		}
		offShow?(callback: Function): void {
			this._showList.remove(callback);
		}
		onHide?(callback: Function): void {
			this._hideList.push(callback);
		}
		offHide?(callback: Function): void {
			this._hideList.remove(callback);
		}

		async gotoAppSystemSettings?(params: GDK.IChooseDialogParams): Promise<GDK.IChooseDialogResult> {
			// return nativeHelper.safeCallAction("utils:gotoAppSystemSettings", params)
			return new Promise((resolve, reject) => {
				gdkjsb.gotoAppSystemSettings(JSON.stringify(params), (p) => {
					resolve(JSON.parse(p || "null"))
				})
			})
		}

		async checkAppSystemPermissions?(params: GDK.ICheckPermissionParams): Promise<GDK.ICheckPermissionResult> {
			// return nativeHelper.safeCallAction<GDK.ICheckPermissionResult>("utils:checkAppSystemPermissions", params)
			return new Promise((resolve, reject) => {
				gdkjsb.checkAppSystemPermissions(JSON.stringify(params), (p) => {
					resolve(JSON.parse(p || "null"))
				})
			})
		}

		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			if (gdkjsb.exitProgram) {
				gdkjsb.exitProgram()
			}
			setTimeout(() => {
				ret.success()
			}, 0);
			return ret.promise
		}
	}
}
