
namespace QQPlayGDK {
	export class SystemInfo implements GDK.ISystemInfo {
		system: string

		init() {
			this.system = GameStatusInfo.platform
		}
	}
}