
namespace DevelopGDK.PayFlow {

	export const mdebug = (window as any)['wdebug'] && true
	export const log = new lang.libs.Log({ time: false, tags: ['[PayFlow]'] })

	export type IPayFlow = GDK.PayFlow.IPayFlow
	export type Parent = GDK.PayFlow.Parent
	export type PayWay = GDK.PayFlow.PayWay
	export type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	export type PaymentParams = GDK.PayFlow.PaymentParams
	export type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	export type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	export type OrderRecordExported = GDK.PayFlow.OrderRecordExported
}
