
namespace GSSDK.PayFlow.PayInApp {

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 类似微信、玩一玩等内购支付流程
	 */
	export class PayFlow extends APayBase.PayFlow {
		payFlowName = "PayInApp"
	}
}
