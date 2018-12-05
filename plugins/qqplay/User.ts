
namespace QQPlayGDK {
	const log = new slib.Log({ tags: ['[QQPlayAPI]'] })

	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	const expNum = 7

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		server: QQServer

		get userdata() { return this.api.userData }

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>()

			this.update().then(() => {
				let uploadData = {
					...GameStatusInfo,
					...this.api.userData,
				}
				uploadData['skltPath'] = undefined
				uploadData['dressPath'] = undefined
				uploadData['cpuType'] = undefined
				log.info(`-[QQPlayLogin] upload data: `, uploadData)

				this.server.userLoginQQPlay(uploadData, (resp) => {
					if (resp.succeed) {
						const data = resp.data
						const newdata = {
							isNewUser: data.userNew,
							userId: data.userId,
							avatarUrl: data.profileImg,
							nickName: data.nickname,
							backupTime: data.backupTime,
							channelId: data.channelId,
							createTime: data.createTime,
							followGzh: data.followGzh,
							gameToken: data.gametoken,
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
				}, false, (error) => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
				});
			}).catch((reason) => {
				ret.fail(reason)
			})

			return ret.promise
		}

		setStorageSync(key: string, value: string): void {
			BK.sessionStorage.setItem(key, value)
		}

		getStorageSync(key: string): string {
			return BK.sessionStorage.getItem(key)
		}

		private _fetchingOpenKey = false
		fetchOpenKey(onDone: (params: { openKey: string }) => void, onFail) {
			log.info('to fetchOpenKey')
			let fetchOpenKeyReturn = false
			BK.QQ.fetchOpenKey((errCode, cmd, data) => {
				let shouldCallback = true
				if (fetchOpenKeyReturn) {
					shouldCallback = false
				}
				fetchOpenKeyReturn = true

				if (GameStatusInfo.devPlatform) {
					errCode = 0
					data = {
						openKey: null
					}
					log.info('fetchOpenKey 填入开发模式数据')
				}

				log.info(`fetchOpenKey return ${errCode},${cmd},${data}`)
				if (errCode == 0) {
					let openKey = data.openKey;
					this.setStorageSync('yeknepo', `${openKey}`)
					if (shouldCallback) {
						onDone({ openKey: openKey })
					}
				} else {
					if (shouldCallback) {
						onFail(errCode, cmd, data)
					}
				}
			})
			setTimeout(() => {
				if (!fetchOpenKeyReturn) {
					fetchOpenKeyReturn = true

					log.warn(`fetchOpenKey timeout`)
					let openKey = this.getStorageSync('yeknepo')
					if (openKey) {
						log.warn(`use local stored openkey`, openKey)
						onDone({ openKey: openKey })
					} else {
						this.api.showAlert({
							title: "提示",
							content: "获取QQ游戏平台openkey失败,请退出重进游戏~",
						})
						onFail(-1, '获取openkey失败', {})
						this.fetchOpenKey(onDone, onFail)
					}
				}
			}, 3000)
		}

		checkSession() {
			const ret = new GDK.RPromise<void>()
			this.fetchOpenKey((params) => {
				this.api.userData.openKey = params.openKey
				ret.success(undefined)
			}, () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_UPDATE_LOGIN_SESSION_FAILED))
			})
			return ret.promise
		}

		getHeadEx(onDone: (params: { avatarUrl: string }) => void) {
			log.info('to getHeadEx')
			let fetchHeadExReturn = false

			const openId = this.userdata.openId
			let predefImgUrl = `GameSandBox://_head/${this.userdata.openId}.jpg`

			BK.MQQ.Account.getHeadEx(openId, (openId, imgUrl) => {
				if (fetchHeadExReturn) {
					log.info('getHeadEx return too late')
					return
				}
				fetchHeadExReturn = true
				log.info(`getHeadEx return ${openId},${imgUrl}`)
				// onDone()
			})
			setTimeout(() => {
				if (fetchHeadExReturn) { return }
				fetchHeadExReturn = true
				log.info(`getHeadEx timeout 2s`)
				// onDone()
			}, 500)

			onDone({ avatarUrl: predefImgUrl })
		}

		getNick(onDone: (params: { nick: string }) => void) {
			log.info('to getNick')
			let fetchNickReturn = false
			BK.MQQ.Account.getNick(this.userdata.openId, (openId, nick) => {
				if (fetchNickReturn) {
					log.info('getNick return too late')
					return
				}
				fetchNickReturn = true
				log.info(`getNick return ${openId},${nick}`)
				onDone({ nick: nick })
			})
			setTimeout(() => {
				if (fetchNickReturn) { return }
				fetchNickReturn = true
				log.info(`getNick timeout 2s`)
				onDone({ nick: undefined })
			}, 400)
		}

		update(): Promise<{}> {
			const lang = undefined

			const ret = new GDK.RPromise<GDK.UserDataUpdateResult>()
			if (this._fetchingOpenKey) {
				log.info(`fetchOpenKey fetching true`)
			}
			this._fetchingOpenKey = true
			log.info(`getUserInfo start`)
			let openId = this.userdata.openId
			let roleData: wx.UserInfo = {
				openId: this.userdata.openId,
				gender: this.userdata.sex,
				avatarUrl: '',
				nickName: '',
				language: lang || 'zh_CN',
				city: '',
				province: '',
				country: '',
			}
			let res = {
				userInfo: roleData,
				encryptedData: null,
				iv: null,
			}
			let onDone = () => {
				log.info('getUserInfo return', res)
				ret.success({ extra: res })
			}
			let onFail = (errCode, cmd, data) => {
				log.info(`getUserInfo failed ${errCode}, ${cmd}, ${data}`)
				// ret.fail(errCode, cmd, res)
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_LOGIN_FAILED, {
					data: {
						extra: {
							errCode,
							cmd,
							data,
						}
					}
				}))
			}

			this.fetchOpenKey(({ openKey }) => {
				res.userInfo['openKey'] = openKey
				this.getNick(({ nick }) => {
					roleData.nickName = nick || '未设置QQ昵称'
					this.getHeadEx(({ avatarUrl }) => {
						roleData.avatarUrl = avatarUrl || '未设置QQ头像'
						log.info(`get userinfo timespend`)
						onDone()
					})
				})
			}, onFail)
			log.info(`getUserInfo waiting`)

			return ret.promise
		}

		_getFriendCloudStorage({ keyList, success, complete, fail }:
			{ keyList: string[], success?: (res: { data: wx.UserGameData[] }) => void, fail?: Function, complete?: Function }): void {
			// 当前不支持一次同时拉取多个排行榜，需要拉取多次，而且必须等上一个拉取回来后才能拉取另外一个排行榜
			// 先拉 score 排行榜
			const rankLog = new slib.Log({ tags: ['[FriendRank]'] })
			rankLog.info("-[FriendRank] getFriendCloudStorage")
			let temp = {}
			let pullAttrRank = (attr, resolve, reject) => {
				rankLog.info(`-[FriendRank] req getRankListWithoutRoom ${attr}`)
				let order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
				let rankType = 0
				// 必须配置好周期规则后，才能使用数据上报和排行榜功能
				BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
					rankLog.info("-[FriendRank] getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
					// 返回错误码信息
					if (errCode !== 0) {
						log.info(1, 1, '获取排行榜数据失败!错误码：' + errCode);
						reject()
						return;
					}
					// 解析数据
					if (data) {
						for (let i = 0; i < data.data.ranking_list.length; ++i) {
							let rd = data.data.ranking_list[i];
							let url = rd.url
							let nick = rd.nick
							let uniqueKey = url + '_' + nick
							temp[uniqueKey] = temp[uniqueKey] || {}
							let info = temp[uniqueKey]
							info.url = url
							info.nick = nick
							info.selfFlag = rd.selfFlag
							info[attr] = rd[attr]
							// rd 的字段如下:
							//let rd = {
							//    url: '',            // 头像的 url
							//    nick: '',           // 昵称
							//    score: 1,           // 分数
							//    selfFlag: false,    // 是否是自己
							//};
						}
					}
					resolve();
				});
			}

			const convertExpValue = (value) => {
				if (!value) {
					value = '0'
				}

				let intS = value
				let level = Math.pow(10, expNum)
				let expA = Math.floor(value / level)
				let intA = value % level
				let numA = intA / 1000
				let unitA = unitNum[expA]
				if (!unitA) unitA = ''
				let ss = '' + numA + unitA
				return ss
			}

			const convertResult = (temp: { [url: string]: { nick?: string, score?: number, selfFlag?: boolean, url?: string, a1?: string, a2?: string, a3?: string, a4?: string, a5?: string } }) => {
				let result: { data: wx.UserGameData[] } = { data: [] }
				for (let key in temp) {
					let value = temp[key]
					let kvlist: wx.KVData[] = []
					for (let i = 1; i < 10; i++) {
						let rvalue = convertExpValue(value['a' + i])
						if (rvalue == undefined) {
							break
						}
						let rkey = typeIndex[i]
						if (rkey == undefined) {
							break
						}
						kvlist.push({
							key: rkey,
							value: rvalue,
						})
					}
					result.data.push({
						avatarUrl: value.url,
						nickname: value.nick,
						openid: value.selfFlag ? GameStatusInfo.openId : null,
						KVDataList: kvlist,
					})
				}
				return result
			}

			let promises = []
			for (let key of keyList) {
				let keyIndex = typeIndex.indexOf(key)
				slib.assert(!isNaN(keyIndex), '-[FriendRank] invalid key for rank : ' + key)
				let attr = 'a' + keyIndex
				promises.push(() => {
					return new Promise((resolve, reject) => {
						return pullAttrRank(attr, resolve, reject)
					})
				})
			}

			let rankFetched = false
			consumePromise(promises, (res) => {

				if (res) {
					fail && fail();
					complete && complete();
				} else {
					rankLog.info(`-[FriendRank] temp result: ${JSON.stringify(temp)}`)
					let result = convertResult(temp)
					rankLog.info(`-[FriendRank] result: ${JSON.stringify(result)}`)

					try {
						let resultString = JSON.stringify(result)
						this.setStorageSync('frank-data', resultString)
					} catch (e) {
						rankLog.info(`-[FriendRank] save local rank data failed`, e.toString())
					}

					// 如果已经使用本地缓存刷新过,那么仅仅更新本地缓存
					if (rankFetched) {
						rankLog.info(`-[FriendRank] fetch rank data too late`)
						return
					}
					rankFetched = true

					success && success(result);
					complete && complete();
				}

			})
			setTimeout(() => {
				if (rankFetched) {
					return
				}

				let result = null
				try {
					let resultString = this.getStorageSync("frank-data")
					if (resultString) {
						result = JSON.parse(resultString)
						rankFetched = true
						success && success(result)
						complete && complete();
					}
				} catch (e) {
					rankLog.info(`-[FriendRank] load local rank data failed`, e.toString())
				}
			})

		}

		getFriendCloudStorage(obj: { keyList: string[] }): Promise<{ data: GDK.UserGameData[] }> {
			const ret = new GDK.RPromise<{ data: GDK.UserGameData[] }>()
			this._getFriendCloudStorage({
				keyList: obj.keyList,
				success: (res) => {
					ret.success(res)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_GET_FRIEND_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}

		getTime(): number {
			console.warn("需要改为使用服务器时间")
			return new Date().getTime()
		}

		protected loginTime = null
		protected uploadingUserScore = false
		_setUserCloudStorage(obj: { KVDataList: wx.KVData[], success?: Function, fail?: Function, complete?: Function }) {
			const { success, fail } = obj
			const rankLog = new slib.Log({ tags: ['[UserCloudStorage]'] })
			if (this.loginTime == null) {
				rankLog.info('-[UserCloudStorage] 未登录,不提交成绩数据', obj.KVDataList)
				fail && fail()
				return
			}
			if (this.uploadingUserScore) {
				rankLog.info('-[UserCloudStorage] 刚提交过用户成绩,不重复提交', obj.KVDataList)
				fail && fail()
				return
			}
			this.uploadingUserScore = true
			setTimeout(() => {
				this.uploadingUserScore = false
			}, 3000)

			rankLog.info('-[UserCloudStorage] 提交用户成绩', obj.KVDataList)

			let commitTime = this.getTime()
			let data: BK.QQRankData = {
				userData: [
					{
						openId: GameStatusInfo.openId,
						startMs: '' + this.loginTime,
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
				let intS = Math.pow(10, expNum) * expA + intA
				let keyIndex = typeIndex.indexOf(item.key)

				if (keyIndex <= 0) {
					rankLog.info(`-[UserCloudStorage] 不正确的keyIndex: ${keyIndex} ${item.key}`)
					continue
				}

				let orderKey = 'a' + keyIndex
				selfScoreInfo[orderKey] = intS

				attr[orderKey] = {
					type: item.key,
					order: 4,
				}
			}


			rankLog.info('-[UserCloudStorage] 提交用户成绩数据: ' + JSON.stringify(data))
			// gameMode: 游戏模式，如果没有模式区分，直接填 1
			// 必须配置好周期规则后，才能使用数据上报和排行榜功能
			BK.QQ.uploadScoreWithoutRoom(1, data, (errCode, cmd, data) => {
				// 返回错误码信息
				if (errCode !== 0) {
					rankLog.info(`-[UserCloudStorage] 上传成绩失败!错误码：${errCode} cmd: ${cmd} data: ${data}`);
					fail && fail()
				} else {
					rankLog.info('-[UserCloudStorage] 上传成绩成功!');
					this.loginTime = commitTime;
					success && success()
				}
				this.uploadBusinessData(obj);
			});
		}

		uploadBusinessData(obj: { KVDataList: wx.KVData[], success?: Function, fail?: Function, complete?: Function }) {
			const rankLog = new slib.Log({ tags: ['[BusinessData]'] })
			// 上报游戏运营数据
			let gameTime = this.getTime() - this.loginTime
			let gameResultData = {
				"infoList": [              //通用数据上报列表
					{
						"type": 1,         //必选。数据类型。
						"op": 2,           //必选。运营类型。1表示增量，2表示存量。
						"num": 1,          //必选。数目。不超过32位有符号数。
						"extId": 1         //可选。扩展Id。用于特殊数据的上报，如果要填，不能是0。
					}
				],
			};

			let infoList = gameResultData.infoList
			for (let item of obj.KVDataList) {
				let ss = item.value
				let unitA: any = ss.match(/[a-zA-Z]+/)
				if (unitA) unitA = unitA[0];
				let numA = parseFloat(ss)
				let expA = unitNum.indexOf(unitA)
				let intA = Math.floor(numA * 1000)
				let intS = Math.pow(10, expNum) * expA + intA
				let keyIndex = typeIndex.indexOf(item.key)
				if (keyIndex <= 0) {
					rankLog.info(`-[BusinessData] 不正确的keyIndex: ${keyIndex} ${item.key}`)
					continue
				}
				infoList.push({
					type: keyIndex,
					op: 2,
					num: intS,
					extId: expNum,
				})
			}

			rankLog.info('-[BusinessData] 提交运营数据: ' + JSON.stringify(gameResultData))
			BK.QQ.reportGameResult(gameResultData, function (errCode, cmd, data) {
				if (errCode !== 0) {
					//上报运营结果失败
					rankLog.info(`-[BusinessData] 上报运营结果失败: code: ${errCode} cmd: ${cmd} data:${data}`)
				} else {
					//上报运营结果成功
					rankLog.info('-[BusinessData] 上报运营结果成功')
				}
			});
		}

		setUserCloudStorage(obj: { KVDataList: wx.KVData[] }): Promise<void> {
			const ret = new GDK.RPromise<void>()
			this._setUserCloudStorage({
				KVDataList: obj.KVDataList, success: () => {
					ret.success(undefined)
				},
				fail: () => {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_SET_USER_CLOUD_STORAGE_FAILED))
				}
			})
			return ret.promise
		}
	}
}