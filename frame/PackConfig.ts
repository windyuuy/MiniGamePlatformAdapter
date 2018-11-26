import { RegisterListTemp } from "./RegisterListTemp";

export class PackConfig {
	platform: string
	register: new () => RegisterListTemp
}
