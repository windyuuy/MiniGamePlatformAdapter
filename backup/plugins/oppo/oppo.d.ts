
declare namespace qg {

	export interface BaseOptions {

		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: any) => void;

		/**
		 * 接口调用失败的回调函数
		 */
		fail?: (res?: any) => void;

		/**
		 * 接口调用结束的回调函数（调用成功、失败都会执行）
		 */
		complete?: (res?: any) => void;
	}

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

	export function login(params: object): void;
	export function pay(params: object): void;

	export function onHide(callback: Function): void;
	export function offHide(callback: Function): void;
	export function onShow(callback: Function): void;
	export function offShow(callback: Function): void;
	export function onError(callback: Function): void;
	export function offError(callback: Function): void;

	export function exitApplication(params: object): void;

	export function getLaunchOptionsSync(): object;
	export function getSystemInfoSync(): any;

	export function showKeyboard(params: object): void;
	export function hideKeyboard(params: object): void;

	export function initAdService(params: object): void;
	export function createRewardedVideoAd(params: object): object;
	export function createBannerAd(params: object): object;

	export function setLoadingProgress(params: object);
	export function loadingComplete(params: object);
	export function setEnableDebug(params: object);

	export function vibrateShort(params: {
		success: (res) => void,
		fail: (res) => void,
		complete?: (res) => void,
	});

	export function vibrateLong(params: {
		success: (res) => void,
		fail: (res) => void,
		complete?: (res) => void,
	});

	export class Performance {
		now(): number
	}
	export function getPerformance(): Performance
	export function triggerGC(): void

	export interface GetScreenBrightnessData extends BaseOptions {
		success?: (data: { value: number }) => void
	}

	export function getScreenBrightness(res: GetScreenBrightnessData): void
	export function setKeepScreenOn(res: { keepScreenOn: boolean } & BaseOptions): void
	export function setScreenBrightness(res: { value: number } & BaseOptions): void

	//https://developers.weixin.qq.com/minigame/dev/document/open-api/data/KVData.html
	export class KVData {
		key: string
		value: string
	}





}
