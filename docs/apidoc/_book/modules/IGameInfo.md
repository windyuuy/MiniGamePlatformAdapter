### ** * mode: "develop" | "test" | "release"**
游戏的启动模式，可以是：
- 开发
- 测试
- 发布


### ** * appId: string**
- 程序appid


### ** * gameChannelId: number**
- 游戏启动的渠道id


### ** * isPayInSandbox: boolean**
- 沙盒模式支付


### ** * payAppEnvVersion: "trial" | "release" | "develop"**
- 跳转支付app模式


### ** * offerId: string**
- 支付侧应用id


### ** * miniAppOfferId: string**
跳转小程序支付offerid
- 填对方小程序appid


### ** * shareProxyUrl: string**
分享结果检测的代理网址
* 仅微信使用


### ** * launchOptions: LaunchOptions**
- 小游戏启动时的参数。


### ** * gameVersion: string**
- 游戏版本号


### ** * gameId: number**
- 游戏id


### ** * gameType: number**
- 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏


### ** * requireCustomServicePay: boolean**
优先只启用客服跳转支付
- 支持ios和安卓


### ** * requireMiniAppPay: boolean**
优先只启用小程序跳转支付
只支持安卓


### ** * requireIndiaSPSPay: boolean**
- requireIndiaSPSPay: boolean

