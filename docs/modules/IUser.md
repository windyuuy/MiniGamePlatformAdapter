### **login(params: LoginParams)**
- 登录
- 参数定义

```typescript
type LoginParams = {}

```


### **checkSession(params: ReqParams)**
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


### **updateUser()**
- 更新用户数据


### **getFriendCloudStorage(obj: ParamType)**
- 获取用户云端数据
- 参数定义

```typescript
type ParamType = {
	keyList: string[]
}

```


### **setUserCloudStorage(obj: { KVDataList: KVData[] })**
- 提交用户云端数据

