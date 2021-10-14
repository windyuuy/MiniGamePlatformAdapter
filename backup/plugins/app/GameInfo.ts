
namespace AppGDK {

	export const AppInfoKeys = {
		advertPlatforms: "app.v1.advertPlatforms",
		advertPlatform: "app.v1.advertPlatform",
	}

	for (let key in AppInfoKeys) {
		AppShare.PayFlow.AppInfoKeys[key] = AppInfoKeys[key]
	}

	export class GameInfo extends GDK.GameInfoBase {
		init() {
		}
	}
}