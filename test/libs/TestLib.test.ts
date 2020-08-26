
export const assert = (a: any) => {
	expect(!!a).toEqual(true)
}

export const assertEqualBoolean = (a: any, b: any, tip?: string) => {
	if (!!a != !!b) {
		console.error(`unmatched result: got <${a}>, expect <${b}>, tip: ${tip}`)
	}
	expect(!!a).toBe(!!b)
}

export const assertEqual = (a: any, b: any) => {
	expect(a).toBe(b)
}

export const assertNotEqual = (a: any, b: any) => {
	expect(a).not.toBe(b)
}

export const assertEqualDeep = (a: any, b: any) => {
	expect(a).toEqual(b)
}

export function test_entry(desc: string, fun: () => void) {
	console.log(`==>> test entry<${desc}> BEGIN`)
	fun()
	console.log(`==<< test entry<${desc}> PASS`)
}

export function TestClass<T>(cls: new () => T) {
	const obj = new cls() as any
	obj.init && obj.init()
	test_entry(cls.name, () => {
		for (let key of Object.getOwnPropertyNames(obj['__proto__'])) {
			if (key.startsWith("test_")) {
				let f = obj[key] as Function
				test_entry(key, () => {
					f.apply(obj)
				})
			}
		}
	})
}

export function ClassUnitTest<T>(cls: new () => T) {
	return () => {
		TestClass(cls)
	}
}

export function TestClassMethod<T>(cls: new () => T, name: string) {
	test_entry(name, () => {
		const obj = new cls() as any
		obj.init && obj.init()
		obj[name].apply(obj)
	})
}

export function ClassMethodTest<T>(cls: new () => T, name: string) {
	return () => {
		TestClassMethod(cls, name)
	}
}

