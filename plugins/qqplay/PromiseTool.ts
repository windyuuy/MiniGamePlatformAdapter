namespace QQPlayGDK {
	export let consumePromise = (promiseGenerators, callback: ((res?) => void) = null, index = 0) => {
		let pgen = promiseGenerators[index]
		if (!pgen) {
			callback && callback()
			return
		}
		let promise: Promise<object> = pgen()
		promise.then(() => {
			consumePromise(promiseGenerators, callback, index + 1)
		}, (err) => {
			console.error(`execute promise [${index}]<${pgen}> failed`)
			let res = {
				index: index,
				pgen: pgen,
				err: err,
			}
			callback(res)
		})
	}
}