namespace AppV2GDK {
	/** 客服 */
	export class CustomService implements GDK.ICustomer {

		protected getAddon(): CS.Glee.Bridge.CustomServiceAddonWrapper {
			return nativeManager.getWrapper().customService;
		}
        public isSupport() : boolean {
            if (SDKProxy.getAppInfo(AppInfoKeys.unityEnv) == "UNITY_EDITOR") {
                console.log("编辑器环境不支持客服")
                return false
            }
            return nativeManager.isSupport();
        }

		async openCustomerServiceConversation(params: GDK.OpenParam) {

			if (!this.isSupport()) {
				console.log("不支持客服模块，跳过")
				return;
			}
			let ret = new GDK.RPromise<void>();
			let info = {} as CS.Glee.Bridge.OpenConversationInfo;
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
