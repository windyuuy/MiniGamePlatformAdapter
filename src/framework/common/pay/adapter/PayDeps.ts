
namespace GSSDK.PayFlow {

	export class PayDeps {
		storage: IStorage
		logCommitTool: IGSStatistic
		gameClient: IGameClient
		/**
		 * 像oppo等渠道，登录会话信息过期，则需要重新登录
		 */
		login: Function
		checkRealNameVerify: () => boolean
		// {

		// if (FeatureSwitch.instance.check("real_name_verifies") && FeatureSwitch.instance.check("unverified_purchase") && !LoginData.saved.isVerified) {
		// 	CheckIdentityCertification.instance.showCertificationTipDialog();

		// } else {

		// }
		// }

		isUserDealingOrder():boolean{
			return false
		}
	}

	export const payDeps = new PayDeps()

}
