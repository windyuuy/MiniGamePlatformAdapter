
declare namespace CS.Glee.Bridge {
   export class SDKCrashAddonWrapper {

		/**
		* 为每一条上报记录设置用户标识，可以方便后期筛选和定位问题，比如开发人员想看到自己手机上报的崩溃信息，就可以采用这种方式：
		*/
        public SetUserInfo (info: CrashUserInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 主动上报异常 
		* 主动上报异常可帮助您来修正 BUG、改善产品。报表中,我们除了提供错 误次数的数据外,还提供错误的详细信息阅览,并会对错误进行合理分类。
		*/
        public ReportException (info: ExceptionInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 面包屑
		*       面包屑与日志信息类似，是开发人员自己定义的文本字符串。开发人员通过插入面包屑来记录应用程序运行时的信息，如变量值、应用程序状态、代码进展、用户操作、程序性能，以及回调（如低存储器警告）等事件。对于每个面包屑会话，SDK中自动存储的start痕迹标记用户会话的开始，每个面包屑会话最多有100条面包屑，每条面包屑最多可包含199个字符。添加面包屑:开发人员只需插入一个API调用。
		* 
		*       抓取的面包屑可以帮助开发人员：识别和分析会话事件、状态或参数来进行调试。利用这些信息，以及堆栈信息、诊断和用户搜索，确定问题根源。补充IDE调试，使他们能够捕获有关应用程序行为的有用信息，以便获得更多的用户。
		*/
        public LeaveBreadcrumb (info: BreadcrumbInfo, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 自定义日志
		*/
        public LogCustomEvent (info: SimpleLogCustomEventParams, callbacks: TaskCallback<AnyResult>):void;

    }

   export class CrashUserInfo {
       public name: string;
       public userId: number;
   }

   export class ExceptionInfo {
       public exception: string;
       public message: string;
   }

   export class BreadcrumbInfo {
   }

}
