
namespace QQPlayGDK {

	export class Pay extends GDK.PayBase {
		api?: GDK.UserAPI
		server: QQServer

		init() {
			//回到前台后响应
			BK.onEnterForeground(() => {
				console.log("-[QQPlayAPI] onEnterforeground");
				if (this._isPaying) {
					this._payReturnCallback && this._payReturnCallback()
				}
			})
		}

		protected _isPaying: boolean = false
		protected _payReturnCallback: Function = null
		protected _payPurchase(items: BK.PayItemInfo[], options: { gameOrientation?: BK.WebViewOrientation }, callback: (errCode, data) => void) {
			this._isPaying = true
			this._payReturnCallback = () => {
				if (!this._isPaying) {
					return
				}

				this._payReturnCallback = null
				this._isPaying = false
				const code = -1
				try {
					console.log('-[QQPlayAPI] callback cancel onShow')
					callback(code, {
						code: code,
						itemList: items,
						gameId: GameStatusInfo.gameId,
						success: false,
					})
				} catch (e) {
					console.error("充值回调中发生异常:", e)
				}
			}

			return BK.QQ.qPayPurchase(options.gameOrientation, true, items, (errCode, data) => {
				this._payReturnCallback = null
				this._isPaying = false
				try {
					callback && callback(errCode, data)
				} catch (e) {
					console.error("充值回调中发生异常:", e)
				}
			})
		}

		/**
		 * 使用二级货币购买
		 */
		payPurchase(item: GDK.PayItemInfo, options?: { gameOrientation?: GDK.WebViewOrientation }): Promise<GDK.PayResult> {
			const ret = new GDK.RPromise<GDK.PayResult>()

			const items: BK.PayItemInfo[] = [
				{ itemId: item.id, itemNum: item.money * 10 }
			]
			this._payPurchase(items, { gameOrientation: <number>options.gameOrientation || undefined }, (errCode, data) => {
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
