
namespace CS.ujlib {
   export class AnalyticsAddonWrapper {

		/**
		* 在应用的每个Activity的onResume方法里调用startSession()用于跟踪用户使用中的打开应用和页面跳转的数据。 
		*/
		/**
		* 在应用的每个Activity的onResume方法里调用startSession()用于跟踪用户使用中的打开应用和页面跳转的数据。 
		*/
        public StartSession (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 在应用的每个Activity中的onPause方法里调用stopSession(),用于跟踪用户离开页面和退出应用的数据。 
		*/
		/**
		* 在应用的每个Activity中的onPause方法里调用stopSession(),用于跟踪用户离开页面和退出应用的数据。 
		*/
        public StopSession (info: AnyParams, callbacks: TaskCallback<AnyResult>):void;

		/**
		* 自定义事件
		* 自定义事件可以实现在应用程序中埋点来统计用户的点击行为。同时,自定义事件还支持添加一些描述性的属性参数,使用多对 Key-Value 的方式来进行发送(非必须使用),用来对事件发生时的状况做详尽分析。
		*/
		/**
		* 自定义事件
		* 自定义事件可以实现在应用程序中埋点来统计用户的点击行为。同时,自定义事件还支持添加一些描述性的属性参数,使用多对 Key-Value 的方式来进行发送(非必须使用),用来对事件发生时的状况做详尽分析。
		*/
        public LogCustomEvent (info: SimpleLogCustomEventParams, callbacks: TaskCallback<LogEventResult>):void;

		/**
		* 设置日志相关配置
		*/
		/**
		* 设置日志相关配置
		*/
        public SetLogConfigs (info: LogConfigs, callbacks: TaskCallback<AnyResult>):void;

    }

   export class SimpleLogCustomEventParams {
       public key!: string;
       public data!: string;
   }

   export class LogConfigs {
       public onlineLogCommitInterval!: float;
       public captureUncaughtException!: boolean;
       public sessionContinueMillis!: number;
   }

}
