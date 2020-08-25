/// <reference path="./NativeHelper.ts" />
/// <reference path="../../../framework/sense/ILocalPush.ts" />

namespace WebViewGDK {
	export class NativeLocalPushStyle extends GDK.LocalPushBundle {

	}

	export class NativeLocalPush {

		/**
		 * 初始化
		 */
		async init(): Promise<void> {
			return nativeHelper.callAction("pushwrapper:initLocalNotice", {})
		}

		/**
		 * 添加本地推送
		 */
		async addLocalNotices?(notices: NativeLocalPushStyle[]): Promise<void> {
			let params = {
				notices: notices || [],
			}
			return nativeHelper.callAction("pushwrapper:addLocalNotices", params)
		}
		/**
		 * 移除对应的推送
		 */
		async removeLocalNoticeWithID?(params: { identifier: string }): Promise<void> {
			return nativeHelper.callAction("pushwrapper:removeLocalNoticeWithID", params)
		}

		/**
		 * 移除所有推送
		 */
		async removeAllLocalNotices?(): Promise<void> {
			return nativeHelper.callAction("pushwrapper:removeAllLocalNotices", {})
		}

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		async requireLocalNoticePermission?(): Promise<void> {
			return nativeHelper.callAction("pushwrapper:requireLocalNoticePermission", {})
		}

		/**
		 * 用户是否开启通知权限
		 */
		async isLocalNoticeEnabled?(): Promise<{ enabled: boolean }> {
			return nativeHelper.callAction("pushwrapper:isLocalNoticeEnabled", {})
		}
	}
}
