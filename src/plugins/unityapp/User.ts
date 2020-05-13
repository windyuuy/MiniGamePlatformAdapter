namespace UnityAppGDK {
	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	// const expNum = 7
	const devlog = Common.devlog

	var isCancelLogin: boolean = false;
	var isLoginEnd: boolean = false;

	var self: User

	var isDelayLogin = false;
	var loginStartTime = 0;
	var loginRecord: LoginCallbackData | null = null;
	var fOnAccountChange: (() => void) | null = null

	export class User extends GDK.UserBase {
		api!: GDK.UserAPI
		loginNode: string | null = null;

		get server(): MServer {
			return MServer.inst
		}

		init(data: any) {
		}

		login(params?: GDK.LoginParams) {
			if (gdkjsb.bridge.checkActionExist("loginWithBus")) {
				return this.loginWithBus(params)
			} else {
				return this.loginTest(params)
			}
		}

		// 登录服务器
		loginTest(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			let userId = localStorage.getItem('sdk_glee_userId')
			console.log("sdk_glee_userId:" , parseInt(userId!))
			let nUserId: number | undefined = parseInt(userId!)
			console.log("sdk_glee_userId3:", nUserId)
			if (isNaN(nUserId)) {
				nUserId = undefined
			}
			console.log("sdk_glee_userId4:", nUserId)

			this.server.loginTest({ loginCode: nUserId!, node: params.node }, (resp) => {
				//玩家数据
				if (resp.succeed) {
					const data = resp.data
					const userdata = this.api.userData
					userdata.channelId = data.channelId
					userdata.createTime = data.createTime
					userdata.userId = data.userId
					localStorage.setItem('sdk_glee_userId', `${data.userId}`)
					console.log("sdk_glee_userId2:" + localStorage.getItem('sdk_glee_userId'))
					userdata.followGzh = data.followGzh
					userdata.nickName = data.nickname
					userdata.isNewUser = data.userNew

					this.api.systemInfo.tableConf = resp.data.tableConf;//记录登录时传入的表格信息

					ret.success({
						extra: data,
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

			return ret.promise
		}

		loginWithBus(params?: GDK.LoginParams) {
			params = params || {}

			let ret = new GDK.RPromise<GDK.LoginResult>();
			let loginInfo = new ServedLoginInfo();
			loginInfo.loginNode = params.node!
			let callbacks = new TaskCallback<LoginServerResult>({
				onSuccess: (data) => {
					let loginResult = new GDK.LoginResult();
					loginResult.extra = data.serverData;
					console.log("loginResult: " + JSON.stringify(loginResult))
					ret.success(loginResult)
				},
				onFailed: (err) => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
						data: {
							extra: err,
						}
					}))
				},
			});

			SDKProxy.loginWithBus(loginInfo, callbacks)

			return ret.promise
		}

		async showUserCenter() {
			let user = SDKProxy.loadUserRecord()[0];
			SDKProxy.showUserCenter(user);
		}

		async showBindDialog() {
			let user = SDKProxy.loadUserRecord()[0];
			SDKProxy.showBindDialog(user);
		}

		update(): Promise<GDK.UserDataUpdateResult> {
			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()
			ret.success({})
			return ret.promise
		}

		_getFriendCloudStorage({ keyList, success, complete, fail }: { keyList: string[], typeIndex: string[], success?: (res: { data: wx.UserGameData[] }) => void, fail?: Function, complete?: Function }): void {
			// let typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			let info: wx.UserGameData = {
				avatarUrl: "http://thirdqq.qlogo.cn/g?b=sdk&k=hX0olvhiaztn1FNkd2IibY4g&s=100&t=1483308056",
				KVDataList: [
					{
						key: "goldRank",
						value: "100AA",
					},
					{
						key: "seedRank",
						value: "1000",
					},
					{
						key: "unlockRank",
						value: "199",
					},
					{
						key: "sceneRank",
						value: "324",
					},
				],
				nickname: "hello",
				openid: "lkjlkwjlk",
			}
			let res: {
				data: any[]
			} = {
				data: [
				]
			}
			for (let i = 0; i < 10; i++) {
				let newinfo = {
					...info
				}
				newinfo.openid += i;
				res.data.push(newinfo);
			}

			let ___unused = success && success(res);
			___unused = complete && complete();
		}

		_setUserCloudStorage(obj: { KVDataList: wx.KVData[], typeIndex: string[], success?: Function, fail?: Function, complete?: Function }) {
			devlog.info('-[UserCloudStorage] 提交用户成绩', obj.KVDataList)
			const typeIndex = obj.typeIndex
			let commitTime = 0//this.getTime()
			let data: BK.QQRankData = {
				userData: [
					{
						openId: '',//GameStatusInfo.openId,
						startMs: '' + 0,//this.loginTime,
						endMs: '' + commitTime,
						scoreInfo: {
							score: 0, //分数，类型必须是整型数
						},
					},
				],
				attr: {
					score: {
						type: 'rank',
						order: 1,
					}
				},
			}

			let selfScoreInfo = data.userData[0].scoreInfo
			let attr = data.attr
			for (let item of obj.KVDataList) {
				let ss = item.value
				let unitA: any = ss.match(/[a-zA-Z]+/)
				if (unitA) unitA = unitA[0];
				let numA = parseFloat(ss)
				let expA = unitNum.indexOf(unitA)
				let intA = Math.floor(numA * 1000)
				let intS = Math.pow(10, 9) * expA + intA
				let keyIndex = typeIndex.indexOf(item.key)

				if (keyIndex <= 0) {
					devlog.info(`-[UserCloudStorage] 不正确的keyIndex: ${keyIndex} ${item.key}`)
				} else {
					let orderKey = 'a' + keyIndex
					selfScoreInfo[orderKey] = intS

					attr[orderKey] = {
						type: item.key,
						order: 1,
					}
				}
			}


			devlog.info('-[UserCloudStorage] 提交用户成绩数据: ' + JSON.stringify(data))
		}

		getFriendCloudStorage(obj: { keyList: string[], typeIndex: string[] }): Promise<{ data: GDK.UserGameData[] }> {
			const ret = new GDK.RPromise<{ data: GDK.UserGameData[] }>()
			this._getFriendCloudStorage({
				keyList: obj.keyList,
				typeIndex: obj.typeIndex,
				success: (res) => {
					ret.success(res)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_GET_FRIEND_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}

		setUserCloudStorage(obj: { KVDataList: wx.KVData[], typeIndex: string[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()
			this._setUserCloudStorage({
				KVDataList: obj.KVDataList, success: () => {
					ret.success(undefined)
				},
				typeIndex: obj.typeIndex,
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SET_USER_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}

		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId): boolean {
			let users = SDKProxy.loadUserRecord().where(u => u.userId == userId);

			return users.length > 0 && !!users.find(user => user.loginType != "silent" && user.loginType != "visitor");
		}

		setAccountChangeListener?(f: () => void) {
			fOnAccountChange = f
		}

	}
}
