namespace GDK {
	export interface IModule {
		api?: GDK.UserAPI
		init?(data: any)
	}
}