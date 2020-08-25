

namespace GDK.PayFlow {

	export enum OrderState {
		fail = 2,
		ok = 1,
		unknown = 0,
	}

	// 订单信息
	export type OrderInfoRaw = {
		id: string //订单id
		userId: string //用户id
		quantity: number //扣款金额
		title: string //标题
		outTradeNo: string //订单号,以此为准
		goodsId: number //商品id
		state: number //状态(0:失败,1:成功,2:未知)
		time: number //订单生成时间
		purchaseToken: string //订单唯一消耗标志
		payWay?: PayFlow.PayWay
	}

	// 订单信息
	export type OrderInfo = {
		outTradeNo: string //订单号,以此为准,例如: "20002_1_1530164811210"
		state: OrderState //状态(0:未知,1:成功,2:失败)
		goodsId: number //商品id
		time: number //订单生成时间
		purchaseToken: string //订单唯一消耗标志
		payWay?: PayFlow.PayWay
	}
}
