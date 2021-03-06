namespace AppV2GDK {
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

        protected isSupport() : boolean {
            return nativeManager.isSupport();
		}
		
		login(params?: GDK.LoginParams) {
			if (this.isSupport()) {
				return this.loginWithBus(params)
			} else {
				return this.loginTest(params)
			}
		}

		// 登录服务器
		loginTest(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			let userId = localStorage.getItem('sdk_glee_userId')
			console.log("sdk_glee_userId:", parseInt(userId!))
			let nUserId: number | undefined = parseInt(userId!)
			console.log("sdk_glee_userId3:", nUserId)
			if (isNaN(nUserId)) {
				nUserId = undefined
			}
			console.log("sdk_glee_userId4:", nUserId)

			this.server.loginTest({ loginCode: nUserId!, node: params && params.node, clientSystemInfo: { deviceId: SDKProxy.deviceId() } }, (resp) => {
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

					//qa证书
					if (resp.data && resp.data.qa != null) {
						//保存证书
						SDKProxy.makeTestCertificate(resp.data.qa);
					} else {
						//清除证书
						SDKProxy.clearTestCerificate();
					}

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
					if (window["type"] && type(data) == "userdata") {
						data = JSON.parse(CS.Glee.Base.JSON.stringify(data));
					}
					let loginResult = new GDK.LoginResult();
					loginResult.extra = data.serverData;
					console.log("loginResult: " + JSON.stringify(loginResult))

					//qa证书
					if (data.serverData && data.serverData.qa != null) {
						//保存证书
						SDKProxy.makeTestCertificate(data.serverData.qa);
					} else {
						//清除证书
						SDKProxy.clearTestCerificate();
					}

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
			

			nativeManager.getWrapper().servedUser.Login(loginInfo, callbacks);

			return ret.promise
		}

		async showUserCenter() {
			if (!this.isSupport()) {
				console.log("不支持User模块，跳过")
				return;
			}

			let info = new ServedBindInfo();
			nativeManager.getWrapper().servedUser.EnterPlatform(info, new TaskCallback<LoginServerResult>({
				onSuccess : (p) => {

				},
				onFailed : (e) => {

				}
			}));
		}

		async showBindDialog () {
			this.bindUser();
		}

		bindUser() : Promise<{success : boolean, data : any}> {
			const ret = new GDK.RPromise<{success : boolean, data : any}>()
			if (!this.isSupport()) {
				console.log("不支持User模块")
				ret.success({success: false, data: {}})
				setTimeout(() => {
					console.log("模拟绑定，确定为绑定成功，取消为绑定失败")
					let isOk = confirm("模拟绑定，确定为绑定成功，取消为绑定失败")
					ret.success({success: isOk, data: {}})
				}, 0);
				return ret.promise;
			}

			let info = new ServedBindInfo();
			info.loginNode = "";
			nativeManager.getWrapper().servedUser.Bind(info, new TaskCallback<LoginServerResult>({
				onSuccess : (p) => {
					ret.success({success: true, data: p.serverData});
				},
				onFailed : (e) => {
					ret.success({success: false, data: {}});
				}
			}));
			return ret.promise;
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
			if (!this.isSupport()) {
				return false;
			}
			return nativeManager.getWrapper().servedUser.IsBind();
		}

		setAccountChangeListener?(f: () => void) {
			// fOnAccountChange = f
			console.error("setAccountChangeListener方法已弃用");
		}

	}
}
