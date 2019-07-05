var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1,
    $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp
    .ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object
    .defineProperty : function(t, e, i) {
        t != Array.prototype && t != Object.prototype && (t[e] = i.value)
    }, $jscomp.getGlobal = function(t) {
        return "undefined" != typeof window && window === t ? t : "undefined" !=
            typeof global && null != global ? global : t
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX =
    "jscomp_symbol_", $jscomp.initSymbol = function() {
        $jscomp.initSymbol = function() {}, $jscomp.global.Symbol || ($jscomp
            .global.Symbol = $jscomp.Symbol)
    }, $jscomp.Symbol = function() {
        var t = 0;
        return function(e) {
            return $jscomp.SYMBOL_PREFIX + (e || "") + t++
        }
    }(), $jscomp.initSymbolIterator = function() {
        $jscomp.initSymbol();
        var t = $jscomp.global.Symbol.iterator;
        t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol(
                "iterator")), "function" != typeof Array.prototype[t] && $jscomp
            .defineProperty(Array.prototype, t, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return $jscomp.arrayIterator(this)
                }
            }), $jscomp.initSymbolIterator = function() {}
    }, $jscomp.arrayIterator = function(t) {
        var e = 0;
        return $jscomp.iteratorPrototype(function() {
            return e < t.length ? {
                done: !1,
                value: t[e++]
            } : {
                done: !0
            }
        })
    }, $jscomp.iteratorPrototype = function(t) {
        return $jscomp.initSymbolIterator(), (t = {
            next: t
        })[$jscomp.global.Symbol.iterator] = function() {
            return this
        }, t
    }, $jscomp.iteratorFromArray = function(t, e) {
        $jscomp.initSymbolIterator(), t instanceof String && (t += "");
        var i = 0,
            r = {
                next: function() {
                    if (i < t.length) {
                        var s = i++;
                        return {
                            value: e(s, t[s]),
                            done: !1
                        }
                    }
                    return r.next = function() {
                        return {
                            done: !0,
                            value: void 0
                        }
                    }, r.next()
                }
            };
        return r[Symbol.iterator] = function() {
            return r
        }, r
    }, $jscomp.polyfill = function(t, e, i, r) {
        if (e) {
            for (i = $jscomp.global, t = t.split("."), r = 0; r < t.length -
                1; r++) {
                var s = t[r];
                s in i || (i[s] = {}), i = i[s]
            }(e = e(r = i[t = t[t.length - 1]])) != r && null != e && $jscomp
                .defineProperty(i, t, {
                    configurable: !0,
                    writable: !0,
                    value: e
                })
        }
    }, $jscomp.polyfill("Array.prototype.keys", function(t) {
        return t || function() {
            return $jscomp.iteratorFromArray(this, function(t) {
                return t
            })
        }
    }, "es6", "es3"), $jscomp.polyfill("Array.prototype.values", function(t) {
        return t || function() {
            return $jscomp.iteratorFromArray(this, function(t, e) {
                return e
            })
        }
    }, "es8", "es3"), $jscomp.polyfill("Number.EPSILON", function(t) {
        return Math.pow(2, -52)
    }, "es6", "es3"), $jscomp.polyfill("Array.prototype.fill", function(t) {
        return t || function(t, e, i) {
            var r = this.length || 0;
            for (0 > e && (e = Math.max(0, r + e)), (null == i || i >
                r) && (i = r), 0 > (i = Number(i)) && (i = Math.max(0,
                    r + i)), e = Number(e || 0); e < i; e++) this[e] =
            t;
            return this
        }
    }, "es6", "es3"), (this || self || window).Gearing = function(t) {
        function e() {
            var t = document.body.getBoundingClientRect(),
                e = this.width = t.width;
            t = this.height = t.height, this.renderer.setSize(e, t, this.ratio)
        }

        function i(t, e) {
            this.width = t, this.height = e, this.trigger(w.Events.resize, t, e)
        }

        function r() {
            for (var t = 0; t < w.Instances.length; t++) {
                var e = w.Instances[t];
                e.playing && e.update()
            }
            w.nextFrameID = F(r)
        }
        var s = "undefined" != typeof window ? window : "undefined" !=
            typeof global ? global : "undefined" != typeof self ? self : this,
            n = Object.prototype.toString,
            a = {
                _indexAmount: 0,
                natural: {
                    slice: Array.prototype.slice,
                    indexOf: Array.prototype.indexOf,
                    keys: Object.keys,
                    bind: Function.prototype.bind,
                    create: Object.create
                },
                identity: function(t) {
                    return t
                },
                isArguments: function(t) {
                    return "[object Arguments]" === n.call(t)
                },
                isFunction: function(t) {
                    return "[object Function]" === n.call(t)
                },
                isString: function(t) {
                    return "[object String]" === n.call(t)
                },
                isNumber: function(t) {
                    return "[object Number]" === n.call(t)
                },
                isDate: function(t) {
                    return "[object Date]" === n.call(t)
                },
                isRegExp: function(t) {
                    return "[object RegExp]" === n.call(t)
                },
                isError: function(t) {
                    return "[object Error]" === n.call(t)
                },
                isFinite: function(t) {
                    return isFinite(t) && !isNaN(parseFloat(t))
                },
                isNaN: function(t) {
                    return a.isNumber(t) && t !== +t
                },
                isBoolean: function(t) {
                    return !0 === t || !1 === t || "[object Boolean]" === n
                        .call(t)
                },
                isNull: function(t) {
                    return null === t
                },
                isUndefined: function(t) {
                    return void 0 === t
                },
                isEmpty: function(t) {
                    return null == t || (x && (a.isArray(t) || a.isString(
                            t) || a.isArguments(t)) ? 0 === t.length :
                        0 === a.keys(t).length)
                },
                isElement: function(t) {
                    return !(!t || 1 !== t.nodeType)
                },
                isArray: Array.isArray || function(t) {
                    return "[object Array]" === n.call(t)
                },
                isObject: function(t) {
                    var e = typeof t;
                    return "function" === e || "object" === e && !!t
                },
                toArray: function(t) {
                    return t ? a.isArray(t) ? m.call(t) : x(t) ? a.map(t, a
                        .identity) : a.values(t) : []
                },
                range: function(t, e, i) {
                    null == e && (e = t || 0, t = 0), i = i || 1, e = Math
                        .max(Math.ceil((e - t) / i), 0);
                    for (var r = Array(e), s = 0; s < e; s++, t += i) r[s] =
                        t;
                    return r
                },
                indexOf: function(t, e) {
                    if (a.natural.indexOf) return a.natural.indexOf.call(t,
                        e);
                    for (var i = 0; i < t.length; i++)
                        if (t[i] === e) return i;
                    return -1
                },
                has: function(t, e) {
                    return null != t && hasOwnProperty.call(t, e)
                },
                bind: function(t, e) {
                    var i = a.natural.bind;
                    if (i && t.bind === i) return i.apply(t, m.call(
                        arguments, 1));
                    var r = m.call(arguments, 2);
                    return function() {
                        t.apply(e, r)
                    }
                },
                extend: function(t) {
                    for (var e = m.call(arguments, 1), i = 0; i < e
                        .length; i++) {
                        var r, s = e[i];
                        for (r in s) t[r] = s[r]
                    }
                    return t
                },
                defaults: function(t) {
                    for (var e = m.call(arguments, 1), i = 0; i < e
                        .length; i++) {
                        var r, s = e[i];
                        for (r in s) void 0 === t[r] && (t[r] = s[r])
                    }
                    return t
                },
                keys: function(t) {
                    if (!a.isObject(t)) return [];
                    if (a.natural.keys) return a.natural.keys(t);
                    var e, i = [];
                    for (e in t) a.has(t, e) && i.push(e);
                    return i
                },
                values: function(t) {
                    for (var e = a.keys(t), i = [], r = 0; r < e
                        .length; r++) i.push(t[e[r]]);
                    return i
                },
                each: function(t, e, i) {
                    i = i || this;
                    for (var r = !x(t) && a.keys(t), s = (r || t).length,
                            n = 0; n < s; n++) {
                        var o = r ? r[n] : n;
                        e.call(i, t[o], o, t)
                    }
                    return t
                },
                map: function(t, e, i) {
                    i = i || this;
                    for (var r = !x(t) && a.keys(t), s = (r || t).length,
                            n = [], o = 0; o < s; o++) {
                        var l = r ? r[o] : o;
                        n[o] = e.call(i, t[l], l, t)
                    }
                    return n
                },
                once: function(t) {
                    var e = !1;
                    return function() {
                        return e ? t : (e = !0, t.apply(this,
                            arguments))
                    }
                },
                after: function(t, e) {
                    return function() {
                        for (; 1 > --t;) return e.apply(this, arguments)
                    }
                },
                uniqueId: function(t) {
                    var e = ++a._indexAmount + "";
                    return t ? t + e : e
                }
            },
            o = Math.sin,
            l = Math.cos,
            h = Math.sqrt,
            c = Math.abs,
            d = Math.PI,
            f = d / 2,
            u = Math.pow,
            _ = Math.min,
            g = Math.max,
            p = 0,
            m = a.natural.slice,
            y = s.performance && s.performance.now ? s.performance : Date,
            v = Math.pow(2, 53) - 1,
            x = function(t) {
                return "number" == typeof(t = null == t ? void 0 : t.length) &&
                    0 <= t && t <= v
            },
            b = {
                temp: s.document ? s.document.createElement("div") : {},
                hasEventListeners: a.isFunction(s.addEventListener),
                bind: function(t, e, i, r) {
                    return this.hasEventListeners ? t.addEventListener(e, i,
                        !!r) : t.attachEvent("on" + e, i), b
                },
                unbind: function(t, e, i, r) {
                    return b.hasEventListeners ? t.removeEventListeners(e,
                        i, !!r) : t.detachEvent("on" + e, i), b
                },
                getRequestAnimationFrame: function() {
                    var t = 0,
                        e = ["ms", "moz", "webkit", "o"],
                        i = s.requestAnimationFrame;
                    if (!i) {
                        for (var n = 0; n < e.length; n++) i = s[e[n] +
                            "RequestAnimationFrame"] || i;
                        i = i || function(e, i) {
                            var r = (new Date).getTime(),
                                n = Math.max(0, 16 - (r - t));
                            return i = s.setTimeout(function() {
                                e(r + n)
                            }, n), t = r + n, i
                        }
                    }
                    return i.init = a.once(r), i
                }
            },
            w = s.Gearing = function(t) {
                if (t = a.defaults(t || {}, {
                        fullscreen: !1,
                        width: 640,
                        height: 480,
                        type: w.Types.svg,
                        autostart: !1
                    }), a.each(t, function(t, e) {
                        /fullscreen/i.test(e) || /autostart/i.test(e) || (
                            this[e] = t)
                    }, this), a.isElement(t.domElement)) {
                    var r = t.domElement.tagName.toLowerCase();
                    /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/
                    .test(this.type + "-" + r) || (this.type = w.Types[r])
                }
                this.renderer = new w[this.type](this), w.Utils.setPlaying.call(
                        this, t.autostart), this.frameCount = 0, t.fullscreen ?
                    (r = a.bind(e, this), a.extend(document.body.style, {
                        overflow: "hidden",
                        margin: 0,
                        padding: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: "fixed"
                    }), a.extend(this.renderer.domElement.style, {
                        display: "block",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: "fixed"
                    }), b.bind(s, "resize", r), r()) : a.isElement(t
                    .domElement) || (this.renderer.setSize(t.width, t.height,
                            this.ratio), this.width = t.width, this.height = t
                        .height), this.renderer.bind(w.Events.resize, a.bind(i,
                        this)), this.scene = this.renderer.scene, w.Instances
                    .push(this), t.autostart && F.init()
            };
        a.extend(w, {
                root: s,
                nextFrameID: null,
                Array: s.Float32Array || Array,
                Types: {
                    webgl: "WebGLRenderer",
                    svg: "SVGRenderer",
                    canvas: "CanvasRenderer"
                },
                Version: "v0.7.0-beta.4",
                PublishDate: "2019-06-11T11:17:41-07:00",
                Identifier: "Gearing-",
                Events: {
                    play: "play",
                    pause: "pause",
                    update: "update",
                    render: "render",
                    resize: "resize",
                    change: "change",
                    remove: "remove",
                    insert: "insert",
                    order: "order",
                    load: "load"
                },
                Commands: {
                    move: "M",
                    line: "L",
                    curve: "C",
                    arc: "A",
                    close: "Z"
                },
                Resolution: 12,
                Instances: [],
                noConflict: function() {
                    return s.Gearing = t, w
                },
                uniqueId: function() {
                    var t = p;
                    return p++, t
                },
                Utils: a.extend(a, {
                    performance: y,
                    defineProperty: function(t) {
                        var e = "_" + t,
                            i = "_flag" + t.charAt(0)
                            .toUpperCase() + t.slice(1);
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            get: function() {
                                return this[e]
                            },
                            set: function(t) {
                                this[e] = t, this[
                                    i] = !0
                            }
                        })
                    },
                    Image: null,
                    isHeadless: !1,
                    shim: function(t, e) {
                        return w.CanvasRenderer.Utils.shim(t), a
                            .isUndefined(e) || (w.Utils.Image =
                                e), w.Utils.isHeadless = !0, t
                    },
                    release: function(t) {
                        if (a.isObject(t)) return a.isFunction(t
                                .unbind) && t.unbind(), t
                            .vertices && (a.isFunction(t
                                    .vertices.unbind) && t
                                .vertices.unbind(), a.each(t
                                    .vertices,
                                    function(t) {
                                        a.isFunction(t
                                                .unbind) &&
                                            t.unbind()
                                    })), t.children && a
                            .each(t.children, function(t) {
                                w.Utils.release(t)
                            }), t
                    },
                    xhr: function(t, e) {
                        var i = new XMLHttpRequest;
                        return i.open("GET", t), i
                            .onreadystatechange = function() {
                                4 === i.readyState && 200 === i
                                    .status && e(i.responseText)
                            }, i.send(), i
                    },
                    Curve: {
                        CollinearityEpsilon: u(10, -30),
                        RecursionLimit: 16,
                        CuspLimit: 0,
                        Tolerance: {
                            distance: .25,
                            angle: 0,
                            epsilon: Number.EPSILON
                        },
                        abscissas: [
                            [.5773502691896257],
                            [0, .7745966692414834],
                            [.33998104358485626,
                                .8611363115940526
                            ],
                            [0, .5384693101056831,
                                .906179845938664
                            ],
                            [.2386191860831969,
                                .6612093864662645,
                                .932469514203152
                            ],
                            [0, .4058451513773972,
                                .7415311855993945,
                                .9491079123427585
                            ],
                            [.1834346424956498,
                                .525532409916329,
                                .7966664774136267,
                                .9602898564975363
                            ],
                            [0, .3242534234038089,
                                .6133714327005904,
                                .8360311073266358,
                                .9681602395076261
                            ],
                            [.14887433898163122,
                                .4333953941292472,
                                .6794095682990244,
                                .8650633666889845,
                                .9739065285171717
                            ],
                            [0, .26954315595234496,
                                .5190961292068118,
                                .7301520055740494,
                                .8870625997680953,
                                .978228658146057
                            ],
                            [.1252334085114689,
                                .3678314989981802,
                                .5873179542866175,
                                .7699026741943047,
                                .9041172563704749,
                                .9815606342467192
                            ],
                            [0, .2304583159551348,
                                .44849275103644687,
                                .6423493394403402,
                                .8015780907333099,
                                .9175983992229779,
                                .9841830547185881
                            ],
                            [.10805494870734367,
                                .31911236892788974,
                                .5152486363581541,
                                .6872929048116855,
                                .827201315069765,
                                .9284348836635735,
                                .9862838086968123
                            ],
                            [0, .20119409399743451,
                                .3941513470775634,
                                .5709721726085388,
                                .7244177313601701,
                                .8482065834104272,
                                .937273392400706,
                                .9879925180204854
                            ],
                            [.09501250983763744,
                                .2816035507792589,
                                .45801677765722737,
                                .6178762444026438,
                                .755404408355003,
                                .8656312023878318,
                                .9445750230732326,
                                .9894009349916499
                            ]
                        ],
                        weights: [
                            [1],
                            [.8888888888888888,
                                .5555555555555556
                            ],
                            [.6521451548625461,
                                .34785484513745385
                            ],
                            [.5688888888888889,
                                .47862867049936647,
                                .23692688505618908
                            ],
                            [.46791393457269104,
                                .3607615730481386,
                                .17132449237917036
                            ],
                            [.4179591836734694,
                                .3818300505051189,
                                .27970539148927664,
                                .1294849661688697
                            ],
                            [.362683783378362,
                                .31370664587788727,
                                .22238103445337448,
                                .10122853629037626
                            ],
                            [.3302393550012598,
                                .31234707704000286,
                                .26061069640293544,
                                .1806481606948574,
                                .08127438836157441
                            ],
                            [.29552422471475287,
                                .26926671930999635,
                                .21908636251598204,
                                .1494513491505806,
                                .06667134430868814
                            ],
                            [.2729250867779006,
                                .26280454451024665,
                                .23319376459199048,
                                .18629021092773426,
                                .1255803694649046,
                                .05566856711617366
                            ],
                            [.24914704581340277,
                                .2334925365383548,
                                .20316742672306592,
                                .16007832854334622,
                                .10693932599531843,
                                .04717533638651183
                            ],
                            [.2325515532308739,
                                .22628318026289723,
                                .2078160475368885,
                                .17814598076194574,
                                .13887351021978725,
                                .09212149983772845,
                                .04048400476531588
                            ],
                            [.2152638534631578,
                                .2051984637212956,
                                .18553839747793782,
                                .15720316715819355,
                                .12151857068790319,
                                .08015808715976021,
                                .03511946033175186
                            ],
                            [.2025782419255613,
                                .19843148532711158,
                                .1861610000155622,
                                .16626920581699392,
                                .13957067792615432,
                                .10715922046717194,
                                .07036604748810812,
                                .03075324199611727
                            ],
                            [.1894506104550685,
                                .18260341504492358,
                                .16915651939500254,
                                .14959598881657674,
                                .12462897125553388,
                                .09515851168249279,
                                .062253523938647894,
                                .027152459411754096
                            ]
                        ]
                    },
                    devicePixelRatio: s.devicePixelRatio || 1,
                    getBackingStoreRatio: function(t) {
                        return t.webkitBackingStorePixelRatio ||
                            t.mozBackingStorePixelRatio || t
                            .msBackingStorePixelRatio || t
                            .oBackingStorePixelRatio || t
                            .backingStorePixelRatio || 1
                    },
                    getRatio: function(t) {
                        return w.Utils.devicePixelRatio / E(t)
                    },
                    setPlaying: function(t) {
                        return this.playing = !!t, this
                    },
                    getComputedMatrix: function(t, e) {
                        e = e && e.identity() || new w.Matrix;
                        var i = t;
                        for (t = []; i && i._matrix;) t.push(i
                            ._matrix), i = i.parent;
                        for (t.reverse(), i = 0; i < t
                            .length; i++) {
                            var r = t[i].elements;
                            e.multiply(r[0], r[1], r[2], r[3],
                                r[4], r[5], r[6], r[7], r[
                                8], r[9])
                        }
                        return e
                    },
                    deltaTransformPoint: function(t, e, i) {
                        return new w.Vector(e * t.a + i * t.c,
                            e * t.b + i * t.d)
                    },
                    decomposeMatrix: function(t) {
                        var e = w.Utils.deltaTransformPoint(t,
                                0, 1),
                            i = w.Utils.deltaTransformPoint(t,
                                1, 0);
                        return e = 180 / Math.PI * Math.atan2(e
                            .y, e.x) - 90, {
                            translateX: t.e,
                            translateY: t.f,
                            scaleX: Math.sqrt(t.a * t.a + t
                                .b * t.b),
                            scaleY: Math.sqrt(t.c * t.c + t
                                .d * t.d),
                            skewX: e,
                            skewY: 180 / Math.PI * Math
                                .atan2(i.y, i.x),
                            rotation: e
                        }
                    },
                    extractCSSText: function(t, e) {
                        e || (e = {}), t = t.split(";");
                        for (var i = 0; i < t.length; i++) {
                            var r = t[i].split(":"),
                                s = r[0];
                            r = r[1], a.isUndefined(s) || a
                                .isUndefined(r) || (e[s] = r
                                    .replace(/\s/, ""))
                        }
                        return e
                    },
                    getSvgStyles: function(t) {
                        for (var e = {}, i = w.Utils
                                .getSvgAttributes(t), r = Math
                                .max(i.length, t.style.length),
                                s = 0; s < r; s++) {
                            var n = t.style[s],
                                a = i[s];
                            n && (e[n] = t.style[n]), a && (e[
                                a] = t.getAttribute(a))
                        }
                        return e
                    },
                    getSvgAttributes: function(t) {
                        t = t.getAttributeNames();
                        for (var e = ["id", "class",
                                "transform", "xmlns",
                                "viewBox"
                            ], i = 0; i < e.length; i++) {
                            var r = a.indexOf(t, e[i]);
                            0 <= r && t.splice(r, 1)
                        }
                        return t
                    },
                    applySvgViewBox: function(t, e) {
                        var i = e.split(/\s/);
                        e = parseFloat(i[0]);
                        var r = parseFloat(i[1]),
                            s = parseFloat(i[2]);
                        return i = parseFloat(i[3]), s = Math
                            .min(this.width / s, this.height /
                                i), t.translation.x -= e * s, t
                            .translation.y -= r * s, t.scale =
                            s, t
                    },
                    applySvgAttributes: function(t, e, i) {
                        var r, n = {},
                            o = {},
                            l = {};
                        if (s.getComputedStyle) {
                            var h = s.getComputedStyle(t);
                            for (r = h.length; r--;) {
                                var c = h[r],
                                    d = h[c];
                                a.isUndefined(d) || (n[c] = d)
                            }
                        }
                        for (r = 0; r < t.attributes
                            .length; r++) d = t.attributes[r],
                            /style/i.test(d.nodeName) ? w.Utils
                            .extractCSSText(d.value, l) : o[d
                                .nodeName] = d.value;
                        for (c in a.isUndefined(n.opacity) || (
                                n["stroke-opacity"] = n.opacity,
                                n["fill-opacity"] = n.opacity,
                                delete n.opacity), i && a
                            .defaults(n, i), a.extend(n, o, l),
                            n.visible = !(a.isUndefined(n
                                .display) && /none/i.test(n
                                .display)) || a.isUndefined(n
                                .visibility) && /hidden/i.test(n
                                .visibility), n) switch (d = n[
                            c], c) {
                            case "transform":
                                if (/none/i.test(d)) break;
                                if (i = t.transform && t
                                    .transform.baseVal &&
                                    0 < t.transform.baseVal
                                    .length ? t.transform
                                    .baseVal[0].matrix : t
                                    .getCTM ? t.getCTM() :
                                    null, a.isNull(i))
                            break;
                                i = w.Utils.decomposeMatrix(
                                        i), e.translation
                                    .set(i.translateX, i
                                        .translateY), e
                                    .rotation = i.rotation,
                                    e.scale = new w.Vector(i
                                        .scaleX, i.scaleY),
                                    i = parseFloat((n.x +
                                        "").replace(
                                        "px")), o =
                                    parseFloat((n.y + "")
                                        .replace("px")),
                                    i && (e.translation.x =
                                        i), o && (e
                                        .translation.y = o);
                                break;
                            case "viewBox":
                                w.Utils.applySvgViewBox
                                    .call(this, e, d);
                                break;
                            case "visible":
                                e.visible = d;
                                break;
                            case "stroke-linecap":
                                e.cap = d;
                                break;
                            case "stroke-linejoin":
                                e.join = d;
                                break;
                            case "stroke-miterlimit":
                                e.miter = d;
                                break;
                            case "stroke-width":
                                e.linewidth = parseFloat(d);
                                break;
                            case "opacity":
                            case "stroke-opacity":
                            case "fill-opacity":
                                e instanceof w.Group || (e
                                    .opacity =
                                    parseFloat(d));
                                break;
                            case "fill":
                            case "stroke":
                                /url\(#.*\)/i.test(d) ? e[
                                    c] = this.getById(d
                                        .replace(
                                            /url\(#(.*)\)/i,
                                            "$1")) : e[c] =
                                    /none/i.test(d) ?
                                    "transparent" : d;
                                break;
                            case "id":
                                e.id = d;
                                break;
                            case "class":
                            case "className":
                                e.classList = d.split(" ")
                        }
                        return n
                    },
                    read: {
                        svg: function(t) {
                            var e = w.Utils.read.g.call(this,
                            t);
                            return t.getAttribute("viewBox"), e
                        },
                        g: function(t) {
                            for (var e = new w.Group, i = w
                                    .Utils.getSvgStyles.call(
                                        this, t), r = 0, s = t
                                    .childNodes.length; r <
                                s; r++) {
                                var n = t.childNodes[r],
                                    a = n.nodeName;
                                if (!a) return;
                                (a = a.replace(/svg:/gi, "")
                                    .toLowerCase()) in w.Utils
                                    .read && (n = w.Utils.read[
                                            a].call(e, n, i), e
                                        .add(n))
                            }
                            return e
                        },
                        polygon: function(t, e) {
                            var i = [];
                            t.getAttribute("points").replace(
                                /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,
                                function(t, e, r) {
                                    i.push(new w.Anchor(
                                        parseFloat(
                                            e),
                                        parseFloat(
                                            r)))
                                });
                            var r = new w.Path(i, !0)
                        .noStroke();
                            return r.fill = "black", w.Utils
                                .applySvgAttributes.call(this,
                                    t, r, e), r
                        },
                        polyline: function(t, e) {
                            return (t = w.Utils.read.polygon
                                    .call(this, t, e))
                                .closed = !1, t
                        },
                        path: function(t, e) {
                            var i, r, s = t.getAttribute("d"),
                                n = new w.Anchor,
                                o = !1,
                                l = !1,
                                h = s.match(
                                    /[a-df-z][^a-df-z]*/gi),
                                c = h.length - 1;
                            a.each(h.slice(0), function(t, e) {
                                var i, r, s = t[0],
                                    n = s.toLowerCase(),
                                    a = t.slice(1)
                                    .trim().split(
                                        /[\s,]+|(?=\s?[+\-])/
                                        ),
                                    o = [],
                                    l = !1;
                                for (i = 0; i < a
                                    .length; i++) {
                                    var c = a[i],
                                        d = c.indexOf(
                                            ".");
                                    if (d !== c
                                        .lastIndexOf(
                                            ".")) {
                                        for (d = (c = c
                                                .split(
                                                    ".")
                                                )[0] +
                                            "." + c[1],
                                            a.splice(i,
                                                1, d),
                                            d = 2; d < c
                                            .length; d++
                                            ) a.splice(
                                            i + d -
                                            1, 0,
                                            "0." +
                                            c[d]);
                                        l = !0
                                    }
                                }
                                switch (l && (t = s + a
                                        .join(",")),
                                    0 >= e && (h = []),
                                    n) {
                                    case "h":
                                    case "v":
                                        1 < a.length &&
                                            (r = 1);
                                        break;
                                    case "m":
                                    case "l":
                                    case "t":
                                        2 < a.length &&
                                            (r = 2);
                                        break;
                                    case "s":
                                    case "q":
                                        4 < a.length &&
                                            (r = 4);
                                        break;
                                    case "c":
                                        6 < a.length &&
                                            (r = 6);
                                        break;
                                    case "a":
                                        7 < a.length &&
                                            (r = 7)
                                }
                                if (r) {
                                    for (i = 0, e = a
                                        .length, n =
                                        0; i < e; i += r
                                        ) {
                                        if (t = s, 0 <
                                            n) switch (
                                            s) {
                                            case "m":
                                                t =
                                                "l";
                                                break;
                                            case "M":
                                                t = "L"
                                        }
                                        o.push(t + a
                                            .slice(
                                                i,
                                                i +
                                                r)
                                            .join(
                                                " ")
                                            ), n++
                                    }
                                    h = Array.prototype
                                        .concat.apply(h,
                                            o)
                                } else h.push(t)
                            });
                            var d = [];
                            if (a.each(h, function(t, e) {
                                    var s = t[0],
                                        h = s.toLowerCase();
                                    switch (r = (r = (r = t
                                                .slice(1)
                                                .trim())
                                            .replace(
                                                /(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g,
                                                function(t,
                                                    e, i) {
                                                    return parseFloat(
                                                            e
                                                            ) *
                                                        u(10,
                                                            i
                                                            )
                                                })).split(
                                            /[\s,]+|(?=\s?[+\-])/
                                            ), l = s === h,
                                        h) {
                                        case "z":
                                            if (e >= c)
                                                o = !0;
                                            else {
                                                var f = n.x;
                                                for (e = n
                                                    .y, f =
                                                    new w
                                                    .Anchor(
                                                        f,
                                                        e,
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        w
                                                        .Commands
                                                        .close
                                                        ),
                                                    e = d
                                                    .length -
                                                    1; 0 <=
                                                    e; e--)
                                                    if (h =
                                                        d[
                                                        e],
                                                        /m/i
                                                        .test(
                                                            h
                                                            .command
                                                            )
                                                        ) {
                                                        n =
                                                        h;
                                                        break
                                                    }
                                            }
                                            break;
                                        case "m":
                                        case "l":
                                            i = void 0, f =
                                                parseFloat(
                                                    r[0]),
                                                e =
                                                parseFloat(
                                                    r[1]),
                                                f = new w
                                                .Anchor(f,
                                                    e,
                                                    void 0,
                                                    void 0,
                                                    void 0,
                                                    void 0,
                                                    /m/i
                                                    .test(
                                                    h) ? w
                                                    .Commands
                                                    .move :
                                                    w
                                                    .Commands
                                                    .line),
                                                l && f
                                                .addSelf(n),
                                                n = f;
                                            break;
                                        case "h":
                                        case "v":
                                            e = /h/i.test(
                                                h) ? "x" :
                                                "y", h =
                                                /x/i.test(
                                                e) ? "y" :
                                                "x", (f =
                                                    new w
                                                    .Anchor(
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        void 0,
                                                        w
                                                        .Commands
                                                        .line
                                                        ))[
                                                    e] =
                                                parseFloat(
                                                    r[0]),
                                                f[h] = n[h],
                                                l && (f[
                                                    e] += n[
                                                        e]),
                                                n = f;
                                            break;
                                        case "c":
                                        case "s":
                                            if (f = n.x, e =
                                                n.y, i || (
                                                    i =
                                                    new w
                                                    .Vector
                                                    ), /c/i
                                                .test(h)) {
                                                s = parseFloat(
                                                    r[0]
                                                    );
                                                var _ =
                                                    parseFloat(
                                                        r[1]
                                                        ),
                                                    g =
                                                    parseFloat(
                                                        r[2]
                                                        ),
                                                    p =
                                                    parseFloat(
                                                        r[3]
                                                        );
                                                h = parseFloat(
                                                        r[4]
                                                        ),
                                                    t =
                                                    parseFloat(
                                                        r[5]
                                                        )
                                            } else s = (h =
                                                    M(n, i,
                                                        l))
                                                .x, _ = h.y,
                                                g =
                                                parseFloat(
                                                    r[0]),
                                                p =
                                                parseFloat(
                                                    r[1]),
                                                h =
                                                parseFloat(
                                                    r[2]),
                                                t =
                                                parseFloat(
                                                    r[3]);
                                            l && (s += f,
                                                    _ += e,
                                                    g += f,
                                                    p += e,
                                                    h += f,
                                                    t += e),
                                                a.isObject(n
                                                    .controls
                                                    ) || w
                                                .Anchor
                                                .AppendCurveProperties(
                                                    n), n
                                                .controls
                                                .right.set(
                                                    s - n.x,
                                                    _ - n.y
                                                    ), n =
                                                f = new w
                                                .Anchor(h,
                                                    t, g -
                                                    h, p -
                                                    t,
                                                    void 0,
                                                    void 0,
                                                    w
                                                    .Commands
                                                    .curve),
                                                i = f
                                                .controls
                                                .left;
                                            break;
                                        case "t":
                                        case "q":
                                            f = n.x, e = n
                                                .y, i || (
                                                    i =
                                                    new w
                                                    .Vector
                                                    ), i
                                                .isZero() ?
                                                (s = f, _ =
                                                    e) : (
                                                    s = i.x,
                                                    _ = i.y
                                                    ), /q/i
                                                .test(h) ? (
                                                    g =
                                                    parseFloat(
                                                        r[0]
                                                        ),
                                                    p =
                                                    parseFloat(
                                                        r[1]
                                                        ),
                                                    h =
                                                    parseFloat(
                                                        r[2]
                                                        ),
                                                    t =
                                                    parseFloat(
                                                        r[3]
                                                        )) :
                                                (g = (h = M(n,
                                                        i,
                                                        l
                                                        ))
                                                    .x, p =
                                                    h.y, h =
                                                    parseFloat(
                                                        r[0]
                                                        ),
                                                    t =
                                                    parseFloat(
                                                        r[1]
                                                        )),
                                                l && (s +=
                                                    f, _ +=
                                                    e, g +=
                                                    f, p +=
                                                    e, h +=
                                                    f, t +=
                                                    e), a
                                                .isObject(n
                                                    .controls
                                                    ) || w
                                                .Anchor
                                                .AppendCurveProperties(
                                                    n), n
                                                .controls
                                                .right.set(
                                                    s - n.x,
                                                    _ - n.y
                                                    ), n =
                                                f = new w
                                                .Anchor(h,
                                                    t, g -
                                                    h, p -
                                                    t,
                                                    void 0,
                                                    void 0,
                                                    w
                                                    .Commands
                                                    .curve),
                                                i = f
                                                .controls
                                                .left;
                                            break;
                                        case "a":
                                            f = n.x, e = n
                                                .y, s =
                                                parseFloat(
                                                    r[0]),
                                                _ =
                                                parseFloat(
                                                    r[1]),
                                                g =
                                                parseFloat(
                                                    r[2]),
                                                p =
                                                parseFloat(
                                                    r[3]);
                                            var m =
                                                parseFloat(
                                                    r[4]);
                                            h = parseFloat(
                                                    r[5]),
                                                t =
                                                parseFloat(
                                                    r[6]),
                                                l && (h +=
                                                    f, t +=
                                                    e), (e =
                                                    new w
                                                    .Anchor(
                                                        h, t
                                                        ))
                                                .command = w
                                                .Commands
                                                .arc, e.rx =
                                                s, e.ry = _,
                                                e
                                                .xAxisRotation =
                                                g, e
                                                .largeArcFlag =
                                                p, e
                                                .sweepFlag =
                                                m, n = f =
                                                e, i =
                                                void 0
                                    }
                                    f && (a.isArray(f) ? d =
                                        d.concat(f) : d
                                        .push(f))
                                }), !(1 >= d.length)) {
                                (s = new w.Path(d, o, void 0, !
                                    0).noStroke()).fill =
                                    "black";
                                var f = s.getBoundingClientRect(
                                    !0);
                                return f.centroid = {
                                        x: f.left + f.width / 2,
                                        y: f.top + f.height / 2
                                    }, a.each(s.vertices,
                                        function(t) {
                                            t.subSelf(f
                                                .centroid)
                                        }), s.translation
                                    .addSelf(f.centroid), w
                                    .Utils.applySvgAttributes
                                    .call(this, t, s, e), s
                            }
                        },
                        circle: function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "cx")),
                                r = parseFloat(t.getAttribute(
                                    "cy")),
                                s = parseFloat(t.getAttribute(
                                    "r"));
                            return (i = new w.Circle(i, r, s)
                                    .noStroke()).fill = "black",
                                w.Utils.applySvgAttributes.call(
                                    this, t, i, e), i
                        },
                        ellipse: function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "cx")),
                                r = parseFloat(t.getAttribute(
                                    "cy")),
                                s = parseFloat(t.getAttribute(
                                    "rx")),
                                n = parseFloat(t.getAttribute(
                                    "ry"));
                            return (i = new w.Ellipse(i, r, s,
                                    n).noStroke()).fill =
                                "black", w.Utils
                                .applySvgAttributes.call(this,
                                    t, i, e), i
                        },
                        rect: function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "rx")),
                                r = parseFloat(t.getAttribute(
                                    "ry"));
                            if (!a.isNaN(i) || !a.isNaN(r))
                                return w.Utils.read[
                                    "rounded-rect"](t);
                            i = parseFloat(t.getAttribute(
                                "x")) || 0, r = parseFloat(t
                                    .getAttribute("y")) || 0;
                            var s = parseFloat(t.getAttribute(
                                    "width")),
                                n = parseFloat(t.getAttribute(
                                    "height"));
                            return (i = new w.Rectangle(i + s /
                                        2, r + n / 2, s, n)
                                    .noStroke()).fill = "black",
                                w.Utils.applySvgAttributes.call(
                                    this, t, i, e), i
                        },
                        "rounded-rect": function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "x")) || 0,
                                r = parseFloat(t.getAttribute(
                                    "y")) || 0,
                                s = parseFloat(t.getAttribute(
                                    "rx")) || 0,
                                n = parseFloat(t.getAttribute(
                                    "ry")) || 0,
                                a = parseFloat(t.getAttribute(
                                    "width")),
                                o = parseFloat(t.getAttribute(
                                    "height")),
                                l = a / 2,
                                h = o / 2;
                            return s = new w.Vector(s, n), (i =
                                    new w.RoundedRectangle(i +
                                        l, r + h, a, o, s)
                                    .noStroke()).fill = "black",
                                w.Utils.applySvgAttributes.call(
                                    this, t, i, e), i
                        },
                        line: function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "x1")),
                                r = parseFloat(t.getAttribute(
                                    "y1")),
                                s = parseFloat(t.getAttribute(
                                    "x2")),
                                n = parseFloat(t.getAttribute(
                                    "y2"));
                            return i = new w.Line(i, r, s, n)
                                .noFill(), w.Utils
                                .applySvgAttributes.call(this,
                                    t, i, e), i
                        },
                        lineargradient: function(t, e) {
                            for (var i = parseFloat(t
                                        .getAttribute("x1")),
                                    r = parseFloat(t
                                        .getAttribute("y1")),
                                    s = parseFloat(t
                                        .getAttribute("x2")),
                                    n = parseFloat(t
                                        .getAttribute("y2")),
                                    o = (s + i) / 2, l = (n +
                                    r) / 2, h = [], c = 0; c < t
                                .children.length; c++) {
                                var d = t.children[c],
                                    f = parseFloat(d
                                        .getAttribute("offset")
                                        ),
                                    u = d.getAttribute(
                                        "stop-color"),
                                    _ = d.getAttribute(
                                        "stop-opacity");
                                if (d = d.getAttribute("style"),
                                    a.isNull(u)) {
                                    var g = !!d && d.match(
                                        /stop\-color:\s?([#a-fA-F0-9]*)/
                                        );
                                    u = g && 1 < g.length ? g[
                                        1] : void 0
                                }
                                a.isNull(_) && (_ = (g = !!d &&
                                        d.match(
                                            /stop\-opacity:\s?([0-9\.\-]*)/
                                            )) && 1 < g
                                    .length ? parseFloat(g[
                                        1]) : 1), h.push(
                                    new w.Gradient.Stop(f,
                                        u, _))
                            }
                            return i = new w.LinearGradient(i -
                                    o, r - l, s - o, n - l, h),
                                w.Utils.applySvgAttributes.call(
                                    this, t, i, e), i
                        },
                        radialgradient: function(t, e) {
                            var i = parseFloat(t.getAttribute(
                                    "cx")) || 0,
                                r = parseFloat(t.getAttribute(
                                    "cy")) || 0,
                                s = parseFloat(t.getAttribute(
                                    "r")),
                                n = parseFloat(t.getAttribute(
                                    "fx")),
                                o = parseFloat(t.getAttribute(
                                    "fy"));
                            a.isNaN(n) && (n = i), a.isNaN(o) &&
                                (o = r);
                            for (var l = c(i + n) / 2, h = c(r +
                                    o) / 2, d = [], f = 0; f < t
                                .children.length; f++) {
                                var u = t.children[f],
                                    _ = parseFloat(u
                                        .getAttribute("offset")
                                        ),
                                    g = u.getAttribute(
                                        "stop-color"),
                                    p = u.getAttribute(
                                        "stop-opacity");
                                if (u = u.getAttribute("style"),
                                    a.isNull(g)) {
                                    var m = !!u && u.match(
                                        /stop\-color:\s?([#a-fA-F0-9]*)/
                                        );
                                    g = m && 1 < m.length ? m[
                                        1] : void 0
                                }
                                a.isNull(p) && (p = (m = !!u &&
                                        u.match(
                                            /stop\-opacity:\s?([0-9\.\-]*)/
                                            )) && 1 < m
                                    .length ? parseFloat(m[
                                        1]) : 1), d.push(
                                    new w.Gradient.Stop(_,
                                        g, p))
                            }
                            return i = new w.RadialGradient(i -
                                    l, r - h, s, d, n - l, o - h
                                    ), w.Utils
                                .applySvgAttributes.call(this,
                                    t, i, e), i
                        }
                    },
                    subdivide: function(t, e, i, r, s, n, a, o, l) {
                        if (l = l || w.Utils.Curve
                            .RecursionLimit, l += 1, .001 > c(
                                t - a) && .001 > c(e - o))
                            return [new w.Anchor(a, o)];
                        for (var h = [], d = 0; d < l; d++) {
                            var f = d / l,
                                u = C(f, t, i, s, a);
                            f = C(f, e, r, n, o), h.push(new w
                                .Anchor(u, f))
                        }
                        return h
                    },
                    getComponentOnCubicBezier: function(t, e, i, r,
                        s) {
                        var n = 1 - t;
                        return n * n * n * e + 3 * n * n * t *
                            i + 3 * n * t * t * r + t * t * t *
                            s
                    },
                    getCurveLength: function(t, e, i, r, s, n, a, o,
                        l) {
                        if (t === i && e === r && s === a &&
                            n === o) return h((t = a - t) * t +
                            (e = o - e) * e);
                        var c = 9 * (i - s) + 3 * (a - t),
                            d = 6 * (t + s) - 12 * i,
                            f = 3 * (i - t),
                            u = 9 * (r - n) + 3 * (o - e),
                            _ = 6 * (e + n) - 12 * r,
                            g = 3 * (r - e);
                        return R(function(t) {
                                var e = (c * t + d) * t + f;
                                return h(e * e + (t = (u *
                                        t + _) * t +
                                    g) * t)
                            }, 0, 1, l || w.Utils.Curve
                            .RecursionLimit)
                    },
                    getCurveBoundingBox: function(t, e, i, r, s, n,
                        a, o) {
                        for (var l, h, d, f, u = [], _ = [
                                [],
                                []
                            ], g = 0; 2 > g; ++g) 0 == g ? (h =
                                6 * t - 12 * i + 6 * s, l = -3 *
                                t + 9 * i - 9 * s + 3 * a, d =
                                3 * i - 3 * t) : (h = 6 * e -
                                12 * r + 6 * n, l = -3 * e + 9 *
                                r - 9 * n + 3 * o, d = 3 * r -
                                3 * e), 1e-12 > c(l) ? 1e-12 >
                            c(h) || 0 < (l = -d / h) && 1 > l &&
                            u.push(l) : (f = h * h - 4 * d * l,
                                d = Math.sqrt(f), 0 > f || (0 <
                                    (f = (-h + d) / (2 * l)) &&
                                    1 > f && u.push(f), 0 < (l =
                                        (-h - d) / (2 * l)) &&
                                    1 > l && u.push(l)));
                        for (h = g = u.length; g--;) d = 1 - (
                                l = u[g]), _[0][g] = d * d * d *
                            t + 3 * d * d * l * i + 3 * d * l *
                            l * s + l * l * l * a, _[1][g] = d *
                            d * d * e + 3 * d * d * l * r + 3 *
                            d * l * l * n + l * l * l * o;
                        return _[0][h] = t, _[1][h] = e, _[0][
                                h + 1
                            ] = a, _[1][h + 1] = o, _[0]
                            .length = _[1].length = h + 2, {
                                min: {
                                    x: Math.min.apply(0, _[0]),
                                    y: Math.min.apply(0, _[1])
                                },
                                max: {
                                    x: Math.max.apply(0, _[0]),
                                    y: Math.max.apply(0, _[1])
                                }
                            }
                    },
                    integrate: function(t, e, i, r) {
                        var s = w.Utils.Curve.abscissas[r - 2],
                            n = w.Utils.Curve.weights[r - 2];
                        e = (i = .5 * (i - e)) + e;
                        var a = 0,
                            o = r + 1 >> 1;
                        for (r = 1 & r ? n[a++] * t(e) : 0; a <
                            o;) {
                            var l = i * s[a];
                            r += n[a++] * (t(e + l) + t(e - l))
                        }
                        return i * r
                    },
                    getCurveFromPoints: function(t, e) {
                        for (var i = t.length, r = i - 1, s =
                            0; s < i; s++) {
                            var n = t[s];
                            a.isObject(n.controls) || w.Anchor
                                .AppendCurveProperties(n);
                            var o = e ? k(s - 1, i) : g(s - 1,
                                    0),
                                l = e ? k(s + 1, i) : _(s + 1,
                                    r);
                            S(t[o], n, t[l]), n.command = 0 ===
                                s ? w.Commands.move : w.Commands
                                .curve
                        }
                    },
                    getControlPoints: function(t, e, i) {
                        var r = w.Vector.angleBetween(t, e),
                            s = w.Vector.angleBetween(i, e);
                        t = w.Vector.distanceBetween(t, e), i =
                            w.Vector.distanceBetween(i, e);
                        var n = (r + s) / 2;
                        return 1e-4 > t || 1e-4 > i ? (a
                            .isBoolean(e.relative) && !e
                            .relative && (e.controls.left
                                .copy(e), e.controls.right
                                .copy(e)), e) : (t *= .33,
                            i *= .33, n = s < r ? n + f :
                            n - f, e.controls.left.x = l(
                            n) * t, e.controls.left.y = o(
                            n) * t, n -= d, e.controls.right
                            .x = l(n) * i, e.controls.right
                            .y = o(n) * i, a.isBoolean(e
                                .relative) && !e.relative &&
                            (e.controls.left.x += e.x, e
                                .controls.left.y += e.y, e
                                .controls.right.x += e.x, e
                                .controls.right.y += e.y), e
                            )
                    },
                    getReflection: function(t, e, i) {
                        return new w.Vector(2 * t.x - (e.x + t
                                .x) - (i ? t.x : 0), 2 * t
                            .y - (e.y + t.y) - (i ? t.y : 0)
                            )
                    },
                    getAnchorsFromArcData: function(t, e, i, r, s,
                        n, o) {
                        (new w.Matrix).translate(t.x, t.y)
                            .rotate(e);
                        var l = w.Resolution;
                        return a.map(a.range(l), function(t) {
                            return t = (t + 1) / l, o &&
                                (t = 1 - t), t = t * n +
                                s, t = new w.Anchor(i *
                                    Math.cos(t), r *
                                    Math.sin(t)), w
                                .Anchor
                                .AppendCurveProperties(
                                    t), t.command = w
                                .Commands.line, t
                        })
                    },
                    lerp: function(t, e, i) {
                        return i * (e - t) + t
                    },
                    toFixed: function(t) {
                        return Math.floor(1e3 * t) / 1e3
                    },
                    mod: function(t, e) {
                        for (; 0 > t;) t += e;
                        return t % e
                    },
                    Collection: function() {
                        Array.call(this), 1 < arguments.length ?
                            Array.prototype.push.apply(this,
                                arguments) : arguments[0] &&
                            Array.isArray(arguments[0]) && Array
                            .prototype.push.apply(this,
                                arguments[0])
                    },
                    Error: function(t) {
                        this.name = "Gearing.js", this.message =
                            t
                    },
                    Events: {
                        on: function(t, e) {
                            return this._events || (this
                                ._events = {}), (this
                                ._events[t] || (this
                                    ._events[t] = [])).push(
                                e), this
                        },
                        off: function(t, e) {
                            if (!this._events) return this;
                            if (!t && !e) return this
                            ._events = {}, this;
                            for (var i = t ? [t] : a.keys(this
                                        ._events), r = 0, s = i
                                    .length; r < s; r++) {
                                t = i[r];
                                var n = this._events[t];
                                if (n) {
                                    var o = [];
                                    if (e)
                                        for (var l = 0, h = n
                                                .length; l <
                                            h; l++) {
                                            var c = n[l];
                                            c = c.handler ? c
                                                .handler : c,
                                                e && e !== c &&
                                                o.push(c)
                                        }
                                    this._events[t] = o
                                }
                            }
                            return this
                        },
                        trigger: function(t) {
                            if (!this._events) return this;
                            var e = m.call(arguments, 1),
                                i = this._events[t];
                            return i && A(this, i, e), this
                        },
                        listen: function(t, e, i) {
                            return t && t.on(e, ev), this
                        },
                        ignore: function(t, e, i) {
                            return t.off(e, i), this
                        }
                    }
                })
            }), w.Utils.Events.bind = w.Utils.Events.on, w.Utils.Events.unbind =
            w.Utils.Events.off;
        var A = function(t, e, i) {
            switch (i.length) {
                case 0:
                    var r = function(r) {
                        e[r].call(t, i[0])
                    };
                    break;
                case 1:
                    r = function(r) {
                        e[r].call(t, i[0], i[1])
                    };
                    break;
                case 2:
                    r = function(r) {
                        e[r].call(t, i[0], i[1], i[2])
                    };
                    break;
                case 3:
                    r = function(r) {
                        e[r].call(t, i[0], i[1], i[2], i[3])
                    };
                    break;
                default:
                    r = function(r) {
                        e[r].apply(t, i)
                    }
            }
            for (var s = 0; s < e.length; s++) r(s)
        };
        w.Utils.Error.prototype = Error(), w.Utils.Error.prototype.constructor =
            w.Utils.Error, w.Utils.Collection.prototype = [], w.Utils.Collection
            .prototype.constructor = w.Utils.Collection, a.extend(w.Utils
                .Collection.prototype, w.Utils.Events, {
                    pop: function() {
                        var t = Array.prototype.pop.apply(this, arguments);
                        return this.trigger(w.Events.remove, [t]), t
                    },
                    shift: function() {
                        var t = Array.prototype.shift.apply(this,
                        arguments);
                        return this.trigger(w.Events.remove, [t]), t
                    },
                    push: function() {
                        var t = Array.prototype.push.apply(this, arguments);
                        return this.trigger(w.Events.insert, arguments), t
                    },
                    unshift: function() {
                        var t = Array.prototype.unshift.apply(this,
                            arguments);
                        return this.trigger(w.Events.insert, arguments), t
                    },
                    splice: function() {
                        var t = Array.prototype.splice.apply(this,
                            arguments);
                        if (this.trigger(w.Events.remove, t), 2 < arguments
                            .length) {
                            var e = this.slice(arguments[0], arguments[0] +
                                arguments.length - 2);
                            this.trigger(w.Events.insert, e), this.trigger(w
                                .Events.order)
                        }
                        return t
                    },
                    sort: function() {
                        return Array.prototype.sort.apply(this, arguments),
                            this.trigger(w.Events.order), this
                    },
                    reverse: function() {
                        return Array.prototype.reverse.apply(this,
                                arguments), this.trigger(w.Events.order),
                            this
                    }
                });
        var S = w.Utils.getControlPoints,
            k = w.Utils.mod,
            E = w.Utils.getBackingStoreRatio,
            C = w.Utils.getComponentOnCubicBezier,
            R = w.Utils.integrate,
            M = w.Utils.getReflection;
        a.extend(w.prototype, w.Utils.Events, {
            constructor: w,
            appendTo: function(t) {
                return t.appendChild(this.renderer.domElement), this
            },
            play: function() {
                return w.Utils.setPlaying.call(this, !0), F.init(),
                    this.trigger(w.Events.play)
            },
            pause: function() {
                return this.playing = !1, this.trigger(w.Events
                    .pause)
            },
            update: function() {
                var t = !!this._lastFrame,
                    e = y.now();
                t && (this.timeDelta = parseFloat((e - this
                        ._lastFrame).toFixed(3))), this._lastFrame =
                    e, t = this.width, e = this.height;
                var i = this.renderer;
                return t === i.width && e === i.height || i.setSize(
                        t, e, this.ratio), this.trigger(w.Events
                        .update, this.frameCount, this.timeDelta),
                    this.render()
            },
            render: function() {
                return this.renderer.render(), this.trigger(w.Events
                    .render, this.frameCount++)
            },
            add: function(t) {
                var e = t;
                return e instanceof Array || (e = a.toArray(
                    arguments)), this.scene.add(e), this
            },
            remove: function(t) {
                var e = t;
                return e instanceof Array || (e = a.toArray(
                    arguments)), this.scene.remove(e), this
            },
            clear: function() {
                return this.scene.remove(this.scene.children), this
            },
            makeLine: function(t, e, i, r) {
                return t = new w.Line(t, e, i, r), this.scene.add(
                    t), t
            },
            makeArrow: function(t, e, i, r, s) {
                s = a.isNumber(s) ? s : 10;
                var n = Math.atan2(r - e, i - t);
                return t = [new w.Anchor(t, e, void 0, void 0,
                            void 0, void 0, w.Commands.move), new w
                        .Anchor(i, r, void 0, void 0, void 0,
                            void 0, w.Commands.line), new w.Anchor(
                            i - s * Math.cos(n - Math.PI / 4), r -
                            s * Math.sin(n - Math.PI / 4), void 0,
                            void 0, void 0, void 0, w.Commands.line
                            ), new w.Anchor(i, r, void 0, void 0,
                            void 0, void 0, w.Commands.move), new w
                        .Anchor(i - s * Math.cos(n + Math.PI / 4),
                            r - s * Math.sin(n + Math.PI / 4),
                            void 0, void 0, void 0, void 0, w
                            .Commands.line)
                    ], (t = new w.Path(t, !1, !1, !0)).noFill(), t
                    .cap = "round", t.join = "round", this.scene
                    .add(t), t
            },
            makeRectangle: function(t, e, i, r) {
                return t = new w.Rectangle(t, e, i, r), this.scene
                    .add(t), t
            },
            makeRoundedRectangle: function(t, e, i, r, s) {
                return t = new w.RoundedRectangle(t, e, i, r, s),
                    this.scene.add(t), t
            },
            makeCircle: function(t, e, i) {
                return t = new w.Circle(t, e, i), this.scene.add(t),
                    t
            },
            makeEllipse: function(t, e, i, r) {
                return t = new w.Ellipse(t, e, i, r), this.scene
                    .add(t), t
            },
            makeStar: function(t, e, i, r, s) {
                return t = new w.Star(t, e, i, r, s), this.scene
                    .add(t), t
            },
            makeCurve: function(t) {
                var e = arguments.length,
                    i = t;
                if (!a.isArray(t)) {
                    i = [];
                    for (var r = 0; r < e; r += 2) {
                        var s = arguments[r];
                        if (!a.isNumber(s)) break;
                        i.push(new w.Anchor(s, arguments[r + 1]))
                    }
                }
                return e = arguments[e - 1], e = (i = new w.Path(i,
                        !(a.isBoolean(e) && e), !0))
                    .getBoundingClientRect(), i.center().translation
                    .set(e.left + e.width / 2, e.top + e.height /
                    2), this.scene.add(i), i
            },
            makePolygon: function(t, e, i, r) {
                return t = new w.Polygon(t, e, i, r), this.scene
                    .add(t), t
            },
            makeArcSegment: function(t, e, i, r, s, n, a) {
                return t = new w.ArcSegment(t, e, i, r, s, n, a),
                    this.scene.add(t), t
            },
            makePath: function(t) {
                var e = arguments.length,
                    i = t;
                if (!a.isArray(t)) {
                    i = [];
                    for (var r = 0; r < e; r += 2) {
                        var s = arguments[r];
                        if (!a.isNumber(s)) break;
                        i.push(new w.Anchor(s, arguments[r + 1]))
                    }
                }
                return e = arguments[e - 1], e = (i = new w.Path(i,
                        !(a.isBoolean(e) && e)))
                    .getBoundingClientRect(), i.center().translation
                    .set(e.left + e.width / 2, e.top + e.height /
                    2), this.scene.add(i), i
            },
            makeText: function(t, e, i, r) {
                return t = new w.Text(t, e, i, r), this.add(t), t
            },
            makeLinearGradient: function(t, e, i, r) {
                var s = m.call(arguments, 4);
                return s = new w.LinearGradient(t, e, i, r, s), this
                    .add(s), s
            },
            makeRadialGradient: function(t, e, i) {
                var r = m.call(arguments, 3);
                return r = new w.RadialGradient(t, e, i, r), this
                    .add(r), r
            },
            makeSprite: function(t, e, i, r, s, n, a) {
                return t = new w.Sprite(t, e, i, r, s, n), a && t
                    .play(), this.add(t), t
            },
            makeImageSequence: function(t, e, i, r, s) {
                return t = new w.ImageSequence(t, e, i, r), s && t
                    .play(), this.add(t), t
            },
            makeTexture: function(t, e) {
                return new w.Texture(t, e)
            },
            makeGroup: function(t) {
                var e = t;
                e instanceof Array || (e = a.toArray(arguments));
                var i = new w.Group;
                return this.scene.add(i), i.add(e), i
            },
            interpret: function(t, e, i) {
                var r = t.tagName.toLowerCase();
                return i = void 0 === i || i, r in w.Utils.read ? (
                    t = w.Utils.read[r].call(this, t), i && this
                    .add(e && t instanceof w.Group ? t
                        .children : t), t) : null
            },
            load: function(t, e) {
                var i, r, s, n = new w.Group,
                    o = a.bind(function(t) {
                        for (b.temp.innerHTML = t, r = 0; r < b
                            .temp.children.length; r++)
                            if (i = b.temp.children[r], /svg/i
                                .test(i.nodeName))
                                for (s = 0; s < i.children
                                    .length; s++) n.add(this
                                    .interpret(i.children[
                                        s]));
                            else n.add(this.interpret(i));
                        a.isFunction(e) && e(n, 1 >= b.temp
                            .children.length ? b.temp
                            .children[0] : b.temp.children)
                    }, this);
                return /.*\.svg$/gi.test(t) ? (w.Utils.xhr(t, o),
                    n) : (o(t), n)
            }
        });
        var F = b.getRequestAnimationFrame();
        return "undefined" != typeof module && module.exports ? module.exports =
            w : "function" == typeof define && define.amd && define("Gearing",
            [], function() {
                return w
            }), w
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils;
        t = t.Registry = function() {
            this.map = {}
        }, e.extend(t.prototype, {
            constructor: t,
            add: function(t, e) {
                return this.map[t] = e, this
            },
            remove: function(t) {
                return delete this.map[t], this
            },
            get: function(t) {
                return this.map[t]
            },
            contains: function(t) {
                return t in this.map
            }
        })
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.Vector = function(t, e) {
                this.x = t || 0, this.y = e || 0
            };
        e.extend(i, {
            zero: new t.Vector,
            add: function(t, e) {
                return new i(t.x + e.x, t.y + e.y)
            },
            sub: function(t, e) {
                return new i(t.x - e.x, t.y - e.y)
            },
            subtract: function(t, e) {
                return i.sub(t, e)
            },
            ratioBetween: function(t, e) {
                return (t.x * e.x + t.y * e.y) / (t.length() * e
                    .length())
            },
            angleBetween: function(t, e) {
                if (4 <= arguments.length) {
                    var i = arguments[0] - arguments[2],
                        r = arguments[1] - arguments[3];
                    return Math.atan2(r, i)
                }
                return i = t.x - e.x, r = t.y - e.y, Math.atan2(r,
                    i)
            },
            distanceBetween: function(t, e) {
                return Math.sqrt(i.distanceBetweenSquared(t, e))
            },
            distanceBetweenSquared: function(t, e) {
                var i = t.x - e.x;
                return i * i + (t = t.y - e.y) * t
            },
            MakeObservable: function(i) {
                i.bind = i.on = function() {
                    return this._bound || (this._x = this.x,
                            this._y = this.y, Object
                            .defineProperty(this, "x", s),
                            Object.defineProperty(this, "y", n),
                            e.extend(this, r), this._bound = !0
                            ), t.Utils.Events.bind.apply(this,
                            arguments), this
                }
            }
        }), e.extend(i.prototype, t.Utils.Events, {
            constructor: i,
            set: function(t, e) {
                return this.x = t, this.y = e, this
            },
            copy: function(t) {
                return this.x = t.x, this.y = t.y, this
            },
            clear: function() {
                return this.y = this.x = 0, this
            },
            clone: function() {
                return new i(this.x, this.y)
            },
            add: function(t, i) {
                return 0 >= arguments.length || (1 >= arguments
                    .length ? e.isNumber(t) ? (this.x += t, this
                        .y += t) : t && e.isNumber(t.x) && e
                    .isNumber(t.y) && (this.x += t.x, this.y +=
                        t.y) : (this.x += t, this.y += i)), this
            },
            addSelf: function(t) {
                return this.add.apply(this, arguments)
            },
            sub: function(t, i) {
                return 0 >= arguments.length || (1 >= arguments
                    .length ? e.isNumber(t) ? (this.x -= t, this
                        .y -= t) : t && e.isNumber(t.x) && e
                    .isNumber(t.y) && (this.x -= t.x, this.y -=
                        t.y) : (this.x -= t, this.y -= i)), this
            },
            subtract: function() {
                return this.sub.apply(this, arguments)
            },
            subSelf: function(t) {
                return this.sub.apply(this, arguments)
            },
            subtractSelf: function(t) {
                return this.sub.apply(this, arguments)
            },
            multiply: function(t, i) {
                return 0 >= arguments.length || (1 >= arguments
                    .length ? e.isNumber(t) ? (this.x *= t, this
                        .y *= t) : t && e.isNumber(t.x) && e
                    .isNumber(t.y) && (this.x *= t.x, this.y *=
                        t.y) : (this.x *= t, this.y *= i)), this
            },
            multiplySelf: function(t) {
                return this.multiply.apply(this, arguments)
            },
            multiplyScalar: function(t) {
                return this.multiply(t)
            },
            divide: function(t, i) {
                return 0 >= arguments.length ? this : (1 >=
                    arguments.length ? e.isNumber(t) ? (this
                        .x /= t, this.y /= t) : t && e.isNumber(
                        t.x) && e.isNumber(t.y) && (this.x /= t
                        .x, this.y /= t.y) : (this.x /= t, this
                        .y /= i), e.isNaN(this.x) && (this.x =
                        0), e.isNaN(this.y) && (this.y = 0),
                    this)
            },
            divideSelf: function(t) {
                return this.divide.apply(this, arguments)
            },
            divideScalar: function(t) {
                return this.divide(t)
            },
            negate: function() {
                return this.multiply(-1)
            },
            dot: function(t) {
                return this.x * t.x + this.y * t.y
            },
            length: function() {
                return Math.sqrt(this.lengthSquared())
            },
            lengthSquared: function() {
                return this.x * this.x + this.y * this.y
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            distanceTo: function(t) {
                return Math.sqrt(this.distanceToSquared(t))
            },
            distanceToSquared: function(t) {
                var e = this.x - t.x;
                return e * e + (t = this.y - t.y) * t
            },
            setLength: function(t) {
                return this.normalize().multiplyScalar(t)
            },
            equals: function(t, e) {
                return e = void 0 === e ? 1e-4 : e, this.distanceTo(
                    t) < e
            },
            lerp: function(t, e) {
                return this.set((t.x - this.x) * e + this.x, (t.y -
                    this.y) * e + this.y)
            },
            isZero: function(t) {
                return t = void 0 === t ? 1e-4 : t, this.length() <
                    t
            },
            toString: function() {
                return this.x + ", " + this.y
            },
            toObject: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            rotate: function(t) {
                var e = Math.cos(t);
                return t = Math.sin(t), this.x = this.x * e - this
                    .y * t, this.y = this.x * t + this.y * e, this
            }
        });
        var r = {
                constructor: i,
                set: function(e, i) {
                    return this._x = e, this._y = i, this.trigger(t.Events
                        .change)
                },
                copy: function(e) {
                    return this._x = e.x, this._y = e.y, this.trigger(t
                        .Events.change)
                },
                clear: function() {
                    return this._y = this._x = 0, this.trigger(t.Events
                        .change)
                },
                clone: function() {
                    return new i(this._x, this._y)
                },
                add: function(i, r) {
                    return 0 >= arguments.length ? this : (1 >= arguments
                        .length ? e.isNumber(i) ? (this._x += i, this
                            ._y += i) : i && e.isNumber(i.x) && e
                        .isNumber(i.y) && (this._x += i.x, this._y += i
                            .y) : (this._x += i, this._y += r), this
                        .trigger(t.Events.change))
                },
                sub: function(i, r) {
                    return 0 >= arguments.length ? this : (1 >= arguments
                        .length ? e.isNumber(i) ? (this._x -= i, this
                            ._y -= i) : i && e.isNumber(i.x) && e
                        .isNumber(i.y) && (this._x -= i.x, this._y -= i
                            .y) : (this._x -= i, this._y -= r), this
                        .trigger(t.Events.change))
                },
                multiply: function(i, r) {
                    return 0 >= arguments.length ? this : (1 >= arguments
                        .length ? e.isNumber(i) ? (this._x *= i, this
                            ._y *= i) : i && e.isNumber(i.x) && e
                        .isNumber(i.y) && (this._x *= i.x, this._y *= i
                            .y) : (this._x *= i, this._y *= r), this
                        .trigger(t.Events.change))
                },
                divide: function(i, r) {
                    return 0 >= arguments.length ? this : (1 >= arguments
                        .length ? e.isNumber(i) ? (this._x /= i, this
                            ._y /= i) : i && e.isNumber(i.x) && e
                        .isNumber(i.y) && (this._x /= i.x, this._y /= i
                            .y) : (this._x /= i, this._y /= r), e.isNaN(
                            this._x) && (this._x = 0), e.isNaN(this
                        ._y) && (this._y = 0), this.trigger(t.Events
                            .change))
                },
                dot: function(t) {
                    return this._x * t.x + this._y * t.y
                },
                lengthSquared: function() {
                    return this._x * this._x + this._y * this._y
                },
                distanceToSquared: function(t) {
                    var e = this._x - t.x;
                    return e * e + (t = this._y - t.y) * t
                },
                lerp: function(t, e) {
                    return this.set((t.x - this._x) * e + this._x, (t.y -
                        this._y) * e + this._y)
                },
                toString: function() {
                    return this._x + ", " + this._y
                },
                toObject: function() {
                    return {
                        x: this._x,
                        y: this._y
                    }
                },
                rotate: function(t) {
                    var e = Math.cos(t);
                    return t = Math.sin(t), this._x = this._x * e - this
                        ._y * t, this._y = this._x * t + this._y * e, this
                }
            },
            s = {
                enumerable: !0,
                get: function() {
                    return this._x
                },
                set: function(e) {
                    this._x = e, this.trigger(t.Events.change, "x")
                }
            },
            n = {
                enumerable: !0,
                get: function() {
                    return this._y
                },
                set: function(e) {
                    this._y = e, this.trigger(t.Events.change, "y")
                }
            };
        i.MakeObservable(i.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Commands,
            i = t.Utils,
            r = t.Anchor = function(r, s, n, a, o, l, h) {
                t.Vector.call(this, r, s), this._broadcast = i.bind(function() {
                        this.trigger(t.Events.change)
                    }, this), this._command = h || e.move, this._relative = !0,
                    r = i.isNumber(n), s = i.isNumber(a), h = i.isNumber(o);
                var c = i.isNumber(l);
                (r || s || h || c) && t.Anchor.AppendCurveProperties(this), r &&
                    (this.controls.left.x = n), s && (this.controls.left.y = a),
                    h && (this.controls.right.x = o), c && (this.controls.right
                        .y = l)
            };
        i.extend(t.Anchor, {
            AppendCurveProperties: function(e) {
                e.relative = !0, e.controls = {}, e.controls.left =
                    new t.Vector(0, 0), e.controls.right = new t
                    .Vector(0, 0)
            },
            MakeObservable: function(n) {
                Object.defineProperty(n, "command", {
                        enumerable: !0,
                        get: function() {
                            return this._command
                        },
                        set: function(s) {
                            return this._command = s, this
                                ._command !== e.curve || i
                                .isObject(this.controls) ||
                                r.AppendCurveProperties(
                                    this), this.trigger(t
                                    .Events.change)
                        }
                    }), Object.defineProperty(n, "relative", {
                        enumerable: !0,
                        get: function() {
                            return this._relative
                        },
                        set: function(e) {
                            return this._relative == e ?
                                this : (this._relative = !!
                                    e, this.trigger(t.Events
                                        .change))
                        }
                    }), i.extend(n, t.Vector.prototype, s), n.bind =
                    n.on = function() {
                        var e = this._bound;
                        t.Vector.prototype.bind.apply(this,
                            arguments), e || i.extend(this, s)
                    }
            }
        });
        var s = {
            constructor: t.Anchor,
            listen: function() {
                return i.isObject(this.controls) || t.Anchor
                    .AppendCurveProperties(this), this.controls.left
                    .bind(t.Events.change, this._broadcast), this
                    .controls.right.bind(t.Events.change, this
                        ._broadcast), this
            },
            ignore: function() {
                return this.controls.left.unbind(t.Events.change, this
                    ._broadcast), this.controls.right.unbind(t
                    .Events.change, this._broadcast), this
            },
            copy: function(e) {
                return this.x = e.x, this.y = e.y, i.isString(e
                    .command) && (this.command = e.command), i.isObject(
                        e.controls) && (i.isObject(this.controls) || t
                        .Anchor.AppendCurveProperties(this), this
                        .controls.left.copy(e.controls.left), this
                        .controls.right.copy(e.controls.right)), i
                    .isBoolean(e.relative) && (this.relative = e
                        .relative), this.command === t.Commands.arc && (
                        this.rx = e.rx, this.ry = e.ry, this
                        .xAxisRotation = e.xAxisRotation, this
                        .largeArcFlag = e.largeArcFlag, this.sweepFlag =
                        e.sweepFlag), this
            },
            clone: function() {
                var e = this.controls;
                return (e = new t.Anchor(this.x, this.y, e && e.left.x,
                    e && e.left.y, e && e.right.x, e && e.right
                    .y, this.command)).relative = this._relative, e
            },
            toObject: function() {
                var t = {
                    x: this.x,
                    y: this.y
                };
                return this._command && (t.command = this._command),
                    this._relative && (t.relative = this._relative),
                    this.controls && (t.controls = {
                        left: this.controls.left.toObject(),
                        right: this.controls.right.toObject()
                    }), t
            },
            toString: function() {
                return this.controls ? [this._x, this._y, this.controls
                    .left.x, this.controls.left.y, this.controls
                    .right.x, this.controls.right.y, this._command,
                    this._relative ? 1 : 0
                ].join(", ") : [this._x, this._y].join(", ")
            }
        };
        t.Anchor.MakeObservable(t.Anchor.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = Math.cos,
            i = Math.sin,
            r = Math.tan,
            s = t.Utils,
            n = s.toFixed,
            a = [],
            o = t.Matrix = function(e, i, r, n, a, o) {
                this.elements = new t.Array(9);
                var l = e;
                s.isArray(l) || (l = s.toArray(arguments)), this.identity(), 0 <
                    l.length && this.set(l)
            };
        s.extend(o, {
            Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1],
            Multiply: function(e, i, r) {
                if (3 >= i.length) {
                    r = i[0] || 0;
                    var s = i[1] || 0;
                    return i = i[2] || 0, {
                        x: e[0] * r + e[1] * s + e[2] * i,
                        y: e[3] * r + e[4] * s + e[5] * i,
                        z: e[6] * r + e[7] * s + e[8] * i
                    }
                }
                s = e[0];
                var n = e[1],
                    a = e[2],
                    o = e[3],
                    l = e[4],
                    h = e[5],
                    c = e[6],
                    d = e[7];
                e = e[8];
                var f = i[0],
                    u = i[1],
                    _ = i[2],
                    g = i[3],
                    p = i[4],
                    m = i[5],
                    y = i[6],
                    v = i[7];
                return i = i[8], (r = r || new t.Array(9))[0] = s *
                    f + n * g + a * y, r[1] = s * u + n * p + a * v,
                    r[2] = s * _ + n * m + a * i, r[3] = o * f + l *
                    g + h * y, r[4] = o * u + l * p + h * v, r[5] =
                    o * _ + l * m + h * i, r[6] = c * f + d * g +
                    e * y, r[7] = c * u + d * p + e * v, r[8] = c *
                    _ + d * m + e * i, r
            }
        }), s.extend(o.prototype, t.Utils.Events, {
            constructor: o,
            manual: !1,
            set: function(e, i, r, n, a, o, l, h, c) {
                return s.isUndefined(i) && (e = (c = e)[0], i = c[
                        1], r = c[2], n = c[3], a = c[4], o = c[5],
                        l = c[6], h = c[7], c = c[8]), this
                    .elements[0] = e, this.elements[1] = i, this
                    .elements[2] = r, this.elements[3] = n, this
                    .elements[4] = a, this.elements[5] = o, this
                    .elements[6] = l, this.elements[7] = h, this
                    .elements[8] = c, this.trigger(t.Events.change)
            },
            identity: function() {
                return this.elements[0] = o.Identity[0], this
                    .elements[1] = o.Identity[1], this.elements[2] =
                    o.Identity[2], this.elements[3] = o.Identity[3],
                    this.elements[4] = o.Identity[4], this.elements[
                        5] = o.Identity[5], this.elements[6] = o
                    .Identity[6], this.elements[7] = o.Identity[7],
                    this.elements[8] = o.Identity[8], this.trigger(t
                        .Events.change)
            },
            multiply: function(e, i, r, n, a, o, l, h, c) {
                if (s.isUndefined(i)) return this.elements[0] *= e,
                    this.elements[1] *= e, this.elements[2] *=
                    e, this.elements[3] *= e, this.elements[
                    4] *= e, this.elements[5] *= e, this
                    .elements[6] *= e, this.elements[7] *= e,
                    this.elements[8] *= e, this.trigger(t.Events
                        .change);
                if (s.isUndefined(n)) return e = e || 0, i = i || 0,
                    r = r || 0, {
                        x: (a = this.elements)[0] * e + a[1] *
                            i + a[2] * r,
                        y: a[3] * e + a[4] * i + a[5] * r,
                        z: a[6] * e + a[7] * i + a[8] * r
                    };
                var d = this.elements;
                c = [e, i, r, n, a, o, l, h, c], e = d[0], i = d[1],
                    r = d[2], n = d[3], a = d[4], o = d[5], l = d[
                    6], h = d[7], d = d[8];
                var f = c[0],
                    u = c[1],
                    _ = c[2],
                    g = c[3],
                    p = c[4],
                    m = c[5],
                    y = c[6],
                    v = c[7];
                return c = c[8], this.elements[0] = e * f + i * g +
                    r * y, this.elements[1] = e * u + i * p + r * v,
                    this.elements[2] = e * _ + i * m + r * c, this
                    .elements[3] = n * f + a * g + o * y, this
                    .elements[4] = n * u + a * p + o * v, this
                    .elements[5] = n * _ + a * m + o * c, this
                    .elements[6] = l * f + h * g + d * y, this
                    .elements[7] = l * u + h * p + d * v, this
                    .elements[8] = l * _ + h * m + d * c, this
                    .trigger(t.Events.change)
            },
            inverse: function(e) {
                var i = this.elements;
                e = e || new t.Matrix;
                var r = i[0],
                    s = i[1],
                    n = i[2],
                    a = i[3],
                    o = i[4],
                    l = i[5],
                    h = i[6],
                    c = i[7],
                    d = (i = i[8]) * o - l * c,
                    f = -i * a + l * h,
                    u = c * a - o * h,
                    _ = r * d + s * f + n * u;
                return _ ? (_ = 1 / _, e.elements[0] = d * _, e
                        .elements[1] = (-i * s + n * c) * _, e
                        .elements[2] = (l * s - n * o) * _, e
                        .elements[3] = f * _, e.elements[4] = (i *
                            r - n * h) * _, e.elements[5] = (-l *
                            r + n * a) * _, e.elements[6] = u * _, e
                        .elements[7] = (-c * r + s * h) * _, e
                        .elements[8] = (o * r - s * a) * _, e) :
                    null
            },
            scale: function(t, e) {
                return 1 >= arguments.length && (e = t), this
                    .multiply(t, 0, 0, 0, e, 0, 0, 0, 1)
            },
            rotate: function(t) {
                var r = e(t);
                return t = i(t), this.multiply(r, -t, 0, t, r, 0, 0,
                    0, 1)
            },
            translate: function(t, e) {
                return this.multiply(1, 0, t, 0, 1, e, 0, 0, 1)
            },
            skewX: function(t) {
                return t = r(t), this.multiply(1, t, 0, 0, 1, 0, 0,
                    0, 1)
            },
            skewY: function(t) {
                return t = r(t), this.multiply(1, 0, 0, t, 1, 0, 0,
                    0, 1)
            },
            toString: function(t) {
                return a.length = 0, this.toTransformArray(t, a), a
                    .join(" ")
            },
            toTransformArray: function(t, e) {
                var i = this.elements,
                    r = !!e,
                    s = n(i[0]),
                    a = n(i[1]),
                    o = n(i[2]),
                    l = n(i[3]),
                    h = n(i[4]),
                    c = n(i[5]);
                if (t) {
                    t = n(i[6]);
                    var d = n(i[7]);
                    return i = n(i[8]), r ? (e[0] = s, e[1] = l, e[
                                2] = t, e[3] = a, e[4] = h, e[5] =
                            d, e[6] = o, e[7] = c, void(e[8] = i)) :
                        [s, l, t, a, h, d, o, c, i]
                }
                if (!r) return [s, l, a, h, o, c];
                e[0] = s, e[1] = l, e[2] = a, e[3] = h, e[4] = o, e[
                    5] = c
            },
            toArray: function(t, e) {
                var i = this.elements,
                    r = !!e,
                    s = i[0],
                    n = i[1],
                    a = i[2],
                    o = i[3],
                    l = i[4],
                    h = i[5];
                if (t) {
                    t = i[6];
                    var c = i[7];
                    return i = i[8], r ? (e[0] = s, e[1] = n, e[2] =
                        a, e[3] = o, e[4] = l, e[5] = h, e[6] =
                        t, e[7] = c, void(e[8] = i)) : [s, n, a,
                        o, l, h, t, c, i
                    ]
                }
                if (!r) return [s, n, a, o, l, h];
                e[0] = s, e[1] = n, e[2] = a, e[3] = o, e[4] = l, e[
                    5] = h
            },
            clone: function() {
                var e = this.elements[0],
                    i = this.elements[1],
                    r = this.elements[2],
                    s = this.elements[3],
                    n = this.elements[4];
                return (e = new t.Matrix(e, i, r, s, n, this
                        .elements[5], this.elements[6], this
                        .elements[7], this.elements[8])).manual =
                    this.manual, e
            }
        })
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils.mod,
            i = t.Utils.toFixed,
            r = t.Utils,
            s = {
                version: 1.1,
                ns: "http://www.w3.org/2000/svg",
                xlink: "http://www.w3.org/1999/xlink",
                alignments: {
                    left: "start",
                    center: "middle",
                    right: "end"
                },
                createElement: function(t, e) {
                    var i = document.createElementNS(s.ns, t);
                    return "svg" === t && (e = r.defaults(e || {}, {
                        version: s.version
                    })), r.isEmpty(e) || s.setAttributes(i, e), i
                },
                setAttributes: function(t, e) {
                    for (var i = Object.keys(e), r = 0; r < i.length; r++)
                        /href/.test(i[r]) ? t.setAttributeNS(s.xlink, i[r],
                            e[i[r]]) : t.setAttribute(i[r], e[i[r]]);
                    return this
                },
                removeAttributes: function(t, e) {
                    for (var i in e) t.removeAttribute(i);
                    return this
                },
                toString: function(r, s) {
                    for (var n, a = r.length, o = a - 1, l = "", h = 0; h <
                        a; h++) {
                        var c = r[h],
                            d = s ? e(h - 1, a) : Math.max(h - 1, 0);
                        s && e(h + 1, a);
                        var f = r[d];
                        d = i(c.x);
                        var u = i(c.y);
                        switch (c.command) {
                            case t.Commands.close:
                                var _ = t.Commands.close;
                                break;
                            case t.Commands.arc:
                                var g = c.rx;
                                _ = c.ry, f = c.xAxisRotation;
                                var p = c.largeArcFlag,
                                    m = c.sweepFlag;
                                _ = t.Commands.arc + " " + g + " " + _ +
                                    " " + f + " " + p + " " + m + " " + d +
                                    " " + u;
                                break;
                            case t.Commands.curve:
                                p = f.controls && f.controls.right || t
                                    .Vector.zero, _ = c.controls && c
                                    .controls.left || t.Vector.zero, f
                                    .relative ? (g = i(p.x + f.x), f = i(p
                                        .y + f.y)) : (g = i(p.x), f = i(p
                                        .y)), c.relative ? (p = i(_.x + c
                                        .x), m = i(_.y + c.y)) : (p = i(_
                                        .x), m = i(_.y)), _ = (0 === h ? t
                                        .Commands.move : t.Commands.curve) +
                                    " " + g + " " + f + " " + p + " " + m +
                                    " " + d + " " + u;
                                break;
                            case t.Commands.move:
                                n = c, _ = t.Commands.move + " " + d + " " +
                                    u;
                                break;
                            default:
                                _ = c.command + " " + d + " " + u
                        }
                        h >= o && s && (c.command === t.Commands.curve && (
                                    u = n, f = c.controls && c.controls
                                    .right || c, d = u.controls && u
                                    .controls.left || u, c.relative ? (g =
                                        i(f.x + c.x), f = i(f.y + c.y)) : (
                                        g = i(f.x), f = i(f.y)), u
                                    .relative ? (p = i(d.x + u.x), m = i(d
                                        .y + u.y)) : (p = i(d.x), m = i(d
                                        .y)), _ += " C " + g + " " + f +
                                    " " + p + " " + m + " " + (d = i(u.x)) +
                                    " " + (u = i(u.y))), c.command !== t
                                .Commands.close && (_ += " Z")), l += _ +
                            " "
                    }
                    return l
                },
                getClip: function(t) {
                    var e = t._renderer.clip;
                    if (!e) {
                        for (var i = t; i.parent;) i = i.parent;
                        e = t._renderer.clip = s.createElement("clipPath"),
                            i.defs.appendChild(e)
                    }
                    return e
                },
                group: {
                    appendChild: function(t) {
                        var e = t._renderer.elem;
                        if (e) {
                            var i = e.nodeName;
                            !i || /(radial|linear)gradient/i.test(i) || t
                                ._clip || this.elem.appendChild(e)
                        }
                    },
                    removeChild: function(t) {
                        var e = t._renderer.elem;
                        e && e.parentNode == this.elem && e.nodeName && (t
                            ._clip || this.elem.removeChild(e))
                    },
                    orderChild: function(t) {
                        this.elem.appendChild(t._renderer.elem)
                    },
                    renderChild: function(t) {
                        s[t._renderer.type].render.call(t, this)
                    },
                    render: function(t) {
                        if (this._update(), 0 === this._opacity && !this
                            ._flagOpacity) return this;
                        this._renderer.elem || (this._renderer.elem = s
                            .createElement("g", {
                                id: this.id
                            }), t.appendChild(this._renderer.elem));
                        var e = {
                            domElement: t,
                            elem: this._renderer.elem
                        };
                        (this._matrix.manual || this._flagMatrix) && this
                            ._renderer.elem.setAttribute("transform",
                                "matrix(" + this._matrix.toString() + ")");
                        for (var i = 0; i < this.children.length; i++) {
                            var r = this.children[i];
                            s[r._renderer.type].render.call(r, t)
                        }
                        return this._flagOpacity && this._renderer.elem
                            .setAttribute("opacity", this._opacity), this
                            ._flagClassName && this._renderer.elem
                            .setAttribute("class", this._className), this
                            ._flagAdditions && this.additions.forEach(s
                                .group.appendChild, e), this
                            ._flagSubtractions && this.subtractions.forEach(
                                s.group.removeChild, e), this._flagOrder &&
                            this.children.forEach(s.group.orderChild, e),
                            this._flagMask && (this._mask ? this._renderer
                                .elem.setAttribute("clip-path", "url(#" +
                                    this._mask.id + ")") : this._renderer
                                .elem.removeAttribute("clip-path")), this
                            .flagReset()
                    }
                },
                path: {
                    render: function(t) {
                        if (this._update(), 0 === this._opacity && !this
                            ._flagOpacity) return this;
                        var e = {};
                        if ((this._matrix.manual || this._flagMatrix) && (e
                                .transform = "matrix(" + this._matrix
                                .toString() + ")"), this._flagVertices) {
                            var i = s.toString(this._renderer.vertices, this
                                ._closed);
                            e.d = i
                        }
                        return this._fill && this._fill._renderer && (this
                                ._fill._update(), s[this._fill._renderer
                                    .type].render.call(this._fill, t, !0)),
                            this._flagFill && (e.fill = this._fill && this
                                ._fill.id ? "url(#" + this._fill.id + ")" :
                                this._fill), this._stroke && this._stroke
                            ._renderer && (this._stroke._update(), s[this
                                ._stroke._renderer.type].render.call(
                                this._stroke, t, !0)), this._flagStroke && (
                                e.stroke = this._stroke && this._stroke.id ?
                                "url(#" + this._stroke.id + ")" : this
                                ._stroke), this._flagLinewidth && (e[
                                "stroke-width"] = this._linewidth), this
                            ._flagOpacity && (e["stroke-opacity"] = this
                                ._opacity, e["fill-opacity"] = this._opacity
                                ), this._flagClassName && (e.class = this
                                ._className), this._flagVisible && (e
                                .visibility = this._visible ? "visible" :
                                "hidden"), this._flagCap && (e[
                                "stroke-linecap"] = this._cap), this
                            ._flagJoin && (e["stroke-linejoin"] = this
                                ._join), this._flagMiter && (e[
                                "stroke-miterlimit"] = this._miter), this
                            .dashes && 0 < this.dashes.length && (e[
                                    "stroke-dasharray"] = this.dashes.join(
                                    " "), e["stroke-dashoffset"] = this
                                .dashes.offset || 0), this._renderer.elem ?
                            s.setAttributes(this._renderer.elem, e) : (e
                                .id = this.id, this._renderer.elem = s
                                .createElement("path", e), t.appendChild(
                                    this._renderer.elem)), this._flagClip &&
                            (t = s.getClip(this), e = this._renderer.elem,
                                this._clip ? (e.removeAttribute("id"), t
                                    .setAttribute("id", this.id), t
                                    .appendChild(e)) : (t.removeAttribute(
                                        "id"), e.setAttribute("id", this
                                    .id), this.parent._renderer.elem
                                    .appendChild(e))), this.flagReset()
                    }
                },
                text: {
                    render: function(t) {
                        this._update();
                        var e = {};
                        return (this._matrix.manual || this._flagMatrix) &&
                            (e.transform = "matrix(" + this._matrix
                                .toString() + ")"), this._flagFamily && (e[
                                "font-family"] = this._family), this
                            ._flagSize && (e["font-size"] = this._size),
                            this._flagLeading && (e["line-height"] = this
                                ._leading), this._flagAlignment && (e[
                                "text-anchor"] = s.alignments[this
                                ._alignment] || this._alignment), this
                            ._flagBaseline && (e["alignment-baseline"] = e[
                                "dominant-baseline"] = this._baseline), this
                            ._flagStyle && (e["font-style"] = this._style),
                            this._flagWeight && (e["font-weight"] = this
                                ._weight), this._flagDecoration && (e[
                                "text-decoration"] = this._decoration), this
                            ._fill && this._fill._renderer && (this._fill
                                ._update(), s[this._fill._renderer.type]
                                .render.call(this._fill, t, !0)), this
                            ._flagFill && (e.fill = this._fill && this._fill
                                .id ? "url(#" + this._fill.id + ")" : this
                                ._fill), this._stroke && this._stroke
                            ._renderer && (this._stroke._update(), s[this
                                ._stroke._renderer.type].render.call(
                                this._stroke, t, !0)), this._flagStroke && (
                                e.stroke = this._stroke && this._stroke.id ?
                                "url(#" + this._stroke.id + ")" : this
                                ._stroke), this._flagLinewidth && (e[
                                "stroke-width"] = this._linewidth), this
                            ._flagOpacity && (e.opacity = this._opacity),
                            this._flagClassName && (e.class = this
                                ._className), this._flagVisible && (e
                                .visibility = this._visible ? "visible" :
                                "hidden"), this.dashes && 0 < this.dashes
                            .length && (e["stroke-dasharray"] = this.dashes
                                .join(" "), e["stroke-dashoffset"] = this
                                .dashes.offset || 0), this._renderer.elem ?
                            s.setAttributes(this._renderer.elem, e) : (e
                                .id = this.id, this._renderer.elem = s
                                .createElement("text", e), t.defs
                                .appendChild(this._renderer.elem)), this
                            ._flagClip && (t = s.getClip(this), e = this
                                ._renderer.elem, this._clip ? (e
                                    .removeAttribute("id"), t.setAttribute(
                                        "id", this.id), t.appendChild(e)) :
                                (t.removeAttribute("id"), e.setAttribute(
                                        "id", this.id), this.parent
                                    ._renderer.elem.appendChild(e))), this
                            ._flagValue && (this._renderer.elem
                                .textContent = this._value), this
                            .flagReset()
                    }
                },
                "linear-gradient": {
                    render: function(t, e) {
                        if (e || this._update(), e = {}, this
                            ._flagEndPoints && (e.x1 = this.left._x, e.y1 =
                                this.left._y, e.x2 = this.right._x, e.y2 =
                                this.right._y), this._flagSpread && (e
                                .spreadMethod = this._spread), this
                            ._renderer.elem ? s.setAttributes(this._renderer
                                .elem, e) : (e.id = this.id, e
                                .gradientUnits = "userSpaceOnUse", this
                                ._renderer.elem = s.createElement(
                                    "linearGradient", e), t.defs
                                .appendChild(this._renderer.elem)), this
                            ._flagStops) {
                            if (t = this._renderer.elem.childNodes
                                .length !== this.stops.length)
                                for (; this._renderer.elem.lastChild;) this
                                    ._renderer.elem.removeChild(this
                                        ._renderer.elem.lastChild);
                            for (e = 0; e < this.stops.length; e++) {
                                var i = this.stops[e],
                                    r = {};
                                i._flagOffset && (r.offset = 100 * i
                                        ._offset + "%"), i._flagColor && (r[
                                        "stop-color"] = i._color), i
                                    ._flagOpacity && (r["stop-opacity"] = i
                                        ._opacity), i._renderer.elem ? s
                                    .setAttributes(i._renderer.elem, r) : i
                                    ._renderer.elem = s.createElement(
                                        "stop", r), t && this._renderer.elem
                                    .appendChild(i._renderer.elem), i
                                    .flagReset()
                            }
                        }
                        return this.flagReset()
                    }
                },
                "radial-gradient": {
                    render: function(t, e) {
                        if (e || this._update(), e = {}, this._flagCenter &&
                            (e.cx = this.center._x, e.cy = this.center._y),
                            this._flagFocal && (e.fx = this.focal._x, e.fy =
                                this.focal._y), this._flagRadius && (e.r =
                                this._radius), this._flagSpread && (e
                                .spreadMethod = this._spread), this
                            ._renderer.elem ? s.setAttributes(this._renderer
                                .elem, e) : (e.id = this.id, e
                                .gradientUnits = "userSpaceOnUse", this
                                ._renderer.elem = s.createElement(
                                    "radialGradient", e), t.defs
                                .appendChild(this._renderer.elem)), this
                            ._flagStops) {
                            if (t = this._renderer.elem.childNodes
                                .length !== this.stops.length)
                                for (; this._renderer.elem.lastChild;) this
                                    ._renderer.elem.removeChild(this
                                        ._renderer.elem.lastChild);
                            for (e = 0; e < this.stops.length; e++) {
                                var i = this.stops[e],
                                    r = {};
                                i._flagOffset && (r.offset = 100 * i
                                        ._offset + "%"), i._flagColor && (r[
                                        "stop-color"] = i._color), i
                                    ._flagOpacity && (r["stop-opacity"] = i
                                        ._opacity), i._renderer.elem ? s
                                    .setAttributes(i._renderer.elem, r) : i
                                    ._renderer.elem = s.createElement(
                                        "stop", r), t && this._renderer.elem
                                    .appendChild(i._renderer.elem), i
                                    .flagReset()
                            }
                        }
                        return this.flagReset()
                    }
                },
                texture: {
                    render: function(e, i) {
                        i || this._update(), i = {};
                        var n = {
                                x: 0,
                                y: 0
                            },
                            a = this.image;
                        if (this._flagLoaded && this.loaded) switch (a
                            .nodeName.toLowerCase()) {
                            case "canvas":
                                n.href = n["xlink:href"] = a.toDataURL(
                                    "image/png");
                                break;
                            case "img":
                            case "image":
                                n.href = n["xlink:href"] = this.src
                        }
                        if ((this._flagOffset || this._flagLoaded || this
                                ._flagScale) && (i.x = this._offset.x, i.y =
                                this._offset.y, a && (i.x -= a.width / 2, i
                                    .y -= a.height / 2, this
                                    ._scale instanceof t.Vector ? (i.x *=
                                        this._scale.x, i.y *= this._scale.y
                                        ) : (i.x *= this._scale, i.y *= this
                                        ._scale)), 0 < i.x && (i.x *= -1),
                                0 < i.y && (i.y *= -1)), (this._flagScale ||
                                this._flagLoaded || this._flagRepeat) && (i
                                .width = 0, i.height = 0, a)) {
                            switch (n.width = i.width = a.width, n.height =
                                i.height = a.height, this._repeat) {
                                case "no-repeat":
                                    i.width += 1, i.height += 1
                            }
                            this._scale instanceof t.Vector ? (i.width *=
                                this._scale.x, i.height *= this._scale.y
                                ) : (i.width *= this._scale, i.height *=
                                this._scale)
                        }
                        return (this._flagScale || this._flagLoaded) && (
                                this._renderer.image ? r.isEmpty(n) || s
                                .setAttributes(this._renderer.image, n) :
                                this._renderer.image = s.createElement(
                                    "image", n)), this._renderer.elem ? r
                            .isEmpty(i) || s.setAttributes(this._renderer
                                .elem, i) : (i.id = this.id, i
                                .patternUnits = "userSpaceOnUse", this
                                ._renderer.elem = s.createElement("pattern",
                                    i), e.defs.appendChild(this._renderer
                                    .elem)), this._renderer.elem && this
                            ._renderer.image && !this._renderer.appended &&
                            (this._renderer.elem.appendChild(this._renderer
                                .image), this._renderer.appended = !0), this
                            .flagReset()
                    }
                }
            },
            n = t[t.Types.svg] = function(e) {
                this.domElement = e.domElement || s.createElement("svg"), this
                    .scene = new t.Group, this.scene.parent = this, this.defs =
                    s.createElement("defs"), this.domElement.appendChild(this
                        .defs), this.domElement.defs = this.defs, this
                    .domElement.style.overflow = "hidden"
            };
        r.extend(n, {
            Utils: s
        }), r.extend(n.prototype, t.Utils.Events, {
            constructor: n,
            setSize: function(e, i) {
                return this.width = e, this.height = i, s
                    .setAttributes(this.domElement, {
                        width: e,
                        height: i
                    }), this.trigger(t.Events.resize, e, i)
            },
            render: function() {
                return s.group.render.call(this.scene, this
                    .domElement), this
            }
        })
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        function e(t, e, i, r) {
            var s = t * i + e * r,
                n = _(t * t + e * e) * _(i * i + r * r);
            return s = u(l(-1, h(1, s / n))), 0 > t * r - e * i && (s = -s), s
        }
        var i = t.Utils.mod,
            r = t.Utils.toFixed,
            s = t.Utils.getRatio,
            n = t.Utils,
            a = [],
            o = 2 * Math.PI,
            l = Math.max,
            h = Math.min,
            c = Math.abs,
            d = Math.sin,
            f = Math.cos,
            u = Math.acos,
            _ = Math.sqrt,
            g = function(t) {
                return 1 == t[0] && 0 == t[3] && 0 == t[1] && 1 == t[4] && 0 ==
                    t[2] && 0 == t[5]
            },
            p = {
                isHidden: /(none|transparent)/i,
                alignments: {
                    left: "start",
                    middle: "center",
                    right: "end"
                },
                shim: function(t, e) {
                    return t.tagName = t.nodeName = e || "canvas", t
                        .nodeType = 1, t.getAttribute = function(t) {
                            return this[t]
                        }, t.setAttribute = function(t, e) {
                            return this[t] = e, this
                        }, t
                },
                group: {
                    renderChild: function(t) {
                        p[t._renderer.type].render.call(t, this.ctx, !0,
                            this.clip)
                    },
                    render: function(t) {
                        this._update();
                        var e = this._matrix.elements,
                            i = this.parent;
                        this._renderer.opacity = this._opacity * (i && i
                                ._renderer ? i._renderer.opacity : 1), i =
                            g(e);
                        var r = this._mask;
                        if (this._renderer.context || (this._renderer
                                .context = {}), this._renderer.context.ctx =
                            t, i || (t.save(), t.transform(e[0], e[3], e[1],
                                e[4], e[2], e[5])), r && p[r._renderer.type]
                            .render.call(r, t, !0), 0 < this.opacity &&
                            0 !== this.scale)
                            for (e = 0; e < this.children.length; e++) r =
                                this.children[e], p[r._renderer.type].render
                                .call(r, t);
                        return i || t.restore(), this.flagReset()
                    }
                },
                path: {
                    render: function(e, s, o) {
                        this._update();
                        var h = this._matrix.elements,
                            c = this._stroke,
                            d = this._linewidth,
                            f = this._fill,
                            u = this._opacity * this.parent._renderer
                            .opacity,
                            _ = this._visible,
                            m = this._cap,
                            y = this._join,
                            v = this._miter,
                            x = this._closed,
                            b = this._renderer.vertices,
                            w = b.length,
                            A = w - 1,
                            S = g(h),
                            k = this.dashes,
                            E = this._clip;
                        if (!s && (!_ || E)) return this;
                        for (S || (e.save(), e.transform(h[0], h[3], h[1],
                                h[4], h[2], h[5])), f && (n.isString(f) ? e
                                .fillStyle = f : (p[f._renderer.type].render
                                    .call(f, e), e.fillStyle = f._renderer
                                    .effect)), c && (n.isString(c) ? e
                                .strokeStyle = c : (p[c._renderer.type]
                                    .render.call(c, e), e.strokeStyle = c
                                    ._renderer.effect)), d && (e.lineWidth =
                                d), v && (e.miterLimit = v), y && (e
                                .lineJoin = y), m && (e.lineCap = m), n
                            .isNumber(u) && (e.globalAlpha = u), k && 0 < k
                            .length && (e.lineDashOffset = k.offset || 0, e
                                .setLineDash(k)), e.beginPath(), s = 0; s <
                            b.length; s++) switch (u = b[s], h = r(u.x), _ =
                            r(u.y), u.command) {
                            case t.Commands.close:
                                e.closePath();
                                break;
                            case t.Commands.arc:
                                y = u.rx, v = u.ry;
                                var C = u.xAxisRotation,
                                    R = u.largeArcFlag;
                                u = u.sweepFlag, m = b[m = x ? i(s - 1,
                                    w) : l(s - 1, 0)];
                                var M = r(m.x);
                                m = r(m.y), p.renderSvgArcCommand(e, M,
                                    m, y, v, R, u, C, h, _);
                                break;
                            case t.Commands.curve:
                                m = x ? i(s - 1, w) : Math.max(s - 1,
                                    0), x && i(s + 1, w), v = (m = b[m])
                                    .controls && m.controls.right || t
                                    .Vector.zero, C = u.controls && u
                                    .controls.left || t.Vector.zero, m
                                    ._relative ? (y = v.x + r(m.x), v =
                                        v.y + r(m.y)) : (y = r(v.x), v =
                                        r(v.y)), u._relative ? (m = C
                                        .x + r(u.x), C = C.y + r(u.y)) :
                                    (m = r(C.x), C = r(C.y)), e
                                    .bezierCurveTo(y, v, m, C, h, _),
                                    s >= A && x && (_ = F, m = u
                                        .controls && u.controls.right ||
                                        t.Vector.zero, h = _.controls &&
                                        _.controls.left || t.Vector
                                        .zero, u._relative ? (y = m.x +
                                            r(u.x), v = m.y + r(u.y)) :
                                        (y = r(m.x), v = r(m.y)), _
                                        ._relative ? (m = h.x + r(_.x),
                                            C = h.y + r(_.y)) : (m = r(h
                                            .x), C = r(h.y)), h = r(_
                                        .x), _ = r(_.y), e
                                        .bezierCurveTo(y, v, m, C, h, _)
                                        );
                                break;
                            case t.Commands.line:
                                e.lineTo(h, _);
                                break;
                            case t.Commands.move:
                                var F = u;
                                e.moveTo(h, _)
                        }
                        return x && e.closePath(), E || o || (p.isHidden
                                .test(f) || ((x = f._renderer && f._renderer
                                        .offset) && (e.save(), e.translate(-
                                        f._renderer.offset.x, -f
                                        ._renderer.offset.y), e.scale(f
                                        ._renderer.scale.x, f._renderer
                                        .scale.y)), e.fill(), x && e
                                    .restore()), p.isHidden.test(c) || ((x =
                                        c._renderer && c._renderer.offset
                                        ) && (e.save(), e.translate(-c
                                            ._renderer.offset.x, -c
                                            ._renderer.offset.y), e.scale(c
                                            ._renderer.scale.x, c._renderer
                                            .scale.y), e.lineWidth = d / c
                                        ._renderer.scale.x), e.stroke(),
                                    x && e.restore())), S || e.restore(),
                            E && !o && e.clip(), k && 0 < k.length && e
                            .setLineDash(a), this.flagReset()
                    }
                },
                text: {
                    render: function(t, e, i) {
                        this._update();
                        var s = this._matrix.elements,
                            o = this._stroke,
                            l = this._linewidth,
                            h = this._fill,
                            c = this._opacity * this.parent._renderer
                            .opacity,
                            d = this._visible,
                            f = g(s),
                            u = h._renderer && h._renderer.offset && o
                            ._renderer && o._renderer.offset,
                            _ = this.dashes,
                            m = this._clip;
                        return e || d && !m ? (f || (t.save(), t.transform(
                                s[0], s[3], s[1], s[4], s[2], s[5])),
                            u || (t.font = [this._style, this._weight,
                                this._size + "px/" + this._leading +
                                "px", this._family
                            ].join(" ")), t.textAlign = p.alignments[
                                this._alignment] || this._alignment, t
                            .textBaseline = this._baseline, h && (n
                                .isString(h) ? t.fillStyle = h : (p[h
                                        ._renderer.type].render.call(h,
                                        t), t.fillStyle = h._renderer
                                    .effect)), o && (n.isString(o) ? t
                                .strokeStyle = o : (p[o._renderer.type]
                                    .render.call(o, t), t.strokeStyle =
                                    o._renderer.effect)), l && (t
                                .lineWidth = l), n.isNumber(c) && (t
                                .globalAlpha = c), _ && 0 < _.length &&
                            (t.lineDashOffset = _.offset || 0, t
                                .setLineDash(_)), m || i || (p.isHidden
                                .test(h) || (h._renderer && h._renderer
                                    .offset ? (e = r(h._renderer.scale
                                            .x), s = r(h._renderer.scale
                                            .y), t.save(), t.translate(-
                                            r(h._renderer.offset.x), -r(
                                                h._renderer.offset.y)),
                                        t.scale(e, s), e = this._size /
                                        h._renderer.scale.y, s = this
                                        ._leading / h._renderer.scale.y,
                                        t.font = [this._style, this
                                            ._weight, r(e) + "px/", r(
                                            s) + "px", this._family
                                        ].join(" "), e = h._renderer
                                        .offset.x / h._renderer.scale.x,
                                        h = h._renderer.offset.y / h
                                        ._renderer.scale.y, t.fillText(
                                            this.value, r(e), r(h)), t
                                        .restore()) : t.fillText(this
                                        .value, 0, 0)), p.isHidden.test(
                                    o) || (o._renderer && o._renderer
                                    .offset ? (e = r(o._renderer.scale
                                            .x), s = r(o._renderer.scale
                                            .y), t.save(), t.translate(-
                                            r(o._renderer.offset.x), -r(
                                                o._renderer.offset.y)),
                                        t.scale(e, s), e = this._size /
                                        o._renderer.scale.y, s = this
                                        ._leading / o._renderer.scale.y,
                                        t.font = [this._style, this
                                            ._weight, r(e) + "px/", r(
                                            s) + "px", this._family
                                        ].join(" "), e = o._renderer
                                        .offset.x / o._renderer.scale.x,
                                        h = o._renderer.offset.y / o
                                        ._renderer.scale.y, o = l / o
                                        ._renderer.scale.x, t
                                        .lineWidth = r(o), t.strokeText(
                                            this.value, r(e), r(h)), t
                                        .restore()) : t.strokeText(this
                                        .value, 0, 0))), f || t
                            .restore(), m && !i && t.clip(), _ && 0 < _
                            .length && t.setLineDash(a), this
                            .flagReset()) : this
                    }
                },
                "linear-gradient": {
                    render: function(t) {
                        if (this._update(), !this._renderer.effect || this
                            ._flagEndPoints || this._flagStops)
                            for (this._renderer.effect = t
                                .createLinearGradient(this.left._x, this
                                    .left._y, this.right._x, this.right._y),
                                t = 0; t < this.stops.length; t++) {
                                var e = this.stops[t];
                                this._renderer.effect.addColorStop(e
                                    ._offset, e._color)
                            }
                        return this.flagReset()
                    }
                },
                "radial-gradient": {
                    render: function(t) {
                        if (this._update(), !this._renderer.effect || this
                            ._flagCenter || this._flagFocal || this
                            ._flagRadius || this._flagStops)
                            for (this._renderer.effect = t
                                .createRadialGradient(this.center._x, this
                                    .center._y, 0, this.focal._x, this.focal
                                    ._y, this._radius), t = 0; t < this
                                .stops.length; t++) {
                                var e = this.stops[t];
                                this._renderer.effect.addColorStop(e
                                    ._offset, e._color)
                            }
                        return this.flagReset()
                    }
                },
                texture: {
                    render: function(e) {
                        this._update();
                        var i = this.image;
                        return (!this._renderer.effect || (this
                                ._flagLoaded || this._flagImage || this
                                ._flagVideo || this._flagRepeat) && this
                            .loaded) && (this._renderer.effect = e
                            .createPattern(this.image, this._repeat)), (
                            this._flagOffset || this._flagLoaded || this
                            ._flagScale) && (this._renderer
                            .offset instanceof t.Vector || (this
                                ._renderer.offset = new t.Vector), this
                            ._renderer.offset.x = -this._offset.x, this
                            ._renderer.offset.y = -this._offset.y, i &&
                            (this._renderer.offset.x += i.width / 2,
                                this._renderer.offset.y += i.height / 2,
                                this._scale instanceof t.Vector ? (this
                                    ._renderer.offset.x *= this._scale
                                    .x, this._renderer.offset.y *= this
                                    ._scale.y) : (this._renderer.offset
                                    .x *= this._scale, this._renderer
                                    .offset.y *= this._scale))), (this
                            ._flagScale || this._flagLoaded) && (this
                            ._renderer.scale instanceof t.Vector || (
                                this._renderer.scale = new t.Vector),
                            this._scale instanceof t.Vector ? this
                            ._renderer.scale.copy(this._scale) : this
                            ._renderer.scale.set(this._scale, this
                                ._scale)), this.flagReset()
                    }
                },
                renderSvgArcCommand: function(r, s, n, a, h, u, g, p, m, y) {
                    p = p * Math.PI / 180, a = c(a), h = c(h);
                    var v = (s - m) / 2,
                        x = (n - y) / 2,
                        b = f(p) * v + d(p) * x,
                        w = h * h,
                        A = b * b,
                        S = (v = -d(p) * v + f(p) * x) * v,
                        k = A / (x = a * a) + S / w;
                    for (1 < k && (h *= x = _(k), x = (a *= x) * a, w = h *
                            h), x = _(l(0, (x * w - (A = x * S + w * A)) /
                            A)), u === g && (x = -x), u = x * a * v / h,
                        x = -x * h * b / a, s = f(p) * u - d(p) * x + (s +
                            m) / 2, n = d(p) * u + f(p) * x + (n + y) / 2,
                        y = e(1, 0, (b - u) / a, (v - x) / h), b = e((b -
                            u) / a, (v - x) / h, (-b - u) / a, (-v - x) / h
                            ) % o, v = 0 === g, m = t.Utils.Curve.Tolerance
                        .epsilon, g = y + b - y, b = Math.abs(g) < m, (g =
                            i(g, o)) < m && (g = b ? 0 : o), !0 !== v ||
                        b || (g = g === o ? -o : g - o), b = 0; b < t
                        .Resolution; b++) m = y + b / (t.Resolution - 1) *
                        g, v = s + a * Math.cos(m), w = n + h * Math.sin(m),
                        0 !== p && (v = (x = v - s) * (m = Math.cos(p)) - (
                                w -= n) * (u = Math.sin(p)) + s, w = x * u +
                            w * m + n), r.lineTo(v, w)
                }
            },
            m = t[t.Types.canvas] = function(e) {
                var i = !1 !== e.smoothing;
                this.domElement = e.domElement || document.createElement(
                        "canvas"), this.ctx = this.domElement.getContext("2d"),
                    this.overdraw = e.overdraw || !1, n.isUndefined(this.ctx
                        .imageSmoothingEnabled) || (this.ctx
                        .imageSmoothingEnabled = i), this.scene = new t.Group,
                    this.scene.parent = this
            };
        n.extend(m, {
            Utils: p
        }), n.extend(m.prototype, t.Utils.Events, {
            constructor: m,
            setSize: function(e, i, r) {
                return this.width = e, this.height = i, this.ratio =
                    n.isUndefined(r) ? s(this.ctx) : r, this
                    .domElement.width = e * this.ratio, this
                    .domElement.height = i * this.ratio, this
                    .domElement.style && n.extend(this.domElement
                        .style, {
                            width: e + "px",
                            height: i + "px"
                        }), this.trigger(t.Events.resize, e, i, r)
            },
            render: function() {
                var t = 1 === this.ratio;
                return t || (this.ctx.save(), this.ctx.scale(this
                        .ratio, this.ratio)), this.overdraw || this
                    .ctx.clearRect(0, 0, this.width, this.height), p
                    .group.render.call(this.scene, this.ctx), t ||
                    this.ctx.restore(), this
            }
        })
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.root,
            i = t.Matrix.Multiply,
            r = t.Utils.mod,
            s = [1, 0, 0, 0, 1, 0, 0, 0, 1],
            n = new t.Array(9),
            a = t.Utils.getRatio,
            o = t.Utils.toFixed,
            l = t[t.Types.canvas].Utils,
            h = t.Utils,
            c = {
                isHidden: /(none|transparent)/i,
                canvas: e.document ? e.document.createElement("canvas") : {
                    getContext: h.identity
                },
                alignments: {
                    left: "start",
                    middle: "center",
                    right: "end"
                },
                matrix: new t.Matrix,
                uv: new t.Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
                group: {
                    removeChild: function(t, e) {
                        if (t.children)
                            for (var i = 0; i < t.children.length; i++) c
                                .group.removeChild(t.children[i], e);
                        else e.deleteTexture(t._renderer.texture), delete t
                            ._renderer.texture
                    },
                    renderChild: function(t) {
                        c[t._renderer.type].render.call(t, this.gl, this
                            .program)
                    },
                    render: function(e, r) {
                        this._update();
                        var s = this.parent,
                            a = s._matrix && s._matrix.manual || s
                            ._flagMatrix,
                            o = this._matrix.manual || this._flagMatrix;
                        if ((a || o) && (this._renderer.matrix || (this
                                    ._renderer.matrix = new t.Array(9)),
                                this._matrix.toTransformArray(!0, n), i(n, s
                                    ._renderer.matrix, this._renderer.matrix
                                    ), this._renderer.scale instanceof t
                                .Vector || (this._renderer.scale = new t
                                    .Vector), this._scale instanceof t
                                .Vector ? (this._renderer.scale.x = this
                                    ._scale.x, this._renderer.scale.y = this
                                    ._scale.y) : (this._renderer.scale.x =
                                    this._scale, this._renderer.scale.y =
                                    this._scale), /renderer/i.test(s
                                    ._renderer.type) || (s._renderer
                                    .scale instanceof t.Vector ? (this
                                        ._renderer.scale.x *= s._renderer
                                        .scale.x, this._renderer.scale.y *=
                                        s._renderer.scale.y) : (this
                                        ._renderer.scale.x *= s._renderer
                                        .scale, this._renderer.scale.y *= s
                                        ._renderer.scale)), a && (this
                                    ._flagMatrix = !0)), this._mask && (e
                                .enable(e.STENCIL_TEST), e.stencilFunc(e
                                    .ALWAYS, 1, 1), e.colorMask(!1, !1, !1,
                                    !0), e.stencilOp(e.KEEP, e.KEEP, e
                                .INCR), c[this._mask._renderer.type].render
                                .call(this._mask, e, r, this), e.colorMask(!
                                    0, !0, !0, !0), e.stencilFunc(e
                                    .NOTEQUAL, 0, 1), e.stencilOp(e.KEEP, e
                                    .KEEP, e.KEEP)), this._flagOpacity = s
                            ._flagOpacity || this._flagOpacity, this
                            ._renderer.opacity = this._opacity * (s && s
                                ._renderer ? s._renderer.opacity : 1), this
                            ._flagSubtractions)
                            for (s = 0; s < this.subtractions.length; s++) c
                                .group.removeChild(this.subtractions[s], e);
                        for (s = 0; s < this.children.length; s++) a = this
                            .children[s], c[a._renderer.type].render.call(a,
                                e, r);
                        return this.children.forEach(c.group.renderChild, {
                            gl: e,
                            program: r
                        }), this._mask && (e.colorMask(!1, !1, !1, !1),
                            e.stencilOp(e.KEEP, e.KEEP, e.DECR), c[this
                                ._mask._renderer.type].render.call(this
                                ._mask, e, r, this), e.colorMask(!0, !0,
                                !0, !0), e.stencilFunc(e.NOTEQUAL, 0,
                            1), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e
                            .disable(e.STENCIL_TEST)), this.flagReset()
                    }
                },
                path: {
                    updateCanvas: function(e) {
                        var i = e._renderer.vertices,
                            s = this.canvas,
                            n = this.ctx,
                            a = e._renderer.scale,
                            d = e._stroke,
                            f = e._linewidth,
                            u = e._fill,
                            _ = e._renderer.opacity || e._opacity,
                            g = e._cap,
                            p = e._join,
                            m = e._miter,
                            y = e._closed,
                            v = e.dashes,
                            x = i.length,
                            b = x - 1;
                        a instanceof t.Vector ? (s.width = Math.max(Math
                                .ceil(e._renderer.rect.width * a.x), 1),
                            s.height = Math.max(Math.ceil(e._renderer
                                .rect.height * a.y), 1)) : (s.width =
                            Math.max(Math.ceil(e._renderer.rect.width *
                                a), 1), s.height = Math.max(Math.ceil(e
                                ._renderer.rect.height * a), 1));
                        var w = e._renderer.rect.centroid,
                            A = w.x;
                        for (w = w.y, n.clearRect(0, 0, s.width, s.height),
                            u && (h.isString(u) ? n.fillStyle = u : (c[u
                                    ._renderer.type].render.call(u, n,
                                    e), n.fillStyle = u._renderer
                                .effect)), d && (h.isString(d) ? n
                                .strokeStyle = d : (c[d._renderer.type]
                                    .render.call(d, n, e), n.strokeStyle = d
                                    ._renderer.effect)), f && (n.lineWidth =
                                f), m && (n.miterLimit = m), p && (n
                                .lineJoin = p), g && (n.lineCap = g), h
                            .isNumber(_) && (n.globalAlpha = _), v && 0 < v
                            .length && (n.lineDashOffset = v.offset || 0, n
                                .setLineDash(v)), n.save(), n.scale(a, a), n
                            .translate(A, w), n.beginPath(), e = 0; e < i
                            .length; e++) switch (_ = i[e], s = o(_.x), a =
                            o(_.y), _.command) {
                            case t.Commands.close:
                                n.closePath();
                                break;
                            case t.Commands.arc:
                                p = _.rx, m = _.ry, v = _.xAxisRotation,
                                    A = _.largeArcFlag, _ = _.sweepFlag,
                                    g = i[g = y ? r(e - 1, x) : max(e -
                                        1, 0)], w = o(g.x), g = o(g.y),
                                    l.renderSvgArcCommand(n, w, g, p, m,
                                        A, _, v, s, a);
                                break;
                            case t.Commands.curve:
                                g = y ? r(e - 1, x) : Math.max(e - 1,
                                    0), y && r(e + 1, x), m = (g = i[g])
                                    .controls && g.controls.right || t
                                    .Vector.zero, v = _.controls && _
                                    .controls.left || t.Vector.zero, g
                                    ._relative ? (p = o(m.x + g.x), m =
                                        o(m.y + g.y)) : (p = o(m.x), m =
                                        o(m.y)), _._relative ? (g = o(v
                                        .x + _.x), v = o(v.y + _.y)) : (
                                        g = o(v.x), v = o(v.y)), n
                                    .bezierCurveTo(p, m, g, v, s, a),
                                    e >= b && y && (a = S, g = _
                                        .controls && _.controls.right ||
                                        t.Vector.zero, s = a.controls &&
                                        a.controls.left || t.Vector
                                        .zero, _._relative ? (p = o(g
                                            .x + _.x), m = o(g.y + _
                                            .y)) : (p = o(g.x), m = o(g
                                            .y)), a._relative ? (g = o(s
                                            .x + a.x), v = o(s.y + a
                                            .y)) : (g = o(s.x), v = o(s
                                            .y)), s = o(a.x), a = o(a
                                        .y), n.bezierCurveTo(p, m, g, v,
                                            s, a));
                                break;
                            case t.Commands.line:
                                n.lineTo(s, a);
                                break;
                            case t.Commands.move:
                                var S = _;
                                n.moveTo(s, a)
                        }
                        y && n.closePath(), c.isHidden.test(u) || ((i = u
                                ._renderer && u._renderer.offset) && (n
                                .save(), n.translate(-u._renderer.offset
                                    .x, -u._renderer.offset.y), n.scale(
                                    u._renderer.scale.x, u._renderer
                                    .scale.y)), n.fill(), i && n
                            .restore()), c.isHidden.test(d) || ((i = d
                                ._renderer && d._renderer.offset) && (n
                                .save(), n.translate(-d._renderer.offset
                                    .x, -d._renderer.offset.y), n.scale(
                                    d._renderer.scale.x, d._renderer
                                    .scale.y), n.lineWidth = f / d
                                ._renderer.scale.x), n.stroke(), i && n
                            .restore()), n.restore()
                    },
                    getBoundingClientRect: function(t, e, i) {
                        var r = 1 / 0,
                            s = -1 / 0,
                            n = 1 / 0,
                            a = -1 / 0;
                        t.forEach(function(t) {
                                var e = t.x,
                                    i = t.y,
                                    o = t.controls;
                                if (n = Math.min(i, n), r = Math.min(e,
                                        r), s = Math.max(e, s), a = Math
                                    .max(i, a), t.controls) {
                                    var l = o.left,
                                        h = o.right;
                                    l && h && (o = t._relative ? l.x +
                                        e : l.x, l = t._relative ? l
                                        .y + i : l.y, e = t
                                        ._relative ? h.x + e : h.x,
                                        t = t._relative ? h.y + i :
                                        h.y, o && l && e && t && (
                                            n = Math.min(l, t, n),
                                            r = Math.min(o, e, r),
                                            s = Math.max(o, e, s),
                                            a = Math.max(l, t, a)))
                                }
                            }), h.isNumber(e) && (n -= e, r -= e, s += e,
                                a += e), i.top = n, i.left = r, i.right = s,
                            i.bottom = a, i.width = s - r, i.height = a - n,
                            i.centroid || (i.centroid = {}), i.centroid
                            .x = -r, i.centroid.y = -n
                    },
                    render: function(e, r, s) {
                        if (!this._visible || !this._opacity) return this;
                        this._update();
                        var a = this.parent,
                            o = this._matrix.manual || this._flagMatrix,
                            l = this._flagVertices || this._flagFill || this
                            ._fill instanceof t.LinearGradient && (this
                                ._fill._flagSpread || this._fill
                                ._flagStops || this._fill._flagEndPoints) ||
                            this._fill instanceof t.RadialGradient && (this
                                ._fill._flagSpread || this._fill
                                ._flagStops || this._fill._flagRadius ||
                                this._fill._flagCenter || this._fill
                                ._flagFocal) || this._fill instanceof t
                            .Texture && (this._fill._flagLoaded && this
                                ._fill.loaded || this._fill._flagImage ||
                                this._fill._flagVideo || this._fill
                                ._flagRepeat || this._fill._flagOffset ||
                                this._fill._flagScale) || this
                            ._stroke instanceof t.LinearGradient && (this
                                ._stroke._flagSpread || this._stroke
                                ._flagStops || this._stroke._flagEndPoints
                                ) || this._stroke instanceof t
                            .RadialGradient && (this._stroke._flagSpread ||
                                this._stroke._flagStops || this._stroke
                                ._flagRadius || this._stroke._flagCenter ||
                                this._stroke._flagFocal) || this
                            ._stroke instanceof t.Texture && (this._stroke
                                ._flagLoaded && this._stroke.loaded || this
                                ._stroke._flagImage || this._stroke
                                ._flagVideo || this._stroke._flagRepeat ||
                                this._stroke._flagOffset || this._fill
                                ._flagScale) || this._flagStroke || this
                            ._flagLinewidth || this._flagOpacity || a
                            ._flagOpacity || this._flagVisible || this
                            ._flagCap || this._flagJoin || this
                            ._flagMiter || this._flagScale || this.dashes &&
                            0 < this.dashes.length || !this._renderer
                            .texture;
                        return (a._matrix.manual || a._flagMatrix || o) && (
                                this._renderer.matrix || (this._renderer
                                    .matrix = new t.Array(9)), this._matrix
                                .toTransformArray(!0, n), i(n, a._renderer
                                    .matrix, this._renderer.matrix), this
                                ._renderer.scale instanceof t.Vector || (
                                    this._renderer.scale = new t.Vector),
                                this._scale instanceof t.Vector ? (this
                                    ._renderer.scale.x = this._scale.x * a
                                    ._renderer.scale.x, this._renderer.scale
                                    .y = this._scale.y * a._renderer.scale.y
                                    ) : (this._renderer.scale.x = this
                                    ._scale * a._renderer.scale.x, this
                                    ._renderer.scale.y = this._scale * a
                                    ._renderer.scale.y)), l ? (this
                                ._renderer.rect || (this._renderer
                                    .rect = {}), this._renderer.triangles ||
                                (this._renderer.triangles = new t.Array(
                                12)), this._renderer.opacity = this
                                ._opacity * a._renderer.opacity, c.path
                                .getBoundingClientRect(this._renderer
                                    .vertices, this._linewidth, this
                                    ._renderer.rect), c.getTriangles(this
                                    ._renderer.rect, this._renderer
                                    .triangles), c.updateBuffer.call(c, e,
                                    this, r), c.updateTexture.call(c, e,
                                    this)) : (h.isString(this._fill) || this
                                ._fill._update(), h.isString(this
                                ._stroke) || this._stroke._update()), !this
                            ._clip || s ? (e.bindBuffer(e.ARRAY_BUFFER, this
                                    ._renderer.textureCoordsBuffer), e
                                .vertexAttribPointer(r.textureCoords, 2, e
                                    .FLOAT, !1, 0, 0), e.bindTexture(e
                                    .TEXTURE_2D, this._renderer.texture), e
                                .uniformMatrix3fv(r.matrix, !1, this
                                    ._renderer.matrix), e.bindBuffer(e
                                    .ARRAY_BUFFER, this._renderer.buffer), e
                                .vertexAttribPointer(r.position, 2, e.FLOAT,
                                    !1, 0, 0), e.drawArrays(e.TRIANGLES, 0,
                                    6), this.flagReset()) : void 0
                    }
                },
                text: {
                    updateCanvas: function(e) {
                        var i = this.canvas,
                            r = this.ctx,
                            s = e._renderer.scale,
                            n = e._stroke,
                            a = e._linewidth * s,
                            l = e._fill,
                            d = e._renderer.opacity || e._opacity,
                            f = e.dashes;
                        s instanceof t.Vector ? (i.width = Math.max(Math
                                .ceil(e._renderer.rect.width * s.x), 1),
                            i.height = Math.max(Math.ceil(e._renderer
                                .rect.height * s.y), 1)) : (i.width =
                            Math.max(Math.ceil(e._renderer.rect.width *
                                s), 1), i.height = Math.max(Math.ceil(e
                                ._renderer.rect.height * s), 1));
                        var u = e._renderer.rect.centroid,
                            _ = u.x;
                        u = u.y;
                        var g = l._renderer && l._renderer.offset && n
                            ._renderer && n._renderer.offset;
                        r.clearRect(0, 0, i.width, i.height), g || (r
                                .font = [e._style, e._weight, e._size +
                                    "px/" + e._leading + "px", e._family
                                ].join(" ")), r.textAlign = "center", r
                            .textBaseline = "middle", l && (h.isString(l) ?
                                r.fillStyle = l : (c[l._renderer.type]
                                    .render.call(l, r, e), r.fillStyle = l
                                    ._renderer.effect)), n && (h.isString(
                                n) ? r.strokeStyle = n : (c[n._renderer
                                        .type].render.call(n, r, e), r
                                    .strokeStyle = n._renderer.effect)),
                            a && (r.lineWidth = a), h.isNumber(d) && (r
                                .globalAlpha = d), f && 0 < f.length && (r
                                .lineDashOffset = f.offset || 0, r
                                .setLineDash(f)), r.save(), r.scale(s, s), r
                            .translate(_, u), c.isHidden.test(l) || (l
                                ._renderer && l._renderer.offset ? (i = o(l
                                        ._renderer.scale.x), s = o(l
                                        ._renderer.scale.y), r.save(), r
                                    .translate(-o(l._renderer.offset.x), -o(
                                        l._renderer.offset.y)), r.scale(i,
                                        s), i = e._size / l._renderer.scale
                                    .y, s = e._leading / l._renderer.scale
                                    .y, r.font = [e._style, e._weight, o(
                                        i) + "px/", o(s) + "px", e._family
                                    ].join(" "), i = l._renderer.offset.x /
                                    l._renderer.scale.x, l = l._renderer
                                    .offset.y / l._renderer.scale.y, r
                                    .fillText(e.value, o(i), o(l)), r
                                    .restore()) : r.fillText(e.value, 0, 0)
                                ), c.isHidden.test(n) || (n._renderer && n
                                ._renderer.offset ? (i = o(n._renderer.scale
                                        .x), s = o(n._renderer.scale.y), r
                                    .save(), r.translate(-o(n._renderer
                                        .offset.x), -o(n._renderer
                                        .offset.y)), r.scale(i, s), i = e
                                    ._size / n._renderer.scale.y, s = e
                                    ._leading / n._renderer.scale.y, r
                                    .font = [e._style, e._weight, o(i) +
                                        "px/", o(s) + "px", e._family
                                    ].join(" "), i = n._renderer.offset.x /
                                    n._renderer.scale.x, l = n._renderer
                                    .offset.y / n._renderer.scale.y, n = a /
                                    n._renderer.scale.x, r.lineWidth = o(n),
                                    r.strokeText(e.value, o(i), o(l)), r
                                    .restore()) : r.strokeText(e.value, 0,
                                    0)), r.restore()
                    },
                    getBoundingClientRect: function(t, e) {
                        var i = c.ctx;
                        i.font = [t._style, t._weight, t._size + "px/" + t
                                ._leading + "px", t._family
                            ].join(" "), i.textAlign = "center", i
                            .textBaseline = t._baseline, i = 1.25 * i
                            .measureText(t._value).width;
                        var r = 1.25 * Math.max(t._size, t._leading);
                        this._linewidth && !c.isHidden.test(this._stroke) &&
                            (i += 2 * this._linewidth, r += 2 * this
                                ._linewidth);
                        var s = i / 2,
                            n = r / 2;
                        switch (c.alignments[t._alignment] || t
                        ._alignment) {
                            case c.alignments.left:
                                e.left = 0, e.right = i;
                                break;
                            case c.alignments.right:
                                e.left = -i, e.right = 0;
                                break;
                            default:
                                e.left = -s, e.right = s
                        }
                        switch (t._baseline) {
                            case "bottom":
                                e.top = -r, e.bottom = 0;
                                break;
                            case "top":
                                e.top = 0, e.bottom = r;
                                break;
                            default:
                                e.top = -n, e.bottom = n
                        }
                        e.width = i, e.height = r, e.centroid || (e
                                .centroid = {}), e.centroid.x = s, e
                            .centroid.y = n
                    },
                    render: function(e, r, s) {
                        if (!this._visible || !this._opacity) return this;
                        this._update();
                        var a = this.parent,
                            o = this._matrix.manual || this._flagMatrix,
                            l = this._flagVertices || this._flagFill || this
                            ._fill instanceof t.LinearGradient && (this
                                ._fill._flagSpread || this._fill
                                ._flagStops || this._fill._flagEndPoints) ||
                            this._fill instanceof t.RadialGradient && (this
                                ._fill._flagSpread || this._fill
                                ._flagStops || this._fill._flagRadius ||
                                this._fill._flagCenter || this._fill
                                ._flagFocal) || this._fill instanceof t
                            .Texture && (this._fill._flagLoaded && this
                                ._fill.loaded || this._fill._flagImage ||
                                this._fill._flagVideo || this._fill
                                ._flagRepeat || this._fill._flagOffset ||
                                this._fill._flagScale) || this
                            ._stroke instanceof t.LinearGradient && (this
                                ._stroke._flagSpread || this._stroke
                                ._flagStops || this._stroke._flagEndPoints
                                ) || this._stroke instanceof t
                            .RadialGradient && (this._stroke._flagSpread ||
                                this._stroke._flagStops || this._stroke
                                ._flagRadius || this._stroke._flagCenter ||
                                this._stroke._flagFocal) || this
                            ._stroke instanceof t.Texture && (this._stroke
                                ._flagLoaded && this._stroke.loaded || this
                                ._stroke._flagImage || this._stroke
                                ._flagVideo || this._stroke._flagRepeat ||
                                this._stroke._flagOffset || this._fill
                                ._flagScale) || this._flagStroke || this
                            ._flagLinewidth || this._flagOpacity || a
                            ._flagOpacity || this._flagVisible || this
                            ._flagScale || this._flagValue || this
                            ._flagFamily || this._flagSize || this
                            ._flagLeading || this._flagAlignment || this
                            ._flagBaseline || this._flagStyle || this
                            ._flagWeight || this._flagDecoration || this
                            .dashes && 0 < this.dashes.length || !this
                            ._renderer.texture;
                        return (a._matrix.manual || a._flagMatrix || o) && (
                            this._renderer.matrix || (this._renderer
                                .matrix = new t.Array(9)), this._matrix
                            .toTransformArray(!0, n), i(n, a._renderer
                                .matrix, this._renderer.matrix), this
                            ._renderer.scale instanceof t.Vector || (
                                this._renderer.scale = new t.Vector),
                            this._scale instanceof t.Vector ? (this
                                ._renderer.scale.x = this._scale.x * a
                                ._renderer.scale.x, this._renderer.scale
                                .y = this._scale.y * a._renderer.scale.y
                                ) : (this._renderer.scale.x = this
                                ._scale * a._renderer.scale.x, this
                                ._renderer.scale.y = this._scale * a
                                ._renderer.scale.y)), l ? (this
                            ._renderer.rect || (this._renderer
                                .rect = {}), this._renderer.triangles ||
                            (this._renderer.triangles = new t.Array(
                            12)), this._renderer.opacity = this
                            ._opacity * a._renderer.opacity, c.text
                            .getBoundingClientRect(this, this._renderer
                                .rect), c.getTriangles(this._renderer
                                .rect, this._renderer.triangles), c
                            .updateBuffer.call(c, e, this, r), c
                            .updateTexture.call(c, e, this)) : (h
                            .isString(this._fill) || this._fill
                            ._update(), h.isString(this._stroke) || this
                            ._stroke._update()), !this._clip || s ? (e
                            .bindBuffer(e.ARRAY_BUFFER, this._renderer
                                .textureCoordsBuffer), e
                            .vertexAttribPointer(r.textureCoords, 2, e
                                .FLOAT, !1, 0, 0), e.bindTexture(e
                                .TEXTURE_2D, this._renderer.texture), e
                            .uniformMatrix3fv(r.matrix, !1, this
                                ._renderer.matrix), e.bindBuffer(e
                                .ARRAY_BUFFER, this._renderer.buffer), e
                            .vertexAttribPointer(r.position, 2, e.FLOAT,
                                !1, 0, 0), e.drawArrays(e.TRIANGLES, 0,
                                6), this.flagReset()) : void 0
                    }
                },
                "linear-gradient": {
                    render: function(t, e) {
                        if (t.canvas.getContext("2d")) {
                            if (this._update(), !this._renderer.effect ||
                                this._flagEndPoints || this._flagStops)
                                for (this._renderer.effect = t
                                    .createLinearGradient(this.left._x, this
                                        .left._y, this.right._x, this.right
                                        ._y), t = 0; t < this.stops
                                    .length; t++) e = this.stops[t], this
                                    ._renderer.effect.addColorStop(e
                                        ._offset, e._color);
                            return this.flagReset()
                        }
                    }
                },
                "radial-gradient": {
                    render: function(t, e) {
                        if (t.canvas.getContext("2d")) {
                            if (this._update(), !this._renderer.effect ||
                                this._flagCenter || this._flagFocal || this
                                ._flagRadius || this._flagStops)
                                for (this._renderer.effect = t
                                    .createRadialGradient(this.center._x,
                                        this.center._y, 0, this.focal._x,
                                        this.focal._y, this._radius), t =
                                    0; t < this.stops.length; t++) e = this
                                    .stops[t], this._renderer.effect
                                    .addColorStop(e._offset, e._color);
                            return this.flagReset()
                        }
                    }
                },
                texture: {
                    render: function(e, i) {
                        if (e.canvas.getContext("2d")) {
                            if (this._update(), i = this.image, (this
                                    ._flagLoaded || this._flagImage || this
                                    ._flagVideo || this._flagRepeat) && this
                                .loaded) this._renderer.effect = e
                                .createPattern(i, this._repeat);
                            else if (!this._renderer.effect) return this
                                .flagReset();
                            return (this._flagOffset || this._flagLoaded ||
                                    this._flagScale) && (this._renderer
                                    .offset instanceof t.Vector || (this
                                        ._renderer.offset = new t.Vector),
                                    this._renderer.offset.x = -this._offset
                                    .x, this._renderer.offset.y = -this
                                    ._offset.y, i && (this._renderer.offset
                                        .x += i.width / 2, this._renderer
                                        .offset.y += i.height / 2, this
                                        ._scale instanceof t.Vector ? (this
                                            ._renderer.offset.x *= this
                                            ._scale.x, this._renderer.offset
                                            .y *= this._scale.y) : (this
                                            ._renderer.offset.x *= this
                                            ._scale, this._renderer.offset
                                            .y *= this._scale))), (this
                                    ._flagScale || this._flagLoaded) && (
                                    this._renderer.scale instanceof t
                                    .Vector || (this._renderer.scale = new t
                                        .Vector), this._scale instanceof t
                                    .Vector ? this._renderer.scale.copy(this
                                        ._scale) : this._renderer.scale.set(
                                        this._scale, this._scale)), this
                                .flagReset()
                        }
                    }
                },
                getTriangles: function(t, e) {
                    var i = t.top,
                        r = t.left,
                        s = t.right;
                    t = t.bottom, e[0] = r, e[1] = i, e[2] = s, e[3] = i, e[
                            4] = r, e[5] = t, e[6] = r, e[7] = t, e[8] = s,
                        e[9] = i, e[10] = s, e[11] = t
                },
                updateTexture: function(t, e) {
                    this[e._renderer.type].updateCanvas.call(c, e), e
                        ._renderer.texture && t.deleteTexture(e._renderer
                            .texture), t.bindBuffer(t.ARRAY_BUFFER, e
                            ._renderer.textureCoordsBuffer), e._renderer
                        .texture = t.createTexture(), t.bindTexture(t
                            .TEXTURE_2D, e._renderer.texture), t
                        .texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t
                            .CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t
                            .TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t
                        .texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t
                            .LINEAR), 0 >= this.canvas.width || 0 >= this
                        .canvas.height || t.texImage2D(t.TEXTURE_2D, 0, t
                            .RGBA, t.RGBA, t.UNSIGNED_BYTE, this.canvas)
                },
                updateBuffer: function(t, e, i) {
                    h.isObject(e._renderer.buffer) && t.deleteBuffer(e
                            ._renderer.buffer), e._renderer.buffer = t
                        .createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, e
                            ._renderer.buffer), t.enableVertexAttribArray(i
                            .position), t.bufferData(t.ARRAY_BUFFER, e
                            ._renderer.triangles, t.STATIC_DRAW), h
                        .isObject(e._renderer.textureCoordsBuffer) && t
                        .deleteBuffer(e._renderer.textureCoordsBuffer), e
                        ._renderer.textureCoordsBuffer = t.createBuffer(), t
                        .bindBuffer(t.ARRAY_BUFFER, e._renderer
                            .textureCoordsBuffer), t
                        .enableVertexAttribArray(i.textureCoords), t
                        .bufferData(t.ARRAY_BUFFER, this.uv, t.STATIC_DRAW)
                },
                program: {
                    create: function(e, i) {
                        var r = e.createProgram();
                        if (h.each(i, function(t) {
                                e.attachShader(r, t)
                            }), e.linkProgram(r), !e.getProgramParameter(r,
                                e.LINK_STATUS)) throw i = e
                            .getProgramInfoLog(r), e.deleteProgram(r),
                            new t.Utils.Error(
                                "unable to link program: " + i);
                        return r
                    }
                },
                shaders: {
                    create: function(e, i, r) {
                        if (r = e.createShader(e[r]), e.shaderSource(r, i),
                            e.compileShader(r), !e.getShaderParameter(r, e
                                .COMPILE_STATUS)) throw i = e
                            .getShaderInfoLog(r), e.deleteShader(r),
                            new t.Utils.Error(
                                "unable to compile shader " + r + ": " +
                                i);
                        return r
                    },
                    types: {
                        vertex: "VERTEX_SHADER",
                        fragment: "FRAGMENT_SHADER"
                    },
                    vertex: "attribute vec2 a_position;\nattribute vec2 a_textureCoords;\n\nuniform mat3 u_matrix;\nuniform vec2 u_resolution;\n\nvarying vec2 v_textureCoords;\n\nvoid main() {\n   vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;\n   vec2 normal = projected / u_resolution;\n   vec2 clipspace = (normal * 2.0) - 1.0;\n\n   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);\n   v_textureCoords = a_textureCoords;\n}",
                    fragment: "precision mediump float;\n\nuniform sampler2D u_image;\nvarying vec2 v_textureCoords;\n\nvoid main() {\n  gl_FragColor = texture2D(u_image, v_textureCoords);\n}"
                },
                TextureRegistry: new t.Registry
            };
        c.ctx = c.canvas.getContext("2d"), e = t[t.Types.webgl] = function(e) {
            if (this.domElement = e.domElement || document.createElement(
                    "canvas"), h.isUndefined(e.offscreenElement) || (c
                    .canvas = e.offscreenElement, c.ctx = c.canvas
                    .getContext("2d")), this.scene = new t.Group, this.scene
                .parent = this, this._renderer = {
                    type: "renderer",
                    matrix: new t.Array(s),
                    scale: 1,
                    opacity: 1
                }, this._flagMatrix = !0, e = h.defaults(e || {}, {
                    antialias: !1,
                    alpha: !0,
                    premultipliedAlpha: !0,
                    stencil: !0,
                    preserveDrawingBuffer: !0,
                    overdraw: !1
                }), this.overdraw = e.overdraw, e = this.ctx = this
                .domElement.getContext("webgl", e) || this.domElement
                .getContext("experimental-webgl", e), !this.ctx) throw new t
                .Utils.Error(
                    "unable to create a webgl context. Try using another renderer."
                    );
            var i = c.shaders.create(e, c.shaders.vertex, c.shaders.types
                    .vertex),
                r = c.shaders.create(e, c.shaders.fragment, c.shaders.types
                    .fragment);
            this.program = c.program.create(e, [i, r]), e.useProgram(this
                    .program), this.program.position = e.getAttribLocation(
                    this.program, "a_position"), this.program.matrix = e
                .getUniformLocation(this.program, "u_matrix"), this.program
                .textureCoords = e.getAttribLocation(this.program,
                    "a_textureCoords"), e.disable(e.DEPTH_TEST), e.enable(e
                    .BLEND), e.blendEquationSeparate(e.FUNC_ADD, e
                .FUNC_ADD), e.blendFuncSeparate(e.SRC_ALPHA, e
                    .ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)
        }, h.extend(e, {
            Utils: c
        }), h.extend(e.prototype, t.Utils.Events, {
            constructor: e,
            setSize: function(e, i, r) {
                this.width = e, this.height = i, this.ratio = h
                    .isUndefined(r) ? a(this.ctx) : r, this
                    .domElement.width = e * this.ratio, this
                    .domElement.height = i * this.ratio, h.isObject(
                        this.domElement.style) && h.extend(this
                        .domElement.style, {
                            width: e + "px",
                            height: i + "px"
                        }), e *= this.ratio, i *= this.ratio, this
                    ._renderer.matrix[0] = this._renderer.matrix[
                    4] = this._renderer.scale = this.ratio, this
                    ._flagMatrix = !0, this.ctx.viewport(0, 0, e,
                    i);
                var s = this.ctx.getUniformLocation(this.program,
                    "u_resolution");
                return this.ctx.uniform2f(s, e, i), this.trigger(t
                    .Events.resize, e, i, r)
            },
            render: function() {
                var t = this.ctx;
                return this.overdraw || t.clear(t.COLOR_BUFFER_BIT |
                        t.DEPTH_BUFFER_BIT), c.group.render.call(
                        this.scene, t, this.program), this
                    ._flagMatrix = !1, this
            }
        })
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.Shape = function() {
                this._renderer = {}, this._renderer.flagMatrix = e.bind(i
                        .FlagMatrix, this), this.isShape = !0, this.id = t
                    .Identifier + t.uniqueId(), this.classList = [], this
                    ._matrix = new t.Matrix, this.translation = new t.Vector,
                    this.rotation = 0, this.scale = 1
            };
        e.extend(i, {
            FlagMatrix: function() {
                this._flagMatrix = !0
            },
            MakeObservable: function(e) {
                var r = {
                    enumerable: !1,
                    get: function() {
                        return this._translation
                    },
                    set: function(e) {
                        this._translation && this
                            ._translation.unbind(t.Events
                                .change, this._renderer
                                .flagMatrix), this
                            ._translation = e, this
                            ._translation.bind(t.Events
                                .change, this._renderer
                                .flagMatrix), i.FlagMatrix
                            .call(this)
                    }
                };
                Object.defineProperty(e, "translation", r), Object
                    .defineProperty(e, "position", r), Object
                    .defineProperty(e, "rotation", {
                        enumerable: !0,
                        get: function() {
                            return this._rotation
                        },
                        set: function(t) {
                            this._rotation = t, this
                                ._flagMatrix = !0
                        }
                    }), Object.defineProperty(e, "scale", {
                        enumerable: !0,
                        get: function() {
                            return this._scale
                        },
                        set: function(e) {
                            this._scale instanceof t
                                .Vector && this._scale
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagMatrix), this
                                ._scale = e, this
                                ._scale instanceof t
                                .Vector && this._scale.bind(
                                    t.Events.change, this
                                    ._renderer.flagMatrix),
                                this._flagScale = this
                                ._flagMatrix = !0
                        }
                    })
            }
        }), e.extend(i.prototype, t.Utils.Events, {
            _flagMatrix: !0,
            _flagScale: !1,
            _translation: null,
            _rotation: 0,
            _scale: 1,
            constructor: i,
            addTo: function(t) {
                return t.add(this), this
            },
            clone: function(t) {
                var e = new i;
                return e.translation.copy(this.translation), e
                    .rotation = this.rotation, e.scale = this.scale,
                    t && t.add(e), e._update()
            },
            _update: function(e) {
                return !this._matrix.manual && this._flagMatrix && (
                        this._matrix.identity().translate(this
                            .translation.x, this.translation.y),
                        this._scale instanceof t.Vector ? this
                        ._matrix.scale(this._scale.x, this._scale
                        .y) : this._matrix.scale(this._scale), this
                        ._matrix.rotate(this.rotation)), e && this
                    .parent && this.parent._update && this.parent
                    ._update(), this
            },
            flagReset: function() {
                return this._flagMatrix = this._flagScale = !1, this
            }
        }), i.MakeObservable(i.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        function e(t, e) {
            if (0 === e || 1 === e) return !0;
            e *= t._length;
            for (var i = 0, r = 0; r < t._lengths.length; r++) {
                if (i >= e) return 0 <= e - i;
                i += t._lengths[r]
            }
            return !1
        }

        function i(t, e) {
            if (0 >= e) return 0;
            if (e >= t._length) return t._lengths.length - 1;
            for (var i = 0, r = 0; i < t._lengths.length; i++) {
                if (r + t._lengths[i] >= e) return e -= r, Math.max(i - 1, 0) +
                    e / t._lengths[i];
                r += t._lengths[i]
            }
            return -1
        }

        function r(e, i, r) {
            var s = i.controls && i.controls.right,
                n = e.controls && e.controls.left,
                a = i.x,
                o = i.y,
                l = (s || i).x,
                h = (s || i).y,
                c = (n || e).x,
                d = (n || e).y,
                f = e.x,
                u = e.y;
            return s && i._relative && (l += i.x, h += i.y), n && e._relative &&
                (c += e.x, d += e.y), t.Utils.getCurveLength(a, o, l, h, c, d,
                    f, u, r)
        }

        function s(e, i, r) {
            var s = i.controls && i.controls.right,
                n = e.controls && e.controls.left,
                a = i.x,
                o = i.y,
                l = (s || i).x,
                h = (s || i).y,
                c = (n || e).x,
                d = (n || e).y,
                f = e.x,
                u = e.y;
            return s && i._relative && (l += i.x, h += i.y), n && e._relative &&
                (c += e.x, d += e.y), t.Utils.subdivide(a, o, l, h, c, d, f, u,
                    r)
        }
        var n = Math.min,
            a = Math.max,
            o = Math.ceil,
            l = Math.floor,
            h = t.Utils.getComputedMatrix,
            c = t.Utils;
        c.each(t.Commands, function(t, e) {});
        var d = t.Path = function(e, i, r, s) {
            t.Shape.call(this), this._renderer.type = "path", this._renderer
                .flagVertices = c.bind(d.FlagVertices, this), this._renderer
                .bindVertices = c.bind(d.BindVertices, this), this._renderer
                .unbindVertices = c.bind(d.UnbindVertices, this), this
                ._renderer.flagFill = c.bind(d.FlagFill, this), this
                ._renderer.flagStroke = c.bind(d.FlagStroke, this), this
                ._renderer.vertices = [], this._renderer.collection = [],
                this._closed = !!i, this._curved = !!r, this.beginning = 0,
                this.ending = 1, this.fill = "#fff", this.stroke = "#000",
                this.opacity = this.linewidth = 1, this.className = "", this
                .visible = !0, this.cap = "butt", this.join = "miter", this
                .miter = 4, this.vertices = e, this.automatic = !s, this
                .dashes = [], this.dashes.offset = 0
        };
        c.extend(d, {
            Properties: "fill stroke linewidth opacity className visible cap join miter closed curved automatic beginning ending"
                .split(" "),
            Utils: {
                getCurveLength: r
            },
            FlagVertices: function() {
                this._flagLength = this._flagVertices = !0, this
                    .parent && (this.parent._flagLength = !0)
            },
            BindVertices: function(e) {
                for (var i = e.length; i--;) e[i].bind(t.Events
                    .change, this._renderer.flagVertices);
                this._renderer.flagVertices()
            },
            UnbindVertices: function(e) {
                for (var i = e.length; i--;) e[i].unbind(t.Events
                    .change, this._renderer.flagVertices);
                this._renderer.flagVertices()
            },
            FlagFill: function() {
                this._flagFill = !0
            },
            FlagStroke: function() {
                this._flagStroke = !0
            },
            MakeObservable: function(e) {
                t.Shape.MakeObservable(e), c.each(d.Properties
                        .slice(2, 9), t.Utils.defineProperty, e),
                    Object.defineProperty(e, "fill", {
                        enumerable: !0,
                        get: function() {
                            return this._fill
                        },
                        set: function(e) {
                            (this._fill instanceof t
                                .Gradient || this
                                ._fill instanceof t
                                .LinearGradient || this
                                ._fill instanceof t
                                .RadialGradient || this
                                ._fill instanceof t.Texture
                                ) && this._fill.unbind(t
                                    .Events.change, this
                                    ._renderer.flagFill),
                                this._fill = e, this
                                ._flagFill = !0, (this
                                    ._fill instanceof t
                                    .Gradient || this
                                    ._fill instanceof t
                                    .LinearGradient || this
                                    ._fill instanceof t
                                    .RadialGradient || this
                                    ._fill instanceof t
                                    .Texture) && this._fill
                                .bind(t.Events.change, this
                                    ._renderer.flagFill)
                        }
                    }), Object.defineProperty(e, "stroke", {
                        enumerable: !0,
                        get: function() {
                            return this._stroke
                        },
                        set: function(e) {
                            (this._stroke instanceof t
                                .Gradient || this
                                ._stroke instanceof t
                                .LinearGradient || this
                                ._stroke instanceof t
                                .RadialGradient || this
                                ._stroke instanceof t
                                .Texture) && this._stroke
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagStroke), this
                                ._stroke = e, this
                                ._flagStroke = !0, (this
                                    ._stroke instanceof t
                                    .Gradient || this
                                    ._stroke instanceof t
                                    .LinearGradient || this
                                    ._stroke instanceof t
                                    .RadialGradient || this
                                    ._stroke instanceof t
                                    .Texture) && this
                                ._stroke.bind(t.Events
                                    .change, this._renderer
                                    .flagStroke)
                        }
                    }), Object.defineProperty(e, "length", {
                        get: function() {
                            return this._flagLength && this
                                ._updateLength(), this
                                ._length
                        }
                    }), Object.defineProperty(e, "closed", {
                        enumerable: !0,
                        get: function() {
                            return this._closed
                        },
                        set: function(t) {
                            this._closed = !!t, this
                                ._flagVertices = !0
                        }
                    }), Object.defineProperty(e, "curved", {
                        enumerable: !0,
                        get: function() {
                            return this._curved
                        },
                        set: function(t) {
                            this._curved = !!t, this
                                ._flagVertices = !0
                        }
                    }), Object.defineProperty(e, "automatic", {
                        enumerable: !0,
                        get: function() {
                            return this._automatic
                        },
                        set: function(t) {
                            if (t !== this._automatic) {
                                var e = (this._automatic = !
                                        !t) ? "ignore" :
                                    "listen";
                                c.each(this.vertices,
                                    function(t) {
                                        t[e]()
                                    })
                            }
                        }
                    }), Object.defineProperty(e, "beginning", {
                        enumerable: !0,
                        get: function() {
                            return this._beginning
                        },
                        set: function(t) {
                            this._beginning = t, this
                                ._flagVertices = !0
                        }
                    }), Object.defineProperty(e, "ending", {
                        enumerable: !0,
                        get: function() {
                            return this._ending
                        },
                        set: function(t) {
                            this._ending = t, this
                                ._flagVertices = !0
                        }
                    }), Object.defineProperty(e, "vertices", {
                        enumerable: !0,
                        get: function() {
                            return this._collection
                        },
                        set: function(e) {
                            var i = this._renderer
                                .bindVertices,
                                r = this._renderer
                                .unbindVertices;
                            this._collection && this
                                ._collection.unbind(t.Events
                                    .insert, i).unbind(t
                                    .Events.remove, r), this
                                ._collection =
                                e instanceof t.Utils
                                .Collection ? e : new t
                                .Utils.Collection(e || []),
                                this._collection.bind(t
                                    .Events.insert, i).bind(
                                    t.Events.remove, r), i(
                                    this._collection)
                        }
                    }), Object.defineProperty(e, "clip", {
                        enumerable: !0,
                        get: function() {
                            return this._clip
                        },
                        set: function(t) {
                            this._clip = t, this
                                ._flagClip = !0
                        }
                    }), Object.defineProperty(e, "dashes", {
                        enumerable: !0,
                        get: function() {
                            return this._dashes
                        },
                        set: function(t) {
                            c.isNumber(t.offset) || (t
                                    .offset = this._dashes
                                    .offset || 0), this
                                ._dashes = t
                        }
                    })
            }
        }), c.extend(d.prototype, t.Shape.prototype, {
            _flagVertices: !0,
            _flagLength: !0,
            _flagFill: !0,
            _flagStroke: !0,
            _flagLinewidth: !0,
            _flagOpacity: !0,
            _flagVisible: !0,
            _flagClassName: !0,
            _flagCap: !0,
            _flagJoin: !0,
            _flagMiter: !0,
            _flagClip: !1,
            _length: 0,
            _fill: "#fff",
            _stroke: "#000",
            _linewidth: 1,
            _opacity: 1,
            _className: "",
            _visible: !0,
            _cap: "round",
            _join: "round",
            _miter: 4,
            _closed: !0,
            _curved: !1,
            _automatic: !0,
            _beginning: 0,
            _ending: 1,
            _clip: !1,
            _dashes: [],
            constructor: d,
            clone: function(t) {
                var e = new d;
                e.vertices = this.vertices;
                for (var i = 0; i < d.Properties.length; i++) {
                    var r = d.Properties[i];
                    e[r] = this[r]
                }
                return e.translation.copy(this.translation), e
                    .rotation = this.rotation, e.scale = this.scale,
                    t && t.add(e), e._update()
            },
            toObject: function() {
                var e = {
                    vertices: c.map(this.vertices, function(t) {
                        return t.toObject()
                    })
                };
                return c.each(t.Shape.Properties, function(t) {
                        e[t] = this[t]
                    }, this), e.translation = this.translation
                    .toObject(), e.rotation = this.rotation, e
                    .scale = this.scale instanceof t.Vector ? this
                    .scale.toObject() : this.scale, e
            },
            noFill: function() {
                return this.fill = "transparent", this
            },
            noStroke: function() {
                return this.stroke = "transparent", this
            },
            corner: function() {
                var t = this.getBoundingClientRect(!0);
                return t.centroid = {
                    x: t.left + t.width / 2,
                    y: t.top + t.height / 2
                }, c.each(this.vertices, function(e) {
                    e.subSelf(t.centroid), e.x += t.width /
                        2, e.y += t.height / 2
                }), this
            },
            center: function() {
                var t = this.getBoundingClientRect(!0);
                return t.centroid = {
                    x: t.left + t.width / 2,
                    y: t.top + t.height / 2
                }, c.each(this.vertices, function(e) {
                    e.subSelf(t.centroid)
                }), this
            },
            remove: function() {
                return this.parent ? (this.parent.remove(this),
                    this) : this
            },
            getBoundingClientRect: function(e) {
                var i, r = 1 / 0,
                    s = -1 / 0,
                    o = 1 / 0,
                    l = -1 / 0;
                this._update(!0), e = e ? this._matrix : h(this);
                var c = this.linewidth / 2,
                    d = this._renderer.vertices.length;
                if (0 >= d) return v = e.multiply(0, 0, 1), {
                    top: v.y,
                    left: v.x,
                    right: v.x,
                    bottom: v.y,
                    width: 0,
                    height: 0
                };
                for (i = 1; i < d; i++) {
                    var f = this._renderer.vertices[i],
                        u = this._renderer.vertices[i - 1];
                    if (u.controls && f.controls) {
                        var _ = u.relative ? e.multiply(u.controls
                            .right.x + u.x, u.controls.right.y +
                            u.y, 1) : e.multiply(u.controls
                            .right.x, u.controls.right.y, 1);
                        u = e.multiply(u.x, u.y, 1);
                        var g = f.relative ? e.multiply(f.controls
                            .left.x + f.x, f.controls.left.y + f
                            .y, 1) : e.multiply(f.controls.left
                            .x, f.controls.left.y, 1);
                        f = e.multiply(f.x, f.y, 1), u = t.Utils
                            .getCurveBoundingBox(u.x, u.y, _.x, _.y,
                                g.x, g.y, f.x, f.y), o = n(u.min.y -
                                c, o), r = n(u.min.x - c, r), s = a(
                                u.max.x + c, s), l = a(u.max.y + c,
                                l)
                    } else 1 >= i && (u = e.multiply(u.x, u.y, 1),
                            o = n(u.y - c, o), r = n(u.x - c, r),
                            s = a(u.x + c, s), l = a(u.y + c, l)),
                        f = e.multiply(f.x, f.y, 1), o = n(f.y - c,
                            o), r = n(f.x - c, r), s = a(f.x + c,
                        s), l = a(f.y + c, l)
                }
                return {
                    top: o,
                    left: r,
                    right: s,
                    bottom: l,
                    width: s - r,
                    height: l - o
                }
            },
            getPointAt: function(e, i) {
                var r, s, n = this.length * Math.min(Math.max(e, 0),
                        1),
                    a = this.vertices.length,
                    o = a - 1,
                    l = r = null,
                    h = 0,
                    d = this._lengths.length;
                for (s = 0; h < d; h++) {
                    if (s + this._lengths[h] >= n) {
                        this._closed ? (e = t.Utils.mod(h, a), l = t
                                .Utils.mod(h - 1, a), 0 === h && (
                                    e = l, l = h)) : (e = h, l =
                                Math.min(Math.max(h - 1, 0), o)),
                            r = this.vertices[e], l = this.vertices[
                                l], n -= s, e = 0 !== this._lengths[
                                h] ? n / this._lengths[h] : 0;
                        break
                    }
                    s += this._lengths[h]
                }
                if (c.isNull(r) || c.isNull(l)) return null;
                if (!r) return l;
                if (!l) return r;
                var f = l.controls && l.controls.right,
                    u = r.controls && r.controls.left,
                    _ = l.x,
                    g = l.y;
                return d = (f || l).x, o = (f || l).y, s = (u || r)
                    .x, n = (u || r).y, a = r.x, h = r.y, f && l
                    .relative && (d += l.x, o += l.y), u && r
                    .relative && (s += r.x, n += r.y), r = t.Utils
                    .getComponentOnCubicBezier(e, _, d, s, a), l = t
                    .Utils.getComponentOnCubicBezier(e, g, o, n, h),
                    _ = t.Utils.lerp(_, d, e), g = t.Utils.lerp(g,
                        o, e), d = t.Utils.lerp(d, s, e), o = t
                    .Utils.lerp(o, n, e), s = t.Utils.lerp(s, a, e),
                    n = t.Utils.lerp(n, h, e), h = t.Utils.lerp(_,
                        d, e), a = t.Utils.lerp(g, o, e), s = t
                    .Utils.lerp(d, s, e), n = t.Utils.lerp(o, n, e),
                    c.isObject(i) ? (i.x = r, i.y = l, c.isObject(i
                            .controls) || t.Anchor
                        .AppendCurveProperties(i), i.controls.left
                        .x = h, i.controls.left.y = a, i.controls
                        .right.x = s, i.controls.right.y = n, c
                        .isBoolean(i.relative) && !i.relative || (i
                            .controls.left.x -= r, i.controls.left
                            .y -= l, i.controls.right.x -= r, i
                            .controls.right.y -= l), i.t = e, i) : (
                        (i = new t.Anchor(r, l, h - r, a - l, s - r,
                            n - l, this._curved ? t.Commands
                            .curve : t.Commands.line)).t = e, i)
            },
            plot: function() {
                if (this.curved) return t.Utils.getCurveFromPoints(
                    this._collection, this.closed), this;
                for (var e = 0; e < this._collection.length; e++)
                    this._collection[e].command = 0 === e ? t
                    .Commands.move : t.Commands.line;
                return this
            },
            subdivide: function(e) {
                this._update();
                var i = this.vertices.length - 1,
                    r = this.vertices[i],
                    n = this._closed || this.vertices[i]
                    ._command === t.Commands.close,
                    a = [];
                return c.each(this.vertices, function(o, l) {
                        if (!(0 >= l) || n)
                            if (o.command === t.Commands.move) a
                                .push(new t.Anchor(r.x, r.y)),
                                0 < l && (a[a.length - 1]
                                    .command = t.Commands.line);
                            else {
                                var h = s(o, r, e);
                                a = a.concat(h), c.each(h,
                                    function(e, i) {
                                        e.command = 0 >=
                                            i && r
                                            .command === t
                                            .Commands.move ?
                                            t.Commands
                                            .move : t
                                            .Commands.line
                                    }), l >= i && (this
                                    ._closed && this
                                    ._automatic ? (h = s(o,
                                            r = o, e), a = a
                                        .concat(h), c.each(
                                            h,
                                            function(e, i) {
                                                e.command =
                                                    0 >=
                                                    i && r
                                                    .command ===
                                                    t
                                                    .Commands
                                                    .move ?
                                                    t
                                                    .Commands
                                                    .move :
                                                    t
                                                    .Commands
                                                    .line
                                            })) : n && a
                                    .push(new t.Anchor(o.x,
                                        o.y)), a[a.length -
                                        1].command = n ? t
                                    .Commands.close : t
                                    .Commands.line)
                            } r = o
                    }, this), this._curved = this._automatic = !1,
                    this.vertices = a, this
            },
            _updateLength: function(e, i) {
                i || this._update();
                var s = this.vertices[this.vertices.length - 1],
                    n = 0;
                return c.isUndefined(this._lengths) && (this
                        ._lengths = []), c.each(this.vertices,
                        function(i, a) {
                            0 >= a || i.command === t.Commands
                                .move ? (s = i, this._lengths[a] =
                                    0) : (this._lengths[a] = r(i, s,
                                        e), this._lengths[a] = t
                                    .Utils.toFixed(this._lengths[
                                    a]), n += this._lengths[a], s =
                                    i)
                        }, this), this._length = n, this
                    ._flagLength = !1, this
            },
            _update: function() {
                if (this._flagVertices) {
                    this._automatic && this.plot(), this
                        ._flagLength && this._updateLength(void 0, !
                            0);
                    var r = this._collection.length,
                        s = this._closed,
                        n = Math.min(this._beginning, this._ending),
                        a = Math.max(this._beginning, this._ending),
                        h = i(this, n * this._length),
                        c = i(this, a * this._length);
                    h = o(h);
                    for (var d, f, u, _ = l(c), g = this._renderer
                            .vertices.length = 0; g < r; g++) this
                        ._renderer.collection.length <= g && this
                        ._renderer.collection.push(new t.Anchor),
                        g > _ && !f ? ((c = this._renderer
                                .collection[g]).copy(this
                                ._collection[g]), this.getPointAt(a,
                                c), c.command = this._renderer
                            .collection[g].command, this._renderer
                            .vertices.push(c), f = c, (u = this
                                ._collection[g - 1]) && u
                            .controls && (c.controls.right.clear(),
                                this._renderer.collection[g - 1]
                                .controls.right.clear().lerp(u
                                    .controls.right, c.t))) : g >=
                        h && g <= _ && (c = this._renderer
                            .collection[g].copy(this._collection[
                            g]), this._renderer.vertices.push(c),
                            g === _ && e(this, a) ? (f = c, !s && f
                                .controls && f.controls.right
                                .clear()) : g === h && e(this, n) &&
                            ((d = c).command = t.Commands.move, !
                                s && d.controls && d.controls.left
                                .clear()));
                    0 < h && !d && (g = h - 1, (c = this._renderer
                            .collection[g]).copy(this
                            ._collection[g]), this.getPointAt(n,
                            c), c.command = t.Commands.move,
                        this._renderer.vertices.unshift(c), (r =
                            this._collection[g + 1]) && r
                        .controls && (c.controls.left.clear(),
                            this._renderer.collection[g + 1]
                            .controls.left.copy(r.controls.left)
                            .lerp(t.Vector.zero, c.t)))
                }
                return t.Shape.prototype._update.apply(this,
                    arguments), this
            },
            flagReset: function() {
                return this._flagVertices = this._flagFill = this
                    ._flagStroke = this._flagLinewidth = this
                    ._flagOpacity = this._flagVisible = this
                    ._flagCap = this._flagJoin = this._flagMiter =
                    this._flagClassName = this._flagClip = !1, t
                    .Shape.prototype.flagReset.call(this), this
            }
        }), d.MakeObservable(d.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = t.Utils,
            r = t.Line = function(i, r, s, n) {
                e.call(this, [new t.Anchor(i, r), new t.Anchor(s, n)]), this
                    .vertices[0].command = t.Commands.move, this.vertices[1]
                    .command = t.Commands.line, this.automatic = !1
            };
        i.extend(r.prototype, e.prototype), r.prototype.constructor = r, e
            .MakeObservable(r.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = t.Utils,
            r = t.Rectangle = function(i, r, s, n) {
                e.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t
                        .Anchor
                    ], !0, !1, !0), this.width = s, this.height = n, this
                    .origin = new t.Vector, this.translation.set(i, r), this
                    ._update()
            };
        i.extend(r, {
            Properties: ["width", "height"],
            MakeObservable: function(s) {
                e.MakeObservable(s), i.each(r.Properties, t.Utils
                    .defineProperty, s), Object.defineProperty(
                    s, "origin", {
                        enumerable: !0,
                        get: function() {
                            return this._origin
                        },
                        set: function(e) {
                            this._origin && this._origin
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagVertices), this
                                ._origin = e, this._origin
                                .bind(t.Events.change, this
                                    ._renderer.flagVertices
                                    ), this._renderer
                                .flagVertices()
                        }
                    })
            }
        }), i.extend(r.prototype, e.prototype, {
            _width: 0,
            _height: 0,
            _flagWidth: 0,
            _flagHeight: 0,
            _origin: null,
            constructor: r,
            _update: function() {
                if (this._flagWidth || this._flagHeight) {
                    var i = this._width / 2,
                        r = this._height / 2;
                    this.vertices[0].set(-i, -r).add(this._origin)
                        .command = t.Commands.move, this.vertices[1]
                        .set(i, -r).add(this._origin).command = t
                        .Commands.line, this.vertices[2].set(i, r)
                        .add(this._origin).command = t.Commands
                        .line, this.vertices[3].set(-i, r).add(this
                            ._origin).command = t.Commands.line,
                        this.vertices[4] && (this.vertices[4].set(-
                                i, -r).add(this._origin).command = t
                            .Commands.line)
                }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagWidth = this._flagHeight = !1, e
                    .prototype.flagReset.call(this), this
            },
            clone: function(e) {
                var s = new r(0, 0, this.width, this.height);
                return s.translation.copy(this.translation), s
                    .rotation = this.rotation, s.scale = this.scale,
                    i.each(t.Path.Properties, function(t) {
                        s[t] = this[t]
                    }, this), e && e.add(s), s
            }
        }), r.MakeObservable(r.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = 2 * Math.PI,
            r = Math.PI / 2,
            s = Math.cos,
            n = Math.sin,
            a = t.Utils,
            o = 4 / 3 * Math.tan(Math.PI / 8),
            l = t.Ellipse = function(i, r, s, n, o) {
                a.isNumber(n) || (n = s), o = a.map(a.range(o || 5), function(
                    e) {
                        return new t.Anchor
                    }, this), e.call(this, o, !0, !0, !0), this.width = 2 * s,
                    this.height = 2 * n, this._update(), this.translation.set(i,
                        r)
            };
        a.extend(l, {
            Properties: ["width", "height"],
            MakeObservable: function(i) {
                e.MakeObservable(i), a.each(l.Properties, t.Utils
                    .defineProperty, i)
            }
        }), a.extend(l.prototype, e.prototype, {
            _width: 0,
            _height: 0,
            _flagWidth: !1,
            _flagHeight: !1,
            constructor: l,
            _update: function() {
                if (this._flagWidth || this._flagHeight)
                    for (var a = 0, l = this.vertices.length, h =
                            l - 1; a < l; a++) {
                        var c = a / h * i,
                            d = this._width / 2,
                            f = this._height / 2;
                        s(c), n(c);
                        var u = d * s(c),
                            _ = f * n(c),
                            g = 0 === a ? 0 : d * o * s(c - r),
                            p = 0 === a ? 0 : f * o * n(c - r);
                        d = a === h ? 0 : d * o * s(c + r), f =
                            a === h ? 0 : f * o * n(c + r), (c =
                                this.vertices[a]).command = 0 ===
                            a ? t.Commands.move : t.Commands.curve,
                            c.set(u, _), c.controls.left.set(g, p),
                            c.controls.right.set(d, f)
                    }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagWidth = this._flagHeight = !1, e
                    .prototype.flagReset.call(this), this
            },
            clone: function(e) {
                var i = new l(0, 0, this.width / 2, this.height / 2,
                    this.vertices.length);
                return i.translation.copy(this.translation), i
                    .rotation = this.rotation, i.scale = this.scale,
                    a.each(t.Path.Properties, function(t) {
                        i[t] = this[t]
                    }, this), e && e.add(i), i
            }
        }), l.MakeObservable(l.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = 2 * Math.PI,
            r = Math.PI / 2,
            s = Math.cos,
            n = Math.sin,
            a = t.Utils,
            o = 4 / 3 * Math.tan(Math.PI / 8),
            l = t.Circle = function(i, r, s, n) {
                n = a.map(a.range(n || 5), function(e) {
                        return new t.Anchor
                    }, this), e.call(this, n, !0, !0, !0), this.radius = s, this
                    ._update(), this.translation.set(i, r)
            };
        a.extend(l, {
            Properties: ["radius"],
            MakeObservable: function(i) {
                e.MakeObservable(i), a.each(l.Properties, t.Utils
                    .defineProperty, i)
            }
        }), a.extend(l.prototype, e.prototype, {
            _radius: 0,
            _flagRadius: !1,
            constructor: l,
            _update: function() {
                if (this._flagRadius)
                    for (var a = 0, l = this.vertices.length, h =
                            l - 1; a < l; a++) {
                        var c = a / h * i,
                            d = this._radius;
                        s(c), n(c);
                        var f = d * o,
                            u = d * s(c);
                        d *= n(c);
                        var _ = 0 === a ? 0 : f * s(c - r),
                            g = 0 === a ? 0 : f * n(c - r),
                            p = a === h ? 0 : f * s(c + r);
                        c = a === h ? 0 : f * n(c + r), (f = this
                                .vertices[a]).command = 0 === a ? t
                            .Commands.move : t.Commands.curve, f
                            .set(u, d), f.controls.left.set(_, g), f
                            .controls.right.set(p, c)
                    }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagRadius = !1, e.prototype.flagReset
                    .call(this), this
            },
            clone: function(e) {
                var i = new l(0, 0, this.radius, this.vertices
                    .length);
                return i.translation.copy(this.translation), i
                    .rotation = this.rotation, i.scale = this.scale,
                    a.each(t.Path.Properties, function(t) {
                        i[t] = this[t]
                    }, this), e && e.add(i), i
            }
        }), l.MakeObservable(l.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = 2 * Math.PI,
            r = Math.cos,
            s = Math.sin,
            n = t.Utils,
            a = t.Polygon = function(t, i, r, s) {
                s = Math.max(s || 0, 3), e.call(this), this.closed = !0, this
                    .automatic = !1, this.width = 2 * r, this.height = 2 * r,
                    this.sides = s, this._update(), this.translation.set(t, i)
            };
        n.extend(a, {
            Properties: ["width", "height", "sides"],
            MakeObservable: function(i) {
                e.MakeObservable(i), n.each(a.Properties, t.Utils
                    .defineProperty, i)
            }
        }), n.extend(a.prototype, e.prototype, {
            _width: 0,
            _height: 0,
            _sides: 0,
            _flagWidth: !1,
            _flagHeight: !1,
            _flagSides: !1,
            constructor: a,
            _update: function() {
                if (this._flagWidth || this._flagHeight || this
                    ._flagSides) {
                    var n = this._sides,
                        a = n + 1,
                        o = this.vertices.length;
                    o > n && (this.vertices.splice(n - 1, o - n),
                        o = n);
                    for (var l = 0; l < a; l++) {
                        var h = (l + .5) / n * i + Math.PI / 2,
                            c = this._width * r(h) / 2;
                        h = this._height * s(h) / 2, l >= o ? this
                            .vertices.push(new t.Anchor(c, h)) :
                            this.vertices[l].set(c, h), this
                            .vertices[l].command = 0 === l ? t
                            .Commands.move : t.Commands.line
                    }
                }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagWidth = this._flagHeight = this
                    ._flagSides = !1, e.prototype.flagReset.call(
                        this), this
            },
            clone: function(e) {
                var i = new a(0, 0, this.radius, this.sides);
                return i.translation.copy(this.translation), i
                    .rotation = this.rotation, i.scale = this.scale,
                    n.each(t.Path.Properties, function(t) {
                        i[t] = this[t]
                    }, this), e && e.add(i), i
            }
        }), a.MakeObservable(a.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        function e(t, e) {
            for (; 0 > t;) t += e;
            return t % e
        }
        var i = t.Path,
            r = 2 * Math.PI,
            s = Math.PI / 2,
            n = t.Utils,
            a = t.ArcSegment = function(e, r, s, a, o, l, h) {
                h = n.map(n.range(h || 3 * t.Resolution), function() {
                        return new t.Anchor
                    }), i.call(this, h, !0, !1, !0), this.innerRadius = s, this
                    .outerRadius = a, this.startAngle = o, this.endAngle = l,
                    this._update(), this.translation.set(e, r)
            };
        n.extend(a, {
            Properties: ["startAngle", "endAngle", "innerRadius",
                "outerRadius"
            ],
            MakeObservable: function(e) {
                i.MakeObservable(e), n.each(a.Properties, t.Utils
                    .defineProperty, e)
            }
        }), n.extend(a.prototype, i.prototype, {
            _flagStartAngle: !1,
            _flagEndAngle: !1,
            _flagInnerRadius: !1,
            _flagOuterRadius: !1,
            _startAngle: 0,
            _endAngle: r,
            _innerRadius: 0,
            _outerRadius: 0,
            constructor: a,
            _update: function() {
                if (this._flagStartAngle || this._flagEndAngle ||
                    this._flagInnerRadius || this._flagOuterRadius
                    ) {
                    var n = this._startAngle,
                        a = this._endAngle,
                        o = this._innerRadius,
                        l = this._outerRadius,
                        h = e(n, r) === e(a, r),
                        c = 0 < o,
                        d = this.vertices,
                        f = c ? d.length / 2 : d.length,
                        u = 0;
                    h ? f-- : c || (f -= 2);
                    for (var _ = 0, g = f - 1; _ < f; _++) {
                        var p = _ / g,
                            m = d[u];
                        p = p * (a - n) + n;
                        var y = (a - n) / f,
                            v = l * Math.cos(p),
                            x = l * Math.sin(p);
                        switch (_) {
                            case 0:
                                var b = t.Commands.move;
                                break;
                            default:
                                b = t.Commands.curve
                        }
                        m.command = b, m.x = v, m.y = x, m.controls
                            .left.clear(), m.controls.right.clear(),
                            m.command === t.Commands.curve && (b =
                                l * y / Math.PI, m.controls.left.x =
                                b * Math.cos(p - s), m.controls.left
                                .y = b * Math.sin(p - s), m.controls
                                .right.x = b * Math.cos(p + s), m
                                .controls.right.y = b * Math.sin(p +
                                    s), 1 === _ && m.controls.left
                                .multiplyScalar(2), _ === g && m
                                .controls.right.multiplyScalar(2)),
                            u++
                    }
                    if (c) {
                        for (h ? (d[u].command = t.Commands.close,
                                u++) : g = --f - 1, _ = 0; _ <
                            f; _++) p = _ / g, m = d[u], p = (1 -
                            p) * (a - n) + n, y = (a - n) / f, v =
                            o * Math.cos(p), x = o * Math.sin(p),
                            b = t.Commands.curve, 0 >= _ && (b = h ?
                                t.Commands.move : t.Commands.line),
                            m.command = b, m.x = v, m.y = x, m
                            .controls.left.clear(), m.controls.right
                            .clear(), m.command === t.Commands
                            .curve && (b = o * y / Math.PI, m
                                .controls.left.x = b * Math.cos(p +
                                    s), m.controls.left.y = b * Math
                                .sin(p + s), m.controls.right.x =
                                b * Math.cos(p - s), m.controls
                                .right.y = b * Math.sin(p - s),
                                1 === _ && m.controls.left
                                .multiplyScalar(2), _ === g && m
                                .controls.right.multiplyScalar(2)),
                            u++;
                        d[u].copy(d[0]), d[u].command = t.Commands
                            .line
                    } else h || (d[u].command = t.Commands.line, d[
                        u].x = 0, d[u].y = 0, d[++u].copy(d[
                        0]), d[u].command = t.Commands.line)
                }
                return i.prototype._update.call(this), this
            },
            flagReset: function() {
                return i.prototype.flagReset.call(this), this
                    ._flagStartAngle = this._flagEndAngle = this
                    ._flagInnerRadius = this._flagOuterRadius = !1,
                    this
            },
            clone: function(e) {
                var i = new a(0, 0, this.innerRadius, this
                    .outerradius, this.startAngle, this
                    .endAngle, this.vertices.length);
                return i.translation.copy(this.translation), i
                    .rotation = this.rotation, i.scale = this.scale,
                    n.each(t.Path.Properties, function(t) {
                        i[t] = this[t]
                    }, this), e && e.add(i), i
            }
        }), a.MakeObservable(a.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = 2 * Math.PI,
            r = Math.cos,
            s = Math.sin,
            n = t.Utils,
            a = t.Star = function(t, i, r, s, a) {
                3 >= arguments.length && (r = (s = r) / 2), (!n.isNumber(a) ||
                        0 >= a) && (a = 5), e.call(this), this.closed = !0, this
                    .automatic = !1, this.innerRadius = r, this.outerRadius = s,
                    this.sides = a, this._update(), this.translation.set(t, i)
            };
        n.extend(a, {
            Properties: ["innerRadius", "outerRadius", "sides"],
            MakeObservable: function(i) {
                e.MakeObservable(i), n.each(a.Properties, t.Utils
                    .defineProperty, i)
            }
        }), n.extend(a.prototype, e.prototype, {
            _innerRadius: 0,
            _outerRadius: 0,
            _sides: 0,
            _flagInnerRadius: !1,
            _flagOuterRadius: !1,
            _flagSides: !1,
            constructor: a,
            _update: function() {
                if (this._flagInnerRadius || this
                    ._flagOuterRadius || this._flagSides) {
                    var n = 2 * this._sides,
                        a = n + 1,
                        o = this.vertices.length;
                    o > n && (this.vertices.splice(n - 1, o - n),
                        o = n);
                    for (var l = 0; l < a; l++) {
                        var h = (l + .5) / n * i,
                            c = (l % 2 ? this._outerRadius : this
                                ._innerRadius) / 2,
                            d = c * r(h);
                        h = c * s(h), l >= o ? this.vertices.push(
                                new t.Anchor(d, h)) : this.vertices[
                                l].set(d, h), this.vertices[l]
                            .command = 0 === l ? t.Commands.move : t
                            .Commands.line
                    }
                }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagInnerRadius = this
                    ._flagOuterRadius = this._flagSides = !1, e
                    .prototype.flagReset.call(this), this
            },
            clone: function(e) {
                var i = new a(0, 0, this.innerRadius, this
                    .outerRadius, this.sides);
                return i.translation.copy(this.translation), i
                    .rotation = this.rotation, i.scale = this.scale,
                    n.each(t.Path.Properties, function(t) {
                        i[t] = this[t]
                    }, this), e && e.add(i), i
            }
        }), a.MakeObservable(a.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Path,
            i = t.Utils,
            r = t.RoundedRectangle = function(s, n, a, o, l) {
                i.isUndefined(l) && (l = Math.floor(Math.min(a, o) / 12));
                var h = i.map(i.range(10), function(e) {
                    return new t.Anchor(0, 0, 0, 0, 0, 0, 0 === e ? t
                        .Commands.move : t.Commands.curve)
                });
                e.call(this, h), this.closed = !0, this.automatic = !1, this
                    ._renderer.flagRadius = i.bind(r.FlagRadius, this), this
                    .width = a, this.height = o, this.radius = l, this
                ._update(), this.translation.set(s, n)
            };
        i.extend(r, {
            Properties: ["width", "height"],
            FlagRadius: function() {
                this._flagRadius = !0
            },
            MakeObservable: function(s) {
                e.MakeObservable(s), i.each(r.Properties, t.Utils
                    .defineProperty, s), Object.defineProperty(
                    s, "radius", {
                        enumerable: !0,
                        get: function() {
                            return this._radius
                        },
                        set: function(e) {
                            this._radius instanceof t
                                .Vector && this._radius
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagRadius), this
                                ._radius = e, this
                                ._radius instanceof t
                                .Vector && this._radius
                                .bind(t.Events.change, this
                                    ._renderer.flagRadius),
                                this._flagRadius = !0
                        }
                    })
            }
        }), i.extend(r.prototype, e.prototype, {
            _width: 0,
            _height: 0,
            _radius: 0,
            _flagWidth: !1,
            _flagHeight: !1,
            _flagRadius: !1,
            constructor: r,
            _update: function() {
                if (this._flagWidth || this._flagHeight || this
                    ._flagRadius) {
                    var i = this._width,
                        r = this._height;
                    if (this._radius instanceof t.Vector) var s =
                        this._radius.x,
                        n = this._radius.y;
                    else n = s = this._radius;
                    i /= 2;
                    var a = r / 2;
                    (r = this.vertices[0]).x = -(i - s), r.y = -a, (
                            r = this.vertices[1]).x = i - s, r.y = -
                        a, r.controls.left.clear(), r.controls.right
                        .x = s, r.controls.right.y = 0, (r = this
                            .vertices[2]).x = i, r.y = -(a - n), r
                        .controls.right.clear(), r.controls.left
                        .clear(), (r = this.vertices[3]).x = i, r
                        .y = a - n, r.controls.left.clear(), r
                        .controls.right.x = 0, r.controls.right.y =
                        n, (r = this.vertices[4]).x = i - s, r.y =
                        a, r.controls.right.clear(), r.controls.left
                        .clear(), (r = this.vertices[5]).x = -(i -
                            s), r.y = a, r.controls.left.clear(), r
                        .controls.right.x = -s, r.controls.right.y =
                        0, (r = this.vertices[6]).x = -i, r.y = a -
                        n, r.controls.left.clear(), r.controls.right
                        .clear(), (r = this.vertices[7]).x = -i, r
                        .y = -(a - n), r.controls.left.clear(), r
                        .controls.right.x = 0, r.controls.right
                        .y = -n, (r = this.vertices[8]).x = -(i -
                        s), r.y = -a, r.controls.left.clear(), r
                        .controls.right.clear(), (r = this.vertices[
                            9]).copy(this.vertices[8])
                }
                return e.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagWidth = this._flagHeight = this
                    ._flagRadius = !1, e.prototype.flagReset.call(
                        this), this
            },
            clone: function(e) {
                var s = new r(0, 0, this.width, this.height, this
                    .radius);
                return s.translation.copy(this.translation), s
                    .rotation = this.rotation, s.scale = this.scale,
                    i.each(t.Path.Properties, function(t) {
                        s[t] = this[t]
                    }, this), e && e.add(s), s
            }
        }), r.MakeObservable(r.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils.getComputedMatrix,
            i = t.Utils,
            r = t.Text = function(e, r, s, n) {
                if (t.Shape.call(this), this._renderer.type = "text", this
                    ._renderer.flagFill = i.bind(t.Text.FlagFill, this), this
                    ._renderer.flagStroke = i.bind(t.Text.FlagStroke, this),
                    this.value = e, i.isNumber(r) && (this.translation.x = r), i
                    .isNumber(s) && (this.translation.y = s), this.dashes = [],
                    this.dashes.offset = 0, !i.isObject(n)) return this;
                i.each(t.Text.Properties, function(t) {
                    t in n && (this[t] = n[t])
                }, this)
            };
        i.extend(t.Text, {
            Ratio: .6,
            Properties: "value family size leading alignment linewidth style className weight decoration baseline opacity visible fill stroke"
                .split(" "),
            FlagFill: function() {
                this._flagFill = !0
            },
            FlagStroke: function() {
                this._flagStroke = !0
            },
            MakeObservable: function(e) {
                t.Shape.MakeObservable(e), i.each(t.Text.Properties
                        .slice(0, 13), t.Utils.defineProperty, e),
                    Object.defineProperty(e, "fill", {
                        enumerable: !0,
                        get: function() {
                            return this._fill
                        },
                        set: function(e) {
                            (this._fill instanceof t
                                .Gradient || this
                                ._fill instanceof t
                                .LinearGradient || this
                                ._fill instanceof t
                                .RadialGradient || this
                                ._fill instanceof t.Texture
                                ) && this._fill.unbind(t
                                    .Events.change, this
                                    ._renderer.flagFill),
                                this._fill = e, this
                                ._flagFill = !0, (this
                                    ._fill instanceof t
                                    .Gradient || this
                                    ._fill instanceof t
                                    .LinearGradient || this
                                    ._fill instanceof t
                                    .RadialGradient || this
                                    ._fill instanceof t
                                    .Texture) && this._fill
                                .bind(t.Events.change, this
                                    ._renderer.flagFill)
                        }
                    }), Object.defineProperty(e, "stroke", {
                        enumerable: !0,
                        get: function() {
                            return this._stroke
                        },
                        set: function(e) {
                            (this._stroke instanceof t
                                .Gradient || this
                                ._stroke instanceof t
                                .LinearGradient || this
                                ._stroke instanceof t
                                .RadialGradient || this
                                ._stroke instanceof t
                                .Texture) && this._stroke
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagStroke), this
                                ._stroke = e, this
                                ._flagStroke = !0, (this
                                    ._stroke instanceof t
                                    .Gradient || this
                                    ._stroke instanceof t
                                    .LinearGradient || this
                                    ._stroke instanceof t
                                    .RadialGradient || this
                                    ._stroke instanceof t
                                    .Texture) && this
                                ._stroke.bind(t.Events
                                    .change, this._renderer
                                    .flagStroke)
                        }
                    }), Object.defineProperty(e, "clip", {
                        enumerable: !0,
                        get: function() {
                            return this._clip
                        },
                        set: function(t) {
                            this._clip = t, this
                                ._flagClip = !0
                        }
                    }), Object.defineProperty(e, "dashes", {
                        enumerable: !0,
                        get: function() {
                            return this._dashes
                        },
                        set: function(t) {
                            i.isNumber(t.offset) || (t
                                    .offset = this._dashes
                                    .offset || 0), this
                                ._dashes = t
                        }
                    })
            }
        }), i.extend(t.Text.prototype, t.Shape.prototype, {
            _flagValue: !0,
            _flagFamily: !0,
            _flagSize: !0,
            _flagLeading: !0,
            _flagAlignment: !0,
            _flagBaseline: !0,
            _flagStyle: !0,
            _flagWeight: !0,
            _flagDecoration: !0,
            _flagFill: !0,
            _flagStroke: !0,
            _flagLinewidth: !0,
            _flagOpacity: !0,
            _flagClassName: !0,
            _flagVisible: !0,
            _flagClip: !1,
            _value: "",
            _family: "sans-serif",
            _size: 13,
            _leading: 17,
            _alignment: "center",
            _baseline: "middle",
            _style: "normal",
            _weight: 500,
            _decoration: "none",
            _fill: "#000",
            _stroke: "transparent",
            _linewidth: 1,
            _opacity: 1,
            _className: "",
            _visible: !0,
            _clip: !1,
            _dashes: [],
            constructor: t.Text,
            remove: function() {
                return this.parent ? (this.parent.remove(this),
                    this) : this
            },
            clone: function(e) {
                var r = new t.Text(this.value);
                return r.translation.copy(this.translation), r
                    .rotation = this.rotation, r.scale = this.scale,
                    i.each(t.Text.Properties, function(t) {
                        r[t] = this[t]
                    }, this), e && e.add(r), r._update()
            },
            toObject: function() {
                var e = {
                    translation: this.translation.toObject(),
                    rotation: this.rotation,
                    scale: this.scale
                };
                return i.each(t.Text.Properties, function(t) {
                    e[t] = this[t]
                }, this), e
            },
            noFill: function() {
                return this.fill = "transparent", this
            },
            noStroke: function() {
                return this.stroke = "transparent", this
            },
            getBoundingClientRect: function(t) {
                this._update(!0), t = t ? this._matrix : e(this);
                var i = this.leading,
                    s = this.value.length * this.size * r.Ratio;
                switch (this.alignment) {
                    case "left":
                        var n = 0;
                        break;
                    case "right":
                        n = -s, s = 0;
                        break;
                    default:
                        n = -s / 2, s /= 2
                }
                switch (this.baseline) {
                    case "top":
                        var a = 0,
                            o = i;
                        break;
                    case "bottom":
                        a = -i, o = 0;
                        break;
                    default:
                        a = -i / 2, o = i / 2
                }
                return {
                    top: a = (i = t.multiply(n, a, 1)).y,
                    left: n = i.x,
                    right: s = (i = t.multiply(s, o, 1)).x,
                    bottom: o = i.y,
                    width: s - n,
                    height: o - a
                }
            },
            flagReset: function() {
                return this._flagValue = this._flagFamily = this
                    ._flagSize = this._flagLeading = this
                    ._flagAlignment = this._flagFill = this
                    ._flagStroke = this._flagLinewidth = this
                    ._flagOpacity = this._flagVisible = this
                    ._flagClip = this._flagDecoration = this
                    ._flagClassName = this._flagBaseline = !1, t
                    .Shape.prototype.flagReset.call(this), this
            }
        }), t.Text.MakeObservable(t.Text.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.Stop = function(t, r, s) {
                this._renderer = {}, this._renderer.type = "stop", this.offset =
                    e.isNumber(t) ? t : 0 >= i.Index ? 0 : 1, this.opacity = e
                    .isNumber(s) ? s : 1, this.color = e.isString(r) ? r : 0 >=
                    i.Index ? "#fff" : "#000", i.Index = (i.Index + 1) % 2
            };
        e.extend(i, {
            Index: 0,
            Properties: ["offset", "opacity", "color"],
            MakeObservable: function(t) {
                e.each(i.Properties, function(t) {
                    var e = "_" + t,
                        i = "_flag" + t.charAt(0)
                        .toUpperCase() + t.slice(1);
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        get: function() {
                            return this[e]
                        },
                        set: function(t) {
                            this[e] = t, this[
                                i] = !0, this
                                .parent && (this
                                    .parent
                                    ._flagStops = !
                                    0)
                        }
                    })
                }, t)
            }
        }), e.extend(i.prototype, t.Utils.Events, {
            constructor: i,
            clone: function() {
                var t = new i;
                return e.each(i.Properties, function(e) {
                    t[e] = this[e]
                }, this), t
            },
            toObject: function() {
                var t = {};
                return e.each(i.Properties, function(e) {
                    t[e] = this[e]
                }, this), t
            },
            flagReset: function() {
                return this._flagOffset = this._flagColor = this
                    ._flagOpacity = !1, this
            }
        }), i.MakeObservable(i.prototype), i.prototype.constructor = i;
        var r = t.Gradient = function(i) {
            this._renderer = {}, this._renderer.type = "gradient", this.id =
                t.Identifier + t.uniqueId(), this.classList = [], this
                ._renderer.flagStops = e.bind(r.FlagStops, this), this
                ._renderer.bindStops = e.bind(r.BindStops, this), this
                ._renderer.unbindStops = e.bind(r.UnbindStops, this), this
                .spread = "pad", this.stops = i
        };
        e.extend(r, {
            Stop: i,
            Properties: ["spread"],
            MakeObservable: function(i) {
                e.each(r.Properties, t.Utils.defineProperty, i),
                    Object.defineProperty(i, "stops", {
                        enumerable: !0,
                        get: function() {
                            return this._stops
                        },
                        set: function(e) {
                            var i = this._renderer
                                .bindStops,
                                r = this._renderer
                                .unbindStops;
                            this._stops && this._stops
                                .unbind(t.Events.insert, i)
                                .unbind(t.Events.remove, r),
                                this._stops = new t.Utils
                                .Collection((e || []).slice(
                                    0)), this._stops.bind(t
                                    .Events.insert, i).bind(
                                    t.Events.remove, r), i(
                                    this._stops)
                        }
                    })
            },
            FlagStops: function() {
                this._flagStops = !0
            },
            BindStops: function(e) {
                for (var i = e.length; i--;) e[i].bind(t.Events
                        .change, this._renderer.flagStops), e[i]
                    .parent = this;
                this._renderer.flagStops()
            },
            UnbindStops: function(e) {
                for (var i = e.length; i--;) e[i].unbind(t.Events
                        .change, this._renderer.flagStops),
                    delete e[i].parent;
                this._renderer.flagStops()
            }
        }), e.extend(r.prototype, t.Utils.Events, {
            _flagStops: !1,
            _flagSpread: !1,
            clone: function(i) {
                var s = e.map(this.stops, function(t) {
                        return t.clone()
                    }),
                    n = new r(s);
                return e.each(t.Gradient.Properties, function(t) {
                    n[t] = this[t]
                }, this), i && i.add(n), n
            },
            toObject: function() {
                var t = {
                    stops: e.map(this.stops, function(t) {
                        return t.toObject()
                    })
                };
                return e.each(r.Properties, function(e) {
                    t[e] = this[e]
                }, this), t
            },
            _update: function() {
                return (this._flagSpread || this._flagStops) && this
                    .trigger(t.Events.change), this
            },
            flagReset: function() {
                return this._flagSpread = this._flagStops = !1, this
            }
        }), r.MakeObservable(r.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.LinearGradient = function(r, s, n, a, o) {
                t.Gradient.call(this, o), this._renderer.type =
                    "linear-gradient", o = e.bind(i.FlagEndPoints, this), this
                    .left = (new t.Vector).bind(t.Events.change, o), this
                    .right = (new t.Vector).bind(t.Events.change, o), e
                    .isNumber(r) && (this.left.x = r), e.isNumber(s) && (this
                        .left.y = s), e.isNumber(n) && (this.right.x = n), e
                    .isNumber(a) && (this.right.y = a)
            };
        e.extend(i, {
            Stop: t.Gradient.Stop,
            MakeObservable: function(e) {
                t.Gradient.MakeObservable(e)
            },
            FlagEndPoints: function() {
                this._flagEndPoints = !0
            }
        }), e.extend(i.prototype, t.Gradient.prototype, {
            _flagEndPoints: !1,
            constructor: i,
            clone: function(r) {
                var s = e.map(this.stops, function(t) {
                        return t.clone()
                    }),
                    n = new i(this.left._x, this.left._y, this.right
                        ._x, this.right._y, s);
                return e.each(t.Gradient.Properties, function(t) {
                    n[t] = this[t]
                }, this), r && r.add(n), n
            },
            toObject: function() {
                var e = t.Gradient.prototype.toObject.call(this);
                return e.left = this.left.toObject(), e.right = this
                    .right.toObject(), e
            },
            _update: function() {
                return (this._flagEndPoints || this._flagSpread ||
                    this._flagStops) && this.trigger(t.Events
                    .change), this
            },
            flagReset: function() {
                return this._flagEndPoints = !1, t.Gradient
                    .prototype.flagReset.call(this), this
            }
        }), i.MakeObservable(i.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.RadialGradient = function(i, r, s, n, a, o) {
                t.Gradient.call(this, n), this._renderer.type =
                    "radial-gradient", this.center = (new t.Vector).bind(t
                        .Events.change, e.bind(function() {
                            this._flagCenter = !0
                        }, this)), this.radius = e.isNumber(s) ? s : 20, this
                    .focal = (new t.Vector).bind(t.Events.change, e.bind(
                        function() {
                            this._flagFocal = !0
                        }, this)), e.isNumber(i) && (this.center.x = i), e
                    .isNumber(r) && (this.center.y = r), this.focal.copy(this
                        .center), e.isNumber(a) && (this.focal.x = a), e
                    .isNumber(o) && (this.focal.y = o)
            };
        e.extend(i, {
            Stop: t.Gradient.Stop,
            Properties: ["radius"],
            MakeObservable: function(r) {
                t.Gradient.MakeObservable(r), e.each(i.Properties, t
                    .Utils.defineProperty, r)
            }
        }), e.extend(i.prototype, t.Gradient.prototype, {
            _flagRadius: !1,
            _flagCenter: !1,
            _flagFocal: !1,
            constructor: i,
            clone: function(r) {
                var s = e.map(this.stops, function(t) {
                        return t.clone()
                    }),
                    n = new i(this.center._x, this.center._y, this
                        ._radius, s, this.focal._x, this.focal._y);
                return e.each(t.Gradient.Properties.concat(i
                    .Properties), function(t) {
                    n[t] = this[t]
                }, this), r && r.add(n), n
            },
            toObject: function() {
                var r = t.Gradient.prototype.toObject.call(this);
                return e.each(i.Properties, function(t) {
                        r[t] = this[t]
                    }, this), r.center = this.center.toObject(), r
                    .focal = this.focal.toObject(), r
            },
            _update: function() {
                return (this._flagRadius || this._flatCenter || this
                    ._flagFocal || this._flagSpread || this
                    ._flagStops) && this.trigger(t.Events
                    .change), this
            },
            flagReset: function() {
                return this._flagRadius = this._flagCenter = this
                    ._flagFocal = !1, t.Gradient.prototype.flagReset
                    .call(this), this
            }
        }), i.MakeObservable(i.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e, i = t.root,
            r = t.Utils,
            s = {
                video: /\.(mp4|webm|ogg)$/i,
                image: /\.(jpe?g|png|gif|tiff)$/i,
                effect: /texture|gradient/i
            };
        i.document && (e = document.createElement("a"));
        var n = t.Texture = function(e, i) {
            if (this._renderer = {}, this._renderer.type = "texture", this
                ._renderer.flagOffset = r.bind(n.FlagOffset, this), this
                ._renderer.flagScale = r.bind(n.FlagScale, this), this.id =
                t.Identifier + t.uniqueId(), this.classList = [], this
                .offset = new t.Vector, r.isFunction(i)) {
                var s = r.bind(function() {
                    this.unbind(t.Events.load, s), r.isFunction(
                        i) && i()
                }, this);
                this.bind(t.Events.load, s)
            }
            r.isString(e) ? this.src = e : r.isElement(e) && (this.image =
                e), this._update()
        };
        r.extend(n, {
            Properties: ["src", "loaded", "repeat"],
            RegularExpressions: s,
            ImageRegistry: new t.Registry,
            getAbsoluteURL: function(t) {
                return e ? (e.href = t, e.href) : t
            },
            loadHeadlessBuffer: new Function("texture", "loaded",
                'var fs = require("fs");\nvar buffer = fs.readFileSync(texture.src);\ntexture.image.src = buffer;\nloaded();'
                ),
            getImage: function(e) {
                if (e = n.getAbsoluteURL(e), n.ImageRegistry
                    .contains(e)) return n.ImageRegistry.get(e);
                if (t.Utils.Image) {
                    var r = new t.Utils.Image;
                    t.CanvasRenderer.Utils.shim(r, "img")
                } else i.document ? r = s.video.test(e) ? document
                    .createElement("video") : document
                    .createElement("img") : console.warn(
                        "Gearing.js: no prototypical image defined for Gearing.Texture"
                        );
                return r.crossOrigin = "anonymous", r
            },
            Register: {
                canvas: function(t, e) {
                    t._src = "#" + t.id, n.ImageRegistry.add(t.src,
                        t.image), r.isFunction(e) && e()
                },
                img: function(e, i) {
                    var s = function(t) {
                            r.isFunction(e.image
                                .removeEventListener) && (e
                                .image.removeEventListener(
                                    "load", s, !1), e.image
                                .removeEventListener("error", a,
                                    !1)), r.isFunction(i) && i()
                        },
                        a = function(i) {
                            throw r.isFunction(e.image
                                .removeEventListener) && (e
                                .image.removeEventListener(
                                    "load", s, !1), e.image
                                .removeEventListener("error", a,
                                    !1)), new t.Utils.Error(
                                "unable to load " + e.src)
                        };
                    r.isNumber(e.image.width) && 0 < e.image
                        .width && r.isNumber(e.image.height) && 0 <
                        e.image.height ? s() : r.isFunction(e.image
                            .addEventListener) && (e.image
                            .addEventListener("load", s, !1), e
                            .image.addEventListener("error", a, !1)
                            ), e._src = n.getAbsoluteURL(e._src), e
                        .image && e.image.getAttribute(
                            "Gearing-src") || (e.image.setAttribute(
                                "Gearing-src", e.src), n
                            .ImageRegistry.add(e.src, e.image), t
                            .Utils.isHeadless ? n
                            .loadHeadlessBuffer(e, s) : e.image
                            .src = e.src)
                },
                video: function(e, i) {
                    var s = function(t) {
                            e.image.removeEventListener(
                                    "canplaythrough", s, !1), e
                                .image.removeEventListener("error",
                                    a, !1), e.image.width = e.image
                                .videoWidth, e.image.height = e
                                .image.videoHeight, e.image.play(),
                                r.isFunction(i) && i()
                        },
                        a = function(i) {
                            throw e.image.removeEventListener(
                                    "canplaythrough", s, !1), e
                                .image.removeEventListener("error",
                                    a, !1), new t.Utils.Error(
                                    "unable to load " + e.src)
                        };
                    if (e._src = n.getAbsoluteURL(e._src), e.image
                        .addEventListener("canplaythrough", s, !1),
                        e.image.addEventListener("error", a, !1), !e
                        .image || !e.image.getAttribute(
                            "Gearing-src")) {
                        if (t.Utils.isHeadless) throw new t.Utils
                            .Error(
                                "video textures are not implemented in headless environments."
                                );
                        e.image.setAttribute("Gearing-src", e.src),
                            n.ImageRegistry.add(e.src, e.image), e
                            .image.src = e.src, e.image.loop = !0, e
                            .image.load()
                    }
                }
            },
            load: function(t, e) {
                var i = t.image,
                    r = i && i.nodeName.toLowerCase();
                t._flagImage && (/canvas/i.test(r) ? n.Register
                    .canvas(t, e) : (t._src = i.getAttribute(
                        "Gearing-src") || i.src, n.Register[
                        r](t, e))), t._flagSrc && (i || (t
                        .image = n.getImage(t.src)), r = t.image
                    .nodeName.toLowerCase(), n.Register[r](t, e)
                    )
            },
            FlagOffset: function() {
                this._flagOffset = !0
            },
            FlagScale: function() {
                this._flagScale = !0
            },
            MakeObservable: function(e) {
                r.each(n.Properties, t.Utils.defineProperty, e),
                    Object.defineProperty(e, "image", {
                        enumerable: !0,
                        get: function() {
                            return this._image
                        },
                        set: function(t) {
                            switch (t && t.nodeName
                                .toLowerCase()) {
                                case "canvas":
                                    var e = "#" + t.id;
                                    break;
                                default:
                                    e = t.src
                            }
                            n.ImageRegistry.contains(e) ?
                                this._image = n
                                .ImageRegistry.get(t.src) :
                                this._image = t, this
                                ._flagImage = !0
                        }
                    }), Object.defineProperty(e, "offset", {
                        enumerable: !0,
                        get: function() {
                            return this._offset
                        },
                        set: function(e) {
                            this._offset && this._offset
                                .unbind(t.Events.change,
                                    this._renderer
                                    .flagOffset), this
                                ._offset = e, this._offset
                                .bind(t.Events.change, this
                                    ._renderer.flagOffset),
                                this._flagOffset = !0
                        }
                    }), Object.defineProperty(e, "scale", {
                        enumerable: !0,
                        get: function() {
                            return this._scale
                        },
                        set: function(e) {
                            this._scale instanceof t
                                .Vector && this._scale
                                .unbind(t.Events.change,
                                    this._renderer.flagScale
                                    ), this._scale = e, this
                                ._scale instanceof t
                                .Vector && this._scale.bind(
                                    t.Events.change, this
                                    ._renderer.flagScale),
                                this._flagScale = !0
                        }
                    })
            }
        }), r.extend(n.prototype, t.Utils.Events, t.Shape.prototype, {
            _flagSrc: !1,
            _flagImage: !1,
            _flagVideo: !1,
            _flagLoaded: !1,
            _flagRepeat: !1,
            _flagOffset: !1,
            _flagScale: !1,
            _src: "",
            _image: null,
            _loaded: !1,
            _repeat: "no-repeat",
            _scale: 1,
            _offset: null,
            constructor: n,
            clone: function() {
                return new n(this.src)
            },
            toObject: function() {
                return {
                    src: this.src,
                    image: this.image
                }
            },
            _update: function() {
                return (this._flagSrc || this._flagImage) && (this
                        .trigger(t.Events.change), (this._flagSrc ||
                            this._flagImage) && (this.loaded = !1, n
                            .load(this, r.bind(function() {
                                this.loaded = !0, this
                                    .trigger(t.Events
                                        .change).trigger(t
                                        .Events.load)
                            }, this)))), this._image && 4 <= this
                    ._image.readyState && (this._flagVideo = !0),
                    this
            },
            flagReset: function() {
                return this._flagSrc = this._flagImage = this
                    ._flagLoaded = this._flagVideo = this
                    ._flagScale = this._flagOffset = !1, this
            }
        }), n.MakeObservable(n.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.Path,
            r = t.Rectangle,
            s = t.Sprite = function(r, s, n, a, o, l) {
                i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t
                        .Anchor
                    ], !0), this.noStroke(), this.noFill(), r instanceof t
                    .Texture ? this.texture = r : e.isString(r) && (this
                        .texture = new t.Texture(r)), this.origin = new t
                    .Vector, this._update(), this.translation.set(s || 0, n ||
                        0), e.isNumber(a) && (this.columns = a), e.isNumber(
                    o) && (this.rows = o), e.isNumber(l) && (this.frameRate = l)
            };
        e.extend(s, {
            Properties: ["texture", "columns", "rows", "frameRate",
                "index"
            ],
            MakeObservable: function(i) {
                r.MakeObservable(i), e.each(s.Properties, t.Utils
                    .defineProperty, i)
            }
        }), e.extend(s.prototype, r.prototype, {
            _flagTexture: !1,
            _flagColumns: !1,
            _flagRows: !1,
            _flagFrameRate: !1,
            flagIndex: !1,
            _amount: 1,
            _duration: 0,
            _startTime: 0,
            _playing: !1,
            _firstFrame: 0,
            _lastFrame: 0,
            _loop: !0,
            _texture: null,
            _columns: 1,
            _rows: 1,
            _frameRate: 0,
            _index: 0,
            _origin: null,
            constructor: s,
            play: function(t, i, r) {
                return this._playing = !0, this._firstFrame = 0,
                    this._lastFrame = this.amount - 1, this
                    ._startTime = e.performance.now(), e.isNumber(
                    t) && (this._firstFrame = t), e.isNumber(i) && (
                        this._lastFrame = i), e.isFunction(r) ? this
                    ._onLastFrame = r : delete this._onLastFrame,
                    this._index !== this._firstFrame && (this
                        ._startTime -= 1e3 * Math.abs(this._index -
                            this._firstFrame) / this._frameRate),
                    this
            },
            pause: function() {
                return this._playing = !1, this
            },
            stop: function() {
                return this._playing = !1, this._index = 0, this
            },
            clone: function(t) {
                var e = new s(this.texture, this.translation.x, this
                    .translation.y, this.columns, this.rows,
                    this.frameRate);
                return this.playing && (e.play(this._firstFrame,
                        this._lastFrame), e._loop = this._loop),
                    t && t.add(e), e
            },
            _update: function() {
                var t = this._texture,
                    i = this._columns,
                    s = this._rows;
                if ((this._flagColumns || this._flagRows) && (this
                        ._amount = this._columns * this._rows), this
                    ._flagFrameRate && (this._duration = 1e3 * this
                        ._amount / this._frameRate), this
                    ._flagTexture && (this.fill = this._texture),
                    this._texture.loaded) {
                    var n = t.image.width,
                        a = t.image.height,
                        o = n / i;
                    s = a / s;
                    var l = this._amount;
                    if (this.width !== o && (this.width = o), this
                        .height !== s && (this.height = s), this
                        ._playing && 0 < this._frameRate) {
                        e.isNaN(this._lastFrame) && (this
                                ._lastFrame = l - 1), l = e
                            .performance.now() - this._startTime;
                        var h = this._lastFrame + 1,
                            c = 1e3 * (h - this._firstFrame) / this
                            ._frameRate;
                        l = this._loop ? l % c : Math.min(l, c), l =
                            e.lerp(this._firstFrame, h, l / c), (l =
                                Math.floor(l)) !== this._index && (
                                this._index = l, l >= this
                                ._lastFrame - 1 && this
                                ._onLastFrame && this._onLastFrame()
                                )
                    }
                    o = this._index % i * -o + (n - o) / 2, i = -s *
                        Math.floor(this._index / i) + (a - s) / 2,
                        o !== t.offset.x && (t.offset.x = o), i !==
                        t.offset.y && (t.offset.y = i)
                }
                return r.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagTexture = this._flagColumns = this
                    ._flagRows = this._flagFrameRate = !1, r
                    .prototype.flagReset.call(this), this
            }
        }), s.MakeObservable(s.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        var e = t.Utils,
            i = t.Path,
            r = t.Rectangle,
            s = t.ImageSequence = function(r, n, a, o) {
                i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t
                        .Anchor
                    ], !0), this._renderer.flagTextures = e.bind(s.FlagTextures,
                        this), this._renderer.bindTextures = e.bind(s
                        .BindTextures, this), this._renderer.unbindTextures = e
                    .bind(s.UnbindTextures, this), this.noStroke(), this
                    .noFill(), this.textures = e.map(r, s.GenerateTexture,
                    this), this.origin = new t.Vector, this._update(), this
                    .translation.set(n || 0, a || 0), e.isNumber(o) ? this
                    .frameRate = o : this.frameRate = s.DefaultFrameRate
            };
        e.extend(s, {
            Properties: ["frameRate", "index"],
            DefaultFrameRate: 30,
            FlagTextures: function() {
                this._flagTextures = !0
            },
            BindTextures: function(e) {
                for (var i = e.length; i--;) e[i].bind(t.Events
                    .change, this._renderer.flagTextures);
                this._renderer.flagTextures()
            },
            UnbindTextures: function(e) {
                for (var i = e.length; i--;) e[i].unbind(t.Events
                    .change, this._renderer.flagTextures);
                this._renderer.flagTextures()
            },
            MakeObservable: function(i) {
                r.MakeObservable(i), e.each(s.Properties, t.Utils
                    .defineProperty, i), Object.defineProperty(
                    i, "textures", {
                        enumerable: !0,
                        get: function() {
                            return this._textures
                        },
                        set: function(e) {
                            var i = this._renderer
                                .bindTextures,
                                r = this._renderer
                                .unbindTextures;
                            this._textures && this._textures
                                .unbind(t.Events.insert, i)
                                .unbind(t.Events.remove, r),
                                this._textures = new t.Utils
                                .Collection((e || []).slice(
                                    0)), this._textures
                                .bind(t.Events.insert, i)
                                .bind(t.Events.remove, r),
                                i(this._textures)
                        }
                    })
            },
            GenerateTexture: function(i) {
                return i instanceof t.Texture ? i : e.isString(i) ?
                    new t.Texture(i) : void 0
            }
        }), e.extend(s.prototype, r.prototype, {
            _flagTextures: !1,
            _flagFrameRate: !1,
            _flagIndex: !1,
            _amount: 1,
            _duration: 0,
            _index: 0,
            _startTime: 0,
            _playing: !1,
            _firstFrame: 0,
            _lastFrame: 0,
            _loop: !0,
            _textures: null,
            _frameRate: 0,
            _origin: null,
            constructor: s,
            play: function(t, i, r) {
                return this._playing = !0, this._firstFrame = 0,
                    this._lastFrame = this.amount - 1, this
                    ._startTime = e.performance.now(), e.isNumber(
                    t) && (this._firstFrame = t), e.isNumber(i) && (
                        this._lastFrame = i), e.isFunction(r) ? this
                    ._onLastFrame = r : delete this._onLastFrame,
                    this._index !== this._firstFrame && (this
                        ._startTime -= 1e3 * Math.abs(this._index -
                            this._firstFrame) / this._frameRate),
                    this
            },
            pause: function() {
                return this._playing = !1, this
            },
            stop: function() {
                return this._playing = !1, this._index = 0, this
            },
            clone: function(t) {
                var e = new s(this.textures, this.translation.x,
                    this.translation.y, this.frameRate);
                return e._loop = this._loop, this._playing && e
                    .play(), t && t.add(e), e
            },
            _update: function() {
                var i = this._textures;
                if (this._flagTextures && (this._amount = i.length),
                    this._flagFrameRate && (this._duration = 1e3 *
                        this._amount / this._frameRate), this
                    ._playing && 0 < this._frameRate) {
                    var s = this._amount;
                    e.isNaN(this._lastFrame) && (this._lastFrame =
                            s - 1), s = e.performance.now() - this
                        ._startTime;
                    var n = this._lastFrame + 1,
                        a = 1e3 * (n - this._firstFrame) / this
                        ._frameRate;
                    s = this._loop ? s % a : Math.min(s, a), s = e
                        .lerp(this._firstFrame, n, s / a), (s = Math
                            .floor(s)) !== this._index && (this
                            ._index = s, (n = i[this._index])
                            .loaded && (i = n.image.width, a = n
                                .image.height, this.width !== i && (
                                    this.width = i), this.height !==
                                a && (this.height = a), this.fill =
                                n, s >= this._lastFrame - 1 && this
                                ._onLastFrame && this._onLastFrame()
                                ))
                } else !this._flagIndex && this.fill instanceof t
                    .Texture || ((n = i[this._index]).loaded && (i =
                            n.image.width, a = n.image.height, this
                            .width !== i && (this.width = i), this
                            .height !== a && (this.height = a)),
                        this.fill = n);
                return r.prototype._update.call(this), this
            },
            flagReset: function() {
                return this._flagTextures = this._flagFrameRate = !
                    1, r.prototype.flagReset.call(this), this
            }
        }), s.MakeObservable(s.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing),
    function(t) {
        function e(t, e) {
            var i = t.parent;
            if (i === e) this.additions.push(t), this._flagAdditions = !0;
            else {
                if (i && i.children.ids[t.id]) {
                    var r = s.indexOf(i.children, t);
                    i.children.splice(r, 1), 0 <= (r = s.indexOf(i.additions,
                        t)) ? i.additions.splice(r, 1) : (i.subtractions
                        .push(t), i._flagSubtractions = !0)
                }
                e ? (t.parent = e, this.additions.push(t), this
                    ._flagAdditions = !0) : (0 <= (r = s.indexOf(this
                    .additions, t)) ? this.additions.splice(r, 1) : (
                    this.subtractions.push(t), this
                    ._flagSubtractions = !0), delete t.parent)
            }
        }
        var i = Math.min,
            r = Math.max,
            s = t.Utils,
            n = function() {
                t.Utils.Collection.apply(this, arguments), Object
                    .defineProperty(this, "_events", {
                        value: {},
                        enumerable: !1
                    }), this.ids = {}, this.on(t.Events.insert, this.attach),
                    this.on(t.Events.remove, this.detach), n.prototype.attach
                    .apply(this, arguments)
            };
        n.prototype = new t.Utils.Collection, s.extend(n.prototype, {
            constructor: n,
            attach: function(t) {
                for (var e = 0; e < t.length; e++) this.ids[t[e]
                    .id] = t[e];
                return this
            },
            detach: function(t) {
                for (var e = 0; e < t.length; e++) delete this.ids[
                    t[e].id];
                return this
            }
        });
        var a = t.Group = function(e) {
            t.Shape.call(this, !0), this._renderer.type = "group", this
                .additions = [], this.subtractions = [], this.children = s
                .isArray(e) ? e : arguments
        };
        s.extend(a, {
            Children: n,
            InsertChildren: function(t) {
                for (var i = 0; i < t.length; i++) e.call(this, t[
                    i], this)
            },
            RemoveChildren: function(t) {
                for (var i = 0; i < t.length; i++) e.call(this, t[
                    i])
            },
            OrderChildren: function(t) {
                this._flagOrder = !0
            },
            Properties: "fill stroke linewidth visible cap join miter"
                .split(" "),
            MakeObservable: function(e) {
                var i = t.Group.Properties;
                Object.defineProperty(e, "opacity", {
                        enumerable: !0,
                        get: function() {
                            return this._opacity
                        },
                        set: function(t) {
                            this._flagOpacity = this
                                ._opacity !== t, this
                                ._opacity = t
                        }
                    }), Object.defineProperty(e, "className", {
                        enumerable: !0,
                        get: function() {
                            return this._className
                        },
                        set: function(t) {
                            this._flagClassName = this
                                ._className !== t, this
                                ._className = t
                        }
                    }), Object.defineProperty(e, "beginning", {
                        enumerable: !0,
                        get: function() {
                            return this._beginning
                        },
                        set: function(t) {
                            this._flagBeginning = this
                                ._beginning !== t, this
                                ._beginning = t
                        }
                    }), Object.defineProperty(e, "ending", {
                        enumerable: !0,
                        get: function() {
                            return this._ending
                        },
                        set: function(t) {
                            this._flagEnding = this
                                ._ending !== t, this
                                ._ending = t
                        }
                    }), Object.defineProperty(e, "length", {
                        enumerable: !0,
                        get: function() {
                            if (this._flagLength || 0 >=
                                this._length) {
                                if (this._length = 0, !this
                                    .children) return this
                                    ._length;
                                for (var t = 0; t < this
                                    .children.length; t++)
                                    this._length += this
                                    .children[t].length
                            }
                            return this._length
                        }
                    }), t.Shape.MakeObservable(e), a
                    .MakeGetterSetters(e, i), Object.defineProperty(
                        e, "children", {
                            enumerable: !0,
                            get: function() {
                                return this._children
                            },
                            set: function(e) {
                                var i = s.bind(a.InsertChildren,
                                        this),
                                    r = s.bind(a.RemoveChildren,
                                        this),
                                    o = s.bind(a.OrderChildren,
                                        this);
                                this._children && this._children
                                    .unbind(), this._children =
                                    new n(e), this._children
                                    .bind(t.Events.insert, i),
                                    this._children.bind(t.Events
                                        .remove, r), this
                                    ._children.bind(t.Events
                                        .order, o)
                            }
                        }), Object.defineProperty(e, "mask", {
                        enumerable: !0,
                        get: function() {
                            return this._mask
                        },
                        set: function(t) {
                            this._mask = t, this
                                ._flagMask = !0, t.clip || (
                                    t.clip = !0)
                        }
                    })
            },
            MakeGetterSetters: function(t, e) {
                s.isArray(e) || (e = [e]), s.each(e, function(e) {
                    a.MakeGetterSetter(t, e)
                })
            },
            MakeGetterSetter: function(t, e) {
                var i = "_" + e;
                Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return this[i]
                    },
                    set: function(t) {
                        this[i] = t, s.each(this
                            .children,
                            function(i) {
                                i[e] = t
                            })
                    }
                })
            }
        }), s.extend(a.prototype, t.Shape.prototype, {
            _flagAdditions: !1,
            _flagSubtractions: !1,
            _flagOrder: !1,
            _flagOpacity: !0,
            _flagClassName: !1,
            _flagBeginning: !1,
            _flagEnding: !1,
            _flagLength: !1,
            _flagMask: !1,
            _fill: "#fff",
            _stroke: "#000",
            _linewidth: 1,
            _opacity: 1,
            _className: "",
            _visible: !0,
            _cap: "round",
            _join: "round",
            _miter: 4,
            _closed: !0,
            _curved: !1,
            _automatic: !0,
            _beginning: 0,
            _ending: 1,
            _length: 0,
            _mask: null,
            constructor: a,
            clone: function(t) {
                var e = new a,
                    i = s.map(this.children, function(t) {
                        return t.clone()
                    });
                return e.add(i), e.opacity = this.opacity, this
                    .mask && (e.mask = this.mask), e.translation
                    .copy(this.translation), e.rotation = this
                    .rotation, e.scale = this.scale, e.className =
                    this.className, t && t.add(e), e._update()
            },
            toObject: function() {
                var e = {
                    children: [],
                    translation: this.translation.toObject(),
                    rotation: this.rotation,
                    scale: this.scale instanceof t.Vector ? this
                        .scale.toObject() : this.scale,
                    opacity: this.opacity,
                    className: this.className,
                    mask: this.mask ? this.mask.toObject() :
                        null
                };
                return s.each(this.children, function(t, i) {
                    e.children[i] = t.toObject()
                }, this), e
            },
            corner: function() {
                var t = this.getBoundingClientRect(!0),
                    e = {
                        x: t.left,
                        y: t.top
                    };
                return this.children.forEach(function(t) {
                    t.translation.sub(e)
                }), this
            },
            center: function() {
                var t = this.getBoundingClientRect(!0);
                return t.centroid = {
                    x: t.left + t.width / 2,
                    y: t.top + t.height / 2
                }, this.children.forEach(function(e) {
                    e.isShape && e.translation.sub(t
                        .centroid)
                }), this
            },
            getById: function(t) {
                var e = function(t, i) {
                    if (t.id === i) return t;
                    if (t.children)
                        for (var r = t.children.length; r--;) {
                            var s = e(t.children[r], i);
                            if (s) return s
                        }
                };
                return e(this, t) || null
            },
            getByClassName: function(t) {
                var e = [],
                    i = function(t, r) {
                        return -1 != t.classList.indexOf(r) ? e
                            .push(t) : t.children && t.children
                            .forEach(function(t) {
                                i(t, r)
                            }), e
                    };
                return i(this, t)
            },
            getByType: function(e) {
                var i = [],
                    r = function(e, s) {
                        for (var n in e.children) e.children[
                            n] instanceof s ? i.push(e.children[
                            n]) : e.children[n] instanceof t
                            .Group && r(e.children[n], s);
                        return i
                    };
                return r(this, e)
            },
            add: function(t) {
                t = t instanceof Array ? t.slice() : s.toArray(
                    arguments);
                for (var e = 0; e < t.length; e++) t[e] && t[e]
                    .id && this.children.push(t[e]);
                return this
            },
            remove: function(t) {
                var e = this.parent;
                if (0 >= arguments.length && e) return e.remove(
                    this), this;
                for (t = t instanceof Array ? t.slice() : s.toArray(
                        arguments), e = 0; e < t.length; e++) t[
                    e] && this.children.ids[t[e].id] && this
                    .children.splice(s.indexOf(this.children, t[e]),
                        1);
                return this
            },
            getBoundingClientRect: function(e) {
                this._update(!0);
                for (var n = 1 / 0, a = -1 / 0, o = 1 / 0, l = -1 /
                        0, h = t.Texture.RegularExpressions.effect,
                        c = 0; c < this.children.length; c++) {
                    var d = this.children[c];
                    d.visible && !h.test(d._renderer.type) && (d = d
                        .getBoundingClientRect(e), s.isNumber(d
                            .top) && s.isNumber(d.left) && s
                        .isNumber(d.right) && s.isNumber(d
                            .bottom) && (o = i(d.top, o), n = i(
                                d.left, n), a = r(d.right, a),
                            l = r(d.bottom, l)))
                }
                return {
                    top: o,
                    left: n,
                    right: a,
                    bottom: l,
                    width: a - n,
                    height: l - o
                }
            },
            noFill: function() {
                return this.children.forEach(function(t) {
                    t.noFill()
                }), this
            },
            noStroke: function() {
                return this.children.forEach(function(t) {
                    t.noStroke()
                }), this
            },
            subdivide: function() {
                var t = arguments;
                return this.children.forEach(function(e) {
                    e.subdivide.apply(e, t)
                }), this
            },
            _update: function() {
                if (this._flagBeginning || this._flagEnding) {
                    var e = this.length,
                        i = 0,
                        r = Math.min(this._beginning, this
                        ._ending) * e;
                    e *= Math.max(this._beginning, this._ending);
                    for (var s = 0; s < this.children.length; s++) {
                        var n = this.children[s],
                            a = n.length;
                        r > i + a ? (n.beginning = 1, n.ending =
                            1) : e < i ? (n.beginning = 0, n
                                .ending = 0) : r > i && r < i + a ?
                            (n.beginning = (r - i) / a, n.ending =
                                1) : e > i && e < i + a ? (n
                                .beginning = 0, n.ending = (e - i) /
                                a) : (n.beginning = 0, n.ending =
                            1), i += a
                    }
                }
                return t.Shape.prototype._update.apply(this,
                    arguments)
            },
            flagReset: function() {
                return this._flagAdditions && (this.additions
                        .length = 0, this._flagAdditions = !1), this
                    ._flagSubtractions && (this.subtractions
                        .length = 0, this._flagSubtractions = !1),
                    this._flagOrder = this._flagMask = this
                    ._flagOpacity = this._flagClassName, this
                    ._flagBeginning = this._flagEnding = !1, t.Shape
                    .prototype.flagReset.call(this), this
            }
        }), a.MakeObservable(a.prototype)
    }(("undefined" != typeof global ? global : this || self || window).Gearing);
