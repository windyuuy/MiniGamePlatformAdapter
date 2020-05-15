/**
 * 该宏用于在js代码中嵌入lua代码，它将在编译阶段将自动拆解，其中字符串将自动变成编译结果的一部分。
 * > 在业务代码中禁止使用
 * > 嵌入的字符串不可以是多段字符串拼接而成，否则在编译时将报错。
 */
declare function LUA(luaCode: string): any;

/**
 * https://cloud.tencent.com/developer/section/1489389
 */

declare interface Serializable {
}

declare type LuaDate = {
    /**
     * 日 1-31
     */
    day: number,
    /**
     * 小时 0-23
     */
    hour: number,
    /**
     * 是否为下令
     */
    isdst: boolean,
    /**
     * 分钟 0-59
     */
    min: number,
    /**
     * 月 1-12
     */
    month: number,
    /**
     * 秒 0-59
     */
    sec: number,
    /**
     * 星期 1-7
     */
    wday: number,
    /**
     * 该已经过去的天书 1-366
     */
    yday: number,
    /**
     * 年 如 1970
     */
    year: number
}

/**
 * error如果其参数的v值为假（即，无或错误），则调用; 否则，返回它的所有参数。在出错的情况下，message是错误对象; 当缺席时，它默认为“ assertion failed!”
 * @noSelf
 */
declare function assert(v: boolean, message?: string): any;


/**
 * 该函数是垃圾收集器的通用接口。它根据它的第一个参数执行不同的功能opt：
 * * “ collect”：执行完整的垃圾收集循环。这是默认选项。
 * * “ stop”：停止垃圾回收器的自动执行。收集器只有在显式调用时才会运行，直到调用才能重新启动。
 * * “ restart”：重新启动垃圾回收器的自动执行。
 * * “ count”：以千字节为单位返回Lua使用的总内存。该值有一个小数部分，所以它乘以1024给出了Lua使用的确切字节数（溢出除外）。
 * * “ step”：执行垃圾收集步骤。步骤“大小”由...控制arg。使用零值时，收集器将执行一个基本（不可分）的步骤。对于非零值，收集器将执行内存数量（以千字节为单位）由Lua分配。如果步骤完成收集周期，则返回true。
 * * “ setpause”：设置arg为收集器暂停的新值（见§2.5）。返回以前的暂停值。
 * * “ setstepmul”：设置arg为收集器步骤乘数的新值（见§2.5）。返回步骤的前一个值。
 * * “ isrunning”：返回一个布尔值，告诉收集器是否正在运行（即未停止）。
 * @noSelf
 */
declare function collectgarbage(opt?: any, arg?: any): any;

/**
 * 打开指定的文件并以Lua块的形式执行其内容。当不带参数调用时，dofile执行标准input（stdin）的内容。返回块返回的所有值。在发生错误的情况下，将错误dofile传播给其调用者（即，dofile不以保护模式运行）。
 * @noSelf
 */
declare function dofile(filename: string): any;

/**
 * 终止最后一个被调用的保护函数，并返回message错误对象。函数error永不返回。
 * 通常，error如果消息是字符串，则在消息的开头添加有关错误位置的一些信息。该level参数指定如何获取错误位置。对于级别1（默认值），错误位置是error调用函数的位置。级别2将错误指向调用的函数error被调用的位置; 等等。通过级别0可避免在消息中添加错误位置信息。
 * @noSelf
 */
declare function error(message: string | Serializable, level?: number): void;

/**
 * 一个保存全局环境的全局变量（不是函数）（见§2.2）。Lua本身并不使用这个变量; 改变其价值不会影响任何环境，反之亦然。
 */
declare var _G: any;

/**
 * 如果object没有metatable，则返回nil。否则，如果对象的metatable有一个__metatable字段，则返回相关的值。否则，返回给定对象的metatable。
 * @noSelf
 */
declare function getmetatable(object: any): any

/**
 * 返回三个值（一个迭代函数，表t和0），以便构造
 * ```lua
 * for i,v in ipairs(t) do body end
 * ```
 * 将迭代键值对（1,t[1]），（2,t[2]），...，直到第一个零值。
 * @noSelf
 */
declare function ipairs(): any;

/**
 * 加载一个块。
 *  如果chunk是字符串，则块是该字符串。如果chunk是一个函数，load请重复调用它以获取块碎片。每次调用都chunk必须返回一个与先前结果连接的字符串。返回一个空字符串，零或无值表示块的结尾。
 *  如果没有语法错误，则将编译后的块作为函数返回; 否则，返回nil加上错误消息。
 *  如果结果函数有价值，那么将第一个upvalue设置为值（env如果给出该参数），或设置为全局环境的值。其他upvalues初始化为零。（当你加载一个主块时，结果函数总是只有一个正值，即_ENV变量（参见§2.2）。但是，当你加载一个从函数创建的二进制块时（参见string.dump），结果函数可以有一个任意数字）所有upvalues是新鲜的，也就是说，他们不与任何其他功能共享。
 *  chunkname用作错误消息和调试信息块的名称（请参阅第4.9节）。如果不存在，则默认为chunk，如果chunk是字符串，则为默认值，否则为“ =(load)”。
 *  该字符串mode控制块是否可以是文本或二进制文件（即，预编译的块）。它可能是字符串“ b”（仅二进制块），“ t”（仅文本块）或“ bt”（二进制和文本）。默认是“ bt”。
 *  Lua不检查二进制块的一致性。恶意制作的二进制块可能会导致解释器崩溃。
 * @noSelf
 */
declare function load(chunk: any, chunkname?: string, mode?: string, env?: any): Function;

/**
 * 类似于load，但是从文件filename或标准输入中获取块，如果没有给出文件名。
 * @noSelf
 */
declare function loadfile(filename?: string, mode?: string, env?: any): any;

/**
 * 允许程序遍历表的所有字段。它的第一个参数是一个表，第二个参数是这个表中的一个索引。next返回表格的下一个索引及其相关的值。当用nil作为第二个参数调用时，next返回一个初始索引及其相关的值。当用最后一个索引调用时，或者在空表中调用nil时，next返回nil。如果第二个参数不存在，那么它被解释为零。特别是，您可以使用next(t)来检查表是否为空。
 * 没有指定枚举索引的顺序，即使对于数字索引也是如此。（要按数字顺序遍历表，请使用数字表示。）
 * next如果在遍历期间将任何值分配给表中不存在的字段，则其行为是未定义的。您可以修改现有的字段。特别是，您可以清除现有的字段。 
 * @noSelf
 */
declare function next(table: any, index?: number): any;

/**
 * 如果t有metamethod __pairs，则将其t作为参数进行调用，并返回调用的前三个结果。
 * 否则，返回三个值：next函数，表t和零，以便构建
 * 纠错
 * ```lua
 * for k,v in pairs(t) do body end
 * ```
 * 将遍历表的所有键值对t。
 * 请参阅函数next以了解在遍历过程中修改表的注意事项。
 * @noSelf
 */
declare function pairs(t: any): any;

/**
 * f使用保护模式中的给定参数调用函数。这意味着里面的任何错误f都不会传播; 相反，pcall捕获错误并返回状态码。它的第一个结果是状态码（一个布尔值），如果调用成功没有错误，则为true。在这种情况下，在pcall返回第一个结果后，还会返回来自呼叫的所有结果。如果出现任何错误，则pcall返回false加错误消息。
 * @noSelf
 */
declare function pcall(f: Function, ...args: any[]): any;

/**
 * 接收任意数量的参数并将其值输出到stdout，使用tostring函数将每个参数转换为字符串。print不适用于格式化输出，但仅用于显示值的快速方式，例如用于调试。为了完全控制输出，请使用string.format和io.write。
 * @noSelf
 */
declare function print(...args: any[]): any;

/**
 * 检查是否v1等于v2，而不调用__eq metamethod。返回一个布尔值。
 * @noSelf
 */
declare function rawequal(v1: any, v2: any): boolean;

/**
 * 获取真正的价值table[index]，而不用调用__indexmetamethod。table必须是一张桌子; index可能是任何值。
 * @noSelf
 */
declare function rawget(table: any, index: any): any;

/**
 * 返回对象的长度，该对象v必须是表或字符串，而不调用元__len方法。返回一个整数。
 * @noSelf
 */
declare function rawlen(v: string | any): number;


/**
 * 设置table[index]to 的实际值value，而不用调用__newindexmetamethod。table必须是表格，index不同于nil和NaN的value值以及任何Lua值。
 * 这个函数返回table。
 * @noSelf
 */
declare function rawset(table: any, index: any, value: any): any;

/**
 * 如果index是一个数字，则返回参数号后面的所有参数index; 从末尾开始的负数索引（-1是最后一个参数）。否则，index必须是字符串"#"，并select返回它收到的额外参数的总数。
 * @noSelf
 */
declare function select(index: number, ...args: any[]): any;

/**
 * 设置给定表格的元数据。（要更改其他类型的从Lua代码的元表，则必须使用调试库（§6.10）。）如果metatable是零，删除指定表的元表。如果原始metatable有一个__metatable字段，则会引发错误。
 * 这个函数返回table。
 * @noSelf
 */
declare function setmetatable(table: any, metatable: any): any;

declare function setfenv(f: Function, table: { [key: string]: any }): any;
declare function getfenv(f: Function): { [key: string]: any };

/**
 * 当用no调用时base，tonumber尝试将其参数转换为数字。如果参数已经是可转换为数字的数字或字符串，则tonumber返回该数字; 否则返回nil。
 * 根据Lua的词汇约定（见§3.1），字符串的转换可能导致整数或浮点数。（该字符串可能有前导和尾随空格以及符号。）
 * 当用with调用时base，那么e必须是一个字符串，将其解释为该基数中的整数。基数可以是2到36之间的任何整数，包括2和36。在10以上的基数中，字母“ A'（大写或小写）代表10，' B'代表11等等，其中' Z'代表35.如果字符串e在给定基数中不是有效数字，则函数返回零。
 * @noSelf
 */
declare function tonumber(e: any, base?: number): any;

/**
 * 接收任何类型的值并将其转换为可读格式的字符串。（要完全控制数字如何转换，请使用string.format。）
 * 如果metatable v有一个__tostring字段，那么tostring使用vas参数调用相应的值，并将调用的结果作为结果。
 * @noSelf
 */
declare function tostring(v: any): string;

/**
 * require 模块
 * @noSelf
 */
declare function require(path: string): any;


/**
 * 返回唯一参数的类型，以字符串形式编码。该函数的可能结果是“ nil”（一个字符串，而不是值nil），“ number”，“ string”，“ boolean”，“ table”，“ function”，“ thread”和“ userdata”。 
 * @noSelf
 */
declare function type(v: any): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata";

/**
 * 一个全局变量（不是函数），它包含一个包含正在运行的Lua版本的字符串。这个变量的当前值是“ Lua 5.3”。
 * @noSelf
 */
declare var _VERSION: string;


/**
 * 这个功能类似于pcall，除了它设置了一个新的消息处理程序msgh。
 * @noSelf
 * @tupleReturn
 */
declare function xpcall(f: Function, msgh: Function, ...args: any[]): any;

/**
 * 这个库包含操作协程的操作，这些操作来自表格内部coroutine。有关协程的一般描述，请参阅第2.6节。
 */
declare var coroutine: {
    /**
     * 创建一个新的协程，与身体f。f必须是一个功能。返回这个新的协程，它是一个带有类型的对象"thread"。
     * @noSelf
     */
    create(f: Function): any;

    /**
    * 当运行的协程可以屈服时返回true。
    * 如果运行的协程不是主线程，并且它不在不可执行的C函数内，则可运行协程。
    * @noSelf
    */
    isyieldable(): boolean;

    /**
    * 启动或继续执行协程co。你第一次恢复一个协程时，它开始运行它的身体。值val1，...作为参数传递给正文函数。如果协程已经产生，resume重新启动它; 值val1，...作为收益结果传递。
    * 如果协程没有任何错误地运行，则resume返回true加上传递给yield（当协程产生时）或者正文函数返回的任何值（当协程终止时）。如果有任何错误，则resume返回错误并附加错误消息。
    * @noSelf
    * @tupleReturn
    */
    resume(co: any, ...args: any[]): any;

    /**
    * 当运行的协程是主协程时，返回正在运行的协程和布尔值。
    * @noSelf
    */
    running(): boolean;

    /**
    * 返回协程的状态co，作为字符串："running"，如果协程正在运行（即它被调用status）; "suspended"，如果协程暂停了呼叫yield，或者尚未开始运行; "normal"如果协程是活动的但不运行（即它已经恢复了另一个协程）; 并且"dead"如果协程已经完成了它的主体功能，或者它已经停止了一个错误。
    * @noSelf
    */
    status(co: any): "running" | "suspended" | "normal" | "dead";

    /**
    * 创建一个新的协程，与身体f。f必须是一个功能。返回一个函数，每次调用时都会恢复协程。任何传递给该函数的参数都会作为额外的参数resume。返回resume除第一个布尔值之外返回的相同值。在发生错误的情况下，传播错误。
    * @noSelf
    */
    wrap(f: Function): any;

    /**
    * 暂停调用协程的执行。任何参数yield作为额外结果传递给resume。
    * @noSelf
    */
    yield(...args: any[]): any;
}


/**
 * 包库提供了用于在Lua中加载模块的基本设施。它直接在全球环境中输出一个函数：require。其他的一切都以表格的形式输出package。
 */
declare var package: {
    /**
     * 描述包的一些编译时配置的字符串。这个字符串是一系列的行：
     * * 第一行是目录分隔符字符串。\对于Windows，默认值为' '，/对于其他所有系统，默认值为' ' 。
     * * 第二行是分隔路径中模板的字符。默认是' ;'。
     * * 第三行是标记模板中替换点的字符串。默认是' ?'。
     * * 第四行是一个字符串，它在Windows的路径中被可执行文件的目录替换。默认是' !'。
     * * 第五行是构建luaopen_函数名称时忽略所有文本的标记。默认是' -'。
     * @noSelf
     */
    config: string;

    /**
     * require搜索C加载器所用的路径。
     * Lua 使用环境变量或环境变量或者定义的缺省路径，以与package.cpath初始化Lua路径相同的方式初始化C路径。package.pathLUA_CPATH_5_3LUA_CPATHluaconf.h
     * @noSelf
     */
    cpath: string;

    /**
     * 
     * 用于require控制哪些模块已经加载的表格。当你需要一个模块modname并且package.loaded[modname]不是假的，require只需返回存储在那里的值。
     * 这个变量只是对真实表的引用; 赋给这个变量不会改变使用的表require。
     * @noSelf
     */
    loaded: { [key: string]: any }

    /**
     * 将主机程序与C库动态链接libname。
     * 如果funcname是“ *”，那么它只与库链接，使库导出的符号可用于其他动态链接的库。否则，它将funcname在库中查找函数，并将此函数作为C函数返回。所以，funcname必须遵循lua_CFunction原型（见lua_CFunction）。
     * 这是一个低级功能。它完全绕过了封装和模块系统。不像require，它不执行任何路径搜索，也不会自动添加扩展。libname必须是C库的完整文件名，包括必要时包含路径和扩展名。funcname必须是由C库导出的确切名称（可能取决于所使用的C编译器和链接器）。
     * 标准C不支持此功能。因此，它仅在某些平台（Windows，Linux，Mac OS X，Solaris，BSD以及支持该dlfcn标准的其他Unix系统）上可用。
     * @noSelf
     */
    loadlib(libname: string, funcname: string): any;

    /**
     * require搜索Lua加载器所用的路径。
     * 在启动时，如果没有定义这些环境变量，Lua会使用环境变量LUA_PATH_5_3或环境变量的值LUA_PATH或定义的默认路径来初始化此变量luaconf.h。;;环境变量值中的任何“ ”被替换为默认路径。
     * @noSelf
     */
    path: string;

    /**
     * 用于存储特定模块的加载程序的表（请参阅require）。
     * 这个变量只是对真实表的引用; 赋给这个变量不会改变使用的表require。
     * @noSelf
     */
    preload: string;

    /**
     * 
     * 用于require控制如何加载模块的表格。
     * 此表中的每个条目都是搜索器功能。当查找一个模块时，require以升序方式调用每个搜索器，并将模块名称（给出的参数require）作为唯一参数。该函数可以返回另一个函数（模块加载器）加上一个将被传递给该加载器的额外值，或者一个字符串来解释为什么它找不到该模块（或者如果没有什么可说的话，则为零）。
     * Lua用四个搜索函数初始化这个表。
     * 第一个搜索者只是在package.preload表中寻找一个加载器。
     * 第二个搜索器使用存储在的路径查找一个加载器作为Lua库package.path。搜索按功能描述完成package.searchpath。
     * 第三个搜索器使用由变量给出的路径将加载器查找为C库package.cpath。再次，搜索按功能描述完成package.searchpath。例如，如果C路径是字符串
     * ```lua
     * "./?.so;./?.dll;/usr/local/?/init.so"
     * ```
     * 对于模块搜索foo将尝试打开这些文件./foo.so，./foo.dll以及/usr/local/foo/init.so以该顺序。一旦找到一个C库，该搜索器首先使用动态链接工具将应用程序与库链接起来。然后它试图在库中找到一个用作加载器的C函数。此C函数的名称是字符串“ luaopen_”，与模块名称的副本连接，每个点用下划线替换。此外，如果模块名称带有连字符，则会删除（并包括）第一个连字符后的后缀。例如，如果模块名称是a.b.c-v2.1，函数名称将是luaopen_a_b_c。
     * 第四个搜索者尝试一个全功能的加载器。它在C路径中搜索给定模块的根名称的库。例如，当需要时a.b.c，它会搜索一个C库a。如果找到，它会查看子模块的打开功能; 在我们的例子中，那将是luaopen_a_b_c。有了这个功能，软件包可以将几个C子模块打包到一个单独的库中，每个子模块保持其原有的开放功能。
     * 除第一个搜索者（预加载）外，所有搜索者都会返回额外值作为返回的模块的文件名package.searchpath。第一个搜索者没有返回任何额外的值。
     * @noSelf
     */
    searchers: any

    /**
     * 搜索给定name的给定path。
     * 路径是包含由分号分隔的模板序列的字符串。对于每个模板，该函数将模板中的每个询问标记（如果有）替换为副本，name其中sep默认情况下所有出现的（缺省为点）被rep（系统的目录分隔符，默认情况下）取代，然后尝试打开结果文件名。
     * 例如，如果路径是字符串
     * "./?.lua;./?.lc;/usr/local/?/init.lua"
     * 对于名称搜索foo.a将尝试打开这些文件./foo/a.lua，./foo/a.lc以及/usr/local/foo/a/init.lua以该顺序。
     * 返回可以在读取模式下（关闭文件后）打开的第一个文件的结果名称，如果没有成功，则返回nil加上错误消息。（此错误消息列出了它试图打开的所有文件名。）
     * @noSelf
     */
    searchpath(name: string, path: string, sep?: any, rep?: any): any;

}

/**
 * 加载给定的模块。该函数首先查看package.loaded表以确定是否modname已经加载。如果是，则require返回存储在的值package.loaded[modname]。否则，它会尝试为模块查找加载程序。
 * 要找到一个装载机，require由package.searchers序列指导。通过改变这个顺序，我们可以改变如何require查找模块。以下说明基于默认配置package.searchers。
 * 第一次require查询package.preload[modname]。如果它有一个值，这个值（它必须是一个函数）是加载器。否则require使用存储在路径中的路径搜索Lua加载程序package.path。如果这也失败了，它使用保存的路径搜索一个C加载器package.cpath。如果这也失败了，它会尝试一个全功能的加载程序（请参阅参考资料package.searchers）。
 * 一旦找到一个加载器，require就用两个参数调用加载器：modname一个额外的值取决于它如何得到加载器。（如果加载程序来自文件，则此额外值为文件名。）如果加载程序返回任何非零值，require则将返回值指定给package.loaded[modname]。如果加载器没有返回非零值并且没有分配任何值package.loaded[modname]，则将truerequire赋值给该条目。无论如何，返回最终值。requirepackage.loaded[modname]
 * 如果在加载或运行模块时出现任何错误，或者如果找不到该模块的任何加载程序，则会require引发错误。
 */
// declare function require(modname: string): any

/**
 * 这个库提供了字符串操作的通用函数，例如查找和提取子字符串以及模式匹配。在Lua中索引一个字符串时，第一个字符位于位置1（不是0，如C）。索引被允许为负数，并被解释为从字符串的末尾向后索引。因此，最后一个字符位于-1，依此类推。
 */
declare var string: {
    [key: string]: Function;
    /**
     * 返回字符的内部数字代码s[i]，s[i+1]，... s[j]。默认值为i1; jis 的默认值i。这些指数按照相同的功能规则进行修正string.sub。
     * @noSelf
     */
    byte(s: string, i?: number, j?: number): number | number[];

    /**
     * 接收零个或多个整数。返回一个长度等于参数个数的字符串，其中每个字符的内部数字代码等于其相应的参数。
     * @noSelf
     */
    char(...arg: number[]): string;

    /**
     * 返回包含给定函数的二进制表示（二进制块）的load字符串，以便稍后在此字符串上返回该函数的副本（但具有新的upvalues）。如果strip是真值，则二进制表示可能不包含有关该函数的所有调试信息，以节省空间。
     * 具有upvalues的功能只有保存的upvalues的数量。当（重新）加载时，那些upvalues会收到包含nil的新实例。（您可以使用调试库以适合您需要的方式序列化并重新载入函数的upvalues。）
     * @noSelf
     */
    dump(func: Function, strip?: boolean): any;

    /**
     * pattern查找字符串中的第一个匹配项（请参阅第6.4.1节）s。如果找到匹配项，则find返回s此事件开始和结束位置的索引; 否则返回nil。第三个可选的数字参数init指定从何处开始搜索; 其默认值是1，可以是负数。作为第四个可选参数的true值plain会关闭模式匹配工具，因此该函数会执行简单的“查找子字符串”操作，而不会将字符pattern视为魔术。请注意，如果plain给出，那么也init必须给出。
     * 如果模式已经捕获，那么在成功的匹配中，捕获的值也会在两个索引之后返回。
     * @noSelf
     * @tupleReturn
     */
    find(s: string, pattern: string, init?: number, plain?: boolean): [number, number];

    /**
     * 按照其第一个参数（必须是字符串）中给出的描述，返回其可变数量参数的格式化版本。格式字符串遵循与ISO C函数相同的规则sprintf。唯一的区别是选项/修饰符*，h，L，l，n，和p不支持，并且有一个额外的选项，q。
     * 该q选项在双引号之间格式化字符串，必要时使用转义序列以确保它可以安全地由Lua解释器读回。例如，电话
     * ```lua
     *  string.format('%q', 'a string with "quotes" and \n new line')
     * ```
     * 可能会产生字符串：
     * ```lua
     * "a string with \"quotes\" and \
     * new line"
     * ```
     * 选项A，a，E，e，f，G，和g所有期望一个数字作为论据。选项c，d，i，o，u，X，并x期待一个整数。当使用C89编译器编译Lua时，选项A和a（十六进制浮点数）不支持任何修饰符（标志，宽度，长度）。
     * 选项s需要一个字符串; 如果它的参数不是一个字符串，它将被转换为一个遵循相同的规则tostring。如果该选项具有任何修饰符（标志，宽度，长度），则字符串参数不应包含嵌入的零。
     * @noSelf
     */
    format(formatstring: string, ...arg: any[]): string;

    /**
     * 返回一个迭代器函数，每次调用它时，都会从pattern字符串中返回下一个捕获（请参阅第6.4.1节）s。如果pattern没有指定捕捉，那么整个比赛都是在每个呼叫中​​产生的。
     * 作为一个例子，下面的循环将遍历字符串中的所有单词s，每行打印一个单词：
     *  ```lua
     *  s = "hello world from Lua"
     *  for w in string.gmatch(s, "%a+") do
     *  print(w)
     *  end
     *  ```
     *  下一个示例key=value将给定字符串中的所有对收集到一个表中：
     *  ```lua
     *  t = {}
     *  s = "from=world, to=Lua"
     *  for k, v in string.gmatch(s, "(%w+)=(%w+)") do
     *  t[k] = v
     *  end
     *  ```
     *  对于这个函数，^模式开头的脱字符“ 不起作用”，因为这会阻止迭代。
     * @noSelf
     */
    gmatch(s: string, pattern: string): string[];

    /**
     * 返回一个副本，s其中（见第6.4.1节）的所有（或第一个n，如果给出）事件pattern已被替换字符串替换，该字符串repl可以是字符串，表格或函数。gsub作为其第二个值还返回发生的匹配总数。这个名字gsub来自全球性的Substitution。
        如果repl是字符串，则其值用于替换。该字符%用作转义字符：repl形式中的任何序列%d，其中d在1和9之间，代表第d个捕获子字符串的值。序列%0代表整个比赛。序列%%代表一个单一的%。

        如果repl是表格，则对每一个匹配查询表格，使用第一个捕捉作为关键字。

        纠错
        如果repl是一个函数，那么每次匹配时都会调用该函数，所有捕获的子字符串按顺序作为参数传递。

        无论如何，如果该模式没有指定捕获，那么它的行为就好像整个模式在捕获中一样。

        如果表查询或函数调用返回的值是字符串或数字，则将其用作替换字符串; 否则，如果它是假或无，则没有替换（即，原始匹配保留在字符串中）。

        这里有些例子：
        ```lua
        x = string.gsub("hello world", "(%w+)", "%1 %1")
        --> x="hello hello world world"

        x = string.gsub("hello world", "%w+", "%0 %0", 1)
        --> x="hello hello world"

        x = string.gsub("hello world from Lua", "(%w+)%s*(%w+)", "%2 %1")
        --> x="world hello Lua from"

        x = string.gsub("home = $HOME, user = $USER", "%$(%w+)", os.getenv)
        --> x="home = /home/roberto, user = roberto"

        x = string.gsub("4+5 = $return 4+5$", "%$(.-)%$", function (s)
            return load(s)()
            end)
        --> x="4+5 = 9"

        local t = {name="lua", version="5.3"}
        x = string.gsub("$name-$version.tar.gz", "%$(%w+)", t)
        --> x="lua-5.3.tar.gz"
        ```
        @noSelf
     */
    gsub(s: string, pattern: string, repl: any, n?: number): string;
    /**
     * 接收一个字符串并返回其长度。空字符串的""长度为0.嵌入的零计数，"a\000bc\000"长度为5。
     * @noSelf
     */
    len(s: string): number;

    /**
     * 接收一个字符串并返回该字符串的一个副本，并将所有大写字母改为小写。所有其他角色保持不变。大写字母的定义取决于当前的语言环境。
     * @noSelf
     */
    lower(s: string): string;

    /**
     * 查找字符串中的第一个匹配项pattern（请参阅第6.4.1节）s。如果它找到一个，然后match从模式中返回捕获; 否则返回零。如果pattern指定不捕获，则返回整个匹配。第三个可选的数字参数init指定从何处开始搜索; 其默认值是1，可以是负数。
     * @noSelf
     */
    match(s: string, pattern: string, init?: number): string;

    /**
     * 返回包含的值的二进制串v1，v2等堆积（即，在二进制形式串行化）根据格式字符串fmt（参见§6.4.2）。
     * @noSelf
     */
    pack(fmt: string, v1: string, v2: string, ...arg: any[]): string;

    /**
     * 返回string.pack给定格式的字符串的大小。格式字符串不能有可变长度选项' s'或' z'（见§6.4.2）。
     * @noSelf
     */
    packsize(fmt: string): number

    /**
     * 返回一个字符串，它是n由字符串s分隔的字符串副本的串联sep。默认值sep是空字符串（即没有分隔符）。如果n不是正值，则返回空字符串。
     * @noSelf
     */
    rep(s: string, n: string | number, stp?: number): string;

    /**
     * 返回一个字符串，该字符串是字符串s反转
     * @noSelf
     */
    reverse(s: string): string;

    /**
     * 返回该字符串的子字符串，s并从此处i继续j; i并j可能是负面的。如果j不存在，则假定它等于-1（这与字符串长度相同）。特别是，该调用string.sub(s,1,j)返回s长度的前缀j，string.sub(s, -i)（对于正数i）返回s长度的后缀i。
     * 如果在负指数转换后i小于1，则校正为1.如果j大于字符串长度，则校正为该长度。如果，这些修正后，i大于j，该函数返回空字符串。
     * @noSelf
     */
    sub(s: string, i: number, j?: number): string;

    /**
     * 根据格式字符串返回按字符串打包的值s（请参阅第6.4.2节）。可选标记从哪里开始阅读（默认为1）。在读取值之后，该函数还返回第一个未读字节的索引。string.packfmtposss
     * @noSelf
     */
    unpack(fmt: string, s: string, pos?: number): string

    /**
     * 接收一个字符串并返回此字符串的一个副本，并将所有小写字母更改为大写。所有其他角色保持不变。小写字母的定义取决于当前的语言环境。
     * @noSelf
     */
    upper(s: string): string;
}

/**
 * 该库为UTF-8编码提供基本支持。它提供了表格内的所有功能utf8。除了处理编码之外，该库不提供对Unicode的任何支持。任何需要字符含义的操作，如字符分类，都不在其范围之内。
 * 除非另有说明，否则将字节位置作为参数的所有函数都假定给定的位置是字节序列的开始或加上主题字符串的长度。就像在字符串库中一样，从字符串末尾开始计算负指数。
 */
declare var utf8: {
    /**
     * 接收零个或多个整数，将每个整数转换为其对应的UTF-8字节序列，并返回一个串联所有这些序列的字符串。
     * @noSelf
     */
    char(...n: number[]): string

    /**
     * 模式（一个字符串，不是函数）“ [\0-\x7F\xC2-\xF4][\x80-\xBF]*”（见§6.4.1），它恰好匹配一个UTF-8字节序列，假设主体是一个有效的UTF-8字符串。
     * @noSelf
     */
    charpattern: string

    /**
     * 返回值以便构造 
     * ```lua
     * for p, c in utf8.codes(s) do body end
     * ```
     * 将迭代字符串中的所有字符s，其中p包括c每个字符的位置（以字节为单位）和代码点。如果它遇到任何无效的字节序列，则会引发错误。
     * @noSelf
     */
    codes(s: string): any

    /**
     * 返回s字节位置i和j（均包含）之间的所有字符中的代码点（以整数形式）。缺省值i是1和j是i。如果它遇到任何无效的字节序列，则会引发错误。
     * @noSelf
     */
    codepoint(s: string, i?: number, j?: number): number[]

    /**
     * 返回s在位置i和j（包括两个端点）之间开始的字符串中UTF-8字符的数量。缺省值i是1，并且j是-1。如果发现任何无效的字节序列，则返回一个假值加上第一个无效字节的位置。
     * @noSelf
     */
    len(s: string, i?: number, j?: number): number;

    /**
     * 返回（从位置开始计数）n第 - 个字符开始编码的位置（以字节为单位）。负数在位置前获得字符。当为非负时默认为1 ，否则为从字符串末尾获得第 - 个字符的偏移量。如果指定的字符既不在主题中，也不在主题结束后，该函数返回nil。siniin#s + 1utf8.offset(s, -n)n
     * 作为特殊情况，当n为0时，函数返回包含第 - i个字节的字符的编码开始s。
     * 这个函数假定这s是一个有效的UTF-8字符串。
     * @noSelf
     */
    offset(s: string, n: number, i?: number): any[];
}

/**
 * 该库为表格操作提供了通用函数。它提供了表格内的所有功能table。
 * 记住，每当一个操作需要一个表的长度时，关于长度运算符的所有注意事项都适用（见§3.4.7）。所有函数都会忽略以参数形式给出的表中的非数字键。
 */
declare var table: {
    /**
     * 给定一个列表，其中所有元素都是字符串或数字，返回字符串list[i]..sep..list[i+1] ··· sep..list[j]。默认值为sep空字符串，默认i值为1，默认j值为#list。如果i大于j，则返回空字符串。
     * @noSelf
     */
    concat(list: any, sep?: number, i?: number, j?: number): any

    /**
     * 插入元件value在位置pos中list，上移的元素list[pos], list[pos+1], ···, list[#list]。posis 的缺省值#list+1，以便在列表末尾table.insert(t,x)插入一个调用。xt
     * @noSelf
     */
    insert(list: any, posOrValue?: number | any, value?: any): void;

    /**
     * a1将表格中的元素移动到表格a2，执行与以下多重赋值相同的操作：a2[t],··· = a1[f],···,a1[e]。a2is 的默认值是a1。目标范围可以与源范围重叠。要移动的元素数量必须符合Lua整数。
     * 返回目标表a2。
     * @noSelf
     */
    move(a1: any, f: any, e: any, t: any, a2?: any): any;

    /**
     * 返回一个新表格，其中所有参数存储在键1,2等中，并带有一个n带有参数总数“ ” 的字段。请注意，结果表可能不是一个序列。
     * @noSelf
     */
    pack(...args: any): any[];

    /**
     * 从list位置处的元素中移除pos，返回已移除元素的值。当pos是1和1之间的整数时#list，它将元素向下移动list[pos+1], list[pos+2], ···, list[#list]并擦除元素list[#list]; pos当#list为0时，索引也可以为0，或者#list + 1; 在这些情况下，该功能会擦除该元素list[pos]。
     * posis 的默认值#list，以便调用table.remove(l)删除列表的最后一个元素l。
     * @noSelf
     */
    remove(list: any, pos?: number): any;

    /**
     * 排序列出一个给定的顺序元素，就地，从list[1]到list[#list]。如果comp给出，那么它必须是一个接收两个列表元素的函数，并且当第一个元素必须位于最后一个顺序中的第二个元素之前时返回true（所以在排序后i < j隐含not comp(list[j],list[i])）。如果comp没有给出，则使用标准的Lua运算符<。
     * 请注意，comp函数必须在列表中的元素上定义严格的部分顺序; 也就是说，它必须是不对称和传递的。否则，无法进行有效的排序。
     * 排序算法不稳定：按给定顺序认为相同的元素可能会根据排序而改变其相对位置。
     * @noSelf
     */
    sort(list: any, comp?: Function): any;

    /**
     * 返回给定列表中的元素。这个功能相当于
     * ```lua
     * return list[i], list[i+1], ···, list[j]
     * ```
     * 默认情况下，i是1并且j是#list。
     * @noSelf
     */
    unpack(list: any, i?: any, j?: any): any;

}

/**
 * 这个库提供了基本的数学函数。它提供了表格中的所有功能和常量math。带注释“ integer/float”的函数给出整数参数的整数结果，以及浮点（或混合）参数的浮点结果。舍入函数（math.ceil，，math.floor和math.modf）在结果符合整数范围时返回整数，否则返回浮点数。
 */
declare var math: {
    /**
     * 返回的绝对值x。（整数/浮点）
     * @noSelf
     */
    abs(x: number): number

    /**
     * 返回x（弧度）的反余弦值。
     * @noSelf
     */
    acos(x: number): number

    /**
     * 返回x（弧度）的反正弦值。
     * @noSelf
     */
    asin(x: number): number

    /**
     * 返回y/x（以弧度为单位）的反正切，但使用两个参数的符号来查找结果的象限。（它也可以正确处理x为零的情况。）
     * 默认值为x1，以便该调用math.atan(y)返回的反正切值y。
     * @noSelf
     */
    atan(y: number, x?: number): number

    /**
     * 返回大于或等于的最小整数值x。
     * @noSelf
     */
    ceil(x: number): number

    /**
     * 返回余弦值x（假设为弧度）。
     * @noSelf
     */
    cos(x: number): number

    /**
     * 将角度x从弧度转换为度数。
     * @noSelf
     */
    deg(x: number): number

    /**
     * 返回值ex（其中e是自然对数的底数）。
     * @noSelf
     */
    exp(x: number): number

    /**
     * 返回小于或等于的最大积分值x。
     * @noSelf
     */
    floor(x: number): number

    /**
     * pow
     * @param x 
     * @param y 
     */
    pow(x: number, y: number): number


    /**
     * 返回xby 的除法余数，y将商向零进行舍入。（整数/浮点）
     * @noSelf
     */
    fmod(x: number, y: number): number

    /**
     * 浮点值HUGE_VAL，一个大于任何其他数值的值。
     */
    huge: number

    /**
     * 返回x给定基数的对数。默认base值为e（使函数返回自然对数x）。
     * @noSelf
     */
    log(x: number, base?: number): number

    /**
     * 根据Lua运算符，返回具有最大值的参数<。（整数/浮点）
     * @noSelf
     */
    max(x: number, ...args: number[]): number

    /**
     * 一个整数，其最大值为整数。
     */
    maxinteger: number

    /**
     * 根据Lua运算符，返回具有最小值的参数<。（整数/浮点）
     * @noSelf
     */
    min(x: number, ...args: number[]): number

    /**
     * 一个整数的最小值的整数。
     * @noSelf
     */
    mininteger: number

    /**
     * 返回的整数部分x和小数部分x。其第二个结果总是一个浮动。
     * @noSelf
     * @tupleReturn
     */
    modf(x: number): [number, number]

    /**
     * π的值。
     * @noSelf
     */
    pi: number

    /**
     * 将x度数转换为弧度。
     * @noSelf
     */
    rad(x: number): number

    /**
     * 在没有参数的情况下调用时，返回一个在[0,1]范围内均匀分布的伪随机浮点数。当与两个整数称为m和n，math.random返回与在范围内均匀分布的伪随机整数M，N。（nm值不能是负数，必须符合一个Lua整数。）该调用math.random(n)等价于math.random(1,n)。
     * 该功能是由C提供的下层伪随机生成器功能的接口。
     * @noSelf
     */
    random(m?: number, n?: number): number

    /**
     * 设置x为伪随机生成器的“种子”：相等的种子产生相同的数字序列。
     * @noSelf
     */
    randomseed(x: number): number

    /**
     * 返回x（假定为弧度）的正弦值。
     * @noSelf
     */
    sin(x: number): number

    /**
     * 返回的平方根x。（您也可以使用表达式x^0.5来计算此值。）
     * @noSelf
     */
    sqrt(x: number): number

    /**
     * 返回x（假定以弧度表示）的正切值。
     * @noSelf
     */
    tan(x: number): number

    /**
     * 如果该值x可转换为整数，则返回该整数。否则，返回零。
     * @noSelf
     */
    tointeger(x: number): number

    /**
     * 返回“ integer”if x是一个整数，“ float”如果它是一个浮点数，或者nil如果x不是一个数字。
     * @noSelf
     */
    type(x: number): number

    /**
     * 返回一个布尔值，当且仅当整数真正m低于整数n，当他们为无符号整数比较。
     * @noSelf
     */
    ult(m: number, n: number): number


}

declare type LuaFile = {
    /**
     * 关闭file。请注意，文件在垃圾回收处理时会自动关闭，但需要花费无法预测的时间。
     * 当关闭使用创建的文件句柄时io.popen，file:close返回相同的返回值os.execute。
     * @noSelf
     */
    close(): any;

    /**
     * 保存任何写入的数据file。
     * @noSelf
     */
    flush(): any;

    /**
     * 返回一个迭代器函数，每次调用时都会根据给定的格式读取文件。如果没有给出格式，则使用“ l”作为默认值。作为一个例子，建设
     * ```lua
     * for c in file:lines(1) do body end
     * ```
     * 将从当前位置开始迭代文件的所有字符。不像io.lines，这个函数在循环结束时不会关闭文件。
     * 如果出现错误，该函数会引发错误，而不是返回错误代码。
     * @noSelf
     */
    lines(...args: any[]): any;

    /**
     * file根据给定的格式读取文件，这些格式指定要读取的内容。对于每种格式，该函数都返回一个字符串或一个数字，并读取字符; 如果无法读取指定格式的数据，则返回nil。（在后一种情况下，该函数不会读取后续格式。）当没有格式时，它使用读取下一行的默认格式（见下文）。
     * 可用的格式是
     * * “ n”：按照Lua的词汇约定，读取一个数字并将其作为浮点数或整数返回。（数字可能有前导空格和符号。）这种格式总是读取最长的输入序列，该输入序列是数字的有效前缀; 如果该前缀未形成有效数字（例如，空字符串，“ 0x”或“ 3.4e-”），则将其丢弃并且函数返回nil。
     * * “ a”：从当前位置开始读取整个文件。在文件结尾处，它返回空字符串。
     * * “ l”：读取下一行跳过行尾，在文件结尾处返回零。这是默认格式。
     * * “ L”：读取保存行尾字符的下一行（如果存在），在文件结尾处返回nil。
     * 
     * number： 读取一个字节数最多的字符串，在文件结尾处返回 nil。如果number为零，则它什么都不读，并返回一个空字符串，或者在文件结尾处为零。
     * 格式“ l”和“ L”只能用于文本文件。
     * @noSelf
     */
    read(...args: any[]): any


    /**
     * 设置并从文件开始处测量文件位置到offset由字符串指定的基点加上的位置whence，如下所示：
     * * “ set”：base是位置0（文件的开头）;
     * * “ cur”：基数是当前位置;
     * * “ end”：基地是文件的结尾;
     * 
     * 在成功的情况下，seek返回最终的文件位置，从文件开始以字节为单位测量。如果seek失败，则返回nil，加上描述错误的字符串。
     * whenceis 的默认值为"cur"，并且for offset为0.因此，调用file:seek()返回当前文件位置，而不更改它; 该调用file:seek("set")将位置设置为文件的开始位置（并返回0）; 并且调用file:seek("end")将该位置设置为文件末尾，并返回其大小。
     * @noSelf
     */
    seek(whence?: any, offset?: any): any


    /**
     * 设置输出文件的缓冲模式。有三种可用模式：
     * “ no”：无缓冲; 任何输出操作的结果都立即出现。
     * “ full”：完全缓冲; 输出操作仅在缓冲区已满或您明确flush指定文件时执行（请参阅io.flush）。
     * “ line”：行缓冲; 输出被缓冲直到输出换行符或者从某些特殊文件（例如终端设备）输入任何输入。
     * 对于最后两种情况，请size指定缓冲区的大小（以字节为单位）。默认值是合适的大小。
     * @noSelf
     */
    setvbuf(mode: string, size?: any): any


    /**
     * 将其每个参数的值写入file。参数必须是字符串或数字。
     * 如果成功，此函数返回file。否则返回nil加一个描述错误的字符串。
     * @noSelf
     */
    write(...args: any[]): any

}

/**
 * I / O库为文件操作提供了两种不同的样式。第一个使用隐式文件句柄; 即有设置默认输入文件和默认输出文件的操作，并且所有输入/输出操作都在这些默认文件上。第二种风格使用显式文件句柄。
 * 使用隐式文件句柄时，所有操作都由表提供io。当使用显式文件句柄时，操作io.open返回一个文件句柄，然后提供所有操作作为文件句柄的方法。
 * 该表io还提供了由C它们的通常含义三个预定义的文件句柄：io.stdin，io.stdout，和io.stderr。I / O库从不关闭这些文件。
 * 除非另有说明，否则所有I / O函数在失败时都会返回nil（作为第二个结果加上一个错误消息，并将第三个结果作为依赖于系统的错误代码），并且某些值与成功时的零值不同。在非POSIX系统上，在发生错误时计算错误消息和错误代码可能不是线程安全的，因为它们依赖于全局C变量errno。
 */
declare var io: {
    /**
     * 相当于file:close()。没有file，关闭默认的输出文件。
     * @noSelf
     */
    close(file?: LuaFile): void

    /**
     * 相当于io.output():flush()。
     * @noSelf
     */
    flush(): void

    /**
     * 当用文件名称调用时，它将打开指定文件（以文本模式），并将其句柄设置为默认输入文件。当用文件句柄调用时，它只是将此文件句柄设置为默认输入文件。当不带参数调用时，它返回当前的默认输入文件。
     * 如果出现错误，该函数会引发错误，而不是返回错误代码。
     * @noSelf
     */
    input(file?: string | LuaFile): void

    /**
     * 以读取模式打开给定的文件名，并返回一个迭代器函数，它可以像file:lines(···)打开的文件一样工作。当迭代器函数检测到文件结束时，它将不返回任何值（完成循环）并自动关闭文件。
     * 通话io.lines()（没有文件名）相当于io.input():lines("*l"); 也就是说，它遍历默认输入文件的行。在这种情况下，循环结束时它不会关闭文件。
     * 如果出现错误，该函数会引发错误，而不是返回错误代码。
     * @noSelf
     */
    lines(filename: string, ...args: any[]): void;

    /**
     * 该函数以字符串中指定的模式打开一个文件mode。如果成功，它会返回一个新的文件句柄。
     * 该mode字符串可以是下列任何一项：
     * * “ r”：读取模式（默认）;
     * * “ w”：写入模式;
     * * “ a”：追加模式;
     * * “ r+”：更新模式，所有以前的数据被保留;
     * * “ w+”：更新模式，所有先前的数据被擦除;
     * * “ a+”：追加更新模式，保留以前的数据，只允许在文件末尾写入。
     * 该mode字符串最后也可以有'' b'，这在某些系统中需要以二进制模式打开文件。
     * @noSelf
     */
    open(filename: string, mode?: string): LuaFile;

    /**
     * 与io.input默认输出文件类似，但操作在默认输出文件上。
     * @noSelf
     */
    output(file?: string | LuaFile): LuaFile

    /**
     * 此功能取决于系统，并不适用于所有平台。
     * prog以独立进程启动程序并返回一个文件句柄，您可以使用该句柄从此程序读取数据（如果mode是"r"，则为默认值）或将数据写入此程序（如果mode是"w"）。
     * @noSelf
     */
    popen(prog: any, mode?: string): LuaFile;



    /**
     * 相当于io.input():read(···)。
     * @noSelf
     */
    read(...args: any[]): any


    /**
     * 如果成功，则返回临时文件的句柄。该文件以更新模式打开，并在程序结束时自动删除。
     * @noSelf
     */
    tmpfile(): LuaFile;

    /**
     * 检查是否obj是有效的文件句柄。返回字符串，"file"如果obj是打开的文件句柄，"closed file"if obj是关闭的文件句柄，或者如果不是文件句柄，则返回nilobj。
     * @noSelf
     */
    type(file: LuaFile): "file" | "closed file" | null;

    /**
     * 相当于io.output():write(···)。
     * @noSelf
     */
    write(...args: any[]): any;

}

/**
 * 这个库是通过表来实现的os。
 */
declare var os: {
    /**
     * 返回程序使用的CPU时间量的近似值。
     * @noSelf
     */
    clock(): number;

    /**
     *  返回包含日期和时间的字符串或表格，并根据给定的字符串格式化format。
     *  如果time参数存在，这是要格式化的时间（请参阅该os.time函数以获取该值的说明）。否则，date格式化当前时间。
     *  如果format以' !' 开头，则日期格式为协调世界时。在此可选字符后，如果format是字符串“ *t”，则date返回包含以下字段的表：year，month（1-12），day（1-31），hour（0-23），min（0-59），sec（0-61 ），wday（星期一，星期一，星期日，星期一，星期一，星期一，星期一，星期一yday，1-366）和isdst夏令时标志布尔值。如果信息不可用，则最后一个字段可能不存在。
     *  如果format不是“ *t”，则date将该日期作为字符串返回，按照与ISO C函数相同的规则格式化strftime。
     *  在没有参数的情况下调用时，date返回依赖于主机系统和当前语言环境的合理日期和时间表示。（更具体地说，os.date()相当于os.date("%c")。）
     *  在非POSIX系统上，由于它依赖于C函数gmtime和C函数，此函数可能不是线程安全的localtime。
     * @noSelf
     */
    date(format?: string, time?: number): string | LuaDate
    /**
     * t1不时t2（以秒为单位）返回差值（其中时间是返回的值os.time）。在POSIX，Windows和其他一些系统中，这个值就是t2-t1。
     * @noSelf
     */
    difftime(t2: number, t1: number): number

    /**
     * 该功能等同于ISO C功能system。它传递command给操作系统shell执行。如果命令成功终止，其第一个结果是true，否则为零。在第一个结果之后，函数返回一个字符串加上一个数字，如下所示：
     * * “ exit”：命令正常终止; 以下数字是该命令的退出状态。
     * * “ signal”：命令被信号终止; 以下数字是终止命令的信号。
     * 
     * 当没有调用时command，os.execute返回一个布尔值，如果shell可用，则返回true。
     * @noSelf
     */
    execute(command?: string): any

    /**
     * 调用 ISO C 函数exit来终止主机程序。如果code为真，返回的状态是EXIT_SUCCESS; 如果code是false，返回的状态是EXIT_FAILURE; 如果code是一个数字，返回的状态就是这个数字。作为默认值code是真。
     * 如果可选的第二个参数close为true，则在退出之前关闭Lua状态。
     * @noSelf
     */
    exit(code?: number, close?: boolean): any;

    /**
     * 返回流程环境变量的值，如果变量未定义varname，则返回nil。
     * @noSelf
     */
    getenv(varname: string): any

    /**
     * 用给定名称删除文件（或POSIX系统上的空目录）。如果此函数失败，则返回nil，加上描述错误和错误代码的字符串。否则，它返回true。
     * @noSelf
     */
    remove(filename: string): any

    /**
     * 重命名指定的文件或目录oldname来newname。如果此函数失败，则返回nil，加上描述错误和错误代码的字符串。否则，它返回true。
     * @noSelf
     */
    rename(oldname: string, newname: string): any

    /**
     * 设置程序的当前区域设置。locale是一个指定语言环境的依赖于系统的字符串; category是可选的字符串描述改变哪一类："all"，"collate"，"ctype"，"monetary"，"numeric"，或"time"; 默认类别是"all"。该函数返回新语言环境的名称，或者如果请求无法兑现，则返回nil。
     * 如果locale是空字符串，则将当前语言环境设置为实现定义的本地语言环境。如果locale是字符串“ C”，则将当前语言环境设置为标准C语言环境。
     * 当用nil作为第一个参数调用时，此函数仅返回给定类别的当前语言环境的名称。
     * 这个函数可能不是线程安全的，因为它依赖于C函数setlocale。
     * @noSelf
     */
    setlocale(locale: string, category?: "all" | "collate" | "ctype" | "monetary" | "numeric" | "time"): any;

    /**
     * 在不带参数的情况下调用当前时间，或者返回表示由给定表指定的本地日期和时间的时间。该表必须包含字段year，month和day，并且可能有字段hour（默认值为12），min（默认值为0），sec（默认值为0）和isdst（默认值为零）。其他字段被忽略。有关这些字段的说明，请参阅该os.date功能。
     * 这些字段中的值不需要在有效范围内。例如，如果sec是-10，则表示距其他字段指定的时间为-10秒; 如果hour是1000，则表示距其他字段指定的时间+1000小时。
     * 返回的值是一个数字，其含义取决于您的系统。在POSIX，Windows和其他一些系统中，这个数字计算自某些给定开始时间（“时代”）以来的秒数。在其它系统中，意思是未指定，并且通过返回的数字time只能用于作为参数os.date和os.difftime。
     * @noSelf
     */
    time(table?: {
        year: number,
        month: number,
        day: number,
        /**
         * 默认值为12
         */
        hour?: number,
        /**
         * 默认值为0
         */
        min?: number,
        /**
         * 默认值为0
         */
        sec: number,
        /**
         * 默认值为零
         */
        isdst: number | boolean
    }): number;

    /**
     * 返回可用于临时文件的具有文件名的字符串。该文件必须在使用前明确打开，并在不再需要时明确删除。
     * 在POSIX系统上，该功能还会创建一个具有该名称的文件，以避免安全风险。（其他人可能会在获取名称和创建文件之间的时间内以错误的权限创建文件。）您仍然必须打开文件才能使用该文件并将其删除（即使您不使用它）。
     * 如果可能，您可能更喜欢使用io.tmpfile，它会在程序结束时自动删除文件。
     * @noSelf
     */
    tmpname(): string;


}

/**
 * 该库为Lua程序提供了调试接口（§4.9）的功能。使用这个库时应该小心。它的几个函数违反了关于Lua代码的基本假设（例如，函数本地的变量不能从外部访问;用户数据元表达式不能被Lua代码改变; Lua程序不会崩溃），因此可能危及其他安全代码。而且，这个库中的一些功能可能会很慢。
 * debug表格中提供了该库中的所有功能。所有在线程上运行的函数都有一个可选的第一个参数，它是要运行的线程。默认总是当前线程。
 */
declare var debug: {
    /**
     * 与用户进入交互模式，运行用户输入的每个字符串。使用简单的命令和其他调试工具，用户可以检查全局和局部变量，更改它们的值，评估表达式等等。只包含单词的行cont结束此函数，以便调用方继续执行。
     * 请注意，用于命令的命令在debug.debug词汇上不嵌套在任何函数中，因此不能直接访问局部变量。
     * @noSelf
     */
    debug(): any;

    /**
     * 返回线程的当前钩子设置，作为三个值：当前钩子函数，当前钩子掩码和当前钩子计数（由debug.sethook函数设置）。
     * @noSelf
     */
    gethook(): any;
    gethook(thread?: any): any;

    /**
     * 返回包含有关函数信息的表格。你可以直接给这个函数，或者你可以给一个数字作为值f，这意味着f在给定线程的调用堆栈级别上运行的函数：0级是当前函数（getinfo本身）。等级1是被调用的函数getinfo（除了不计入堆栈的尾调用外）; 等等。如果f是大于活动函数数的数字，则getinfo返回nil。
     * 返回的表可以包含返回的所有字段lua_getinfo，字符串what描述填写哪些字段。缺省值what是获取所有可用信息，有效行表除外。如果存在，则选项“ f'添加一个以func该函数本身命名的字段。如果存在，选项' L'添加一个以activelines有效行表命名的字段。
     * 例如debug.getinfo(1,"n").name，如果可以找到合理的名称，则该表达式返回当前函数的名称，并且该表达式debug.getinfo(print)返回一个包含关于该print函数的所有可用信息的表。
     * @noSelf
     */
    getinfo(thread: any, f: any, what?: any): any;
    getinfo(f: any, what?: any): any;

    /**
     * 此函数返回本地变量的名称和值，以及堆栈local级别的函数的索引f。该函数不仅访问显式局部变量，还访问参数，临时对象等。
     * 第一个参数或局部变量具有索引1，依此类推，按照它们在代码中声明的顺序，只计算在当前函数范围内处于活动状态的变量。负指数是指可变参数; -1是第一个可变参数。如果没有给定索引的变量，则该函数返回nil，并在超出范围的级别调用时引发错误。（您可以打电话debug.getinfo查看该级别是否有效。）
     * 以' ('（左圆括号）开头的变量名称表示没有已知名称的变量（内部变量，如循环控制变量，以及块保存而没有调试信息的变量）。
     * 该参数f也可以是一个函数。在这种情况下，getlocal只返回函数参数的名称。
     * @noSelf
     */
    getlocal(thread: any, f: any, local: any): any;
    getlocal(f: any, local: any): any;


    /**
     * 返回给定value或nil的metatable，如果它没有metatable。
     * @noSelf
     */
    getmetatable(value: any): any;

    /**
     * 返回注册表表（请参阅§4.5）。
     * @noSelf
     */
    getregistry(): any;

    /**
     * 该函数返回的名称和的upvalue的索引值up的功能f。如果给定索引不存在上值，则函数返回nil。
     * 以' ('（左括号）开头的变量名表示没有已知名称的变量（保存了没有调试信息的块的变量）。
     * @noSelf
     */
    getupvalue(f: any, up: any): any;

    /**
     * 返回与之相关的Lua值u。如果u不是完整的用户数据，则返回nil。
     * @noSelf
     */
    getuservalue(u: any): any;

    /**
     * 将给定的函数设置为钩子。字符串mask和数字count描述何时调用钩子。字符串掩码可以具有以下字符的任意组合，并具有给定的含义：
     * * ' c'：每次Lua调用函数时都会调用该钩子;
     * * ' r'：每次Lua从函数返回时都会调用钩子;
     * * ' l'：每次Lua输入一行新代码时都会调用钩子。
     * 而且，与count零不同的是，钩子在每个count指令之后也被调用。
     * 在没有参数的情况下调用时，debug.sethook关闭钩子。
     * 当钩被调用时，它的第一个参数是描述已经触发了呼叫事件的字符串："call"（或"tail call"）"return"，"line"和"count"。对于线事件，挂钩也会获取新的线号作为其第二个参数。在一个钩子里面，你可以调用getinfo2级来获得关于运行函数的更多信息（0级是getinfo函数，1级是钩子函数）。
     * @noSelf
     */
    sethook(thread: any, hook: any, mask: any, count?: any): any;
    sethook(hook: any, mask: any, count?: any): any;

    /**
     * 该函数将该值赋给value本地变量，并在堆栈local级别使用该函数的索引level。如果没有给定索引的局部变量，则该函数返回nil，并在level超出范围调用时引发错误。（您可以调用getinfo以检查该级别是否有效。）否则，它将返回本地变量的名称。
     * 请参阅debug.getlocal有关变量索引和名称的更多信息。
     * @noSelf
     */
    setlocal(thread: any, level: any, local: any, value: any): any;
    setlocal(level: any, local: any, value: any): any;

    /**
     * 给定value给定的元数据table（可以为零）。退货value。
     * @noSelf
     */
    setmetatable(value: any, table: any): any;

    /**
     * 该函数将该值value与up该函数的索引一起赋值f。如果给定索引不存在上值，则函数返回nil。否则，它返回upvalue的名称。
     * @noSelf
     */
    setupvalue(f: any, up: any, value: any): any;

    /**
     * 将给定设置为与给定value关联的Lua值udata。udata必须是完整的用户数据。
     * Returns udata.
     * @noSelf
     */
    setuservalue(udata: any, value: any): any;

    /**
     * 如果message存在但不是字符串也不是零，则此函数将message不作处理返回。否则，它将返回一个带有回调调用堆栈的字符串。可选message字符串被追加到回溯的开头。一个可选的level数字告诉在哪个级别开始回溯（默认是1，函数调用traceback）。
     * @noSelf
     */
    traceback(thread?: any, message?: any, level?: any): any;
    traceback(message?: any, level?: any): any;

    /**
     * 返回n从给定函数编号的upvalue的唯一标识符（作为light userdata）。
     * 这些唯一标识符允许程序检查不同的关闭是否共享upvalue。共享一个upvalue（也就是说，访问一个相同的外部局部变量）的Lua闭包将为这些upvalue索引返回相同的id。
     * @noSelf
     */
    upvalueid(f: any, n: any): any;

    /**
     * 使n1Lua闭包f1的n2第 - 个最高值指Lua闭包的第 - 个最高值f2。
     * 虽然Lua被设计为扩展语言，但是它被嵌入到主机C程序中，但它也经常用作独立语言。Lua作为独立语言的解释器简单地称为lua标准分发。独立解释器包含所有标准库，包括调试库。它的用法是：
     * - lua [options] [script [args]]
     * 选项是：
     * * -e stat：执行字符串stat ;
     * * -l mod：“需要” mod ;
     * * -i：运行脚本后进入交互模式;
     * * -v：打印版本信息;
     * * -E：忽略环境变量;
     * * --：停止处理选项;
     * * -：stdin作为文件执行并停止处理选项。
     * 
     * 处理lua完选项后，运行给定的脚本。当不带参数调用时，lua其行为lua -v -i与标准输入（stdin）是终端时相反，lua -否则。
     * 在没有选项-E的情况下调用时，解释器在运行任何参数之前检查环境变量LUA_INIT_5_3（或者LUA_INIT如果未定义版本名称）。如果变量内容具有格式@filename，则lua执行该文件。否则，lua执行字符串本身。
     * 当用选项调用时-E，除了忽略之外LUA_INIT，Lua还会忽略和的值，LUA_PATH并LUA_CPATH设置package.path和package.cpath定义默认路径的值luaconf.h。
     * 所有选项都按顺序处理，除了-i和-E。例如，像一个调用
     * 
     * * $ lua -e'a=1' -e 'print(a)' script.lua
     * 
     * 将首先设置a为1，然后打印该值a，最后运行script.lua没有参数的文件。（这里$是shell提示符，您的提示可能会有所不同。）
     * 在运行任何代码之前，lua收集名为的全局表中的所有命令行参数arg。脚本名称转到索引0，脚本名称转到索引1后的第一个参数，依此类推。脚本名称之前的任何参数（即解释器名称加上其选项）都会转到负数索引。例如，在通话中
     * 
     * * $ lua -la b.lua t1 t2
     * 
     * 表是这样的：
     * ```lua
     * arg = { [-2] = "lua", [-1] = "-la",
     *         [0] = "b.lua",
     *         [1] = "t1", [2] = "t2" }
     * ```
     * 如果调用中没有脚本，则解释器名称将转到索引0，然后是其他参数。例如，电话
     * 
     * * $ lua -e "print(arg[1])"
     * 
     * 将打印“ -e”。如果有一个脚本，脚本被调用参数arg[1]，...，arg[#arg]。（和Lua中的所有块一样，该脚本被编译为可变参数函数。）
     * 在交互模式下，Lua重复提示并等待一条线。读完一行后，Lua首先尝试将该行解释为表达式。如果成功，则打印其值。否则，它会将该行解释为声明。如果你写一个不完整的语句，解释器通过发出不同的提示来等待它的完成。
     * 如果全局变量_PROMPT包含一个字符串，则其值将用作提示。同样，如果全局变量_PROMPT2包含一个字符串，则其值将用作辅助提示（在不完整的语句中发出）。
     * 如果脚本中存在未受保护的错误，解释器会将错误报告给标准错误流。如果错误对象不是一个字符串，但有一个metamethod __tostring，解释器会调用这个metamethod来产生最终的消息。否则，解释器会将错误对象转换为字符串并向其添加堆栈回溯。
     * 当正常结束时，解释者关闭其主要的Lua状态（参见lua_close）。脚本可以通过调用os.exit终止来避免这一步。
     * 为了允许在Unix系统中使用Lua作为脚本解释器，独立解释器跳过块开始的块的第一行#。因此，Lua脚本可以通过使用chmod +x和#!形式变成可执行程序，如
     * * #!/usr/local/bin/lua
     * （当然，你的机器上Lua解释器的位置可能不同，如果你的机器lua是在你的机器上的PATH话
     * * #!/usr/bin/env lua
     * 
     * 是一种更便携的解决方案。）
     * 这里我们列出了将程序从Lua 5.2移植到Lua 5.3时可能遇到的不兼容问题。你可以通过用适当的选项编译Lua来避免一些不兼容（见文件luaconf.h）。但是，所有这些兼容性选项将在未来取消。
     * Lua版本总是可以以不暗示程序中源代码更改的方式更改C API，例如常量的数值或将函数实现为宏。因此，你不应该假设二进制文件在不同的Lua版本之间是兼容的。使用新版本时，总是重新编译Lua API的客户端。
     * 同样，Lua版本可以随时更改预编译块的内部表示; 预编译的块在不同的Lua版本之间不兼容。
     * 官方发行版中的标准路径可能会在版本之间发生变化。
     * @noSelf
     */
    upvaluejoin(f1: any, n1: any, f2: any, n2: any): any;


}