
namespace OPPOGDK {

	const paylog = Common.paylog

	export interface PayItemInfoExt extends GDK.PayItemInfo {
		/** oppo包名 */
		pkgName?: string
		/** oppo登录返回的token */
		token?: string
		/** 支付签名 */
		paySign?: string
		/** 游戏在oppo快游戏的id */
		oppoId?: string
		/** 游戏在该平台的appid */
		channelAppId?: string
		merchantId?: string
		/** 手q后台生成的预支付id */
		prepayId?: string

		/** 商户id */
		partnerId?: string
		/** 随机字符串 */
		nonceStr?: string
		/** vivo订单信息 */
		vivoOrderInfo?: string
		/** 支付宝支付特有 */
		extraStr: string
		/** aligame accountId */
		accountId?: string;
		/** aligame aliamount */
		aliamount?: string;
		/** xiao7 game sign */
		gameSign?: string;
	}

	export class Pay extends GDK.PayBase {
		protected payFlow: PayFlow.PayFlowMG
		getUserPayFlow(): GDK.PayFlow.IPayFlow {
			if (this.payFlow != null) {
				return this.payFlow
			}

			this.payFlow = new PayFlow.PayFlowMG().init(this.api)
			return this.payFlow
		}

		api!: GDK.UserAPI
		server: MServer

		init() {
			//回到前台后响应
			qg.onShow(() => {
				paylog.info("-[OPPOAPI] onEnterforeground");
				if (this._isPaying) {
					this._payReturnCallback && this._payReturnCallback()
				}
			})
		}

		protected _isPaying: boolean = false
		protected _payReturnCallback: Function = null
		protected _payPurchase(items: PayItemInfoExt, callback: (errCode, data) => void) {
			this._isPaying = true
			this._payReturnCallback = () => {
				if (!this._isPaying) {
					return
				}

				this._payReturnCallback = null
				this._isPaying = false
				const code = -1
				try {
					paylog.info('-[OPPOAPI] callback cancel onShow')
					callback(code, {
						code: code,
						itemList: items,
						gameId: items.oppoId,
						success: false,
					})
				} catch (e) {
					paylog.error("充值回调中发生异常:", e)
				}
			}

			let token = (this.api.userData as UserData).token
			paylog.info('payPurchase call qg.pay:', {
				pkgName: items.pkgName,
				token: token,
				timestamp: items.timestamp,
				paySign: items.paySign,
				orderNo: items.orderNo,
				appId: this.api.appId
			}, items)

			qg.pay({
				pkgName: items.pkgName,
				token: token,
				timestamp: items.timestamp,
				paySign: items.paySign,
				orderNo: items.orderNo,
				appId: this.api.appId,
				success: (res) => {
					// pay success
					paylog.info("oppo 支付成功", res)
					// successCall(res);
					this._payReturnCallback = null
					this._isPaying = false
					callback && callback(0, res)
				},
				fail: (res) => {
					// pay fail
					paylog.error("oppo 支付失败", res)
					//console.log(JSON.stringify(res));
					this._payReturnCallback = null
					this._isPaying = false
					callback && callback(-2, res)
				}
			});
		}

		/**
		 * 使用二级货币购买
		 */
		payPurchase(item: PayItemInfoExt, options?: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			this._payPurchase(item, (errCode, data) => {
				if (errCode == 0) {
					ret.success({
						result: {
							errCode: errCode,
						},
						extra: data,
					})
				} else if (errCode == -1) {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL, {
						data: {
							extra: data
						}
					}))
				} else {
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
						data: {
							extra: data
						}
					}))
				}
			})
			return ret.promise
		}
	}
}
