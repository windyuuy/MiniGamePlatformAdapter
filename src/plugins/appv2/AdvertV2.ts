/// <reference path="Common.ts" />
namespace AppV2GDK {
    const devlog = Common.devlog

    export class AdvertV2 implements GDK.IAdvertV2 {
        api?: GDK.UserAPI

        /**
         * 创建广告单元
        */
        async createAdvertUnit(createInfo: GDK.AdCreateInfo): Promise<GDK.IAdvertUnit> {
            let adUnit = new AdvertUnit()
            await adUnit.init(createInfo)
            return adUnit
        }
        /**
         * 判断广告类型是否支持
        */
        isAdvertTypeSupported(advertType: GDK.AdvertType): boolean {
            return AdvertUnitRaw.isAdvertTypeSupported(advertType)
        }
    }
}
