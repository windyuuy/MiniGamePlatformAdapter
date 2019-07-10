
declare namespace qg {

	export class OPPO_SystemInfo {
		COREVersion: string//版本号
		brand: string//手机品牌	
		language: string//当前环境设置的语言	
		model: number//手机型号	
		platform: string//客户端平台	
		system: string//操作系统版本	
		pixelRatio: number//设备像素比
		screenHeight: number//屏幕高度
		screenWidth: number//屏幕宽度
		windowHeight: number//可使用窗口高度
		windowWidth: number//可使用窗口宽度
	}

	export function authorize(params: object): void;
	export function pay(params: object): void;

	export function onHide(callback: Function): void;
	export function offHide(callback: Function): void;
	export function onShow(callback: Function): void;
	export function offShow(callback: Function): void;
	export function onError(callback: Function): void;
	export function offError(callback: Function): void;

	export function exitApplication(): void;

	export function getLaunchOptionsSync(): object;
	export function getSystemInfoSync(): any;

	export function showKeyboard(params: object): void;
	export function hideKeyboard(params: object): void;

	export function initAdService(params: object): void;
	export function createRewardedVideoAd(params: object): GDK.IRewardedVideoAd;
	export function createBannerAd(params: object): GDK.IBannerAd;

	export function setLoadingProgress(params: object);
	export function loadingComplete(params: object);
	export function setEnableDebug(params: object);

	export function getClipboardData(params: object);
	export function setClipboardData(params: object);
	export function onUpdateReady(callback: Function);
	export function applyUpdate();
	export function showDialog(params: object);
	export function vibrateLong();
	export function vibrateShort();
	export function triggerGC();
	export function getPerformance(): { now: Function };

	export function getScreenBrightness(params: object);
	export function setScreenBrightness(params: object);
	export function setKeepScreenOn(params: object);
	export function getNetworkType(params: object);
	export function subscribeNetworkStatus(callback: Function);

	export function getStorageSync(params: { key: string, value?: string }): string;
	export function setStorageSync(params: { key: string, value?: string }): string;
}
