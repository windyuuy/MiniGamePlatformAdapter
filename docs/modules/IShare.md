### **share(data: ShareData)**
分享到聊天窗口
* 如果目标平台没有明确的聊天窗口，则进行社会化分享。
* 如果当前环境无法分享，则分享失败
- 参数定义

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
}

```


### **socialShare(data: ShareData)**
社会化分享
* 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
* 如果当前环境无法分享，则分享失败
- 参数定义

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
}

```


### **shareUrl(data: ShareUrlData)**
分享网址
* 如果当前环境无法进行URL分享，则分享失败
* 当前仅 QQPlay 环境支持
- 参数定义

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
}

```


### **showShareMenu()**
显示分享菜单
* 微信平台必须调用该函数才会显示转发按钮
* QQ平台默认就有转发按钮


### **hideShareMenu()**
- 隐藏分享菜单


### **setShareMenuData(data: ShareData)**
在某些平台可以设置分享按钮所分享的内容
* 微信支持
* QQplay 无效
- 参数定义

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
}

```


### **getShareParam()**
- 获取通过点击分享链接时或传递的参数

