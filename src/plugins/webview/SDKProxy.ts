/// <reference path="./native/NativeAdvert.ts" />
/// <reference path="./native/NativePay.ts" />
/// <reference path="./native/NativeLocalPush.ts" />

/**
 * 用户信息本地存储的key
 */
const USER_INFO_KEY = "$OFNIRESU$";
const USER_INFO_XXTEA_KEY = "key$OFNIRESU$key";

type LoginType = "account" | "visitor" | "facebook" | "google" | "silent" | "gamecenter" | "wxapp" | "quick" | "huawei" | "vivoapp" | "OppoApp" | "baiduapp" | "aligame" | "yingyongbaoApp" | "meituApp" | "xiao7" | "chongchong" | "lufeifan" | "jingyou"


/**
 * 登陆的用户信息结构
 */
type UserInfo = {
	/**
	 * 用户id
	 */
	userId: number,

	/**
	 * 登陆时的openId
	 */
	openId: string,

	/**
	 * 记录上次的登陆类型
	 */
	loginType: LoginType,

	/**
	 * 玩家的昵称
	 */
	name: string,

	/**
	 * 创建的时间
	 */
	createTime: number,

	token: string,
}

class SDKProxy {

	static support: {
		google: boolean,
		visitor: boolean,
		facebook: boolean,
		wechat: boolean,
		gamecenter: boolean,
	} = { google: true, visitor: true, facebook: true, wechat: true, gamecenter: true }

	static actionList: {};
	static alertList: {};
	static confirmList: {};
	static promptList: {};
	static actionId = 0;

	static off(id: number) {
		gdkjsb.off(id);
	}

	static showConfirm(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean) => void) {
		if (gdkjsb == undefined) return;
		if (!this.confirmList) {
			this.confirmList = {};
		}
		let actionId = "showConfirm_" + (++this.actionId);
		this.confirmList[actionId] = callback;

		gdkjsb.showConfirm(content, title, okLabel, cancelLabel, actionId);
	}

	static onConfirmResponse(isOk: boolean, actionId: string) {
		let callback = this.confirmList[actionId];
		if (callback) {
			// 判空
			callback(isOk);
			delete this.confirmList[actionId];
		}
	}

	static showAlert(content: string, title: string, okLabel: string, callback: () => void) {
		if (gdkjsb == undefined) return;
		if (!this.alertList) {
			this.alertList = {};
		}
		let actionId = "showAlert_" + (++this.actionId);
		this.alertList[actionId] = callback;

		gdkjsb.showAlert(content, title, okLabel, actionId);
	}

	static onAlertResponse(actionId: string) {
		let callback = this.alertList[actionId];
		if (callback) {
			// 判空
			callback();
			delete this.alertList[actionId];
		}
	}


	static showPrompt(content: string, title: string, okLabel: string, cancelLabel: string, callback: (isOk: boolean, result: string) => void, defaultValue: string) {
		if (gdkjsb == undefined) return;

		if (!this.promptList) {
			this.promptList = {};
		}
		let actionId = "showPrompt_" + (++this.actionId);
		this.promptList[actionId] = callback;

		gdkjsb.showPrompt(content, title, okLabel, cancelLabel, defaultValue, actionId);
	}

	static onPromptResponse(isOk: boolean, result: string, actionId: string) {
		let callback = this.promptList[actionId];
		if (callback) {
			// 判空
			callback(isOk, result);
			delete this.promptList[actionId];
		}
	}

	static on(eventName: string, callback: (data: string) => void): number {
		if (gdkjsb == undefined) return 0;

		if (!this.actionList) {
			this.actionList = {};
		}
		this.actionList[eventName] = callback;
	}

	static callAction(action: string, data: string, callback: (/**返回结果 */data: string) => void): boolean {
		if (gdkjsb == undefined) return false;

		if (!this.actionList) {
			this.actionList = {};
		}
		let actionId = action + "_" + (++this.actionId);
		this.actionList[actionId] = callback;

		return gdkjsb.callAction(action, data, actionId);
	}

	static onCallActionResponse(data: string, actionId: string) {
		let callback = this.actionList[actionId];
		if (callback) {
			// 判空
			callback(data);
			delete this.actionList[actionId];
		}
	}

	/**
	 * 加载用户登陆信息
	 */
	static loadUserRecord(removeNullUser: boolean = false): UserInfo[] {
		try {
			let data = localStorage.getItem(USER_INFO_KEY);
			if (data && data != "") {
				let d = JSON.parse(slib.xxtea.decryptFromBase64(data, USER_INFO_XXTEA_KEY))
				let list = d instanceof Array ? d : [d];
				if (list.length == 0 || list[0].loginType == null) {//简单验证一下
					return [];
				}
				//删除openId等于空的记录，一般由登陆失败产生
				if (removeNullUser) for (let i = list.length - 1; i >= 0; i--) {
					if (list[i].openId == null) {
						list.splice(i, 1);
					}
				}
				return list;
			}
			return [];
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	/**
	 * 保存登陆信息
	 * @param data 
	 */
	static saveUserRecord(data: UserInfo[]) {
		let str = JSON.stringify(data);
		let xxt = slib.xxtea.encryptToBase64(str, USER_INFO_XXTEA_KEY);
		localStorage.setItem(USER_INFO_KEY, xxt);
	}

	/**
	 * 显示普通菊花
	 */
	static showLoading() {
		if (gdkjsb == undefined) return;
		this.callAction("showLoading", "{}", (data) => { })
	}

	/**
	 * 隐藏普通菊花
	 */
	static hideLoading() {
		this.callAction("hideLoading", "{}", (data) => { })
	}

	/**
	 * 隐藏正在登陆提示
	 */
	static hideLogining() {
		this.callAction("hideLogining", "{}", (data) => { })
	}

	/**
	 * 显示正在登陆提示
	 * @param message 提示信息
	 */
	static showLogining(message: string, loginType?: string) {
		if (message == null || message == "") {
			message = slib.i18n.locSDKString("welcome")
		}
		this.callAction("showLogining", JSON.stringify({ message: message, loginType: loginType }), (data) => { })
	}

	/**
	 * 登陆登陆弹框
	 * @param callback 玩家登陆的回掉
	 */
	static showLoginDialog(callback: (data: string) => void) {

		this.callAction("showLoginDialog", JSON.stringify({ support: this.support, records: this.loadUserRecord(true) }), (data) => {
			callback(data);
		});
	}

	/**
	 * 隐藏登陆对话框
	 */
	static hideLoginDialog() {

		this.callAction("hideLoginDialog", "{}", (data) => { });
	}

	/**
	 * 显示用户中心
	 * @param info 玩家的基础信息
	 * @param callback 绑定的回掉函数
	 */
	static showUserCenter(userInfo?: UserInfo) {
		userInfo = userInfo || this.loadUserRecord()[0];
		this.callAction("showUserCenter", JSON.stringify({ info: userInfo, support: this.support, records: this.loadUserRecord(true) }), (data: string) => { });
	}

	/**
	 * 隐藏用户中心图标
	 */
	static hideUserCenter() {
		this.callAction("hideUserCenter", "{}", (data) => { });
	}

	/**
	 * 隐藏用户中心图标
	 */
	static hideBindDialog() {
		this.callAction("hideBindDialog", "{}", (data) => { });
	}

	static showBindDialog(userInfo?: UserInfo) {
		userInfo = userInfo || this.loadUserRecord()[0];
		this.callAction("showBindDialog", JSON.stringify({ info: userInfo, support: this.support, records: this.loadUserRecord(true) }), (data) => { });
	}

	/**
	 * 显示未成年人游戏描述信息
	 */
	static showMinorInfo(info: string, callback) {
		this.callAction("showMinorInfo", JSON.stringify({ info }), callback);
	}
	/**
	 * 显示实名制弹框，进入实名制流程
	 * @param force 是否强制
	 */
	static showRealNameDialog(userId: number, force: boolean, callback: (data: {
		/**
		 * 是否完成实名制
		 */
		isVerified: boolean,
		/**
		 * 当前年龄
		 */
		age: number,
		/**
		 * 当前玩家姓名
		 */
		name: string,
		idCard: string,
		birthday: string
	}) => void) {
		this.callAction("showRealNameDialog", JSON.stringify({ userId, force }), (d) => {
			callback(JSON.parse(d));
		});
	}


	protected static cancelLoginingId: number = undefined;
	/**
	 * 侦听取消登陆的回掉接口
	 * @param callback 
	 */
	static onCancelLogining(callback: () => void) {
		if (gdkjsb == undefined) return;

		if (this.cancelLoginingId !== undefined) {
			gdkjsb.off(this.cancelLoginingId);
		}
		this.cancelLoginingId = this.on("cancelLogining", callback);
	}

	/**
	 * 对玩家执行自动登陆
	 * @param user 
	 */
	static autoLogin(user: UserInfo, callback: (data: string) => void) {
		this.callAction("autoLogin", JSON.stringify(user), (data) => {
			callback(data);
		});
	}

	/**
	 * 对玩家执行自动登陆
	 * @param user 
	 */
	static loginNative() {
		this.callAction("loginNative", JSON.stringify({ support: this.support, records: this.loadUserRecord(true) }), (data) => { });
	}

	protected static loginId: number = undefined
	static onLogin(
		callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string, platform?: string, exAuthData?: string) => void
	) {
		if (gdkjsb == undefined) return;

		if (this.loginId !== undefined) {
			gdkjsb.off(this.loginId);
		}
		this.loginId = this.on("login", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.openId, json.token, json.nickName, json.email, json.head, json.platform, json.exAuthData);
		});
	}



	protected static rebootLoginId: number = undefined
	static onRebootLogin(
		callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string) => void
	) {
		if (gdkjsb == undefined) return;

		if (this.rebootLoginId !== undefined) {
			gdkjsb.off(this.rebootLoginId);
		}
		this.rebootLoginId = this.on("rebootLogin", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.openId, json.token, json.nickName, json.email, json.head);
		});
	}

	protected static bindId: number = undefined
	static onBind(
		callback: (/**登陆的类型 */ type: LoginType,/**游客OpenId */visitorOpenId: string,/**用户ID */ openId: string, token: string, platform?: string) => void
	) {
		if (gdkjsb == undefined) return;

		if (this.bindId !== undefined) {
			gdkjsb.off(this.bindId);
		}
		this.bindId = this.on("bind", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.visitorOpenId, json.openId, json.token, json.platform);
		});
	}

	protected static loginFailId: number = undefined
	static onLoginFail(
		callback: () => void
	) {
		if (gdkjsb == undefined) return;

		if (this.loginFailId !== undefined) {
			gdkjsb.off(this.loginFailId);
		}
		this.loginFailId = this.on("loginFail", (data) => {
			let json = JSON.parse(data);
			callback();
		});
	}

	protected static removeUserId: number = undefined
	static onRemoveUser(
		callback: (openId: string) => void
	) {
		if (gdkjsb == undefined) return;

		if (this.removeUserId !== undefined) {
			gdkjsb.off(this.removeUserId);
		}
		this.removeUserId = this.on("removeUser", (data) => {
			let json = JSON.parse(data);
			callback(json.openId);
		});
	}

	protected static logoutId: number = undefined
	static onLogout(
		callback: () => void
	) {
		if (gdkjsb == undefined) return;

		if (this.logoutId !== undefined) {
			gdkjsb.off(this.logoutId);
		}
		this.logoutId = this.on("logout", (data) => {
			callback();
		});
	}

	/**
	 * 隐藏启动屏
	 */
	static hideLaunchingView() {
		this.callAction("hideLaunchingView", "{}", (data) => { });
	}

	static nativeAdvert: AppGDK.NativeAdvert = new AppGDK.NativeAdvert()
	static nativePay: AppGDK.NativePay = new AppGDK.NativePay()
	static nativeLocalPush: AppGDK.NativeLocalPush = new AppGDK.NativeLocalPush()

}