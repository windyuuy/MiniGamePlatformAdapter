namespace BytedanceGDK.Common {

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	export const devlog = new slib.Log({ tags: ["[gdk]", "[bytedance]"] });
	export const paylog = new slib.Log({ tags: ["[gdk]", "[bytedancepay]"] });

	setTimeout(()=>{
	// 应当把日志也当做独立一个模块
	WechatGDK.Common.devlog.setLogParams({ tags: ["[gdk]", "[bytedance]"] })
	WechatGDK.Common.paylog.setLogParams({ tags: ["[gdk]", "[bytedancepay]"] })
	})
}
