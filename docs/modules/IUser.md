### ** * login(params: LoginParams): Promise**
- 登录
- ***参数定义***

```typescript
type LoginParams = {
	pkgName?: string // oppo 包名
	/**
	 * 是否禁止游客登陆
	 */
	disableVisitor?: boolean = false
	/**
	 * 是否允许Google登陆
	 */
	google?: boolean = false

	/**
	 * 是否允许facebook登陆
	 */
	facebook?: boolean = false

	/**
	 * 是否静默登陆
	 */
	silent?: boolean = false

	/**
	 * 是否允许自动登陆
	 * * 如果当前未绑定任何第三方账号，则执行游客登陆
	 * * 否则，执行第三方账号的自动登陆
	 */
	autoLogin?: boolean = true
}

```


### ** * showUserCenter(): Promise**
显示用户中心
* APP平台支持


### ** * checkSession(params: ReqParams): Promise**
- 检查登录态是否过期
- ***参数定义***

```typescript
type ReqParams = {
	/** 超时时间(s) */
	timeout?: TSeconds
	/** 平台 */
	platform?: string
}

```


```typescript
type TSeconds = number

```


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

