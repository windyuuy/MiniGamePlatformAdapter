
declare interface GAMESTATUSINFO_DRESSINFO {
	"atlas": string,
	"json": string
}

declare interface GAMESTATUSINFO {
	"svrIp": string,       //游戏推荐ip。开发者可忽略
	"gameVersion": string, //游戏版本号
	"isMaster": number,    //是否房主，1房主，0参加者
	"dressPath": Array<GAMESTATUSINFO_DRESSINFO>,//厘米秀衣服路径
	"gameId": number,      //游戏id
	"networkType": number,      //网络类型 1 电信 ，2 联通 ，3 移动  0: wifi或未知
	"roomId": number,               //房间号
	"platform": string,
	"openId": string, //当前用户的标识
	"spriteDesignHeight": number,//厘米秀小人spine动画的设计高度
	"QQVer": string, //手机qq版本
	"isFirstPlay": number,                 //是否第一次玩 1.第一次玩，0非第一次玩
	"skltPath": GAMESTATUSINFO_DRESSINFO, //厘米秀小人spine骨骼
	"port": number,  //推荐端口 开发者可忽略,
	"gameMode": number,
	"aioType": number,
	"avGameId": number,
	"avAccountType": number,
	"avRoomId": number,
	"sessionId"?: number,
	"devPlatform"?: string, //仅在开发环境下可以，手q环境下无该字段
	"avAppId"?: number,
	"src": number
	"sex": number //1 男 2 女
	gameParam: string //当使用其他玩家使用BK.QQ.shareToArk分享至手Q,并且填充扩展字段时，当前玩家就能从此处获取该数据。[详情](http://hudong.qq.com/docs/engine/engine/native/engine-server.html)
}

/**
 * 全局变量
 */
declare var GameStatusInfo: GAMESTATUSINFO;


declare namespace BK {

	export function onEnterForeground(callback: Function);
	export function onEnterBackground(callback: Function);
	export function onGameClose(callback: Function);
	export function onMaximize(callback: Function);
	export function onMinimize(callback: Function);
	export function onNetworkChange(callback: (obj: Object) => void);
	export function onGameShareComplete(callback: Function);
	export function onGameShare(callback: (obj: Object) => void);
	export function offEnterForeground(callback: Function);
	export function offGameClose(callback: Function);
	export function offMaximize(callback: Function);
	export function offMinimize(callback: Function);
	export function offNetworkChange(callback: (obj: Object) => void);
	export function offGameShareComplete(callback: (obj: Object) => void);
	export function offGameShare(callback: Function);

	export type HttpSuccObj = {
		statusCode: number	//	响应码
		headers: { [key: string]: string }		//	响应头，字符串键值对
		text: () => string		//	以字符串形式读取响应体
		arrayBuffer: () => ArrayBuffer	//	以ArrayBuffer形式读取响应体, 请求发生错误时返回大小为0的ArrayBuffer
		jsonObject: () => any		//	以JSON对象形式读取响应体,已经经过JSON.parse解析, 请求发生错误或响应体为空时返回null
	}
	export type HttpErrObj = {
		msg: string	//	错误原因，用于调试，不适合直接展示给用户
	}
	export type HttpRequestParams = {

		/**
		 * @param 请求URL，必填参数
		 */
		url: string,

		/**
		 * @param 请求方法，默认"GET"
		 */
		method?: string,

		/**
		 * @param 请求头，字符串键值对
		 */
		headers?: { [key: string]: string },

		/**
		 * @param 请求体，string或ArrayBuffer类型
		 */
		body?: string | ArrayBuffer, // json string

		/**
		 * @callback 请求成功回调，成功仅代表HTTP请求完成，不等同于请求成功200
		 * @augments succObj 请求成功回调参数
		 */
		success?: (succObj: HttpSuccObj) => void,

		/**
		 * @callback 请求失败回调，如连接超时等网络错误
		 * @augments succObj 请求失败回调函数参数
		 */
		fail?: (errObj: HttpErrObj) => void,

		/**
		 * @callback 请求结束回调，无论请求成功失败都会调用
		 */
		complete?: () => void,

		/**
		 * @callback 上传进度回调函数参数
		 * @augments succObj 上传进度回调函数参数
		 */
		uploadProgress?: (curr: number, total: number) => void,

		/**
		 * @callback 下载进度回调
		 * @augments succObj 下载进度回调函数参数
		 */
		downloadProgress?: (curr: number, total: number) => void,
	}

	export class Http {
		/**
		 * @method 发起http请求
		 * @augments params 请求参数
		 */
		static request(params: HttpRequestParams)
	}

	class LocalStorage {
		key(index: number): string
		getItem(key: string): string
		setItem(key: string, value: string): void
		removeItem(key: string): void
		clear(): void
	}
	export var localStorage: LocalStorage


	class SessionStorage {
		key(index: number): string
		getItem(key: string): string
		setItem(key: string, value: string): void
		removeItem(key: string): void
		clear(): void
	}
	export var sessionStorage: SessionStorage


	const enum WebViewOrientation {
		portrait = 1,
		landscapeLeft = 2,
		landscapeRight = 3
	}

	export type PayItemInfo = {
		itemId: number,
		itemNum: number,
	}

    /**
     * 要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
     */
	export enum RankType {
		FriendsRank = 0,
		GroupRank = 1,
		DiscussionGroupRank = 2,
	}

	export type GameResultData = {
		"infoList":               //通用数据上报列表
		{
			"type": number,         //必选。数据类型。
			"op": number,           //必选。运营类型。1表示增量，2表示存量。
			"num": number,          //必选。数目。不超过32位有符号数。
			"extId"?: number         //可选。扩展Id。用于特殊数据的上报，如果要填，不能是0。
		}[],

		//以下字段为兼容历史，优先使用上面的“通用数据上报”。
		"baseInfo"?: {              //基本信息
			"score": number,           //分数
			"gameMode": number,         //游戏模式。1：普通，2：挑战
			"playWay": number,          //互动方式。1：单人，2：邀请好友，3：被好友邀请，4：匹配赛
		},
		"playerAttr"?: {            //玩家属性（可选）
			"level": number,            //玩家的经验等级（时间积累）
			"danLevel": number,         //玩家的战力等级（游戏技能）
			"power": number           //玩家战斗力
		},
		"passInfo"?: {              //过关信息（可选）
			"passNum": number,          //本局游戏通过的最高关卡数，比如本局游戏通过了8,9,10关，上报10（不关注以前是否通过第10关）
			"passList": {         //本局游戏通过的关卡列表
				"index": number,        //第几关
			}[],
			"upPassNum": number         //本局游戏新通过关卡数，比如通过了8,9,10关,9,10是以前没有通过的，上报2
		}
	}

	//手Q相关
	export class QQ {
		static fetchOpenKey(callback: (errCode: number, cmd: string, data: any) => void): void;
		static getRankListWithoutRoom(attr: string, order: number, rankType: RankType, callback: (errCode, cmd, data) => void);
		static uploadScoreWithoutRoom(gameMode: number, data: QQRankData, callback: (errCode: number, cmd: string, data: any) => void): void;
		static uploadScoreWithoutRoom(gameMode: number, data: QQRankData, callback: (errCode: number, cmd: string, data: any) => void): void;
		static reportGameResult(gameResultData: GameResultData, callback: (errCode, cmd, data) => void): void;

        /**
         * - gameOrientation  //1（默认，竖屏）2.横屏（home键在左边）3.横屏 （home键在右边）
         * - transparent 是否透明
         * - itemList 道具列表
         * - callback 形如 function(errCode,data)
         *  - errCode
         *      - errCode == 0 代表购买成功
         *      - errCode != 0代表购买失败
         *      - 35308	道具没有配置
         *      - 35311	道具已下架
         *      - 35312	绝版道具已过期
         *      - 35313	用户已经拥有该道具
         *      - 35315	所选的道具有多种货货类型
         *      - 35316	用户货币余额不足
         */
		static qPayPurchase(gameOrientation: WebViewOrientation, transparent: boolean, itemList: Array<PayItemInfo>, callback: (errCode: number, data: {
			code: number,
			success: boolean,
			itemList: PayItemInfo[],
			gameId: number,
		}) => void): void;
	}

	export class Buffer {
		/**
		 * 表示游标pointer是否到达Buffer末尾
		 */
		eof: boolean;

		/**
		 * 已写入的最大数据量
		 */
		length: number;

		/**
		 * 预分配的缓存容量
		 */
		capacity: number;

		/**
		 * 是否以网络序写入数据
		 */
		netOrder: boolean;

		/**
		 * 指针
		 */
		pointer: number;

		/**
		 * 
		 * @param length buffer长度
		 * @param netOrder 是否为网络字节序 1为网络序，0非网络序
		 */
		constructor(length?: number, netOrder?: number);

		/**
		 * 
		 * @param length 
		 * @param netOrder 是否为网络字节序  true为网络序，false非网络序
		 */
		constructor(length: number, netOrder?: boolean);

		rewind(): void;

		jumpBytes(n: number): void;

		readStringBuffer(): string;

		readUint8Buffer(): number;

		readUint16Buffer(): number;

		readUint32Buffer(): number;

		readInt8Buffer(): number;

		readInt16Buffer(): number;

		readInt32Buffer(): number;

		readFloatBuffer(): number;

		readDoubleBuffer(): number;

		readBuffer(length: number): BK.Buffer;

		readAsString(needTerminal?: boolean): string;

		readUint64Buffer(): number;

		writeBuffer(buf: BK.Buffer): void;

		writeUint8Buffer(num: number): void;

		writeUint16Buffer(num: number): void;

		writeUint32Buffer(num: number): void;

		writeInt8Buffer(num: number): void;

		writeInt16Buffer(num: number): void;

		writeInt32Buffer(num: number): void;

		writeFloatBuffer(num: number): void;

		writeDoubleBuffer(num: number): void;

		writeStringBuffer(str: string): void;

		writeUint64Buffer(num: number): void;


		writeAsString(s: string, needTerminal?: boolean): void;
		/**
		 * 返回buffer长度
		 * 单位为:字节
		 * @returns {number} 
		 * 
		 * @memberof Buffer
		 */
		bufferLength(): number;

		/**
		 * 销毁
		 * 
		 * @memberof Buffer
		 */
		releaseBuffer(): void;

		/**
		 * 将游标pointer重置为0
		 */
		rewind(): void;

		/**
		 * 将游标pointer移动bytes字节
		 * @param {number} bytes 
		 */
		jumpBytes(bytes: number): void;

		/**
		 * 截断已写入的数据缓存
		 * @param {number} bytes 想要截断的数据量
		 * @e.g. Buf.length = 512; Buf.truncateBytes(50); 那么Buf剩余已写入数据量为462
		 */
		truncateBytes(bytes: number): void;

		/**
		 * 扩展
		 * @param num 
		 */
		expandToBytes(num: number): void;
	}

	export interface HeadBufferInfo {
		buffer: BK.Buffer,
		width: number,
		height: number
	}

	export namespace MQQ {

		export class Webview {
            /**
             * 打开一个webview
             * 
             * @static
             * @param {string} url 
             * 
             * @memberof Webview
             */
			static open(url: string): void;

            /**
             * 监听已打开webview的消息
             * @param callback 
             */
			static onMessageHandle(callback: (cmd: string, data: any) => void);

            /**
             * 打开透明webview
             * @param url 
             * @param gameOrientation 
             */
			static openTransparent(url: string, gameOrientation: number);
		}

		export class SsoRequest {
            /**
             * 发送SSO消息
             * 
             * @static
             * @param {object} obj 请求的数据
             * @param {string} cmd 命令字
             * 
             * @memberof SsoRequest
             */
			static send(obj: object, cmd: string);

			/**
			* H5 与终端通信
			* 
			* @static
			* @param {object} obj 请求的数据
			* @param {string} cmd 命令字
			* 
			* @memberof SsoRequest
			*/
			static sendTo(obj: object, cmd: string);

            /**
             * H5 与终端通信
             * 
             * @static
             * @param {object} obj 请求的数据
             * @param {string} cmd 命令字
             * 
             * @memberof SsoRequest
             */
			static sendSSO(obj: object, cmd: string);



            /**
             * 添加某个对象监听某个命令
             *
             * @static
             * @param cmd  命令字
             * @param target 绑定的对象
             * @param callback 回调函数
             */
			static addListener(cmd: string, target: Object, callback: (errCode: number, cmd: string, data: any) => void);

            /**
             * 移除某个对象对某个命令的事件监听
             * 
             * @static
             * @param {string} cmd 命令字
             * @param {Object} targer 待解除绑定的对象
             * 
             * @memberof SsoRequest
             */
			static removeListener(cmd: string, targer: Object);

			static listenerInfos: Array<any>;

            /**
             * 终端->js回调
             * 
             * @memberof SsoRequest
             */
			static callback(errCode: number, cmd: string, data: any);

			//

		}

		export class Account {
            /**
             * 获取头像信息
             * 
             * @static
             * @param {string} openId 
             * @param {(openId:string,BuffInfo:HeadBufferInfo)=>void} callback 
             * 
             * @memberof Account
             */
			static getHead(openId: string, callback: (openId: string, BuffInfo: HeadBufferInfo) => void)

            /**
             * 获取昵称
             * 
             * @static
             * @param {string} openId 
             * @param {(openId:string,nick:string)=>void} callback 
             * 
             * @memberof Account
             */
			static getNick(openId: string, callback: (openId: string, nick: string) => void)

			static getHeadEx(openId: string, callback: (openId: string, imgUrl: string) => void);
		}
	}

	export namespace Advertisement {
		export enum AdvertErrorCode {
			/** 成功 */
			SUCCESS = 0,
			/** 其它错误 */
			UNKNOWN = 1,
			/** 请求过于频繁（每分钟最多30次请求） */
			TOO_FREEQUENT = 2,
			/** 网络错误 */
			NETWORK_ERROR = 3,
			/** 请求广告参数错误 */
			INVALID_PARAMS = 4,
			/** 没有广告 */
			INVALID_ADVERT = 5,
			/** 服务器错误 */
			SERVER_ERROR = 6,
			/** 广告数据规格与指定样式不匹配 */
			INVALID_PARAMS_SPEC = 7,
		}
		/**
		 * 视频广告对象
		 */
		export class VideoAd {
			/** 展示 */
			show(): void
			/** 监听加载成功回调 */
			onLoad(callback)
			/** 取消监听加载成功回调 */
			offLoad(callback): void
			/** 监听拉取失败事件 */
			onError(callback: (code: AdvertErrorCode, msg: string) => void)
			/** 移除拉取失败事件 */
			offError(callback): void
			/** 监听视频开始播放事件 */
			onPlayStart(callback)
			/** 取消视频开始播放事件 */
			offPlayStart(callback): void
			/** 监听视频结束播放事件 */
			onPlayFinish(callback)
			/** 取消监听视频结束播放事件 */
			offPlayFinish(callback): void
			/** 监听视频界面关闭事件 */
			onClose(callback)
			/** 取消监听视频界面关闭事件 */
			offClose(callback): void
		}

		export class BannerAd {
			/** 展示 */
			show(): void
			/** 隐藏 */
			hide(): void
			/** 销毁 */
			destory(): void
			/** 监听加载成功回调 */
			onLoad(callback)
			/** 取消监听加载成功回调 */
			offLoad(callback): void
			/** 监听拉取失败事件 */
			onError(callback: (code: AdvertErrorCode, msg: string) => void)
			/** 移除拉取失败事件 */
			offError(callback): void
		}

		/**
		 * - 创建一个视频广告
		 * - 手Q版本:7.6.5
		 */
		export function createVideoAd(): VideoAd
		export function createBannerAd(params: { viewId: number, style?: { x: number, y: number } }): BannerAd
	}

}