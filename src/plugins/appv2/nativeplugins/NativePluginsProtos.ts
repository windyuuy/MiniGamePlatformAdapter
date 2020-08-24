
namespace UnityAppGDK {
    export class ServedLoginInfo {
        public loginNode!: string;
    }

    export class LoginServerResult {
        public rawData!: any;
        public serverData!: ServerData;
        public recordData!: RecordData;
    }

    export class ServerData {
        public gameCurrency!: GameCurrency;
        public serviceTimestamp!: number;
        public nickname!: string;
        public bindingInfo!: any[];
        public gender!: number;
        public encryptKey!: string;
        public custom!: string;
        public token!: string;
        public createTime!: number;
        public backupTime!: number;
        public followGzh!: 0 | 1;
        public holidays!: boolean;
        public heart!: number;
        public dataTimestamp!: number;
        public tableConf!: TableConf;
        public ad!: any;
        public verified!: boolean;
        public noticeSign!: string;
        public profileImg!: string;
        public service24Timestamp!: number;
        public verifiedInfo!: VerifiedInfo;
        public userNew!: boolean;
        public shareSwitch!: any;
        public channelId!: number;
        public gametoken!: string;
        public qa!: string;
        public openId!: string;
        public userId!: number;
    }

    export class GameCurrency {
        public diamond!: string;
        public seed!: string;
        public gold!: string;
    }

    export class TableConf {
        public tableSign!: string;
    }

    export class VerifiedInfo {
        public age!: number;
        public name!: string;
        public birthday!: string;
        public idCard!: string;
    }

    export class RecordData {
        public type!: string;
        public gameUserId!: string;
        public token!: string;
        public openId!: string;
        public head!: string;
        public bindingInfo!: any[];
        public gameRegDate!: number;
        public nickName!: string;
        public accountName!: string;
    }

    export class ServedBindInfo {
        public serverData!: ServerData;
        public visitorOpenId!: string;
        public loginNode!: string;
    }

    export class AdvertPreloadInfo {
        public advertType!: AdvertType;
    }

    export class AdvertType {
        public FeedAdvert!: string;
        public BannerAdvert!: string;
        public FullscreenVideoAdvert!: string;
        public RewardedVideoAdvert!: string;
        public InterstitialAdvert!: string;
    }

    export class AdPlatformConfigs {
        public defaultRewardedVideoAdvertPlacementId!: string;
        public defaultBannerAdvertPlacementId!: string;
        public appId!: string;
        public defaultFeedAdvertPlacementId!: string;
        public defaultFullscreenVideoAdvertPlacementId!: string;
    }

    export class AdCreateInfo {
        public advertType!: string;
        public appId!: string;
        public placementId!: string;
        public isDebug!: boolean;
    }

    export class CreateAdUnitResult {
        public info!: AdUnitQueryInfo;
    }

    export class AdUnitQueryInfo {
        public unitId!: string;
        public sdkName!: string;
        public placementId!: string;
        public advertType!: string;
    }

    export class AdUnitOpInfo {
        constructor(queryInfo: AdUnitQueryInfo, opInfo: ShowAdUnitOpInfo) {
            this.queryInfo = queryInfo
            this.opInfo = opInfo
        }
        public opInfo!: ShowAdUnitOpInfo;
        public queryInfo!: AdUnitQueryInfo;
    }

    export class ShowAdUnitOpInfo {
        public scene!: string;
    }

    export class ShowAdUnityResult {
        public couldReward!: boolean;
        public isEnded!: boolean;
    }

    export class SetAdUnitStyleInfo {
        public styleInfo!: AdUnitStyle;
        public queryInfo!: AdUnitQueryInfo;
    }

    export class AdUnitStyle {
        public width!: number;
        public top!: number;
        public x!: number;
        public y!: number;
        public height!: number;
        public bottom!: number;
    }

    export class AdUnitStatus {
    }

    export class AdUnitInfo {
        public advertType!: string;
        public sdkName!: string;
        public appId!: string;
        public placementId!: string;
    }

    export class AdvertEvent {
        public key!: string;
        public data!: any;
    }

    export class NotifyTemplate {
        public constructor(bundle : GDK.LocalPushBundle) {
            this.repeat = bundle.repeat || 0;
            this.badge = bundle.badge || 0;
            this.subtitle = bundle.subtitle || "";
            this.subText = "";
            this.identifier = bundle.identifier;
            this.soundName = bundle.soundName || "";
            this.enableLightTip = bundle.enableLightTip || false;
            this.userInfo = bundle.userInfo || "";
            this.isBigText = bundle.isBigText || false;
            this.ticker = bundle.ticker || "";
            this.content = bundle.content || "";
            this.title = bundle.title || "";
            this.enableVibrateTip = bundle.enableVibrateTip || false;
            this.availableStage = bundle.availableStage || 0;
            this.enableSoundTip = bundle.enableSoundTip || false;
            this.interval = bundle.interval;
        }
        public repeat!: number;
        public badge!: number;
        public subText!: string;
        public identifier!: string;
        public soundName!: string;
        public enableLightTip!: boolean;
        public userInfo!: string;
        public isBigText!: boolean;
        public ticker!: string;
        public content!: string;
        public title!: string;
        public enableVibrateTip!: boolean;
        public availableStage!: number;
        public subtitle!: string;
        public enableSoundTip!: boolean;
        public interval!: number;
    }

   export class AddNotifiesParams {
        public constructor() {
            this.notices = [];
        }
        public notices!: NotifyTemplate[];
    }

    export class RemoveLocalNotifiesParams {
        public identifiers!: string;
    }

    export class RemoveAllLocalNotifiesParams {
    }
}
