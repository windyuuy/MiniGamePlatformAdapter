namespace GDK {

	export class GDKConfigV2{
		/**
		 * 游戏参数列表
		 */
		appInfo:AppInfo

		/**
		 * 游戏的版本号
		 */
		gameVersion:string

		/**
		 * 服务器对象
		 */
		httpClient: slib.HttpGameClient
		
		/**
		 * 获取当前服务器时间
		 */
		getServerTime: () => Date;
	}

	export type AdvertsAllPlatforms = "ironsource" | "adtiming" | "gdtadvert"

}