
namespace BaiduGDK {
	export class Support implements GDK.ISupport {
		pluginName = "baidu"
		supportShare: boolean = true
		supportShareTickets: boolean = true
		requireSubDomainRank: boolean = true
		apiPlatform = "baidugame"
		requireAuthorize: boolean = true
		apiNameLocale: string = "百度"
	}
}