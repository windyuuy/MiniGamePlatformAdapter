
namespace QQMiniAppGDK {
	const devlog = Common.paylog

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

		payPurchase(config: GDK.PayItemInfo, options: GDK.PayOptions): Promise<GDK.PayResult> {
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