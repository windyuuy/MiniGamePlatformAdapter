### **keyboard**
- 系统键盘对象


### **showLoading(object: ShowLoadingParams): Promise**
- 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
- 参数定义

```typescript
type ShowLoadingParams = {
	/** 提示的内容 */
	title: string
}

```


### **hideLoading(): Promise**
- 隐藏 loading 提示框


### **showToast(object: ShowToastOptions): Promise**
- 显示消息提示框
- 参数定义

```typescript
type ShowToastOptions = {
	/**
	 * 提示的内容
	 */
	title: string

	/**
	 * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
	 */
	duration?: number
}

```


### **hideToast(): Promise**
- 隐藏消息提示框


### **showConfirm(object: ShowConfirmOptions): Promise**
显示模态对话框
- 有`确定`和`取消`两个按钮
- 参数定义

```typescript
type ShowConfirmOptions = {
	/**
	 * 提示的标题
	 */
	title: string

	/**
	 * 提示的内容
	 */
	content: string
}

```


### **showAlert(object: ShowAlertOptions): Promise**
显示模态对话框
- 只有`确定`一个按钮
- 参数定义

```typescript
type ShowAlertOptions = {
	/**
	 * 提示的标题
	 */
	title: string

	/**
	 * 提示的内容
	 */
	content: string
}

```

