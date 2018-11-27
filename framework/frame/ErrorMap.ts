namespace GDK {

	/** 请求错误扩展参数 */
	export class GDKErrorExtra {
		errcode?: number
		message?: string
		reason?: string
		data?: any
	}

	/** 请求错误结果 */
	export class GDKError extends Error {
		errcode: number
		reason: string
		data?: any

		constructor() {
			super("")
			this.name = "GDKError"
		}

		toString() {
			return `${this.name}: ${this.errcode} ${this.message} ${this.reason}`
		}
	}



	/** 请求结果模板生成器 */
	export class ResultTemplatesExtractor {
		protected _temps: GDKErrorExtra[] = []
		get temps() { return this._temps }

		constructor(temps: GDKErrorExtra[]) {
			this._temps = temps
		}


		/**
		 * 根据错误码和扩展参数构造请求结果
		 */
		make<F extends GDKErrorExtra>(errcode: number, extra?: F): GDKError {
			return null
		}
	}


}
