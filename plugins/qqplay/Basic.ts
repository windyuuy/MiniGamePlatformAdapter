namespace QQPlayGDK {

	export function wrapReq<T=void, I={}>(fun: (p: I & { complete: (p: T) => void, fail: Function }) => void, object: I & { complete?: (p: T) => void, fail?: Function }, code: number) {
		const ret = new GDK.RPromise<T>()
		object.complete = ret.success
		object.fail = () => {
			ret.fail(GDK.GDKResultTemplates.make(code))
		}
		fun(<I & { complete: (p: T) => void, fail: Function }>object)
		return ret.promise
	}

}