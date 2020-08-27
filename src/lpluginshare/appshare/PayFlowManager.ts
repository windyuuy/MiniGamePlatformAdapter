
namespace AppShare.PayFlow {
	type PayFlowCls = new () => GDK.PayFlow.IPayFlow
	export class PayFlowManager {
		payFlowList: { [key: string]: PayFlowCls } = {}

		registerPayFlow(name, cls: PayFlowCls) {
			this.payFlowList[name] = cls
		}

		getPayFlow(name: string): PayFlowCls {
			return this.payFlowList[name]
		}

		createPayFlow(name: string): GDK.PayFlow.IPayFlow {
			return new (this.payFlowList[name])()
		}
	}

	export const payFlowManager = new PayFlowManager

}
