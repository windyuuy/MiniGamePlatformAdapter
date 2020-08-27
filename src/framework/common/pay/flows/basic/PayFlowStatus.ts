
namespace GDK.PayFlow {
	export class PayFlowStatus {
		// 充值屏蔽层
		public _rechargeBlockLayerIndex: [number, string]
		// 正在充值
		public _isRecharging: boolean = false

		/**
		 * 包含各种外部传入配置
		 */
		public _parent: Parent = null
	}
}
