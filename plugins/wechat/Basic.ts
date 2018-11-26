import { ReqResult, YmPromise, ReqError, MyPromise, ReqResultTemplates, ReqErrorCode } from "../../sense/Basic";

export class RReqPromise<T, F=undefined> extends YmPromise<ReqResult, ReqError>{
	success: (value: T) => void
	fail: (value?: F) => void
	promise: MyPromise<ReqResult, ReqError>

	constructor(params: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
		super(params)
	}
	protected init(params?: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
		this.promise = new MyPromise((resolve, reject) => {
			this.success = (data) => {
				const data1 = data == undefined ? {} : data

				resolve(ReqResultTemplates.make(ReqErrorCode.SUCCESS, {
					msg: params.okmsg || undefined,
					reason: params.okreason || data1['errMsg'] || undefined,
					data: data1
				}))
			}
			this.fail = () => {
				reject(ReqResultTemplates.make(ReqErrorCode.UNKNOWN, {
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
