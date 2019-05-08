### ** * vibration: IVibration**
- 振动器
- ***参数定义***

```typescript
type IVibration = {
	/**
	 * 使手机发生较长时间的振动（400 ms)
	 */
	vibrateLong(): Promise<void>
	/**
	 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
	 */
	vibrateShort(): Promise<void>
}

```


### ** * performance: IPerformance**
- 性能
- ***参数定义***

```typescript
type IPerformance = {
	getMicroTime?(): TMicroSecond
	tryGC?(): void
	onMemoryWarning?(callback: (res: MemoryWarningInfo) => void): void
}

```


### ** * screen: IScreen**
- 屏幕亮度
- ***参数定义***

```typescript
type IScreen = {
	getBrightness(): Promise<BrightnessData>
	setBrightness(data: BrightnessData): Promise<void>
	setKeepScreenOn(res: { keepon: boolean }): Promise<void>
}

```


### ** * gyroscope: IGyroscope**
- 陀螺仪
- ***参数定义***

```typescript
type IGyroscope = {
	start?()
	stop?()
	onChange?()
}

```


### ** * compass: ICompass**
- 罗盘
- ***参数定义***

```typescript
type ICompass = {
	start?()
	stop?()
	onChange?()
}

```


### ** * battery: IBattery**
- 电池
- ***参数定义***

```typescript
type IBattery = {
	getInfo?()
	getInfoSync?()
}

```


### ** * accelerometer: IAccelerometer**
- 加速计
- ***参数定义***

```typescript
type IAccelerometer = {
	start?()
	stop?()
	onChange?()
}

```


### ** * gravity: IGravity**
- 设备方向
- 转屏相关
- 重力感应
- ***参数定义***

```typescript
type IGravity = {
	/**
	 * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听。
	 */
	onDeviceMotionChange?()
	/**
	 * 开始监听设备方向的变化。
	 */
	startDeviceMotionListening?()
	/**
	 * 停止监听设备方向的变化。
	 */
	stopDeviceMotionListening?()

	/**
	 * 取消监听横竖屏切换事件
	 */
	offDeviceOrientationChange?()
	/**
	 * 监听横竖屏切换事件
	 */
	onDeviceOrientationChange?()
}

```


### ** * screenTouch: IScreenTouch**
- 触屏
- ***参数定义***

```typescript
type IScreenTouch = {
	onStart?()
	offStart?()
	onMove?()
	offMove?()
	onEnd?()
	offEnd?()
	onCancel?()
	offCancel?()
}

```

