/// <reference path="./native/NativeAdvert.ts" />
/// <reference path="./native/NativePay.ts" />
/// <reference path="./native/NativeLocalPush.ts" />

/**
 * 用户信息本地存储的key
 */
const USER_INFO_KEY = "$OFNIRESU$";
const USER_INFO_XXTEA_KEY = "key$OFNIRESU$key";

type LoginType = "account" | "visitor" | "facebook" | "google" | "silent" | "gamecenter" | "wxapp" | "quick" | "huawei" | "vivoapp" | "OppoApp" | "baiduapp" | "aligame" | "yingyongbaoApp" | "meituApp" | "xiao7" | "chongchong" | "lufeifan"


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
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("showLoading", "{}", (data) => { })
	}

	/**
	 * 隐藏普通菊花
	 */
	static hideLoading() {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("hideLoading", "{}", (data) => { })
	}

	/**
	 * 隐藏正在登陆提示
	 */
	static hideLogining() {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("hideLogining", "{}", (data) => { })
	}

	/**
	 * 显示正在登陆提示
	 * @param message 提示信息
	 */
	static showLogining(message: string, loginType?: string) {
		if (gdkjsb.bridge == undefined) return;
		if (message == null || message == "") {
			message = slib.i18n.locSDKString("welcome")
		}
		gdkjsb.bridge.callAction("showLogining", JSON.stringify({ message: message, loginType: loginType }), (data) => { })
	}

	/**
	 * 登陆登陆弹框
	 * @param callback 玩家登陆的回掉
	 */
	static showLoginDialog() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("showLoginDialog", JSON.stringify({ support: this.support, records: this.loadUserRecord(true) }), (data) => { });
	}

	/**
	 * 隐藏登陆对话框
	 */
	static hideLoginDialog() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("hideLoginDialog", "{}", (data) => { });
	}

	/**
	 * 显示用户中心
	 * @param info 玩家的基础信息
	 * @param callback 绑定的回掉函数
	 */
	static showUserCenter(userInfo?: UserInfo) {
		if (gdkjsb.bridge == undefined) return;

		userInfo = userInfo || this.loadUserRecord()[0];
		gdkjsb.bridge.callAction("showUserCenter", JSON.stringify({ info: userInfo, support: this.support, records: this.loadUserRecord(true) }), (data: string) => { });
	}

	/**
	 * 隐藏用户中心图标
	 */
	static hideUserCenter() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("hideUserCenter", "{}", (data) => { });
	}

	/**
	 * 隐藏用户中心图标
	 */
	static hideBindDialog() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("hideBindDialog", "{}", (data) => { });
	}

	static showBindDialog(userInfo?: UserInfo) {
		if (gdkjsb.bridge == undefined) return;

		userInfo = userInfo || this.loadUserRecord()[0];
		gdkjsb.bridge.callAction("showBindDialog", JSON.stringify({ info: userInfo, support: this.support, records: this.loadUserRecord(true) }), (data) => { });
	}

	/**
	 * 显示未成年人游戏描述信息
	 */
	static showMinorInfo(info: string, callback) {
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("showMinorInfo", JSON.stringify({ info }), callback);
	}
	/**
	 * 显示实名制弹框，进入实名制流程
	 * @param force 是否强制
	 */
	static showRealNameDialog(force: boolean, callback: (data: {
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
		if (gdkjsb.bridge == undefined) return;
		gdkjsb.bridge.callAction("showRealNameDialog", JSON.stringify({ force }), (d) => {
			callback(JSON.parse(d));
		});
	}


	protected static cancelLoginingId: number = undefined;
	/**
	 * 侦听取消登陆的回掉接口
	 * @param callback 
	 */
	static onCancelLogining(callback: () => void) {
		if (gdkjsb.bridge == undefined) return;

		if (this.cancelLoginingId !== undefined) {
			gdkjsb.bridge.off(this.cancelLoginingId);
		}
		this.cancelLoginingId = gdkjsb.bridge.on("cancelLogining", callback);
	}

	/**
	 * 对玩家执行自动登陆
	 * @param user 
	 */
	static autoLogin(user: UserInfo) {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("autoLogin", JSON.stringify(user), (data) => { });
	}

	/**
	 * 对玩家执行自动登陆
	 * @param user 
	 */
	static loginNative() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("loginNative", JSON.stringify({ support: this.support, records: this.loadUserRecord(true) }), (data) => { });
	}

	protected static loginId: number = undefined
	static onLogin(
		callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string, platform?: string, exAuthData?: string) => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.loginId !== undefined) {
			gdkjsb.bridge.off(this.loginId);
		}
		this.loginId = gdkjsb.bridge.on("login", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.openId, json.token, json.nickName, json.email, json.head, json.platform, json.exAuthData);
		});
	}



	protected static rebootLoginId: number = undefined
	static onRebootLogin(
		callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string) => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.rebootLoginId !== undefined) {
			gdkjsb.bridge.off(this.rebootLoginId);
		}
		this.rebootLoginId = gdkjsb.bridge.on("rebootLogin", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.openId, json.token, json.nickName, json.email, json.head);
		});
	}

	protected static bindId: number = undefined
	static onBind(
		callback: (/**登陆的类型 */ type: LoginType,/**游客OpenId */visitorOpenId: string,/**用户ID */ openId: string, token: string, platform?: string) => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.bindId !== undefined) {
			gdkjsb.bridge.off(this.bindId);
		}
		this.bindId = gdkjsb.bridge.on("bind", (data) => {
			let json = JSON.parse(data);
			callback(json.type, json.visitorOpenId, json.openId, json.token, json.platform);
		});
	}

	protected static loginFailId: number = undefined
	static onLoginFail(
		callback: () => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.loginFailId !== undefined) {
			gdkjsb.bridge.off(this.loginFailId);
		}
		this.loginFailId = gdkjsb.bridge.on("loginFail", (data) => {
			let json = JSON.parse(data);
			callback();
		});
	}

	protected static removeUserId: number = undefined
	static onRemoveUser(
		callback: (openId: string) => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.removeUserId !== undefined) {
			gdkjsb.bridge.off(this.removeUserId);
		}
		this.removeUserId = gdkjsb.bridge.on("removeUser", (data) => {
			let json = JSON.parse(data);
			callback(json.openId);
		});
	}

	protected static logoutId: number = undefined
	static onLogout(
		callback: () => void
	) {
		if (gdkjsb.bridge == undefined) return;

		if (this.logoutId !== undefined) {
			gdkjsb.bridge.off(this.logoutId);
		}
		this.logoutId = gdkjsb.bridge.on("logout", (data) => {
			callback();
		});
	}

	/**
	 * 隐藏启动屏
	 */
	static hideLaunchingView() {
		if (gdkjsb.bridge == undefined) return;

		gdkjsb.bridge.callAction("hideLaunchingView", "{}", (data) => { });
	}

	static nativeAdvert: AppGDK.NativeAdvert = new AppGDK.NativeAdvert()
	static nativePay: AppGDK.NativePay = new AppGDK.NativePay()
	static nativeLocalPush: AppGDK.NativeLocalPush = new AppGDK.NativeLocalPush()

}
