import { assertEqualDeep } from "../libs/TestLib.test"

require("../libs/slib.js")
require("../../dist/develop/develop")

class SimplePayFlow extends GDK.PayFlow.APayBase.PayFlow {
	init() { }
}

type OrderInfo = GDK.PayFlow.OrderInfo
type OrderRecord = GDK.PayFlow.OrderRecord
type RechargeConfigRow = GDK.PayFlow.RechargeConfigRow
const OrderState = GDK.PayFlow.OrderState

type TestSet_diffOrderList = {
	name: string,
	infos: OrderInfo[],
	targets: OrderRecord[],
	configs: RechargeConfigRow[],
	result: {
		result: OrderInfo[];
		diffExist: boolean;
		needSync: boolean;
	}
}

class TestPayFlow {
	init() {
	}

	test_diffOrderList() {

		const userId = "235"
		const timeStamp = Date.now()
		const payConfigs: RechargeConfigRow[] = [
			{
				id: 1,
				amount: 1,
				coinId: 1,
				money: 6,
				payWay: "AliPay",
				price: 6,
				title: "6Y",
			},
			{
				id: 2,
				amount: 1,
				coinId: 1,
				money: 12,
				payWay: "AliPay",
				price: 12,
				title: "12Y",
			},
			{
				id: 3,
				amount: 1,
				coinId: 1,
				money: 13,
				payWay: "AliPay",
				price: 13,
				title: "13Y",
			},
		]

		let testSet: TestSet_diffOrderList[] = [
			{
				name: "empty",
				infos: [],
				configs: payConfigs,
				targets: [],
				result: {
					result: [],
					diffExist: false,
					needSync: false,
				}
			},

			{
				name: "增加失败订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.fail,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
				],
				configs: payConfigs,
				result: {
					result: [],
					diffExist: false,
					needSync: false,
				}
			},

			{
				name: "增加未知订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.unknown,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
				],
				configs: payConfigs,
				result: {
					result: [],
					diffExist: false,
					needSync: false,
				}
			},

			{
				name: "增加成功订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.ok,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
				],
				configs: payConfigs,
				result: {
					result: [
						{

							goodsId: 1,
							outTradeNo: 'aa',
							purchaseToken: 'aaaa',
							state: 1,
							time: timeStamp,
						}
					],
					diffExist: true,
					needSync: true,
				}
			},

			{
				name: "补成功订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.ok,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
					{
						Amt: 1,
						Id: 1,
						ItemName: "6Y",
						Money: 6,
						orderno: "lkwjfelkj",
						purchaseToken: "lkwjef",
						state: OrderState.fail,
						time: timeStamp,
						userId: userId,
					}
				],
				configs: payConfigs,
				result: {
					result: [
						{

							goodsId: 1,
							outTradeNo: 'aa',
							purchaseToken: 'aaaa',
							state: 1,
							time: timeStamp,
						}
					],
					diffExist: true,
					needSync: true,
				}
			},


			{
				name: "补失败订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.fail,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
					{
						Amt: 1,
						Id: 1,
						ItemName: "6Y",
						Money: 6,
						orderno: "lkwjfelkj",
						purchaseToken: "lkwjef",
						state: OrderState.fail,
						time: timeStamp,
						userId: userId,
					}
				],
				configs: payConfigs,
				result: {
					result: [
					],
					diffExist: false,
					needSync: false,
				}
			},

			{
				name: "补未知订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.fail,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
					{
						Amt: 1,
						Id: 1,
						ItemName: "6Y",
						Money: 6,
						orderno: "lkwjfelkj",
						purchaseToken: "lkwjef",
						state: OrderState.fail,
						time: timeStamp,
						userId: userId,
					}
				],
				configs: payConfigs,
				result: {
					result: [
					],
					diffExist: false,
					needSync: false,
				}
			},


			{
				name: "需回滚订单",
				infos: [
					{
						goodsId: 1,
						outTradeNo: "aa",
						state: OrderState.fail,
						time: timeStamp,
						purchaseToken: "aaaa",
					},
				],
				targets: [
					{
						Amt: 1,
						Id: 1,
						ItemName: "6Y",
						Money: 6,
						orderno: "lkwjfelkj",
						purchaseToken: "lkwjef",
						state: OrderState.ok,
						time: timeStamp,
						userId: userId,
					}
				],
				configs: payConfigs,
				result: {
					result: [
					],
					diffExist: false,
					needSync: false,
				}
			},
		]

		for (let testData of testSet) {
			console.log("测试：", testData.name, "开始")
			let payFlow = new SimplePayFlow()
			let ret = payFlow.diffOrderList(testData.infos, testData.targets, testData.configs)
			let expectResult = testData.result
			assertEqualDeep(ret, expectResult)
			console.log("测试：", testData.name, "通过")
		}

	}
}

test("diffOrderList", () => {
	const a = new TestPayFlow()
	a.test_diffOrderList()
})