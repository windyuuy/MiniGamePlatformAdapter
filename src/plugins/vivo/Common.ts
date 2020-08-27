namespace VIVOGDK.Common {

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	export const devlog = new slib.Log({ tags: ["[gdk]", "[vivo]"] });
	export const paylog = new slib.Log({ tags: ["[gdk]", "[vivopay]"] });
}