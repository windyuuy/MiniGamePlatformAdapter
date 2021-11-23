namespace WechatGDK.Common {

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	export const devlog = new lang.libs.Log({ tags: ["gdk", "wechat"] });
	export const paylog = new lang.libs.Log({ tags: ["gdk", "wepay"] });
}