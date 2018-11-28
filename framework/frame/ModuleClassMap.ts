namespace GDK {
	export class ModuleClassMap {
		Adver?: new () => IAdvert
		GameInfo?: new () => IGameInfo
		Login?: new () => IUser
		Pay?: new () => IPay
		Share?: new () => IShare
		SystemInfo?: new () => ISystemInfo
		User?: new () => IUserData
		IAdvert?: new () => IAdvert
		Customer?: new () => ICustomer
		Widgets?: new () => IWidgets
		SubContext?: new () => ISubContext
		Support?: new () => ISupport
	}
}
