
namespace GDKLIB {
	export function assert(cond: any, tip?: string) {
		if (!!cond) {
			return cond
		} else {
			console.error(tip)
		}
	}
}