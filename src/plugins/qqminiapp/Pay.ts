
namespace QQMiniAppGDK {
	const devlog = Common.paylog

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

		private _isPaying: boolean = false;
		private _payReturnCallback: Function = null;
		init() {
			//回到前台后响应
			wx.onShow(() => {
				devlog.info("-[QQMINIAPP] onEnterforeground");
				setTimeout(() => {
					if (this._isPaying) {
						this._payReturnCallback && this._payReturnCallback()
					}
				}, 1500);
			})
		}

		payPurchase(config: PayItemInfoExt, options: GDK.PayOptions): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()
			this._isPaying = true
			this._payReturnCallback = () => {
				if (!this._isPaying) {
					return
				}

				this._payReturnCallback = null
				this._isPaying = false
				const code = -1
				try {
					devlog.info('-[QQMINIAPP] callback cancel onShow')
					ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
				} catch (e) {
					devlog.error("充值回调中发生异常:", e)
				}
			}
			devlog.info(`qqnimiapp pay params : prepayId:${config.prepayId},starCurrency:${config.money * 10}`);
			wx.requestMidasPayment({
				prepayId: config.prepayId,
				starCurrency: config.money * 10,
				success: () => {
					devlog.info("手q充值成功", config);
					this._payReturnCallback = null;
					this._isPaying = false;
					setTimeout(() => {
						ret.success({
							result: {
								errCode: 0,
							},
							extra: { errCode: 0, state: GDK.OrderState.ok },
						})
					}, 1500);
				},
				fail: (res: { errMsg: string, errCode: number }) => {
					this._payReturnCallback = null;
					this._isPaying = false;
					if (res.errCode == -2) {
						devlog.info("手q充值取消", res, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_CANCEL))
					} else {
						devlog.warn("手q充值失败", res, config)
						ret.fail(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_PAY_FAILED, {
							data: {
								extra: res
							}
						}))
					}
				}
			})

			return ret.promise
		}

	}
}