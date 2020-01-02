
namespace BaiduGDK {
	/** 客服 */
	export class Customer implements GDK.ICustomer {
		openCustomerServiceConversation(params: GDK.OpenParam) {
			const ret = new GDK.RPromise<{}>()
			params.success = () => {
				ret.success({})
			}
			params.fail = () => {
				ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_OPEN_FEEDBACK_FAILED))
			}
			swan.openCustomerServiceConversation(params)
			return ret.promise
		}
	}
}
