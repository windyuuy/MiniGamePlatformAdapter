
## 1.GDK结构概述

- gdk 主要由框架和基于框架开发的各个渠道插件组成，不同的渠道可通过开发不同的渠道插件来实现适配。
- gdk 总体目录及用途如下

```
├─docs             文档
├─src              源码
│  ├─framework     框架
│  │  ├─common     定义一些公共基类
│  │  ├─export     声明一些全局命名
│  │  ├─frame      实现gdk插件加载流程
│  │  └─sense      接口
│  ├─libs          外部依赖库
│  ├─lpluginshare  插件共享代码
│  │  └─appshare		app渠道插件共享代码
│  │      └─pay			支付相关代码
│  └─plugins       插件列表
│      ├─app       app渠道插件
│      │  Advert.ts		app渠道插件内广告模块
│      │  Pay.ts		app渠道插件内支付模块
│      │  User.ts		app渠道插件内用户模块
│      │  ...
│      │
│      └─wechat    微信小游戏渠道插件
├─test             测试代码
├─tools            构建工具等
└─dist             构建发布路径
```

