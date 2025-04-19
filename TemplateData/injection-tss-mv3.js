!function() {
    try {
        var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
          , t = (new e.Error).stack;
        t && (e._sentryDebugIds = e._sentryDebugIds || {},
        e._sentryDebugIds[t] = "2410f536-c17e-4a69-81ae-d547fd1eec6b",
        e._sentryDebugIdIdentifier = "sentry-dbid-2410f536-c17e-4a69-81ae-d547fd1eec6b")
    } catch (e) {}
}();
var _global = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
_global.SENTRY_RELEASE = {
    id: "9cc321247f9fdefd9741f3bea628958eadeba2f6"
},
( () => {
    "use strict";
    ( (e, t, n) => {
        console.debug(`${n} TSS: hosted page injected`),
        console.debug(`${n} MBTSS: Nonce: `, e);
        let o = !1
          , i = !1
          , r = {}
          , s = {}
          , c = {}
          , u = {};
        function d({object: t, f: n, subtype: r, detectFunc: s, proxy: c=a, isBrowserlocker: u=!0}) {
            let d = t[n];
            t[n] = function() {
                if (o && !i && u)
                    throw new Error("Breaking Browser Locker Behavior detected");
                let t = [].slice.call(arguments);
                if (!i && s(t) && (o = !0),
                o && !i && function(t, n) {
                    window.top.postMessage(JSON.parse(JSON.stringify({
                        type: "scam",
                        subtype: t,
                        parameters: n,
                        nonce: e
                    })), "*")
                }(r, t),
                o && !i && u)
                    throw new Error("Breaking Browser Locker Behavior detected");
                return c(d, this, t)
            }
        }
        function a(e, t, n) {
            return e.apply(t, n)
        }
        function f(e, t, n) {
            return ( (e, t, n) => {
                console.debug(`TSS: Checking if repeated ${n} times for interval ${t} against data: `, e);
                const o = Date.now();
                if (e.lastTime)
                    if (o - e.lastTime < t) {
                        if (e.lastCount++,
                        e.lastCount >= n)
                            return !0
                    } else
                        e.lastTime = o,
                        e.lastCount = 1;
                else {
                    if (1 === n)
                        return e.lastTime = o,
                        e.lastCount = 1,
                        !0;
                    e.lastTime = o,
                    e.lastCount = 1
                }
                return !1
            }
            )(e, t, n)
        }
        function l(e) {
            return console.debug("TSS: Counted history being replaced"),
            b()
        }
        function b(e) {
            return console.debug("TSS: Caught history"),
            f(r, 1e3, 500)
        }
        d({
            object: window,
            f: "print",
            subtype: "printLoop",
            detectFunc: function(e) {
                return console.debug("TSS: caught print"),
                f(s, 1e4, 3)
            }
        }),
        d({
            object: window.history,
            f: "pushState",
            subtype: "historyLoop",
            detectFunc: function(e) {
                return console.debug("TSS: Counted history being pushed"),
                b()
            }
        }),
        window.setTimeout((function() {
            d({
                object: window.history,
                f: "replaceState",
                subtype: "historyLoop",
                detectFunc: l
            })
        }
        ), 2e3),
        d({
            object: URL,
            f: "createObjectURL",
            subtype: "createURLLoop",
            detectFunc: function(e) {
                return console.debug("TSS: Caught create URL"),
                f(c, 1e3, 500)
            }
        }),
        window.chrome && window.chrome.webstore && d({
            object: chrome.webstore,
            f: "install",
            subtype: "extensionInstall",
            detectFunc: function(e) {
                return console.debug("TSS: Caught webstore install"),
                !0
            },
            isBrowserlocker: !1
        }),
        window.Notification && d({
            object: window.Notification,
            f: "requestPermission",
            subtype: "notificationLoop",
            detectFunc: function(e) {
                return console.debug("TSS: Caught notification permission request"),
                f(u, 5e3, 2)
            },
            isBrowserlocker: !1
        }),
        window.addEventListener("message", (function(t) {
            t.source === window && t.data.nonce === e && "exclude" === t.data.type && (i = !0)
        }
        ), !1)
    }
    )("nonce", 0, "injection-tss")
}
)();
//# sourceMappingURL=injection-tss-mv3.js.map
