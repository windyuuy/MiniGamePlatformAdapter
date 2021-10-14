
namespace VIVOGDK.PayFlow {

	export const mdebug = (window as any)['wdebug'] && true
	export const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	export type IPayFlow = GDK.PayFlow.IPayFlow
	export type Parent = GDK.PayFlow.Parent
	export type PayWay = GDK.PayFlow.PayWay
	export const PayInApp = GDK.PayFlow.PayInApp
	export type OrderInfo = GDK.PayFlow.OrderInfo
	export const payDeps = GDK.PayFlow.payDeps
	export type PaymentParamsOptions = GDK.PayFlow.PaymentParamsOptions
	export type PaymentParams = GDK.PayFlow.PaymentParams
	export type PaymentSuccessCallback = GDK.PayFlow.PaymentSuccessCallback
	export type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
	export type OrderRecordExported = GDK.PayFlow.OrderRecordExported
	export type GenOrderParams = GDK.PayFlow.GenOrderParams
	export type CheckOrderStateParams = GDK.PayFlow.CheckOrderStateParams
	export type ReqDiffOrderListParams = GDK.PayFlow.ReqDiffOrderListParams
	export type OrderInfoRaw = GDK.PayFlow.OrderInfoRaw
}
