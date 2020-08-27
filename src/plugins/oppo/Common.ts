namespace OPPOGDK.Common {

	/**
	 * 获取当前服务器时间
	 */
	export let getServerTime: () => Date;

	class DevLog extends slib.Log {
		/**
         * 将消息打印到控制台，不存储至日志文件
         */
		info(...args: any[]): void {
			return super.info(...args.map(p => {
				if (p instanceof Error) {
					return p.toString()
				}
				else if (p instanceof Object) {
					return JSON.stringify(p)
				}
				return p
			}))
		}
        /**
         * 将消息打印到控制台，并储至日志文件
         */
		warn(...args: any[]): void {
			return super.warn(...args.map(p => {
				if (p instanceof Error) {
					return p.toString()
				}
				else if (p instanceof Object) {
					return JSON.stringify(p)
				}
				return p
			}))
		}
        /**
         * 将消息打印到控制台，并储至日志文件
         */
		error(...args: any[]): void {
			return super.error(...args.map(p => {
				if (p instanceof Error) {
					return p.toString()
				}
				else if (p instanceof Object) {
					return JSON.stringify(p)
				}
				return p
			}))
		}
	}
	export const devlog = new DevLog({ tags: ["[gdk]", "[oppo]"] });
	export const paylog = new DevLog({ tags: ["[gdk]", "[oppo]"] });
}