/// <reference path="Common.ts" />
namespace AppGDK {
    const devlog = Common.devlog

    export class AdvertV2 implements GDK.IAdvertV2 {
        api?: GDK.UserAPI

        async createAdvertUnit(createInfo: GDK.AdCreateInfo): Promise<GDK.IAdvertUnit> {
            let adUnit = new AdvertUnit(createInfo)
            return adUnit
        }
        isAdvertTypeSupported(advertType: GDK.AdvertType): boolean {
            return AdvertUnitRaw.isAdvertTypeSupported(advertType)
        }
    }
}
