namespace GDK {
	export interface IModule {
		api?: UserAPI
		/**
		 * 模块初始化入口
		 */
		init?(data?: any)
		/**
		 * 模块传入配置初始化入口
		 */
		initWithConfig?(info: GDKConfig)
	}
}