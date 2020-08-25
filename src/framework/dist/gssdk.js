"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GDK;
(function (GDK) {
    var GameInfoBase = /** @class */ (function () {
        function GameInfoBase() {
            this.requireCustomServicePay = false;
            this.requireMiniAppPay = false;
            this.requireIndiaSPSPay = false;
        }
        return GameInfoBase;
    }());
    GDK.GameInfoBase = GameInfoBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var devlog = new slib.Log({ tags: ["DEVELOP"] });
    var Vibration = /** @class */ (function () {
        function Vibration() {
        }
        Vibration.prototype.vibrateLong = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("vibrateLong");
                    return [2 /*return*/];
                });
            });
        };
        Vibration.prototype.vibrateShort = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("vibrateShort");
                    return [2 /*return*/];
                });
            });
        };
        Vibration.prototype.vibrate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("vibrate", params);
                    return [2 /*return*/];
                });
            });
        };
        return Vibration;
    }());
    var Performance = /** @class */ (function () {
        function Performance() {
        }
        Performance.prototype.getMicroTime = function () {
            return new Date().getTime() * 1000;
        };
        Performance.prototype.tryGC = function () {
            devlog.info('tryGC');
        };
        Performance.prototype.onMemoryWarning = function (callback) {
            devlog.info('register onMemoryWarning');
        };
        return Performance;
    }());
    var HardwareBase = /** @class */ (function () {
        function HardwareBase() {
            this.vibration = new Vibration();
            this.performance = new Performance();
        }
        return HardwareBase;
    }());
    GDK.HardwareBase = HardwareBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var devlog = new slib.Log({ tags: ["DEVELOP"] });
    var Clipboard = /** @class */ (function () {
        function Clipboard() {
            this._data = null;
        }
        Clipboard.prototype.getData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // return { ...this._data }
                    // return {};
                    return [2 /*return*/, this._data];
                });
            });
        };
        Clipboard.prototype.setData = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return Clipboard;
    }());
    var APISystemBase = /** @class */ (function () {
        function APISystemBase() {
            this.clipboard = new Clipboard();
            this._onShowEvent = new slib.SimpleEvent();
            this._onHideEvent = new slib.SimpleEvent();
        }
        Object.defineProperty(APISystemBase.prototype, "sdkFrameworkVersion", {
            get: function () {
                return "-1.0";
            },
            enumerable: false,
            configurable: true
        });
        APISystemBase.prototype.init = function () {
            this._initEvents();
        };
        Object.defineProperty(APISystemBase.prototype, "nativeVersion", {
            get: function () {
                return -1;
            },
            enumerable: false,
            configurable: true
        });
        APISystemBase.prototype.setEnableDebug = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("unsupoort action: setEnableDebug -> " + res.enableDebug + " ");
                    return [2 /*return*/];
                });
            });
        };
        APISystemBase.prototype.navigateToApp = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("打开小程序成功");
                    return [2 /*return*/, {}];
                });
            });
        };
        APISystemBase.prototype.exitProgram = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("正在退出");
                    window.close();
                    return [2 /*return*/];
                });
            });
        };
        APISystemBase.prototype.updateProgramForce = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    devlog.info("没有更新");
                    return [2 /*return*/];
                });
            });
        };
        APISystemBase.prototype._initEvents = function () {
            var _this = this;
            if (document == null) {
                return;
            }
            var win = window, hiddenPropName;
            if (typeof document.hidden !== 'undefined') {
                hiddenPropName = 'hidden';
            }
            else if (typeof document['mozHidden'] !== 'undefined') {
                hiddenPropName = 'mozHidden';
            }
            else if (typeof document['msHidden'] !== 'undefined') {
                hiddenPropName = 'msHidden';
            }
            else if (typeof document['webkitHidden'] !== 'undefined') {
                hiddenPropName = 'webkitHidden';
            }
            var hidden = false;
            var onHidden = function () {
                if (!hidden) {
                    hidden = true;
                    // game.emit(game.EVENT_HIDE);
                    _this._onHideEvent.emit(undefined);
                }
            };
            var onShown = function () {
                if (hidden) {
                    hidden = false;
                    // game.emit(game.EVENT_SHOW);
                    _this._onShowEvent.emit({});
                }
            };
            if (hiddenPropName) {
                var changeList = [
                    'visibilitychange',
                    'mozvisibilitychange',
                    'msvisibilitychange',
                    'webkitvisibilitychange',
                    'qbrowserVisibilityChange'
                ];
                for (var i = 0; i < changeList.length; i++) {
                    document.addEventListener(changeList[i], function (event) {
                        var visible = document[hiddenPropName];
                        if (visible == undefined) {
                            visible = event['hidden'];
                        }
                        devlog.info('hidden:', visible);
                        if (visible)
                            onHidden();
                        else
                            onShown();
                    });
                }
            }
            else {
                win.addEventListener('blur', onHidden);
                win.addEventListener('focus', onShown);
            }
            if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
                win.onfocus = onShown;
            }
            if (null != window && window['onpageshow'] != null && window['onpagehide'] != null) {
                win.addEventListener('pagehide', onHidden);
                win.addEventListener('pageshow', onShown);
                document.addEventListener('pagehide', onHidden);
                document.addEventListener('pageshow', onShown);
            }
        };
        APISystemBase.prototype.onShow = function (callback) {
            this._onShowEvent.on(callback);
        };
        APISystemBase.prototype.offShow = function (callback) {
            this._onShowEvent.off(callback);
        };
        APISystemBase.prototype.onHide = function (callback) {
            this._onHideEvent.on(callback);
        };
        APISystemBase.prototype.offHide = function (callback) {
            this._onHideEvent.off(callback);
        };
        APISystemBase.prototype.getSafeArea = function (callback) {
            callback({ left: 0, right: 0, top: 0, bottom: 0 });
        };
        APISystemBase.prototype.gotoAppSystemSettings = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            action: "cancel",
                            crashed: false,
                        }];
                });
            });
        };
        APISystemBase.prototype.checkAppSystemPermissions = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            lackedPermissions: [],
                            error: {},
                        }];
                });
            });
        };
        APISystemBase.prototype.getSDKMetaInfo = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, null];
                });
            });
        };
        APISystemBase.prototype.setAppInfo = function (key, value) {
            devlog.info("setAppInfo", key, value);
        };
        APISystemBase.prototype.getAppInfo = function (key) {
            return null;
        };
        APISystemBase.prototype.getAppInfoBoolean = function (key, def) {
            var v = this.getAppInfo(key);
            if (typeof v == "boolean") {
                return v;
            }
            else if (typeof v == "string") {
                return v.toLowerCase() == "true";
            }
            else {
                return def;
            }
        };
        APISystemBase.prototype.getAppInfoNumber = function (key, def) {
            var v = this.getAppInfo(key);
            if (typeof v == "number") {
                return v;
            }
            else if (typeof v == "string" && parseFloat(v).toString() == v) {
                return parseFloat(v);
            }
            else {
                return def;
            }
        };
        APISystemBase.prototype.getAppInfoString = function (key, def) {
            var v = this.getAppInfo(key);
            if (v == null) {
                return def;
            }
            else {
                return v.toString();
            }
        };
        APISystemBase.prototype.getResVersion = function () {
            return 0;
        };
        return APISystemBase;
    }());
    GDK.APISystemBase = APISystemBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var SystemInfoBase = /** @class */ (function () {
        function SystemInfoBase() {
            this.gdkVersion = "1.0.1";
            this.platform = "devtools";
            this.brand = 'unknown';
            this.model = 'unknown';
            this.pixelRatio = -1;
            this.screenWidth = -1;
            this.screenHeight = -1;
            this.windowWidth = -1;
            this.windowHeight = -1;
            this.statusBarHeight = -1;
            this.language = 'zh_CN';
            this.version = '1.0.0';
            this.system = "devtools";
            this.fontSizeSetting = -1;
            this.SDKVersion = '1.0.0';
            this.benchmarkLevel = -1;
            this.networkClass = -1;
            this.networkType = 'unknown';
            this.devPlatform = "devtools";
        }
        SystemInfoBase.prototype.clone = function () {
            var obj = {};
            for (var k in this) {
                obj[k] = this[k];
            }
            obj["uiLanguage"] = slib.i18n.language;
            obj.api = undefined;
            return obj;
        };
        return SystemInfoBase;
    }());
    GDK.SystemInfoBase = SystemInfoBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var LogBase = /** @class */ (function () {
        function LogBase() {
        }
        LogBase.prototype.commitLog = function (key, params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        LogBase.prototype.commitChannelsLog = function (logType, params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        LogBase.prototype.commitPayLog = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return LogBase;
    }());
    GDK.LogBase = LogBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayBase = /** @class */ (function () {
        function PayBase() {
        }
        PayBase.prototype.init = function (data) {
            throw new Error("Method not implemented.");
        };
        PayBase.prototype.initWithConfig = function (info) {
            throw new Error("Method not implemented.");
        };
        PayBase.prototype.consumePurchase = function (params) {
            return new Promise(function (resolve, reject) {
                reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_INVALID));
            });
        };
        PayBase.prototype.queryItemInfo = function (params) {
            return new Promise(function (resolve, reject) {
                reject(GDK.GDKResultTemplates.make(GDK.GDKErrorCode.API_INVALID));
            });
        };
        return PayBase;
    }());
    GDK.PayBase = PayBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var SimpleEvent = /** @class */ (function (_super) {
        __extends(SimpleEvent, _super);
        function SimpleEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SimpleEvent;
    }(slib.SimpleEvent));
    var OpenDataContext = /** @class */ (function () {
        function OpenDataContext(event) {
            this._event = null;
            this._event = event;
        }
        OpenDataContext.prototype.postMessage = function (message) {
            this._event.emit(message);
        };
        return OpenDataContext;
    }());
    var SubContextBase = /** @class */ (function () {
        function SubContextBase() {
            this._event = new SimpleEvent();
            this._context = new OpenDataContext(this._event);
        }
        SubContextBase.prototype.onMessage = function (callback) {
            return this._event.on(callback);
        };
        SubContextBase.prototype.getOpenDataContext = function () {
            return this._context;
        };
        return SubContextBase;
    }());
    GDK.SubContextBase = SubContextBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var devlog = new slib.Log({ tags: ["DEVELOP"] });
    var SupportBase = /** @class */ (function () {
        function SupportBase() {
            this.supportShare = false;
            this.supportShareTickets = false;
            this.requireSubDomainRank = false;
            this.requireAuthorize = false;
            this.supportBuiltinCommitLog = false;
            this.supportBuiltinOnlineLoopLog = false;
            this.supportBuiltinIdentityCertification = false;
            this.requireManagerAdLifecycle = false;
            this.isNativePlugin = false;
        }
        return SupportBase;
    }());
    GDK.SupportBase = SupportBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var UserBase = /** @class */ (function () {
        function UserBase() {
        }
        UserBase.prototype.isNativeRealNameSystem = function () {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.showMinorInfo = function (info) {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.showRealNameDialog = function (userID, force) {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.bindUser = function () {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.setAccountChangeListener = function (f) {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.init = function (data) {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.initWithConfig = function (info) {
            throw new Error("Method not implemented.");
        };
        UserBase.prototype.setLoginSupport = function (loginSupport) {
        };
        UserBase.prototype.setBindCallback = function (callback) {
            this.bindCallback = callback;
        };
        UserBase.prototype.setRebootCallback = function (callback) {
            this.rebootCallback = callback;
        };
        UserBase.prototype.checkSession = function (params) {
            var ret = new GDK.RPromise();
            ret.success(undefined);
            return ret.promise;
        };
        return UserBase;
    }());
    GDK.UserBase = UserBase;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        PayFlow.gevent = new slib.SEvent();
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var PayFlowStatus = /** @class */ (function () {
            function PayFlowStatus() {
                // 正在充值
                this._isRecharging = false;
                /**
                 * 包含各种外部传入配置
                 */
                this._parent = null;
            }
            return PayFlowStatus;
        }());
        PayFlow.PayFlowStatus = PayFlowStatus;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
/// <reference path="./PayFlowStatus.ts" />
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var mdebug = window['wdebug'] && true;
        var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
        var PayFlowMG = /** @class */ (function () {
            function PayFlowMG() {
                this._status = new PayFlow.PayFlowStatus();
                this._appPayFlowMap = {};
                this._rechargeBlockLayerIndex = [PayFlow.payNetClient.client.getLoadingIndex(), 'payflow://index.html'];
            }
            Object.defineProperty(PayFlowMG.prototype, "_parent", {
                get: function () {
                    return this._status._parent;
                },
                set: function (value) {
                    this._status._parent = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PayFlowMG.prototype, "_isRecharging", {
                get: function () {
                    return this._status._isRecharging;
                },
                set: function (value) {
                    this._status._isRecharging = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PayFlowMG.prototype, "_rechargeBlockLayerIndex", {
                get: function () {
                    return this._status._rechargeBlockLayerIndex;
                },
                set: function (value) {
                    this._status._rechargeBlockLayerIndex = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PayFlowMG.prototype, "payFlowName", {
                get: function () {
                    var payFlow = this.getPayFlow("WechatPay");
                    return payFlow.payFlowName;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMG.prototype.getPayFlow = function (payWay) {
                if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
                    if (gdk.nativeVersion <= 0) {
                        return this._appPayFlowMap["NativeVersionLessThan0"];
                    }
                    else {
                        return this._appPayFlowMap[payWay];
                    }
                }
                else {
                    return this._payFlow;
                }
            };
            Object.defineProperty(PayFlowMG.prototype, "isPayCallbackValid", {
                get: function () {
                    var payFlow = this.getPayFlow("WechatPay");
                    return payFlow.isPayCallbackValid;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMG.prototype.initConfig = function (parent) {
                this._parent = parent;
                if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
                    // 统一格式为payWays
                    var payWays = [];
                    if (this._parent.payWays instanceof Array) {
                        payWays = payWays.concat(this._parent.payWays);
                    }
                    if (this._parent.channelId != null && (payWays.indexOf(this._parent.channelId) < 0)) {
                        payWays.push(this._parent.channelId);
                    }
                    if (payWays.length <= 0) {
                        for (var i = 0; i < 200; i++) {
                            log.error("未配置 payWays, 请在initConfig中配置payWays，例如：`initConfig({payWays:['GooglePay','WechatPay',......]})`");
                            log.error('未配置任何有效payWay，默认设置payWays为GooglePay和IosPay');
                        }
                        payWays.push('GooglePay');
                        payWays.push('IosPay');
                    }
                    this._parent.payWays = payWays;
                }
                if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
                    console.log("nativeVersion:", gdk.nativeVersion);
                    this._appPayFlowMap["WechatPay"] = new PayFlow.PayInApp.PayFlow();
                    this._appPayFlowMap["AliPay"] = new PayFlow.PayInAppWithAutoMakeup.PayFlow();
                    this._appPayFlowMap["AliGameAppPay"] = new PayFlow.PayInAppWithAutoMakeup.PayFlow();
                    this._appPayFlowMap["BaiduAppPay"] = new PayFlow.PayInApp.PayFlow();
                    this._appPayFlowMap["VivoAppPay"] = new PayFlow.PayInApp.PayFlow();
                    this._appPayFlowMap["YYBPay"] = new PayFlow.YYBPayFlow.PayFlow();
                    this._appPayFlowMap["meituAppPay"] = new PayFlow.PayInApp.PayFlow();
                    this._appPayFlowMap["GooglePay"] = new PayFlow.PayInsideLocalV2.PayFlow();
                    this._appPayFlowMap["IosPay"] = new PayFlow.PayInsideLocalV2.PayFlow();
                    this._appPayFlowMap["UnifiedSdk"] = new PayFlow.PayInAppWithAutoMakeup.PayFlow();
                    this._appPayFlowMap["xiao7"] = new PayFlow.PayInAppWithAutoMakeup.PayFlow();
                    this._appPayFlowMap["OppoApp"] = new PayFlow.PayInApp.PayFlow();
                    for (var k in this._appPayFlowMap) {
                        var payFlow = this._appPayFlowMap[k];
                        payFlow.initConfig(this._parent);
                        payFlow['_status'] = this._status;
                    }
                }
                else if (gdk.gameInfo.requireCustomServicePay) {
                    this._payFlow = new PayFlow.PayOutside.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else if (gdk.gameInfo.requireMiniAppPay) {
                    this._payFlow = new PayFlow.PayOutside.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else if (gdk.gameInfo.requireIndiaSPSPay) {
                    this._payFlow = new PayFlow.PayOutsideGamepind.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else {
                    this._payFlow = new PayFlow.PayInApp.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
            };
            PayFlowMG.prototype.initListener = function (onShow) {
                var _this = this;
                var payFlow = this.getPayFlow("WechatPay");
                if (PayFlow.payDeps.isUserDealingOrder()) {
                    log.info('手动激活补单的设置下不添加跳转补单监听');
                }
                else {
                    if (onShow) {
                        log.info('设置自定义补单监听');
                        onShow(function () {
                            if ((!payFlow.isPayCallbackValid) || gdk.pluginName == 'oppo' || gdk.pluginName == "vivo") {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                        });
                    }
                    else {
                        log.info('设置补单监听');
                        gdk.onShow(function () {
                            log.info('程序切回前台 payflow', gdk.gameInfo.requireMiniAppPay, gdk.gameInfo.requireCustomServicePay);
                            if ((!payFlow.isPayCallbackValid) || gdk.pluginName == 'oppo' || gdk.pluginName == "vivo") {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                        });
                    }
                }
            };
            // 校验历史订单
            PayFlowMG.prototype.pullDiffOrders = function (successCallback, failCallback, options) {
                var _this = this;
                options = options || {};
                // let payFlow = this.getPayFlow("WechatPay")
                // return payFlow.pullDiffOrders(successCallback, failCallback)
                if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
                    var payWays = this._parent.payWays;
                    var payFlows = payWays.map(function (thePayWay) { return _this._appPayFlowMap[thePayWay]; });
                    // 存在类似谷歌、ios支付的特殊补单流程
                    var payInsideLocalV2 = payFlows.find(function (thePayFlow) {
                        if (thePayFlow == null) {
                            return false;
                        }
                        return thePayFlow instanceof PayFlow.PayInsideLocalV2.PayFlow;
                    });
                    // 存在普通补单流程
                    var normalPayWay_1 = payFlows.find(function (thePayFlow) {
                        if (thePayFlow == null) {
                            return false;
                        }
                        return !(thePayFlow instanceof PayFlow.PayInsideLocalV2.PayFlow);
                    });
                    if (payInsideLocalV2 != null && normalPayWay_1 != null) {
                        // 两种同时存在
                        payInsideLocalV2.pullDiffOrders(function () {
                            normalPayWay_1.pullDiffOrders(successCallback, failCallback, options);
                        }, function () {
                            var defaultfunc = function () { console.error("failCallback not defined"); };
                            normalPayWay_1.pullDiffOrders(failCallback || defaultfunc, failCallback, options);
                        });
                    }
                    else if (payInsideLocalV2 != null) {
                        payInsideLocalV2.pullDiffOrders(successCallback, failCallback, options);
                    }
                    else if (normalPayWay_1 != null) {
                        normalPayWay_1.pullDiffOrders(successCallback, failCallback, options);
                    }
                    else {
                        for (var i = 0; i < 200; i++) {
                            log.error('补单环节可能有异常，请检查初始化时 payWays 配置！！！');
                        }
                    }
                }
                else {
                    // 小游戏不存在多种支付，走单payFlow的补单
                    var payFlow = this.getPayFlow("WechatPay");
                    return payFlow.pullDiffOrders(successCallback, failCallback, options);
                }
            };
            /**
             * 支付
             * @@export
             * @param config 配置信息
             * @param callback 支付成功回调
             */
            PayFlowMG.prototype.payment = function (config, successCallback, failCallback) {
                if (gdk.sdkFrameworkVersion == '2.0') {
                    // sdk2.0自带实名认证
                    config.payWay = config.payWay || this._parent.channelId;
                    var payFlow = this.getPayFlow(config.payWay);
                    return payFlow.payment(config, successCallback, failCallback);
                }
                else {
                    if (PayFlow.payDeps.checkRealNameVerify()) {
                        config.payWay = config.payWay || this._parent.channelId;
                        var payFlow = this.getPayFlow(config.payWay);
                        return payFlow.payment(config, successCallback, failCallback);
                    }
                    else {
                        if (failCallback) {
                            failCallback();
                        }
                    }
                }
            };
            /**
             * 检查充值是否已经购买
             * @@export
             * @param config 配置信息
             */
            PayFlowMG.prototype.isItemBoughtEver = function (config) {
                var payFlow = this.getPayFlow("WechatPay");
                return payFlow.isItemBoughtEver(config);
            };
            Object.defineProperty(PayFlowMG.prototype, "orderRecordList", {
                get: function () {
                    var payFlow = this.getPayFlow("WechatPay");
                    return payFlow.orderRecordList;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMG.inst = new PayFlowMG();
            return PayFlowMG;
        }());
        PayFlow.PayFlowMG = PayFlowMG;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
/// <reference path="./PayFlowStatus.ts" />
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var mdebug = window['wdebug'] && true;
        var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
        var PayFlowMGBase = /** @class */ (function () {
            function PayFlowMGBase() {
                this._status = new PayFlow.PayFlowStatus();
                this.init();
            }
            Object.defineProperty(PayFlowMGBase.prototype, "_parent", {
                get: function () {
                    return this._status._parent;
                },
                set: function (value) {
                    this._status._parent = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PayFlowMGBase.prototype, "_isRecharging", {
                get: function () {
                    return this._status._isRecharging;
                },
                set: function (value) {
                    this._status._isRecharging = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PayFlowMGBase.prototype, "_rechargeBlockLayerIndex", {
                get: function () {
                    return this._status._rechargeBlockLayerIndex;
                },
                set: function (value) {
                    this._status._rechargeBlockLayerIndex = value;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMGBase.prototype.init = function () {
                this._rechargeBlockLayerIndex = [PayFlow.payNetClient.client.getLoadingIndex(), 'payflow://index.html'];
            };
            return PayFlowMGBase;
        }());
        PayFlow.PayFlowMGBase = PayFlowMGBase;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var mdebug = window['wdebug'] && true;
        var PayInApp = GDK.PayFlow.PayInApp;
        var PayInAppWithAutoMakeup = GDK.PayFlow.PayInAppWithAutoMakeup;
        var YYBPayFlow = GDK.PayFlow.YYBPayFlow;
        var PayInsideLocalV2 = GDK.PayFlow.PayInsideLocalV2;
        var PayOutside = GDK.PayFlow.PayOutside;
        var payDeps = GDK.PayFlow.payDeps;
        var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
        /**
         * 针对小游戏平台
         */
        var PayFlowMGForMiniApp = /** @class */ (function (_super) {
            __extends(PayFlowMGForMiniApp, _super);
            function PayFlowMGForMiniApp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(PayFlowMGForMiniApp.prototype, "payFlowName", {
                get: function () {
                    var payFlow = this.getPayFlow();
                    return payFlow.payFlowName;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMGForMiniApp.prototype.getPayFlow = function (payWay) {
                if (payWay === void 0) { payWay = "WechatPay"; }
                return this._payFlow;
            };
            Object.defineProperty(PayFlowMGForMiniApp.prototype, "isPayCallbackValid", {
                get: function () {
                    var payFlow = this.getPayFlow();
                    return payFlow.isPayCallbackValid;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMGForMiniApp.prototype.initConfig = function (parent) {
                this._parent = parent;
                if (gdk.gameInfo.requireCustomServicePay) {
                    this._payFlow = new PayOutside.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else if (gdk.gameInfo.requireMiniAppPay) {
                    this._payFlow = new PayOutside.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else if (gdk.gameInfo.requireIndiaSPSPay) {
                    this._payFlow = new PayFlow.PayOutsideGamepind.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
                else {
                    this._payFlow = new PayInApp.PayFlow();
                    this._payFlow['_status'] = this._status;
                    this._payFlow.initConfig(this._parent);
                }
            };
            PayFlowMGForMiniApp.prototype.initListener = function (onShow) {
                var _this = this;
                var payFlow = this.getPayFlow();
                if (payDeps.isUserDealingOrder()) {
                    log.info('手动激活补单的设置下不添加跳转补单监听');
                }
                else {
                    if (onShow) {
                        log.info('设置自定义补单监听');
                        onShow(function () {
                            if ((!payFlow.isPayCallbackValid)) {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                        });
                    }
                    else {
                        log.info('设置补单监听');
                        gdk.onShow(function () {
                            log.info('程序切回前台 payflow', gdk.gameInfo.requireMiniAppPay, gdk.gameInfo.requireCustomServicePay);
                            if ((!payFlow.isPayCallbackValid)) {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                        });
                    }
                }
            };
            // 校验历史订单
            PayFlowMGForMiniApp.prototype.pullDiffOrders = function (successCallback, failCallback, options) {
                options = options || {};
                {
                    // 小游戏不存在多种支付，走单payFlow的补单
                    var payFlow = this.getPayFlow();
                    return payFlow.pullDiffOrders(successCallback, failCallback, options);
                }
            };
            /**
             * 支付
             * @@export
             * @param config 配置信息
             * @param callback 支付成功回调
             */
            PayFlowMGForMiniApp.prototype.payment = function (config, successCallback, failCallback) {
                {
                    if (payDeps.checkRealNameVerify()) {
                        config.payWay = config.payWay || this._parent.channelId;
                        var payFlow = this.getPayFlow(config.payWay);
                        return payFlow.payment(config, successCallback, failCallback);
                    }
                    else {
                        if (failCallback) {
                            failCallback();
                        }
                    }
                }
            };
            /**
             * 检查充值是否已经购买
             * @@export
             * @param config 配置信息
             */
            PayFlowMGForMiniApp.prototype.isItemBoughtEver = function (config) {
                var payFlow = this.getPayFlow();
                return payFlow.isItemBoughtEver(config);
            };
            Object.defineProperty(PayFlowMGForMiniApp.prototype, "orderRecordList", {
                get: function () {
                    var payFlow = this.getPayFlow();
                    return payFlow.orderRecordList;
                },
                enumerable: false,
                configurable: true
            });
            PayFlowMGForMiniApp.inst = new PayFlow.PayFlowMG();
            return PayFlowMGForMiniApp;
        }(GDK.PayFlow.PayFlowMGBase));
        PayFlow.PayFlowMGForMiniApp = PayFlowMGForMiniApp;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
        var OrderRecord = /** @class */ (function () {
            function OrderRecord(orderInfo, state, config) {
                this.orderno = 'invalid';
                this.state = 2;
                /** 订单生成时间 */
                this.time = 0;
                // 以下下兼容老版本游戏存档
                /** 序号 */
                this.Id = 0;
                /** 金额 */
                this.Money = 0;
                /** 精灵石数量 */
                this.Amt = 0;
                /** 商品名称 */
                this.ItemName = '';
                /** 用户ID */
                this.userId = '';
                this.purchaseToken = ''; //订单唯一消耗标志
                if (!orderInfo) {
                    return;
                }
                this.orderno = orderInfo.outTradeNo;
                this.state = state;
                this.time = orderInfo.time;
                this.purchaseToken = orderInfo.purchaseToken;
                this.Id = config.id;
                this.Money = config.money;
                this.Amt = config.amount;
                this.ItemName = config.title;
                this.userId = "" + gdk.userData.userId;
            }
            OrderRecord = __decorate([
                slib.SafeClass('OrderRecord')
            ], OrderRecord);
            return OrderRecord;
        }());
        PayFlow.OrderRecord = OrderRecord;
        var PayRecords = /** @class */ (function () {
            function PayRecords() {
                /**
                 * 订单最近同步时间
                 */
                this.lastOrdersSyncTime = 0;
                /**
                 * 充值记录列表
                 */
                this.orderRecordList = [];
            }
            PayRecords_1 = PayRecords;
            PayRecords.prototype.addRecord = function (orderInfo, config) {
                this.orderRecordList.push(new OrderRecord(orderInfo, PayFlow.OrderState.unknown, config));
                PayFlow.payDeps.storage.saveToLocalStorage();
            };
            PayRecords.prototype.addRecordRaw = function (orderInfo, config) {
                this.orderRecordList.push(new OrderRecord(orderInfo, orderInfo.state, config));
            };
            PayRecords.prototype.deapplyRecord = function (orderInfo, config) {
                log.error('产生订单回滚,暂不作处理');
            };
            PayRecords.prototype.commitPayLog = function (key, config, orderInfo) {
                try {
                    PayFlow.payStatistic.commitLog(key, config, orderInfo);
                }
                catch (e) {
                    log.error("提交支付统计信息失败", e);
                }
            };
            PayRecords.prototype.commitPaidLog = function (key, config, orderInfo) {
                try {
                    PayFlow.payStatistic.commitPaidLog(key, config, orderInfo);
                }
                catch (e) {
                    log.error("提交支付统计信息失败", e);
                }
            };
            PayRecords.prototype.applyRecord = function (orderInfo, config, options) {
                // 由于没有记录历史商品配置,如果发生了订单记录丢失,那么就按照现在的商品配置来计量
                this.commitPayLog('OnPaySuccess', config, orderInfo);
                this.commitPaidLog("Paid", config, orderInfo);
                // //log order
                // gdk.commitChannelsLog("Paid", {
                //     id: config.productId,
                //     count: config.amount,
                //     currency: "$",
                //     price: config.money || config.price,
                //     succ: true,
                // })
                var notifyData = { orderInfo: orderInfo, config: config, isDelayedApply: options.isMakingUpOrder, options: options };
                try {
                    //每次有成功订单被应用时,都会通知
                    // 包括微信回调成功,补单成功,登录时补单成功
                    PayFlow.gevent.emit("onBeforeApplyOrder", notifyData);
                    PayFlow.gevent.emit("onApplyOrder", notifyData);
                    PayFlow.gevent.emit("onAfterApplyOrder", notifyData);
                }
                catch (e) {
                    log.error('应用订单异常', notifyData);
                    log.error(e);
                    // 这里不抛出异常,只打印日志
                    // 改为：如果发奖励抛异常，那么不保存订单状态
                    return;
                }
                var orderno = orderInfo.outTradeNo;
                //变更充值记录
                var hisRecord = this.orderRecordList.find(function (info) { return info.orderno == orderno; });
                if (!hisRecord) {
                    hisRecord = new OrderRecord(orderInfo, PayFlow.OrderState.ok, config);
                    this.orderRecordList.push(hisRecord);
                }
                else {
                    // cc.assert(hisRecord.state!=OrderState.ok,'')
                    if (hisRecord.state == PayFlow.OrderState.ok) {
                        log.error('错误的可应用成功订单状态');
                        return;
                    }
                    hisRecord.state = PayFlow.OrderState.ok;
                }
                // payDeps.storage.saveToLocalStorage(false);//立即同步保存
                try {
                    PayFlow.gevent.emit("refreshPay", notifyData); //刷新部分界面
                }
                catch (e) {
                    log.error('显示充值结果异常', notifyData);
                    log.error(e);
                    // 这里不抛出异常,只打印日志
                }
            };
            PayRecords.prototype.isItemBoughtEver = function (config) {
                return !!this.orderRecordList.find(function (info) { return info.Id == config.id && info.state == PayFlow.OrderState.ok; });
            };
            Object.defineProperty(PayRecords, "saved", {
                /**
                 * 获取存档中的实例
                 */
                get: function () {
                    var data = PayFlow.payDeps.storage.getSavedData("payRecords");
                    if (!data) {
                        data = new PayRecords_1();
                        PayFlow.payDeps.storage.setSavedData("payRecords", data);
                    }
                    return data;
                },
                enumerable: false,
                configurable: true
            });
            var PayRecords_1;
            PayRecords = PayRecords_1 = __decorate([
                slib.SafeClass("PayRecords")
            ], PayRecords);
            return PayRecords;
        }());
        PayFlow.PayRecords = PayRecords;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var PayDeps = /** @class */ (function () {
            function PayDeps() {
            }
            // {
            // if (FeatureSwitch.instance.check("real_name_verifies") && FeatureSwitch.instance.check("unverified_purchase") && !LoginData.saved.isVerified) {
            // 	CheckIdentityCertification.instance.showCertificationTipDialog();
            // } else {
            // }
            // }
            PayDeps.prototype.isUserDealingOrder = function () {
                return false;
            };
            return PayDeps;
        }());
        PayFlow.PayDeps = PayDeps;
        PayFlow.payDeps = new PayDeps();
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var PayNetClient = /** @class */ (function () {
            function PayNetClient() {
            }
            Object.defineProperty(PayNetClient.prototype, "client", {
                get: function () {
                    return PayFlow.payDeps.gameClient;
                },
                enumerable: false,
                configurable: true
            });
            // 请求服务器生成订单
            PayNetClient.prototype.orderGenOrder = function (data, callback, modal, errorCallback) {
                var _this = this;
                if (modal === void 0) { modal = false; }
                if (errorCallback === void 0) { errorCallback = null; }
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var path, metaInfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                path = 'order/createOrder';
                                if (!(gdk.pluginName == 'app' || gdk.pluginName == 'appv2')) return [3 /*break*/, 6];
                                if (!(data.payWay == "WechatPay")) return [3 /*break*/, 1];
                                path = 'order/wx/createWxAppOrder';
                                return [3 /*break*/, 5];
                            case 1:
                                if (!(data.payWay == "AliPay")) return [3 /*break*/, 2];
                                path = 'alipay/createOrder';
                                return [3 /*break*/, 5];
                            case 2:
                                if (!(data.payWay == "VivoAppPay")) return [3 /*break*/, 4];
                                path = 'vivo/createOrder';
                                return [4 /*yield*/, gdk.getSDKMetaInfo({ key: "vivo:SDKVersionCode" })];
                            case 3:
                                metaInfo = _a.sent();
                                if (metaInfo != null && metaInfo.version == 2) {
                                    path = "vivo/app/createOrder";
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (data.payWay == "OppoApp") {
                                    path = 'order/createOrder';
                                }
                                else if (data.payWay == "BaiduAppPay") {
                                    path = 'order/createOrder';
                                }
                                else if (data.payWay == "YYBPay") {
                                    path = 'order/createOrder';
                                }
                                else if (data.payWay == 'AliGameAppPay') {
                                    path = 'jy/createOrder';
                                }
                                else if (data.payWay == "meituAppPay") {
                                    path = 'mt/createOrder';
                                }
                                else if (data.payWay == "xiao7") {
                                    path = 'x7/createOrder';
                                }
                                else if (data.payWay == "IosPay") {
                                    path = 'order/createOrder';
                                }
                                _a.label = 5;
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                if (gdk.pluginName == 'oppo') {
                                    path = 'oppok/createOrder';
                                    data["userToken"] = gdk.userData.token;
                                }
                                else if (gdk.pluginName == 'qqminiapp') {
                                    path = 'qqn/createOrder';
                                }
                                else if (gdk.pluginName == 'vivo') {
                                    path = 'vivo/createOrder';
                                }
                                else if (gdk.pluginName == 'gamepind') {
                                    path = 'pind/createOrder';
                                }
                                _a.label = 7;
                            case 7:
                                this.client.request(path, data, function (data) {
                                    if (data.succeed && (data.data instanceof Object)) {
                                        data.data.time = data.data.createTime;
                                    }
                                    if (data.code == 800) {
                                        gdk.showAlert({ okLabel: "确定", content: data.message, title: "提示" });
                                    }
                                    callback(data);
                                }, { modal: modal, errorCallback: errorCallback });
                                return [2 /*return*/];
                        }
                    });
                }); })();
            };
            // 检查订单状态
            PayNetClient.prototype.orderCheckOrderState = function (data, callback, modal, errorCallback) {
                if (modal === void 0) { modal = false; }
                if (errorCallback === void 0) { errorCallback = null; }
                /**
                 * 不同游戏平台 url path
                 */
                var pluginPathMap = {
                    'develop': {
                        normal: "order/wx/synchronizeWxOrder"
                    },
                    // 微信小游戏
                    'wechat': {
                        normal: "order/wx/synchronizeWxOrder"
                    },
                    'qqplay': {
                        normal: 'order/synchronizeQQOrder'
                    },
                    // oppo小游戏
                    'oppo': {
                        normal: 'order/getOrderStatus'
                    },
                    // vivo小游戏
                    'vivo': {
                        normal: 'order/getOrderStatus'
                    },
                    // app版默认配置
                    'app': {
                        normal: 'order/gg/synchronizeGGOrder',
                        // android默认用谷歌支付
                        android: 'order/gg/synchronizeGGOrder',
                        // ios默认用ios支付
                        ios: 'order/apple/synchronizeAppleOrder',
                    },
                    // app版默认配置
                    'appv2': {
                        normal: 'order/gg/synchronizeGGOrder',
                        // android默认用谷歌支付
                        android: 'order/gg/synchronizeGGOrder',
                        // ios默认用ios支付
                        ios: 'order/apple/synchronizeAppleOrder',
                    },
                    'qqminiapp': {
                        normal: 'order/getOrderStatus'
                    },
                    'gamepind': {
                        normal: 'order/getOrderStatus'
                    }
                };
                /**
                 * app版细分不同渠道下 url path
                 */
                var appChannelPathMap = {
                    'WechatPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'UnifiedSdk': {
                        normal: 'order/getOrderStatus',
                    },
                    'xiao7': {
                        normal: 'order/getOrderStatus',
                    },
                    'OppoApp': {
                        normal: 'order/getOrderStatus',
                    },
                    'VivoAppPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'BaiduAppPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'YYBPay': {
                        normal: 'yyb/synchronizeYybOrder',
                    },
                    'AliGameAppPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'meituAppPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'AliPay': {
                        normal: 'order/getOrderStatus',
                    },
                    'IosPay': {
                        normal: 'order/apple/synchronizeAppleOrder',
                    },
                };
                var pathInfo = pluginPathMap[gdk.pluginName];
                var path = pathInfo.normal;
                // 细分app渠道
                if ((gdk.pluginName == 'app' || gdk.pluginName == 'appv2') && (!!appChannelPathMap[data.payWay])) {
                    var payWay = data.payWay;
                    path = appChannelPathMap[payWay].normal || appChannelPathMap['default'].normal;
                }
                else if (gdk.platform == "android") {
                    path = pathInfo.android || path;
                }
                else if (gdk.platform == "ios") {
                    path = pathInfo.ios || path;
                }
                this.client.request(path, data, function (data) {
                    if (gdk.pluginName == "develop") {
                        // 浏览器上模拟测试充值
                        data.succeed = true;
                        data.code = 0;
                        data.data = Math.random() < 0.9 ? 1 : 2;
                    }
                    callback(data);
                }, { modal: modal, errorCallback: errorCallback });
            };
            // 请求历史差异订单
            PayNetClient.prototype.orderReqDiffOrderList = function (data, callback, modal, errorCallback) {
                if (modal === void 0) { modal = false; }
                if (errorCallback === void 0) { errorCallback = null; }
                var pluginPathMap = {
                    'develop': {
                        normal: "order/wx/getWxOrderList",
                        thirdApp: "order/getOrderList",
                    },
                    'wechat': {
                        normal: "order/wx/getWxOrderList",
                        thirdApp: "order/getOrderList",
                    },
                    'qqplay': {
                        normal: "order/getQQOrderList",
                    },
                    'oppo': {
                        normal: "order/getOrderList",
                    },
                    'vivo': {
                        normal: "order/getOrderList",
                    },
                    'YYB': {
                        normal: "yyb/getYybOrderList",
                    },
                    'app': {
                        normal: "order/getOrderList",
                    },
                    'qqminiapp': {
                        normal: "order/getOrderList",
                    },
                    'gamepind': {
                        normal: "order/getOrderList",
                    }
                };
                var info = pluginPathMap[gdk.pluginName];
                if ((gdk.pluginName == 'app' || gdk.pluginName == 'appv2') && gdk.systemInfo.packageTag == "yingyongbaoApp") {
                    info = pluginPathMap['YYB'];
                }
                var path = '';
                if (gdk.requireMiniAppPay || gdk.requireCustomServicePay) {
                    path = info.thirdApp;
                    data.state = 1;
                    if (!path) {
                        console.error("\u5145\u503C\u914D\u7F6E\u4E0D\u6B63\u786E\uFF0C\u751F\u6210\u53C2\u6570\u5F02\u5E38\uFF0C\u68C0\u67E5 requireMiniAppPay \u503C\u662F\u5426\u6B63\u786E\uFF0C\u5F53\u524D\u503C\uFF1A" + gdk.requireMiniAppPay);
                        path = info.normal;
                    }
                }
                else {
                    path = info.normal;
                }
                this.client.request(path, data, function (data) {
                    // if (true) {
                    //     data.succeed = true
                    //     data.code = 0
                    //     data.data = [
                    //         { createTime: 1530360114000, goodsId: 1, id: null, outTradeNo: "20002_209_1530360114388", quantity: 1, state: 1, time: 1530360114000, title: "com.farm.p60", userId: 209 }
                    //     ]
                    // }
                    if (data.succeed && (data.data instanceof Array)) {
                        for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                            var info_1 = _a[_i];
                            info_1.time = info_1.createTime;
                            if (info_1.extra) {
                                try {
                                    info_1.extra = JSON.parse(info_1.extra);
                                    info_1.purchaseToken = info_1.extra.purchaseToken;
                                }
                                catch (e) {
                                    console.error("orderReqDiffOrderList::parse extra failed:", info_1.extra);
                                }
                            }
                        }
                    }
                    callback(data);
                }, { modal: modal, errorCallback: errorCallback });
            };
            return PayNetClient;
        }());
        PayFlow.PayNetClient = PayNetClient;
        PayFlow.payNetClient = new PayNetClient();
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var OrderState;
        (function (OrderState) {
            OrderState[OrderState["fail"] = 2] = "fail";
            OrderState[OrderState["ok"] = 1] = "ok";
            OrderState[OrderState["unknown"] = 0] = "unknown";
        })(OrderState = PayFlow.OrderState || (PayFlow.OrderState = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var PayStatistic = /** @class */ (function () {
            function PayStatistic() {
            }
            Object.defineProperty(PayStatistic.prototype, "logCommitTool", {
                get: function () {
                    return PayFlow.payDeps.logCommitTool;
                },
                enumerable: false,
                configurable: true
            });
            PayStatistic.prototype.commitLog = function (key, config, orderInfo) {
                // gdk.commitChannelsLog("PayLog", {
                // 	id: config.productId,
                // 	count: config.amount,
                // 	currency: '',
                // 	price: config.money,
                // })
                config = config || {};
                orderInfo = orderInfo || {};
                gdk.commitLog(key, {
                    id: "" + config.id,
                    money: "" + config.money,
                    price: "" + config.price,
                    // 人民币数值
                    priceCNY: "" + config.priceCNY,
                    // 美元数值
                    priceUSD: "" + config.priceUSD,
                    amount: "" + config.amount,
                    title: "" + config.title,
                    coinId: "" + config.coinId,
                    productId: "" + config.productId,
                    outTradeNo: "" + orderInfo.outTradeNo,
                    state: "" + orderInfo.state,
                    goodsId: "" + orderInfo.goodsId,
                    time: "" + orderInfo.time,
                    purchaseToken: "" + orderInfo.purchaseToken,
                });
            };
            PayStatistic.prototype.commitPaidLog = function (logType, config, orderInfo) {
                var price = config.priceUSD;
                var currency = "USD";
                if (config.priceUSD != null) {
                    price = config.priceUSD;
                    currency = "USD";
                }
                else if (config.priceCNY != null) {
                    price = config.priceCNY;
                    currency = "CNY";
                }
                else if (config.money != null) {
                    price = config.money;
                    currency = "CNY";
                }
                else if (config.price != null) {
                    price = config.price;
                    currency = "CNY";
                }
                //log order
                gdk.commitChannelsLog(logType, {
                    id: config.productId,
                    count: config.amount,
                    currency: currency,
                    price: price,
                    succ: true,
                });
            };
            PayStatistic.prototype.commitGSCommonLog = function (data) {
                return this.logCommitTool.commitCommon(data);
            };
            PayStatistic.prototype.commitGSDevLog = function (data) {
                return this.logCommitTool.commitDevlog(data);
            };
            return PayStatistic;
        }());
        PayFlow.PayStatistic = PayStatistic;
        PayFlow.payStatistic = new PayStatistic();
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow) {
        var IStorage = /** @class */ (function () {
            function IStorage() {
            }
            /**
             * 保存存档到本地存储
             */
            IStorage.prototype.saveToLocalStorage = function () {
            };
            /**
             * 获取已存入的数据
             * @param key 数据的key
             */
            IStorage.prototype.getSavedData = function (key) {
            };
            /**
             * 将数据存入
             * @param key key
             * @param data 数据
             */
            IStorage.prototype.setSavedData = function (key, data) {
            };
            /**
             * 重新开始计时备份
             */
            IStorage.prototype.rescheduleBackup = function () {
            };
            /**
             * 开始自动备份到服务器
             * @param backupTime 备份的时间间隔 秒
             */
            IStorage.prototype.startBackup = function (backupTime) {
            };
            /**
             * 立即上传存档至服务器
             * * 注意，这里是从本地存储中读取的存档。因此可能由于自动存档的时间间隔而产生存档的误差，如果需要保证存档的及时性，应该先调用storage.saveToLocalStorage()
             */
            IStorage.prototype.backup = function () {
            };
            return IStorage;
        }());
        PayFlow.IStorage = IStorage;
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
/// <reference path="../PayFlowStatus.ts" />
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_1) {
        var APayBase;
        (function (APayBase) {
            var mdebug = window['wdebug'] && true;
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 基本支付流程
             */
            var PayFlow = /** @class */ (function () {
                function PayFlow() {
                    this.payFlowName = "APayBase";
                    this._status = new PayFlow_1.PayFlowStatus();
                    this._rechargeBlockLayerIndex = [PayFlow_1.payNetClient.client.getLoadingIndex(), 'payflow://index.html'];
                }
                Object.defineProperty(PayFlow.prototype, "_parent", {
                    get: function () {
                        return this._status._parent;
                    },
                    set: function (value) {
                        this._status._parent = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(PayFlow.prototype, "_isRecharging", {
                    get: function () {
                        return this._status._isRecharging;
                    },
                    set: function (value) {
                        this._status._isRecharging = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(PayFlow.prototype, "_rechargeBlockLayerIndex", {
                    get: function () {
                        return this._status._rechargeBlockLayerIndex;
                    },
                    set: function (value) {
                        this._status._rechargeBlockLayerIndex = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(PayFlow.prototype, "isPayCallbackValid", {
                    get: function () {
                        return true;
                    },
                    enumerable: false,
                    configurable: true
                });
                PayFlow.prototype.initConfig = function (parent) {
                    this._parent = parent;
                };
                PayFlow.prototype.initListener = function (onShow) {
                    var _this = this;
                    if (onShow) {
                        log.info('设置自定义补单监听');
                        onShow(function () {
                            if (gdk.gameInfo.requireMiniAppPay || gdk.gameInfo.requireCustomServicePay || gdk.gameInfo.requireIndiaSPSPay) {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                        });
                    }
                    else {
                        log.info('设置补单监听');
                        gdk.onShow(function () {
                            log.info('程序切回前台 paybase', gdk.gameInfo.requireMiniAppPay, gdk.gameInfo.requireCustomServicePay);
                            if (gdk.gameInfo.requireMiniAppPay || gdk.gameInfo.requireCustomServicePay || gdk.gameInfo.requireIndiaSPSPay) {
                                // 小程序跳转支付和客服跳转支付才需要每次切换回来补单
                                _this.pullDiffOrders(function () { });
                            }
                            _this.disableRechargeBlock();
                        });
                    }
                };
                // 充值屏蔽层
                PayFlow.prototype.enableRechargeBlock = function () {
                    var _a;
                    if (this._isRecharging) {
                        return false;
                    }
                    this._isRecharging = true;
                    if (!PayFlow_1.payNetClient.client.showModalCallback) {
                        console.error('no such showModalCallback set!!!');
                    }
                    (_a = PayFlow_1.payNetClient.client).showModalCallback.apply(_a, this._rechargeBlockLayerIndex);
                    return true;
                };
                // 取消充值屏蔽层
                PayFlow.prototype.disableRechargeBlock = function () {
                    var _a;
                    this._isRecharging = false;
                    if (!PayFlow_1.payNetClient.client.showModalCallback) {
                        console.error('no such showModalCallback set!!!');
                    }
                    (_a = PayFlow_1.payNetClient.client).closeModalCallback.apply(_a, this._rechargeBlockLayerIndex);
                };
                // 获取合适的历史订单检查点时间
                PayFlow.prototype.getHistoryCutline = function () {
                    // 0表示本地没有历史订单,需要服务器全数返回
                    var reqTime = 0;
                    var targets = this.paysdk.orderRecordList;
                    // 从本地历史清单中找到最早的未知订单,或最晚的已完成/失败订单
                    var imcompletes = targets.filter(function (a, b) { return a.state == PayFlow_1.OrderState.unknown; });
                    var oldestImcomplete = imcompletes.min(function (info) { return info.time; });
                    var latestImcomplete = null;
                    if (!oldestImcomplete) {
                        var completes = targets.filter(function (info) { return info.state != PayFlow_1.OrderState.unknown; });
                        latestImcomplete = completes.max(function (info) { return info.time; });
                    }
                    if (oldestImcomplete) {
                        // 不减1,服务器只会返回该时间点之后的订单,那么这个订单就永远得不到校验
                        reqTime = oldestImcomplete.time - 1000;
                    }
                    else if (latestImcomplete) {
                        reqTime = latestImcomplete.time;
                    }
                    return reqTime;
                };
                /**
                 * 获取尽量早的订单同步时间点
                 */
                PayFlow.prototype.getLastOrdersSyncTime = function () {
                    var reqTime = this.getHistoryCutline();
                    if (isNaN(reqTime)) {
                        reqTime = 0;
                    }
                    // 避免补单流程挪到游戏内之后，导致补单时间点滞后，导致老的已完成订单补不到问题。
                    var lastOrdersSyncTime = this.paysdk.lastOrdersSyncTime;
                    if (reqTime < lastOrdersSyncTime) {
                        this.paysdk.lastOrdersSyncTime = reqTime;
                        lastOrdersSyncTime = reqTime;
                    }
                    if (reqTime > lastOrdersSyncTime) {
                        reqTime = lastOrdersSyncTime;
                    }
                    return reqTime;
                };
                /**
                 * 仅在补单成功之后，立即更新最早未知订单时间点，用于同步订单
                 */
                PayFlow.prototype.updateLastOrdersSyncTime = function () {
                    var reqTime = this.getHistoryCutline();
                    if (isNaN(reqTime)) {
                        reqTime = 0;
                    }
                    this.paysdk.lastOrdersSyncTime = reqTime;
                };
                /**
                 * 以可读形式打印订单信息
                 */
                PayFlow.prototype.getPrettyLocalRechargeRecords = function () {
                    return this.paysdk.orderRecordList
                        .map(function (info) {
                        return {
                            time: info.time,
                            state: info.state,
                            orderno: info.orderno,
                            Money: info.Money,
                            Amt: info.Amt,
                        };
                    });
                };
                // 校验历史订单
                PayFlow.prototype.pullDiffOrders = function (successCallback, failCallback) {
                    var _this = this;
                    log.info('开始校验订单历史');
                    var onMergeFailed = function () {
                        try {
                            log.warn('校验历史订单失败');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('校验历史订单失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var makeupResult = {
                        isDiffExist: false,
                        isMergeOk: false,
                    };
                    var onMergeSucceed = function () {
                        try {
                            var ___unused = successCallback && successCallback(makeupResult);
                        }
                        catch (e) {
                            log.warn('合并历史差异订单成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    if (!(this._parent && this._parent.chargeconfig)) {
                        log.error("未配置商品配表");
                        onMergeFailed();
                        return;
                    }
                    var time = this.getLastOrdersSyncTime();
                    log.info('订单检查点时间:', time);
                    //log.info('本地订单:', this.getPrettyLocalRechargeRecords())
                    this.reqDiffOrderList({ time: time, }, function (diffList) {
                        log.info('reqDiffOrderList success', time, diffList);
                        // 过滤掉谷歌支付和ios支付等需要消耗中间物品的订单
                        diffList = diffList.filter(function (info) { return info.purchaseToken == null; });
                        // for(let info of diffList){
                        // 	info.state=OrderState.ok
                        // }
                        var mergeOk = false;
                        try {
                            _this.mergeOrderList(diffList, { isMakingUpOrder: true }, function (result, diffExist, needSync) {
                                log.info('mergeOrderList success', diffList);
                                log.info('合并后本地订单:', _this.getPrettyLocalRechargeRecords());
                                mergeOk = true;
                                makeupResult.isMergeOk = mergeOk;
                                makeupResult.isDiffExist = diffExist;
                                onMergeSucceed();
                                _this.updateLastOrdersSyncTime();
                                if (needSync) {
                                    log.info('校验前后存在要补发的差异,需要上传存档');
                                    _this.syncStorage();
                                }
                                else {
                                    log.info('本次订单校验,没有生成要补发的差异订单,不上传存档');
                                    PayFlow_1.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                }
                            }, function () {
                                log.info('mergeOrderList failed', diffList);
                                onMergeFailed();
                            });
                        }
                        catch (e) {
                            log.error('合并订单历史出现异常,合并结果:', mergeOk);
                            log.error(e);
                            if (!mergeOk) {
                                onMergeFailed();
                            }
                            else {
                                // 已经调用过 onMergeSucceed()
                            }
                        }
                    }, function () {
                        log.info('reqDiffOrderList failed', time);
                        onMergeFailed();
                    });
                };
                /**
                 * app内sdk支付
                 * @param config 配置信息
                 * @param successCallback 支付成功回调
                 * @param failCallback
                 */
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    log.info('开始充值', config);
                    this.enableRechargeBlock();
                    var options = config.options || {};
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    var customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}");
                    var curOrderInfo = null;
                    var onPayFailed = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.warn('支付不成功');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var onPayOk = function () {
                        PayFlow_1.payStatistic.commitGSDevLog({ index: 5, eventName: "onPayOk " });
                        _this.disableRechargeBlock();
                        try {
                            log.info('支付成功');
                            PayFlow_1.payStatistic.commitGSDevLog({ index: 6, eventName: "payok callback " });
                            if (!successCallback) {
                                PayFlow_1.payStatistic.commitGSDevLog({ index: 7, eventName: "successCallback function error " });
                            }
                            var ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo });
                        }
                        catch (e) {
                            log.warn('购买成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    // ApiPay支付成功/校验前后有差异,则需要备份
                    var needBackUp = false;
                    var onContinueFailed = function () {
                        onPayFailed();
                    };
                    var onContinueOk = function (needSync) {
                        if (needBackUp) {
                            // pass
                            if (needSync) {
                                // 支付成功后,缺回滚的情况
                                // 已经回调过成功,不作回滚处理
                                // pass
                            }
                            else {
                                // 支付成功,服务器扣款成功
                                // 已经回调过成功,不作其他处理
                                // pass
                            }
                        }
                        else {
                            if (needSync) {
                                // 支付失败,扣款成功
                                onPayOk();
                            }
                            else {
                                // 支付失败,扣款失败
                                // 充值失败
                                onPayFailed();
                            }
                        }
                    };
                    this.genOrder(config, {
                        customExtra: customExtra,
                        customJsonExtra: customJsonExtra,
                        payWay: config.payWay,
                    }, function (orderInfo) {
                        var orderno = orderInfo.outTradeNo;
                        var time = orderInfo.time;
                        log.info('genOrder success', orderno);
                        curOrderInfo = orderInfo;
                        _this.saveOrder(orderInfo, config);
                        var checkRechargeOrder = function (orderno, extra, config) {
                            _this.checkOrderState({ orderno: orderno, extra: extra, config: config }, function (state) {
                                log.info('checkOrderState success, order state:', orderno, state, extra);
                                log.info("\u670D\u52A1\u5668\u6821\u9A8C\u8BA2\u5355\u72B6\u6001\uFF081\u6210\u529F\uFF0C2\u5931\u8D25\uFF0C0\u672A\u77E5\uFF09\uFF1A" + state);
                                PayFlow_1.payStatistic.commitGSDevLog({ index: 2, eventName: "checkOrderState: " + state });
                                // 用于判定合并阶段是否成功
                                var mergeOk = false;
                                var record = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra && extra.extra.purchaseToken || '' };
                                try {
                                    _this.mergeOrderList([record], { isMakingUpOrder: false }, function (result, diffExist, needSync) {
                                        log.info('mergeOrderList success', orderno);
                                        mergeOk = true;
                                        PayFlow_1.payStatistic.commitGSDevLog({ index: 4, eventName: "mergeOrderList over " });
                                        onContinueOk(needSync);
                                        if (needSync) {
                                            log.info('本次充值校验前后存在要补发的差异,需要上传存档');
                                            _this.syncStorage();
                                        }
                                        else {
                                            log.info('本次充值校验后,没有生成要补发的差异,不上传存档');
                                            PayFlow_1.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                        }
                                    }, function () {
                                        log.info('mergeOrderList failed', orderno);
                                        onContinueFailed();
                                    });
                                }
                                catch (e) {
                                    log.error('本次充值订单合并发生异常,合并结果:', mergeOk);
                                    log.error(e);
                                    onContinueFailed();
                                }
                            }, function () {
                                log.info('checkOrderState failed', orderno);
                                onContinueFailed();
                            });
                        };
                        _this.commitPayLog('OnPayStart', config, orderInfo);
                        _this.payAPICall(config, orderInfo, function (extra) {
                            log.info('payApiPay success', orderno);
                            PayFlow_1.payStatistic.commitGSDevLog({ index: 1, eventName: "start checkRechargeOrder" });
                            checkRechargeOrder(orderno, extra, config);
                        }, function (extra) {
                            log.info('payApiPay failed', orderno);
                            checkRechargeOrder(orderno, extra, config);
                        });
                    }, function () {
                        log.info('genOrder failed: 创建订单失败');
                        onPayFailed();
                    });
                };
                PayFlow.prototype.getCoinId = function (config) {
                    var itemId = config.coinId;
                    return itemId;
                };
                // 请求服务器创建并回发订单信息
                PayFlow.prototype.genOrder = function (config, extra, successCallback, failCallback) {
                    PayFlow_1.payNetClient.orderGenOrder({
                        payWay: config.payWay,
                        price: config.price,
                        priceCNY: config.priceCNY,
                        priceUSD: config.priceUSD,
                        quantity: config.money,
                        goodsId: config.id,
                        title: config.title,
                        districtId: extra && extra.customExtra || null,
                        itemId: this.getCoinId(config),
                        qqGoodid: config.productId,
                        token: gdk.userData.token,
                        others: config.others,
                        // channelId: this._parent.channelId,
                        extra: extra,
                        customKey: config.customKey,
                    }, function (data) {
                        if (data.succeed) {
                            log.info("订单获取成功", data);
                            data.data.payWay = config.payWay;
                            successCallback(data.data);
                        }
                        else {
                            failCallback();
                            if (gdk.pluginName === "oppo") {
                                log.info("oppo请求订单失败");
                                if (data.code && data.code == 501) {
                                    log.info("oppo 重新登录");
                                    // oppo 游客账号需要登录
                                    // let res = new Login({}).logic(null);
                                    PayFlow_1.payDeps.login();
                                }
                            }
                        }
                    }, true, function (err, retry) {
                        log.info("请求订单失败", err);
                        failCallback();
                    });
                };
                PayFlow.prototype.hintPayAPIErrorCode = function (errCode) {
                    var msgMap = {
                        35308: "道具没有配置",
                        35311: "道具已下架",
                        35312: "绝版道具已过期",
                        35313: "用户已经拥有该道具",
                        35315: "所选的道具有多种货货类型",
                        35316: "用户货币余额不足",
                    };
                    var msg = msgMap[errCode];
                    log.info("errCode: " + errCode + ", msg: " + msg);
                    if (mdebug && msg) {
                        setTimeout(function () {
                            gdk.showToast({ title: msg });
                        });
                    }
                };
                // 提交充值日志
                PayFlow.prototype.commitPayLog = function (key, config, orderInfo) {
                    try {
                        PayFlow_1.payStatistic.commitLog(key, config, orderInfo);
                    }
                    catch (e) {
                        log.error("提交支付统计信息失败", e);
                    }
                };
                // 调起gdk中充值api
                PayFlow.prototype.payAPICall = function (config, orderInfo, successCallback, failCallback) {
                    var _this = this;
                    var item = config;
                    var options = config.options || {};
                    var gleeZoneId = options.gleeZoneId;
                    var subTitle = options.subTitle;
                    var imagePath = options.imagePath;
                    var gameOrientation = slib.defaultValue(options.gameOrientation, 1);
                    var payUrl = slib.defaultValue(options.payUrl, options.payUrl);
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    try {
                        log.info('ApiPay call payPurchase', JSON.stringify(item));
                        log.info('ApiPay call orderInfo', JSON.stringify(orderInfo));
                        var extraStr = "";
                        if (config.payWay == "meituAppPay") {
                            extraStr = orderInfo.payInfo;
                        }
                        else if (gdk.pluginName == "gamepind") {
                            extraStr = orderInfo.payInfo;
                        }
                        else if (config.payWay == "UnifiedSdk") {
                            extraStr = JSON.stringify({ outTradeNo: orderInfo.outTradeNo });
                        }
                        else {
                            extraStr = orderInfo.alipayOrderInfo;
                        }
                        var params = {
                            goodsId: item.id,
                            coinId: item.coinId,
                            productId: item.productId,
                            money: item.money,
                            price: item.price,
                            amount: item.amount,
                            title: item.title,
                            currencyUnit: "CNY",
                            gleeOrderNo: orderInfo.outTradeNo,
                            paySign: orderInfo.sign || orderInfo.accessKey,
                            orderNo: orderInfo.platOrderNo || orderInfo.vivoOrderNumber,
                            timestamp: orderInfo.timeStamp || orderInfo.createTime,
                            prepayId: orderInfo.prepayId,
                            channelAppId: orderInfo.appid,
                            partnerId: orderInfo.mch_id,
                            nonceStr: orderInfo.nonce_str,
                            extraStr: extraStr,
                            vivoOrderInfo: orderInfo.vivoOrderNumber,
                            accountId: orderInfo.accountId,
                            notifyUrl: orderInfo.notifyUrl,
                            aliamount: orderInfo.amount,
                            gameSign: orderInfo.game_sign
                        };
                        var channelType = void 0;
                        if (gdk.gameInfo.requireCustomServicePay) {
                            channelType = "customer_service";
                        }
                        else if (gdk.gameInfo.requireMiniAppPay) {
                            channelType = "miniapp";
                        }
                        else if (gdk.gameInfo.requireIndiaSPSPay) {
                            channelType = "gamepind";
                        }
                        else {
                            channelType = "origion";
                        }
                        var nativePayInfo = {
                            gameOrientation: gameOrientation,
                            payWay: config.payWay,
                            channelType: channelType,
                            gleeZoneId: gleeZoneId,
                            payUrl: payUrl,
                            subTitle: subTitle,
                            imagePath: imagePath,
                            customExtra: customExtra,
                        };
                        log.info("ApiPay payWay", config.payWay);
                        gdk.payPurchase(params, nativePayInfo).then(function (data) {
                            log.info("ApiPay充值结果", 0, item);
                            var errCode = 0;
                            if (errCode == 0) {
                                log.info("ApiPay充值成功", item);
                                successCallback({ errCode: errCode, state: PayFlow_1.OrderState.ok, extra: data.extra });
                            }
                            else {
                                log.info("ApiPay充值失败", item);
                                try {
                                    PayFlow_1.payStatistic.commitGSCommonLog({
                                        eventId: 20001,
                                        index: 3,
                                        eventName: "gdk.payPurchase",
                                        eventValue: JSON.stringify({
                                            reason: { errCode: errCode, state: PayFlow_1.OrderState.unknown, extra: data.extra },
                                            config: config,
                                            orderInfo: orderInfo,
                                            nativePayInfo: nativePayInfo,
                                        }),
                                    });
                                }
                                catch (e) {
                                    log.error(e);
                                }
                                failCallback({ errCode: errCode, state: PayFlow_1.OrderState.unknown, extra: data.extra });
                            }
                        }).catch(function (reason) {
                            try {
                                PayFlow_1.payStatistic.commitGSCommonLog({
                                    eventId: 20001,
                                    index: 2,
                                    eventName: "gdk.payPurchase",
                                    eventValue: JSON.stringify({
                                        reason: reason,
                                        config: config,
                                        orderInfo: orderInfo,
                                        nativePayInfo: nativePayInfo,
                                    }),
                                });
                            }
                            catch (e) {
                                log.error(e);
                            }
                            if (reason.data) {
                                var errCode = reason.data.extra.errCode;
                                var errMsg = reason.data.extra.errMsg;
                                log.warn("ApiPay充值失败", errCode, item, errMsg);
                                _this.hintPayAPIErrorCode(errCode);
                                failCallback({ errCode: errCode, state: PayFlow_1.OrderState.unknown });
                            }
                            else {
                                log.error('ApiPay充值期间异常:' + JSON.stringify(reason));
                                console.error(reason);
                                failCallback({ errCode: -101, state: PayFlow_1.OrderState.unknown });
                            }
                        });
                    }
                    catch (e) {
                        try {
                            PayFlow_1.payStatistic.commitGSCommonLog({
                                eventId: 20001,
                                index: 1,
                                eventName: "gdk.payPurchase",
                                eventValue: JSON.stringify({
                                    reason: e && e.toString(),
                                    config: config,
                                    orderInfo: orderInfo,
                                    nativePayInfo: nativePayInfo,
                                }),
                            });
                        }
                        catch (e) {
                            log.error(e);
                        }
                        log.error('ApiPay充值期间异常:' + JSON.stringify(e));
                        console.error(e);
                        failCallback({ errCode: -101, state: PayFlow_1.OrderState.unknown });
                    }
                };
                // 检查订单状态
                PayFlow.prototype.checkOrderState = function (_a, successCallback, failCallback) {
                    var orderno = _a.orderno, extra = _a.extra, config = _a.config;
                    var nativePayData = {};
                    if (gdk.pluginName == "app" || gdk.pluginName == "appv2") {
                        try {
                            nativePayData = typeof (extra.extra.data) == 'string' ? JSON.parse(extra.extra.data) : extra.extra.data;
                            log.info('原生支付订单验证信息:', nativePayData.purchaseData, nativePayData.dataSignature);
                        }
                        catch (e) {
                            log.warn('获取原生支付订单验证信息失败', extra);
                        }
                    }
                    PayFlow_1.payNetClient.orderCheckOrderState({
                        payWay: config.payWay,
                        outTradeNo: orderno,
                        errCode: extra.errCode,
                        state: extra.state,
                        goodsId: config.id,
                        gameId: gdk.gameInfo.gameId,
                        openKey: gdk.userData.openKey,
                        purchaseData: nativePayData && nativePayData.purchaseData,
                        signature: nativePayData && nativePayData.dataSignature,
                    }, function (data) {
                        // 测试数据
                        // if(false){
                        //     data.succeed=true
                        //     data.data=1
                        // }
                        if (data.succeed) {
                            var state = data.data;
                            successCallback(state);
                        }
                        else {
                            failCallback();
                        }
                    }, false, function () { return [
                        failCallback()
                    ]; });
                };
                // 请求订单清单
                PayFlow.prototype.reqDiffOrderList = function (_a, successCallback, failCallback) {
                    var time = _a.time;
                    log.info("[APayBase]reqDiffOrderList:");
                    PayFlow_1.payNetClient.orderReqDiffOrderList({
                        time: time,
                        gameId: gdk.gameInfo.gameId,
                        openKey: gdk.userData.openKey,
                        // purchaseData: {},
                        purchaseData: null,
                    }, function (data) {
                        if (data.succeed) {
                            var recordInfos = data.data;
                            successCallback(recordInfos);
                        }
                        else {
                            failCallback();
                        }
                    }, false, function () {
                        failCallback();
                    });
                };
                // 求出差异的订单列表
                PayFlow.prototype.diffOrderList = function (infos) {
                    var diffExist = false;
                    // 有补发的时候才同步
                    var needSync = false;
                    var result = [];
                    var targets = this.paysdk.orderRecordList;
                    var _loop_1 = function (remoteInfo) {
                        var localInfo = targets.find(function (info) { return info.orderno == remoteInfo.outTradeNo; });
                        // 本地不存在的订单,如果服务器列表中变为存在并且不成功,则加入这一单到本地历史订单中
                        // 本地非成功或不存在的订单,如果服务器列表中变为存在并且成功,则表示这一单变为成功
                        // 本地未知的订单如果服务器中为失败,则回滚
                        // 如果两者同时存在并且都不成功,则把本地的重置为服务器的状态
                        if (!localInfo) {
                            var config = this_1._parent.chargeconfig.find(function (info) { return info.id == remoteInfo.goodsId; });
                            targets.push(new PayFlow_1.OrderRecord(remoteInfo, PayFlow_1.OrderState.unknown, config));
                            if (remoteInfo.state == PayFlow_1.OrderState.ok) {
                                log.warn('查询到本地不存在的订单', remoteInfo.outTradeNo);
                                log.warn('需要补发道具', remoteInfo.outTradeNo);
                                diffExist = true;
                                needSync = true;
                                result.push(remoteInfo);
                            }
                            else {
                                // 保存好收到的本地不存在的不成功订单之后,不作其他处理
                            }
                        }
                        else {
                            if (localInfo.state == PayFlow_1.OrderState.ok) {
                                if (remoteInfo.state == PayFlow_1.OrderState.fail) {
                                    // 需要回档
                                    log.error('需要回滚订单', remoteInfo, localInfo);
                                    diffExist = true;
                                    result.push(remoteInfo);
                                }
                                else if (remoteInfo.state == PayFlow_1.OrderState.unknown) {
                                    // 本地应用过的订单,服务器状态未知,那么不作处理
                                    log.warn('未确定的已应用订单', localInfo.orderno);
                                }
                                else {
                                    // 本地应用过的同状态订单,不作处理
                                }
                            }
                            else {
                                if (remoteInfo.state == PayFlow_1.OrderState.ok) {
                                    // 由非成功变为成功,则加入返回
                                    log.info("local order <" + localInfo.orderno + "> will set state: " + localInfo.state + " => " + remoteInfo.state);
                                    log.warn('需要补发道具', localInfo.orderno);
                                    diffExist = true;
                                    needSync = true;
                                    result.push(remoteInfo);
                                }
                                else {
                                    if (localInfo.state != remoteInfo.state) {
                                        log.info("local order <" + localInfo.orderno + "> set state: " + localInfo.state + " => " + remoteInfo.state);
                                        diffExist = true;
                                        localInfo.state = remoteInfo.state;
                                    }
                                    else {
                                        // 本地和服务器状态相同,不作处理
                                    }
                                    // 都表示没有完成订单,则不作其他处理
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                        var remoteInfo = infos_1[_i];
                        _loop_1(remoteInfo);
                    }
                    return { result: result, diffExist: diffExist, needSync: needSync };
                };
                // 应用有差异的订单列表，有需要补发的补发，需要回滚的暂时不作回滚处理
                PayFlow.prototype.applyOrderList = function (infos, options) {
                    var _loop_2 = function (remoteInfo) {
                        var config = this_2._parent.chargeconfig.find(function (info) { return info.id == remoteInfo.goodsId; });
                        if (remoteInfo.state == PayFlow_1.OrderState.ok) {
                            log.warn('存在成功的差异订单,正在发送道具', remoteInfo.outTradeNo);
                            this_2.applyOrder(remoteInfo, config, options);
                            log.info('补发完成', remoteInfo.outTradeNo);
                            // PayRecords 已经加过，此处不需要再加
                            // //log order
                            // gdk.commitChannelsLog("Paid", {
                            // 	id: config.productId,
                            // 	count: config.amount,
                            // 	currency: "$",
                            // 	price: config.money || config.price,
                            // 	succ: true,
                            // })
                        }
                        else if (remoteInfo.state == PayFlow_1.OrderState.fail) {
                            log.warn('存在实际上失败的已生效订单,暂时不回扣道具');
                            this_2.paysdk.deapplyRecord(remoteInfo, config);
                        }
                        else {
                            log.error('其中不应该有未知订单');
                        }
                    };
                    var this_2 = this;
                    for (var _i = 0, infos_2 = infos; _i < infos_2.length; _i++) {
                        var remoteInfo = infos_2[_i];
                        _loop_2(remoteInfo);
                    }
                };
                // 合并订单历史
                PayFlow.prototype.mergeOrderList = function (infos, options, successCallback, failCallback) {
                    var _a = this.diffOrderList(infos), result = _a.result, diffExist = _a.diffExist, needSync = _a.needSync;
                    this.applyOrderList(result, options);
                    log.info('订单合并完成,开始充值回调');
                    PayFlow_1.payStatistic.commitGSDevLog({ index: 3, eventName: "mergeOrderList sync: " + needSync });
                    successCallback(result, diffExist, needSync);
                };
                // 同步存档
                PayFlow.prototype.syncStorage = function (successCallback, failCallback) {
                    log.info('GameProxy.backupSave');
                    successCallback = successCallback || (function () { });
                    failCallback = failCallback || (function () { });
                    PayFlow_1.payDeps.storage.saveToLocalStorage(); //立即同步保存
                    PayFlow_1.payDeps.storage.backup();
                    log.info('自动备份重新开始计时');
                    PayFlow_1.payDeps.storage.rescheduleBackup();
                };
                // 保存订单
                PayFlow.prototype.saveOrder = function (orderInfo, config) {
                    this.paysdk.addRecord(orderInfo, config);
                };
                PayFlow.prototype.applyOrder = function (orderInfo, config, options) {
                    log.info('应用成功订单:', orderInfo, config, options);
                    this.paysdk.applyRecord(orderInfo, config, options);
                };
                /**
                 * 检查充值是否已经购买
                 * @@export
                 * @param config 配置信息
                 */
                PayFlow.prototype.isItemBoughtEver = function (config) {
                    return this.paysdk.isItemBoughtEver(config);
                };
                Object.defineProperty(PayFlow.prototype, "paysdk", {
                    get: function () {
                        return PayFlow_1.PayRecords.saved;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(PayFlow.prototype, "orderRecordList", {
                    get: function () {
                        return PayFlow_1.PayRecords.saved.orderRecordList.map(function (info) {
                            var clone = {
                                orderno: info.orderno,
                                state: info.state,
                                time: info.time,
                                id: info.Id,
                                money: info.Money,
                                amount: info.Amt,
                                itemName: info.ItemName,
                                userId: info.userId,
                            };
                            return clone;
                        });
                    },
                    enumerable: false,
                    configurable: true
                });
                return PayFlow;
            }());
            APayBase.PayFlow = PayFlow;
        })(APayBase = PayFlow_1.APayBase || (PayFlow_1.APayBase = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_2) {
        var PayInApp;
        (function (PayInApp) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 类似微信、玩一玩等内购支付流程
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayInApp";
                    return _this;
                }
                return PayFlow;
            }(PayFlow_2.APayBase.PayFlow));
            PayInApp.PayFlow = PayFlow;
        })(PayInApp = PayFlow_2.PayInApp || (PayFlow_2.PayInApp = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_3) {
        var PayInAppWithAutoMakeup;
        (function (PayInAppWithAutoMakeup) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 充值之后，自带轮询补单
             * - 默认补单 3s * 2次
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayInAppWithAutoMakeup";
                    /**
                     * 剩余补单次数
                     */
                    _this.autoMakeupOrderLeftTimes = 0;
                    /**
                     * 补单定时器id
                     */
                    _this.autoMakeupOrderScheduleId = null;
                    /**
                     * 自动补单间隔
                     */
                    _this.autoMakeupOrderInterval = 3000; //ms
                    /**
                     * 当前是否正在补单
                     */
                    _this.isAutoMakingupOrders = false;
                    return _this;
                }
                /**
                 * 触发自动定时补单
                 */
                PayFlow.prototype.scheduleAutoMakeup = function (retryTimes) {
                    var _this = this;
                    if (retryTimes == null || isNaN(retryTimes)) {
                        retryTimes = 3;
                    }
                    // 避免重复定时
                    this.pauseAutoMakeup();
                    // 每次自动轮询n次
                    this.autoMakeupOrderLeftTimes = retryTimes;
                    this.autoMakeupOrderScheduleId = setInterval(function () {
                        // 已经存在补单操作就跳过
                        if (_this.isAutoMakingupOrders) {
                            return;
                        }
                        _this.autoMakeupOrderLeftTimes -= 1;
                        if (_this.autoMakeupOrderLeftTimes >= 0) {
                            _this.pullDiffOrders(function () { }, function () { });
                        }
                        else {
                            // 次数达上限就取消定时
                            _this.pauseAutoMakeup();
                        }
                    }, this.autoMakeupOrderInterval);
                };
                /**
                 * 暂停自动轮询补单入口
                 */
                PayFlow.prototype.pauseAutoMakeup = function () {
                    this.autoMakeupOrderLeftTimes = 0;
                    if (this.autoMakeupOrderScheduleId != null) {
                        clearInterval(this.autoMakeupOrderScheduleId);
                        this.autoMakeupOrderScheduleId = null;
                    }
                };
                // 校验历史订单
                PayFlow.prototype.pullDiffOrders = function (successCallback, failCallback) {
                    var _this = this;
                    this.isAutoMakingupOrders = true;
                    _super.prototype.pullDiffOrders.call(this, function () {
                        var p1 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            p1[_i] = arguments[_i];
                        }
                        _this.isAutoMakingupOrders = false;
                        return successCallback.apply(void 0, p1);
                    }, function () {
                        var p2 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            p2[_i] = arguments[_i];
                        }
                        _this.isAutoMakingupOrders = false;
                        return failCallback.apply(void 0, p2);
                    });
                };
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    // 仅仅暂停自动轮询补单入口，暂时不保证当前已触发的补单是否还在进行中
                    this.pauseAutoMakeup();
                    // 自动补单重试次数
                    var autoMakeupRetryTimes = config.options.autoMakeupRetryTimes;
                    _super.prototype.payment.call(this, config, function () {
                        var p1 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            p1[_i] = arguments[_i];
                        }
                        var ___unused = successCallback && successCallback.apply(void 0, p1);
                        // 成功不轮询补单
                        // this.scheduleAutoMakeup()
                    }, function () {
                        var p2 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            p2[_i] = arguments[_i];
                        }
                        var ___unused = failCallback && failCallback.apply(void 0, p2);
                        // 失败轮询补单
                        _this.scheduleAutoMakeup(autoMakeupRetryTimes);
                    });
                };
                return PayFlow;
            }(PayFlow_3.APayBase.PayFlow));
            PayInAppWithAutoMakeup.PayFlow = PayFlow;
        })(PayInAppWithAutoMakeup = PayFlow_3.PayInAppWithAutoMakeup || (PayFlow_3.PayInAppWithAutoMakeup = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_4) {
        var PayInsideLocalV1;
        (function (PayInsideLocalV1) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 兼容类似谷歌支付等有本地支付缓存的老版本apk
             * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayInsideLocalV1";
                    return _this;
                    // payAPICall(config: PaymentParams,{}, successCallback: (res: wxPayState) => void, failCallback: (res: wxPayState) => void) {
                    // 	const item: RechargeConfigRow = config
                    // 	const options = config.options || {}
                    // 	const gleeZoneId = options.gleeZoneId
                    // 	const subTitle = options.subTitle
                    // 	const imagePath = options.imagePath
                    // 	const gameOrientation = slib.defaultValue(options.gameOrientation, 1)
                    // 	const payUrl: string = slib.defaultValue(options.payUrl, Info.instance.accountServer)
                    // 	try {
                    // 		log.info('ApiPay call payPurchase', item)
                    // 		const params: GDK.PayItemInfo = {
                    // 			goodsId: item.id,
                    // 			coinId: item.coinId,
                    // 			productId: item.productId,
                    // 			money: item.money,
                    // 			amount: item.amount,
                    // 			title: item.title,
                    // 			currencyUnit: "CNY",
                    // 		}
                    // 		let channelType: GDK.ChannelType
                    // 		if (gdk.gameInfo.requireCustomServicePay) {
                    // 			channelType = "customer_service"
                    // 		} else if (gdk.gameInfo.requireMiniAppPay) {
                    // 			channelType = "miniapp"
                    // 		} else {
                    // 			channelType = "origion"
                    // 		}
                    // 		let consumeLeft = (onDone: Function) => {
                    // 			gdk.queryItemInfo({ productId: config.productId }).then((ret) => {
                    // 				if (ret.code == 0) {
                    // 					gdk.consumePurchase({ purchaseToken: ret.data.purchaseToken }).then((ret) => {
                    // 						onDone()
                    // 					}, () => {
                    // 						onDone()
                    // 					})
                    // 				} else {
                    // 					onDone()
                    // 				}
                    // 			}, () => {
                    // 				onDone()
                    // 			})
                    // 		}
                    // 		let payMoney = () => {
                    // 			gdk.payPurchase(params, {
                    // 				gameOrientation: gameOrientation,
                    // 				channelType: channelType,
                    // 				gleeZoneId: gleeZoneId,
                    // 				payUrl: payUrl,
                    // 				subTitle: subTitle,
                    // 				imagePath: imagePath,
                    // 			}).then((data) => {
                    // 				log.info("ApiPay充值结果", 0, item);
                    // 				let errCode = 0
                    // 				if (errCode == 0) {
                    // 					let checkSign: { purchaseToken: string } = data.extra.data
                    // 					log.info("ApiPay充值成功", item);
                    // 					successCallback({ errCode: errCode, state: OrderState.ok, extra: data.extra })
                    // 					gdk.consumePurchase({ purchaseToken: checkSign.purchaseToken })
                    // 				} else {
                    // 					log.info("ApiPay充值失败", item);
                    // 					failCallback({ errCode: errCode, state: OrderState.unknown, extra: data.extra })
                    // 				}
                    // 			}).catch((reason) => {
                    // 				if (reason.data) {
                    // 					const errCode = reason.data.extra.errCode
                    // 					const errMsg = reason.data.extra.errMsg
                    // 					log.warn("ApiPay充值失败", errCode, item, errMsg)
                    // 					this.hintPayAPIErrorCode(errCode)
                    // 					failCallback({ errCode: errCode, state: OrderState.unknown });
                    // 				} else {
                    // 					log.error('ApiPay充值期间异常:' + JSON.stringify(reason))
                    // 					console.error(reason)
                    // 					failCallback({ errCode: -101, state: OrderState.unknown })
                    // 				}
                    // 			})
                    // 		}
                    // 		consumeLeft(payMoney)
                    // 	} catch (e) {
                    // 		log.error('ApiPay充值期间异常:' + JSON.stringify(e))
                    // 		console.error(e)
                    // 		failCallback({ errCode: -101, state: OrderState.unknown })
                    // 	}
                    // }
                }
                return PayFlow;
            }(PayFlow_4.APayBase.PayFlow));
            PayInsideLocalV1.PayFlow = PayFlow;
        })(PayInsideLocalV1 = PayFlow_4.PayInsideLocalV1 || (PayFlow_4.PayInsideLocalV1 = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_5) {
        var PayInsideLocalV2;
        (function (PayInsideLocalV2) {
            var waitAllFinish = function (ls) {
                return new Promise(function (resolve, reject) {
                    if (ls.length <= 0) {
                        resolve();
                        return;
                    }
                    var waitCount = ls.length;
                    var failExist = false;
                    var tryOnDone = function () {
                        waitCount--;
                        if (waitCount == 0) {
                            if (failExist) {
                                reject();
                            }
                            else {
                                resolve();
                            }
                        }
                    };
                    var tryOnFail = function () {
                        failExist = true;
                        tryOnDone();
                    };
                    for (var _i = 0, ls_1 = ls; _i < ls_1.length; _i++) {
                        var p = ls_1[_i];
                        p.then(tryOnDone, tryOnFail);
                    }
                });
            };
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 支持类似谷歌支付等有本地支付缓存的支付方式
             * - https://developer.android.com/google/play/billing/api.html?hl=zh-cn
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayInsideLocalV2";
                    return _this;
                }
                PayFlow.prototype.checkOutLocalOrder = function (purchaseToken, payWay) {
                    var result = [];
                    var targets = this.paysdk.orderRecordList;
                    for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                        var record = targets_1[_i];
                        if (record.purchaseToken == purchaseToken) {
                            result.push({ payWay: payWay, goodsId: record.Id, outTradeNo: record.orderno, purchaseToken: record.purchaseToken, state: record.state, time: record.time });
                        }
                    }
                    if (result.length > 1) {
                        log.error("多个订单重复绑定同一支付token");
                    }
                    return result[0];
                };
                /**
                 * 本地化支付
                 * @param config
                 * @param successCallback
                 * @param failCallback
                 */
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    log.info('开始充值', config);
                    this.enableRechargeBlock();
                    var options = config.options || {};
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    var customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}");
                    var curOrderInfo = null;
                    var onPayFailed = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.warn('支付不成功');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var onPayOk = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.info('支付成功');
                            var ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo });
                        }
                        catch (e) {
                            log.warn('购买成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    // ApiPay支付成功/校验前后有差异,则需要备份
                    var needBackUp = false;
                    var onContinueFailed = function () {
                        onPayFailed();
                    };
                    var onContinueOk = function (needSync) {
                        // 目前 needBackUp 一直为 false，没有true的需求
                        if (needBackUp) {
                            // pass
                            if (needSync) {
                                // 支付成功后,缺回滚的情况
                                // 已经回调过成功,不作回滚处理
                                // pass
                            }
                            else {
                                // 支付成功,服务器扣款成功
                                // 已经回调过成功,不作其他处理
                                // pass
                            }
                        }
                        else {
                            if (needSync) {
                                // 支付失败,扣款成功
                                onPayOk();
                            }
                            else {
                                // 支付失败,扣款失败
                                // 充值失败
                                onPayFailed();
                            }
                        }
                    };
                    var consumeProductAndReward = function (record, config) {
                        var purchaseToken = record.purchaseToken;
                        var orderno = record.outTradeNo;
                        var state = record.state;
                        var mergeOrders = function () {
                            // 用于判定合并阶段是否成功
                            var mergeOk = false;
                            try {
                                _this.mergeOrderList([record], { isMakingUpOrder: false }, function (result, diffExist, needSync) {
                                    log.info('mergeOrderList success', orderno);
                                    mergeOk = true;
                                    onContinueOk(needSync);
                                    if (needSync) {
                                        log.info('本次充值校验前后存在要补发的差异,需要上传存档');
                                        _this.syncStorage();
                                    }
                                    else {
                                        log.info('本次充值校验后,没有生成要补发的差异,不上传存档');
                                        PayFlow_5.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                    }
                                }, function () {
                                    log.info('mergeOrderList failed', orderno);
                                    onContinueFailed();
                                });
                            }
                            catch (e) {
                                log.error('本次充值订单合并发生异常,合并结果:', mergeOk);
                                log.error(e);
                                onContinueFailed();
                            }
                        };
                        if (state == PayFlow_5.OrderState.ok || state == PayFlow_5.OrderState.fail) {
                            // 成功（正常订单）、失败（异常订单）都需要消耗
                            // 但合并中，只有成功的才发奖励，失败的不发
                            gdk.consumePurchase({ payWay: config.payWay, purchaseToken: purchaseToken }).then(function (ret) {
                                if (ret.code == 0 || ret.code == 8) {
                                    mergeOrders();
                                }
                                else {
                                    onContinueFailed();
                                }
                            }, function () {
                                onContinueFailed();
                            });
                        }
                        else if (state == PayFlow_5.OrderState.unknown) {
                            // 未知（异常订单）的不消耗，形式上合并一下，实际上不生效
                            mergeOrders();
                        }
                        else {
                            onPayFailed();
                        }
                    };
                    var consumeProductAndAbort = function (record, config, onContinue) {
                        var purchaseToken = record.purchaseToken;
                        var orderno = record.outTradeNo;
                        var state = record.state;
                        var mergeOrders = function () {
                            // 用于判定合并阶段是否成功
                            var mergeOk = false;
                            try {
                                _this.mergeOrderList([record], { isMakingUpOrder: false }, function (result, diffExist, needSync) {
                                    log.info('mergeOrderList success', orderno);
                                    mergeOk = true;
                                    PayFlow_5.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                    onContinue();
                                }, function () {
                                    log.info('mergeOrderList failed', orderno);
                                    onContinue();
                                });
                            }
                            catch (e) {
                                log.error('本次充值订单合并发生异常,合并结果:', mergeOk);
                                log.error(e);
                                onContinue();
                            }
                        };
                        if (state == PayFlow_5.OrderState.ok || state == PayFlow_5.OrderState.fail) {
                            // 成功（正常订单）、失败（异常订单）都需要消耗
                            // 但合并中，只有成功的才发奖励，失败的不发
                            gdk.consumePurchase({ payWay: config.payWay, purchaseToken: purchaseToken }).then(function (ret) {
                                if (ret.code == 0 || ret.code == 8) {
                                    mergeOrders();
                                }
                                else {
                                    onContinue();
                                }
                            }, function () {
                                onContinue();
                            });
                        }
                        else if (state == PayFlow_5.OrderState.unknown) {
                            // 未知（异常订单）的不消耗，形式上合并一下，实际上不生效
                            onContinue();
                        }
                        else {
                            onContinue();
                        }
                    };
                    var checkRechargeOrder = function (orderno, extra, config, time) {
                        _this.checkOrderState({ orderno: orderno, extra: extra, config: config }, function (state) {
                            log.info('checkOrderState success, order state:', orderno, state, extra);
                            var record = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra.data.purchaseToken };
                            consumeProductAndReward(record, config);
                        }, function () {
                            log.info('checkOrderState failed:', orderno);
                            // 如果无法重新发起支付，那么需要改成调用一下 consumeProductAndAbort
                            // 返回失败订单，则消耗并存档，并直接重新发起支付流程
                            // let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: OrderState.fail, goodsId: config.id, purchaseToken: extra.extra.data.purchaseToken }
                            // consumeProductAndAbort(record, config, () => {
                            // 	// 	beginRequestPay()
                            // })
                            // 直接返回失败，避免无谓重试
                            onContinueFailed();
                        });
                    };
                    var genOrderAndConsume = function (extra) {
                        _this.genOrder(config, {
                            customExtra: customExtra,
                            customJsonExtra: customJsonExtra,
                            purchaseToken: extra.checkSign.purchaseToken,
                            productId: config.productId,
                            goodsId: config.id,
                            payWay: config.payWay,
                        }, function (orderInfo) {
                            var orderno = orderInfo.outTradeNo;
                            orderInfo.purchaseToken = extra.checkSign.purchaseToken;
                            // let time: number = orderInfo.time
                            log.info('genOrder success', orderno);
                            curOrderInfo = orderInfo;
                            _this.saveOrder(orderInfo, config);
                            // 新生成的绑定订单，请求校验、消耗
                            checkRechargeOrder(orderInfo.outTradeNo, { errCode: 0, extra: { data: extra.checkSign }, state: orderInfo.state }, config, orderInfo.time);
                        }, function () {
                            log.info('genOrder failed: 创建订单失败');
                            onPayFailed();
                        });
                    };
                    var beginRequestPay = function () {
                        var productId = config.productId;
                        gdk.queryItemInfo({ payWay: config.payWay, productId: productId }).then(function (ret) {
                            if (ret.code == 0) {
                                // 签名数据
                                var checkSign = ret.data;
                                // 检查有无绑定的本地历史订单
                                var orderInfo = _this.checkOutLocalOrder(checkSign.purchaseToken, config.payWay);
                                if (orderInfo) {
                                    if (orderInfo.state == PayFlow_5.OrderState.fail || orderInfo.state == PayFlow_5.OrderState.ok) {
                                        // 本地存在不为未知的绑定订单说明有异常
                                        log.error("本地存在不为未知的绑定订单");
                                    }
                                    // 每次都在校验订单、消耗完之后，再去修改本地订单状态，因此，若有未消耗的商品，那么本地订单状态应为未知，需要联网校验
                                    checkRechargeOrder(orderInfo.outTradeNo, { errCode: 0, extra: { data: ret.data }, state: orderInfo.state }, config, orderInfo.time);
                                }
                                else {
                                    // 无绑定的历史订单，那么进行绑定、消耗
                                    genOrderAndConsume({ checkSign: checkSign });
                                }
                            }
                            else {
                                _this.payAPICall(config, {}, function (extra) {
                                    log.info('payApiPay success', extra);
                                    // 付款之后，进行绑定、消耗
                                    genOrderAndConsume({ checkSign: extra.extra.data });
                                }, function (extra) {
                                    log.info('payApiPay failed', extra);
                                    onPayFailed();
                                });
                            }
                        }, function (ret) {
                            onPayFailed();
                            return;
                        });
                    };
                    beginRequestPay();
                };
                // 校验历史订单
                PayFlow.prototype.pullDiffOrders = function (successCallback, failCallback, options) {
                    var _this = this;
                    log.info('开始校验订单历史');
                    options = options || {};
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    var customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}");
                    var onMergeFailed = function () {
                        try {
                            log.warn('校验历史订单失败');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('校验历史订单失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var makeupResult = {
                        isDiffExist: false,
                        isMergeOk: false,
                    };
                    var onMergeSucceed = function () {
                        try {
                            var ___unused = successCallback && successCallback(makeupResult);
                        }
                        catch (e) {
                            log.warn('合并历史差异订单成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    if (!(this._parent && this._parent.chargeconfig)) {
                        log.error("未配置商品配表");
                        onMergeFailed();
                        return;
                    }
                    var time = this.getHistoryCutline();
                    log.info('订单检查点时间2:', time);
                    //log.info('本地订单2:', this.getPrettyLocalRechargeRecords())
                    this.reqDiffOrderList({ time: time, }, function (diffList) {
                        log.info('reqDiffOrderList success', time, diffList);
                        // 先消耗，无法消耗的订单不补单
                        var consumedList = [];
                        var consumeAwaitList = [];
                        var queryAwaitList = [];
                        var unconsumedAwaitList = [];
                        var delay = 0;
                        var genUnconsumedOrder = function (config) {
                            return new Promise(function (resolve, reject) {
                                gdk.queryItemInfo({ payWay: config.payWay, productId: config.productId }).then(function (ret) {
                                    if (ret.code == 0) {
                                        var isBindOrderExist = diffList.find(function (info) { return info.purchaseToken == ret.data.purchaseToken; }) || _this.checkOutLocalOrder(ret.data.purchaseToken, config.payWay);
                                        if (isBindOrderExist) {
                                            reject();
                                            return;
                                        }
                                        _this.genOrder(config, {
                                            customExtra: customExtra,
                                            customJsonExtra: customJsonExtra,
                                            purchaseToken: ret.data.purchaseToken,
                                            productId: config.productId,
                                            goodsId: config.id,
                                            payWay: config.payWay,
                                        }, function (orderInfo) {
                                            var orderno = orderInfo.outTradeNo;
                                            orderInfo.purchaseToken = ret.data.purchaseToken;
                                            log.info('genOrder successx', orderno);
                                            diffList.push(orderInfo);
                                            resolve();
                                        }, function () {
                                            reject();
                                        });
                                    }
                                    else {
                                        reject();
                                    }
                                }, function () {
                                    reject();
                                });
                            });
                        };
                        var filterUnconsumedList = function () {
                            for (var _i = 0, _a = _this._parent.chargeconfig; _i < _a.length; _i++) {
                                var config = _a[_i];
                                unconsumedAwaitList.push(genUnconsumedOrder(config));
                            }
                        };
                        var genQueryAwait = function (info, config) {
                            return new Promise(function (resolve, reject) {
                                gdk.queryItemInfo({ payWay: config.payWay, productId: config.productId }).then(function (ret) {
                                    if (ret.code == 0) {
                                        // 签名数据
                                        var checkSign = ret.data;
                                        // 检查有无绑定的本地历史订单
                                        var checkRechargeOrder = function (orderno, extra, config) {
                                            _this.checkOrderState({ orderno: orderno, extra: extra, config: config }, function (state) {
                                                log.info('checkOrderState success, order state:', orderno, state, extra);
                                                info.state = state;
                                                resolve();
                                            }, function () {
                                                log.info('checkOrderState failed', orderno);
                                                reject();
                                            });
                                        };
                                        checkRechargeOrder(info.outTradeNo, { errCode: 0, extra: { data: checkSign }, state: info.state }, config);
                                    }
                                    else {
                                        reject();
                                    }
                                }, function () {
                                    reject();
                                });
                            });
                        };
                        var filterQueryList = function () {
                            var _loop_3 = function (info) {
                                if (info.purchaseToken) {
                                    if (info.state == PayFlow_5.OrderState.unknown) {
                                        // 只有成功、失败订单才能尝试消耗
                                        var orderInfo = _this.checkOutLocalOrder(info.purchaseToken, info.payWay);
                                        var config = _this._parent.chargeconfig.find(function (cfg) { return cfg.id == info.goodsId; });
                                        var isOrderNotApplyed = (!orderInfo || orderInfo.state == PayFlow_5.OrderState.unknown);
                                        if (isOrderNotApplyed && config) {
                                            queryAwaitList.push(genQueryAwait(info, config));
                                        }
                                    }
                                }
                            };
                            for (var _i = 0, diffList_1 = diffList; _i < diffList_1.length; _i++) {
                                var info = diffList_1[_i];
                                _loop_3(info);
                            }
                        };
                        var filterConsumeList = function () {
                            var _loop_4 = function (info) {
                                if (info.purchaseToken) {
                                    if (info.state == PayFlow_5.OrderState.ok || info.state == PayFlow_5.OrderState.fail) {
                                        // 只有成功、失败订单才能尝试消耗
                                        var p = gdk.consumePurchase({ payWay: info.payWay, purchaseToken: info.purchaseToken });
                                        consumeAwaitList.push(p);
                                        p.then(function (ret) {
                                            if (ret.code == 0 || ret.code == 8) {
                                                // 只有已消耗成功的订单才进行合并
                                                consumedList.push(info);
                                            }
                                        }, function (err) {
                                            log.warn("消耗订单失败", info, err);
                                        });
                                    }
                                }
                                else {
                                    consumedList.push(info);
                                }
                            };
                            for (var _i = 0, diffList_2 = diffList; _i < diffList_2.length; _i++) {
                                var info = diffList_2[_i];
                                _loop_4(info);
                            }
                        };
                        var mergeList = function () {
                            // 过滤未消耗的订单
                            diffList = consumedList;
                            var mergeOk = false;
                            try {
                                _this.mergeOrderList(diffList, { isMakingUpOrder: true }, function (result, diffExist, needSync) {
                                    log.info('mergeOrderList success', diffList);
                                    log.info('合并后本地订单:', _this.getPrettyLocalRechargeRecords());
                                    mergeOk = true;
                                    makeupResult.isMergeOk = mergeOk;
                                    makeupResult.isDiffExist = diffExist;
                                    onMergeSucceed();
                                    if (needSync) {
                                        log.info('校验前后存在要补发的差异,需要上传存档');
                                        _this.syncStorage();
                                    }
                                    else {
                                        log.info('本次订单校验,没有生成要补发的差异订单,不上传存档');
                                        PayFlow_5.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                    }
                                }, function () {
                                    log.info('mergeOrderList failed', diffList);
                                    onMergeFailed();
                                });
                            }
                            catch (e) {
                                log.error('合并订单历史出现异常,合并结果:', mergeOk);
                                log.error(e);
                                if (!mergeOk) {
                                    onMergeFailed();
                                }
                                else {
                                    // 已经调用过 onMergeSucceed()
                                }
                            }
                        };
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_1, e_2, e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filterUnconsumedList();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, 4, 5]);
                                        return [4 /*yield*/, waitAllFinish(unconsumedAwaitList)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 3:
                                        e_1 = _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        filterQueryList();
                                        return [7 /*endfinally*/];
                                    case 5:
                                        _a.trys.push([5, 7, 8, 9]);
                                        return [4 /*yield*/, waitAllFinish(queryAwaitList)];
                                    case 6:
                                        _a.sent();
                                        return [3 /*break*/, 9];
                                    case 7:
                                        e_2 = _a.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        filterConsumeList();
                                        return [7 /*endfinally*/];
                                    case 9:
                                        _a.trys.push([9, 11, 12, 13]);
                                        return [4 /*yield*/, waitAllFinish(consumeAwaitList)];
                                    case 10:
                                        _a.sent();
                                        return [3 /*break*/, 13];
                                    case 11:
                                        e_3 = _a.sent();
                                        return [3 /*break*/, 13];
                                    case 12:
                                        mergeList();
                                        return [7 /*endfinally*/];
                                    case 13: return [2 /*return*/];
                                }
                            });
                        }); })();
                    }, function () {
                        log.info('reqDiffOrderList failed', time);
                        onMergeFailed();
                    });
                };
                // 请求服务器创建并回发订单信息
                PayFlow.prototype.genOrder = function (config, extra, successCallback, failCallback) {
                    var _this = this;
                    setTimeout(function () {
                        _super.prototype.genOrder.call(_this, config, extra, successCallback, failCallback);
                    }, 0);
                };
                return PayFlow;
            }(PayFlow_5.APayBase.PayFlow));
            PayInsideLocalV2.PayFlow = PayFlow;
        })(PayInsideLocalV2 = PayFlow_5.PayInsideLocalV2 || (PayFlow_5.PayInsideLocalV2 = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_6) {
        var PayOutside;
        (function (PayOutside) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 这种流程只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayOutside";
                    return _this;
                }
                Object.defineProperty(PayFlow.prototype, "isPayCallbackValid", {
                    get: function () {
                        return false;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 小程序跳转支付和客服支付
                 * @param config
                 * @param successCallback
                 * @param failCallback
                 */
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    log.info('开始充值', config);
                    this.enableRechargeBlock();
                    /** 无回调支付不会直接返回成功 */
                    // const onPayOk = () => {
                    // 	this.disableRechargeBlock()
                    // 	log.info('支付成功')
                    // 	try {
                    // 		successCallback && successCallback({ config: config, orderInfo: null })
                    // 	} catch (e) {
                    // 		log.warn('购买成功,成功回调内处理失败')
                    // 		log.error(e)
                    // 	}
                    // }
                    var onPayFailed = function () {
                        _this.disableRechargeBlock();
                        log.warn('支付不成功');
                        try {
                            var ___unused = failCallback && failCallback({ status: 1 });
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var onPayWaitting = function () {
                        _this.disableRechargeBlock();
                        log.warn('等待支付');
                        try {
                            var ___unused = failCallback && failCallback({ status: 0 });
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    try {
                        this.commitPayLog('OnPayStart', config, null);
                        this.payAPICall(config, {}, function (extra) {
                            onPayWaitting();
                            log.info('payApiPay waitting');
                        }, function (extra) {
                            onPayFailed();
                            log.info('payApiPay failed', extra);
                        });
                    }
                    catch (e) {
                        onPayFailed();
                        log.error('payApiPay failed', e);
                    }
                };
                return PayFlow;
            }(PayFlow_6.APayBase.PayFlow));
            PayOutside.PayFlow = PayFlow;
        })(PayOutside = PayFlow_6.PayOutside || (PayFlow_6.PayOutside = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_7) {
        var PayOutsideGamepind;
        (function (PayOutsideGamepind) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayOutsideWithOrder";
                    return _this;
                }
                Object.defineProperty(PayFlow.prototype, "isPayCallbackValid", {
                    get: function () {
                        return false;
                    },
                    enumerable: false,
                    configurable: true
                });
                // 请求服务器创建并回发订单信息
                PayFlow.prototype.genOrder = function (config, extra, successCallback, failCallback) {
                    PayFlow_7.payNetClient.orderGenOrder({
                        payWay: config.payWay,
                        price: config.price,
                        priceCNY: config.priceCNY,
                        priceUSD: config.priceUSD,
                        quantity: config.money,
                        goodsId: config.id,
                        title: config.title,
                        districtId: extra && extra.customExtra || null,
                        itemId: this.getCoinId(config),
                        qqGoodid: config.productId,
                        token: gdk.userData.token,
                        // channelId: this._parent.channelId,
                        extra: extra,
                        others: { redirectUrl: gdk.userData.ext1, deviceId: gdk.userData.ext2 }
                    }, function (data) {
                        if (data.succeed) {
                            log.info("gamepind: 订单获取成功", data);
                            successCallback(data.data);
                        }
                        else {
                            failCallback();
                            if (gdk.pluginName === "oppo") {
                                log.info("oppo请求订单失败");
                                if (data.code && data.code == 501) {
                                    log.info("oppo 重新登录");
                                    // oppo 游客账号需要登录
                                    var res = PayFlow_7.payDeps.login();
                                }
                            }
                        }
                    }, true, function (err, retry) {
                        log.info("请求订单失败", err);
                        failCallback();
                    });
                };
                /**
                 * app内sdk支付
                 * @param config 配置信息
                 * @param successCallback 支付成功回调
                 * @param failCallback
                 */
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    log.info('开始充值', config);
                    this.enableRechargeBlock();
                    var options = config.options || {};
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    var customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}");
                    var curOrderInfo = null;
                    var onPayFailed = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.warn('支付不成功');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var onPayOk = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.info('支付成功');
                            var ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo });
                        }
                        catch (e) {
                            log.warn('购买成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    // ApiPay支付成功/校验前后有差异,则需要备份
                    var needBackUp = false;
                    var onContinueFailed = function () {
                        onPayFailed();
                    };
                    var onContinueOk = function (needSync) {
                        if (needBackUp) {
                            // pass
                            if (needSync) {
                                // 支付成功后,缺回滚的情况
                                // 已经回调过成功,不作回滚处理
                                // pass
                            }
                            else {
                                // 支付成功,服务器扣款成功
                                // 已经回调过成功,不作其他处理
                                // pass
                            }
                        }
                        else {
                            if (needSync) {
                                // 支付失败,扣款成功
                                onPayOk();
                            }
                            else {
                                // 支付失败,扣款失败
                                // 充值失败
                                onPayFailed();
                            }
                        }
                    };
                    this.genOrder(config, {
                        customExtra: customExtra,
                        customJsonExtra: customJsonExtra,
                        payWay: config.payWay,
                    }, function (orderInfo) {
                        var orderno = orderInfo.outTradeNo;
                        var time = orderInfo.time;
                        log.info('genOrder success', orderno);
                        curOrderInfo = orderInfo;
                        _this.saveOrder(orderInfo, config);
                        var checkRechargeOrder = function (orderno, extra, config) {
                            onPayOk();
                        };
                        _this.commitPayLog('OnPayStart', config, orderInfo);
                        _this.payAPICall(config, orderInfo, function (extra) {
                            log.info('payApiPay success，支付api调起成功，但是该回调结果不可信，将一律回调失败，通过补单发放奖励。', orderno);
                            checkRechargeOrder(orderno, extra, config);
                        }, function (extra) {
                            log.info('payApiPay failed', orderno);
                            onContinueFailed();
                        });
                    }, function () {
                        log.info('genOrder failed: 创建订单失败');
                        onPayFailed();
                    });
                };
                return PayFlow;
            }(PayFlow_7.APayBase.PayFlow));
            PayOutsideGamepind.PayFlow = PayFlow;
        })(PayOutsideGamepind = PayFlow_7.PayOutsideGamepind || (PayFlow_7.PayOutsideGamepind = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_8) {
        var PayOutsideWithOrder;
        (function (PayOutsideWithOrder) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 这种流程需要提前生成第三方订单号，并且只通过后台切回补单事件通知来完成充值，不存在直接payment充值成功回调
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "PayOutsideWithOrder";
                    return _this;
                }
                Object.defineProperty(PayFlow.prototype, "isPayCallbackValid", {
                    get: function () {
                        return false;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * app内sdk支付
                 * @param config 配置信息
                 * @param successCallback 支付成功回调
                 * @param failCallback
                 */
                PayFlow.prototype.payment = function (config, successCallback, failCallback) {
                    var _this = this;
                    log.info('开始充值', config);
                    this.enableRechargeBlock();
                    var options = config.options || {};
                    var customExtra = slib.defaultValue(options.customExtra, null);
                    var customJsonExtra = slib.defaultValue(options.customJsonExtra, "{}");
                    var curOrderInfo = null;
                    var onPayFailed = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.warn('支付不成功');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('支付失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var onPayOk = function () {
                        _this.disableRechargeBlock();
                        try {
                            log.info('支付成功');
                            var ___unused = successCallback && successCallback({ config: config, orderInfo: curOrderInfo });
                        }
                        catch (e) {
                            log.warn('购买成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    // ApiPay支付成功/校验前后有差异,则需要备份
                    var needBackUp = false;
                    var onContinueFailed = function () {
                        onPayFailed();
                    };
                    var onContinueOk = function (needSync) {
                        if (needBackUp) {
                            // pass
                            if (needSync) {
                                // 支付成功后,缺回滚的情况
                                // 已经回调过成功,不作回滚处理
                                // pass
                            }
                            else {
                                // 支付成功,服务器扣款成功
                                // 已经回调过成功,不作其他处理
                                // pass
                            }
                        }
                        else {
                            if (needSync) {
                                // 支付失败,扣款成功
                                onPayOk();
                            }
                            else {
                                // 支付失败,扣款失败
                                // 充值失败
                                onPayFailed();
                            }
                        }
                    };
                    this.genOrder(config, {
                        customExtra: customExtra,
                        customJsonExtra: customJsonExtra,
                        payWay: config.payWay,
                    }, function (orderInfo) {
                        var orderno = orderInfo.outTradeNo;
                        var time = orderInfo.time;
                        log.info('genOrder success', orderno);
                        curOrderInfo = orderInfo;
                        _this.saveOrder(orderInfo, config);
                        var checkRechargeOrder = function (orderno, extra, config) {
                            // 充值回调不可信，一律返回失败
                            onContinueFailed();
                            // this.checkOrderState({ orderno, extra, config }, (state) => {
                            // 	log.info('checkOrderState success, order state:', orderno, state, extra)
                            // 	log.info(`服务器校验订单状态（1成功，2失败，0未知）：${state}`)
                            // 	// 用于判定合并阶段是否成功
                            // 	let mergeOk: boolean = false
                            // 	let record: OrderInfo = { payWay: config.payWay, outTradeNo: orderno, time: time, state: state, goodsId: config.id, purchaseToken: extra.extra && extra.extra.purchaseToken || '' }
                            // 	try {
                            // 		this.mergeOrderList([record], { isMakingUpOrder: false }, (result, diffExist, needSync) => {
                            // 			log.info('mergeOrderList success', orderno)
                            // 			mergeOk = true
                            // 			onContinueOk(needSync)
                            // 			if (needSync) {
                            // 				log.info('本次充值校验前后存在要补发的差异,需要上传存档')
                            // 				this.syncStorage()
                            // 			} else {
                            // 				log.info('本次充值校验后,没有生成要补发的差异,不上传存档')
                            // 				payDeps.storage.saveToLocalStorage();//立即同步保存
                            // 			}
                            // 		}, () => {
                            // 			log.info('mergeOrderList failed', orderno)
                            // 			onContinueFailed()
                            // 		})
                            // 	} catch (e) {
                            // 		log.error('本次充值订单合并发生异常,合并结果:', mergeOk)
                            // 		log.error(e)
                            // 		onContinueFailed()
                            // 	}
                            // }, () => {
                            // 	log.info('checkOrderState failed', orderno)
                            // 	onContinueFailed()
                            // })
                        };
                        _this.commitPayLog('OnPayStart', config, orderInfo);
                        _this.payAPICall(config, orderInfo, function (extra) {
                            log.info('payApiPay success，支付api调起成功，但是该回调结果不可信，将一律回调失败，通过补单发放奖励。', orderno);
                            checkRechargeOrder(orderno, extra, config);
                        }, function (extra) {
                            log.info('payApiPay failed', orderno);
                            checkRechargeOrder(orderno, extra, config);
                        });
                    }, function () {
                        log.info('genOrder failed: 创建订单失败');
                        onPayFailed();
                    });
                };
                return PayFlow;
            }(PayFlow_8.APayBase.PayFlow));
            PayOutsideWithOrder.PayFlow = PayFlow;
        })(PayOutsideWithOrder = PayFlow_8.PayOutsideWithOrder || (PayFlow_8.PayOutsideWithOrder = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PayFlow;
    (function (PayFlow_9) {
        var YYBPayFlow;
        (function (YYBPayFlow) {
            var log = new slib.Log({ time: false, tags: ['[PayFlow]'] });
            /**
             * 类似微信、玩一玩等内购支付流程
             */
            var PayFlow = /** @class */ (function (_super) {
                __extends(PayFlow, _super);
                function PayFlow() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.payFlowName = "YYBPayFlow";
                    return _this;
                }
                PayFlow.prototype.pullDiffOrders = function (successCallback, failCallback) {
                    var _this = this;
                    log.info('YYBPayFlow: 开始校验订单历史');
                    var onMergeFailed = function () {
                        try {
                            log.warn('YYBPayFlow: 校验历史订单失败');
                            var ___unused = failCallback && failCallback();
                        }
                        catch (e) {
                            log.error('YYBPayFlow: 校验历史订单失败,失败回调内异常');
                            log.error(e);
                        }
                    };
                    var makeupResult = {
                        isDiffExist: false,
                        isMergeOk: false,
                    };
                    var onMergeSucceed = function () {
                        try {
                            var ___unused = successCallback && successCallback(makeupResult);
                        }
                        catch (e) {
                            log.warn('合并历史差异订单成功,成功回调内处理失败');
                            log.error(e);
                        }
                    };
                    if (!(this._parent && this._parent.chargeconfig)) {
                        log.error("未配置商品配表");
                        onMergeFailed();
                        return;
                    }
                    var time = this.getLastOrdersSyncTime();
                    log.info('YYBPayFlow: 订单检查点时间:', time);
                    log.info('YYBPayFlow本地订单:', this.getPrettyLocalRechargeRecords());
                    this.reqDiffOrderList({ time: time, }, function (diffList) {
                        log.info('reqDiffOrderList success', time, diffList);
                        // 过滤掉谷歌支付和ios支付等需要消耗中间物品的订单
                        diffList = diffList.filter(function (info) { return info.purchaseToken == null; });
                        // for(let info of diffList){
                        // 	info.state=OrderState.ok
                        // }
                        var mergeOk = false;
                        try {
                            _this.mergeOrderList(diffList, { isMakingUpOrder: true }, function (result, diffExist, needSync) {
                                log.info('YYBPayFlow: mergeOrderList success', diffList);
                                log.info('YYBPayFlow: 合并后本地订单:', _this.getPrettyLocalRechargeRecords());
                                mergeOk = true;
                                makeupResult.isMergeOk = mergeOk;
                                makeupResult.isDiffExist = diffExist;
                                onMergeSucceed();
                                _this.updateLastOrdersSyncTime();
                                if (needSync) {
                                    log.info('YYBPayFlow: 校验前后存在要补发的差异,需要上传存档');
                                    _this.syncStorage();
                                }
                                else {
                                    log.info('YYBPayFlow: 本次订单校验,没有生成要补发的差异订单,不上传存档');
                                    PayFlow_9.payDeps.storage.saveToLocalStorage(); //立即同步保存
                                }
                            }, function () {
                                log.info('mergeOrderList failed', diffList);
                                onMergeFailed();
                            });
                        }
                        catch (e) {
                            log.error('YYBPayFlow: 合并订单历史出现异常,合并结果:', mergeOk);
                            log.error(e);
                            if (!mergeOk) {
                                onMergeFailed();
                            }
                            else {
                                // 已经调用过 onMergeSucceed()
                            }
                        }
                    }, function () {
                        log.info('YYBPayFlow: reqDiffOrderList failed', time);
                        onMergeFailed();
                    });
                };
                // 请求订单清单
                PayFlow.prototype.reqDiffOrderList = function (_a, successCallback, failCallback) {
                    var time = _a.time;
                    log.info('YYBPayFlow: queryItemInfo');
                    gdk.queryItemInfo({ payWay: "YYBPay", productId: "xxxx" }).then(function (ret) {
                        if (ret.code == 0) {
                            PayFlow_9.payNetClient.orderReqDiffOrderList({
                                time: time,
                                gameId: gdk.gameInfo.gameId,
                                openKey: gdk.userData.openKey,
                                purchaseData: { "payType": ret.data.productId, "token": ret.data.purchaseToken, "pf": ret.data.purchaseData, "pf_key": ret.data.dataSignature },
                            }, function (data) {
                                if (data.succeed) {
                                    var recordInfos = data.data;
                                    successCallback(recordInfos);
                                }
                                else {
                                    failCallback();
                                }
                            }, false, function () {
                                failCallback();
                            });
                        }
                    });
                };
                return PayFlow;
            }(PayFlow_9.APayBase.PayFlow));
            YYBPayFlow.PayFlow = PayFlow;
        })(YYBPayFlow = PayFlow_9.YYBPayFlow || (PayFlow_9.YYBPayFlow = {}));
    })(PayFlow = GDK.PayFlow || (GDK.PayFlow = {}));
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /**
     * 指定默认GDK插件
     */
    GDK.defaultGDKName = '';
})(GDK || (GDK = {}));
window['GDK'] = GDK;
var GDK;
(function (GDK) {
    GDK.devlog = new slib.Log({ tags: ["[gdk]", "[frame]"] });
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /** 请求错误扩展参数 */
    var GDKErrorExtra = /** @class */ (function () {
        function GDKErrorExtra() {
        }
        return GDKErrorExtra;
    }());
    GDK.GDKErrorExtra = GDKErrorExtra;
    /** 请求错误结果 */
    var GDKError = /** @class */ (function (_super) {
        __extends(GDKError, _super);
        function GDKError() {
            var _this = _super.call(this, "") || this;
            _this.message = '';
            _this.name = "GDKError";
            return _this;
        }
        GDKError.prototype.toString = function () {
            return this.name + ": " + this.errCode + " " + this.message + " " + this.reason;
        };
        return GDKError;
    }(Error));
    GDK.GDKError = GDKError;
    /** 请求结果模板生成器 */
    var ResultTemplatesExtractor = /** @class */ (function () {
        function ResultTemplatesExtractor(temps) {
            this._temps = [];
            this._temps = temps;
        }
        Object.defineProperty(ResultTemplatesExtractor.prototype, "temps", {
            get: function () { return this._temps; },
            enumerable: false,
            configurable: true
        });
        /**
         * 根据错误码和扩展参数构造请求结果
         */
        ResultTemplatesExtractor.prototype.make = function (errCode, extra) {
            var err = new GDKError();
            // 待优化
            var item = this._temps.find(function (item) { return item.errCode == errCode; });
            err.errCode = extra && extra.errCode !== undefined ? extra.errCode : item.errCode;
            err.message = extra && extra.message !== undefined ? extra.message : item.message;
            err.reason = extra && extra.reason !== undefined ? extra.reason : item.reason;
            err.data = extra && extra.data !== undefined ? extra.data : item.data;
            return err;
        };
        return ResultTemplatesExtractor;
    }());
    GDK.ResultTemplatesExtractor = ResultTemplatesExtractor;
})(GDK || (GDK = {}));
/// <reference path="ErrorMap.ts" />
var GDK;
(function (GDK) {
    /** 基本请求错误码 */
    GDK.GDKErrorCode = {
        // /** -----------Normal Error----------- */
        /** 请求成功 */
        SUCCESS: 0,
        /** 未知错误 */
        UNKNOWN: 100,
        /** 请求超时 */
        TIMEOUT: 101,
        /** 网络错误 */
        NETWORK_ERROR: 102,
        /** api不可用 */
        API_INVALID: 203,
        // /** -----------GameHttpClient Error----------- */
        /** 无效的OPENID */
        INVALID_OPENID: 2001,
        // /** -----------API Error----------- */
        /** API 登录 */
        API_LOGIN_SUCCESS: 30001,
        /** API 失败 */
        API_LOGIN_FAILED: 30002,
        // /** API 支付 */
        /** API 支付成功 */
        API_PAY_SUCCESS: 30011,
        /** API 支付失败 */
        API_PAY_FAILED: 30012,
        /** API 取消支付 */
        API_PAY_CANCEL: 30013,
        API_PAY_QUERYITEMINFO_FAILED: 30021,
        // /** API 更新用户数据 */
        /** API 更新用户数据失败 */
        API_UPDATE_USERDATA_FAILED: 30102,
        // /** 排行数据 */
        /** 获取好友排行数据失败 */
        API_GET_FRIEND_CLOUD_STORAGE_FAILED: 30112,
        /** 上传用户数据失败 */
        API_SET_USER_CLOUD_STORAGE_FAILED: 30113,
        /** 打开客服反馈界面失败 */
        API_OPEN_FEEDBACK_FAILED: 30122,
        /** 显示 loading 失败 */
        API_SHOW_LOADING_FAILED: 30131,
        /** 隐藏 loading 失败 */
        API_HIDE_LOADING_FAILED: 30132,
        /** 显示 toast 失败 */
        API_SHOW_TOAST_FAILED: 3013,
        /** 隐藏 toast 失败 */
        API_HIDE_TOAST_FAILED: 30134,
        /** 显示 model 失败 */
        API_SHOW_MODAL_FAILED: 30135,
        /** 隐藏 键盘 失败 */
        API_HIDE_KEYBOARD_FAILED: 30141,
        /** 登录态过期 */
        API_LOGIN_SESSION_OUTDATE: 30151,
        /** 更新登录态失败 */
        API_UPDATE_LOGIN_SESSION_FAILED: 30152,
        /** 跳转小程序失败 */
        API_CALL_UP_MINI_PROGRAM_FAILED: 30161,
        /** 跳转原生app失败 */
        API_CALL_UP_NATIVE_APP_FAILED: 30161,
        /**
         * 分享不被支持
         */
        API_SHARE_UNSUPPORTED: 30201,
        /**
         * 不支持的平台
         */
        API_SHARE_UNSUPPORTED_PLATFORM: 30202,
        /**
         * 请求打开并播放广告超时
         */
        API_SHOW_ADVERT_TIMEOUT: 30304,
    };
    /**
     * 请求结果模板，用于生成错误结果
     **/
    GDK.GDKResultTemplates = new GDK.ResultTemplatesExtractor([
        { errCode: GDK.GDKErrorCode.SUCCESS, message: '请求成功', reason: '请求成功', data: null },
        { errCode: GDK.GDKErrorCode.UNKNOWN, message: '请求失败', reason: '未知错误' },
        { errCode: GDK.GDKErrorCode.TIMEOUT, message: '请求超时', reason: '请求超时' },
        { errCode: GDK.GDKErrorCode.NETWORK_ERROR, message: '网络错误', reason: '网络错误' },
        { errCode: GDK.GDKErrorCode.API_INVALID, message: 'api不可用', reason: 'api不可用' },
        { errCode: GDK.GDKErrorCode.INVALID_OPENID, message: '登录失败', reason: 'openId验证失败' },
        { errCode: GDK.GDKErrorCode.API_LOGIN_SUCCESS, message: 'Api登录成功', reason: 'Api登录成功' },
        { errCode: GDK.GDKErrorCode.API_LOGIN_FAILED, message: 'Api登录失败', reason: 'Api登录失败' },
        { errCode: GDK.GDKErrorCode.API_PAY_SUCCESS, message: 'Api支付失败', reason: 'Api支付失败' },
        { errCode: GDK.GDKErrorCode.API_PAY_FAILED, message: 'Api支付失败', reason: 'Api支付失败' },
        { errCode: GDK.GDKErrorCode.API_PAY_CANCEL, message: 'Api支付取消', reason: 'Api支付取消' },
        { errCode: GDK.GDKErrorCode.API_UPDATE_USERDATA_FAILED, message: 'Api更新用户数据失败', reason: 'Api更新用户数据失败' },
        { errCode: GDK.GDKErrorCode.API_GET_FRIEND_CLOUD_STORAGE_FAILED, message: '获取好友排行数据失败' },
        { errCode: GDK.GDKErrorCode.API_SET_USER_CLOUD_STORAGE_FAILED, message: '上传用户数据失败' },
        { errCode: GDK.GDKErrorCode.API_SHOW_LOADING_FAILED, message: '显示 loading 失败' },
        { errCode: GDK.GDKErrorCode.API_HIDE_LOADING_FAILED, message: '隐藏 loading 失败' },
        { errCode: GDK.GDKErrorCode.API_SHOW_TOAST_FAILED, message: '显示 toast 失败' },
        { errCode: GDK.GDKErrorCode.API_HIDE_TOAST_FAILED, message: '隐藏 toast 失败' },
        { errCode: GDK.GDKErrorCode.API_SHOW_MODAL_FAILED, message: '显示 modal 失败' },
        { errCode: GDK.GDKErrorCode.API_HIDE_KEYBOARD_FAILED, message: '登录态过期' },
        { errCode: GDK.GDKErrorCode.API_LOGIN_SESSION_OUTDATE, message: '登录态过期' },
        { errCode: GDK.GDKErrorCode.API_UPDATE_LOGIN_SESSION_FAILED, message: '更新登录态失败' },
        { errCode: GDK.GDKErrorCode.API_CALL_UP_MINI_PROGRAM_FAILED, message: '跳转小程序失败' },
        { errCode: GDK.GDKErrorCode.API_CALL_UP_NATIVE_APP_FAILED, message: '跳转原生app失败' },
        { errCode: GDK.GDKErrorCode.API_SHARE_UNSUPPORTED, message: '分享不被支持' },
        { errCode: GDK.GDKErrorCode.API_SHARE_UNSUPPORTED_PLATFORM, message: '不支持的平台' },
        { errCode: GDK.GDKErrorCode.API_SHOW_ADVERT_TIMEOUT, message: '打开并播放广告超时' },
    ]);
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var GDKManager = /** @class */ (function () {
        function GDKManager() {
            this._configMap = {};
            this._pluginMap = {};
        }
        /**
         * 注册GDK插件配置
         * @param name 插件名
         * @param config 插件配置
         */
        GDKManager.prototype.registPluginConfig = function (name, config) {
            slib.assert(!this._configMap[name], "config name " + name + " exists already!");
            this._configMap[name] = config;
            GDK.defaultGDKName = name;
        };
        /**
         * 通过配置模板生成插件
         */
        GDKManager.prototype.genGdk = function (temp) {
            var map = {};
            var addonList = [];
            for (var k in temp) {
                // let pname = k[0].toLocaleLowerCase() + k.substr(1);
                var headLen = 0;
                for (var _i = 0, k_1 = k; _i < k_1.length; _i++) {
                    var c = k_1[_i];
                    if (c.toLocaleLowerCase() == c) {
                        break;
                    }
                    headLen++;
                }
                var pname = k;
                if (headLen == 1) {
                    pname = k[0].toLocaleLowerCase() + k.substr(1);
                }
                else {
                    pname = k.substring(0, headLen - 1).toLocaleLowerCase() + k.substring(headLen - 1);
                }
                map[pname] = new temp[k]();
                addonList.push(map[pname]);
            }
            var api = new GDK.UserAPI(map);
            for (var _a = 0, addonList_1 = addonList; _a < addonList_1.length; _a++) {
                var addon = addonList_1[_a];
                addon.api = api;
            }
            return api;
        };
        /**
         * 设置默认插件
         */
        GDKManager.prototype.setDefaultGdk = function (name) {
            var api = this._pluginMap[name];
            slib.assert(!!api, "invalid api instance [" + name + "]");
            if (gdk instanceof GDK.UserAPI) {
                slib.assert(!gdk, '-[GDK] default gdk instance shall not be set twice');
            }
            gdk = api;
            window["gdk"] = api;
        };
        GDKManager.prototype.getPlugin = function (name) {
            return slib.assert(this._pluginMap[name], "plugin [" + name + "] not exist");
        };
        /**
         * 传入配置并初始化
         */
        GDKManager.prototype.init = function (info) {
            for (var k in this._pluginMap) {
                var plugin = this.getPlugin(k);
                // 初始化插件内各个模块
                plugin['_init'](info);
            }
        };
        /**
         * 传入配置并初始化
         */
        GDKManager.prototype.initWithGDKConfig = function (info) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, plugin;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [];
                            for (_b in this._pluginMap)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            k = _a[_i];
                            plugin = this.getPlugin(k);
                            // 初始化插件内各个模块
                            return [4 /*yield*/, plugin['_initWithConfig'](info)];
                        case 2:
                            // 初始化插件内各个模块
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 创建插件对象，并注册
         */
        GDKManager.prototype.instantiateGDKInstance = function () {
            for (var k in this._configMap) {
                var plugin = this.genGdk(new this._configMap[k].register);
                this._pluginMap[k] = plugin;
            }
        };
        return GDKManager;
    }());
    GDK.GDKManager = GDKManager;
    GDK.gdkManager = new GDKManager();
    /**
     * 初始入口
     */
    var FakeUserApi = /** @class */ (function () {
        function FakeUserApi() {
        }
        FakeUserApi.prototype.init = function () {
            GDK.gdkManager.instantiateGDKInstance();
            GDK.gdkManager.setDefaultGdk(GDK.defaultGDKName);
            return this;
        };
        Object.defineProperty(FakeUserApi.prototype, "pluginName", {
            get: function () {
                return GDK.defaultGDKName;
            },
            enumerable: false,
            configurable: true
        });
        FakeUserApi.prototype.initConfig = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, GDK.gdkManager.initWithGDKConfig(config)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return FakeUserApi;
    }());
    window['gdk'] = new FakeUserApi();
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var ModuleClassMap = /** @class */ (function () {
        function ModuleClassMap() {
            this.APISystem = GDK.APISystemBase;
            this.Hardware = GDK.HardwareBase;
            this.Log = GDK.LogBase;
        }
        return ModuleClassMap;
    }());
    GDK.ModuleClassMap = ModuleClassMap;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var PackConfig = /** @class */ (function () {
        function PackConfig() {
        }
        return PackConfig;
    }());
    GDK.PackConfig = PackConfig;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var devlog = new slib.Log({ tags: ["DEVELOP"] });
    // 自动生成，成员使用register函数注册
    var UserAPI = /** @class */ (function () {
        function UserAPI(moduleMap) {
            this._m = moduleMap;
        }
        UserAPI.prototype.initConfig = function (config) {
            devlog.warn("redundant init for gdk, ignored");
        };
        /**
         * 初始化插件内各个模块
         * @param info 外部传入的配置
         */
        UserAPI.prototype._init = function (info) {
            for (var key in this._m) {
                // 初始化广告等具体模块
                var addon = this._m[key];
                if (addon.init) {
                    addon.init();
                }
            }
        };
        /**
         * 初始化插件内各个模块
         * @param info 外部传入的配置
         */
        UserAPI.prototype._initWithConfig = function (info) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, key, addon;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [];
                            for (_b in this._m)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            key = _a[_i];
                            addon = this._m[key];
                            if (!addon.initWithConfig) return [3 /*break*/, 3];
                            return [4 /*yield*/, addon.initWithConfig(info)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UserAPI.prototype.checkModuleAttr = function (moduleName, attrName, attrType) {
            if (attrType === void 0) { attrType = undefined; }
            slib.assert(this._m, "api not init");
            if (typeof this._m[moduleName] != "object") {
                devlog.warn("module unsupport: [gdk::" + moduleName + "]");
                return false;
            }
            if (attrType) {
                var attr = this._m[moduleName][attrName];
                if (!attr) {
                    devlog.warn("func unsupport: [gdk::" + moduleName + "." + attrName + "]");
                    return false;
                }
                if (typeof attr != attrType) {
                    devlog.warn("invalid type<" + attrType + ">: [gdk::" + moduleName + "." + attrName + "]");
                    return false;
                }
            }
            return true;
        };
        UserAPI.prototype.createNonePromise = function (tip) {
            if (tip === void 0) { tip = ""; }
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject("something unsupport " + tip + " to call");
                });
            });
        };
        UserAPI.prototype.support = function (moduleName, attrName, attrType) {
            if (attrType === void 0) { attrType = undefined; }
            return this.checkModuleAttr(moduleName, attrName, attrType);
        };
        Object.defineProperty(UserAPI.prototype, "userData", {
            get: function () {
                return this._m.userData;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameInfo", {
            get: function () {
                return this._m.gameInfo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "systemInfo", {
            get: function () {
                return this._m.systemInfo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "apiSystem", {
            get: function () {
                return this._m.apiSystem;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "advertV2", {
            get: function () {
                return this._m.advertV2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gdkjsb", {
            get: function () {
                return this._m.gdkjsb;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "openId", {
            /** 批量导出接口 */
            // $batch_export() begin
            get: function () {
                if (!this.checkModuleAttr("userData", "openId")) {
                    return undefined;
                }
                return this._m.userData.openId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "openKey", {
            get: function () {
                if (!this.checkModuleAttr("userData", "openKey")) {
                    return undefined;
                }
                return this._m.userData.openKey;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "password", {
            /** 密码 */
            get: function () {
                if (!this.checkModuleAttr("userData", "password")) {
                    return undefined;
                }
                return this._m.userData.password;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "nickName", {
            /** 昵称 */
            get: function () {
                if (!this.checkModuleAttr("userData", "nickName")) {
                    return undefined;
                }
                return this._m.userData.nickName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "userId", {
            /** 用户ID */
            get: function () {
                if (!this.checkModuleAttr("userData", "userId")) {
                    return undefined;
                }
                return this._m.userData.userId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isNewUser", {
            /** 是否新用户 */
            get: function () {
                if (!this.checkModuleAttr("userData", "isNewUser")) {
                    return undefined;
                }
                return this._m.userData.isNewUser;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "avatarUrl", {
            /** 用户头像 */
            get: function () {
                if (!this.checkModuleAttr("userData", "avatarUrl")) {
                    return undefined;
                }
                return this._m.userData.avatarUrl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "backupTime", {
            /** 上传存档时间(秒) */
            get: function () {
                if (!this.checkModuleAttr("userData", "backupTime")) {
                    return undefined;
                }
                return this._m.userData.backupTime;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "followGzh", {
            /** 是否已关注公众号
             * - 0 未关注
             * - 1 已关注
             **/
            get: function () {
                if (!this.checkModuleAttr("userData", "followGzh")) {
                    return undefined;
                }
                return this._m.userData.followGzh;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "channelId", {
            /** 渠道id */
            get: function () {
                if (!this.checkModuleAttr("userData", "channelId")) {
                    return undefined;
                }
                return this._m.userData.channelId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "createTime", {
            /** 创建时间 */
            get: function () {
                if (!this.checkModuleAttr("userData", "createTime")) {
                    return undefined;
                }
                return this._m.userData.createTime;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "sex", {
            /**
             * 性别
             * - 0 未知
             * - 1 男
             * - 2 女
             **/
            get: function () {
                if (!this.checkModuleAttr("userData", "sex")) {
                    return undefined;
                }
                return this._m.userData.sex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isWhiteUser", {
            /**
             * 是否为该游戏管理账号用户
             * - 1 是
             * - 0 否
             **/
            get: function () {
                if (!this.checkModuleAttr("userData", "isWhiteUser")) {
                    return undefined;
                }
                return this._m.userData.isWhiteUser;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isMaster", {
            /**
             * 是否房主，1房主，0参加者
             **/
            get: function () {
                if (!this.checkModuleAttr("userData", "isMaster")) {
                    return undefined;
                }
                return this._m.userData.isMaster;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "roomId", {
            /**
             * 房间号
             **/
            get: function () {
                if (!this.checkModuleAttr("userData", "roomId")) {
                    return undefined;
                }
                return this._m.userData.roomId;
            },
            enumerable: false,
            configurable: true
        });
        /** 登录 */
        UserAPI.prototype.login = function (params) {
            if (!this.checkModuleAttr("user", "login", "function")) {
                return this.createNonePromise("[user.login]");
            }
            return this._m.user.login(params);
        };
        /** 绑定回调 */
        UserAPI.prototype.setBindCallback = function (callback) {
            if (!this.checkModuleAttr("user", "setBindCallback", "function")) {
                return undefined;
            }
            return this._m.user.setBindCallback(callback);
        };
        /** 绑定回调 */
        UserAPI.prototype.setRebootCallback = function (callback) {
            if (!this.checkModuleAttr("user", "setRebootCallback", "function")) {
                return undefined;
            }
            return this._m.user.setRebootCallback(callback);
        };
        /**
         * 显示用户中心
         * * APP平台支持
         */
        UserAPI.prototype.showUserCenter = function () {
            if (!this.checkModuleAttr("user", "showUserCenter", "function")) {
                return this.createNonePromise("[user.showUserCenter]");
            }
            return this._m.user.showUserCenter();
        };
        /**
         * 判断是否为本地实名制系统
         */
        UserAPI.prototype.isNativeRealNameSystem = function () {
            if (!this.checkModuleAttr("user", "isNativeRealNameSystem", "function")) {
                return undefined;
            }
            return this._m.user.isNativeRealNameSystem();
        };
        /**
         * 显示未成年人游戏描述信息
         * * APP平台支持
         */
        UserAPI.prototype.showMinorInfo = function (info) {
            if (!this.checkModuleAttr("user", "showMinorInfo", "function")) {
                return this.createNonePromise("[user.showMinorInfo]");
            }
            return this._m.user.showMinorInfo(info);
        };
        /**
         * 显示实名制弹框，进入实名制流程
         * * APP平台支持
         * @param force 是否强制
         */
        UserAPI.prototype.showRealNameDialog = function (userID, force) {
            if (!this.checkModuleAttr("user", "showRealNameDialog", "function")) {
                return this.createNonePromise("[user.showRealNameDialog]");
            }
            return this._m.user.showRealNameDialog(userID, force);
        };
        /**
         * 显示账号绑定
         * * APP平台支持
         */
        UserAPI.prototype.showBindDialog = function () {
            if (!this.checkModuleAttr("user", "showBindDialog", "function")) {
                return this.createNonePromise("[user.showBindDialog]");
            }
            return this._m.user.showBindDialog();
        };
        UserAPI.prototype.bindUser = function () {
            if (!this.checkModuleAttr("user", "bindUser", "function")) {
                return this.createNonePromise("[user.bindUser]");
            }
            return this._m.user.bindUser();
        };
        /** 检查登录态是否过期 */
        UserAPI.prototype.checkSession = function (params) {
            if (!this.checkModuleAttr("user", "checkSession", "function")) {
                return this.createNonePromise("[user.checkSession]");
            }
            return this._m.user.checkSession(params);
        };
        /** 更新用户数据 */
        UserAPI.prototype.updateUser = function () {
            if (!this.checkModuleAttr("user", "update", "function")) {
                return this.createNonePromise("[user.update]");
            }
            return this._m.user.update();
        };
        /**
         * 获取用户云端数据
         * - oppo未处理
         */
        UserAPI.prototype.getFriendCloudStorage = function (obj) {
            if (!this.checkModuleAttr("user", "getFriendCloudStorage", "function")) {
                return this.createNonePromise("[user.getFriendCloudStorage]");
            }
            return this._m.user.getFriendCloudStorage(obj);
        };
        /**
         * 提交用户云端数据
         * - oppo未处理
         */
        UserAPI.prototype.setUserCloudStorage = function (obj) {
            if (!this.checkModuleAttr("user", "setUserCloudStorage", "function")) {
                return this.createNonePromise("[user.setUserCloudStorage]");
            }
            return this._m.user.setUserCloudStorage(obj);
        };
        /**
         * 判断userId对应的用户是否绑定过社交账号
         * @param userId 登录时服务器返回的userId
         */
        UserAPI.prototype.checkIsUserBind = function (userId) {
            if (!this.checkModuleAttr("user", "checkIsUserBind", "function")) {
                return undefined;
            }
            return this._m.user.checkIsUserBind(userId);
        };
        // }
        UserAPI.prototype.setLoginSupport = function (loginSupport) {
            if (!this.checkModuleAttr("user", "setLoginSupport", "function")) {
                return undefined;
            }
            return this._m.user.setLoginSupport(loginSupport);
        };
        UserAPI.prototype.setAccountChangeListener = function (f) {
            if (!this.checkModuleAttr("user", "setAccountChangeListener", "function")) {
                return undefined;
            }
            return this._m.user.setAccountChangeListener(f);
        };
        Object.defineProperty(UserAPI.prototype, "mode", {
            /**
             * 游戏的启动模式，可以是：
             * - 开发
             * - 测试
             * - 发布
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "mode")) {
                    return undefined;
                }
                return this._m.gameInfo.mode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "appId", {
            /**
             * 程序appid
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "appId")) {
                    return undefined;
                }
                return this._m.gameInfo.appId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameChannelId", {
            /**
             * 游戏启动的渠道id
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "gameChannelId")) {
                    return undefined;
                }
                return this._m.gameInfo.gameChannelId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isPayInSandbox", {
            /** 沙盒模式支付 */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "isPayInSandbox")) {
                    return undefined;
                }
                return this._m.gameInfo.isPayInSandbox;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "payAppEnvVersion", {
            /** 跳转支付app模式 */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "payAppEnvVersion")) {
                    return undefined;
                }
                return this._m.gameInfo.payAppEnvVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "offerId", {
            /** 支付侧应用id */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "offerId")) {
                    return undefined;
                }
                return this._m.gameInfo.offerId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "miniAppOfferId", {
            /**
             * 跳转小程序支付offerid
             * - 填对方小程序appid
             **/
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "miniAppOfferId")) {
                    return undefined;
                }
                return this._m.gameInfo.miniAppOfferId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "shareProxyUrl", {
            /**
             * 分享结果检测的代理网址
             * * 仅微信使用
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "shareProxyUrl")) {
                    return undefined;
                }
                return this._m.gameInfo.shareProxyUrl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "launchOptions", {
            /** 小游戏启动时的参数。 */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "launchOptions")) {
                    return undefined;
                }
                return this._m.gameInfo.launchOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameVersion", {
            /**
             * 游戏版本号
             **/
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "gameVersion")) {
                    return undefined;
                }
                return this._m.gameInfo.gameVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameId", {
            /**
             * 游戏id
             **/
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "gameId")) {
                    return undefined;
                }
                return this._m.gameInfo.gameId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameType", {
            /**
             * 游戏类型(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
             **/
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "gameType")) {
                    return undefined;
                }
                return this._m.gameInfo.gameType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireCustomServicePay", {
            /**
             * 优先只启用客服跳转支付
             * - 支持ios和安卓
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "requireCustomServicePay")) {
                    return undefined;
                }
                return this._m.gameInfo.requireCustomServicePay;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireMiniAppPay", {
            /**
             * 优先只启用小程序跳转支付
             * 只支持安卓
             */
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "requireMiniAppPay")) {
                    return undefined;
                }
                return this._m.gameInfo.requireMiniAppPay;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireIndiaSPSPay", {
            get: function () {
                if (!this.checkModuleAttr("gameInfo", "requireIndiaSPSPay")) {
                    return undefined;
                }
                return this._m.gameInfo.requireIndiaSPSPay;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "brand", {
            /**
             * 手机品牌
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "brand")) {
                    return undefined;
                }
                return this._m.systemInfo.brand;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "model", {
            /**
             * - 手机型号
             * - 具体机型(微信、手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "model")) {
                    return undefined;
                }
                return this._m.systemInfo.model;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "pixelRatio", {
            /**
             * 设备像素比
             * - -1 代表未知
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "pixelRatio")) {
                    return undefined;
                }
                return this._m.systemInfo.pixelRatio;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gdkVersion", {
            /**
             * gdk的版本号
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "gdkVersion")) {
                    return undefined;
                }
                return this._m.systemInfo.gdkVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "screenWidth", {
            /**
             * 屏幕宽度
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "screenWidth")) {
                    return undefined;
                }
                return this._m.systemInfo.screenWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "screenHeight", {
            /**
             * 屏幕高度
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "screenHeight")) {
                    return undefined;
                }
                return this._m.systemInfo.screenHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "windowWidth", {
            /**
             * 可使用窗口宽度
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "windowWidth")) {
                    return undefined;
                }
                return this._m.systemInfo.windowWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "windowHeight", {
            /**
             * 可使用窗口高度
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "windowHeight")) {
                    return undefined;
                }
                return this._m.systemInfo.windowHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "statusBarHeight", {
            /**
             * 状态栏的高度
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "statusBarHeight")) {
                    return undefined;
                }
                return this._m.systemInfo.statusBarHeight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "language", {
            /**
             * 平台（微信、QQ等）设置的语言
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "language")) {
                    return undefined;
                }
                return this._m.systemInfo.language;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "version", {
            /**
             * 版本号
             * * 微信版本号
             * * 安卓版本号
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "version")) {
                    return undefined;
                }
                return this._m.systemInfo.version;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "system", {
            /**
             * 操作系统版本，形如 "Android 5.0"
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "system")) {
                    return undefined;
                }
                return this._m.systemInfo.system;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "platform", {
            /**
             * 客户端平台
             * - "android" | "ios" | "devtools" | ...
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "platform")) {
                    return undefined;
                }
                return this._m.systemInfo.platform;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "fontSizeSetting", {
            /**
             * 用户字体大小设置。以“我 - 设置 - 通用 - 字体大小”中的设置为准，单位 px。
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "fontSizeSetting")) {
                    return undefined;
                }
                return this._m.systemInfo.fontSizeSetting;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "SDKVersion", {
            /**
             * - wx 客户端基础库版本
             * - app nativeVersion
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "SDKVersion")) {
                    return undefined;
                }
                return this._m.systemInfo.SDKVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "SDKVersionList", {
            /**
             * - 客户端的SDK版本列表
             * - eg : [{name : "bus", "version" : "1.0.0"}, {...}]
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "SDKVersionList")) {
                    return undefined;
                }
                return this._m.systemInfo.SDKVersionList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "benchmarkLevel", {
            /**
             * (仅Android小游戏) 性能等级
             * - -2 或 0：该设备无法运行小游戏
             * - -1：性能未知
             * - `>=` 1 设备性能值
             * - 该值越高，设备性能越好(目前设备最高不到50)
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "benchmarkLevel")) {
                    return undefined;
                }
                return this._m.systemInfo.benchmarkLevel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "networkType", {
            /**
             * 网络类型
             * - `wifi`	wifi 网络
             * - `2g`	2g 网络
             * - `3g`	3g 网络
             * - `4g`	4g 网络
             * - `unknown`	Android 下不常见的网络类型
             * - `none`	无网络
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "networkType")) {
                    return undefined;
                }
                return this._m.systemInfo.networkType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "networkClass", {
            /**
             * 网络类型 1 电信 ，2 联通 ，3 移动
             * - 0: wifi或未知
             * -1 无网络
             * -2 2G/3G/4G/nG 网络
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "networkClass")) {
                    return undefined;
                }
                return this._m.systemInfo.networkClass;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isFirstInstall", {
            /**
             * 是否首次安装
             * - 1为首次安装
             * - 0非首次安装
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "isFirstInstall")) {
                    return undefined;
                }
                return this._m.systemInfo.isFirstInstall;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "devPlatform", {
            /**
             * 仅在开发环境下可以，手q环境下无该字段
             **/
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "devPlatform")) {
                    return undefined;
                }
                return this._m.systemInfo.devPlatform;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "deviceId", {
            /**
             * 设备ID
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "deviceId")) {
                    return undefined;
                }
                return this._m.systemInfo.deviceId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "uuid", {
            /**
             * 设备ID
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "uuid")) {
                    return undefined;
                }
                return this._m.systemInfo.uuid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gameDeviceId", {
            /**
             * 游戏设备ID，每次重新安装游戏都会改变
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "gameDeviceId")) {
                    return undefined;
                }
                return this._m.systemInfo.gameDeviceId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "versionCode", {
            /**
             * 版本号
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "versionCode")) {
                    return undefined;
                }
                return this._m.systemInfo.versionCode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "versionName", {
            /**
             * 版本名称
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "versionName")) {
                    return undefined;
                }
                return this._m.systemInfo.versionName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "channel", {
            /**
             * 渠道ID
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "channel")) {
                    return undefined;
                }
                return this._m.systemInfo.channel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "quickChannelId", {
            /**
             * quick渠道ID
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "quickChannelId")) {
                    return undefined;
                }
                return this._m.systemInfo.quickChannelId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "country", {
            /**
             * 地区国家
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "country")) {
                    return undefined;
                }
                return this._m.systemInfo.country;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "installTime", {
            /**
             * 安装时间
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "installTime")) {
                    return undefined;
                }
                return this._m.systemInfo.installTime;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "imei", {
            /**
             * imei
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "imei")) {
                    return undefined;
                }
                return this._m.systemInfo.imei;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "packageName", {
            /**
             * 包名
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "packageName")) {
                    return undefined;
                }
                return this._m.systemInfo.packageName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "packageTag", {
            /**
             * 发行渠道
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "packageTag")) {
                    return undefined;
                }
                return this._m.systemInfo.packageTag;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "debugAccountServer", {
            /**
             * 测试用 account server
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "debugAccountServer")) {
                    return undefined;
                }
                return this._m.systemInfo.debugAccountServer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isCustomBackendCfg", {
            /**
             * 是否支持按packageTag 定制后端参数
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "isCustomBackendCfg")) {
                    return undefined;
                }
                return this._m.systemInfo.isCustomBackendCfg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "androidId", {
            /**
             * android id
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "androidId")) {
                    return undefined;
                }
                return this._m.systemInfo.androidId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "mac", {
            /**
             * mac address
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "mac")) {
                    return undefined;
                }
                return this._m.systemInfo.mac;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "userAgent", {
            /**
             * http user Agent
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "userAgent")) {
                    return undefined;
                }
                return this._m.systemInfo.userAgent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "tableConf", {
            /**
             * 服务器表格配置信息
             */
            get: function () {
                if (!this.checkModuleAttr("systemInfo", "tableConf")) {
                    return undefined;
                }
                return this._m.systemInfo.tableConf;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 刷新网络状况信息
         */
        UserAPI.prototype.fetchNetworkInfo = function () {
            if (!this.checkModuleAttr("systemInfo", "fetchNetworkInfo", "function")) {
                return this.createNonePromise("[systemInfo.fetchNetworkInfo]");
            }
            return this._m.systemInfo.fetchNetworkInfo();
        };
        UserAPI.prototype.clone = function () {
            if (!this.checkModuleAttr("systemInfo", "clone", "function")) {
                return undefined;
            }
            return this._m.systemInfo.clone();
        };
        /**
         * 跳转游戏
         */
        UserAPI.prototype.navigateToApp = function (params) {
            if (!this.checkModuleAttr("apiSystem", "navigateToApp", "function")) {
                return this.createNonePromise("[apiSystem.navigateToApp]");
            }
            return this._m.apiSystem.navigateToApp(params);
        };
        /**
         * 退出当前游戏
         */
        UserAPI.prototype.exitProgram = function () {
            if (!this.checkModuleAttr("apiSystem", "exitProgram", "function")) {
                return this.createNonePromise("[apiSystem.exitProgram]");
            }
            return this._m.apiSystem.exitProgram();
        };
        /**
         * 用法示例：
         * ```typescript
         * onShow((data)=>{
         * 	...
         * })
         * ```
         */
        UserAPI.prototype.onShow = function (callback) {
            if (!this.checkModuleAttr("apiSystem", "onShow", "function")) {
                return undefined;
            }
            return this._m.apiSystem.onShow(callback);
        };
        UserAPI.prototype.offShow = function (callback) {
            if (!this.checkModuleAttr("apiSystem", "offShow", "function")) {
                return undefined;
            }
            return this._m.apiSystem.offShow(callback);
        };
        /**
         * 用法示例：
         * ```typescript
         * onHide(()=>{
         * 	...
         * })
         * ```
         */
        UserAPI.prototype.onHide = function (callback) {
            if (!this.checkModuleAttr("apiSystem", "onHide", "function")) {
                return undefined;
            }
            return this._m.apiSystem.onHide(callback);
        };
        UserAPI.prototype.offHide = function (callback) {
            if (!this.checkModuleAttr("apiSystem", "offHide", "function")) {
                return undefined;
            }
            return this._m.apiSystem.offHide(callback);
        };
        /**
         * 强制更新
         */
        UserAPI.prototype.updateProgramForce = function () {
            if (!this.checkModuleAttr("apiSystem", "updateProgramForce", "function")) {
                return this.createNonePromise("[apiSystem.updateProgramForce]");
            }
            return this._m.apiSystem.updateProgramForce();
        };
        /**
         * 设置是否打开调试开关。此开关对正式版也能生效。
         */
        UserAPI.prototype.setEnableDebug = function (res) {
            if (!this.checkModuleAttr("apiSystem", "setEnableDebug", "function")) {
                return this.createNonePromise("[apiSystem.setEnableDebug]");
            }
            return this._m.apiSystem.setEnableDebug(res);
        };
        /**
         * - 设置帧率
         * 	- 可能和cocos的会冲突
         */
        UserAPI.prototype.setFPS = function (fps) {
            if (!this.checkModuleAttr("apiSystem", "setFPS", "function")) {
                return undefined;
            }
            return this._m.apiSystem.setFPS(fps);
        };
        Object.defineProperty(UserAPI.prototype, "clipboard", {
            /**
             * 剪切板
             */
            get: function () {
                if (!this.checkModuleAttr("apiSystem", "clipboard")) {
                    return undefined;
                }
                return this._m.apiSystem.clipboard;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 获取屏幕的安全区域，单位像素
         * @param callback
         */
        UserAPI.prototype.getSafeArea = function (callback) {
            if (!this.checkModuleAttr("apiSystem", "getSafeArea", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getSafeArea(callback);
        };
        // 设置加载进度
        UserAPI.prototype.setLoadingProgress = function (params) {
            if (!this.checkModuleAttr("apiSystem", "setLoadingProgress", "function")) {
                return undefined;
            }
            return this._m.apiSystem.setLoadingProgress(params);
        };
        /**
         * 网页跳转
         * @param url
         */
        UserAPI.prototype.openURL = function (url) {
            if (!this.checkModuleAttr("apiSystem", "openURL", "function")) {
                return undefined;
            }
            return this._m.apiSystem.openURL(url);
        };
        /**
         * 开启云客服
         */
        UserAPI.prototype.startYunkefu = function (accessId, name, id, customField, native) {
            if (!this.checkModuleAttr("apiSystem", "startYunkefu", "function")) {
                return undefined;
            }
            return this._m.apiSystem.startYunkefu(accessId, name, id, customField, native);
        };
        /**
         *
         * 是否存在原生客服中心
         */
        UserAPI.prototype.hasNativeAssistantCenter = function () {
            if (!this.checkModuleAttr("apiSystem", "hasNativeAssistantCenter", "function")) {
                return undefined;
            }
            return this._m.apiSystem.hasNativeAssistantCenter();
        };
        /**
         * hack web
         * @param url
         */
        UserAPI.prototype.showHackWeb = function (url, duration) {
            if (!this.checkModuleAttr("apiSystem", "showHackWeb", "function")) {
                return undefined;
            }
            return this._m.apiSystem.showHackWeb(url, duration);
        };
        /**
         * set native sdk language
         * @param lang
         */
        UserAPI.prototype.setSDKLanguage = function (lang) {
            if (!this.checkModuleAttr("apiSystem", "setSDKLanguage", "function")) {
                return undefined;
            }
            return this._m.apiSystem.setSDKLanguage(lang);
        };
        Object.defineProperty(UserAPI.prototype, "nativeVersion", {
            /**
             * 原生版本号，具体看C++
             */
            get: function () {
                if (!this.checkModuleAttr("apiSystem", "nativeVersion")) {
                    return undefined;
                }
                return this._m.apiSystem.nativeVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "sdkFrameworkVersion", {
            /**
             * SDK框架版本
             */
            get: function () {
                if (!this.checkModuleAttr("apiSystem", "sdkFrameworkVersion")) {
                    return undefined;
                }
                return this._m.apiSystem.sdkFrameworkVersion;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 跳转app设置界面
         * - 目前只支持 android
         */
        UserAPI.prototype.gotoAppSystemSettings = function (params) {
            if (!this.checkModuleAttr("apiSystem", "gotoAppSystemSettings", "function")) {
                return this.createNonePromise("[apiSystem.gotoAppSystemSettings]");
            }
            return this._m.apiSystem.gotoAppSystemSettings(params);
        };
        /**
         * 检查是否已授予权限
         * - 目前只支持 android
         */
        UserAPI.prototype.checkAppSystemPermissions = function (params) {
            if (!this.checkModuleAttr("apiSystem", "checkAppSystemPermissions", "function")) {
                return this.createNonePromise("[apiSystem.checkAppSystemPermissions]");
            }
            return this._m.apiSystem.checkAppSystemPermissions(params);
        };
        /**
         * 通过key获取原生SDK版本信息
         * @param params
         */
        UserAPI.prototype.getSDKMetaInfo = function (params) {
            if (!this.checkModuleAttr("apiSystem", "getSDKMetaInfo", "function")) {
                return this.createNonePromise("[apiSystem.getSDKMetaInfo]");
            }
            return this._m.apiSystem.getSDKMetaInfo(params);
        };
        /**
         * 动态修改appInfo的值，仅在内存中生效，不会影响磁盘中的配置
         * @param key
         * @param value
         */
        UserAPI.prototype.setAppInfo = function (key, value) {
            if (!this.checkModuleAttr("apiSystem", "setAppInfo", "function")) {
                return undefined;
            }
            return this._m.apiSystem.setAppInfo(key, value);
        };
        /**
         * 获取应用AppInfo
         * @param key
         */
        UserAPI.prototype.getAppInfo = function (key) {
            if (!this.checkModuleAttr("apiSystem", "getAppInfo", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getAppInfo(key);
        };
        /**
         * 获取Boolean类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        UserAPI.prototype.getAppInfoBoolean = function (key, def) {
            if (!this.checkModuleAttr("apiSystem", "getAppInfoBoolean", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getAppInfoBoolean(key, def);
        };
        /**
         * 获取Number类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        UserAPI.prototype.getAppInfoNumber = function (key, def) {
            if (!this.checkModuleAttr("apiSystem", "getAppInfoNumber", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getAppInfoNumber(key, def);
        };
        /**
         * 获取String类型的数据，当遇到异常数据时，将返回默认值
         * @param key
         * @param def
         */
        UserAPI.prototype.getAppInfoString = function (key, def) {
            if (!this.checkModuleAttr("apiSystem", "getAppInfoString", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getAppInfoString(key, def);
        };
        /**
         * 获取资源版本号
         */
        UserAPI.prototype.getResVersion = function () {
            if (!this.checkModuleAttr("apiSystem", "getResVersion", "function")) {
                return undefined;
            }
            return this._m.apiSystem.getResVersion();
        };
        /**
         * 分享到聊天窗口
         * * 如果目标平台没有明确的聊天窗口，则进行社会化分享。
         * * 如果当前环境无法分享，则分享失败
         */
        UserAPI.prototype.share = function (data) {
            if (!this.checkModuleAttr("share", "share", "function")) {
                return this.createNonePromise("[share.share]");
            }
            return this._m.share.share(data);
        };
        /**
         * 社会化分享
         * * 如果目标平台无法进行社会化分享，则选用聊天窗口分享。
         * * 如果当前环境无法分享，则分享失败
         */
        UserAPI.prototype.socialShare = function (data) {
            if (!this.checkModuleAttr("share", "socialShare", "function")) {
                return this.createNonePromise("[share.socialShare]");
            }
            return this._m.share.socialShare(data);
        };
        /**
         * 分享网址
         * * 如果当前环境无法进行URL分享，则分享失败
         * * 当前仅 QQPlay 环境支持
         */
        UserAPI.prototype.shareUrl = function (data) {
            if (!this.checkModuleAttr("share", "shareUrl", "function")) {
                return this.createNonePromise("[share.shareUrl]");
            }
            return this._m.share.shareUrl(data);
        };
        /**
         * 显示分享菜单
         * * 微信平台必须调用该函数才会显示转发按钮
         * * QQ平台默认就有转发按钮
         */
        UserAPI.prototype.showShareMenu = function () {
            if (!this.checkModuleAttr("share", "showShareMenu", "function")) {
                return this.createNonePromise("[share.showShareMenu]");
            }
            return this._m.share.showShareMenu();
        };
        /**
         * 隐藏分享菜单
         */
        UserAPI.prototype.hideShareMenu = function () {
            if (!this.checkModuleAttr("share", "hideShareMenu", "function")) {
                return this.createNonePromise("[share.hideShareMenu]");
            }
            return this._m.share.hideShareMenu();
        };
        /**
         * 在某些平台可以设置分享按钮所分享的内容
         * * 微信支持
         * * QQplay 无效
         */
        UserAPI.prototype.setShareMenuData = function (data) {
            if (!this.checkModuleAttr("share", "setShareMenuData", "function")) {
                return this.createNonePromise("[share.setShareMenuData]");
            }
            return this._m.share.setShareMenuData(data);
        };
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        UserAPI.prototype.getShareParam = function () {
            if (!this.checkModuleAttr("share", "getShareParam", "function")) {
                return this.createNonePromise("[share.getShareParam]");
            }
            return this._m.share.getShareParam();
        };
        /**
         * 获取通过点击分享链接时或传递的参数
         */
        UserAPI.prototype.getShareTicket = function () {
            if (!this.checkModuleAttr("share", "getShareTicket", "function")) {
                return this.createNonePromise("[share.getShareTicket]");
            }
            return this._m.share.getShareTicket();
        };
        /**
         * 获取分享的信息
         * * 当前仅微信环境有效
         */
        UserAPI.prototype.getShareInfo = function (shareTicket) {
            if (!this.checkModuleAttr("share", "getShareInfo", "function")) {
                return this.createNonePromise("[share.getShareInfo]");
            }
            return this._m.share.getShareInfo(shareTicket);
        };
        /**
         * 调起支付
         */
        UserAPI.prototype.payPurchase = function (item, options) {
            if (!this.checkModuleAttr("pay", "payPurchase", "function")) {
                return this.createNonePromise("[pay.payPurchase]");
            }
            return this._m.pay.payPurchase(item, options);
        };
        /**
         * 消耗商品
         */
        UserAPI.prototype.consumePurchase = function (params) {
            if (!this.checkModuleAttr("pay", "consumePurchase", "function")) {
                return this.createNonePromise("[pay.consumePurchase]");
            }
            return this._m.pay.consumePurchase(params);
        };
        /**
         * 查询未消耗商品信息
         */
        UserAPI.prototype.queryItemInfo = function (params) {
            if (!this.checkModuleAttr("pay", "queryItemInfo", "function")) {
                return this.createNonePromise("[pay.queryItemInfo]");
            }
            return this._m.pay.queryItemInfo(params);
        };
        UserAPI.prototype.getUserPayFlow = function () {
            if (!this.checkModuleAttr("pay", "getUserPayFlow", "function")) {
                return undefined;
            }
            return this._m.pay.getUserPayFlow();
        };
        Object.defineProperty(UserAPI.prototype, "needInitAdServiceFirst", {
            /**
             * 是否需要先初始化广告服务
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "needInitAdServiceFirst")) {
                    return undefined;
                }
                return this._m.advert.needInitAdServiceFirst;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初始化广告服务
         */
        UserAPI.prototype.initAdService = function (params) {
            if (!this.checkModuleAttr("advert", "initAdService", "function")) {
                return this.createNonePromise("[advert.initAdService]");
            }
            return this._m.advert.initAdService(params);
        };
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        UserAPI.prototype.createRewardedVideoAd = function (params) {
            if (!this.checkModuleAttr("advert", "createRewardedVideoAd", "function")) {
                return undefined;
            }
            return this._m.advert.createRewardedVideoAd(params);
        };
        /** 创建条幅广告对象 */
        UserAPI.prototype.createBannerAd = function (params) {
            if (!this.checkModuleAttr("advert", "createBannerAd", "function")) {
                return undefined;
            }
            return this._m.advert.createBannerAd(params);
        };
        Object.defineProperty(UserAPI.prototype, "supportInterstitialAd", {
            /**
             * 是否支持插屏广告
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "supportInterstitialAd")) {
                    return undefined;
                }
                return this._m.advert.supportInterstitialAd;
            },
            enumerable: false,
            configurable: true
        });
        UserAPI.prototype.createInterstitialAd = function (params) {
            if (!this.checkModuleAttr("advert", "createInterstitialAd", "function")) {
                return undefined;
            }
            return this._m.advert.createInterstitialAd(params);
        };
        Object.defineProperty(UserAPI.prototype, "supportFullscreenAd", {
            /**
             * @deprecated 是否支持全屏视频广告
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "supportFullscreenAd")) {
                    return undefined;
                }
                return this._m.advert.supportFullscreenAd;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportFullscreenVideoAd", {
            /**
             * 是否支持全屏视频广告
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "supportFullscreenVideoAd")) {
                    return undefined;
                }
                return this._m.advert.supportFullscreenVideoAd;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 创建全屏广告
         */
        UserAPI.prototype.createFullscreenVideoAd = function (params) {
            if (!this.checkModuleAttr("advert", "createFullscreenVideoAd", "function")) {
                return undefined;
            }
            return this._m.advert.createFullscreenVideoAd(params);
        };
        Object.defineProperty(UserAPI.prototype, "supportSplashAd", {
            /**
             * 是否支持开屏视频广告
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "supportSplashAd")) {
                    return undefined;
                }
                return this._m.advert.supportSplashAd;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 创建开屏广告
         */
        UserAPI.prototype.createSplashAd = function (params) {
            if (!this.checkModuleAttr("advert", "createSplashAd", "function")) {
                return undefined;
            }
            return this._m.advert.createSplashAd(params);
        };
        Object.defineProperty(UserAPI.prototype, "supportFeedAd", {
            /**
             * 是否支持信息流广告
             */
            get: function () {
                if (!this.checkModuleAttr("advert", "supportFeedAd")) {
                    return undefined;
                }
                return this._m.advert.supportFeedAd;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 创建信息流广告
         */
        UserAPI.prototype.createFeedAd = function (params) {
            if (!this.checkModuleAttr("advert", "createFeedAd", "function")) {
                return undefined;
            }
            return this._m.advert.createFeedAd(params);
        };
        UserAPI.prototype.createBxmFeedAd = function (params) {
            if (!this.checkModuleAttr("advert", "createBxmFeedAd", "function")) {
                return undefined;
            }
            return this._m.advert.createBxmFeedAd(params);
        };
        UserAPI.prototype.createFloatIconAd = function (params) {
            if (!this.checkModuleAttr("advert", "createFloatIconAd", "function")) {
                return undefined;
            }
            return this._m.advert.createFloatIconAd(params);
        };
        /**
         * 切换广告平台
         */
        UserAPI.prototype.selectAdvertPlatform = function (params) {
            if (!this.checkModuleAttr("advert", "selectAdvertPlatform", "function")) {
                return this.createNonePromise("[advert.selectAdvertPlatform]");
            }
            return this._m.advert.selectAdvertPlatform(params);
        };
        /**
         * 切换广告平台
         */
        UserAPI.prototype.initMultAdSlot = function (params) {
            if (!this.checkModuleAttr("advert", "initMultAdSlot", "function")) {
                return this.createNonePromise("[advert.initMultAdSlot]");
            }
            return this._m.advert.initMultAdSlot(params);
        };
        /**
         * - 进入客服会话。
         * 	- 微信小游戏要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致
         */
        UserAPI.prototype.openCustomerServiceConversation = function (params) {
            if (!this.checkModuleAttr("customer", "openCustomerServiceConversation", "function")) {
                return undefined;
            }
            return this._m.customer.openCustomerServiceConversation(params);
        };
        Object.defineProperty(UserAPI.prototype, "keyboard", {
            /** 系统键盘对象 */
            get: function () {
                if (!this.checkModuleAttr("widgets", "keyboard")) {
                    return undefined;
                }
                return this._m.widgets.keyboard;
            },
            enumerable: false,
            configurable: true
        });
        /** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
        UserAPI.prototype.showLoading = function (object) {
            if (!this.checkModuleAttr("widgets", "showLoading", "function")) {
                return this.createNonePromise("[widgets.showLoading]");
            }
            return this._m.widgets.showLoading(object);
        };
        /** 隐藏 loading 提示框 */
        UserAPI.prototype.hideLoading = function () {
            if (!this.checkModuleAttr("widgets", "hideLoading", "function")) {
                return this.createNonePromise("[widgets.hideLoading]");
            }
            return this._m.widgets.hideLoading();
        };
        /** 显示消息提示框 */
        UserAPI.prototype.showToast = function (object) {
            if (!this.checkModuleAttr("widgets", "showToast", "function")) {
                return this.createNonePromise("[widgets.showToast]");
            }
            return this._m.widgets.showToast(object);
        };
        /** 隐藏消息提示框 */
        UserAPI.prototype.hideToast = function () {
            if (!this.checkModuleAttr("widgets", "hideToast", "function")) {
                return this.createNonePromise("[widgets.hideToast]");
            }
            return this._m.widgets.hideToast();
        };
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        UserAPI.prototype.showConfirm = function (object) {
            if (!this.checkModuleAttr("widgets", "showConfirm", "function")) {
                return this.createNonePromise("[widgets.showConfirm]");
            }
            return this._m.widgets.showConfirm(object);
        };
        /**
         * 显示模态对话框
         * - 有`确定`和`取消`两个按钮
         */
        UserAPI.prototype.showPrompt = function (object) {
            if (!this.checkModuleAttr("widgets", "showPrompt", "function")) {
                return this.createNonePromise("[widgets.showPrompt]");
            }
            return this._m.widgets.showPrompt(object);
        };
        /**
         * 显示模态对话框
         * - 只有`确定`一个按钮
         */
        UserAPI.prototype.showAlert = function (object) {
            if (!this.checkModuleAttr("widgets", "showAlert", "function")) {
                return this.createNonePromise("[widgets.showAlert]");
            }
            return this._m.widgets.showAlert(object);
        };
        /**
         * 隐藏启动画面
         */
        UserAPI.prototype.hideLaunchingView = function () {
            if (!this.checkModuleAttr("widgets", "hideLaunchingView", "function")) {
                return this.createNonePromise("[widgets.hideLaunchingView]");
            }
            return this._m.widgets.hideLaunchingView();
        };
        /**
         * 监听主域发送的消息
         */
        UserAPI.prototype.onMessage = function (callback) {
            if (!this.checkModuleAttr("subContext", "onMessage", "function")) {
                return undefined;
            }
            return this._m.subContext.onMessage(callback);
        };
        /**
         * 获取开放数据域
         */
        UserAPI.prototype.getOpenDataContext = function () {
            if (!this.checkModuleAttr("subContext", "getOpenDataContext", "function")) {
                return undefined;
            }
            return this._m.subContext.getOpenDataContext();
        };
        Object.defineProperty(UserAPI.prototype, "apiPlatform", {
            /**
             * api平台名称
             * * browser 浏览器
             * * native APP原生
             * * wechatgame 微信
             * * qqplay QQ玩一玩
             * * unknown 未知平台
             */
            get: function () {
                if (!this.checkModuleAttr("support", "apiPlatform")) {
                    return undefined;
                }
                return this._m.support.apiPlatform;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "pluginName", {
            /**
             * 插件名
             * * develop 网页开发测试
             * * wechat 微信
             * * qqplay 玩一玩
             * * app 原生APP
             **/
            get: function () {
                if (!this.checkModuleAttr("support", "pluginName")) {
                    return undefined;
                }
                return this._m.support.pluginName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportShare", {
            /** 是否支持分享 */
            get: function () {
                if (!this.checkModuleAttr("support", "supportShare")) {
                    return undefined;
                }
                return this._m.support.supportShare;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportShareTickets", {
            /** 是否支持群分享 */
            get: function () {
                if (!this.checkModuleAttr("support", "supportShareTickets")) {
                    return undefined;
                }
                return this._m.support.supportShareTickets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireSubDomainRank", {
            /** 是否需要支持子域 */
            get: function () {
                if (!this.checkModuleAttr("support", "requireSubDomainRank")) {
                    return undefined;
                }
                return this._m.support.requireSubDomainRank;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireAuthorize", {
            /** 是否需要鉴权认证 */
            get: function () {
                if (!this.checkModuleAttr("support", "requireAuthorize")) {
                    return undefined;
                }
                return this._m.support.requireAuthorize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "apiNameLocale", {
            /** api本地化名字 */
            get: function () {
                if (!this.checkModuleAttr("support", "apiNameLocale")) {
                    return undefined;
                }
                return this._m.support.apiNameLocale;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportBuiltinCommitLog", {
            /**
             * 内部是否已经集成打点
             */
            get: function () {
                if (!this.checkModuleAttr("support", "supportBuiltinCommitLog")) {
                    return undefined;
                }
                return this._m.support.supportBuiltinCommitLog;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportBuiltinOnlineLoopLog", {
            /**
             * 是否已集成在线时长打点
             */
            get: function () {
                if (!this.checkModuleAttr("support", "supportBuiltinOnlineLoopLog")) {
                    return undefined;
                }
                return this._m.support.supportBuiltinOnlineLoopLog;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "supportBuiltinIdentityCertification", {
            /**
             * 是否自带实名认证
             */
            get: function () {
                if (!this.checkModuleAttr("support", "supportBuiltinIdentityCertification")) {
                    return undefined;
                }
                return this._m.support.supportBuiltinIdentityCertification;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "requireManagerAdLifecycle", {
            /**
             * 是否需要自己维护广告生命周期
             * （部分小游戏平台需要自己维护）
             */
            get: function () {
                if (!this.checkModuleAttr("support", "requireManagerAdLifecycle")) {
                    return undefined;
                }
                return this._m.support.requireManagerAdLifecycle;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "isNativePlugin", {
            /**
             * 是否是原生插件
             */
            get: function () {
                if (!this.checkModuleAttr("support", "isNativePlugin")) {
                    return undefined;
                }
                return this._m.support.isNativePlugin;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 注册全局的错误回调函数
         */
        UserAPI.prototype.setErrorCallback = function (callback) {
            if (!this.checkModuleAttr("except", "setErrorCallback", "function")) {
                return undefined;
            }
            return this._m.except.setErrorCallback(callback);
        };
        /**
         * 创建用户信息授权按钮
         * * 当前仅微信有效
         */
        UserAPI.prototype.createUserInfoButton = function (obj) {
            if (!this.checkModuleAttr("auth", "createUserInfoButton", "function")) {
                return undefined;
            }
            return this._m.auth.createUserInfoButton(obj);
        };
        /**
         * 判断是否拥有获取用户信息的权限
         */
        UserAPI.prototype.isUserInfoAuthAlready = function () {
            if (!this.checkModuleAttr("auth", "isUserInfoAuthAlready", "function")) {
                return this.createNonePromise("[auth.isUserInfoAuthAlready]");
            }
            return this._m.auth.isUserInfoAuthAlready();
        };
        Object.defineProperty(UserAPI.prototype, "vibration", {
            /**
             * 振动器
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "vibration")) {
                    return undefined;
                }
                return this._m.hardware.vibration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "performance", {
            /**
             * 性能
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "performance")) {
                    return undefined;
                }
                return this._m.hardware.performance;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "screen", {
            /**
             * 屏幕亮度
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "screen")) {
                    return undefined;
                }
                return this._m.hardware.screen;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gyroscope", {
            /**
             * 陀螺仪
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "gyroscope")) {
                    return undefined;
                }
                return this._m.hardware.gyroscope;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "compass", {
            /**
             * 罗盘
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "compass")) {
                    return undefined;
                }
                return this._m.hardware.compass;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "battery", {
            /**
             * 电池
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "battery")) {
                    return undefined;
                }
                return this._m.hardware.battery;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "accelerometer", {
            /**
             * 加速计
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "accelerometer")) {
                    return undefined;
                }
                return this._m.hardware.accelerometer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "gravity", {
            /**
             * - 设备方向
             * - 转屏相关
             * - 重力感应
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "gravity")) {
                    return undefined;
                }
                return this._m.hardware.gravity;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAPI.prototype, "screenTouch", {
            /**
             * 触屏
             */
            get: function () {
                if (!this.checkModuleAttr("hardware", "screenTouch")) {
                    return undefined;
                }
                return this._m.hardware.screenTouch;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 提交日志
         */
        UserAPI.prototype.commitLog = function (key, params) {
            if (!this.checkModuleAttr("log", "commitLog", "function")) {
                return this.createNonePromise("[log.commitLog]");
            }
            return this._m.log.commitLog(key, params);
        };
        UserAPI.prototype.commitChannelsLog = function (logType, params) {
            if (!this.checkModuleAttr("log", "commitChannelsLog", "function")) {
                return this.createNonePromise("[log.commitChannelsLog]");
            }
            return this._m.log.commitChannelsLog(logType, params);
        };
        /**
         * 付费打点
         * @param index 1-6  代表6种不同金额
         */
        UserAPI.prototype.commitPayLog = function (index) {
            if (!this.checkModuleAttr("log", "commitPayLog", "function")) {
                return undefined;
            }
            return this._m.log.commitPayLog(index);
        };
        /**
         * 添加本地推送
         */
        UserAPI.prototype.addLocalNotices = function (notices) {
            if (!this.checkModuleAttr("localPush", "addLocalNotices", "function")) {
                return this.createNonePromise("[localPush.addLocalNotices]");
            }
            return this._m.localPush.addLocalNotices(notices);
        };
        /**
         * 移除对应的推送
         * - identifier 和 identifiers 只有其中一个生效
         */
        UserAPI.prototype.removeLocalNoticeWithID = function (params) {
            if (!this.checkModuleAttr("localPush", "removeLocalNoticeWithID", "function")) {
                return this.createNonePromise("[localPush.removeLocalNoticeWithID]");
            }
            return this._m.localPush.removeLocalNoticeWithID(params);
        };
        /**
         * 移除所有推送
         */
        UserAPI.prototype.removeAllLocalNotices = function () {
            if (!this.checkModuleAttr("localPush", "removeAllLocalNotices", "function")) {
                return this.createNonePromise("[localPush.removeAllLocalNotices]");
            }
            return this._m.localPush.removeAllLocalNotices();
        };
        /**
         * 检查推送设置，如果没有权限则提示用户跳转开启
         */
        UserAPI.prototype.requireLocalNoticePermission = function () {
            if (!this.checkModuleAttr("localPush", "requireLocalNoticePermission", "function")) {
                return this.createNonePromise("[localPush.requireLocalNoticePermission]");
            }
            return this._m.localPush.requireLocalNoticePermission();
        };
        /**
         * 用户是否开启通知权限
         */
        UserAPI.prototype.isLocalNoticeEnabled = function () {
            if (!this.checkModuleAttr("localPush", "isLocalNoticeEnabled", "function")) {
                return this.createNonePromise("[localPush.isLocalNoticeEnabled]");
            }
            return this._m.localPush.isLocalNoticeEnabled();
        };
        /**
         * 是个单例
         * 创建激励视频广告对象
         */
        UserAPI.prototype.createAdvertUnit = function (createInfo) {
            if (!this.checkModuleAttr("advertV2", "createAdvertUnit", "function")) {
                return this.createNonePromise("[advertV2.createAdvertUnit]");
            }
            return this._m.advertV2.createAdvertUnit(createInfo);
        };
        UserAPI.prototype.isAdvertTypeSupported = function (advertType) {
            if (!this.checkModuleAttr("advertV2", "isAdvertTypeSupported", "function")) {
                return undefined;
            }
            return this._m.advertV2.isAdvertTypeSupported(advertType);
        };
        /**
         * 游戏热更新功能
         * @returns tid 供暂停、恢复、取消使用
         */
        UserAPI.prototype.hotupdateInGame = function (json, callback) {
            if (!this.checkModuleAttr("gdkjsb", "hotupdateInGame", "function")) {
                return undefined;
            }
            return this._m.gdkjsb.hotupdateInGame(json, callback);
        };
        // 暂停
        UserAPI.prototype.hotupdatePause = function (tid) {
            if (!this.checkModuleAttr("gdkjsb", "hotupdatePause", "function")) {
                return undefined;
            }
            return this._m.gdkjsb.hotupdatePause(tid);
        };
        // 恢复
        UserAPI.prototype.hotupdateResume = function (tid) {
            if (!this.checkModuleAttr("gdkjsb", "hotupdateResume", "function")) {
                return undefined;
            }
            return this._m.gdkjsb.hotupdateResume(tid);
        };
        // 取消
        UserAPI.prototype.hotupdateCancel = function (tid) {
            if (!this.checkModuleAttr("gdkjsb", "hotupdateCancel", "function")) {
                return undefined;
            }
            return this._m.gdkjsb.hotupdateCancel(tid);
        };
        return UserAPI;
    }());
    GDK.UserAPI = UserAPI;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var APIServer = /** @class */ (function () {
        function APIServer() {
        }
        return APIServer;
    }());
    GDK.APIServer = APIServer;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    // 统一形式：promise、callback、同步、异步等不同形式，统一为同一形式
    // /** 基本请求错误码 */
    // export const ReqErrorCode = {
    // 	/** 请求成功 */
    // 	SUCCESS: 0,
    // 	/** 未知错误 */
    // 	UNKNOWN: 100,
    // 	/** 请求超时 */
    // 	TIMEOUT: 101,
    // }
    // /** 请求错误扩展参数 */
    // export class ExtraReqError {
    // 	errCode?: number
    // 	msg?: string
    // 	reason?: string
    // 	data?: any
    // }
    // /** 请求错误结果 */
    // export class ReqError extends Error {
    // 	errCode: number
    // 	msg: string
    // 	reason: string
    // 	data?: any
    // 	constructor(errCode: number, msg: string, reason: string, data?: any) {
    // 		super(msg)
    // 		this.errCode = errCode
    // 		this.reason = reason;
    // 		this.data = data;
    // 	}
    // }
    // /** 请求结果 */
    // export class ReqResult extends ReqError { }
    // /** 请求结果模板生成器 */
    // export class ResultTemplatesExtractor<T extends ReqError> {
    // 	protected _temps: T[] = []
    // 	get temps() { return this._temps }
    // 	constructor(temps: T[]) {
    // 		this._temps = temps
    // 	}
    // 	/**
    // 	 * 根据错误码和扩展参数构造请求结果
    // 	 */
    // 	make<F extends ExtraReqError>(errCode: number, extra?: F): T {
    // 		return null
    // 	}
    // }
    /**
     * 请求结果模板，用于生成请求结果
     * 用法示例：
     * - ```typescript
    export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
        ...ReqResultTemplates.temps,
        { errCode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
    ])
    ```
     **/
    // export const ReqResultTemplates = new ResultTemplatesExtractor<ReqError>([
    // 	{ errCode: ReqErrorCode.SUCCESS, msg: '请求成功', reason: '请求成功', data: null },
    // 	{ errCode: ReqErrorCode.UNKNOWN, msg: '请求失败', reason: '未知错误' },
    // 	{ errCode: ReqErrorCode.TIMEOUT, msg: '请求超时', reason: '请求超时' },
    // ])
    // export class ReqCallbacks {
    // 	success?: (params: ReqResult) => void
    // 	fail?: (params: ReqError) => void
    // }
    /**
     * 增强类型限定的Promise
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    // export class MyPromise<T, F> extends Promise<T>{
    // 	constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: F) => void) => void) {
    // 		super(executor)
    // 	}
    // }
    /**
     * 反转 MyPromise
     * - 外部调用 success时相当于调用了 resolve
     * - 外部调用 fail 时，相当于调用了 reject
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    var YmPromise = /** @class */ (function () {
        function YmPromise(params) {
            this.init(params);
        }
        YmPromise.prototype.init = function (params) {
            var _this = this;
            this.promise = new Promise(function (resolve, reject) {
                _this.success = resolve;
                _this.fail = reject;
            });
        };
        return YmPromise;
    }());
    GDK.YmPromise = YmPromise;
    var RPromise = /** @class */ (function (_super) {
        __extends(RPromise, _super);
        function RPromise() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RPromise;
    }(YmPromise));
    GDK.RPromise = RPromise;
    /** 请求参数 */
    var ReqParams = /** @class */ (function () {
        function ReqParams() {
        }
        return ReqParams;
    }());
    GDK.ReqParams = ReqParams;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var GDKConfigBase = /** @class */ (function () {
        function GDKConfigBase() {
            /**
             * 游戏的启动模式。
             * 可以是 开发、测试、发布
             */
            this.mode = "develop";
            /**
             * APPID
             */
            this.appId = "";
            /**
             * 优先只启用客服跳转支付
             * - 支持ios和安卓
             */
            this.requireCustomServicePay = false;
            /**
             * 优先只启用小程序跳转支付
             * 只支持安卓
             */
            this.requireMiniAppPay = false;
            this.requireIndiaSPSPay = false;
        }
        return GDKConfigBase;
    }());
    GDK.GDKConfigBase = GDKConfigBase;
    var GDKDevelopConfig = /** @class */ (function (_super) {
        __extends(GDKDevelopConfig, _super);
        function GDKDevelopConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKDevelopConfig;
    }(GDKConfigBase));
    GDK.GDKDevelopConfig = GDKDevelopConfig;
    var GDKWechatConfig = /** @class */ (function (_super) {
        __extends(GDKWechatConfig, _super);
        function GDKWechatConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 支付id
             */
            _this.offerId = "";
            /**
             * 支付时，是否使用安全沙箱
             */
            _this.isPayInSandbox = true;
            /**
             * 安卓分享时，所使用的代理网址
             */
            _this.shareProxyUrl = "";
            _this.userId = 0;
            /**
             * 跳转支付appid
             */
            _this.miniAppOfferId = "";
            return _this;
        }
        return GDKWechatConfig;
    }(GDKConfigBase));
    GDK.GDKWechatConfig = GDKWechatConfig;
    var GDKBytedanceConfig = /** @class */ (function (_super) {
        __extends(GDKBytedanceConfig, _super);
        function GDKBytedanceConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKBytedanceConfig;
    }(GDKWechatConfig));
    GDK.GDKBytedanceConfig = GDKBytedanceConfig;
    var GDKQQMINIAPPConfig = /** @class */ (function (_super) {
        __extends(GDKQQMINIAPPConfig, _super);
        function GDKQQMINIAPPConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 支付id
             */
            _this.offerId = "";
            /**
             * 支付时，是否使用安全沙箱
             */
            _this.isPayInSandbox = true;
            /**
             * 安卓分享时，所使用的代理网址
             */
            _this.shareProxyUrl = "";
            _this.userId = 0;
            /**
             * 跳转支付appid
             */
            _this.miniAppOfferId = "";
            return _this;
        }
        return GDKQQMINIAPPConfig;
    }(GDKConfigBase));
    GDK.GDKQQMINIAPPConfig = GDKQQMINIAPPConfig;
    var GDKQQPlayConfig = /** @class */ (function (_super) {
        __extends(GDKQQPlayConfig, _super);
        function GDKQQPlayConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKQQPlayConfig;
    }(GDKConfigBase));
    GDK.GDKQQPlayConfig = GDKQQPlayConfig;
    var GDKOPPOConfig = /** @class */ (function (_super) {
        __extends(GDKOPPOConfig, _super);
        function GDKOPPOConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKOPPOConfig;
    }(GDKConfigBase));
    GDK.GDKOPPOConfig = GDKOPPOConfig;
    var GDKVIVOConfig = /** @class */ (function (_super) {
        __extends(GDKVIVOConfig, _super);
        function GDKVIVOConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKVIVOConfig;
    }(GDKConfigBase));
    GDK.GDKVIVOConfig = GDKVIVOConfig;
    var GDKAPPConfig = /** @class */ (function (_super) {
        __extends(GDKAPPConfig, _super);
        function GDKAPPConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 广告平台
             * - ironsource
             * - adtiming
             * - gdtadvert 腾讯广点通
             */
            _this.advertPlatform = "ironsource";
            _this.advertPlatforms = [];
            return _this;
        }
        return GDKAPPConfig;
    }(GDKConfigBase));
    GDK.GDKAPPConfig = GDKAPPConfig;
    var GDKGamepindConfig = /** @class */ (function (_super) {
        __extends(GDKGamepindConfig, _super);
        function GDKGamepindConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKGamepindConfig;
    }(GDKConfigBase));
    GDK.GDKGamepindConfig = GDKGamepindConfig;
    var GDKWebConfig = /** @class */ (function (_super) {
        __extends(GDKWebConfig, _super);
        function GDKWebConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GDKWebConfig;
    }(GDKConfigBase));
    GDK.GDKWebConfig = GDKWebConfig;
    var GDKWEBVIEWConfig = /** @class */ (function (_super) {
        __extends(GDKWEBVIEWConfig, _super);
        function GDKWEBVIEWConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 广告平台
             * - ironsource
             * - adtiming
             * - gdtadvert 腾讯广点通
             */
            _this.advertPlatform = "ironsource";
            _this.advertPlatforms = [];
            return _this;
        }
        return GDKWEBVIEWConfig;
    }(GDKConfigBase));
    GDK.GDKWEBVIEWConfig = GDKWEBVIEWConfig;
    var GDKAppv2Config = /** @class */ (function (_super) {
        __extends(GDKAppv2Config, _super);
        function GDKAppv2Config() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 广告平台
             * - ironsource
             * - adtiming
             * - gdtadvert 腾讯广点通
             */
            _this.advertPlatform = "ironsource";
            _this.advertPlatforms = [];
            return _this;
        }
        return GDKAppv2Config;
    }(GDKConfigBase));
    GDK.GDKAppv2Config = GDKAppv2Config;
    var GDKConfig = /** @class */ (function () {
        function GDKConfig() {
        }
        return GDKConfig;
    }());
    GDK.GDKConfig = GDKConfig;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var BannerStyle = /** @class */ (function () {
        function BannerStyle() {
        }
        return BannerStyle;
    }());
    GDK.BannerStyle = BannerStyle;
    var BannerStyleAccessor = /** @class */ (function () {
        function BannerStyleAccessor() {
        }
        return BannerStyleAccessor;
    }());
    GDK.BannerStyleAccessor = BannerStyleAccessor;
    var RewardedVideoAdOnErrorParam = /** @class */ (function () {
        function RewardedVideoAdOnErrorParam() {
        }
        return RewardedVideoAdOnErrorParam;
    }());
    GDK.RewardedVideoAdOnErrorParam = RewardedVideoAdOnErrorParam;
    var InterstitialAdOnErrorParam = /** @class */ (function (_super) {
        __extends(InterstitialAdOnErrorParam, _super);
        function InterstitialAdOnErrorParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterstitialAdOnErrorParam;
    }(RewardedVideoAdOnErrorParam));
    GDK.InterstitialAdOnErrorParam = InterstitialAdOnErrorParam;
    var FullscreenAdOnErrorParam = /** @class */ (function (_super) {
        __extends(FullscreenAdOnErrorParam, _super);
        function FullscreenAdOnErrorParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FullscreenAdOnErrorParam;
    }(RewardedVideoAdOnErrorParam));
    GDK.FullscreenAdOnErrorParam = FullscreenAdOnErrorParam;
    var SplashAdOnErrorParam = /** @class */ (function (_super) {
        __extends(SplashAdOnErrorParam, _super);
        function SplashAdOnErrorParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SplashAdOnErrorParam;
    }(RewardedVideoAdOnErrorParam));
    GDK.SplashAdOnErrorParam = SplashAdOnErrorParam;
    var RewardVideoAdLoadParams = /** @class */ (function () {
        function RewardVideoAdLoadParams() {
        }
        return RewardVideoAdLoadParams;
    }());
    GDK.RewardVideoAdLoadParams = RewardVideoAdLoadParams;
    var VideoAdSlot = /** @class */ (function () {
        function VideoAdSlot() {
        }
        return VideoAdSlot;
    }());
    GDK.VideoAdSlot = VideoAdSlot;
    var FeedAdStyle = /** @class */ (function () {
        function FeedAdStyle() {
        }
        return FeedAdStyle;
    }());
    GDK.FeedAdStyle = FeedAdStyle;
    var FeedAdStyleAccessor = /** @class */ (function () {
        function FeedAdStyleAccessor() {
        }
        return FeedAdStyleAccessor;
    }());
    GDK.FeedAdStyleAccessor = FeedAdStyleAccessor;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var AdvertType;
    (function (AdvertType) {
        /**
         * 条幅广告
         */
        AdvertType["BannerAdvert"] = "BannerAdvert";
        /**
         * 激励视频广告
         */
        AdvertType["RewardedVideoAdvert"] = "RewardedVideoAdvert";
        /**
         * 全屏视频广告
         */
        AdvertType["FullscreenVideoAdvert"] = "FullscreenVideoAdvert";
        /**
         * 原生信息流广告
         */
        AdvertType["FeedAdvert"] = "FeedAdvert";
        /**
         * 插屏广告
         */
        AdvertType["InterstitialAdvert"] = "InterstitialAdvert";
    })(AdvertType = GDK.AdvertType || (GDK.AdvertType = {}));
    var AdCreateInfo = /** @class */ (function () {
        function AdCreateInfo(info) {
            this.isDebug = false;
            this.advertType = info.advertType;
            this.appId = info.appId;
            this.placementId = info.placementId;
            this.isDebug = info.isDebug;
        }
        return AdCreateInfo;
    }());
    GDK.AdCreateInfo = AdCreateInfo;
    var ShowAdUnityResult = /** @class */ (function () {
        function ShowAdUnityResult() {
            this.couldReward = false;
            this.isEnded = false;
        }
        return ShowAdUnityResult;
    }());
    GDK.ShowAdUnityResult = ShowAdUnityResult;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /** 按钮的样式 */
    var UserInfoButtonStyle = /** @class */ (function () {
        function UserInfoButtonStyle() {
        }
        return UserInfoButtonStyle;
    }());
    GDK.UserInfoButtonStyle = UserInfoButtonStyle;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var OpenParam = /** @class */ (function () {
        function OpenParam() {
            /** 会话来源 */
            this.sessionFrom = '';
            /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话之后会收到一个消息卡片，通过以下三个参数设置卡片的内容 */
            this.showMessageCard = false;
            /** 会话内消息卡片标题 */
            this.sendMessageTitle = '';
            /** 会话内消息卡片路径 */
            this.sendMessagePath = '';
            /** 会话内消息卡片图片路径 */
            this.sendMessageImg = '';
        }
        return OpenParam;
    }());
    GDK.OpenParam = OpenParam;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var LocalPushAvailableStage;
    (function (LocalPushAvailableStage) {
        /**
         * 允许后台通知
         */
        LocalPushAvailableStage[LocalPushAvailableStage["BACKGROUND"] = 1] = "BACKGROUND";
        /**
         * 允许前台通知
         */
        LocalPushAvailableStage[LocalPushAvailableStage["FOREGROUND"] = 2] = "FOREGROUND";
    })(LocalPushAvailableStage = GDK.LocalPushAvailableStage || (GDK.LocalPushAvailableStage = {}));
    var LocalPushBundle = /** @class */ (function () {
        function LocalPushBundle() {
            /**
             * 推送ID，最好填纯数字
             * - 相同id的通知会被覆盖更新
             */
            this.identifier = null;
            /**
             * 推送标题
             */
            this.title = '标题';
            /**
             * 推送副标题
             * - 某些手机不显示副标题
             */
            this.subtitle = '';
            /**
             * 推送文本内容
             */
            this.content = '内容';
            /**
             * 顶栏标题
             */
            this.ticker = "";
            /**
             * 推送间隔
             */
            this.interval = null;
            /**
             * 重复推送方式（仅ios支持）
             * - 0 不重复
             * - 1 重复推送
             * - 大于1 其他重复方式
             */
            this.repeat = 0;
            /**
             * 图标样式
             */
            this.badge = 1;
            /**
             * 附加信息
             */
            this.userInfo = '{}';
            /**
             * 声音文件名
             */
            this.soundName = null;
            /**
             * 开启声音提示
             */
            this.enableSoundTip = true;
            /**
             * 振动提示
             */
            this.enableVibrateTip = false;
            /**
             * 呼吸灯提示（仅安卓）
             */
            this.enableLightTip = false;
            /**
             * 设置某些情景推送权限
             * - 只支持安卓
             * - 可以叠加，比如：info.availableStage=LocalPushAvailableStage.BACKGROUND | LocalPushAvailableStage.FOREGROUND
             */
            this.availableStage = LocalPushAvailableStage.BACKGROUND;
            /**
             * 支持长文本完整显示
             * - 目前仅安卓生效
             */
            this.isBigText = false;
        }
        return LocalPushBundle;
    }());
    GDK.LocalPushBundle = LocalPushBundle;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /** 订单状态 */
    var OrderState;
    (function (OrderState) {
        OrderState[OrderState["fail"] = 2] = "fail";
        OrderState[OrderState["ok"] = 1] = "ok";
        OrderState[OrderState["unknown"] = 0] = "unknown";
    })(OrderState = GDK.OrderState || (GDK.OrderState = {}));
    var PayItemInfo = /** @class */ (function () {
        function PayItemInfo() {
            /** 我们的商品ID */
            this.goodsId = 0;
            /** 后台二级货币ID */
            this.coinId = 0;
            /** 支付金额 */
            this.money = 0;
            /** 支付金额 */
            this.price = 0;
            /** 购买商品数量 */
            this.amount = 0;
            /** 商品名称/标题 */
            this.title = '';
            /** 支付货币单位 */
            this.currencyUnit = "CNY";
        }
        return PayItemInfo;
    }());
    GDK.PayItemInfo = PayItemInfo;
    var PayError = /** @class */ (function (_super) {
        __extends(PayError, _super);
        function PayError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PayError;
    }(GDK.GDKError));
    GDK.PayError = PayError;
    var PayResult = /** @class */ (function () {
        function PayResult() {
        }
        return PayResult;
    }());
    GDK.PayResult = PayResult;
    var ConsumePurchaseResult = /** @class */ (function () {
        function ConsumePurchaseResult() {
        }
        return ConsumePurchaseResult;
    }());
    GDK.ConsumePurchaseResult = ConsumePurchaseResult;
    var PayQueryItemInfoResultData = /** @class */ (function () {
        function PayQueryItemInfoResultData() {
        }
        return PayQueryItemInfoResultData;
    }());
    GDK.PayQueryItemInfoResultData = PayQueryItemInfoResultData;
    var PayQueryItemInfoResult = /** @class */ (function () {
        function PayQueryItemInfoResult() {
        }
        return PayQueryItemInfoResult;
    }());
    GDK.PayQueryItemInfoResult = PayQueryItemInfoResult;
    var PayOptions = /** @class */ (function () {
        function PayOptions() {
        }
        return PayOptions;
    }());
    GDK.PayOptions = PayOptions;
    var ConsumePurchaseParams = /** @class */ (function () {
        function ConsumePurchaseParams() {
        }
        return ConsumePurchaseParams;
    }());
    GDK.ConsumePurchaseParams = ConsumePurchaseParams;
    var PayQueryItemInfoParams = /** @class */ (function () {
        function PayQueryItemInfoParams() {
        }
        return PayQueryItemInfoParams;
    }());
    GDK.PayQueryItemInfoParams = PayQueryItemInfoParams;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /**
     * 分享时所使用的数据
     */
    var ShareData = /** @class */ (function () {
        function ShareData() {
        }
        return ShareData;
    }());
    GDK.ShareData = ShareData;
    var ShareUrlData = /** @class */ (function () {
        function ShareUrlData() {
        }
        return ShareUrlData;
    }());
    GDK.ShareUrlData = ShareUrlData;
    var ShareResult = /** @class */ (function () {
        function ShareResult() {
            /**
             * 是否是群或讨论组
             */
            this.isGroup = false;
        }
        return ShareResult;
    }());
    GDK.ShareResult = ShareResult;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    // export class LoginError extends ReqError { }
    /** 登录请求结果 */
    var LoginResult = /** @class */ (function () {
        function LoginResult() {
        }
        return LoginResult;
    }());
    GDK.LoginResult = LoginResult;
    /** 登录错误码 */
    // export const LoginErrorCode = {
    // 	...ReqErrorCode,
    // 	INVALID_OPENID: 10001,
    // }
    /** 登录结果模板 */
    // export const LoginResultTemplates = new ResultTemplatesExtractor<ReqError>([
    // 	...ReqResultTemplates.temps,
    // 	{ errCode: LoginErrorCode.INVALID_OPENID, msg: '登录失败', reason: 'openId验证失败' },
    // ])
    /** 登录请求参数 */
    var LoginParams = /** @class */ (function (_super) {
        __extends(LoginParams, _super);
        function LoginParams() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否禁止游客登陆
             */
            _this.disableVisitor = false;
            /**
             * 是否允许Google登陆
             */
            _this.google = false;
            /**
             * 是否允许facebook登陆
             */
            _this.facebook = false;
            /**
             * 是否静默登陆
             */
            _this.silent = false;
            /**
             * 是否允许自动登陆
             * * 如果当前未绑定任何第三方账号，则执行游客登陆
             * * 否则，执行第三方账号的自动登陆
             */
            _this.autoLogin = true;
            return _this;
        }
        return LoginParams;
    }(GDK.ReqParams));
    GDK.LoginParams = LoginParams;
    var LoginPromise = /** @class */ (function (_super) {
        __extends(LoginPromise, _super);
        function LoginPromise() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LoginPromise;
    }(Promise));
    GDK.LoginPromise = LoginPromise;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    /** 登录请求结果 */
    var UserDataUpdateResult = /** @class */ (function () {
        function UserDataUpdateResult() {
        }
        return UserDataUpdateResult;
    }());
    GDK.UserDataUpdateResult = UserDataUpdateResult;
    //https://developers.weixin.qq.com/minigame/dev/document/open-api/data/KVData.html
    var KVData = /** @class */ (function () {
        function KVData() {
        }
        return KVData;
    }());
    GDK.KVData = KVData;
    //https://developers.weixin.qq.com/minigame/dev/document/open-api/data/UserGameData.html
    var UserGameData = /** @class */ (function () {
        function UserGameData() {
        }
        return UserGameData;
    }());
    GDK.UserGameData = UserGameData;
})(GDK || (GDK = {}));
var GDK;
(function (GDK) {
    var ShowConfirmResult = /** @class */ (function () {
        function ShowConfirmResult() {
        }
        return ShowConfirmResult;
    }());
    GDK.ShowConfirmResult = ShowConfirmResult;
    var ShowPromptResult = /** @class */ (function () {
        function ShowPromptResult() {
        }
        return ShowPromptResult;
    }());
    GDK.ShowPromptResult = ShowPromptResult;
    var ShowAlertResult = /** @class */ (function () {
        function ShowAlertResult() {
        }
        return ShowAlertResult;
    }());
    GDK.ShowAlertResult = ShowAlertResult;
    var ShowLoadingParams = /** @class */ (function () {
        function ShowLoadingParams() {
        }
        return ShowLoadingParams;
    }());
    GDK.ShowLoadingParams = ShowLoadingParams;
})(GDK || (GDK = {}));
