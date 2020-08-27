
namespace BaiduGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	/**
	 * 针对小游戏平台
	 */
	export class PayFlowMG extends GDK.PayFlow.PayFlowMGForMiniApp {

		initConfig(parent: GDK.PayFlow.Parent) {
			this._parent = parent

			this._payFlow = new CustomPayInApp()
			this._payFlow['_status'] = this._status
			this._payFlow.initConfig(this._parent)
		}

	}
}
