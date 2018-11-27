
namespace GDKLIB {
    type LogParam = { time?: boolean, tags?: string[] }

    export class Log {

        protected static _instance: Log
        public static get instance(): Log {
            if (!this._instance)
                this._instance = new Log();
            return this._instance;
        }

        protected time?: boolean
        protected tags?: string[]

        constructor({ time, tags }: LogParam = {}) {
            this.time = time
            if (tags) {
                this.tags = tags.concat()
            }
        }

        /**
         * 将消息打印到控制台，不存储至日志文件
         */
        info(...args) {
            if (this.tags) {
                args = this.tags.concat(args)
            }
            if (this.time) {
                args.push(new Date().getTime())
            }
            console.log(' ', ...args);
        }

        /**
         * 将消息打印到控制台，并储至日志文件
         */
        warn(...args) {
            if (this.tags) {
                args = this.tags.concat(args)
            }
            if (this.time) {
                args.push(new Date().getTime())
            }
            console.warn(' ', ...args);
        }

        /**
         * 将消息打印到控制台，并储至日志文件
         */
        error(...args) {
            if (this.tags) {
                args = this.tags.concat(args)
            }
            if (this.time) {
                args.push(new Date().getTime())
            }
            console.error(' ', ...args);
        }

    }

    export let log = Log.instance
}