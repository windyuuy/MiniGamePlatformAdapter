namespace GDK {
	export class PackConfig {
		platform: string
		/** sdk版本号 */
		version: string
		register: new () => ModuleClassMap
	}

}