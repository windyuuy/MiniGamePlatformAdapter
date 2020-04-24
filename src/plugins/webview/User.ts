namespace AppGDK {
	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	// const expNum = 7
	const devlog = Common.devlog

	var isCancelLogin: boolean = false;
	var isLoginEnd: boolean = false;

	var loginRet = null;
	var self: User

	var isDelayLogin = false;
	var loginStartTime = 0;
	var loginRecord: LoginCallbackData = null;
	var fOnAccountChange: () => void = null

	let loginComplete: (data: LoginCallbackData) => void;

	let loginSuccess: (/**登陆的类型 */ type: LoginType,/**用户ID */ openId: string, token: string, nickName: string, email: string, head: string, platform?: string, exAuthData?: string) => void;

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		loginNode: string = null;

		get server(): MServer {
			return MServer.inst
		}

		init(data) {

			loginComplete = (data: LoginCallbackData) => {
				if (isCancelLogin) {
					return;
				}

				let loginLogic = () => {
					SDKProxy.hideLogining();
					if (isCancelLogin) {
						return;
					}
					isLoginEnd = true;
					if (data.succeed) {
						//刷新登陆记录中的信息
						let userRecords = SDKProxy.loadUserRecord()
						//查找ID相同的记录，或者是游客登陆，则是第一条
						let record = userRecords.find(a => a.openId == data.data.openId) || userRecords[0]
						record.openId = data.data.openId;
						if (record.name == "" || record.name == null || record.loginType == "wxapp") {
							record.name = data.data.nickname
						}
						record.userId = data.data.userId
						record.createTime = data.data.createTime
						if (record.loginType != "wxapp") {
							record.token = data.data.token
						} else {
							record.token = null
						}
						SDKProxy.saveUserRecord(userRecords);

						this.api.systemInfo.tableConf = data.data.tableConf;//记录登录时传入的表格信息

						const userdata = self.api.userData
						userdata.channelId = data.data.channelId
						userdata.createTime = data.data.createTime
						userdata.userId = data.data.userId
						userdata.followGzh = data.data.followGzh
						userdata.nickName = data.data.nickname
						userdata.isNewUser = data.data.userNew

						//记录原生日志
						if (data.data.userNew) {
							LogBridge.logRegister(record.loginType)//注册日志
						}
						LogBridge.logLogin(record.loginType, record.userId)//登陆日志

						loginRet.success({
							extra: data.data,
						})

						//qa证书
						if (data.data.qa && data.data.qa != null) {
							//保存证书
							SDKProxy.checkGdkjsb() && gdkjsb.makeTestCertificate && gdkjsb.makeTestCertificate(data.data.qa);
						} else {
							//清除证书
							SDKProxy.checkGdkjsb() && gdkjsb.clearTestCerificate && gdkjsb.clearTestCerificate();
						}

						if (loginRecord != null) {
							fOnAccountChange && fOnAccountChange()
						}
						loginRecord = data
					} else {
						loginRet.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
							data: {
								extra: data,
							}
						}))
					}
				}

				if (isDelayLogin) {
					//延迟一秒
					let time = new Date().getTime() - loginStartTime;
					if (time < 0) time = 0;
					if (time >= 1000) {
						loginLogic();//没必要延迟
					} else {
						setTimeout(() => {
							loginLogic();
						}, Math.max(0, 1000 - time));
					}
				} else {
					loginLogic();
				}

			}

			self = this;
			// cancelLogining
			SDKProxy.onCancelLogining(() => {
				if (isLoginEnd) {
					return;
				}
				//当玩家取消当前的登陆进程，则弹出登陆框，让玩家进行选择
				isCancelLogin = true;

				SDKProxy.hideLogining();
				SDKProxy.showLoginDialog((data) => {
					this.loginResponse(data);
				});
			})

			loginSuccess = (type, openId, token, nickName, email, head, platform?, exAuthData?) => {
				//玩家SDK登陆完成
				SDKProxy.hideLoginDialog();//隐藏登陆弹框
				isCancelLogin = false;

				// ---------------------------------------------------
				// refresh local token, added by lichangshou
				(this.api.userData as UserData).token = token
				// ---------------------------------------------------

				console.log("loginYYBApp yingyongbao1:" + openId + "," + token + "," + head)

				//生成玩家登陆记录
				let userRecords = SDKProxy.loadUserRecord()
				let record = userRecords.find(a => a.openId == openId)
				if (type == "wxapp") {
					record = userRecords.find(a => a.loginType == type)
				}
				if (record) {
					userRecords.remove(record)
				} else {
					record = {
						userId: null,
						openId: openId,
						loginType: type,
						name: nickName,
						createTime: new Date().getTime(),
						token: token,
					}
				}
				userRecords.unshift(record)//当前玩家记录放在第一条
				SDKProxy.showLogining(record.name == null || record.name == "" ? slib.i18n.locSDKString("welcome") : record.name, record.loginType);//显示正在登陆
				SDKProxy.saveUserRecord(userRecords);

				isDelayLogin = true;
				loginStartTime = new Date().getTime()

				// if (type == "account") {
				// 	let sysInfo = this.api.systemInfo.clone()
				// 	this.server.loginOpenId({ openId: openId, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
				// } else if (type == "google") {
				// 	this.server.loginGoogle({ openId: openId, token: token, avatar: head, userName: nickName, email: email, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "facebook") {
				// 	this.server.loginFB({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "wxapp") {
				// 	if (platform && platform == "android") {
				// 		this.server.loginAppWXAndroid({ openId: openId, code: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// 	} else {
				// 		this.server.loginAppWX({ openId: openId, code: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// 	}
				// } else if (type == "gamecenter") {
				// 	this.server.loginGC({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "visitor") {
				// 	let sysInfo = this.api.systemInfo.clone()
				// 	this.server.loginOpenId({ openId: openId, uuId: sysInfo.uuid, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
				// } else if (type == "quick") {
				// 	this.server.loginQuick({ openId: openId, token: token, channelId: Number(this.api.systemInfo.quickChannelId), clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "huawei") {
				// 	let t: { playerLevel: string, ts: string } = JSON.parse(exAuthData)
				// 	this.server.loginHuawei({ playerId: openId, playerSSign: token, playerLevel: t.playerLevel, ts: t.ts, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "vivoapp") {
				// 	this.server.loginVivo({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "OppoApp") {
				// 	this.server.loginOppoApp({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "baiduapp") {
				// 	this.server.loginBaidu({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "aligame") {
				// 	this.server.loginAligame({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "yingyongbaoApp") {
				// 	console.log("loginYYBApp yingyongbao2:" + openId + "," + token + "," + head)
				// 	this.server.loginYYBApp({ openId: openId, token: token, type: Number(head), clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "meituApp") {
				// 	this.server.loginMeituApp({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "xiao7") {
				// 	this.server.loginXiao7({ token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "chongchong") {
				// 	this.server.loginChongchong({ openId: openId, token: token, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "lufeifan") {
				// 	this.server.loginLufeifan({ openId: openId, token: token, timestamp: nickName, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else if (type == "jingyou") {
				// 	this.server.loginJingyou({ openId: openId, token: token, timestamp: nickName, type: email, clientSystemInfo: this.api.systemInfo.clone(), node: this.loginNode }, loginComplete);
				// } else {
				// 	let sysInfo = this.api.systemInfo.clone()
				// 	this.server.loginOpenId({ openId: openId, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
				// }
				let sysInfo = this.api.systemInfo.clone()
				this.server.loginOpenId({ openId: openId, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
			}

			// login
			SDKProxy.onLogin(loginSuccess);

			// logout
			SDKProxy.onLogout(() => {
				loginRecord = null
				fOnAccountChange && fOnAccountChange()
			})

			// rebootLogin
			SDKProxy.onRebootLogin((type, openId, token, nickName, email, head) => {
				//玩家SDK登陆完成
				SDKProxy.hideLoginDialog();//隐藏登陆弹框
				isCancelLogin = false;

				//生成玩家登陆记录
				let userRecords = SDKProxy.loadUserRecord()
				let record = userRecords.find(a => a.openId == openId)
				if (type == "wxapp") {
					record = userRecords.find(a => a.loginType == type)
				}
				if (record) {
					userRecords.remove(record)
				} else {
					record = {
						userId: null,
						openId: openId,
						loginType: type,
						name: nickName,
						createTime: new Date().getTime(),
						token: token,
					}
				}
				userRecords.unshift(record)//当前玩家记录放在第一条

				loginStartTime = new Date().getTime()

				SDKProxy.saveUserRecord(userRecords);

				//do login in reload
				if (this.rebootCallback) {
					this.rebootCallback()
				}
			})

			// bind
			SDKProxy.onBind((type, visitorOpenId, openId, token, platform?) => {
				//玩家SDK绑定完成
				let typeNumb = null
				if (type == "facebook") {
					typeNumb = 1
				} else if (type == "google") {
					typeNumb = 2
				} else if (type == "gamecenter") {
					typeNumb = 3
				} else if (type == "wxapp") {
					if (platform && platform == "android") {
						typeNumb = 5;
					} else {
						typeNumb = 4;
					}
				}


				this.server.bindingAccount({ visitorOpenId: visitorOpenId, openId: openId, token: token, type: typeNumb, clientSystemInfo: this.api.systemInfo.clone() }, (data) => {
					if (data.succeed) {
						SDKProxy.hideUserCenter();
						SDKProxy.hideBindDialog();

						let users = SDKProxy.loadUserRecord()
						let user = users.find(a => a.openId == visitorOpenId);
						if (typeNumb != 4 && typeNumb != 5) {
							user.openId = openId
							user.token = token
						} else {
							user.openId = data.data.openId
							//wxapp no need save token
							user.token = null
						}
						user.name = data.data.nickname//绑定后使用绑定账号的昵称
						user.loginType = type
						SDKProxy.saveUserRecord(users);

						this.api.showAlert({ title: slib.i18n.locSDKString("remind_tip"), content: slib.i18n.locSDKString("bind_succ") });

						if (this.bindCallback) {
							this.bindCallback(true, data.data)
						}

					} else {
						this.api.showAlert({ title: slib.i18n.locSDKString("remind_tip"), content: slib.i18n.locSDKString("bind_fail") });

						if (this.bindCallback) {
							this.bindCallback(false)
						}
					}
				})
			})

			// loginFail
			SDKProxy.onLoginFail(() => {
				//SDK层 登陆失败
				SDKProxy.hideLogining();
			})

			// removeUser
			SDKProxy.onRemoveUser((openId) => {
				//移除某条玩家记录
				let userRecords = SDKProxy.loadUserRecord()
				userRecords.remove(userRecords.find(a => a.openId == openId))
				SDKProxy.saveUserRecord(userRecords);
			})
		}

		login(params?: GDK.LoginParams) {
			isCancelLogin = false;
			isLoginEnd = false
			if (params.autoLogin === undefined) {
				params.autoLogin = true;//默认允许自动登陆
			}

			if (params.node) {
				this.loginNode = params.node
			}

			const ret = new GDK.RPromise<GDK.LoginResult>()
			loginRet = ret

			if (loginRecord) {
				loginRet.success({
					extra: loginRecord.data,
				})
			} else {
				let userRecords = SDKProxy.loadUserRecord();

				if (userRecords.length > 0) {
					//老用户
					if (params.autoLogin) {
						let currentUser = userRecords[0];
						if (currentUser.loginType == "silent") {
							//自动静默登陆
							isDelayLogin = false;
							let sysInfo = this.api.systemInfo.clone()
							this.server.loginOpenId({ openId: currentUser.openId, uuId: sysInfo.uuid, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
						} else if (currentUser.loginType == "visitor") {
							//自动游客登陆
							if (params.silent) {
								isDelayLogin = false;
							} else {
								SDKProxy.showLogining(currentUser.name, currentUser.loginType);
								isDelayLogin = true;
							}
							loginStartTime = new Date().getTime()
							let sysInfo = this.api.systemInfo.clone()
							this.server.loginOpenId({ openId: currentUser.openId, uuId: sysInfo.uuid, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
						} else {
							//执行SDK自动登陆
							isDelayLogin = true;
							loginStartTime = new Date().getTime()
							SDKProxy.showLogining(currentUser.name, currentUser.loginType);
							SDKProxy.autoLogin(currentUser, (data) => {
								this.loginResponse(data);
							});
						}
					} else {
						//打开登陆弹框
						SDKProxy.showLoginDialog((data) => {
							this.loginResponse(data);
						});
					}
				} else {
					//新用户
					if (params.autoLogin && params.silent) {
						//自动静默登陆
						//创建一条登陆记录
						let record = {
							userId: null,
							openId: null,
							loginType: "silent",
							name: null,
							createTime: new Date().getTime(),
							token: null,
						} as any
						userRecords.unshift(record)//当前玩家记录放在第一条
						SDKProxy.saveUserRecord(userRecords);
						isDelayLogin = false;
						let sysInfo = this.api.systemInfo.clone()
						this.server.loginOpenId({ openId: null, uuId: sysInfo.uuid, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);

					} else if (params.autoLogin) {
						//自动游客登陆
						// if (gdkjsb.nativeVersion() >= 4) {
						if (nativeHelper.checkActionExist("loginNative")) {
							//travel to native
							SDKProxy.loginNative()
						} else {
							//自动游客登陆
							SDKProxy.showLogining(slib.i18n.locSDKString("welcome"), "visitor");
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
							isDelayLogin = true;
							loginStartTime = new Date().getTime()
							let sysInfo = this.api.systemInfo.clone()
							this.server.loginOpenId({ openId: null, uuId: sysInfo.uuid, clientSystemInfo: sysInfo, node: this.loginNode }, loginComplete);
						}
					} else {
						//打开登陆弹框
						SDKProxy.showLoginDialog((data) => {
							this.loginResponse(data);
						});
					}
				}
			}
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
		/**
		 * 判断userId对应的用户是否绑定过社交账号
		 * @param userId 登录时服务器返回的userId
		 */
		checkIsUserBind(userId): boolean {
			let users = SDKProxy.loadUserRecord().where(u => u.userId == userId);

			return users.length > 0 && !!users.find(user => user.loginType != "silent" && user.loginType != "visitor");
		}


		setLoginSupport(loginSupport?: {
			google: boolean,
			visitor: boolean,
			facebook: boolean,
			wechat: boolean,
			gamecenter: boolean,
			account: boolean
		}) {
			SDKProxy.support = loginSupport
			let t = {}
			if (loginSupport) {
				t["google_login"] = loginSupport.google
				t["facebook_login"] = loginSupport.facebook
				t["gamecenter_login"] = loginSupport.gamecenter
				t["wechat_login"] = loginSupport.wechat
				t["visitor_login"] = loginSupport.visitor
				t["account_login"] = loginSupport.account
			}

			SDKProxy.callAction("setLoginSupport", JSON.stringify(t), (data) => { });
		}

		setAccountChangeListener?(f: () => void) {
			fOnAccountChange = f
		}

		isNativeRealNameSystem() {
			return gdkjsb.checkActionExist("showRealNameDialog");
		}

		loginResponse(data: string) {
			// let json = JSON.parse(data);
			// if (json && json.token) {
			// 	// 登录成功
			// 	loginSuccess(json.type, json.openId, json.token, json.nickName, json.email, json.head, json.platform, json.exAuthData);
			// } else {
			// 	// 登录失败
			// }
		}

		async showMinorInfo(info: string): Promise<void> {
			return new Promise((resolve, reject) => {
				SDKProxy.showMinorInfo(info, () => {
					resolve();
				})
			})
		}
		async showRealNameDialog(userId: number, force: boolean): Promise<{
			/**
			 * 是否完成实名制
			 */
			isVerified: boolean,
			/**
			 * 当前年龄
			 */
			age: number,
			/**
			 * 当前玩家姓名
			 */
			name: string,
			idCard: string,
			birthday: string
		}> {
			return new Promise((resolve, reject) => {
				SDKProxy.showRealNameDialog(userId, force, (data) => {
					resolve(data);
				})
			})
		}
	}
}
