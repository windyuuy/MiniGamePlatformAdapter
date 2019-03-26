
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	class Clipboard implements IClipboard {
		_data: ClipboardData
		async getData(): Promise<ClipboardData> {
			return { ...this._data }
		}
		async setData(res: ClipboardData): Promise<void> {
			this._data = { ...res }
		}
	}

	export class APISystemBase implements IAPISystem {
		clipboard?: IClipboard = new Clipboard()

		init?() {
			this._initEvents()
		}

		get nativeVersion() {
			return -1;
		}

		async setEnableDebug(res: { enableDebug: boolean }) {
			devlog.info(`unsupoort action: setEnableDebug -> ${res.enableDebug} `)
		}

		async navigateToApp?(params: AppCallUpParams): Promise<AppCallUpResult> {
			devlog.info("打开小程序成功")
			return null
		}
		async exitProgram?(): Promise<void> {
			devlog.info("正在退出")
			window.close();
		}
		async updateProgramForce() {
			devlog.info("没有更新")
		}

		_initEvents() {
			var win = window, hiddenPropName;
			if (typeof document.hidden !== 'undefined') {
				hiddenPropName = 'hidden';
			} else if (typeof document['mozHidden'] !== 'undefined') {
				hiddenPropName = 'mozHidden';
			} else if (typeof document['msHidden'] !== 'undefined') {
				hiddenPropName = 'msHidden';
			} else if (typeof document['webkitHidden'] !== 'undefined') {
				hiddenPropName = 'webkitHidden';
			}
			var hidden = false;
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
				var changeList = [
					'visibilitychange',
					'mozvisibilitychange',
					'msvisibilitychange',
					'webkitvisibilitychange',
					'qbrowserVisibilityChange'
				];
				for (var i = 0; i < changeList.length; i++) {
					document.addEventListener(changeList[i], function (event) {
						var visible = document[hiddenPropName];
						if (visible == undefined) {
							visible = event['hidden'];
						}
						devlog.info('hidden:', visible)
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
			if ('onpageshow' in window && 'onpagehide' in window) {
				win.addEventListener('pagehide', onHidden);
				win.addEventListener('pageshow', onShown);
				document.addEventListener('pagehide', onHidden);
				document.addEventListener('pageshow', onShown);
			}
		}

		_onShowEvent: slib.SimpleEvent<any> = new slib.SimpleEvent<any>()
		onShow?(callback: (data: any) => void): void {
			this._onShowEvent.on(callback)
		}
		offShow?(callback: Function): void {
			this._onShowEvent.off(<slib.EventHandler<any>>callback)
		}
		_onHideEvent: slib.SimpleEvent<void> = new slib.SimpleEvent<void>()
		onHide?(callback: Function): void {
			this._onHideEvent.on(<slib.EventHandler<void>>callback)
		}
		offHide?(callback: Function): void {
			this._onHideEvent.off(<slib.EventHandler<void>>callback)
		}

		getSafeArea?(callback: (data: { left: number, right: number, top: number, bottom: number }) => void): void {
			callback({ left: 0, right: 0, top: 0, bottom: 0 });
		}

	}
}
