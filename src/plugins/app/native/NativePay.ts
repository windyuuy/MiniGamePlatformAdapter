/// <reference path="./NativeHelper.ts" />

namespace AppGDK {
	export enum PayErrorCode {
		BIND_GOOGLE_SERVICE_FAILED,
		SEND_PAY_REQUEST_FAILED,
		CATCH_EXCEPTIONS,
		PURCHASE_CANCELLED,
		ON_CODE_REQUEST_GPV3,
		OWNED_SUCH_ITEM,
		INVALID_PARAMS,
		/**
		 * 依赖的app未安装
		 */
		DEPENDENCE_APP_NOT_INSTALLED,
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
		async initPay(params: {}): Promise<void> {
			return nativeHelper.callAction("paywrapper:initPay", params)
		}

		/**
		 * @param sku: 商品id
		 */
		async requestPay(params: {
			sku: string,
			price: number,
			count: number,
			currency: string,

			partnerId: string,
			prepayId: string,
			packageValue: string,
			nonceStr: string,
			timestamp: string,
			paySign: string,
			channelAppId: string,
		}): Promise<NativePayResult> {
			return nativeHelper.callAction("paywrapper:requestPay", params)
		}

		/**
		 * 消耗商品
		 */
		async consumePurchase?(params: { purchaseToken: string }): Promise<GDK.ConsumePurchaseResult> {
			return nativeHelper.callAction("paywrapper:consumePurchase", params)
		}
		/**
		 * 获取未消耗商品列表
		 */
		async queryItemInfo?(params: { sku: string }): Promise<GDK.PayQueryItemInfoResult> {
			return nativeHelper.callAction("paywrapper:queryItemInfo", params)
		}
	}
}
