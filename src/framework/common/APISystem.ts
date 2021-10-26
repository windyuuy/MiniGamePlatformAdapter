
namespace GDK {
	const devlog = new lang.libs.Log({ tags: ["DEVELOP"] })

	class Clipboard implements IClipboard {
		_data: ClipboardData = null
		async getData(): Promise<ClipboardData> {
			// return { ...this._data }
			// return {};
			return this._data;
		}
		async setData(res: ClipboardData): Promise<void> {
			// this._data = { ...res }
		}
	}

	export class APISystemBase implements IAPISystem {

		get sdkFrameworkVersion(): string {
			return "-1.0"
		}

		clipboard?: IClipboard = new Clipboard()

		init() {
			this._initEvents()

			this.appAutoRestart();
		}

		get nativeVersion() {
			return -1;
		}

		async setEnableDebug(res: { enableDebug: boolean }) {
			devlog.info(`unsupoort action: setEnableDebug -> ${res.enableDebug} `)
		}

		async navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult> {
			devlog.info("打开小程序成功")
			return {}
		}
		async exitProgram?(): Promise<void> {
			devlog.info("正在退出")
			window.close();
		}
		async updateProgramForce() {
			devlog.info("没有更新")
		}

		_initEvents() {
			if (document == null) {
				return;
			}

			let win = window, hiddenPropName: string;
			let hiddenProp: string, visibilityChange: string;
			if (typeof document.hidden !== "undefined") {
				hiddenProp = "hidden";
				visibilityChange = "visibilitychange";
				hiddenPropName = "visibilityState";
			} else if (typeof document["mozHidden"] !== "undefined") {
				hiddenProp = "mozHidden";
				visibilityChange = "mozvisibilitychange";
				hiddenPropName = "mozVisibilityState";
			} else if (typeof document["msHidden"] !== "undefined") {
				hiddenProp = "msHidden";
				visibilityChange = "msvisibilitychange";
				hiddenPropName = "msVisibilityState";
			} else if (typeof document["webkitHidden"] !== "undefined") {
				hiddenProp = "webkitHidden";
				visibilityChange = "webkitvisibilitychange";
				hiddenPropName = "webkitVisibilityState";
			} else {
				console.error("invalid hidden listener")
				hiddenProp = "hidden";
				visibilityChange = "visibilitychange";
				hiddenPropName = "visibilityState";
			}
			let hidden = false;
			const onHidden = () => {
				if (!hidden) {
					hidden = true;
					// game.emit(game.EVENT_HIDE);
					this._onHideEvent.emit(undefined)
				}
			}
			const onShown = () => {
				if (hidden) {
					hidden = false;
					// game.emit(game.EVENT_SHOW);
					this._onShowEvent.emit({})
				}
			}
			if (hiddenPropName) {
				let changeList = [
					visibilityChange,
				]
				for (var i = 0; i < changeList.length; i++) {
					document.addEventListener(changeList[i], function (event) {
						var visible = document[hiddenPropName];
						if (visible == undefined) {
							visible = event['hidden'];
						}
						devlog.info('document-hidden:', visible)
						if (visible)
							onHidden();
						else
							onShown();
					});
				}
			} else {
				win.addEventListener('blur', onHidden);
				win.addEventListener('focus', onShown);
			}
			if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
				win.onfocus = onShown;
			}
			if (null != window && window['onpageshow'] != null && window['onpagehide'] != null) {
				win.addEventListener('pagehide', onHidden);
				win.addEventListener('pageshow', onShown);
				document.addEventListener('pagehide', onHidden);
				document.addEventListener('pageshow', onShown);
			}
		}

		_onShowEvent: fsync.event.SimpleEvent<any> = new fsync.event.SimpleEvent<any>()
		onShow?(callback: (data: any) => void): void {
			this._onShowEvent.on(callback)
		}
		offShow?(callback: Function): void {
			this._onShowEvent.off(<fsync.event.EventHandler<any>>callback)
		}
		_onHideEvent: fsync.event.SimpleEvent<void> = new fsync.event.SimpleEvent<void>()
		onHide?(callback: Function): void {
			this._onHideEvent.on(<fsync.event.EventHandler<void>>callback)
		}
		offHide?(callback: Function): void {
			this._onHideEvent.off(<fsync.event.EventHandler<void>>callback)
		}

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			callback({ left: 0, right: 0, top: 0, bottom: 0 });
		}

		async gotoAppSystemSettings?(params: IChooseDialogParams): Promise<IChooseDialogResult> {
			return {
				action: "cancel",
				crashed: false,
			}
		}
		async checkAppSystemPermissions?(params: ICheckPermissionParams): Promise<ICheckPermissionResult> {
			return {
				lackedPermissions: [],
				error: {},
			}
		}

		async getSDKMetaInfo?(params: IGetSDKMetaInfo): Promise<any> {
			return null
		}

		appInfo: { [key: string]: string | number | boolean } = {}

		initAppinfo(info?: AppInfo): void {
			if (info) {
				// 将所有sdk config中的key, 合并到自身同一个appInfo中
				if (info.sdkConfigs) {
					for (let sdkConfig of info.sdkConfigs) {
						if (sdkConfig.parameters) {
							for (let k in sdkConfig.parameters) {
								this.appInfo[`${sdkConfig.name}.${k}`] = sdkConfig.parameters[k];
							}
						}
					}
				}
				if (info.parameters) {
					for (let k in info.parameters) {
						this.appInfo[k] = info.parameters[k];
					}
				}
			}
		}

		setAppInfo(key: string, value: string | number | boolean) {
			this.appInfo[key] = value;
		}

		getAppInfo(key: string): (string | number | boolean | null) {
			return this.appInfo[key];
		}

		getAppInfoBoolean(key: string, def: boolean = false): boolean {
			let v = this.getAppInfo(key)
			if (typeof v == "boolean") {
				return v;
			} else if (typeof v == "string") {
				return v.toLowerCase() == "true"
			} else {
				return def;
			}

		}

		getAppInfoNumber(key: string, def: number): number {
			let v = this.getAppInfo(key)
			if (typeof v == "number") {
				return v;
			} else if (typeof v == "string" && !isNaN(parseFloat(v))) {
				return parseFloat(v);
			} else {
				return def;
			}
		}

		getAppInfoString(key: string, def: string): string {
			let v = this.getAppInfo(key);
			if (v == null) {
				return def;
			} else {
				return v.toString();
			}
		}

		getResVersion(): number {
			if ((window as any).remoteDownloader && (window as any).remoteDownloader.REMOTE_SERVER_ROOT) {
				//读取最后一位的版本号
				let r = (window as any).remoteDownloader.REMOTE_SERVER_ROOT as string;
				let versionList = r.split("/")
				let a = versionList[versionList.length - 1]
				let b = versionList[versionList.length - 2]
				if (parseInt(a).toString() == a) {
					return parseInt(a)
				}
				if (parseInt(b).toString() == a) {
					return parseInt(b)
				}
			}
			//无法拿到版本号
			return -1;
		}

		enableRestart: boolean = true;
		/**
		 * app项目，进入后台10分钟以后，重新进入前台，默认重启App，调用cc.restart方法
		 */
		appAutoRestart() {

		}
	}
}
