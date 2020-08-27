
namespace AppV2GDK {

	const devlog = Common.devlog

	export class LocalPush implements GDK.ILocalPush {
		api?: GDK.UserAPI

		protected getAddon(): CS.Glee.Bridge.LocalPushAddonWrapper {
			return nativeManager.getWrapper().localPush;
		}
        public isSupport() : boolean {
            return nativeManager.isSupport();
        }


		init() {
			//SDKProxy.nativeLocalPush.init()
			console.log("推送 初始化 ？？？ ");
		}

		/**
		 * 添加本地推送
		 */
		async addLocalNotices?(params: GDK.LocalPushBundle[]): Promise<void> {
			let ret = new GDK.RPromise<void>();
			let info = {notices:[]} as AppV2GDK.AddNotifiesParams;

			params.forEach((data) => {
				info.notices.push(new NotifyTemplate(data));
			});
			
			this.getAddon().AddPushes(info, new TaskCallback<AnyResult>({
				onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));

			return ret.promise;
		}

		/**
		 * 移除对应的推送
		 */
		async removeLocalNoticeWithID?(params: { identifier: string, identifiers:string[] }): Promise<void> {
			let ret = new GDK.RPromise<void>();
			let info = {} as AppV2GDK.RemoveLocalNotifiesParams;
			info.identifiers = params.identifiers;
			this.getAddon().RemovePushesByID(info, new TaskCallback<AnyResult>({
				onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));
			return ret.promise;
		}

		/**
		 * 移除所有推送
		 */
		async removeAllLocalNotices?(): Promise<void> {
			let ret = new GDK.RPromise<void>();
			let info = new AppV2GDK.RemoveAllLocalNotifiesParams();
			this.getAddon().RemoveAllPushes(info, new TaskCallback<AnyResult>({
				onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));
			return ret.promise;
		}

		/**
		 * 检查推送设置，如果没有权限则提示用户跳转开启
		 */
		async requireLocalNoticePermission?(): Promise<void> {
			let ret = new GDK.RPromise<void>();
			let info = new AnyParams();
			this.getAddon().EnablePush(info, new TaskCallback<AnyResult>({
				onSuccess: (p) => {
                    ret.success(undefined)
                },
                onFailed: (e) => {
                    ret.fail(e)
                }
			}));
			return ret.promise;
		}

		/**
		 * 用户是否开启通知权限
		 */
		isLocalNoticeEnabled?(): Promise<{ enabled: boolean }> {
			let ret = new GDK.RPromise<{ enabled: boolean }>();
			// ret.success({enabled : true})
			let enable = this.getAddon().IsPushEnabled();
			if (enable == true) {
				ret.success({enabled : true});
			} else {
				ret.success({enabled: false});
			}
			
			return ret.promise;
		}
	}
}