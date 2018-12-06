/** 开发数据域 */
namespace GDK {

	export interface IOpenDataContext {
		canvas?: HTMLCanvasElement
		postMessage(message: PrimitiveMap)
	}
	export interface ISubContext {
		onMessage(callback: (message: PrimitiveMap) => void)
		getOpenDataContext(): IOpenDataContext
	}
}