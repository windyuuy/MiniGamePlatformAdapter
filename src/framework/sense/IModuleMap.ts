namespace GDK {
	export interface IModuleMap {
		/** 用户管理 */
		user: IUser
		/** 用户信息 */
		userData: IUserData
		/** 游戏信息 */
		gameInfo: IGameInfo
		/** 系统信息 */
		systemInfo: ISystemInfo
		/** 系统管理 */
		apiSystem: IAPISystem
		/** 分享 */
		share: IShare
		/** 支付 */
		pay: IPay
		/** 广告 */
		advert: IAdvert
		/** 客服反馈 */
		customer: ICustomer
		/** 基本UI组件 */
		widgets: IWidgets
		/** 子域、排行榜相关 */
		subContext: ISubContext
		/** 平台特性 */
		support: ISupport
		/** 全局异常处理 */
		except: IExcept
		/** 用户授权相关 */
		auth: IAuth
		/** 硬件附加功能管理 */
		hardware: IHardware
	}
}