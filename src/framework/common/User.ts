
namespace GDK {
	export abstract class UserBase implements IUser {
		abstract login(params?: LoginParams): Promise<LoginResult>
		checkSession(params?: ReqParams) {
			const ret = new RPromise<void>()
			ret.success(undefined)
			return ret.promise
		}

		abstract update(): Promise<UserDataUpdateResult>
		abstract getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: UserGameData[] }>;
		abstract setUserCloudStorage(obj: { KVDataList: KVData[], typeIndex: string[] }): Promise<void>
	}
}
