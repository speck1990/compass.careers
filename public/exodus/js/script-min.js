function _gambitRefreshScroll() {
    jQuery;
    _gambitScrollTop = window.pageYOffset, _gambitScrollLeft = window.pageXOffset
}

function _gambitParallaxAll() {
    _gambitRefreshScroll();
    for (var t = 0; t < _gambitImageParallaxImages.length; t++) _gambitImageParallaxImages[t].doParallax()
}

function _vcRowGetAllElementsWithAttribute(t) {
    for (var e = [], i = document.getElementsByTagName("*"), a = 0, n = i.length; n > a; a++) i[a].getAttribute(t) && e.push(i[a]);
    return e
}

function _vcRowOnPlayerReady(t) {
    var e = t.target;
    e.playVideo(), e.isMute && e.mute(), e.forceHD && e.setPlaybackQuality("hd720");
    var i = e.getCurrentTime(),
        a = +new Date / 1e3,
        n = 0,
        s = !0;
    e.loopInterval = setInterval(function() {
        "undefined" != typeof e.loopTimeout && clearTimeout(e.loopTimeout), i === e.getCurrentTime() ? n = i + (+new Date / 1e3 - a) : (n = e.getCurrentTime(), a = +new Date / 1e3), i = e.getCurrentTime(), n + (s ? .45 : .21) >= e.getDuration() && (e.pauseVideo(), e.seekTo(0), e.playVideo(), s = !1)
    }, 150)
}

function _vcRowOnPlayerStateChange(t) {
    t.data === YT.PlayerState.ENDED ? ("undefined" != typeof t.target.loopTimeout && clearTimeout(t.target.loopTimeout), t.target.seekTo(0)) : t.data === YT.PlayerState.PLAYING && jQuery(t.target.getIframe()).parent().css("visibility", "visible")
}

function resizeVideo(t) {
    var e = t.parent();
    if (null === e.find("iframe").width()) return void setTimeout(function() {
        resizeVideo(t)
    }, 500);
    var i = t;
    i.css({
        width: "auto",
        height: "auto",
        left: "auto",
        top: "auto"
    }), i.css("position", "absolute");
    var a, n, s, r, o = (e.find("iframe").width(), e.find("iframe").height(), e.width()),
        d = e.height(),
        l = "16:9";
    "undefined" != typeof t.attr("data-video-aspect-ratio") && -1 !== t.attr("data-video-aspect-ratio").indexOf(":") && (l = t.attr("data-video-aspect-ratio").split(":"), l[0] = parseFloat(l[0]), l[1] = parseFloat(l[1])), n = d, a = l[0] / l[1] * d, s = l[0] / l[1] * d - o, r = o * l[1] / l[0] - d, a >= o && n >= d ? (height = d, width = l[0] / l[1] * d) : (width = o, height = o * l[1] / l[0]), marginTop = -(height - d) / 2, marginLeft = -(width - o) / 2, e.find("iframe").css({
        width: width,
        height: height,
        marginLeft: marginLeft,
        marginTop: marginTop
    }).attr("width", width).attr("height", height)
}

function onYouTubeIframeAPIReady() {
    for (var t = _vcRowGetAllElementsWithAttribute("data-youtube-video-id"), e = 0; e < t.length; e++) {
        for (var i = t[e].getAttribute("data-youtube-video-id"), a = "", n = 0; n < t[e].childNodes.length; n++)
            if (/div/i.test(t[e].childNodes[n].tagName)) {
                a = t[e].childNodes[n].getAttribute("id");
                break
            }
        if ("" !== a) {
            var s = t[e].getAttribute("data-mute"),
                r = new YT.Player(a, {
                    height: "auto",
                    width: "auto",
                    videoId: i,
                    playerVars: {
                        autohide: 1,
                        autoplay: 1,
                        fs: 0,
                        showinfo: 0,
                        loop: 1,
                        modestBranding: 1,
                        start: 0,
                        controls: 0,
                        rel: 0,
                        disablekb: 1,
                        iv_load_policy: 3,
                        wmode: "transparent"
                    },
                    events: {
                        onReady: _vcRowOnPlayerReady,
                        onStateChange: _vcRowOnPlayerStateChange
                    }
                });
            r.isMute = "true" === s, r.forceHD = "true" === t[e].getAttribute("data-force-hd"), setTimeout(function() {
                jQuery("#" + a).css("visibility", "visible")
            }, 500)
        }
    }
}
if (jQuery(document).ready(function(t) {
        "use strict";

        function e() {
            t(".gambit_fullwidth_row").each(function(e) {
                var i = t(document.gambitFindElementParentRow(t(this)[0])),
                    a = i.css("webkitTransform"),
                    n = i.css("mozTransform"),
                    s = i.css("msTransform"),
                    r = i.css("transform");
                i.css({
                    width: "",
                    position: "",
                    maxWidth: "",
                    left: "",
                    paddingLeft: "",
                    paddingRight: "",
                    webkitTransform: "",
                    mozTransform: "",
                    msTransform: "",
                    transform: ""
                });
                var o = t(this).attr("data-content-width") || i.children(":not([class^=gambit])").width() + "px";
                if (i.parent().css("overflowX", "visible"), i.css("left", ""), i.css({
                        width: "100vw",
                        position: "relative",
                        maxWidth: t(window).width(),
                        left: -i.offset().left,
                        webkitTransform: a,
                        mozTransform: n,
                        msTransform: s,
                        transform: r
                    }), "" !== o) {
                    var d, l, g, c = 0;
                    d = -1 !== o.search("%") ? parseFloat(o) / 100 * t(window).width() : parseFloat(o), c = (t(window).width() - d) / 2, l = c + parseFloat(i.css("marginLeft")), g = c + parseFloat(i.css("marginRight")), d > t(window).width() && (l = 0, g = 0), i.css({
                        paddingLeft: l,
                        paddingRight: g
                    })
                }
            })
        }
        e(), t(window).resize(function() {
            e()
        })
    }), jQuery(document).ready(function(t) {
        "use strict";

        function e() {
            t(".gambit_fullheight_row").each(function(e) {
                var i = t(document.gambitFindElementParentRow(t(this)[0])),
                    a = t(this).attr("data-content-location") || "center";
                i.css("minHeight", i.height() + 60), i.addClass("gambit-row-fullheight gambit-row-height-location-" + a), "center" === a && (i.find("> .vc_column_container > .wpb_wrapper > .wpb_text_column > .wpb_wrapper > *:first-child").css("marginTop", 0), i.find("> .vc_column_container > .wpb_wrapper > .wpb_text_column > .wpb_wrapper > *:last-child").css("marginBottom", 0))
            })
        }
        e()
    }), function() {
        for (var t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, e) {
            return window.setTimeout(function() {
                t()
            }, 16)
        })
    }(), "undefined" == typeof _gambitImageParallaxImages) var _gambitImageParallaxImages = [],
    _gambitScrollTop, _gambitWindowHeight, _gambitScrollLeft, _gambitWindowWidth;
! function(t, e, i, a) {
    function n(e, i) {
        this.element = e, this.settings = t.extend({}, r, i), "" === this.settings.align && (this.settings.align = "center"), "" === this.settings.id && (this.settings.id = +new Date), this._defaults = r, this._name = s, this.init()
    }
    var s = "gambitImageParallax",
        r = {
            direction: "up",
            mobileenabled: !1,
            mobiledevice: !1,
            width: "",
            height: "",
            align: "center",
            opacity: "1",
            velocity: ".3",
            image: "",
            target: "",
            repeat: !1,
            loopScroll: "",
            loopScrollTime: "2",
            removeOrig: !1,
            zIndex: "-1",
            id: "",
            complete: function() {}
        };
    t.extend(n.prototype, {
        init: function() {
            "" === this.settings.target && (this.settings.target = t(this.element)), this.settings.target.addClass(this.settings.direction), "" === this.settings.image && "undefined" != typeof t(this.element).css("backgroundImage") && "" !== t(this.element).css("backgroundImage") && (this.settings.image = t(this.element).css("backgroundImage").replace(/url\(|\)|"|'/g, "")), _gambitImageParallaxImages.push(this), this.setup(), this.settings.complete(), this.containerWidth = 0, this.containerHeight = 0
        },
        setup: function() {
            this.settings.removeOrig !== !1 && t(this.element).remove(), this.resizeParallaxBackground()
        },
        doParallax: function() {
            if ((!this.settings.mobiledevice || this.settings.mobileenabled) && this.isInView()) {
                "undefined" == typeof this.settings.inner && (this.settings.inner = this.settings.target[0].querySelectorAll(".parallax-inner-" + this.settings.id)[0]);
                var t = this.settings.inner;
                ("undefined" == typeof this.settings.doParallaxClientLastUpdate || +new Date - this.settings.doParallaxClientLastUpdate > 2e3 + 1e3 * Math.random()) && (this.settings.doParallaxClientLastUpdate = +new Date, this.settings.clientWidthCache = this.settings.target[0].clientWidth, this.settings.clientHeightCache = this.settings.target[0].clientHeight), 0 === this.containerWidth || 0 === this.containerHeight || this.settings.clientWidthCache === this.containerWidth && this.settings.clientHeightCache === this.containerHeight || this.resizeParallaxBackground(), this.containerWidth = this.settings.clientWidthCache, this.containerHeight = this.settings.clientHeightCache;
                var e = (_gambitScrollTop - this.scrollTopMin) / (this.scrollTopMax - this.scrollTopMin),
                    i = this.moveMax * e;
                ("left" === this.settings.direction || "up" === this.settings.direction) && (i *= -1);
                var a = "translate3d(",
                    n = "px, 0px, 0px)",
                    s = "translate3d(0px, ",
                    r = "px, 0px)";
                "undefined" != typeof _gambitParallaxIE9 && (a = "translate(", n = "px, 0px)", s = "translate(0px, ", r = "px)"), "no-repeat" === t.style.backgroundRepeat && ("down" === this.settings.direction && 0 > i && (i = 0), "up" === this.settings.direction && i > 0 && (i = 0)), "left" === this.settings.direction || "right" === this.settings.direction ? (t.style.transition = "transform 1ms linear", t.style.webkitTransform = a + i + n, t.style.transform = a + i + n) : (t.style.transition = "transform 1ms linear", t.style.webkitTransform = s + i + r, t.style.transform = s + i + r), t.style.transition = "transform -1ms linear"
            }
        },
        isInView: function() {
            if ("undefined" == typeof this.settings.offsetLastUpdate || +new Date - this.settings.offsetLastUpdate > 4e3 + 1e3 * Math.random()) {
                this.settings.offsetLastUpdate = +new Date;
                var t = this.settings.target[0];
                this.settings.offsetTopCache = t.getBoundingClientRect().top + e.pageYOffset, this.settings.elemHeightCache = t.clientHeight
            }
            var i = this.settings.offsetTopCache,
                a = this.settings.elemHeightCache;
            return _gambitScrollTop > i + a || i > _gambitScrollTop + _gambitWindowHeight ? !1 : !0
        },
        computeCoverDimensions: function(t, e, i) {
            var a = t / e,
                n = i.offsetWidth / i.offsetHeight;
            if (a >= n) var s = i.offsetHeight,
                r = s / e,
                o = t * r;
            else var o = i.offsetWidth,
                r = o / t,
                s = e * r;
            return o + "px " + s + "px"
        },
        resizeParallaxBackground: function() {
            var e = this.settings.target;
            if ("undefined" != typeof e && 0 !== e.length) {
                var i = "true" === this.settings.repeat || this.settings.repeat === !0 || 1 === this.settings.repeat;
                e[0].style.minHeight = "150px";
                var a = e[0].getAttribute("class");
                if (a && a.match(/full\-height/) && (e[0].style.minHeight = ""), "none" === this.settings.direction) {
                    var n = e.width() + parseInt(e.css("paddingRight"), 10) + parseInt(e.css("paddingLeft"), 10),
                        s = e.offset().left;
                    "center" === this.settings.align ? s = "50% 50%" : "left" === this.settings.align ? s = "0% 50%" : "right" === this.settings.align ? s = "100% 50%" : "top" === this.settings.align ? s = "50% 0%" : "bottom" === this.settings.align && (s = "50% 100%"), e.css({
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundSize: "cover",
                        backgroundAttachment: "scroll",
                        backgroundPosition: s,
                        backgroundRepeat: "no-repeat"
                    }), "" !== this.settings.image && "none" !== this.settings.image && e.css({
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundImage: "url(" + this.settings.image + ")"
                    })
                } else if ("fixed" === this.settings.direction) {
                    var n = e.width() + parseInt(e.css("paddingRight"), 10) + parseInt(e.css("paddingLeft"), 10),
                        r = _gambitWindowHeight,
                        o = "0%";
                    "center" === this.settings.align ? o = "50%" : "right" === this.settings.align && (o = "100%");
                    var d = e.offset().left,
                        l = !!navigator.userAgent.match(/MSIE/) || !!navigator.userAgent.match(/Trident.*rv[ :]*11\./) || !!navigator.userAgent.match(/Edge\/12/),
                        g = !!navigator.userAgent.match(/Edge\/12/);
                    !l && e.find(".fixed-wrapper-" + this.settings.id).length < 1 && t("<div></div>").addClass("fixed-wrapper-" + this.settings.id).prependTo(e), e.find(".parallax-inner-" + this.settings.id).length < 1 && t("<div></div>").addClass("gambit_parallax_inner").addClass("parallax-inner-" + this.settings.id).addClass(this.settings.direction).prependTo(l ? e : e.find(".fixed-wrapper-" + this.settings.id)), e.css({
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1
                    }), e.find(".fixed-wrapper-" + this.settings.id).css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        clip: l ? "auto" : "rect(auto,auto,auto,auto)",
                        webkitTransform: "none",
                        transform: "none"
                    }), e.find(".parallax-inner-" + this.settings.id).css({
                        pointerEvents: "none",
                        width: n,
                        height: r,
                        position: l ? "absolute" : "fixed",
                        zIndex: this.settings.zIndex,
                        top: 0,
                        left: l ? 0 : d,
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundSize: i ? "auto" : l ? this.computeCoverDimensions(this.settings.width, this.settings.height, e[0].querySelectorAll(".parallax-inner-" + this.settings.id)[0]) : "cover",
                        backgroundAttachment: "fixed",
                        backgroundPosition: i ? "0 0 " : "50% 50%",
                        backgroundRepeat: i ? "repeat" : "no-repeat",
                        webkitTransform: "translateZ(0)",
                        transform: "translateZ(0)"
                    }), g && (e.css({
                        transform: "none",
                        transformStyle: "flat"
                    }), e.find(".parallax-inner-" + this.settings.id).css({
                        transform: "none",
                        transformStyle: "flat"
                    })), "" !== this.settings.image && "none" !== this.settings.image && e.find(".parallax-inner-" + this.settings.id).css({
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundImage: "url(" + this.settings.image + ")"
                    }), this.settings.mobiledevice && !this.settings.mobileenabled && e.find(".parallax-inner-" + this.settings.id).css({
                        position: "absolute",
                        backgroundAttachment: "initial",
                        backgroundSize: "cover",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        top: "0",
                        height: "auto",
                        width: "auto"
                    })
                } else if ("left" === this.settings.direction || "right" === this.settings.direction) {
                    var n = e.width() + parseInt(e.css("paddingRight"), 10) + parseInt(e.css("paddingLeft"), 10),
                        r = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10),
                        c = n;
                    n += 400 * Math.abs(parseFloat(this.settings.velocity));
                    var h = "0%";
                    "center" === this.settings.align ? h = "50%" : "bottom" === this.settings.align && (h = "100%");
                    var d = 0;
                    "right" === this.settings.direction && (d -= n - c), e.find(".parallax-inner-" + this.settings.id).length < 1 && t("<div></div>").addClass("gambit_parallax_inner").addClass("parallax-inner-" + this.settings.id).addClass(this.settings.direction).prependTo(e), e.css({
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1
                    }).find(".parallax-inner-" + this.settings.id).css({
                        pointerEvents: "none",
                        width: n,
                        height: r,
                        position: "absolute",
                        zIndex: this.settings.zIndex,
                        top: 0,
                        left: d,
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundSize: i ? "auto" : this.computeCoverDimensions(this.settings.width, this.settings.height, e[0].querySelectorAll(".parallax-inner-" + this.settings.id)[0]),
                        backgroundPosition: i ? "0 0 " : "50% " + h,
                        backgroundRepeat: i ? "repeat" : "no-repeat"
                    }), "" !== this.settings.image && "none" !== this.settings.image && e.find(".parallax-inner-" + this.settings.id).css({
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundImage: "url(" + this.settings.image + ")"
                    });
                    var m = 0;
                    e.offset().top > _gambitWindowHeight && (m = e.offset().top - _gambitWindowHeight);
                    var u = e.offset().top + e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10);
                    this.moveMax = n - c, this.scrollTopMin = m, this.scrollTopMax = u
                } else {
                    var p = 800;
                    "down" === this.settings.direction && (p *= 1.2);
                    var n = e.width() + parseInt(e.css("paddingRight"), 10) + parseInt(e.css("paddingLeft"), 10),
                        r = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10),
                        f = r;
                    r += p * Math.abs(parseFloat(this.settings.velocity));
                    var d = "0%";
                    "center" === this.settings.align ? d = "50%" : "right" === this.settings.align && (d = "100%");
                    var h = 0;
                    "down" === this.settings.direction && (h -= r - f), e.find(".parallax-inner-" + this.settings.id).length < 1 && t("<div></div>").addClass("gambit_parallax_inner").addClass("parallax-inner-" + this.settings.id).addClass(this.settings.direction).prependTo(e), e.css({
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1
                    }).find(".parallax-inner-" + this.settings.id).css({
                        pointerEvents: "none",
                        width: n,
                        height: r,
                        position: "absolute",
                        zIndex: this.settings.zIndex,
                        top: h,
                        left: 0,
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundSize: i ? "auto" : this.computeCoverDimensions(this.settings.width, this.settings.height, e[0].querySelectorAll(".parallax-inner-" + this.settings.id)[0]),
                        backgroundPosition: i ? "0" : d + " 50%",
                        backgroundRepeat: i ? "repeat" : "no-repeat"
                    }), "" !== this.settings.image && "none" !== this.settings.image && e.find(".parallax-inner-" + this.settings.id).css({
                        opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                        backgroundImage: "url(" + this.settings.image + ")"
                    });
                    var m = 0;
                    e.offset().top > _gambitWindowHeight && (m = e.offset().top - _gambitWindowHeight);
                    var u = e.offset().top + e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10);
                    this.moveMax = r - f, this.scrollTopMin = m, this.scrollTopMax = u
                }
            }
        }
    }), t.fn[s] = function(e) {
        return this.each(function() {
            t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new n(this, e))
        }), this
    }
}(jQuery, window, document), jQuery(document).ready(function(t) {
    "use strict";

    function e() {
        _gambitRefreshScroll();
        for (var t = 0; t < _gambitImageParallaxImages.length; t++) _gambitImageParallaxImages[t].doParallax();
        requestAnimationFrame(e)
    }

    function i() {
        _gambitScrollTop = window.pageYOffset, _gambitWindowHeight = window.innerHeight, _gambitScrollLeft = window.pageXOffset, _gambitWindowWidth = window.innerWidth
    }
    t(window).on("scroll touchmove touchstart touchend gesturechange mousemove", function(t) {
        requestAnimationFrame(_gambitParallaxAll)
    }), navigator.userAgent.match(/(Mobi|Android)/) && requestAnimationFrame(e), t(window).on("grid:items:added", function() {
        setTimeout(function() {
            var t = jQuery;
            i(), t.each(_gambitImageParallaxImages, function(t, e) {
                e.resizeParallaxBackground()
            })
        }, 1)
    }), t(window).on("resize", function() {
        setTimeout(function() {
            var t = jQuery;
            i(), t.each(_gambitImageParallaxImages, function(t, e) {
                e.resizeParallaxBackground()
            })
        }, 1)
    }), setTimeout(function() {
        var t = jQuery;
        i(), t.each(_gambitImageParallaxImages, function(t, e) {
            e.resizeParallaxBackground()
        })
    }, 1), setTimeout(function() {
        var t = jQuery;
        i(), t.each(_gambitImageParallaxImages, function(t, e) {
            e.resizeParallaxBackground()
        })
    }, 100)
});
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), jQuery(document).ready(function(t) {
    if (!t("body").hasClass("vc_editor")) {
        if (navigator.userAgent.match(/(Mobi|Android)/)) return void t(".gambit_video_inner").attr("style", "display: none !important");
        t(".gambit_video_row").each(function() {
            var e = t(document.gambitFindElementParentRow(t(this)[0]));
            e.addClass("gambit_has_video_bg");
            var i = t("<div></div>").addClass("gambit_video_inner").css("opacity", Math.abs(parseFloat(t(this).attr("data-opacity")) / 100));
            e.css("position", "relative"), t(this).children().prependTo(i), i.prependTo(e), i[0].style.zIndex = t(this)[0].style.zIndex
        }), t("[data-youtube-video-id], [data-vimeo-video-id]").each(function() {
            var e = t(this);
            setTimeout(function() {
                resizeVideo(e)
            }, 100)
        }), t(window).resize(function() {
            t("[data-youtube-video-id], [data-vimeo-video-id]").each(function() {
                var e = t(this);
                setTimeout(function() {
                    resizeVideo(e)
                }, 2)
            })
        }), t("[data-vimeo-video-id]").each(function() {
            var e = $f(t(this).find("iframe")[0]),
                i = t(this);
            e.addEvent("ready", function() {
                "true" === i.attr("data-mute") && e.api("setVolume", 0), e.addEvent("playProgress", function(t, e) {
                    jQuery("#" + e).parent().css("visibility", "visible")
                })
            })
        })
    }
}), document.addEventListener("DOMContentLoaded", function() {
    var t = document.querySelectorAll(".gambit_hover_row");
    if (Array.prototype.forEach.call(t, function(t, e) {
            var i = document.gambitFindElementParentRow(t);
            i.style.overflow = "hidden", i.classList.add("has_gambit_hover_row");
            var a = document.createElement("div");
            a.classList.add("gambit_hover_inner"), a.setAttribute("data-type", t.getAttribute("data-type")), a.setAttribute("data-amount", t.getAttribute("data-amount")), a.setAttribute("data-inverted", t.getAttribute("data-inverted")), a.style.opacity = Math.abs(parseFloat(t.getAttribute("data-opacity")) / 100), a.style.backgroundImage = "url(" + t.getAttribute("data-bg-image") + ")";
            var n = 0;
            n = "tilt" === t.getAttribute("data-type") ? .6 * -parseInt(t.getAttribute("data-amount"), 10) + "%" : -parseInt(t.getAttribute("data-amount"), 10) + "px", a.style.top = n, a.style.left = n, a.style.right = n, a.style.bottom = n, a.style.zIndex = t.style.zIndex, i.insertBefore(a, i.firstChild)
        }), !navigator.userAgent.match(/(Mobi|Android)/)) {
        var t = document.querySelectorAll(".has_gambit_hover_row");
        Array.prototype.forEach.call(t, function(t, e) {
            t.addEventListener("mousemove", function(t) {
                for (var e = t.target.parentNode; !e.classList.contains("has_gambit_hover_row");) {
                    if ("HTML" === e.tagName) return;
                    e = e.parentNode
                }
                var i = e.getBoundingClientRect(),
                    a = t.pageY - (i.top + window.pageYOffset),
                    n = t.pageX - (i.left + window.pageXOffset);
                a /= e.clientHeight, n /= e.clientWidth;
                var s = e.querySelectorAll(".gambit_hover_inner");
                Array.prototype.forEach.call(s, function(t, e) {
                    var i, s = parseFloat(t.getAttribute("data-amount")),
                        r = "true" === t.getAttribute("data-inverted");
                    if ("tilt" === t.getAttribute("data-type")) {
                        var o = n * s - s / 2,
                            d = (1 - a) * s - s / 2;
                        r && (o = (1 - n) * s - s / 2, d = a * s - s / 2), i = "perspective(2000px) ", i += "rotateY(" + o + "deg) ", i += "rotateX(" + d + "deg) ", t.style.webkitTransition = "all 0s", t.style.transition = "all 0s", t.style.webkitTransform = i, t.style.transform = i
                    } else {
                        var l = n * s - s / 2,
                            g = a * s - s / 2;
                        r && (l *= -1, g *= -1), i = "translate3D(" + l + "px, " + g + "px, 0) ", t.style.webkitTransition = "all 0s", t.style.transition = "all 0s", t.style.webkitTransform = i, t.style.transform = i
                    }
                })
            }), t.addEventListener("mouseout", function(t) {
                for (var e = t.target.parentNode; !e.classList.contains("has_gambit_hover_row");) {
                    if ("HTML" === e.tagName) return;
                    e = e.parentNode
                }
                if (!t.relatedTarget || !e.contains(t.relatedTarget)) {
                    var i = e.querySelectorAll(".gambit_hover_inner");
                    Array.prototype.forEach.call(i, function(t, e) {
                        parseFloat(t.getAttribute("data-amount"));
                        t.style.webkitTransition = "all 3s ease-in-out", t.style.transition = "all 3s ease-in-out", "tilt" === t.getAttribute("data-type") ? (t.style.webkitTransform = "perspective(2000px) rotateY(0) rotateX(0)", t.style.transform = "perspective(2000px) rotateY(0) rotateX(0)") : (t.style.webkitTransform = "translate3D(0, 0, 0)", t.style.transform = "translate3D(0, 0, 0)")
                    })
                }
            })
        })
    }
}), document.addEventListener("DOMContentLoaded", function() {
    var t = document.querySelectorAll(".gambit_background_row");
    Array.prototype.forEach.call(t, function(t, e) {
        var i = document.gambitFindElementParentRow(t);
        i.style.position = "relative", i.style.overflow = "hidden", i.style.zIndex = "1";
        var a = document.createElement("div"),
            n = getComputedStyle(t);
        a.classList.add("gambit_background_row_inner"), a.style.backgroundImage = n.backgroundImage, a.style.backgroundColor = n.backgroundColor, a.style.backgroundRepeat = n.backgroundRepeat, a.style.backgroundSize = n.backgroundSize, a.style.backgroundPosition = n.backgroundPosition, a.style.zIndex = t.style.zIndex, i.insertBefore(a, i.firstChild)
    })
}), document.addEventListener("DOMContentLoaded", function() {
    var t = document.querySelectorAll(".gambit_colorcycle");
    Array.prototype.forEach.call(t, function(t, e) {
        var i = document.gambitFindElementParentRow(t);
        i.classList.add(t.getAttribute("data-animclass"))
    })
}), document.gambitFindElementParentRow = function(t) {
    for (var e = t.parentNode; !e.classList.contains("vc_row") && !e.classList.contains("wpb_row");) {
        if ("HTML" === e.tagName) {
            e = !1;
            break
        }
        e = e.parentNode
    }
    if (e !== !1) return e;
    e = t.parentNode;
    for (var i = !1; !i;) {
        if (Array.prototype.forEach.call(e.classList, function(t, e) {
                return i ? void 0 : t.match(/row/g) ? void(i = !0) : void 0
            }), i) return e;
        if ("HTML" === e.tagName) break;
        e = e.parentNode
    }
    return t.parentNode
}, jQuery(document).ready(function(t) {
    function e() {
        return navigator.userAgent.match(/(Mobi|Android)/)
    }
    var i = document.querySelectorAll(".gambit_background_row, .gambit_parallax_row, .gambit_hover_row, .gambit_video_row");
    Array.prototype.forEach.call(i, function(t, e) {
        t.style.zIndex = -1 * (e + 1), t.setAttribute("data-zindex", -1 * (e + 1))
    }), t(".gambit_parallax_row").each(function() {
        t(this).gambitImageParallax({
            image: t(this).attr("data-bg-image"),
            direction: t(this).attr("data-direction"),
            mobileenabled: t(this).attr("data-mobile-enabled"),
            mobiledevice: e(),
            opacity: t(this).attr("data-opacity"),
            width: t(this).attr("data-bg-width"),
            height: t(this).attr("data-bg-height"),
            velocity: t(this).attr("data-velocity"),
            align: t(this).attr("data-bg-align"),
            repeat: t(this).attr("data-bg-repeat"),
            zIndex: t(this).attr("data-zindex"),
            target: t(document.gambitFindElementParentRow(t(this)[0])),
            complete: function() {}
        })
    })
});