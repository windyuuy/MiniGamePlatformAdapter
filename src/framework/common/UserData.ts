
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class UserDataBase implements IUserData {
		abstract openId: string
		abstract openKey: string
		/** 昵称 */
		abstract nickName: string
		/** 用户ID */
		abstract userId: number
		/** 是否新用户 */
		abstract isNewUser: boolean
		/** 用户头像 */
		abstract avatarUrl: string
		/** 上传存档时间(秒) */
		abstract backupTime: number
		/** 是否已关注公众号
		 * - 0 未关注
		 * - 1 已关注
		 **/
		abstract followGzh: 0 | 1
		/** 渠道id */
		abstract channelId: number
		/** 创建时间 */
		abstract createTime: number
		/**
		 * 性别
		 * - 0 未知
		 * - 1 男
		 * - 2 女
		 **/
		abstract sex: number

	}
}
