
declare namespace CS.ujlib {
    export class ServedShopAddonWrapper {

		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
		/**
		* 发起支付
		* - 支付至少需要在code里返回 成功、取消、失败 三个代码来区分，尽量不要忽略 取消支付 的事件。
		*/
        public Pay(info: ServedPayInfo, callbacks: FTaskCallback<ServedPayResult, PayErrorInfo>): void;

    }

    export class ServedPayInfo {    
        public customExtra!: string;
        public priceUSD!: double;
        public priceCNY!: double;
        public goodsId!: number;
    }

    export class ServedPayResult {
        public orderNo!: string;
        public orderCreateTime!: number;
    }

    export class PayErrorInfo {
        public data!: PayResultRaw;
        public payResult!: ServedPayResult;
    }

    export class PayResultRaw {
        public responseCode!: number;
        public extra!: any;
        public extraRaw!: string;
    }

}
