namespace GDK {
	export class BannerStyle {
		/** banner 广告组件的左下角横坐标 */
		x: number
		/** banner 广告组件的左下角纵坐标 */
		y: number
		/** banner 广告组件的宽度 */
		width: number
		/** banner 广告组件的高度 */
		height: number
	}

	export interface IRewardedVideoAd {
		//属性
		adUnitId: string
		/** 隐藏 激励视频 广告 */
		load(): Promise<void>
		/** 显示 激励视频 广告 */
		show(): Promise<void>
		/** 隐藏 激励视频 广告 */
		onLoad(callback: Function)
		/** 取消监听 激励视频 广告加载事件 */
		offLoad(callback: Function)
		/** 监听 激励视频 广告错误事件 */
		onError(callback: Function)
		/** 取消监听 激励视频 广告错误事件 */
		offError(callback: Function)
		/** 监听用户点击 关闭广告 按钮的事件 */
		onClose(callback: (params: {
			/** 视频是否是在用户完整观看的情况下被关闭的 */
			isEnded: boolean
		}) => void)
		/** 取消监听用户点击 关闭广告 按钮的事件 */
		offClose(callback: Function)
	}

	export interface IBannerAd {
		//属性
		/** 微信，广告单元ID，用于后台配置统计相关 */
		adUnitId?: string
		/**
		 * - QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0)
		 * 	- viewId 1001、1002 手机qq 7.6.5 支持原生游戏（cocos/laya/ergret），不支持H5游戏（使用DOM的游戏）
		 * 	- viewId 1003 仅在手机qq 7.8.5支持。 支持原生游戏（cocos/laya/ergret），支持H5游戏（使用DOM的游戏）
		 **/
		viewId?: number

		/** 显示 banner 广告。 banner 广告将从屏幕下方推入。 */
		show(): Promise<void>
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
			/** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
			viewId: number,
			/** banner 广告组件的样式 */
			style: BannerStyle
		}): IBannerAd
	}
}
