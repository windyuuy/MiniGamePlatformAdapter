declare namespace BK {
    export class Share {
        /**
         * 详见 https://hudong.qq.com/docs/engine/api-new/mqq/share/share.html
         * @param options 
         */
        static share(options);
    }

    export type FileSystemReadFileOptions = {
        /**是	要读取的文件数组*/
        file: { path: string, encoding?: "binary" | string }[]
        /**
         * 否	接口调用成功回调
         */
        success: (res: { path: string, data: ArrayBuffer | string, /** 0成功 */ errcode: number, errmsg: string }[]) => void
        /**
         * 否	接口调用失败回调
         */
        fail: (res: { errcode: number, errmsg: string }) => void
        /**
         * 否	接口调用完成回调
         */
        complete: Function
    }

    export type FileSystemWriteFileOptions = {
        /**是	要写入的文件数组*/
        file: { path: string, data: string | ArrayBuffer, encoding?: "binary" | string }[]
        /**
         * 否	接口调用成功回调
         */
        success: (res: { path: string, /** 0成功 */ errcode: number, errmsg: string }[]) => void
        /**
         * 否	接口调用失败回调
         */
        fail: (res: { errcode: number, errmsg: string }) => void
        /**
         * 否	接口调用完成回调
         */
        complete: Function
    }

    export class fileSystem {

        /**
         * 读取文件
         * @param data 
         */
        static readFile(data: FileSystemReadFileOptions);

        /**
         * 写入文件
         * @param data 
         */
        static writeFile(data: FileSystemWriteFileOptions);

        /**
         * 读取文件
         * @param filePath 
         * @param encoding 
         */
        static readFileSync(filePath: string, encoding?: "binary" | "utf8" | "ascii" | "base64"): ArrayBuffer | string

        /**
         * 写入文件
         * @param filePath 
         * @param data 
         */
        static writeFileSync(filePath, data: ArrayBuffer | String);

        /**
         * 删除文件
         * @param path 
         */
        static unlinkSync(path: string);
        /**
         * 文件是否存在
         * @param path 路径
         */
        static accessSync(path: string): boolean

        /**
         * 是否为目录
         * @param path 路径
         */
        static isDirectory(path: string): boolean

        /**
         * 获取文件信息
         * @param path 
         */
        static getFileInfoSync(path: string): { size: number }
    }

    export class UI {

        /**
         * 显示toast
         * @param data 
         */
        static showToast(data: {
            title: string,
            duration: number,
            complete: () => void
        });


        /**
         * 隐藏toast
         * @param data 
         */
        static hideToast(data: {
            complete: () => void
        });

        /**
         * 显示loading
         * @param data 
         */
        static showLoading(data: {
            title: string,
            complete: () => void
        });

        /**
         * 隐藏loading
         * @param data 
         */
        static hideLoading(data: {
            complete: () => void
        });

        /**
         * 显示对话框
         * @param data 
         */
        static showAlert(data: {
            title: string,
            content: string,
            success: (data: { confirm: boolean, cancel: boolean }) => void,
            complete: () => void
        });

        /**
         * 隐藏键盘
         * @param data 
         */
        static hideKeyboard(data: {
            complete: () => void
        })

    }

    export class Script {

        /**
         * 错误侦听函数
         */
        static onerror: (msg: string) => void
    }

    export type QQRankData = {
        userData: {
            openId: string,
            startMs: string,    //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
            endMs: string,  //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
            scoreInfo: { [key: string]: number, },
        }[],
        /**
        - type 描述附加属性的用途
        - order 排序的方式，
        - 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
        - 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略（比如酷跑类游戏的耗时，时间越短越好）
        - 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上
        - 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
        - 如score字段对应，上个属性.
        */
        attr: {
            [key: string]: {
                type: string,
                order: number,
            }
        }
    }
}