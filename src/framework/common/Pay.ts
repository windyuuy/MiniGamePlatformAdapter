
namespace GDK {
	export abstract class PayBase implements IPay {
		abstract payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>
	}
}
