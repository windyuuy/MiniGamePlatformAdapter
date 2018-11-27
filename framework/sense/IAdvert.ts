namespace GDK {
	export class BannerStyle {
		/** banner 广告组件的左上角横坐标 */
		left: number
		/** banner 广告组件的左上角纵坐标 */
		top: number
		/** banner 广告组件的宽度 */
		width: number
		/** banner 广告组件的高度 */
		height: number
	}

	export interface IRewardedVideoAd {
		//属性
		adUnitId: string
		/** 隐藏 激励视频 广告 */
		load(): Promise<{}>
		/** 显示 激励视频 广告 */
		show(): Promise<{}>
		/** 隐藏 激励视频 广告 */
		onLoad(callback: Function)
		/** 取消监听 激励视频 广告加载事件 */
		offLoad(callback: Function)
		/** 监听 激励视频 广告错误事件 */
		onError(callback: Function)
		/** 取消监听 激励视频 广告错误事件 */
		offError(callback: Function)
		/** 监听用户点击 关闭广告 按钮的事件 */
		onClose(callback: Function)
		/** 取消监听用户点击 关闭广告 按钮的事件 */
		offClose(callback: Function)
	}

	export interface IBannerAd {
		//属性
		adUnitId: string
		style: {
			left: number//		banner 广告组件的左上角横坐标	
			top: number//		banner 广告组件的左上角纵坐标	
			width: number//		banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。
			height: number//		banner 广告组件的高度
			realWidth: number//		banner 广告组件经过缩放后真实的宽度
			realHeight: number//		banner 广告组件经过缩放后真实的高度
		};
		/** 显示 banner 广告。 banner 广告将从屏幕下方推入。 */
		show(): Promise<{}>
		/** 隐藏 banner 广告。 banner 广告将从屏幕下方推入。 */
		hide(): void
		/** 销毁 banner 广告 */
		destroy(): void
		/** 监听隐藏 banner 广告 */
		onResize(callback: Function)
		/** 取消监听隐藏 banner 广告 */
		offResize(callback: Function)
		/** 监听 banner 广告加载事件 */
		onLoad(callback: Function)
		/** 取消监听 banner 广告加载事件 */
		offLoad(callback: Function)
		/** 监听 banner 广告错误事件 */
		onError(callback: Function)
		/** 取消监听 banner 广告错误事件 */
		offError(callback: Function)
	}

	export interface IAdvert extends IModule {
		createRewardedVideoAd(params: {
			/** 广告单元 id */
			adUnitId: string
		}): IRewardedVideoAd

		createBannerAd(params: {
			/** 广告单元 id */
			adUnitId: string,
			/** banner 广告组件的样式 */
			style: BannerStyle
		}): IBannerAd
	}
}
