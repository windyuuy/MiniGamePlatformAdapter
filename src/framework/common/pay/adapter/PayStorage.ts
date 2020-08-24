
namespace GSSDK.PayFlow {
    export class IStorage {

        /**
         * 保存存档到本地存储
         */
        saveToLocalStorage() {
        }

        /**
         * 获取已存入的数据
         * @param key 数据的key
         */
        getSavedData(key: string): any {
        }

        /**
         * 将数据存入
         * @param key key
         * @param data 数据
         */
        setSavedData(key: string, data: object) {
        }

        /**
         * 重新开始计时备份
         */
        rescheduleBackup() {
        }

        /**
         * 开始自动备份到服务器
         * @param backupTime 备份的时间间隔 秒
         */
        startBackup(backupTime?: number) {
        }

		/**
		 * 立即上传存档至服务器
		 * * 注意，这里是从本地存储中读取的存档。因此可能由于自动存档的时间间隔而产生存档的误差，如果需要保证存档的及时性，应该先调用storage.saveToLocalStorage()
		 */
        backup() {
        }
    }

}
