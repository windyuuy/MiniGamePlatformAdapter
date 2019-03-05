
namespace AppGDK {
	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	// const expNum = 7
	const devlog = Common.devlog

	/**
	 * 用户信息本地存储的key
	 */
	const USER_INFO_KEY = "$OFNIRESU$";
	const USER_INFO_XXTEA_KEY = "key$OFNIRESU$key";

	/**
	 * 登陆的用户信息结构
	 */
	type UserInfo = {
		/**
		 * 用户id
		 */
		userId: number,

		/**
		 * 登陆时的openId
		 */
		openId: string,

		/**
		 * 记录上次的登陆类型
		 */
		loginType: "visitor" | "facebook" | "google",

		/**
		 * 玩家的昵称
		 */
		name: string,

		/**
		 * 创建的时间
		 */
		createTime: number,

		token: string,
	}

	/**
	 * 加载用户登陆信息
	 */
	function loadUserInfo(): UserInfo {
		try {
			let data = localStorage.getItem(USER_INFO_KEY);
			if (data && data != "") {
				return JSON.parse(slib.xxtea.decryptFromBase64(data, USER_INFO_XXTEA_KEY)) as UserInfo;
			}
			return null;
		} finally {
			return null;
		}
	}


	/**
	 * 保存登陆信息
	 * @param data 
	 */
	function saveUserInfo(data: UserInfo) {
		let str = JSON.stringify(data);
		let xxt = slib.xxtea.encryptToBase64(str, USER_INFO_XXTEA_KEY);
		localStorage.setItem(USER_INFO_KEY, xxt);
	}

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		get server(): MServer {
			return MServer.inst
		}

		login(params?: GDK.LoginParams) {

			if (params.autoLogin === undefined) {
				params.autoLogin = true;//默认允许自动登陆
			}

			const ret = new GDK.RPromise<GDK.LoginResult>()

			let userInfo = loadUserInfo();
			let loginType = null;

			let loginComplete = (data: LoginCallbackData) => {
				if (data.succeed) {
					userInfo = {
						openId: data.data.openId,
						userId: data.data.userId,
						loginType: loginType,
						name: data.data.nickname,
						createTime: data.data.createTime,
						token: data.data.token
					}
					saveUserInfo(userInfo)//保存登陆信息

					const userdata = this.api.userData
					userdata.channelId = data.data.channelId
					userdata.createTime = data.data.createTime
					userdata.userId = data.data.userId
					userdata.followGzh = data.data.followGzh
					userdata.nickName = data.data.nickname
					userdata.isNewUser = data.data.userNew

					ret.success({
						extra: data.data,
					})

				} else {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
						data: {
							extra: data,
						}
					}))
				}
			}

			if (userInfo) {
				//老用户
				if (params.autoLogin) {
					loginType = userInfo.loginType
					if (userInfo.loginType == "visitor") {
						//自动游客登陆
						this.server.loginByOpenId({ openId: userInfo.openId }, loginComplete);
					} else if (userInfo.loginType == "facebook") {
						//自动脸书登陆
					} else if (userInfo.loginType == "google") {
						//自动google登陆
					} else {
						//打开登陆弹框
					}
				} else {
					//打开登陆弹框
				}
			} else {
				//新用户
				if (params.autoLogin) {
					//自动游客登陆
					loginType = "visitor"
					this.server.loginByOpenId({ openId: null }, loginComplete);
				} else {
					//打开登陆弹框
				}
			}

			return ret.promise
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