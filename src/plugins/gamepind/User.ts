declare function GamepindReLoginAndRedirect(url: string): void;

namespace GamepindGDK {
	const unitNum = [null, 'K', 'M', 'B', 'T', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz', 'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT', 'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ']
	// const typeIndex = [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	// const expNum = 7
	const devlog = Common.devlog

	export class User extends GDK.UserBase {
		api?: GDK.UserAPI
		/*
		{
			mv_cas_oauth_token:fffffff,
			property:PP_APP,
			device_id:ffffff,
			pid:666666,
			gp_playSource:gppreapp,
			gp_campaignName:new_request,
			utm_source:gppreapp,
		}
		 */
		_query: any;
		private debug_redirect_uri: string = "https://rainbowfarmstag.gamepind.com";
		private release_redirect_uri: string = "https://rainbowfarm.gamepind.com";
		private debug_domain: string = "https://securebox.gamepind.com/cas";
		private release_domain: string = "https://secure.gamepind.com/cas";
		//private mode: string = "develop";
		private mode: string = "release";
		get server(): MServer {
			return MServer.inst
		}

		login(params?: GDK.LoginParams) {
			const ret = new GDK.RPromise<GDK.LoginResult>();

			devlog.info("Gamepind login params begin");
			if (params) {
				Object.keys(params).forEach((v, i, arr) => {
					devlog.info("--" + v + " : " + params[v]);
				})
			}
			devlog.info("Gamepind login params end");

			this.mode = (params && params.token) ? params.token : this.mode;
			this.parseQuery();
			let access_token: string = "";
			// 1. join game with clicking game icon in gamepind app
			access_token = (this._query && this._query["mv_cas_oauth_token"]) ? this._query["mv_cas_oauth_token"] : access_token;
			if (access_token == "") {
				// 2. join game with paytm login redirect
				access_token = (this._query && this._query["access_token"]) ? this._query["access_token"] : access_token;
			}
			let device_id = "";
			// 1. join game with clicking game icon in gamepind app
			device_id = (this._query && this._query["device_id"]) ? this._query["device_id"] : device_id;
			if (device_id == "") {
				device_id = (this._query && this._query["customer_id"]) ? this._query['customer_id'] : device_id;
			}
			let order_id: string = "";
			order_id = (this._query && this._query["order_id"]) ? this._query["order_id"] : order_id;

			this.api.systemInfo.country = "CN";
			if (this._query["property"] == "PP_PAYTM") {
				this.api.systemInfo.country = "US";
			}
			if (access_token != "") {
				devlog.info("Gamepind login token: " + access_token);
				(this.api.userData as UserData).token = access_token;
				(this.api.userData as UserData).ext1 = this.mode == "develop" ? this.debug_redirect_uri : this.release_redirect_uri;
				(this.api.userData as UserData).ext2 = device_id;
				localStorage.setItem("gamepind_access_token", access_token)
				localStorage.setItem("gamepind_device_id", device_id)
				localStorage.setItem("gamepind_property", this._query['property'])
				localStorage.setItem("gamepind_gp_playSource", this._query['gp_playSource'])
				this.server.userLogin({
					token: access_token,
					clientSystemInfo: { deviceId: device_id, property: this._query['property'], uiLanguage: slib.i18n.language }
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
							//添加openId日志
							this.api.systemInfo.deviceId = data.openId;

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
						console.error("Gamepind server login rep failed", err)
						//this.server.gamepindAuth()
						this.reAuth();
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
					})
			} else if (order_id) {
				devlog.info("Gamepind reAuth token");
				//this.reAuth();
				let tmp_access_token = localStorage.getItem("gamepind_access_token");
				let tmp_deviceId = localStorage.getItem("gamepind_device_id");
				(this.api.userData as UserData).token = tmp_access_token;
				(this.api.userData as UserData).ext1 = this.mode == "develop" ? this.debug_redirect_uri : this.release_redirect_uri;
				(this.api.userData as UserData).ext2 = tmp_deviceId;
				(this.api.userData as UserData).ext3 = order_id;

				this.server.userLogin({
					token: tmp_access_token,
					clientSystemInfo: { deviceId: tmp_deviceId, property: this._query['property'], uiLanguage: slib.i18n.language }
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
							//添加openId日志
							this.api.systemInfo.deviceId = data.openId;

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
						console.error("Gamepind server login rep failed", err)
						//this.server.gamepindAuth()
						this.reAuth();
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.NETWORK_ERROR))
					})
			}
			else {
				let userId = localStorage.getItem('sdk_glee_userId')
				let nUserId = parseInt(userId)
				if (isNaN(nUserId)) {
					nUserId = undefined
				}

				GamepindReLoginAndRedirect('https://secure.gamepind.com/cas/v1/open-id/oauth/4021?redirect_uri=https://rainbowfarm.gamepind.com&device_id=b3b80786cb553578&source=Browser&property=PP_PAYTM');
				/*
				this.server.loginTest({ loginCode: nUserId }, (resp) => {
					//玩家数据
					if (resp.succeed) {
						const data = resp.data
						const userdata = this.api.userData
						userdata.channelId = data.channelId
						userdata.createTime = data.createTime
						userdata.userId = data.userId
						localStorage.setItem('sdk_glee_userId', `${data.userId}`)
						userdata.followGzh = data.followGzh
						userdata.nickName = data.nickname
						userdata.isNewUser = data.userNew

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
				*/
			}

			return ret.promise;
		}

		parseQuery() {
			if (window && window.location && window.location.search) {
				let query: string = window.location.search;
				console.warn("gdk Gamepind open url query: " + query);

				query = query.substr(1);
				let t = query.split(`&`)
				let t2 = {};
				this._query = {};
				t.foreach((e) => {
					let t3 = e.split(`=`);
					t2[t3[0]] = t3[1];
					this._query[t3[0]] = t3[1];
				})
			} else {
				console.warn("gdk Gamepind open url no query");
			}
		}

		reAuth() {
			devlog.warn("gdk Gamepind reAuth");
			let url: string = this.mode == "develop" ? this.debug_redirect_uri : this.release_redirect_uri;
			//let device: string = (this._query && this._query["device_id"]) ? this._query["device_id"] : "";
			let device: string = localStorage.getItem("gamepind_device_id")
			//let source: string = (this._query && this._query["gp_playSource"]) ? this._query["gp_playSource"] : "";
			//let source: string = localStorage.getItem("gamepind_gp_playSource")
			let source: string = "PowerPlay App"
			//let property: string = (this._query && this._query["property"]) ? this._query["property"] : "";
			let property: string = localStorage.getItem("gamepind_property")
			let domain: string = this.mode == "develop" ? this.debug_domain : this.release_domain;
			let mapper: string = "1677";

			this.server.gamepindAuth({ redirect_uri: url, device_id: device, source: source, property: property }, domain, mapper, function (data) {
				if (typeof (data) == 'string') {
					devlog.warn("gdk Gamepind gamepindAuth:" + data);
				} else {
					devlog.warn("gdk Gamepind gamepindAuth:" + JSON.stringify(data));
				}
			});
		}

		async showUserCenter() {
		}
		async showBindDialog() {
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
		checkIsUserBind(userId: number): boolean {
			return true;
		}
	}
}