
namespace GDK {
	export abstract class AppPayBase implements IAppPay {
		api?: UserAPI
		/**
		 * 调起支付
		 * - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		 */
		abstract payPurchaseApp(item: ServedPayInfo): Promise<ServedPayResult>
		/**
		 * 客户端校验
		 */
		abstract checkOrderState?(params: CheckOrderStateInfo): Promise<CheckOrderStateResult>
	}
}
