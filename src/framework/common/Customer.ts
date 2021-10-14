
namespace GDK {
	const devlog = new lang.libs.Log({ tags: ["DEVELOP"] })

	export abstract class CustomerBase implements ICustomer {
		/**
		 * - 进入客服会话。
		 * 	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
		 */
		abstract openCustomerServiceConversation(params: OpenParam)
	}
}
