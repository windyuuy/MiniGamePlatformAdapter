
namespace GDK {
	export abstract class UserBase implements IUser {
		setLoginSupport(loginSupport: { google: boolean; visitor: boolean; facebook: boolean; wechat: boolean; gamecenter: boolean; account: boolean }): void {
		}
		api?: UserAPI | undefined
		abstract login(params?: LoginParams): Promise<LoginResult>
		bindCallback?: (succ: boolean, data?) => void
		rebootCallback?: () => void
		setBindCallback(callback: (succ: boolean, data?: any) => void) {
			this.bindCallback = callback
		}

		setRebootCallback(callback: () => void) {
			this.rebootCallback = callback
		}


		abstract showUserCenter(): Promise<void>;
		abstract showBindDialog(): Promise<void>;
		abstract bindWithBus() : Promise<{success : boolean, data : any}>;
		checkSession(params?: ReqParams) {
			const ret = new RPromise<void>()
			ret.success(undefined)
			return ret.promise
		}

		abstract update(): Promise<UserDataUpdateResult>
		abstract getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: UserGameData[] }>;
		abstract setUserCloudStorage(obj: { KVDataList: KVData[], typeIndex: string[] }): Promise<void>;
		abstract checkIsUserBind(userId: number): boolean;
	}
}
