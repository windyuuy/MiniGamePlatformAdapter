
namespace GDK {
	export abstract class UserBase implements IUser {
		abstract login(params?: LoginParams): Promise<LoginResult>
		bindCallback: (succ: boolean, data?) => void
		rebootCallback: () => void
		setBindCallback(callback: (succ: boolean, data?) => void) {
			this.bindCallback = callback
		}

		setRebootCallback(callback: () => void) {
			this.rebootCallback = callback
		}


		abstract showUserCenter(): Promise<void>;
		abstract showBindDialog(): Promise<void>;
		checkSession(params?: ReqParams) {
			const ret = new RPromise<void>()
			ret.success(undefined)
			return ret.promise
		}

		abstract update(): Promise<UserDataUpdateResult>
		abstract getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: UserGameData[] }>;
		abstract setUserCloudStorage(obj: { KVDataList: KVData[], typeIndex: string[] }): Promise<void>;
		abstract checkIsUserBind(openId: string): boolean;
	}
}
