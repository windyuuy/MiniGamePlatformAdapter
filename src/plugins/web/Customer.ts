
namespace webGDK {
	/** 客服 */
	export class Customer implements GDK.ICustomer {
		async openCustomerServiceConversation(params: GDK.OpenParam) {
			alert("你成功打开了客服界面")
			return null
		}
	}
}
