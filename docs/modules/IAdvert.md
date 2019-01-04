### **createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd**
是个单例
创建激励视频广告对象
- 参数定义

```typescript
type VideoAdCreateParam = {
	/** 广告单元 id */
	adUnitId?: string
}

```


### **createBannerAd(params: BannerAdCreateParam): IBannerAd**
- 创建条幅广告对象
- 参数定义

```typescript
type BannerAdCreateParam = {
	/** 广告单元 id */
	adUnitId?: string
	/** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
	viewId?: number
	/** banner 广告组件的样式 */
	style: BannerStyle
}

```


```typescript
type BannerStyle = {
	/** banner 广告组件的左下角横坐标 */
	x: number
	/** banner 广告组件的左下角纵坐标 */
	y: number
	/** banner 广告组件的宽度 */
	width: number
	/** banner 广告组件的高度 */
	height: number
}

```

