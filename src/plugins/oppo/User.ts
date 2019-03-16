
namespace OPPOGDK {

	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	const expNum = 7

	const devlog = Common.devlog

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		get userdata() { return this.api.userData }

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			qg.login({
				pkgName: params.pkgName,
				success: (res) => {
					// 解密数据
					//const system = this.api.systemInfo.system == "android" ? 0 : 1
					//let option = qg.getLaunchOptionsSync()
					//console.log("LaunchOptions", option);
					this.server.userLogin({
						openId: res.uid,
						userName: res.nickName,
						avatar: res.avatar,
					},
						(resp) => {
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
						}, () => {
							ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
						})
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED))
				},
				complete: (res) => {
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
		_setUserCloudStorage(obj: { KVDataList: qg.KVData[], typeIndex: string[], success?: Function, fail?: Function, complete?: Function }) {
			//
		}

		uploadBusinessData(obj: { KVDataList: qg.KVData[], typeIndex: string[], success?: Function, fail?: Function, complete?: Function }) {

		}

		setUserCloudStorage(obj: { KVDataList: qg.KVData[], typeIndex: string[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()

			return ret.promise
		}
	}
}