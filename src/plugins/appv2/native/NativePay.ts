/// <reference path="./NativeHelper.ts" />

namespace UnityAppGDK {
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
		// OnRegister(info: LogRegisterParams, callbacks: TaskCallback<LogEventResult>): void {
		// 	callbacks(JSON.parse(data || null));
		// }

		/**
		 * @param sku: 商品id
		 */
		async requestPay(params: {
			productId: string,
			/** 商品id，即productId */
			sku: string,
			/** 价格 */
			price: number,
			/** 数量 */
			count: number,
			/** 货币单位 */
			currency: string,

			/** 合作商id */
			partnerId: string | undefined,
			/** 预付款订单 */
			prepayId: string | undefined,
			/** 包名 */
			packageValue: string,
			/** 随机字符串 */
			nonceStr: string | undefined,
			/** 事件戳 */
			timestamp: string | undefined,
			/** 支付签名 */
			paySign: string | undefined,
			/** 渠道appid */
			channelAppId: string | undefined,
			/**
			 * 原生平台支付方式
			 */
			payWay: string | undefined,
			extraStr: string,
			/**
			 * 标题
			 */
			title: string,
			/** 第三方支付平台的订单号 */
			orderNo: string | undefined,
			/**
			 * 支付服务器地址
			 */
			payUrl: string | undefined,
			/**
			 * glee自己的订单号
			 */
			gleeOrderNo?: string,
			/** aligame accountId */
			accountId?: string;
			/** aligame aliamount */
			aliamount?: string;
			/** 服务器通知地址 */
			notifyUrl?: string;
			/** xiao7 game sign */
			gameSign?: string
			coopOrder?: string
		}): Promise<NativePayResult> {
			params.coopOrder = "GleeOrderX"
			return nativeHelper.callAction("paywrapper:requestPay", params)
		}

		/**
		 * 消耗商品
		 */
		async consumePurchase?(params: {
			/** 中间商品/订单的唯一token，用于查询、消耗等 */
			purchaseToken: string
		}): Promise<GDK.ConsumePurchaseResult> {
			return nativeHelper.callAction("paywrapper:consumePurchase", params)
		}
		/**
		 * 获取未消耗商品列表
		 */
		async queryItemInfo?(params: {
			/** 商品id，即 productId */
			sku: string
			productId: string
		}): Promise<GDK.PayQueryItemInfoResult> {
			return nativeHelper.callAction("paywrapper:queryItemInfo", params)
		}

		// async alipay_requestPay(params: {
		// 	sku: string,
		// 	price: number,
		// 	count: number,
		// 	currency: string,

		// 	partnerId: string,
		// 	prepayId: string,
		// 	packageValue: string,

		// 	nonceStr: string,
		// 	timestamp: string,
		// 	paySign: string,
		// 	channelAppId: string,
		// 	aliOrderInfo: string,
		// }): Promise<NativePayResult> {
		// 	return nativeHelper.callAction("alipaywrapper:requestPay", params)
		// }

		// /**
		//  * 消耗商品
		//  */
		// async alipay_consumePurchase?(params: { purchaseToken: string }): Promise<GDK.ConsumePurchaseResult> {
		// 	return nativeHelper.callAction("alipaywrapper:consumePurchase", params)
		// }
		// /**
		//  * 获取未消耗商品列表
		//  */
		// async alipay_queryItemInfo?(params: { sku: string }): Promise<GDK.PayQueryItemInfoResult> {
		// 	return nativeHelper.callAction("alipaywrapper:queryItemInfo", params)
		// }

	}
}
