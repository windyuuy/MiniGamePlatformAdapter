
namespace GDK {
	// 自动生成，成员使用register函数注册
	export class UserAPI {
		private _m: IModuleMap = null;
		constructor(moduleMap: IModuleMap) {
			this._m = moduleMap;
		}
		login(params: LoginParams): Promise<LoginResult> { return this._m.user.login(params) }
		showConfirm(object: ShowConfirmOptions): Promise<ShowConfirmResult> { return this._m.widgets.showConfirm(object) }
		showAlert(object: ShowAlertOptions): Promise<ShowAlertResult> { return this._m.widgets.showAlert(object) }
		support() { }
		/** 当前实际平台 */
		platform: string | "oppo" | "qqplay"
		get userdata(): IUserData { return this._m.userdata }
		get gameInfo(): IGameInfo { return this._m.gameInfo }
		get systemInfo(): ISystemInfo { return this._m.systemInfo }

		/**
		 * 获取当前服务器时间
		 */
		getServerTime: () => Date;

		/**
		 * 注册全局的错误回调函数
		 * @param callback 
		 */
		setErrorCallback(callback: (err: { message: string, stack: string }) => void) {
			this._m.error.setErrorCallback(callback)
		}


		/**
		 * 分享到聊天窗口
		 * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
		 * * 如果当前环境无法分享，则分享失败
		 * @param data 
		 */
		share(data: ShareData): Promise<ShareResult> {
			return this._m.share.share(data);
		}

		/**
		 * 社会化分享
		 * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
		 * * 如果当前环境无法分享，则分享失败
		 * @param data 
		 */
		socialShare(data: ShareData): Promise<ShareResult> {
			return this._m.share.socialShare(data);
		}

		/**
		 * 分享网址
		 * * 如果当前环境无法进行URL分享，则分享失败
		 * * 当前仅 QQPlay 环境支持
		 * @param data 
		 */
		shareUrl(data: ShareUrlData): Promise<ShareResult> {
			return this._m.share.shareUrl(data);
		}


		/**
		 * 显示分享菜单
		 * * 微信平台必须调用该函数才会显示转发按钮
		 * * QQ平台默认就有转发按钮
		 */
		showShareMenu(): Promise<void> {
			return this._m.share.showShareMenu();
		}

		/**
		 * 隐藏分享菜单
		 */
		hideShareMenu(): Promise<void> {
			return this._m.share.hideShareMenu();
		}

		/**
		 * 在某些平台可以设置分享按钮所分享的内容
		 * * 微信支持
		 * * QQplay 无效
		 */
		setShareMenuData(data: ShareData): Promise<void> {
			return this._m.share.setShareMenuData(data);
		}

		/**
		 * 获取通过点击分享链接时或传递的参数
		 */
		getShareParam(): Promise<{ [key: string]: string }> {
			return this._m.share.getShareParam();
		}

	}

	export function genGdk(temp: ModuleClassMap) {
		let map: IModuleMap = {} as IModuleMap
		for (let k in temp) {
			let pname = k[0].toLocaleLowerCase() + k.substr(1);
			map[pname] = new temp[k]();
		}
		let api = new UserAPI(map)
		return api;
	}

}