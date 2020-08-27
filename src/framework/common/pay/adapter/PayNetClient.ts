
namespace GDK.PayFlow {
	export interface IGameClient {
		getLoadingIndex: () => number;
		showModalCallback: (index: number, url: string) => void
		closeModalCallback: (index: number, url: string) => void
		request(action: any, data: any, callback: (data: any) => void, ps: {
			version?: number;
			tag?: string;
			name?: string;
			modal?: boolean;
			downloadProgress?: (loaded: number, total: number) => void;
			uploadProgress?: (loaded: number, total: number) => void;
			errorCallback?: (error: any, retry: () => void) => void;
			customUrl?: string;
		}): void
	}

	export class PayNetClient {
		get client(): IGameClient {
			return payDeps.gameClient
		}

		request<T, R>(
			path: string,
			data: T,
			callback: (data: {
				succeed: boolean,
				code: 0 | number,
				message: "success" | string,
				data: R, //订单信息
			}) => void,
			modal: boolean = false,
			errorCallback: (error: any, retry: () => void) => void = null
		) {
			this.client.request(path, data, (data) => {
				callback(data);
			}, { modal: modal, errorCallback: errorCallback })
		}

	}

}
