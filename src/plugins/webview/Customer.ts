
namespace AppGDK {
	/** 客服 */
	export class Customer implements GDK.ICustomer {
		api?: GDK.UserAPI
		async openCustomerServiceConversation(params: GDK.OpenParam) {
			this.api.showAlert({ content: "你成功打开了客服界面", title: "客服界面测试" });
			return null
		}
	}
}
