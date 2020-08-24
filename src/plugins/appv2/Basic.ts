namespace UnityAppGDK {
	type ReqResult = any

	export class RReqPromise<T, F = undefined> extends GDK.RPromise<ReqResult>{
		success!: (value: T) => void
		fail!: (value?: F) => void
		promise!: Promise<ReqResult>

		constructor(params: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
			super(params)
		}
		protected init(params?: { okmsg?: string, failmsg?: string, okreason?: string, failreason?: string }) {
			this.promise = new Promise<ReqResult>((resolve, reject) => {
				this.success = (data) => {
					const data1 = data == undefined ? {} : data

					resolve(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.SUCCESS, {
						msg: (params && params.okmsg) || undefined,
						reason: (params && params.okreason) || data1['errMsg'] || undefined,
						data: data1
					}))
				}
				this.fail = () => {
					reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.UNKNOWN, {
						msg: (params && params.failmsg) || undefined,
						reason: (params && params.failreason) || undefined
					}))
				}
			})
		}
	}

	export function wrapReq<T = void, I extends { success?: (p: T) => void, fail?: Function } = {}>(fun: (p: I) => void, object: I, code: number) {
		const ret = new GDK.RPromise<T>()
		object.success = ret.success
		object.fail = () => {
			ret.fail(GDK.GDKResultTemplates.make(code))
		}
		fun(object)
		return ret.promise
	}

	export class RLoginPromise<T> extends RReqPromise<T>{ }

}