
declare namespace wx {

	export class UserInfo {
		avatarUrl: string//用户头像图片 url	
		city: string//用户所在城市	
		country: string//用户所在国家	
		gender: number//用户性别	
		language: string//显示 country province city 所用的语言	
		nickName: string//用户昵称	
		openId: string//用户 openId	
		province: string//用户所在省份
	}

	//https://developers.weixin.qq.com/minigame/dev/document/open-api/data/KVData.html
	export class KVData {
		key: string
		value: string
	}

	export class FileSystemManager {

	}

	//https://developers.weixin.qq.com/minigame/dev/document/open-api/data/UserGameData.html
	export class UserGameData {
		//用户的微信头像 url
		avatarUrl: string

		//用户的微信昵称
		nickname: string

		//用户的 openid
		openid: string

		//用户的托管 KV 数据列表
		KVDataList: KVData[]
	}

	export interface GetSystemInfoResult {

		/**
		 * 手机品牌
		 */
		brand: string;

		/**
		 * 手机型号
		 */
		model: string;

		/**
		 * 设备像素比
		 */
		pixelRatio: string;

		/**
		 * 屏幕宽度
		 */
		screenWidth: number;

		/**
		 * 屏幕高度
		 */
		screenHeight: number;

		/**
		 * 窗口宽度
		 */
		windowWidth: number;

		/**
		 * 窗口高度
		 */
		windowHeight: number;

		/**
		 * 状态栏的高度	
		 */
		statusBarHeight: number;

		/**
		 * 微信设置的语言
		 */
		language: string;

		/**
		 * 微信版本号
		 */
		version: string;

		/**
		 * 操作系统版本
		 */
		system: string;

		/**
		 * 客户端平台
		 */
		platform: string;

		/**
		 * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。	
		 */
		fontSizeSetting: number;

		/**
		 * 客户端基础库版本	
		 */
		SDKVersion: number;

		/**
		 * (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好 (目前设备最高不到50)	
		 */
		benchmarkLevel: number;
	}

}

declare namespace BK {

	export type QQRankData = {
		userData: {
			openId: string,
			startMs: string,    //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
			endMs: string,  //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
			scoreInfo: { [key: string]: number, },
		}[],
        /**
        - type 描述附加属性的用途
        - order 排序的方式，
        - 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
        - 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略（比如酷跑类游戏的耗时，时间越短越好）
        - 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上
        - 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
        - 如score字段对应，上个属性.
        */
		attr: {
			[key: string]: {
				type: string,
				order: number,
			}
		}
	}
}