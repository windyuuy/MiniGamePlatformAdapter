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


}