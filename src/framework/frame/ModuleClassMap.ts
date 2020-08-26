namespace GDK {
	/**
	 * 插件附件注册列表
	 */
	export class ModuleClassMap {
		MetaInfo?: new () => IMetaInfo = MetaInfoBase
		Advert?: new () => IAdvert
		GameInfo?: new () => IGameInfo
		User?: new () => IUser
		Pay?: new () => IPay
		Share?: new () => IShare
		SystemInfo?: new () => ISystemInfo
		APISystem?: new () => IAPISystem = APISystemBase
		UserData?: new () => IUserData
		Customer?: new () => ICustomer
		Widgets?: new () => IWidgets
		SubContext?: new () => ISubContext
		Support?: new () => ISupport
		Except?: new () => IExcept
		Auth?: new () => IAuth
		Hardware?: new () => IHardware = HardwareBase
		Log?: new () => ILog = LogBase
		LocalPush?: new () => ILocalPush
		AdvertV2?: new () => IAdvertV2
		HotUpdate?: new () => IHotUpdate
	}
}
