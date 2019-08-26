namespace webGDK.Common {
	/**
	 * 服务器对象
	 */
	export let httpClient: slib.HttpGameClient

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	export const devlog = new slib.Log({ tags: ["[gdk]", "[web]"] });
	export const paylog = new slib.Log({ tags: ["[gdk]", "[web]"] });

}