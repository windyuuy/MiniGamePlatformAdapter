import { oppoapi } from "../oppo/config";
import { qqplay } from "../qqplay/config";

export class OppoRegisterList extends oppoapi.register {
	Login = super.Login;
}

export class QQPlayRegisterList extends qqplay.register {
	Login = this.Login;
}
