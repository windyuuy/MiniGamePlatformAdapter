### ** * navigateToApp(params: AppCallUpParams): Promise**
- 跳转游戏


### ** * exitProgram(): Promise**
- 退出当前游戏


### ** * onShow(callback: (data: any) => void): void**
用法示例：
```typescript
onShow((data)=>{
	...
})
```


### ** * offShow(callback: Function): void**
- offShow(callback: Function): void


### ** * onHide(callback: Function): void**
用法示例：
```typescript
onHide(()=>{
	...
})
```


### ** * offHide(callback: Function): void**
- offHide(callback: Function): void


### ** * updateProgramForce(): Promise**
- 强制更新


### ** * setEnableDebug(res: { enableDebug: boolean }): Promise**
- 设置是否打开调试开关。此开关对正式版也能生效。


### ** * setFPS(fps: number): void**
- 设置帧率
	- 可能和cocos的会冲突


### ** * clipboard: IClipboard**
- 剪切板


### ** * getSafeArea(callback: ParamType): void**
获取屏幕的安全区域，单位像素
- @param callback
- ***参数定义***

```typescript
type ParamType = (data: {
	left: number
	right: number
	top: number
	bottom: number
}) => void

```


### ** * setLoadingProgress(params: { progress: number }): void**



### ** * openURL(url: string): void**
网页跳转
- @param url


### ** * startYunkefu(accessId: string,name: string,id: string,customField: Object,native: boolean): void**
- 开启云客服


### ** * hasNativeAssistantCenter(): void**
- 是否存在原生客服中心


### ** * showHackWeb(url: string,duration: number): void**
hack web
- @param url


### ** * setSDKLanguage(lang: string): void**
set native sdk language
- @param lang


### ** * nativeVersion: number**
- 原生版本号，具体看C++


### ** * sdkFrameworkVersion: string**
- SDK框架版本


### ** * gotoAppSystemSettings(params: IChooseDialogParams): Promise**
跳转app设置界面
- 目前只支持 android


### ** * checkAppSystemPermissions(params: ICheckPermissionParams): Promise**
检查是否已授予权限
- 目前只支持 android


### ** * getSDKMetaInfo(params: IGetSDKMetaInfo): Promise**
通过key获取原生SDK版本信息
- @param params


### ** * setAppInfo(key: string,value: string | number | boolean): void**
动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
- @param key
- @param value


### ** * getAppInfo(key: string): void**
获取应用AppInfo
- @param key


### ** * getAppInfoBoolean(key: string,def: boolean): void**
获取Boolean类型的数据，当遇到异常数据时，将返回默认值
- @param key
- @param def


### ** * getAppInfoNumber(key: string,def: number): void**
获取Number类型的数据，当遇到异常数据时，将返回默认值
- @param key
- @param def


### ** * getAppInfoString(key: string,def: string): void**
获取String类型的数据，当遇到异常数据时，将返回默认值
- @param key
- @param def


### ** * getResVersion(): void**
- 获取资源版本号

