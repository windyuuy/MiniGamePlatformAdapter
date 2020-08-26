### ** * addLocalNotices(notices: LocalPushBundle[]): Promise**
- 添加本地推送


### ** * removeLocalNoticeWithID(params: ParamType): Promise**
移除对应的推送
- identifier 和 identifiers 只有其中一个生效
- ***参数定义***

```typescript
type ParamType = {
	identifier?: string
	identifiers?: string[]
}

```


### ** * removeAllLocalNotices(): Promise**
- 移除所有推送


### ** * requireLocalNoticePermission(): Promise**
- 检查推送设置，如果没有权限则提示用户跳转开启


### ** * isLocalNoticeEnabled(): Promise**
- 用户是否开启通知权限

