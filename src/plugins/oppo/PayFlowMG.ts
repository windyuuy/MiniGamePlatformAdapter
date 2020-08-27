
namespace OPPOGDK.PayFlow {
	const mdebug = (window as any)['wdebug'] && true

	type Parent = GDK.PayFlow.Parent
	const PayInAppWithAutoMakeup = GDK.PayFlow.PayInAppWithAutoMakeup
	const PayOutside = GDK.PayFlow.PayOutside

	const log = new slib.Log({ time: false, tags: ['[PayFlow]'] })

	/**
	 * 针对小游戏平台
	 */
	export class PayFlowMG extends GDK.PayFlow.PayFlowMGForMiniApp {

		initConfig(parent: Parent) {
			this._parent = parent

			this._payFlow = new PayInAppWithAutoMakeup.PayFlow()
			this._payFlow['_status'] = this._status
			this._payFlow.initConfig(this._parent)
		}

	}
}
