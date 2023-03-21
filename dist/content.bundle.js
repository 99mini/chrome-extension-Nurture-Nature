/*! For license information please see content.bundle.js.LICENSE.txt */
(() => {
  function t() {
    "use strict";
    t = function () {
      return r;
    };
    var r = {},
      n = Object.prototype,
      o = n.hasOwnProperty,
      i =
        Object.defineProperty ||
        function (t, e, r) {
          t[e] = r.value;
        },
      a = "function" == typeof Symbol ? Symbol : {},
      c = a.iterator || "@@iterator",
      u = a.asyncIterator || "@@asyncIterator",
      s = a.toStringTag || "@@toStringTag";
    function l(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      l({}, "");
    } catch (t) {
      l = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function f(t, e, r, n) {
      var o = e && e.prototype instanceof d ? e : d,
        a = Object.create(o.prototype),
        c = new j(n || []);
      return i(a, "_invoke", { value: E(t, r, c) }), a;
    }
    function h(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }
    r.wrap = f;
    var p = {};
    function d() {}
    function y() {}
    function m() {}
    var v = {};
    l(v, c, function () {
      return this;
    });
    var g = Object.getPrototypeOf,
      w = g && g(g(O([])));
    w && w !== n && o.call(w, c) && (v = w);
    var b = (m.prototype = d.prototype = Object.create(v));
    function L(t) {
      ["next", "throw", "return"].forEach(function (e) {
        l(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function x(t, r) {
      function n(i, a, c, u) {
        var s = h(t[i], t, a);
        if ("throw" !== s.type) {
          var l = s.arg,
            f = l.value;
          return f && "object" == e(f) && o.call(f, "__await")
            ? r.resolve(f.__await).then(
                function (t) {
                  n("next", t, c, u);
                },
                function (t) {
                  n("throw", t, c, u);
                }
              )
            : r.resolve(f).then(
                function (t) {
                  (l.value = t), c(l);
                },
                function (t) {
                  return n("throw", t, c, u);
                }
              );
        }
        u(s.arg);
      }
      var a;
      i(this, "_invoke", {
        value: function (t, e) {
          function o() {
            return new r(function (r, o) {
              n(t, e, r, o);
            });
          }
          return (a = a ? a.then(o, o) : o());
        },
      });
    }
    function E(t, e, r) {
      var n = "suspendedStart";
      return function (o, i) {
        if ("executing" === n) throw new Error("Generator is already running");
        if ("completed" === n) {
          if ("throw" === o) throw i;
          return { value: void 0, done: !0 };
        }
        for (r.method = o, r.arg = i; ; ) {
          var a = r.delegate;
          if (a) {
            var c = I(a, r);
            if (c) {
              if (c === p) continue;
              return c;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          n = "executing";
          var u = h(t, e, r);
          if ("normal" === u.type) {
            if (((n = r.done ? "completed" : "suspendedYield"), u.arg === p))
              continue;
            return { value: u.arg, done: r.done };
          }
          "throw" === u.type &&
            ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
        }
      };
    }
    function I(t, e) {
      var r = e.method,
        n = t.iterator[r];
      if (void 0 === n)
        return (
          (e.delegate = null),
          ("throw" === r &&
            t.iterator.return &&
            ((e.method = "return"),
            (e.arg = void 0),
            I(t, e),
            "throw" === e.method)) ||
            ("return" !== r &&
              ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          p
        );
      var o = h(n, t.iterator, e.arg);
      if ("throw" === o.type)
        return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), p;
      var i = o.arg;
      return i
        ? i.done
          ? ((e[t.resultName] = i.value),
            (e.next = t.nextLoc),
            "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
            (e.delegate = null),
            p)
          : i
        : ((e.method = "throw"),
          (e.arg = new TypeError("iterator result is not an object")),
          (e.delegate = null),
          p);
    }
    function N(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function _(t) {
      var e = t.completion || {};
      (e.type = "normal"), delete e.arg, (t.completion = e);
    }
    function j(t) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        t.forEach(N, this),
        this.reset(!0);
    }
    function O(t) {
      if (t) {
        var e = t[c];
        if (e) return e.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var r = -1,
            n = function e() {
              for (; ++r < t.length; )
                if (o.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
              return (e.value = void 0), (e.done = !0), e;
            };
          return (n.next = n);
        }
      }
      return { next: k };
    }
    function k() {
      return { value: void 0, done: !0 };
    }
    return (
      (y.prototype = m),
      i(b, "constructor", { value: m, configurable: !0 }),
      i(m, "constructor", { value: y, configurable: !0 }),
      (y.displayName = l(m, s, "GeneratorFunction")),
      (r.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return (
          !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (r.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, m)
            : ((t.__proto__ = m), l(t, s, "GeneratorFunction")),
          (t.prototype = Object.create(b)),
          t
        );
      }),
      (r.awrap = function (t) {
        return { __await: t };
      }),
      L(x.prototype),
      l(x.prototype, u, function () {
        return this;
      }),
      (r.AsyncIterator = x),
      (r.async = function (t, e, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new x(f(t, e, n, o), i);
        return r.isGeneratorFunction(e)
          ? a
          : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
      }),
      L(b),
      l(b, s, "Generator"),
      l(b, c, function () {
        return this;
      }),
      l(b, "toString", function () {
        return "[object Generator]";
      }),
      (r.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return (
          r.reverse(),
          function t() {
            for (; r.length; ) {
              var n = r.pop();
              if (n in e) return (t.value = n), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (r.values = O),
      (j.prototype = {
        constructor: j,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = void 0),
            this.tryEntries.forEach(_),
            !t)
          )
            for (var e in this)
              "t" === e.charAt(0) &&
                o.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = void 0);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;
          function r(r, n) {
            return (
              (a.type = "throw"),
              (a.arg = t),
              (e.next = r),
              n && ((e.method = "next"), (e.arg = void 0)),
              !!n
            );
          }
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n],
              a = i.completion;
            if ("root" === i.tryLoc) return r("end");
            if (i.tryLoc <= this.prev) {
              var c = o.call(i, "catchLoc"),
                u = o.call(i, "finallyLoc");
              if (c && u) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
              } else {
                if (!u)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var n = this.tryEntries[r];
            if (
              n.tryLoc <= this.prev &&
              o.call(n, "finallyLoc") &&
              this.prev < n.finallyLoc
            ) {
              var i = n;
              break;
            }
          }
          i &&
            ("break" === t || "continue" === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          var a = i ? i.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), p)
              : this.complete(a)
          );
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
            p
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t)
              return this.complete(r.completion, r.afterLoc), _(r), p;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var o = n.arg;
                _(r);
              }
              return o;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (t, e, r) {
          return (
            (this.delegate = { iterator: O(t), resultName: e, nextLoc: r }),
            "next" === this.method && (this.arg = void 0),
            p
          );
        },
      }),
      r
    );
  }
  function e(t) {
    return (
      (e =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      e(t)
    );
  }
  function r(t, e, r, n, o, i, a) {
    try {
      var c = t[i](a),
        u = c.value;
    } catch (t) {
      return void r(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(n, o);
  }
  function n(t) {
    return function () {
      var e = this,
        n = arguments;
      return new Promise(function (o, i) {
        var a = t.apply(e, n);
        function c(t) {
          r(a, o, i, c, u, "next", t);
        }
        function u(t) {
          r(a, o, i, c, u, "throw", t);
        }
        c(void 0);
      });
    };
  }
  var o = document.getElementById("list-container"),
    i = document.getElementById("counter"),
    a = 0,
    c = {};
  function u() {
    return s.apply(this, arguments);
  }
  function s() {
    return (s = n(
      t().mark(function e() {
        return t().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (t.next = 2), l("commitCount");
              case 2:
                return (
                  (a = t.sent),
                  (i.innerHTML = a),
                  (t.next = 6),
                  l("commitsByDay")
                );
              case 6:
                (c = t.sent), o.appendChild(p(c)), h(Number(i.innerHTML));
              case 9:
              case "end":
                return t.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function l(t) {
    return f.apply(this, arguments);
  }
  function f() {
    return (f = n(
      t().mark(function e(r) {
        var n, o;
        return t().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = new Promise(function (t, e) {
                    chrome.storage.local.get(r, function (e) {
                      t(e[r]);
                    });
                  })),
                  (t.next = 3),
                  n
                );
              case 3:
                return (o = t.sent), t.abrupt("return", o);
              case 5:
              case "end":
                return t.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function h(t) {
    t < 5 &&
      ((document.getElementById("plant-img").src =
        "../assets/images/plant/plant00.png"),
      chrome.action.setIcon({ path: "../assets/images/plant/plant00.png" })),
      t >= 5 &&
        ((document.getElementById("plant-img").src =
          "../assets/images/plant/plant16.png"),
        chrome.action.setIcon({ path: "../assets/images/plant/plant16.png" }));
  }
  function p(t) {
    var r = document.createElement("ul");
    for (var n in ((r.className = "dateItemList"), t)) {
      var o = document.createElement("li");
      (o.className = "dateItem"),
        o.appendChild(document.createTextNode(n)),
        "object" === e(t[n])
          ? o.appendChild(p(t[n]))
          : o.appendChild(document.createTextNode(": " + t[n])),
        r.appendChild(o);
    }
    return r;
  }
  document
    .getElementById("counter-btn")
    .addEventListener("click", function (t) {
      var e, r;
      (e = Number(i.innerHTML) + 1),
        ((r = {}).count = e),
        chrome.storage.local.set(r),
        l("commitCount"),
        h(Number(i.innerHTML)),
        console.log(l("commitsByDay"));
    }),
    document
      .getElementById("refresh-btn")
      .addEventListener("click", function (t) {
        u();
      }),
    u();
})();
