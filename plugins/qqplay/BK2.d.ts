declare namespace BK {
	export type HttpSuccObj = {
		statusCode: number	//	响应码
		headers: object		//	响应头，字符串键值对
		text: () => string		//	以字符串形式读取响应体
		arrayBuffer: () => ArrayBuffer	//	以ArrayBuffer形式读取响应体, 请求发生错误时返回大小为0的ArrayBuffer
		jsonObject: () => Object		//	以JSON对象形式读取响应体,已经经过JSON.parse解析, 请求发生错误或响应体为空时返回null
	}
	export type HttpErrObj = {
		msg: string	//	错误原因，用于调试，不适合直接展示给用户
	}
	export type HttpRequestParams = {

		/**
		 * @param 请求URL，必填参数
		 */
		url: string,

		/**
		 * @param 请求方法，默认"GET"
		 */
		method: string,

		/**
		 * @param 请求头，字符串键值对
		 */
		headers: { [key: string]: string },

		/**
		 * @param 请求体，string或ArrayBuffer类型
		 */
		body: string, // json string

		/**
		 * @callback 请求成功回调，成功仅代表HTTP请求完成，不等同于请求成功200
		 * @augments succObj 请求成功回调参数
		 */
		success: (succObj: HttpSuccObj) => void,

		/**
		 * @callback 请求失败回调，如连接超时等网络错误
		 * @augments succObj 请求失败回调函数参数
		 */
		fail: (errObj: HttpErrObj) => void,

		/**
		 * @callback 请求结束回调，无论请求成功失败都会调用
		 */
		complete: () => void,

		/**
		 * @callback 上传进度回调函数参数
		 * @augments succObj 上传进度回调函数参数
		 */
		uploadProgress: (curr: number, total: number) => void,

		/**
		 * @callback 下载进度回调
		 * @augments succObj 下载进度回调函数参数
		 */
		downloadProgress: (curr: number, total: number) => void,
	}

	export class Http {
		/**
		 * @method 发起http请求
		 * @augments params 请求参数
		 */
		static request(params: HttpRequestParams)
	}

	class LocalStorage {
		key(index: number): string
		getItem(key: string): string
		setItem(key: string, value: string): void
		removeItem(key: string): void
		clear(): void
	}
	export var localStorage: LocalStorage


	class SessionStorage {
		key(index: number): string
		getItem(key: string): string
		setItem(key: string, value: string): void
		removeItem(key: string): void
		clear(): void
	}
	export var sessionStorage: SessionStorage
}