
namespace WechatGDK {
	export class RReqPromise<T, F=undefined> extends GDK.YmPromise<GDK.ReqResult, GDK.ReqError>{
		success: (value: T) => void
		fail: (value?: F) => void
		promise: GDK.MyPromise<GDK.ReqResult, GDK.ReqError>

		constructor(params: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
			super(params)
		}
		protected init(params?: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
			this.promise = new GDK.MyPromise((resolve, reject) => {
				this.success = (data) => {
					const data1 = data == undefined ? {} : data

					resolve(GDK.ReqResultTemplates.make(GDK.ReqErrorCode.SUCCESS, {
						msg: params.okmsg || undefined,
						reason: params.okreason || data1['errMsg'] || undefined,
						data: data1
					}))
				}
				this.fail = () => {
					reject(GDK.ReqResultTemplates.make(GDK.ReqErrorCode.UNKNOWN, {
						msg: params.failmsg || undefined,
						reason: params.failreason || undefined
					}))
				}
			})
		}
	}

	export function wrapReq<T>(fun: (p: wx.BaseOptions) => void, calller?: object, params?: { okmsg?: string, failmsg?: string }) {
		const obj = new RReqPromise<T>(params)
		fun.call(calller, obj)
		return obj.promise
	}

	export class RLoginPromise<T> extends RReqPromise<T>{ }

}