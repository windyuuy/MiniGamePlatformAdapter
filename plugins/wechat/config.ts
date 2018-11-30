
namespace WechatGDK {
	// default config
	export const wechat: GDK.PackConfig = {
		platform: 'wechat',
		version: '1.0.0',
		register: RegisterList,
	}
}
GDK.setDefaultGdk(GDK.genGdk(new WechatGDK.wechat.register))