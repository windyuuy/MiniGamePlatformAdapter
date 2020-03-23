namespace GDK {
	export class LogBase implements ILog {
		async commitLog(key: string, params: { [key: string]: String }) {

		}

		async commitChannelsLog(logType: string, params: GDK.PayLogParams) {
		}

		async commitPayLog(index: number) {

		}
	}
}