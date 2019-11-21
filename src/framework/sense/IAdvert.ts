namespace GDK {
	export class BannerStyle {
		/** banner 广告组件的左下角横坐标 */
		x?: number
		/** banner 广告组件的左下角纵坐标 */
		y?: number
		/** banner 广告组件的宽度 */
		width?: number
		/** banner 广告组件的高度 */
		height?: number
		/** banner 广告组件的左上角纵坐标 */
		top?: number
		/** banner 广告组件的左下角横坐标 */
		left?: number
	}

	export class BannerStyleAccessor {
		x?: number
		y?: number
		/**
		 * banner 广告组件的左上角横坐标
		 */
		left: number
		/**
		 * banner 广告组件的左上角纵坐标
		 */
		top: number
		/**
		 * banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。
		 */
		width: number
		/**
		 * banner 广告组件的高度
		 */
		height: number
		/**
		 * banner 广告组件经过缩放后真实的宽度
		 */
		realWidth: number
		/**
		 * banner 广告组件经过缩放后真实的高度
		 */
		realHeight: number
	}

	export class RewardedVideoAdOnErrorParam {
		errMsg: string
		errCode: number
	}
	export class InterstitialAdOnErrorParam extends RewardedVideoAdOnErrorParam {
	}
	export class FullscreenAdOnErrorParam extends RewardedVideoAdOnErrorParam {
	}

	export class RewardVideoAdLoadParams {
		placementId?: string
	}

	export class VideoAdSlot {
		adPlatform: string
		slotId: string
		adPriority: number
		appId?: string
	}

	export interface IRewardedVideoAd {
		//属性
		adUnitId: string
		/** 隐藏 激励视频 广告 */
		load(loadParams?: RewardVideoAdLoadParams): Promise<void>
		/** 显示 激励视频 广告 */
		show(
			/**
			 * 目前仅广点通广告支持使用这个参数
			 */
			loadParams?: RewardVideoAdLoadParams
		): Promise<void>
		/**
		 * - 监听 激励视频 广告加载完成
		 * - 执行顺序：
		 *  - 后加后执行
		 * - 用法示例：
		 * ```typescript
		 * onLoad(()=>{
		 * 	...
		 * })
		 * ```
		 */
		onLoad(callback: Function)
		/** 取消监听 激励视频 广告加载事件 */
		offLoad(callback: Function)
		/** 监听 激励视频 广告错误事件 */
		onError(callback: (res: RewardedVideoAdOnErrorParam) => void)
		/** 取消监听 激励视频 广告错误事件 */
		offError(callback: Function)
		/** 监听用户点击 关闭广告 按钮的事件 */
		onClose(callback: (params: {
			/** 视频是否是在用户完整观看的情况下被关闭的 */
			isEnded: boolean
		}) => void)
		/** 取消监听用户点击 关闭广告 按钮的事件 */
		offClose(callback: Function)

		readonly isAvailable?: boolean
		checkAvailable?(
			/**
			 * 目前仅广点通广告支持使用这个参数
			 */
			loadParams?: GDK.RewardVideoAdLoadParams
		): Promise<boolean>
	}

	/**
	 * 插屏广告（展示网页广告）
	 */
	export interface IInterstitialAd extends IRewardedVideoAd {
	}
	export interface IFullscreedVideoAd extends IRewardedVideoAd {
	}

	export interface IBannerAd {
		//属性
		/** 微信，广告单元ID，用于后台配置统计相关 */
		adUnitId?: string
		/**
		 * - QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0)
		 * 	- 1001、1002: （手机qq 7.6.5）支持原生游戏（cocos/laya/ergret），不支持H5游戏（使用DOM的游戏）
		 * 	- 1003: （仅在手机qq 7.8.5支持）支持原生游戏（cocos/laya/ergret），支持H5游戏（使用DOM的游戏）
		 **/
		viewId?: number
		/**
		 * 原生平台选填
		 */
		placementName?: string

		style: BannerStyleAccessor

		/** 显示 banner 广告。 banner 广告将从屏幕下方推入。 */
		show(): Promise<void>
		/** 隐藏 banner 广告。 banner 广告将从屏幕下方推入。 */
		hide(): Promise<void>
		/** 销毁 banner 广告 */
		destroy(): Promise<void>
		/** 监听隐藏 banner 广告 */
		onResize(callback: Function)
		/** 取消监听隐藏 banner 广告 */
		offResize(callback: Function)
		/**
		 * - 监听 banner 广告加载事件
		 * 	- 执行顺序：后加后执行
		 **/
		onLoad(callback: Function)
		/** 取消监听 banner 广告加载事件 */
		offLoad(callback: Function)
		/** 监听 banner 广告错误事件 */
		onError(callback: Function)
		/** 取消监听 banner 广告错误事件 */
		offError(callback: Function)
	}

	export class FeedAdStyle {
		/** feed 广告组件的左下角横坐标 */
		x?: number
		/** feed 广告组件的左下角纵坐标 */
		y?: number
		/** feed 广告组件的宽度 */
		width?: number
		/** feed 广告组件的高度 */
		height?: number
		/** feed 广告组件的左上角纵坐标 */
		top?: number
		/** feed 广告组件的左下角横坐标 */
		left?: number
	}

	export class FeedAdStyleAccessor {
		x?: number
		y?: number
		/**
		 * feed 广告组件的左上角横坐标
		 */
		left: number
		/**
		 * feed 广告组件的左上角纵坐标
		 */
		top: number
		/**
		 * feed 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。
		 */
		width: number
		/**
		 * feed 广告组件的高度
		 */
		height: number
		/**
		 * feed 广告组件经过缩放后真实的宽度
		 */
		realWidth: number
		/**
		 * feed 广告组件经过缩放后真实的高度
		 */
		realHeight: number
	}

	export interface IFeedAd {
		/**
		 * 样式设置
		 */
		style: FeedAdStyleAccessor

		/**
		 * 设置样式
		 */
		setStyle(value: GDK.FeedAdStyle): Promise<void>

		setClickZoneStyle(style: GDK.FeedAdStyle): Promise<void>

		/**
		 * 加载 feed 广告
		 */
		load(): Promise<void>

		/**
		 * 显示 feed 广告
		 */
		show(): Promise<void>

		/**
		 * 隐藏 feed 广告
		 */
		hide(): Promise<void>

		/**
		 * 销毁 feed 广告
		 */
		destroy(): Promise<void>

		/**
		 * 获取广告相关信息
		 */
		getDatas(): Promise<GDK.FeedAdDatas>

		/**
		 * 模拟点击广告
		 */
		performClick(): Promise<void>

		/**
		 * 模拟点击附加创意区域（点击下载或拨打电话）
		 */
		performCreativeClick(): Promise<void>

	}

	export interface VideoAdCreateParam {
		/** 广告单元 id */
		adUnitId?: string
		/** app平原生聚合广告填 */
		placementName?: string
	}


	export interface FullscreenVideoAdCreateParam extends VideoAdCreateParam {
	}
	export interface InterstitialAdCreateParam extends VideoAdCreateParam {
	}
	export interface BannerAdCreateParam {
		/** 广告单元 id */
		adUnitId?: string,
		/** QQ玩一玩 必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0) */
		viewId?: number,
		/** app平原生聚合广告填 */
		placementName?: string
		/** 刷新频率 */
		adIntervals?: number
		/** banner 广告组件的样式 */
		style: BannerStyle
	}

	export interface FeedAdDatas {
		datas: {
			iconUrl: string,
			imageUrl: string,
			imageUrlList: string[],
			title: string,
			description: string,
			source: string,
		},

		style: {
			realWidth: number,
			realHeight: number,
		},
	}

	export interface FeedAdCreateParam {
		/**
		 * 是否调试模式
		 */
		isDebugMode: boolean
		/** banner 广告组件的样式 */
		style: FeedAdStyle
	}

	export interface AdvertInitParams {
		/**
		 * 调试模式
		 */
		isDebug: boolean
	}

	export interface IAdvert extends IModule {
		/**
		 * 是否需要先初始化广告服务
		 */
		readonly needInitAdServiceFirst?: boolean

		/**
		 * 初始化广告服务
		 */
		initAdService?(params: AdvertInitParams): Promise<void>

		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
		createRewardedVideoAd(params: VideoAdCreateParam): IRewardedVideoAd

		/** 创建条幅广告对象 */
		createBannerAd(params: BannerAdCreateParam): IBannerAd
		/**
		 * 是否支持插屏广告
		 */
		readonly supportInterstitialAd?: boolean
		createInterstitialAd?(params: InterstitialAdCreateParam): GDK.IInterstitialAd

		/**
		 * @deprecated 是否支持全屏视频广告
		 */
		readonly supportFullscreenAd?: boolean
		/**
		 * 是否支持全屏视频广告
		 */
		readonly supportFullscreenVideoAd?: boolean
		/**
		 * 创建全屏广告
		 */
		createFullscreenVideoAd?(params: FullscreenVideoAdCreateParam): GDK.IInterstitialAd

		/**
		 * 是否支持信息流广告
		 */
		readonly supportFeedAd?: boolean

		/**
		 * 创建信息流广告
		 */
		createFeedAd?(params: FeedAdCreateParam): IFeedAd

		/**
		 * 切换广告平台
		 */
		selectAdvertPlatform?(params: {
			/**
			 * 广告平台
			 * - 安卓平台现有：
			 *  - `yomobadvert` yomob广告
			 *  - `gdtadvert` 广点通广告
			 *  - `ttadadvert` 穿山甲广告
			 * - ios平台现有：
			 *  - `gdtadvert` 广点通广告
			 *  - `budadadvert` 头条广告
			 */
			platform: string
		}): Promise<void>

		/**
		  * 切换广告平台
		  */
		initMultAdSlot?(params: VideoAdSlot[]): Promise<void>

	}
}
