
namespace CS.Glee {
    export class LoginWrap {
        public static getInstance(): LoginWrap

        public hideLogining(data: String): void

        public showLoading(data: String): void

        public hideLoading(data: String): void

        public showLogining(data: String): void

        public showLoginDialog(data: String): void

        public hideLoginDialog(data: String): void

        public showUserCenter(data: String): void

        public hideUserCenter(data: String): void

        public hideBindDialog(data: String): void

        public showBindDialog(data: String): void

        public autoLogin(data: String): void


        //SDK加载完成后执行该动作 隐藏画面
        public hideLaunchingView(data: String): void
    }
}