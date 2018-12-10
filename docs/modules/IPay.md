### **payPurchase(item: PayItemInfo,options: PayOptions): Promise**
- 调起支付
- 参数定义

```typescript
type PayItemInfo = {
	/** 我们的商品ID */
	goodsId: number = 0
	/** 后台二级货币ID */
	coinId?: number = 0
	/** 支付金额 */
	money: number = 0
	/** 购买商品数量 */
	amount: number = 0
	/** 商品名称/标题 */
	title: string = ""
	/** 支付货币单位 */
	currencyUnit?: "CNY" | "Dollor" = "CNY"
}

```


```typescript
enum WebViewOrientation {
	portrait = 1,
	landscapeLeft = 2,
	landscapeRight = 3
}

```


```typescript
type ChannelType = "miniapp" | "origion"

```


```typescript
type PayOptions = {
	/** 屏幕方向 */
	gameOrientation?: WebViewOrientation
	/**
	 * 渠道
	 * - 平台自带支付 'origion'
	 * - 跳转小程序支付 'miniapp'
	 **/
	channelType?: ChannelType
	// 这个参数代表不同数据库分区
	/**
	 * 每日给力支付app分区 ID
	 * - 0 测试版
	 * - 1 fox应用
	 * - 2 海洋馆应用
	 * @default 1
	 */
	gleeZoneId?: number
	/**
	 * 微信支付分区ID
	 * @default "1"
	 */
	wxZoneId?: string
}

```

