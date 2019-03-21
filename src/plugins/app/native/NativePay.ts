/// <reference path="./NativeHelper.ts" />

namespace AppGDK {
	export enum PayErrorCode {
		BIND_GOOGLE_SERVICE_FAILED,
		SEND_PAY_REQUEST_FAILED,
		CATCH_EXCEPTIONS,
		PURCHASE_CANCELLED,
		ON_CODE_REQUEST_GPV3,
	}
	export class NativePayResult {
		code: PayErrorCode
		data: string
		message: string
	}
	export class NativePay {
		/**
		 * @param sku: 商品id
		 */
		async requestPay(params: { sku: string, price: number, count: number, currency: string }) {
			return nativeHelper.callAction<NativePayResult>("paywrapper:requestPay", params)
		}
	}
}
