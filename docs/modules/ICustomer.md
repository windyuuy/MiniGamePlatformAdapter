### **openCustomerServiceConversation(params: OpenParam)**
- 进入客服会话。
	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
- 参数定义

```typescript
type OpenParam = {
	/** 会话来源 */
	sessionFrom?: string = ""
	/** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话之后会收到一个消息卡片，通过以下三个参数设置卡片的内容 */
	showMessageCard?: boolean = false
	/** 会话内消息卡片标题 */
	sendMessageTitle?: string = ""
	/** 会话内消息卡片路径 */
	sendMessagePath?: string = ""
	/** 会话内消息卡片图片路径 */
	sendMessageImg?: string = ""
	/** 接口调用成功的回调函数 */
	success?: Function
	/** 接口调用失败的回调函数 */
	fail?: Function
	/** 接口调用结束的回调函数（调用成功、失败都会执行） */
	complete?: Function
}

```

