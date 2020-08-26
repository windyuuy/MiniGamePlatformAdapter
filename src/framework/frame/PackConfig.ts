namespace GDK {
	/**
	 * 插件包注册信息
	 */
	export class PackConfig {
		/**
		 * 插件名
		 */
		name:string
		/**
		 * api平台名称
		 * * browser 浏览器
		 * * native APP原生
		 * * wechatgame 微信
		 * * qqplay QQ玩一玩
		 * * unknown 未知平台
		*/
		platform: string
		/** 本地化api平台名 */
		platformLocale:string
		/** sdk版本号 */
		version: string
		/**
		 * 插件附件列表注册信息
		 */
		register: new () => ModuleClassMap
	}

}