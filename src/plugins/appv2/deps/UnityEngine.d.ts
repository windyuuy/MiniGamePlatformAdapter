declare namespace CS {
    export namespace UnityEngine {
        export enum DeviceType {
            Unknown,
            Handheld,
            Console,
            Desktop,
        }
    }
    export namespace UnityEngine {

        export class SystemInfo extends Object {
            public static get deviceType(): UnityEngine.DeviceType;
        }
    }
}
