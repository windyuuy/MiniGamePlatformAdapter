
namespace GDK {
	const devlog = new slib.Log({ tags: ["DEVELOP"] })

	export abstract class AuthBase implements IAuth {
		/**
		 * 创建用户信息授权按钮
		 * * 当前仅微信有效
		 */
		abstract createUserInfoButton(obj: IUserInfoButton): UserInfoButton | null

		/**
		 * 判断是否拥有获取用户信息的权限
		 */
		abstract isUserInfoAuthAlready(): Promise<boolean>
	}
}
