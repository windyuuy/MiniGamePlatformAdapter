
namespace GDK {

	export const AppInfoKeys = {
		/**
		 * AppId
		 */
		appid: "glee.appid",

		/**
		 * 当前是否为测试模式，弃用mode
		 */
		test: "glee.test",

	}

	export abstract class GameInfoBase implements IGameInfo {
		api!: UserAPI

		get mode(): "develop" | "test" | "release" {
			return this.api.getAppInfoBoolean(AppInfoKeys.test, false) == true ? "develop" : "release"
		}

		get appId(): string {
			return this.api.getAppInfoString(AppInfoKeys.appid, "-1");
		}

		gameVersion: string = "1.0.0";

		abstract init?()

		async initWithConfig(info?: GDKConfigV2) {
			info = info ?? new GDKConfigV2()
			if (info.gameVersion) {
				this.gameVersion = info.gameVersion;
			}
			this.api.initAppinfo(info.appInfo);

			// CommonServer.getServerTime = info.getServerTime
			// CommonServer.httpClient = info.httpClient
		}

	}
}
