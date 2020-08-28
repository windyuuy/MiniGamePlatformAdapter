
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class AdvertV2Base implements IAdvertV2 {
		/**
		 * 是个单例
		 * 创建激励视频广告对象
		 */
		abstract createAdvertUnit(createInfo: AdCreateInfo): Promise<IAdvertUnit>
		abstract isAdvertTypeSupported(advertType: AdvertType): boolean
	}
}
