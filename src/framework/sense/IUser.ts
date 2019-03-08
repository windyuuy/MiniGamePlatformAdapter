
namespace GDK {
	// export class LoginError extends ReqError { }

	/** 登录请求结果 */
	export class LoginResult {
		extra?: {
			userId: number,
			openId?: string,
			serviceTimestamp: number
			dataTimestamp: number//上次存档的时间戳
			nickname: string,
			profileImg: string,
			backupTime: number//上传存档时间 秒
			userNew: false,//是否为新用户
			service24Timestamp: number,//下一天0点的时间戳
			shareSwitch: {

			},
			followGzh: 0 | 1,//0 未关注,1 已关注
			gameCurrency: {
				gold: string,
				diamond: string,
				seed: string
			},
			createTime: number,//创建时间 毫秒
			channelId: number,//渠道id

			encryptKey: string,//存档加密key
			token: string,//登陆token
			heart: number,//心数量
			gametoken: string,
		}
	}

	/** 登录错误码 */
	// export const LoginErrorCode = {
	// 	...ReqErrorCode,
	// 	INVALID_OPENID: 10001,
	// }

	/** 登录结果模板 */
	// export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
	// 	...ReqResultTemplates.temps,
	// 	{ errcode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
	// ])

	/** 登录请求参数 */
	export class LoginParams extends ReqParams {
		/**
		 * 是否禁止游客登陆
		 */
		disableVisitor?: boolean = false;
		/**
		 * 是否允许Google登陆
		 */
		google?: boolean = false;

		/**
		 * 是否允许facebook登陆
		 */
		facebook?: boolean = false;

		/**
		 * 是否允许自动登陆
		 * * 如果当前未绑定任何第三方账号，则执行游客登陆
		 * * 否则，执行第三方账号的自动登陆
		 */
		autoLogin?: boolean = true;
	}

	export class LoginPromise extends Promise<LoginResult>{ }

	// export class LoginCallbacks extends ReqCallbacks {
	// 	success?: (params: LoginResult) => void
	// 	fail?: (params: LoginError) => void
	// }

	// export interface LoginDelegate {
	// 	login(params: LoginParams, callbacks: LoginCallbacks): void;
	// }

	// 自动生成
	/** 登录接口 */
	export interface IUser extends IModule {
		/** 登录 */
		login(params?: LoginParams): Promise<LoginResult>
		/** 检查登录态是否过期 */
		checkSession?(params?: ReqParams): Promise<void>

		/** 更新用户数据 */
		update(): Promise<UserDataUpdateResult>
		/** 获取用户云端数据 */
		getFriendCloudStorage(obj: {
			keyList: string[],
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[],
		}): Promise<{ data: UserGameData[] }>;
		/** 提交用户云端数据 */
		setUserCloudStorage(obj: {
			KVDataList: KVData[],
			/**
			 * - 玩一玩和浏览器必须
			 * - 格式形如（null开头）：
			 * 	- [null, 'goldRank', 'seedRank', 'unlockRank', 'sceneRank',]
			 **/
			typeIndex: string[],
		}): Promise<void>
	}
}
