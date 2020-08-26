namespace GDK {
	/**
	 * 插件元信息
	 */
	export interface IMetaInfo {
		/**
		* 插件名
		* * develop 网页开发测试
		* * wechat 微信
		* * qqplay 玩一玩
		* * app 原生APP
		**/
		pluginName: string

		/**
		 * 插件版本
		 */
		pluginVersion: string

		/** 
		 * api平台名称 
		 * * browser 浏览器
		 * * native APP原生
		 * * wechatgame 微信
		 * * qqplay QQ玩一玩
		 * * unknown 未知平台
		*/
		apiPlatform: string

		/** 本地化api平台名 */
		apiPlatformLocale: string
		
	}
}