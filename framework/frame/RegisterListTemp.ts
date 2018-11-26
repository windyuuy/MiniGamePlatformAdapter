namespace GDK {
	export class RegisterListTemp {
		static init(temp: new () => RegisterListTemp): UserAPI {
			return null;
		}
		Login: new () => ILogin;
		User: new () => IUserData;
	}

	const cc = new RegisterListTemp()

}
