
namespace GDK.PayFlow {

	/**
	 * 支付所需外部依赖
	 */
	export class PayDeps {
		storage: IStorage
		logCommitTool: IGSStatistic
		gameClient: IGameClient
		/**
		 * 像oppo等渠道，登录会话信息过期，则需要重新登录
		 */
		login: Function
		/**
		 * 检查是否通过了实名认证
		 */
		checkRealNameVerify: () => boolean
		// {

		// if (FeatureSwitch.instance.check("real_name_verifies") && FeatureSwitch.instance.check("unverified_purchase") && !LoginData.saved.isVerified) {
		// 	CheckIdentityCertification.instance.showCertificationTipDialog();

		// } else {

		// }
		// }

		/**
		 * 是否手动补单
		 */
		isUserDealingOrder():boolean{
			return false
		}

		api!:UserAPI
	}

	export const payDeps = new PayDeps()

}
