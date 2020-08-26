namespace GDK {
	/**
	 * 附件公共接口
	 */
	export interface IModule {
		api?: UserAPI
		/**
		 * 模块初始化入口
		 */
		init?(data?: any): void
		/**
		 * 模块传入配置初始化入口
		 */
		initWithConfig?(info: GDKConfigV2): Promise<void>
	}
}