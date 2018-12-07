### **brand**
- 手机品牌

### **model**
- 手机型号
- 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"

### **pixelRatio**
设备像素比
- -1 代表未知

### **screenWidth**
- 屏幕宽度

### **screenHeight**
- 屏幕高度

### **windowWidth**
- 可使用窗口宽度

### **windowHeight**
- 可使用窗口高度

### **statusBarHeight**
- 状态栏的高度

### **language**
- 平台（微信、QQ等）设置的语言

### **version**
- 平台(微信、QQ等）版本号

### **system**
操作系统版本
- "android" | "ios" | "devtools" | ...

### **platform**
- 客户端平台

### **fontSizeSetting**
- 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。

### **SDKVersion**
- 客户端基础库版本

### **benchmarkLevel**
(仅Android小游戏) 性能等级
- -2 或 0：该设备无法运行小游戏
- -1：性能未知
- `>=` 1 设备性能值
- 该值越高，设备性能越好(目前设备最高不到50)

### **networkType**
网络类型
- `wifi`	wifi 网络
- `2g`	2g 网络
- `3g`	3g 网络
- `4g`	4g 网络
- `unknown`	Android 下不常见的网络类型
- `none`	无网络

### **networkClass**
网络类型 1 电信 ，2 联通 ，3 移动
- 0: wifi或未知
-1 无网络
-2 2G/3G/4G/nG 网络

### **isFirstInstall**
是否首次安装
- 1为首次安装
- 0非首次安装

### **devPlatform**
- 仅在开发环境下可以，手q环境下无该字段

### **fetchNetworkInfo()**
- 获取网络状况信息
