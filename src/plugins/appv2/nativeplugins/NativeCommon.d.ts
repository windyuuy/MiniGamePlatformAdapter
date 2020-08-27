
declare namespace CS.Glee.Bridge {
    export type Dictionary<K, T> = { [key: string]: T }

    export type AnyParams = AppV2GDK.AnyParams
    export type AnyResult = AppV2GDK.AnyResult
    export type ErrorInfo = AppV2GDK.ErrorInfo
    export type TaskCallback<T> = AppV2GDK.TaskCallback<T>
    export type FTaskCallback<T, F extends ErrorInfo> = AppV2GDK.FTaskCallback<T, F>
    export type EmptyTaskCallback<T> = AppV2GDK.EmptyTaskCallback<T>
    export type NTaskCallback = TaskCallback<string>
}