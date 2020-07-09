/// <reference path="./native/NativeAdvert.ts" />
/// <reference path="./native/NativePay.ts" />
/// <reference path="./native/NativeLocalPush.ts" />


namespace UnityAppGDK {
	/**
	 * 用户信息本地存储的key
	 */
	const USER_INFO_KEY = "$OFNIRESU$";
	const USER_INFO_XXTEA_KEY = "key$OFNIRESU$key";

	type LoginType = "account" | "visitor" | "facebook" | "google" | "silent" | "gamecenter" | "wxapp" | "quick" | "huawei" | "vivoapp" | "OppoApp" | "baiduapp" | "aligame" | "yingyongbaoApp" | "meituApp" | "xiao7" | "chongchong" | "lufeifan" | "jingyou"


	/**
	 * 登陆的用户信息结构
	 */
	export type UserInfo = {
		/**
		 * 用户id
		 */
		userId: number | null,

		/**
		 * 登陆时的openId
		 */
		openId?: string,

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

		token: string | null,
	}

	export class SDKProxy {

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
			let ret: UserInfo[]
			try {
				let data = localStorage.getItem(USER_INFO_KEY);
				if (data && data != "") {
					console.log("loadUserRecord:", slib.xxtea.decryptFromBase64(data, USER_INFO_XXTEA_KEY))
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
				} else {
					console.log("loadUserRecord: nil")
				}
				return [];
			} catch (e) {
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
			console.log("saveUserRecord:", USER_INFO_KEY, str, xxt)
			localStorage.setItem(USER_INFO_KEY, xxt);
		}

		/**
		 * 显示普通菊花
		 */
		static showLoading() {
			console.log("showLoading 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 隐藏普通菊花
		 */
		static hideLoading() {
			console.log("hideLoading 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 隐藏正在登陆提示
		 */
		static hideLogining() {
			console.log("hideLogining 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 显示正在登陆提示
		 * @param message 提示信息
		 */
		static showLogining(message: string, loginType?: string) {
			// TODO : 弃用
			console.log("showLogining 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 登陆登陆弹框
		 * @param callback 玩家登陆的回掉
		 */
		static showLoginDialog() {
			console.log("showLoginDialog 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 隐藏登陆对话框
		 */
		static hideLoginDialog() {
			console.log("hideLoginDialog 在原生SDK内实现，不需要JS调用")
		}

		static loginWithBus(loginInfo: ServedLoginInfo, callbacks: TaskCallback<LoginServerResult>) {
			console.log("loginWithBus 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 显示用户中心
		 * @param info 玩家的基础信息
		 * @param callback 绑定的回掉函数
		 */
		static showUserCenter(userInfo?: UserInfo) {
			console.log("showUserCenter 已弃用")
		}

		/**
		 * 隐藏用户中心图标
		 */
		static hideUserCenter() {
			console.log("hideUserCenter 已弃用")
		}

		/**
		 * 隐藏用户中心图标
		 */
		static hideBindDialog() {
			console.log("hideBindDialog 已弃用")
		}

		static showBindDialog(userInfo?: UserInfo) {
			console.log("showBindDialog 已弃用")
		}

		/**
		 * 显示未成年人游戏描述信息
		 */
		static showMinorInfo(info: string, callback) {
			console.log("showMinorInfo 已弃用. 在原生SDK内实现，不需要JS调用")
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
			console.log("showRealNameDialog 已弃用. 在原生SDK内实现，不需要JS调用")
		}


		protected static cancelLoginingId?: number = undefined;
		/**
		 * 侦听取消登陆的回掉接口
		 * @param callback 
		 */
		static onCancelLogining(callback: () => void) {
			console.log("onCancelLogining 已弃用. 在原生SDK内实现，不需要JS调用")
		}

		/**
		 * 对玩家执行自动登陆
		 * @param user 
		 */
		static autoLogin(user: UserInfo) {
			console.log("autoLogin 已弃用")
		}

		/**
		 * 对玩家执行自动登陆
		 * @param user 
		 */
		static loginNative() {
			console.log("loginNative 已弃用")
		}

		protected static loginId?: number = undefined
		static onLogin(
			callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string, platform?: string, exAuthData?: string) => void
		) {
			console.log("onLogin 已弃用")
		}



		protected static rebootLoginId?: number = undefined
		static onRebootLogin(
			callback: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string) => void
		) {
			console.log("onRebootLogin 已弃用")
		}

		protected static bindId?: number = undefined
		static onBind(
			callback: (/**登陆的类型 */ type: LoginType,/**游客OpenId */visitorOpenId: string,/**用户ID */ openId: string, token: string, platform?: string) => void
		) {
			console.log("onBind 已弃用")
		}

		protected static loginFailId?: number = undefined
		static onLoginFail(
			callback: () => void
		) {
			console.log("onLoginFail 已弃用")
		}

		protected static removeUserId?: number = undefined
		static onRemoveUser(
			callback: (openId: string) => void
		) {
			console.log("onRemoveUser 已弃用")
		}

		protected static logoutId?: number = undefined
		static onLogout(
			callback: () => void
		) {
			console.log("onLogout 已弃用")
		}

		/**
		 * 隐藏启动屏
		 */
		static hideLaunchingView() {
			console.log("hideLaunchingView已弃用. 在原生SDK内实现，不需要JS调用")
		}

		static nativeAdvert: UnityAppGDK.NativeAdvert = new UnityAppGDK.NativeAdvert()
		static nativePay: UnityAppGDK.NativePay = new UnityAppGDK.NativePay()
		static nativeLocalPush: UnityAppGDK.NativeLocalPush = new UnityAppGDK.NativeLocalPush()

	}
}
