# GDK开发者文档
## 1. GDK结构概述

- gdk 主要由`框架`和基于框架开发的各个`渠道插件`组成，不同的渠道可通过开发不同的渠道插件来实现适配。
- gdk `代码组织结构` 说明如下：

```
├─docs                  文档
│  ├─apidoc             api文档
│  └─devdoc             开发者文档
├─test                  测试代码
├─tools                 构建工具等
├─src                   源码
│  ├─framework          框架源码
│  │  ├─common          定义一些插件公用基类
│  │  ├─export          声明一些全局命名
│  │  ├─frame           实现gdk插件加载流程
│  │  └─sense           接口
│  ├─libs               外部依赖库
│  ├─lpluginshare       特定的插件共享代码
│  │  └─appshare        原生app插件共享代码
│  │     └─pay          支付相关代码
│  └─plugins            插件列表
│     ├─app             原生app插件
│     │  └─deps         存放插件外部依赖
│     │     │  deps.d.ts
│     │     │  gdkjsb.d.ts
│     │
│     │  config.ts          插件配置信息
│     │  RegisterList.ts    插件模块注册配置
│     │  tsconfig.json      插件typescript编译配置
│     │  Support.ts         插件公共开关
│     │  Advert.ts          广告模块
│     │  APISystem.ts
│     │  Auth.ts
│     │  Basic.ts
│     │  Common.ts
│     │  Customer.ts
│     │  Except.ts
│     │  GameInfo.ts
│     │  Hardware.ts
│     │  LocalPush.ts
│     │  Log.ts
│     │  LogBridge.ts
│     │  MServer.ts
│     │  Pay.ts
│     │  Share.ts
│     │  SubContext.ts
│     │  SystemInfo.ts
│     │  User.ts
│     │  UserData.ts
│     │  Widgets.ts
│     │  ...
│     │
│     └─wechat          微信小游戏渠道插件
└─dist                  构建发布路径
```

## 2. 如何在具体的插件中实现所需模块
以 `User` 模块举例，所需步骤如下：
- 在插件中继承自定义模块基类实现插件模块，命名按照固定格式，如：
```typescript
/** src/plugins/app/User.ts */
namespace AppGDK {
	export class User extends GDK.UserBase {
		...
	}
}
```
- 在插件的 `RegisterList.ts` 中注册自定义模块，如：
```typescript
/** src/plugins/app/RegisterList.ts */
export class RegisterList extends GDK.ModuleClassMap {
	...
	/** 注册AppGDK.User */
	User = User
}
```

## 3. 如果框架中不存在符合需求的`插件模块声明`，如何在 `framework` 中新增自定义`插件模块声明`
以 `User` 模块举例，所需步骤如下：
- `sense` 目录下新增模块对外接口（需继承 IModule），如：
```typescript
/**
	* 各种UI小部件调用
	*/
export interface IUser {
	...
}
```
- 在 `sense/IModuleMap.ts` 中注册模块接口，命名和注释要按照固定格式编写（用于自动生成api文档），如：
```typescript
export interface IModuleMap {
	...
	/** 插件元信息 */
	user: IUser
}
```
- `common` 中新增模块基类，命名按固定格式，如：
```typescript
export abstract class UserBase implements IUser {
	...
}
```
- `frame/ModuleClassMap.ts` 中注册模块接口，并可以指定模块的默认实现为其基类，命名按固定格式，如：
```typescript
export class ModuleClassMap {
	...
	User?: new () => IUser = UserBase
}
```