
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export class MetaInfoBase implements IMetaInfo {
		pluginName: string = "unkown";
		pluginVersion: string = "unkown";
		apiPlatform: string = "unkown";
		apiPlatformLocale: string = "unkown";
	}
}
