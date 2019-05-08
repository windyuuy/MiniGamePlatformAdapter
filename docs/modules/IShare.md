### ** * share(data: ShareData): Promise**
分享到聊天窗口
* 如果目标平台没有明确的聊天窗口，则进行社会化分享。
* 如果当前环境无法分享，则分享失败
- ***参数定义***

```typescript
type ShareData = {
	/**
	 * 分享的标题内容
	 */
	title: string

	/**
	 * 分享的内容文本，某些目标不会使用该属性
	 */
	summary?: string

	/**
	 * 分享的图片url
	 */
	imageUrl: string

	/**
	 * 社会化分享所使用的网络图片
	 */
	socialPicUrl?: string

	/**
	 * 分享的数据
	 */
	data: { [key: string]: string }

	/**
	 * 使用微信分享版本
	 * 1、根据分享时加载的卡片验证
	 * 2、根据cancel按钮验证
	 * 3、根据活动卡片验证
	 */
	wxShareVersion?: number
}

```


### ** * socialShare(data: ShareData): Promise**
社会化分享
* 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
* 如果当前环境无法分享，则分享失败
- ***参数定义***

```typescript
type ShareData = {
	/**
	 * 分享的标题内容
	 */
	title: string

	/**
	 * 分享的内容文本，某些目标不会使用该属性
	 */
	summary?: string

	/**
	 * 分享的图片url
	 */
	imageUrl: string

	/**
	 * 社会化分享所使用的网络图片
	 */
	socialPicUrl?: string

	/**
	 * 分享的数据
	 */
	data: { [key: string]: string }

	/**
	 * 使用微信分享版本
	 * 1、根据分享时加载的卡片验证
	 * 2、根据cancel按钮验证
	 * 3、根据活动卡片验证
	 */
	wxShareVersion?: number
}

```


### ** * shareUrl(data: ShareUrlData): Promise**
分享网址
* 如果当前环境无法进行URL分享，则分享失败
* 当前仅 QQPlay 环境支持
- ***参数定义***

```typescript
type ShareUrlData = {
	/**
	 * 分享的标题内容
	 */
	title: string

	/**
	 * 分享的内容文本
	 */
	summary: string

	/**
	 * 分享的图片url
	 */
	imageUrl: string

	/**
	 * 分享的URL
	 */
	url: string

	/**
	 * 使用微信分享版本
	 * 1、根据分享时加载的卡片验证
	 * 2、根据cancel按钮验证
	 * 3、根据活动卡片验证
	 */
	wxShareVersion?: number
}

```


### ** * showShareMenu(): Promise**
显示分享菜单
* 微信平台必须调用该函数才会显示转发按钮
* QQ平台默认就有转发按钮


### ** * hideShareMenu(): Promise**
- 隐藏分享菜单


### ** * setShareMenuData(data: ShareData): Promise**
在某些平台可以设置分享按钮所分享的内容
* 微信支持
* QQplay 无效
- ***参数定义***

```typescript
type ShareData = {
	/**
	 * 分享的标题内容
	 */
	title: string

	/**
	 * 分享的内容文本，某些目标不会使用该属性
	 */
	summary?: string

	/**
	 * 分享的图片url
	 */
	imageUrl: string

	/**
	 * 社会化分享所使用的网络图片
	 */
	socialPicUrl?: string

	/**
	 * 分享的数据
	 */
	data: { [key: string]: string }

	/**
	 * 使用微信分享版本
	 * 1、根据分享时加载的卡片验证
	 * 2、根据cancel按钮验证
	 * 3、根据活动卡片验证
	 */
	wxShareVersion?: number
}

```


### ** * getShareParam(): Promise**
- 获取通过点击分享链接时或传递的参数


### ** * getShareTicket(): Promise**
- 获取通过点击分享链接时或传递的参数


### ** * getShareInfo(shareTicket: string): Promise**
获取分享的信息
* 当前仅微信环境有效

