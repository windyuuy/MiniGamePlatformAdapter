namespace GDK {
	export class ModuleClassMap {
		Adver: new () => IAdver
		GameInfo: new () => IGameInfo
		Login: new () => ILogin;
		Pay: new () => IPay
		Share: new () => IShare
		SystemInfo: new () => ISystemInfo
		User: new () => IUserData;
	}
}
