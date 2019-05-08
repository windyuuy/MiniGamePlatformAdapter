### ** * addLocalNotices(notices: LocalPushBundle[]): Promise**
- 添加本地推送


### ** * removeLocalNoticeWithID(params: { identifier: string }): Promise**
- 移除对应的推送


### ** * removeAllLocalNotices(): Promise**
- 移除所有推送


### ** * requireLocalNoticePermission(): Promise**
- 检查推送设置，如果没有权限则提示用户跳转开启


### ** * isLocalNoticeEnabled(): Promise**
- 用户是否开启通知权限

