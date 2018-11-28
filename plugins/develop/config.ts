
namespace DevelopGDK {

	export let devlog = new GDKLIB.Log({ tags: ["DEVELOP"] })

	// default config
	export const qqplay: GDK.PackConfig = {
		platform: 'develp',
		version: '1.0.0',
		register: RegisterList,
	}
}