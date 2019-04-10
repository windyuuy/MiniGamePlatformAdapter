
namespace AppGDK {

	const devlog = Common.devlog

	export class LocalPush implements GDK.ILocalPush {
		api?: GDK.UserAPI

		init() {
			SDKProxy.nativeLocalPush.init()
		}

		/**
		 * 添加本地推送
		 */
		async addLocalNotice?(params: GDK.LocalPushBundle): Promise<void> {
			return SDKProxy.nativeLocalPush.addLocalNotice(params)
		}

		/**
		 * 移除对应的推送
		 */
		async removeLocalNoticeWithID?(params: { identifier: number }): Promise<void> {
			return SDKProxy.nativeLocalPush.removeLocalNoticeWithID(params)
		}

		/**
		 * 移除所有推送
		 */
		async removeAllLocalNotices?(): Promise<void> {
			return SDKProxy.nativeLocalPush.removeAllLocalNotices()
		}

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		async requireLocalNoticePermission?(): Promise<void> {
			return SDKProxy.nativeLocalPush.requireLocalNoticePermission()
		}

		/**
		 * 用户是否开启通知权限
		 */
		isLocalNoticeEnabled?(): Promise<{ enabled: boolean }> {
			return SDKProxy.nativeLocalPush.isLocalNoticeEnabled()
		}
	}
}