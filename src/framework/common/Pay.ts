
namespace GDK {
	export abstract class PayBase implements IPay {
		abstract payPurchase(item: PayItemInfo, options?: PayOptions): Promise<PayResult>

		consumePurchase?(params: ConsumePurchaseParams): Promise<ConsumePurchaseResult> {
			return new Promise<ConsumePurchaseResult>((resolve, reject) => {
				reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_INVALID))
			})
		}
		queryItemInfo?(params: PayQueryItemInfoParams): Promise<PayQueryItemInfoResult> {
			return new Promise<PayQueryItemInfoResult>((resolve, reject) => {
				reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_INVALID))
			})
		}
	}
}
