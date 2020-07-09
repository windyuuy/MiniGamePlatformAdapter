
namespace CS.Glee.Bridge {
    export class ChannelPluginWrapper {
        public sdkSystem: SDKSystemAddonWrapper;
        public user: UserAddonWrapper;
        public shop: ShopAddonWrapper;
        public adTracking: AdTrackingAddonWrapper;
        public analytics: AnalyticsAddonWrapper;
        public advert: AdvertAddonWrapper;
        public sdkCrash: SDKCrashAddonWrapper;
        public sdkPush: SDKPushAddonWrapper;
        public localPush: LocalPushAddonWrapper;
        public servedUser: ServedUserAddonWrapper;
        public servedShop: ServedShopAddonWrapper;
        public customService: CustomServiceAddonWrapper;
        public Init(sinfo: string, callbacks: NTaskCallback): void
    }

    export class PluginManager {
        public static GetInstance(): PluginManager

        public LoadPlugin(name: string): ChannelPluginWrapper

        public GetPlugin(name: string): ChannelPluginWrapper

    }
}
