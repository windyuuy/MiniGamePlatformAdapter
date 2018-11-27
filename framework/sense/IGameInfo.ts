namespace GDK {
	export interface IGameInfo {
		channelId: number
		clientSystemInfo: any
		launchOptionsPath: any
		launchOptionsQuery: any

		/** 沙盒模式支付 */
		isPayInSandbox: boolean
		/** 支付侧应用id */
		offerId: string

		init?()
	}

}
