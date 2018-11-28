
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

}
