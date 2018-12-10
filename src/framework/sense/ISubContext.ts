/** 开发数据域 */
namespace GDK {

	export interface IOpenDataContext {
		/**
		 * - 开放数据域和主域共享的 sharedCanvas
		 * 	- 该接口仅微信平台有
		 */
		canvas?: HTMLCanvasElement
		/**
		 * 向开放数据域发送消息
		 */
		postMessage(message: PrimitiveMap)
	}
	export interface ISubContext {
		/**
		 * 监听主域发送的消息
		 */
		onMessage(callback: (message: PrimitiveMap) => void)
		/**
		 * 获取开放数据域
		 */
		getOpenDataContext(): IOpenDataContext
	}
}