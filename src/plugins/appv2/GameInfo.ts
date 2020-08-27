
namespace AppV2GDK {
	export const AppInfoKeys = {
		advertPlatforms: "app.v2.advertPlatforms",
		advertPlatform: "app.v2.advertPlatform",
	}

	for(let key in AppInfoKeys){
		AppShare.PayFlow.AppInfoKeys[key]=AppInfoKeys[key]
	}

	export class GameInfo extends GDK.GameInfoBase {
		init() {
		}
	}
}