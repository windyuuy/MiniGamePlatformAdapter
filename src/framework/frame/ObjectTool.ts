
namespace GDK.Tools {
	export function mergeObject(obj1: object, obj2: object) {
		for (let key of Object.keys(obj2)) {
			obj1[key] = obj2[key]
		}
	}
}
