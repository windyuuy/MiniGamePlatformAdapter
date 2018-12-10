### **login(params: LoginParams): Promise**
- 登录
- 参数定义

```typescript
type LoginParams = {}

```


### **checkSession(params: ReqParams): Promise**
- 检查登录态是否过期
- 参数定义

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


### **updateUser(): Promise**
- 更新用户数据


### **getFriendCloudStorage(obj: ParamType): Promise**
- 获取用户云端数据
- 参数定义

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


### **setUserCloudStorage(obj: ParamType): Promise**
- 提交用户云端数据
- 参数定义

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

