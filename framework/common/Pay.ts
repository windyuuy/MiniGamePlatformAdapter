
namespace GDK {
	export abstract class PayBase implements IPay {
		abstract payPurchase(item: GDK.PayItemInfo, options?: { gameOrientation?: WebViewOrientation }): Promise<PayResult>
	}
}
