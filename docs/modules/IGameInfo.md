### **mode: "develop" | "test" | "release"**
游戏的启动模式，可以是：
- 开发
- 测试
- 发布


### **appId: string**
- 程序appid


### **gameChannelId: number**
- 游戏启动的渠道id


### **isPayInSandbox: boolean**
- 沙盒模式支付


### **payAppEnvVersion: "trial" | "release" | "develop"**
- 跳转支付app模式


### **offerId: string**
- 支付侧应用id


### **miniAppOfferId: string**
跳转小程序支付offerid
- 填对方小程序appid


### **shareProxyUrl: string**
分享结果检测的代理网址
* 仅微信使用


### **launchOptions: LaunchOptions**
- 小游戏启动时的参数。
- 参数定义

```typescript
type LaunchOptions = {
	/** 打开小游戏的场景值 */
	scene: number
	/** 打开小游戏的启动参数 query */
	query: { [key: string]: string }
	path?: string
	isSticky?: boolean
	/** shareTicket，详见获取更多转发信息 */
	shareTicket: string
	/**
	 * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。(参见后文注意) *
	 * - 部分版本在无referrerInfo的时候会返回 undefined，建议使用 options.referrerInfo && options.referrerInfo.appId 进行判断。
	 **/
	referrerInfo?: {
		/** 来源小程序、公众号或 App 的 appId */
		extraData: object
		/** 来源小程序传过来的数据，scene=1037或1038时支持 */
		appId: string
	}
}

```


### **gameVersion: string**
- 游戏版本号


### **gameId: number**
- 游戏id


### **gameType: number**
- 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏


### **requireCustomServicePay: boolean**
- 优先只启用客服跳转支付


### **requireMiniAppPay: boolean**
- 优先只启用小程序跳转支付

