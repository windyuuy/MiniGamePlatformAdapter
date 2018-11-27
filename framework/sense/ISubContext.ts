/** 开发数据域 */
namespace GDK {

	export interface IOpenDataContext {
		postMessage(message: PrimitiveMap)
	}
	export interface ISubContext {
		canvas?: HTMLCanvasElement
		onMessage(callback: (message: PrimitiveMap) => void)
		getOpenDataContext(): IOpenDataContext
	}
}