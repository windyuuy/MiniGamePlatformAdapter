
namespace OPPOGDK {

	const paylog = Common.paylog

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI
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
		protected _payPurchase(items: GDK.PayItemInfo, callback: (errCode, data) => void) {
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

			qg.pay({
				pkgName: items.pkgName,
				token: items.token,
				timestamp: items.timestamp,
				paySign: items.paySign,
				orderNo: items.orderNo,
				appId: items.oppoId,
				success: (res) => {
					// pay success
					//console.info("oppokyx 支付成功")
					//successCall(res);
					this._payReturnCallback = null
					this._isPaying = false
					callback && callback(0, res)
				},
				fail: (res) => {
					// pay fail
					//console.error("oppokyx 支付失败")
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
		payPurchase(item: GDK.PayItemInfo, options?: { gameOrientation?: GDK.WebViewOrientation }): Promise<GDK.PayResult> {
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
