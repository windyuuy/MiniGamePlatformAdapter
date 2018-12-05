namespace GDK {
	export class ModuleClassMap {
		Advert?: new () => IAdvert
		GameInfo?: new () => IGameInfo
		User?: new () => IUser
		Pay?: new () => IPay
		Share?: new () => IShare
		SystemInfo?: new () => ISystemInfo
		UserData?: new () => IUserData
		Customer?: new () => ICustomer
		Widgets?: new () => IWidgets
		SubContext?: new () => ISubContext
		Support?: new () => ISupport
		Except?: new () => IExcept
		Auth?: new () => IAuth
		Hardware?: new () => IHardware = HardwareBase
	}
}
