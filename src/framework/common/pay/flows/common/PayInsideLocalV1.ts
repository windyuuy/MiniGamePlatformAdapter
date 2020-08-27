
namespace GDK.PayFlow.PayInsideLocalV1 {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 兼容类似谷歌支付等有本地支付缓存的老版本apk
	 * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
	 */
	export class PayFlow extends APayBase.PayFlow {
		payFlowName = "PayInsideLocalV1"

	}

}
