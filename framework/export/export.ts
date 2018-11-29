declare let gdk: GDK.UserAPI
namespace GDK {

	export function setDefaultGdk(api: UserAPI) {
		slib.assert(!gdk, '-[GDK] default gdk instance shall not be set twice')
		gdk = api
	}
}
