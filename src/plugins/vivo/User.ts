
namespace VIVOGDK {

	const devlog = Common.devlog

	export class User extends GDK.UserBase {
		showUserCenter(): Promise<void> {
			return null
		}
		showBindDialog(): Promise<void> {
			return null
		}
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		get userdata() { return this.api.userData }

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			qg.authorize({
				type: 'code',
				success: (res) => {
					// 解密数据
					console.warn("qg.login rep", JSON.stringify(res));
					// (this.api.userData as UserData).token = res.token
					//const system = this.api.systemInfo.system == "android" ? 0 : 1
					//let option = qg.getLaunchOptionsSync()
					//console.log("LaunchOptions", option);
					this.server.userLogin({
						code: res.code,
						clientSystemInfo: this.api.systemInfo.clone()
					}, (resp) => {
						if (resp.succeed) {
							const data = resp.data
							const newdata = {
								openId: data.openId,

								isNewUser: data.userNew,
								userId: data.userId,
								avatarUrl: data.profileImg,
								nickName: data.nickname,
								backupTime: data.backupTime,
								channelId: data.channelId,
								createTime: data.createTime,
								followGzh: data.followGzh,
								gametoken: data.gametoken,
							}
							//添加openId日志
							this.api.systemInfo.deviceId = data.openId;

							this.api.systemInfo.tableConf = resp.data.tableConf;//记录登录时传入的表格信息

							const userdata = this.api.userData
							for (let key in newdata) {
								userdata[key] = newdata[key]
							}
							ret.success({
								extra: resp.data,
							})
						} else {
							ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
								data: {
									extra: resp,
								}
							}))
						}
					}, (err) => {
						console.error("serverlogin rep failed", err)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
					})
				},
				fail: (res) => {
					// console.warn('qg.login fail', JSON.stringify(res))
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED))
				},
				complete: (res) => {
					// console.warn('qg.login complete', JSON.stringify(res))
					// login complete
				}
			})

			return ret.promise
		}

		setStorageSync(key: string, value: string): void {
			//BK.sessionStorage.setItem(key, value)
		}

		getStorageSync(key: string): string {
			return null;
			//return BK.sessionStorage.getItem(key)
		}

		checkSession() {
			const ret = new GDK.RPromise<void>()

			return ret.promise
		}

		update(): Promise<GDK.UserDataUpdateResult> {
			const lang = undefined

			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()

			return ret.promise
		}

		_getFriendCloudStorage({ keyList, typeIndex, success, complete, fail }:
			{ keyList: string[], typeIndex: string[], success?: (res: { data: object[] }) => void, fail?: Function, complete?: Function }): void {
			// 当前不支持一次同时拉取多个排行榜，需要拉取多次，而且必须等上一个拉取回来后才能拉取另外一个排行榜
			// 先拉 score 排行榜

		}

		getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: GDK.UserGameData[] }> {
			const ret = new GDK.RPromise<{ data: GDK.UserGameData[] }>()

			return ret.promise
		}

		getTime(): number {
			devlog.warn("需要改为使用服务器时间")
			return new Date().getTime()
		}

		protected loginTime = null
		protected uploadingUserScore = false
		_setUserCloudStorage(obj: { KVDataList: GDK.KVData[], typeIndex: string[], success?: Function, fail?: Function, complete?: Function }) {
			//
		}

		uploadBusinessData(obj: { KVDataList: GDK.KVData[], typeIndex: string[], success?: Function, fail?: Function, complete?: Function }) {

		}

		setUserCloudStorage(obj: { KVDataList: GDK.KVData[], typeIndex: string[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()

			return ret.promise
		}
		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId: number): boolean {
			return false;
		}
	}
}