namespace DevelopGDK.Common {

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	export const devlog = new lang.libs.Log({ tags: ["gdk", "develop"] });
	export const paylog = new lang.libs.Log({ tags: ["gdk", "devpay"] });

}