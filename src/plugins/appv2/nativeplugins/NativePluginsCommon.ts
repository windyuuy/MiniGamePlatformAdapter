
namespace AppV2GDK {
    export class AnyParams {
        public static readonly defaultValue: AnyParams = new AnyParams();
    }

    export class AnyResult {
        public static readonly defaultValue: AnyResult = new AnyResult();
    }

    export class ErrorInfo {
        constructor(err: CS.Glee.Bridge.ErrorInfo) {
            this.message = err.message
            this.reason = err.reason
            this.code = err.code
        }
        public message: string = "";
        public reason: string = "ERROR_UNKNOWN";

        public code: number = -1;
    }

    export class TaskCallback<T> {
        constructor(cs: TaskCallback<T>) {
            this.onSuccess = cs.onSuccess;
            this.onFailed = cs.onFailed;
            this.onCancel = cs.onCancel;
        }
        /**
         * @noSelf
         */
        public onSuccess!: (p: T) => void;
        /**
         * @noSelf
         */
        public onFailed!: (errInfo: ErrorInfo) => void;
        /**
         * @noSelf
         */
        public onCancel?: (p: Object) => void;
    }

    export class FTaskCallback<T, F extends ErrorInfo> {
        constructor(cs: FTaskCallback<T, F>) {
            this.onSuccess = cs.onSuccess;
            this.onFailed = cs.onFailed;
            this.onCancel = cs.onCancel;
        }
        /**
         * @noSelf
         */
        public onSuccess!: (p: T) => void;
        /**
         * @noSelf
         */
        public onFailed!: (errInfo: F) => void;
        /**
         * @noSelf
         */
        public onCancel?: (p: Object) => void;
    }

    export class EmptyTaskCallback<T> extends TaskCallback<T> {
        constructor() {
            super(new TaskCallback<T>({
                onSuccess: () => { },
                onFailed: () => { },
            }))
        }
    }

}