/// <reference path="./SDKProxy.ts" />
namespace AppV2GDK {

	export class APISystem extends GDK.APISystemBase {

		protected _showList: Function[] = [];
		protected _hideList: Function[] = [];

		init() {
			super.init();

			SDKProxy.appShow((data: string) => {
				let jsonData: any = null;
				try {
					jsonData = JSON.parse(data);
				} catch (e) {
				}
				for (let f of this._showList.concat()) {
					f(jsonData)
				}
			})
			SDKProxy.appHide((data: string) => {
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

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			SDKProxy.getSafeArea(callback as any);
		}

		get nativeVersion() {
			return SDKProxy.nativeVersion();
		}

		get sdkFrameworkVersion() {
			return SDKProxy.sdkFrameworkVersion()
		}

		openURL(url: string) {
			SDKProxy.openURL(url)
		}

		startYunkefu(accessId: string, name: string, id: string, customField: Object, native?: boolean) {
			SDKProxy.startYunkefu(accessId, name, id, customField, native);
		}

		hasNativeAssistantCenter(): boolean {
			return SDKProxy.hasNativeAssistantCenter();
		}

		showHackWeb(url: string, duration: number) {
			SDKProxy.showHackWeb(url, duration)
		}

		setSDKLanguage(lang: string) {
			SDKProxy.setSDKLanguage(lang)
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
			return new Promise((resolve, reject) => {
				SDKProxy.gotoAppSystemSettings(JSON.stringify(params), (p) => {
					resolve(JSON.parse(p || "null"))
				})
			})
		}

		async checkAppSystemPermissions?(params: GDK.ICheckPermissionParams): Promise<GDK.ICheckPermissionResult> {
			return new Promise((resolve, reject) => {
				SDKProxy.checkAppSystemPermissions(JSON.stringify(params), (p) => {
					resolve(JSON.parse(p || "null"))
				})
			})
		}

		exitProgram(): Promise<void> {
			const ret = new GDK.RPromise<void>()
			SDKProxy.exitProgram();
			setTimeout(() => {
				ret.success()
			}, 0);
			return ret.promise
		}


		/**
		 * ??????Info??????
		 */
		makeAppInfo(): string {
			return SDKProxy.makeAppInfo();
		}


		/**
		 * ??????Info??????
		 */
		setAppInfo(key: string, value: string | number | boolean) {
			if (SDKProxy.gdkjsbExist()) {
				if (SDKProxy.getAppInfo(AppInfoKeys.unityEnv) == "UNITY_EDITOR") {
					super.setAppInfo(key, value);
				}
				SDKProxy.setAppInfo(key, value);
			} else {
				super.setAppInfo(key, value);
			}
		}

		/**
		 * ??????Info??????
		 */
		getAppInfo(key: string): (string | number | boolean | null) {
			if (SDKProxy.gdkjsbExist()) {
				if (SDKProxy.getAppInfo(AppInfoKeys.unityEnv) == "UNITY_EDITOR") {
					return super.getAppInfo(key);
				}
				return SDKProxy.getAppInfo(key);
			} else {
				return super.getAppInfo(key);
			}
		}

		/**
		 * ????????????????????????
		*/
		getResVersion(): number {
			if (SDKProxy.gdkjsbExist()) {
				return SDKProxy.getResVersion();
			} else {
				return super.getResVersion();
			}
		}


		private _backgroundTime: number = 0;
		/**
		 * app?????????????????????10????????????????????????????????????????????????App?????????cc.restart??????
		 */
		appAutoRestart() {
			if (!this.enableRestart) return;
			this.onHide((data: any) => {
				if (!this.enableRestart) return;
				this._backgroundTime = new Date().getTime() / 1000
				console.log("App??????????????????????????????", this._backgroundTime);
			})

			this.onShow((data: any) => {
				if (!this.enableRestart) return;
				if (this._backgroundTime == 0) {
					return
				}
				let date = new Date().getTime() / 1000;
				console.log("App??????????????????????????????", date);
				if (date - this._backgroundTime >= 10 * 60) {
					console.log("????????????????????????10?????????????????????");
					if (window["cc"]) {
						gdk.showLaunchingView();
						let cc = window["cc"] as any;
						cc.game.restart();
					}
				} else {
					console.log("????????????????????????10?????????????????????")
				}
			})
		}
	}
}
