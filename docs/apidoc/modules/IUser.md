### ** * login(params: LoginParams): Promise**
- 登录


### ** * setBindCallback(callback: (succ: boolean, data?: any) => void): void**
- 绑定回调


### ** * setRebootCallback(callback: () => void): void**
- 绑定回调


### ** * showUserCenter(): Promise**
显示用户中心
* APP平台支持


### ** * isNativeRealNameSystem(): void**
- 判断是否为本地实名制系统


### ** * showMinorInfo(info: string): Promise**
显示未成年人游戏描述信息
* APP平台支持


### ** * showRealNameDialog(userID: number,force: boolean): Promise**
显示实名制弹框，进入实名制流程
* APP平台支持
- @param force 是否强制


### ** * showBindDialog(): Promise**
显示账号绑定
* APP平台支持


### ** * bindUser(): Promise**
- bindUser(): Promise


### ** * checkSession(params: ReqParams): Promise**
- 检查登录态是否过期


### ** * updateUser(): Promise**
- 更新用户数据


### ** * getFriendCloudStorage(obj: ParamType): Promise**
获取用户云端数据
- oppo未处理
- ***参数定义***

```typescript
type ParamType = {
	keyList: string[]
	/**
	 * - 玩一玩和浏览器必须
	 * - 格式形如（null开头）：
	 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	 **/
	typeIndex: string[]
}

```


### ** * setUserCloudStorage(obj: ParamType): Promise**
提交用户云端数据
- oppo未处理
- ***参数定义***

```typescript
type ParamType = {
	KVDataList: KVData[]
	/**
	 * - 玩一玩和浏览器必须
	 * - 格式形如（null开头）：
	 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
	 **/
	typeIndex: string[]
}

```


### ** * checkIsUserBind(userId: number): void**
判断userId对应的用户是否绑定过社交账号
- @param userId 登录时服务器返回的userId


### ** * setLoginSupport(loginSupport: ParamType): void**

- ***参数定义***

```typescript
type ParamType = {
	google: boolean
	visitor: boolean
	facebook: boolean
	wechat: boolean
	gamecenter: boolean
	account: boolean
}

```


### ** * setAccountChangeListener(f: () => void): void**
- setAccountChangeListener(f: () => void): void

