namespace GDK {
	export interface IModule {
		api?: UserAPI
		init?(data?: any)
		initWithConfig?(info: GDKConfig)
	}
}