
namespace GDK.PayFlow {

	/**
	 * 支付所需外部依赖
	 */
	export class PayDeps {
		/**
		 * 存储
		 */
		storage: IStorage

		/**
		 * 埋点
		 */
		logCommitTool: IGSStatistic

		/**
		 * http网络客户端
		 */
		gameClient: IGameClient

		/**
		 * 登录
		 * @usage 像oppo等渠道，登录会话信息过期，则需要重新登录
		 */
		login: Function

		/**
		 * 检查是否通过了实名认证
		 */
		checkRealNameVerify: () => boolean

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
