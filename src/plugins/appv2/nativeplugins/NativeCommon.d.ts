
declare namespace CS.Glee.Bridge {
    export type Dictionary<K, T> = { [key: string]: T }

    export type AnyParams = UnityAppGDK.AnyParams
    export type AnyResult = UnityAppGDK.AnyResult
    export type ErrorInfo = UnityAppGDK.ErrorInfo
    export type TaskCallback<T> = UnityAppGDK.TaskCallback<T>
    export type FTaskCallback<T, F extends ErrorInfo> = UnityAppGDK.FTaskCallback<T, F>
    export type EmptyTaskCallback<T> = UnityAppGDK.EmptyTaskCallback<T>
    export type NTaskCallback = TaskCallback<string>
}