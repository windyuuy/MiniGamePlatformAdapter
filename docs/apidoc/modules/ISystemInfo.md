### ** * brand: string**
- 手机品牌


### ** * model: string**
- 手机型号
- 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"


### ** * pixelRatio: number**
设备像素比
- -1 代表未知


### ** * screenWidth: number**
- 屏幕宽度


### ** * screenHeight: number**
- 屏幕高度


### ** * windowWidth: number**
- 可使用窗口宽度


### ** * windowHeight: number**
- 可使用窗口高度


### ** * statusBarHeight: number**
- 状态栏的高度


### ** * language: string**
- 平台（微信、QQ等）设置的语言


### ** * version: string**
版本号
* 微信版本号
* 安卓版本号


### ** * system: string**
- 操作系统版本，形如 "Android 5.0"


### ** * platform: string**
客户端平台
- "android" | "ios" | "devtools" | ...


### ** * fontSizeSetting: number**
- 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。


### ** * SDKVersion: string**
- wx 客户端基础库版本
- app nativeVersion


### ** * SDKVersionList: []**
- 客户端的SDK版本列表
- eg : [{name : "bus", "version" : "1.0.0"}, {...}]


### ** * benchmarkLevel: number**
(仅Android小游戏) 性能等级
- -2 或 0：该设备无法运行小游戏
- -1：性能未知
- `>=` 1 设备性能值
- 该值越高，设备性能越好(目前设备最高不到50)


### ** * networkType: string**
网络类型
- `wifi`	wifi 网络
- `2g`	2g 网络
- `3g`	3g 网络
- `4g`	4g 网络
- `unknown`	Android 下不常见的网络类型
- `none`	无网络


### ** * networkClass: number**
网络类型 1 电信 ，2 联通 ，3 移动
- 0: wifi或未知
-1 无网络
-2 2G/3G/4G/nG 网络


### ** * isFirstInstall: number**
是否首次安装
- 1为首次安装
- 0非首次安装


### ** * devPlatform: string**
- 仅在开发环境下可以，手q环境下无该字段


### ** * deviceId: string**
- 设备ID


### ** * uuid: string**
- 设备ID


### ** * gameDeviceId: string**
- 游戏设备ID，每次重新安装游戏都会改变


### ** * versionCode: number**
- 版本号


### ** * versionName: string**
- 版本名称


### ** * channel: string**
- 渠道ID


### ** * quickChannelId: string**
- quick渠道ID


### ** * country: string**
- 地区国家


### ** * installTime: number**
- 安装时间


### ** * imei: string**
- imei


### ** * packageName: string**
- 包名


### ** * packageTag: string**
- 发行渠道


### ** * debugAccountServer: string**
- 测试用 account server


### ** * isCustomBackendCfg: boolean**
- 是否支持按packageTag 定制后端参数


### ** * androidId: string**
- android id


### ** * mac: string**
- mac address


### ** * userAgent: string**
- http user Agent


### ** * tableConf: { tableSign: string }**
- 服务器表格配置信息


### ** * fetchNetworkInfo(): Promise**
- 刷新网络状况信息


### ** * clone(): ISystemInfo**
- clone(): ISystemInfo

