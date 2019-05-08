### ** * payPurchase(item: PayItemInfo,options: PayOptions): Promise**
- 调起支付
- ***参数定义***

```typescript
type PayOptions = {
	/** 屏幕方向 */
	gameOrientation?: WebViewOrientation
	/**
	 * 渠道
	 * - 平台自带支付 'origion'
	 * - 跳转小程序支付 'miniapp'
	 * - 跳转客服支付 'customer_service'
	 **/
	channelType?: ChannelType
	// 这个参数代表不同数据分区
	/**
	 * （正在弃用，用payUrl代替）每日给力支付app分区 ID
	 * - 0 测试版
	 * - 1 fox应用
	 * - 2 海洋馆应用
	 * - 3 外部项目
	 * @default 1
	 * @deprecated
	 */
	gleeZoneId?: number
	/**
	 * 用于代替gleeZoneId判断app分区
	 */
	payUrl?: string
	/**
	 * 微信支付分区ID
	 * @default "1"
	 */
	wxZoneId?: string

	/**
	 * - 副标题
	 * - 客服跳转支付，会话内消息卡片标题
	 */
	subTitle?: string
	/**
	 * - 客服跳转支付，会话内消息卡片图片路径
	 */
	imagePath?: string
	/**
	 * 自定义附加参数
	 */
	customExtra?: string
}

```


```typescript
type ChannelType = "miniapp" | "origion" | "customer_service"

```


```typescript
enum WebViewOrientation {
	portrait = 1,
	landscapeLeft = 2,
	landscapeRight = 3
}

```


```typescript
type PayItemInfo = {
	/** 我们的商品ID */
	goodsId: number = 0
	/** 后台二级货币ID */
	coinId?: number = 0
	/** 第三方后台商品id，原生app版该项必传 */
	productId?: string
	/** 支付金额 */
	money: number = 0
	/** 购买商品数量 */
	amount: number = 0
	/** 商品名称/标题 */
	title: string = ""
	/** 支付货币单位 */
	currencyUnit?: "CNY" | "Dollor" = "CNY"
	/** oppo包名 */
	pkgName?: string
	/** oppo登录返回的token */
	token?: string
	/** 订单创建时间 */
	timestamp?: string
	/** 支付签名 */
	paySign?: string
	/** oppo快游戏返回的订单号 */
	orderNo?: string
	/** 游戏在oppo快游戏的id */
	oppoId?: string
}

```


### ** * consumePurchase(params: ConsumePurchaseParams): Promise**
- 消耗商品
- ***参数定义***

```typescript
type ConsumePurchaseParams = {
	purchaseToken: string
}

```


### ** * queryItemInfo(params: PayQueryItemInfoParams): Promise**
- 查询未消耗商品信息
- ***参数定义***

```typescript
type PayQueryItemInfoParams = {
	productId: string
}

```

