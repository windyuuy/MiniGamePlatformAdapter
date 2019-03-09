
namespace AppGDK {
	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	// const expNum = 7
	const devlog = Common.devlog

	var isCancelLogin: boolean = false;
	var isLoginEnd: boolean = false;

	var loginRet = null;
	var self: User

	let loginComplete = (data: LoginCallbackData) => {
		SDKProxy.hideLogining();
		if (isCancelLogin) {
			return;
		}
		isLoginEnd = true;
		if (data.succeed) {

			//刷新登陆记录中的信息
			let userRecords = SDKProxy.loadUserRecord()
			let record = userRecords[0]//当前登陆的用户必然在第一条
			record.openId = data.data.openId;
			record.name = data.data.nickname
			record.userId = data.data.userId
			record.createTime = data.data.createTime
			record.token = data.data.token
			SDKProxy.saveUserRecord(userRecords);

			const userdata = self.api.userData
			userdata.channelId = data.data.channelId
			userdata.createTime = data.data.createTime
			userdata.userId = data.data.userId
			userdata.followGzh = data.data.followGzh
			userdata.nickName = data.data.nickname
			userdata.isNewUser = data.data.userNew

			loginRet.success({
				extra: data.data,
			})


		} else {
			loginRet.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
				data: {
					extra: data,
				}
			}))
		}
	}

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		init(data) {
			self = this;
			SDKProxy.onCancelLogining(() => {
				if (isLoginEnd) {
					return;
				}
				//当玩家取消当前的登陆进程，则弹出登陆框，让玩家进行选择
				isCancelLogin = true;

				SDKProxy.hideLogining();
				SDKProxy.showLoginDialog();
			})

			SDKProxy.onLogin((type, openId, token) => {
				//玩家SDK登陆完成
				SDKProxy.hideLoginDialog();//隐藏登陆弹框
				isCancelLogin = false;

				//生成玩家登陆记录
				let userRecords = SDKProxy.loadUserRecord()
				let record = userRecords.find(a => a.openId == openId)
				if (record) {
					userRecords.remove(record)
				} else {
					record = {
						userId: null,
						openId: openId,
						loginType: type,
						name: openId,
						createTime: new Date().getTime(),
						token: token,
					}
				}
				userRecords.unshift(record)//当前玩家记录放在第一条

				SDKProxy.showLogining(record.name);//显示正在登陆

				SDKProxy.saveUserRecord(userRecords);

				if (type == "google") {
					this.server.loginGoogle({ openId: openId, token: token }, loginComplete);
				} else if (type == "facebook") {
					this.server.loginFB({ openId: openId, token: token }, loginComplete);
				} else if (type == "visitor") {
					this.server.loginOpenId({ openId: null }, loginComplete);
				}
			})

			SDKProxy.onBind((type, userId, token) => {
				//玩家SDK绑定完成
			})

			SDKProxy.onRemoveUser((openId) => {
				//移除某条玩家记录
				let userRecords = SDKProxy.loadUserRecord()
				userRecords.remove(userRecords.find(a => a.openId == openId))
				SDKProxy.saveUserRecord(userRecords);
			})
		}

		login(params?: GDK.LoginParams) {
			isCancelLogin = false;

			if (params.autoLogin === undefined) {
				params.autoLogin = true;//默认允许自动登陆
			}

			const ret = new GDK.RPromise<GDK.LoginResult>()
			loginRet = ret

			let userRecords = SDKProxy.loadUserRecord();

			if (userRecords.length > 0) {
				//老用户
				if (params.autoLogin) {
					let currentUser = userRecords[0];
					if (currentUser.loginType == "visitor") {
						//自动游客登陆
						SDKProxy.showLogining(currentUser.name);
						this.server.loginOpenId({ openId: currentUser.openId }, loginComplete);
					} else {
						//执行SDK自动登陆
						SDKProxy.showLogining(currentUser.name);
						SDKProxy.autoLogin(currentUser);
					}
				} else {
					//打开登陆弹框
					SDKProxy.showLoginDialog();
				}
			} else {
				//新用户
				if (params.autoLogin) {
					//自动游客登陆
					SDKProxy.showLogining("欢迎");
					//创建一条登陆记录
					let record = {
						userId: null,
						openId: null,
						loginType: "visitor",
						name: null,
						createTime: new Date().getTime(),
						token: null,
					} as any
					userRecords.unshift(record)//当前玩家记录放在第一条
					SDKProxy.saveUserRecord(userRecords);
					this.server.loginOpenId({ openId: null }, loginComplete);
				} else {
					//打开登陆弹框
					SDKProxy.showLoginDialog();
				}
			}

			return ret.promise
		}

		async showUserCenter() {
			let user = SDKProxy.loadUserRecord()[0];
			SDKProxy.showUserCenter(user);
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
			let res = {
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

			success && success(res);
			complete && complete();
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
					continue
				}

				let orderKey = 'a' + keyIndex
				selfScoreInfo[orderKey] = intS

				attr[orderKey] = {
					type: item.key,
					order: 1,
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
	}
}