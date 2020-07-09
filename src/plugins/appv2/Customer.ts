
namespace UnityAppGDK {
	/** 客服 */
	export class Customer implements GDK.ICustomer {
		api!: GDK.UserAPI
		// async openCustomerServiceConversation(params: GDK.OpenParam) {
		// 	this.api.showAlert({ content: "你成功打开了客服界面", title: "客服界面测试" });
		// 	return null
		// }

		protected getAddon(): CS.Glee.Bridge.CustomServiceAddonWrapper {
			return nativeManager.getWrapper().customService;
		}

		async openCustomerServiceConversation(params: GDK.OpenParam) {
			let ret = new GDK.RPromise<void>();
			let info = new CS.Glee.Bridge.OpenConversationInfo();
			info.userId = ""
			info.userName = ""
			this.getAddon().OpenConversation(info, new TaskCallback<AnyResult>({
				onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));
			// this.api.showAlert({ content: "你成功打开了客服界面", title: "客服界面测试" });
			return null
		}
	}
}
