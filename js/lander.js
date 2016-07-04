function ouibounce(e, t) {
    function i(e, t) {
        return "undefined" == typeof e ? t : e
    }

    function n(e) {
        var t = 24 * e * 60 * 60 * 1e3,
            i = new Date;
        return i.setTime(i.getTime() + t), "; expires=" + i.toGMTString()
    }

    function a() {
        _.addEventListener("mouseleave", r), _.addEventListener("keydown", o)
    }

    function r(e) {
        e.clientY > d || s("viewedOuibounceModal", "true") && !u || (l(), h())
    }

    function o(e) {
        y || s("viewedOuibounceModal", "true") && !u || e.metaKey && 76 == e.keyCode && (y = !0, l(), h())
    }

    function s(e, t) {
        var i = document.cookie.split("; ").reduce(function(e, t) {
            var i = t.split("=");
            return e[i[0]] = i[1], e
        }, {});
        return i[e] === t
    }

    function l() {
        e && (e.style.display = "block"), c()
    }

    function c(e) {
        var e = e || {};
        "undefined" != typeof e.cookieExpire && (f = n(e.cookieExpire)), e.sitewide === !0 && (g = ";path=/"), "undefined" != typeof e.cookieDomain && (m = ";domain=" + e.cookieDomain), document.cookie = "viewedOuibounceModal=true" + f + m + g, _.removeEventListener("mouseleave", r), _.removeEventListener("keydown", o)
    }
    var t = t || {},
        u = t.aggressive || !1,
        d = i(t.sensitivity, 20),
        p = i(t.timer, 1e3),
        h = t.callback || function() {},
        f = n(t.cookieExpire) || "",
        m = t.cookieDomain ? ";domain=" + t.cookieDomain : "",
        g = t.sitewide === !0 ? ";path=/" : "",
        _ = document.getElementsByTagName("html")[0];
    setTimeout(a, p);
    var y = !1;
    return {
        fire: l,
        disable: c
    }
}

function evsfix() {
    var e = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed");
    e.each(function() {
        try {
            el = this, h = el.height, w = el.width, ("" === h || "100%" == h) && (h = 9), ("" === w || "100%" == w) && (w = 16), ratio = h / w, $(el).attr("data-aspectRatio", h / w).removeAttr("height").removeAttr("width");
            var e = $(el).parent().width();
            if (0 == e) {
                var e = $(el).parent().parent().parent().width();
                0 == e && (e = 600)
            }
            100 == e ? ($(el).width("100%").height("56.25%"), $(el).parent().parent().width("100%").height("56.25%")) : ($(el).width(e).height(e * ratio), $(el).parent().parent().width(e).height(e * ratio)), $(el).parent().parent().parent().css("display", "inline"), $(".evs-flash-prompt").hide(), $('[data-role="evp-video"] div').css("background-color", "transparent"), $(el).attr("data", $(el).attr("data").replace("http:", "https:"))
        } catch (t) {}
    })
}

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(e) {
    mejs.YouTubeApi.flashReady(e)
}

function checkifPreview_randomCookie(e) {
    for (var t = window.location.search.substring(1), i = t.split("&"), n = 0; n < i.length; n++) {
        var a = i[n].split("=");
        if (a[0] == e) return a[1]
    }
}

function elCheckVideoEndType() {
    if ("hide_show" == elVideo_type) {
        var e = "#" + elVideo_show.split(",").join(", #"),
            t = "#" + elVideo_hide.split(",").join(", #");
        $($.trim(t)).hide(), $($.trim(e)).fadeIn()
    }
    return "redirect" == elVideo_type && window.location.replace($(".elVideoUnlockerElement").attr("data-elunlocker-redirecturl")), "popup" == elVideo_type ? ($(".containerModal").show(), $(".modalBackdropWrapper").show(), setTimeout(function() {
        player.pauseVideo(), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: rgba(0, 0, 0, .4)")
    }, 1500), $windowHeight = $(window).height(), $posTop = $(".containerModal").offset().top, $popupHeight = $(".containerModal").height() + $posTop, $popupHeight > $windowHeight ? ($(".containerModal").css("position", "absolute"), $(window).scrollTop(0)) : $(".containerModal").css("position", "fixed"), $ID = "modalPopup", $type = $("#" + $ID).attr("data-animate"), $delay = $("#" + $ID).attr("data-delay"), "fade" == $type ? runAnimationFade($ID, $delay) : "scale" == $type ? runAnimationScale($ID, $delay) : "left" == $type ? runAnimationLeft($ID, $delay) : "right" == $type ? runAnimationRight($ID, $delay) : "top" == $type ? runAnimationTop($ID, $delay) : "bottom" == $type && runAnimationBottom($ID, $delay), !1) : void 0
}

function unlockVideoDate(e, t) {
    var i = moment().format("MM/DD/YYYY"),
        n = $(e).attr("data-date") + " " + $(e).attr("data-time") + ":00",
        a = moment(n);
    a.diff(i, "days") <= 0 ? ($(t).removeClass("elVideoCurrentlyLocked"), $(e).parent().hide()) : ($(e).parent().fadeIn(), $(t).addClass("elVideoCurrentlyLocked"));
    var r = moment(a).format("MMM Do @ h:mm a");
    $(e).text(r)
}

function checkifUnlockableDate(e) {
    var t = moment().format("MM/DD/YYYY"),
        i = $(e).attr("data-date") + " " + $(e).attr("data-time") + ":00",
        n = $(".elVideoUnlockerElement").attr("data-elunlockerTimezone"),
        a = moment(i).zone(n);
    return a.diff(t, "days") <= 0 ? !0 : !1
}

function checkifUnlockableEverGreenDate(e, t, i) {
    var n = moment().format("MM/DD/YYYY"),
        a = $.cookie(i),
        r = a.split("_")[2],
        o = moment(r).format("MM/DD/YYYY");
    return checkTime = moment(o), checkTime.diff(n, "days") <= 0 ? !0 : !1
}

function everGreenDates(e, t) {
    var i = $(".elunlockerdate" + e).attr("data-elunlocker-evergreen-interval"),
        n = moment().add(parseInt(i), "day").format("MM/DD/YYYY");
    if ($.cookie("elVideoUnlocker_evergreendate_" + t) != cookie_variable + "_" + n) {
        $.cookie("elVideoUnlocker_evergreendate_" + t, cookie_variable + "_" + n), prettyDate = moment().add(parseInt(i), "day").format("MMM Do h:mm a");
        var a = moment().format("MM/DD/YYYY");
        checkTime = moment(n), checkTime.diff(a, "days") <= 0 ? ($(".elVideoUnlock_" + t).removeClass("elVideoCurrentlyLocked"), $(".elunlockerdate" + e).parent().hide()) : ($(".elunlockerdate" + e).text(prettyDate), $(".elunlockerdate" + e).parent().fadeIn())
    } else {
        prettyDate = moment().add(parseInt(i), "day").format("MMM Do h:mm a");
        var a = moment().format("MM/DD/YYYY");
        checkTime = moment(n), checkTime.diff(a, "days") <= 0 ? $(".elVideoUnlock_" + t).removeClass("elVideoCurrentlyLocked") : ($(".elunlockerdate" + e).text(prettyDate), $(".elunlockerdate" + e).parent().fadeIn())
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("elmainVideoPlayer", {
        height: "390",
        width: "640",
        videoId: elVideo_one,
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    })
}

function elUnlocker_startVideo(e, t) {
    player.unMute(), "1" == e && (elVideo_playnow = elVideo_one), "2" == e && (elVideo_playnow = elVideo_two), "3" == e && (elVideo_playnow = elVideo_three), "4" == e && (elVideo_playnow = elVideo_four), checkVideoType = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-thevideotype"), "date" == checkVideoType ? 1 == checkifUnlockableDate(".elunlockerdate" + e, ".elVideoUnlock_" + t) && ($(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $(".elVideoUnlock_" + t).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + t).addClass("elCurrentlyPlayingVideoUnlocker"), player.loadVideoById({
        videoId: elVideo_playnow,
        suggestedQuality: "large"
    })) : "default" == checkVideoType ? ($(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $(".elVideoUnlock_" + t).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + t).addClass("elCurrentlyPlayingVideoUnlocker"), player.loadVideoById({
        videoId: elVideo_playnow,
        suggestedQuality: "large"
    })) : "evergreen" == checkVideoType && 1 == checkifUnlockableEverGreenDate(".elunlockerdate" + e, ".elVideoUnlock_" + t, "elVideoUnlocker_evergreendate_" + t) && ($(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $(".elVideoUnlock_" + t).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + t).addClass("elCurrentlyPlayingVideoUnlocker"), player.loadVideoById({
        videoId: elVideo_playnow,
        suggestedQuality: "large"
    }))
}

function onPlayerReady() {
    $.cookie("elVideoCheckUnlocked_one" + window.location.href) != cookie_variable || "1" == elVideo_numberofvideos ? (player.unMute(), player.loadVideoById({
        videoId: elVideo_one,
        suggestedQuality: "large"
    }), $(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $(".elVideoUnlock_one").addClass("elCurrentlyPlayingVideoUnlocker")) : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) != cookie_variable || "2" == elVideo_numberofvideos ? elUnlocker_startVideo("2", "two") : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) != cookie_variable || "3" == elVideo_numberofvideos ? elUnlocker_startVideo("3", "three") : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) == cookie_variable || "4" == elVideo_numberofvideos ? elUnlocker_startVideo("4", "four") : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) == cookie_variable ? (checkVideoType = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-thevideotype"), "date" == checkVideoType ? 1 == checkifUnlockableDate(".elunlockerdate4", ".elVideoUnlock_four") && ($(".elVideoUnlock_four").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_four" + window.location.href, cookie_variable), $.cookie("elVideoTimeUnlocked_four" + window.location.href, ""), "4" == elVideo_numberofvideos && (elCheckVideoEndType(), clearInterval(runTheTimes))) : "default" == checkVideoType ? ($(".elVideoUnlock_four").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_four" + window.location.href, cookie_variable), $.cookie("elVideoTimeUnlocked_four" + window.location.href, ""), "4" == elVideo_numberofvideos && (elCheckVideoEndType(), clearInterval(runTheTimes))) : "evergreen" == checkVideoType && 1 == checkifUnlockableEverGreenDate(".elunlockerdate4", ".elVideoUnlock_four", "elVideoUnlocker_evergreendate_four") && ($(".elVideoUnlock_four").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_four" + window.location.href, cookie_variable), $.cookie("elVideoTimeUnlocked_four" + window.location.href, ""), "4" == elVideo_numberofvideos && (elCheckVideoEndType(), clearInterval(runTheTimes)))) : player.loadVideoById({
        videoId: elVideo_one,
        suggestedQuality: "large"
    }), "0" == $(".elVideoUnlockerElement").attr("data-elunlocker-autoplay") && (player.mute(), setTimeout(function() {
        player.pauseVideo(), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: rgba(0, 0, 0, .4)")
    }, 700))
}

function elvideounlockerProgress(e, t) {
    e = Math.round(e);
    e * t.width() / 100;
    t.find("div").velocity({
        width: e + "%"
    })
}

function elUnlocker_changeVideo(e, t) {
    player.unMute(), "1" == e && (elVideo_playnow = elVideo_two, elVideo_playnext = "two", elVideo_nextnumber = "2"), "2" == e && (elVideo_playnow = elVideo_three, elVideo_playnext = "three", elVideo_nextnumber = "3"), "3" == e && (elVideo_playnow = elVideo_four, elVideo_playnext = "four", elVideo_nextnumber = "4"), "4" == e && (elVideo_playnow = elVideo_four, elVideo_playnext = "four", elVideo_nextnumber = "4"), $.cookie("elVideoCheckUnlocked_" + t, cookie_variable), $.cookie("elVideoTimeUnlocked_" + t, ""), $(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $("#elVideoProgressBarUnlocker div").velocity({
        width: "100%"
    }), "undefined" != typeof runTheTimes && clearInterval(runTheTimes), "undefined" != typeof elvideounlocker_progresssbar && clearTimeout(elvideounlocker_progresssbar), checkVideoType = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-thevideotype"), "date" == checkVideoType ? 1 == checkifUnlockableDate(".elunlockerdate" + elVideo_nextnumber, ".elVideoUnlock_" + elVideo_playnext) && ($(".elVideoUnlock_" + elVideo_playnext).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + elVideo_playnext).addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_numberofvideos == e ? elCheckVideoEndType(t) : player.loadVideoById(elVideo_playnow)) : "default" == checkVideoType ? ($(".elVideoUnlock_" + elVideo_playnext).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + elVideo_playnext).addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_numberofvideos == e ? elCheckVideoEndType(t) : player.loadVideoById(elVideo_playnow)) : "evergreen" == checkVideoType && 1 == checkifUnlockableEverGreenDate(".elunlockerdate" + elVideo_nextnumber, ".elVideoUnlock_" + elVideo_playnext, "elVideoUnlocker_evergreendate_" + elVideo_playnext) && ($(".elVideoUnlock_" + elVideo_playnext).removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_" + elVideo_playnext).addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_numberofvideos == e ? elCheckVideoEndType(t) : player.loadVideoById(elVideo_playnow))
}

function onPlayerStateChange(e) {
    function t() {
        0 == $(".elVideoUnlock_one").hasClass("elVideoCurrentlyLocked") && $(".elVideoUnlock_one .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), 0 == $(".elVideoUnlock_two").hasClass("elVideoCurrentlyLocked") && $(".elVideoUnlock_two .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), 0 == $(".elVideoUnlock_three").hasClass("elVideoCurrentlyLocked") && $(".elVideoUnlock_three .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), 0 == $(".elVideoUnlock_four").hasClass("elVideoCurrentlyLocked") && $(".elVideoUnlock_four .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), player.getVideoData().video_id == elVideo_one ? ($(".elVideoUnlock_one .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> ' + playingVideoText), $(".elVideoUnlock_one").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_two ? ($(".elVideoUnlock_two .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i>  ' + playingVideoText), $(".elVideoUnlock_two").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_three ? ($(".elVideoUnlock_three .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i>  ' + playingVideoText), $(".elVideoUnlock_three").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_four && ($(".elVideoUnlock_four .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i>  ' + playingVideoText), $(".elVideoUnlock_four").attr("title", playVideoText))
    }
    if (0 === e.data && ($("#elVideoProgressBarUnlocker div").velocity({
            width: "100%"
        }), 0 == $(".elVideoUnlock_one").hasClass("elVideoCurrentlyLocked") && ($(".elVideoUnlock_one .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), $(".elVideoUnlock_one").attr("title", playVideoText)), 0 == $(".elVideoUnlock_twp").hasClass("elVideoCurrentlyLocked") && ($(".elVideoUnlock_two .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), $(".elVideoUnlock_two").attr("title", playVideoText)), 0 == $(".elVideoUnlock_three").hasClass("elVideoCurrentlyLocked") && ($(".elVideoUnlock_three .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), $(".elVideoUnlock_three").attr("title", playVideoText)), 0 == $(".elVideoUnlock_four").hasClass("elVideoCurrentlyLocked") && ($(".elVideoUnlock_four .btn-videounlockbutton").html('<i class="fa fa-play-circle"></i> <span class="elvideounlocker_playtext">' + playVideoText + "</span>"), $(".elVideoUnlock_four").attr("title", playVideoText)), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: rgba(0, 0, 0, .4)"), $.cookie("elVideoCheckUnlocked_one" + window.location.href) != cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) != cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) != cookie_variable && player.getVideoData().video_id == elVideo_one && elUnlocker_changeVideo("1", "one"), player.getVideoData().video_id == elVideo_two && elUnlocker_changeVideo("2", "two"), player.getVideoData().video_id == elVideo_three && elUnlocker_changeVideo("3", "three"), player.getVideoData().video_id == elVideo_three && elUnlocker_changeVideo("4", "four")), 1 === e.data) {
        $("#elmainVideoPlayIcon").removeClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background:none"), $.cookie("elVideoCheckUnlocked_one" + window.location.href) != cookie_variable ? runTheTimes = setInterval(function() {
            $.cookie("elVideoTimeUnlocked_one" + window.location.href, player.getCurrentTime())
        }, 1e3) : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) != cookie_variable ? runTheTimes = setInterval(function() {
            $.cookie("elVideoTimeUnlocked_two" + window.location.href, player.getCurrentTime())
        }, 1e3) : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) != cookie_variable ? runTheTimes = setInterval(function() {
            $.cookie("elVideoTimeUnlocked_three" + window.location.href, player.getCurrentTime())
        }, 1e3) : $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) == cookie_variable && (runTheTimes = setInterval(function() {
            $.cookie("elVideoTimeUnlocked_four" + window.location.href, player.getCurrentTime())
        }, 1e3)), t();
        var i = player.getDuration();
        elvideounlocker_progresssbar = setInterval(function() {
            var e = player.getCurrentTime(),
                t = e / i * 100;
            elvideounlockerProgress(t, $("#elVideoProgressBarUnlocker"))
        }, 1e3)
    } else "undefined" != typeof elvideounlocker_progresssbar && clearTimeout(elvideounlocker_progresssbar);
    2 === e.data && (player.getVideoData().video_id == elVideo_one ? ($(".elVideoUnlock_one .btn-videounlockbutton").html('<i class="fa fa-pause"></i> ' + pauseVideoText), $(".elVideoUnlock_one").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_two ? ($(".elVideoUnlock_two .btn-videounlockbutton").html('<i class="fa fa-pause"></i> ' + pauseVideoText), $(".elVideoUnlock_two").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_three ? ($(".elVideoUnlock_three .btn-videounlockbutton").html('<i class="fa fa-pause"></i> ' + pauseVideoText), $(".elVideoUnlock_three").attr("title", playVideoText)) : player.getVideoData().video_id == elVideo_four && ($(".elVideoUnlock_four .btn-videounlockbutton").html('<i class="fa fa-pause"></i> ' + pauseVideoText), $(".elVideoUnlock_four").attr("title", playVideoText)))
}

function runAnimationFade(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).delay(t).velocity({
        opacity: 1
    }, 200)
}

function runAnimationScale(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).delay(t).velocity({
        opacity: 1,
        scaleX: 1.1,
        scaleY: 1.1
    }, 200, function() {
        $("#" + e).velocity({
            scaleX: 1,
            scaleY: 1
        }, 200)
    })
}

function runAnimationLeft(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).css("left", "-800px").delay(t).velocity({
        opacity: 1,
        left: 30
    }, 200, function() {
        $(this).velocity({
            left: 0
        }, 200)
    })
}

function runAnimationRight(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).css("right", "-800px").delay(t).velocity({
        opacity: 1,
        right: 30
    }, 200, function() {
        $(this).velocity({
            right: 0
        }, 200)
    })
}

function runAnimationTop(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).css("top", "-800px").delay(t).velocity({
        opacity: 1
    }, 200, function() {
        $(this).velocity({
            top: 0
        }, 200)
    })
}

function runAnimationBottom(e, t) {
    $("#" + e).css("opacity", 0), $("#" + e).css("bottom", "-800px").delay(t).velocity({
        opacity: 1
    }, 200, function() {
        $(this).velocity({
            bottom: 0
        }, 200)
    })
}

function getURLParameter(e) {
    return decodeURIComponent((RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, null])[1])
}

function webinarDelay() {
    date = $('.selectAW-date[data-cf-name="webinar-date"]').val(), time = $('.selectAW-date[data-cf-name="webinar-time"]').val(), webinar_datetime = moment(date + " " + time, "YYYY-MM-DD HH:mm"), webinar_datetime_offset = moment.unix(webinar_datetime), now = moment(), now_offset = moment.unix(now), webinar_delay = webinar_datetime.diff(now), webinar_delay_offset = moment.unix(webinar_delay), webinar_delay_offset = moment.unix(webinar_delay), $("#webinar_delay").attr("value", webinar_delay)
}

function cookieWebinarTime(e) {
    $pID = $("#page-id").val(), $.cookie("webinar_last_time-" + $pID, e)
}

function getWebinarLastTime() {
    return $pID = $("#page-id").val(), hardtime = $(".webinar-last-time").text(), cookietime = $.cookie("webinar_last_time-" + $pID), isNaN(parseInt(cookietime)) && (cookietime = 0), parseInt(hardtime) < parseInt(cookietime) || isNaN(parseInt(hardtime)) ? (reportWebinarTime(cookietime), parseInt(cookietime)) : (cookieWebinarTime(hardtime), parseInt(hardtime))
}

function reportWebinarTime(e) {
    webinar_ext = $(".webinar-ext").text(), $.ajax({
        type: "POST",
        url: "/contacts/update_last_time",
        data: {
            webinar_ext: webinar_ext,
            t: e
        }
    }), cookieWebinarTime(e)
}

function periodicAutoWebinarCheck() {
    var e, t = new Date;
    setInterval(function() {
        "undefined" == typeof e && (e = parseInt(getWebinarLastTime())), currentSeconds = (new Date - t) / 1e3 + e, parseInt($("webinar-ot").text()) < currentSeconds ? reportWebinarTime(currentSeconds) : cookieWebinarTime(currentSeconds)
    }, 1e3)
}! function(e, t) {
    function i(e) {
        var t = ft[e] = {};
        return Z.each(e.split(tt), function(e, i) {
            t[i] = !0
        }), t
    }

    function n(e, i, n) {
        if (n === t && 1 === e.nodeType) {
            var a = "data-" + i.replace(gt, "-$1").toLowerCase();
            if (n = e.getAttribute(a), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : mt.test(n) ? Z.parseJSON(n) : n
                } catch (r) {}
                Z.data(e, i, n)
            } else n = t
        }
        return n
    }

    function a(e) {
        var t;
        for (t in e)
            if (("data" !== t || !Z.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function r() {
        return !1
    }

    function o() {
        return !0
    }

    function s(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }

    function l(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function c(e, t, i) {
        if (t = t || 0, Z.isFunction(t)) return Z.grep(e, function(e, n) {
            var a = !!t.call(e, n, e);
            return a === i
        });
        if (t.nodeType) return Z.grep(e, function(e) {
            return e === t === i
        });
        if ("string" == typeof t) {
            var n = Z.grep(e, function(e) {
                return 1 === e.nodeType
            });
            if (It.test(t)) return Z.filter(t, n, !i);
            t = Z.filter(t, n)
        }
        return Z.grep(e, function(e) {
            return Z.inArray(e, t) >= 0 === i
        })
    }

    function u(e) {
        var t = jt.split("|"),
            i = e.createDocumentFragment();
        if (i.createElement)
            for (; t.length;) i.createElement(t.pop());
        return i
    }

    function d(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function p(e, t) {
        if (1 === t.nodeType && Z.hasData(e)) {
            var i, n, a, r = Z._data(e),
                o = Z._data(t, r),
                s = r.events;
            if (s) {
                delete o.handle, o.events = {};
                for (i in s)
                    for (n = 0, a = s[i].length; a > n; n++) Z.event.add(t, i, s[i][n])
            }
            o.data && (o.data = Z.extend({}, o.data))
        }
    }

    function h(e, t) {
        var i;
        1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), i = t.nodeName.toLowerCase(), "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), Z.support.html5Clone && e.innerHTML && !Z.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && Kt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.selected = e.defaultSelected : "input" === i || "textarea" === i ? t.defaultValue = e.defaultValue : "script" === i && t.text !== e.text && (t.text = e.text), t.removeAttribute(Z.expando))
    }

    function f(e) {
        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
    }

    function m(e) {
        Kt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function g(e, t) {
        if (t in e) return t;
        for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, a = _i.length; a--;)
            if (t = _i[a] + i, t in e) return t;
        return n
    }

    function _(e, t) {
        return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
    }

    function y(e, t) {
        for (var i, n, a = [], r = 0, o = e.length; o > r; r++) i = e[r], i.style && (a[r] = Z._data(i, "olddisplay"), t ? (!a[r] && "none" === i.style.display && (i.style.display = ""), "" === i.style.display && _(i) && (a[r] = Z._data(i, "olddisplay", S(i.nodeName)))) : (n = ii(i, "display"), !a[r] && "none" !== n && Z._data(i, "olddisplay", n)));
        for (r = 0; o > r; r++) i = e[r], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[r] || "" : "none"));
        return e
    }

    function v(e, t, i) {
        var n = ui.exec(t);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
    }

    function T(e, t, i, n) {
        for (var a = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, r = 0; 4 > a; a += 2) "margin" === i && (r += Z.css(e, i + gi[a], !0)), n ? ("content" === i && (r -= parseFloat(ii(e, "padding" + gi[a])) || 0), "margin" !== i && (r -= parseFloat(ii(e, "border" + gi[a] + "Width")) || 0)) : (r += parseFloat(ii(e, "padding" + gi[a])) || 0, "padding" !== i && (r += parseFloat(ii(e, "border" + gi[a] + "Width")) || 0));
        return r
    }

    function b(e, t, i) {
        var n = "width" === t ? e.offsetWidth : e.offsetHeight,
            a = !0,
            r = Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing");
        if (0 >= n || null == n) {
            if (n = ii(e, t), (0 > n || null == n) && (n = e.style[t]), di.test(n)) return n;
            a = r && (Z.support.boxSizingReliable || n === e.style[t]), n = parseFloat(n) || 0
        }
        return n + T(e, t, i || (r ? "border" : "content"), a) + "px"
    }

    function S(e) {
        if (hi[e]) return hi[e];
        var t = Z("<" + e + ">").appendTo(U.body),
            i = t.css("display");
        return t.remove(), ("none" === i || "" === i) && (ni = U.body.appendChild(ni || Z.extend(U.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), ai && ni.createElement || (ai = (ni.contentWindow || ni.contentDocument).document, ai.write("<!doctype html><html><body>"), ai.close()), t = ai.body.appendChild(ai.createElement(e)), i = ii(t, "display"), U.body.removeChild(ni)), hi[e] = i, i
    }

    function w(e, t, i, n) {
        var a;
        if (Z.isArray(t)) Z.each(t, function(t, a) {
            i || Ti.test(e) ? n(e, a) : w(e + "[" + ("object" == typeof a ? t : "") + "]", a, i, n)
        });
        else if (i || "object" !== Z.type(t)) n(e, t);
        else
            for (a in t) w(e + "[" + a + "]", t[a], i, n)
    }

    function $(e) {
        return function(t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, a, r, o = t.toLowerCase().split(tt),
                s = 0,
                l = o.length;
            if (Z.isFunction(i))
                for (; l > s; s++) n = o[s], r = /^\+/.test(n), r && (n = n.substr(1) || "*"), a = e[n] = e[n] || [], a[r ? "unshift" : "push"](i)
        }
    }

    function k(e, i, n, a, r, o) {
        r = r || i.dataTypes[0], o = o || {}, o[r] = !0;
        for (var s, l = e[r], c = 0, u = l ? l.length : 0, d = e === Ii; u > c && (d || !s); c++) s = l[c](i, n, a), "string" == typeof s && (!d || o[s] ? s = t : (i.dataTypes.unshift(s), s = k(e, i, n, a, s, o)));
        return (d || !s) && !o["*"] && (s = k(e, i, n, a, "*", o)), s
    }

    function C(e, i) {
        var n, a, r = Z.ajaxSettings.flatOptions || {};
        for (n in i) i[n] !== t && ((r[n] ? e : a || (a = {}))[n] = i[n]);
        a && Z.extend(!0, e, a)
    }

    function M(e, i, n) {
        var a, r, o, s, l = e.contents,
            c = e.dataTypes,
            u = e.responseFields;
        for (r in u) r in n && (i[u[r]] = n[r]);
        for (;
            "*" === c[0];) c.shift(), a === t && (a = e.mimeType || i.getResponseHeader("content-type"));
        if (a)
            for (r in l)
                if (l[r] && l[r].test(a)) {
                    c.unshift(r);
                    break
                }
        if (c[0] in n) o = c[0];
        else {
            for (r in n) {
                if (!c[0] || e.converters[r + " " + c[0]]) {
                    o = r;
                    break
                }
                s || (s = r)
            }
            o = o || s
        }
        return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0
    }

    function A(e, t) {
        var i, n, a, r, o = e.dataTypes.slice(),
            s = o[0],
            l = {},
            c = 0;
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), o[1])
            for (i in e.converters) l[i.toLowerCase()] = e.converters[i];
        for (; a = o[++c];)
            if ("*" !== a) {
                if ("*" !== s && s !== a) {
                    if (i = l[s + " " + a] || l["* " + a], !i)
                        for (n in l)
                            if (r = n.split(" "), r[1] === a && (i = l[s + " " + r[0]] || l["* " + r[0]])) {
                                i === !0 ? i = l[n] : l[n] !== !0 && (a = r[0], o.splice(c--, 0, a));
                                break
                            }
                    if (i !== !0)
                        if (i && e["throws"]) t = i(t);
                        else try {
                            t = i(t)
                        } catch (u) {
                            return {
                                state: "parsererror",
                                error: i ? u : "No conversion from " + s + " to " + a
                            }
                        }
                }
                s = a
            }
        return {
            state: "success",
            data: t
        }
    }

    function x() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function E() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function D() {
        return setTimeout(function() {
            Gi = t
        }, 0), Gi = Z.now()
    }

    function L(e, t) {
        Z.each(t, function(t, i) {
            for (var n = (Xi[t] || []).concat(Xi["*"]), a = 0, r = n.length; r > a; a++)
                if (n[a].call(e, t, i)) return
        })
    }

    function P(e, t, i) {
        var n, a = 0,
            r = Zi.length,
            o = Z.Deferred().always(function() {
                delete s.elem
            }),
            s = function() {
                for (var t = Gi || D(), i = Math.max(0, l.startTime + l.duration - t), n = 1 - (i / l.duration || 0), a = 0, r = l.tweens.length; r > a; a++) l.tweens[a].run(n);
                return o.notifyWith(e, [l, n, i]), 1 > n && r ? i : (o.resolveWith(e, [l]), !1)
            },
            l = o.promise({
                elem: e,
                props: Z.extend({}, t),
                opts: Z.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: Gi || D(),
                duration: i.duration,
                tweens: [],
                createTween: function(t, i) {
                    var n = Z.Tween(e, l.opts, t, i, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function(t) {
                    for (var i = 0, n = t ? l.tweens.length : 0; n > i; i++) l.tweens[i].run(1);
                    return t ? o.resolveWith(e, [l, t]) : o.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (F(c, l.opts.specialEasing); r > a; a++)
            if (n = Zi[a].call(l, e, c, l.opts)) return n;
        return L(l, c), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(s, {
            anim: l,
            queue: l.opts.queue,
            elem: e
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function F(e, t) {
        var i, n, a, r, o;
        for (i in e)
            if (n = Z.camelCase(i), a = t[n], r = e[i], Z.isArray(r) && (a = r[1], r = e[i] = r[0]), i !== n && (e[n] = r, delete e[i]), o = Z.cssHooks[n], o && "expand" in o) {
                r = o.expand(r), delete e[n];
                for (i in r) i in e || (e[i] = r[i], t[i] = a)
            } else t[n] = a
    }

    function V(e, t, i) {
        var n, a, r, o, s, l, c, u, d = this,
            p = e.style,
            h = {},
            f = [],
            m = e.nodeType && _(e);
        i.queue || (c = Z._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, u = c.empty.fire, c.empty.fire = function() {
            c.unqueued || u()
        }), c.unqueued++, d.always(function() {
            d.always(function() {
                c.unqueued--, Z.queue(e, "fx").length || c.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === Z.css(e, "display") && "none" === Z.css(e, "float") && (Z.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", Z.support.shrinkWrapBlocks || d.done(function() {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
        }));
        for (n in t)
            if (r = t[n], Ki.exec(r)) {
                if (delete t[n], r === (m ? "hide" : "show")) continue;
                f.push(n)
            }
        if (o = f.length)
            for (s = Z._data(e, "fxshow") || Z._data(e, "fxshow", {}), m ? Z(e).show() : d.done(function() {
                    Z(e).hide()
                }), d.done(function() {
                    var t;
                    Z.removeData(e, "fxshow", !0);
                    for (t in h) Z.style(e, t, h[t])
                }), n = 0; o > n; n++) a = f[n], l = d.createTween(a, m ? s[a] : 0), h[a] = s[a] || Z.style(e, a), a in s || (s[a] = l.start, m && (l.end = l.start, l.start = "width" === a || "height" === a ? 1 : 0))
    }

    function I(e, t, i, n, a) {
        return new I.prototype.init(e, t, i, n, a)
    }

    function R(e, t) {
        var i, n = {
                height: e
            },
            a = 0;
        for (t = t ? 1 : 0; 4 > a; a += 2 - t) i = gi[a], n["margin" + i] = n["padding" + i] = e;
        return t && (n.opacity = n.width = e), n
    }

    function N(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var j, O, U = e.document,
        B = e.location,
        H = e.navigator,
        z = e.jQuery,
        W = e.$,
        Y = Array.prototype.push,
        G = Array.prototype.slice,
        q = Array.prototype.indexOf,
        K = Object.prototype.toString,
        J = Object.prototype.hasOwnProperty,
        Q = String.prototype.trim,
        Z = function(e, t) {
            return new Z.fn.init(e, t, j)
        },
        X = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        et = /\S/,
        tt = /\s+/,
        it = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        nt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rt = /^[\],:{}\s]*$/,
        ot = /(?:^|:|,)(?:\s*\[)+/g,
        st = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        ct = /^-ms-/,
        ut = /-([\da-z])/gi,
        dt = function(e, t) {
            return (t + "").toUpperCase()
        },
        pt = function() {
            U.addEventListener ? (U.removeEventListener("DOMContentLoaded", pt, !1), Z.ready()) : "complete" === U.readyState && (U.detachEvent("onreadystatechange", pt), Z.ready())
        },
        ht = {};
    Z.fn = Z.prototype = {
        constructor: Z,
        init: function(e, i, n) {
            var a, r, o;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if ("string" == typeof e) {
                if (a = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : nt.exec(e), a && (a[1] || !i)) {
                    if (a[1]) return i = i instanceof Z ? i[0] : i, o = i && i.nodeType ? i.ownerDocument || i : U, e = Z.parseHTML(a[1], o, !0), at.test(a[1]) && Z.isPlainObject(i) && this.attr.call(e, i, !0), Z.merge(this, e);
                    if (r = U.getElementById(a[2]), r && r.parentNode) {
                        if (r.id !== a[2]) return n.find(e);
                        this.length = 1, this[0] = r
                    }
                    return this.context = U, this.selector = e, this
                }
                return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e)
            }
            return Z.isFunction(e) ? n.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.1",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return G.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, i) {
            var n = Z.merge(this.constructor(), e);
            return n.prevObject = this, n.context = this.context, "find" === t ? n.selector = this.selector + (this.selector ? " " : "") + i : t && (n.selector = this.selector + "." + t + "(" + i + ")"), n
        },
        each: function(e, t) {
            return Z.each(this, e, t)
        },
        ready: function(e) {
            return Z.ready.promise().done(e), this
        },
        eq: function(e) {
            return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(G.apply(this, arguments), "slice", G.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(Z.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Y,
        sort: [].sort,
        splice: [].splice
    }, Z.fn.init.prototype = Z.fn, Z.extend = Z.fn.extend = function() {
        var e, i, n, a, r, o, s = arguments[0] || {},
            l = 1,
            c = arguments.length,
            u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[1] || {}, l = 2), "object" != typeof s && !Z.isFunction(s) && (s = {}), c === l && (s = this, --l); c > l; l++)
            if (null != (e = arguments[l]))
                for (i in e) n = s[i], a = e[i], s !== a && (u && a && (Z.isPlainObject(a) || (r = Z.isArray(a))) ? (r ? (r = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, s[i] = Z.extend(u, o, a)) : a !== t && (s[i] = a));
        return s
    }, Z.extend({
        noConflict: function(t) {
            return e.$ === Z && (e.$ = W), t && e.jQuery === Z && (e.jQuery = z), Z
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Z.readyWait++ : Z.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--Z.readyWait : !Z.isReady) {
                if (!U.body) return setTimeout(Z.ready, 1);
                Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (O.resolveWith(U, [Z]), Z.fn.trigger && Z(U).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === Z.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === Z.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? String(e) : ht[K.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || "object" !== Z.type(e) || e.nodeType || Z.isWindow(e)) return !1;
            try {
                if (e.constructor && !J.call(e, "constructor") && !J.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (i) {
                return !1
            }
            var n;
            for (n in e);
            return n === t || J.call(e, n)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, i) {
            var n;
            return e && "string" == typeof e ? ("boolean" == typeof t && (i = t, t = 0), t = t || U, (n = at.exec(e)) ? [t.createElement(n[1])] : (n = Z.buildFragment([e], t, i ? null : []), Z.merge([], (n.cacheable ? Z.clone(n.fragment) : n.fragment).childNodes))) : null
        },
        parseJSON: function(t) {
            return t && "string" == typeof t ? (t = Z.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : rt.test(t.replace(st, "@").replace(lt, "]").replace(ot, "")) ? new Function("return " + t)() : void Z.error("Invalid JSON: " + t)) : null
        },
        parseXML: function(i) {
            var n, a;
            if (!i || "string" != typeof i) return null;
            try {
                e.DOMParser ? (a = new DOMParser, n = a.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
            } catch (r) {
                n = t
            }
            return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + i), n
        },
        noop: function() {},
        globalEval: function(t) {
            t && et.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(ct, "ms-").replace(ut, dt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
        },
        each: function(e, i, n) {
            var a, r = 0,
                o = e.length,
                s = o === t || Z.isFunction(e);
            if (n)
                if (s) {
                    for (a in e)
                        if (i.apply(e[a], n) === !1) break
                } else
                    for (; o > r && i.apply(e[r++], n) !== !1;);
            else if (s) {
                for (a in e)
                    if (i.call(e[a], a, e[a]) === !1) break
            } else
                for (; o > r && i.call(e[r], r, e[r++]) !== !1;);
            return e
        },
        trim: Q && !Q.call("\xef\xbb\xbf\xc2 ") ? function(e) {
            return null == e ? "" : Q.call(e)
        } : function(e) {
            return null == e ? "" : e.toString().replace(it, "")
        },
        makeArray: function(e, t) {
            var i, n = t || [];
            return null != e && (i = Z.type(e), null == e.length || "string" === i || "function" === i || "regexp" === i || Z.isWindow(e) ? Y.call(n, e) : Z.merge(n, e)), n
        },
        inArray: function(e, t, i) {
            var n;
            if (t) {
                if (q) return q.call(t, e, i);
                for (n = t.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                    if (i in t && t[i] === e) return i
            }
            return -1
        },
        merge: function(e, i) {
            var n = i.length,
                a = e.length,
                r = 0;
            if ("number" == typeof n)
                for (; n > r; r++) e[a++] = i[r];
            else
                for (; i[r] !== t;) e[a++] = i[r++];
            return e.length = a, e
        },
        grep: function(e, t, i) {
            var n, a = [],
                r = 0,
                o = e.length;
            for (i = !!i; o > r; r++) n = !!t(e[r], r), i !== n && a.push(e[r]);
            return a
        },
        map: function(e, i, n) {
            var a, r, o = [],
                s = 0,
                l = e.length,
                c = e instanceof Z || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Z.isArray(e));
            if (c)
                for (; l > s; s++) a = i(e[s], s, n), null != a && (o[o.length] = a);
            else
                for (r in e) a = i(e[r], r, n), null != a && (o[o.length] = a);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, i) {
            var n, a, r;
            return "string" == typeof i && (n = e[i], i = e, e = n), Z.isFunction(e) ? (a = G.call(arguments, 2), r = function() {
                return e.apply(i, a.concat(G.call(arguments)))
            }, r.guid = e.guid = e.guid || r.guid || Z.guid++, r) : t
        },
        access: function(e, i, n, a, r, o, s) {
            var l, c = null == n,
                u = 0,
                d = e.length;
            if (n && "object" == typeof n) {
                for (u in n) Z.access(e, i, u, n[u], 1, o, a);
                r = 1
            } else if (a !== t) {
                if (l = s === t && Z.isFunction(a), c && (l ? (l = i, i = function(e, t, i) {
                        return l.call(Z(e), i)
                    }) : (i.call(e, a), i = null)), i)
                    for (; d > u; u++) i(e[u], n, l ? a.call(e[u], u, i(e[u], n)) : a, s);
                r = 1
            }
            return r ? e : c ? i.call(e) : d ? i(e[0], n) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }), Z.ready.promise = function(t) {
        if (!O)
            if (O = Z.Deferred(), "complete" === U.readyState) setTimeout(Z.ready, 1);
            else if (U.addEventListener) U.addEventListener("DOMContentLoaded", pt, !1), e.addEventListener("load", Z.ready, !1);
        else {
            U.attachEvent("onreadystatechange", pt), e.attachEvent("onload", Z.ready);
            var i = !1;
            try {
                i = null == e.frameElement && U.documentElement
            } catch (n) {}
            i && i.doScroll && function a() {
                if (!Z.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (e) {
                        return setTimeout(a, 50)
                    }
                    Z.ready()
                }
            }()
        }
        return O.promise(t)
    }, Z.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        ht["[object " + t + "]"] = t.toLowerCase()
    }), j = Z(U);
    var ft = {};
    Z.Callbacks = function(e) {
        e = "string" == typeof e ? ft[e] || i(e) : Z.extend({}, e);
        var n, a, r, o, s, l, c = [],
            u = !e.once && [],
            d = function(t) {
                for (n = e.memory && t, a = !0, l = o || 0, o = 0, s = c.length, r = !0; c && s > l; l++)
                    if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                r = !1, c && (u ? u.length && d(u.shift()) : n ? c = [] : p.disable())
            },
            p = {
                add: function() {
                    if (c) {
                        var t = c.length;
                        ! function i(t) {
                            Z.each(t, function(t, n) {
                                var a = Z.type(n);
                                "function" !== a || e.unique && p.has(n) ? n && n.length && "string" !== a && i(n) : c.push(n)
                            })
                        }(arguments), r ? s = c.length : n && (o = t, d(n))
                    }
                    return this
                },
                remove: function() {
                    return c && Z.each(arguments, function(e, t) {
                        for (var i;
                            (i = Z.inArray(t, c, i)) > -1;) c.splice(i, 1), r && (s >= i && s--, l >= i && l--)
                    }), this
                },
                has: function(e) {
                    return Z.inArray(e, c) > -1
                },
                empty: function() {
                    return c = [], this
                },
                disable: function() {
                    return c = u = n = t, this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return u = t, n || p.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], c && (!a || u) && (r ? u.push(t) : d(t)), this
                },
                fire: function() {
                    return p.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!a
                }
            };
        return p
    }, Z.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", Z.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return a.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return Z.Deferred(function(i) {
                            Z.each(t, function(t, n) {
                                var r = n[0],
                                    o = e[t];
                                a[n[1]](Z.isFunction(o) ? function() {
                                    var e = o.apply(this, arguments);
                                    e && Z.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[r + "With"](this === a ? i : this, [e])
                                } : i[r])
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return "object" == typeof e ? Z.extend(e, n) : n
                    }
                },
                a = {};
            return n.pipe = n.then, Z.each(t, function(e, r) {
                var o = r[2],
                    s = r[3];
                n[r[1]] = o.add, s && o.add(function() {
                    i = s
                }, t[1 ^ e][2].disable, t[2][2].lock), a[r[0]] = o.fire, a[r[0] + "With"] = o.fireWith
            }), n.promise(a), e && e.call(a, a), a
        },
        when: function(e) {
            var t, i, n, a = 0,
                r = G.call(arguments),
                o = r.length,
                s = 1 !== o || e && Z.isFunction(e.promise) ? o : 0,
                l = 1 === s ? e : Z.Deferred(),
                c = function(e, i, n) {
                    return function(a) {
                        i[e] = this, n[e] = arguments.length > 1 ? G.call(arguments) : a, n === t ? l.notifyWith(i, n) : --s || l.resolveWith(i, n)
                    }
                };
            if (o > 1)
                for (t = new Array(o), i = new Array(o), n = new Array(o); o > a; a++) r[a] && Z.isFunction(r[a].promise) ? r[a].promise().done(c(a, n, r)).fail(l.reject).progress(c(a, i, t)) : --s;
            return s || l.resolveWith(n, r), l.promise()
        }
    }), Z.support = function() {
        var t, i, n, a, r, o, s, l, c, u, d, p = U.createElement("div");
        if (p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = p.getElementsByTagName("*"), n = p.getElementsByTagName("a")[0], n.style.cssText = "top:1px;float:left;opacity:.5", !i || !i.length || !n) return {};
        a = U.createElement("select"), r = a.appendChild(U.createElement("option")), o = p.getElementsByTagName("input")[0], t = {
            leadingWhitespace: 3 === p.firstChild.nodeType,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(n.getAttribute("style")),
            hrefNormalized: "/a" === n.getAttribute("href"),
            opacity: /^0.5/.test(n.style.opacity),
            cssFloat: !!n.style.cssFloat,
            checkOn: "on" === o.value,
            optSelected: r.selected,
            getSetAttribute: "t" !== p.className,
            enctype: !!U.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== U.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === U.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, a.disabled = !0, t.optDisabled = !r.disabled;
        try {
            delete p.test
        } catch (h) {
            t.deleteExpando = !1
        }
        if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", d = function() {
                t.noCloneEvent = !1
            }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", d)), o = U.createElement("input"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "checked"), o.setAttribute("name", "t"), p.appendChild(o), s = U.createDocumentFragment(), s.appendChild(p.lastChild), t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = o.checked, s.removeChild(o), s.appendChild(p), p.attachEvent)
            for (c in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) l = "on" + c, u = l in p, u || (p.setAttribute(l, "return;"), u = "function" == typeof p[l]), t[c + "Bubbles"] = u;
        return Z(function() {
            var i, n, a, r, o = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                s = U.getElementsByTagName("body")[0];
            s && (i = U.createElement("div"), i.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", s.insertBefore(i, s.firstChild), n = U.createElement("div"), i.appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = n.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = u && 0 === a[0].offsetHeight, n.innerHTML = "", n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === n.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(n, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(n, null) || {
                width: "4px"
            }).width, r = U.createElement("div"), r.style.cssText = n.style.cssText = o, r.style.marginRight = r.style.width = "0", n.style.width = "1px", n.appendChild(r), t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), "undefined" != typeof n.style.zoom && (n.innerHTML = "", n.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === n.offsetWidth, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== n.offsetWidth, i.style.zoom = 1), s.removeChild(i), i = n = a = r = null)
        }), s.removeChild(p), i = n = a = r = o = s = p = null, t
    }();
    var mt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        gt = /([A-Z])/g;
    Z.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (Z.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? Z.cache[e[Z.expando]] : e[Z.expando], !!e && !a(e)
        },
        data: function(e, i, n, a) {
            if (Z.acceptData(e)) {
                var r, o, s = Z.expando,
                    l = "string" == typeof i,
                    c = e.nodeType,
                    u = c ? Z.cache : e,
                    d = c ? e[s] : e[s] && s;
                if (d && u[d] && (a || u[d].data) || !l || n !== t) return d || (c ? e[s] = d = Z.deletedIds.pop() || ++Z.uuid : d = s), u[d] || (u[d] = {}, c || (u[d].toJSON = Z.noop)), ("object" == typeof i || "function" == typeof i) && (a ? u[d] = Z.extend(u[d], i) : u[d].data = Z.extend(u[d].data, i)), r = u[d], a || (r.data || (r.data = {}), r = r.data), n !== t && (r[Z.camelCase(i)] = n), l ? (o = r[i], null == o && (o = r[Z.camelCase(i)])) : o = r, o
            }
        },
        removeData: function(e, t, i) {
            if (Z.acceptData(e)) {
                var n, r, o, s = e.nodeType,
                    l = s ? Z.cache : e,
                    c = s ? e[Z.expando] : Z.expando;
                if (l[c]) {
                    if (t && (n = i ? l[c] : l[c].data)) {
                        Z.isArray(t) || (t in n ? t = [t] : (t = Z.camelCase(t), t = t in n ? [t] : t.split(" ")));
                        for (r = 0, o = t.length; o > r; r++) delete n[t[r]];
                        if (!(i ? a : Z.isEmptyObject)(n)) return
                    }(i || (delete l[c].data, a(l[c]))) && (s ? Z.cleanData([e], !0) : Z.support.deleteExpando || l != l.window ? delete l[c] : l[c] = null)
                }
            }
        },
        _data: function(e, t, i) {
            return Z.data(e, t, i, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && Z.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), Z.fn.extend({
        data: function(e, i) {
            var a, r, o, s, l, c = this[0],
                u = 0,
                d = null;
            if (e === t) {
                if (this.length && (d = Z.data(c), 1 === c.nodeType && !Z._data(c, "parsedAttrs"))) {
                    for (o = c.attributes, l = o.length; l > u; u++) s = o[u].name, 0 === s.indexOf("data-") && (s = Z.camelCase(s.substring(5)), n(c, s, d[s]));
                    Z._data(c, "parsedAttrs", !0)
                }
                return d
            }
            return "object" == typeof e ? this.each(function() {
                Z.data(this, e)
            }) : (a = e.split(".", 2), a[1] = a[1] ? "." + a[1] : "", r = a[1] + "!", Z.access(this, function(i) {
                return i === t ? (d = this.triggerHandler("getData" + r, [a[0]]), d === t && c && (d = Z.data(c, e), d = n(c, e, d)), d === t && a[1] ? this.data(a[0]) : d) : (a[1] = i, void this.each(function() {
                    var t = Z(this);
                    t.triggerHandler("setData" + r, a), Z.data(this, e, i), t.triggerHandler("changeData" + r, a)
                }))
            }, null, i, arguments.length > 1, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                Z.removeData(this, e)
            })
        }
    }), Z.extend({
        queue: function(e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = Z._data(e, t), i && (!n || Z.isArray(i) ? n = Z._data(e, t, Z.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = Z.queue(e, t),
                n = i.length,
                a = i.shift(),
                r = Z._queueHooks(e, t),
                o = function() {
                    Z.dequeue(e, t)
                };
            "inprogress" === a && (a = i.shift(), n--), a && ("fx" === t && i.unshift("inprogress"), delete r.stop, a.call(e, o, r)), !n && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return Z._data(e, i) || Z._data(e, i, {
                empty: Z.Callbacks("once memory").add(function() {
                    Z.removeData(e, t + "queue", !0), Z.removeData(e, i, !0)
                })
            })
        }
    }), Z.fn.extend({
        queue: function(e, i) {
            var n = 2;
            return "string" != typeof e && (i = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : i === t ? this : this.each(function() {
                var t = Z.queue(this, e, i);
                Z._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && Z.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                Z.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
                var n = setTimeout(t, e);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, i) {
            var n, a = 1,
                r = Z.Deferred(),
                o = this,
                s = this.length,
                l = function() {
                    --a || r.resolveWith(o, [o])
                };
            for ("string" != typeof e && (i = e, e = t), e = e || "fx"; s--;) n = Z._data(o[s], e + "queueHooks"), n && n.empty && (a++, n.empty.add(l));
            return l(), r.promise(i)
        }
    });
    var _t, yt, vt, Tt = /[\t\r\n]/g,
        bt = /\r/g,
        St = /^(?:button|input)$/i,
        wt = /^(?:button|input|object|select|textarea)$/i,
        $t = /^a(?:rea|)$/i,
        kt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Ct = Z.support.getSetAttribute;
    Z.fn.extend({
        attr: function(e, t) {
            return Z.access(this, Z.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                Z.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return Z.access(this, Z.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = Z.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (i) {}
            })
        },
        addClass: function(e) {
            var t, i, n, a, r, o, s;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).addClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e)
                for (t = e.split(tt), i = 0, n = this.length; n > i; i++)
                    if (a = this[i], 1 === a.nodeType)
                        if (a.className || 1 !== t.length) {
                            for (r = " " + a.className + " ", o = 0, s = t.length; s > o; o++) ~r.indexOf(" " + t[o] + " ") || (r += t[o] + " ");
                            a.className = Z.trim(r)
                        } else a.className = e;
            return this
        },
        removeClass: function(e) {
            var i, n, a, r, o, s, l;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).removeClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e || e === t)
                for (i = (e || "").split(tt), s = 0, l = this.length; l > s; s++)
                    if (a = this[s], 1 === a.nodeType && a.className) {
                        for (n = (" " + a.className + " ").replace(Tt, " "), r = 0, o = i.length; o > r; r++)
                            for (; n.indexOf(" " + i[r] + " ") > -1;) n = n.replace(" " + i[r] + " ", " ");
                        a.className = e ? Z.trim(n) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var i = typeof e,
                n = "boolean" == typeof t;
            return this.each(Z.isFunction(e) ? function(i) {
                Z(this).toggleClass(e.call(this, i, this.className, t), t)
            } : function() {
                if ("string" === i)
                    for (var a, r = 0, o = Z(this), s = t, l = e.split(tt); a = l[r++];) s = n ? s : !o.hasClass(a), o[s ? "addClass" : "removeClass"](a);
                else("undefined" === i || "boolean" === i) && (this.className && Z._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : Z._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Tt, " ").indexOf(t) > -1) return !0;
            return !1
        },
        val: function(e) {
            var i, n, a, r = this[0]; {
                if (arguments.length) return a = Z.isFunction(e), this.each(function(n) {
                    var r, o = Z(this);
                    1 === this.nodeType && (r = a ? e.call(this, n, o.val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : Z.isArray(r) && (r = Z.map(r, function(e) {
                        return null == e ? "" : e + ""
                    })), i = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, r, "value") !== t || (this.value = r))
                });
                if (r) return i = Z.valHooks[r.type] || Z.valHooks[r.nodeName.toLowerCase()], i && "get" in i && (n = i.get(r, "value")) !== t ? n : (n = r.value, "string" == typeof n ? n.replace(bt, "") : null == n ? "" : n)
            }
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, i, n, a, r = e.selectedIndex,
                        o = [],
                        s = e.options,
                        l = "select-one" === e.type;
                    if (0 > r) return null;
                    for (i = l ? r : 0, n = l ? r + 1 : s.length; n > i; i++)
                        if (a = s[i], !(!a.selected || (Z.support.optDisabled ? a.disabled : null !== a.getAttribute("disabled")) || a.parentNode.disabled && Z.nodeName(a.parentNode, "optgroup"))) {
                            if (t = Z(a).val(), l) return t;
                            o.push(t)
                        }
                    return l && !o.length && s.length ? Z(s[r]).val() : o
                },
                set: function(e, t) {
                    var i = Z.makeArray(t);
                    return Z(e).find("option").each(function() {
                        this.selected = Z.inArray(Z(this).val(), i) >= 0
                    }), i.length || (e.selectedIndex = -1), i
                }
            }
        },
        attrFn: {},
        attr: function(e, i, n, a) {
            var r, o, s, l = e.nodeType;
            if (e && 3 !== l && 8 !== l && 2 !== l) return a && Z.isFunction(Z.fn[i]) ? Z(e)[i](n) : "undefined" == typeof e.getAttribute ? Z.prop(e, i, n) : (s = 1 !== l || !Z.isXMLDoc(e), s && (i = i.toLowerCase(), o = Z.attrHooks[i] || (kt.test(i) ? yt : _t)), n !== t ? null === n ? void Z.removeAttr(e, i) : o && "set" in o && s && (r = o.set(e, n, i)) !== t ? r : (e.setAttribute(i, "" + n), n) : o && "get" in o && s && null !== (r = o.get(e, i)) ? r : (r = e.getAttribute(i), null === r ? t : r))
        },
        removeAttr: function(e, t) {
            var i, n, a, r, o = 0;
            if (t && 1 === e.nodeType)
                for (n = t.split(tt); o < n.length; o++) a = n[o], a && (i = Z.propFix[a] || a, r = kt.test(a), r || Z.attr(e, a, ""), e.removeAttribute(Ct ? a : i), r && i in e && (e[i] = !1))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (St.test(e.nodeName) && e.parentNode) Z.error("type property can't be changed");
                    else if (!Z.support.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return _t && Z.nodeName(e, "button") ? _t.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, i) {
                    return _t && Z.nodeName(e, "button") ? _t.set(e, t, i) : void(e.value = t)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, i, n) {
            var a, r, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !Z.isXMLDoc(e), o && (i = Z.propFix[i] || i, r = Z.propHooks[i]), n !== t ? r && "set" in r && (a = r.set(e, n, i)) !== t ? a : e[i] = n : r && "get" in r && null !== (a = r.get(e, i)) ? a : e[i]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var i = e.getAttributeNode("tabindex");
                    return i && i.specified ? parseInt(i.value, 10) : wt.test(e.nodeName) || $t.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), yt = {
        get: function(e, i) {
            var n, a = Z.prop(e, i);
            return a === !0 || "boolean" != typeof a && (n = e.getAttributeNode(i)) && n.nodeValue !== !1 ? i.toLowerCase() : t
        },
        set: function(e, t, i) {
            var n;
            return t === !1 ? Z.removeAttr(e, i) : (n = Z.propFix[i] || i, n in e && (e[n] = !0), e.setAttribute(i, i.toLowerCase())), i
        }
    }, Ct || (vt = {
        name: !0,
        id: !0,
        coords: !0
    }, _t = Z.valHooks.button = {
        get: function(e, i) {
            var n;
            return n = e.getAttributeNode(i), n && (vt[i] ? "" !== n.value : n.specified) ? n.value : t
        },
        set: function(e, t, i) {
            var n = e.getAttributeNode(i);
            return n || (n = U.createAttribute(i), e.setAttributeNode(n)), n.value = t + ""
        }
    }, Z.each(["width", "height"], function(e, t) {
        Z.attrHooks[t] = Z.extend(Z.attrHooks[t], {
            set: function(e, i) {
                return "" === i ? (e.setAttribute(t, "auto"), i) : void 0
            }
        })
    }), Z.attrHooks.contenteditable = {
        get: _t.get,
        set: function(e, t, i) {
            "" === t && (t = "false"), _t.set(e, t, i)
        }
    }), Z.support.hrefNormalized || Z.each(["href", "src", "width", "height"], function(e, i) {
        Z.attrHooks[i] = Z.extend(Z.attrHooks[i], {
            get: function(e) {
                var n = e.getAttribute(i, 2);
                return null === n ? t : n
            }
        })
    }), Z.support.style || (Z.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = "" + t
        }
    }), Z.support.optSelected || (Z.propHooks.selected = Z.extend(Z.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), Z.support.enctype || (Z.propFix.enctype = "encoding"), Z.support.checkOn || Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = {
            get: function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = Z.extend(Z.valHooks[this], {
            set: function(e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
            }
        })
    });
    var Mt = /^(?:textarea|input|select)$/i,
        At = /^([^\.]*|)(?:\.(.+)|)$/,
        xt = /(?:^|\s)hover(\.\S+|)\b/,
        Et = /^key/,
        Dt = /^(?:mouse|contextmenu)|click/,
        Lt = /^(?:focusinfocus|focusoutblur)$/,
        Pt = function(e) {
            return Z.event.special.hover ? e : e.replace(xt, "mouseenter$1 mouseleave$1")
        };
    Z.event = {
            add: function(e, i, n, a, r) {
                var o, s, l, c, u, d, p, h, f, m, g;
                if (3 !== e.nodeType && 8 !== e.nodeType && i && n && (o = Z._data(e))) {
                    for (n.handler && (f = n, n = f.handler, r = f.selector), n.guid || (n.guid = Z.guid++), l = o.events, l || (o.events = l = {}), s = o.handle, s || (o.handle = s = function(e) {
                            return "undefined" == typeof Z || e && Z.event.triggered === e.type ? t : Z.event.dispatch.apply(s.elem, arguments)
                        }, s.elem = e), i = Z.trim(Pt(i)).split(" "), c = 0; c < i.length; c++) u = At.exec(i[c]) || [], d = u[1], p = (u[2] || "").split(".").sort(), g = Z.event.special[d] || {}, d = (r ? g.delegateType : g.bindType) || d, g = Z.event.special[d] || {}, h = Z.extend({
                        type: d,
                        origType: u[1],
                        data: a,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        namespace: p.join(".")
                    }, f), m = l[d], m || (m = l[d] = [], m.delegateCount = 0, g.setup && g.setup.call(e, a, p, s) !== !1 || (e.addEventListener ? e.addEventListener(d, s, !1) : e.attachEvent && e.attachEvent("on" + d, s))), g.add && (g.add.call(e, h), h.handler.guid || (h.handler.guid = n.guid)), r ? m.splice(m.delegateCount++, 0, h) : m.push(h), Z.event.global[d] = !0;
                    e = null
                }
            },
            global: {},
            remove: function(e, t, i, n, a) {
                var r, o, s, l, c, u, d, p, h, f, m, g = Z.hasData(e) && Z._data(e);
                if (g && (p = g.events)) {
                    for (t = Z.trim(Pt(t || "")).split(" "), r = 0; r < t.length; r++)
                        if (o = At.exec(t[r]) || [], s = l = o[1], c = o[2], s) {
                            for (h = Z.event.special[s] || {}, s = (n ? h.delegateType : h.bindType) || s, f = p[s] || [], u = f.length, c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = 0; d < f.length; d++) m = f[d], !(!a && l !== m.origType || i && i.guid !== m.guid || c && !c.test(m.namespace) || n && n !== m.selector && ("**" !== n || !m.selector) || (f.splice(d--, 1), m.selector && f.delegateCount--, !h.remove || !h.remove.call(e, m)));
                            0 === f.length && u !== f.length && ((!h.teardown || h.teardown.call(e, c, g.handle) === !1) && Z.removeEvent(e, s, g.handle), delete p[s])
                        } else
                            for (s in p) Z.event.remove(e, s + t[r], i, n, !0);
                    Z.isEmptyObject(p) && (delete g.handle, Z.removeData(e, "events", !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(i, n, a, r) {
                if (!a || 3 !== a.nodeType && 8 !== a.nodeType) {
                    var o, s, l, c, u, d, p, h, f, m, g = i.type || i,
                        _ = [];
                    if (Lt.test(g + Z.event.triggered)) return;
                    if (g.indexOf("!") >= 0 && (g = g.slice(0, -1), s = !0), g.indexOf(".") >= 0 && (_ = g.split("."), g = _.shift(), _.sort()), (!a || Z.event.customEvent[g]) && !Z.event.global[g]) return;
                    if (i = "object" == typeof i ? i[Z.expando] ? i : new Z.Event(g, i) : new Z.Event(g), i.type = g, i.isTrigger = !0, i.exclusive = s, i.namespace = _.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + _.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = g.indexOf(":") < 0 ? "on" + g : "", !a) {
                        o = Z.cache;
                        for (l in o) o[l].events && o[l].events[g] && Z.event.trigger(i, n, o[l].handle.elem, !0);
                        return
                    }
                    if (i.result = t, i.target || (i.target = a), n = null != n ? Z.makeArray(n) : [], n.unshift(i), p = Z.event.special[g] || {}, p.trigger && p.trigger.apply(a, n) === !1) return;
                    if (f = [
                            [a, p.bindType || g]
                        ], !r && !p.noBubble && !Z.isWindow(a)) {
                        for (m = p.delegateType || g, c = Lt.test(m + g) ? a : a.parentNode, u = a; c; c = c.parentNode) f.push([c, m]), u = c;
                        u === (a.ownerDocument || U) && f.push([u.defaultView || u.parentWindow || e, m])
                    }
                    for (l = 0; l < f.length && !i.isPropagationStopped(); l++) c = f[l][0], i.type = f[l][1], h = (Z._data(c, "events") || {})[i.type] && Z._data(c, "handle"), h && h.apply(c, n), h = d && c[d], h && Z.acceptData(c) && h.apply(c, n) === !1 && i.preventDefault();
                    return i.type = g, !(r || i.isDefaultPrevented() || p._default && p._default.apply(a.ownerDocument, n) !== !1 || "click" === g && Z.nodeName(a, "a") || !Z.acceptData(a) || !d || !a[g] || ("focus" === g || "blur" === g) && 0 === i.target.offsetWidth || Z.isWindow(a) || (u = a[d], u && (a[d] = null), Z.event.triggered = g, a[g](), Z.event.triggered = t, !u || !(a[d] = u))), i.result
                }
            },
            dispatch: function(i) {
                i = Z.event.fix(i || e.event);
                var n, a, r, o, s, l, c, u, d, p = (Z._data(this, "events") || {})[i.type] || [],
                    h = p.delegateCount,
                    f = [].slice.call(arguments),
                    m = !i.exclusive && !i.namespace,
                    g = Z.event.special[i.type] || {},
                    _ = [];
                if (f[0] = i, i.delegateTarget = this, !g.preDispatch || g.preDispatch.call(this, i) !== !1) {
                    if (h && (!i.button || "click" !== i.type))
                        for (r = i.target; r != this; r = r.parentNode || this)
                            if (r.disabled !== !0 || "click" !== i.type) {
                                for (s = {}, c = [], n = 0; h > n; n++) u = p[n], d = u.selector, s[d] === t && (s[d] = Z(d, this).index(r) >= 0), s[d] && c.push(u);
                                c.length && _.push({
                                    elem: r,
                                    matches: c
                                })
                            }
                    for (p.length > h && _.push({
                            elem: this,
                            matches: p.slice(h)
                        }), n = 0; n < _.length && !i.isPropagationStopped(); n++)
                        for (l = _[n], i.currentTarget = l.elem, a = 0; a < l.matches.length && !i.isImmediatePropagationStopped(); a++) u = l.matches[a], (m || !i.namespace && !u.namespace || i.namespace_re && i.namespace_re.test(u.namespace)) && (i.data = u.data, i.handleObj = u, o = ((Z.event.special[u.origType] || {}).handle || u.handler).apply(l.elem, f), o !== t && (i.result = o, o === !1 && (i.preventDefault(), i.stopPropagation())));
                    return g.postDispatch && g.postDispatch.call(this, i), i.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, i) {
                    var n, a, r, o = i.button,
                        s = i.fromElement;
                    return null == e.pageX && null != i.clientX && (n = e.target.ownerDocument || U, a = n.documentElement, r = n.body, e.pageX = i.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = i.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? i.toElement : s), !e.which && o !== t && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[Z.expando]) return e;
                var t, i, n = e,
                    a = Z.event.fixHooks[e.type] || {},
                    r = a.props ? this.props.concat(a.props) : this.props;
                for (e = Z.Event(n), t = r.length; t;) i = r[--t], e[i] = n[i];
                return e.target || (e.target = n.srcElement || U), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, n) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(e, t, i) {
                        Z.isWindow(this) && (this.onbeforeunload = i)
                    },
                    teardown: function(e, t) {
                        this.onbeforeunload === t && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(e, t, i, n) {
                var a = Z.extend(new Z.Event, i, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                n ? Z.event.trigger(a, null, t) : Z.event.dispatch.call(t, a), a.isDefaultPrevented() && i.preventDefault()
            }
        }, Z.event.handle = Z.event.dispatch, Z.removeEvent = U.removeEventListener ? function(e, t, i) {
            e.removeEventListener && e.removeEventListener(t, i, !1)
        } : function(e, t, i) {
            var n = "on" + t;
            e.detachEvent && ("undefined" == typeof e[n] && (e[n] = null), e.detachEvent(n, i))
        }, Z.Event = function(e, t) {
            return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? o : r) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), this[Z.expando] = !0, void 0) : new Z.Event(e, t)
        }, Z.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = o;
                var e = this.originalEvent;
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = o;
                var e = this.originalEvent;
                e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = o, this.stopPropagation()
            },
            isDefaultPrevented: r,
            isPropagationStopped: r,
            isImmediatePropagationStopped: r
        }, Z.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(e, t) {
            Z.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    {
                        var i, n = this,
                            a = e.relatedTarget,
                            r = e.handleObj;
                        r.selector
                    }
                    return (!a || a !== n && !Z.contains(n, a)) && (e.type = r.origType, i = r.handler.apply(this, arguments), e.type = t), i
                }
            }
        }), Z.support.submitBubbles || (Z.event.special.submit = {
            setup: function() {
                return Z.nodeName(this, "form") ? !1 : void Z.event.add(this, "click._submit keypress._submit", function(e) {
                    var i = e.target,
                        n = Z.nodeName(i, "input") || Z.nodeName(i, "button") ? i.form : t;
                    n && !Z._data(n, "_submit_attached") && (Z.event.add(n, "submit._submit", function(e) {
                        e._submit_bubble = !0
                    }), Z._data(n, "_submit_attached", !0))
                })
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && Z.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                return Z.nodeName(this, "form") ? !1 : void Z.event.remove(this, "._submit")
            }
        }), Z.support.changeBubbles || (Z.event.special.change = {
            setup: function() {
                return Mt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (Z.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), Z.event.add(this, "click._change", function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), Z.event.simulate("change", this, e, !0)
                })), !1) : void Z.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    Mt.test(t.nodeName) && !Z._data(t, "_change_attached") && (Z.event.add(t, "change._change", function(e) {
                        this.parentNode && !e.isSimulated && !e.isTrigger && Z.event.simulate("change", this.parentNode, e, !0)
                    }), Z._data(t, "_change_attached", !0))
                })
            },
            handle: function(e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return Z.event.remove(this, "._change"), !Mt.test(this.nodeName)
            }
        }), Z.support.focusinBubbles || Z.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var i = 0,
                n = function(e) {
                    Z.event.simulate(t, e.target, Z.event.fix(e), !0)
                };
            Z.event.special[t] = {
                setup: function() {
                    0 === i++ && U.addEventListener(e, n, !0)
                },
                teardown: function() {
                    0 === --i && U.removeEventListener(e, n, !0)
                }
            }
        }), Z.fn.extend({
            on: function(e, i, n, a, o) {
                var s, l;
                if ("object" == typeof e) {
                    "string" != typeof i && (n = n || i, i = t);
                    for (l in e) this.on(l, i, n, e[l], o);
                    return this
                }
                if (null == n && null == a ? (a = i, n = i = t) : null == a && ("string" == typeof i ? (a = n, n = t) : (a = n, n = i, i = t)), a === !1) a = r;
                else if (!a) return this;
                return 1 === o && (s = a, a = function(e) {
                    return Z().off(e), s.apply(this, arguments)
                }, a.guid = s.guid || (s.guid = Z.guid++)), this.each(function() {
                    Z.event.add(this, e, a, n, i)
                })
            },
            one: function(e, t, i, n) {
                return this.on(e, t, i, n, 1)
            },
            off: function(e, i, n) {
                var a, o;
                if (e && e.preventDefault && e.handleObj) return a = e.handleObj, Z(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, i, e[o]);
                    return this
                }
                return (i === !1 || "function" == typeof i) && (n = i, i = t), n === !1 && (n = r), this.each(function() {
                    Z.event.remove(this, e, n, i)
                })
            },
            bind: function(e, t, i) {
                return this.on(e, null, t, i)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            live: function(e, t, i) {
                return Z(this.context).on(e, this.selector, t, i), this
            },
            die: function(e, t) {
                return Z(this.context).off(e, this.selector || "**", t), this
            },
            delegate: function(e, t, i, n) {
                return this.on(t, e, i, n)
            },
            undelegate: function(e, t, i) {
                return 1 == arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
            },
            trigger: function(e, t) {
                return this.each(function() {
                    Z.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                return this[0] ? Z.event.trigger(e, t, this[0], !0) : void 0
            },
            toggle: function(e) {
                var t = arguments,
                    i = e.guid || Z.guid++,
                    n = 0,
                    a = function(i) {
                        var a = (Z._data(this, "lastToggle" + e.guid) || 0) % n;
                        return Z._data(this, "lastToggle" + e.guid, a + 1), i.preventDefault(), t[a].apply(this, arguments) || !1
                    };
                for (a.guid = i; n < t.length;) t[n++].guid = i;
                return this.click(a)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            Z.fn[t] = function(e, i) {
                return null == i && (i = e, e = null), arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
            }, Et.test(t) && (Z.event.fixHooks[t] = Z.event.keyHooks), Dt.test(t) && (Z.event.fixHooks[t] = Z.event.mouseHooks)
        }),
        function(e, t) {
            function i(e, t, i, n) {
                i = i || [], t = t || A;
                var a, r, o, s, l = t.nodeType;
                if (1 !== l && 9 !== l) return [];
                if (!e || "string" != typeof e) return i;
                if (o = T(t), !o && !n && (a = K.exec(e)))
                    if (s = a[1]) {
                        if (9 === l) {
                            if (r = t.getElementById(s), !r || !r.parentNode) return i;
                            if (r.id === s) return i.push(r), i
                        } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && b(t, r) && r.id === s) return i.push(r), i
                    } else {
                        if (a[2]) return L.apply(i, D.call(t.getElementsByTagName(e), 0)), i;
                        if ((s = a[3]) && st && t.getElementsByClassName) return L.apply(i, D.call(t.getElementsByClassName(s), 0)), i
                    }
                return f(e, t, i, n, o)
            }

            function n(e) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return "input" === i && t.type === e
                }
            }

            function a(e) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === e
                }
            }

            function r(e, t, i) {
                if (e === t) return i;
                for (var n = e.nextSibling; n;) {
                    if (n === t) return -1;
                    n = n.nextSibling
                }
                return 1
            }

            function o(e, t, n, a) {
                var r, o, s, l, c, u, d, p, h, f, m = !n && t !== A,
                    g = (m ? "<s>" : "") + e.replace(W, "$1<s>"),
                    _ = I[M][g];
                if (_) return a ? 0 : D.call(_, 0);
                for (c = e, u = [], p = 0, h = y.preFilter, f = y.filter; c;) {
                    (!r || (o = Y.exec(c))) && (o && (c = c.slice(o[0].length), s.selector = d), u.push(s = []), d = "", m && (c = " " + c)), r = !1, (o = G.exec(c)) && (d += o[0], c = c.slice(o[0].length), r = s.push({
                        part: o.pop().replace(W, " "),
                        string: o[0],
                        captures: o
                    }));
                    for (l in f)(o = it[l].exec(c)) && (!h[l] || (o = h[l](o, t, n))) && (d += o[0], c = c.slice(o[0].length), r = s.push({
                        part: l,
                        string: o.shift(),
                        captures: o
                    }));
                    if (!r) break
                }
                return d && (s.selector = d), a ? c.length : c ? i.error(e) : D.call(I(g, u), 0)
            }

            function s(e, t, i, n) {
                var a = t.dir,
                    r = E++;
                return e || (e = function(e) {
                    return e === i
                }), t.first ? function(t) {
                    for (; t = t[a];)
                        if (1 === t.nodeType) return e(t) && t
                } : n ? function(t) {
                    for (; t = t[a];)
                        if (1 === t.nodeType && e(t)) return t
                } : function(t) {
                    for (var i, n = r + "." + m, o = n + "." + g; t = t[a];)
                        if (1 === t.nodeType) {
                            if ((i = t[M]) === o) return t.sizset;
                            if ("string" == typeof i && 0 === i.indexOf(n)) {
                                if (t.sizset) return t
                            } else {
                                if (t[M] = o, e(t)) return t.sizset = !0, t;
                                t.sizset = !1
                            }
                        }
                }
            }

            function l(e, t) {
                return e ? function(i) {
                    var n = t(i);
                    return n && e(n === !0 ? i : n)
                } : t
            }

            function c(e, t, i) {
                for (var n, a, r = 0; n = e[r]; r++) a = y.relative[n.part] ? s(a, y.relative[n.part], t, i) : l(a, y.filter[n.part].apply(null, n.captures.concat(t, i)));
                return a
            }

            function u(e) {
                return function(t) {
                    for (var i, n = 0; i = e[n]; n++)
                        if (i(t)) return !0;
                    return !1
                }
            }

            function d(e, t, n, a) {
                for (var r = 0, o = t.length; o > r; r++) i(e, t[r], n, a)
            }

            function p(e, t, n, a, r, o) {
                var s, l = y.setFilters[t.toLowerCase()];
                return l || i.error(t), (e || !(s = r)) && d(e || "*", a, s = [], r), s.length > 0 ? l(s, n, o) : []
            }

            function h(e, n, a, r) {
                for (var o, s, l, c, u, h, f, m, g, _, y, v, T, b = 0, S = e.length, w = it.POS, $ = new RegExp("^" + w.source + "(?!" + N + ")", "i"), k = function() {
                        for (var e = 1, i = arguments.length - 2; i > e; e++) arguments[e] === t && (g[e] = t)
                    }; S > b; b++) {
                    for (o = e[b], s = "", m = r, l = 0, c = o.length; c > l; l++) {
                        if (u = o[l], h = u.string, "PSEUDO" === u.part)
                            for (w.exec(""), f = 0; g = w.exec(h);) _ = !0, y = w.lastIndex = g.index + g[0].length, y > f && (s += h.slice(f, g.index), f = y, v = [n], G.test(s) && (m && (v = m), m = r), (T = Q.test(s)) && (s = s.slice(0, -5).replace(G, "$&*"), f++), g.length > 1 && g[0].replace($, k), m = p(s, g[1], g[2], v, m, T)), s = "";
                        _ || (s += h), _ = !1
                    }
                    s ? G.test(s) ? d(s, m || [n], a, r) : i(s, n, a, r ? r.concat(m) : m) : L.apply(a, m)
                }
                return 1 === S ? a : i.uniqueSort(a)
            }

            function f(e, t, i, n, a) {
                e = e.replace(W, "$1");
                var r, s, l, c, u, d, p, f, _, v = o(e, t, a),
                    T = t.nodeType;
                if (it.POS.test(e)) return h(v, t, i, n);
                if (n) r = D.call(n, 0);
                else if (1 === v.length) {
                    if ((u = D.call(v[0], 0)).length > 2 && "ID" === (d = u[0]).part && 9 === T && !a && y.relative[u[1].part]) {
                        if (t = y.find.ID(d.captures[0].replace(tt, ""), t, a)[0], !t) return i;
                        e = e.slice(u.shift().string.length)
                    }
                    for (f = (v = J.exec(u[0].string)) && !v.index && t.parentNode || t, p = "", c = u.length - 1; c >= 0 && (d = u[c], _ = d.part, p = d.string + p, !y.relative[_]); c--)
                        if (y.order.test(_)) {
                            if (r = y.find[_](d.captures[0].replace(tt, ""), f, a), null == r) continue;
                            e = e.slice(0, e.length - p.length) + p.replace(it[_], ""), e || L.apply(i, D.call(r, 0));
                            break
                        }
                }
                if (e)
                    for (s = S(e, t, a), m = s.dirruns++, null == r && (r = y.find.TAG("*", J.test(e) && t.parentNode || t)), c = 0; l = r[c]; c++) g = s.runs++, s(l) && i.push(l);
                return i
            }
            var m, g, _, y, v, T, b, S, w, $, k = !0,
                C = "undefined",
                M = ("sizcache" + Math.random()).replace(".", ""),
                A = e.document,
                x = A.documentElement,
                E = 0,
                D = [].slice,
                L = [].push,
                P = function(e, t) {
                    return e[M] = t || !0, e
                },
                F = function() {
                    var e = {},
                        t = [];
                    return P(function(i, n) {
                        return t.push(i) > y.cacheLength && delete e[t.shift()], e[i] = n
                    }, e)
                },
                V = F(),
                I = F(),
                R = F(),
                N = "[\\x20\\t\\r\\n\\f]",
                j = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                O = j.replace("w", "w#"),
                U = "([*^$|!~]?=)",
                B = "\\[" + N + "*(" + j + ")" + N + "*(?:" + U + N + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + N + "*\\]",
                H = ":(" + j + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + B + ")|[^:]|\\\\.)*|.*))\\)|)",
                z = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",
                W = new RegExp("^" + N + "+|((?:^|[^\\\\])(?:\\\\.)*)" + N + "+$", "g"),
                Y = new RegExp("^" + N + "*," + N + "*"),
                G = new RegExp("^" + N + "*([\\x20\\t\\r\\n\\f>+~])" + N + "*"),
                q = new RegExp(H),
                K = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                J = /[\x20\t\r\n\f]*[+~]/,
                Q = /:not\($/,
                X = /h\d/i,
                et = /input|select|textarea|button/i,
                tt = /\\(?!\\)/g,
                it = {
                    ID: new RegExp("^#(" + j + ")"),
                    CLASS: new RegExp("^\\.(" + j + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + j + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + j.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + B),
                    PSEUDO: new RegExp("^" + H),
                    CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + N + "*(even|odd|(([+-]|)(\\d*)n|)" + N + "*(?:([+-]|)" + N + "*(\\d+)|))" + N + "*\\)|)", "i"),
                    POS: new RegExp(z, "ig"),
                    needsContext: new RegExp("^" + N + "*[>+~]|" + z, "i")
                },
                nt = function(e) {
                    var t = A.createElement("div");
                    try {
                        return e(t)
                    } catch (i) {
                        return !1
                    } finally {
                        t = null
                    }
                },
                at = nt(function(e) {
                    return e.appendChild(A.createComment("")), !e.getElementsByTagName("*").length
                }),
                rt = nt(function(e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== C && "#" === e.firstChild.getAttribute("href")
                }),
                ot = nt(function(e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return "boolean" !== t && "string" !== t
                }),
                st = nt(function(e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
                }),
                lt = nt(function(e) {
                    e.id = M + 0, e.innerHTML = "<a name='" + M + "'></a><div name='" + M + "'></div>", x.insertBefore(e, x.firstChild);
                    var t = A.getElementsByName && A.getElementsByName(M).length === 2 + A.getElementsByName(M + 0).length;
                    return _ = !A.getElementById(M), x.removeChild(e), t
                });
            try {
                D.call(x.childNodes, 0)[0].nodeType
            } catch (ct) {
                D = function(e) {
                    for (var t, i = []; t = this[e]; e++) i.push(t);
                    return i
                }
            }
            i.matches = function(e, t) {
                return i(e, null, null, t)
            }, i.matchesSelector = function(e, t) {
                return i(t, null, null, [e]).length > 0
            }, v = i.getText = function(e) {
                var t, i = "",
                    n = 0,
                    a = e.nodeType;
                if (a) {
                    if (1 === a || 9 === a || 11 === a) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) i += v(e)
                    } else if (3 === a || 4 === a) return e.nodeValue
                } else
                    for (; t = e[n]; n++) i += v(t);
                return i
            }, T = i.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, b = i.contains = x.contains ? function(e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e,
                    n = t && t.parentNode;
                return e === n || !!(n && 1 === n.nodeType && i.contains && i.contains(n))
            } : x.compareDocumentPosition ? function(e, t) {
                return t && !!(16 & e.compareDocumentPosition(t))
            } : function(e, t) {
                for (; t = t.parentNode;)
                    if (t === e) return !0;
                return !1
            }, i.attr = function(e, t) {
                var i, n = T(e);
                return n || (t = t.toLowerCase()), y.attrHandle[t] ? y.attrHandle[t](e) : ot || n ? e.getAttribute(t) : (i = e.getAttributeNode(t), i ? "boolean" == typeof e[t] ? e[t] ? t : null : i.specified ? i.value : null : null)
            }, y = i.selectors = {
                cacheLength: 50,
                createPseudo: P,
                match: it,
                order: new RegExp("ID|TAG" + (lt ? "|NAME" : "") + (st ? "|CLASS" : "")),
                attrHandle: rt ? {} : {
                    href: function(e) {
                        return e.getAttribute("href", 2)
                    },
                    type: function(e) {
                        return e.getAttribute("type")
                    }
                },
                find: {
                    ID: _ ? function(e, t, i) {
                        if (typeof t.getElementById !== C && !i) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    } : function(e, i, n) {
                        if (typeof i.getElementById !== C && !n) {
                            var a = i.getElementById(e);
                            return a ? a.id === e || typeof a.getAttributeNode !== C && a.getAttributeNode("id").value === e ? [a] : t : []
                        }
                    },
                    TAG: at ? function(e, t) {
                        return typeof t.getElementsByTagName !== C ? t.getElementsByTagName(e) : void 0
                    } : function(e, t) {
                        var i = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (var n, a = [], r = 0; n = i[r]; r++) 1 === n.nodeType && a.push(n);
                            return a
                        }
                        return i
                    },
                    NAME: function(e, t) {
                        return typeof t.getElementsByName !== C ? t.getElementsByName(name) : void 0
                    },
                    CLASS: function(e, t, i) {
                        return typeof t.getElementsByClassName === C || i ? void 0 : t.getElementsByClassName(e)
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(tt, ""), e[3] = (e[4] || e[5] || "").replace(tt, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || i.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && i.error(e[0]), e
                    },
                    PSEUDO: function(e, t, i) {
                        var n, a;
                        return it.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (n = e[4]) && (q.test(n) && (a = o(n, t, i, !0)) && (a = n.indexOf(")", n.length - a) - n.length) && (n = n.slice(0, a), e[0] = e[0].slice(0, a)), e[2] = n), e.slice(0, 3))
                    }
                },
                filter: {
                    ID: _ ? function(e) {
                        return e = e.replace(tt, ""),
                            function(t) {
                                return t.getAttribute("id") === e
                            }
                    } : function(e) {
                        return e = e.replace(tt, ""),
                            function(t) {
                                var i = typeof t.getAttributeNode !== C && t.getAttributeNode("id");
                                return i && i.value === e
                            }
                    },
                    TAG: function(e) {
                        return "*" === e ? function() {
                            return !0
                        } : (e = e.replace(tt, "").toLowerCase(), function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        })
                    },
                    CLASS: function(e) {
                        var t = V[M][e];
                        return t || (t = V(e, new RegExp("(^|" + N + ")" + e + "(" + N + "|$)"))),
                            function(e) {
                                return t.test(e.className || typeof e.getAttribute !== C && e.getAttribute("class") || "")
                            }
                    },
                    ATTR: function(e, t, n) {
                        return t ? function(a) {
                            var r = i.attr(a, e),
                                o = r + "";
                            if (null == r) return "!=" === t;
                            switch (t) {
                                case "=":
                                    return o === n;
                                case "!=":
                                    return o !== n;
                                case "^=":
                                    return n && 0 === o.indexOf(n);
                                case "*=":
                                    return n && o.indexOf(n) > -1;
                                case "$=":
                                    return n && o.substr(o.length - n.length) === n;
                                case "~=":
                                    return (" " + o + " ").indexOf(n) > -1;
                                case "|=":
                                    return o === n || o.substr(0, n.length + 1) === n + "-"
                            }
                        } : function(t) {
                            return null != i.attr(t, e)
                        }
                    },
                    CHILD: function(e, t, i, n) {
                        if ("nth" === e) {
                            var a = E++;
                            return function(e) {
                                var t, r, o = 0,
                                    s = e;
                                if (1 === i && 0 === n) return !0;
                                if (t = e.parentNode, t && (t[M] !== a || !e.sizset)) {
                                    for (s = t.firstChild; s && (1 !== s.nodeType || (s.sizset = ++o, s !== e)); s = s.nextSibling);
                                    t[M] = a
                                }
                                return r = e.sizset - n, 0 === i ? 0 === r : r % i === 0 && r / i >= 0
                            }
                        }
                        return function(t) {
                            var i = t;
                            switch (e) {
                                case "only":
                                case "first":
                                    for (; i = i.previousSibling;)
                                        if (1 === i.nodeType) return !1;
                                    if ("first" === e) return !0;
                                    i = t;
                                case "last":
                                    for (; i = i.nextSibling;)
                                        if (1 === i.nodeType) return !1;
                                    return !0
                            }
                        }
                    },
                    PSEUDO: function(e, t, n, a) {
                        var r, o = y.pseudos[e] || y.pseudos[e.toLowerCase()];
                        return o || i.error("unsupported pseudo: " + e), o[M] ? o(t, n, a) : o.length > 1 ? (r = [e, e, "", t], function(e) {
                            return o(e, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: P(function(e, t, i) {
                        var n = S(e.replace(W, "$1"), t, i);
                        return function(e) {
                            return !n(e)
                        }
                    }),
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    parent: function(e) {
                        return !y.pseudos.empty(e)
                    },
                    empty: function(e) {
                        var t;
                        for (e = e.firstChild; e;) {
                            if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
                            e = e.nextSibling
                        }
                        return !0
                    },
                    contains: P(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || v(t)).indexOf(e) > -1
                        }
                    }),
                    has: P(function(e) {
                        return function(t) {
                            return i(e, t).length > 0
                        }
                    }),
                    header: function(e) {
                        return X.test(e.nodeName)
                    },
                    text: function(e) {
                        var t, i;
                        return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (i = e.getAttribute("type")) || i.toLowerCase() === t)
                    },
                    radio: n("radio"),
                    checkbox: n("checkbox"),
                    file: n("file"),
                    password: n("password"),
                    image: n("image"),
                    submit: a("submit"),
                    reset: a("reset"),
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    input: function(e) {
                        return et.test(e.nodeName)
                    },
                    focus: function(e) {
                        var t = e.ownerDocument;
                        return !(e !== t.activeElement || t.hasFocus && !t.hasFocus() || !e.type && !e.href)
                    },
                    active: function(e) {
                        return e === e.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function(e, t, i) {
                        return i ? e.slice(1) : [e[0]]
                    },
                    last: function(e, t, i) {
                        var n = e.pop();
                        return i ? e : [n]
                    },
                    even: function(e, t, i) {
                        for (var n = [], a = i ? 1 : 0, r = e.length; r > a; a += 2) n.push(e[a]);
                        return n
                    },
                    odd: function(e, t, i) {
                        for (var n = [], a = i ? 0 : 1, r = e.length; r > a; a += 2) n.push(e[a]);
                        return n
                    },
                    lt: function(e, t, i) {
                        return i ? e.slice(+t) : e.slice(0, +t)
                    },
                    gt: function(e, t, i) {
                        return i ? e.slice(0, +t + 1) : e.slice(+t + 1)
                    },
                    eq: function(e, t, i) {
                        var n = e.splice(+t, 1);
                        return i ? e : n
                    }
                }
            }, w = x.compareDocumentPosition ? function(e, t) {
                return e === t ? ($ = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
            } : function(e, t) {
                if (e === t) return $ = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var i, n, a = [],
                    o = [],
                    s = e.parentNode,
                    l = t.parentNode,
                    c = s;
                if (s === l) return r(e, t);
                if (!s) return -1;
                if (!l) return 1;
                for (; c;) a.unshift(c), c = c.parentNode;
                for (c = l; c;) o.unshift(c), c = c.parentNode;
                i = a.length, n = o.length;
                for (var u = 0; i > u && n > u; u++)
                    if (a[u] !== o[u]) return r(a[u], o[u]);
                return u === i ? r(e, o[u], -1) : r(a[u], t, 1)
            }, [0, 0].sort(w), k = !$, i.uniqueSort = function(e) {
                var t, i = 1;
                if ($ = k, e.sort(w), $)
                    for (; t = e[i]; i++) t === e[i - 1] && e.splice(i--, 1);
                return e
            }, i.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, S = i.compile = function(e, t, i) {
                var n, a, r, s = R[M][e];
                if (s && s.context === t) return s;
                for (n = o(e, t, i), a = 0, r = n.length; r > a; a++) n[a] = c(n[a], t, i);
                return s = R(e, u(n)), s.context = t, s.runs = s.dirruns = 0, s
            }, A.querySelectorAll && function() {
                var e, t = f,
                    n = /'|\\/g,
                    a = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    r = [],
                    s = [":active"],
                    l = x.matchesSelector || x.mozMatchesSelector || x.webkitMatchesSelector || x.oMatchesSelector || x.msMatchesSelector;
                nt(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || r.push("\\[" + N + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || r.push(":checked")
                }), nt(function(e) {
                    e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && r.push("[*^$]=" + N + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || r.push(":enabled", ":disabled")
                }), r = r.length && new RegExp(r.join("|")), f = function(e, i, a, s, l) {
                    if (!(s || l || r && r.test(e)))
                        if (9 === i.nodeType) try {
                            return L.apply(a, D.call(i.querySelectorAll(e), 0)), a
                        } catch (c) {} else if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                            var u, d, p, h = i.getAttribute("id"),
                                f = h || M,
                                m = J.test(e) && i.parentNode || i;
                            for (h ? f = f.replace(n, "\\$&") : i.setAttribute("id", f), u = o(e, i, l), f = "[id='" + f + "']", d = 0, p = u.length; p > d; d++) u[d] = f + u[d].selector;
                            try {
                                return L.apply(a, D.call(m.querySelectorAll(u.join(",")), 0)), a
                            } catch (c) {} finally {
                                h || i.removeAttribute("id")
                            }
                        }
                    return t(e, i, a, s, l)
                }, l && (nt(function(t) {
                    e = l.call(t, "div");
                    try {
                        l.call(t, "[test!='']:sizzle"), s.push(it.PSEUDO.source, it.POS.source, "!=")
                    } catch (i) {}
                }), s = new RegExp(s.join("|")), i.matchesSelector = function(t, n) {
                    if (n = n.replace(a, "='$1']"), !(T(t) || s.test(n) || r && r.test(n))) try {
                        var o = l.call(t, n);
                        if (o || e || t.document && 11 !== t.document.nodeType) return o
                    } catch (c) {}
                    return i(n, null, null, [t]).length > 0
                })
            }(), y.setFilters.nth = y.setFilters.eq, y.filters = y.pseudos, i.attr = Z.attr, Z.find = i, Z.expr = i.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = i.uniqueSort, Z.text = i.getText, Z.isXMLDoc = i.isXML, Z.contains = i.contains
        }(e);
    var Ft = /Until$/,
        Vt = /^(?:parents|prev(?:Until|All))/,
        It = /^.[^:#\[\.,]*$/,
        Rt = Z.expr.match.needsContext,
        Nt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Z.fn.extend({
        find: function(e) {
            var t, i, n, a, r, o, s = this;
            if ("string" != typeof e) return Z(e).filter(function() {
                for (t = 0, i = s.length; i > t; t++)
                    if (Z.contains(s[t], this)) return !0
            });
            for (o = this.pushStack("", "find", e), t = 0, i = this.length; i > t; t++)
                if (n = o.length, Z.find(e, this[t], o), t > 0)
                    for (a = n; a < o.length; a++)
                        for (r = 0; n > r; r++)
                            if (o[r] === o[a]) {
                                o.splice(a--, 1);
                                break
                            }
            return o
        },
        has: function(e) {
            var t, i = Z(e, this),
                n = i.length;
            return this.filter(function() {
                for (t = 0; n > t; t++)
                    if (Z.contains(this, i[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(c(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(c(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && ("string" == typeof e ? Rt.test(e) ? Z(e, this.context).index(this[0]) >= 0 : Z.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            for (var i, n = 0, a = this.length, r = [], o = Rt.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; a > n; n++)
                for (i = this[n]; i && i.ownerDocument && i !== t && 11 !== i.nodeType;) {
                    if (o ? o.index(i) > -1 : Z.find.matchesSelector(i, e)) {
                        r.push(i);
                        break
                    }
                    i = i.parentNode
                }
            return r = r.length > 1 ? Z.unique(r) : r, this.pushStack(r, "closest", e)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Z.inArray(this[0], Z(e)) : Z.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var i = "string" == typeof e ? Z(e, t) : Z.makeArray(e && e.nodeType ? [e] : e),
                n = Z.merge(this.get(), i);
            return this.pushStack(s(i[0]) || s(n[0]) ? n : Z.unique(n))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), Z.fn.andSelf = Z.fn.addBack, Z.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Z.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return Z.dir(e, "parentNode", i)
        },
        next: function(e) {
            return l(e, "nextSibling")
        },
        prev: function(e) {
            return l(e, "previousSibling")
        },
        nextAll: function(e) {
            return Z.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return Z.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return Z.dir(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return Z.dir(e, "previousSibling", i)
        },
        siblings: function(e) {
            return Z.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Z.sibling(e.firstChild)
        },
        contents: function(e) {
            return Z.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Z.merge([], e.childNodes)
        }
    }, function(e, t) {
        Z.fn[e] = function(i, n) {
            var a = Z.map(this, t, i);
            return Ft.test(e) || (n = i), n && "string" == typeof n && (a = Z.filter(n, a)), a = this.length > 1 && !Nt[e] ? Z.unique(a) : a, this.length > 1 && Vt.test(e) && (a = a.reverse()), this.pushStack(a, e, G.call(arguments).join(","))
        }
    }), Z.extend({
        filter: function(e, t, i) {
            return i && (e = ":not(" + e + ")"), 1 === t.length ? Z.find.matchesSelector(t[0], e) ? [t[0]] : [] : Z.find.matches(e, t)
        },
        dir: function(e, i, n) {
            for (var a = [], r = e[i]; r && 9 !== r.nodeType && (n === t || 1 !== r.nodeType || !Z(r).is(n));) 1 === r.nodeType && a.push(r), r = r[i];
            return a
        },
        sibling: function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        }
    });
    var jt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ot = / jQuery\d+="(?:null|\d+)"/g,
        Ut = /^\s+/,
        Bt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ht = /<([\w:]+)/,
        zt = /<tbody/i,
        Wt = /<|&#?\w+;/,
        Yt = /<(?:script|style|link)/i,
        Gt = /<(?:script|object|embed|option|style)/i,
        qt = new RegExp("<(?:" + jt + ")[\\s/>]", "i"),
        Kt = /^(?:checkbox|radio)$/,
        Jt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Qt = /\/(java|ecma)script/i,
        Zt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Xt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        ei = u(U),
        ti = ei.appendChild(U.createElement("div"));
    Xt.optgroup = Xt.option, Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead, Xt.th = Xt.td, Z.support.htmlSerialize || (Xt._default = [1, "X<div>", "</div>"]), Z.fn.extend({
            text: function(e) {
                return Z.access(this, function(e) {
                    return e === t ? Z.text(this) : this.empty().append((this[0] && this[0].ownerDocument || U).createTextNode(e))
                }, null, e, arguments.length)
            },
            wrapAll: function(e) {
                if (Z.isFunction(e)) return this.each(function(t) {
                    Z(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = Z(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return this.each(Z.isFunction(e) ? function(t) {
                    Z(this).wrapInner(e.call(this, t))
                } : function() {
                    var t = Z(this),
                        i = t.contents();
                    i.length ? i.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = Z.isFunction(e);
                return this.each(function(i) {
                    Z(this).wrapAll(t ? e.call(this, i) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
                })
            },
            before: function() {
                if (!s(this[0])) return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
                if (arguments.length) {
                    var e = Z.clean(arguments);
                    return this.pushStack(Z.merge(e, this), "before", this.selector)
                }
            },
            after: function() {
                if (!s(this[0])) return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
                if (arguments.length) {
                    var e = Z.clean(arguments);
                    return this.pushStack(Z.merge(this, e), "after", this.selector)
                }
            },
            remove: function(e, t) {
                for (var i, n = 0; null != (i = this[n]); n++)(!e || Z.filter(e, [i]).length) && (!t && 1 === i.nodeType && (Z.cleanData(i.getElementsByTagName("*")), Z.cleanData([i])), i.parentNode && i.parentNode.removeChild(i));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++)
                    for (1 === e.nodeType && Z.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return Z.clone(this, e, t)
                })
            },
            html: function(e) {
                return Z.access(this, function(e) {
                    var i = this[0] || {},
                        n = 0,
                        a = this.length;
                    if (e === t) return 1 === i.nodeType ? i.innerHTML.replace(Ot, "") : t;
                    if (!("string" != typeof e || Yt.test(e) || !Z.support.htmlSerialize && qt.test(e) || !Z.support.leadingWhitespace && Ut.test(e) || Xt[(Ht.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Bt, "<$1></$2>");
                        try {
                            for (; a > n; n++) i = this[n] || {}, 1 === i.nodeType && (Z.cleanData(i.getElementsByTagName("*")), i.innerHTML = e);
                            i = 0
                        } catch (r) {}
                    }
                    i && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function(e) {
                return s(this[0]) ? this.length ? this.pushStack(Z(Z.isFunction(e) ? e() : e), "replaceWith", e) : this : Z.isFunction(e) ? this.each(function(t) {
                    var i = Z(this),
                        n = i.html();
                    i.replaceWith(e.call(this, t, n))
                }) : ("string" != typeof e && (e = Z(e).detach()), this.each(function() {
                    var t = this.nextSibling,
                        i = this.parentNode;
                    Z(this).remove(), t ? Z(t).before(e) : Z(i).append(e)
                }))
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, i, n) {
                e = [].concat.apply([], e);
                var a, r, o, s, l = 0,
                    c = e[0],
                    u = [],
                    p = this.length;
                if (!Z.support.checkClone && p > 1 && "string" == typeof c && Jt.test(c)) return this.each(function() {
                    Z(this).domManip(e, i, n)
                });
                if (Z.isFunction(c)) return this.each(function(a) {
                    var r = Z(this);
                    e[0] = c.call(this, a, i ? r.html() : t), r.domManip(e, i, n)
                });
                if (this[0]) {
                    if (a = Z.buildFragment(e, this, u), o = a.fragment, r = o.firstChild, 1 === o.childNodes.length && (o = r), r)
                        for (i = i && Z.nodeName(r, "tr"), s = a.cacheable || p - 1; p > l; l++) n.call(i && Z.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === s ? o : Z.clone(o, !0, !0));
                    o = r = null, u.length && Z.each(u, function(e, t) {
                        t.src ? Z.ajax ? Z.ajax({
                            url: t.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : Z.error("no ajax") : Z.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Zt, "")), t.parentNode && t.parentNode.removeChild(t)
                    })
                }
                return this
            }
        }), Z.buildFragment = function(e, i, n) {
            var a, r, o, s = e[0];
            return i = i || U, i = !i.nodeType && i[0] || i, i = i.ownerDocument || i, 1 === e.length && "string" == typeof s && s.length < 512 && i === U && "<" === s.charAt(0) && !Gt.test(s) && (Z.support.checkClone || !Jt.test(s)) && (Z.support.html5Clone || !qt.test(s)) && (r = !0, a = Z.fragments[s], o = a !== t), a || (a = i.createDocumentFragment(), Z.clean(e, i, a, n), r && (Z.fragments[s] = o && a)), {
                fragment: a,
                cacheable: r
            }
        }, Z.fragments = {}, Z.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            Z.fn[e] = function(i) {
                var n, a = 0,
                    r = [],
                    o = Z(i),
                    s = o.length,
                    l = 1 === this.length && this[0].parentNode;
                if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === s) return o[t](this[0]), this;
                for (; s > a; a++) n = (a > 0 ? this.clone(!0) : this).get(), Z(o[a])[t](n), r = r.concat(n);
                return this.pushStack(r, e, o.selector)
            }
        }), Z.extend({
            clone: function(e, t, i) {
                var n, a, r, o;
                if (Z.support.html5Clone || Z.isXMLDoc(e) || !qt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ti.innerHTML = e.outerHTML, ti.removeChild(o = ti.firstChild)), !(Z.support.noCloneEvent && Z.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                    for (h(e, o), n = f(e), a = f(o), r = 0; n[r]; ++r) a[r] && h(n[r], a[r]);
                if (t && (p(e, o), i))
                    for (n = f(e), a = f(o), r = 0; n[r]; ++r) p(n[r], a[r]);
                return n = a = null, o
            },
            clean: function(e, t, i, n) {
                var a, r, o, s, l, c, d, p, h, f, g, _ = t === U && ei,
                    y = [];
                for (t && "undefined" != typeof t.createDocumentFragment || (t = U), a = 0; null != (o = e[a]); a++)
                    if ("number" == typeof o && (o += ""), o) {
                        if ("string" == typeof o)
                            if (Wt.test(o)) {
                                for (_ = _ || u(t), d = t.createElement("div"), _.appendChild(d), o = o.replace(Bt, "<$1></$2>"), s = (Ht.exec(o) || ["", ""])[1].toLowerCase(), l = Xt[s] || Xt._default, c = l[0], d.innerHTML = l[1] + o + l[2]; c--;) d = d.lastChild;
                                if (!Z.support.tbody)
                                    for (p = zt.test(o), h = "table" !== s || p ? "<table>" !== l[1] || p ? [] : d.childNodes : d.firstChild && d.firstChild.childNodes, r = h.length - 1; r >= 0; --r) Z.nodeName(h[r], "tbody") && !h[r].childNodes.length && h[r].parentNode.removeChild(h[r]);
                                !Z.support.leadingWhitespace && Ut.test(o) && d.insertBefore(t.createTextNode(Ut.exec(o)[0]), d.firstChild), o = d.childNodes, d.parentNode.removeChild(d)
                            } else o = t.createTextNode(o);
                        o.nodeType ? y.push(o) : Z.merge(y, o)
                    }
                if (d && (o = d = _ = null), !Z.support.appendChecked)
                    for (a = 0; null != (o = y[a]); a++) Z.nodeName(o, "input") ? m(o) : "undefined" != typeof o.getElementsByTagName && Z.grep(o.getElementsByTagName("input"), m);
                if (i)
                    for (f = function(e) {
                            return !e.type || Qt.test(e.type) ? n ? n.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : void 0
                        }, a = 0; null != (o = y[a]); a++) Z.nodeName(o, "script") && f(o) || (i.appendChild(o), "undefined" != typeof o.getElementsByTagName && (g = Z.grep(Z.merge([], o.getElementsByTagName("script")), f), y.splice.apply(y, [a + 1, 0].concat(g)), a += g.length));
                return y
            },
            cleanData: function(e, t) {
                for (var i, n, a, r, o = 0, s = Z.expando, l = Z.cache, c = Z.support.deleteExpando, u = Z.event.special; null != (a = e[o]); o++)
                    if ((t || Z.acceptData(a)) && (n = a[s], i = n && l[n])) {
                        if (i.events)
                            for (r in i.events) u[r] ? Z.event.remove(a, r) : Z.removeEvent(a, r, i.handle);
                        l[n] && (delete l[n], c ? delete a[s] : a.removeAttribute ? a.removeAttribute(s) : a[s] = null, Z.deletedIds.push(n))
                    }
            }
        }),
        function() {
            var e, t;
            Z.uaMatch = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }, e = Z.uaMatch(H.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), Z.browser = t, Z.sub = function() {
                function e(t, i) {
                    return new e.fn.init(t, i)
                }
                Z.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function i(i, n) {
                    return n && n instanceof Z && !(n instanceof e) && (n = e(n)), Z.fn.init.call(this, i, n, t)
                }, e.fn.init.prototype = e.fn;
                var t = e(U);
                return e
            }
        }();
    var ii, ni, ai, ri = /alpha\([^)]*\)/i,
        oi = /opacity=([^)]*)/,
        si = /^(top|right|bottom|left)$/,
        li = /^(none|table(?!-c[ea]).+)/,
        ci = /^margin/,
        ui = new RegExp("^(" + X + ")(.*)$", "i"),
        di = new RegExp("^(" + X + ")(?!px)[a-z%]+$", "i"),
        pi = new RegExp("^([-+])=(" + X + ")", "i"),
        hi = {},
        fi = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        mi = {
            letterSpacing: 0,
            fontWeight: 400
        },
        gi = ["Top", "Right", "Bottom", "Left"],
        _i = ["Webkit", "O", "Moz", "ms"],
        yi = Z.fn.toggle;
    Z.fn.extend({
        css: function(e, i) {
            return Z.access(this, function(e, i, n) {
                return n !== t ? Z.style(e, i, n) : Z.css(e, i)
            }, e, i, arguments.length > 1)
        },
        show: function() {
            return y(this, !0)
        },
        hide: function() {
            return y(this)
        },
        toggle: function(e, t) {
            var i = "boolean" == typeof e;
            return Z.isFunction(e) && Z.isFunction(t) ? yi.apply(this, arguments) : this.each(function() {
                (i ? e : _(this)) ? Z(this).show(): Z(this).hide()
            })
        }
    }), Z.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = ii(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": Z.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, i, n, a) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, s, l = Z.camelCase(i),
                    c = e.style;
                if (i = Z.cssProps[l] || (Z.cssProps[l] = g(c, l)), s = Z.cssHooks[i] || Z.cssHooks[l], n === t) return s && "get" in s && (r = s.get(e, !1, a)) !== t ? r : c[i];
                if (o = typeof n, "string" === o && (r = pi.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(Z.css(e, i)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" === o && !Z.cssNumber[l] && (n += "px"), s && "set" in s && (n = s.set(e, n, a)) === t))) try {
                    c[i] = n
                } catch (u) {}
            }
        },
        css: function(e, i, n, a) {
            var r, o, s, l = Z.camelCase(i);
            return i = Z.cssProps[l] || (Z.cssProps[l] = g(e.style, l)), s = Z.cssHooks[i] || Z.cssHooks[l], s && "get" in s && (r = s.get(e, !0, a)), r === t && (r = ii(e, i)), "normal" === r && i in mi && (r = mi[i]), n || a !== t ? (o = parseFloat(r), n || Z.isNumeric(o) ? o || 0 : r) : r
        },
        swap: function(e, t, i) {
            var n, a, r = {};
            for (a in t) r[a] = e.style[a], e.style[a] = t[a];
            n = i.call(e);
            for (a in t) e.style[a] = r[a];
            return n
        }
    }), e.getComputedStyle ? ii = function(t, i) {
        var n, a, r, o, s = e.getComputedStyle(t, null),
            l = t.style;
        return s && (n = s[i], "" === n && !Z.contains(t.ownerDocument, t) && (n = Z.style(t, i)), di.test(n) && ci.test(i) && (a = l.width, r = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = n, n = s.width, l.width = a, l.minWidth = r, l.maxWidth = o)), n
    } : U.documentElement.currentStyle && (ii = function(e, t) {
        var i, n, a = e.currentStyle && e.currentStyle[t],
            r = e.style;
        return null == a && r && r[t] && (a = r[t]), di.test(a) && !si.test(t) && (i = r.left, n = e.runtimeStyle && e.runtimeStyle.left, n && (e.runtimeStyle.left = e.currentStyle.left), r.left = "fontSize" === t ? "1em" : a, a = r.pixelLeft + "px", r.left = i, n && (e.runtimeStyle.left = n)), "" === a ? "auto" : a
    }), Z.each(["height", "width"], function(e, t) {
        Z.cssHooks[t] = {
            get: function(e, i, n) {
                return i ? 0 === e.offsetWidth && li.test(ii(e, "display")) ? Z.swap(e, fi, function() {
                    return b(e, t, n)
                }) : b(e, t, n) : void 0
            },
            set: function(e, i, n) {
                return v(e, i, n ? T(e, t, n, Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing")) : 0)
            }
        }
    }), Z.support.opacity || (Z.cssHooks.opacity = {
        get: function(e, t) {
            return oi.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var i = e.style,
                n = e.currentStyle,
                a = Z.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                r = n && n.filter || i.filter || "";
            i.zoom = 1, t >= 1 && "" === Z.trim(r.replace(ri, "")) && i.removeAttribute && (i.removeAttribute("filter"), n && !n.filter) || (i.filter = ri.test(r) ? r.replace(ri, a) : r + " " + a)
        }
    }), Z(function() {
        Z.support.reliableMarginRight || (Z.cssHooks.marginRight = {
            get: function(e, t) {
                return Z.swap(e, {
                    display: "inline-block"
                }, function() {
                    return t ? ii(e, "marginRight") : void 0
                })
            }
        }), !Z.support.pixelPosition && Z.fn.position && Z.each(["top", "left"], function(e, t) {
            Z.cssHooks[t] = {
                get: function(e, i) {
                    if (i) {
                        var n = ii(e, t);
                        return di.test(n) ? Z(e).position()[t] + "px" : n
                    }
                }
            }
        })
    }), Z.expr && Z.expr.filters && (Z.expr.filters.hidden = function(e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !Z.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ii(e, "display"))
    }, Z.expr.filters.visible = function(e) {
        return !Z.expr.filters.hidden(e)
    }), Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        Z.cssHooks[e + t] = {
            expand: function(i) {
                var n, a = "string" == typeof i ? i.split(" ") : [i],
                    r = {};
                for (n = 0; 4 > n; n++) r[e + gi[n] + t] = a[n] || a[n - 2] || a[0];
                return r
            }
        }, ci.test(e) || (Z.cssHooks[e + t].set = v)
    });
    var vi = /%20/g,
        Ti = /\[\]$/,
        bi = /\r?\n/g,
        Si = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        wi = /^(?:select|textarea)/i;
    Z.fn.extend({
        serialize: function() {
            return Z.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? Z.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || wi.test(this.nodeName) || Si.test(this.type))
            }).map(function(e, t) {
                var i = Z(this).val();
                return null == i ? null : Z.isArray(i) ? Z.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(bi, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(bi, "\r\n")
                }
            }).get()
        }
    }), Z.param = function(e, i) {
        var n, a = [],
            r = function(e, t) {
                t = Z.isFunction(t) ? t() : null == t ? "" : t, a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (i === t && (i = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (n in e) w(n, e[n], i, r);
        return a.join("&").replace(vi, "+")
    };
    var $i, ki, Ci = /#.*$/,
        Mi = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ai = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        xi = /^(?:GET|HEAD)$/,
        Ei = /^\/\//,
        Di = /\?/,
        Li = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Pi = /([?&])_=[^&]*/,
        Fi = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Vi = Z.fn.load,
        Ii = {},
        Ri = {},
        Ni = ["*/"] + ["*"];
    try {
        $i = B.href
    } catch (ji) {
        $i = U.createElement("a"), $i.href = "", $i = $i.href
    }
    ki = Fi.exec($i.toLowerCase()) || [], Z.fn.load = function(e, i, n) {
        if ("string" != typeof e && Vi) return Vi.apply(this, arguments);
        if (!this.length) return this;
        var a, r, o, s = this,
            l = e.indexOf(" ");
        return l >= 0 && (a = e.slice(l, e.length), e = e.slice(0, l)), Z.isFunction(i) ? (n = i, i = t) : i && "object" == typeof i && (r = "POST"), Z.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: i,
            complete: function(e, t) {
                n && s.each(n, o || [e.responseText, t, e])
            }
        }).done(function(e) {
            o = arguments, s.html(a ? Z("<div>").append(e.replace(Li, "")).find(a) : e)
        }), this
    }, Z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        Z.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), Z.each(["get", "post"], function(e, i) {
        Z[i] = function(e, n, a, r) {
            return Z.isFunction(n) && (r = r || a, a = n, n = t), Z.ajax({
                type: i,
                url: e,
                data: n,
                success: a,
                dataType: r
            })
        }
    }), Z.extend({
        getScript: function(e, i) {
            return Z.get(e, t, i, "script")
        },
        getJSON: function(e, t, i) {
            return Z.get(e, t, i, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? C(e, Z.ajaxSettings) : (t = e, e = Z.ajaxSettings), C(e, t), e
        },
        ajaxSettings: {
            url: $i,
            isLocal: Ai.test(ki[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Ni
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: $(Ii),
        ajaxTransport: $(Ri),
        ajax: function(e, i) {
            function n(e, i, n, o) {
                var c, d, y, v, b, w = i;
                2 !== T && (T = 2, l && clearTimeout(l), s = t, r = o || "", S.readyState = e > 0 ? 4 : 0, n && (v = M(p, S, n)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (b = S.getResponseHeader("Last-Modified"), b && (Z.lastModified[a] = b), b = S.getResponseHeader("Etag"), b && (Z.etag[a] = b)), 304 === e ? (w = "notmodified", c = !0) : (c = A(p, v), w = c.state, d = c.data, y = c.error, c = !y)) : (y = w, (!w || e) && (w = "error", 0 > e && (e = 0))), S.status = e, S.statusText = "" + (i || w), c ? m.resolveWith(h, [d, w, S]) : m.rejectWith(h, [S, w, y]), S.statusCode(_), _ = t, u && f.trigger("ajax" + (c ? "Success" : "Error"), [S, p, c ? d : y]), g.fireWith(h, [S, w]), u && (f.trigger("ajaxComplete", [S, p]), --Z.active || Z.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (i = e, e = t), i = i || {};
            var a, r, o, s, l, c, u, d, p = Z.ajaxSetup({}, i),
                h = p.context || p,
                f = h !== p && (h.nodeType || h instanceof Z) ? Z(h) : Z.event,
                m = Z.Deferred(),
                g = Z.Callbacks("once memory"),
                _ = p.statusCode || {},
                y = {},
                v = {},
                T = 0,
                b = "canceled",
                S = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!T) {
                            var i = e.toLowerCase();
                            e = v[i] = v[i] || e, y[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === T ? r : null
                    },
                    getResponseHeader: function(e) {
                        var i;
                        if (2 === T) {
                            if (!o)
                                for (o = {}; i = Mi.exec(r);) o[i[1].toLowerCase()] = i[2];
                            i = o[e.toLowerCase()]
                        }
                        return i === t ? null : i
                    },
                    overrideMimeType: function(e) {
                        return T || (p.mimeType = e), this
                    },
                    abort: function(e) {
                        return e = e || b, s && s.abort(e), n(0, e), this
                    }
                };
            if (m.promise(S), S.success = S.done, S.error = S.fail, S.complete = g.add, S.statusCode = function(e) {
                    if (e) {
                        var t;
                        if (2 > T)
                            for (t in e) _[t] = [_[t], e[t]];
                        else t = e[S.status], S.always(t)
                    }
                    return this
                }, p.url = ((e || p.url) + "").replace(Ci, "").replace(Ei, ki[1] + "//"), p.dataTypes = Z.trim(p.dataType || "*").toLowerCase().split(tt), null == p.crossDomain && (c = Fi.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] == ki[1] && c[2] == ki[2] && (c[3] || ("http:" === c[1] ? 80 : 443)) == (ki[3] || ("http:" === ki[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = Z.param(p.data, p.traditional)), k(Ii, p, i, S), 2 === T) return S;
            if (u = p.global, p.type = p.type.toUpperCase(), p.hasContent = !xi.test(p.type), u && 0 === Z.active++ && Z.event.trigger("ajaxStart"), !p.hasContent && (p.data && (p.url += (Di.test(p.url) ? "&" : "?") + p.data, delete p.data), a = p.url, p.cache === !1)) {
                var w = Z.now(),
                    $ = p.url.replace(Pi, "$1_=" + w);
                p.url = $ + ($ === p.url ? (Di.test(p.url) ? "&" : "?") + "_=" + w : "")
            }(p.data && p.hasContent && p.contentType !== !1 || i.contentType) && S.setRequestHeader("Content-Type", p.contentType), p.ifModified && (a = a || p.url, Z.lastModified[a] && S.setRequestHeader("If-Modified-Since", Z.lastModified[a]), Z.etag[a] && S.setRequestHeader("If-None-Match", Z.etag[a])), S.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ni + "; q=0.01" : "") : p.accepts["*"]);
            for (d in p.headers) S.setRequestHeader(d, p.headers[d]);
            if (!p.beforeSend || p.beforeSend.call(h, S, p) !== !1 && 2 !== T) {
                b = "abort";
                for (d in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) S[d](p[d]);
                if (s = k(Ri, p, i, S)) {
                    S.readyState = 1, u && f.trigger("ajaxSend", [S, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                        S.abort("timeout")
                    }, p.timeout));
                    try {
                        T = 1, s.send(y, n)
                    } catch (C) {
                        if (!(2 > T)) throw C;
                        n(-1, C)
                    }
                } else n(-1, "No Transport");
                return S
            }
            return S.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Oi = [],
        Ui = /\?/,
        Bi = /(=)\?(?=&|$)|\?\?/,
        Hi = Z.now();
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Oi.pop() || Z.expando + "_" + Hi++;
            return this[e] = !0, e
        }
    }), Z.ajaxPrefilter("json jsonp", function(i, n, a) {
        var r, o, s, l = i.data,
            c = i.url,
            u = i.jsonp !== !1,
            d = u && Bi.test(c),
            p = u && !d && "string" == typeof l && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Bi.test(l);
        return "jsonp" === i.dataTypes[0] || d || p ? (r = i.jsonpCallback = Z.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, o = e[r], d ? i.url = c.replace(Bi, "$1" + r) : p ? i.data = l.replace(Bi, "$1" + r) : u && (i.url += (Ui.test(c) ? "&" : "?") + i.jsonp + "=" + r), i.converters["script json"] = function() {
            return s || Z.error(r + " was not called"), s[0]
        }, i.dataTypes[0] = "json", e[r] = function() {
            s = arguments
        }, a.always(function() {
            e[r] = o, i[r] && (i.jsonpCallback = n.jsonpCallback, Oi.push(r)), s && Z.isFunction(o) && o(s[0]), s = o = t
        }), "script") : void 0
    }), Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return Z.globalEval(e), e
            }
        }
    }), Z.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), Z.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var i, n = U.head || U.getElementsByTagName("head")[0] || U.documentElement;
            return {
                send: function(a, r) {
                    i = U.createElement("script"), i.async = "async", e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(e, a) {
                        (a || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, n && i.parentNode && n.removeChild(i), i = t, a || r(200, "success"))
                    }, n.insertBefore(i, n.firstChild)
                },
                abort: function() {
                    i && i.onload(0, 1)
                }
            }
        }
    });
    var zi, Wi = e.ActiveXObject ? function() {
            for (var e in zi) zi[e](0, 1)
        } : !1,
        Yi = 0;
    Z.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && x() || E()
        } : x,
        function(e) {
            Z.extend(Z.support, {
                ajax: !!e,
                cors: !!e && "withCredentials" in e
            })
        }(Z.ajaxSettings.xhr()), Z.support.ajax && Z.ajaxTransport(function(i) {
            if (!i.crossDomain || Z.support.cors) {
                var n;
                return {
                    send: function(a, r) {
                        var o, s, l = i.xhr();
                        if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                            for (s in i.xhrFields) l[s] = i.xhrFields[s];
                        i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), !i.crossDomain && !a["X-Requested-With"] && (a["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (s in a) l.setRequestHeader(s, a[s])
                        } catch (c) {}
                        l.send(i.hasContent && i.data || null), n = function(e, a) {
                            var s, c, u, d, p;
                            try {
                                if (n && (a || 4 === l.readyState))
                                    if (n = t, o && (l.onreadystatechange = Z.noop, Wi && delete zi[o]), a) 4 !== l.readyState && l.abort();
                                    else {
                                        s = l.status, u = l.getAllResponseHeaders(), d = {}, p = l.responseXML, p && p.documentElement && (d.xml = p);
                                        try {
                                            d.text = l.responseText
                                        } catch (e) {}
                                        try {
                                            c = l.statusText
                                        } catch (h) {
                                            c = ""
                                        }
                                        s || !i.isLocal || i.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (f) {
                                a || r(-1, f)
                            }
                            d && r(s, c, d, u)
                        }, i.async ? 4 === l.readyState ? setTimeout(n, 0) : (o = ++Yi, Wi && (zi || (zi = {}, Z(e).unload(Wi)), zi[o] = n), l.onreadystatechange = n) : n()
                    },
                    abort: function() {
                        n && n(0, 1)
                    }
                }
            }
        });
    var Gi, qi, Ki = /^(?:toggle|show|hide)$/,
        Ji = new RegExp("^(?:([-+])=|)(" + X + ")([a-z%]*)$", "i"),
        Qi = /queueHooks$/,
        Zi = [V],
        Xi = {
            "*": [function(e, t) {
                var i, n, a, r = this.createTween(e, t),
                    o = Ji.exec(t),
                    s = r.cur(),
                    l = +s || 0,
                    c = 1;
                if (o) {
                    if (i = +o[2], n = o[3] || (Z.cssNumber[e] ? "" : "px"), "px" !== n && l) {
                        l = Z.css(r.elem, e, !0) || i || 1;
                        do a = c = c || ".5", l /= c, Z.style(r.elem, e, l + n), c = r.cur() / s; while (1 !== c && c !== a)
                    }
                    r.unit = n, r.start = l, r.end = o[1] ? l + (o[1] + 1) * i : i
                }
                return r
            }]
        };
    Z.Animation = Z.extend(P, {
        tweener: function(e, t) {
            Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var i, n = 0, a = e.length; a > n; n++) i = e[n], Xi[i] = Xi[i] || [], Xi[i].unshift(t)
        },
        prefilter: function(e, t) {
            t ? Zi.unshift(e) : Zi.push(e)
        }
    }), Z.Tween = I, I.prototype = {
        constructor: I,
        init: function(e, t, i, n, a, r) {
            this.elem = e, this.prop = i, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = r || (Z.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function(e) {
            var t, i = I.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, Z.each(["toggle", "show", "hide"], function(e, t) {
        var i = Z.fn[t];
        Z.fn[t] = function(n, a, r) {
            return null == n || "boolean" == typeof n || !e && Z.isFunction(n) && Z.isFunction(a) ? i.apply(this, arguments) : this.animate(R(t, !0), n, a, r)
        }
    }), Z.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(_).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(e, t, i, n) {
            var a = Z.isEmptyObject(e),
                r = Z.speed(t, i, n),
                o = function() {
                    var t = P(this, Z.extend({}, e), r);
                    a && t.stop(!0)
                };
            return a || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
        },
        stop: function(e, i, n) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = i, i = e, e = t), i && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    r = Z.timers,
                    o = Z._data(this);
                if (i) o[i] && o[i].stop && a(o[i]);
                else
                    for (i in o) o[i] && o[i].stop && Qi.test(i) && a(o[i]);
                for (i = r.length; i--;) r[i].elem === this && (null == e || r[i].queue === e) && (r[i].anim.stop(n), t = !1, r.splice(i, 1));
                (t || !n) && Z.dequeue(this, e)
            })
        }
    }), Z.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        Z.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    }), Z.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: i || !i && t || Z.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !Z.isFunction(t) && t
        };
        return n.duration = Z.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in Z.fx.speeds ? Z.fx.speeds[n.duration] : Z.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            Z.isFunction(n.old) && n.old.call(this), n.queue && Z.dequeue(this, n.queue)
        }, n
    }, Z.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, Z.timers = [], Z.fx = I.prototype.init, Z.fx.tick = function() {
        for (var e, t = Z.timers, i = 0; i < t.length; i++) e = t[i], !e() && t[i] === e && t.splice(i--, 1);
        t.length || Z.fx.stop()
    }, Z.fx.timer = function(e) {
        e() && Z.timers.push(e) && !qi && (qi = setInterval(Z.fx.tick, Z.fx.interval))
    }, Z.fx.interval = 13, Z.fx.stop = function() {
        clearInterval(qi), qi = null
    }, Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Z.fx.step = {}, Z.expr && Z.expr.filters && (Z.expr.filters.animated = function(e) {
        return Z.grep(Z.timers, function(t) {
            return e === t.elem
        }).length
    });
    var en = /^(?:body|html)$/i;
    Z.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            Z.offset.setOffset(this, e, t)
        });
        var i, n, a, r, o, s, l, c, u, d, p = this[0],
            h = p && p.ownerDocument;
        if (h) return (a = h.body) === p ? Z.offset.bodyOffset(p) : (n = h.documentElement, Z.contains(n, p) ? (i = p.getBoundingClientRect(), r = N(h), o = n.clientTop || a.clientTop || 0, s = n.clientLeft || a.clientLeft || 0, l = r.pageYOffset || n.scrollTop, c = r.pageXOffset || n.scrollLeft, u = i.top + l - o, d = i.left + c - s, {
            top: u,
            left: d
        }) : {
            top: 0,
            left: 0
        })
    }, Z.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                i = e.offsetLeft;
            return Z.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Z.css(e, "marginTop")) || 0, i += parseFloat(Z.css(e, "marginLeft")) || 0), {
                top: t,
                left: i
            }
        },
        setOffset: function(e, t, i) {
            var n = Z.css(e, "position");
            "static" === n && (e.style.position = "relative");
            var a, r, o = Z(e),
                s = o.offset(),
                l = Z.css(e, "top"),
                c = Z.css(e, "left"),
                u = ("absolute" === n || "fixed" === n) && Z.inArray("auto", [l, c]) > -1,
                d = {},
                p = {};
            u ? (p = o.position(), a = p.top, r = p.left) : (a = parseFloat(l) || 0, r = parseFloat(c) || 0), Z.isFunction(t) && (t = t.call(e, i, s)), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), "using" in t ? t.using.call(e, d) : o.css(d)
        }
    }, Z.fn.extend({
        position: function() {
            if (this[0]) {
                var e = this[0],
                    t = this.offsetParent(),
                    i = this.offset(),
                    n = en.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return i.top -= parseFloat(Z.css(e, "marginTop")) || 0, i.left -= parseFloat(Z.css(e, "marginLeft")) || 0, n.top += parseFloat(Z.css(t[0], "borderTopWidth")) || 0, n.left += parseFloat(Z.css(t[0], "borderLeftWidth")) || 0, {
                    top: i.top - n.top,
                    left: i.left - n.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || U.body; e && !en.test(e.nodeName) && "static" === Z.css(e, "position");) e = e.offsetParent;
                return e || U.body
            })
        }
    }), Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, i) {
        var n = /Y/.test(i);
        Z.fn[e] = function(a) {
            return Z.access(this, function(e, a, r) {
                var o = N(e);
                return r === t ? o ? i in o ? o[i] : o.document.documentElement[a] : e[a] : void(o ? o.scrollTo(n ? Z(o).scrollLeft() : r, n ? r : Z(o).scrollTop()) : e[a] = r)
            }, e, a, arguments.length, null)
        }
    }), Z.each({
        Height: "height",
        Width: "width"
    }, function(e, i) {
        Z.each({
            padding: "inner" + e,
            content: i,
            "": "outer" + e
        }, function(n, a) {
            Z.fn[a] = function(a, r) {
                var o = arguments.length && (n || "boolean" != typeof a),
                    s = n || (a === !0 || r === !0 ? "margin" : "border");
                return Z.access(this, function(i, n, a) {
                    var r;
                    return Z.isWindow(i) ? i.document.documentElement["client" + e] : 9 === i.nodeType ? (r = i.documentElement, Math.max(i.body["scroll" + e], r["scroll" + e], i.body["offset" + e], r["offset" + e], r["client" + e])) : a === t ? Z.css(i, n, a, s) : Z.style(i, n, a, s)
                }, i, o ? a : t, o, null)
            }
        })
    }), e.jQuery = e.$ = Z, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return Z
    })
}(window),
function(e) {
    function t() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function i(e, t) {
        function i() {
            lt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }
        var n = !0;
        return l(function() {
            return n && (i(), n = !1), t.apply(this, arguments)
        }, t)
    }

    function n(e, t) {
        return function(i) {
            return d(e.call(this, i), t)
        }
    }

    function a(e, t) {
        return function(i) {
            return this.lang().ordinal(e.call(this, i), t)
        }
    }

    function r() {}

    function o(e) {
        $(e), l(this, e)
    }

    function s(e) {
        var t = _(e),
            i = t.year || 0,
            n = t.quarter || 0,
            a = t.month || 0,
            r = t.week || 0,
            o = t.day || 0,
            s = t.hour || 0,
            l = t.minute || 0,
            c = t.second || 0,
            u = t.millisecond || 0;
        this._milliseconds = +u + 1e3 * c + 6e4 * l + 36e5 * s, this._days = +o + 7 * r, this._months = +a + 3 * n + 12 * i, this._data = {}, this._bubble()
    }

    function l(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), e
    }

    function c(e) {
        var t, i = {};
        for (t in e) e.hasOwnProperty(t) && St.hasOwnProperty(t) && (i[t] = e[t]);
        return i
    }

    function u(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function d(e, t, i) {
        for (var n = "" + Math.abs(e), a = e >= 0; n.length < t;) n = "0" + n;
        return (a ? i ? "+" : "" : "-") + n
    }

    function p(e, t, i, n) {
        var a = t._milliseconds,
            r = t._days,
            o = t._months;
        n = null == n ? !0 : n, a && e._d.setTime(+e._d + a * i), r && nt(e, "Date", it(e, "Date") + r * i), o && tt(e, it(e, "Month") + o * i), n && lt.updateOffset(e, r || o)
    }

    function h(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function f(e) {
        return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
    }

    function m(e, t, i) {
        var n, a = Math.min(e.length, t.length),
            r = Math.abs(e.length - t.length),
            o = 0;
        for (n = 0; a > n; n++)(i && e[n] !== t[n] || !i && v(e[n]) !== v(t[n])) && o++;
        return o + r
    }

    function g(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = Qt[e] || Zt[t] || t
        }
        return e
    }

    function _(e) {
        var t, i, n = {};
        for (i in e) e.hasOwnProperty(i) && (t = g(i), t && (n[t] = e[i]));
        return n
    }

    function y(t) {
        var i, n;
        if (0 === t.indexOf("week")) i = 7, n = "day";
        else {
            if (0 !== t.indexOf("month")) return;
            i = 12, n = "month"
        }
        lt[t] = function(a, r) {
            var o, s, l = lt.fn._lang[t],
                c = [];
            if ("number" == typeof a && (r = a, a = e), s = function(e) {
                    var t = lt().utc().set(n, e);
                    return l.call(lt.fn._lang, t, a || "")
                }, null != r) return s(r);
            for (o = 0; i > o; o++) c.push(s(o));
            return c
        }
    }

    function v(e) {
        var t = +e,
            i = 0;
        return 0 !== t && isFinite(t) && (i = t >= 0 ? Math.floor(t) : Math.ceil(t)), i
    }

    function T(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }

    function b(e, t, i) {
        return Z(lt([e, 11, 31 + t - i]), t, i).week
    }

    function S(e) {
        return w(e) ? 366 : 365
    }

    function w(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }

    function $(e) {
        var t;
        e._a && -2 === e._pf.overflow && (t = e._a[mt] < 0 || e._a[mt] > 11 ? mt : e._a[gt] < 1 || e._a[gt] > T(e._a[ft], e._a[mt]) ? gt : e._a[_t] < 0 || e._a[_t] > 23 ? _t : e._a[yt] < 0 || e._a[yt] > 59 ? yt : e._a[vt] < 0 || e._a[vt] > 59 ? vt : e._a[Tt] < 0 || e._a[Tt] > 999 ? Tt : -1, e._pf._overflowDayOfYear && (ft > t || t > gt) && (t = gt), e._pf.overflow = t)
    }

    function k(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), e._isValid
    }

    function C(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function M(e, t) {
        return t._isUTC ? lt(e).zone(t._offset || 0) : lt(e).local()
    }

    function A(e, t) {
        return t.abbr = e, bt[e] || (bt[e] = new r), bt[e].set(t), bt[e]
    }

    function x(e) {
        delete bt[e]
    }

    function E(e) {
        var t, i, n, a, r = 0,
            o = function(e) {
                if (!bt[e] && wt) try {
                    require("./lang/" + e)
                } catch (t) {}
                return bt[e]
            };
        if (!e) return lt.fn._lang;
        if (!h(e)) {
            if (i = o(e)) return i;
            e = [e]
        }
        for (; r < e.length;) {
            for (a = C(e[r]).split("-"), t = a.length, n = C(e[r + 1]), n = n ? n.split("-") : null; t > 0;) {
                if (i = o(a.slice(0, t).join("-"))) return i;
                if (n && n.length >= t && m(a, n, !0) >= t - 1) break;
                t--
            }
            r++
        }
        return lt.fn._lang
    }

    function D(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function L(e) {
        var t, i, n = e.match(Mt);
        for (t = 0, i = n.length; i > t; t++) n[t] = ii[n[t]] ? ii[n[t]] : D(n[t]);
        return function(a) {
            var r = "";
            for (t = 0; i > t; t++) r += n[t] instanceof Function ? n[t].call(a, e) : n[t];
            return r
        }
    }

    function P(e, t) {
        return e.isValid() ? (t = F(t, e.lang()), Xt[t] || (Xt[t] = L(t)), Xt[t](e)) : e.lang().invalidDate()
    }

    function F(e, t) {
        function i(e) {
            return t.longDateFormat(e) || e
        }
        var n = 5;
        for (At.lastIndex = 0; n >= 0 && At.test(e);) e = e.replace(At, i), At.lastIndex = 0, n -= 1;
        return e
    }

    function V(e, t) {
        var i, n = t._strict;
        switch (e) {
            case "Q":
                return jt;
            case "DDDD":
                return Ut;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return n ? Bt : Dt;
            case "Y":
            case "G":
            case "g":
                return zt;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return n ? Ht : Lt;
            case "S":
                if (n) return jt;
            case "SS":
                if (n) return Ot;
            case "SSS":
                if (n) return Ut;
            case "DDD":
                return Et;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return Ft;
            case "a":
            case "A":
                return E(t._l)._meridiemParse;
            case "X":
                return Rt;
            case "Z":
            case "ZZ":
                return Vt;
            case "T":
                return It;
            case "SSSS":
                return Pt;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return n ? Ot : xt;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return xt;
            case "Do":
                return Nt;
            default:
                return i = new RegExp(H(B(e.replace("\\", "")), "i"))
        }
    }

    function I(e) {
        e = e || "";
        var t = e.match(Vt) || [],
            i = t[t.length - 1] || [],
            n = (i + "").match(Kt) || ["-", 0, 0],
            a = +(60 * n[1]) + v(n[2]);
        return "+" === n[0] ? -a : a
    }

    function R(e, t, i) {
        var n, a = i._a;
        switch (e) {
            case "Q":
                null != t && (a[mt] = 3 * (v(t) - 1));
                break;
            case "M":
            case "MM":
                null != t && (a[mt] = v(t) - 1);
                break;
            case "MMM":
            case "MMMM":
                n = E(i._l).monthsParse(t), null != n ? a[mt] = n : i._pf.invalidMonth = t;
                break;
            case "D":
            case "DD":
                null != t && (a[gt] = v(t));
                break;
            case "Do":
                null != t && (a[gt] = v(parseInt(t, 10)));
                break;
            case "DDD":
            case "DDDD":
                null != t && (i._dayOfYear = v(t));
                break;
            case "YY":
                a[ft] = lt.parseTwoDigitYear(t);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                a[ft] = v(t);
                break;
            case "a":
            case "A":
                i._isPm = E(i._l).isPM(t);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                a[_t] = v(t);
                break;
            case "m":
            case "mm":
                a[yt] = v(t);
                break;
            case "s":
            case "ss":
                a[vt] = v(t);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                a[Tt] = v(1e3 * ("0." + t));
                break;
            case "X":
                i._d = new Date(1e3 * parseFloat(t));
                break;
            case "Z":
            case "ZZ":
                i._useUTC = !0, i._tzm = I(t);
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "dd":
            case "ddd":
            case "dddd":
            case "e":
            case "E":
                e = e.substr(0, 1);
            case "gg":
            case "gggg":
            case "GG":
            case "GGGG":
            case "GGGGG":
                e = e.substr(0, 2), t && (i._w = i._w || {}, i._w[e] = t)
        }
    }

    function N(e) {
        var t, i, n, a, r, o, s, l, c, u, d = [];
        if (!e._d) {
            for (n = O(e), e._w && null == e._a[gt] && null == e._a[mt] && (r = function(t) {
                    var i = parseInt(t, 10);
                    return t ? t.length < 3 ? i > 68 ? 1900 + i : 2e3 + i : i : null == e._a[ft] ? lt().weekYear() : e._a[ft]
                }, o = e._w, null != o.GG || null != o.W || null != o.E ? s = X(r(o.GG), o.W || 1, o.E, 4, 1) : (l = E(e._l), c = null != o.d ? K(o.d, l) : null != o.e ? parseInt(o.e, 10) + l._week.dow : 0, u = parseInt(o.w, 10) || 1, null != o.d && c < l._week.dow && u++, s = X(r(o.gg), u, c, l._week.doy, l._week.dow)), e._a[ft] = s.year, e._dayOfYear = s.dayOfYear), e._dayOfYear && (a = null == e._a[ft] ? n[ft] : e._a[ft], e._dayOfYear > S(a) && (e._pf._overflowDayOfYear = !0), i = q(a, 0, e._dayOfYear), e._a[mt] = i.getUTCMonth(), e._a[gt] = i.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = d[t] = n[t];
            for (; 7 > t; t++) e._a[t] = d[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            d[_t] += v((e._tzm || 0) / 60), d[yt] += v((e._tzm || 0) % 60), e._d = (e._useUTC ? q : G).apply(null, d)
        }
    }

    function j(e) {
        var t;
        e._d || (t = _(e._i), e._a = [t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond], N(e))
    }

    function O(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }

    function U(e) {
        e._a = [], e._pf.empty = !0;
        var t, i, n, a, r, o = E(e._l),
            s = "" + e._i,
            l = s.length,
            c = 0;
        for (n = F(e._f, o).match(Mt) || [], t = 0; t < n.length; t++) a = n[t], i = (s.match(V(a, e)) || [])[0], i && (r = s.substr(0, s.indexOf(i)), r.length > 0 && e._pf.unusedInput.push(r), s = s.slice(s.indexOf(i) + i.length), c += i.length), ii[a] ? (i ? e._pf.empty = !1 : e._pf.unusedTokens.push(a), R(a, i, e)) : e._strict && !i && e._pf.unusedTokens.push(a);
        e._pf.charsLeftOver = l - c, s.length > 0 && e._pf.unusedInput.push(s), e._isPm && e._a[_t] < 12 && (e._a[_t] += 12), e._isPm === !1 && 12 === e._a[_t] && (e._a[_t] = 0), N(e), $(e)
    }

    function B(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, n, a) {
            return t || i || n || a
        })
    }

    function H(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function z(e) {
        var i, n, a, r, o;
        if (0 === e._f.length) return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
        for (r = 0; r < e._f.length; r++) o = 0, i = l({}, e), i._pf = t(), i._f = e._f[r], U(i), k(i) && (o += i._pf.charsLeftOver, o += 10 * i._pf.unusedTokens.length, i._pf.score = o, (null == a || a > o) && (a = o, n = i));
        l(e, n || i)
    }

    function W(e) {
        var t, i, n = e._i,
            a = Wt.exec(n);
        if (a) {
            for (e._pf.iso = !0, t = 0, i = Gt.length; i > t; t++)
                if (Gt[t][1].exec(n)) {
                    e._f = Gt[t][0] + (a[6] || " ");
                    break
                }
            for (t = 0, i = qt.length; i > t; t++)
                if (qt[t][1].exec(n)) {
                    e._f += qt[t][0];
                    break
                }
            n.match(Vt) && (e._f += "Z"), U(e)
        } else lt.createFromInputFallback(e)
    }

    function Y(t) {
        var i = t._i,
            n = $t.exec(i);
        i === e ? t._d = new Date : n ? t._d = new Date(+n[1]) : "string" == typeof i ? W(t) : h(i) ? (t._a = i.slice(0), N(t)) : f(i) ? t._d = new Date(+i) : "object" == typeof i ? j(t) : "number" == typeof i ? t._d = new Date(i) : lt.createFromInputFallback(t)
    }

    function G(e, t, i, n, a, r, o) {
        var s = new Date(e, t, i, n, a, r, o);
        return 1970 > e && s.setFullYear(e), s
    }

    function q(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return 1970 > e && t.setUTCFullYear(e), t
    }

    function K(e, t) {
        if ("string" == typeof e)
            if (isNaN(e)) {
                if (e = t.weekdaysParse(e), "number" != typeof e) return null
            } else e = parseInt(e, 10);
        return e
    }

    function J(e, t, i, n, a) {
        return a.relativeTime(t || 1, !!i, e, n)
    }

    function Q(e, t, i) {
        var n = ht(Math.abs(e) / 1e3),
            a = ht(n / 60),
            r = ht(a / 60),
            o = ht(r / 24),
            s = ht(o / 365),
            l = 45 > n && ["s", n] || 1 === a && ["m"] || 45 > a && ["mm", a] || 1 === r && ["h"] || 22 > r && ["hh", r] || 1 === o && ["d"] || 25 >= o && ["dd", o] || 45 >= o && ["M"] || 345 > o && ["MM", ht(o / 30)] || 1 === s && ["y"] || ["yy", s];
        return l[2] = t, l[3] = e > 0, l[4] = i, J.apply({}, l)
    }

    function Z(e, t, i) {
        var n, a = i - t,
            r = i - e.day();
        return r > a && (r -= 7), a - 7 > r && (r += 7), n = lt(e).add("d", r), {
            week: Math.ceil(n.dayOfYear() / 7),
            year: n.year()
        }
    }

    function X(e, t, i, n, a) {
        var r, o, s = q(e, 0, 1).getUTCDay();
        return i = null != i ? i : a, r = a - s + (s > n ? 7 : 0) - (a > s ? 7 : 0), o = 7 * (t - 1) + (i - a) + r + 1, {
            year: o > 0 ? e : e - 1,
            dayOfYear: o > 0 ? o : S(e - 1) + o
        }
    }

    function et(t) {
        var i = t._i,
            n = t._f;
        return null === i || n === e && "" === i ? lt.invalid({
            nullInput: !0
        }) : ("string" == typeof i && (t._i = i = E().preparse(i)), lt.isMoment(i) ? (t = c(i), t._d = new Date(+i._d)) : n ? h(n) ? z(t) : U(t) : Y(t), new o(t))
    }

    function tt(e, t) {
        var i;
        return "string" == typeof t && (t = e.lang().monthsParse(t), "number" != typeof t) ? e : (i = Math.min(e.date(), T(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, i), e)
    }

    function it(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
    }

    function nt(e, t, i) {
        return "Month" === t ? tt(e, i) : e._d["set" + (e._isUTC ? "UTC" : "") + t](i)
    }

    function at(e, t) {
        return function(i) {
            return null != i ? (nt(this, e, i), lt.updateOffset(this, t), this) : it(this, e)
        }
    }

    function rt(e) {
        lt.duration.fn[e] = function() {
            return this._data[e]
        }
    }

    function ot(e, t) {
        lt.duration.fn["as" + e] = function() {
            return +this / t
        }
    }

    function st(e) {
        "undefined" == typeof ender && (ct = pt.moment, pt.moment = e ? i("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", lt) : lt)
    }
    for (var lt, ct, ut, dt = "2.6.0", pt = "undefined" != typeof global ? global : this, ht = Math.round, ft = 0, mt = 1, gt = 2, _t = 3, yt = 4, vt = 5, Tt = 6, bt = {}, St = {
            _isAMomentObject: null,
            _i: null,
            _f: null,
            _l: null,
            _strict: null,
            _isUTC: null,
            _offset: null,
            _pf: null,
            _lang: null
        }, wt = "undefined" != typeof module && module.exports, $t = /^\/?Date\((\-?\d+)/i, kt = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ct = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Mt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, At = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, xt = /\d\d?/, Et = /\d{1,3}/, Dt = /\d{1,4}/, Lt = /[+\-]?\d{1,6}/, Pt = /\d+/, Ft = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Vt = /Z|[\+\-]\d\d:?\d\d/gi, It = /T/i, Rt = /[\+\-]?\d+(\.\d{1,3})?/, Nt = /\d{1,2}/, jt = /\d/, Ot = /\d\d/, Ut = /\d{3}/, Bt = /\d{4}/, Ht = /[+-]?\d{6}/, zt = /[+-]?\d+/, Wt = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Yt = "YYYY-MM-DDTHH:mm:ssZ", Gt = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ], qt = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ], Kt = /([\+\-]|\d\d)/gi, Jt = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        }), Qt = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            Q: "quarter",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        }, Zt = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        }, Xt = {}, ei = "DDD w W M D d".split(" "), ti = "M D H h m s w W".split(" "), ii = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(e) {
                return this.lang().monthsShort(this, e)
            },
            MMMM: function(e) {
                return this.lang().months(this, e)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(e) {
                return this.lang().weekdaysMin(this, e)
            },
            ddd: function(e) {
                return this.lang().weekdaysShort(this, e)
            },
            dddd: function(e) {
                return this.lang().weekdays(this, e)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return d(this.year() % 100, 2)
            },
            YYYY: function() {
                return d(this.year(), 4)
            },
            YYYYY: function() {
                return d(this.year(), 5)
            },
            YYYYYY: function() {
                var e = this.year(),
                    t = e >= 0 ? "+" : "-";
                return t + d(Math.abs(e), 6)
            },
            gg: function() {
                return d(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return d(this.weekYear(), 4)
            },
            ggggg: function() {
                return d(this.weekYear(), 5)
            },
            GG: function() {
                return d(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return d(this.isoWeekYear(), 4)
            },
            GGGGG: function() {
                return d(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return v(this.milliseconds() / 100)
            },
            SS: function() {
                return d(v(this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return d(this.milliseconds(), 3)
            },
            SSSS: function() {
                return d(this.milliseconds(), 3)
            },
            Z: function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + d(v(e / 60), 2) + ":" + d(v(e) % 60, 2)
            },
            ZZ: function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + d(v(e / 60), 2) + d(v(e) % 60, 2)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            X: function() {
                return this.unix()
            },
            Q: function() {
                return this.quarter()
            }
        }, ni = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; ei.length;) ut = ei.pop(), ii[ut + "o"] = a(ii[ut], ut);
    for (; ti.length;) ut = ti.pop(), ii[ut + ut] = n(ii[ut], 2);
    for (ii.DDDD = n(ii.DDD, 3), l(r.prototype, {
            set: function(e) {
                var t, i;
                for (i in e) t = e[i], "function" == typeof t ? this[i] = t : this["_" + i] = t
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function(e) {
                return this._months[e.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function(e) {
                return this._monthsShort[e.month()]
            },
            monthsParse: function(e) {
                var t, i, n;
                for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)
                    if (this._monthsParse[t] || (i = lt.utc([2e3, t]), n = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[t] = new RegExp(n.replace(".", ""), "i")), this._monthsParse[t].test(e)) return t
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function(e) {
                return this._weekdays[e.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function(e) {
                return this._weekdaysShort[e.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function(e) {
                return this._weekdaysMin[e.day()]
            },
            weekdaysParse: function(e) {
                var t, i, n;
                for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)
                    if (this._weekdaysParse[t] || (i = lt([2e3, 1]).day(t), n = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[t] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D YYYY",
                LLL: "MMMM D YYYY LT",
                LLLL: "dddd, MMMM D YYYY LT"
            },
            longDateFormat: function(e) {
                var t = this._longDateFormat[e];
                return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                    return e.slice(1)
                }), this._longDateFormat[e] = t), t
            },
            isPM: function(e) {
                return "p" === (e + "").toLowerCase().charAt(0)
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(e, t, i) {
                return e > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(e, t) {
                var i = this._calendar[e];
                return "function" == typeof i ? i.apply(t) : i
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(e, t, i, n) {
                var a = this._relativeTime[i];
                return "function" == typeof a ? a(e, t, i, n) : a.replace(/%d/i, e)
            },
            pastFuture: function(e, t) {
                var i = this._relativeTime[e > 0 ? "future" : "past"];
                return "function" == typeof i ? i(t) : i.replace(/%s/i, t)
            },
            ordinal: function(e) {
                return this._ordinal.replace("%d", e)
            },
            _ordinal: "%d",
            preparse: function(e) {
                return e
            },
            postformat: function(e) {
                return e
            },
            week: function(e) {
                return Z(e, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            },
            _invalidDate: "Invalid date",
            invalidDate: function() {
                return this._invalidDate
            }
        }), lt = function(i, n, a, r) {
            var o;
            return "boolean" == typeof a && (r = a, a = e), o = {}, o._isAMomentObject = !0, o._i = i, o._f = n, o._l = a, o._strict = r, o._isUTC = !1, o._pf = t(), et(o)
        }, lt.suppressDeprecationWarnings = !1, lt.createFromInputFallback = i("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
            e._d = new Date(e._i)
        }), lt.utc = function(i, n, a, r) {
            var o;
            return "boolean" == typeof a && (r = a, a = e), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = a, o._i = i, o._f = n, o._strict = r, o._pf = t(), et(o).utc()
        }, lt.unix = function(e) {
            return lt(1e3 * e)
        }, lt.duration = function(e, t) {
            var i, n, a, r = e,
                o = null;
            return lt.isDuration(e) ? r = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            } : "number" == typeof e ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (o = kt.exec(e)) ? (i = "-" === o[1] ? -1 : 1, r = {
                y: 0,
                d: v(o[gt]) * i,
                h: v(o[_t]) * i,
                m: v(o[yt]) * i,
                s: v(o[vt]) * i,
                ms: v(o[Tt]) * i
            }) : (o = Ct.exec(e)) && (i = "-" === o[1] ? -1 : 1, a = function(e) {
                var t = e && parseFloat(e.replace(",", "."));
                return (isNaN(t) ? 0 : t) * i
            }, r = {
                y: a(o[2]),
                M: a(o[3]),
                d: a(o[4]),
                h: a(o[5]),
                m: a(o[6]),
                s: a(o[7]),
                w: a(o[8])
            }), n = new s(r), lt.isDuration(e) && e.hasOwnProperty("_lang") && (n._lang = e._lang), n
        }, lt.version = dt, lt.defaultFormat = Yt, lt.momentProperties = St, lt.updateOffset = function() {}, lt.lang = function(e, t) {
            var i;
            return e ? (t ? A(C(e), t) : null === t ? (x(e), e = "en") : bt[e] || E(e), i = lt.duration.fn._lang = lt.fn._lang = E(e), i._abbr) : lt.fn._lang._abbr
        }, lt.langData = function(e) {
            return e && e._lang && e._lang._abbr && (e = e._lang._abbr), E(e)
        }, lt.isMoment = function(e) {
            return e instanceof o || null != e && e.hasOwnProperty("_isAMomentObject")
        }, lt.isDuration = function(e) {
            return e instanceof s
        }, ut = ni.length - 1; ut >= 0; --ut) y(ni[ut]);
    lt.normalizeUnits = function(e) {
        return g(e)
    }, lt.invalid = function(e) {
        var t = lt.utc(0 / 0);
        return null != e ? l(t._pf, e) : t._pf.userInvalidated = !0, t
    }, lt.parseZone = function() {
        return lt.apply(null, arguments).parseZone()
    }, lt.parseTwoDigitYear = function(e) {
        return v(e) + (v(e) > 68 ? 1900 : 2e3)
    }, l(lt.fn = o.prototype, {
        clone: function() {
            return lt(this)
        },
        valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0)
        },
        unix: function() {
            return Math.floor(+this / 1e3)
        },
        toString: function() {
            return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function() {
            var e = lt(this).utc();
            return 0 < e.year() && e.year() <= 9999 ? P(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : P(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
        },
        isValid: function() {
            return k(this)
        },
        isDSTShifted: function() {
            return this._a ? this.isValid() && m(this._a, (this._isUTC ? lt.utc(this._a) : lt(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function() {
            return l({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function() {
            return this.zone(0)
        },
        local: function() {
            return this.zone(0), this._isUTC = !1, this
        },
        format: function(e) {
            var t = P(this, e || lt.defaultFormat);
            return this.lang().postformat(t)
        },
        add: function(e, t) {
            var i;
            return i = "string" == typeof e ? lt.duration(+t, e) : lt.duration(e, t), p(this, i, 1), this
        },
        subtract: function(e, t) {
            var i;
            return i = "string" == typeof e ? lt.duration(+t, e) : lt.duration(e, t), p(this, i, -1), this
        },
        diff: function(e, t, i) {
            var n, a, r = M(e, this),
                o = 6e4 * (this.zone() - r.zone());
            return t = g(t), "year" === t || "month" === t ? (n = 432e5 * (this.daysInMonth() + r.daysInMonth()), a = 12 * (this.year() - r.year()) + (this.month() - r.month()), a += (this - lt(this).startOf("month") - (r - lt(r).startOf("month"))) / n, a -= 6e4 * (this.zone() - lt(this).startOf("month").zone() - (r.zone() - lt(r).startOf("month").zone())) / n, "year" === t && (a /= 12)) : (n = this - r, a = "second" === t ? n / 1e3 : "minute" === t ? n / 6e4 : "hour" === t ? n / 36e5 : "day" === t ? (n - o) / 864e5 : "week" === t ? (n - o) / 6048e5 : n), i ? a : u(a)
        },
        from: function(e, t) {
            return lt.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
        },
        fromNow: function(e) {
            return this.from(lt(), e)
        },
        calendar: function() {
            var e = M(lt(), this).startOf("day"),
                t = this.diff(e, "days", !0),
                i = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(i, this))
        },
        isLeapYear: function() {
            return w(this.year())
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = K(e, this.lang()), this.add({
                d: e - t
            })) : t
        },
        month: at("Month", !0),
        startOf: function(e) {
            switch (e = g(e)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
        },
        endOf: function(e) {
            return e = g(e), this.startOf(e).add("isoWeek" === e ? "week" : e, 1).subtract("ms", 1)
        },
        isAfter: function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +lt(e).startOf(t)
        },
        isBefore: function(e, t) {
            return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +lt(e).startOf(t)
        },
        isSame: function(e, t) {
            return t = t || "ms", +this.clone().startOf(t) === +M(e, this).startOf(t)
        },
        min: function(e) {
            return e = lt.apply(null, arguments), this > e ? this : e
        },
        max: function(e) {
            return e = lt.apply(null, arguments), e > this ? this : e
        },
        zone: function(e, t) {
            var i = this._offset || 0;
            return null == e ? this._isUTC ? i : this._d.getTimezoneOffset() : ("string" == typeof e && (e = I(e)), Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, i !== e && (!t || this._changeInProgress ? p(this, lt.duration(i - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, lt.updateOffset(this, !0), this._changeInProgress = null)), this)
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
        },
        hasAlignedHourOffset: function(e) {
            return e = e ? lt(e).zone() : 0, (this.zone() - e) % 60 === 0
        },
        daysInMonth: function() {
            return T(this.year(), this.month())
        },
        dayOfYear: function(e) {
            var t = ht((lt(this).startOf("day") - lt(this).startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add("d", e - t)
        },
        quarter: function(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        },
        weekYear: function(e) {
            var t = Z(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return null == e ? t : this.add("y", e - t)
        },
        isoWeekYear: function(e) {
            var t = Z(this, 1, 4).year;
            return null == e ? t : this.add("y", e - t)
        },
        week: function(e) {
            var t = this.lang().week(this);
            return null == e ? t : this.add("d", 7 * (e - t))
        },
        isoWeek: function(e) {
            var t = Z(this, 1, 4).week;
            return null == e ? t : this.add("d", 7 * (e - t))
        },
        weekday: function(e) {
            var t = (this.day() + 7 - this.lang()._week.dow) % 7;
            return null == e ? t : this.add("d", e - t)
        },
        isoWeekday: function(e) {
            return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
        },
        isoWeeksInYear: function() {
            return b(this.year(), 1, 4)
        },
        weeksInYear: function() {
            var e = this._lang._week;
            return b(this.year(), e.dow, e.doy)
        },
        get: function(e) {
            return e = g(e), this[e]()
        },
        set: function(e, t) {
            return e = g(e), "function" == typeof this[e] && this[e](t), this
        },
        lang: function(t) {
            return t === e ? this._lang : (this._lang = E(t), this)
        }
    }), lt.fn.millisecond = lt.fn.milliseconds = at("Milliseconds", !1), lt.fn.second = lt.fn.seconds = at("Seconds", !1), lt.fn.minute = lt.fn.minutes = at("Minutes", !1), lt.fn.hour = lt.fn.hours = at("Hours", !0), lt.fn.date = at("Date", !0), lt.fn.dates = i("dates accessor is deprecated. Use date instead.", at("Date", !0)), lt.fn.year = at("FullYear", !0), lt.fn.years = i("years accessor is deprecated. Use year instead.", at("FullYear", !0)), lt.fn.days = lt.fn.day, lt.fn.months = lt.fn.month, lt.fn.weeks = lt.fn.week, lt.fn.isoWeeks = lt.fn.isoWeek, lt.fn.quarters = lt.fn.quarter, lt.fn.toJSON = lt.fn.toISOString, l(lt.duration.fn = s.prototype, {
        _bubble: function() {
            var e, t, i, n, a = this._milliseconds,
                r = this._days,
                o = this._months,
                s = this._data;
            s.milliseconds = a % 1e3, e = u(a / 1e3), s.seconds = e % 60, t = u(e / 60), s.minutes = t % 60, i = u(t / 60), s.hours = i % 24, r += u(i / 24), s.days = r % 30, o += u(r / 30), s.months = o % 12, n = u(o / 12), s.years = n
        },
        weeks: function() {
            return u(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12)
        },
        humanize: function(e) {
            var t = +this,
                i = Q(t, !e, this.lang());
            return e && (i = this.lang().pastFuture(t, i)), this.lang().postformat(i)
        },
        add: function(e, t) {
            var i = lt.duration(e, t);
            return this._milliseconds += i._milliseconds, this._days += i._days, this._months += i._months, this._bubble(), this
        },
        subtract: function(e, t) {
            var i = lt.duration(e, t);
            return this._milliseconds -= i._milliseconds, this._days -= i._days, this._months -= i._months, this._bubble(), this
        },
        get: function(e) {
            return e = g(e), this[e.toLowerCase() + "s"]()
        },
        as: function(e) {
            return e = g(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
        },
        lang: lt.fn.lang,
        toIsoString: function() {
            var e = Math.abs(this.years()),
                t = Math.abs(this.months()),
                i = Math.abs(this.days()),
                n = Math.abs(this.hours()),
                a = Math.abs(this.minutes()),
                r = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (i ? i + "D" : "") + (n || a || r ? "T" : "") + (n ? n + "H" : "") + (a ? a + "M" : "") + (r ? r + "S" : "") : "P0D"
        }
    });
    for (ut in Jt) Jt.hasOwnProperty(ut) && (ot(ut, Jt[ut]), rt(ut.toLowerCase()));
    ot("Weeks", 6048e5), lt.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, lt.lang("en", {
        ordinal: function(e) {
            var t = e % 10,
                i = 1 === v(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + i
        }
    }), wt ? module.exports = lt : "function" == typeof define && define.amd ? (define("moment", function(e, t, i) {
        return i.config && i.config() && i.config().noGlobal === !0 && (pt.moment = ct), lt
    }), st(!0)) : st()
}.call(this),
    function() {
        function e(e) {
            function i(e) {
                e += "";
                var t = e.split(":"),
                    i = ~e.indexOf("-") ? -1 : 1,
                    n = Math.abs(+t[0]),
                    a = parseInt(t[1], 10) || 0,
                    r = parseInt(t[2], 10) || 0;
                return i * (60 * n + a + r / 60)
            }

            function n(e, t, n, a, r, o, s, l, c, u) {
                this.name = e, this.startYear = +t, this.endYear = +n, this.month = +a, this.day = +r, this.dayRule = +o, this.time = i(s), this.timeRule = +l, this.offset = i(c), this.letters = u || ""
            }

            function a(e, t) {
                this.rule = t, this.start = t.start(e)
            }

            function r(e, t) {
                return e.isLast ? -1 : t.isLast ? 1 : t.start - e.start
            }

            function o(e) {
                this.name = e, this.rules = []
            }

            function s(t, n, a, r, o, s) {
                var l, c = "string" == typeof o ? o.split("_") : [9999];
                for (this.name = t, this.offset = i(n), this.ruleSet = a, this.letters = r, l = 0; l < c.length; l++) c[l] = +c[l];
                this.until = e.utc(c).subtract("m", i(s))
            }

            function l(e, t) {
                return e.until - t.until
            }

            function c(e) {
                this.name = p(e), this.displayName = e, this.zones = []
            }

            function u(e) {
                var t, i, n;
                for (t in e)
                    for (n = e[t], i = 0; i < n.length; i++) d(t + "	" + n[i])
            }

            function d(e) {
                if (w[e]) return w[e];
                var t = e.split(/\s/),
                    i = p(t[0]),
                    a = new n(i, t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10]);
                return w[e] = a, g(i).add(a), a
            }

            function p(e) {
                return (e || "").toLowerCase().replace(/\//g, "_")
            }

            function h(e) {
                var t, i, n;
                for (t in e)
                    for (n = e[t], i = 0; i < n.length; i++) m(t + "	" + n[i])
            }

            function f(e) {
                var t;
                for (t in e) M[p(t)] = p(e[t])
            }

            function m(e) {
                if (k[e]) return k[e];
                var t = e.split(/\s/),
                    i = p(t[0]),
                    n = new s(i, t[1], g(t[2]), t[3], t[4], t[5]);
                return k[e] = n, _(t[0]).add(n), n
            }

            function g(e) {
                return e = p(e), $[e] || ($[e] = new o(e)), $[e]
            }

            function _(e) {
                var t = p(e);
                return M[t] && (t = M[t]), C[t] || (C[t] = new c(e)), C[t]
            }

            function y(e) {
                e && (e.zones && h(e.zones), e.rules && u(e.rules), e.links && f(e.links))
            }

            function v() {
                var e, t = [];
                for (e in C) t.push(C[e]);
                return t
            }
            var T, b = e.fn.zoneName,
                S = e.fn.zoneAbbr,
                w = {},
                $ = {},
                k = {},
                C = {},
                M = {},
                A = 1,
                x = 2,
                E = 7,
                D = 8;
            return n.prototype = {
                contains: function(e) {
                    return e >= this.startYear && e <= this.endYear
                },
                start: function(t) {
                    return t = Math.min(Math.max(t, this.startYear), this.endYear), e.utc([t, this.month, this.date(t), 0, this.time])
                },
                date: function(e) {
                    return this.dayRule === E ? this.day : this.dayRule === D ? this.lastWeekday(e) : this.weekdayAfter(e)
                },
                weekdayAfter: function(t) {
                    for (var i = this.day, n = e([t, this.month, 1]).day(), a = this.dayRule + 1 - n; i > a;) a += 7;
                    return a
                },
                lastWeekday: function(t) {
                    var i = this.day,
                        n = i % 7,
                        a = e([t, this.month + 1, 1]).day(),
                        r = e([t, this.month, 1]).daysInMonth(),
                        o = r + (n - (a - 1)) - 7 * ~~(i / 7);
                    return n >= a && (o -= 7), o
                }
            }, a.prototype = {
                equals: function(e) {
                    return e && e.rule === this.rule ? Math.abs(e.start - this.start) < 864e5 : !1
                }
            }, o.prototype = {
                add: function(e) {
                    this.rules.push(e)
                },
                ruleYears: function(e, t) {
                    var i, n, o, s = e.year(),
                        l = [];
                    for (i = 0; i < this.rules.length; i++) n = this.rules[i], n.contains(s) ? l.push(new a(s, n)) : n.contains(s + 1) && l.push(new a(s + 1, n));
                    return l.push(new a(s - 1, this.lastYearRule(s - 1))), t && (o = new a(s - 1, t.lastRule()), o.start = t.until.clone().utc(), o.isLast = t.ruleSet !== this, l.push(o)), l.sort(r), l
                },
                rule: function(e, t, i) {
                    var n, a, r, o, s, l = this.ruleYears(e, i),
                        c = 0;
                    for (i && (a = i.offset + i.lastRule().offset, r = 9e4 * Math.abs(a)), s = l.length - 1; s > -1; s--) o = n, n = l[s], n.equals(o) || (i && !n.isLast && Math.abs(n.start - i.until) <= r && (c += a - t), n.rule.timeRule === x && (c = t), n.rule.timeRule !== A && n.start.add("m", -c), c = n.rule.offset + t);
                    for (s = 0; s < l.length; s++)
                        if (n = l[s], e >= n.start && !n.isLast) return n.rule;
                    return T
                },
                lastYearRule: function(e) {
                    var t, i, n, a = T,
                        r = -1e30;
                    for (t = 0; t < this.rules.length; t++) i = this.rules[t], e >= i.startYear && (n = i.start(e), n > r && (r = n, a = i));
                    return a
                }
            }, s.prototype = {
                rule: function(e, t) {
                    return this.ruleSet.rule(e, this.offset, t)
                },
                lastRule: function() {
                    return this._lastRule || (this._lastRule = this.rule(this.until)), this._lastRule
                },
                format: function(e) {
                    return this.letters.replace("%s", e.letters)
                }
            }, c.prototype = {
                zoneAndRule: function(e) {
                    var t, i, n;
                    for (e = e.clone().utc(), t = 0; t < this.zones.length && (i = this.zones[t], !(e < i.until)); t++) n = i;
                    return [i, i.rule(e, n)]
                },
                add: function(e) {
                    this.zones.push(e), this.zones.sort(l)
                },
                format: function(e) {
                    var t = this.zoneAndRule(e);
                    return t[0].format(t[1])
                },
                offset: function(e) {
                    var t = this.zoneAndRule(e);
                    return -(t[0].offset + t[1].offset)
                }
            }, e.updateOffset = function(e) {
                var t;
                e._z && (t = e._z.offset(e), Math.abs(t) < 16 && (t /= 60), e.zone(t))
            }, e.fn.tz = function(t) {
                return t ? (this._z = _(t), this._z && e.updateOffset(this), this) : this._z ? this._z.displayName : void 0
            }, e.fn.zoneName = function() {
                return this._z ? this._z.format(this) : b.call(this)
            }, e.fn.zoneAbbr = function() {
                return this._z ? this._z.format(this) : S.call(this)
            }, e.tz = function() {
                var t, i = [],
                    n = arguments.length - 1;
                for (t = 0; n > t; t++) i[t] = arguments[t];
                var a = e.apply(null, i),
                    r = a.zone();
                return a.tz(arguments[n]), a.add("minutes", a.zone() - r)
            }, e.tz.add = y, e.tz.addRule = d, e.tz.addZone = m, e.tz.zones = v, e.tz.version = t, T = d("- 0 9999 0 0 0 0 0 0"), e
        }
        var t = "0.0.3";
        "function" == typeof define && define.amd ? define("moment-timezone", ["moment"], e) : "undefined" != typeof window && window.moment ? e(window.moment) : "undefined" != typeof module && (module.exports = e(require("moment")))
    }.apply(this), ! function(e, t, i, n) {
        function a(e) {
            for (var t = -1, i = e ? e.length : 0, n = []; ++t < i;) {
                var a = e[t];
                a && n.push(a)
            }
            return n
        }

        function r(e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }

        function o(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            var t = Object.prototype.toString.call(e);
            return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(t) && e.length !== n && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
        }

        function l(e, t, i, n) {
            function a(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function r(e, t) {
                return 3 * t - 6 * e
            }

            function o(e) {
                return 3 * e
            }

            function s(e, t, i) {
                return ((a(t, i) * e + r(t, i)) * e + o(t)) * e
            }

            function l(e, t, i) {
                return 3 * a(t, i) * e * e + 2 * r(t, i) * e + o(t)
            }

            function c(t) {
                for (var n = t, a = 0; 8 > a; ++a) {
                    var r = l(n, e, i);
                    if (0 === r) return n;
                    var o = s(n, e, i) - t;
                    n -= o / r
                }
                return n
            }
            if (4 !== arguments.length) return !1;
            for (var u = 0; 4 > u; ++u)
                if ("number" != typeof arguments[u] || isNaN(arguments[u]) || !isFinite(arguments[u])) return !1;
            e = Math.min(e, 1), i = Math.min(i, 1), e = Math.max(e, 0), i = Math.max(i, 0);
            var d = function(a) {
                return e === t && i === n ? a : s(c(a), t, n)
            };
            return d
        }

        function c(e) {
            if (e)
                for (var t = (new Date).getTime(), i = 0, a = m.State.calls.length; a > i; i++)
                    if (m.State.calls[i]) {
                        var r = m.State.calls[i],
                            o = r[0],
                            s = r[2],
                            l = r[3];
                        l || (l = m.State.calls[i][3] = t - 16);
                        for (var p = Math.min((t - l) / s.duration, 1), _ = 0, y = o.length; y > _; _++) {
                            var v = o[_],
                                T = v.element;
                            if (f.data(T, d)) {
                                var b = !1;
                                s.display && "none" !== s.display && g.setPropertyValue(T, "display", s.display);
                                for (var S in v)
                                    if ("element" !== S) {
                                        var w, $ = v[S],
                                            k = "string" == typeof $.easing ? m.Easings[$.easing] : $.easing;
                                        if (w = 1 === p ? $.endValue : $.startValue + ($.endValue - $.startValue) * k(p), $.currentValue = w, g.Hooks.registered[S]) {
                                            var C = g.Hooks.getRoot(S),
                                                M = f.data(T, d).rootPropertyValueCache[C];
                                            M && ($.rootPropertyValue = M)
                                        }
                                        var A = g.setPropertyValue(T, S, $.currentValue + (0 === parseFloat(w) ? "" : $.unitType), $.rootPropertyValue, $.scrollData);
                                        g.Hooks.registered[S] && (f.data(T, d).rootPropertyValueCache[C] = g.Normalizations.registered[C] ? g.Normalizations.registered[C]("extract", null, A[1]) : A[1]), "transform" === A[0] && (b = !0)
                                    }
                                s.mobileHA && f.data(T, d).transformCache.translate3d === n && (f.data(T, d).transformCache.translate3d = "(0, 0, 0)", b = !0), b && g.flushTransformCache(T)
                            }
                        }
                        s.display && "none" !== s.display && (m.State.calls[i][2].display = !1), 1 === p && u(i)
                    }
            m.State.isTicking && h(c)
        }

        function u(e) {
            for (var t = m.State.calls[e][0], i = m.State.calls[e][1], a = m.State.calls[e][2], r = !1, o = 0, s = t.length; s > o; o++) {
                var l = t[o].element;
                if ("none" !== a.display || a.loop || g.setPropertyValue(l, "display", a.display), f.queue(l)[1] !== n && /\.velocityQueueEntryFlag/i.test(f.queue(l)[1]) || f.data(l, d) && (f.data(l, d).isAnimating = !1, f.data(l, d).rootPropertyValueCache = {}, a.mobileHA && !m.State.isGingerbread && (delete f.data(l, d).transformCache.translate3d, g.flushTransformCache(l))), o === s - 1 && !a.loop && a.complete) {
                    var c = i.jquery ? i.get() : i;
                    a.complete.call(c, c)
                }
                a.queue !== !1 && f.dequeue(l, a.queue)
            }
            m.State.calls[e] = !1;
            for (var u = 0, p = m.State.calls.length; p > u; u++)
                if (m.State.calls[u] !== !1) {
                    r = !0;
                    break
                }
            r === !1 && (m.State.isTicking = !1, delete m.State.calls, m.State.calls = [])
        }
        var d = "velocity",
            p = function() {
                if (i.documentMode) return i.documentMode;
                for (var e = 7; e > 4; e--) {
                    var t = i.createElement("div");
                    if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                }
                return n
            }(),
            h = t.requestAnimationFrame || function() {
                var e = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                    var i, n = (new Date).getTime();
                    return i = Math.max(0, 16 - (n - e)), e = n + i, setTimeout(function() {
                        t(n + i)
                    }, i)
                }
            }();
        if (7 >= p) {
            if (t.jQuery) return void(t.jQuery.fn.velocity = t.jQuery.fn.animate);
            throw new Error("For IE<=7, Velocity falls back to jQuery, which must first be loaded.")
        }
        if (8 === p && !t.jQuery) throw new Error("For IE8, Velocity requires jQuery to be loaded.");
        if (e.Velocity !== n && !e.Velocity.Utilities) throw new Error("Velocity's namespace is occupied. Aborting.");
        var f = t.jQuery || e.Velocity.Utilities,
            m = e.Velocity = e.velocity = f.extend(e.Velocity || {}, {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                    isAndroid: /Android/i.test(navigator.userAgent),
                    isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                    prefixElement: i.createElement("div"),
                    prefixMatches: {},
                    scrollAnchor: null,
                    scrollPropertyLeft: null,
                    scrollPropertyTop: null,
                    isTicking: !1,
                    calls: []
                },
                CSS: {},
                Sequences: {},
                Easings: {},
                defaults: {
                    queue: "",
                    duration: 400,
                    easing: "swing",
                    complete: null,
                    display: null,
                    loop: !1,
                    delay: !1,
                    mobileHA: !0,
                    _cacheValues: !0
                },
                animate: function() {},
                debug: !1
            });
        t.pageYOffset !== n ? (m.State.scrollAnchor = t, m.State.scrollPropertyLeft = "pageXOffset", m.State.scrollPropertyTop = "pageYOffset") : (m.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, m.State.scrollPropertyLeft = "scrollLeft", m.State.scrollPropertyTop = "scrollTop"),
            function() {
                var e = {};
                f.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), f.extend(e, {
                    Sine: function(e) {
                        return 1 - Math.cos(e * Math.PI / 2)
                    },
                    Circ: function(e) {
                        return 1 - Math.sqrt(1 - e * e)
                    },
                    Elastic: function(e) {
                        return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(e) {
                        return e * e * (3 * e - 2)
                    },
                    Bounce: function(e) {
                        for (var t, i = 4; e < ((t = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                    }
                }), f.each(e, function(e, t) {
                    m.Easings["easeIn" + e] = t, m.Easings["easeOut" + e] = function(e) {
                        return 1 - t(1 - e)
                    }, m.Easings["easeInOut" + e] = function(e) {
                        return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
                    }
                }), m.Easings.linear = function(e) {
                    return e
                }, m.Easings.swing = function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                }, m.Easings.ease = l(.25, .1, .25, 1), m.Easings["ease-in"] = l(.42, 0, 1, 1), m.Easings["ease-out"] = l(0, 0, .58, 1), m.Easings["ease-in-out"] = l(.42, 0, .58, 1), m.Easings.spring = function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }();
        var g = m.CSS = {
            RegEx: {
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Hooks: {
                templates: {
                    color: ["Red Green Blue Alpha", "255 255 255 1"],
                    backgroundColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    borderColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    borderTopColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    borderRightColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    borderBottomColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    borderLeftColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    outlineColor: ["Red Green Blue Alpha", "255 255 255 1"],
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0%"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    var e, t, i;
                    if (p)
                        for (e in g.Hooks.templates) {
                            t = g.Hooks.templates[e], i = t[0].split(" ");
                            var n = t[1].match(g.RegEx.valueSplit);
                            "Color" === i[0] && (i.push(i.shift()), n.push(n.shift()), g.Hooks.templates[e] = [i.join(" "), n.join(" ")])
                        }
                    for (e in g.Hooks.templates) {
                        t = g.Hooks.templates[e], i = t[0].split(" ");
                        for (var a in i) {
                            var r = e + i[a],
                                o = a;
                            g.Hooks.registered[r] = [e, o]
                        }
                    }
                },
                getRoot: function(e) {
                    var t = g.Hooks.registered[e];
                    return t ? t[0] : e
                },
                cleanRootPropertyValue: function(e, t) {
                    return g.RegEx.valueUnwrap.test(t) && (t = t.match(g.Hooks.RegEx.valueUnwrap)[1]), g.Values.isCSSNullValue(t) && (t = g.Hooks.templates[e][1]), t
                },
                extractValue: function(e, t) {
                    var i = g.Hooks.registered[e];
                    if (i) {
                        var n = i[0],
                            a = i[1];
                        return t = g.Hooks.cleanRootPropertyValue(n, t), t.toString().match(g.RegEx.valueSplit)[a]
                    }
                    return t
                },
                injectValue: function(e, t, i) {
                    var n = g.Hooks.registered[e];
                    if (n) {
                        var a, r, o = n[0],
                            s = n[1];
                        return i = g.Hooks.cleanRootPropertyValue(o, i), a = i.toString().match(g.RegEx.valueSplit), a[s] = t, r = a.join(" ")
                    }
                    return i
                }
            },
            Normalizations: {
                registered: {
                    clip: function(e, t, i) {
                        switch (e) {
                            case "name":
                                return "clip";
                            case "extract":
                                var n;
                                return g.RegEx.wrappedValueAlreadyExtracted.test(i) ? n = i : (n = i.toString().match(g.RegEx.valueUnwrap), n && (n = n[1].replace(/,(\s+)?/g, " "))), n;
                            case "inject":
                                return "rect(" + i + ")"
                        }
                    },
                    opacity: function(e, t, i) {
                        if (8 >= p) switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var n = i.toString().match(/alpha\(opacity=(.*)\)/i);
                                return i = n ? n[1] / 100 : 1;
                            case "inject":
                                return t.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")"
                        } else switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return i;
                            case "inject":
                                return i
                        }
                    }
                },
                register: function() {
                    function e(e) {
                        var t, i = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return e = e.replace(i, function(e, t, i, n) {
                            return t + t + i + i + n + n
                        }), t = n.exec(e), t ? "rgb(" + (parseInt(t[1], 16) + " " + parseInt(t[2], 16) + " " + parseInt(t[3], 16)) + ")" : "rgb(0 0 0)"
                    }
                    var t = ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"];
                    9 >= p || (t = t.concat(["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]));
                    for (var i = 0, a = t.length; a > i; i++) ! function() {
                        var e = t[i];
                        g.Normalizations.registered[e] = function(t, i, a) {
                            switch (t) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return f.data(i, d).transformCache[e] === n ? /^scale/i.test(e) ? 1 : 0 : f.data(i, d).transformCache[e].replace(/[()]/g, "");
                                case "inject":
                                    var r = !1;
                                    switch (e.substr(0, e.length - 1)) {
                                        case "translate":
                                            r = !/(%|px|em|rem|\d)$/i.test(a);
                                            break;
                                        case "scal":
                                        case "scale":
                                            m.State.isAndroid && f.data(i, d).transformCache[e] === n && (a = 1), r = !/(\d)$/i.test(a);
                                            break;
                                        case "skew":
                                            r = !/(deg|\d)$/i.test(a);
                                            break;
                                        case "rotate":
                                            r = !/(deg|\d)$/i.test(a)
                                    }
                                    return r || (f.data(i, d).transformCache[e] = "(" + a + ")"), f.data(i, d).transformCache[e]
                            }
                        }
                    }();
                    for (var r = ["color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], i = 0, o = r.length; o > i; i++) ! function() {
                        var t = r[i];
                        g.Normalizations.registered[t] = function(i, a, r) {
                            switch (i) {
                                case "name":
                                    return t;
                                case "extract":
                                    var o;
                                    if (g.RegEx.wrappedValueAlreadyExtracted.test(r)) o = r;
                                    else {
                                        var s, l = {
                                            aqua: "rgb(0, 255, 255);",
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            fuchsia: "rgb(255, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            lime: "rgb(0, 255, 0)",
                                            maroon: "rgb(128, 0, 0)",
                                            navy: "rgb(0, 0, 128)",
                                            olive: "rgb(128, 128, 0)",
                                            purple: "rgb(128, 0, 128)",
                                            red: "rgb(255, 0, 0)",
                                            silver: "rgb(192, 192, 192)",
                                            teal: "rgb(0, 128, 128)",
                                            white: "rgb(255, 255, 255)",
                                            yellow: "rgb(255, 255, 0)"
                                        };
                                        /^[A-z]+$/i.test(r) ? s = l[r] !== n ? l[r] : l.black : /^#([A-f\d]{3}){1,2}$/i.test(r) ? s = e(r) : /^rgba?\(/i.test(r) || (s = l.black), o = (s || r).toString().match(g.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= p || 3 !== o.split(" ").length || (o += " 1"), o;
                                case "inject":
                                    return 8 >= p ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (8 >= p ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                            }
                        }
                    }()
                }
            },
            Names: {
                camelCase: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                prefixCheck: function(e) {
                    if (m.State.prefixMatches[e]) return [m.State.prefixMatches[e], !0];
                    for (var t = ["", "Webkit", "Moz", "ms", "O"], i = 0, n = t.length; n > i; i++) {
                        var a;
                        if (a = 0 === i ? e : t[i] + e.replace(/^\w/, function(e) {
                                return e.toUpperCase()
                            }), "string" == typeof m.State.prefixElement.style[a]) return m.State.prefixMatches[e] = a, [a, !0]
                    }
                    return [e, !1]
                }
            },
            Values: {
                isCSSNullValue: function(e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                },
                getUnitType: function(e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|opacity|alpha|fillOpacity|flexGrow|flexHeight|zIndex|fontWeight)$)|color/i.test(e) ? "" : "px"
                },
                getDisplayType: function(e) {
                    var t = e.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : "block"
                }
            },
            getPropertyValue: function(e, i, a, r) {
                function o(e, i) {
                    var a = 0;
                    if (8 >= p) a = f.css(e, i);
                    else {
                        if (!r) {
                            if ("height" === i && "border-box" !== g.getPropertyValue(e, "boxSizing").toString().toLowerCase()) return e.offsetHeight - (parseFloat(g.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(g.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(g.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(g.getPropertyValue(e, "paddingBottom")) || 0);
                            if ("width" === i && "border-box" !== g.getPropertyValue(e, "boxSizing").toString().toLowerCase()) return e.offsetWidth - (parseFloat(g.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(g.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(g.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(g.getPropertyValue(e, "paddingRight")) || 0)
                        }
                        var s;
                        s = f.data(e, d) === n ? t.getComputedStyle(e, null) : f.data(e, d).computedStyle ? f.data(e, d).computedStyle : f.data(e, d).computedStyle = t.getComputedStyle(e, null), p && "borderColor" === i && (i = "borderTopColor"), a = 9 === p && "filter" === i ? s.getPropertyValue(i) : s[i], ("" === a || null === a) && (a = e.style[i])
                    }
                    if ("auto" === a && /^(top|right|bottom|left)$/i.test(i)) {
                        var l = o(e, "position");
                        ("fixed" === l || "absolute" === l && /top|left/i.test(i)) && (a = f(e).position()[i] + "px")
                    }
                    return a
                }
                var s;
                if (g.Hooks.registered[i]) {
                    var l = i,
                        c = g.Hooks.getRoot(l);
                    a === n && (a = g.getPropertyValue(e, g.Names.prefixCheck(c)[0])), g.Normalizations.registered[c] && (a = g.Normalizations.registered[c]("extract", e, a)), s = g.Hooks.extractValue(l, a)
                } else if (g.Normalizations.registered[i]) {
                    var u, h;
                    u = g.Normalizations.registered[i]("name", e), "transform" !== u && (h = o(e, g.Names.prefixCheck(u)[0]), g.Values.isCSSNullValue(h) && g.Hooks.templates[i] && (h = g.Hooks.templates[i][1])), s = g.Normalizations.registered[i]("extract", e, h)
                }
                return /^[\d-]/.test(s) || (s = o(e, g.Names.prefixCheck(i)[0])), g.Values.isCSSNullValue(s) && (s = 0), m.debug >= 2 && console.log("Get " + i + ": " + s), s
            },
            setPropertyValue: function(e, i, n, a, r) {
                var o = i;
                if ("scroll" === i) r.container ? r.container["scroll" + r.direction] = n : "Left" === r.direction ? t.scrollTo(n, r.alternateValue) : t.scrollTo(r.alternateValue, n);
                else if (g.Normalizations.registered[i] && "transform" === g.Normalizations.registered[i]("name", e)) g.Normalizations.registered[i]("inject", e, n), o = "transform", n = f.data(e, d).transformCache[i];
                else {
                    if (g.Hooks.registered[i]) {
                        var s = i,
                            l = g.Hooks.getRoot(i);
                        a = a || g.getPropertyValue(e, l), n = g.Hooks.injectValue(s, n, a), i = l
                    }
                    if (g.Normalizations.registered[i] && (n = g.Normalizations.registered[i]("inject", e, n), i = g.Normalizations.registered[i]("name", e)), o = g.Names.prefixCheck(i)[0], 8 >= p) try {
                        e.style[o] = n
                    } catch (c) {
                        console.log("Error setting [" + o + "] to [" + n + "]")
                    } else e.style[o] = n;
                    m.debug >= 2 && console.log("Set " + i + " (" + o + "): " + n)
                }
                return [o, n]
            },
            flushTransformCache: function(e) {
                var t, i, n, a = "";
                for (t in f.data(e, d).transformCache) i = f.data(e, d).transformCache[t], "transformPerspective" !== t ? (9 === p && "rotateZ" === t && (t = "rotate"), a += t + i + " ") : n = i;
                n && (a = "perspective" + n + " " + a), g.setPropertyValue(e, "transform", a)
            }
        };
        g.Hooks.register(), g.Normalizations.register(), m.animate = function() {
            function e(e) {
                var t = e;
                return "string" == typeof e ? m.Easings[e] || (t = !1) : t = o(e) ? l.apply(null, e) : !1, t === !1 && (t = m.Easings[m.defaults.easing] ? m.defaults.easing : "swing"), t
            }

            function u() {
                function t() {
                    function t(t) {
                        var i = n,
                            a = n,
                            c = n;
                        return o(t) ? (i = t[0], !o(t[1]) && /^[\d-]/.test(t[1]) || r(t[1]) ? c = t[1] : ("string" == typeof t[1] || o(t[1])) && (a = e(t[1]), t[2] && (c = t[2]))) : i = t, a = a || l.easing, r(i) && (i = i.call(s, b, T)), r(c) && (c = c.call(s, b, T)), [i || 0, a, c]
                    }

                    function h(e, t) {
                        var i, n;
                        return n = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                            return i = e, ""
                        }), i || (i = g.Values.getUnitType(e)), [n, i]
                    }

                    function S() {
                        var e = {
                                parent: s.parentNode,
                                position: g.getPropertyValue(s, "position"),
                                fontSize: g.getPropertyValue(s, "fontSize")
                            },
                            t = e.position === k.lastPosition && e.parent === k.lastParent,
                            n = e.fontSize === k.lastFontSize && e.parent === k.lastParent;
                        k.lastParent = e.parent, k.lastPosition = e.position, k.lastFontSize = e.fontSize, null === k.remToPxRatio && (k.remToPxRatio = parseFloat(g.getPropertyValue(i.body, "fontSize")) || 16);
                        var a = {
                                overflowX: null,
                                overflowY: null,
                                boxSizing: null,
                                width: null,
                                minWidth: null,
                                maxWidth: null,
                                height: null,
                                minHeight: null,
                                maxHeight: null,
                                paddingLeft: null
                            },
                            r = {},
                            o = 10;
                        if (r.remToPxRatio = k.remToPxRatio, p) var l = /^auto$/i.test(s.currentStyle.width),
                            c = /^auto$/i.test(s.currentStyle.height);
                        t && n || (a.overflowX = g.getPropertyValue(s, "overflowX"), a.overflowY = g.getPropertyValue(s, "overflowY"), a.boxSizing = g.getPropertyValue(s, "boxSizing"), a.width = g.getPropertyValue(s, "width", null, !0), a.minWidth = g.getPropertyValue(s, "minWidth"), a.maxWidth = g.getPropertyValue(s, "maxWidth") || "none", a.height = g.getPropertyValue(s, "height", null, !0), a.minHeight = g.getPropertyValue(s, "minHeight"), a.maxHeight = g.getPropertyValue(s, "maxHeight") || "none", a.paddingLeft = g.getPropertyValue(s, "paddingLeft")), t ? (r.percentToPxRatioWidth = k.lastPercentToPxWidth, r.percentToPxRatioHeight = k.lastPercentToPxHeight) : (g.setPropertyValue(s, "overflowX", "hidden"), g.setPropertyValue(s, "overflowY", "hidden"), g.setPropertyValue(s, "boxSizing", "content-box"), g.setPropertyValue(s, "width", o + "%"), g.setPropertyValue(s, "minWidth", o + "%"), g.setPropertyValue(s, "maxWidth", o + "%"), g.setPropertyValue(s, "height", o + "%"), g.setPropertyValue(s, "minHeight", o + "%"), g.setPropertyValue(s, "maxHeight", o + "%")), n ? r.emToPxRatio = k.lastEmToPx : g.setPropertyValue(s, "paddingLeft", o + "em"), t || (r.percentToPxRatioWidth = k.lastPercentToPxWidth = (parseFloat(g.getPropertyValue(s, "width", null, !0)) || 1) / o, r.percentToPxRatioHeight = k.lastPercentToPxHeight = (parseFloat(g.getPropertyValue(s, "height", null, !0)) || 1) / o), n || (r.emToPxRatio = k.lastEmToPx = (parseFloat(g.getPropertyValue(s, "paddingLeft")) || 1) / o);
                        for (var u in a) null !== a[u] && g.setPropertyValue(s, u, a[u]);
                        return p ? (l && g.setPropertyValue(s, "width", "auto"), c && g.setPropertyValue(s, "height", "auto")) : (g.setPropertyValue(s, "height", "auto"), a.height !== g.getPropertyValue(s, "height", null, !0) && g.setPropertyValue(s, "height", a.height), g.setPropertyValue(s, "width", "auto"), a.width !== g.getPropertyValue(s, "width", null, !0) && g.setPropertyValue(s, "width", a.width)), m.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(r), s), r
                    }
                    if (0 === b && v && r(v.begin)) {
                        var w = _.jquery ? _.get() : _;
                        v.begin.call(w, w)
                    }
                    if ("scroll" === $) {
                        var M, A, x, E = /^x$/i.test(l.axis) ? "Left" : "Top",
                            D = parseFloat(l.offset) || 0;
                        l.container ? l.container.jquery || l.container.nodeType ? (l.container = l.container[0] || l.container, M = l.container["scroll" + E], x = M + f(s).position()[E.toLowerCase()] + D) : l.container = null : (M = m.State.scrollAnchor[m.State["scrollProperty" + E]], A = m.State.scrollAnchor[m.State["scrollProperty" + ("Left" === E ? "Top" : "Left")]], x = f(s).offset()[E.toLowerCase()] + D), u = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: M,
                                currentValue: M,
                                endValue: x,
                                unitType: "",
                                easing: l.easing,
                                scrollData: {
                                    container: l.container,
                                    direction: E,
                                    alternateValue: A
                                }
                            },
                            element: s
                        }
                    } else if ("reverse" === $) {
                        if (!f.data(s, d).tweensContainer) return void f.dequeue(s, l.queue);
                        "none" === f.data(s, d).opts.display && (f.data(s, d).opts.display = "block"), f.data(s, d).opts.loop = !1, f.data(s, d).opts.begin = null, f.data(s, d).opts.complete = null, l = f.extend({}, f.data(s, d).opts, v);
                        var L = f.extend(!0, {}, f.data(s, d).tweensContainer);
                        for (var P in L)
                            if ("element" !== P) {
                                var F = L[P].startValue;
                                L[P].startValue = L[P].currentValue = L[P].endValue, L[P].endValue = F, v && (L[P].easing = l.easing)
                            }
                        u = L
                    } else if ("start" === $) {
                        var L;
                        f.data(s, d).tweensContainer && f.data(s, d).isAnimating === !0 && (L = f.data(s, d).tweensContainer);
                        for (var V in y) {
                            var I = t(y[V]),
                                R = I[0],
                                N = I[1],
                                j = I[2];
                            V = g.Names.camelCase(V);
                            var O = g.Hooks.getRoot(V),
                                U = !1;
                            if (g.Names.prefixCheck(O)[1] !== !1 || g.Normalizations.registered[O] !== n) {
                                l.display && "none" !== l.display && /opacity|filter/.test(V) && !j && 0 !== R && (j = 0), l._cacheValues && L && L[V] ? (j === n && (j = L[V].endValue + L[V].unitType), U = f.data(s, d).rootPropertyValueCache[O]) : g.Hooks.registered[V] ? j === n ? (U = g.getPropertyValue(s, O), j = g.getPropertyValue(s, V, U)) : U = g.Hooks.templates[O][1] : j === n && (j = g.getPropertyValue(s, V));
                                var B, H, z, W;
                                B = h(V, j), j = B[0], z = B[1], B = h(V, R), R = B[0].replace(/^([+-\/*])=/, function(e, t) {
                                    return W = t, ""
                                }), H = B[1], j = parseFloat(j) || 0, R = parseFloat(R) || 0;
                                var Y;
                                if ("%" === H && (/^(fontSize|lineHeight)$/.test(V) ? (R /= 100, H = "em") : /^scale/.test(V) ? (R /= 100, H = "") : /(Red|Green|Blue)$/i.test(V) && (R = R / 100 * 255, H = "")), /[\/*]/.test(W)) H = z;
                                else if (z !== H && 0 !== j)
                                    if (0 === R) H = z;
                                    else {
                                        Y = Y || S();
                                        var G = /margin|padding|left|right|width|text|word|letter/i.test(V) || /X$/.test(V) ? "x" : "y";
                                        switch (z) {
                                            case "%":
                                                j *= "x" === G ? Y.percentToPxRatioWidth : Y.percentToPxRatioHeight;
                                                break;
                                            case "em":
                                                j *= Y.emToPxRatio;
                                                break;
                                            case "rem":
                                                j *= Y.remToPxRatio;
                                                break;
                                            case "px":
                                        }
                                        switch (H) {
                                            case "%":
                                                j *= 1 / ("x" === G ? Y.percentToPxRatioWidth : Y.percentToPxRatioHeight);
                                                break;
                                            case "em":
                                                j *= 1 / Y.emToPxRatio;
                                                break;
                                            case "rem":
                                                j *= 1 / Y.remToPxRatio;
                                                break;
                                            case "px":
                                        }
                                    }
                                switch (W) {
                                    case "+":
                                        R = j + R;
                                        break;
                                    case "-":
                                        R = j - R;
                                        break;
                                    case "*":
                                        R = j * R;
                                        break;
                                    case "/":
                                        R = j / R
                                }
                                u[V] = {
                                    rootPropertyValue: U,
                                    startValue: j,
                                    currentValue: j,
                                    endValue: R,
                                    unitType: H,
                                    easing: N
                                }, m.debug && console.log("tweensContainer (" + V + "): " + JSON.stringify(u[V]), s)
                            } else m.debug && console.log("Skipping [" + O + "] due to a lack of browser support.")
                        }
                        u.element = s
                    }
                    u.element && (C.push(u), f.data(s, d).tweensContainer = u, f.data(s, d).opts = l, f.data(s, d).isAnimating = !0, b === T - 1 ? (m.State.calls.length > 1e4 && (m.State.calls = a(m.State.calls)), m.State.calls.push([C, _, l]), m.State.isTicking === !1 && (m.State.isTicking = !0, c())) : b++)
                }
                var s = this,
                    l = f.extend({}, m.defaults, v),
                    u = {};
                if ("stop" === $) return f.queue(s, "string" == typeof v ? v : "", []), !0;
                switch (f.data(s, d) === n && f.data(s, d, {
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                }), l.duration.toString().toLowerCase()) {
                    case "fast":
                        l.duration = 200;
                        break;
                    case "normal":
                        l.duration = 400;
                        break;
                    case "slow":
                        l.duration = 600;
                        break;
                    default:
                        l.duration = parseFloat(l.duration) || 1
                }
                l.easing = e(l.easing), /^\d/.test(l.delay) && f.queue(s, l.queue, function(e) {
                    m.velocityQueueEntryFlag = !0, setTimeout(e, parseFloat(l.delay))
                }), l.display && (l.display = l.display.toString().toLowerCase()), l.mobileHA = l.mobileHA && m.State.isMobile, l.queue === !1 ? t() : f.queue(s, l.queue, function(e) {
                    m.velocityQueueEntryFlag = !0, t(e)
                }), "" !== l.queue && "fx" !== l.queue || "inprogress" === f.queue(s)[0] || f.dequeue(s)
            }
            var h, _, y, v;
            this.jquery || t.Zepto && t.Zepto.zepto.isZ(this) ? (h = !0, _ = this, y = arguments[0], v = arguments[1]) : (h = !1, _ = arguments[0].jquery ? [].slice.call(arguments[0]) : arguments[0], y = arguments[1], v = arguments[2]);
            var T = s(_) || o(_) ? _.length : 1,
                b = 0;
            if ("stop" !== y && !f.isPlainObject(v)) {
                var S = h ? 1 : 2;
                v = {};
                for (var w = S; w < arguments.length; w++) !o(arguments[w]) && /^\d/.test(arguments[w]) ? v.duration = parseFloat(arguments[w]) : "string" == typeof arguments[w] ? v.easing = arguments[w] : o(arguments[w]) && 4 === arguments[w].length ? v.easing = arguments[w] : r(arguments[w]) && (v.complete = arguments[w])
            }
            var $;
            switch (y) {
                case "scroll":
                    $ = "scroll";
                    break;
                case "reverse":
                    $ = "reverse";
                    break;
                case "stop":
                    $ = "stop";
                    break;
                default:
                    if (!f.isPlainObject(y) || f.isEmptyObject(y)) return "string" == typeof y && m.Sequences[y] ? (f.each(_, function(e, t) {
                        m.Sequences[y].call(t, t, v || {}, e, T)
                    }), _) : (m.debug && console.log("First argument was not a property map, a known action, or a registered sequence. Aborting."), _);
                    $ = "start"
            }
            var k = {
                    lastParent: null,
                    lastPosition: null,
                    lastFontSize: null,
                    lastPercentToPxWidth: null,
                    lastPercentToPxHeight: null,
                    lastEmToPx: null,
                    remToPxRatio: null
                },
                C = [];
            if (v && v.complete && !r(v.complete) && (v.complete = null), h) _.each(u);
            else if (1 === T && _.nodeType) u.call(_);
            else
                for (var M in _) _[M].nodeType && u.call(_[M]);
            var A, x = f.extend({}, m.defaults, v);
            if (x.loop = parseInt(x.loop), A = 2 * x.loop - 1, x.loop)
                for (var E = 0; A > E; E++) {
                    var D = {
                        delay: x.delay
                    };
                    x.complete && E === A - 1 && (D.complete = x.complete), h ? _.velocity("reverse", D) : m.animate(_, "reverse", D)
                }
            return _
        };
        var _ = t.jQuery || t.Zepto;
        _ && (_.fn.velocity = m.animate, _.fn.velocity.defaults = m.defaults), f.each(["Down", "Up"], function(e, t) {
            m.Sequences["slide" + t] = function(e, i) {
                var n = f.extend({}, i),
                    a = {
                        height: null,
                        marginTop: null,
                        marginBottom: null,
                        paddingTop: null,
                        paddingBottom: null,
                        overflow: null,
                        overflowX: null,
                        overflowY: null
                    },
                    r = n.begin,
                    o = n.complete,
                    s = !1;
                n.display = "Down" === t ? n.display || "block" : n.display || "none", n.begin = function() {
                    function i() {
                        e.style.display = "block", a.height = m.CSS.getPropertyValue(e, "height"), e.style.height = "auto", m.CSS.getPropertyValue(e, "height") === a.height && (s = !0), m.CSS.setPropertyValue(e, "height", a.height + "px")
                    }
                    if ("Down" === t) {
                        a.overflow = [m.CSS.getPropertyValue(e, "overflow"), 0], a.overflowX = [m.CSS.getPropertyValue(e, "overflowX"), 0], a.overflowY = [m.CSS.getPropertyValue(e, "overflowY"), 0], e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden", i();
                        for (var n in a) /^overflow/.test(n) || (a[n] = [m.CSS.getPropertyValue(e, n), 0]);
                        e.style.display = "none"
                    } else {
                        i();
                        for (var n in a) a[n] = [0, m.CSS.getPropertyValue(e, n)];
                        e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden"
                    }
                    r && r.call(e, e)
                }, n.complete = function(e) {
                    var i = "Down" === t ? 0 : 1;
                    s === !0 ? a.height[i] = "auto" : a.height[i] += "px";
                    for (var n in a) e.style[n] = a[n][i];
                    o && o.call(e, e)
                }, m.animate(e, a, n)
            }
        }), f.each(["In", "Out"], function(e, t) {
            m.Sequences["fade" + t] = function(e, i, n, a) {
                var r = f.extend({}, i),
                    o = {
                        opacity: "In" === t ? 1 : 0
                    };
                n !== a - 1 && (r.complete = r.begin = null), r.display || (r.display = "In" === t ? m.CSS.Values.getDisplayType(e) : "none"), m.animate(this, o, r)
            }
        })
    }(window.jQuery || window.Zepto || window, window, document),
    function() {
        var e = [].indexOf || function(e) {
                for (var t = 0, i = this.length; i > t; t++)
                    if (t in this && this[t] === e) return t;
                return -1
            },
            t = [].slice;
        ! function(e, t) {
            return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(i) {
                return t(i, e)
            }) : t(e.jQuery, e)
        }(window, function(i, n) {
            var a, r, o, s, l, c, u, d, p, h, f, m, g, _, y, v;
            return a = i(n), d = e.call(n, "ontouchstart") >= 0, s = {
                horizontal: {},
                vertical: {}
            }, l = 1, u = {}, c = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", g = 1, _ = "waypoints-waypoint-ids", y = "waypoint", v = "waypoints", r = function() {
                function e(e) {
                    var t = this;
                    this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
                        x: e.scrollLeft(),
                        y: e.scrollTop()
                    }, this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    }, this.element[c] = this.id, u[this.id] = this, e.bind(m, function() {
                        var e;
                        return t.didScroll || d ? void 0 : (t.didScroll = !0, e = function() {
                            return t.doScroll(), t.didScroll = !1
                        }, n.setTimeout(e, i[v].settings.scrollThrottle))
                    }), e.bind(f, function() {
                        var e;
                        return t.didResize ? void 0 : (t.didResize = !0, e = function() {
                            return i[v]("refresh"), t.didResize = !1
                        }, n.setTimeout(e, i[v].settings.resizeThrottle))
                    })
                }
                return e.prototype.doScroll = function() {
                    var e, t = this;
                    return e = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    }, !d || e.vertical.oldScroll && e.vertical.newScroll || i[v]("refresh"), i.each(e, function(e, n) {
                        var a, r, o;
                        return o = [], r = n.newScroll > n.oldScroll, a = r ? n.forward : n.backward, i.each(t.waypoints[e], function(e, t) {
                            var i, a;
                            return n.oldScroll < (i = t.offset) && i <= n.newScroll ? o.push(t) : n.newScroll < (a = t.offset) && a <= n.oldScroll ? o.push(t) : void 0
                        }), o.sort(function(e, t) {
                            return e.offset - t.offset
                        }), r || o.reverse(), i.each(o, function(e, t) {
                            return t.options.continuous || e === o.length - 1 ? t.trigger([a]) : void 0
                        })
                    }), this.oldScroll = {
                        x: e.horizontal.newScroll,
                        y: e.vertical.newScroll
                    }
                }, e.prototype.refresh = function() {
                    var e, t, n, a = this;
                    return n = i.isWindow(this.element), t = this.$element.offset(), this.doScroll(), e = {
                        horizontal: {
                            contextOffset: n ? 0 : t.left,
                            contextScroll: n ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: n ? 0 : t.top,
                            contextScroll: n ? 0 : this.oldScroll.y,
                            contextDimension: n ? i[v]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    }, i.each(e, function(e, t) {
                        return i.each(a.waypoints[e], function(e, n) {
                            var a, r, o, s, l;
                            return a = n.options.offset, o = n.offset, r = i.isWindow(n.element) ? 0 : n.$element.offset()[t.offsetProp], i.isFunction(a) ? a = a.apply(n.element) : "string" == typeof a && (a = parseFloat(a), n.options.offset.indexOf("%") > -1 && (a = Math.ceil(t.contextDimension * a / 100))), n.offset = r - t.contextOffset + t.contextScroll - a, n.options.onlyOnScroll && null != o || !n.enabled ? void 0 : null !== o && o < (s = t.oldScroll) && s <= n.offset ? n.trigger([t.backward]) : null !== o && o > (l = t.oldScroll) && l >= n.offset ? n.trigger([t.forward]) : null === o && t.oldScroll >= n.offset ? n.trigger([t.forward]) : void 0
                        })
                    })
                }, e.prototype.checkEmpty = function() {
                    return i.isEmptyObject(this.waypoints.horizontal) && i.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([f, m].join(" ")), delete u[this.id]) : void 0
                }, e
            }(), o = function() {
                function e(e, t, n) {
                    var a, r;
                    "bottom-in-view" === n.offset && (n.offset = function() {
                        var e;
                        return e = i[v]("viewportHeight"), i.isWindow(t.element) || (e = t.$element.height()), e - i(this).outerHeight()
                    }), this.$element = e, this.element = e[0], this.axis = n.horizontal ? "horizontal" : "vertical", this.callback = n.handler, this.context = t, this.enabled = n.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = n, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, a = null != (r = this.element[_]) ? r : [], a.push(this.id), this.element[_] = a
                }
                return e.prototype.trigger = function(e) {
                    return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), this.options.triggerOnce ? this.destroy() : void 0) : void 0
                }, e.prototype.disable = function() {
                    return this.enabled = !1
                }, e.prototype.enable = function() {
                    return this.context.refresh(), this.enabled = !0
                }, e.prototype.destroy = function() {
                    return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
                }, e.getWaypointsByElement = function(e) {
                    var t, n;
                    return (n = e[_]) ? (t = i.extend({}, s.horizontal, s.vertical), i.map(n, function(e) {
                        return t[e]
                    })) : []
                }, e
            }(), h = {
                init: function(e, t) {
                    var n;
                    return t = i.extend({}, i.fn[y].defaults, t), null == (n = t.handler) && (t.handler = e), this.each(function() {
                        var e, n, a, s;
                        return e = i(this), a = null != (s = t.context) ? s : i.fn[y].defaults.context, i.isWindow(a) || (a = e.closest(a)), a = i(a), n = u[a[0][c]], n || (n = new r(a)), new o(e, n, t)
                    }), i[v]("refresh"), this
                },
                disable: function() {
                    return h._invoke.call(this, "disable")
                },
                enable: function() {
                    return h._invoke.call(this, "enable")
                },
                destroy: function() {
                    return h._invoke.call(this, "destroy")
                },
                prev: function(e, t) {
                    return h._traverse.call(this, e, t, function(e, t, i) {
                        return t > 0 ? e.push(i[t - 1]) : void 0
                    })
                },
                next: function(e, t) {
                    return h._traverse.call(this, e, t, function(e, t, i) {
                        return t < i.length - 1 ? e.push(i[t + 1]) : void 0
                    })
                },
                _traverse: function(e, t, a) {
                    var r, o;
                    return null == e && (e = "vertical"), null == t && (t = n), o = p.aggregate(t), r = [], this.each(function() {
                        var t;
                        return t = i.inArray(this, o[e]), a(r, t, o[e])
                    }), this.pushStack(r)
                },
                _invoke: function(e) {
                    return this.each(function() {
                        var t;
                        return t = o.getWaypointsByElement(this), i.each(t, function(t, i) {
                            return i[e](), !0
                        })
                    }), this
                }
            }, i.fn[y] = function() {
                var e, n;
                return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], h[n] ? h[n].apply(this, e) : i.isFunction(n) ? h.init.apply(this, arguments) : i.isPlainObject(n) ? h.init.apply(this, [null, n]) : i.error(n ? "The " + n + " method does not exist in jQuery Waypoints." : "jQuery Waypoints needs a callback function or handler option.")
            }, i.fn[y].defaults = {
                context: n,
                continuous: !0,
                enabled: !0,
                horizontal: !1,
                offset: 0,
                triggerOnce: !1
            }, p = {
                refresh: function() {
                    return i.each(u, function(e, t) {
                        return t.refresh()
                    })
                },
                viewportHeight: function() {
                    var e;
                    return null != (e = n.innerHeight) ? e : a.height()
                },
                aggregate: function(e) {
                    var t, n, a;
                    return t = s, e && (t = null != (a = u[i(e)[0][c]]) ? a.waypoints : void 0), t ? (n = {
                        horizontal: [],
                        vertical: []
                    }, i.each(n, function(e, a) {
                        return i.each(t[e], function(e, t) {
                            return a.push(t)
                        }), a.sort(function(e, t) {
                            return e.offset - t.offset
                        }), n[e] = i.map(a, function(e) {
                            return e.element
                        }), n[e] = i.unique(n[e])
                    }), n) : []
                },
                above: function(e) {
                    return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
                        return t.offset <= e.oldScroll.y
                    })
                },
                below: function(e) {
                    return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
                        return t.offset > e.oldScroll.y
                    })
                },
                left: function(e) {
                    return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
                        return t.offset <= e.oldScroll.x
                    })
                },
                right: function(e) {
                    return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
                        return t.offset > e.oldScroll.x
                    })
                },
                enable: function() {
                    return p._invoke("enable")
                },
                disable: function() {
                    return p._invoke("disable")
                },
                destroy: function() {
                    return p._invoke("destroy")
                },
                extendFn: function(e, t) {
                    return h[e] = t
                },
                _invoke: function(e) {
                    var t;
                    return t = i.extend({}, s.vertical, s.horizontal), i.each(t, function(t, i) {
                        return i[e](), !0
                    })
                },
                _filter: function(e, t, n) {
                    var a, r;
                    return (a = u[i(e)[0][c]]) ? (r = [], i.each(a.waypoints[t], function(e, t) {
                        return n(a, t) ? r.push(t) : void 0
                    }), r.sort(function(e, t) {
                        return e.offset - t.offset
                    }), i.map(r, function(e) {
                        return e.element
                    })) : []
                }
            }, i[v] = function() {
                var e, i;
                return i = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], p[i] ? p[i].apply(null, e) : p.aggregate.call(null, i)
            }, i[v].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            }, a.on("load.waypoints", function() {
                return i[v]("refresh")
            })
        })
    }.call(this),
    function(e) {
        var t = {
                topSpacing: 0,
                bottomSpacing: 0,
                className: "is-sticky",
                wrapperClassName: "sticky-wrapper",
                center: !1,
                getWidthFrom: ""
            },
            i = e(window),
            n = e(document),
            a = [],
            r = i.height(),
            o = function() {
                for (var t = i.scrollTop(), o = n.height(), s = o - r, l = t > s ? s - t : 0, c = 0; c < a.length; c++) {
                    var u = a[c],
                        d = u.stickyWrapper.offset().top,
                        p = d - u.topSpacing - l;
                    if (p >= t) null !== u.currentTop && (u.stickyElement.css("position", "").css("top", ""), u.stickyElement.parent().removeClass(u.className), u.currentTop = null);
                    else {
                        var h = o - u.stickyElement.outerHeight() - u.topSpacing - u.bottomSpacing - t - l;
                        0 > h ? h += u.topSpacing : h = u.topSpacing, u.currentTop != h && (u.stickyElement.css("position", "fixed").css("top", h), "undefined" != typeof u.getWidthFrom && u.stickyElement.css("width", e(u.getWidthFrom).width()), u.stickyElement.parent().addClass(u.className), u.currentTop = h)
                    }
                }
            },
            s = function() {
                r = i.height()
            },
            l = {
                init: function(i) {
                    var n = e.extend(t, i);
                    return this.each(function() {
                        var t = e(this),
                            i = t.attr("id"),
                            r = e("<div></div>").attr("id", i + "-sticky-wrapper").addClass(n.wrapperClassName);
                        "undefined" != typeof t.attr("data-hide-on") && r.attr("data-hide-on", t.attr("data-hide-on")), t.wrapAll(r), n.center && t.parent().css({
                            width: t.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), "right" == t.css("float") && t.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        });
                        var o = t.parent();
                        o.css("height", t.outerHeight()), a.push({
                            topSpacing: n.topSpacing,
                            bottomSpacing: n.bottomSpacing,
                            stickyElement: t,
                            currentTop: null,
                            stickyWrapper: o,
                            className: n.className,
                            getWidthFrom: n.getWidthFrom
                        })
                    })
                },
                update: o,
                unstick: function() {
                    return this.each(function() {
                        var t = e(this);
                        removeIdx = -1;
                        for (var i = 0; i < a.length; i++) a[i].stickyElement.get(0) == t.get(0) && (removeIdx = i); - 1 != removeIdx && (a.splice(removeIdx, 1), t.unwrap(), t.removeAttr("style"))
                    })
                }
            };
        window.addEventListener ? (window.addEventListener("scroll", o, !1), window.addEventListener("resize", s, !1)) : window.attachEvent && (window.attachEvent("onscroll", o), window.attachEvent("onresize", s)), e.fn.sticky = function(t) {
            return l[t] ? l[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.sticky") : l.init.apply(this, arguments)
        }, e.fn.unstick = function(t) {
            return l[t] ? l[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.sticky") : l.unstick.apply(this, arguments)
        }, e(function() {
            setTimeout(o, 0)
        })
    }(jQuery),
    function() {
        var e = !1;
        window.JQClass = function() {}, JQClass.classes = {}, JQClass.extend = function t(i) {
            function n() {
                !e && this._init && this._init.apply(this, arguments)
            }
            var a = this.prototype;
            e = !0;
            var r = new this;
            e = !1;
            for (var o in i) r[o] = "function" == typeof i[o] && "function" == typeof a[o] ? function(e, t) {
                return function() {
                    var i = this._super;
                    this._super = function(t) {
                        return a[e].apply(this, t)
                    };
                    var n = t.apply(this, arguments);
                    return this._super = i, n
                }
            }(o, i[o]) : i[o];
            return n.prototype = r, n.prototype.constructor = n, n.extend = t, n
        }
    }(),
    function($) {
        function camelCase(e) {
            return e.replace(/-([a-z])/g, function(e, t) {
                return t.toUpperCase()
            })
        }
        JQClass.classes.JQPlugin = JQClass.extend({
            name: "plugin",
            defaultOptions: {},
            regionalOptions: {},
            _getters: [],
            _getMarker: function() {
                return "is-" + this.name
            },
            _init: function() {
                $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
                var e = camelCase(this.name);
                $[e] = this, $.fn[e] = function(t) {
                    var i = Array.prototype.slice.call(arguments, 1);
                    return $[e]._isNotChained(t, i) ? $[e][t].apply($[e], [this[0]].concat(i)) : this.each(function() {
                        if ("string" == typeof t) {
                            if ("_" === t[0] || !$[e][t]) throw "Unknown method: " + t;
                            $[e][t].apply($[e], [this].concat(i))
                        } else $[e]._attach(this, t)
                    })
                }
            },
            setDefaults: function(e) {
                $.extend(this.defaultOptions, e || {})
            },
            _isNotChained: function(e, t) {
                return "option" === e && (0 === t.length || 1 === t.length && "string" == typeof t[0]) ? !0 : $.inArray(e, this._getters) > -1
            },
            _attach: function(e, t) {
                if (e = $(e), !e.hasClass(this._getMarker())) {
                    e.addClass(this._getMarker()), t = $.extend({}, this.defaultOptions, this._getMetadata(e), t || {});
                    var i = $.extend({
                        name: this.name,
                        elem: e,
                        options: t
                    }, this._instSettings(e, t));
                    e.data(this.name, i), this._postAttach(e, i), this.option(e, t)
                }
            },
            _instSettings: function() {
                return {}
            },
            _postAttach: function() {},
            _getMetadata: function(d) {
                try {
                    var f = d.data(this.name.toLowerCase()) || "";
                    f = f.replace(/'/g, '"'), f = f.replace(/([a-zA-Z0-9]+):/g, function(e, t, i) {
                        var n = f.substring(0, i).match(/"/g);
                        return n && n.length % 2 !== 0 ? t + ":" : '"' + t + '":'
                    }), f = $.parseJSON("{" + f + "}");
                    for (var g in f) {
                        var h = f[g];
                        "string" == typeof h && h.match(/^new Date\((.*)\)$/) && (f[g] = eval(h))
                    }
                    return f
                } catch (e) {
                    return {}
                }
            },
            _getInst: function(e) {
                return $(e).data(this.name) || {}
            },
            option: function(e, t, i) {
                e = $(e);
                var n = e.data(this.name);
                if (!t || "string" == typeof t && null == i) {
                    var a = (n || {}).options;
                    return a && t ? a[t] : a
                }
                if (e.hasClass(this._getMarker())) {
                    var a = t || {};
                    "string" == typeof t && (a = {}, a[t] = i), this._optionsChanged(e, n, a), $.extend(n.options, a)
                }
            },
            _optionsChanged: function() {},
            destroy: function(e) {
                e = $(e), e.hasClass(this._getMarker()) && (this._preDestroy(e, this._getInst(e)), e.removeData(this.name).removeClass(this._getMarker()))
            },
            _preDestroy: function() {}
        }), $.JQPlugin = {
            createPlugin: function(e, t) {
                "object" == typeof e && (t = e, e = "JQPlugin"), e = camelCase(e);
                var i = camelCase(t.name);
                JQClass.classes[i] = JQClass.classes[e].extend(t), new JQClass.classes[i]
            }
        }
    }(jQuery),
    function(e) {
        var t = "countdown",
            i = 0,
            n = 1,
            a = 2,
            r = 3,
            o = 4,
            s = 5,
            l = 6;
        e.JQPlugin.createPlugin({
            name: t,
            defaultOptions: {
                until: null,
                since: null,
                timezone: null,
                serverSync: null,
                format: "dHMS",
                layout: "",
                compact: !1,
                padZeroes: !1,
                significant: 0,
                description: "",
                expiryUrl: "",
                expiryText: "",
                alwaysExpire: !1,
                onExpiry: null,
                onTick: null,
                tickInterval: 1
            },
            regionalOptions: {
                "": {
                    labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
                    labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
                    compactLabels: ["y", "m", "w", "d"],
                    whichLabels: null,
                    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    timeSeparator: ":",
                    isRTL: !1
                }
            },
            _getters: ["getTimes"],
            _rtlClass: t + "-rtl",
            _sectionClass: t + "-section",
            _amountClass: t + "-amount",
            _periodClass: t + "-period",
            _rowClass: t + "-row",
            _holdingClass: t + "-holding",
            _showClass: t + "-show",
            _descrClass: t + "-descr",
            _timerElems: [],
            _init: function() {
                function t(e) {
                    var s = 1e12 > e ? a ? performance.now() + performance.timing.navigationStart : n() : e || n();
                    s - o >= 1e3 && (i._updateElems(), o = s), r(t)
                }
                var i = this;
                this._super(), this._serverSyncs = [];
                var n = "function" == typeof Date.now ? Date.now : function() {
                        return (new Date).getTime()
                    },
                    a = window.performance && "function" == typeof window.performance.now,
                    r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
                    o = 0;
                !r || e.noRequestAnimationFrame ? (e.noRequestAnimationFrame = null, setInterval(function() {
                    i._updateElems()
                }, 980)) : (o = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || n(), r(t))
            },
            UTCDate: function(e, t, i, n, a, r, o, s) {
                "object" == typeof t && t.constructor == Date && (s = t.getMilliseconds(), o = t.getSeconds(), r = t.getMinutes(), a = t.getHours(), n = t.getDate(), i = t.getMonth(), t = t.getFullYear());
                var l = new Date;
                return l.setUTCFullYear(t), l.setUTCDate(1), l.setUTCMonth(i || 0), l.setUTCDate(n || 1), l.setUTCHours(a || 0), l.setUTCMinutes((r || 0) - (Math.abs(e) < 30 ? 60 * e : e)), l.setUTCSeconds(o || 0), l.setUTCMilliseconds(s || 0), l
            },
            periodsToSeconds: function(e) {
                return 31557600 * e[0] + 2629800 * e[1] + 604800 * e[2] + 86400 * e[3] + 3600 * e[4] + 60 * e[5] + e[6]
            },
            _instSettings: function() {
                return {
                    _periods: [0, 0, 0, 0, 0, 0, 0]
                }
            },
            _addElem: function(e) {
                this._hasElem(e) || this._timerElems.push(e)
            },
            _hasElem: function(t) {
                return e.inArray(t, this._timerElems) > -1
            },
            _removeElem: function(t) {
                this._timerElems = e.map(this._timerElems, function(e) {
                    return e == t ? null : e
                })
            },
            _updateElems: function() {
                for (var e = this._timerElems.length - 1; e >= 0; e--) this._updateCountdown(this._timerElems[e])
            },
            _optionsChanged: function(t, i, n) {
                n.layout && (n.layout = n.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(i.options, n);
                var a = i.options.timezone != n.timezone;
                e.extend(i.options, n), this._adjustSettings(t, i, null != n.until || null != n.since || a);
                var r = new Date;
                (i._since && i._since < r || i._until && i._until > r) && this._addElem(t[0]), this._updateCountdown(t, i)
            },
            _updateCountdown: function(t, i) {
                if (t = t.jquery ? t : e(t), i = i || t.data(this.name)) {
                    if (t.html(this._generateHTML(i)).toggleClass(this._rtlClass, i.options.isRTL), e.isFunction(i.options.onTick)) {
                        var n = "lap" != i._hold ? i._periods : this._calculatePeriods(i, i._show, i.options.significant, new Date);
                        (1 == i.options.tickInterval || this.periodsToSeconds(n) % i.options.tickInterval == 0) && i.options.onTick.apply(t[0], [n])
                    }
                    var a = "pause" != i._hold && (i._since ? i._now.getTime() < i._since.getTime() : i._now.getTime() >= i._until.getTime());
                    if (a && !i._expiring) {
                        if (i._expiring = !0, this._hasElem(t[0]) || i.options.alwaysExpire) {
                            if (this._removeElem(t[0]), e.isFunction(i.options.onExpiry) && i.options.onExpiry.apply(t[0], []), i.options.expiryText) {
                                var r = i.options.layout;
                                i.options.layout = i.options.expiryText, this._updateCountdown(t[0], i), i.options.layout = r
                            }
                            i.options.expiryUrl && (window.location = i.options.expiryUrl)
                        }
                        i._expiring = !1
                    } else "pause" == i._hold && this._removeElem(t[0])
                }
            },
            _resetExtraLabels: function(e, t) {
                var i = !1;
                for (var n in t)
                    if ("whichLabels" != n && n.match(/[Ll]abels/)) {
                        i = !0;
                        break
                    }
                if (i)
                    for (var n in e) n.match(/[Ll]abels[02-9]|compactLabels1/) && (e[n] = null)
            },
            _adjustSettings: function(t, i, n) {
                for (var a, r = 0, o = null, s = 0; s < this._serverSyncs.length; s++)
                    if (this._serverSyncs[s][0] == i.options.serverSync) {
                        o = this._serverSyncs[s][1];
                        break
                    }
                if (null != o) r = i.options.serverSync ? o : 0, a = new Date;
                else {
                    var l = e.isFunction(i.options.serverSync) ? i.options.serverSync.apply(t[0], []) : null;
                    a = new Date, r = l ? a.getTime() - l.getTime() : 0, this._serverSyncs.push([i.options.serverSync, r])
                }
                var c = i.options.timezone;
                c = null == c ? -a.getTimezoneOffset() : c, (n || !n && null == i._until && null == i._since) && (i._since = i.options.since, null != i._since && (i._since = this.UTCDate(c, this._determineTime(i._since, null)), i._since && r && i._since.setMilliseconds(i._since.getMilliseconds() + r)), i._until = this.UTCDate(c, this._determineTime(i.options.until, a)), r && i._until.setMilliseconds(i._until.getMilliseconds() + r)), i._show = this._determineShow(i)
            },
            _preDestroy: function(e) {
                this._removeElem(e[0]), e.empty()
            },
            pause: function(e) {
                this._hold(e, "pause")
            },
            lap: function(e) {
                this._hold(e, "lap")
            },
            resume: function(e) {
                this._hold(e, null)
            },
            toggle: function(t) {
                var i = e.data(t, this.name) || {};
                this[i._hold ? "resume" : "pause"](t)
            },
            toggleLap: function(t) {
                var i = e.data(t, this.name) || {};
                this[i._hold ? "resume" : "lap"](t)
            },
            _hold: function(t, i) {
                var n = e.data(t, this.name);
                if (n) {
                    if ("pause" == n._hold && !i) {
                        n._periods = n._savePeriods;
                        var a = n._since ? "-" : "+";
                        n[n._since ? "_since" : "_until"] = this._determineTime(a + n._periods[0] + "y" + a + n._periods[1] + "o" + a + n._periods[2] + "w" + a + n._periods[3] + "d" + a + n._periods[4] + "h" + a + n._periods[5] + "m" + a + n._periods[6] + "s"), this._addElem(t)
                    }
                    n._hold = i, n._savePeriods = "pause" == i ? n._periods : null, e.data(t, this.name, n), this._updateCountdown(t, n)
                }
            },
            getTimes: function(t) {
                var i = e.data(t, this.name);
                return i ? "pause" == i._hold ? i._savePeriods : i._hold ? this._calculatePeriods(i, i._show, i.options.significant, new Date) : i._periods : null
            },
            _determineTime: function(e, t) {
                var i = this,
                    n = function(e) {
                        var t = new Date;
                        return t.setTime(t.getTime() + 1e3 * e), t
                    },
                    a = function(e) {
                        e = e.toLowerCase();
                        for (var t = new Date, n = t.getFullYear(), a = t.getMonth(), r = t.getDate(), o = t.getHours(), s = t.getMinutes(), l = t.getSeconds(), c = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, u = c.exec(e); u;) {
                            switch (u[2] || "s") {
                                case "s":
                                    l += parseInt(u[1], 10);
                                    break;
                                case "m":
                                    s += parseInt(u[1], 10);
                                    break;
                                case "h":
                                    o += parseInt(u[1], 10);
                                    break;
                                case "d":
                                    r += parseInt(u[1], 10);
                                    break;
                                case "w":
                                    r += 7 * parseInt(u[1], 10);
                                    break;
                                case "o":
                                    a += parseInt(u[1], 10), r = Math.min(r, i._getDaysInMonth(n, a));
                                    break;
                                case "y":
                                    n += parseInt(u[1], 10), r = Math.min(r, i._getDaysInMonth(n, a))
                            }
                            u = c.exec(e)
                        }
                        return new Date(n, a, r, o, s, l, 0)
                    },
                    r = null == e ? t : "string" == typeof e ? a(e) : "number" == typeof e ? n(e) : e;
                return r && r.setMilliseconds(0), r
            },
            _getDaysInMonth: function(e, t) {
                return 32 - new Date(e, t, 32).getDate()
            },
            _normalLabels: function(e) {
                return e
            },
            _generateHTML: function(t) {
                var c = this;
                t._periods = t._hold ? t._periods : this._calculatePeriods(t, t._show, t.options.significant, new Date);
                for (var u = !1, d = 0, p = t.options.significant, h = e.extend({}, t._show), f = i; l >= f; f++) u |= "?" == t._show[f] && t._periods[f] > 0, h[f] = "?" != t._show[f] || u ? t._show[f] : null, d += h[f] ? 1 : 0, p -= t._periods[f] > 0 ? 1 : 0;
                for (var m = [!1, !1, !1, !1, !1, !1, !1], f = l; f >= i; f--) t._show[f] && (t._periods[f] ? m[f] = !0 : (m[f] = p > 0, p--));
                var g = t.options.compact ? t.options.compactLabels : t.options.labels,
                    _ = t.options.whichLabels || this._normalLabels,
                    y = function(e) {
                        var i = t.options["compactLabels" + _(t._periods[e])];
                        return h[e] ? c._translateDigits(t, t._periods[e]) + (i ? i[e] : g[e]) + " " : ""
                    },
                    v = t.options.padZeroes ? 2 : 1,
                    T = function(e) {
                        var i = t.options["labels" + _(t._periods[e])];
                        return !t.options.significant && h[e] || t.options.significant && m[e] ? '<span class="' + c._sectionClass + '"><span class="' + c._amountClass + '">' + c._minDigits(t, t._periods[e], v) + '</span><span class="' + c._periodClass + '">' + (i ? i[e] : g[e]) + "</span></span>" : ""
                    };
                return t.options.layout ? this._buildLayout(t, h, t.options.layout, t.options.compact, t.options.significant, m) : (t.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (t._hold ? " " + this._holdingClass : "") + '">' + y(i) + y(n) + y(a) + y(r) + (h[o] ? this._minDigits(t, t._periods[o], 2) : "") + (h[s] ? (h[o] ? t.options.timeSeparator : "") + this._minDigits(t, t._periods[s], 2) : "") + (h[l] ? (h[o] || h[s] ? t.options.timeSeparator : "") + this._minDigits(t, t._periods[l], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (t.options.significant || d) + (t._hold ? " " + this._holdingClass : "") + '">' + T(i) + T(n) + T(a) + T(r) + T(o) + T(s) + T(l)) + "</span>" + (t.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + t.options.description + "</span>" : "")
            },
            _buildLayout: function(t, c, u, d, p, h) {
                for (var f = t.options[d ? "compactLabels" : "labels"], m = t.options.whichLabels || this._normalLabels, g = function(e) {
                        return (t.options[(d ? "compactLabels" : "labels") + m(t._periods[e])] || f)[e]
                    }, _ = function(e, i) {
                        return t.options.digits[Math.floor(e / i) % 10]
                    }, y = {
                        desc: t.options.description,
                        sep: t.options.timeSeparator,
                        yl: g(i),
                        yn: this._minDigits(t, t._periods[i], 1),
                        ynn: this._minDigits(t, t._periods[i], 2),
                        ynnn: this._minDigits(t, t._periods[i], 3),
                        y1: _(t._periods[i], 1),
                        y10: _(t._periods[i], 10),
                        y100: _(t._periods[i], 100),
                        y1000: _(t._periods[i], 1e3),
                        ol: g(n),
                        on: this._minDigits(t, t._periods[n], 1),
                        onn: this._minDigits(t, t._periods[n], 2),
                        onnn: this._minDigits(t, t._periods[n], 3),
                        o1: _(t._periods[n], 1),
                        o10: _(t._periods[n], 10),
                        o100: _(t._periods[n], 100),
                        o1000: _(t._periods[n], 1e3),
                        wl: g(a),
                        wn: this._minDigits(t, t._periods[a], 1),
                        wnn: this._minDigits(t, t._periods[a], 2),
                        wnnn: this._minDigits(t, t._periods[a], 3),
                        w1: _(t._periods[a], 1),
                        w10: _(t._periods[a], 10),
                        w100: _(t._periods[a], 100),
                        w1000: _(t._periods[a], 1e3),
                        dl: g(r),
                        dn: this._minDigits(t, t._periods[r], 1),
                        dnn: this._minDigits(t, t._periods[r], 2),
                        dnnn: this._minDigits(t, t._periods[r], 3),
                        d1: _(t._periods[r], 1),
                        d10: _(t._periods[r], 10),
                        d100: _(t._periods[r], 100),
                        d1000: _(t._periods[r], 1e3),
                        hl: g(o),
                        hn: this._minDigits(t, t._periods[o], 1),
                        hnn: this._minDigits(t, t._periods[o], 2),
                        hnnn: this._minDigits(t, t._periods[o], 3),
                        h1: _(t._periods[o], 1),
                        h10: _(t._periods[o], 10),
                        h100: _(t._periods[o], 100),
                        h1000: _(t._periods[o], 1e3),
                        ml: g(s),
                        mn: this._minDigits(t, t._periods[s], 1),
                        mnn: this._minDigits(t, t._periods[s], 2),
                        mnnn: this._minDigits(t, t._periods[s], 3),
                        m1: _(t._periods[s], 1),
                        m10: _(t._periods[s], 10),
                        m100: _(t._periods[s], 100),
                        m1000: _(t._periods[s], 1e3),
                        sl: g(l),
                        sn: this._minDigits(t, t._periods[l], 1),
                        snn: this._minDigits(t, t._periods[l], 2),
                        snnn: this._minDigits(t, t._periods[l], 3),
                        s1: _(t._periods[l], 1),
                        s10: _(t._periods[l], 10),
                        s100: _(t._periods[l], 100),
                        s1000: _(t._periods[l], 1e3)
                    }, v = u, T = i; l >= T; T++) {
                    var b = "yowdhms".charAt(T),
                        S = new RegExp("\\{" + b + "<\\}([\\s\\S]*)\\{" + b + ">\\}", "g");
                    v = v.replace(S, !p && c[T] || p && h[T] ? "$1" : "")
                }
                return e.each(y, function(e, t) {
                    var i = new RegExp("\\{" + e + "\\}", "g");
                    v = v.replace(i, t)
                }), v
            },
            _minDigits: function(e, t, i) {
                return t = "" + t, t.length >= i ? this._translateDigits(e, t) : (t = "0000000000" + t, this._translateDigits(e, t.substr(t.length - i)))
            },
            _translateDigits: function(e, t) {
                return ("" + t).replace(/[0-9]/g, function(t) {
                    return e.options.digits[t]
                })
            },
            _determineShow: function(e) {
                var t = e.options.format,
                    c = [];
                return c[i] = t.match("y") ? "?" : t.match("Y") ? "!" : null, c[n] = t.match("o") ? "?" : t.match("O") ? "!" : null, c[a] = t.match("w") ? "?" : t.match("W") ? "!" : null, c[r] = t.match("d") ? "?" : t.match("D") ? "!" : null, c[o] = t.match("h") ? "?" : t.match("H") ? "!" : null, c[s] = t.match("m") ? "?" : t.match("M") ? "!" : null, c[l] = t.match("s") ? "?" : t.match("S") ? "!" : null, c
            },
            _calculatePeriods: function(e, t, c, u) {
                e._now = u, e._now.setMilliseconds(0);
                var d = new Date(e._now.getTime());
                e._since ? u.getTime() < e._since.getTime() ? e._now = u = d : u = e._since : (d.setTime(e._until.getTime()), u.getTime() > e._until.getTime() && (e._now = u = d));
                var p = [0, 0, 0, 0, 0, 0, 0];
                if (t[i] || t[n]) {
                    var h = this._getDaysInMonth(u.getFullYear(), u.getMonth()),
                        f = this._getDaysInMonth(d.getFullYear(), d.getMonth()),
                        m = d.getDate() == u.getDate() || d.getDate() >= Math.min(h, f) && u.getDate() >= Math.min(h, f),
                        g = function(e) {
                            return 60 * (60 * e.getHours() + e.getMinutes()) + e.getSeconds()
                        },
                        _ = Math.max(0, 12 * (d.getFullYear() - u.getFullYear()) + d.getMonth() - u.getMonth() + (d.getDate() < u.getDate() && !m || m && g(d) < g(u) ? -1 : 0));
                    p[i] = t[i] ? Math.floor(_ / 12) : 0, p[n] = t[n] ? _ - 12 * p[i] : 0, u = new Date(u.getTime());
                    var y = u.getDate() == h,
                        v = this._getDaysInMonth(u.getFullYear() + p[i], u.getMonth() + p[n]);
                    u.getDate() > v && u.setDate(v), u.setFullYear(u.getFullYear() + p[i]), u.setMonth(u.getMonth() + p[n]), y && u.setDate(v)
                }
                var T = Math.floor((d.getTime() - u.getTime()) / 1e3),
                    b = function(e, i) {
                        p[e] = t[e] ? Math.floor(T / i) : 0, T -= p[e] * i
                    };
                if (b(a, 604800), b(r, 86400), b(o, 3600), b(s, 60), b(l, 1), T > 0 && !e._since)
                    for (var S = [1, 12, 4.3482, 7, 24, 60, 60], w = l, $ = 1, k = l; k >= i; k--) t[k] && (p[w] >= $ && (p[w] = 0, T = 1), T > 0 && (p[k]++, T = 0, w = k, $ = 1)), $ *= S[k];
                if (c)
                    for (var k = i; l >= k; k++) c && p[k] ? c-- : c || (p[k] = 0);
                return p
            }
        })
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.eng = {
            labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
            labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
            compactLabels: ["a", "m", "s", "j"],
            whichLabels: function(e) {
                return e > 1 ? 0 : 1
            },
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.fr)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.fr = {
            labels: ["Ann\xe9es", "Mois", "Semaines", "Jours", "Heures", "Minutes", "Secondes"],
            labels1: ["Ann\xe9e", "Mois", "Semaine", "Jour", "Heure", "Minute", "Seconde"],
            compactLabels: ["a", "m", "s", "j"],
            whichLabels: function(e) {
                return e > 1 ? 0 : 1
            },
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.fr)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.es = {
            labels: ["A\xf1os", "Meses", "Semanas", "D\xedas", "Horas", "Minutos", "Segundos"],
            labels1: ["A\xf1o", "Mes", "Semana", "D\xeda", "Hora", "Minuto", "Segundo"],
            compactLabels: ["a", "m", "s", "g"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.es)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.de = {
            labels: ["Jahre", "Monate", "Wochen", "Tage", "Stunden", "Minuten", "Sekunden"],
            labels1: ["Jahr", "Monat", "Woche", "Tag", "Stunde", "Minute", "Sekunde"],
            compactLabels: ["J", "M", "W", "T"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.de)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.ru = {
            labels: ["\u041b\u0435\u0442", "\u041c\u0435\u0441\u044f\u0446\u0435\u0432", "\u041d\u0435\u0434\u0435\u043b\u044c", "\u0414\u043d\u0435\u0439", "\u0427\u0430\u0441\u043e\u0432", "\u041c\u0438\u043d\u0443\u0442", "\u0421\u0435\u043a\u0443\u043d\u0434"],
            labels1: ["\u0413\u043e\u0434", "\u041c\u0435\u0441\u044f\u0446", "\u041d\u0435\u0434\u0435\u043b\u044f", "\u0414\u0435\u043d\u044c", "\u0427\u0430\u0441", "\u041c\u0438\u043d\u0443\u0442\u0430", "\u0421\u0435\u043a\u0443\u043d\u0434\u0430"],
            labels2: ["\u0413\u043e\u0434\u0430", "\u041c\u0435\u0441\u044f\u0446\u0430", "\u041d\u0435\u0434\u0435\u043b\u0438", "\u0414\u043d\u044f", "\u0427\u0430\u0441\u0430", "\u041c\u0438\u043d\u0443\u0442\u044b", "\u0421\u0435\u043a\u0443\u043d\u0434\u044b"],
            compactLabels: ["\u043b", "\u043c", "\u043d", "\u0434"],
            compactLabels1: ["\u0433", "\u043c", "\u043d", "\u0434"],
            whichLabels: function(e) {
                var t = e % 10,
                    i = Math.floor(e % 100 / 10);
                return 1 == e ? 1 : t >= 2 && 4 >= t && 1 != i ? 2 : 1 == t && 1 != i ? 1 : 0
            },
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.ru)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.ja = {
            labels: ["\u5e74", "\u6708", "\u9031", "\u65e5", "\u6642", "\u5206", "\u79d2"],
            labels1: ["\u5e74", "\u6708", "\u9031", "\u65e5", "\u6642", "\u5206", "\u79d2"],
            compactLabels: ["\u5e74", "\u6708", "\u9031", "\u65e5"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.ja)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions["zh-CN"] = {
            labels: ["\u5e74", "\u6708", "\u5468", "\u5929", "\u65f6", "\u5206", "\u79d2"],
            labels1: ["\u5e74", "\u6708", "\u5468", "\u5929", "\u65f6", "\u5206", "\u79d2"],
            compactLabels: ["\u5e74", "\u6708", "\u5468", "\u5929"],
            compactLabels1: ["\u5e74", "\u6708", "\u5468", "\u5929"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions["zh-CN"])
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.ko = {
            labels: ["\ub144", "\uc6d4", "\uc8fc", "\uc77c", "\uc2dc", "\ubd84", "\ucd08"],
            labels1: ["\ub144", "\uc6d4", "\uc8fc", "\uc77c", "\uc2dc", "\ubd84", "\ucd08"],
            compactLabels: ["\ub144", "\uc6d4", "\uc8fc", "\uc77c"],
            compactLabels1: ["\ub144", "\uc6d4", "\uc8fc", "\uc77c"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.ko)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.ar = {
            labels: ["\u0633\u0646\u0648\u0627\u062a", "\u0623\u0634\u0647\u0631", "\u0623\u0633\u0627\u0628\u064a\u0639", "\u0623\u064a\u0627\u0645", "\u0633\u0627\u0639\u0627\u062a", "\u062f\u0642\u0627\u0626\u0642", "\u062b\u0648\u0627\u0646\u064a"],
            labels1: ["\u0633\u0646\u0629", "\u0634\u0647\u0631", "\u0623\u0633\u0628\u0648\u0639", "\u064a\u0648\u0645", "\u0633\u0627\u0639\u0629", "\u062f\u0642\u064a\u0642\u0629", "\u062b\u0627\u0646\u064a\u0629"],
            compactLabels: ["\u0633", "\u0634", "\u0623", "\u064a"],
            whichLabels: null,
            digits: ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"],
            timeSeparator: ":",
            isRTL: !0
        }, e.countdown.setDefaults(e.countdown.regionalOptions.ar)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.nl = {
            labels: ["Jaren", "Maanden", "Weken", "Dagen", "Uren", "Minuten", "Seconden"],
            labels1: ["Jaar", "Maand", "Week", "Dag", "Uur", "Minuut", "Seconde"],
            compactLabels: ["j", "m", "w", "d"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.nl)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.it = {
            labels: ["Anni", "Mesi", "Settimane", "Giorni", "Ore", "Minuti", "Secondi"],
            labels1: ["Anno", "Mese", "Settimana", "Giorno", "Ora", "Minuto", "Secondo"],
            compactLabels: ["a", "m", "s", "g"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.it)
    }(jQuery),
    function(e) {
        e.countdown.regionalOptions.sv = {
            labels: ["\xc5r", "M\xe5nader", "Veckor", "Dagar", "Timmar", "Minuter", "Sekunder"],
            labels1: ["\xc5r", "M\xe5nad", "Vecka", "Dag", "Timme", "Minut", "Sekund"],
            compactLabels: ["\xc5", "M", "V", "D"],
            whichLabels: null,
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            timeSeparator: ":",
            isRTL: !1
        }, e.countdown.setDefaults(e.countdown.regionalOptions.sv)
    }(jQuery), moment.tz.add({
        zones: {
            "Africa/Abidjan": ["-0:16:8 - LMT 1912 -0:16:8", "0 - GMT"],
            "Africa/Accra": ["-0:0:52 - LMT 1918 -0:0:52", "0 Ghana %s"],
            "Africa/Addis_Ababa": ["2:34:48 - LMT 1870 2:34:48", "2:35:20 - ADMT 1936_4_5 2:35:20", "3 - EAT"],
            "Africa/Algiers": ["0:12:12 - LMT 1891_2_15_0_1 0:12:12", "0:9:21 - PMT 1911_2_11 0:9:21", "0 Algeria WE%sT 1940_1_25_2", "1 Algeria CE%sT 1946_9_7 1", "0 - WET 1956_0_29", "1 - CET 1963_3_14 1", "0 Algeria WE%sT 1977_9_21 1", "1 Algeria CE%sT 1979_9_26 1", "0 Algeria WE%sT 1981_4", "1 - CET"],
            "Africa/Asmara": ["2:35:32 - LMT 1870 2:35:32", "2:35:32 - AMT 1890 2:35:32", "2:35:20 - ADMT 1936_4_5 2:35:20", "3 - EAT"],
            "Africa/Bamako": ["-0:32 - LMT 1912 -0:32", "0 - GMT 1934_1_26", "-1 - WAT 1960_5_20 -1", "0 - GMT"],
            "Africa/Bangui": ["1:14:20 - LMT 1912 1:14:20", "1 - WAT"],
            "Africa/Banjul": ["-1:6:36 - LMT 1912 -1:6:36", "-1:6:36 - BMT 1935 -1:6:36", "-1 - WAT 1964 -1", "0 - GMT"],
            "Africa/Bissau": ["-1:2:20 - LMT 1911_4_26 -1:2:20", "-1 - WAT 1975 -1", "0 - GMT"],
            "Africa/Blantyre": ["2:20 - LMT 1903_2 2:20", "2 - CAT"],
            "Africa/Brazzaville": ["1:1:8 - LMT 1912 1:1:8", "1 - WAT"],
            "Africa/Bujumbura": ["1:57:28 - LMT 1890 1:57:28", "2 - CAT"],
            "Africa/Cairo": ["2:5:9 - LMT 1900_9 2:5:9", "2 Egypt EE%sT"],
            "Africa/Casablanca": ["-0:30:20 - LMT 1913_9_26 -0:30:20", "0 Morocco WE%sT 1984_2_16", "1 - CET 1986 1", "0 Morocco WE%sT"],
            "Africa/Ceuta": ["-0:21:16 - LMT 1901 -0:21:16", "0 - WET 1918_4_6_23", "1 - WEST 1918_9_7_23 1", "0 - WET 1924", "0 Spain WE%sT 1929", "0 SpainAfrica WE%sT 1984_2_16", "1 - CET 1986 1", "1 EU CE%sT"],
            "Africa/Conakry": ["-0:54:52 - LMT 1912 -0:54:52", "0 - GMT 1934_1_26", "-1 - WAT 1960 -1", "0 - GMT"],
            "Africa/Dakar": ["-1:9:44 - LMT 1912 -1:9:44", "-1 - WAT 1941_5 -1", "0 - GMT"],
            "Africa/Dar_es_Salaam": ["2:37:8 - LMT 1931 2:37:8", "3 - EAT 1948 3", "2:45 - BEAUT 1961 2:45", "3 - EAT"],
            "Africa/Djibouti": ["2:52:36 - LMT 1911_6 2:52:36", "3 - EAT"],
            "Africa/Douala": ["0:38:48 - LMT 1912 0:38:48", "1 - WAT"],
            "Africa/El_Aaiun": ["-0:52:48 - LMT 1934_0 -0:52:48", "-1 - WAT 1976_3_14 -1", "0 - WET"],
            "Africa/Freetown": ["-0:53 - LMT 1882 -0:53", "-0:53 - FMT 1913_5 -0:53", "-1 SL %s 1957 -1", "0 SL %s"],
            "Africa/Gaborone": ["1:43:40 - LMT 1885 1:43:40", "1:30 - SAST 1903_2 1:30", "2 - CAT 1943_8_19_2 2", "3 - CAST 1944_2_19_2 3", "2 - CAT"],
            "Africa/Harare": ["2:4:12 - LMT 1903_2 2:4:12", "2 - CAT"],
            "Africa/Johannesburg": ["1:52 - LMT 1892_1_8 1:52", "1:30 - SAST 1903_2 1:30", "2 SA SAST"],
            "Africa/Juba": ["2:6:24 - LMT 1931 2:6:24", "2 Sudan CA%sT 2000_0_15_12 2", "3 - EAT"],
            "Africa/Kampala": ["2:9:40 - LMT 1928_6 2:9:40", "3 - EAT 1930 3", "2:30 - BEAT 1948 2:30", "2:45 - BEAUT 1957 2:45", "3 - EAT"],
            "Africa/Khartoum": ["2:10:8 - LMT 1931 2:10:8", "2 Sudan CA%sT 2000_0_15_12 2", "3 - EAT"],
            "Africa/Kigali": ["2:0:16 - LMT 1935_5 2:0:16", "2 - CAT"],
            "Africa/Kinshasa": ["1:1:12 - LMT 1897_10_9 1:1:12", "1 - WAT"],
            "Africa/Lagos": ["0:13:36 - LMT 1919_8 0:13:36", "1 - WAT"],
            "Africa/Libreville": ["0:37:48 - LMT 1912 0:37:48", "1 - WAT"],
            "Africa/Lome": ["0:4:52 - LMT 1893 0:4:52", "0 - GMT"],
            "Africa/Luanda": ["0:52:56 - LMT 1892 0:52:56", "0:52:4 - AOT 1911_4_26 0:52:4", "1 - WAT"],
            "Africa/Lubumbashi": ["1:49:52 - LMT 1897_10_9 1:49:52", "2 - CAT"],
            "Africa/Lusaka": ["1:53:8 - LMT 1903_2 1:53:8", "2 - CAT"],
            "Africa/Malabo": ["0:35:8 - LMT 1912 0:35:8", "0 - GMT 1963_11_15", "1 - WAT"],
            "Africa/Maputo": ["2:10:20 - LMT 1903_2 2:10:20", "2 - CAT"],
            "Africa/Maseru": ["1:50 - LMT 1903_2 1:50", "2 - SAST 1943_8_19_2 2", "3 - SAST 1944_2_19_2 3", "2 - SAST"],
            "Africa/Mbabane": ["2:4:24 - LMT 1903_2 2:4:24", "2 - SAST"],
            "Africa/Mogadishu": ["3:1:28 - LMT 1893_10 3:1:28", "3 - EAT 1931 3", "2:30 - BEAT 1957 2:30", "3 - EAT"],
            "Africa/Monrovia": ["-0:43:8 - LMT 1882 -0:43:8", "-0:43:8 - MMT 1919_2 -0:43:8", "-0:44:30 - LRT 1972_4 -0:44:30", "0 - GMT"],
            "Africa/Nairobi": ["2:27:16 - LMT 1928_6 2:27:16", "3 - EAT 1930 3", "2:30 - BEAT 1940 2:30", "2:45 - BEAUT 1960 2:45", "3 - EAT"],
            "Africa/Ndjamena": ["1:0:12 - LMT 1912 1:0:12", "1 - WAT 1979_9_14 1", "2 - WAST 1980_2_8 2", "1 - WAT"],
            "Africa/Niamey": ["0:8:28 - LMT 1912 0:8:28", "-1 - WAT 1934_1_26 -1", "0 - GMT 1960", "1 - WAT"],
            "Africa/Nouakchott": ["-1:3:48 - LMT 1912 -1:3:48", "0 - GMT 1934_1_26", "-1 - WAT 1960_10_28 -1", "0 - GMT"],
            "Africa/Ouagadougou": ["-0:6:4 - LMT 1912 -0:6:4", "0 - GMT"],
            "Africa/Porto-Novo": ["0:10:28 - LMT 1912 0:10:28", "0 - GMT 1934_1_26", "1 - WAT"],
            "Africa/Sao_Tome": ["0:26:56 - LMT 1884 0:26:56", "-0:36:32 - LMT 1912 -0:36:32", "0 - GMT"],
            "Africa/Tripoli": ["0:52:44 - LMT 1920 0:52:44", "1 Libya CE%sT 1959 1", "2 - EET 1982 2", "1 Libya CE%sT 1990_4_4 1", "2 - EET 1996_8_30 2", "1 Libya CE%sT 1997_9_4 2", "2 - EET 2012_10_10_2 2", "1 Libya CE%sT"],
            "Africa/Tunis": ["0:40:44 - LMT 1881_4_12 0:40:44", "0:9:21 - PMT 1911_2_11 0:9:21", "1 Tunisia CE%sT"],
            "Africa/Windhoek": ["1:8:24 - LMT 1892_1_8 1:8:24", "1:30 - SWAT 1903_2 1:30", "2 - SAST 1942_8_20_2 2", "3 - SAST 1943_2_21_2 3", "2 - SAST 1990_2_21 2", "2 - CAT 1994_3_3 2", "1 Namibia WA%sT"],
            "America/Adak": ["12:13:21 - LMT 1867_9_18 12:13:21", "-11:46:38 - LMT 1900_7_20_12 -11:46:38", "-11 - NST 1942 -11", "-11 US N%sT 1946 -11", "-11 - NST 1967_3 -11", "-11 - BST 1969 -11", "-11 US B%sT 1983_9_30_2 -10", "-10 US AH%sT 1983_10_30 -10", "-10 US HA%sT"],
            "America/Anchorage": ["14:0:24 - LMT 1867_9_18 14:0:24", "-9:59:36 - LMT 1900_7_20_12 -9:59:36", "-10 - CAT 1942 -10", "-10 US CAT/CAWT 1945_7_14_23", "-10 US CAT/CAPT 1946 -10", "-10 - CAT 1967_3 -10", "-10 - AHST 1969 -10", "-10 US AH%sT 1983_9_30_2 -9", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT"],
            "America/Anguilla": ["-4:12:16 - LMT 1912_2_2 -4:12:16", "-4 - AST"],
            "America/Antigua": ["-4:7:12 - LMT 1912_2_2 -4:7:12", "-5 - EST 1951 -5", "-4 - AST"],
            "America/Araguaina": ["-3:12:48 - LMT 1914 -3:12:48", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1995_8_14 -3", "-3 Brazil BR%sT 2003_8_24 -3", "-3 - BRT 2012_9_21 -3", "-3 Brazil BR%sT"],
            "America/Argentina/Buenos_Aires": ["-3:53:48 - LMT 1894_9_31 -3:53:48", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT"],
            "America/Argentina/Catamarca": ["-4:23:8 - LMT 1894_9_31 -4:23:8", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/Cordoba": ["-4:16:48 - LMT 1894_9_31 -4:16:48", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT"],
            "America/Argentina/Jujuy": ["-4:21:12 - LMT 1894_9_31 -4:21:12", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990_2_4 -2", "-4 - WART 1990_9_28 -4", "-3 - WARST 1991_2_17 -3", "-4 - WART 1991_9_6 -4", "-2 - ARST 1992 -2", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/La_Rioja": ["-4:27:24 - LMT 1894_9_31 -4:27:24", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_1 -2", "-4 - WART 1991_4_7 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/Mendoza": ["-4:35:16 - LMT 1894_9_31 -4:35:16", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990_2_4 -2", "-4 - WART 1990_9_15 -4", "-3 - WARST 1991_2_1 -3", "-4 - WART 1991_9_15 -4", "-3 - WARST 1992_2_1 -3", "-4 - WART 1992_9_18 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_23 -3", "-4 - WART 2004_8_26 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/Rio_Gallegos": ["-4:36:52 - LMT 1894_9_31 -4:36:52", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/Salta": ["-4:21:40 - LMT 1894_9_31 -4:21:40", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/San_Juan": ["-4:34:4 - LMT 1894_9_31 -4:34:4", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_1 -2", "-4 - WART 1991_4_7 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_31 -3", "-4 - WART 2004_6_25 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Argentina/San_Luis": ["-4:25:24 - LMT 1894_9_31 -4:25:24", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990 -2", "-2 - ARST 1990_2_14 -2", "-4 - WART 1990_9_15 -4", "-3 - WARST 1991_2_1 -3", "-4 - WART 1991_5_1 -4", "-3 - ART 1999_9_3 -3", "-3 - WARST 2000_2_3 -3", "-3 - ART 2004_4_31 -3", "-4 - WART 2004_6_25 -4", "-3 Arg AR%sT 2008_0_21 -2", "-4 SanLuis WAR%sT"],
            "America/Argentina/Tucuman": ["-4:20:52 - LMT 1894_9_31 -4:20:52", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_13 -4", "-3 Arg AR%sT"],
            "America/Argentina/Ushuaia": ["-4:33:12 - LMT 1894_9_31 -4:33:12", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_30 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART"],
            "America/Aruba": ["-4:40:24 - LMT 1912_1_12 -4:40:24", "-4:30 - ANT 1965 -4:30", "-4 - AST"],
            "America/Asuncion": ["-3:50:40 - LMT 1890 -3:50:40", "-3:50:40 - AMT 1931_9_10 -3:50:40", "-4 - PYT 1972_9 -4", "-3 - PYT 1974_3 -3", "-4 Para PY%sT"],
            "America/Atikokan": ["-6:6:28 - LMT 1895 -6:6:28", "-6 Canada C%sT 1940_8_29 -6", "-5 - CDT 1942_1_9_2 -6", "-6 Canada C%sT 1945_8_30_2 -5", "-5 - EST"],
            "America/Bahia": ["-2:34:4 - LMT 1914 -2:34:4", "-3 Brazil BR%sT 2003_8_24 -3", "-3 - BRT 2011_9_16 -3", "-3 Brazil BR%sT 2012_9_21 -3", "-3 - BRT"],
            "America/Bahia_Banderas": ["-7:1 - LMT 1921_11_31_23_59 -7:1", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT 2010_3_4_2 -7", "-6 Mexico C%sT"],
            "America/Barbados": ["-3:58:29 - LMT 1924 -3:58:29", "-3:58:29 - BMT 1932 -3:58:29", "-4 Barb A%sT"],
            "America/Belem": ["-3:13:56 - LMT 1914 -3:13:56", "-3 Brazil BR%sT 1988_8_12 -3", "-3 - BRT"],
            "America/Belize": ["-5:52:48 - LMT 1912_3 -5:52:48", "-6 Belize C%sT"],
            "America/Blanc-Sablon": ["-3:48:28 - LMT 1884 -3:48:28", "-4 Canada A%sT 1970 -4", "-4 - AST"],
            "America/Boa_Vista": ["-4:2:40 - LMT 1914 -4:2:40", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 1999_8_30 -4", "-4 Brazil AM%sT 2000_9_15 -3", "-4 - AMT"],
            "America/Bogota": ["-4:56:16 - LMT 1884_2_13 -4:56:16", "-4:56:16 - BMT 1914_10_23 -4:56:16", "-5 CO CO%sT"],
            "America/Boise": ["-7:44:49 - LMT 1883_10_18_12_15_11 -7:44:49", "-8 US P%sT 1923_4_13_2 -8", "-7 US M%sT 1974 -7", "-7 - MST 1974_1_3_2 -7", "-7 US M%sT"],
            "America/Cambridge_Bay": ["0 - zzz 1920", "-7 NT_YK M%sT 1999_9_31_2 -6", "-6 Canada C%sT 2000_9_29_2 -5", "-5 - EST 2000_10_5_0 -5", "-6 - CST 2001_3_1_3 -6", "-7 Canada M%sT"],
            "America/Campo_Grande": ["-3:38:28 - LMT 1914 -3:38:28", "-4 Brazil AM%sT"],
            "America/Cancun": ["-5:47:4 - LMT 1922_0_1_0_12_56 -5:47:4", "-6 - CST 1981_11_23 -6", "-5 Mexico E%sT 1998_7_2_2 -4", "-6 Mexico C%sT"],
            "America/Caracas": ["-4:27:44 - LMT 1890 -4:27:44", "-4:27:40 - CMT 1912_1_12 -4:27:40", "-4:30 - VET 1965 -4:30", "-4 - VET 2007_11_9_03 -4", "-4:30 - VET"],
            "America/Cayenne": ["-3:29:20 - LMT 1911_6 -3:29:20", "-4 - GFT 1967_9 -4", "-3 - GFT"],
            "America/Cayman": ["-5:25:32 - LMT 1890 -5:25:32", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 - EST"],
            "America/Chicago": ["-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36", "-6 US C%sT 1920 -6", "-6 Chicago C%sT 1936_2_1_2 -6", "-5 - EST 1936_10_15_2 -5", "-6 Chicago C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Chicago C%sT 1967 -6", "-6 US C%sT"],
            "America/Chihuahua": ["-7:4:20 - LMT 1921_11_31_23_55_40 -7:4:20", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1996 -6", "-6 Mexico C%sT 1998 -6", "-6 - CST 1998_3_5_3 -6", "-7 Mexico M%sT"],
            "America/Costa_Rica": ["-5:36:13 - LMT 1890 -5:36:13", "-5:36:13 - SJMT 1921_0_15 -5:36:13", "-6 CR C%sT"],
            "America/Creston": ["-7:46:4 - LMT 1884 -7:46:4", "-7 - MST 1916_9_1 -7", "-8 - PST 1918_5_2 -8", "-7 - MST"],
            "America/Cuiaba": ["-3:44:20 - LMT 1914 -3:44:20", "-4 Brazil AM%sT 2003_8_24 -4", "-4 - AMT 2004_9_1 -4", "-4 Brazil AM%sT"],
            "America/Curacao": ["-4:35:47 - LMT 1912_1_12 -4:35:47", "-4:30 - ANT 1965 -4:30", "-4 - AST"],
            "America/Danmarkshavn": ["-1:14:40 - LMT 1916_6_28 -1:14:40", "-3 - WGT 1980_3_6_2 -3", "-3 EU WG%sT 1996 -3", "0 - GMT"],
            "America/Dawson": ["-9:17:40 - LMT 1900_7_20 -9:17:40", "-9 NT_YK Y%sT 1973_9_28_0 -9", "-8 NT_YK P%sT 1980 -8", "-8 Canada P%sT"],
            "America/Dawson_Creek": ["-8:0:56 - LMT 1884 -8:0:56", "-8 Canada P%sT 1947 -8", "-8 Vanc P%sT 1972_7_30_2 -7", "-7 - MST"],
            "America/Denver": ["-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56", "-7 US M%sT 1920 -7", "-7 Denver M%sT 1942 -7", "-7 US M%sT 1946 -7", "-7 Denver M%sT 1967 -7", "-7 US M%sT"],
            "America/Detroit": ["-5:32:11 - LMT 1905 -5:32:11", "-6 - CST 1915_4_15_2 -6", "-5 - EST 1942 -5", "-5 US E%sT 1946 -5", "-5 Detroit E%sT 1973 -5", "-5 US E%sT 1975 -5", "-5 - EST 1975_3_27_2 -5", "-5 US E%sT"],
            "America/Dominica": ["-4:5:36 - LMT 1911_6_1_0_1 -4:5:36", "-4 - AST"],
            "America/Edmonton": ["-7:33:52 - LMT 1906_8 -7:33:52", "-7 Edm M%sT 1987 -7", "-7 Canada M%sT"],
            "America/Eirunepe": ["-4:39:28 - LMT 1914 -4:39:28", "-5 Brazil AC%sT 1988_8_12 -5", "-5 - ACT 1993_8_28 -5", "-5 Brazil AC%sT 1994_8_22 -5", "-5 - ACT 2008_5_24_00 -5", "-4 - AMT"],
            "America/El_Salvador": ["-5:56:48 - LMT 1921 -5:56:48", "-6 Salv C%sT"],
            "America/Fortaleza": ["-2:34 - LMT 1914 -2:34", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_22 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT"],
            "America/Glace_Bay": ["-3:59:48 - LMT 1902_5_15 -3:59:48", "-4 Canada A%sT 1953 -4", "-4 Halifax A%sT 1954 -4", "-4 - AST 1972 -4", "-4 Halifax A%sT 1974 -4", "-4 Canada A%sT"],
            "America/Godthab": ["-3:26:56 - LMT 1916_6_28 -3:26:56", "-3 - WGT 1980_3_6_2 -3", "-3 EU WG%sT"],
            "America/Goose_Bay": ["-4:1:40 - LMT 1884 -4:1:40", "-3:30:52 - NST 1918 -3:30:52", "-3:30:52 Canada N%sT 1919 -3:30:52", "-3:30:52 - NST 1935_2_30 -3:30:52", "-3:30 - NST 1936 -3:30", "-3:30 StJohns N%sT 1942_4_11 -3:30", "-3:30 Canada N%sT 1946 -3:30", "-3:30 StJohns N%sT 1966_2_15_2 -3:30", "-4 StJohns A%sT 2011_10 -3", "-4 Canada A%sT"],
            "America/Grand_Turk": ["-4:44:32 - LMT 1890 -4:44:32", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 TC E%sT"],
            "America/Grenada": ["-4:7 - LMT 1911_6 -4:7", "-4 - AST"],
            "America/Guadeloupe": ["-4:6:8 - LMT 1911_5_8 -4:6:8", "-4 - AST"],
            "America/Guatemala": ["-6:2:4 - LMT 1918_9_5 -6:2:4", "-6 Guat C%sT"],
            "America/Guayaquil": ["-5:19:20 - LMT 1890 -5:19:20", "-5:14 - QMT 1931 -5:14", "-5 - ECT"],
            "America/Guyana": ["-3:52:40 - LMT 1915_2 -3:52:40", "-3:45 - GBGT 1966_4_26 -3:45", "-3:45 - GYT 1975_6_31 -3:45", "-3 - GYT 1991 -3", "-4 - GYT"],
            "America/Halifax": ["-4:14:24 - LMT 1902_5_15 -4:14:24", "-4 Halifax A%sT 1918 -4", "-4 Canada A%sT 1919 -4", "-4 Halifax A%sT 1942_1_9_2 -4", "-4 Canada A%sT 1946 -4", "-4 Halifax A%sT 1974 -4", "-4 Canada A%sT"],
            "America/Havana": ["-5:29:28 - LMT 1890 -5:29:28", "-5:29:36 - HMT 1925_6_19_12 -5:29:36", "-5 Cuba C%sT"],
            "America/Hermosillo": ["-7:23:52 - LMT 1921_11_31_23_36_8 -7:23:52", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT 1999 -7", "-7 - MST"],
            "America/Indiana/Indianapolis": ["-5:44:38 - LMT 1883_10_18_12_15_22 -5:44:38", "-6 US C%sT 1920 -6", "-6 Indianapolis C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Indianapolis C%sT 1955_3_24_2 -6", "-5 - EST 1957_8_29_2 -5", "-6 - CST 1958_3_27_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006 -5", "-5 US E%sT"],
            "America/Indiana/Knox": ["-5:46:30 - LMT 1883_10_18_12_13_30 -5:46:30", "-6 US C%sT 1947 -6", "-6 Starke C%sT 1962_3_29_2 -6", "-5 - EST 1963_9_27_2 -5", "-6 US C%sT 1991_9_27_2 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT"],
            "America/Indiana/Marengo": ["-5:45:23 - LMT 1883_10_18_12_14_37 -5:45:23", "-6 US C%sT 1951 -6", "-6 Marengo C%sT 1961_3_30_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1974_0_6_2 -5", "-5 - CDT 1974_9_27_2 -5", "-5 US E%sT 1976 -5", "-5 - EST 2006 -5", "-5 US E%sT"],
            "America/Indiana/Petersburg": ["-5:49:7 - LMT 1883_10_18_12_10_53 -5:49:7", "-6 US C%sT 1955 -6", "-6 Pike C%sT 1965_3_25_2 -6", "-5 - EST 1966_9_30_2 -5", "-6 US C%sT 1977_9_30_2 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_10_4_2 -5", "-5 US E%sT"],
            "America/Indiana/Tell_City": ["-5:47:3 - LMT 1883_10_18_12_12_57 -5:47:3", "-6 US C%sT 1946 -6", "-6 Perry C%sT 1964_3_26_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT"],
            "America/Indiana/Vevay": ["-5:40:16 - LMT 1883_10_18_12_19_44 -5:40:16", "-6 US C%sT 1954_3_25_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1973 -5", "-5 - EST 2006 -5", "-5 US E%sT"],
            "America/Indiana/Vincennes": ["-5:50:7 - LMT 1883_10_18_12_9_53 -5:50:7", "-6 US C%sT 1946 -6", "-6 Vincennes C%sT 1964_3_26_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_10_4_2 -5", "-5 US E%sT"],
            "America/Indiana/Winamac": ["-5:46:25 - LMT 1883_10_18_12_13_35 -5:46:25", "-6 US C%sT 1946 -6", "-6 Pulaski C%sT 1961_3_30_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_2_11_2 -6", "-5 US E%sT"],
            "America/Inuvik": ["0 - zzz 1953", "-8 NT_YK P%sT 1979_3_29_2 -8", "-7 NT_YK M%sT 1980 -7", "-7 Canada M%sT"],
            "America/Iqaluit": ["0 - zzz 1942_7", "-5 NT_YK E%sT 1999_9_31_2 -4", "-6 Canada C%sT 2000_9_29_2 -5", "-5 Canada E%sT"],
            "America/Jamaica": ["-5:7:12 - LMT 1890 -5:7:12", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 - EST 1974_3_28_2 -5", "-5 US E%sT 1984 -5", "-5 - EST"],
            "America/Juneau": ["15:2:19 - LMT 1867_9_18 15:2:19", "-8:57:41 - LMT 1900_7_20_12 -8:57:41", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1980_3_27_2 -8", "-9 US Y%sT 1980_9_26_2 -8", "-8 US P%sT 1983_9_30_2 -7", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT"],
            "America/Kentucky/Louisville": ["-5:43:2 - LMT 1883_10_18_12_16_58 -5:43:2", "-6 US C%sT 1921 -6", "-6 Louisville C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Louisville C%sT 1961_6_23_2 -5", "-5 - EST 1968 -5", "-5 US E%sT 1974_0_6_2 -5", "-5 - CDT 1974_9_27_2 -5", "-5 US E%sT"],
            "America/Kentucky/Monticello": ["-5:39:24 - LMT 1883_10_18_12_20_36 -5:39:24", "-6 US C%sT 1946 -6", "-6 - CST 1968 -6", "-6 US C%sT 2000_9_29_2 -5", "-5 US E%sT"],
            "America/La_Paz": ["-4:32:36 - LMT 1890 -4:32:36", "-4:32:36 - CMT 1931_9_15 -4:32:36", "-3:32:36 - BOST 1932_2_21 -3:32:36", "-4 - BOT"],
            "America/Lima": ["-5:8:12 - LMT 1890 -5:8:12", "-5:8:36 - LMT 1908_6_28 -5:8:36", "-5 Peru PE%sT"],
            "America/Los_Angeles": ["-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58", "-8 US P%sT 1946 -8", "-8 CA P%sT 1967 -8", "-8 US P%sT"],
            "America/Maceio": ["-2:22:52 - LMT 1914 -2:22:52", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1995_9_13 -3", "-3 Brazil BR%sT 1996_8_4 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_22 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT"],
            "America/Managua": ["-5:45:8 - LMT 1890 -5:45:8", "-5:45:12 - MMT 1934_5_23 -5:45:12", "-6 - CST 1973_4 -6", "-5 - EST 1975_1_16 -5", "-6 Nic C%sT 1992_0_1_4 -6", "-5 - EST 1992_8_24 -5", "-6 - CST 1993 -6", "-5 - EST 1997 -5", "-6 Nic C%sT"],
            "America/Manaus": ["-4:0:4 - LMT 1914 -4:0:4", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 1993_8_28 -4", "-4 Brazil AM%sT 1994_8_22 -4", "-4 - AMT"],
            "America/Martinique": ["-4:4:20 - LMT 1890 -4:4:20", "-4:4:20 - FFMT 1911_4 -4:4:20", "-4 - AST 1980_3_6 -4", "-3 - ADT 1980_8_28 -3", "-4 - AST"],
            "America/Matamoros": ["-6:40 - LMT 1921_11_31_23_20 -6:40", "-6 - CST 1988 -6", "-6 US C%sT 1989 -6", "-6 Mexico C%sT 2010 -6", "-6 US C%sT"],
            "America/Mazatlan": ["-7:5:40 - LMT 1921_11_31_23_54_20 -7:5:40", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT"],
            "America/Menominee": ["-5:50:27 - LMT 1885_8_18_12 -5:50:27", "-6 US C%sT 1946 -6", "-6 Menominee C%sT 1969_3_27_2 -6", "-5 - EST 1973_3_29_2 -5", "-6 US C%sT"],
            "America/Merida": ["-5:58:28 - LMT 1922_0_1_0_1_32 -5:58:28", "-6 - CST 1981_11_23 -6", "-5 - EST 1982_11_2 -5", "-6 Mexico C%sT"],
            "America/Metlakatla": ["15:13:42 - LMT 1867_9_18 15:13:42", "-8:46:18 - LMT 1900_7_20_12 -8:46:18", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1983_9_30_2 -7", "-8 - MeST"],
            "America/Mexico_City": ["-6:36:36 - LMT 1922_0_1_0_23_24 -6:36:36", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 Mexico C%sT 2001_8_30_02 -5", "-6 - CST 2002_1_20 -6", "-6 Mexico C%sT"],
            "America/Miquelon": ["-3:44:40 - LMT 1911_4_15 -3:44:40", "-4 - AST 1980_4 -4", "-3 - PMST 1987 -3", "-3 Canada PM%sT"],
            "America/Moncton": ["-4:19:8 - LMT 1883_11_9 -4:19:8", "-5 - EST 1902_5_15 -5", "-4 Canada A%sT 1933 -4", "-4 Moncton A%sT 1942 -4", "-4 Canada A%sT 1946 -4", "-4 Moncton A%sT 1973 -4", "-4 Canada A%sT 1993 -4", "-4 Moncton A%sT 2007 -4", "-4 Canada A%sT"],
            "America/Monterrey": ["-6:41:16 - LMT 1921_11_31_23_18_44 -6:41:16", "-6 - CST 1988 -6", "-6 US C%sT 1989 -6", "-6 Mexico C%sT"],
            "America/Montevideo": ["-3:44:44 - LMT 1898_5_28 -3:44:44", "-3:44:44 - MMT 1920_4_1 -3:44:44", "-3:30 Uruguay UY%sT 1942_11_14 -3:30", "-3 Uruguay UY%sT"],
            "America/Montreal": ["-4:54:16 - LMT 1884 -4:54:16", "-5 Mont E%sT 1918 -5", "-5 Canada E%sT 1919 -5", "-5 Mont E%sT 1942_1_9_2 -5", "-5 Canada E%sT 1946 -5", "-5 Mont E%sT 1974 -5", "-5 Canada E%sT"],
            "America/Montserrat": ["-4:8:52 - LMT 1911_6_1_0_1 -4:8:52", "-4 - AST"],
            "America/Nassau": ["-5:9:30 - LMT 1912_2_2 -5:9:30", "-5 Bahamas E%sT 1976 -5", "-5 US E%sT"],
            "America/New_York": ["-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2", "-5 US E%sT 1920 -5", "-5 NYC E%sT 1942 -5", "-5 US E%sT 1946 -5", "-5 NYC E%sT 1967 -5", "-5 US E%sT"],
            "America/Nipigon": ["-5:53:4 - LMT 1895 -5:53:4", "-5 Canada E%sT 1940_8_29 -5", "-4 - EDT 1942_1_9_2 -5", "-5 Canada E%sT"],
            "America/Nome": ["12:58:21 - LMT 1867_9_18 12:58:21", "-11:1:38 - LMT 1900_7_20_12 -11:1:38", "-11 - NST 1942 -11", "-11 US N%sT 1946 -11", "-11 - NST 1967_3 -11", "-11 - BST 1969 -11", "-11 US B%sT 1983_9_30_2 -10", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT"],
            "America/Noronha": ["-2:9:40 - LMT 1914 -2:9:40", "-2 Brazil FN%sT 1990_8_17 -2", "-2 - FNT 1999_8_30 -2", "-2 Brazil FN%sT 2000_9_15 -1", "-2 - FNT 2001_8_13 -2", "-2 Brazil FN%sT 2002_9_1 -2", "-2 - FNT"],
            "America/North_Dakota/Beulah": ["-6:47:7 - LMT 1883_10_18_12_12_53 -6:47:7", "-7 US M%sT 2010_10_7_2 -6", "-6 US C%sT"],
            "America/North_Dakota/Center": ["-6:45:12 - LMT 1883_10_18_12_14_48 -6:45:12", "-7 US M%sT 1992_9_25_02 -6", "-6 US C%sT"],
            "America/North_Dakota/New_Salem": ["-6:45:39 - LMT 1883_10_18_12_14_21 -6:45:39", "-7 US M%sT 2003_9_26_02 -6", "-6 US C%sT"],
            "America/Ojinaga": ["-6:57:40 - LMT 1922_0_1_0_2_20 -6:57:40", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1996 -6", "-6 Mexico C%sT 1998 -6", "-6 - CST 1998_3_5_3 -6", "-7 Mexico M%sT 2010 -7", "-7 US M%sT"],
            "America/Panama": ["-5:18:8 - LMT 1890 -5:18:8", "-5:19:36 - CMT 1908_3_22 -5:19:36", "-5 - EST"],
            "America/Pangnirtung": ["0 - zzz 1921", "-4 NT_YK A%sT 1995_3_2_2 -4", "-5 Canada E%sT 1999_9_31_2 -4", "-6 Canada C%sT 2000_9_29_2 -5", "-5 Canada E%sT"],
            "America/Paramaribo": ["-3:40:40 - LMT 1911 -3:40:40", "-3:40:52 - PMT 1935 -3:40:52", "-3:40:36 - PMT 1945_9 -3:40:36", "-3:30 - NEGT 1975_10_20 -3:30", "-3:30 - SRT 1984_9 -3:30", "-3 - SRT"],
            "America/Phoenix": ["-7:28:18 - LMT 1883_10_18_11_31_42 -7:28:18", "-7 US M%sT 1944_0_1_00_1 -6", "-7 - MST 1944_3_1_00_1 -7", "-7 US M%sT 1944_9_1_00_1 -6", "-7 - MST 1967 -7", "-7 US M%sT 1968_2_21 -7", "-7 - MST"],
            "America/Port-au-Prince": ["-4:49:20 - LMT 1890 -4:49:20", "-4:49 - PPMT 1917_0_24_12 -4:49", "-5 Haiti E%sT"],
            "America/Port_of_Spain": ["-4:6:4 - LMT 1912_2_2 -4:6:4", "-4 - AST"],
            "America/Porto_Velho": ["-4:15:36 - LMT 1914 -4:15:36", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT"],
            "America/Puerto_Rico": ["-4:24:25 - LMT 1899_2_28_12 -4:24:25", "-4 - AST 1942_4_3 -4", "-4 US A%sT 1946 -4", "-4 - AST"],
            "America/Rainy_River": ["-6:18:16 - LMT 1895 -6:18:16", "-6 Canada C%sT 1940_8_29 -6", "-5 - CDT 1942_1_9_2 -6", "-6 Canada C%sT"],
            "America/Rankin_Inlet": ["0 - zzz 1957", "-6 NT_YK C%sT 2000_9_29_2 -5", "-5 - EST 2001_3_1_3 -5", "-6 Canada C%sT"],
            "America/Recife": ["-2:19:36 - LMT 1914 -2:19:36", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_15 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT"],
            "America/Regina": ["-6:58:36 - LMT 1905_8 -6:58:36", "-7 Regina M%sT 1960_3_24_2 -7", "-6 - CST"],
            "America/Resolute": ["0 - zzz 1947_7_31", "-6 NT_YK C%sT 2000_9_29_2 -5", "-5 - EST 2001_3_1_3 -5", "-6 Canada C%sT 2006_9_29_2 -5", "-5 - EST 2007_2_11_3 -5", "-6 Canada C%sT"],
            "America/Rio_Branco": ["-4:31:12 - LMT 1914 -4:31:12", "-5 Brazil AC%sT 1988_8_12 -5", "-5 - ACT 2008_5_24_00 -5", "-4 - AMT"],
            "America/Santa_Isabel": ["-7:39:28 - LMT 1922_0_1_0_20_32 -7:39:28", "-7 - MST 1924 -7", "-8 - PST 1927_5_10_23 -8", "-7 - MST 1930_10_15 -7", "-8 - PST 1931_3_1 -8", "-7 - PDT 1931_8_30 -7", "-8 - PST 1942_3_24 -8", "-7 - PWT 1945_7_14_23", "-7 - PPT 1945_10_12 -7", "-8 - PST 1948_3_5 -8", "-7 - PDT 1949_0_14 -7", "-8 - PST 1954 -8", "-8 CA P%sT 1961 -8", "-8 - PST 1976 -8", "-8 US P%sT 1996 -8", "-8 Mexico P%sT 2001 -8", "-8 US P%sT 2002_1_20 -8", "-8 Mexico P%sT"],
            "America/Santarem": ["-3:38:48 - LMT 1914 -3:38:48", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 2008_5_24_00 -4", "-3 - BRT"],
            "America/Santiago": ["-4:42:46 - LMT 1890 -4:42:46", "-4:42:46 - SMT 1910 -4:42:46", "-5 - CLT 1916_6_1 -5", "-4:42:46 - SMT 1918_8_1 -4:42:46", "-4 - CLT 1919_6_1 -4", "-4:42:46 - SMT 1927_8_1 -4:42:46", "-5 Chile CL%sT 1947_4_22 -5", "-4 Chile CL%sT"],
            "America/Santo_Domingo": ["-4:39:36 - LMT 1890 -4:39:36", "-4:40 - SDMT 1933_3_1_12 -4:40", "-5 DR E%sT 1974_9_27 -5", "-4 - AST 2000_9_29_02 -4", "-5 US E%sT 2000_11_3_01 -5", "-4 - AST"],
            "America/Sao_Paulo": ["-3:6:28 - LMT 1914 -3:6:28", "-3 Brazil BR%sT 1963_9_23_00 -3", "-2 - BRST 1964 -2", "-3 Brazil BR%sT"],
            "America/Scoresbysund": ["-1:27:52 - LMT 1916_6_28 -1:27:52", "-2 - CGT 1980_3_6_2 -2", "-2 C-Eur CG%sT 1981_2_29 -2", "-1 EU EG%sT"],
            "America/Sitka": ["14:58:47 - LMT 1867_9_18 14:58:47", "-9:1:13 - LMT 1900_7_20_12 -9:1:13", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1983_9_30_2 -7", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT"],
            "America/St_Johns": ["-3:30:52 - LMT 1884 -3:30:52", "-3:30:52 StJohns N%sT 1918 -3:30:52", "-3:30:52 Canada N%sT 1919 -3:30:52", "-3:30:52 StJohns N%sT 1935_2_30 -3:30:52", "-3:30 StJohns N%sT 1942_4_11 -3:30", "-3:30 Canada N%sT 1946 -3:30", "-3:30 StJohns N%sT 2011_10 -2:30", "-3:30 Canada N%sT"],
            "America/St_Kitts": ["-4:10:52 - LMT 1912_2_2 -4:10:52", "-4 - AST"],
            "America/St_Lucia": ["-4:4 - LMT 1890 -4:4", "-4:4 - CMT 1912 -4:4", "-4 - AST"],
            "America/St_Thomas": ["-4:19:44 - LMT 1911_6 -4:19:44", "-4 - AST"],
            "America/St_Vincent": ["-4:4:56 - LMT 1890 -4:4:56", "-4:4:56 - KMT 1912 -4:4:56", "-4 - AST"],
            "America/Swift_Current": ["-7:11:20 - LMT 1905_8 -7:11:20", "-7 Canada M%sT 1946_3_28_2 -7", "-7 Regina M%sT 1950 -7", "-7 Swift M%sT 1972_3_30_2 -7", "-6 - CST"],
            "America/Tegucigalpa": ["-5:48:52 - LMT 1921_3 -5:48:52", "-6 Hond C%sT"],
            "America/Thule": ["-4:35:8 - LMT 1916_6_28 -4:35:8", "-4 Thule A%sT"],
            "America/Thunder_Bay": ["-5:57 - LMT 1895 -5:57", "-6 - CST 1910 -6", "-5 - EST 1942 -5", "-5 Canada E%sT 1970 -5", "-5 Mont E%sT 1973 -5", "-5 - EST 1974 -5", "-5 Canada E%sT"],
            "America/Tijuana": ["-7:48:4 - LMT 1922_0_1_0_11_56 -7:48:4", "-7 - MST 1924 -7", "-8 - PST 1927_5_10_23 -8", "-7 - MST 1930_10_15 -7", "-8 - PST 1931_3_1 -8", "-7 - PDT 1931_8_30 -7", "-8 - PST 1942_3_24 -8", "-7 - PWT 1945_7_14_23", "-7 - PPT 1945_10_12 -7", "-8 - PST 1948_3_5 -8", "-7 - PDT 1949_0_14 -7", "-8 - PST 1954 -8", "-8 CA P%sT 1961 -8", "-8 - PST 1976 -8", "-8 US P%sT 1996 -8", "-8 Mexico P%sT 2001 -8", "-8 US P%sT 2002_1_20 -8", "-8 Mexico P%sT 2010 -8", "-8 US P%sT"],
            "America/Toronto": ["-5:17:32 - LMT 1895 -5:17:32", "-5 Canada E%sT 1919 -5", "-5 Toronto E%sT 1942_1_9_2 -5", "-5 Canada E%sT 1946 -5", "-5 Toronto E%sT 1974 -5", "-5 Canada E%sT"],
            "America/Tortola": ["-4:18:28 - LMT 1911_6 -4:18:28", "-4 - AST"],
            "America/Vancouver": ["-8:12:28 - LMT 1884 -8:12:28", "-8 Vanc P%sT 1987 -8", "-8 Canada P%sT"],
            "America/Whitehorse": ["-9:0:12 - LMT 1900_7_20 -9:0:12", "-9 NT_YK Y%sT 1966_6_1_2 -9", "-8 NT_YK P%sT 1980 -8", "-8 Canada P%sT"],
            "America/Winnipeg": ["-6:28:36 - LMT 1887_6_16 -6:28:36", "-6 Winn C%sT 2006 -6", "-6 Canada C%sT"],
            "America/Yakutat": ["14:41:5 - LMT 1867_9_18 14:41:5", "-9:18:55 - LMT 1900_7_20_12 -9:18:55", "-9 - YST 1942 -9", "-9 US Y%sT 1946 -9", "-9 - YST 1969 -9", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT"],
            "America/Yellowknife": ["0 - zzz 1935", "-7 NT_YK M%sT 1980 -7", "-7 Canada M%sT"],
            "Antarctica/Casey": ["0 - zzz 1969", "8 - WST 2009_9_18_2 8", "11 - CAST 2010_2_5_2 11", "8 - WST 2011_9_28_2 8", "11 - CAST 2012_1_21_17", "8 - WST"],
            "Antarctica/Davis": ["0 - zzz 1957_0_13", "7 - DAVT 1964_10 7", "0 - zzz 1969_1", "7 - DAVT 2009_9_18_2 7", "5 - DAVT 2010_2_10_20", "7 - DAVT 2011_9_28_2 7", "5 - DAVT 2012_1_21_20", "7 - DAVT"],
            "Antarctica/DumontDUrville": ["0 - zzz 1947", "10 - PMT 1952_0_14 10", "0 - zzz 1956_10", "10 - DDUT"],
            "Antarctica/Macquarie": ["0 - zzz 1899_10", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1919_3 10", "0 - zzz 1948_2_25", "10 Aus EST 1967 10", "10 AT EST 2010_3_4_3 11", "11 - MIST"],
            "Antarctica/Mawson": ["0 - zzz 1954_1_13", "6 - MAWT 2009_9_18_2 6", "5 - MAWT"],
            "Antarctica/McMurdo": ["0 - zzz 1956", "12 NZAQ NZ%sT"],
            "Antarctica/Palmer": ["0 - zzz 1965", "-4 ArgAQ AR%sT 1969_9_5 -4", "-3 ArgAQ AR%sT 1982_4 -3", "-4 ChileAQ CL%sT"],
            "Antarctica/Rothera": ["0 - zzz 1976_11_1", "-3 - ROTT"],
            "Antarctica/Syowa": ["0 - zzz 1957_0_29", "3 - SYOT"],
            "Antarctica/Vostok": ["0 - zzz 1957_11_16", "6 - VOST"],
            "Europe/Oslo": ["0:43 - LMT 1895_0_1 0:43", "1 Norway CE%sT 1940_7_10_23 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Norway CE%sT 1980 1", "1 EU CE%sT"],
            "Asia/Aden": ["2:59:54 - LMT 1950 2:59:54", "3 - AST"],
            "Asia/Almaty": ["5:7:48 - LMT 1924_4_2 5:7:48", "5 - ALMT 1930_5_21 5", "6 RussiaAsia ALM%sT 1991 6", "6 - ALMT 1992 6", "6 RussiaAsia ALM%sT 2005_2_15 6", "6 - ALMT"],
            "Asia/Amman": ["2:23:44 - LMT 1931 2:23:44", "2 Jordan EE%sT"],
            "Asia/Anadyr": ["11:49:56 - LMT 1924_4_2 11:49:56", "12 - ANAT 1930_5_21 12", "13 Russia ANA%sT 1982_3_1_0 13", "12 Russia ANA%sT 1991_2_31_2 12", "11 Russia ANA%sT 1992_0_19_2 11", "12 Russia ANA%sT 2010_2_28_2 12", "11 Russia ANA%sT 2011_2_27_2 11", "12 - ANAT"],
            "Asia/Aqtau": ["3:21:4 - LMT 1924_4_2 3:21:4", "4 - FORT 1930_5_21 4", "5 - FORT 1963 5", "5 - SHET 1981_9_1 5", "6 - SHET 1982_3_1 6", "5 RussiaAsia SHE%sT 1991 5", "5 - SHET 1991_11_16 5", "5 RussiaAsia AQT%sT 1995_2_26_2 5", "4 RussiaAsia AQT%sT 2005_2_15 4", "5 - AQTT"],
            "Asia/Aqtobe": ["3:48:40 - LMT 1924_4_2 3:48:40", "4 - AKTT 1930_5_21 4", "5 - AKTT 1981_3_1 5", "6 - AKTST 1981_9_1 6", "6 - AKTT 1982_3_1 6", "5 RussiaAsia AKT%sT 1991 5", "5 - AKTT 1991_11_16 5", "5 RussiaAsia AQT%sT 2005_2_15 5", "5 - AQTT"],
            "Asia/Ashgabat": ["3:53:32 - LMT 1924_4_2 3:53:32", "4 - ASHT 1930_5_21 4", "5 RussiaAsia ASH%sT 1991_2_31_2 5", "4 RussiaAsia ASH%sT 1991_9_27 4", "4 RussiaAsia TM%sT 1992_0_19_2 4", "5 - TMT"],
            "Asia/Baghdad": ["2:57:40 - LMT 1890 2:57:40", "2:57:36 - BMT 1918 2:57:36", "3 - AST 1982_4 3", "3 Iraq A%sT"],
            "Asia/Bahrain": ["3:22:20 - LMT 1920 3:22:20", "4 - GST 1972_5 4", "3 - AST"],
            "Asia/Baku": ["3:19:24 - LMT 1924_4_2 3:19:24", "3 - BAKT 1957_2 3", "4 RussiaAsia BAK%sT 1991_2_31_2 4", "4 - BAKST 1991_7_30 4", "3 RussiaAsia AZ%sT 1992_8_26_23 4", "4 - AZT 1996 4", "4 EUAsia AZ%sT 1997 4", "4 Azer AZ%sT"],
            "Asia/Bangkok": ["6:42:4 - LMT 1880 6:42:4", "6:42:4 - BMT 1920_3 6:42:4", "7 - ICT"],
            "Asia/Beirut": ["2:22 - LMT 1880 2:22", "2 Lebanon EE%sT"],
            "Asia/Bishkek": ["4:58:24 - LMT 1924_4_2 4:58:24", "5 - FRUT 1930_5_21 5", "6 RussiaAsia FRU%sT 1991_2_31_2 6", "6 - FRUST 1991_7_31_2 6", "5 Kyrgyz KG%sT 2005_7_12 6", "6 - KGT"],
            "Asia/Brunei": ["7:39:40 - LMT 1926_2 7:39:40", "7:30 - BNT 1933 7:30", "8 - BNT"],
            "Asia/Choibalsan": ["7:38 - LMT 1905_7 7:38", "7 - ULAT 1978 7", "8 - ULAT 1983_3 8", "9 Mongol CHO%sT 2008_2_31 9", "8 Mongol CHO%sT"],
            "Asia/Chongqing": ["7:6:20 - LMT 1928 7:6:20", "7 - LONT 1980_4 7", "8 PRC C%sT"],
            "Asia/Colombo": ["5:19:24 - LMT 1880 5:19:24", "5:19:32 - MMT 1906 5:19:32", "5:30 - IST 1942_0_5 5:30", "6 - IHST 1942_8 6", "6:30 - IST 1945_9_16_2 6:30", "5:30 - IST 1996_4_25_0 5:30", "6:30 - LKT 1996_9_26_0_30 6:30", "6 - LKT 2006_3_15_0_30 6", "5:30 - IST"],
            "Asia/Damascus": ["2:25:12 - LMT 1920 2:25:12", "2 Syria EE%sT"],
            "Asia/Dhaka": ["6:1:40 - LMT 1890 6:1:40", "5:53:20 - HMT 1941_9 5:53:20", "6:30 - BURT 1942_4_15 6:30", "5:30 - IST 1942_8 5:30", "6:30 - BURT 1951_8_30 6:30", "6 - DACT 1971_2_26 6", "6 - BDT 2009 6", "6 Dhaka BD%sT"],
            "Asia/Dili": ["8:22:20 - LMT 1912 8:22:20", "8 - TLT 1942_1_21_23 8", "9 - JST 1945_8_23 9", "9 - TLT 1976_4_3 9", "8 - CIT 2000_8_17_00 8", "9 - TLT"],
            "Asia/Dubai": ["3:41:12 - LMT 1920 3:41:12", "4 - GST"],
            "Asia/Dushanbe": ["4:35:12 - LMT 1924_4_2 4:35:12", "5 - DUST 1930_5_21 5", "6 RussiaAsia DUS%sT 1991_2_31_2 6", "6 - DUSST 1991_8_9_2 5", "5 - TJT"],
            "Asia/Gaza": ["2:17:52 - LMT 1900_9 2:17:52", "2 Zion EET 1948_4_15 2", "2 EgyptAsia EE%sT 1967_5_5 3", "2 Zion I%sT 1996 2", "2 Jordan EE%sT 1999 2", "2 Palestine EE%sT 2008_7_29_0 3", "2 - EET 2008_8 2", "2 Palestine EE%sT 2010 2", "2 - EET 2010_2_27_0_1 2", "2 Palestine EE%sT 2011_7_1 3", "2 - EET 2012 2", "2 Palestine EE%sT"],
            "Asia/Harbin": ["8:26:44 - LMT 1928 8:26:44", "8:30 - CHAT 1932_2 8:30", "8 - CST 1940 8", "9 - CHAT 1966_4 9", "8:30 - CHAT 1980_4 8:30", "8 PRC C%sT"],
            "Asia/Hebron": ["2:20:23 - LMT 1900_9 2:20:23", "2 Zion EET 1948_4_15 2", "2 EgyptAsia EE%sT 1967_5_5 3", "2 Zion I%sT 1996 2", "2 Jordan EE%sT 1999 2", "2 Palestine EE%sT"],
            "Asia/Ho_Chi_Minh": ["7:6:40 - LMT 1906_5_9 7:6:40", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT"],
            "Asia/Hong_Kong": ["7:36:42 - LMT 1904_9_30 7:36:42", "8 HK HK%sT 1941_11_25 8", "9 - JST 1945_8_15 9", "8 HK HK%sT"],
            "Asia/Hovd": ["6:6:36 - LMT 1905_7 6:6:36", "6 - HOVT 1978 6", "7 Mongol HOV%sT"],
            "Asia/Irkutsk": ["6:57:20 - LMT 1880 6:57:20", "6:57:20 - IMT 1920_0_25 6:57:20", "7 - IRKT 1930_5_21 7", "8 Russia IRK%sT 1991_2_31_2 8", "7 Russia IRK%sT 1992_0_19_2 7", "8 Russia IRK%sT 2011_2_27_2 8", "9 - IRKT"],
            "Asia/Jakarta": ["7:7:12 - LMT 1867_7_10 7:7:12", "7:7:12 - JMT 1923_11_31_23_47_12 7:7:12", "7:20 - JAVT 1932_10 7:20", "7:30 - WIT 1942_2_23 7:30", "9 - JST 1945_8_23 9", "7:30 - WIT 1948_4 7:30", "8 - WIT 1950_4 8", "7:30 - WIT 1964 7:30", "7 - WIT"],
            "Asia/Jayapura": ["9:22:48 - LMT 1932_10 9:22:48", "9 - EIT 1944_8_1 9", "9:30 - CST 1964 9:30", "9 - EIT"],
            "Asia/Jerusalem": ["2:20:56 - LMT 1880 2:20:56", "2:20:40 - JMT 1918 2:20:40", "2 Zion I%sT"],
            "Asia/Kabul": ["4:36:48 - LMT 1890 4:36:48", "4 - AFT 1945 4", "4:30 - AFT"],
            "Asia/Kamchatka": ["10:34:36 - LMT 1922_10_10 10:34:36", "11 - PETT 1930_5_21 11", "12 Russia PET%sT 1991_2_31_2 12", "11 Russia PET%sT 1992_0_19_2 11", "12 Russia PET%sT 2010_2_28_2 12", "11 Russia PET%sT 2011_2_27_2 11", "12 - PETT"],
            "Asia/Karachi": ["4:28:12 - LMT 1907 4:28:12", "5:30 - IST 1942_8 5:30", "6:30 - IST 1945_9_15 6:30", "5:30 - IST 1951_8_30 5:30", "5 - KART 1971_2_26 5", "5 Pakistan PK%sT"],
            "Asia/Kashgar": ["5:3:56 - LMT 1928 5:3:56", "5:30 - KAST 1940 5:30", "5 - KAST 1980_4 5", "8 PRC C%sT"],
            "Asia/Kathmandu": ["5:41:16 - LMT 1920 5:41:16", "5:30 - IST 1986 5:30", "5:45 - NPT"],
            "Asia/Khandyga": ["9:2:13 - LMT 1919_11_15 9:2:13", "8 - YAKT 1930_5_21 8", "9 Russia YAK%sT 1991_2_31_2 9", "8 Russia YAK%sT 1992_0_19_2 8", "9 Russia YAK%sT 2004 9", "10 Russia VLA%sT 2011_2_27_2 10", "11 - VLAT 2011_8_13_0 11", "10 - YAKT"],
            "Asia/Kolkata": ["5:53:28 - LMT 1880 5:53:28", "5:53:20 - HMT 1941_9 5:53:20", "6:30 - BURT 1942_4_15 6:30", "5:30 - IST 1942_8 5:30", "6:30 - IST 1945_9_15 6:30", "5:30 - IST"],
            "Asia/Krasnoyarsk": ["6:11:20 - LMT 1920_0_6 6:11:20", "6 - KRAT 1930_5_21 6", "7 Russia KRA%sT 1991_2_31_2 7", "6 Russia KRA%sT 1992_0_19_2 6", "7 Russia KRA%sT 2011_2_27_2 7", "8 - KRAT"],
            "Asia/Kuala_Lumpur": ["6:46:46 - LMT 1901_0_1 6:46:46", "6:55:25 - SMT 1905_5_1 6:55:25", "7 - MALT 1933_0_1 7", "7:20 - MALST 1936_0_1 7:20", "7:20 - MALT 1941_8_1 7:20", "7:30 - MALT 1942_1_16 7:30", "9 - JST 1945_8_12 9", "7:30 - MALT 1982_0_1 7:30", "8 - MYT"],
            "Asia/Kuching": ["7:21:20 - LMT 1926_2 7:21:20", "7:30 - BORT 1933 7:30", "8 NBorneo BOR%sT 1942_1_16 8", "9 - JST 1945_8_12 9", "8 - BORT 1982_0_1 8", "8 - MYT"],
            "Asia/Kuwait": ["3:11:56 - LMT 1950 3:11:56", "3 - AST"],
            "Asia/Macau": ["7:34:20 - LMT 1912 7:34:20", "8 Macau MO%sT 1999_11_20 8", "8 PRC C%sT"],
            "Asia/Magadan": ["10:3:12 - LMT 1924_4_2 10:3:12", "10 - MAGT 1930_5_21 10", "11 Russia MAG%sT 1991_2_31_2 11", "10 Russia MAG%sT 1992_0_19_2 10", "11 Russia MAG%sT 2011_2_27_2 11", "12 - MAGT"],
            "Asia/Makassar": ["7:57:36 - LMT 1920 7:57:36", "7:57:36 - MMT 1932_10 7:57:36", "8 - CIT 1942_1_9 8", "9 - JST 1945_8_23 9", "8 - CIT"],
            "Asia/Manila": ["-15:56 - LMT 1844_11_31 -15:56", "8:4 - LMT 1899_4_11 8:4", "8 Phil PH%sT 1942_4 8", "9 - JST 1944_10 9", "8 Phil PH%sT"],
            "Asia/Muscat": ["3:54:24 - LMT 1920 3:54:24", "4 - GST"],
            "Asia/Nicosia": ["2:13:28 - LMT 1921_10_14 2:13:28", "2 Cyprus EE%sT 1998_8 3", "2 EUAsia EE%sT"],
            "Asia/Novokuznetsk": ["5:48:48 - NMT 1920_0_6 5:48:48", "6 - KRAT 1930_5_21 6", "7 Russia KRA%sT 1991_2_31_2 7", "6 Russia KRA%sT 1992_0_19_2 6", "7 Russia KRA%sT 2010_2_28_2 7", "6 Russia NOV%sT 2011_2_27_2 6", "7 - NOVT"],
            "Asia/Novosibirsk": ["5:31:40 - LMT 1919_11_14_6 5:31:40", "6 - NOVT 1930_5_21 6", "7 Russia NOV%sT 1991_2_31_2 7", "6 Russia NOV%sT 1992_0_19_2 6", "7 Russia NOV%sT 1993_4_23 8", "6 Russia NOV%sT 2011_2_27_2 6", "7 - NOVT"],
            "Asia/Omsk": ["4:53:36 - LMT 1919_10_14 4:53:36", "5 - OMST 1930_5_21 5", "6 Russia OMS%sT 1991_2_31_2 6", "5 Russia OMS%sT 1992_0_19_2 5", "6 Russia OMS%sT 2011_2_27_2 6", "7 - OMST"],
            "Asia/Oral": ["3:25:24 - LMT 1924_4_2 3:25:24", "4 - URAT 1930_5_21 4", "5 - URAT 1981_3_1 5", "6 - URAST 1981_9_1 6", "6 - URAT 1982_3_1 6", "5 RussiaAsia URA%sT 1989_2_26_2 5", "4 RussiaAsia URA%sT 1991 4", "4 - URAT 1991_11_16 4", "4 RussiaAsia ORA%sT 2005_2_15 4", "5 - ORAT"],
            "Asia/Phnom_Penh": ["6:59:40 - LMT 1906_5_9 6:59:40", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT"],
            "Asia/Pontianak": ["7:17:20 - LMT 1908_4 7:17:20", "7:17:20 - PMT 1932_10 7:17:20", "7:30 - WIT 1942_0_29 7:30", "9 - JST 1945_8_23 9", "7:30 - WIT 1948_4 7:30", "8 - WIT 1950_4 8", "7:30 - WIT 1964 7:30", "8 - CIT 1988_0_1 8", "7 - WIT"],
            "Asia/Pyongyang": ["8:23 - LMT 1890 8:23", "8:30 - KST 1904_11 8:30", "9 - KST 1928 9", "8:30 - KST 1932 8:30", "9 - KST 1954_2_21 9", "8 - KST 1961_7_10 8", "9 - KST"],
            "Asia/Qatar": ["3:26:8 - LMT 1920 3:26:8", "4 - GST 1972_5 4", "3 - AST"],
            "Asia/Qyzylorda": ["4:21:52 - LMT 1924_4_2 4:21:52", "4 - KIZT 1930_5_21 4", "5 - KIZT 1981_3_1 5", "6 - KIZST 1981_9_1 6", "6 - KIZT 1982_3_1 6", "5 RussiaAsia KIZ%sT 1991 5", "5 - KIZT 1991_11_16 5", "5 - QYZT 1992_0_19_2 5", "6 RussiaAsia QYZ%sT 2005_2_15 6", "6 - QYZT"],
            "Asia/Rangoon": ["6:24:40 - LMT 1880 6:24:40", "6:24:40 - RMT 1920 6:24:40", "6:30 - BURT 1942_4 6:30", "9 - JST 1945_4_3 9", "6:30 - MMT"],
            "Asia/Riyadh": ["3:6:52 - LMT 1950 3:6:52", "3 - AST"],
            "Asia/Sakhalin": ["9:30:48 - LMT 1905_7_23 9:30:48", "9 - CJT 1938 9", "9 - JST 1945_7_25 9", "11 Russia SAK%sT 1991_2_31_2 11", "10 Russia SAK%sT 1992_0_19_2 10", "11 Russia SAK%sT 1997_2_30_2 11", "10 Russia SAK%sT 2011_2_27_2 10", "11 - SAKT"],
            "Asia/Samarkand": ["4:27:12 - LMT 1924_4_2 4:27:12", "4 - SAMT 1930_5_21 4", "5 - SAMT 1981_3_1 5", "6 - SAMST 1981_9_1 6", "6 - TAST 1982_3_1 6", "5 RussiaAsia SAM%sT 1991_8_1 6", "5 RussiaAsia UZ%sT 1992 5", "5 - UZT"],
            "Asia/Seoul": ["8:27:52 - LMT 1890 8:27:52", "8:30 - KST 1904_11 8:30", "9 - KST 1928 9", "8:30 - KST 1932 8:30", "9 - KST 1954_2_21 9", "8 ROK K%sT 1961_7_10 8", "8:30 - KST 1968_9 8:30", "9 ROK K%sT"],
            "Asia/Shanghai": ["8:5:57 - LMT 1928 8:5:57", "8 Shang C%sT 1949 8", "8 PRC C%sT"],
            "Asia/Singapore": ["6:55:25 - LMT 1901_0_1 6:55:25", "6:55:25 - SMT 1905_5_1 6:55:25", "7 - MALT 1933_0_1 7", "7:20 - MALST 1936_0_1 7:20", "7:20 - MALT 1941_8_1 7:20", "7:30 - MALT 1942_1_16 7:30", "9 - JST 1945_8_12 9", "7:30 - MALT 1965_7_9 7:30", "7:30 - SGT 1982_0_1 7:30", "8 - SGT"],
            "Asia/Taipei": ["8:6 - LMT 1896 8:6", "8 Taiwan C%sT"],
            "Asia/Tashkent": ["4:37:12 - LMT 1924_4_2 4:37:12", "5 - TAST 1930_5_21 5", "6 RussiaAsia TAS%sT 1991_2_31_2 6", "5 RussiaAsia TAS%sT 1991_8_1 6", "5 RussiaAsia UZ%sT 1992 5", "5 - UZT"],
            "Asia/Tbilisi": ["2:59:16 - LMT 1880 2:59:16", "2:59:16 - TBMT 1924_4_2 2:59:16", "3 - TBIT 1957_2 3", "4 RussiaAsia TBI%sT 1991_2_31_2 4", "4 - TBIST 1991_3_9 4", "3 RussiaAsia GE%sT 1992 3", "3 E-EurAsia GE%sT 1994_8_25 4", "4 E-EurAsia GE%sT 1996_9_27 5", "5 - GEST 1997_2_30 5", "4 E-EurAsia GE%sT 2004_5_27 5", "3 RussiaAsia GE%sT 2005_2_27_2 3", "4 - GET"],
            "Asia/Tehran": ["3:25:44 - LMT 1916 3:25:44", "3:25:44 - TMT 1946 3:25:44", "3:30 - IRST 1977_10 3:30", "4 Iran IR%sT 1979 4", "3:30 Iran IR%sT"],
            "Asia/Thimphu": ["5:58:36 - LMT 1947_7_15 5:58:36", "5:30 - IST 1987_9 5:30", "6 - BTT"],
            "Asia/Tokyo": ["9:18:59 - LMT 1887_11_31_15", "9 - JST 1896 9", "9 - CJT 1938 9", "9 Japan J%sT"],
            "Asia/Ulaanbaatar": ["7:7:32 - LMT 1905_7 7:7:32", "7 - ULAT 1978 7", "8 Mongol ULA%sT"],
            "Asia/Urumqi": ["5:50:20 - LMT 1928 5:50:20", "6 - URUT 1980_4 6", "8 PRC C%sT"],
            "Asia/Ust-Nera": ["9:32:54 - LMT 1919_11_15 9:32:54", "8 - YAKT 1930_5_21 8", "9 Russia YAKT 1981_3_1 9", "11 Russia MAG%sT 1991_2_31_2 11", "10 Russia MAG%sT 1992_0_19_2 10", "11 Russia MAG%sT 2011_2_27_2 11", "12 - MAGT 2011_8_13_0 12", "11 - VLAT"],
            "Asia/Vientiane": ["6:50:24 - LMT 1906_5_9 6:50:24", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT"],
            "Asia/Vladivostok": ["8:47:44 - LMT 1922_10_15 8:47:44", "9 - VLAT 1930_5_21 9", "10 Russia VLA%sT 1991_2_31_2 10", "9 Russia VLA%sST 1992_0_19_2 9", "10 Russia VLA%sT 2011_2_27_2 10", "11 - VLAT"],
            "Asia/Yakutsk": ["8:38:40 - LMT 1919_11_15 8:38:40", "8 - YAKT 1930_5_21 8", "9 Russia YAK%sT 1991_2_31_2 9", "8 Russia YAK%sT 1992_0_19_2 8", "9 Russia YAK%sT 2011_2_27_2 9", "10 - YAKT"],
            "Asia/Yekaterinburg": ["4:2:24 - LMT 1919_6_15_4 4:2:24", "4 - SVET 1930_5_21 4", "5 Russia SVE%sT 1991_2_31_2 5", "4 Russia SVE%sT 1992_0_19_2 4", "5 Russia YEK%sT 2011_2_27_2 5", "6 - YEKT"],
            "Asia/Yerevan": ["2:58 - LMT 1924_4_2 2:58", "3 - YERT 1957_2 3", "4 RussiaAsia YER%sT 1991_2_31_2 4", "4 - YERST 1991_8_23 4", "3 RussiaAsia AM%sT 1995_8_24_2 3", "4 - AMT 1997 4", "4 RussiaAsia AM%sT 2012_2_25_2 4", "4 - AMT"],
            "Atlantic/Azores": ["-1:42:40 - LMT 1884 -1:42:40", "-1:54:32 - HMT 1911_4_24 -1:54:32", "-2 Port AZO%sT 1966_3_3_2 -2", "-1 Port AZO%sT 1983_8_25_1 -1", "-1 W-Eur AZO%sT 1992_8_27_1 -1", "0 EU WE%sT 1993_2_28_1", "-1 EU AZO%sT"],
            "Atlantic/Bermuda": ["-4:19:18 - LMT 1930_0_1_2 -4:19:18", "-4 - AST 1974_3_28_2 -4", "-4 Bahamas A%sT 1976 -4", "-4 US A%sT"],
            "Atlantic/Canary": ["-1:1:36 - LMT 1922_2 -1:1:36", "-1 - CANT 1946_8_30_1 -1", "0 - WET 1980_3_6_0", "1 - WEST 1980_8_28_0", "0 EU WE%sT"],
            "Atlantic/Cape_Verde": ["-1:34:4 - LMT 1907 -1:34:4", "-2 - CVT 1942_8 -2", "-1 - CVST 1945_9_15 -1", "-2 - CVT 1975_10_25_2 -2", "-1 - CVT"],
            "Atlantic/Faroe": ["-0:27:4 - LMT 1908_0_11 -0:27:4", "0 - WET 1981", "0 EU WE%sT"],
            "Atlantic/Madeira": ["-1:7:36 - LMT 1884 -1:7:36", "-1:7:36 - FMT 1911_4_24 -1:7:36", "-1 Port MAD%sT 1966_3_3_2 -1", "0 Port WE%sT 1983_8_25_1", "0 EU WE%sT"],
            "Atlantic/Reykjavik": ["-1:27:24 - LMT 1837 -1:27:24", "-1:27:48 - RMT 1908 -1:27:48", "-1 Iceland IS%sT 1968_3_7_1 -1", "0 - GMT"],
            "Atlantic/South_Georgia": ["-2:26:8 - LMT 1890 -2:26:8", "-2 - GST"],
            "Atlantic/St_Helena": ["-0:22:48 - LMT 1890 -0:22:48", "-0:22:48 - JMT 1951 -0:22:48", "0 - GMT"],
            "Atlantic/Stanley": ["-3:51:24 - LMT 1890 -3:51:24", "-3:51:24 - SMT 1912_2_12 -3:51:24", "-4 Falk FK%sT 1983_4 -4", "-3 Falk FK%sT 1985_8_15 -3", "-4 Falk FK%sT 2010_8_5_02 -4", "-3 - FKST"],
            "Australia/Adelaide": ["9:14:20 - LMT 1895_1 9:14:20", "9 - CST 1899_4 9", "9:30 Aus CST 1971 9:30", "9:30 AS CST"],
            "Australia/Brisbane": ["10:12:8 - LMT 1895 10:12:8", "10 Aus EST 1971 10", "10 AQ EST"],
            "Australia/Broken_Hill": ["9:25:48 - LMT 1895_1 9:25:48", "10 - EST 1896_7_23 10", "9 - CST 1899_4 9", "9:30 Aus CST 1971 9:30", "9:30 AN CST 2000 10:30", "9:30 AS CST"],
            "Australia/Currie": ["9:35:28 - LMT 1895_8 9:35:28", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1971_6 10", "10 AT EST"],
            "Australia/Darwin": ["8:43:20 - LMT 1895_1 8:43:20", "9 - CST 1899_4 9", "9:30 Aus CST"],
            "Australia/Eucla": ["8:35:28 - LMT 1895_11 8:35:28", "8:45 Aus CWST 1943_6 8:45", "8:45 AW CWST"],
            "Australia/Hobart": ["9:49:16 - LMT 1895_8 9:49:16", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1967 10", "10 AT EST"],
            "Australia/Lindeman": ["9:55:56 - LMT 1895 9:55:56", "10 Aus EST 1971 10", "10 AQ EST 1992_6 10", "10 Holiday EST"],
            "Australia/Lord_Howe": ["10:36:20 - LMT 1895_1 10:36:20", "10 - EST 1981_2 10", "10:30 LH LHST"],
            "Australia/Melbourne": ["9:39:52 - LMT 1895_1 9:39:52", "10 Aus EST 1971 10", "10 AV EST"],
            "Australia/Perth": ["7:43:24 - LMT 1895_11 7:43:24", "8 Aus WST 1943_6 8", "8 AW WST"],
            "Australia/Sydney": ["10:4:52 - LMT 1895_1 10:4:52", "10 Aus EST 1971 10", "10 AN EST"],
            CET: ["1 C-Eur CE%sT"],
            CST6CDT: ["-6 US C%sT"],
            EET: ["2 EU EE%sT"],
            EST: ["-5 - EST"],
            EST5EDT: ["-5 US E%sT"],
            HST: ["-10 - HST"],
            MET: ["1 C-Eur ME%sT"],
            MST: ["-7 - MST"],
            MST7MDT: ["-7 US M%sT"],
            PST8PDT: ["-8 US P%sT"],
            WET: ["0 EU WE%sT"],
            "Etc/GMT": ["0 - GMT"],
            "Etc/GMT+1": ["-1 - GMT+1"],
            "Etc/GMT+10": ["-10 - GMT+10"],
            "Etc/GMT+11": ["-11 - GMT+11"],
            "Etc/GMT+12": ["-12 - GMT+12"],
            "Etc/GMT+2": ["-2 - GMT+2"],
            "Etc/GMT+3": ["-3 - GMT+3"],
            "Etc/GMT+4": ["-4 - GMT+4"],
            "Etc/GMT+5": ["-5 - GMT+5"],
            "Etc/GMT+6": ["-6 - GMT+6"],
            "Etc/GMT+7": ["-7 - GMT+7"],
            "Etc/GMT+8": ["-8 - GMT+8"],
            "Etc/GMT+9": ["-9 - GMT+9"],
            "Etc/GMT-1": ["1 - GMT-1"],
            "Etc/GMT-10": ["10 - GMT-10"],
            "Etc/GMT-11": ["11 - GMT-11"],
            "Etc/GMT-12": ["12 - GMT-12"],
            "Etc/GMT-13": ["13 - GMT-13"],
            "Etc/GMT-14": ["14 - GMT-14"],
            "Etc/GMT-2": ["2 - GMT-2"],
            "Etc/GMT-3": ["3 - GMT-3"],
            "Etc/GMT-4": ["4 - GMT-4"],
            "Etc/GMT-5": ["5 - GMT-5"],
            "Etc/GMT-6": ["6 - GMT-6"],
            "Etc/GMT-7": ["7 - GMT-7"],
            "Etc/GMT-8": ["8 - GMT-8"],
            "Etc/GMT-9": ["9 - GMT-9"],
            "Etc/UCT": ["0 - UCT"],
            "Etc/UTC": ["0 - UTC"],
            "Europe/Amsterdam": ["0:19:32 - LMT 1835 0:19:32", "0:19:32 Neth %s 1937_6_1 1:19:32", "0:20 Neth NE%sT 1940_4_16_0 0:20", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Neth CE%sT 1977 1", "1 EU CE%sT"],
            "Europe/Andorra": ["0:6:4 - LMT 1901 0:6:4", "0 - WET 1946_8_30", "1 - CET 1985_2_31_2 1", "1 EU CE%sT"],
            "Europe/Athens": ["1:34:52 - LMT 1895_8_14 1:34:52", "1:34:52 - AMT 1916_6_28_0_1 1:34:52", "2 Greece EE%sT 1941_3_30 3", "1 Greece CE%sT 1944_3_4 1", "2 Greece EE%sT 1981 2", "2 EU EE%sT"],
            "Europe/Belgrade": ["1:22 - LMT 1884 1:22", "1 - CET 1941_3_18_23 1", "1 C-Eur CE%sT 1945 1", "1 - CET 1945_4_8_2 1", "2 - CEST 1945_8_16_2 1", "1 - CET 1982_10_27 1", "1 EU CE%sT"],
            "Europe/Berlin": ["0:53:28 - LMT 1893_3 0:53:28", "1 C-Eur CE%sT 1945_4_24_2 2", "1 SovietZone CE%sT 1946 1", "1 Germany CE%sT 1980 1", "1 EU CE%sT"],
            "Europe/Prague": ["0:57:44 - LMT 1850 0:57:44", "0:57:44 - PMT 1891_9 0:57:44", "1 C-Eur CE%sT 1944_8_17_2 1", "1 Czech CE%sT 1979 1", "1 EU CE%sT"],
            "Europe/Brussels": ["0:17:30 - LMT 1880 0:17:30", "0:17:30 - BMT 1892_4_1_12 0:17:30", "0 - WET 1914_10_8", "1 - CET 1916_4_1_0 1", "1 C-Eur CE%sT 1918_10_11_11", "0 Belgium WE%sT 1940_4_20_2", "1 C-Eur CE%sT 1944_8_3 2", "1 Belgium CE%sT 1977 1", "1 EU CE%sT"],
            "Europe/Bucharest": ["1:44:24 - LMT 1891_9 1:44:24", "1:44:24 - BMT 1931_6_24 1:44:24", "2 Romania EE%sT 1981_2_29_2 2", "2 C-Eur EE%sT 1991 2", "2 Romania EE%sT 1994 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT"],
            "Europe/Budapest": ["1:16:20 - LMT 1890_9 1:16:20", "1 C-Eur CE%sT 1918 1", "1 Hungary CE%sT 1941_3_6_2 1", "1 C-Eur CE%sT 1945 1", "1 Hungary CE%sT 1980_8_28_2 1", "1 EU CE%sT"],
            "Europe/Zurich": ["0:34:8 - LMT 1848_8_12 0:34:8", "0:29:44 - BMT 1894_5 0:29:44", "1 Swiss CE%sT 1981 1", "1 EU CE%sT"],
            "Europe/Chisinau": ["1:55:20 - LMT 1880 1:55:20", "1:55 - CMT 1918_1_15 1:55", "1:44:24 - BMT 1931_6_24 1:44:24", "2 Romania EE%sT 1940_7_15 2", "3 - EEST 1941_6_17 3", "1 C-Eur CE%sT 1944_7_24 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_4_6 3", "2 - EET 1991 2", "2 Russia EE%sT 1992 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT"],
            "Europe/Copenhagen": ["0:50:20 - LMT 1890 0:50:20", "0:50:20 - CMT 1894_0_1 0:50:20", "1 Denmark CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Denmark CE%sT 1980 1", "1 EU CE%sT"],
            "Europe/Dublin": ["-0:25 - LMT 1880_7_2 -0:25", "-0:25:21 - DMT 1916_4_21_2 -0:25:21", "0:34:39 - IST 1916_9_1_2 -0:25:21", "0 GB-Eire %s 1921_11_6", "0 GB-Eire GMT/IST 1940_1_25_2", "1 - IST 1946_9_6_2 1", "0 - GMT 1947_2_16_2", "1 - IST 1947_10_2_2 1", "0 - GMT 1948_3_18_2", "0 GB-Eire GMT/IST 1968_9_27 1", "1 - IST 1971_9_31_2", "0 GB-Eire GMT/IST 1996", "0 EU GMT/IST"],
            "Europe/Gibraltar": ["-0:21:24 - LMT 1880_7_2_0 -0:21:24", "0 GB-Eire %s 1957_3_14_2", "1 - CET 1982 1", "1 EU CE%sT"],
            "Europe/London": ["-0:1:15 - LMT 1847_11_1_0 -0:1:15", "0 GB-Eire %s 1968_9_27 1", "1 - BST 1971_9_31_2", "0 GB-Eire %s 1996", "0 EU GMT/BST"],
            "Europe/Helsinki": ["1:39:52 - LMT 1878_4_31 1:39:52", "1:39:52 - HMT 1921_4 1:39:52", "2 Finland EE%sT 1983 2", "2 EU EE%sT"],
            "Europe/Istanbul": ["1:55:52 - LMT 1880 1:55:52", "1:56:56 - IMT 1910_9 1:56:56", "2 Turkey EE%sT 1978_9_15 3", "3 Turkey TR%sT 1985_3_20 3", "2 Turkey EE%sT 2007 2", "2 EU EE%sT 2011_2_27_1", "2 - EET 2011_2_28_1", "2 EU EE%sT"],
            "Europe/Kaliningrad": ["1:22 - LMT 1893_3 1:22", "1 C-Eur CE%sT 1945 1", "2 Poland CE%sT 1946 2", "3 Russia MSK/MSD 1991_2_31_2 3", "2 Russia EE%sT 2011_2_27_2 2", "3 - FET"],
            "Europe/Kiev": ["2:2:4 - LMT 1880 2:2:4", "2:2:4 - KMT 1924_4_2 2:2:4", "2 - EET 1930_5_21 2", "3 - MSK 1941_8_20 3", "1 C-Eur CE%sT 1943_10_6 1", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "2 - EET 1992 2", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT"],
            "Europe/Lisbon": ["-0:36:32 - LMT 1884 -0:36:32", "-0:36:32 - LMT 1912_0_1 -0:36:32", "0 Port WE%sT 1966_3_3_2", "1 - CET 1976_8_26_1 1", "0 Port WE%sT 1983_8_25_1", "0 W-Eur WE%sT 1992_8_27_1", "1 EU CE%sT 1996_2_31_1", "0 EU WE%sT"],
            "Europe/Luxembourg": ["0:24:36 - LMT 1904_5 0:24:36", "1 Lux CE%sT 1918_10_25 1", "0 Lux WE%sT 1929_9_6_2", "0 Belgium WE%sT 1940_4_14_3 1", "1 C-Eur WE%sT 1944_8_18_3 2", "1 Belgium CE%sT 1977 1", "1 EU CE%sT"],
            "Europe/Madrid": ["-0:14:44 - LMT 1901_0_1_0 -0:14:44", "0 Spain WE%sT 1946_8_30 2", "1 Spain CE%sT 1979 1", "1 EU CE%sT"],
            "Europe/Malta": ["0:58:4 - LMT 1893_10_2_0 0:58:4", "1 Italy CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Italy CE%sT 1973_2_31 1", "1 Malta CE%sT 1981 1", "1 EU CE%sT"],
            "Europe/Minsk": ["1:50:16 - LMT 1880 1:50:16", "1:50 - MMT 1924_4_2 1:50", "2 - EET 1930_5_21 2", "3 - MSK 1941_5_28 3", "1 C-Eur CE%sT 1944_6_3 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1991_2_31_2 3", "3 - EEST 1991_8_29_2 2", "2 - EET 1992_2_29_0 2", "3 - EEST 1992_8_27_0 2", "2 Russia EE%sT 2011_2_27_2 2", "3 - FET"],
            "Europe/Monaco": ["0:29:32 - LMT 1891_2_15 0:29:32", "0:9:21 - PMT 1911_2_11 0:9:21", "0 France WE%sT 1945_8_16_3 2", "1 France CE%sT 1977 1", "1 EU CE%sT"],
            "Europe/Moscow": ["2:30:20 - LMT 1880 2:30:20", "2:30 - MMT 1916_6_3 2:30", "2:30:48 Russia %s 1919_6_1_2 4:30:48", "3 Russia MSK/MSD 1922_9 3", "2 - EET 1930_5_21 2", "3 Russia MSK/MSD 1991_2_31_2 3", "2 Russia EE%sT 1992_0_19_2 2", "3 Russia MSK/MSD 2011_2_27_2 3", "4 - MSK"],
            "Europe/Paris": ["0:9:21 - LMT 1891_2_15_0_1 0:9:21", "0:9:21 - PMT 1911_2_11_0_1 0:9:21", "0 France WE%sT 1940_5_14_23 1", "1 C-Eur CE%sT 1944_7_25 2", "0 France WE%sT 1945_8_16_3 2", "1 France CE%sT 1977 1", "1 EU CE%sT"],
            "Europe/Riga": ["1:36:24 - LMT 1880 1:36:24", "1:36:24 - RMT 1918_3_15_2 1:36:24", "2:36:24 - LST 1918_8_16_3 2:36:24", "1:36:24 - RMT 1919_3_1_2 1:36:24", "2:36:24 - LST 1919_4_22_3 2:36:24", "1:36:24 - RMT 1926_4_11 1:36:24", "2 - EET 1940_7_5 2", "3 - MSK 1941_6 3", "1 C-Eur CE%sT 1944_9_13 1", "3 Russia MSK/MSD 1989_2_26_2 3", "3 - EEST 1989_8_24_2 2", "2 Latvia EE%sT 1997_0_21 2", "2 EU EE%sT 2000_1_29 2", "2 - EET 2001_0_2 2", "2 EU EE%sT"],
            "Europe/Rome": ["0:49:56 - LMT 1866_8_22 0:49:56", "0:49:56 - RMT 1893_10_1_0 0:49:56", "1 Italy CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1944_6 2", "1 Italy CE%sT 1980 1", "1 EU CE%sT"],
            "Europe/Samara": ["3:20:36 - LMT 1919_6_1_2 3:20:36", "3 - SAMT 1930_5_21 3", "4 - SAMT 1935_0_27 4", "4 Russia KUY%sT 1989_2_26_2 4", "3 Russia KUY%sT 1991_2_31_2 3", "2 Russia KUY%sT 1991_8_29_2 2", "3 - KUYT 1991_9_20_3 3", "4 Russia SAM%sT 2010_2_28_2 4", "3 Russia SAM%sT 2011_2_27_2 3", "4 - SAMT"],
            "Europe/Simferopol": ["2:16:24 - LMT 1880 2:16:24", "2:16 - SMT 1924_4_2 2:16", "2 - EET 1930_5_21 2", "3 - MSK 1941_10 3", "1 C-Eur CE%sT 1944_3_13 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "2 - EET 1992 2", "2 E-Eur EE%sT 1994_4 3", "3 E-Eur MSK/MSD 1996_2_31_3 3", "4 - MSD 1996_9_27_3 3", "3 Russia MSK/MSD 1997 3", "3 - MSK 1997_2_30_1", "2 EU EE%sT"],
            "Europe/Sofia": ["1:33:16 - LMT 1880 1:33:16", "1:56:56 - IMT 1894_10_30 1:56:56", "2 - EET 1942_10_2_3 2", "1 C-Eur CE%sT 1945 1", "1 - CET 1945_3_2_3 1", "2 - EET 1979_2_31_23 2", "2 Bulg EE%sT 1982_8_26_2 3", "2 C-Eur EE%sT 1991 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT"],
            "Europe/Stockholm": ["1:12:12 - LMT 1879_0_1 1:12:12", "1:0:14 - SET 1900_0_1 1:0:14", "1 - CET 1916_4_14_23 1", "2 - CEST 1916_9_1_01 2", "1 - CET 1980 1", "1 EU CE%sT"],
            "Europe/Tallinn": ["1:39 - LMT 1880 1:39", "1:39 - TMT 1918_1 1:39", "1 C-Eur CE%sT 1919_6 1", "1:39 - TMT 1921_4 1:39", "2 - EET 1940_7_6 2", "3 - MSK 1941_8_15 3", "1 C-Eur CE%sT 1944_8_22 2", "3 Russia MSK/MSD 1989_2_26_2 3", "3 - EEST 1989_8_24_2 2", "2 C-Eur EE%sT 1998_8_22 3", "2 EU EE%sT 1999_10_1 3", "2 - EET 2002_1_21 2", "2 EU EE%sT"],
            "Europe/Tirane": ["1:19:20 - LMT 1914 1:19:20", "1 - CET 1940_5_16 1", "1 Albania CE%sT 1984_6 2", "1 EU CE%sT"],
            "Europe/Uzhgorod": ["1:29:12 - LMT 1890_9 1:29:12", "1 - CET 1940 1", "1 C-Eur CE%sT 1944_9 2", "2 - CEST 1944_9_26 2", "1 - CET 1945_5_29 1", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "1 - CET 1991_2_31_3 1", "2 - EET 1992 2", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT"],
            "Europe/Vaduz": ["0:38:4 - LMT 1894_5 0:38:4", "1 - CET 1981 1", "1 EU CE%sT"],
            "Europe/Vienna": ["1:5:21 - LMT 1893_3 1:5:21", "1 C-Eur CE%sT 1920 1", "1 Austria CE%sT 1940_3_1_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "2 - CEST 1945_3_12_2 1", "1 - CET 1946 1", "1 Austria CE%sT 1981 1", "1 EU CE%sT"],
            "Europe/Vilnius": ["1:41:16 - LMT 1880 1:41:16", "1:24 - WMT 1917 1:24", "1:35:36 - KMT 1919_9_10 1:35:36", "1 - CET 1920_6_12 1", "2 - EET 1920_9_9 2", "1 - CET 1940_7_3 1", "3 - MSK 1941_5_24 3", "1 C-Eur CE%sT 1944_7 2", "3 Russia MSK/MSD 1991_2_31_2 3", "3 - EEST 1991_8_29_2 2", "2 C-Eur EE%sT 1998 2", "2 - EET 1998_2_29_1", "1 EU CE%sT 1999_9_31_1", "2 - EET 2003_0_1 2", "2 EU EE%sT"],
            "Europe/Volgograd": ["2:57:40 - LMT 1920_0_3 2:57:40", "3 - TSAT 1925_3_6 3", "3 - STAT 1930_5_21 3", "4 - STAT 1961_10_11 4", "4 Russia VOL%sT 1989_2_26_2 4", "3 Russia VOL%sT 1991_2_31_2 3", "4 - VOLT 1992_2_29_2 4", "3 Russia VOL%sT 2011_2_27_2 3", "4 - VOLT"],
            "Europe/Warsaw": ["1:24 - LMT 1880 1:24", "1:24 - WMT 1915_7_5 1:24", "1 C-Eur CE%sT 1918_8_16_3 2", "2 Poland EE%sT 1922_5 2", "1 Poland CE%sT 1940_5_23_2 1", "1 C-Eur CE%sT 1944_9 2", "1 Poland CE%sT 1977 1", "1 W-Eur CE%sT 1988 1", "1 EU CE%sT"],
            "Europe/Zaporozhye": ["2:20:40 - LMT 1880 2:20:40", "2:20 - CUT 1924_4_2 2:20", "2 - EET 1930_5_21 2", "3 - MSK 1941_7_25 3", "1 C-Eur CE%sT 1943_9_25 1", "3 Russia MSK/MSD 1991_2_31_2 3", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT"],
            "Indian/Antananarivo": ["3:10:4 - LMT 1911_6 3:10:4", "3 - EAT 1954_1_27_23 3", "4 - EAST 1954_4_29_23 3", "3 - EAT"],
            "Indian/Chagos": ["4:49:40 - LMT 1907 4:49:40", "5 - IOT 1996 5", "6 - IOT"],
            "Indian/Christmas": ["7:2:52 - LMT 1895_1 7:2:52", "7 - CXT"],
            "Indian/Cocos": ["6:27:40 - LMT 1900 6:27:40", "6:30 - CCT"],
            "Indian/Comoro": ["2:53:4 - LMT 1911_6 2:53:4", "3 - EAT"],
            "Indian/Kerguelen": ["0 - zzz 1950", "5 - TFT"],
            "Indian/Mahe": ["3:41:48 - LMT 1906_5 3:41:48", "4 - SCT"],
            "Indian/Maldives": ["4:54 - LMT 1880 4:54", "4:54 - MMT 1960 4:54", "5 - MVT"],
            "Indian/Mauritius": ["3:50 - LMT 1907 3:50", "4 Mauritius MU%sT"],
            "Indian/Mayotte": ["3:0:56 - LMT 1911_6 3:0:56", "3 - EAT"],
            "Indian/Reunion": ["3:41:52 - LMT 1911_5 3:41:52", "4 - RET"],
            "Pacific/Apia": ["12:33:4 - LMT 1879_6_5 12:33:4", "-11:26:56 - LMT 1911 -11:26:56", "-11:30 - SAMT 1950 -11:30", "-11 - WST 2010_8_26 -11", "-10 - WSDT 2011_3_2_4 -10", "-11 - WST 2011_8_24_3 -11", "-10 - WSDT 2011_11_30 -10", "14 - WSDT 2012_3_1_4 14", "13 WS WS%sT"],
            "Pacific/Auckland": ["11:39:4 - LMT 1868_10_2 11:39:4", "11:30 NZ NZ%sT 1946_0_1 12", "12 NZ NZ%sT"],
            "Pacific/Chatham": ["12:13:48 - LMT 1957_0_1 12:13:48", "12:45 Chatham CHA%sT"],
            "Pacific/Chuuk": ["10:7:8 - LMT 1901 10:7:8", "10 - CHUT"],
            "Pacific/Easter": ["-7:17:44 - LMT 1890 -7:17:44", "-7:17:28 - EMT 1932_8 -7:17:28", "-7 Chile EAS%sT 1982_2_13_21 -6", "-6 Chile EAS%sT"],
            "Pacific/Efate": ["11:13:16 - LMT 1912_0_13 11:13:16", "11 Vanuatu VU%sT"],
            "Pacific/Enderbury": ["-11:24:20 - LMT 1901 -11:24:20", "-12 - PHOT 1979_9 -12", "-11 - PHOT 1995 -11", "13 - PHOT"],
            "Pacific/Fakaofo": ["-11:24:56 - LMT 1901 -11:24:56", "-11 - TKT 2011_11_30 -11", "13 - TKT"],
            "Pacific/Fiji": ["11:55:44 - LMT 1915_9_26 11:55:44", "12 Fiji FJ%sT"],
            "Pacific/Funafuti": ["11:56:52 - LMT 1901 11:56:52", "12 - TVT"],
            "Pacific/Galapagos": ["-5:58:24 - LMT 1931 -5:58:24", "-5 - ECT 1986 -5", "-6 - GALT"],
            "Pacific/Gambier": ["-8:59:48 - LMT 1912_9 -8:59:48", "-9 - GAMT"],
            "Pacific/Guadalcanal": ["10:39:48 - LMT 1912_9 10:39:48", "11 - SBT"],
            "Pacific/Guam": ["-14:21 - LMT 1844_11_31 -14:21", "9:39 - LMT 1901 9:39", "10 - GST 2000_11_23 10", "10 - ChST"],
            "Pacific/Honolulu": ["-10:31:26 - LMT 1896_0_13_12 -10:31:26", "-10:30 - HST 1933_3_30_2 -10:30", "-9:30 - HDT 1933_4_21_12 -9:30", "-10:30 - HST 1942_1_09_2 -10:30", "-9:30 - HDT 1945_8_30_2 -9:30", "-10:30 - HST 1947_5_8_2 -10:30", "-10 - HST"],
            "Pacific/Johnston": ["-10 - HST"],
            "Pacific/Kiritimati": ["-10:29:20 - LMT 1901 -10:29:20", "-10:40 - LINT 1979_9 -10:40", "-10 - LINT 1995 -10", "14 - LINT"],
            "Pacific/Kosrae": ["10:51:56 - LMT 1901 10:51:56", "11 - KOST 1969_9 11", "12 - KOST 1999 12", "11 - KOST"],
            "Pacific/Kwajalein": ["11:9:20 - LMT 1901 11:9:20", "11 - MHT 1969_9 11", "-12 - KWAT 1993_7_20 -12", "12 - MHT"],
            "Pacific/Majuro": ["11:24:48 - LMT 1901 11:24:48", "11 - MHT 1969_9 11", "12 - MHT"],
            "Pacific/Marquesas": ["-9:18 - LMT 1912_9 -9:18", "-9:30 - MART"],
            "Pacific/Midway": ["-11:49:28 - LMT 1901 -11:49:28", "-11 - NST 1956_5_3 -11", "-10 - NDT 1956_8_2 -10", "-11 - NST 1967_3 -11", "-11 - BST 1983_10_30 -11", "-11 - SST"],
            "Pacific/Nauru": ["11:7:40 - LMT 1921_0_15 11:7:40", "11:30 - NRT 1942_2_15 11:30", "9 - JST 1944_7_15 9", "11:30 - NRT 1979_4 11:30", "12 - NRT"],
            "Pacific/Niue": ["-11:19:40 - LMT 1901 -11:19:40", "-11:20 - NUT 1951 -11:20", "-11:30 - NUT 1978_9_1 -11:30", "-11 - NUT"],
            "Pacific/Norfolk": ["11:11:52 - LMT 1901 11:11:52", "11:12 - NMT 1951 11:12", "11:30 - NFT"],
            "Pacific/Noumea": ["11:5:48 - LMT 1912_0_13 11:5:48", "11 NC NC%sT"],
            "Pacific/Pago_Pago": ["12:37:12 - LMT 1879_6_5 12:37:12", "-11:22:48 - LMT 1911 -11:22:48", "-11:30 - SAMT 1950 -11:30", "-11 - NST 1967_3 -11", "-11 - BST 1983_10_30 -11", "-11 - SST"],
            "Pacific/Palau": ["8:57:56 - LMT 1901 8:57:56", "9 - PWT"],
            "Pacific/Pitcairn": ["-8:40:20 - LMT 1901 -8:40:20", "-8:30 - PNT 1998_3_27_00 -8:30", "-8 - PST"],
            "Pacific/Pohnpei": ["10:32:52 - LMT 1901 10:32:52", "11 - PONT"],
            "Pacific/Port_Moresby": ["9:48:40 - LMT 1880 9:48:40", "9:48:32 - PMMT 1895 9:48:32", "10 - PGT"],
            "Pacific/Rarotonga": ["-10:39:4 - LMT 1901 -10:39:4", "-10:30 - CKT 1978_10_12 -10:30", "-10 Cook CK%sT"],
            "Pacific/Saipan": ["-14:17 - LMT 1844_11_31 -14:17", "9:43 - LMT 1901 9:43", "9 - MPT 1969_9 9", "10 - MPT 2000_11_23 10", "10 - ChST"],
            "Pacific/Tahiti": ["-9:58:16 - LMT 1912_9 -9:58:16", "-10 - TAHT"],
            "Pacific/Tarawa": ["11:32:4 - LMT 1901 11:32:4", "12 - GILT"],
            "Pacific/Tongatapu": ["12:19:20 - LMT 1901 12:19:20", "12:20 - TOT 1941 12:20", "13 - TOT 1999 13", "13 Tonga TO%sT"],
            "Pacific/Wake": ["11:6:28 - LMT 1901 11:6:28", "12 - WAKT"],
            "Pacific/Wallis": ["12:15:20 - LMT 1901 12:15:20", "12 - WFT"]
        },
        rules: {
            Ghana: ["1936 1942 8 1 7 0 0 0:20 GHST", "1936 1942 11 31 7 0 0 0 GMT"],
            Algeria: ["1916 1916 5 14 7 23 2 1 S", "1916 1919 9 1 0 23 2 0", "1917 1917 2 24 7 23 2 1 S", "1918 1918 2 9 7 23 2 1 S", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 5 21 7 23 2 0", "1939 1939 8 11 7 23 2 1 S", "1939 1939 10 19 7 1 0 0", "1944 1945 3 1 1 2 0 1 S", "1944 1944 9 8 7 2 0 0", "1945 1945 8 16 7 1 0 0", "1971 1971 3 25 7 23 2 1 S", "1971 1971 8 26 7 23 2 0", "1977 1977 4 6 7 0 0 1 S", "1977 1977 9 21 7 0 0 0", "1978 1978 2 24 7 1 0 1 S", "1978 1978 8 22 7 3 0 0", "1980 1980 3 25 7 0 0 1 S", "1980 1980 9 31 7 2 0 0"],
            Egypt: ["1940 1940 6 15 7 0 0 1 S", "1940 1940 9 1 7 0 0 0", "1941 1941 3 15 7 0 0 1 S", "1941 1941 8 16 7 0 0 0", "1942 1944 3 1 7 0 0 1 S", "1942 1942 9 27 7 0 0 0", "1943 1945 10 1 7 0 0 0", "1945 1945 3 16 7 0 0 1 S", "1957 1957 4 10 7 0 0 1 S", "1957 1958 9 1 7 0 0 0", "1958 1958 4 1 7 0 0 1 S", "1959 1981 4 1 7 1 0 1 S", "1959 1965 8 30 7 3 0 0", "1966 1994 9 1 7 3 0 0", "1982 1982 6 25 7 1 0 1 S", "1983 1983 6 12 7 1 0 1 S", "1984 1988 4 1 7 1 0 1 S", "1989 1989 4 6 7 1 0 1 S", "1990 1994 4 1 7 1 0 1 S", "1995 2010 3 5 8 0 2 1 S", "1995 2005 8 4 8 23 2 0", "2006 2006 8 21 7 23 2 0", "2007 2007 8 1 4 23 2 0", "2008 2008 7 4 8 23 2 0", "2009 2009 7 20 7 23 2 0", "2010 2010 7 11 7 0 0 0", "2010 2010 8 10 7 0 0 1 S", "2010 2010 8 4 8 23 2 0"],
            Morocco: ["1939 1939 8 12 7 0 0 1 S", "1939 1939 10 19 7 0 0 0", "1940 1940 1 25 7 0 0 1 S", "1945 1945 10 18 7 0 0 0", "1950 1950 5 11 7 0 0 1 S", "1950 1950 9 29 7 0 0 0", "1967 1967 5 3 7 12 0 1 S", "1967 1967 9 1 7 0 0 0", "1974 1974 5 24 7 0 0 1 S", "1974 1974 8 1 7 0 0 0", "1976 1977 4 1 7 0 0 1 S", "1976 1976 7 1 7 0 0 0", "1977 1977 8 28 7 0 0 0", "1978 1978 5 1 7 0 0 1 S", "1978 1978 7 4 7 0 0 0", "2008 2008 5 1 7 0 0 1 S", "2008 2008 8 1 7 0 0 0", "2009 2009 5 1 7 0 0 1 S", "2009 2009 7 21 7 0 0 0", "2010 2010 4 2 7 0 0 1 S", "2010 2010 7 8 7 0 0 0", "2011 2011 3 3 7 0 0 1 S", "2011 2011 6 31 7 0 0 0", "2012 2019 3 0 8 2 0 1 S", "2012 9999 8 0 8 3 0 0", "2012 2012 6 20 7 3 0 0", "2012 2012 7 20 7 2 0 1 S", "2013 2013 6 9 7 3 0 0", "2013 2013 7 8 7 2 0 1 S", "2014 2014 5 29 7 3 0 0", "2014 2014 6 29 7 2 0 1 S", "2015 2015 5 18 7 3 0 0", "2015 2015 6 18 7 2 0 1 S", "2016 2016 5 7 7 3 0 0", "2016 2016 6 7 7 2 0 1 S", "2017 2017 4 27 7 3 0 0", "2017 2017 5 26 7 2 0 1 S", "2018 2018 4 16 7 3 0 0", "2018 2018 5 15 7 2 0 1 S", "2019 2019 4 6 7 3 0 0", "2019 2019 5 5 7 2 0 1 S", "2020 2020 4 24 7 2 0 1 S", "2021 2021 4 13 7 2 0 1 S", "2022 2022 4 3 7 2 0 1 S", "2023 9999 3 0 8 2 0 1 S"],
            Spain: ["1917 1917 4 5 7 23 2 1 S", "1917 1919 9 6 7 23 2 0", "1918 1918 3 15 7 23 2 1 S", "1919 1919 3 5 7 23 2 1 S", "1924 1924 3 16 7 23 2 1 S", "1924 1924 9 4 7 23 2 0", "1926 1926 3 17 7 23 2 1 S", "1926 1929 9 1 6 23 2 0", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1937 1937 4 22 7 23 2 1 S", "1937 1939 9 1 6 23 2 0", "1938 1938 2 22 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1940 1940 2 16 7 23 2 1 S", "1942 1942 4 2 7 22 2 2 M", "1942 1942 8 1 7 22 2 1 S", "1943 1946 3 13 6 22 2 2 M", "1943 1943 9 3 7 22 2 1 S", "1944 1944 9 10 7 22 2 1 S", "1945 1945 8 30 7 1 0 1 S", "1946 1946 8 30 7 0 0 0", "1949 1949 3 30 7 23 0 1 S", "1949 1949 8 30 7 1 0 0", "1974 1975 3 13 6 23 0 1 S", "1974 1975 9 1 0 1 0 0", "1976 1976 2 27 7 23 0 1 S", "1976 1977 8 0 8 1 0 0", "1977 1978 3 2 7 23 0 1 S", "1978 1978 9 1 7 1 0 0"],
            SpainAfrica: ["1967 1967 5 3 7 12 0 1 S", "1967 1967 9 1 7 0 0 0", "1974 1974 5 24 7 0 0 1 S", "1974 1974 8 1 7 0 0 0", "1976 1977 4 1 7 0 0 1 S", "1976 1976 7 1 7 0 0 0", "1977 1977 8 28 7 0 0 0", "1978 1978 5 1 7 0 0 1 S", "1978 1978 7 4 7 0 0 0"],
            EU: ["1977 1980 3 1 0 1 1 1 S", "1977 1977 8 0 8 1 1 0", "1978 1978 9 1 7 1 1 0", "1979 1995 8 0 8 1 1 0", "1981 9999 2 0 8 1 1 1 S", "1996 9999 9 0 8 1 1 0"],
            SL: ["1935 1942 5 1 7 0 0 0:40 SLST", "1935 1942 9 1 7 0 0 0 WAT", "1957 1962 5 1 7 0 0 1 SLST", "1957 1962 8 1 7 0 0 0 GMT"],
            SA: ["1942 1943 8 15 0 2 0 1", "1943 1944 2 15 0 2 0 0"],
            Sudan: ["1970 1970 4 1 7 0 0 1 S", "1970 1985 9 15 7 0 0 0", "1971 1971 3 30 7 0 0 1 S", "1972 1985 3 0 8 0 0 1 S"],
            Libya: ["1951 1951 9 14 7 2 0 1 S", "1952 1952 0 1 7 0 0 0", "1953 1953 9 9 7 2 0 1 S", "1954 1954 0 1 7 0 0 0", "1955 1955 8 30 7 0 0 1 S", "1956 1956 0 1 7 0 0 0", "1982 1984 3 1 7 0 0 1 S", "1982 1985 9 1 7 0 0 0", "1985 1985 3 6 7 0 0 1 S", "1986 1986 3 4 7 0 0 1 S", "1986 1986 9 3 7 0 0 0", "1987 1989 3 1 7 0 0 1 S", "1987 1989 9 1 7 0 0 0", "1997 1997 3 4 7 0 0 1 S", "1997 1997 9 4 7 0 0 0", "2013 9999 2 5 8 1 0 1 S", "2013 9999 9 5 8 2 0 0"],
            Tunisia: ["1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 25 7 23 2 1 S", "1941 1941 9 6 7 0 0 0", "1942 1942 2 9 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 29 7 2 0 1 S", "1943 1943 3 17 7 2 0 0", "1943 1943 3 25 7 2 0 1 S", "1943 1943 9 4 7 2 0 0", "1944 1945 3 1 1 2 0 1 S", "1944 1944 9 8 7 0 0 0", "1945 1945 8 16 7 0 0 0", "1977 1977 3 30 7 0 2 1 S", "1977 1977 8 24 7 0 2 0", "1978 1978 4 1 7 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1988 1988 5 1 7 0 2 1 S", "1988 1990 8 0 8 0 2 0", "1989 1989 2 26 7 0 2 1 S", "1990 1990 4 1 7 0 2 1 S", "2005 2005 4 1 7 0 2 1 S", "2005 2005 8 30 7 1 2 0", "2006 2008 2 0 8 2 2 1 S", "2006 2008 9 0 8 2 2 0"],
            Namibia: ["1994 9999 8 1 0 2 0 1 S", "1995 9999 3 1 0 2 0 0"],
            US: ["1918 1919 2 0 8 2 0 1 D", "1918 1919 9 0 8 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1967 2006 9 0 8 2 0 0 S", "1967 1973 3 0 8 2 0 1 D", "1974 1974 0 6 7 2 0 1 D", "1975 1975 1 23 7 2 0 1 D", "1976 1986 3 0 8 2 0 1 D", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S"],
            Brazil: ["1931 1931 9 3 7 11 0 1 S", "1932 1933 3 1 7 0 0 0", "1932 1932 9 3 7 0 0 1 S", "1949 1952 11 1 7 0 0 1 S", "1950 1950 3 16 7 1 0 0", "1951 1952 3 1 7 0 0 0", "1953 1953 2 1 7 0 0 0", "1963 1963 11 9 7 0 0 1 S", "1964 1964 2 1 7 0 0 0", "1965 1965 0 31 7 0 0 1 S", "1965 1965 2 31 7 0 0 0", "1965 1965 11 1 7 0 0 1 S", "1966 1968 2 1 7 0 0 0", "1966 1967 10 1 7 0 0 1 S", "1985 1985 10 2 7 0 0 1 S", "1986 1986 2 15 7 0 0 0", "1986 1986 9 25 7 0 0 1 S", "1987 1987 1 14 7 0 0 0", "1987 1987 9 25 7 0 0 1 S", "1988 1988 1 7 7 0 0 0", "1988 1988 9 16 7 0 0 1 S", "1989 1989 0 29 7 0 0 0", "1989 1989 9 15 7 0 0 1 S", "1990 1990 1 11 7 0 0 0", "1990 1990 9 21 7 0 0 1 S", "1991 1991 1 17 7 0 0 0", "1991 1991 9 20 7 0 0 1 S", "1992 1992 1 9 7 0 0 0", "1992 1992 9 25 7 0 0 1 S", "1993 1993 0 31 7 0 0 0", "1993 1995 9 11 0 0 0 1 S", "1994 1995 1 15 0 0 0 0", "1996 1996 1 11 7 0 0 0", "1996 1996 9 6 7 0 0 1 S", "1997 1997 1 16 7 0 0 0", "1997 1997 9 6 7 0 0 1 S", "1998 1998 2 1 7 0 0 0", "1998 1998 9 11 7 0 0 1 S", "1999 1999 1 21 7 0 0 0", "1999 1999 9 3 7 0 0 1 S", "2000 2000 1 27 7 0 0 0", "2000 2001 9 8 0 0 0 1 S", "2001 2006 1 15 0 0 0 0", "2002 2002 10 3 7 0 0 1 S", "2003 2003 9 19 7 0 0 1 S", "2004 2004 10 2 7 0 0 1 S", "2005 2005 9 16 7 0 0 1 S", "2006 2006 10 5 7 0 0 1 S", "2007 2007 1 25 7 0 0 0", "2007 2007 9 8 0 0 0 1 S", "2008 9999 9 15 0 0 0 1 S", "2008 2011 1 15 0 0 0 0", "2012 2012 1 22 0 0 0 0", "2013 2014 1 15 0 0 0 0", "2015 2015 1 22 0 0 0 0", "2016 2022 1 15 0 0 0 0", "2023 2023 1 22 0 0 0 0", "2024 2025 1 15 0 0 0 0", "2026 2026 1 22 0 0 0 0", "2027 2033 1 15 0 0 0 0", "2034 2034 1 22 0 0 0 0", "2035 2036 1 15 0 0 0 0", "2037 2037 1 22 0 0 0 0", "2038 9999 1 15 0 0 0 0"],
            Arg: ["1930 1930 11 1 7 0 0 1 S", "1931 1931 3 1 7 0 0 0", "1931 1931 9 15 7 0 0 1 S", "1932 1940 2 1 7 0 0 0", "1932 1939 10 1 7 0 0 1 S", "1940 1940 6 1 7 0 0 1 S", "1941 1941 5 15 7 0 0 0", "1941 1941 9 15 7 0 0 1 S", "1943 1943 7 1 7 0 0 0", "1943 1943 9 15 7 0 0 1 S", "1946 1946 2 1 7 0 0 0", "1946 1946 9 1 7 0 0 1 S", "1963 1963 9 1 7 0 0 0", "1963 1963 11 15 7 0 0 1 S", "1964 1966 2 1 7 0 0 0", "1964 1966 9 15 7 0 0 1 S", "1967 1967 3 2 7 0 0 0", "1967 1968 9 1 0 0 0 1 S", "1968 1969 3 1 0 0 0 0", "1974 1974 0 23 7 0 0 1 S", "1974 1974 4 1 7 0 0 0", "1988 1988 11 1 7 0 0 1 S", "1989 1993 2 1 0 0 0 0", "1989 1992 9 15 0 0 0 1 S", "1999 1999 9 1 0 0 0 1 S", "2000 2000 2 3 7 0 0 0", "2007 2007 11 30 7 0 0 1 S", "2008 2009 2 15 0 0 0 0", "2008 2008 9 15 0 0 0 1 S"],
            SanLuis: ["2008 2009 2 8 0 0 0 0", "2007 2009 9 8 0 0 0 1 S"],
            Para: ["1975 1988 9 1 7 0 0 1 S", "1975 1978 2 1 7 0 0 0", "1979 1991 3 1 7 0 0 0", "1989 1989 9 22 7 0 0 1 S", "1990 1990 9 1 7 0 0 1 S", "1991 1991 9 6 7 0 0 1 S", "1992 1992 2 1 7 0 0 0", "1992 1992 9 5 7 0 0 1 S", "1993 1993 2 31 7 0 0 0", "1993 1995 9 1 7 0 0 1 S", "1994 1995 1 0 8 0 0 0", "1996 1996 2 1 7 0 0 0", "1996 2001 9 1 0 0 0 1 S", "1997 1997 1 0 8 0 0 0", "1998 2001 2 1 0 0 0 0", "2002 2004 3 1 0 0 0 0", "2002 2003 8 1 0 0 0 1 S", "2004 2009 9 15 0 0 0 1 S", "2005 2009 2 8 0 0 0 0", "2010 9999 9 1 0 0 0 1 S", "2010 2012 3 8 0 0 0 0", "2013 9999 2 22 0 0 0 0"],
            Canada: ["1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1974 1986 3 0 8 2 0 1 D", "1974 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S"],
            Mexico: ["1939 1939 1 5 7 0 0 1 D", "1939 1939 5 25 7 0 0 0 S", "1940 1940 11 9 7 0 0 1 D", "1941 1941 3 1 7 0 0 0 S", "1943 1943 11 16 7 0 0 1 W", "1944 1944 4 1 7 0 0 0 S", "1950 1950 1 12 7 0 0 1 D", "1950 1950 6 30 7 0 0 0 S", "1996 2000 3 1 0 2 0 1 D", "1996 2000 9 0 8 2 0 0 S", "2001 2001 4 1 0 2 0 1 D", "2001 2001 8 0 8 2 0 0 S", "2002 9999 3 1 0 2 0 1 D", "2002 9999 9 0 8 2 0 0 S"],
            Barb: ["1977 1977 5 12 7 2 0 1 D", "1977 1978 9 1 0 2 0 0 S", "1978 1980 3 15 0 2 0 1 D", "1979 1979 8 30 7 2 0 0 S", "1980 1980 8 25 7 2 0 0 S"],
            Belize: ["1918 1942 9 2 0 0 0 0:30 HD", "1919 1943 1 9 0 0 0 0 S", "1973 1973 11 5 7 0 0 1 D", "1974 1974 1 9 7 0 0 0 S", "1982 1982 11 18 7 0 0 1 D", "1983 1983 1 12 7 0 0 0 S"],
            CO: ["1992 1992 4 3 7 0 0 1 S", "1993 1993 3 4 7 0 0 0"],
            NT_YK: ["1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1919 1919 4 25 7 2 0 1 D", "1919 1919 10 1 7 0 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1965 1965 3 0 8 0 0 2 DD", "1965 1965 9 0 8 2 0 0 S", "1980 1986 3 0 8 2 0 1 D", "1980 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D"],
            Chicago: ["1920 1920 5 13 7 2 0 1 D", "1920 1921 9 0 8 2 0 0 S", "1921 1921 2 0 8 2 0 1 D", "1922 1966 3 0 8 2 0 1 D", "1922 1954 8 0 8 2 0 0 S", "1955 1966 9 0 8 2 0 0 S"],
            CR: ["1979 1980 1 0 8 0 0 1 D", "1979 1980 5 1 0 0 0 0 S", "1991 1992 0 15 6 0 0 1 D", "1991 1991 6 1 7 0 0 0 S", "1992 1992 2 15 7 0 0 0 S"],
            Vanc: ["1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1946 1986 3 0 8 2 0 1 D", "1946 1946 9 13 7 2 0 0 S", "1947 1961 8 0 8 2 0 0 S", "1962 2006 9 0 8 2 0 0 S"],
            Denver: ["1920 1921 2 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1921 4 22 7 2 0 0 S", "1965 1966 3 0 8 2 0 1 D", "1965 1966 9 0 8 2 0 0 S"],
            Detroit: ["1948 1948 3 0 8 2 0 1 D", "1948 1948 8 0 8 2 0 0 S", "1967 1967 5 14 7 2 0 1 D", "1967 1967 9 0 8 2 0 0 S"],
            Edm: ["1918 1919 3 8 0 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1919 1919 4 27 7 2 0 0 S", "1920 1923 3 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1923 8 0 8 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1947 1947 3 0 8 2 0 1 D", "1947 1947 8 0 8 2 0 0 S", "1967 1967 3 0 8 2 0 1 D", "1967 1967 9 0 8 2 0 0 S", "1969 1969 3 0 8 2 0 1 D", "1969 1969 9 0 8 2 0 0 S", "1972 1986 3 0 8 2 0 1 D", "1972 2006 9 0 8 2 0 0 S"],
            Salv: ["1987 1988 4 1 0 0 0 1 D", "1987 1988 8 0 8 0 0 0 S"],
            Halifax: ["1916 1916 3 1 7 0 0 1 D", "1916 1916 9 1 7 0 0 0 S", "1920 1920 4 9 7 0 0 1 D", "1920 1920 7 29 7 0 0 0 S", "1921 1921 4 6 7 0 0 1 D", "1921 1922 8 5 7 0 0 0 S", "1922 1922 3 30 7 0 0 1 D", "1923 1925 4 1 0 0 0 1 D", "1923 1923 8 4 7 0 0 0 S", "1924 1924 8 15 7 0 0 0 S", "1925 1925 8 28 7 0 0 0 S", "1926 1926 4 16 7 0 0 1 D", "1926 1926 8 13 7 0 0 0 S", "1927 1927 4 1 7 0 0 1 D", "1927 1927 8 26 7 0 0 0 S", "1928 1931 4 8 0 0 0 1 D", "1928 1928 8 9 7 0 0 0 S", "1929 1929 8 3 7 0 0 0 S", "1930 1930 8 15 7 0 0 0 S", "1931 1932 8 24 1 0 0 0 S", "1932 1932 4 1 7 0 0 1 D", "1933 1933 3 30 7 0 0 1 D", "1933 1933 9 2 7 0 0 0 S", "1934 1934 4 20 7 0 0 1 D", "1934 1934 8 16 7 0 0 0 S", "1935 1935 5 2 7 0 0 1 D", "1935 1935 8 30 7 0 0 0 S", "1936 1936 5 1 7 0 0 1 D", "1936 1936 8 14 7 0 0 0 S", "1937 1938 4 1 0 0 0 1 D", "1937 1941 8 24 1 0 0 0 S", "1939 1939 4 28 7 0 0 1 D", "1940 1941 4 1 0 0 0 1 D", "1946 1949 3 0 8 2 0 1 D", "1946 1949 8 0 8 2 0 0 S", "1951 1954 3 0 8 2 0 1 D", "1951 1954 8 0 8 2 0 0 S", "1956 1959 3 0 8 2 0 1 D", "1956 1959 8 0 8 2 0 0 S", "1962 1973 3 0 8 2 0 1 D", "1962 1973 9 0 8 2 0 0 S"],
            StJohns: ["1917 1917 3 8 7 2 0 1 D", "1917 1917 8 17 7 2 0 0 S", "1919 1919 4 5 7 23 0 1 D", "1919 1919 7 12 7 23 0 0 S", "1920 1935 4 1 0 23 0 1 D", "1920 1935 9 0 8 23 0 0 S", "1936 1941 4 9 1 0 0 1 D", "1936 1941 9 2 1 0 0 0 S", "1946 1950 4 8 0 2 0 1 D", "1946 1950 9 2 0 2 0 0 S", "1951 1986 3 0 8 2 0 1 D", "1951 1959 8 0 8 2 0 0 S", "1960 1986 9 0 8 2 0 0 S", "1987 1987 3 1 0 0:1 0 1 D", "1987 2006 9 0 8 0:1 0 0 S", "1988 1988 3 1 0 0:1 0 2 DD", "1989 2006 3 1 0 0:1 0 1 D", "2007 2011 2 8 0 0:1 0 1 D", "2007 2010 10 1 0 0:1 0 0 S"],
            TC: ["1979 1986 3 0 8 2 0 1 D", "1979 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S"],
            Guat: ["1973 1973 10 25 7 0 0 1 D", "1974 1974 1 24 7 0 0 0 S", "1983 1983 4 21 7 0 0 1 D", "1983 1983 8 22 7 0 0 0 S", "1991 1991 2 23 7 0 0 1 D", "1991 1991 8 7 7 0 0 0 S", "2006 2006 3 30 7 0 0 1 D", "2006 2006 9 1 7 0 0 0 S"],
            Cuba: ["1928 1928 5 10 7 0 0 1 D", "1928 1928 9 10 7 0 0 0 S", "1940 1942 5 1 0 0 0 1 D", "1940 1942 8 1 0 0 0 0 S", "1945 1946 5 1 0 0 0 1 D", "1945 1946 8 1 0 0 0 0 S", "1965 1965 5 1 7 0 0 1 D", "1965 1965 8 30 7 0 0 0 S", "1966 1966 4 29 7 0 0 1 D", "1966 1966 9 2 7 0 0 0 S", "1967 1967 3 8 7 0 0 1 D", "1967 1968 8 8 0 0 0 0 S", "1968 1968 3 14 7 0 0 1 D", "1969 1977 3 0 8 0 0 1 D", "1969 1971 9 0 8 0 0 0 S", "1972 1974 9 8 7 0 0 0 S", "1975 1977 9 0 8 0 0 0 S", "1978 1978 4 7 7 0 0 1 D", "1978 1990 9 8 0 0 0 0 S", "1979 1980 2 15 0 0 0 1 D", "1981 1985 4 5 0 0 0 1 D", "1986 1989 2 14 0 0 0 1 D", "1990 1997 3 1 0 0 0 1 D", "1991 1995 9 8 0 0 2 0 S", "1996 1996 9 6 7 0 2 0 S", "1997 1997 9 12 7 0 2 0 S", "1998 1999 2 0 8 0 2 1 D", "1998 2003 9 0 8 0 2 0 S", "2000 2004 3 1 0 0 2 1 D", "2006 2010 9 0 8 0 2 0 S", "2007 2007 2 8 0 0 2 1 D", "2008 2008 2 15 0 0 2 1 D", "2009 2010 2 8 0 0 2 1 D", "2011 2011 2 15 0 0 2 1 D", "2011 2011 10 13 7 0 2 0 S", "2012 2012 3 1 7 0 2 1 D", "2012 9999 10 1 0 0 2 0 S", "2013 9999 2 8 0 0 2 1 D"],
            Indianapolis: ["1941 1941 5 22 7 2 0 1 D", "1941 1954 8 0 8 2 0 0 S", "1946 1954 3 0 8 2 0 1 D"],
            Starke: ["1947 1961 3 0 8 2 0 1 D", "1947 1954 8 0 8 2 0 0 S", "1955 1956 9 0 8 2 0 0 S", "1957 1958 8 0 8 2 0 0 S", "1959 1961 9 0 8 2 0 0 S"],
            Marengo: ["1951 1951 3 0 8 2 0 1 D", "1951 1951 8 0 8 2 0 0 S", "1954 1960 3 0 8 2 0 1 D", "1954 1960 8 0 8 2 0 0 S"],
            Pike: ["1955 1955 4 1 7 0 0 1 D", "1955 1960 8 0 8 2 0 0 S", "1956 1964 3 0 8 2 0 1 D", "1961 1964 9 0 8 2 0 0 S"],
            Perry: ["1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1953 1954 3 0 8 2 0 1 D", "1953 1959 8 0 8 2 0 0 S", "1955 1955 4 1 7 0 0 1 D", "1956 1963 3 0 8 2 0 1 D", "1960 1960 9 0 8 2 0 0 S", "1961 1961 8 0 8 2 0 0 S", "1962 1963 9 0 8 2 0 0 S"],
            Vincennes: ["1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1953 1954 3 0 8 2 0 1 D", "1953 1959 8 0 8 2 0 0 S", "1955 1955 4 1 7 0 0 1 D", "1956 1963 3 0 8 2 0 1 D", "1960 1960 9 0 8 2 0 0 S", "1961 1961 8 0 8 2 0 0 S", "1962 1963 9 0 8 2 0 0 S"],
            Pulaski: ["1946 1960 3 0 8 2 0 1 D", "1946 1954 8 0 8 2 0 0 S", "1955 1956 9 0 8 2 0 0 S", "1957 1960 8 0 8 2 0 0 S"],
            Louisville: ["1921 1921 4 1 7 2 0 1 D", "1921 1921 8 1 7 2 0 0 S", "1941 1961 3 0 8 2 0 1 D", "1941 1941 8 0 8 2 0 0 S", "1946 1946 5 2 7 2 0 0 S", "1950 1955 8 0 8 2 0 0 S", "1956 1960 9 0 8 2 0 0 S"],
            Peru: ["1938 1938 0 1 7 0 0 1 S", "1938 1938 3 1 7 0 0 0", "1938 1939 8 0 8 0 0 1 S", "1939 1940 2 24 0 0 0 0", "1986 1987 0 1 7 0 0 1 S", "1986 1987 3 1 7 0 0 0", "1990 1990 0 1 7 0 0 1 S", "1990 1990 3 1 7 0 0 0", "1994 1994 0 1 7 0 0 1 S", "1994 1994 3 1 7 0 0 0"],
            CA: ["1948 1948 2 14 7 2 0 1 D", "1949 1949 0 1 7 2 0 0 S", "1950 1966 3 0 8 2 0 1 D", "1950 1961 8 0 8 2 0 0 S", "1962 1966 9 0 8 2 0 0 S"],
            Nic: ["1979 1980 2 16 0 0 0 1 D", "1979 1980 5 23 1 0 0 0 S", "2005 2005 3 10 7 0 0 1 D", "2005 2005 9 1 0 0 0 0 S", "2006 2006 3 30 7 2 0 1 D", "2006 2006 9 1 0 1 0 0 S"],
            Menominee: ["1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1966 1966 3 0 8 2 0 1 D", "1966 1966 9 0 8 2 0 0 S"],
            Moncton: ["1933 1935 5 8 0 1 0 1 D", "1933 1935 8 8 0 1 0 0 S", "1936 1938 5 1 0 1 0 1 D", "1936 1938 8 1 0 1 0 0 S", "1939 1939 4 27 7 1 0 1 D", "1939 1941 8 21 6 1 0 0 S", "1940 1940 4 19 7 1 0 1 D", "1941 1941 4 4 7 1 0 1 D", "1946 1972 3 0 8 2 0 1 D", "1946 1956 8 0 8 2 0 0 S", "1957 1972 9 0 8 2 0 0 S", "1993 2006 3 1 0 0:1 0 1 D", "1993 2006 9 0 8 0:1 0 0 S"],
            Uruguay: ["1923 1923 9 2 7 0 0 0:30 HS", "1924 1926 3 1 7 0 0 0", "1924 1925 9 1 7 0 0 0:30 HS", "1933 1935 9 0 8 0 0 0:30 HS", "1934 1936 2 25 6 23:30 2 0", "1936 1936 10 1 7 0 0 0:30 HS", "1937 1941 2 0 8 0 0 0", "1937 1940 9 0 8 0 0 0:30 HS", "1941 1941 7 1 7 0 0 0:30 HS", "1942 1942 0 1 7 0 0 0", "1942 1942 11 14 7 0 0 1 S", "1943 1943 2 14 7 0 0 0", "1959 1959 4 24 7 0 0 1 S", "1959 1959 10 15 7 0 0 0", "1960 1960 0 17 7 0 0 1 S", "1960 1960 2 6 7 0 0 0", "1965 1967 3 1 0 0 0 1 S", "1965 1965 8 26 7 0 0 0", "1966 1967 9 31 7 0 0 0", "1968 1970 4 27 7 0 0 0:30 HS", "1968 1970 11 2 7 0 0 0", "1972 1972 3 24 7 0 0 1 S", "1972 1972 7 15 7 0 0 0", "1974 1974 2 10 7 0 0 0:30 HS", "1974 1974 11 22 7 0 0 1 S", "1976 1976 9 1 7 0 0 0", "1977 1977 11 4 7 0 0 1 S", "1978 1978 3 1 7 0 0 0", "1979 1979 9 1 7 0 0 1 S", "1980 1980 4 1 7 0 0 0", "1987 1987 11 14 7 0 0 1 S", "1988 1988 2 14 7 0 0 0", "1988 1988 11 11 7 0 0 1 S", "1989 1989 2 12 7 0 0 0", "1989 1989 9 29 7 0 0 1 S", "1990 1992 2 1 0 0 0 0", "1990 1991 9 21 0 0 0 1 S", "1992 1992 9 18 7 0 0 1 S", "1993 1993 1 28 7 0 0 0", "2004 2004 8 19 7 0 0 1 S", "2005 2005 2 27 7 2 0 0", "2005 2005 9 9 7 2 0 1 S", "2006 2006 2 12 7 2 0 0", "2006 9999 9 1 0 2 0 1 S", "2007 9999 2 8 0 2 0 0"],
            Mont: ["1917 1917 2 25 7 2 0 1 D", "1917 1917 3 24 7 0 0 0 S", "1919 1919 2 31 7 2:30 0 1 D", "1919 1919 9 25 7 2:30 0 0 S", "1920 1920 4 2 7 2:30 0 1 D", "1920 1922 9 1 0 2:30 0 0 S", "1921 1921 4 1 7 2 0 1 D", "1922 1922 3 30 7 2 0 1 D", "1924 1924 4 17 7 2 0 1 D", "1924 1926 8 0 8 2:30 0 0 S", "1925 1926 4 1 0 2 0 1 D", "1927 1927 4 1 7 0 0 1 D", "1927 1932 8 0 8 0 0 0 S", "1928 1931 3 0 8 0 0 1 D", "1932 1932 4 1 7 0 0 1 D", "1933 1940 3 0 8 0 0 1 D", "1933 1933 9 1 7 0 0 0 S", "1934 1939 8 0 8 0 0 0 S", "1946 1973 3 0 8 2 0 1 D", "1945 1948 8 0 8 2 0 0 S", "1949 1950 9 0 8 2 0 0 S", "1951 1956 8 0 8 2 0 0 S", "1957 1973 9 0 8 2 0 0 S"],
            Bahamas: ["1964 1975 9 0 8 2 0 0 S", "1964 1975 3 0 8 2 0 1 D"],
            NYC: ["1920 1920 2 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1966 3 0 8 2 0 1 D", "1921 1954 8 0 8 2 0 0 S", "1955 1966 9 0 8 2 0 0 S"],
            Haiti: ["1983 1983 4 8 7 0 0 1 D", "1984 1987 3 0 8 0 0 1 D", "1983 1987 9 0 8 0 0 0 S", "1988 1997 3 1 0 1 2 1 D", "1988 1997 9 0 8 1 2 0 S", "2005 2006 3 1 0 0 0 1 D", "2005 2006 9 0 8 0 0 0 S", "2012 9999 2 8 0 2 0 1 D", "2012 9999 10 1 0 2 0 0 S"],
            Regina: ["1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1930 1934 4 1 0 0 0 1 D", "1930 1934 9 1 0 0 0 0 S", "1937 1941 3 8 0 0 0 1 D", "1937 1937 9 8 0 0 0 0 S", "1938 1938 9 1 0 0 0 0 S", "1939 1941 9 8 0 0 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1946 1946 3 8 0 2 0 1 D", "1946 1946 9 8 0 2 0 0 S", "1947 1957 3 0 8 2 0 1 D", "1947 1957 8 0 8 2 0 0 S", "1959 1959 3 0 8 2 0 1 D", "1959 1959 9 0 8 2 0 0 S"],
            Chile: ["1927 1932 8 1 7 0 0 1 S", "1928 1932 3 1 7 0 0 0", "1942 1942 5 1 7 4 1 0", "1942 1942 7 1 7 5 1 1 S", "1946 1946 6 15 7 4 1 1 S", "1946 1946 8 1 7 3 1 0", "1947 1947 3 1 7 4 1 0", "1968 1968 10 3 7 4 1 1 S", "1969 1969 2 30 7 3 1 0", "1969 1969 10 23 7 4 1 1 S", "1970 1970 2 29 7 3 1 0", "1971 1971 2 14 7 3 1 0", "1970 1972 9 9 0 4 1 1 S", "1972 1986 2 9 0 3 1 0", "1973 1973 8 30 7 4 1 1 S", "1974 1987 9 9 0 4 1 1 S", "1987 1987 3 12 7 3 1 0", "1988 1989 2 9 0 3 1 0", "1988 1988 9 1 0 4 1 1 S", "1989 1989 9 9 0 4 1 1 S", "1990 1990 2 18 7 3 1 0", "1990 1990 8 16 7 4 1 1 S", "1991 1996 2 9 0 3 1 0", "1991 1997 9 9 0 4 1 1 S", "1997 1997 2 30 7 3 1 0", "1998 1998 2 9 0 3 1 0", "1998 1998 8 27 7 4 1 1 S", "1999 1999 3 4 7 3 1 0", "1999 2010 9 9 0 4 1 1 S", "2000 2007 2 9 0 3 1 0", "2008 2008 2 30 7 3 1 0", "2009 2009 2 9 0 3 1 0", "2010 2010 3 1 0 3 1 0", "2011 2011 4 2 0 3 1 0", "2011 2011 7 16 0 4 1 1 S", "2012 9999 3 23 0 3 1 0", "2012 9999 8 2 0 4 1 1 S"],
            DR: ["1966 1966 9 30 7 0 0 1 D", "1967 1967 1 28 7 0 0 0 S", "1969 1973 9 0 8 0 0 0:30 HD", "1970 1970 1 21 7 0 0 0 S", "1971 1971 0 20 7 0 0 0 S", "1972 1974 0 21 7 0 0 0 S"],
            "C-Eur": ["1916 1916 3 30 7 23 0 1 S", "1916 1916 9 1 7 1 0 0", "1917 1918 3 15 1 2 2 1 S", "1917 1918 8 15 1 2 2 0", "1940 1940 3 1 7 2 2 1 S", "1942 1942 10 2 7 2 2 0", "1943 1943 2 29 7 2 2 1 S", "1943 1943 9 4 7 2 2 0", "1944 1945 3 1 1 2 2 1 S", "1944 1944 9 2 7 2 2 0", "1945 1945 8 16 7 2 2 0", "1977 1980 3 1 0 2 2 1 S", "1977 1977 8 0 8 2 2 0", "1978 1978 9 1 7 2 2 0", "1979 1995 8 0 8 2 2 0", "1981 9999 2 0 8 2 2 1 S", "1996 9999 9 0 8 2 2 0"],
            Swift: ["1957 1957 3 0 8 2 0 1 D", "1957 1957 9 0 8 2 0 0 S", "1959 1961 3 0 8 2 0 1 D", "1959 1959 9 0 8 2 0 0 S", "1960 1961 8 0 8 2 0 0 S"],
            Hond: ["1987 1988 4 1 0 0 0 1 D", "1987 1988 8 0 8 0 0 0 S", "2006 2006 4 1 0 0 0 1 D", "2006 2006 7 1 1 0 0 0 S"],
            Thule: ["1991 1992 2 0 8 2 0 1 D", "1991 1992 8 0 8 2 0 0 S", "1993 2006 3 1 0 2 0 1 D", "1993 2006 9 0 8 2 0 0 S", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S"],
            Toronto: ["1919 1919 2 30 7 23:30 0 1 D", "1919 1919 9 26 7 0 0 0 S", "1920 1920 4 2 7 2 0 1 D", "1920 1920 8 26 7 0 0 0 S", "1921 1921 4 15 7 2 0 1 D", "1921 1921 8 15 7 2 0 0 S", "1922 1923 4 8 0 2 0 1 D", "1922 1926 8 15 0 2 0 0 S", "1924 1927 4 1 0 2 0 1 D", "1927 1932 8 0 8 2 0 0 S", "1928 1931 3 0 8 2 0 1 D", "1932 1932 4 1 7 2 0 1 D", "1933 1940 3 0 8 2 0 1 D", "1933 1933 9 1 7 2 0 0 S", "1934 1939 8 0 8 2 0 0 S", "1945 1946 8 0 8 2 0 0 S", "1946 1946 3 0 8 2 0 1 D", "1947 1949 3 0 8 0 0 1 D", "1947 1948 8 0 8 0 0 0 S", "1949 1949 10 0 8 0 0 0 S", "1950 1973 3 0 8 2 0 1 D", "1950 1950 10 0 8 2 0 0 S", "1951 1956 8 0 8 2 0 0 S", "1957 1973 9 0 8 2 0 0 S"],
            Winn: ["1916 1916 3 23 7 0 0 1 D", "1916 1916 8 17 7 0 0 0 S", "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1937 1937 4 16 7 2 0 1 D", "1937 1937 8 26 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1946 1946 4 12 7 2 0 1 D", "1946 1946 9 13 7 2 0 0 S", "1947 1949 3 0 8 2 0 1 D", "1947 1949 8 0 8 2 0 0 S", "1950 1950 4 1 7 2 0 1 D", "1950 1950 8 30 7 2 0 0 S", "1951 1960 3 0 8 2 0 1 D", "1951 1958 8 0 8 2 0 0 S", "1959 1959 9 0 8 2 0 0 S", "1960 1960 8 0 8 2 0 0 S", "1963 1963 3 0 8 2 0 1 D", "1963 1963 8 22 7 2 0 0 S", "1966 1986 3 0 8 2 2 1 D", "1966 2005 9 0 8 2 2 0 S", "1987 2005 3 1 0 2 2 1 D"],
            Aus: ["1917 1917 0 1 7 0:1 0 1", "1917 1917 2 25 7 2 0 0", "1942 1942 0 1 7 2 0 1", "1942 1942 2 29 7 2 0 0", "1942 1942 8 27 7 2 0 1", "1943 1944 2 0 8 2 0 0", "1943 1943 9 3 7 2 0 1"],
            AT: ["1967 1967 9 1 0 2 2 1", "1968 1968 2 0 8 2 2 0", "1968 1985 9 0 8 2 2 1", "1969 1971 2 8 0 2 2 0", "1972 1972 1 0 8 2 2 0", "1973 1981 2 1 0 2 2 0", "1982 1983 2 0 8 2 2 0", "1984 1986 2 1 0 2 2 0", "1986 1986 9 15 0 2 2 1", "1987 1990 2 15 0 2 2 0", "1987 1987 9 22 0 2 2 1", "1988 1990 9 0 8 2 2 1", "1991 1999 9 1 0 2 2 1", "1991 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 9999 9 1 0 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0"],
            NZAQ: ["1974 1974 10 3 7 2 2 1 D", "1975 1988 9 0 8 2 2 1 D", "1989 1989 9 8 7 2 2 1 D", "1990 2006 9 1 0 2 2 1 D", "1975 1975 1 23 7 2 2 0 S", "1976 1989 2 1 0 2 2 0 S", "1990 2007 2 15 0 2 2 0 S", "2007 9999 8 0 8 2 2 1 D", "2008 9999 3 1 0 2 2 0 S"],
            ArgAQ: ["1964 1966 2 1 7 0 0 0", "1964 1966 9 15 7 0 0 1 S", "1967 1967 3 2 7 0 0 0", "1967 1968 9 1 0 0 0 1 S", "1968 1969 3 1 0 0 0 0", "1974 1974 0 23 7 0 0 1 S", "1974 1974 4 1 7 0 0 0"],
            ChileAQ: ["1972 1986 2 9 0 3 1 0", "1974 1987 9 9 0 4 1 1 S", "1987 1987 3 12 7 3 1 0", "1988 1989 2 9 0 3 1 0", "1988 1988 9 1 0 4 1 1 S", "1989 1989 9 9 0 4 1 1 S", "1990 1990 2 18 7 3 1 0", "1990 1990 8 16 7 4 1 1 S", "1991 1996 2 9 0 3 1 0", "1991 1997 9 9 0 4 1 1 S", "1997 1997 2 30 7 3 1 0", "1998 1998 2 9 0 3 1 0", "1998 1998 8 27 7 4 1 1 S", "1999 1999 3 4 7 3 1 0", "1999 2010 9 9 0 4 1 1 S", "2000 2007 2 9 0 3 1 0", "2008 2008 2 30 7 3 1 0", "2009 2009 2 9 0 3 1 0", "2010 2010 3 1 0 3 1 0", "2011 2011 4 2 0 3 1 0", "2011 2011 7 16 0 4 1 1 S", "2012 9999 3 23 0 3 1 0", "2012 9999 8 2 0 4 1 1 S"],
            Norway: ["1916 1916 4 22 7 1 0 1 S", "1916 1916 8 30 7 0 0 0", "1945 1945 3 2 7 2 2 1 S", "1945 1945 9 1 7 2 2 0", "1959 1964 2 15 0 2 2 1 S", "1959 1965 8 15 0 2 2 0", "1965 1965 3 25 7 2 2 1 S"],
            RussiaAsia: ["1981 1984 3 1 7 0 0 1 S", "1981 1983 9 1 7 0 0 0", "1984 1991 8 0 8 2 2 0", "1985 1991 2 0 8 2 2 1 S", "1992 1992 2 6 8 23 0 1 S", "1992 1992 8 6 8 23 0 0", "1993 9999 2 0 8 2 2 1 S", "1993 1995 8 0 8 2 2 0", "1996 9999 9 0 8 2 2 0"],
            Jordan: ["1973 1973 5 6 7 0 0 1 S", "1973 1975 9 1 7 0 0 0", "1974 1977 4 1 7 0 0 1 S", "1976 1976 10 1 7 0 0 0", "1977 1977 9 1 7 0 0 0", "1978 1978 3 30 7 0 0 1 S", "1978 1978 8 30 7 0 0 0", "1985 1985 3 1 7 0 0 1 S", "1985 1985 9 1 7 0 0 0", "1986 1988 3 1 5 0 0 1 S", "1986 1990 9 1 5 0 0 0", "1989 1989 4 8 7 0 0 1 S", "1990 1990 3 27 7 0 0 1 S", "1991 1991 3 17 7 0 0 1 S", "1991 1991 8 27 7 0 0 0", "1992 1992 3 10 7 0 0 1 S", "1992 1993 9 1 5 0 0 0", "1993 1998 3 1 5 0 0 1 S", "1994 1994 8 15 5 0 0 0", "1995 1998 8 15 5 0 2 0", "1999 1999 6 1 7 0 2 1 S", "1999 2002 8 5 8 0 2 0", "2000 2001 2 4 8 0 2 1 S", "2002 9999 2 4 8 24 0 1 S", "2003 2003 9 24 7 0 2 0", "2004 2004 9 15 7 0 2 0", "2005 2005 8 5 8 0 2 0", "2006 2011 9 5 8 0 2 0", "2013 9999 9 5 8 0 2 0"],
            Russia: ["1917 1917 6 1 7 23 0 1 MST", "1917 1917 11 28 7 0 0 0 MMT", "1918 1918 4 31 7 22 0 2 MDST", "1918 1918 8 16 7 1 0 1 MST", "1919 1919 4 31 7 23 0 2 MDST", "1919 1919 6 1 7 2 0 1 S", "1919 1919 7 16 7 0 0 0", "1921 1921 1 14 7 23 0 1 S", "1921 1921 2 20 7 23 0 2 M", "1921 1921 8 1 7 0 0 1 S", "1921 1921 9 1 7 0 0 0", "1981 1984 3 1 7 0 0 1 S", "1981 1983 9 1 7 0 0 0", "1984 1991 8 0 8 2 2 0", "1985 1991 2 0 8 2 2 1 S", "1992 1992 2 6 8 23 0 1 S", "1992 1992 8 6 8 23 0 0", "1993 2010 2 0 8 2 2 1 S", "1993 1995 8 0 8 2 2 0", "1996 2010 9 0 8 2 2 0"],
            Iraq: ["1982 1982 4 1 7 0 0 1 D", "1982 1984 9 1 7 0 0 0 S", "1983 1983 2 31 7 0 0 1 D", "1984 1985 3 1 7 0 0 1 D", "1985 1990 8 0 8 1 2 0 S", "1986 1990 2 0 8 1 2 1 D", "1991 2007 3 1 7 3 2 1 D", "1991 2007 9 1 7 3 2 0 S"],
            EUAsia: ["1981 9999 2 0 8 1 1 1 S", "1979 1995 8 0 8 1 1 0", "1996 9999 9 0 8 1 1 0"],
            Azer: ["1997 9999 2 0 8 4 0 1 S", "1997 9999 9 0 8 5 0 0"],
            Lebanon: ["1920 1920 2 28 7 0 0 1 S", "1920 1920 9 25 7 0 0 0", "1921 1921 3 3 7 0 0 1 S", "1921 1921 9 3 7 0 0 0", "1922 1922 2 26 7 0 0 1 S", "1922 1922 9 8 7 0 0 0", "1923 1923 3 22 7 0 0 1 S", "1923 1923 8 16 7 0 0 0", "1957 1961 4 1 7 0 0 1 S", "1957 1961 9 1 7 0 0 0", "1972 1972 5 22 7 0 0 1 S", "1972 1977 9 1 7 0 0 0", "1973 1977 4 1 7 0 0 1 S", "1978 1978 3 30 7 0 0 1 S", "1978 1978 8 30 7 0 0 0", "1984 1987 4 1 7 0 0 1 S", "1984 1991 9 16 7 0 0 0", "1988 1988 5 1 7 0 0 1 S", "1989 1989 4 10 7 0 0 1 S", "1990 1992 4 1 7 0 0 1 S", "1992 1992 9 4 7 0 0 0", "1993 9999 2 0 8 0 0 1 S", "1993 1998 8 0 8 0 0 0", "1999 9999 9 0 8 0 0 0"],
            Kyrgyz: ["1992 1996 3 7 0 0 2 1 S", "1992 1996 8 0 8 0 0 0", "1997 2005 2 0 8 2:30 0 1 S", "1997 2004 9 0 8 2:30 0 0"],
            Mongol: ["1983 1984 3 1 7 0 0 1 S", "1983 1983 9 1 7 0 0 0", "1985 1998 2 0 8 0 0 1 S", "1984 1998 8 0 8 0 0 0", "2001 2001 3 6 8 2 0 1 S", "2001 2006 8 6 8 2 0 0", "2002 2006 2 6 8 2 0 1 S"],
            PRC: ["1986 1986 4 4 7 0 0 1 D", "1986 1991 8 11 0 0 0 0 S", "1987 1991 3 10 0 0 0 1 D"],
            Syria: ["1920 1923 3 15 0 2 0 1 S", "1920 1923 9 1 0 2 0 0", "1962 1962 3 29 7 2 0 1 S", "1962 1962 9 1 7 2 0 0", "1963 1965 4 1 7 2 0 1 S", "1963 1963 8 30 7 2 0 0", "1964 1964 9 1 7 2 0 0", "1965 1965 8 30 7 2 0 0", "1966 1966 3 24 7 2 0 1 S", "1966 1976 9 1 7 2 0 0", "1967 1978 4 1 7 2 0 1 S", "1977 1978 8 1 7 2 0 0", "1983 1984 3 9 7 2 0 1 S", "1983 1984 9 1 7 2 0 0", "1986 1986 1 16 7 2 0 1 S", "1986 1986 9 9 7 2 0 0", "1987 1987 2 1 7 2 0 1 S", "1987 1988 9 31 7 2 0 0", "1988 1988 2 15 7 2 0 1 S", "1989 1989 2 31 7 2 0 1 S", "1989 1989 9 1 7 2 0 0", "1990 1990 3 1 7 2 0 1 S", "1990 1990 8 30 7 2 0 0", "1991 1991 3 1 7 0 0 1 S", "1991 1992 9 1 7 0 0 0", "1992 1992 3 8 7 0 0 1 S", "1993 1993 2 26 7 0 0 1 S", "1993 1993 8 25 7 0 0 0", "1994 1996 3 1 7 0 0 1 S", "1994 2005 9 1 7 0 0 0", "1997 1998 2 1 8 0 0 1 S", "1999 2006 3 1 7 0 0 1 S", "2006 2006 8 22 7 0 0 0", "2007 2007 2 5 8 0 0 1 S", "2007 2007 10 1 5 0 0 0", "2008 2008 3 1 5 0 0 1 S", "2008 2008 10 1 7 0 0 0", "2009 2009 2 5 8 0 0 1 S", "2010 2011 3 1 5 0 0 1 S", "2012 9999 2 5 8 0 0 1 S", "2009 9999 9 5 8 0 0 0"],
            Dhaka: ["2009 2009 5 19 7 23 0 1 S", "2009 2009 11 31 7 23:59 0 0"],
            Zion: ["1940 1940 5 1 7 0 0 1 D", "1942 1944 10 1 7 0 0 0 S", "1943 1943 3 1 7 2 0 1 D", "1944 1944 3 1 7 0 0 1 D", "1945 1945 3 16 7 0 0 1 D", "1945 1945 10 1 7 2 0 0 S", "1946 1946 3 16 7 2 0 1 D", "1946 1946 10 1 7 0 0 0 S", "1948 1948 4 23 7 0 0 2 DD", "1948 1948 8 1 7 0 0 1 D", "1948 1949 10 1 7 2 0 0 S", "1949 1949 4 1 7 0 0 1 D", "1950 1950 3 16 7 0 0 1 D", "1950 1950 8 15 7 3 0 0 S", "1951 1951 3 1 7 0 0 1 D", "1951 1951 10 11 7 3 0 0 S", "1952 1952 3 20 7 2 0 1 D", "1952 1952 9 19 7 3 0 0 S", "1953 1953 3 12 7 2 0 1 D", "1953 1953 8 13 7 3 0 0 S", "1954 1954 5 13 7 0 0 1 D", "1954 1954 8 12 7 0 0 0 S", "1955 1955 5 11 7 2 0 1 D", "1955 1955 8 11 7 0 0 0 S", "1956 1956 5 3 7 0 0 1 D", "1956 1956 8 30 7 3 0 0 S", "1957 1957 3 29 7 2 0 1 D", "1957 1957 8 22 7 0 0 0 S", "1974 1974 6 7 7 0 0 1 D", "1974 1974 9 13 7 0 0 0 S", "1975 1975 3 20 7 0 0 1 D", "1975 1975 7 31 7 0 0 0 S", "1985 1985 3 14 7 0 0 1 D", "1985 1985 8 15 7 0 0 0 S", "1986 1986 4 18 7 0 0 1 D", "1986 1986 8 7 7 0 0 0 S", "1987 1987 3 15 7 0 0 1 D", "1987 1987 8 13 7 0 0 0 S", "1988 1988 3 9 7 0 0 1 D", "1988 1988 8 3 7 0 0 0 S", "1989 1989 3 30 7 0 0 1 D", "1989 1989 8 3 7 0 0 0 S", "1990 1990 2 25 7 0 0 1 D", "1990 1990 7 26 7 0 0 0 S", "1991 1991 2 24 7 0 0 1 D", "1991 1991 8 1 7 0 0 0 S", "1992 1992 2 29 7 0 0 1 D", "1992 1992 8 6 7 0 0 0 S", "1993 1993 3 2 7 0 0 1 D", "1993 1993 8 5 7 0 0 0 S", "1994 1994 3 1 7 0 0 1 D", "1994 1994 7 28 7 0 0 0 S", "1995 1995 2 31 7 0 0 1 D", "1995 1995 8 3 7 0 0 0 S", "1996 1996 2 15 7 0 0 1 D", "1996 1996 8 16 7 0 0 0 S", "1997 1997 2 21 7 0 0 1 D", "1997 1997 8 14 7 0 0 0 S", "1998 1998 2 20 7 0 0 1 D", "1998 1998 8 6 7 0 0 0 S", "1999 1999 3 2 7 2 0 1 D", "1999 1999 8 3 7 2 0 0 S", "2000 2000 3 14 7 2 0 1 D", "2000 2000 9 6 7 1 0 0 S", "2001 2001 3 9 7 1 0 1 D", "2001 2001 8 24 7 1 0 0 S", "2002 2002 2 29 7 1 0 1 D", "2002 2002 9 7 7 1 0 0 S", "2003 2003 2 28 7 1 0 1 D", "2003 2003 9 3 7 1 0 0 S", "2004 2004 3 7 7 1 0 1 D", "2004 2004 8 22 7 1 0 0 S", "2005 2005 3 1 7 2 0 1 D", "2005 2005 9 9 7 2 0 0 S", "2006 2010 2 26 5 2 0 1 D", "2006 2006 9 1 7 2 0 0 S", "2007 2007 8 16 7 2 0 0 S", "2008 2008 9 5 7 2 0 0 S", "2009 2009 8 27 7 2 0 0 S", "2010 2010 8 12 7 2 0 0 S", "2011 2011 3 1 7 2 0 1 D", "2011 2011 9 2 7 2 0 0 S", "2012 2012 2 26 5 2 0 1 D", "2012 2012 8 23 7 2 0 0 S", "2013 9999 2 23 5 2 0 1 D", "2013 2026 9 2 0 2 0 0 S", "2027 2027 9 3 1 2 0 0 S", "2028 9999 9 2 0 2 0 0 S"],
            EgyptAsia: ["1957 1957 4 10 7 0 0 1 S", "1957 1958 9 1 7 0 0 0", "1958 1958 4 1 7 0 0 1 S", "1959 1967 4 1 7 1 0 1 S", "1959 1965 8 30 7 3 0 0", "1966 1966 9 1 7 3 0 0"],
            Palestine: ["1999 2005 3 15 5 0 0 1 S", "1999 2003 9 15 5 0 0 0", "2004 2004 9 1 7 1 0 0", "2005 2005 9 4 7 2 0 0", "2006 2007 3 1 7 0 0 1 S", "2006 2006 8 22 7 0 0 0", "2007 2007 8 8 4 2 0 0", "2008 2009 2 5 8 0 0 1 S", "2008 2008 8 1 7 0 0 0", "2009 2009 8 1 5 1 0 0", "2010 2010 2 26 7 0 0 1 S", "2010 2010 7 11 7 0 0 0", "2011 2011 3 1 7 0:1 0 1 S", "2011 2011 7 1 7 0 0 0", "2011 2011 7 30 7 0 0 1 S", "2011 2011 8 30 7 0 0 0", "2012 9999 2 4 8 24 0 1 S", "2012 9999 8 21 5 1 0 0"],
            HK: ["1941 1941 3 1 7 3:30 0 1 S", "1941 1941 8 30 7 3:30 0 0", "1946 1946 3 20 7 3:30 0 1 S", "1946 1946 11 1 7 3:30 0 0", "1947 1947 3 13 7 3:30 0 1 S", "1947 1947 11 30 7 3:30 0 0", "1948 1948 4 2 7 3:30 0 1 S", "1948 1951 9 0 8 3:30 0 0", "1952 1952 9 25 7 3:30 0 0", "1949 1953 3 1 0 3:30 0 1 S", "1953 1953 10 1 7 3:30 0 0", "1954 1964 2 18 0 3:30 0 1 S", "1954 1954 9 31 7 3:30 0 0", "1955 1964 10 1 0 3:30 0 0", "1965 1976 3 16 0 3:30 0 1 S", "1965 1976 9 16 0 3:30 0 0", "1973 1973 11 30 7 3:30 0 1 S", "1979 1979 4 8 0 3:30 0 1 S", "1979 1979 9 16 0 3:30 0 0"],
            Pakistan: ["2002 2002 3 2 0 0:1 0 1 S", "2002 2002 9 2 0 0:1 0 0", "2008 2008 5 1 7 0 0 1 S", "2008 2008 10 1 7 0 0 0", "2009 2009 3 15 7 0 0 1 S", "2009 2009 10 1 7 0 0 0"],
            NBorneo: ["1935 1941 8 14 7 0 0 0:20 TS", "1935 1941 11 14 7 0 0 0"],
            Macau: ["1961 1962 2 16 0 3:30 0 1 S", "1961 1964 10 1 0 3:30 0 0", "1963 1963 2 16 0 0 0 1 S", "1964 1964 2 16 0 3:30 0 1 S", "1965 1965 2 16 0 0 0 1 S", "1965 1965 9 31 7 0 0 0", "1966 1971 3 16 0 3:30 0 1 S", "1966 1971 9 16 0 3:30 0 0", "1972 1974 3 15 0 0 0 1 S", "1972 1973 9 15 0 0 0 0", "1974 1977 9 15 0 3:30 0 0", "1975 1977 3 15 0 3:30 0 1 S", "1978 1980 3 15 0 0 0 1 S", "1978 1980 9 15 0 0 0 0"],
            Phil: ["1936 1936 10 1 7 0 0 1 S", "1937 1937 1 1 7 0 0 0", "1954 1954 3 12 7 0 0 1 S", "1954 1954 6 1 7 0 0 0", "1978 1978 2 22 7 0 0 1 S", "1978 1978 8 21 7 0 0 0"],
            Cyprus: ["1975 1975 3 13 7 0 0 1 S", "1975 1975 9 12 7 0 0 0", "1976 1976 4 15 7 0 0 1 S", "1976 1976 9 11 7 0 0 0", "1977 1980 3 1 0 0 0 1 S", "1977 1977 8 25 7 0 0 0", "1978 1978 9 2 7 0 0 0", "1979 1997 8 0 8 0 0 0", "1981 1998 2 0 8 0 0 1 S"],
            ROK: ["1960 1960 4 15 7 0 0 1 D", "1960 1960 8 13 7 0 0 0 S", "1987 1988 4 8 0 0 0 1 D", "1987 1988 9 8 0 0 0 0 S"],
            Shang: ["1940 1940 5 3 7 0 0 1 D", "1940 1941 9 1 7 0 0 0 S", "1941 1941 2 16 7 0 0 1 D"],
            Taiwan: ["1945 1951 4 1 7 0 0 1 D", "1945 1951 9 1 7 0 0 0 S", "1952 1952 2 1 7 0 0 1 D", "1952 1954 10 1 7 0 0 0 S", "1953 1959 3 1 7 0 0 1 D", "1955 1961 9 1 7 0 0 0 S", "1960 1961 5 1 7 0 0 1 D", "1974 1975 3 1 7 0 0 1 D", "1974 1975 9 1 7 0 0 0 S", "1979 1979 5 30 7 0 0 1 D", "1979 1979 8 30 7 0 0 0 S"],
            "E-EurAsia": ["1981 9999 2 0 8 0 0 1 S", "1979 1995 8 0 8 0 0 0", "1996 9999 9 0 8 0 0 0"],
            Iran: ["1978 1980 2 21 7 0 0 1 D", "1978 1978 9 21 7 0 0 0 S", "1979 1979 8 19 7 0 0 0 S", "1980 1980 8 23 7 0 0 0 S", "1991 1991 4 3 7 0 0 1 D", "1992 1995 2 22 7 0 0 1 D", "1991 1995 8 22 7 0 0 0 S", "1996 1996 2 21 7 0 0 1 D", "1996 1996 8 21 7 0 0 0 S", "1997 1999 2 22 7 0 0 1 D", "1997 1999 8 22 7 0 0 0 S", "2000 2000 2 21 7 0 0 1 D", "2000 2000 8 21 7 0 0 0 S", "2001 2003 2 22 7 0 0 1 D", "2001 2003 8 22 7 0 0 0 S", "2004 2004 2 21 7 0 0 1 D", "2004 2004 8 21 7 0 0 0 S", "2005 2005 2 22 7 0 0 1 D", "2005 2005 8 22 7 0 0 0 S", "2008 2008 2 21 7 0 0 1 D", "2008 2008 8 21 7 0 0 0 S", "2009 2011 2 22 7 0 0 1 D", "2009 2011 8 22 7 0 0 0 S", "2012 2012 2 21 7 0 0 1 D", "2012 2012 8 21 7 0 0 0 S", "2013 2015 2 22 7 0 0 1 D", "2013 2015 8 22 7 0 0 0 S", "2016 2016 2 21 7 0 0 1 D", "2016 2016 8 21 7 0 0 0 S", "2017 2019 2 22 7 0 0 1 D", "2017 2019 8 22 7 0 0 0 S", "2020 2020 2 21 7 0 0 1 D", "2020 2020 8 21 7 0 0 0 S", "2021 2023 2 22 7 0 0 1 D", "2021 2023 8 22 7 0 0 0 S", "2024 2024 2 21 7 0 0 1 D", "2024 2024 8 21 7 0 0 0 S", "2025 2027 2 22 7 0 0 1 D", "2025 2027 8 22 7 0 0 0 S", "2028 2029 2 21 7 0 0 1 D", "2028 2029 8 21 7 0 0 0 S", "2030 2031 2 22 7 0 0 1 D", "2030 2031 8 22 7 0 0 0 S", "2032 2033 2 21 7 0 0 1 D", "2032 2033 8 21 7 0 0 0 S", "2034 2035 2 22 7 0 0 1 D", "2034 2035 8 22 7 0 0 0 S", "2036 2037 2 21 7 0 0 1 D", "2036 2037 8 21 7 0 0 0 S"],
            Japan: ["1948 1948 4 1 0 2 0 1 D", "1948 1951 8 8 6 2 0 0 S", "1949 1949 3 1 0 2 0 1 D", "1950 1951 4 1 0 2 0 1 D"],
            Port: ["1916 1916 5 17 7 23 0 1 S", "1916 1916 10 1 7 1 0 0", "1917 1917 1 28 7 23 2 1 S", "1917 1921 9 14 7 23 2 0", "1918 1918 2 1 7 23 2 1 S", "1919 1919 1 28 7 23 2 1 S", "1920 1920 1 29 7 23 2 1 S", "1921 1921 1 28 7 23 2 1 S", "1924 1924 3 16 7 23 2 1 S", "1924 1924 9 14 7 23 2 0", "1926 1926 3 17 7 23 2 1 S", "1926 1929 9 1 6 23 2 0", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1931 1931 3 18 7 23 2 1 S", "1931 1932 9 1 6 23 2 0", "1932 1932 3 2 7 23 2 1 S", "1934 1934 3 7 7 23 2 1 S", "1934 1938 9 1 6 23 2 0", "1935 1935 2 30 7 23 2 1 S", "1936 1936 3 18 7 23 2 1 S", "1937 1937 3 3 7 23 2 1 S", "1938 1938 2 26 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 24 7 23 2 1 S", "1940 1941 9 5 7 23 2 0", "1941 1941 3 5 7 23 2 1 S", "1942 1945 2 8 6 23 2 1 S", "1942 1942 3 25 7 22 2 2 M", "1942 1942 7 15 7 22 2 1 S", "1942 1945 9 24 6 23 2 0", "1943 1943 3 17 7 22 2 2 M", "1943 1945 7 25 6 22 2 1 S", "1944 1945 3 21 6 22 2 2 M", "1946 1946 3 1 6 23 2 1 S", "1946 1946 9 1 6 23 2 0", "1947 1949 3 1 0 2 2 1 S", "1947 1949 9 1 0 2 2 0", "1951 1965 3 1 0 2 2 1 S", "1951 1965 9 1 0 2 2 0", "1977 1977 2 27 7 0 2 1 S", "1977 1977 8 25 7 0 2 0", "1978 1979 3 1 0 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1979 1982 8 0 8 1 2 0", "1980 1980 2 0 8 0 2 1 S", "1981 1982 2 0 8 1 2 1 S", "1983 1983 2 0 8 2 2 1 S"],
            "W-Eur": ["1977 1980 3 1 0 1 2 1 S", "1977 1977 8 0 8 1 2 0", "1978 1978 9 1 7 1 2 0", "1979 1995 8 0 8 1 2 0", "1981 9999 2 0 8 1 2 1 S", "1996 9999 9 0 8 1 2 0"],
            Iceland: ["1917 1918 1 19 7 23 0 1 S", "1917 1917 9 21 7 1 0 0", "1918 1918 10 16 7 1 0 0", "1939 1939 3 29 7 23 0 1 S", "1939 1939 10 29 7 2 0 0", "1940 1940 1 25 7 2 0 1 S", "1940 1940 10 3 7 2 0 0", "1941 1941 2 2 7 1 2 1 S", "1941 1941 10 2 7 1 2 0", "1942 1942 2 8 7 1 2 1 S", "1942 1942 9 25 7 1 2 0", "1943 1946 2 1 0 1 2 1 S", "1943 1948 9 22 0 1 2 0", "1947 1967 3 1 0 1 2 1 S", "1949 1949 9 30 7 1 2 0", "1950 1966 9 22 0 1 2 0", "1967 1967 9 29 7 1 2 0"],
            Falk: ["1937 1938 8 0 8 0 0 1 S", "1938 1942 2 19 0 0 0 0", "1939 1939 9 1 7 0 0 1 S", "1940 1942 8 0 8 0 0 1 S", "1943 1943 0 1 7 0 0 0", "1983 1983 8 0 8 0 0 1 S", "1984 1985 3 0 8 0 0 0", "1984 1984 8 16 7 0 0 1 S", "1985 2000 8 9 0 0 0 1 S", "1986 2000 3 16 0 0 0 0", "2001 2010 3 15 0 2 0 0", "2001 2010 8 1 0 2 0 1 S"],
            AS: ["1971 1985 9 0 8 2 2 1", "1986 1986 9 19 7 2 2 1", "1987 2007 9 0 8 2 2 1", "1972 1972 1 27 7 2 2 0", "1973 1985 2 1 0 2 2 0", "1986 1990 2 15 0 2 2 0", "1991 1991 2 3 7 2 2 0", "1992 1992 2 22 7 2 2 0", "1993 1993 2 7 7 2 2 0", "1994 1994 2 20 7 2 2 0", "1995 2005 2 0 8 2 2 0", "2006 2006 3 2 7 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1"],
            AQ: ["1971 1971 9 0 8 2 2 1", "1972 1972 1 0 8 2 2 0", "1989 1991 9 0 8 2 2 1", "1990 1992 2 1 0 2 2 0"],
            AN: ["1971 1985 9 0 8 2 2 1", "1972 1972 1 27 7 2 2 0", "1973 1981 2 1 0 2 2 0", "1982 1982 3 1 0 2 2 0", "1983 1985 2 1 0 2 2 0", "1986 1989 2 15 0 2 2 0", "1986 1986 9 19 7 2 2 1", "1987 1999 9 0 8 2 2 1", "1990 1995 2 1 0 2 2 0", "1996 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 2007 9 0 8 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1"],
            AW: ["1974 1974 9 0 8 2 2 1", "1975 1975 2 1 0 2 2 0", "1983 1983 9 0 8 2 2 1", "1984 1984 2 1 0 2 2 0", "1991 1991 10 17 7 2 2 1", "1992 1992 2 1 0 2 2 0", "2006 2006 11 3 7 2 2 1", "2007 2009 2 0 8 2 2 0", "2007 2008 9 0 8 2 2 1"],
            Holiday: ["1992 1993 9 0 8 2 2 1", "1993 1994 2 1 0 2 2 0"],
            LH: ["1981 1984 9 0 8 2 0 1", "1982 1985 2 1 0 2 0 0", "1985 1985 9 0 8 2 0 0:30", "1986 1989 2 15 0 2 0 0", "1986 1986 9 19 7 2 0 0:30", "1987 1999 9 0 8 2 0 0:30", "1990 1995 2 1 0 2 0 0", "1996 2005 2 0 8 2 0 0", "2000 2000 7 0 8 2 0 0:30", "2001 2007 9 0 8 2 0 0:30", "2006 2006 3 1 0 2 0 0", "2007 2007 2 0 8 2 0 0", "2008 9999 3 1 0 2 0 0", "2008 9999 9 1 0 2 0 0:30"],
            AV: ["1971 1985 9 0 8 2 2 1", "1972 1972 1 0 8 2 2 0", "1973 1985 2 1 0 2 2 0", "1986 1990 2 15 0 2 2 0", "1986 1987 9 15 0 2 2 1", "1988 1999 9 0 8 2 2 1", "1991 1994 2 1 0 2 2 0", "1995 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 2007 9 0 8 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1"],
            Neth: ["1916 1916 4 1 7 0 0 1 NST", "1916 1916 9 1 7 0 0 0 AMT", "1917 1917 3 16 7 2 2 1 NST", "1917 1917 8 17 7 2 2 0 AMT", "1918 1921 3 1 1 2 2 1 NST", "1918 1921 8 1 8 2 2 0 AMT", "1922 1922 2 0 8 2 2 1 NST", "1922 1936 9 2 0 2 2 0 AMT", "1923 1923 5 1 5 2 2 1 NST", "1924 1924 2 0 8 2 2 1 NST", "1925 1925 5 1 5 2 2 1 NST", "1926 1931 4 15 7 2 2 1 NST", "1932 1932 4 22 7 2 2 1 NST", "1933 1936 4 15 7 2 2 1 NST", "1937 1937 4 22 7 2 2 1 NST", "1937 1937 6 1 7 0 0 1 S", "1937 1939 9 2 0 2 2 0", "1938 1939 4 15 7 2 2 1 S", "1945 1945 3 2 7 2 2 1 S", "1945 1945 8 16 7 2 2 0"],
            Greece: ["1932 1932 6 7 7 0 0 1 S", "1932 1932 8 1 7 0 0 0", "1941 1941 3 7 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 30 7 0 0 1 S", "1943 1943 9 4 7 0 0 0", "1952 1952 6 1 7 0 0 1 S", "1952 1952 10 2 7 0 0 0", "1975 1975 3 12 7 0 2 1 S", "1975 1975 10 26 7 0 2 0", "1976 1976 3 11 7 2 2 1 S", "1976 1976 9 10 7 2 2 0", "1977 1978 3 1 0 2 2 1 S", "1977 1977 8 26 7 2 2 0", "1978 1978 8 24 7 4 0 0", "1979 1979 3 1 7 9 0 1 S", "1979 1979 8 29 7 2 0 0", "1980 1980 3 1 7 0 0 1 S", "1980 1980 8 28 7 0 0 0"],
            SovietZone: ["1945 1945 4 24 7 2 0 2 M", "1945 1945 8 24 7 3 0 1 S", "1945 1945 10 18 7 2 2 0"],
            Germany: ["1946 1946 3 14 7 2 2 1 S", "1946 1946 9 7 7 2 2 0", "1947 1949 9 1 0 2 2 0", "1947 1947 3 6 7 3 2 1 S", "1947 1947 4 11 7 2 2 2 M", "1947 1947 5 29 7 3 0 1 S", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 10 7 2 2 1 S"],
            Czech: ["1945 1945 3 8 7 2 2 1 S", "1945 1945 10 18 7 2 2 0", "1946 1946 4 6 7 2 2 1 S", "1946 1949 9 1 0 2 2 0", "1947 1947 3 20 7 2 2 1 S", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 9 7 2 2 1 S"],
            Belgium: ["1918 1918 2 9 7 0 2 1 S", "1918 1919 9 1 6 23 2 0", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 9 25 7 23 2 0", "1922 1922 2 25 7 23 2 1 S", "1922 1927 9 1 6 23 2 0", "1923 1923 3 21 7 23 2 1 S", "1924 1924 2 29 7 23 2 1 S", "1925 1925 3 4 7 23 2 1 S", "1926 1926 3 17 7 23 2 1 S", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1928 1938 9 2 0 2 2 0", "1929 1929 3 21 7 2 2 1 S", "1930 1930 3 13 7 2 2 1 S", "1931 1931 3 19 7 2 2 1 S", "1932 1932 3 3 7 2 2 1 S", "1933 1933 2 26 7 2 2 1 S", "1934 1934 3 8 7 2 2 1 S", "1935 1935 2 31 7 2 2 1 S", "1936 1936 3 19 7 2 2 1 S", "1937 1937 3 4 7 2 2 1 S", "1938 1938 2 27 7 2 2 1 S", "1939 1939 3 16 7 2 2 1 S", "1939 1939 10 19 7 2 2 0", "1940 1940 1 25 7 2 2 1 S", "1944 1944 8 17 7 2 2 0", "1945 1945 3 2 7 2 2 1 S", "1945 1945 8 16 7 2 2 0", "1946 1946 4 19 7 2 2 1 S", "1946 1946 9 7 7 2 2 0"],
            Romania: ["1932 1932 4 21 7 0 2 1 S", "1932 1939 9 1 0 0 2 0", "1933 1939 3 2 0 0 2 1 S", "1979 1979 4 27 7 0 0 1 S", "1979 1979 8 0 8 0 0 0", "1980 1980 3 5 7 23 0 1 S", "1980 1980 8 0 8 1 0 0", "1991 1993 2 0 8 0 2 1 S", "1991 1993 8 0 8 0 2 0"],
            "E-Eur": ["1977 1980 3 1 0 0 0 1 S", "1977 1977 8 0 8 0 0 0", "1978 1978 9 1 7 0 0 0", "1979 1995 8 0 8 0 0 0", "1981 9999 2 0 8 0 0 1 S", "1996 9999 9 0 8 0 0 0"],
            Hungary: ["1918 1918 3 1 7 3 0 1 S", "1918 1918 8 29 7 3 0 0", "1919 1919 3 15 7 3 0 1 S", "1919 1919 8 15 7 3 0 0", "1920 1920 3 5 7 3 0 1 S", "1920 1920 8 30 7 3 0 0", "1945 1945 4 1 7 23 0 1 S", "1945 1945 10 3 7 0 0 0", "1946 1946 2 31 7 2 2 1 S", "1946 1949 9 1 0 2 2 0", "1947 1949 3 4 0 2 2 1 S", "1950 1950 3 17 7 2 2 1 S", "1950 1950 9 23 7 2 2 0", "1954 1955 4 23 7 0 0 1 S", "1954 1955 9 3 7 0 0 0", "1956 1956 5 1 0 0 0 1 S", "1956 1956 8 0 8 0 0 0", "1957 1957 5 1 0 1 0 1 S", "1957 1957 8 0 8 3 0 0", "1980 1980 3 6 7 1 0 1 S"],
            Swiss: ["1941 1942 4 1 1 1 0 1 S", "1941 1942 9 1 1 2 0 0"],
            Denmark: ["1916 1916 4 14 7 23 0 1 S", "1916 1916 8 30 7 23 0 0", "1940 1940 4 15 7 0 0 1 S", "1945 1945 3 2 7 2 2 1 S", "1945 1945 7 15 7 2 2 0", "1946 1946 4 1 7 2 2 1 S", "1946 1946 8 1 7 2 2 0", "1947 1947 4 4 7 2 2 1 S", "1947 1947 7 10 7 2 2 0", "1948 1948 4 9 7 2 2 1 S", "1948 1948 7 8 7 2 2 0"],
            "GB-Eire": ["1916 1916 4 21 7 2 2 1 BST", "1916 1916 9 1 7 2 2 0 GMT", "1917 1917 3 8 7 2 2 1 BST", "1917 1917 8 17 7 2 2 0 GMT", "1918 1918 2 24 7 2 2 1 BST", "1918 1918 8 30 7 2 2 0 GMT", "1919 1919 2 30 7 2 2 1 BST", "1919 1919 8 29 7 2 2 0 GMT", "1920 1920 2 28 7 2 2 1 BST", "1920 1920 9 25 7 2 2 0 GMT", "1921 1921 3 3 7 2 2 1 BST", "1921 1921 9 3 7 2 2 0 GMT", "1922 1922 2 26 7 2 2 1 BST", "1922 1922 9 8 7 2 2 0 GMT", "1923 1923 3 16 0 2 2 1 BST", "1923 1924 8 16 0 2 2 0 GMT", "1924 1924 3 9 0 2 2 1 BST", "1925 1926 3 16 0 2 2 1 BST", "1925 1938 9 2 0 2 2 0 GMT", "1927 1927 3 9 0 2 2 1 BST", "1928 1929 3 16 0 2 2 1 BST", "1930 1930 3 9 0 2 2 1 BST", "1931 1932 3 16 0 2 2 1 BST", "1933 1933 3 9 0 2 2 1 BST", "1934 1934 3 16 0 2 2 1 BST", "1935 1935 3 9 0 2 2 1 BST", "1936 1937 3 16 0 2 2 1 BST", "1938 1938 3 9 0 2 2 1 BST", "1939 1939 3 16 0 2 2 1 BST", "1939 1939 10 16 0 2 2 0 GMT", "1940 1940 1 23 0 2 2 1 BST", "1941 1941 4 2 0 1 2 2 BDST", "1941 1943 7 9 0 1 2 1 BST", "1942 1944 3 2 0 1 2 2 BDST", "1944 1944 8 16 0 1 2 1 BST", "1945 1945 3 2 1 1 2 2 BDST", "1945 1945 6 9 0 1 2 1 BST", "1945 1946 9 2 0 2 2 0 GMT", "1946 1946 3 9 0 2 2 1 BST", "1947 1947 2 16 7 2 2 1 BST", "1947 1947 3 13 7 1 2 2 BDST", "1947 1947 7 10 7 1 2 1 BST", "1947 1947 10 2 7 2 2 0 GMT", "1948 1948 2 14 7 2 2 1 BST", "1948 1948 9 31 7 2 2 0 GMT", "1949 1949 3 3 7 2 2 1 BST", "1949 1949 9 30 7 2 2 0 GMT", "1950 1952 3 14 0 2 2 1 BST", "1950 1952 9 21 0 2 2 0 GMT", "1953 1953 3 16 0 2 2 1 BST", "1953 1960 9 2 0 2 2 0 GMT", "1954 1954 3 9 0 2 2 1 BST", "1955 1956 3 16 0 2 2 1 BST", "1957 1957 3 9 0 2 2 1 BST", "1958 1959 3 16 0 2 2 1 BST", "1960 1960 3 9 0 2 2 1 BST", "1961 1963 2 0 8 2 2 1 BST", "1961 1968 9 23 0 2 2 0 GMT", "1964 1967 2 19 0 2 2 1 BST", "1968 1968 1 18 7 2 2 1 BST", "1972 1980 2 16 0 2 2 1 BST", "1972 1980 9 23 0 2 2 0 GMT", "1981 1995 2 0 8 1 1 1 BST", "1981 1989 9 23 0 1 1 0 GMT", "1990 1995 9 22 0 1 1 0 GMT"],
            Finland: ["1942 1942 3 3 7 0 0 1 S", "1942 1942 9 3 7 0 0 0", "1981 1982 2 0 8 2 0 1 S", "1981 1982 8 0 8 3 0 0"],
            Turkey: ["1916 1916 4 1 7 0 0 1 S", "1916 1916 9 1 7 0 0 0", "1920 1920 2 28 7 0 0 1 S", "1920 1920 9 25 7 0 0 0", "1921 1921 3 3 7 0 0 1 S", "1921 1921 9 3 7 0 0 0", "1922 1922 2 26 7 0 0 1 S", "1922 1922 9 8 7 0 0 0", "1924 1924 4 13 7 0 0 1 S", "1924 1925 9 1 7 0 0 0", "1925 1925 4 1 7 0 0 1 S", "1940 1940 5 30 7 0 0 1 S", "1940 1940 9 5 7 0 0 0", "1940 1940 11 1 7 0 0 1 S", "1941 1941 8 21 7 0 0 0", "1942 1942 3 1 7 0 0 1 S", "1942 1942 10 1 7 0 0 0", "1945 1945 3 2 7 0 0 1 S", "1945 1945 9 8 7 0 0 0", "1946 1946 5 1 7 0 0 1 S", "1946 1946 9 1 7 0 0 0", "1947 1948 3 16 0 0 0 1 S", "1947 1950 9 2 0 0 0 0", "1949 1949 3 10 7 0 0 1 S", "1950 1950 3 19 7 0 0 1 S", "1951 1951 3 22 7 0 0 1 S", "1951 1951 9 8 7 0 0 0", "1962 1962 6 15 7 0 0 1 S", "1962 1962 9 8 7 0 0 0", "1964 1964 4 15 7 0 0 1 S", "1964 1964 9 1 7 0 0 0", "1970 1972 4 2 0 0 0 1 S", "1970 1972 9 2 0 0 0 0", "1973 1973 5 3 7 1 0 1 S", "1973 1973 10 4 7 3 0 0", "1974 1974 2 31 7 2 0 1 S", "1974 1974 10 3 7 5 0 0", "1975 1975 2 30 7 0 0 1 S", "1975 1976 9 0 8 0 0 0", "1976 1976 5 1 7 0 0 1 S", "1977 1978 3 1 0 0 0 1 S", "1977 1977 9 16 7 0 0 0", "1979 1980 3 1 0 3 0 1 S", "1979 1982 9 11 1 0 0 0", "1981 1982 2 0 8 3 0 1 S", "1983 1983 6 31 7 0 0 1 S", "1983 1983 9 2 7 0 0 0", "1985 1985 3 20 7 0 0 1 S", "1985 1985 8 28 7 0 0 0", "1986 1990 2 0 8 2 2 1 S", "1986 1990 8 0 8 2 2 0", "1991 2006 2 0 8 1 2 1 S", "1991 1995 8 0 8 1 2 0", "1996 2006 9 0 8 1 2 0"],
            Poland: ["1918 1919 8 16 7 2 2 0", "1919 1919 3 15 7 2 2 1 S", "1944 1944 3 3 7 2 2 1 S", "1944 1944 9 4 7 2 0 0", "1945 1945 3 29 7 0 0 1 S", "1945 1945 10 1 7 0 0 0", "1946 1946 3 14 7 0 2 1 S", "1946 1946 9 7 7 2 2 0", "1947 1947 4 4 7 2 2 1 S", "1947 1949 9 1 0 2 2 0", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 10 7 2 2 1 S", "1957 1957 5 2 7 1 2 1 S", "1957 1958 8 0 8 1 2 0", "1958 1958 2 30 7 1 2 1 S", "1959 1959 4 31 7 1 2 1 S", "1959 1961 9 1 0 1 2 0", "1960 1960 3 3 7 1 2 1 S", "1961 1964 4 0 8 1 2 1 S", "1962 1964 8 0 8 1 2 0"],
            Lux: ["1916 1916 4 14 7 23 0 1 S", "1916 1916 9 1 7 1 0 0", "1917 1917 3 28 7 23 0 1 S", "1917 1917 8 17 7 1 0 0", "1918 1918 3 15 1 2 2 1 S", "1918 1918 8 15 1 2 2 0", "1919 1919 2 1 7 23 0 1 S", "1919 1919 9 5 7 3 0 0", "1920 1920 1 14 7 23 0 1 S", "1920 1920 9 24 7 2 0 0", "1921 1921 2 14 7 23 0 1 S", "1921 1921 9 26 7 2 0 0", "1922 1922 2 25 7 23 0 1 S", "1922 1922 9 2 0 1 0 0", "1923 1923 3 21 7 23 0 1 S", "1923 1923 9 2 0 2 0 0", "1924 1924 2 29 7 23 0 1 S", "1924 1928 9 2 0 1 0 0", "1925 1925 3 5 7 23 0 1 S", "1926 1926 3 17 7 23 0 1 S", "1927 1927 3 9 7 23 0 1 S", "1928 1928 3 14 7 23 0 1 S", "1929 1929 3 20 7 23 0 1 S"],
            Italy: ["1916 1916 5 3 7 0 2 1 S", "1916 1916 9 1 7 0 2 0", "1917 1917 3 1 7 0 2 1 S", "1917 1917 8 30 7 0 2 0", "1918 1918 2 10 7 0 2 1 S", "1918 1919 9 1 0 0 2 0", "1919 1919 2 2 7 0 2 1 S", "1920 1920 2 21 7 0 2 1 S", "1920 1920 8 19 7 0 2 0", "1940 1940 5 15 7 0 2 1 S", "1944 1944 8 17 7 0 2 0", "1945 1945 3 2 7 2 0 1 S", "1945 1945 8 15 7 0 2 0", "1946 1946 2 17 7 2 2 1 S", "1946 1946 9 6 7 2 2 0", "1947 1947 2 16 7 0 2 1 S", "1947 1947 9 5 7 0 2 0", "1948 1948 1 29 7 2 2 1 S", "1948 1948 9 3 7 2 2 0", "1966 1968 4 22 0 0 0 1 S", "1966 1969 8 22 0 0 0 0", "1969 1969 5 1 7 0 0 1 S", "1970 1970 4 31 7 0 0 1 S", "1970 1970 8 0 8 0 0 0", "1971 1972 4 22 0 0 0 1 S", "1971 1971 8 0 8 1 0 0", "1972 1972 9 1 7 0 0 0", "1973 1973 5 3 7 0 0 1 S", "1973 1974 8 0 8 0 0 0", "1974 1974 4 26 7 0 0 1 S", "1975 1975 5 1 7 0 2 1 S", "1975 1977 8 0 8 0 2 0", "1976 1976 4 30 7 0 2 1 S", "1977 1979 4 22 0 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1979 1979 8 30 7 0 2 0"],
            Malta: ["1973 1973 2 31 7 0 2 1 S", "1973 1973 8 29 7 0 2 0", "1974 1974 3 21 7 0 2 1 S", "1974 1974 8 16 7 0 2 0", "1975 1979 3 15 0 2 0 1 S", "1975 1980 8 15 0 2 0 0", "1980 1980 2 31 7 2 0 1 S"],
            France: ["1916 1916 5 14 7 23 2 1 S", "1916 1919 9 1 0 23 2 0", "1917 1917 2 24 7 23 2 1 S", "1918 1918 2 9 7 23 2 1 S", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 9 25 7 23 2 0", "1922 1922 2 25 7 23 2 1 S", "1922 1938 9 1 6 23 2 0", "1923 1923 4 26 7 23 2 1 S", "1924 1924 2 29 7 23 2 1 S", "1925 1925 3 4 7 23 2 1 S", "1926 1926 3 17 7 23 2 1 S", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1930 1930 3 12 7 23 2 1 S", "1931 1931 3 18 7 23 2 1 S", "1932 1932 3 2 7 23 2 1 S", "1933 1933 2 25 7 23 2 1 S", "1934 1934 3 7 7 23 2 1 S", "1935 1935 2 30 7 23 2 1 S", "1936 1936 3 18 7 23 2 1 S", "1937 1937 3 3 7 23 2 1 S", "1938 1938 2 26 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 25 7 2 0 1 S", "1941 1941 4 5 7 0 0 2 M", "1941 1941 9 6 7 0 0 1 S", "1942 1942 2 9 7 0 0 2 M", "1942 1942 10 2 7 3 0 1 S", "1943 1943 2 29 7 2 0 2 M", "1943 1943 9 4 7 3 0 1 S", "1944 1944 3 3 7 2 0 2 M", "1944 1944 9 8 7 1 0 1 S", "1945 1945 3 2 7 2 0 2 M", "1945 1945 8 16 7 3 0 0", "1976 1976 2 28 7 1 0 1 S", "1976 1976 8 26 7 1 0 0"],
            Latvia: ["1989 1996 2 0 8 2 2 1 S", "1989 1996 8 0 8 2 2 0"],
            Bulg: ["1979 1979 2 31 7 23 0 1 S", "1979 1979 9 1 7 1 0 0", "1980 1982 3 1 6 23 0 1 S", "1980 1980 8 29 7 1 0 0", "1981 1981 8 27 7 2 0 0"],
            Albania: ["1940 1940 5 16 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 29 7 2 0 1 S", "1943 1943 3 10 7 3 0 0", "1974 1974 4 4 7 0 0 1 S", "1974 1974 9 2 7 0 0 0", "1975 1975 4 1 7 0 0 1 S", "1975 1975 9 2 7 0 0 0", "1976 1976 4 2 7 0 0 1 S", "1976 1976 9 3 7 0 0 0", "1977 1977 4 8 7 0 0 1 S", "1977 1977 9 2 7 0 0 0", "1978 1978 4 6 7 0 0 1 S", "1978 1978 9 1 7 0 0 0", "1979 1979 4 5 7 0 0 1 S", "1979 1979 8 30 7 0 0 0", "1980 1980 4 3 7 0 0 1 S", "1980 1980 9 4 7 0 0 0", "1981 1981 3 26 7 0 0 1 S", "1981 1981 8 27 7 0 0 0", "1982 1982 4 2 7 0 0 1 S", "1982 1982 9 3 7 0 0 0", "1983 1983 3 18 7 0 0 1 S", "1983 1983 9 1 7 0 0 0", "1984 1984 3 1 7 0 0 1 S"],
            Austria: ["1920 1920 3 5 7 2 2 1 S", "1920 1920 8 13 7 2 2 0", "1946 1946 3 14 7 2 2 1 S", "1946 1948 9 1 0 2 2 0", "1947 1947 3 6 7 2 2 1 S", "1948 1948 3 18 7 2 2 1 S", "1980 1980 3 6 7 0 0 1 S", "1980 1980 8 28 7 0 0 0"],
            Mauritius: ["1982 1982 9 10 7 0 0 1 S", "1983 1983 2 21 7 0 0 0", "2008 2008 9 0 8 2 0 1 S", "2009 2009 2 0 8 2 0 0"],
            WS: ["2012 9999 8 0 8 3 0 1 D", "2012 9999 3 1 0 4 0 0"],
            NZ: ["1927 1927 10 6 7 2 0 1 S", "1928 1928 2 4 7 2 0 0 M", "1928 1933 9 8 0 2 0 0:30 S", "1929 1933 2 15 0 2 0 0 M", "1934 1940 3 0 8 2 0 0 M", "1934 1940 8 0 8 2 0 0:30 S", "1946 1946 0 1 7 0 0 0 S", "1974 1974 10 1 0 2 2 1 D", "1975 1975 1 0 8 2 2 0 S", "1975 1988 9 0 8 2 2 1 D", "1976 1989 2 1 0 2 2 0 S", "1989 1989 9 8 0 2 2 1 D", "1990 2006 9 1 0 2 2 1 D", "1990 2007 2 15 0 2 2 0 S", "2007 9999 8 0 8 2 2 1 D", "2008 9999 3 1 0 2 2 0 S"],
            Chatham: ["1974 1974 10 1 0 2:45 2 1 D", "1975 1975 1 0 8 2:45 2 0 S", "1975 1988 9 0 8 2:45 2 1 D", "1976 1989 2 1 0 2:45 2 0 S", "1989 1989 9 8 0 2:45 2 1 D", "1990 2006 9 1 0 2:45 2 1 D", "1990 2007 2 15 0 2:45 2 0 S", "2007 9999 8 0 8 2:45 2 1 D", "2008 9999 3 1 0 2:45 2 0 S"],
            Vanuatu: ["1983 1983 8 25 7 0 0 1 S", "1984 1991 2 23 0 0 0 0", "1984 1984 9 23 7 0 0 1 S", "1985 1991 8 23 0 0 0 1 S", "1992 1993 0 23 0 0 0 0", "1992 1992 9 23 0 0 0 1 S"],
            Fiji: ["1998 1999 10 1 0 2 0 1 S", "1999 2000 1 0 8 3 0 0", "2009 2009 10 29 7 2 0 1 S", "2010 2010 2 0 8 3 0 0", "2010 9999 9 18 0 2 0 1 S", "2011 2011 2 1 0 3 0 0", "2012 9999 0 18 0 3 0 0"],
            NC: ["1977 1978 11 1 0 0 0 1 S", "1978 1979 1 27 7 0 0 0", "1996 1996 11 1 7 2 2 1 S", "1997 1997 2 2 7 2 2 0"],
            Cook: ["1978 1978 10 12 7 0 0 0:30 HS", "1979 1991 2 1 0 0 0 0", "1979 1990 9 0 8 0 0 0:30 HS"],
            Tonga: ["1999 1999 9 7 7 2 2 1 S", "2000 2000 2 19 7 2 2 0", "2000 2001 10 1 0 2 0 1 S", "2001 2002 0 0 8 2 0 0"]
        },
        links: {
            "America/Kralendijk": "America/Curacao",
            "America/Lower_Princes": "America/Curacao",
            "America/Marigot": "America/Guadeloupe",
            "America/Shiprock": "America/Denver",
            "America/St_Barthelemy": "America/Guadeloupe",
            "Antarctica/South_Pole": "Antarctica/McMurdo",
            "Arctic/Longyearbyen": "Europe/Oslo",
            "Europe/Bratislava": "Europe/Prague",
            "Europe/Busingen": "Europe/Zurich",
            "Europe/Guernsey": "Europe/London",
            "Europe/Isle_of_Man": "Europe/London",
            "Europe/Jersey": "Europe/London",
            "Europe/Ljubljana": "Europe/Belgrade",
            "Europe/Mariehamn": "Europe/Helsinki",
            "Europe/Podgorica": "Europe/Belgrade",
            "Europe/San_Marino": "Europe/Rome",
            "Europe/Sarajevo": "Europe/Belgrade",
            "Europe/Skopje": "Europe/Belgrade",
            "Europe/Vatican": "Europe/Rome",
            "Europe/Zagreb": "Europe/Belgrade"
        }
    }),
    function(e, t, i, n) {
        i.swipebox = function(a, r) {
            var o, s, l = {
                    useCSS: !0,
                    useSVG: !0,
                    initialIndexOnArray: 0,
                    closeBySwipe: !0,
                    hideBarsOnMobile: !0,
                    hideBarsDelay: 3e3,
                    videoMaxWidth: 1140,
                    vimeoColor: "CCCCCC",
                    beforeOpen: null,
                    afterOpen: null,
                    afterClose: null
                },
                c = this,
                u = [],
                d = a.selector,
                p = i(d),
                h = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
                f = null !== h || t.createTouch !== n || "ontouchstart" in e || "onmsgesturechange" in e || navigator.msMaxTouchPoints,
                m = !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                g = e.innerWidth ? e.innerWidth : i(e).width(),
                _ = e.innerHeight ? e.innerHeight : i(e).height(),
                y = '<div id="swipebox-overlay">					<div id="swipebox-slider"></div>					<div id="swipebox-caption"></div>             		<div id="swipebox-action">             			<a id="swipebox-close" style="line-height: 0px;"><i class="fa fa-times swipebox-close1"></i> <span class="swipebox-close1">CLOSE</span><span class="swipebox-close2">(or press esc)</span></a>             			<a id="swipebox-prev"><i class="fa fa-chevron-left"></i></a>             			<a id="swipebox-next"><i class="fa fa-chevron-right"></i></a>            		</div>			</div>';
            c.settings = {}, c.init = function() {
                c.settings = i.extend({}, l, r), i.isArray(a) ? (u = a, o.target = i(e), o.init(c.settings.initialIndexOnArray)) : i(t).on("click", d, function(e) {
                    if ("slide current" === e.target.parentNode.className) return !1;
                    i.isArray(a) || (o.destroy(), s = i(d), o.actions()), u = [];
                    var t, n, r;
                    r || (n = "data-rel", r = i(this).attr(n)), r || (n = "rel", r = i(this).attr(n)), s = r && "" !== r && "nofollow" !== r ? p.filter("[" + n + '="' + r + '"]') : i(d), s.each(function() {
                        var e = null,
                            t = null;
                        i(this).attr("title") && (e = i(this).attr("title")), i(this).attr("href") && (t = i(this).attr("href")), u.push({
                            href: t,
                            title: e
                        })
                    }), t = s.index(i(this)), e.preventDefault(), e.stopPropagation(), o.target = i(e.target), o.init(t)
                })
            }, o = {
                init: function(e) {
                    c.settings.beforeOpen && c.settings.beforeOpen(), this.target.trigger("swipebox-start"), i.swipebox.isOpen = !0, this.build(), this.openSlide(e), this.openMedia(e), this.preloadMedia(e + 1), this.preloadMedia(e - 1), c.settings.afterOpen && c.settings.afterOpen()
                },
                build: function() {
                    var e, t = this;
                    i("body").append(y), t.doCssTrans() && (i("#swipebox-slider").css({
                        "-webkit-transition": "left 0.4s ease",
                        "-moz-transition": "left 0.4s ease",
                        "-o-transition": "left 0.4s ease",
                        "-khtml-transition": "left 0.4s ease",
                        transition: "left 0.4s ease"
                    }), i("#swipebox-overlay").css({
                        "-webkit-transition": "opacity 1s ease",
                        "-moz-transition": "opacity 1s ease",
                        "-o-transition": "opacity 1s ease",
                        "-khtml-transition": "opacity 1s ease",
                        transition: "opacity 1s ease"
                    })), m && c.settings.useSVG === !0 && (e = i("#swipebox-action #swipebox-close").css("background-image"), e = e.replace("png", "svg"), i("#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close").css({
                        "background-image": e
                    })), h && c.settings.hideBarsOnMobile === !0 && i("#swipebox-action, #swipebox-caption").hide(), i.each(u, function() {
                        i("#swipebox-slider").append('<div class="slide"></div>')
                    }), t.setDim(), t.actions(), f && t.gesture(), t.keyboard(), t.animBars(), t.resize()
                },
                setDim: function() {
                    var t, n, a = {};
                    "onorientationchange" in e ? e.addEventListener("orientationchange", function() {
                        0 === e.orientation ? (t = g, n = _) : (90 === e.orientation || -90 === e.orientation) && (t = _, n = g)
                    }, !1) : (t = e.innerWidth ? e.innerWidth : i(e).width(), n = e.innerHeight ? e.innerHeight : i(e).height()), a = {
                        width: t,
                        height: n
                    }, i("#swipebox-overlay").css(a)
                },
                resize: function() {
                    var t = this;
                    i(e).resize(function() {
                        t.setDim()
                    }).resize()
                },
                supportTransition: function() {
                    var e, i = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");
                    for (e = 0; e < i.length; e++)
                        if (t.createElement("div").style[i[e]] !== n) return i[e];
                    return !1
                },
                doCssTrans: function() {
                    return c.settings.useCSS && this.supportTransition() ? !0 : void 0
                },
                gesture: function() {
                    var e = this,
                        t = null,
                        n = null,
                        a = !1,
                        r = 10,
                        o = 50,
                        s = {},
                        l = {},
                        u = i("#swipebox-caption, #swipebox-action"),
                        d = i("#swipebox-slider");
                    u.addClass("visible-bars"), e.setTimeout(), i("body").bind("touchstart", function(e) {
                        return i(this).addClass("touching"), l = e.originalEvent.targetTouches[0], s.pageX = e.originalEvent.targetTouches[0].pageX, s.pageY = e.originalEvent.targetTouches[0].pageY, i(".touching").bind("touchmove", function(e) {
                            if (e.preventDefault(), e.stopPropagation(), l = e.originalEvent.targetTouches[0], c.settings.closeBySwipe && (n = l.pageY - s.pageY, Math.abs(n) >= o || a)) {
                                var t = .75 - Math.abs(n) / d.height();
                                d.css({
                                    top: n + "px"
                                }), d.css({
                                    opacity: t
                                }), a = !0
                            }
                        }), !1
                    }).bind("touchend", function(o) {
                        if (o.preventDefault(), o.stopPropagation(), c.settings.closeBySwipe) {
                            if (d.css("opacity") <= .5) {
                                var p = n > 0 ? d.height() : -d.height();
                                d.animate({
                                    top: p + "px",
                                    opacity: 0
                                }, 300, function() {
                                    e.closeSlide()
                                })
                            } else d.animate({
                                top: 0,
                                opacity: 1
                            }, 300);
                            if (a) return void(a = !1)
                        }
                        t = l.pageX - s.pageX, t >= r ? e.getPrev() : -r >= t ? e.getNext() : u.hasClass("visible-bars") ? (e.clearTimeout(), e.hideBars()) : (e.showBars(), e.setTimeout()), i(".touching").off("touchmove").removeClass("touching")
                    })
                },
                setTimeout: function() {
                    if (c.settings.hideBarsDelay > 0) {
                        var t = this;
                        t.clearTimeout(), t.timeout = e.setTimeout(function() {
                            t.hideBars()
                        }, c.settings.hideBarsDelay)
                    }
                },
                clearTimeout: function() {
                    e.clearTimeout(this.timeout), this.timeout = null
                },
                showBars: function() {
                    var e = i("#swipebox-caption, #swipebox-action");
                    this.doCssTrans() ? e.addClass("visible-bars") : (i("#swipebox-caption").animate({
                        top: 0
                    }, 500), i("#swipebox-action").animate({
                        bottom: 0
                    }, 500), setTimeout(function() {
                        e.addClass("visible-bars")
                    }, 1e3))
                },
                hideBars: function() {},
                animBars: function() {
                    var e = this,
                        t = i("#swipebox-captionX, #swipebox-actionX");
                    t.addClass("visible-bars"), e.setTimeout(), i("#swipebox-slider").click(function() {
                        t.hasClass("visible-bars") || (e.showBars(), e.setTimeout())
                    }), i("#swipebox-action").hover(function() {
                        e.showBars(), t.addClass("visible-bars"), e.clearTimeout()
                    }, function() {
                        t.removeClass("visible-bars"), e.setTimeout()
                    })
                },
                keyboard: function() {
                    var t = this;
                    i(e).bind("keyup", function(e) {
                        e.preventDefault(), e.stopPropagation(), 37 === e.keyCode ? t.getPrev() : 39 === e.keyCode ? t.getNext() : 27 === e.keyCode && t.closeSlide()
                    })
                },
                actions: function() {
                    var e = this,
                        t = "touchend click";
                    u.length < 2 ? i("#swipebox-prev, #swipebox-next").hide() : (i("#swipebox-prev").bind(t, function(t) {
                        t.preventDefault(), t.stopPropagation(), e.getPrev(), e.setTimeout()
                    }), i("#swipebox-next").bind(t, function(t) {
                        t.preventDefault(), t.stopPropagation(), e.getNext(), e.setTimeout()
                    })), i("#swipebox-close").bind(t, function() {
                        e.closeSlide()
                    })
                },
                setSlide: function(e, t) {
                    t = t || !1;
                    var n = i("#swipebox-slider");
                    this.doCssTrans() ? n.css({
                        left: 100 * -e + "%"
                    }) : n.animate({
                        left: 100 * -e + "%"
                    }), i("#swipebox-slider .slide").removeClass("current"), i("#swipebox-slider .slide").eq(e).addClass("current"), this.setTitle(e), t && n.fadeIn(), i("#swipebox-prev, #swipebox-next").removeClass("disabled"), 0 === e ? i("#swipebox-prev").addClass("disabled") : e === u.length - 1 && i("#swipebox-next").addClass("disabled")
                },
                openSlide: function(t) {
                    i("html").addClass("swipebox-html"), f && i("html").addClass("swipebox-touch"), i(e).trigger("resize"), this.setSlide(t, !0)
                },
                preloadMedia: function(e) {
                    var t = this,
                        i = null;
                    u[e] !== n && (i = u[e].href), t.isVideo(i) ? t.openMedia(e) : setTimeout(function() {
                        t.openMedia(e)
                    }, 1e3)
                },
                openMedia: function(e) {
                    var t = this,
                        a = null;
                    return u[e] !== n && (a = u[e].href), 0 > e || e >= u.length ? !1 : void(t.isVideo(a) ? i("#swipebox-slider .slide").eq(e).html(t.getVideo(a)) : t.loadMedia(a, function() {
                        i("#swipebox-slider .slide").eq(e).html(this)
                    }))
                },
                setTitle: function(e) {
                    var t = null;
                    i("#swipebox-caption").empty(), u[e] !== n && (t = u[e].title), t && i("#swipebox-caption").append(t)
                },
                isVideo: function(e) {
                    if (e) {
                        if (e.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || e.match(/wistia\.com\/([0-9]*)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) return console.log("Its a video! " + e), !0;
                        console.log("Not a videoooo")
                    }
                },
                getVideo: function(e) {
                    var t = "",
                        i = e.match(/watch\?v=([a-zA-Z0-9\-_]+)/),
                        n = e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/),
                        a = e.match(/vimeo\.com\/([0-9]*)/);
                    return wistiaUrl = e.match(/wistia\.com\/([0-9]*)/), console.log(wistiaUrl), i || n ? (n && (i = n), t = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + i[1] + '" frameborder="0" allowfullscreen></iframe>') : a ? t = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + a[1] + "?byline=0&amp;portrait=0&amp;color=" + c.settings.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>' : wistiaUrl && (t = '<iframe width="560" height="315"  src="//fast.wistia.net/embed/iframe/' + wistiaUrl[1] + '?autoPlay=1&playerPreference=html5&wmode=transparent" frameborder="0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen wmode="opaque" ></iframe>'), '<div class="swipebox-video-container" style="max-width:' + c.settings.videomaxWidth + 'px"><div class="swipebox-video">' + t + "</div></div>"
                },
                loadMedia: function(e, t) {
                    if (!this.isVideo(e)) {
                        var n = i("<img>").on("load", function() {
                            t.call(n)
                        });
                        n.attr("src", e)
                    }
                },
                getNext: function() {
                    var e = this,
                        t = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current"));
                    t + 1 < u.length ? (t++, e.setSlide(t), e.preloadMedia(t + 1)) : (i("#swipebox-slider").addClass("rightSpring"), setTimeout(function() {
                        i("#swipebox-slider").removeClass("rightSpring")
                    }, 500))
                },
                getPrev: function() {
                    var e = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current"));
                    e > 0 ? (e--, this.setSlide(e), this.preloadMedia(e - 1)) : (i("#swipebox-slider").addClass("leftSpring"), setTimeout(function() {
                        i("#swipebox-slider").removeClass("leftSpring")
                    }, 500))
                },
                closeSlide: function() {
                    i("html").removeClass("swipebox-html"), i("html").removeClass("swipebox-touch"), i(e).trigger("resize"), this.destroy()
                },
                destroy: function() {
                    i(e).unbind("keyup"), i("body").unbind("touchstart"), i("body").unbind("touchmove"), i("body").unbind("touchend"), i("#swipebox-slider").unbind(), i("#swipebox-overlay").remove(), i.isArray(a) || a.removeData("_swipebox"), this.target && this.target.trigger("swipebox-destroy"), i.swipebox.isOpen = !1, c.settings.afterClose && c.settings.afterClose()
                }
            }, c.init()
        }, i.fn.swipebox = function(e) {
            if (!i.data(this, "_swipebox")) {
                var t = new i.swipebox(this, e);
                this.data("_swipebox", t)
            }
            return this.data("_swipebox")
        }
    }(window, document, jQuery),
    function() {
        function e(e) {
            var i = {
                    r: 0,
                    g: 0,
                    b: 0
                },
                a = 1,
                o = !1,
                s = !1;
            return "string" == typeof e && (e = v(e)), "object" == typeof e && (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b") ? (i = t(e.r, e.g, e.b), o = !0, s = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v") ? (e.s = g(e.s), e.v = g(e.v), i = r(e.h, e.s, e.v), o = !0, s = "hsv") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = g(e.s), e.l = g(e.l), i = n(e.h, e.s, e.l), o = !0, s = "hsl"), e.hasOwnProperty("a") && (a = e.a)), a = c(a), {
                ok: o,
                format: e.format || s,
                r: k(255, C(i.r, 0)),
                g: k(255, C(i.g, 0)),
                b: k(255, C(i.b, 0)),
                a: a
            }
        }

        function t(e, t, i) {
            return {
                r: 255 * u(e, 255),
                g: 255 * u(t, 255),
                b: 255 * u(i, 255)
            }
        }

        function i(e, t, i) {
            e = u(e, 255), t = u(t, 255), i = u(i, 255);
            var n, a, r = C(e, t, i),
                o = k(e, t, i),
                s = (r + o) / 2;
            if (r == o) n = a = 0;
            else {
                var l = r - o;
                switch (a = s > .5 ? l / (2 - r - o) : l / (r + o), r) {
                    case e:
                        n = (t - i) / l + (i > t ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4
                }
                n /= 6
            }
            return {
                h: n,
                s: a,
                l: s
            }
        }

        function n(e, t, i) {
            function n(e, t, i) {
                return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? e + 6 * (t - e) * i : .5 > i ? t : 2 / 3 > i ? e + (t - e) * (2 / 3 - i) * 6 : e
            }
            var a, r, o;
            if (e = u(e, 360), t = u(t, 100), i = u(i, 100), 0 === t) a = r = o = i;
            else {
                var s = .5 > i ? i * (1 + t) : i + t - i * t,
                    l = 2 * i - s;
                a = n(l, s, e + 1 / 3), r = n(l, s, e), o = n(l, s, e - 1 / 3)
            }
            return {
                r: 255 * a,
                g: 255 * r,
                b: 255 * o
            }
        }

        function a(e, t, i) {
            e = u(e, 255), t = u(t, 255), i = u(i, 255);
            var n, a, r = C(e, t, i),
                o = k(e, t, i),
                s = r,
                l = r - o;
            if (a = 0 === r ? 0 : l / r, r == o) n = 0;
            else {
                switch (r) {
                    case e:
                        n = (t - i) / l + (i > t ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4
                }
                n /= 6
            }
            return {
                h: n,
                s: a,
                v: s
            }
        }

        function r(e, t, i) {
            e = 6 * u(e, 360), t = u(t, 100), i = u(i, 100);
            var n = w.floor(e),
                a = e - n,
                r = i * (1 - t),
                o = i * (1 - a * t),
                s = i * (1 - (1 - a) * t),
                l = n % 6,
                c = [i, o, r, r, s, i][l],
                d = [s, i, i, o, r, r][l],
                p = [r, r, s, i, i, o][l];
            return {
                r: 255 * c,
                g: 255 * d,
                b: 255 * p
            }
        }

        function o(e, t, i, n) {
            var a = [m($(e).toString(16)), m($(t).toString(16)), m($(i).toString(16))];
            return n && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
        }

        function s(e, t, i, n) {
            var a = [m(_(n)), m($(e).toString(16)), m($(t).toString(16)), m($(i).toString(16))];
            return a.join("")
        }

        function l(e) {
            var t = {};
            for (var i in e) e.hasOwnProperty(i) && (t[e[i]] = i);
            return t
        }

        function c(e) {
            return e = parseFloat(e), (isNaN(e) || 0 > e || e > 1) && (e = 1), e
        }

        function u(e, t) {
            h(e) && (e = "100%");
            var i = f(e);
            return e = k(t, C(0, parseFloat(e))), i && (e = parseInt(e * t, 10) / 100), w.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t)
        }

        function d(e) {
            return k(1, C(0, e))
        }

        function p(e) {
            return parseInt(e, 16)
        }

        function h(e) {
            return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e)
        }

        function f(e) {
            return "string" == typeof e && -1 != e.indexOf("%")
        }

        function m(e) {
            return 1 == e.length ? "0" + e : "" + e
        }

        function g(e) {
            return 1 >= e && (e = 100 * e + "%"), e
        }

        function _(e) {
            return Math.round(255 * parseFloat(e)).toString(16)
        }

        function y(e) {
            return p(e) / 255
        }

        function v(e) {
            e = e.replace(T, "").replace(b, "").toLowerCase();
            var t = !1;
            if (x[e]) e = x[e], t = !0;
            else if ("transparent" == e) return {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
                format: "name"
            };
            var i;
            return (i = D.rgb.exec(e)) ? {
                r: i[1],
                g: i[2],
                b: i[3]
            } : (i = D.rgba.exec(e)) ? {
                r: i[1],
                g: i[2],
                b: i[3],
                a: i[4]
            } : (i = D.hsl.exec(e)) ? {
                h: i[1],
                s: i[2],
                l: i[3]
            } : (i = D.hsla.exec(e)) ? {
                h: i[1],
                s: i[2],
                l: i[3],
                a: i[4]
            } : (i = D.hsv.exec(e)) ? {
                h: i[1],
                s: i[2],
                v: i[3]
            } : (i = D.hex8.exec(e)) ? {
                a: y(i[1]),
                r: p(i[2]),
                g: p(i[3]),
                b: p(i[4]),
                format: t ? "name" : "hex8"
            } : (i = D.hex6.exec(e)) ? {
                r: p(i[1]),
                g: p(i[2]),
                b: p(i[3]),
                format: t ? "name" : "hex"
            } : (i = D.hex3.exec(e)) ? {
                r: p(i[1] + "" + i[1]),
                g: p(i[2] + "" + i[2]),
                b: p(i[3] + "" + i[3]),
                format: t ? "name" : "hex"
            } : !1
        }
        var T = /^[\s,#]+/,
            b = /\s+$/,
            S = 0,
            w = Math,
            $ = w.round,
            k = w.min,
            C = w.max,
            M = w.random,
            A = function L(t, i) {
                if (t = t ? t : "", i = i || {}, t instanceof L) return t;
                if (!(this instanceof L)) return new L(t, i);
                var n = e(t);
                this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = $(100 * this._a) / 100, this._format = i.format || n.format, this._gradientType = i.gradientType, this._r < 1 && (this._r = $(this._r)), this._g < 1 && (this._g = $(this._g)), this._b < 1 && (this._b = $(this._b)), this._ok = n.ok, this._tc_id = S++
            };
        A.prototype = {
            isValid: function() {
                return this._ok
            },
            getFormat: function() {
                return this._format
            },
            getAlpha: function() {
                return this._a
            },
            setAlpha: function(e) {
                this._a = c(e), this._roundA = $(100 * this._a) / 100
            },
            toHsv: function() {
                var e = a(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    v: e.v,
                    a: this._a
                }
            },
            toHsvString: function() {
                var e = a(this._r, this._g, this._b),
                    t = $(360 * e.h),
                    i = $(100 * e.s),
                    n = $(100 * e.v);
                return 1 == this._a ? "hsv(" + t + ", " + i + "%, " + n + "%)" : "hsva(" + t + ", " + i + "%, " + n + "%, " + this._roundA + ")"
            },
            toHsl: function() {
                var e = i(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    l: e.l,
                    a: this._a
                }
            },
            toHslString: function() {
                var e = i(this._r, this._g, this._b),
                    t = $(360 * e.h),
                    n = $(100 * e.s),
                    a = $(100 * e.l);
                return 1 == this._a ? "hsl(" + t + ", " + n + "%, " + a + "%)" : "hsla(" + t + ", " + n + "%, " + a + "%, " + this._roundA + ")"
            },
            toHex: function(e) {
                return o(this._r, this._g, this._b, e)
            },
            toHexString: function(e) {
                return "#" + this.toHex(e)
            },
            toHex8: function() {
                return s(this._r, this._g, this._b, this._a)
            },
            toHex8String: function() {
                return "#" + this.toHex8()
            },
            toRgb: function() {
                return {
                    r: $(this._r),
                    g: $(this._g),
                    b: $(this._b),
                    a: this._a
                }
            },
            toRgbString: function() {
                return 1 == this._a ? "rgb(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ")" : "rgba(" + $(this._r) + ", " + $(this._g) + ", " + $(this._b) + ", " + this._roundA + ")"
            },
            toPercentageRgb: function() {
                return {
                    r: $(100 * u(this._r, 255)) + "%",
                    g: $(100 * u(this._g, 255)) + "%",
                    b: $(100 * u(this._b, 255)) + "%",
                    a: this._a
                }
            },
            toPercentageRgbString: function() {
                return 1 == this._a ? "rgb(" + $(100 * u(this._r, 255)) + "%, " + $(100 * u(this._g, 255)) + "%, " + $(100 * u(this._b, 255)) + "%)" : "rgba(" + $(100 * u(this._r, 255)) + "%, " + $(100 * u(this._g, 255)) + "%, " + $(100 * u(this._b, 255)) + "%, " + this._roundA + ")"
            },
            toName: function() {
                return 0 === this._a ? "transparent" : this._a < 1 ? !1 : E[o(this._r, this._g, this._b, !0)] || !1
            },
            toFilter: function(e) {
                var t = "#" + s(this._r, this._g, this._b, this._a),
                    i = t,
                    n = this._gradientType ? "GradientType = 1, " : "";
                if (e) {
                    var a = A(e);
                    i = a.toHex8String()
                }
                return "progid:DXImageTransform.Microsoft.gradient(" + n + "startColorstr=" + t + ",endColorstr=" + i + ")"
            },
            toString: function(e) {
                var t = !!e;
                e = e || this._format;
                var i = !1,
                    n = this._a < 1 && this._a >= 0,
                    a = !t && n && ("hex" === e || "hex6" === e || "hex3" === e || "name" === e);
                return a ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (i = this.toRgbString()), "prgb" === e && (i = this.toPercentageRgbString()), ("hex" === e || "hex6" === e) && (i = this.toHexString()), "hex3" === e && (i = this.toHexString(!0)), "hex8" === e && (i = this.toHex8String()), "name" === e && (i = this.toName()), "hsl" === e && (i = this.toHslString()), "hsv" === e && (i = this.toHsvString()), i || this.toHexString())
            }
        }, A.fromRatio = function(e, t) {
            if ("object" == typeof e) {
                var i = {};
                for (var n in e) e.hasOwnProperty(n) && (i[n] = "a" === n ? e[n] : g(e[n]));
                e = i
            }
            return A(e, t)
        }, A.equals = function(e, t) {
            return e && t ? A(e).toRgbString() == A(t).toRgbString() : !1
        }, A.random = function() {
            return A.fromRatio({
                r: M(),
                g: M(),
                b: M()
            })
        }, A.desaturate = function(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = A(e).toHsl();
            return i.s -= t / 100, i.s = d(i.s), A(i)
        }, A.saturate = function(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = A(e).toHsl();
            return i.s += t / 100, i.s = d(i.s), A(i)
        }, A.greyscale = function(e) {
            return A.desaturate(e, 100)
        }, A.lighten = function(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = A(e).toHsl();
            return i.l += t / 100, i.l = d(i.l), A(i)
        }, A.brighten = function(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = A(e).toRgb();
            return i.r = C(0, k(255, i.r - $(255 * -(t / 100)))), i.g = C(0, k(255, i.g - $(255 * -(t / 100)))), i.b = C(0, k(255, i.b - $(255 * -(t / 100)))), A(i)
        }, A.darken = function(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = A(e).toHsl();
            return i.l -= t / 100, i.l = d(i.l), A(i)
        }, A.complement = function(e) {
            var t = A(e).toHsl();
            return t.h = (t.h + 180) % 360, A(t)
        }, A.triad = function(e) {
            var t = A(e).toHsl(),
                i = t.h;
            return [A(e), A({
                h: (i + 120) % 360,
                s: t.s,
                l: t.l
            }), A({
                h: (i + 240) % 360,
                s: t.s,
                l: t.l
            })]
        }, A.tetrad = function(e) {
            var t = A(e).toHsl(),
                i = t.h;
            return [A(e), A({
                h: (i + 90) % 360,
                s: t.s,
                l: t.l
            }), A({
                h: (i + 180) % 360,
                s: t.s,
                l: t.l
            }), A({
                h: (i + 270) % 360,
                s: t.s,
                l: t.l
            })]
        }, A.splitcomplement = function(e) {
            var t = A(e).toHsl(),
                i = t.h;
            return [A(e), A({
                h: (i + 72) % 360,
                s: t.s,
                l: t.l
            }), A({
                h: (i + 216) % 360,
                s: t.s,
                l: t.l
            })]
        }, A.analogous = function(e, t, i) {
            t = t || 6, i = i || 30;
            var n = A(e).toHsl(),
                a = 360 / i,
                r = [A(e)];
            for (n.h = (n.h - (a * t >> 1) + 720) % 360; --t;) n.h = (n.h + a) % 360, r.push(A(n));
            return r
        }, A.monochromatic = function(e, t) {
            t = t || 6;
            for (var i = A(e).toHsv(), n = i.h, a = i.s, r = i.v, o = [], s = 1 / t; t--;) o.push(A({
                h: n,
                s: a,
                v: r
            })), r = (r + s) % 1;
            return o
        }, A.readability = function(e, t) {
            var i = A(e).toRgb(),
                n = A(t).toRgb(),
                a = (299 * i.r + 587 * i.g + 114 * i.b) / 1e3,
                r = (299 * n.r + 587 * n.g + 114 * n.b) / 1e3,
                o = Math.max(i.r, n.r) - Math.min(i.r, n.r) + Math.max(i.g, n.g) - Math.min(i.g, n.g) + Math.max(i.b, n.b) - Math.min(i.b, n.b);
            return {
                brightness: Math.abs(a - r),
                color: o
            }
        }, A.readable = function(e, t) {
            var i = A.readability(e, t);
            return i.brightness > 125 && i.color > 500
        }, A.mostReadable = function(e, t) {
            for (var i = null, n = 0, a = !1, r = 0; r < t.length; r++) {
                var o = A.readability(e, t[r]),
                    s = o.brightness > 125 && o.color > 500,
                    l = 3 * (o.brightness / 125) + o.color / 500;
                (s && !a || s && a && l > n || !s && !a && l > n) && (a = s, n = l, i = A(t[r]))
            }
            return i
        };
        var x = A.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            },
            E = A.hexNames = l(x),
            D = function() {
                var e = "[-\\+]?\\d+%?",
                    t = "[-\\+]?\\d*\\.\\d+%?",
                    i = "(?:" + t + ")|(?:" + e + ")",
                    n = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?",
                    a = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?";
                return {
                    rgb: new RegExp("rgb" + n),
                    rgba: new RegExp("rgba" + a),
                    hsl: new RegExp("hsl" + n),
                    hsla: new RegExp("hsla" + a),
                    hsv: new RegExp("hsv" + n),
                    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                }
            }();
        "undefined" != typeof module && module.exports ? module.exports = A : "function" == typeof define && define.amd ? define(function() {
            return A
        }) : window.tinycolor = A
    }(),
    function(e) {
        var t = /([^&=]+)=?([^&]*)/g,
            i = function(e) {
                return decodeURIComponent(e.replace(/\+/g, " "))
            };
        e.parseParams = function(n) {
            function a(t, i, n) {
                if (i += "", -1 !== i.indexOf(".")) {
                    var r = i.split("."),
                        o = i.split(/\.(.+)?/)[1];
                    t[r[0]] || (t[r[0]] = {}), "" !== o ? a(t[r[0]], o, n) : console.warn('parseParams :: empty property in key "' + i + '"')
                } else if (-1 !== i.indexOf("[")) {
                    var r = i.split("[");
                    i = r[0];
                    var r = r[1].split("]"),
                        s = r[0];
                    "" == s ? (t || (t = {}), t[i] && e.isArray(t[i]) || (t[i] = []), t[i].push(n)) : (t || (t = {}), t[i] && e.isArray(t[i]) || (t[i] = []), t[i][parseInt(s)] = n)
                } else t || (t = {}), t[i] = n
            }
            n += "", "" === n && (n = window.location + "");
            var r, o = {};
            if (n) {
                if (-1 !== n.indexOf("#") && (n = n.substr(0, n.indexOf("#"))), -1 === n.indexOf("?")) return {};
                if (n = n.substr(n.indexOf("?") + 1, n.length), "" == n) return {};
                for (; r = t.exec(n);) {
                    var s = i(r[1]),
                        l = i(r[2]);
                    a(o, s, l)
                }
            }
            return o
        }
    }(jQuery),
    function(e, t, i) {
        function n(e) {
            var t = {},
                n = /^jQuery\d+$/;
            return i.each(e.attributes, function(e, i) {
                i.specified && !n.test(i.name) && (t[i.name] = i.value)
            }), t
        }

        function a(e, t) {
            var n = this,
                a = i(n);
            if (n.value == a.attr("placeholder") && a.hasClass("placeholder"))
                if (a.data("placeholder-password")) {
                    if (a = a.hide().next().show().attr("id", a.removeAttr("id").data("placeholder-id")), e === !0) return a[0].value = t;
                    a.focus()
                } else n.value = "", a.removeClass("placeholder"), n == o() && n.select()
        }

        function r() {
            var e, t = this,
                r = i(t),
                o = this.id;
            if ("" == t.value) {
                if ("password" == t.type) {
                    if (!r.data("placeholder-textinput")) {
                        try {
                            e = r.clone().attr({
                                type: "text"
                            })
                        } catch (s) {
                            e = i("<input>").attr(i.extend(n(this), {
                                type: "text"
                            }))
                        }
                        e.removeAttr("name").data({
                            "placeholder-password": r,
                            "placeholder-id": o
                        }).bind("focus.placeholder", a), r.data({
                            "placeholder-textinput": e,
                            "placeholder-id": o
                        }).before(e)
                    }
                    r = r.removeAttr("id").hide().prev().attr("id", o).show()
                }
                r.addClass("placeholder"), r[0].value = r.attr("placeholder")
            } else r.removeClass("placeholder")
        }

        function o() {
            try {
                return t.activeElement
            } catch (e) {}
        }
        var s, l, c = "[object OperaMini]" == Object.prototype.toString.call(e.operamini),
            u = "placeholder" in t.createElement("input") && !c,
            d = "placeholder" in t.createElement("textarea") && !c,
            p = i.fn,
            h = i.valHooks,
            f = i.propHooks;
        u && d ? (l = p.placeholder = function() {
            return this
        }, l.input = l.textarea = !0) : (l = p.placeholder = function() {
            var e = this;
            return e.filter((u ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": a,
                "blur.placeholder": r
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), e
        }, l.input = u, l.textarea = d, s = {
            get: function(e) {
                var t = i(e),
                    n = t.data("placeholder-password");
                return n ? n[0].value : t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
            },
            set: function(e, t) {
                var n = i(e),
                    s = n.data("placeholder-password");
                return s ? s[0].value = t : n.data("placeholder-enabled") ? ("" == t ? (e.value = t, e != o() && r.call(e)) : n.hasClass("placeholder") ? a.call(e, !0, t) || (e.value = t) : e.value = t, n) : e.value = t
            }
        }, u || (h.input = s, f.value = s), d || (h.textarea = s, f.value = s), i(function() {
            i(t).delegate("form", "submit.placeholder", function() {
                var e = i(".placeholder", this).each(a);
                setTimeout(function() {
                    e.each(r)
                }, 10)
            })
        }), i(e).bind("beforeunload.placeholder", function() {
            i(".placeholder").each(function() {
                this.value = ""
            })
        }))
    }(this, document, jQuery),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    }(function(e, t) {
        "use strict";

        function i(e, t) {
            this.container = e, this.options = t, this.init()
        }

        function n(t, i) {
            this.widget = t, this.options = e.extend({}, i), this.detectService(), this.service && this.init()
        }

        function a(e) {
            function t(e, t) {
                return t.toUpper()
            }
            var i = {},
                n = e.data();
            for (var a in n) {
                var r = n[a];
                "yes" === r ? r = !0 : "no" === r && (r = !1), i[a.replace(/-(\w)/g, t)] = r
            }
            return i
        }

        function r(e, t) {
            return o(e, t, encodeURIComponent)
        }

        function o(e, t, i) {
            return e.replace(/\{([^\}]+)\}/g, function(e, n) {
                return n in t ? i ? i(t[n]) : t[n] : e
            })
        }

        function s(e, t) {
            var i = d + e;
            return i + " " + i + "_" + t
        }

        function l(t, i) {
            function n(o) {
                "keydown" === o.type && 27 !== o.which || e(o.target).closest(t).length || (t.removeClass(p), a.off(r, n), e.isFunction(i) && i())
            }
            var a = e(document),
                r = "click touchstart keydown";
            a.on(r, n)
        }

        function c(e) {
            var t = 10;
            if (document.documentElement.getBoundingClientRect) {
                var i = parseInt(e.css("left"), 10),
                    n = parseInt(e.css("top"), 10),
                    a = e[0].getBoundingClientRect();
                a.left < t ? e.css("left", t - a.left + i) : a.right > window.innerWidth - t && e.css("left", window.innerWidth - a.right - t + i), a.top < t ? e.css("top", t - a.top + n) : a.bottom > window.innerHeight - t && e.css("top", window.innerHeight - a.bottom - t + n)
            }
            e.addClass(p)
        }
        var u = "social-likes",
            d = u + "__",
            p = u + "_opened",
            h = "https:" === location.protocol ? "https:" : "http:",
            f = {
                facebook: {
                    counterUrl: "https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",
                    convertNumber: function(e) {
                        return e.data[0].total_count
                    },
                    popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
                    popupWidth: 600,
                    popupHeight: 500
                },
                twitter: {
                    counterUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
                    convertNumber: function(e) {
                        return e.count
                    },
                    popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
                    popupWidth: 600,
                    popupHeight: 450,
                    click: function() {
                        return /[\.:\-\u2013\u2014]\s*$/.test(this.options.title) || (this.options.title += ":"), !0
                    }
                },
                mailru: {
                    counterUrl: h + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
                    convertNumber: function(e) {
                        for (var t in e)
                            if (e.hasOwnProperty(t)) return e[t].shares
                    },
                    popupUrl: h + "//connect.mail.ru/share?share_url={url}&title={title}",
                    popupWidth: 550,
                    popupHeight: 360
                },
                vkontakte: {
                    counterUrl: h + "//vk.com/share.php?act=count&url={url}&index={index}",
                    counter: function(t, i) {
                        var n = f.vkontakte;
                        n._ || (n._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                            count: function(e, t) {
                                n._[e].resolve(t)
                            }
                        });
                        var a = n._.length;
                        n._.push(i), e.getScript(r(t, {
                            index: a
                        })).fail(i.reject)
                    },
                    popupUrl: h + "//vk.com/share.php?url={url}&title={title}",
                    popupWidth: 550,
                    popupHeight: 330
                },
                odnoklassniki: {
                    counterUrl: h + "//www.odnoklassniki.ru/dk?st.cmd=shareData&ref={url}&cb=?",
                    convertNumber: function(e) {
                        return e.count
                    },
                    popupUrl: h + "//www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl={url}",
                    popupWidth: 550,
                    popupHeight: 360
                },
                plusone: {
                    counterUrl: "http:" === h ? "http://share.yandex.ru/gpp.xml?url={url}" : t,
                    counter: function(t, i) {
                        var n = f.plusone;
                        return n._ ? void i.reject() : (window.services || (window.services = {}), window.services.gplus = {
                            cb: function(e) {
                                n._.resolve(e)
                            }
                        }, n._ = i, void e.getScript(r(t)).fail(i.reject))
                    },
                    popupUrl: "https://plus.google.com/share?url={url}",
                    popupWidth: 700,
                    popupHeight: 500
                },
                pinterest: {
                    counterUrl: h + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
                    convertNumber: function(e) {
                        return e.count
                    },
                    popupUrl: h + "//pinterest.com/pin/create/button/?url={url}&description={title}",
                    popupWidth: 630,
                    popupHeight: 270
                }
            },
            m = {
                promises: {},
                fetch: function(t, i, n) {
                    m.promises[t] || (m.promises[t] = {});
                    var a = m.promises[t];
                    if (!n.forceUpdate && a[i]) return a[i];
                    var o = e.extend({}, f[t], n),
                        s = e.Deferred(),
                        l = o.counterUrl && r(o.counterUrl, {
                            url: i
                        });
                    return l && e.isFunction(o.counter) ? o.counter(l, s) : o.counterUrl ? e.getJSON(l).done(function(t) {
                        try {
                            var i = t;
                            e.isFunction(o.convertNumber) && (i = o.convertNumber(t)), s.resolve(i)
                        } catch (n) {
                            s.reject()
                        }
                    }).fail(s.reject) : s.reject(), a[i] = s.promise(), a[i]
                }
            };
        e.fn.socialLikes = function(t) {
            return this.each(function() {
                var n = e(this),
                    r = n.data(u);
                r ? e.isPlainObject(t) && r.update(t) : (r = new i(n, e.extend({}, e.fn.socialLikes.defaults, t, a(n))), n.data(u, r))
            })
        }, e.fn.socialLikes.defaults = {
            url: window.location.href.replace(window.location.hash, ""),
            title: document.title,
            counters: !0,
            zeroes: !1,
            wait: 500,
            popupCheckInterval: 500,
            singleTitle: "Share"
        }, i.prototype = {
            init: function() {
                this.container.addClass(u), this.single = this.container.hasClass(u + "_single"), this.initUserButtons(), this.number = 0, this.container.on("counter." + u, e.proxy(this.updateCounter, this));
                var t = this.container.children();
                this.countersLeft = t.length, this.makeSingleButton(), this.buttons = [], t.each(e.proxy(function(t, i) {
                    this.buttons.push(new n(e(i), this.options))
                }, this)), this.options.counters ? this.timer = setTimeout(e.proxy(this.appear, this), this.options.wait) : this.appear()
            },
            initUserButtons: function() {
                !this.userButtonInited && window.socialLikesButtons && e.extend(!0, f, socialLikesButtons), this.userButtonInited = !0
            },
            makeSingleButton: function() {
                if (this.single) {
                    var t = this.container;
                    t.addClass(u + "_vertical"), t.wrap(e("<div>", {
                        "class": u + "_single-w"
                    })), t.wrapInner(e("<div>", {
                        "class": u + "__single-container"
                    }));
                    var i = t.parent(),
                        n = e("<div>", {
                            "class": s("widget", "single")
                        }),
                        a = e(o('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                            buttonCls: s("button", "single"),
                            iconCls: s("icon", "single"),
                            title: this.options.singleTitle
                        }));
                    n.append(a), i.append(n), n.click(function() {
                        var e = u + "__widget_active";
                        return n.toggleClass(e), n.hasClass(e) ? (t.css({
                            left: -(t.width() - n.width()) / 2,
                            top: -t.height()
                        }), c(t), l(t, function() {
                            n.removeClass(e)
                        })) : t.removeClass(p), !1
                    }), this.widget = n
                }
            },
            update: function(t) {
                if (t.forceUpdate || t.url !== this.options.url) {
                    this.number = 0, this.countersLeft = this.buttons.length, this.widget && this.widget.find("." + u + "__counter").remove(), e.extend(this.options, t);
                    for (var i = 0; i < this.buttons.length; i++) this.buttons[i].update(t)
                }
            },
            updateCounter: function(e, t, i) {
                i && (this.number += i, this.single && this.getCounterElem().text(this.number)), this.countersLeft--, 0 === this.countersLeft && (this.appear(), this.container.addClass(u + "_ready"), this.container.trigger("ready." + u, this.number))
            },
            appear: function() {
                this.container.addClass(u + "_visible")
            },
            getCounterElem: function() {
                var t = this.widget.find("." + d + "counter_single");
                return t.length || (t = e("<span>", {
                    "class": s("counter", "single")
                }), this.widget.append(t)), t
            }
        }, n.prototype = {
            init: function() {
                this.detectParams(), this.initHtml(), this.initCounter()
            },
            update: function(t) {
                e.extend(this.options, {
                    forceUpdate: !1
                }, t), this.widget.find("." + u + "__counter").remove(), this.initCounter()
            },
            detectService: function() {
                var t = this.widget.data("service");
                if (!t) {
                    for (var i = this.widget[0], n = i.classList || i.className.split(" "), a = 0; a < n.length; a++) {
                        var r = n[a];
                        if (f[r]) {
                            t = r;
                            break
                        }
                    }
                    if (!t) return
                }
                this.service = t, e.extend(this.options, f[t])
            },
            detectParams: function() {
                var e = this.widget.data();
                if (e.counter) {
                    var t = parseInt(e.counter, 10);
                    isNaN(t) ? this.options.counterUrl = e.counter : this.options.counterNumber = t
                }
                e.title && (this.options.title = e.title), e.url && (this.options.url = e.url)
            },
            initHtml: function() {
                var t = this.options,
                    i = this.widget,
                    n = i.find("a");
                n.length && this.cloneDataAttrs(n, i);
                var a = e("<span>", {
                    "class": this.getElementClassNames("button"),
                    text: i.text()
                });
                if (t.clickUrl) {
                    var o = r(t.clickUrl, {
                            url: t.url,
                            title: t.title
                        }),
                        s = e("<a>", {
                            href: o
                        });
                    this.cloneDataAttrs(i, s), i.replaceWith(s), this.widget = i = s
                } else i.click(e.proxy(this.click, this));
                i.removeClass(this.service), i.addClass(this.getElementClassNames("widget")), a.prepend(e("<span>", {
                    "class": this.getElementClassNames("icon")
                })), i.empty().append(a), this.button = a
            },
            initCounter: function() {
                if (this.options.counters)
                    if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);
                    else {
                        var t = {
                            counterUrl: this.options.counterUrl,
                            forceUpdate: this.options.forceUpdate
                        };
                        m.fetch(this.service, this.options.url, t).always(e.proxy(this.updateCounter, this))
                    }
            },
            cloneDataAttrs: function(e, t) {
                var i = e.data();
                for (var n in i) i.hasOwnProperty(n) && t.data(n, i[n])
            },
            getElementClassNames: function(e) {
                return s(e, this.service)
            },
            updateCounter: function(t) {
                t = parseInt(t, 10) || 0;
                var i = {
                    "class": this.getElementClassNames("counter"),
                    text: t
                };
                t || this.options.zeroes || (i["class"] += " " + u + "__counter_empty", i.text = "");
                var n = e("<span>", i);
                this.widget.append(n), this.widget.trigger("counter." + u, [this.service, t])
            },
            click: function(t) {
                var i = this.options,
                    n = !0;
                if (e.isFunction(i.click) && (n = i.click.call(this, t)), n) {
                    var a = r(i.popupUrl, {
                        url: i.url,
                        title: i.title
                    });
                    a = this.addAdditionalParamsToUrl(a), this.openPopup(a, {
                        width: i.popupWidth,
                        height: i.popupHeight
                    })
                }
                return !1
            },
            addAdditionalParamsToUrl: function(t) {
                var i = e.param(e.extend(this.widget.data(), this.options.data));
                if (e.isEmptyObject(i)) return t;
                var n = -1 === t.indexOf("?") ? "?" : "&";
                return t + n + i
            },
            openPopup: function(t, i) {
                var n = Math.round(screen.width / 2 - i.width / 2),
                    a = 0;
                screen.height > i.height && (a = Math.round(screen.height / 3 - i.height / 2));
                var r = window.open(t, "sl_" + this.service, "left=" + n + ",top=" + a + ",width=" + i.width + ",height=" + i.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
                if (r) {
                    r.focus(), this.widget.trigger("popup_opened." + u, [this.service, r]);
                    var o = setInterval(e.proxy(function() {
                        r.closed && (clearInterval(o), this.widget.trigger("popup_closed." + u, this.service))
                    }, this), this.options.popupCheckInterval)
                } else location.href = t
            }
        }, e(function() {
            e("." + u).socialLikes()
        })
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(e) {
        function t(e) {
            return s.raw ? e : encodeURIComponent(e)
        }

        function i(e) {
            return s.raw ? e : decodeURIComponent(e)
        }

        function n(e) {
            return t(s.json ? JSON.stringify(e) : String(e))
        }

        function a(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(o, " ")), s.json ? JSON.parse(e) : e
            } catch (t) {}
        }

        function r(t, i) {
            var n = s.raw ? t : a(t);
            return e.isFunction(i) ? i(n) : n
        }
        var o = /\+/g,
            s = e.cookie = function(a, o, l) {
                if (void 0 !== o && !e.isFunction(o)) {
                    if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            u = l.expires = new Date;
                        u.setTime(+u + 864e5 * c)
                    }
                    return document.cookie = [t(a), "=", n(o), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var d = a ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], h = 0, f = p.length; f > h; h++) {
                    var m = p[h].split("="),
                        g = i(m.shift()),
                        _ = m.join("=");
                    if (a && a === g) {
                        d = r(_, o);
                        break
                    }
                    a || void 0 === (_ = r(_)) || (d[g] = _)
                }
                return d
            };
        s.defaults = {}, e.removeCookie = function(t, i) {
            return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, i, {
                expires: -1
            })), !e.cookie(t))
        }
    }),
    function(e) {
        var t, i, n, a, r, o, s, l = "Close",
            c = "BeforeClose",
            u = "AfterClose",
            d = "BeforeAppend",
            p = "MarkupParse",
            h = "Open",
            f = "Change",
            m = "mfp",
            g = "." + m,
            _ = "mfp-ready",
            y = "mfp-removing",
            v = "mfp-prevent-close",
            T = function() {},
            b = !!window.jQuery,
            S = e(window),
            w = function(e, i) {
                t.ev.on(m + e + g, i)
            },
            $ = function(t, i, n, a) {
                var r = document.createElement("div");
                return r.className = "mfp-" + t, n && (r.innerHTML = n), a ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
            },
            k = function(i, n) {
                t.ev.triggerHandler(m + i, n), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
            },
            C = function(i) {
                return i === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = i), t.currTemplate.closeBtn
            },
            M = function() {
                e.magnificPopup.instance || (t = new T, t.init(), e.magnificPopup.instance = t)
            },
            A = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            };
        T.prototype = {
            constructor: T,
            init: function() {
                var i = navigator.appVersion;
                t.isIE7 = -1 !== i.indexOf("MSIE 7."), t.isIE8 = -1 !== i.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = A(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), a = e(document), t.popupsCache = {}
            },
            open: function(i) {
                n || (n = e(document.body));
                var r;
                if (i.isObj === !1) {
                    t.items = i.items.toArray(), t.index = 0;
                    var s, l = i.items;
                    for (r = 0; l.length > r; r++)
                        if (s = l[r], s.parsed && (s = s.el[0]), s === i.el[0]) {
                            t.index = r;
                            break
                        }
                } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
                if (t.isOpen) return void t.updateItemHTML();
                t.types = [], o = "", t.ev = i.mainEl && i.mainEl.length ? i.mainEl.eq(0) : a, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = $("bg").on("click" + g, function() {
                    t.close()
                }), t.wrap = $("wrap").attr("tabindex", -1).on("click" + g, function(e) {
                    t._checkIfClose(e.target) && t.close()
                }), t.container = $("container", t.wrap)), t.contentContainer = $("content"), t.st.preloader && (t.preloader = $("preloader", t.container, t.st.tLoading));
                var c = e.magnificPopup.modules;
                for (r = 0; c.length > r; r++) {
                    var u = c[r];
                    u = u.charAt(0).toUpperCase() + u.slice(1), t["init" + u].call(t)
                }
                k("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (w(p, function(e, t, i, n) {
                    i.close_replaceWith = C(n.type)
                }), o += " mfp-close-btn-in") : t.wrap.append(C())), t.st.alignTop && (o += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                } : {
                    top: S.scrollTop(),
                    position: "absolute"
                }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: a.height(),
                    position: "absolute"
                }), t.st.enableEscapeKey && a.on("keyup" + g, function(e) {
                    27 === e.keyCode && t.close()
                }), S.on("resize" + g, function() {
                    t.updateSize()
                }), t.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && t.wrap.addClass(o);
                var d = t.wH = S.height(),
                    f = {};
                if (t.fixedContentPos && t._hasScrollBar(d)) {
                    var m = t._getScrollbarSize();
                    m && (f.marginRight = m)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                var y = t.st.mainClass;
                return t.isIE7 && (y += " mfp-ie7"), y && t._addClassToMFP(y), t.updateItemHTML(), k("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || n), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                    t.content ? (t._addClassToMFP(_), t._setFocus()) : t.bgOverlay.addClass(_), a.on("focusin" + g, t._onFocusIn)
                }, 16), t.isOpen = !0, t.updateSize(d), k(h), i
            },
            close: function() {
                t.isOpen && (k(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(y), setTimeout(function() {
                    t._close()
                }, t.st.removalDelay)) : t._close())
            },
            _close: function() {
                k(l);
                var i = y + " " + _ + " ";
                if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                    var n = {
                        marginRight: ""
                    };
                    t.isIE7 ? e("body, html").css("overflow", "") : n.overflow = "", e("html").css(n)
                }
                a.off("keyup" + g + " focusin" + g), t.ev.off(g), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, k(u)
            },
            updateSize: function(e) {
                if (t.isIOS) {
                    var i = document.documentElement.clientWidth / window.innerWidth,
                        n = window.innerHeight * i;
                    t.wrap.css("height", n), t.wH = n
                } else t.wH = e || S.height();
                t.fixedContentPos || t.wrap.css("height", t.wH), k("Resize")
            },
            updateItemHTML: function() {
                var i = t.items[t.index];
                t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
                var n = i.type;
                if (k("BeforeChange", [t.currItem ? t.currItem.type : "", n]), t.currItem = i, !t.currTemplate[n]) {
                    var a = t.st[n] ? t.st[n].markup : !1;
                    k("FirstMarkupParse", a), t.currTemplate[n] = a ? e(a) : !0
                }
                r && r !== i.type && t.container.removeClass("mfp-" + r + "-holder");
                var o = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
                t.appendContent(o, n), i.preloaded = !0, k(f, i), r = i.type, t.container.prepend(t.contentContainer), k("AfterChange")
            },
            appendContent: function(e, i) {
                t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[i] === !0 ? t.content.find(".mfp-close").length || t.content.append(C()) : t.content = e : t.content = "", k(d), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
            },
            parseEl: function(i) {
                var n, a = t.items[i];
                if (a.tagName ? a = {
                        el: e(a)
                    } : (n = a.type, a = {
                        data: a,
                        src: a.src
                    }), a.el) {
                    for (var r = t.types, o = 0; r.length > o; o++)
                        if (a.el.hasClass("mfp-" + r[o])) {
                            n = r[o];
                            break
                        }
                    a.src = a.el.attr("data-mfp-src"), a.src || (a.src = a.el.attr("href"))
                }
                return a.type = n || t.st.type || "inline", a.index = i, a.parsed = !0, t.items[i] = a, k("ElementParse", a), t.items[i]
            },
            addGroup: function(e, i) {
                var n = function(n) {
                    n.mfpEl = this, t._openClick(n, e, i)
                };
                i || (i = {});
                var a = "click.magnificPopup";
                i.mainEl = e, i.items ? (i.isObj = !0, e.off(a).on(a, n)) : (i.isObj = !1, i.delegate ? e.off(a).on(a, i.delegate, n) : (i.items = e, e.off(a).on(a, n)))
            },
            _openClick: function(i, n, a) {
                var r = void 0 !== a.midClick ? a.midClick : e.magnificPopup.defaults.midClick;
                if (r || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                    var o = void 0 !== a.disableOn ? a.disableOn : e.magnificPopup.defaults.disableOn;
                    if (o)
                        if (e.isFunction(o)) {
                            if (!o.call(t)) return !0
                        } else if (o > S.width()) return !0;
                    i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), a.el = e(i.mfpEl), a.delegate && (a.items = n.find(a.delegate)), t.open(a)
                }
            },
            updateStatus: function(e, n) {
                if (t.preloader) {
                    i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                    var a = {
                        status: e,
                        text: n
                    };
                    k("UpdateStatus", a), e = a.status, n = a.text, t.preloader.html(n), t.preloader.find("a").on("click", function(e) {
                        e.stopImmediatePropagation()
                    }), t.container.addClass("mfp-s-" + e), i = e
                }
            },
            _checkIfClose: function(i) {
                if (!e(i).hasClass(v)) {
                    var n = t.st.closeOnContentClick,
                        a = t.st.closeOnBgClick;
                    if (n && a) return !0;
                    if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                    if (i === t.content[0] || e.contains(t.content[0], i)) {
                        if (n) return !0
                    } else if (a && e.contains(document, i)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(e) {
                t.bgOverlay.addClass(e), t.wrap.addClass(e)
            },
            _removeClassFromMFP: function(e) {
                this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
            },
            _hasScrollBar: function(e) {
                return (t.isIE7 ? a.height() : document.body.scrollHeight) > (e || S.height())
            },
            _setFocus: function() {
                (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
            },
            _onFocusIn: function(i) {
                return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
            },
            _parseMarkup: function(t, i, n) {
                var a;
                n.data && (i = e.extend(n.data, i)), k(p, [t, i, n]), e.each(i, function(e, i) {
                    if (void 0 === i || i === !1) return !0;
                    if (a = e.split("_"), a.length > 1) {
                        var n = t.find(g + "-" + a[0]);
                        if (n.length > 0) {
                            var r = a[1];
                            "replaceWith" === r ? n[0] !== i[0] && n.replaceWith(i) : "img" === r ? n.is("img") ? n.attr("src", i) : n.replaceWith('<img src="' + i + '" class="' + n.attr("class") + '" />') : n.attr(a[1], i)
                        }
                    } else t.find(g + "-" + e).html(i)
                })
            },
            _getScrollbarSize: function() {
                if (void 0 === t.scrollbarSize) {
                    var e = document.createElement("div");
                    e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
                }
                return t.scrollbarSize
            }
        }, e.magnificPopup = {
            instance: null,
            proto: T.prototype,
            modules: [],
            open: function(t, i) {
                return M(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
            },
            close: function() {
                return e.magnificPopup.instance && e.magnificPopup.instance.close()
            },
            registerModule: function(t, i) {
                i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading..."
            }
        }, e.fn.magnificPopup = function(i) {
            M();
            var n = e(this);
            if ("string" == typeof i)
                if ("open" === i) {
                    var a, r = b ? n.data("magnificPopup") : n[0].magnificPopup,
                        o = parseInt(arguments[1], 10) || 0;
                    r.items ? a = r.items[o] : (a = n, r.delegate && (a = a.find(r.delegate)), a = a.eq(o)), t._openClick({
                        mfpEl: a
                    }, n, r)
                } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
            else i = e.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, t.addGroup(n, i);
            return n
        };
        var x, E, D, L = "inline",
            P = function() {
                D && (E.after(D.addClass(x)).detach(), D = null)
            };
        e.magnificPopup.registerModule(L, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    t.types.push(L), w(l + "." + L, function() {
                        P()
                    })
                },
                getInline: function(i, n) {
                    if (P(), i.src) {
                        var a = t.st.inline,
                            r = e(i.src);
                        if (r.length) {
                            var o = r[0].parentNode;
                            o && o.tagName && (E || (x = a.hiddenClass, E = $(x), x = "mfp-" + x), D = r.after(E).detach().removeClass(x)), t.updateStatus("ready")
                        } else t.updateStatus("error", a.tNotFound), r = e("<div>");
                        return i.inlineElement = r, r
                    }
                    return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
                }
            }
        });
        var F, V = "ajax",
            I = function() {
                F && n.removeClass(F)
            },
            R = function() {
                I(), t.req && t.req.abort()
            };
        e.magnificPopup.registerModule(V, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    t.types.push(V), F = t.st.ajax.cursor, w(l + "." + V, R), w("BeforeChange." + V, R)
                },
                getAjax: function(i) {
                    F && n.addClass(F), t.updateStatus("loading");
                    var a = e.extend({
                        url: i.src,
                        success: function(n, a, r) {
                            var o = {
                                data: n,
                                xhr: r
                            };
                            k("ParseAjax", o), t.appendContent(e(o.data), V), i.finished = !0, I(), t._setFocus(), setTimeout(function() {
                                t.wrap.addClass(_)
                            }, 16), t.updateStatus("ready"), k("AjaxContentAdded")
                        },
                        error: function() {
                            I(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                        }
                    }, t.st.ajax.settings);
                    return t.req = e.ajax(a), ""
                }
            }
        });
        var N, j = function(i) {
            if (i.data && void 0 !== i.data.title) return i.data.title;
            var n = t.st.image.titleSrc;
            if (n) {
                if (e.isFunction(n)) return n.call(t, i);
                if (i.el) return i.el.attr(n) || ""
            }
            return ""
        };
        e.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var e = t.st.image,
                        i = ".image";
                    t.types.push("image"), w(h + i, function() {
                        "image" === t.currItem.type && e.cursor && n.addClass(e.cursor)
                    }), w(l + i, function() {
                        e.cursor && n.removeClass(e.cursor), S.off("resize" + g)
                    }), w("Resize" + i, t.resizeImage), t.isLowIE && w("AfterChange", t.resizeImage)
                },
                resizeImage: function() {
                    var e = t.currItem;
                    if (e && e.img && t.st.image.verticalFit) {
                        var i = 0;
                        t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                    }
                },
                _onImageHasSize: function(e) {
                    e.img && (e.hasSize = !0, N && clearInterval(N), e.isCheckingImgSize = !1, k("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
                },
                findImageSize: function(e) {
                    var i = 0,
                        n = e.img[0],
                        a = function(r) {
                            N && clearInterval(N), N = setInterval(function() {
                                return n.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(N), i++, void(3 === i ? a(10) : 40 === i ? a(50) : 100 === i && a(500)))
                            }, r)
                        };
                    a(1)
                },
                getImage: function(i, n) {
                    var a = 0,
                        r = function() {
                            i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, k("ImageLoadComplete")) : (a++, 200 > a ? setTimeout(r, 100) : o()))
                        },
                        o = function() {
                            i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", s.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                        },
                        s = t.st.image,
                        l = n.find(".mfp-img");
                    if (l.length) {
                        var c = document.createElement("img");
                        c.className = "mfp-img", i.img = e(c).on("load.mfploader", r).on("error.mfploader", o), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                    }
                    return t._parseMarkup(n, {
                        title: j(i),
                        img_replaceWith: i.img
                    }, i), t.resizeImage(), i.hasSize ? (N && clearInterval(N), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), t.findImageSize(i)), n)
                }
            }
        });
        var O, U = function() {
            return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O
        };
        e.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(e) {
                    return e.is("img") ? e : e.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var e, i = t.st.zoom,
                        n = ".zoom";
                    if (i.enabled && t.supportsTransition) {
                        var a, r, o = i.duration,
                            s = function(e) {
                                var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    n = "all " + i.duration / 1e3 + "s " + i.easing,
                                    a = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    r = "transition";
                                return a["-webkit-" + r] = a["-moz-" + r] = a["-o-" + r] = a[r] = n, t.css(a), t
                            },
                            u = function() {
                                t.content.css("visibility", "visible")
                            };
                        w("BuildControls" + n, function() {
                            if (t._allowZoom()) {
                                if (clearTimeout(a), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void u();
                                r = s(e), r.css(t._getOffset()), t.wrap.append(r), a = setTimeout(function() {
                                    r.css(t._getOffset(!0)), a = setTimeout(function() {
                                        u(), setTimeout(function() {
                                            r.remove(), e = r = null, k("ZoomAnimationEnded")
                                        }, 16)
                                    }, o)
                                }, 16)
                            }
                        }), w(c + n, function() {
                            if (t._allowZoom()) {
                                if (clearTimeout(a), t.st.removalDelay = o, !e) {
                                    if (e = t._getItemToZoom(), !e) return;
                                    r = s(e)
                                }
                                r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                    r.css(t._getOffset())
                                }, 16)
                            }
                        }), w(l + n, function() {
                            t._allowZoom() && (u(), r && r.remove(), e = null)
                        })
                    }
                },
                _allowZoom: function() {
                    return "image" === t.currItem.type
                },
                _getItemToZoom: function() {
                    return t.currItem.hasSize ? t.currItem.img : !1
                },
                _getOffset: function(i) {
                    var n;
                    n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                    var a = n.offset(),
                        r = parseInt(n.css("padding-top"), 10),
                        o = parseInt(n.css("padding-bottom"), 10);
                    a.top -= e(window).scrollTop() - r;
                    var s = {
                        width: n.width(),
                        height: (b ? n.innerHeight() : n[0].offsetHeight) - o - r
                    };
                    return U() ? s["-moz-transform"] = s.transform = "translate(" + a.left + "px," + a.top + "px)" : (s.left = a.left, s.top = a.top), s
                }
            }
        });
        var B = "iframe",
            H = "//about:blank",
            z = function(e) {
                if (t.currTemplate[B]) {
                    var i = t.currTemplate[B].find("iframe");
                    i.length && (e || (i[0].src = H), t.isIE8 && i.css("display", e ? "block" : "none"))
                }
            };
        e.magnificPopup.registerModule(B, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1&rel=0&hd=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    t.types.push(B), w("BeforeChange", function(e, t, i) {
                        t !== i && (t === B ? z() : i === B && z(!0))
                    }), w(l + "." + B, function() {
                        z()
                    })
                },
                getIframe: function(i, n) {
                    var a = i.src,
                        r = t.st.iframe;
                    e.each(r.patterns, function() {
                        return a.indexOf(this.index) > -1 ? (this.id && (a = "string" == typeof this.id ? a.substr(a.lastIndexOf(this.id) + this.id.length, a.length) : this.id.call(this, a)), a = this.src.replace("%id%", a), !1) : void 0
                    });
                    var o = {};
                    return r.srcAction && (o[r.srcAction] = a), t._parseMarkup(n, o, i), t.updateStatus("ready"), n
                }
            }
        });
        var W = function(e) {
                var i = t.items.length;
                return e > i - 1 ? e - i : 0 > e ? i + e : e
            },
            Y = function(e, t, i) {
                return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
            };
        e.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var i = t.st.gallery,
                        n = ".mfp-gallery",
                        r = Boolean(e.fn.mfpFastClick);
                    return t.direction = !0, i && i.enabled ? (o += " mfp-gallery", w(h + n, function() {
                        i.navigateByImgClick && t.wrap.on("click" + n, ".mfp-img", function() {
                            return t.items.length > 1 ? (t.next(), !1) : void 0
                        }), a.on("keydown" + n, function(e) {
                            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                        })
                    }), w("UpdateStatus" + n, function(e, i) {
                        i.text && (i.text = Y(i.text, t.currItem.index, t.items.length))
                    }), w(p + n, function(e, n, a, r) {
                        var o = t.items.length;
                        a.counter = o > 1 ? Y(i.tCounter, r.index, o) : ""
                    }), w("BuildControls" + n, function() {
                        if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                            var n = i.arrowMarkup,
                                a = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(v),
                                o = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(v),
                                s = r ? "mfpFastClick" : "click";
                            a[s](function() {
                                t.prev()
                            }), o[s](function() {
                                t.next()
                            }), t.isIE7 && ($("b", a[0], !1, !0), $("a", a[0], !1, !0), $("b", o[0], !1, !0), $("a", o[0], !1, !0)), t.container.append(a.add(o))
                        }
                    }), w(f + n, function() {
                        t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                            t.preloadNearbyImages(), t._preloadTimeout = null
                        }, 16)
                    }), void w(l + n, function() {
                        a.off(n), t.wrap.off("click" + n), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                    })) : !1
                },
                next: function() {
                    t.direction = !0, t.index = W(t.index + 1), t.updateItemHTML()
                },
                prev: function() {
                    t.direction = !1, t.index = W(t.index - 1), t.updateItemHTML()
                },
                goTo: function(e) {
                    t.direction = e >= t.index, t.index = e, t.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    var e, i = t.st.gallery.preload,
                        n = Math.min(i[0], t.items.length),
                        a = Math.min(i[1], t.items.length);
                    for (e = 1;
                        (t.direction ? a : n) >= e; e++) t._preloadItem(t.index + e);
                    for (e = 1;
                        (t.direction ? n : a) >= e; e++) t._preloadItem(t.index - e)
                },
                _preloadItem: function(i) {
                    if (i = W(i), !t.items[i].preloaded) {
                        var n = t.items[i];
                        n.parsed || (n = t.parseEl(i)), k("LazyLoad", n), "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                            n.hasSize = !0
                        }).on("error.mfploader", function() {
                            n.hasSize = !0, n.loadError = !0, k("LazyLoadError", n)
                        }).attr("src", n.src)), n.preloaded = !0
                    }
                }
            }
        });
        var G = "retina";
        e.magnificPopup.registerModule(G, {
                options: {
                    replaceSrc: function(e) {
                        return e.src.replace(/\.\w+$/, function(e) {
                            return "@2x" + e
                        })
                    },
                    ratio: 1
                },
                proto: {
                    initRetina: function() {
                        if (window.devicePixelRatio > 1) {
                            var e = t.st.retina,
                                i = e.ratio;
                            i = isNaN(i) ? i() : i, i > 1 && (w("ImageHasSize." + G, function(e, t) {
                                t.img.css({
                                    "max-width": t.img[0].naturalWidth / i,
                                    width: "100%"
                                })
                            }), w("ElementParse." + G, function(t, n) {
                                n.src = e.replaceSrc(n, i)
                            }))
                        }
                    }
                }
            }),
            function() {
                var t = 1e3,
                    i = "ontouchstart" in window,
                    n = function() {
                        S.off("touchmove" + r + " touchend" + r)
                    },
                    a = "mfpFastClick",
                    r = "." + a;
                e.fn.mfpFastClick = function(a) {
                    return e(this).each(function() {
                        var o, s = e(this);
                        if (i) {
                            var l, c, u, d, p, h;
                            s.on("touchstart" + r, function(e) {
                                d = !1, h = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, u = p.clientY, S.on("touchmove" + r, function(e) {
                                    p = e.originalEvent ? e.originalEvent.touches : e.touches, h = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - u) > 10) && (d = !0, n())
                                }).on("touchend" + r, function(e) {
                                    n(), d || h > 1 || (o = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                        o = !1
                                    }, t), a())
                                })
                            })
                        }
                        s.on("click" + r, function() {
                            o || a()
                        })
                    })
                }, e.fn.destroyMfpFastClick = function() {
                    e(this).off("touchstart" + r + " click" + r), i && S.off("touchmove" + r + " touchend" + r)
                }
            }(), M()
    }(window.jQuery || window.Zepto), jQuery.extend({
        highlight: function(e, t, i, n) {
            if (3 === e.nodeType) {
                var a = e.data.match(t);
                if (a) {
                    var r = document.createElement(i || "span");
                    r.className = n || "highlight";
                    var o = e.splitText(a.index);
                    o.splitText(a[0].length);
                    var s = o.cloneNode(!0);
                    return r.appendChild(s), o.parentNode.replaceChild(r, o), 1
                }
            } else if (1 === e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName) && (e.tagName !== i.toUpperCase() || e.className !== n))
                for (var l = 0; l < e.childNodes.length; l++) l += jQuery.highlight(e.childNodes[l], t, i, n);
            return 0
        }
    }), jQuery.fn.unhighlight = function(e) {
        var t = {
            className: "highlight",
            element: "span"
        };
        return jQuery.extend(t, e), this.find(t.element + "." + t.className).each(function() {
            var e = this.parentNode;
            e.replaceChild(this.firstChild, this), e.normalize()
        }).end()
    }, jQuery.fn.highlight = function(e, t) {
        var i = {
            className: "highlight",
            element: "span",
            caseSensitive: !1,
            wordsOnly: !1
        };
        if (jQuery.extend(i, t), e.constructor === String && (e = [e]), e = jQuery.grep(e, function(e) {
                return "" != e
            }), e = jQuery.map(e, function(e) {
                return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            }), 0 == e.length) return this;
        var n = i.caseSensitive ? "" : "i",
            a = "(" + e.join("|") + ")";
        i.wordsOnly && (a = "\\b" + a + "\\b");
        var r = new RegExp(a, n);
        return this.each(function() {
            jQuery.highlight(this, r, i.element, i.className)
        })
    }, $(function() {
        function e() {
            $(".lesson-link").first().click()
        }
        $(".video-container").data("original", $(".video-container").html()), $(".video-description").data("original", $(".video-description").html()), $("#current-lesson, .current-lesson").data("original", $("#current-lesson, .current-lesson").first().html()), $("#current-section, .current_section").data("original", $("#current-section, .current-section").first().html()), $(".lesson-resource").hide(), $(".resources").hide(), $("#home-link").click(function() {
            $(".video-container").html($(".video-container").data("original")), $(".video-description").html($(".video-description").data("original")), $(".lesson-resource").hide(), $("#current-lesson, .current-lesson").text($.trim($("#current-lesson").data("original"))), $("#current-section, .current-section").text($.trim($("#current-section").data("original"))), $("#current-lesson, .current-lesson").fadeIn(), $("#current-section, .current-section").fadeIn(), $(".video-description").fadeIn(), $(".lesson-resource").hide(), $(".resources").hide()
        }), $('a[href="#next"]').click(function() {
            var e = parseInt($("body").data("currentSection")),
                t = parseInt($("body").data("currentSection")) + 1,
                i = parseInt($("body").data("currentLesson")) + 1,
                n = $("#" + e + "-" + i);
            if (n.size() > 0);
            else var n = $("#" + t + "-1");
            n.first().click(), $(".swipebox").magnificPopup({
                type: "image"
            }), $(".elVideoModalWrapper .swipebox").magnificPopup({
                type: "iframe"
            })
        }), $('a[href="#previous"]').click(function() {
            var e = parseInt($("body").data("currentSection")),
                t = parseInt($("body").data("currentSection")) - 1,
                i = parseInt($("body").data("currentLesson")) - 1,
                n = $("#" + e + "-" + i);
            if (n.size() > 0);
            else var n = $("#" + t + "-1");
            n.first().click(), $(".swipebox").magnificPopup({
                type: "image"
            }), $(".elVideoModalWrapper .swipebox").magnificPopup({
                type: "iframe"
            })
        }), $(".lesson-link").click(function(e) {
            e.preventDefault(), $("#content").hide(), $(".lesson-link").removeClass("activeMemberNav"), $(this).addClass("activeMemberNav");
            var t = $(this).nextAll(".lesson-video").first(),
                i = $(this).nextAll("[data-cf-lesson-description='true']").first(),
                n = $(this).attr("id");
            try {
                $("body").data("currentSection", n.split("-")[0]), $("body").data("currentLesson", n.split("-")[1])
            } catch (a) {}
            var r = $(this).parents('[data-cf-lesson-list="true"]').prev('[data-cf-section-template="true"]').find("[data-cf-section-number='true']").text();
            $(".video-container").html(t.html()), $(".video-container").contents().hide(), "" === t.html() ? $(".video-container").hide() : ($(window).trigger("custom"), $(".video-container").fadeIn(), $(".video-container").contents().delay(1e3).fadeIn()), i.is("textarea") ? ($(".video-description").html(i.val()), $(".de-video-block").fitVids({
                customSelector: "iframe[src*='fast.wistia.net']"
            }), "" === i.val() ? $(".video-description").hide() : $(".video-description").fadeIn()) : ($(".video-description").html(i.html()), "" === i.html() ? $(".video-description").hide() : $(".video-description").fadeIn()), $(".video-js").length && $(".video-js").each(function() {
                var e = $(this).find("source").first().attr("src"),
                    t = $(this).find("source").last().attr("src"),
                    i = "video_random_" + Math.floor(100 * Math.random() + 1),
                    n = '<video style="width: 100%" id="' + i + '" controls>';
                n += '<source src="' + e + '" type="video/mp4">', $(this).find("source").last().attr("src").length && (n += '<source src="' + t + '" type="video/webm">'), n += "Your browser does not support HTML5 video.", n += '</video><span class="' + i + '" style="display: none;display: block;padding: 5px;background: #fafafa;font-weight: bold;"><i class="fa fa-spinner fa-spin"></i> Loading Video...</span>', $(this).replaceWith(n);
                var a = document.getElementById(i);
                a.onloadstart = function() {
                    $("." + i).show()
                }, a.oncanplay = function() {
                    $("." + i).hide()
                }
            }), $(".resources").fadeIn(), $(".lesson-resource").hide(), $(".lesson-" + r + "-" + n).fadeIn(), $(".lesson-" + n).show(), $("#current-lesson, .current-lesson").text($.trim($(this).text())), $("#current-section, .current-section").text($.trim($(this).parents('[data-cf-lesson-list="true"]').prev('[data-cf-section-template="true"]').find('[data-cf-section-name="true"]').text())), $("#current-lesson, .current-lesson").fadeIn(), $("#current-section, .current-section").fadeIn(), $("#content").fadeIn();
            var o = $(".video-description").find("iframe").first();
            "undefined" != typeof o.attr("data-autoplay") && 1 == o.attr("data-autoplay") && o.attr("src", o.attr("src").replace("autoplay=1", "autoplay=0")), 0 === $("[data-cf-resource-template=true]:visible").size() ? $(".resources").hide() : $(".resources").fadeIn(), $(".swipebox").magnificPopup({
                type: "image"
            }), $(".elVideoModalWrapper .swipebox").magnificPopup({
                type: "iframe"
            }), evsfix(), $(".elCustomJS_code").each(function() {
                $getJS = $(this).attr("data-custom-js"), $(this).html($getJS)
            })
        }), "undefined" != typeof page_key && $(".page_key").val(page_key), $(".lesson-link").first().click(), setTimeout(e, 1e3), $("#temp-link").parent().hide(), $("body").delay(500).fadeIn(), $.fn.exists = function() {
            return this.length > 0
        }, $(".steps li .title").exists() && $(".steps li .title").click(function() {
            $(this).parent().next(".membershipNavInner").toggleClass("out").toggleClass("in"), $(this).toggleClass("openedHeader"), $(this).toggleClass("opened")
        }), window.PIE && $(".ie-fix, .steps li:first-child .title, aside").each(function() {
            PIE.attach(this)
        }), $(".steps li .title").each(function(e) {
            0 !== e && $(this).click()
        }), $("#search_field").on("change input blur", function() {
            var e = $(this).val();
            $("body").unhighlight(), $('[data-cf-lesson-template="true"]').each(function() {
                $(this).text().search(new RegExp(e, "i")) < 0 || "" === e ? $(this).find("ul").first().css({
                    backgroundColor: ""
                }) : ($(this).find("ul").first().highlight(e), $(this).find("ul").first().css({
                    backgroundColor: "#f4ffb0"
                }), $(".video-description").highlight(e))
            })
        }), $("[data-cf-lesson-name=true]").length > 0 && $("div[data-youtube-autoplay='yes']").each(function() {
            var e = $(this).find("iframe").first();
            e.attr("src", e.attr("src").replace("autoplay=1", "autoplay=0")), e.attr("data-autoplay", 1)
        }), $(".goto-login").on("click", function() {
            return $("#reset-form").hide(), $("#register-form").hide(), $("#login-form").fadeIn(), !1
        }), $(".goto-login2").on("click", function() {
            return $("#reset-form").hide(), $("#register-form").fadeIn(), !1
        }), $(".goto-reset").on("click", function() {
            return $("#login-form").hide(), $("#reset-form").fadeIn(), !1
        })
    }), ! function(e) {
        "use strict";
        e.fn.fitVids = function(t) {
            var i = {
                customSelector: null
            };
            if (!document.getElementById("fit-vids-style")) {
                var n = document.head || document.getElementsByTagName("head")[0],
                    a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                    r = document.createElement("div");
                r.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", n.appendChild(r.childNodes[1])
            }
            return t && e.extend(i, t), this.each(function() {
                var t = ["iframe[src*='fast.wistia.net']", "iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                i.customSelector && t.push(i.customSelector);
                var n = e(this).find(t.join(","));
                n = n.not("object object"), n.each(function() {
                    var t = e(this);
                    if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                        t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9), t.attr("width", 16));
                        var i = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                            n = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                            a = i / n;
                        if (!t.attr("id")) {
                            var r = "fitvid" + Math.floor(999999 * Math.random());
                            t.attr("id", r)
                        }
                        t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * a + "%"), t.removeAttr("height").removeAttr("width")
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto), $(function() {
        function e(e) {
            for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                for (var a = i[n];
                    " " == a.charAt(0);) a = a.substring(1, a.length);
                if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
            }
            return null
        }
        var t;
        (window.onpopstate = function() {
            var e, i = /\+/g,
                n = /([^&=]+)=?([^&]*)/g,
                a = function(e) {
                    return decodeURIComponent(e.replace(i, " "))
                },
                r = window.location.search.substring(1);
            for (t = {}; e = n.exec(r);) t[a(e[1])] = a(e[2])
        })(), $.each(t, function(e, t) {
            try {
                localStorage.setItem(e, t)
            } catch (i) {
                "NS_ERROR_FILE_CORRUPTED" == i.name && console.log("NS_ERROR_FILE_CORRUPTED")
            }
            document.cookie = e + "=" + t + ";", document.cookie = e + "=" + t + ";domain=.clickfunnels.com;path=/"
        }), $("input[data-param]").each(function() {
            try {
                var t = localStorage.getItem($(this).data("param"))
            } catch (i) {
                if ("NS_ERROR_FILE_CORRUPTED" == i.name) {
                    console.log("NS_ERROR_FILE_CORRUPTED");
                    var t = null
                }
            }
            null == t && (t = e($(this).data("param"))), $(this).val(t), $(this).attr("value", t)
        })
    });
var mejs = mejs || {};
if (mejs.version = "2.13.2", mejs.meIndex = 0, mejs.plugins = {
        silverlight: [{
            version: [3, 0],
            types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
        }],
        flash: [{
            version: [9, 0, 124],
            types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
        }],
        youtube: [{
            version: null,
            types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
        }],
        vimeo: [{
            version: null,
            types: ["video/vimeo", "video/x-vimeo"]
        }]
    }, mejs.Utility = {
        encodeUrl: function(e) {
            return encodeURIComponent(e)
        },
        escapeHTML: function(e) {
            return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
        },
        absolutizeUrl: function(e) {
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
        },
        getScriptPath: function(e) {
            for (var t, i, n, a = 0, r = "", o = "", s = document.getElementsByTagName("script"), l = s.length, c = e.length; l > a; a++) {
                for (i = s[a].src, t = i.lastIndexOf("/"), t > -1 ? (n = i.substring(t + 1), i = i.substring(0, t + 1)) : (n = i, i = ""), t = 0; c > t; t++)
                    if (o = e[t], o = n.indexOf(o), o > -1) {
                        r = i;
                        break
                    }
                if ("" !== r) break
            }
            return r
        },
        secondsToTimeCode: function(e, t, i, n) {
            "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
            var a = Math.floor(e / 3600) % 24,
                r = Math.floor(e / 60) % 60,
                o = Math.floor(e % 60);
            return e = Math.floor((e % 1 * n).toFixed(3)), (t || a > 0 ? (10 > a ? "0" + a : a) + ":" : "") + (10 > r ? "0" + r : r) + ":" + (10 > o ? "0" + o : o) + (i ? ":" + (10 > e ? "0" + e : e) : "")
        },
        timeCodeToSeconds: function(e, t, i, n) {
            "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25), e = e.split(":"), t = parseInt(e[0], 10);
            var a = parseInt(e[1], 10),
                r = parseInt(e[2], 10),
                o = 0,
                s = 0;
            return i && (o = parseInt(e[3]) / n), s = 3600 * t + 60 * a + r + o
        },
        convertSMPTEtoSeconds: function(e) {
            if ("string" != typeof e) return !1;
            e = e.replace(",", ".");
            var t = 0,
                i = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
                n = 1;
            e = e.split(":").reverse();
            for (var a = 0; a < e.length; a++) n = 1, a > 0 && (n = Math.pow(60, a)), t += Number(e[a]) * n;
            return Number(t.toFixed(i))
        },
        removeSwf: function(e) {
            var t = document.getElementById(e);
            t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function() {
                4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        },
        removeObjectInIE: function(e) {
            if (e = document.getElementById(e)) {
                for (var t in e) "function" == typeof e[t] && (e[t] = null);
                e.parentNode.removeChild(e)
            }
        }
    }, mejs.PluginDetector = {
        hasPluginVersion: function(e, t) {
            var i = this.plugins[e];
            return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2] ? !0 : !1
        },
        nav: window.navigator,
        ua: window.navigator.userAgent.toLowerCase(),
        plugins: [],
        addPlugin: function(e, t, i, n, a) {
            this.plugins[e] = this.detectPlugin(t, i, n, a)
        },
        detectPlugin: function(e, t, i, n) {
            var a, r = [0, 0, 0];
            if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                if ((i = this.nav.plugins[e].description) && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                    for (r = i.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), e = 0; e < r.length; e++) r[e] = parseInt(r[e].match(/\d+/), 10)
            } else if ("undefined" != typeof window.ActiveXObject) try {
                (a = new ActiveXObject(i)) && (r = n(a))
            } catch (o) {}
            return r
        }
    }, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
        var t = [];
        return (e = e.GetVariable("$version")) && (e = e.split(" ")[1].split(","), t = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]), t
    }), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
        var t = [0, 0, 0, 0],
            i = function(e, t, i, n) {
                for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
                t[i] -= n
            };
        return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
    }), mejs.MediaFeatures = {
        init: function() {
            var e, t = this,
                i = document,
                n = mejs.PluginDetector.nav,
                a = mejs.PluginDetector.ua.toLowerCase(),
                r = ["source", "track", "audio", "video"];
            t.isiPad = null !== a.match(/ipad/i), t.isiPhone = null !== a.match(/iphone/i), t.isiOS = t.isiPhone || t.isiPad, t.isAndroid = null !== a.match(/android/i), t.isBustedAndroid = null !== a.match(/android 2\.[12]/), t.isBustedNativeHTTPS = "https:" === location.protocol && (null !== a.match(/android [12]\./) || null !== a.match(/macintosh.* version.* safari/)), t.isIE = -1 != n.appName.toLowerCase().indexOf("microsoft") || null !== n.appName.toLowerCase().match(/trident/gi), t.isChrome = null !== a.match(/chrome/gi), t.isFirefox = null !== a.match(/firefox/gi), t.isWebkit = null !== a.match(/webkit/gi), t.isGecko = null !== a.match(/gecko/gi) && !t.isWebkit && !t.isIE, t.isOpera = null !== a.match(/opera/gi), t.hasTouch = "ontouchstart" in window, t.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
            for (n = 0; n < r.length; n++) e = document.createElement(r[n]);
            t.supportsMediaTag = "undefined" != typeof e.canPlayType || t.isBustedAndroid;
            try {
                e.canPlayType("video/mp4")
            } catch (o) {
                t.supportsMediaTag = !1
            }
            t.hasSemiNativeFullScreen = "undefined" != typeof e.webkitEnterFullscreen, t.hasNativeFullscreen = "undefined" != typeof e.requestFullscreen, t.hasWebkitNativeFullScreen = "undefined" != typeof e.webkitRequestFullScreen, t.hasMozNativeFullScreen = "undefined" != typeof e.mozRequestFullScreen, t.hasMsNativeFullScreen = "undefined" != typeof e.msRequestFullscreen, t.hasTrueNativeFullScreen = t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen || t.hasMsNativeFullScreen, t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen, t.hasMozNativeFullScreen ? t.nativeFullScreenEnabled = document.mozFullScreenEnabled : t.hasMsNativeFullScreen && (t.nativeFullScreenEnabled = document.msFullscreenEnabled), t.isChrome && (t.hasSemiNativeFullScreen = !1), t.hasTrueNativeFullScreen && (t.fullScreenEventName = "", t.hasWebkitNativeFullScreen ? t.fullScreenEventName = "webkitfullscreenchange" : t.hasMozNativeFullScreen ? t.fullScreenEventName = "mozfullscreenchange" : t.hasMsNativeFullScreen && (t.fullScreenEventName = "MSFullscreenChange"), t.isFullScreen = function() {
                return e.mozRequestFullScreen ? i.mozFullScreen : e.webkitRequestFullScreen ? i.webkitIsFullScreen : e.hasMsNativeFullScreen ? null !== i.msFullscreenElement : void 0
            }, t.requestFullScreen = function(e) {
                t.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : t.hasMozNativeFullScreen ? e.mozRequestFullScreen() : t.hasMsNativeFullScreen && e.msRequestFullscreen()
            }, t.cancelFullScreen = function() {
                t.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : t.hasMozNativeFullScreen ? document.mozCancelFullScreen() : t.hasMsNativeFullScreen && document.msExitFullscreen()
            }), t.hasSemiNativeFullScreen && a.match(/mac os x 10_5/i) && (t.hasNativeFullScreen = !1, t.hasSemiNativeFullScreen = !1)
        }
    }, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
        pluginType: "native",
        isFullScreen: !1,
        setCurrentTime: function(e) {
            this.currentTime = e
        },
        setMuted: function(e) {
            this.muted = e
        },
        setVolume: function(e) {
            this.volume = e
        },
        stop: function() {
            this.pause()
        },
        setSrc: function(e) {
            for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
            if ("string" == typeof e) this.src = e;
            else {
                var i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.src = i.src;
                        break
                    }
            }
        },
        setVideoSize: function(e, t) {
            this.width = e, this.height = t
        }
    }, mejs.PluginMediaElement = function(e, t, i) {
        this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
    }, mejs.PluginMediaElement.prototype = {
        pluginElement: null,
        pluginType: "",
        isFullScreen: !1,
        playbackRate: -1,
        defaultPlaybackRate: -1,
        seekable: [],
        played: [],
        paused: !0,
        ended: !1,
        seeking: !1,
        duration: 0,
        error: null,
        tagName: "",
        muted: !1,
        volume: 1,
        currentTime: 0,
        play: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
        },
        load: function() {
            null != this.pluginApi && ("youtube" != this.pluginType && this.pluginApi.loadMedia(), this.paused = !1)
        },
        pause: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
        },
        stop: function() {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
        },
        canPlayType: function(e) {
            var t, i, n, a = mejs.plugins[this.pluginType];
            for (t = 0; t < a.length; t++)
                if (n = a[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version))
                    for (i = 0; i < n.types.length; i++)
                        if (e == n.types[i]) return "probably";
            return ""
        },
        positionFullscreenButton: function(e, t, i) {
            null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
        },
        hideFullscreenButton: function() {
            null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
        },
        setSrc: function(e) {
            if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
            else {
                var t, i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(e);
                        break
                    }
            }
        },
        setCurrentTime: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
        },
        setVolume: function(e) {
            null != this.pluginApi && (this.pluginApi.setVolume("youtube" == this.pluginType ? 100 * e : e), this.volume = e)
        },
        setMuted: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(e), this.muted = e)
        },
        setVideoSize: function(e, t) {
            this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
        },
        setFullscreen: function(e) {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
        },
        enterFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
        },
        exitFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
        },
        addEventListener: function(e, t) {
            this.events[e] = this.events[e] || [], this.events[e].push(t)
        },
        removeEventListener: function(e, t) {
            if (!e) return this.events = {}, !0;
            var n = this.events[e];
            if (!n) return !0;
            if (!t) return this.events[e] = [], !0;
            for (i = 0; i < n.length; i++)
                if (n[i] === t) return this.events[e].splice(i, 1), !0;
            return !1
        },
        dispatchEvent: function(e) {
            var t, i, n = this.events[e];
            if (n)
                for (i = Array.prototype.slice.call(arguments, 1), t = 0; t < n.length; t++) n[t].apply(null, i)
        },
        hasAttribute: function(e) {
            return e in this.attributes
        },
        removeAttribute: function(e) {
            delete this.attributes[e]
        },
        getAttribute: function(e) {
            return this.hasAttribute(e) ? this.attributes[e] : ""
        },
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
        remove: function() {
            mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
        }
    }, mejs.MediaPluginBridge = {
        pluginMediaElements: {},
        htmlMediaElements: {},
        registerPluginElement: function(e, t, i) {
            this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = i
        },
        unregisterPluginElement: function(e) {
            delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
        },
        initPlugin: function(e) {
            var t = this.pluginMediaElements[e],
                i = this.htmlMediaElements[e];
            if (t) {
                switch (t.pluginType) {
                    case "flash":
                        t.pluginElement = t.pluginApi = document.getElementById(e);
                        break;
                    case "silverlight":
                        t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
                }
                null != t.pluginApi && t.success && t.success(t, i)
            }
        },
        fireEvent: function(e, t, i) {
            var n, a;
            if (e = this.pluginMediaElements[e]) {
                t = {
                    type: t,
                    target: e
                };
                for (n in i) e[n] = i[n], t[n] = i[n];
                a = i.bufferedTime || 0, t.target.buffered = t.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return a
                    },
                    length: 1
                }, e.dispatchEvent(t.type, t)
            }
        }
    }, mejs.MediaElementDefaults = {
        mode: "auto",
        plugins: ["flash", "silverlight", "youtube", "vimeo"],
        enablePluginDebug: !1,
        httpsBasicAuthSite: !1,
        type: "",
        pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
        flashName: "flashmediaelement.swf",
        flashStreamer: "",
        enablePluginSmoothing: !1,
        enablePseudoStreaming: !1,
        pseudoStreamingStartQueryParam: "start",
        silverlightName: "silverlightmediaelement.xap",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        pluginWidth: -1,
        pluginHeight: -1,
        pluginVars: [],
        timerRate: 250,
        startVolume: .8,
        success: function() {},
        error: function() {}
    }, mejs.MediaElement = function(e, t) {
        return mejs.HtmlMediaElementShim.create(e, t)
    }, mejs.HtmlMediaElementShim = {
        create: function(e, t) {
            var i = mejs.MediaElementDefaults,
                n = "string" == typeof e ? document.getElementById(e) : e,
                a = n.tagName.toLowerCase(),
                r = "audio" === a || "video" === a,
                o = n.getAttribute(r ? "src" : "href");
            a = n.getAttribute("poster");
            var s, l = n.getAttribute("autoplay"),
                c = n.getAttribute("preload"),
                u = n.getAttribute("controls");
            for (s in t) i[s] = t[s];
            return o = "undefined" == typeof o || null === o || "" == o ? null : o, a = "undefined" == typeof a || null === a ? "" : a, c = "undefined" == typeof c || null === c || "false" === c ? "none" : c, l = !("undefined" == typeof l || null === l || "false" === l), u = !("undefined" == typeof u || null === u || "false" === u), s = this.determinePlayback(n, i, mejs.MediaFeatures.supportsMediaTag, r, o), s.url = null !== s.url ? mejs.Utility.absolutizeUrl(s.url) : "", "native" == s.method ? (mejs.MediaFeatures.isBustedAndroid && (n.src = s.url, n.addEventListener("click", function() {
                n.play()
            }, !1)), this.updateNative(s, i, l, c)) : "" !== s.method ? this.createPlugin(s, i, a, l, c, u) : (this.createErrorMessage(s, i, a), this)
        },
        determinePlayback: function(e, t, i, n, a) {
            var r, o, s, l, c = [],
                u = {
                    method: "",
                    url: "",
                    htmlMediaElement: e,
                    isVideo: "audio" != e.tagName.toLowerCase()
                };
            if ("undefined" != typeof t.type && "" !== t.type)
                if ("string" == typeof t.type) c.push({
                    type: t.type,
                    url: a
                });
                else
                    for (r = 0; r < t.type.length; r++) c.push({
                        type: t.type[r],
                        url: a
                    });
            else if (null !== a) s = this.formatType(a, e.getAttribute("type")), c.push({
                type: s,
                url: a
            });
            else
                for (r = 0; r < e.childNodes.length; r++) o = e.childNodes[r], 1 == o.nodeType && "source" == o.tagName.toLowerCase() && (a = o.getAttribute("src"), s = this.formatType(a, o.getAttribute("type")), o = o.getAttribute("media"), (!o || !window.matchMedia || window.matchMedia && window.matchMedia(o).matches) && c.push({
                    type: s,
                    url: a
                }));
            if (!n && c.length > 0 && null !== c[0].url && this.getTypeFromFile(c[0].url).indexOf("audio") > -1 && (u.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                }), !(!i || "auto" !== t.mode && "auto_plugin" !== t.mode && "native" !== t.mode || mejs.MediaFeatures.isBustedNativeHTTPS && t.httpsBasicAuthSite === !0)) {
                for (n || (r = document.createElement(u.isVideo ? "video" : "audio"), e.parentNode.insertBefore(r, e), e.style.display = "none", u.htmlMediaElement = e = r), r = 0; r < c.length; r++)
                    if ("" !== e.canPlayType(c[r].type).replace(/no/, "") || "" !== e.canPlayType(c[r].type.replace(/mp3/, "mpeg")).replace(/no/, "")) {
                        u.method = "native", u.url = c[r].url;
                        break
                    }
                if ("native" === u.method && (null !== u.url && (e.src = u.url), "auto_plugin" !== t.mode)) return u
            }
            if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
                for (r = 0; r < c.length; r++)
                    for (s = c[r].type, e = 0; e < t.plugins.length; e++)
                        for (a = t.plugins[e], o = mejs.plugins[a], i = 0; i < o.length; i++)
                            if (l = o[i], null == l.version || mejs.PluginDetector.hasPluginVersion(a, l.version))
                                for (n = 0; n < l.types.length; n++)
                                    if (s == l.types[n]) return u.method = a, u.url = c[r].url, u;
            return "auto_plugin" === t.mode && "native" === u.method ? u : ("" === u.method && c.length > 0 && (u.url = c[0].url), u)
        },
        formatType: function(e, t) {
            return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
        },
        getTypeFromFile: function(e) {
            return e = e.split("?")[0], e = e.substring(e.lastIndexOf(".") + 1).toLowerCase(), (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(e) ? "video" : "audio") + "/" + this.getTypeFromExtension(e)
        },
        getTypeFromExtension: function(e) {
            switch (e) {
                case "mp4":
                case "m4v":
                    return "mp4";
                case "webm":
                case "webma":
                case "webmv":
                    return "webm";
                case "ogg":
                case "oga":
                case "ogv":
                    return "ogg";
                default:
                    return e
            }
        },
        createErrorMessage: function(e, t, i) {
            var n = e.htmlMediaElement,
                a = document.createElement("div");
            a.className = "me-cannotplay";
            try {
                a.style.width = n.width + "px", a.style.height = n.height + "px"
            } catch (r) {}
            a.innerHTML = t.customError ? t.customError : "" !== i ? '<a href="' + e.url + '"><img src="' + i + '" width="100%" height="100%" /></a>' : '<a href="' + e.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>", n.parentNode.insertBefore(a, n), n.style.display = "none", t.error(n)
        },
        createPlugin: function(e, t, i, n, a, r) {
            i = e.htmlMediaElement;
            var o, s = 1,
                l = 1,
                c = "me_" + e.method + "_" + mejs.meIndex++,
                u = new mejs.PluginMediaElement(c, e.method, e.url),
                d = document.createElement("div");
            for (u.tagName = i.tagName, o = 0; o < i.attributes.length; o++) {
                var p = i.attributes[o];
                1 == p.specified && u.setAttribute(p.name, p.value)
            }
            for (o = i.parentNode; null !== o && "body" != o.tagName.toLowerCase();) {
                if ("p" == o.parentNode.tagName.toLowerCase()) {
                    o.parentNode.parentNode.insertBefore(o, o.parentNode);
                    break
                }
                o = o.parentNode
            }
            switch (e.isVideo ? (s = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== i.getAttribute("width") ? i.getAttribute("width") : t.defaultVideoWidth, l = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== i.getAttribute("height") ? i.getAttribute("height") : t.defaultVideoHeight, s = mejs.Utility.encodeUrl(s), l = mejs.Utility.encodeUrl(l)) : t.enablePluginDebug && (s = 320, l = 240), u.success = t.success, mejs.MediaPluginBridge.registerPluginElement(c, u, i), d.className = "me-plugin", d.id = c + "_container", e.isVideo ? i.parentNode.insertBefore(d, i) : document.body.insertBefore(d, document.body.childNodes[0]), n = ["id=" + c, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + a, "width=" + s, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + l, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && n.push("flash" == e.method ? "file=" + mejs.Utility.encodeUrl(e.url) : "file=" + e.url), t.enablePluginDebug && n.push("debug=true"), t.enablePluginSmoothing && n.push("smoothing=true"), t.enablePseudoStreaming && n.push("pseudostreaming=true"), r && n.push("controls=true"), t.pluginVars && (n = n.concat(t.pluginVars)), e.method) {
                case "silverlight":
                    d.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + c + '" name="' + c + '" width="' + s + '" height="' + l + '" class="mejs-shim"><param name="initParams" value="' + n.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
                    break;
                case "flash":
                    mejs.MediaFeatures.isIE ? (e = document.createElement("div"), d.appendChild(e), e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + c + '" width="' + s + '" height="' + l + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + n.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : d.innerHTML = '<embed id="' + c + '" name="' + c + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + n.join("&") + '" width="' + s + '" height="' + l + '" scale="default"class="mejs-shim"></embed>';
                    break;
                case "youtube":
                    t = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                        container: d,
                        containerId: d.id,
                        pluginMediaElement: u,
                        pluginId: c,
                        videoId: t,
                        height: l,
                        width: s
                    }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                    break;
                case "vimeo":
                    u.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), d.innerHTML = '<iframe src="http://player.vimeo.com/video/' + u.vimeoid + '?portrait=0&byline=0&title=0" width="' + s + '" height="' + l + '" frameborder="0" class="mejs-shim"></iframe>'
            }
            return i.style.display = "none", i.removeAttribute("autoplay"), u
        },
        updateNative: function(e, t) {
            var i, n = e.htmlMediaElement;
            for (i in mejs.HtmlMediaElement) n[i] = mejs.HtmlMediaElement[i];
            return t.success(n, n), n
        }
    }, mejs.YouTubeApi = {
        isIframeStarted: !1,
        isIframeLoaded: !1,
        loadIframeApi: function() {
            if (!this.isIframeStarted) {
                var e = document.createElement("script");
                e.src = "//www.youtube.com/player_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
            }
        },
        iframeQueue: [],
        enqueueIframe: function(e) {
            this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
        },
        createIframe: function(e) {
            var t = e.pluginMediaElement,
                i = new YT.Player(e.containerId, {
                    height: e.height,
                    width: e.width,
                    videoId: e.videoId,
                    playerVars: {
                        controls: 0
                    },
                    events: {
                        onReady: function() {
                            e.pluginMediaElement.pluginApi = i, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function() {
                                mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                            }, 250)
                        },
                        onStateChange: function(e) {
                            mejs.YouTubeApi.handleStateChange(e.data, i, t)
                        }
                    }
                })
        },
        createEvent: function(e, t, i) {
            if (i = {
                    type: i,
                    target: t
                }, e && e.getDuration) {
                t.currentTime = i.currentTime = e.getCurrentTime(), t.duration = i.duration = e.getDuration(), i.paused = t.paused, i.ended = t.ended, i.muted = e.isMuted(), i.volume = e.getVolume() / 100, i.bytesTotal = e.getVideoBytesTotal(), i.bufferedBytes = e.getVideoBytesLoaded();
                var n = i.bufferedBytes / i.bytesTotal * i.duration;
                i.target.buffered = i.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return n
                    },
                    length: 1
                }
            }
            t.dispatchEvent(i.type, i)
        },
        iFrameReady: function() {
            for (this.isIframeLoaded = this.isLoaded = !0; this.iframeQueue.length > 0;) this.createIframe(this.iframeQueue.pop())
        },
        flashPlayers: {},
        createFlash: function(e) {
            this.flashPlayers[e.pluginId] = e;
            var t, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
            mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
        },
        flashReady: function(e) {
            var t = this.flashPlayers[e],
                i = document.getElementById(e),
                n = t.pluginMediaElement;
            n.pluginApi = n.pluginElement = i, mejs.MediaPluginBridge.initPlugin(e), i.cueVideoById(t.videoId), e = t.containerId + "_callback", window[e] = function(e) {
                mejs.YouTubeApi.handleStateChange(e, i, n)
            }, i.addEventListener("onStateChange", e), setInterval(function() {
                mejs.YouTubeApi.createEvent(i, n, "timeupdate")
            }, 250)
        },
        handleStateChange: function(e, t, i) {
            switch (e) {
                case -1:
                    i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
                    break;
                case 0:
                    i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
                    break;
                case 1:
                    i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
                    break;
                case 2:
                    i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
                    break;
                case 3:
                    mejs.YouTubeApi.createEvent(t, i, "progress")
            }
        }
    }, window.mejs = mejs, window.MediaElement = mejs.MediaElement, function(e, t) {
        var i = {
            locale: {
                language: "",
                strings: {}
            },
            methods: {}
        };
        i.getLanguage = function() {
            return (i.locale.language || window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase()
        }, "undefined" != typeof mejsL10n && (i.locale.language = mejsL10n.language), i.methods.checkPlain = function(e) {
            var t, i, n = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            e = String(e);
            for (t in n) n.hasOwnProperty(t) && (i = RegExp(t, "g"), e = e.replace(i, n[t]));
            return e
        }, i.methods.t = function(e, t) {
            return i.locale.strings && i.locale.strings[t.context] && i.locale.strings[t.context][e] && (e = i.locale.strings[t.context][e]), i.methods.checkPlain(e)
        }, i.t = function(e, t) {
            if ("string" == typeof e && e.length > 0) {
                var n = i.getLanguage();
                return t = t || {
                    context: n
                }, i.methods.t(e, t)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }, t.i18n = i
    }(document, mejs), function(e) {
        "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
    }(mejs.i18n.locale.strings), function(e) {
        "undefined" == typeof e.de && (e.de = {
            Fullscreen: "Vollbild",
            "Go Fullscreen": "Vollbild an",
            "Turn off Fullscreen": "Vollbild aus",
            Close: "Schlie\xdfen"
        })
    }(mejs.i18n.locale.strings), function(e) {
        "undefined" == typeof e.zh && (e.zh = {
            Fullscreen: "\u5168\u87a2\u5e55",
            "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
            "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
            Close: "\u95dc\u9589"
        })
    }(mejs.i18n.locale.strings), ! function(e) {
        var t = function(e) {
            this.messages = {
                defaultMessage: "This value seems to be invalid.",
                type: {
                    email: "This value should be a valid email.",
                    url: "This value should be a valid url.",
                    urlstrict: "This value should be a valid url.",
                    number: "This value should be a valid number.",
                    digits: "This value should be digits.",
                    dateIso: "This value should be a valid date (YYYY-MM-DD).",
                    alphanum: "This value should be alphanumeric.",
                    phone: "This value should be a valid phone number."
                },
                notnull: "This value should not be null.",
                notblank: "This value should not be blank.",
                required: "This value is required.",
                regexp: "This value seems to be invalid.",
                min: "This value should be greater than or equal to %s.",
                max: "This value should be lower than or equal to %s.",
                range: "This value should be between %s and %s.",
                minlength: "This value is too short. It should have %s characters or more.",
                maxlength: "This value is too long. It should have %s characters or less.",
                rangelength: "This value length is invalid. It should be between %s and %s characters long.",
                mincheck: "You must select at least %s choices.",
                maxcheck: "You must select %s choices or less.",
                rangecheck: "You must select between %s and %s choices.",
                equalto: "This value should be the same."
            }, this.init(e)
        };
        t.prototype = {
            constructor: t,
            validators: {
                notnull: function() {
                    return {
                        validate: function(e) {
                            return 0 < e.length
                        },
                        priority: 2
                    }
                },
                notblank: function() {
                    return {
                        validate: function(e) {
                            return "string" == typeof e && "" !== e.replace(/^\s+/g, "").replace(/\s+$/g, "")
                        },
                        priority: 2
                    }
                },
                required: function() {
                    var e = this;
                    return {
                        validate: function(t) {
                            if ("object" == typeof t) {
                                for (var i in t)
                                    if (e.required().validate(t[i])) return !0;
                                return !1
                            }
                            return e.notnull().validate(t) && e.notblank().validate(t)
                        },
                        priority: 512
                    }
                },
                type: function() {
                    return {
                        validate: function(e, t) {
                            var i;
                            switch (t) {
                                case "number":
                                    i = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                                    break;
                                case "digits":
                                    i = /^\d+$/;
                                    break;
                                case "alphanum":
                                    i = /^\w+$/;
                                    break;
                                case "email":
                                    i = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
                                    break;
                                case "url":
                                    e = /(https?|s?ftp|git)/i.test(e) ? e : "http://" + e;
                                case "urlstrict":
                                    i = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                                    break;
                                case "dateIso":
                                    i = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;
                                    break;
                                case "phone":
                                    i = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
                                    break;
                                default:
                                    return !1
                            }
                            return "" !== e ? i.test(e) : !1
                        },
                        priority: 256
                    }
                },
                regexp: function() {
                    return {
                        validate: function(e, t, i) {
                            return RegExp(t, i.options.regexpFlag || "").test(e)
                        },
                        priority: 64
                    }
                },
                minlength: function() {
                    return {
                        validate: function(e, t) {
                            return e.length >= t
                        },
                        priority: 32
                    }
                },
                maxlength: function() {
                    return {
                        validate: function(e, t) {
                            return e.length <= t
                        },
                        priority: 32
                    }
                },
                rangelength: function() {
                    var e = this;
                    return {
                        validate: function(t, i) {
                            return e.minlength().validate(t, i[0]) && e.maxlength().validate(t, i[1])
                        },
                        priority: 32
                    }
                },
                min: function() {
                    return {
                        validate: function(e, t) {
                            return Number(e) >= t
                        },
                        priority: 32
                    }
                },
                max: function() {
                    return {
                        validate: function(e, t) {
                            return Number(e) <= t
                        },
                        priority: 32
                    }
                },
                range: function() {
                    var e = this;
                    return {
                        validate: function(t, i) {
                            return e.min().validate(t, i[0]) && e.max().validate(t, i[1])
                        },
                        priority: 32
                    }
                },
                equalto: function() {
                    return {
                        validate: function(t, i, n) {
                            return n.options.validateIfUnchanged = !0, t === e(i).val()
                        },
                        priority: 64
                    }
                },
                remote: function() {
                    return {
                        validate: function(t, i, n) {
                            var a = {},
                                r = {};
                            a[n.$element.attr("name")] = t, "undefined" != typeof n.options.remoteDatatype && (r = {
                                dataType: n.options.remoteDatatype
                            });
                            var o = function(t, i) {
                                    "undefined" != typeof i && "undefined" != typeof n.Validator.messages.remote && i !== n.Validator.messages.remote && e(n.UI.ulError + " .remote").remove(), !1 === t ? n.options.listeners.onFieldError(n.element, n.constraints, n) : !0 === t && !1 === n.options.listeners.onFieldSuccess(n.element, n.constraints, n) && (t = !1), n.updtConstraint({
                                        name: "remote",
                                        valid: t
                                    }, i), n.manageValidationResult()
                                },
                                s = function(t) {
                                    if ("object" == typeof t) return t;
                                    try {
                                        t = e.parseJSON(t)
                                    } catch (i) {}
                                    return t
                                },
                                l = function(e) {
                                    return "object" == typeof e && null !== e ? "undefined" != typeof e.error ? e.error : "undefined" != typeof e.message ? e.message : null : null
                                };
                            return e.ajax(e.extend({}, {
                                url: i,
                                data: a,
                                type: n.options.remoteMethod || "GET",
                                success: function(e) {
                                    e = s(e), o(1 === e || !0 === e || "object" == typeof e && null !== e && "undefined" != typeof e.success, l(e))
                                },
                                error: function(e) {
                                    e = s(e), o(!1, l(e))
                                }
                            }, r)), null
                        },
                        priority: 64
                    }
                },
                mincheck: function() {
                    var e = this;
                    return {
                        validate: function(t, i) {
                            return e.minlength().validate(t, i)
                        },
                        priority: 32
                    }
                },
                maxcheck: function() {
                    var e = this;
                    return {
                        validate: function(t, i) {
                            return e.maxlength().validate(t, i)
                        },
                        priority: 32
                    }
                },
                rangecheck: function() {
                    var e = this;
                    return {
                        validate: function(t, i) {
                            return e.rangelength().validate(t, i)
                        },
                        priority: 32
                    }
                }
            },
            init: function(e) {
                var t = e.validators;
                e = e.messages;
                for (var i in t) this.addValidator(i, t[i]);
                for (i in e) this.addMessage(i, e[i])
            },
            formatMesssage: function(e, t) {
                if ("object" == typeof t) {
                    for (var i in t) e = this.formatMesssage(e, t[i]);
                    return e
                }
                return "string" == typeof e ? e.replace(/%s/i, t) : ""
            },
            addValidator: function(e, t) {
                if ("undefined" == typeof t().validate) throw Error("Validator `" + e + "` must have a validate method. See more here: http://parsleyjs.org/documentation.html#javascript-general");
                "undefined" == typeof t().priority && (t = {
                    validate: t().validate,
                    priority: 32
                }, window.console && window.console.warn && window.console.warn("Validator `" + e + "` should have a priority. Default priority 32 given")), this.validators[e] = t
            },
            addMessage: function(e, t, i) {
                if ("undefined" != typeof i && !0 === i) this.messages.type[e] = t;
                else if ("type" === e)
                    for (var n in t) this.messages.type[n] = t[n];
                else this.messages[e] = t
            }
        };
        var i = function(e) {
            this.init(e)
        };
        i.prototype = {
            constructor: i,
            init: function(e) {
                this.ParsleyInstance = e, this.hash = e.hash, this.options = this.ParsleyInstance.options, this.errorClassHandler = this.options.errors.classHandler(this.ParsleyInstance.element, this.ParsleyInstance.isRadioOrCheckbox) || this.ParsleyInstance.$element, this.ulErrorManagement()
            },
            ulErrorManagement: function() {
                this.ulError = "#" + this.hash, this.ulTemplate = e(this.options.errors.errorsWrapper).attr("id", this.hash).addClass("parsley-error-list")
            },
            removeError: function(t) {
                t = this.ulError + " ." + t;
                var i = this;
                return this.options.animate ? e(t).fadeOut(this.options.animateDuration, function() {
                    e(this).remove(), i.ulError && 0 === e(i.ulError).children().length && i.removeErrors()
                }) : e(t).remove(), this
            },
            addError: function(t) {
                for (var i in t) {
                    var n = e(this.options.errors.errorElem).addClass(i);
                    e(this.ulError).append(this.options.animate ? e(n).html(t[i]).hide().fadeIn(this.options.animateDuration) : e(n).html(t[i]))
                }
                return this
            },
            updateError: function(t) {
                for (var i in t) t[i] !== e(this.ulError + " > li." + i).html() && this.removeError(i).addError(t);
                return this
            },
            removeErrors: function() {
                return this.options.animate ? e(this.ulError).fadeOut(this.options.animateDuration, function() {
                    e(this).remove()
                }) : e(this.ulError).remove(), this
            },
            reset: function() {
                this.ParsleyInstance.valid = null, this.removeErrors(), this.ParsleyInstance.validatedOnce = !1, this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
                for (var e in this.constraints) this.constraints[e].valid = null;
                return this
            },
            manageError: function(t) {
                if (e(this.ulError).length || this.manageErrorContainer(), "required" === t.name && null !== this.ParsleyInstance.getVal() && 0 < this.ParsleyInstance.getVal().length) return this;
                if (this.ParsleyInstance.isRequired && "required" !== t.name && (null === this.ParsleyInstance.getVal() || 0 === this.ParsleyInstance.getVal().length)) return this.removeError(t.name), this;
                var i = t.name,
                    n = !1 !== this.options.errorMessage ? "custom-error-message" : i,
                    a = {};
                return t = !1 !== this.options.errorMessage ? this.options.errorMessage : "type" === t.name ? this.ParsleyInstance.Validator.messages[i][t.requirements] : "undefined" == typeof this.ParsleyInstance.Validator.messages[i] ? this.ParsleyInstance.Validator.messages.defaultMessage : this.ParsleyInstance.Validator.formatMesssage(this.ParsleyInstance.Validator.messages[i], t.requirements), a[n] = t, e(this.ulError + " ." + n).length ? this.updateError(a) : this.addError(a), this
            },
            manageErrorContainer: function() {
                var t = this.options.errorContainer || this.options.errors.container(this.ParsleyInstance.element, this.ParsleyInstance.isRadioOrCheckbox),
                    i = this.options.animate ? this.ulTemplate.css("display", "") : this.ulTemplate;
                return "undefined" == typeof t ? (this.ParsleyInstance.isRadioOrCheckbox ? this.ParsleyInstance.$element.parent().after(i) : this.ParsleyInstance.$element.after(i), this) : void e(t).append(i)
            }
        };
        var n = function(e, t, i) {
            return this.options = t, "ParsleyFieldMultiple" === i ? this : void this.init(e, i || "ParsleyField")
        };
        n.prototype = {
            constructor: n,
            init: function(n, a) {
                this.type = a, this.valid = !0, this.element = n, this.validatedOnce = !1, this.$element = e(n), this.val = this.$element.val(), this.Validator = new t(this.options), this.isRequired = !1, this.constraints = {}, "undefined" == typeof this.isRadioOrCheckbox && (this.isRadioOrCheckbox = !1, this.hash = this.generateHash()), this.UI = new i(this), this.options.useHtml5Constraints && this.bindHtml5Constraints(), this.addConstraints(), this.hasConstraints() && this.bindValidationEvents()
            },
            setParent: function(t) {
                this.$parent = e(t)
            },
            getParent: function() {
                return this.$parent
            },
            bindHtml5Constraints: function() {
                (this.$element.hasClass("required") || this.$element.attr("required")) && (this.options.required = !0);
                var e = this.$element.attr("type");
                "undefined" != typeof e && RegExp(e, "i").test("email url number range tel") && (this.options.type = "tel" === e ? "phone" : e, RegExp(this.options.type, "i").test("number range") && (this.options.type = "number", "undefined" != typeof this.$element.attr("min") && this.$element.attr("min").length && (this.options.min = this.$element.attr("min")), "undefined" != typeof this.$element.attr("max") && this.$element.attr("max").length && (this.options.max = this.$element.attr("max")))), "string" == typeof this.$element.attr("pattern") && this.$element.attr("pattern").length && (this.options.regexp = this.$element.attr("pattern"))
            },
            addConstraints: function() {
                for (var e in this.options) {
                    var t = {};
                    t[e] = this.options[e], this.addConstraint(t, !0, !1)
                }
            },
            addConstraint: function(e, t) {
                for (var i in e) i = i.toLowerCase(), "function" == typeof this.Validator.validators[i] && (this.constraints[i] = {
                    name: i,
                    requirements: e[i],
                    valid: null
                }, "required" === i && (this.isRequired = !0), this.addCustomConstraintMessage(i));
                "undefined" == typeof t && this.bindValidationEvents()
            },
            updateConstraint: function(e, t) {
                for (var i in e) this.updtConstraint({
                    name: i,
                    requirements: e[i],
                    valid: null
                }, t)
            },
            updtConstraint: function(t, i) {
                this.constraints[t.name] = e.extend(!0, this.constraints[t.name], t), "string" == typeof i && ("type" === t.name ? this.Validator.messages[t.name][t.requirements] = i : this.Validator.messages[t.name] = i), this.bindValidationEvents()
            },
            removeConstraint: function(e) {
                e = e.toLowerCase(), delete this.constraints[e], "required" === e && (this.isRequired = !1), this.hasConstraints() ? this.bindValidationEvents() : this.UI.reset()
            },
            addCustomConstraintMessage: function(e) {
                var t = e + ("type" === e && "undefined" != typeof this.options[e] ? this.options[e].charAt(0).toUpperCase() + this.options[e].substr(1) : "") + "Message";
                "undefined" != typeof this.options[t] && this.Validator.addMessage("type" === e ? this.options[e] : e, this.options[t], "type" === e)
            },
            bindValidationEvents: function() {
                this.valid = null, this.$element.addClass("parsley-validated"), this.$element.off("." + this.type), this.options.remote && !/change/i.test(this.options.trigger) && (this.options.trigger = this.options.trigger ? " change" : "change");
                var t = (this.options.trigger ? this.options.trigger : "") + (/key/i.test(this.options.trigger) ? "" : " keyup");
                this.$element.is("select") && (t += /change/i.test(t) ? "" : " change"), t = t.replace(/^\s+/g, "").replace(/\s+$/g, ""), this.$element.on((t + " ").split(" ").join("." + this.type + " "), !1, e.proxy(this.eventValidation, this))
            },
            generateHash: function() {
                return "parsley-" + (Math.random() + "").substring(2)
            },
            getHash: function() {
                return this.hash
            },
            getVal: function() {
                return "undefined" != typeof this.$element.domApi(this.options.namespace).value ? this.$element.domApi(this.options.namespace).value : this.$element.val()
            },
            eventValidation: function(e) {
                var t = this.getVal();
                return "keyup" === e.type && !/keyup/i.test(this.options.trigger) && !this.validatedOnce || "change" === e.type && !/change/i.test(this.options.trigger) && !this.validatedOnce || !this.isRadioOrCheckbox && this.getLength(t) < this.options.validationMinlength && !this.validatedOnce ? !0 : void this.validate()
            },
            getLength: function(e) {
                return e && e.hasOwnProperty("length") ? e.length : 0
            },
            isValid: function() {
                return this.validate(!1)
            },
            hasConstraints: function() {
                for (var e in this.constraints) return !0;
                return !1
            },
            validate: function(e) {
                var t = this.getVal(),
                    i = null;
                return !this.hasConstraints() || this.$element.is(this.options.excluded) ? null : this.options.listeners.onFieldValidate(this.element, this) || "" === t && !this.isRequired ? (this.UI.reset(), null) : this.needsValidation(t) ? (i = this.applyValidators(), ("undefined" != typeof e ? e : this.options.showErrors) && this.manageValidationResult(), i) : this.valid
            },
            needsValidation: function(e) {
                return !this.options.validateIfUnchanged && null !== this.valid && this.val === e && this.validatedOnce ? !1 : (this.val = e, this.validatedOnce = !0)
            },
            applyValidators: function() {
                var e, t = null;
                for (e in this.constraints) {
                    var i = this.Validator.validators[this.constraints[e].name]().validate(this.val, this.constraints[e].requirements, this);
                    !1 === i ? (t = !1, this.constraints[e].valid = t) : !0 === i && (this.constraints[e].valid = !0, t = !1 !== t)
                }
                return !1 === t ? this.options.listeners.onFieldError(this.element, this.constraints, this) : !0 === t && !1 === this.options.listeners.onFieldSuccess(this.element, this.constraints, this) && (t = !1), t
            },
            manageValidationResult: function() {
                var t, i = null,
                    n = [];
                for (t in this.constraints) !1 === this.constraints[t].valid ? (n.push(this.constraints[t]), i = !1) : !0 === this.constraints[t].valid && (this.UI.removeError(this.constraints[t].name), i = !1 !== i);
                if (this.valid = i, !0 === this.valid) return this.UI.removeErrors(), this.UI.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass), !0;
                if (!1 === this.valid) {
                    if (!0 === this.options.priorityEnabled) {
                        for (var a, i = 0, r = 0; r < n.length; r++) a = this.Validator.validators[n[r].name]().priority, a > i && (t = n[r], i = a);
                        this.UI.manageError(t)
                    } else
                        for (r = 0; r < n.length; r++) this.UI.manageError(n[r]);
                    return this.UI.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass), !1
                }
                return this.UI.ulError && 0 === e(this.ulError).children().length && this.UI.removeErrors(), i
            },
            addListener: function(e) {
                for (var t in e) this.options.listeners[t] = e[t]
            },
            destroy: function() {
                this.$element.removeClass("parsley-validated"), this.UI.reset(), this.$element.off("." + this.type).removeData(this.type)
            }
        };
        var a = function(e, i, n) {
            this.initMultiple(e, i), this.inherit(e, i), this.Validator = new t(i), this.init(e, n || "ParsleyFieldMultiple")
        };
        a.prototype = {
            constructor: a,
            initMultiple: function(t, i) {
                this.element = t, this.$element = e(t), this.group = i.group || !1, this.hash = this.getName(), this.siblings = this.group ? "[" + i.namespace + 'group="' + this.group + '"]' : 'input[name="' + this.$element.attr("name") + '"]', this.isRadioOrCheckbox = !0, this.isRadio = this.$element.is("input[type=radio]"), this.isCheckbox = this.$element.is("input[type=checkbox]"), this.errorClassHandler = i.errors.classHandler(t, this.isRadioOrCheckbox) || this.$element.parent()
            },
            inherit: function(e, t) {
                var i, a = new n(e, t, "ParsleyFieldMultiple");
                for (i in a) "undefined" == typeof this[i] && (this[i] = a[i])
            },
            getName: function() {
                if (this.group) return "parsley-" + this.group;
                if ("undefined" == typeof this.$element.attr("name")) throw "A radio / checkbox input must have a parsley-group attribute or a name to be Parsley validated !";
                return "parsley-" + this.$element.attr("name").replace(/(:|\.|\[|\]|\$)/g, "")
            },
            getVal: function() {
                if (this.isRadio) return e(this.siblings + ":checked").val() || "";
                if (this.isCheckbox) {
                    var t = [];
                    return e(this.siblings + ":checked").each(function() {
                        t.push(e(this).val())
                    }), t
                }
            },
            bindValidationEvents: function() {
                this.valid = null, this.$element.addClass("parsley-validated"), this.$element.off("." + this.type);
                var t = this,
                    i = (this.options.trigger ? this.options.trigger : "") + (/change/i.test(this.options.trigger) ? "" : " change"),
                    i = i.replace(/^\s+/g, "").replace(/\s+$/g, "");
                e(this.siblings).each(function() {
                    e(this).on(i.split(" ").join("." + t.type + " "), !1, e.proxy(t.eventValidation, t))
                })
            }
        };
        var r = function(e, t, i) {
            this.init(e, t, i || "parsleyForm")
        };
        r.prototype = {
            constructor: r,
            init: function(t, i, n) {
                this.type = n, this.items = [], this.$element = e(t), this.options = i;
                var a = this;
                this.$element.find(i.inputs).each(function() {
                    a.addItem(this)
                }), this.$element.on("submit." + this.type, !1, e.proxy(this.validate, this))
            },
            addListener: function(e) {
                for (var t in e)
                    if (/Field/.test(t))
                        for (var i = 0; i < this.items.length; i++) this.items[i].addListener(e);
                    else this.options.listeners[t] = e[t]
            },
            addItem: function(t) {
                t = e(t).parsley(this.options), t.setParent(this), this.items.push(t)
            },
            removeItem: function(t) {
                t = e(t).parsley();
                for (var i = 0; i < this.items.length; i++)
                    if (this.items[i].hash === t.hash) return this.items[i].destroy(), this.items.splice(i, 1), !0;
                return !1
            },
            validate: function(t) {
                var i = !0;
                this.focusedField = !1;
                for (var n = 0; n < this.items.length; n++) "undefined" != typeof this.items[n] && !1 === this.items[n].validate() && (i = !1, !this.focusedField && "first" === this.options.focus || "last" === this.options.focus) && (this.focusedField = this.items[n].$element);
                if (this.focusedField && !i)
                    if (0 < this.options.scrollDuration) {
                        var a = this,
                            n = this.focusedField.offset().top - e(window).height() / 2;
                        e("html, body").animate({
                            scrollTop: n
                        }, this.options.scrollDuration, function() {
                            a.focusedField.focus()
                        })
                    } else this.focusedField.focus();
                return t = this.options.listeners.onFormValidate(i, t, this), "undefined" != typeof t ? t : i
            },
            isValid: function() {
                for (var e = 0; e < this.items.length; e++)
                    if (!1 === this.items[e].isValid()) return !1;
                return !0
            },
            removeErrors: function() {
                for (var e = 0; e < this.items.length; e++) this.items[e].parsley("reset")
            },
            destroy: function() {
                for (var e = 0; e < this.items.length; e++) this.items[e].destroy();
                this.$element.off("." + this.type).removeData(this.type)
            },
            reset: function() {
                for (var e = 0; e < this.items.length; e++) this.items[e].UI.reset()
            }
        }, e.fn.parsley = function(t, i) {
            function o(i, o) {
                var s = e(i).data(o);
                if (!s) {
                    switch (o) {
                        case "parsleyForm":
                            s = new r(i, l, "parsleyForm");
                            break;
                        case "parsleyField":
                            s = new n(i, l, "parsleyField");
                            break;
                        case "parsleyFieldMultiple":
                            s = new a(i, l, "parsleyFieldMultiple");
                            break;
                        default:
                            return
                    }
                    e(i).data(o, s)
                }
                return "string" == typeof t && "function" == typeof s[t] ? (s = s[t].apply(s, u), "undefined" != typeof s ? s : e(i)) : s
            }
            var s = e(this).data("parsleyNamespace") ? e(this).data("parsleyNamespace") : "undefined" != typeof t && "undefined" != typeof t.namespace ? t.namespace : e.fn.parsley.defaults.namespace,
                l = e.extend(!0, {}, e.fn.parsley.defaults, "undefined" != typeof window.ParsleyConfig ? window.ParsleyConfig : {}, t, this.domApi(s)),
                c = null,
                u = Array.prototype.slice.call(arguments, 1);
            return e(this).is("form") || "undefined" != typeof e(this).domApi(s).bind ? c = o(e(this), "parsleyForm") : e(this).is(l.inputs) && (c = o(e(this), e(this).is("input[type=radio], input[type=checkbox]") ? "parsleyFieldMultiple" : "parsleyField")), "function" == typeof i ? i() : c
        }, e(window).on("load", function() {
            e("[parsley-validate], [data-parsley-validate]").each(function() {
                e(this).parsley()
            })
        }), e.fn.domApi = function(t) {
            var i, n = {},
                a = RegExp("^" + t, "i");
            if ("undefined" == typeof this[0]) return {};
            for (var r in this[0].attributes)
                if (i = this[0].attributes[r], "undefined" != typeof i && null !== i && i.specified && a.test(i.name)) {
                    var s, l = n,
                        c = o(i.name.replace(t, ""));
                    i = i.value;
                    var u = void 0;
                    try {
                        s = i ? "true" == i || ("false" == i ? !1 : "null" == i ? null : isNaN(u = Number(i)) ? /^[\[\{]/.test(i) ? e.parseJSON(i) : i : u) : i
                    } catch (d) {
                        s = i
                    }
                    l[c] = s
                }
            return n
        };
        var o = function(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : ""
            })
        };
        e.fn.parsley.defaults = {
            namespace: "parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=hidden], input[type=file], :disabled",
            priorityEnabled: !0,
            trigger: !1,
            animate: !0,
            animateDuration: 300,
            scrollDuration: 500,
            focus: "first",
            validationMinlength: 3,
            successClass: "parsley-success",
            errorClass: "parsley-error",
            errorMessage: !1,
            validators: {},
            showErrors: !0,
            useHtml5Constraints: !0,
            messages: {},
            validateIfUnchanged: !1,
            errors: {
                classHandler: function() {},
                container: function() {},
                errorsWrapper: "<ul></ul>",
                errorElem: "<li></li>"
            },
            listeners: {
                onFieldValidate: function() {
                    return !1
                },
                onFormValidate: function() {},
                onFieldError: function() {},
                onFieldSuccess: function() {}
            }
        }
    }(window.jQuery || window.Zepto), $(".elVideoUnlockerElement").length) {
    var checkPreview = checkifPreview_randomCookie("track");
    if (0 == checkPreview) var cookie_variable = $(".elVideoUnlockerElement").parent().attr("id") + window.location.href + Math.floor(1020 * Math.random() + 1);
    else var cookie_variable = $(".elVideoUnlockerElement").parent().attr("id") + window.location.href;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var elVideo_one = $(".elVideoUnlock_one").attr("data-elvideoid") || "";
    elVideo_one = elVideo_one.replace("https://www.youtube.com/watch?v=", ""), elVideo_one = elVideo_one.replace("https://youtu.be/", "").split("?")[0];
    var elVideo_two = $(".elVideoUnlock_two").attr("data-elvideoid") || "";
    elVideo_two = elVideo_two.replace("https://www.youtube.com/watch?v=", ""), elVideo_two = elVideo_two.replace("https://youtu.be/", "").split("?")[0];
    var elVideo_three = $(".elVideoUnlock_three").attr("data-elvideoid") || "";
    elVideo_three = elVideo_three.replace("https://www.youtube.com/watch?v=", ""), elVideo_three = elVideo_three.replace("https://youtu.be/", "").split("?")[0];
    var elVideo_four = $(".elVideoUnlock_four").attr("data-elvideoid") || "";
    elVideo_four = elVideo_four.replace("https://www.youtube.com/watch?v=", ""), elVideo_four = elVideo_four.replace("https://youtu.be/", "").split("?")[0];
    var elVideo_type = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-type"),
        elVideo_show = $(".elVideoUnlockerElement").attr("data-show-ids"),
        elVideo_hide = $(".elVideoUnlockerElement").attr("data-hide-ids");
    $(document).on("click", ".modalBackdropWrapper, .closeLPModal", function() {
        $(".containerModal").delay(0).velocity({
            opacity: 0,
            top: -300
        }, 200, function() {
            $(".modalBackdropWrapper").hide(), $(".containerModal").hide(), $(".containerModal").css("top", 0)
        }), $windowHeight = $(window).height(), $posTop = $(".containerModal").offset().top, $popupHeight = $(".containerModal").height() + $posTop, $popupHeight > $windowHeight ? $(".containerModal").css("position", "absolute") : $(".containerModal").css("position", "fixed")
    });
    var elVideo_numberofvideos = $(".elVideoUnlockerElement").attr("data-elunlocker-numberofvideos"),
        gettheType_unlocker = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-thevideotype");
    checkVideoType = $(".elVideoUnlockerElementRoot").attr("data-elunlocker-thevideotype"), "default" == checkVideoType ? ($.cookie("elVideoCheckUnlocked_one") != cookie_variable && $(".elVideoUnlock_one").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_one") == cookie_variable && $.cookie("elVideoCheckUnlocked_two") != cookie_variable && $(".elVideoUnlock_one").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_one") == cookie_variable && $.cookie("elVideoCheckUnlocked_two") == cookie_variable && $.cookie("elVideoCheckUnlocked_three") != cookie_variable && $(".elVideoUnlock_two").removeClass("elVideoCurrentlyLocked"), $.cookie("elVideoCheckUnlocked_one") == cookie_variable && $.cookie("elVideoCheckUnlocked_two") == cookie_variable && $.cookie("elVideoCheckUnlocked_three") == cookie_variable && ($(".elVideoUnlock_two").removeClass("elVideoCurrentlyLocked"), $(".elVideoUnlock_three").removeClass("elVideoCurrentlyLocked")), $.cookie("elVideoCheckUnlocked_one") == cookie_variable && $.cookie("elVideoCheckUnlocked_two") == cookie_variable && $.cookie("elVideoCheckUnlocked_three") == cookie_variable && $(".elVideoUnlock_four").removeClass("elVideoCurrentlyLocked")) : "evergreen" == checkVideoType ? (everGreenDates("2", "two"), everGreenDates("3", "three"), everGreenDates("4", "four")) : "date" == gettheType_unlocker ? (unlockVideoDate(".elunlockerdate2", ".elVideoUnlock_two"), unlockVideoDate(".elunlockerdate3", ".elVideoUnlock_three"), unlockVideoDate(".elunlockerdate4", ".elVideoUnlock_four")) : "1" == elVideo_numberofvideos ? ($.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && elCheckVideoEndType(), $(".elVideoUnlock_col").hide()) : "2" == elVideo_numberofvideos ? $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && elCheckVideoEndType() : "3" == elVideo_numberofvideos ? $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && elCheckVideoEndType() : "4" == elVideo_numberofvideos && $.cookie("elVideoCheckUnlocked_one" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_two" + window.location.href) == cookie_variable && $.cookie("elVideoCheckUnlocked_three" + window.location.href) == cookie_variable && elCheckVideoEndType();
    var player, playVideoText = $(".elvideounlocker_playtext").text(),
        pauseVideoText = $(".elVideoUnlockerElement").attr("data-elunlocker-pausetext"),
        playingVideoText = $(".elVideoUnlockerElement").attr("data-elunlocker-playingtext"),
        lockedVideoText = $(".lockedbuttonUnlocker").first().text();
    $(".elVideoCurrentlyLocked").attr("title", lockedVideoText), $(".elVideoUnlock_col").click(function() {
        if (0 == $(this).hasClass("elCurrentlyPlayingVideoUnlocker")) {
            if (0 == $(this).hasClass("elVideoCurrentlyLocked")) {
                var e = $(this).attr("data-elvideoid");
                e = e.replace("https://www.youtube.com/watch?v=", ""), e = e.replace("https://youtu.be/", "").split("?")[0], player.loadVideoById(e), $(".elVideoUnlock_col").removeClass("elCurrentlyPlayingVideoUnlocker"), $(this).addClass("elCurrentlyPlayingVideoUnlocker"), $("#elmainVideoPlayIcon").removeClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: none"), $("#elVideoProgressBarUnlocker div").velocity({
                    width: 0
                })
            }
        } else $("#elmainVideoPlayIcon").hasClass("videoisPaused_elunlocker") ? (player.unMute(), player.playVideo(), $("#elmainVideoPlayIcon").removeClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: none")) : (player.pauseVideo(), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: rgba(0, 0, 0, .4)"))
    }), $(".btn-videounlockbutton").click(function(e) {
        e.preventDefault()
    }), $(document).on("click", ".elvideounlock_videoPauseBlocker", function() {
        $("#elmainVideoPlayIcon").hasClass("videoisPaused_elunlocker") ? (player.playVideo(), player.unMute(), player.setVolume(100), $("#elmainVideoPlayIcon").removeClass("videoisPaused_elunlocker"), $(this).attr("style", "background: none")) : (player.pauseVideo(), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(this).attr("style", "background: rgba(0, 0, 0, .4)"))
    }), $(window).on("blur focus", function(e) {
        var t = $(this).data("prevType"),
            i = $(".elVideoUnlockerElement").attr("data-elunlocker-forcepause");
        if ("true" == i) {
            if (t != e.type) switch (e.type) {
                case "blur":
                    player.pauseVideo(), $("#elmainVideoPlayIcon").addClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: rgba(0, 0, 0, .4)");
                    break;
                case "focus":
                    var n = player.getVideoData();
                    elVideo_one == n.video_id && $(".elVideoUnlock_one").addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_two == n.video_id && $(".elVideoUnlock_two").addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_three == n.video_id && $(".elVideoUnlock_three").addClass("elCurrentlyPlayingVideoUnlocker"), elVideo_four == n.video_id && $(".elVideoUnlock_four").addClass("elCurrentlyPlayingVideoUnlocker"), $("#elmainVideoPlayIcon").removeClass("videoisPaused_elunlocker"), $(".elvideounlock_videoPauseBlocker").attr("style", "background: none"), player.playVideo()
            }
        } else if (t != e.type) switch (e.type) {
            case "blur":
                "undefined" != typeof elvideounlocker_progresssbar && clearTimeout(elvideounlocker_progresssbar);
                break;
            case "focus":
                var a = player.getDuration();
                "undefined" != typeof elvideounlocker_progresssbar && clearTimeout(elvideounlocker_progresssbar), elvideounlocker_progresssbar = setInterval(function() {
                    clearTimeout(elvideounlocker_progresssbar);
                    var e = player.getCurrentTime(),
                        t = e / a * 100;
                    elvideounlockerProgress(t, $("#elVideoProgressBarUnlocker"))
                }, 1e3)
        }
        $(this).data("prevType", e.type)
    })
}! function() {
    function m() {
        return function() {}
    }

    function n(e) {
        return function() {
            return this[e]
        }
    }

    function r(e) {
        return function() {
            return e
        }
    }

    function t(e, i, n) {
        if ("string" == typeof e) {
            if (0 === e.indexOf("#") && (e = e.slice(1)), t.Ga[e]) return t.Ga[e];
            e = t.w(e)
        }
        if (!e || !e.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return e.player || new t.Player(e, i, n)
    }

    function u(e, i, n, a) {
        t.pc.forEach(n, function(t) {
            e(i, t, a)
        })
    }

    function D(e, i) {
        var n, a;
        n = Array.prototype.slice.call(i), a = m(), a = window.console || {
            log: a,
            warn: a,
            error: a
        }, e ? n.unshift(e.toUpperCase() + ":") : e = "log", t.log.history.push(n), n.unshift("VIDEOJS:"), a[e].apply ? a[e].apply(a, n) : a[e](n.join(" "))
    }

    function E(e) {
        e.r("vjs-lock-showing")
    }

    function F(e, i, n, a) {
        return n !== b ? ((n === k || t.Pd(n)) && (n = 0), e.b.style[i] = -1 !== ("" + n).indexOf("%") || -1 !== ("" + n).indexOf("px") ? n : "auto" === n ? "" : n + "px", a || e.l("resize"), e) : e.b ? (n = e.b.style[i], a = n.indexOf("px"), -1 !== a ? parseInt(n.slice(0, a), 10) : parseInt(e.b["offset" + t.ba(i)], 10)) : 0
    }

    function G(e) {
        var t, i, n, a, r, o, s, c;
        t = 0, i = k, e.c("touchstart", function(e) {
            1 === e.touches.length && (i = e.touches[0], t = (new Date).getTime(), a = f)
        }), e.c("touchmove", function(e) {
            1 < e.touches.length ? a = l : i && (o = e.touches[0].pageX - i.pageX, s = e.touches[0].pageY - i.pageY, c = Math.sqrt(o * o + s * s), c > 22 && (a = l))
        }), r = function() {
            a = l
        }, e.c("touchleave", r), e.c("touchcancel", r), e.c("touchend", function(e) {
            i = k, a === f && (n = (new Date).getTime() - t, 250 > n && (e.preventDefault(), this.l("tap")))
        })
    }

    function H(e, i) {
        var n, a, r, o;
        return n = e.b, a = t.Hd(n), o = r = n.offsetWidth, n = e.handle, e.options().vertical ? (o = a.top, a = i.changedTouches ? i.changedTouches[0].pageY : i.pageY, n && (n = n.w().offsetHeight, o += n / 2, r -= n), Math.max(0, Math.min(1, (o - a + r) / r))) : (r = a.left, a = i.changedTouches ? i.changedTouches[0].pageX : i.pageX, n && (n = n.w().offsetWidth, r += n / 2, o -= n), Math.max(0, Math.min(1, (a - r) / o)))
    }

    function ca(e, i) {
        e.U(i), i.c("click", t.bind(e, function() {
            E(this)
        }))
    }

    function J(e) {
        e.xa = f, e.Fa.n("vjs-lock-showing"), e.b.setAttribute("aria-pressed", f), e.P && 0 < e.P.length && e.P[0].w().focus()
    }

    function I(e) {
        e.xa = l, E(e.Fa), e.b.setAttribute("aria-pressed", l)
    }

    function da(e) {
        var i, n, a = {
            sources: [],
            tracks: []
        };
        if (i = t.Ea(e), n = i["data-setup"], n !== k && t.h.z(i, t.JSON.parse(n || "{}")), t.h.z(a, i), e.hasChildNodes()) {
            var r, o;
            for (e = e.childNodes, r = 0, o = e.length; o > r; r++) i = e[r], n = i.nodeName.toLowerCase(), "source" === n ? a.sources.push(t.Ea(i)) : "track" === n && a.tracks.push(t.Ea(i))
        }
        return a
    }

    function Q(e, i, n) {
        e.o && (e.oa = l, e.o.dispose(), e.o = l), "Html5" !== i && e.I && (t.g.Gb(e.I), e.I = k), e.La = i, e.oa = l;
        var a = t.h.z({
            source: n,
            parentEl: e.b
        }, e.m[i.toLowerCase()]);
        n && (e.xc = n.type, n.src == e.F.src && 0 < e.F.currentTime && (a.startTime = e.F.currentTime), e.F.src = n.src), e.o = new window.videojs[i](e, a), e.o.H(function() {
            this.d.Na()
        })
    }

    function R(e, t) {
        t !== b && e.Fc !== t && ((e.Fc = t) ? (e.n("vjs-has-started"), e.l("firstplay")) : e.r("vjs-has-started"))
    }

    function T(e, i, n) {
        if (e.o && !e.o.oa) e.o.H(function() {
            this[i](n)
        });
        else try {
            e.o[i](n)
        } catch (a) {
            throw t.log(a), a
        }
    }

    function S(e, i) {
        if (e.o && e.o.oa) try {
            return e.o[i]()
        } catch (n) {
            throw e.o[i] === b ? t.log("Video.js: " + i + " method not defined for " + e.La + " playback technology.", n) : "TypeError" == n.name ? (t.log("Video.js: " + i + " unavailable on " + e.La + " playback technology element.", n), e.o.oa = l) : t.log(n), n
        }
    }

    function U(e, t) {
        var i = e.selectSource(t);
        i ? i.o === e.La ? e.src(i.source) : Q(e, i.o, i.source) : (e.setTimeout(function() {
            this.error({
                code: 4,
                message: this.t(this.options().notSupportedMessage)
            })
        }, 0), e.Na())
    }

    function P(e, t) {
        return t !== b ? (e.Hc = !!t, e) : e.Hc
    }

    function ea(e) {
        return e.j().o && e.j().o.featuresPlaybackRate && e.j().options().playbackRates && 0 < e.j().options().playbackRates.length
    }

    function fa(e) {
        e.Rb = l, e.kb(), e.k("play", e.ad), e.k("pause", e.kb)
    }

    function ia() {
        var e = W[X],
            t = e.charAt(0).toUpperCase() + e.slice(1);
        ka["set" + t] = function(t) {
            return this.b.vjs_setProperty(e, t)
        }
    }

    function la(e) {
        ka[e] = function() {
            return this.b.vjs_getProperty(e)
        }
    }

    function na(e, i, n, a, r) {
        var o = e.Ma = e.Ma || [];
        r = r || {}, r.kind = i, r.label = n, r.language = a, i = t.ba(i || "subtitles");
        var s = new window.videojs[i + "Track"](e, r);
        o.push(s), s.Fb() && e.H(function() {
            this.setTimeout(function() {
                Y(s.j(), s.id())
            }, 0)
        })
    }

    function Y(e, t, i) {
        for (var n, a, r = e.Ma, o = 0, s = r.length; s > o; o++) n = r[o], n.id() === t ? (n.show(), a = n) : i && n.M() == i && 0 < n.mode() && n.disable();
        (t = a ? a.M() : i ? i : l) && e.l(t + "trackchange")
    }

    function oa(e) {
        0 === e.sa && e.load(), 0 === e.qa && (e.d.c("timeupdate", t.bind(e, e.update, e.K)), e.d.c("ended", t.bind(e, e.reset, e.K)), ("captions" === e.G || "subtitles" === e.G) && e.d.na("textTrackDisplay").U(e))
    }

    function pa(e) {
        var t = e.split(":");
        e = 0;
        var i, n, a;
        return 3 == t.length ? (i = t[0], n = t[1], t = t[2]) : (i = 0, n = t[0], t = t[1]), t = t.split(/\s+/), t = t.splice(0, 1)[0], t = t.split(/\.|,/), a = parseFloat(t[1]), t = t[0], e += 3600 * parseFloat(i), e += 60 * parseFloat(n), e += parseFloat(t), a && (e += a / 1e3), e
    }

    function $(e, t) {
        var i = e.split("."),
            n = qa;
        !(i[0] in n) && n.execScript && n.execScript("var " + i[0]);
        for (var a; i.length && (a = i.shift());) i.length || t === b ? n = n[a] ? n[a] : n[a] = {} : n[a] = t
    }
    var b = void 0,
        f = !0,
        k = null,
        l = !1,
        s;
    document.createElement("video"), document.createElement("audio"), document.createElement("track");
    var videojs = window.videojs = t;
    t.bc = "4.11", t.ed = "https:" == document.location.protocol ? "https://" : "http://", t.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        inactivityTimeout: 2e3,
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.Ke || navigator.language || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this video."
    }, "GENERATED_CDN_VSN" !== t.bc && (videojs.options.flash.swf = t.ed + "vjs.zencdn.net/" + t.bc + "/video-js.swf"), t.sd = function(e, i) {
        return t.options.languages[e] = t.options.languages[e] !== b ? t.W.pa(t.options.languages[e], i) : i, t.options.languages
    }, t.Ga = {}, "function" == typeof define && define.amd ? define([], function() {
        return videojs
    }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), t.va = t.CoreObject = m(), t.va.extend = function(e) {
        var i, n;
        e = e || {}, i = e.init || e.i || this.prototype.init || this.prototype.i || m(), n = function() {
            i.apply(this, arguments)
        }, n.prototype = t.h.create(this.prototype), n.prototype.constructor = n, n.extend = t.va.extend, n.create = t.va.create;
        for (var a in e) e.hasOwnProperty(a) && (n.prototype[a] = e[a]);
        return n
    }, t.va.create = function() {
        var e = t.h.create(this.prototype);
        return this.apply(e, arguments), e
    }, t.c = function(e, i, n) {
        if (t.h.isArray(i)) return u(t.c, e, i, n);
        var a = t.getData(e);
        a.C || (a.C = {}), a.C[i] || (a.C[i] = []), n.q || (n.q = t.q++), a.C[i].push(n), a.X || (a.disabled = l, a.X = function(i) {
            if (!a.disabled) {
                i = t.Cc(i);
                var n = a.C[i.type];
                if (n)
                    for (var n = n.slice(0), r = 0, o = n.length; o > r && !i.Jc(); r++) n[r].call(e, i)
            }
        }), 1 == a.C[i].length && (e.addEventListener ? e.addEventListener(i, a.X, l) : e.attachEvent && e.attachEvent("on" + i, a.X))
    }, t.k = function(e, i, n) {
        if (t.Ec(e)) {
            var a = t.getData(e);
            if (a.C) {
                if (t.h.isArray(i)) return u(t.k, e, i, n);
                if (i) {
                    var r = a.C[i];
                    if (r) {
                        if (n) {
                            if (n.q)
                                for (a = 0; a < r.length; a++) r[a].q === n.q && r.splice(a--, 1)
                        } else a.C[i] = [];
                        t.sc(e, i)
                    }
                } else
                    for (r in a.C) i = r, a.C[i] = [], t.sc(e, i)
            }
        }
    }, t.sc = function(e, i) {
        var n = t.getData(e);
        0 === n.C[i].length && (delete n.C[i], e.removeEventListener ? e.removeEventListener(i, n.X, l) : e.detachEvent && e.detachEvent("on" + i, n.X)), t.Ob(n.C) && (delete n.C, delete n.X, delete n.disabled), t.Ob(n) && t.Sc(e)
    }, t.Cc = function(e) {
        function t() {
            return f
        }

        function i() {
            return l
        }
        if (!e || !e.Pb) {
            var n = e || window.event;
            e = {};
            for (var a in n) "layerX" !== a && "layerY" !== a && "keyLocation" !== a && ("returnValue" == a && n.preventDefault || (e[a] = n[a]));
            if (e.target || (e.target = e.srcElement || document), e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement, e.preventDefault = function() {
                    n.preventDefault && n.preventDefault(), e.returnValue = l, e.Nd = t, e.defaultPrevented = f
                }, e.Nd = i, e.defaultPrevented = l, e.stopPropagation = function() {
                    n.stopPropagation && n.stopPropagation(), e.cancelBubble = f, e.Pb = t
                }, e.Pb = i, e.stopImmediatePropagation = function() {
                    n.stopImmediatePropagation && n.stopImmediatePropagation(), e.Jc = t, e.stopPropagation()
                }, e.Jc = i, e.clientX != k) {
                a = document.documentElement;
                var r = document.body;
                e.pageX = e.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = e.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)
            }
            e.which = e.charCode || e.keyCode, e.button != k && (e.button = 1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0)
        }
        return e
    }, t.l = function(e, i) {
        var n = t.Ec(e) ? t.getData(e) : {},
            a = e.parentNode || e.ownerDocument;
        return "string" == typeof i && (i = {
            type: i,
            target: e
        }), i = t.Cc(i), n.X && n.X.call(e, i), a && !i.Pb() && i.bubbles !== l ? t.l(a, i) : a || i.defaultPrevented || (n = t.getData(i.target), !i.target[i.type]) || (n.disabled = f, "function" == typeof i.target[i.type] && i.target[i.type](), n.disabled = l), !i.defaultPrevented
    }, t.Q = function(e, i, n) {
        function a() {
            t.k(e, i, a), n.apply(this, arguments)
        }
        return t.h.isArray(i) ? u(t.Q, e, i, n) : (a.q = n.q = n.q || t.q++, void t.c(e, i, a))
    };
    var v = Object.prototype.hasOwnProperty;
    t.e = function(e, i) {
        var n;
        return i = i || {}, n = document.createElement(e || "div"), t.h.Y(i, function(e, t) {
            -1 !== e.indexOf("aria-") || "role" == e ? n.setAttribute(e, t) : n[e] = t
        }), n
    }, t.ba = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }, t.h = {}, t.h.create = Object.create || function(e) {
        function t() {}
        return t.prototype = e, new t
    }, t.h.Y = function(e, t, i) {
        for (var n in e) v.call(e, n) && t.call(i || this, n, e[n])
    }, t.h.z = function(e, t) {
        if (!t) return e;
        for (var i in t) v.call(t, i) && (e[i] = t[i]);
        return e
    }, t.h.Ad = function(e, i) {
        var n, a, r;
        e = t.h.copy(e);
        for (n in i) v.call(i, n) && (a = e[n], r = i[n], e[n] = t.h.ab(a) && t.h.ab(r) ? t.h.Ad(a, r) : i[n]);
        return e
    }, t.h.copy = function(e) {
        return t.h.z({}, e)
    }, t.h.ab = function(e) {
        return !!e && "object" == typeof e && "[object Object]" === e.toString() && e.constructor === Object
    }, t.h.isArray = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }, t.Pd = function(e) {
        return e !== e
    }, t.bind = function(e, i, n) {
        function a() {
            return i.apply(e, arguments)
        }
        return i.q || (i.q = t.q++), a.q = n ? n + "_" + i.q : i.q, a
    }, t.ya = {}, t.q = 1, t.expando = "vdata" + (new Date).getTime(), t.getData = function(e) {
        var i = e[t.expando];
        return i || (i = e[t.expando] = t.q++, t.ya[i] = {}), t.ya[i]
    }, t.Ec = function(e) {
        return e = e[t.expando], !(!e || t.Ob(t.ya[e]))
    }, t.Sc = function(e) {
        var i = e[t.expando];
        if (i) {
            delete t.ya[i];
            try {
                delete e[t.expando]
            } catch (n) {
                e.removeAttribute ? e.removeAttribute(t.expando) : e[t.expando] = k
            }
        }
    }, t.Ob = function(e) {
        for (var t in e)
            if (e[t] !== k) return l;
        return f
    }, t.$a = function(e, t) {
        return -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
    }, t.n = function(e, i) {
        t.$a(e, i) || (e.className = "" === e.className ? i : e.className + " " + i)
    }, t.r = function(e, i) {
        var n, a;
        if (t.$a(e, i)) {
            for (n = e.className.split(" "), a = n.length - 1; a >= 0; a--) n[a] === i && n.splice(a, 1);
            e.className = n.join(" ")
        }
    }, t.A = t.e("video"), t.N = navigator.userAgent, t.md = /iPhone/i.test(t.N), t.ld = /iPad/i.test(t.N), t.nd = /iPod/i.test(t.N), t.kd = t.md || t.ld || t.nd;
    var aa = t,
        x, y = t.N.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b, aa.Ae = x, t.hd = /Android/i.test(t.N);
    var ba = t,
        z, A = t.N.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
        B, C;
    A ? (B = A[1] && parseFloat(A[1]), C = A[2] && parseFloat(A[2]), z = B && C ? parseFloat(A[1] + "." + A[2]) : B ? B : k) : z = k, ba.ac = z, t.od = t.hd && /webkit/i.test(t.N) && 2.3 > t.ac, t.jd = /Firefox/i.test(t.N), t.Be = /Chrome/i.test(t.N), t.wb = !!("ontouchstart" in window || window.gd && document instanceof window.gd), t.fd = "backgroundSize" in t.A.style, t.Uc = function(e, i) {
        t.h.Y(i, function(t, i) {
            i === k || "undefined" == typeof i || i === l ? e.removeAttribute(t) : e.setAttribute(t, i === f ? "" : i)
        })
    }, t.Ea = function(e) {
        var t, i, n, a;
        if (t = {}, e && e.attributes && 0 < e.attributes.length) {
            i = e.attributes;
            for (var r = i.length - 1; r >= 0; r--) n = i[r].name, a = i[r].value, ("boolean" == typeof e[n] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + n + ",")) && (a = a !== k ? f : l), t[n] = a
        }
        return t
    }, t.He = function(e, t) {
        var i = "";
        return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle && (i = e["client" + t.substr(0, 1).toUpperCase() + t.substr(1)] + "px"), i
    }, t.Nb = function(e, t) {
        t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e)
    }, t.Va = {}, t.w = function(e) {
        return 0 === e.indexOf("#") && (e = e.slice(1)), document.getElementById(e)
    }, t.Da = function(e, t) {
        t = t || e;
        var i = Math.floor(e % 60),
            n = Math.floor(e / 60 % 60),
            a = Math.floor(e / 3600),
            r = Math.floor(t / 60 % 60),
            o = Math.floor(t / 3600);
        return (isNaN(e) || 1 / 0 === e) && (a = n = i = "-"), a = a > 0 || o > 0 ? a + ":" : "", a + (((a || r >= 10) && 10 > n ? "0" + n : n) + ":") + (10 > i ? "0" + i : i)
    }, t.ud = function() {
        document.body.focus(), document.onselectstart = r(l)
    }, t.ve = function() {
        document.onselectstart = r(f)
    }, t.trim = function(e) {
        return (e + "").replace(/^\s+|\s+$/g, "")
    }, t.round = function(e, t) {
        return t || (t = 0), Math.round(e * Math.pow(10, t)) / Math.pow(10, t)
    }, t.Eb = function(e, t) {
        return {
            length: 1,
            start: function() {
                return e
            },
            end: function() {
                return t
            }
        }
    }, t.je = function(e) {
        try {
            var i = window.localStorage || l;
            i && (i.volume = e)
        } catch (n) {
            22 == n.code || 1014 == n.code ? t.log("LocalStorage Full (VideoJS)", n) : 18 == n.code ? t.log("LocalStorage not allowed (VideoJS)", n) : t.log("LocalStorage Error (VideoJS)", n)
        }
    }, t.Jd = function(e) {
        return e.match(/^https?:\/\//) || (e = t.e("div", {
            innerHTML: '<a href="' + e + '">x</a>'
        }).firstChild.href), e
    }, t.fe = function(e) {
        var i, n, a, r;
        r = "protocol hostname port pathname search hash host".split(" "), n = t.e("a", {
            href: e
        }), (a = "" === n.host && "file:" !== n.protocol) && (i = t.e("div"), i.innerHTML = '<a href="' + e + '"></a>', n = i.firstChild, i.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(i)), e = {};
        for (var o = 0; o < r.length; o++) e[r[o]] = n[r[o]];
        return a && document.body.removeChild(i), e
    }, t.log = function() {
        D(k, arguments)
    }, t.log.history = [], t.log.error = function() {
        D("error", arguments)
    }, t.log.warn = function() {
        D("warn", arguments)
    }, t.Hd = function(e) {
        var i, n;
        return e.getBoundingClientRect && e.parentNode && (i = e.getBoundingClientRect()), i ? (e = document.documentElement, n = document.body, {
            left: t.round(i.left + (window.pageXOffset || n.scrollLeft) - (e.clientLeft || n.clientLeft || 0)),
            top: t.round(i.top + (window.pageYOffset || n.scrollTop) - (e.clientTop || n.clientTop || 0))
        }) : {
            left: 0,
            top: 0
        }
    }, t.pc = {}, t.pc.forEach = function(e, i, n) {
        if (t.h.isArray(e) && i instanceof Function)
            for (var a = 0, r = e.length; r > a; ++a) i.call(n || t, e[a], a, e);
        return e
    }, t.ye = function(e, i) {
        var n, a, r, o, s, l, c;
        "string" == typeof e && (e = {
            uri: e
        }), videojs.W.pa({
            method: "GET",
            timeout: 45e3
        }, e), i = i || m(), l = function() {
            window.clearTimeout(s), i(k, a, a.response || a.responseText)
        }, c = function(e) {
            window.clearTimeout(s), e && "string" != typeof e || (e = Error(e)), i(e, a)
        }, n = window.XMLHttpRequest, "undefined" == typeof n && (n = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (e) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (t) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (i) {}
            throw Error("This browser does not support XMLHttpRequest.")
        }), a = new n, a.uri = e.uri, n = t.fe(e.uri), r = window.location, n.protocol + n.host === r.protocol + r.host || !window.XDomainRequest || "withCredentials" in a ? (o = "file:" == n.protocol || "file:" == r.protocol, a.onreadystatechange = function() {
            if (4 === a.readyState) {
                if (a.te) return c("timeout");
                200 === a.status || o && 0 === a.status ? l() : c()
            }
        }, e.timeout && (s = window.setTimeout(function() {
            4 !== a.readyState && (a.te = f, a.abort())
        }, e.timeout))) : (a = new window.XDomainRequest, a.onload = l, a.onerror = c, a.onprogress = m(), a.ontimeout = m());
        try {
            a.open(e.method || "GET", e.uri, f)
        } catch (u) {
            return void c(u)
        }
        e.withCredentials && (a.withCredentials = f), e.responseType && (a.responseType = e.responseType);
        try {
            a.send()
        } catch (d) {
            c(d)
        }
    }, t.W = {}, t.W.pa = function(e, i) {
        var n, a, r;
        e = t.h.copy(e);
        for (n in i) i.hasOwnProperty(n) && (a = e[n], r = i[n], e[n] = t.h.ab(a) && t.h.ab(r) ? t.W.pa(a, r) : i[n]);
        return e
    }, t.a = t.va.extend({
        i: function(e, i, n) {
            if (this.d = e, this.m = t.h.copy(this.m), i = this.options(i), this.K = i.id || i.el && i.el.id, this.K || (this.K = (e.id && e.id() || "no_player") + "_component_" + t.q++), this.Vd = i.name || k, this.b = i.el || this.e(), this.O = [], this.Xa = {}, this.Ya = {}, this.Gc(), this.H(n), i.Tc !== l) {
                var a, r;
                this.j().reportUserActivity && (a = t.bind(this.j(), this.j().reportUserActivity), this.c("touchstart", function() {
                    a(), this.clearInterval(r), r = this.setInterval(a, 250)
                }), e = function() {
                    a(), this.clearInterval(r)
                }, this.c("touchmove", a), this.c("touchend", e), this.c("touchcancel", e))
            }
        }
    }), s = t.a.prototype, s.dispose = function() {
        if (this.l({
                type: "dispose",
                bubbles: l
            }), this.O)
            for (var e = this.O.length - 1; e >= 0; e--) this.O[e].dispose && this.O[e].dispose();
        this.Ya = this.Xa = this.O = k, this.k(), this.b.parentNode && this.b.parentNode.removeChild(this.b), t.Sc(this.b), this.b = k
    }, s.d = f, s.j = n("d"), s.options = function(e) {
        return e === b ? this.m : this.m = t.W.pa(this.m, e)
    }, s.e = function(e, i) {
        return t.e(e, i)
    }, s.t = function(e) {
        var t = this.d.language(),
            i = this.d.languages();
        return i && i[t] && i[t][e] ? i[t][e] : e
    }, s.w = n("b"), s.ma = function() {
        return this.v || this.b
    }, s.id = n("K"), s.name = n("Vd"), s.children = n("O"), s.Kd = function(e) {
        return this.Xa[e]
    }, s.na = function(e) {
        return this.Ya[e]
    }, s.U = function(e, i) {
        var n, a;
        return "string" == typeof e ? (a = e, i = i || {}, n = i.componentClass || t.ba(a), i.name = a, n = new window.videojs[n](this.d || this, i)) : n = e, this.O.push(n), "function" == typeof n.id && (this.Xa[n.id()] = n), (a = a || n.name && n.name()) && (this.Ya[a] = n), "function" == typeof n.el && n.el() && this.ma().appendChild(n.el()), n
    }, s.removeChild = function(e) {
        if ("string" == typeof e && (e = this.na(e)), e && this.O) {
            for (var t = l, i = this.O.length - 1; i >= 0; i--)
                if (this.O[i] === e) {
                    t = f, this.O.splice(i, 1);
                    break
                }
            t && (this.Xa[e.id()] = k, this.Ya[e.name()] = k, (t = e.w()) && t.parentNode === this.ma() && this.ma().removeChild(e.w()))
        }
    }, s.Gc = function() {
        var e, i, n, a, r, o;
        if (e = this, i = e.options(), n = i.children)
            if (o = function(t, n) {
                    i[t] !== b && (n = i[t]), n !== l && (e[t] = e.U(t, n))
                }, t.h.isArray(n))
                for (var s = 0; s < n.length; s++) a = n[s], "string" == typeof a ? (r = a, a = {}) : r = a.name, o(r, a);
            else t.h.Y(n, o)
    }, s.S = r(""), s.c = function(e, i, n) {
        var a, r, o;
        return "string" == typeof e || t.h.isArray(e) ? t.c(this.b, e, t.bind(this, i)) : (a = t.bind(this, n), o = this, r = function() {
            o.k(e, i, a)
        }, r.q = a.q, this.c("dispose", r), n = function() {
            o.k("dispose", r)
        }, n.q = a.q, e.nodeName ? (t.c(e, i, a), t.c(e, "dispose", n)) : "function" == typeof e.c && (e.c(i, a), e.c("dispose", n))), this
    }, s.k = function(e, i, n) {
        return !e || "string" == typeof e || t.h.isArray(e) ? t.k(this.b, e, i) : (n = t.bind(this, n), this.k("dispose", n), e.nodeName ? (t.k(e, i, n), t.k(e, "dispose", n)) : (e.k(i, n), e.k("dispose", n))), this
    }, s.Q = function(e, i, n) {
        var a, r, o;
        return "string" == typeof e || t.h.isArray(e) ? t.Q(this.b, e, t.bind(this, i)) : (a = t.bind(this, n), r = this, o = function() {
            r.k(e, i, o), a.apply(this, arguments)
        }, o.q = a.q, this.c(e, i, o)), this
    }, s.l = function(e) {
        return t.l(this.b, e), this
    }, s.H = function(e) {
        return e && (this.oa ? e.call(this) : (this.hb === b && (this.hb = []), this.hb.push(e))), this
    }, s.Na = function() {
        this.oa = f;
        var e = this.hb;
        if (e && 0 < e.length) {
            for (var t = 0, i = e.length; i > t; t++) e[t].call(this);
            this.hb = [], this.l("ready")
        }
    }, s.$a = function(e) {
        return t.$a(this.b, e)
    }, s.n = function(e) {
        return t.n(this.b, e), this
    }, s.r = function(e) {
        return t.r(this.b, e), this
    }, s.show = function() {
        return this.b.style.display = "block", this
    }, s.Z = function() {
        return this.b.style.display = "none", this
    }, s.disable = function() {
        this.Z(), this.show = m()
    }, s.width = function(e, t) {
        return F(this, "width", e, t)
    }, s.height = function(e, t) {
        return F(this, "height", e, t)
    }, s.Dd = function(e, t) {
        return this.width(e, f).height(t)
    }, s.setTimeout = function(e, i) {
        function n() {
            this.clearTimeout(a)
        }
        e = t.bind(this, e);
        var a = setTimeout(e, i);
        return n.q = "vjs-timeout-" + a, this.c("dispose", n), a
    }, s.clearTimeout = function(e) {
        function t() {}
        return clearTimeout(e), t.q = "vjs-timeout-" + e, this.k("dispose", t), e
    }, s.setInterval = function(e, i) {
        function n() {
            this.clearInterval(a)
        }
        e = t.bind(this, e);
        var a = setInterval(e, i);
        return n.q = "vjs-interval-" + a, this.c("dispose", n), a
    }, s.clearInterval = function(e) {
        function t() {}
        return clearInterval(e), t.q = "vjs-interval-" + e, this.k("dispose", t), e
    }, t.u = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), G(this), this.c("tap", this.s), this.c("click", this.s), this.c("focus", this.fb), this.c("blur", this.eb)
        }
    }), s = t.u.prototype, s.e = function(e, i) {
        var n;
        return i = t.h.z({
            className: this.S(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, i), n = t.a.prototype.e.call(this, e, i), i.innerHTML || (this.v = t.e("div", {
            className: "vjs-control-content"
        }), this.Cb = t.e("span", {
            className: "vjs-control-text",
            innerHTML: this.t(this.la) || "Need Text"
        }), this.v.appendChild(this.Cb), n.appendChild(this.v)), n
    }, s.S = function() {
        return "vjs-control " + t.a.prototype.S.call(this)
    }, s.s = m(), s.fb = function() {
        t.c(document, "keydown", t.bind(this, this.ea))
    }, s.ea = function(e) {
        (32 == e.which || 13 == e.which) && (e.preventDefault(), this.s())
    }, s.eb = function() {
        t.k(document, "keydown", t.bind(this, this.ea))
    }, t.R = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.td = this.na(this.m.barName), this.handle = this.na(this.m.handleName), this.c("mousedown", this.gb), this.c("touchstart", this.gb), this.c("focus", this.fb), this.c("blur", this.eb), this.c("click", this.s), this.c(e, "controlsvisible", this.update), this.c(e, this.Oc, this.update)
        }
    }), s = t.R.prototype, s.e = function(e, i) {
        return i = i || {}, i.className += " vjs-slider", i = t.h.z({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, i), t.a.prototype.e.call(this, e, i)
    }, s.gb = function(e) {
        e.preventDefault(), t.ud(), this.n("vjs-sliding"), this.c(document, "mousemove", this.fa), this.c(document, "mouseup", this.ra), this.c(document, "touchmove", this.fa), this.c(document, "touchend", this.ra), this.fa(e)
    }, s.fa = m(), s.ra = function() {
        t.ve(), this.r("vjs-sliding"), this.k(document, "mousemove", this.fa), this.k(document, "mouseup", this.ra), this.k(document, "touchmove", this.fa), this.k(document, "touchend", this.ra), this.update()
    }, s.update = function() {
        if (this.b) {
            var e, i = this.Lb(),
                n = this.handle,
                a = this.td;
            if (isNaN(i) && (i = 0), e = i, n) {
                e = this.b.offsetWidth;
                var r = n.w().offsetWidth;
                e = r ? r / e : 0, i *= 1 - e, e = i + e / 2, n.w().style.left = t.round(100 * i, 2) + "%"
            }
            a && (a.w().style.width = t.round(100 * e, 2) + "%")
        }
    }, s.fb = function() {
        this.c(document, "keydown", this.ea)
    }, s.ea = function(e) {
        37 == e.which || 40 == e.which ? (e.preventDefault(), this.Yc()) : (38 == e.which || 39 == e.which) && (e.preventDefault(), this.Zc())
    }, s.eb = function() {
        this.k(document, "keydown", this.ea)
    }, s.s = function(e) {
        e.stopImmediatePropagation(), e.preventDefault()
    }, t.$ = t.a.extend(), t.$.prototype.defaultValue = 0, t.$.prototype.e = function(e, i) {
        return i = i || {}, i.className += " vjs-slider-handle", i = t.h.z({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, i), t.a.prototype.e.call(this, "div", i)
    }, t.ja = t.a.extend(), t.ja.prototype.e = function() {
        var e = this.options().uc || "ul";
        return this.v = t.e(e, {
            className: "vjs-menu-content"
        }), e = t.a.prototype.e.call(this, "div", {
            append: this.v,
            className: "vjs-menu"
        }), e.appendChild(this.v), t.c(e, "click", function(e) {
            e.preventDefault(), e.stopImmediatePropagation()
        }), e
    }, t.J = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i), this.selected(i.selected)
        }
    }), t.J.prototype.e = function(e, i) {
        return t.u.prototype.e.call(this, "li", t.h.z({
            className: "vjs-menu-item",
            innerHTML: this.t(this.m.label)
        }, i))
    }, t.J.prototype.s = function() {
        this.selected(f)
    }, t.J.prototype.selected = function(e) {
        e ? (this.n("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.b.setAttribute("aria-selected", l))
    }, t.L = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i), this.Fa = this.Aa(), this.U(this.Fa), this.P && 0 === this.P.length && this.Z(), this.c("keydown", this.ea), this.b.setAttribute("aria-haspopup", f), this.b.setAttribute("role", "button")
        }
    }), s = t.L.prototype, s.xa = l, s.Aa = function() {
        var e = new t.ja(this.d);
        if (this.options().title && e.ma().appendChild(t.e("li", {
                className: "vjs-menu-title",
                innerHTML: t.ba(this.options().title),
                re: -1
            })), this.P = this.createItems())
            for (var i = 0; i < this.P.length; i++) ca(e, this.P[i]);
        return e
    }, s.za = m(), s.S = function() {
        return this.className + " vjs-menu-button " + t.u.prototype.S.call(this)
    }, s.fb = m(), s.eb = m(), s.s = function() {
        this.Q("mouseout", t.bind(this, function() {
            E(this.Fa), this.b.blur()
        })), this.xa ? I(this) : J(this)
    }, s.ea = function(e) {
        32 == e.which || 13 == e.which ? (this.xa ? I(this) : J(this), e.preventDefault()) : 27 == e.which && (this.xa && I(this), e.preventDefault())
    }, t.D = function(e) {
        "number" == typeof e ? this.code = e : "string" == typeof e ? this.message = e : "object" == typeof e && t.h.z(this, e), this.message || (this.message = t.D.Bd[this.code] || "")
    }, t.D.prototype.code = 0, t.D.prototype.message = "", t.D.prototype.status = k, t.D.Za = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "), t.D.Bd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var K = 0; K < t.D.Za.length; K++) t.D[t.D.Za[K]] = K, t.D.prototype[t.D.Za[K]] = K;
    var L, M, N, O;
    for (L = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], M = L[0], O = 0; O < L.length; O++)
        if (L[O][1] in document) {
            N = L[O];
            break
        }
    if (N)
        for (t.Va.Kb = {}, O = 0; O < N.length; O++) t.Va.Kb[M[O]] = N[O];
    t.Player = t.a.extend({
        i: function(e, i, n) {
            this.I = e, e.id = e.id || "vjs_video_" + t.q++, this.se = e && t.Ea(e), i = t.h.z(da(e), i), this.bb = i.language || t.options.language, this.Td = i.languages || t.options.languages, this.F = {}, this.Pc = i.poster || "", this.Db = !!i.controls, e.controls = l, i.Tc = l, P(this, "audio" === this.I.nodeName.toLowerCase()), t.a.call(this, this, i, n), this.n(this.controls() ? "vjs-controls-enabled" : "vjs-controls-disabled"), P(this) && this.n("vjs-audio"), t.Ga[this.K] = this, i.plugins && t.h.Y(i.plugins, function(e, t) {
                this[e](t)
            }, this);
            var a, r, o, s, c;
            a = t.bind(this, this.reportUserActivity), this.c("mousedown", function() {
                a(), this.clearInterval(r), r = this.setInterval(a, 250)
            }), this.c("mousemove", function(e) {
                (e.screenX != s || e.screenY != c) && (s = e.screenX, c = e.screenY, a())
            }), this.c("mouseup", function() {
                a(), this.clearInterval(r)
            }), this.c("keydown", a), this.c("keyup", a), this.setInterval(function() {
                if (this.ua) {
                    this.ua = l, this.userActive(f), this.clearTimeout(o);
                    var e = this.options().inactivityTimeout;
                    e > 0 && (o = this.setTimeout(function() {
                        this.ua || this.userActive(l)
                    }, e))
                }
            }, 250)
        }
    }), s = t.Player.prototype, s.language = function(e) {
        return e === b ? this.bb : (this.bb = e, this)
    }, s.languages = n("Td"), s.m = t.options, s.dispose = function() {
        this.l("dispose"), this.k("dispose"), t.Ga[this.K] = k, this.I && this.I.player && (this.I.player = k), this.b && this.b.player && (this.b.player = k), this.o && this.o.dispose(), t.a.prototype.dispose.call(this)
    }, s.e = function() {
        var e, i = this.b = t.a.prototype.e.call(this, "div"),
            n = this.I;
        if (n.removeAttribute("width"), n.removeAttribute("height"), n.hasChildNodes()) {
            var a, r, o, s, l;
            for (a = n.childNodes, r = a.length, l = []; r--;) o = a[r], s = o.nodeName.toLowerCase(), "track" === s && l.push(o);
            for (a = 0; a < l.length; a++) n.removeChild(l[a])
        }
        return e = t.Ea(n), t.h.Y(e, function(t) {
            "class" == t ? i.className = e[t] : i.setAttribute(t, e[t])
        }), n.id += "_html5_api", n.className = "vjs-tech", n.player = i.player = this, this.n("vjs-paused"), this.width(this.m.width, f), this.height(this.m.height, f), n.Md = n.networkState, n.parentNode && n.parentNode.insertBefore(i, n), t.Nb(n, i), this.b = i, this.c("loadstart", this.Zd), this.c("waiting", this.ee), this.c(["canplay", "canplaythrough", "playing", "ended"], this.de), this.c("seeking", this.be), this.c("seeked", this.ae), this.c("ended", this.Wd), this.c("play", this.Tb), this.c("firstplay", this.Xd), this.c("pause", this.Sb), this.c("progress", this.$d), this.c("durationchange", this.Mc), this.c("fullscreenchange", this.Yd), i
    }, s.Zd = function() {
        this.error(k), this.paused() ? (R(this, l), this.Q("play", function() {
            R(this, f)
        })) : this.l("firstplay")
    }, s.Fc = l, s.Tb = function() {
        this.r("vjs-paused"), this.n("vjs-playing")
    }, s.ee = function() {
        this.n("vjs-waiting")
    }, s.de = function() {
        this.r("vjs-waiting")
    }, s.be = function() {
        this.n("vjs-seeking")
    }, s.ae = function() {
        this.r("vjs-seeking")
    }, s.Xd = function() {
        this.m.starttime && this.currentTime(this.m.starttime), this.n("vjs-has-started")
    }, s.Sb = function() {
        this.r("vjs-playing"), this.n("vjs-paused")
    }, s.$d = function() {
        1 == this.bufferedPercent() && this.l("loadedalldata")
    }, s.Wd = function() {
        this.m.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
    }, s.Mc = function() {
        var e = S(this, "duration");
        e && (0 > e && (e = 1 / 0), this.duration(e), 1 / 0 === e ? this.n("vjs-live") : this.r("vjs-live"))
    }, s.Yd = function() {
        this.isFullscreen() ? this.n("vjs-fullscreen") : this.r("vjs-fullscreen")
    }, s.play = function() {
        return T(this, "play"), this
    }, s.pause = function() {
        return T(this, "pause"), this
    }, s.paused = function() {
        return S(this, "paused") === l ? l : f
    }, s.currentTime = function(e) {
        return e !== b ? (T(this, "setCurrentTime", e), this) : this.F.currentTime = S(this, "currentTime") || 0
    }, s.duration = function(e) {
        return e !== b ? (this.F.duration = parseFloat(e), this) : (this.F.duration === b && this.Mc(), this.F.duration || 0)
    }, s.remainingTime = function() {
        return this.duration() - this.currentTime()
    }, s.buffered = function() {
        var e = S(this, "buffered");
        return e && e.length || (e = t.Eb(0, 0)), e
    }, s.bufferedPercent = function() {
        var e, t, i = this.duration(),
            n = this.buffered(),
            a = 0;
        if (!i) return 0;
        for (var r = 0; r < n.length; r++) e = n.start(r), t = n.end(r), t > i && (t = i), a += t - e;
        return a / i
    }, s.volume = function(e) {
        return e !== b ? (e = Math.max(0, Math.min(1, parseFloat(e))), this.F.volume = e, T(this, "setVolume", e), t.je(e), this) : (e = parseFloat(S(this, "volume")), isNaN(e) ? 1 : e)
    }, s.muted = function(e) {
        return e !== b ? (T(this, "setMuted", e), this) : S(this, "muted") || l
    }, s.Ka = function() {
        return S(this, "supportsFullScreen") || l
    }, s.Ic = l, s.isFullscreen = function(e) {
        return e !== b ? (this.Ic = !!e, this) : this.Ic
    }, s.isFullScreen = function(e) {
        return t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(e)
    }, s.requestFullscreen = function() {
        var e = t.Va.Kb;
        return this.isFullscreen(f), e ? (t.c(document, e.fullscreenchange, t.bind(this, function() {
            this.isFullscreen(document[e.fullscreenElement]), this.isFullscreen() === l && t.k(document, e.fullscreenchange, arguments.callee), this.l("fullscreenchange")
        })), this.b[e.requestFullscreen]()) : this.o.Ka() ? T(this, "enterFullScreen") : (this.Bc(), this.l("fullscreenchange")), this
    }, s.requestFullScreen = function() {
        return t.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'), this.requestFullscreen()
    }, s.exitFullscreen = function() {
        var e = t.Va.Kb;
        return this.isFullscreen(l), e ? document[e.exitFullscreen]() : this.o.Ka() ? T(this, "exitFullScreen") : (this.Hb(), this.l("fullscreenchange")), this
    }, s.cancelFullScreen = function() {
        return t.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"), this.exitFullscreen()
    }, s.Bc = function() {
        this.Od = f, this.Ed = document.documentElement.style.overflow, t.c(document, "keydown", t.bind(this, this.Dc)), document.documentElement.style.overflow = "hidden", t.n(document.body, "vjs-full-window"), this.l("enterFullWindow")
    }, s.Dc = function(e) {
        27 === e.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : this.Hb())
    }, s.Hb = function() {
        this.Od = l, t.k(document, "keydown", this.Dc), document.documentElement.style.overflow = this.Ed, t.r(document.body, "vjs-full-window"), this.l("exitFullWindow")
    }, s.selectSource = function(e) {
        for (var i = 0, n = this.m.techOrder; i < n.length; i++) {
            var a = t.ba(n[i]),
                r = window.videojs[a];
            if (r) {
                if (r.isSupported())
                    for (var o = 0, s = e; o < s.length; o++) {
                        var c = s[o];
                        if (r.canPlaySource(c)) return {
                            source: c,
                            o: a
                        }
                    }
            } else t.log.error('The "' + a + '" tech is undefined. Skipped browser support check for that tech.')
        }
        return l
    }, s.src = function(e) {
        return e === b ? S(this, "src") : (t.h.isArray(e) ? U(this, e) : "string" == typeof e ? this.src({
            src: e
        }) : e instanceof Object && (e.type && !window.videojs[this.La].canPlaySource(e) ? U(this, [e]) : (this.F.src = e.src, this.xc = e.type || "", this.H(function() {
            window.videojs[this.La].prototype.hasOwnProperty("setSource") ? T(this, "setSource", e) : T(this, "src", e.src), "auto" == this.m.preload && this.load(), this.m.autoplay && this.play()
        }))), this)
    }, s.load = function() {
        return T(this, "load"), this
    }, s.currentSrc = function() {
        return S(this, "currentSrc") || this.F.src || ""
    }, s.zd = function() {
        return this.xc || ""
    }, s.Ha = function(e) {
        return e !== b ? (T(this, "setPreload", e), this.m.preload = e, this) : S(this, "preload")
    }, s.autoplay = function(e) {
        return e !== b ? (T(this, "setAutoplay", e), this.m.autoplay = e, this) : S(this, "autoplay")
    }, s.loop = function(e) {
        return e !== b ? (T(this, "setLoop", e), this.m.loop = e, this) : S(this, "loop")
    }, s.poster = function(e) {
        return e === b ? this.Pc : (e || (e = ""), this.Pc = e, T(this, "setPoster", e), this.l("posterchange"), this)
    }, s.controls = function(e) {
        return e !== b ? (e = !!e, this.Db !== e && ((this.Db = e) ? (this.r("vjs-controls-disabled"), this.n("vjs-controls-enabled"), this.l("controlsenabled")) : (this.r("vjs-controls-enabled"), this.n("vjs-controls-disabled"), this.l("controlsdisabled"))), this) : this.Db
    }, t.Player.prototype.Zb, s = t.Player.prototype, s.usingNativeControls = function(e) {
        return e !== b ? (e = !!e, this.Zb !== e && ((this.Zb = e) ? (this.n("vjs-using-native-controls"), this.l("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.l("usingcustomcontrols"))), this) : this.Zb
    }, s.da = k, s.error = function(e) {
        return e === b ? this.da : e === k ? (this.da = e, this.r("vjs-error"), this) : (this.da = e instanceof t.D ? e : new t.D(e), this.l("error"), this.n("vjs-error"), t.log.error("(CODE:" + this.da.code + " " + t.D.Za[this.da.code] + ")", this.da.message, this.da), this)
    }, s.ended = function() {
        return S(this, "ended")
    }, s.seeking = function() {
        return S(this, "seeking")
    }, s.ua = f, s.reportUserActivity = function() {
        this.ua = f
    }, s.Yb = f, s.userActive = function(e) {
        return e !== b ? (e = !!e, e !== this.Yb && ((this.Yb = e) ? (this.ua = f, this.r("vjs-user-inactive"), this.n("vjs-user-active"), this.l("useractive")) : (this.ua = l, this.o && this.o.Q("mousemove", function(e) {
            e.stopPropagation(), e.preventDefault()
        }), this.r("vjs-user-active"), this.n("vjs-user-inactive"), this.l("userinactive"))), this) : this.Yb
    }, s.playbackRate = function(e) {
        return e !== b ? (T(this, "setPlaybackRate", e), this) : this.o && this.o.featuresPlaybackRate ? S(this, "playbackRate") : 1
    }, s.Hc = l, t.Qa = t.a.extend(), t.Qa.prototype.m = {
        Ie: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    }, t.Qa.prototype.e = function() {
        return t.e("div", {
            className: "vjs-control-bar"
        })
    }, t.ec = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.ec.prototype.e = function() {
        var e = t.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        return this.v = t.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Stream Type") + "</span>" + this.t("LIVE"),
            "aria-live": "off"
        }), e.appendChild(this.v), e
    }, t.hc = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i), this.c(e, "play", this.Tb), this.c(e, "pause", this.Sb)
        }
    }), s = t.hc.prototype, s.la = "Play", s.S = function() {
        return "vjs-play-control " + t.u.prototype.S.call(this)
    }, s.s = function() {
        this.d.paused() ? this.d.play() : this.d.pause()
    }, s.Tb = function() {
        this.r("vjs-paused"), this.n("vjs-playing"), this.b.children[0].children[0].innerHTML = this.t("Pause")
    }, s.Sb = function() {
        this.r("vjs-playing"), this.n("vjs-paused"), this.b.children[0].children[0].innerHTML = this.t("Play")
    }, t.nb = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.c(e, "timeupdate", this.ia)
        }
    }), t.nb.prototype.e = function() {
        var e = t.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        return this.v = t.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        }), e.appendChild(this.v), e
    }, t.nb.prototype.ia = function() {
        var e = this.d.ib ? this.d.F.currentTime : this.d.currentTime();
        this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Current Time") + "</span> " + t.Da(e, this.d.duration())
    }, t.ob = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.c(e, "timeupdate", this.ia)
        }
    }), t.ob.prototype.e = function() {
        var e = t.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        return this.v = t.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Duration Time") + "</span> 0:00",
            "aria-live": "off"
        }), e.appendChild(this.v), e
    }, t.ob.prototype.ia = function() {
        var e = this.d.duration();
        e && (this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Duration Time") + "</span> " + t.Da(e))
    }, t.nc = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.nc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    }, t.vb = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.c(e, "timeupdate", this.ia)
        }
    }), t.vb.prototype.e = function() {
        var e = t.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        return this.v = t.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Remaining Time") + "</span> -0:00",
            "aria-live": "off"
        }), e.appendChild(this.v), e
    }, t.vb.prototype.ia = function() {
        this.d.duration() && (this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Remaining Time") + "</span> -" + t.Da(this.d.remainingTime()))
    }, t.Ra = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i)
        }
    }), t.Ra.prototype.la = "Fullscreen", t.Ra.prototype.S = function() {
        return "vjs-fullscreen-control " + t.u.prototype.S.call(this)
    }, t.Ra.prototype.s = function() {
        this.d.isFullscreen() ? (this.d.exitFullscreen(), this.Cb.innerHTML = this.t("Fullscreen")) : (this.d.requestFullscreen(), this.Cb.innerHTML = this.t("Non-Fullscreen"))
    }, t.ub = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.ub.prototype.m = {
        children: {
            seekBar: {}
        }
    }, t.ub.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        })
    }, t.kc = t.R.extend({
        i: function(e, i) {
            t.R.call(this, e, i), this.c(e, "timeupdate", this.ta), e.H(t.bind(this, this.ta))
        }
    }), s = t.kc.prototype, s.m = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    }, s.Oc = "timeupdate", s.e = function() {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        })
    }, s.ta = function() {
        var e = this.d.ib ? this.d.F.currentTime : this.d.currentTime();
        this.b.setAttribute("aria-valuenow", t.round(100 * this.Lb(), 2)), this.b.setAttribute("aria-valuetext", t.Da(e, this.d.duration()))
    }, s.Lb = function() {
        return this.d.currentTime() / this.d.duration()
    }, s.gb = function(e) {
        t.R.prototype.gb.call(this, e), this.d.ib = f, this.xe = !this.d.paused(), this.d.pause()
    }, s.fa = function(e) {
        e = H(this, e) * this.d.duration(), e == this.d.duration() && (e -= .1), this.d.currentTime(e)
    }, s.ra = function(e) {
        t.R.prototype.ra.call(this, e), this.d.ib = l, this.xe && this.d.play()
    }, s.Zc = function() {
        this.d.currentTime(this.d.currentTime() + 5)
    }, s.Yc = function() {
        this.d.currentTime(this.d.currentTime() - 5)
    }, t.rb = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.c(e, "progress", this.update)
        }
    }), t.rb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.t("Loaded") + "</span>: 0%</span>"
        })
    }, t.rb.prototype.update = function() {
        var e, i, n, a, r = this.d.buffered();
        e = this.d.duration();
        var o, s = this.d;
        for (o = s.buffered(), s = s.duration(), o = o.end(o.length - 1), o > s && (o = s), s = this.b.children, this.b.style.width = 100 * (o / e || 0) + "%", e = 0; e < r.length; e++) i = r.start(e), n = r.end(e), (a = s[e]) || (a = this.b.appendChild(t.e())), a.style.left = 100 * (i / o || 0) + "%", a.style.width = 100 * ((n - i) / o || 0) + "%";
        for (e = s.length; e > r.length; e--) this.b.removeChild(s[e - 1])
    }, t.gc = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.gc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.t("Progress") + "</span>: 0%</span>"
        })
    }, t.Sa = t.$.extend({
        i: function(e, i) {
            t.$.call(this, e, i), this.c(e, "timeupdate", this.ia)
        }
    }), t.Sa.prototype.defaultValue = "00:00", t.Sa.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        })
    }, t.Sa.prototype.ia = function() {
        var e = this.d.ib ? this.d.F.currentTime : this.d.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + t.Da(e, this.d.duration()) + "</span>"
    }, t.yb = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), e.o && e.o.featuresVolumeControl === l && this.n("vjs-hidden"), this.c(e, "loadstart", function() {
                e.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            })
        }
    }), t.yb.prototype.m = {
        children: {
            volumeBar: {}
        }
    }, t.yb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        })
    }, t.xb = t.R.extend({
        i: function(e, i) {
            t.R.call(this, e, i), this.c(e, "volumechange", this.ta), e.H(t.bind(this, this.ta))
        }
    }), s = t.xb.prototype, s.ta = function() {
        this.b.setAttribute("aria-valuenow", t.round(100 * this.d.volume(), 2)), this.b.setAttribute("aria-valuetext", t.round(100 * this.d.volume(), 2) + "%")
    }, s.m = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    }, s.Oc = "volumechange", s.e = function() {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        })
    }, s.fa = function(e) {
        this.d.muted() && this.d.muted(l), this.d.volume(H(this, e))
    }, s.Lb = function() {
        return this.d.muted() ? 0 : this.d.volume()
    }, s.Zc = function() {
        this.d.volume(this.d.volume() + .1)
    }, s.Yc = function() {
        this.d.volume(this.d.volume() - .1)
    }, t.oc = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.oc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    }, t.zb = t.$.extend(), t.zb.prototype.defaultValue = "00:00", t.zb.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        })
    }, t.ka = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i), this.c(e, "volumechange", this.update), e.o && e.o.featuresVolumeControl === l && this.n("vjs-hidden"), this.c(e, "loadstart", function() {
                e.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            })
        }
    }), t.ka.prototype.e = function() {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.t("Mute") + "</span></div>"
        })
    }, t.ka.prototype.s = function() {
        this.d.muted(this.d.muted() ? l : f)
    }, t.ka.prototype.update = function() {
        var e = this.d.volume(),
            i = 3;
        for (0 === e || this.d.muted() ? i = 0 : .33 > e ? i = 1 : .67 > e && (i = 2), this.d.muted() ? this.b.children[0].children[0].innerHTML != this.t("Unmute") && (this.b.children[0].children[0].innerHTML = this.t("Unmute")) : this.b.children[0].children[0].innerHTML != this.t("Mute") && (this.b.children[0].children[0].innerHTML = this.t("Mute")), e = 0; 4 > e; e++) t.r(this.b, "vjs-vol-" + e);
        t.n(this.b, "vjs-vol-" + i)
    }, t.wa = t.L.extend({
        i: function(e, i) {
            t.L.call(this, e, i), this.c(e, "volumechange", this.update), e.o && e.o.featuresVolumeControl === l && this.n("vjs-hidden"), this.c(e, "loadstart", function() {
                e.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            }), this.n("vjs-menu-button")
        }
    }), t.wa.prototype.Aa = function() {
        var e = new t.ja(this.d, {
                uc: "div"
            }),
            i = new t.xb(this.d, this.m.volumeBar);
        return i.c("focus", function() {
            e.n("vjs-lock-showing")
        }), i.c("blur", function() {
            E(e)
        }), e.U(i), e
    }, t.wa.prototype.s = function() {
        t.ka.prototype.s.call(this), t.L.prototype.s.call(this)
    }, t.wa.prototype.e = function() {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.t("Mute") + "</span></div>"
        })
    }, t.wa.prototype.update = t.ka.prototype.update, t.ic = t.L.extend({
        i: function(e, i) {
            t.L.call(this, e, i), this.cd(), this.bd(), this.c(e, "loadstart", this.cd), this.c(e, "ratechange", this.bd)
        }
    }), s = t.ic.prototype, s.la = "Playback Rate", s.className = "vjs-playback-rate", s.e = function() {
        var e = t.L.prototype.e.call(this);
        return this.Kc = t.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        }), e.appendChild(this.Kc), e
    }, s.Aa = function() {
        var e = new t.ja(this.j()),
            i = this.j().options().playbackRates;
        if (i)
            for (var n = i.length - 1; n >= 0; n--) e.U(new t.tb(this.j(), {
                rate: i[n] + "x"
            }));
        return e
    }, s.ta = function() {
        this.w().setAttribute("aria-valuenow", this.j().playbackRate())
    }, s.s = function() {
        for (var e = this.j().playbackRate(), t = this.j().options().playbackRates, i = t[0], n = 0; n < t.length; n++)
            if (t[n] > e) {
                i = t[n];
                break
            }
        this.j().playbackRate(i)
    }, s.cd = function() {
        ea(this) ? this.r("vjs-hidden") : this.n("vjs-hidden")
    }, s.bd = function() {
        ea(this) && (this.Kc.innerHTML = this.j().playbackRate() + "x")
    }, t.tb = t.J.extend({
        uc: "button",
        i: function(e, i) {
            var n = this.label = i.rate,
                a = this.Rc = parseFloat(n, 10);
            i.label = n, i.selected = 1 === a, t.J.call(this, e, i), this.c(e, "ratechange", this.update)
        }
    }), t.tb.prototype.s = function() {
        t.J.prototype.s.call(this), this.j().playbackRate(this.Rc)
    }, t.tb.prototype.update = function() {
        this.selected(this.j().playbackRate() == this.Rc)
    }, t.jc = t.u.extend({
        i: function(e, i) {
            t.u.call(this, e, i), this.update(), e.c("posterchange", t.bind(this, this.update))
        }
    }), s = t.jc.prototype, s.dispose = function() {
        this.j().k("posterchange", this.update), t.u.prototype.dispose.call(this)
    }, s.e = function() {
        var e = t.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        return t.fd || (this.Ib = t.e("img"), e.appendChild(this.Ib)), e
    }, s.update = function() {
        var e = this.j().poster();
        this.ga(e), e ? this.b.style.display = "" : this.Z()
    }, s.ga = function(e) {
        var t;
        this.Ib ? this.Ib.src = e : (t = "", e && (t = 'url("' + e + '")'), this.b.style.backgroundImage = t)
    }, s.s = function() {
        this.d.play()
    }, t.fc = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i)
        }
    }), t.fc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        })
    }, t.lb = t.u.extend(), t.lb.prototype.e = function() {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        })
    }, t.lb.prototype.s = function() {
        this.d.play()
    }, t.pb = t.a.extend({
        i: function(e, i) {
            t.a.call(this, e, i), this.update(), this.c(e, "error", this.update)
        }
    }), t.pb.prototype.e = function() {
        var e = t.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        return this.v = t.e("div"), e.appendChild(this.v), e
    }, t.pb.prototype.update = function() {
        this.j().error() && (this.v.innerHTML = this.t(this.j().error().message))
    }, t.p = t.a.extend({
        i: function(e, i, n) {
            i = i || {}, i.Tc = l, t.a.call(this, e, i, n), this.featuresProgressEvents || (this.Lc = f, this.Qc = this.setInterval(function() {
                var e = this.j().bufferedPercent();
                this.vd != e && this.j().l("progress"), this.vd = e, 1 === e && this.clearInterval(this.Qc)
            }, 500)), this.featuresTimeupdateEvents || (e = this.d, this.Rb = f, this.c(e, "play", this.ad), this.c(e, "pause", this.kb), this.Q("timeupdate", function() {
                this.featuresTimeupdateEvents = f, fa(this)
            }));
            var a;
            a = this.j(), e = function() {
                if (a.controls() && !a.usingNativeControls()) {
                    var e;
                    this.c("mousedown", this.s), this.c("touchstart", function() {
                        e = this.d.userActive()
                    }), this.c("touchmove", function() {
                        e && this.j().reportUserActivity()
                    }), this.c("touchend", function(e) {
                        e.preventDefault()
                    }), G(this), this.c("tap", this.ce)
                }
            }, this.H(e), this.c(a, "controlsenabled", e), this.c(a, "controlsdisabled", this.he), this.H(function() {
                this.networkState && 0 < this.networkState() && this.j().l("loadstart")
            })
        }
    }), s = t.p.prototype, s.he = function() {
        this.k("tap"), this.k("touchstart"), this.k("touchmove"), this.k("touchleave"), this.k("touchcancel"), this.k("touchend"), this.k("click"), this.k("mousedown")
    }, s.s = function(e) {
        0 === e.button && this.j().controls() && (this.j().paused() ? this.j().play() : this.j().pause())
    }, s.ce = function() {
        this.j().userActive(!this.j().userActive())
    }, s.ad = function() {
        this.wc && this.kb(), this.wc = this.setInterval(function() {
            this.j().l("timeupdate")
        }, 250)
    }, s.kb = function() {
        this.clearInterval(this.wc), this.j().l("timeupdate")
    }, s.dispose = function() {
        this.Lc && (this.Lc = l, this.clearInterval(this.Qc)), this.Rb && fa(this), t.a.prototype.dispose.call(this)
    }, s.Wb = function() {
        this.Rb && this.j().l("timeupdate")
    }, s.Vc = m(), t.p.prototype.featuresVolumeControl = f, t.p.prototype.featuresFullscreenResize = l, t.p.prototype.featuresPlaybackRate = l, t.p.prototype.featuresProgressEvents = l, t.p.prototype.featuresTimeupdateEvents = l, t.p.$b = function(e) {
        e.Ia = function(t, i) {
            var n = e.Wc;
            n || (n = e.Wc = []), i === b && (i = n.length), n.splice(i, 0, t)
        }, e.jb = function(t) {
            for (var i, n = e.Wc || [], a = 0; a < n.length; a++)
                if (i = n[a].Wa(t)) return n[a];
            return k
        }, e.rc = function(t) {
            var i = e.jb(t);
            return i ? i.Wa(t) : ""
        }, e.prototype.Ja = function(t) {
            var i = e.jb(t);
            return this.Ba(), this.k("dispose", this.Ba), this.vc = t, this.Xb = i.Mb(t, this), this.c("dispose", this.Ba), this
        }, e.prototype.Ba = function() {
            this.Xb && this.Xb.dispose && this.Xb.dispose()
        }
    }, t.g = t.p.extend({
        i: function(e, i, n) {
            for (t.p.call(this, e, i, n), n = t.g.qb.length - 1; n >= 0; n--) this.c(t.g.qb[n], this.Fd);
            if ((i = i.source) && (this.b.currentSrc !== i.src || e.I && 3 === e.I.Md) && this.Ja(i), t.wb && e.options().nativeControlsForTouch === f) {
                var a, r, o, s;
                a = this, r = this.j(), i = r.controls(), a.b.controls = !!i, o = function() {
                    a.b.controls = f
                }, s = function() {
                    a.b.controls = l
                }, r.c("controlsenabled", o), r.c("controlsdisabled", s), i = function() {
                    r.k("controlsenabled", o), r.k("controlsdisabled", s)
                }, a.c("dispose", i), r.c("usingcustomcontrols", i), r.usingNativeControls(f)
            }
            e.H(function() {
                this.I && this.m.autoplay && this.paused() && (delete this.I.poster, this.play())
            }), this.Na()
        }
    }), s = t.g.prototype, s.dispose = function() {
        t.g.Gb(this.b), t.p.prototype.dispose.call(this)
    }, s.e = function() {
        var e, i = this.d,
            n = i.I;
        n && this.movingMediaElementInDOM !== l || (n ? (e = n.cloneNode(l), t.g.Gb(n), n = e, i.I = k) : (n = t.e("video"), e = videojs.W.pa({}, i.se), (!t.wb || i.options().nativeControlsForTouch !== f) && delete e.controls, t.Uc(n, t.h.z(e, {
            id: i.id() + "_html5_api",
            "class": "vjs-tech"
        }))), n.player = i, t.Nb(n, i.w())), e = ["autoplay", "preload", "loop", "muted"];
        for (var a = e.length - 1; a >= 0; a--) {
            var r = e[a],
                o = {};
            "undefined" != typeof i.m[r] && (o[r] = i.m[r]), t.Uc(n, o)
        }
        return n
    }, s.Fd = function(e) {
        "error" == e.type && this.error() ? this.j().error(this.error().code) : (e.bubbles = l, this.j().l(e))
    }, s.play = function() {
        this.b.play()
    }, s.pause = function() {
        this.b.pause()
    }, s.paused = function() {
        return this.b.paused
    }, s.currentTime = function() {
        return this.b.currentTime
    }, s.Wb = function(e) {
        try {
            this.b.currentTime = e
        } catch (i) {
            t.log(i, "Video is not ready. (Video.js)")
        }
    }, s.duration = function() {
        return this.b.duration || 0
    }, s.buffered = function() {
        return this.b.buffered
    }, s.volume = function() {
        return this.b.volume
    }, s.oe = function(e) {
        this.b.volume = e
    }, s.muted = function() {
        return this.b.muted
    }, s.le = function(e) {
        this.b.muted = e
    }, s.width = function() {
        return this.b.offsetWidth
    }, s.height = function() {
        return this.b.offsetHeight
    }, s.Ka = function() {
        return "function" != typeof this.b.webkitEnterFullScreen || !/Android/.test(t.N) && /Chrome|Mac OS X 10.5/.test(t.N) ? l : f
    }, s.Ac = function() {
        var e = this.b;
        "webkitDisplayingFullscreen" in e && this.Q("webkitbeginfullscreen", function() {
            this.d.isFullscreen(f), this.Q("webkitendfullscreen", function() {
                this.d.isFullscreen(l), this.d.l("fullscreenchange")
            }), this.d.l("fullscreenchange")
        }), e.paused && e.networkState <= e.ze ? (this.b.play(), this.setTimeout(function() {
            e.pause(), e.webkitEnterFullScreen()
        }, 0)) : e.webkitEnterFullScreen()
    }, s.Gd = function() {
        this.b.webkitExitFullScreen()
    }, s.src = function(e) {
        return e === b ? this.b.src : void this.ga(e)
    }, s.ga = function(e) {
        this.b.src = e
    }, s.load = function() {
        this.b.load()
    }, s.currentSrc = function() {
        return this.b.currentSrc
    }, s.poster = function() {
        return this.b.poster
    }, s.Vc = function(e) {
        this.b.poster = e
    }, s.Ha = function() {
        return this.b.Ha
    }, s.ne = function(e) {
        this.b.Ha = e
    }, s.autoplay = function() {
        return this.b.autoplay
    }, s.ie = function(e) {
        this.b.autoplay = e
    }, s.controls = function() {
        return this.b.controls
    }, s.loop = function() {
        return this.b.loop
    }, s.ke = function(e) {
        this.b.loop = e
    }, s.error = function() {
        return this.b.error
    }, s.seeking = function() {
        return this.b.seeking
    }, s.ended = function() {
        return this.b.ended
    }, s.playbackRate = function() {
        return this.b.playbackRate
    }, s.me = function(e) {
        this.b.playbackRate = e
    }, s.networkState = function() {
        return this.b.networkState
    }, t.g.isSupported = function() {
        try {
            t.A.volume = .5
        } catch (e) {
            return l
        }
        return !!t.A.canPlayType
    }, t.p.$b(t.g), t.g.V = {}, t.g.V.Wa = function(e) {
        function i(e) {
            try {
                return t.A.canPlayType(e)
            } catch (i) {
                return ""
            }
        }
        return e.type ? i(e.type) : e.src ? (e = (e = e.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i)) && e[1], i("video/" + e)) : ""
    }, t.g.V.Mb = function(e, t) {
        t.ga(e.src)
    }, t.g.V.dispose = m(), t.g.Ia(t.g.V), t.g.xd = function() {
        var e = t.A.volume;
        return t.A.volume = e / 2 + .1, e !== t.A.volume
    }, t.g.wd = function() {
        var e = t.A.playbackRate;
        return t.A.playbackRate = e / 2 + .1, e !== t.A.playbackRate
    }, t.g.prototype.featuresVolumeControl = t.g.xd(), t.g.prototype.featuresPlaybackRate = t.g.wd(), t.g.prototype.movingMediaElementInDOM = !t.kd, t.g.prototype.featuresFullscreenResize = f, t.g.prototype.featuresProgressEvents = f;
    var V, ga = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
        ha = /^video\/mp4/i;
    t.g.Nc = function() {
        4 <= t.ac && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(e) {
            return e && ga.test(e) ? "maybe" : V.call(this, e)
        }), t.od && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(e) {
            return e && ha.test(e) ? "maybe" : V.call(this, e)
        })
    }, t.g.we = function() {
        var e = t.A.constructor.prototype.canPlayType;
        return t.A.constructor.prototype.canPlayType = V, V = k, e
    }, t.g.Nc(), t.g.qb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), t.g.Gb = function(e) {
        if (e) {
            for (e.player = k, e.parentNode && e.parentNode.removeChild(e); e.hasChildNodes();) e.removeChild(e.firstChild);
            if (e.removeAttribute("src"), "function" == typeof e.load) try {
                e.load()
            } catch (t) {}
        }
    }, t.f = t.p.extend({
        i: function(e, i, n) {
            t.p.call(this, e, i, n);
            var a = i.source;
            n = i.parentEl;
            var r = this.b = t.e("div", {
                    id: e.id() + "_temp_flash"
                }),
                o = e.id() + "_flash_api",
                s = e.m,
                s = t.h.z({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: s.autoplay,
                    preload: s.Ha,
                    loop: s.loop,
                    muted: s.muted
                }, i.flashVars),
                c = t.h.z({
                    wmode: "opaque",
                    bgcolor: "#000000"
                }, i.params),
                o = t.h.z({
                    id: o,
                    name: o,
                    "class": "vjs-tech"
                }, i.attributes);
            a && this.H(function() {
                this.Ja(a)
            }), t.Nb(r, n), i.startTime && this.H(function() {
                this.load(), this.play(), this.currentTime(i.startTime)
            }), t.jd && this.H(function() {
                this.c("mousemove", function() {
                    this.j().l({
                        type: "mousemove",
                        bubbles: l
                    })
                })
            }), e.c("stageclick", e.reportUserActivity), this.b = t.f.zc(i.swf, r, s, c, o)
        }
    }), s = t.f.prototype, s.dispose = function() {
        t.p.prototype.dispose.call(this)
    }, s.play = function() {
        this.b.vjs_play()
    }, s.pause = function() {
        this.b.vjs_pause()
    }, s.src = function(e) {
        return e === b ? this.currentSrc() : this.ga(e)
    }, s.ga = function(e) {
        if (e = t.Jd(e), this.b.vjs_src(e), this.d.autoplay()) {
            var i = this;
            this.setTimeout(function() {
                i.play()
            }, 0)
        }
    }, t.f.prototype.setCurrentTime = function(e) {
        this.Ud = e, this.b.vjs_setProperty("currentTime", e), t.p.prototype.Wb.call(this)
    }, t.f.prototype.currentTime = function() {
        return this.seeking() ? this.Ud || 0 : this.b.vjs_getProperty("currentTime")
    }, t.f.prototype.currentSrc = function() {
        return this.vc ? this.vc.src : this.b.vjs_getProperty("currentSrc")
    }, t.f.prototype.load = function() {
        this.b.vjs_load()
    }, t.f.prototype.poster = function() {
        this.b.vjs_getProperty("poster")
    }, t.f.prototype.setPoster = m(), t.f.prototype.buffered = function() {
        return t.Eb(0, this.b.vjs_getProperty("buffered"))
    }, t.f.prototype.Ka = r(l), t.f.prototype.Ac = r(l);
    var ka = t.f.prototype,
        W = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
        ma = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
        X;
    for (X = 0; X < W.length; X++) la(W[X]), ia();
    for (X = 0; X < ma.length; X++) la(ma[X]);
    if (t.f.isSupported = function() {
            return 10 <= t.f.version()[0]
        }, t.p.$b(t.f), t.f.V = {}, t.f.V.Wa = function(e) {
            return e.type && e.type.replace(/;.*/, "").toLowerCase() in t.f.Id ? "maybe" : ""
        }, t.f.V.Mb = function(e, t) {
            t.ga(e.src)
        }, t.f.V.dispose = m(), t.f.Ia(t.f.V), t.f.Id = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        }, t.f.onReady = function(e) {
            var i;
            (i = (e = t.w(e)) && e.parentNode && e.parentNode.player) && (e.player = i, t.f.checkReady(i.o))
        }, t.f.checkReady = function(e) {
            e.w() && (e.w().vjs_getProperty ? e.Na() : this.setTimeout(function() {
                t.f.checkReady(e)
            }, 50))
        }, t.f.onEvent = function(e, i) {
            t.w(e).player.l(i)
        }, t.f.onError = function(e, i) {
            var n = t.w(e).player,
                a = "FLASH: " + i;
            n.error("srcnotfound" == i ? {
                code: 4,
                message: a
            } : a)
        }, t.f.version = function() {
            var e = "0,0,0";
            try {
                e = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            } catch (t) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (e = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                } catch (i) {}
            }
            return e.split(",")
        }, t.f.zc = function(e, i, n, a, r) {
            e = t.f.Ld(e, n, a, r), e = t.e("div", {
                innerHTML: e
            }).childNodes[0], n = i.parentNode, i.parentNode.replaceChild(e, i);
            var o = n.childNodes[0];
            return setTimeout(function() {
                o.style.display = "block"
            }, 1e3), e
        }, t.f.Ld = function(e, i, n, a) {
            var r = "",
                o = "",
                s = "";
            return i && t.h.Y(i, function(e, t) {
                r += e + "=" + t + "&amp;"
            }), n = t.h.z({
                movie: e,
                flashvars: r,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, n), t.h.Y(n, function(e, t) {
                o += '<param name="' + e + '" value="' + t + '" />'
            }), a = t.h.z({
                data: e,
                width: "100%",
                height: "100%"
            }, a), t.h.Y(a, function(e, t) {
                s += e + '="' + t + '" '
            }), '<object type="application/x-shockwave-flash" ' + s + ">" + o + "</object>"
        }, t.f.qe = {
            "rtmp/mp4": "MP4",
            "rtmp/flv": "FLV"
        }, t.f.Je = function(e, t) {
            return e + "&" + t
        }, t.f.pe = function(e) {
            var t = {
                tc: "",
                $c: ""
            };
            if (!e) return t;
            var i, n = e.indexOf("&");
            return -1 !== n ? i = n + 1 : (n = i = e.lastIndexOf("/") + 1, 0 === n && (n = i = e.length)), t.tc = e.substring(0, n), t.$c = e.substring(i, e.length), t
        }, t.f.Rd = function(e) {
            return e in t.f.qe
        }, t.f.qd = /^rtmp[set]?:\/\//i, t.f.Qd = function(e) {
            return t.f.qd.test(e)
        }, t.f.Vb = {}, t.f.Vb.Wa = function(e) {
            return t.f.Rd(e.type) || t.f.Qd(e.src) ? "maybe" : ""
        }, t.f.Vb.Mb = function(e, i) {
            var n = t.f.pe(e.src);
            i.setRtmpConnection(n.tc), i.setRtmpStream(n.$c)
        }, t.f.Ia(t.f.Vb), t.pd = t.a.extend({
            i: function(e, i, n) {
                if (t.a.call(this, e, i, n), e.m.sources && 0 !== e.m.sources.length) e.src(e.m.sources);
                else
                    for (i = 0, n = e.m.techOrder; i < n.length; i++) {
                        var a = t.ba(n[i]),
                            r = window.videojs[a];
                        if (r && r.isSupported()) {
                            Q(e, a);
                            break
                        }
                    }
            }
        }), t.Player.prototype.textTracks = function() {
            return this.Ma = this.Ma || []
        }, t.B = t.a.extend({
            i: function(e, i) {
                t.a.call(this, e, i), this.K = i.id || "vjs_" + i.kind + "_" + i.language + "_" + t.q++, this.Xc = i.src, this.Cd = i["default"] || i.dflt, this.ue = i.title, this.bb = i.srclang, this.Sd = i.label, this.ca = [], this.Ab = [], this.qa = this.sa = 0, e.c("dispose", t.bind(this, this.yc, this.K))
            }
        }), s = t.B.prototype, s.M = n("G"), s.src = n("Xc"), s.Fb = n("Cd"), s.title = n("ue"), s.language = n("bb"), s.label = n("Sd"), s.yd = n("ca"), s.rd = n("Ab"), s.readyState = n("sa"), s.mode = n("qa"), s.e = function() {
            return t.a.prototype.e.call(this, "div", {
                className: "vjs-" + this.G + " vjs-text-track"
            })
        }, s.show = function() {
            oa(this), this.qa = 2, t.a.prototype.show.call(this)
        }, s.Z = function() {
            oa(this), this.qa = 1, t.a.prototype.Z.call(this)
        }, s.disable = function() {
            2 == this.qa && this.Z(), this.yc(), this.qa = 0
        }, s.yc = function() {
            this.d.k("timeupdate", t.bind(this, this.update, this.K)), this.d.k("ended", t.bind(this, this.reset, this.K)), this.reset(), this.d.na("textTrackDisplay").removeChild(this)
        }, s.load = function() {
            0 === this.sa && (this.sa = 1, t.ye(this.Xc, t.bind(this, function(e, i, n) {
                if (e) this.error = e, this.sa = 3, this.l("error");
                else {
                    var a, r;
                    e = n.split("\n"), i = "", n = 1;
                    for (var o = e.length; o > n; n++)
                        if (i = t.trim(e[n])) {
                            for (-1 == i.indexOf("-->") ? (a = i, i = t.trim(e[++n])) : a = this.ca.length, a = {
                                    id: a,
                                    index: this.ca.length
                                }, r = i.split(/[\t ]+/), a.startTime = pa(r[0]), a.Ca = pa(r[2]), r = []; e[++n] && (i = t.trim(e[n]));) r.push(i);
                            a.text = r.join("<br/>"), this.ca.push(a)
                        }
                    this.sa = 2, this.l("loaded")
                }
            })))
        }, s.update = function() {
            if (0 < this.ca.length) {
                var e = this.d.options().trackTimeOffset || 0,
                    e = this.d.currentTime() + e;
                if (this.Ub === b || e < this.Ub || this.cb <= e) {
                    var t, i, n, a, r = this.ca,
                        o = this.d.duration(),
                        s = 0,
                        c = l,
                        u = [];
                    for (e >= this.cb || this.cb === b ? a = this.Jb !== b ? this.Jb : 0 : (c = f, a = this.Qb !== b ? this.Qb : r.length - 1);;) {
                        if (n = r[a], n.Ca <= e) s = Math.max(s, n.Ca), n.Ua && (n.Ua = l);
                        else if (e < n.startTime) {
                            if (o = Math.min(o, n.startTime), n.Ua && (n.Ua = l), !c) break
                        } else c ? (u.splice(0, 0, n), i === b && (i = a), t = a) : (u.push(n), t === b && (t = a), i = a), o = Math.min(o, n.Ca), s = Math.max(s, n.startTime), n.Ua = f;
                        if (c) {
                            if (0 === a) break;
                            a--
                        } else {
                            if (a === r.length - 1) break;
                            a++
                        }
                    }
                    for (this.Ab = u, this.cb = o, this.Ub = s, this.Jb = t, this.Qb = i, t = this.Ab, i = "", e = 0, r = t.length; r > e; e++) i += '<span class="vjs-tt-cue">' + t[e].text + "</span>";
                    this.b.innerHTML = i, this.l("cuechange")
                }
            }
        }, s.reset = function() {
            this.cb = 0, this.Ub = this.d.duration(), this.Qb = this.Jb = 0
        }, t.cc = t.B.extend(), t.cc.prototype.G = "captions", t.lc = t.B.extend(), t.lc.prototype.G = "subtitles", t.dc = t.B.extend(), t.dc.prototype.G = "chapters", t.mc = t.a.extend({
            i: function(e, i, n) {
                if (t.a.call(this, e, i, n), e.m.tracks && 0 < e.m.tracks.length) {
                    i = this.d, e = e.m.tracks;
                    for (var a = 0; a < e.length; a++) n = e[a], na(i, n.kind, n.label, n.language, n)
                }
            }
        }), t.mc.prototype.e = function() {
            return t.a.prototype.e.call(this, "div", {
                className: "vjs-text-track-display"
            })
        }, t.aa = t.J.extend({
            i: function(e, i) {
                var n = this.ha = i.track;
                i.label = n.label(), i.selected = n.Fb(), t.J.call(this, e, i), this.c(e, n.M() + "trackchange", this.update)
            }
        }), t.aa.prototype.s = function() {
            t.J.prototype.s.call(this), Y(this.d, this.ha.K, this.ha.M())
        }, t.aa.prototype.update = function() {
            this.selected(2 == this.ha.mode())
        }, t.sb = t.aa.extend({
            i: function(e, i) {
                i.track = {
                    M: function() {
                        return i.kind
                    },
                    j: e,
                    label: function() {
                        return i.kind + " off"
                    },
                    Fb: r(l),
                    mode: r(l)
                }, t.aa.call(this, e, i), this.selected(f)
            }
        }), t.sb.prototype.s = function() {
            t.aa.prototype.s.call(this), Y(this.d, this.ha.K, this.ha.M())
        }, t.sb.prototype.update = function() {
            for (var e, t = this.d.textTracks(), i = 0, n = t.length, a = f; n > i; i++) e = t[i], e.M() == this.ha.M() && 2 == e.mode() && (a = l);
            this.selected(a)
        }, t.T = t.L.extend({
            i: function(e, i) {
                t.L.call(this, e, i), 1 >= this.P.length && this.Z()
            }
        }), t.T.prototype.za = function() {
            var e, i = [];
            i.push(new t.sb(this.d, {
                kind: this.G
            }));
            for (var n = 0; n < this.d.textTracks().length; n++) e = this.d.textTracks()[n], e.M() === this.G && i.push(new t.aa(this.d, {
                track: e
            }));
            return i
        }, t.Oa = t.T.extend({
            i: function(e, i, n) {
                t.T.call(this, e, i, n), this.b.setAttribute("aria-label", "Captions Menu")
            }
        }), t.Oa.prototype.G = "captions", t.Oa.prototype.la = "Captions", t.Oa.prototype.className = "vjs-captions-button", t.Ta = t.T.extend({
            i: function(e, i, n) {
                t.T.call(this, e, i, n), this.b.setAttribute("aria-label", "Subtitles Menu")
            }
        }), t.Ta.prototype.G = "subtitles", t.Ta.prototype.la = "Subtitles", t.Ta.prototype.className = "vjs-subtitles-button", t.Pa = t.T.extend({
            i: function(e, i, n) {
                t.T.call(this, e, i, n), this.b.setAttribute("aria-label", "Chapters Menu")
            }
        }), s = t.Pa.prototype, s.G = "chapters", s.la = "Chapters", s.className = "vjs-chapters-button", s.za = function() {
            for (var e, i = [], n = 0; n < this.d.textTracks().length; n++) e = this.d.textTracks()[n], e.M() === this.G && i.push(new t.aa(this.d, {
                track: e
            }));
            return i
        }, s.Aa = function() {
            for (var e, i, n = this.d.textTracks(), a = 0, r = n.length, o = this.P = []; r > a; a++)
                if (e = n[a], e.M() == this.G) {
                    if (0 !== e.readyState()) {
                        i = e;
                        break
                    }
                    e.load(), e.c("loaded", t.bind(this, this.Aa))
                }
            if (n = this.Fa, n === b && (n = new t.ja(this.d), n.ma().appendChild(t.e("li", {
                    className: "vjs-menu-title",
                    innerHTML: t.ba(this.G),
                    re: -1
                }))), i) {
                e = i.ca;
                for (var s, a = 0, r = e.length; r > a; a++) s = e[a], s = new t.mb(this.d, {
                    track: i,
                    cue: s
                }), o.push(s), n.U(s);
                this.U(n)
            }
            return 0 < this.P.length && this.show(), n
        }, t.mb = t.J.extend({
            i: function(e, i) {
                var n = this.ha = i.track,
                    a = this.cue = i.cue,
                    r = e.currentTime();
                i.label = a.text, i.selected = a.startTime <= r && r < a.Ca, t.J.call(this, e, i), n.c("cuechange", t.bind(this, this.update))
            }
        }), t.mb.prototype.s = function() {
            t.J.prototype.s.call(this), this.d.currentTime(this.cue.startTime), this.update(this.cue.startTime)
        }, t.mb.prototype.update = function() {
            var e = this.cue,
                t = this.d.currentTime();
            this.selected(e.startTime <= t && t < e.Ca)
        }, t.h.z(t.Qa.prototype.m.children, {
            subtitlesButton: {},
            captionsButton: {},
            chaptersButton: {}
        }), "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse) t.JSON = window.JSON;
    else {
        t.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        t.JSON.parse = function(a, c) {
            function d(e, t) {
                var i, n, a = e[t];
                if (a && "object" == typeof a)
                    for (i in a) Object.prototype.hasOwnProperty.call(a, i) && (n = d(a, i), n !== b ? a[i] = n : delete a[i]);
                return c.call(e, t, a)
            }
            var e;
            if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
        }
    }
    t.qc = function() {
        var e, i, n, a;
        e = document.getElementsByTagName("video"), i = document.getElementsByTagName("audio");
        var r = [];
        if (e && 0 < e.length)
            for (n = 0, a = e.length; a > n; n++) r.push(e[n]);
        if (i && 0 < i.length)
            for (n = 0, a = i.length; a > n; n++) r.push(i[n]);
        if (r && 0 < r.length)
            for (n = 0, a = r.length; a > n; n++) {
                if (!(i = r[n]) || !i.getAttribute) {
                    t.Bb();
                    break
                }
                i.player === b && (e = i.getAttribute("data-setup"), e !== k && videojs(i))
            } else t.dd || t.Bb()
    }, t.Bb = function() {
        setTimeout(t.qc, 1)
    }, "complete" === document.readyState ? t.dd = f : t.Q(window, "load", function() {
        t.dd = f
    }), t.Bb(), t.ge = function(e, i) {
        t.Player.prototype[e] = i
    };
    var qa = this;
    $("videojs", t), $("_V_", t), $("videojs.options", t.options), $("videojs.players", t.Ga), $("videojs.TOUCH_ENABLED", t.wb), $("videojs.cache", t.ya), $("videojs.Component", t.a), t.a.prototype.player = t.a.prototype.j, t.a.prototype.options = t.a.prototype.options, t.a.prototype.init = t.a.prototype.i, t.a.prototype.dispose = t.a.prototype.dispose, t.a.prototype.createEl = t.a.prototype.e, t.a.prototype.contentEl = t.a.prototype.ma, t.a.prototype.el = t.a.prototype.w, t.a.prototype.addChild = t.a.prototype.U, t.a.prototype.getChild = t.a.prototype.na, t.a.prototype.getChildById = t.a.prototype.Kd, t.a.prototype.children = t.a.prototype.children, t.a.prototype.initChildren = t.a.prototype.Gc, t.a.prototype.removeChild = t.a.prototype.removeChild, t.a.prototype.on = t.a.prototype.c, t.a.prototype.off = t.a.prototype.k, t.a.prototype.one = t.a.prototype.Q, t.a.prototype.trigger = t.a.prototype.l, t.a.prototype.triggerReady = t.a.prototype.Na, t.a.prototype.show = t.a.prototype.show, t.a.prototype.hide = t.a.prototype.Z, t.a.prototype.width = t.a.prototype.width, t.a.prototype.height = t.a.prototype.height, t.a.prototype.dimensions = t.a.prototype.Dd, t.a.prototype.ready = t.a.prototype.H, t.a.prototype.addClass = t.a.prototype.n, t.a.prototype.removeClass = t.a.prototype.r, t.a.prototype.buildCSSClass = t.a.prototype.S, t.a.prototype.localize = t.a.prototype.t, t.a.prototype.setInterval = t.a.prototype.setInterval, t.a.prototype.setTimeout = t.a.prototype.setTimeout, t.Player.prototype.ended = t.Player.prototype.ended, t.Player.prototype.enterFullWindow = t.Player.prototype.Bc, t.Player.prototype.exitFullWindow = t.Player.prototype.Hb, t.Player.prototype.preload = t.Player.prototype.Ha, t.Player.prototype.remainingTime = t.Player.prototype.remainingTime, t.Player.prototype.supportsFullScreen = t.Player.prototype.Ka, t.Player.prototype.currentType = t.Player.prototype.zd, t.Player.prototype.requestFullScreen = t.Player.prototype.requestFullScreen, t.Player.prototype.requestFullscreen = t.Player.prototype.requestFullscreen, t.Player.prototype.cancelFullScreen = t.Player.prototype.cancelFullScreen, t.Player.prototype.exitFullscreen = t.Player.prototype.exitFullscreen, t.Player.prototype.isFullScreen = t.Player.prototype.isFullScreen, t.Player.prototype.isFullscreen = t.Player.prototype.isFullscreen, $("videojs.MediaLoader", t.pd), $("videojs.TextTrackDisplay", t.mc), $("videojs.ControlBar", t.Qa), $("videojs.Button", t.u), $("videojs.PlayToggle", t.hc), $("videojs.FullscreenToggle", t.Ra), $("videojs.BigPlayButton", t.lb), $("videojs.LoadingSpinner", t.fc), $("videojs.CurrentTimeDisplay", t.nb), $("videojs.DurationDisplay", t.ob), $("videojs.TimeDivider", t.nc), $("videojs.RemainingTimeDisplay", t.vb), $("videojs.LiveDisplay", t.ec), $("videojs.ErrorDisplay", t.pb), $("videojs.Slider", t.R), $("videojs.ProgressControl", t.ub), $("videojs.SeekBar", t.kc), $("videojs.LoadProgressBar", t.rb), $("videojs.PlayProgressBar", t.gc), $("videojs.SeekHandle", t.Sa), $("videojs.VolumeControl", t.yb), $("videojs.VolumeBar", t.xb), $("videojs.VolumeLevel", t.oc), $("videojs.VolumeMenuButton", t.wa), $("videojs.VolumeHandle", t.zb), $("videojs.MuteToggle", t.ka), $("videojs.PosterImage", t.jc), $("videojs.Menu", t.ja), $("videojs.MenuItem", t.J), $("videojs.MenuButton", t.L), $("videojs.PlaybackRateMenuButton", t.ic), t.L.prototype.createItems = t.L.prototype.za, t.T.prototype.createItems = t.T.prototype.za, t.Pa.prototype.createItems = t.Pa.prototype.za, $("videojs.SubtitlesButton", t.Ta), $("videojs.CaptionsButton", t.Oa), $("videojs.ChaptersButton", t.Pa), $("videojs.MediaTechController", t.p), t.p.withSourceHandlers = t.p.$b, t.p.prototype.featuresVolumeControl = t.p.prototype.Ge, t.p.prototype.featuresFullscreenResize = t.p.prototype.Ce, t.p.prototype.featuresPlaybackRate = t.p.prototype.De, t.p.prototype.featuresProgressEvents = t.p.prototype.Ee, t.p.prototype.featuresTimeupdateEvents = t.p.prototype.Fe, t.p.prototype.setPoster = t.p.prototype.Vc, $("videojs.Html5", t.g), t.g.Events = t.g.qb, t.g.isSupported = t.g.isSupported, t.g.canPlaySource = t.g.rc, t.g.patchCanPlayType = t.g.Nc, t.g.unpatchCanPlayType = t.g.we, t.g.prototype.setCurrentTime = t.g.prototype.Wb, t.g.prototype.setVolume = t.g.prototype.oe, t.g.prototype.setMuted = t.g.prototype.le, t.g.prototype.setPreload = t.g.prototype.ne, t.g.prototype.setAutoplay = t.g.prototype.ie, t.g.prototype.setLoop = t.g.prototype.ke, t.g.prototype.enterFullScreen = t.g.prototype.Ac, t.g.prototype.exitFullScreen = t.g.prototype.Gd, t.g.prototype.playbackRate = t.g.prototype.playbackRate, t.g.prototype.setPlaybackRate = t.g.prototype.me, t.g.registerSourceHandler = t.g.Ia, t.g.selectSourceHandler = t.g.jb, t.g.prototype.setSource = t.g.prototype.Ja, t.g.prototype.disposeSourceHandler = t.g.prototype.Ba, $("videojs.Flash", t.f), t.f.isSupported = t.f.isSupported, t.f.canPlaySource = t.f.rc, t.f.onReady = t.f.onReady, t.f.embed = t.f.zc, t.f.version = t.f.version, t.f.prototype.setSource = t.f.prototype.Ja, t.f.registerSourceHandler = t.f.Ia, t.f.selectSourceHandler = t.f.jb, t.f.prototype.setSource = t.f.prototype.Ja, t.f.prototype.disposeSourceHandler = t.f.prototype.Ba, $("videojs.TextTrack", t.B), t.B.prototype.label = t.B.prototype.label, t.B.prototype.kind = t.B.prototype.M, t.B.prototype.mode = t.B.prototype.mode, t.B.prototype.cues = t.B.prototype.yd, t.B.prototype.activeCues = t.B.prototype.rd, $("videojs.CaptionsTrack", t.cc), $("videojs.SubtitlesTrack", t.lc), $("videojs.ChaptersTrack", t.dc), $("videojs.autoSetup", t.qc), $("videojs.plugin", t.ge), $("videojs.createTimeRange", t.Eb), $("videojs.util", t.W), t.W.mergeOptions = t.W.pa, t.addLanguage = t.sd
}(), ! function(e, t, i, n, a) {
    a = t.location, e.src = "//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-2&utmn=1&utmhn=" + n(a.hostname) + "&utmsr=" + t.screen.availWidth + "x" + t.screen.availHeight + "&utmul=" + (i.language || i.userLanguage || "").toLowerCase() + "&utmr=" + n(a.href) + "&utmp=" + n(a.hostname + a.pathname) + "&utmcc=__utma%3D1." + Math.floor(1e10 * Math.random()) + ".1.1.1.1%3B&utme=8(vjsv)9(v4.11.4)"
}(new Image, window, navigator, encodeURIComponent), eval(function(e, t, i, n, a, r) {
    if (a = function(e) {
            return (t > e ? "" : a(parseInt(e / t))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        }, !"".replace(/^/, String)) {
        for (; i--;) r[a(i)] = n[i] || a(i);
        n = [function(e) {
            return r[e]
        }], a = function() {
            return "\\w+"
        }, i = 1
    }
    for (; i--;) n[i] && (e = e.replace(new RegExp("\\b" + a(i) + "\\b", "g"), n[i]));
    return e
}("E $d(d){19 8.3M(d)}7 1f=2Z.6Q;6(1f!='6M:'){1f='6K:'}7 2r=1f+'//5.1h/3Y/4f-36-4x.3D';7 2S='';7 2Q=M;7 2k='P';7 1P='';7 1D='';7 2b='6J 2d';7 2a='6I 2d';7 29='6G 2d';7 2A='6z 2d';7 2u='6u 2d';7 2i='6o 6n';7 2O=P;7 2N=P;7 2L=P;7 2K=P;7 2J=P;7 2I=P;7 2H=M;7 3g=M;7 2F=M;7 5=E(){7 D=M,U=1,2t='',3h,3i=M,3k=M;19{1E:E(){1w{2r=2r}1z(e){2r=1f+'//5.1h/3Y/4f-36-4x.3D'}1w{2S=6m}1z(e){}1w{2Q=6l}1z(e){}1w{2k=6k}1z(e){}7 b=5.4j(2S);7 c=8.1Z('*');1G(7 d=0;d<c.1p;d+=1){7 f='',2p=M,6j=c[d].W,14='';6(5.Q(c[d],'5')){7 g=c[d].1Z('K');1G(7 m=0;m<g.1p;m+=1){6(5.Q(g[m],'3A')){g[m].J.L='F'}6(5.Q(g[m],'3z')){g[m].J.L='F';f+='&6g='+X(5.13(g[m].T))}6(5.Q(g[m],'3w')){g[m].J.L='F';f+='&6b='+X(5.13(g[m].T))}6(5.Q(g[m],'3v')){g[m].J.L='F';f+='&6a='+X(5.13(g[m].T))}6(5.Q(g[m],'3u')){g[m].J.L='F';f+='&69='+X(5.13(g[m].T))}6(5.Q(g[m],'3t')){g[m].J.L='F';f+='&66='+X(5.13(g[m].T))}6(5.Q(g[m],'3s')){g[m].J.L='F';f+='&65='+X(5.13(g[m].T))}6(5.Q(g[m],'3r')){g[m].J.L='F';f+='&64='+X(5.13(g[m].T))}6(5.Q(g[m],'3q')){g[m].J.L='F';f+='&63='+X(5.13(g[m].T))}6(5.Q(g[m],'46')){g[m].J.L='F';f+='&62='+X(5.13(g[m].T))}6(5.Q(g[m],'3p')){g[m].J.L='F';f+='&61='+X(5.13(g[m].T))}6(5.Q(g[m],'5X')){g[m].J.L='F';f+='&5W='+X(5.13(g[m].T))}6(5.Q(g[m],'5U')){g[m].J.L='F';f+='&5T='+X(5.13(g[m].T))}6(5.Q(g[m],'5Q')){g[m].J.L='F';f+='&5P='+X(5.13(g[m].T))}6(5.Q(g[m],'5I')){g[m].J.L='F';f+='&5H='+X(5.13(g[m].T))}6(5.Q(g[m],'3l')){6(g[m].T!=''){g[m].J.L='F';7 h=g[m].T.1l(/ /1u,\"\");f+='&2p='+X(h);2p=P}}}6(b){f+='&5G=M'}f=f.1l(/'/1u,\"\xb4\");6(1D!=''){1D=1D+',';1D=1D.1l(/ /1u,'');7 i=1D.31(',');1G(7 a=0;a<i.1p;a+=1){6(2O&&i[a]=='1i'){14+='<K 1a=\"3R\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1i\\',\\''+f+'\\');\">'+2b+'</K>'}6(2N&&i[a]=='1n'){14+='<K 1a=\"43\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1n\\',\\''+f+'\\');\">'+2a+'</K>'}6(2L&&i[a]=='1m'){14+='<K 1a=\"45\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1m\\',\\''+f+'\\');\">'+29+'</K>'}6(2K&&i[a]=='1q'){14+='<K 1a=\"47\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1q\\',\\''+f+'\\');\">'+2A+'</K>'}6(2J&&i[a]=='1o'){14+='<K 1a=\"4b\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1o\\',\\''+f+'\\');\">'+2u+'</K>'}6(2p&&i[a]=='1j'){6(2I&&i[a]=='1j'){14+='<K 1a=\"5F\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1j\\',\\''+f+'\\');\">'+2i+'</K>'}}}}H{6(2O){14+='<K 1a=\"3R\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1i\\',\\''+f+'\\');\">'+2b+'</K>'}6(2N){14+='<K 1a=\"43\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1n\\',\\''+f+'\\');\">'+2a+'</K>'}6(2L){14+='<K 1a=\"45\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1m\\',\\''+f+'\\');\">'+29+'</K>'}6(2K){14+='<K 1a=\"47\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1q\\',\\''+f+'\\');\">'+2A+'</K>'}6(2J){14+='<K 1a=\"4b\" R-O=\"'+U+'\" V=\"5.11(Y,\\'1o\\',\\''+f+'\\');\">'+2u+'</K>'}6(2p){6(2I){14+='<K R-O=\"'+U+'\" V=\"5.11(Y,\\'1j\\',\\''+f+'\\');\">'+2i+'</K>'}}}6(!b){14+='<1R 1a=\"4h\"><1R 1a=\"4i\"></1R><1R 1a=\"3e\" R-O=\"'+U+'\" V=\"5.11(Y,\\'3d\\');\">5D</1R></1R>'}c[d].2n='3b'+U;c[d].W=c[d].W.1l(/5/1u,'');c[d].W=c[d].W+' 5-G';c[d].5A='';7 j=c[d].28('R-2C');6(j){c[d].3E('R-2D',f);c[d].3E('R-O',U);c[d].V=E(){5.2C(Y);19 M}}H{6(2Q){c[d].5z=E(){5y(3h);5.12(Y,'1T','1T',P)};c[d].5x=E(){3h=1W(\"5.3P();\",5w)};c[d].V=E(){19 M}}H{c[d].V=E(){5.12(Y,'1T','1T');19 M}}}7 k=c[d];7 l=8.2h('K');l.2n='3b'+U+'-G';l.W='1y';l.T=14;k.1L(l);U++;3g=P}}6(2k=='M'){5.2l()}H{5.41(b)}6(3g&&!2F){2F=P;5.22({2T:'5v',2V:''})}},2C:E(f){7 a=f.28('R-2D');7 b=f.28('R-2C');5.11(f,b,a)},11:E(f,a,b){7 c='',O=2Z.2W,2x=P,5u=2q 38();6(a=='1i'){c=1f+'//5.1h/25/?1M=5t'+b+'&1O='+O;2x=M}6(a=='1n'){c=1f+'//5.1h/25/?1M=5s'+b+'&1O='+O}6(a=='1m'){c=1f+'//5.1h/25/?1M=5r'+b+'&1O='+O}6(a=='1q'){c=1f+'//5.1h/25/?1M=5q'+b+'&1O='+O}6(a=='1o'){c=1f+'//5.1h/25/?1M=5p'+b+'&1O='+O;2x=M}6(a=='1j'){c=1f+'//5.1h/25/?1M=5o'+b+'&1O='+O}6(a=='3d'){c=1f+'//5.1h/'}6(c!=''){6(a!='3d'){7 d=f.28('R-O');7 g=$d('3b'+d);6(g){7 h=g.28('R-22');6(h!=4l){h=h.1l(/5n-36/1u,a);1w{4n(h)}1z(e){}}}}6(!$d('2E')){7 j=8.2h(\"a\");j.2n='2E';j.5m='5l';j.T='{5-5k-5j}';j.J.L='F';8.1F.1L(j)}7 k=$d('2E');6(2x){k.4u='5i'}H{k.4u='5h'}k.2W=c;5.4w('2E')}5.22({2T:'2g',2V:a});6(1P){1G(7 i=0;i<1P.1p;i++){1w{4n(1P[i])}1z(e){5g(e.5f)}}}},41:E(a){6(!3k){7 b;b='.5-G {L:5e-1U;1V:3C;1t-5d:5c;1A:#5b!1H;1B:#3J 2D('+2r+') 71-5a 2o 50%;N-21:F!1H;Z:S 1s #58;1A:#3T;1t-3j:3V;1t-2v:3X;N-21:F;2w:2o 34 40 57;-1Y-Z-26:1C;-1J-Z-26:1C;-1J-56-53:F;-1J-2s-27:F;-52-2s-27:F;-1Y-2s-27:F;-4Y-2s-27:F;2s-27:F;}';b+='.5-G:39 {Z:S 1s #4X;1A:#3T;1t-3j:3V;1t-2v:3X;N-21:F!1H;}';b+='.5-G:4W {1x:S;}';b+='.5-3c {1B-1A:#4V;}';6(a){b+='.1y {2X:3f;1V:2G;z-2j:33;2w:1d 1d 1d 1d;1B:#2M;N-3m:1e;L:F;2U-1x:-1C;2U-1e:-S;Z-1x:S 1s #4q;Z-1I:S 1s #2P;Z-4r:S 1s #4s;Z-1e:S 1s #2P;-1Y-Z-26:1C;-1J-Z-26:1C;-1J-1Q-1N:S 23 1K 1S(0,0,0,0.15);-1Y-1Q-1N:S 23 1K 1S(0,0,0,0.15);1Q-1N:S 23 1K 1S(0,0,0,0.15);}'}H{b+='.1y {2X:3f;1V:2G;z-2j:33;2w:1K 1d 1d 1d;1B:#2M;N-3m:1e;L:F;2U-1x:-1C;2U-1e:-S;Z-1x:S 1s #4q;Z-1I:S 1s #2P;Z-4r:S 1s #4s;Z-1e:S 1s #2P;-1Y-Z-26:1C;-1J-Z-26:1C;-1J-1Q-1N:S 23 1K 1S(0,0,0,0.15);-1Y-1Q-1N:S 23 1K 1S(0,0,0,0.15);1Q-1N:S 23 1K 1S(0,0,0,0.15);}'}b+='.1y K {L:1U;3x:4z;4A-2R:4C%;1B:#2M;N-21:F;1t-2v:34;1A:#4D;2w:40 2z 2o 4U;}';b+='.1y K:39 {1B:#3J;1A:#4D;N-21:F;1t-2v:34;}';b+='.5 K {L:F!1H;}';b+='.5-G .3A,.5-G .3z,.5-G .3w,.5-G .3v,.5-G .3u,.5-G .3t,.5-G .3s,.5-G .3r,.5-G .3q,.5-G .3l,.5-G .3p {L:F!1H;}';b+='.1y .4h {2X:3f;2R:4T;L:1U;1V:3C;3x:4S;}';b+='.1y .4i {2X:4O;2R:S;4L:4J;1B:#5V;1V:2G;z-2j:4M;1e:2z;1x:2o;}';b+='.1y .3e {1V:2G;1x:4N;3x:4z;1I:2z;2w-1e:2z;1t-J:4I;1t-3j:4I;N-3m:1I;z-2j:4P;4A-2R:4C%;1B:#2M;N-21:F;1t-2v:2o;1A:#4Q;}';b+='.1y .3e:39 {1A:#4R!1H;}';7 c=8.2h(\"J\");c.4H=\"N/2B\";c.2n=\"4F\";6(c.2Y){c.2Y.4d=b}H{c.1L(8.3a(b))}8.1Z(\"4a\")[0].1L(c);3k=P}},2l:E(){6(!3i){1w{7 a='.5 {4Z:4J;}';a+='.5-G .3A,.5-G .3z,.5-G .3w,.5-G .3v,.5-G .3u,.5-G .3t,.5-G .3s,.5-G .3r,.5-G .3q,.5-G .46,.5-G .3l,.5-G .3p {L:F!1H;}';7 b=8.2h(\"J\");b.4H=\"N/2B\";6(b.2Y){b.2Y.4d=a}H{b.1L(8.3a(a))}8.1Z(\"4a\")[0].1L(b)}1z(e){}3i=P;5.22({2T:'51',2V:''})}},49:E(){1w{19(37=$d('4F'))?37.54.55(37):M}1z(e){}},12:E(f,o,a,b){7 c=f.2n;7 d=$d(c);7 g=$d(c+'-G');6(d&&g){6(2t!=c){5.32(2t)}7 h=5.35(g,'L');1w{f.59()}1z(e){};6(h=='1U'){6(b){}H{5.32(c)}}H{2t=c;d.W=d.W+' 5-3c';d.J.3N=5.3L();g.J.1e='1d';g.J.1x='1d';g.J.L='1U';1W(\"5.3H();\",3F);D=M;7 i=1k(d.4E);7 j=1k(d.4B);7 k=1k(g.4E);7 l=1k(g.4B);7 m=5.4y();7 n=m.31('/');7 p=1k(n[0]);7 q=1k(n[1]);7 r=1k(n[2]);7 s=1k(n[3]);7 t=5.4k(g);7 u=t.31('/');7 v=1k(u[0]);7 w=1k(u[1]);7 x=w+k;7 y=q+s;7 z=v+l;7 A=p+r;7 B=0,1g=0;6(o=='3O'&&a=='1e'){B='1d';1g=i+'1b'}H 6(o=='3I'&&a=='1e'){B='1d';1g=-k+'1b'}H 6(o=='3O'&&a=='1I'){B=-(l-j)+'1b';1g=i+'1b'}H 6(o=='3I'&&a=='1I'){B=-(l-j)+'1b';1g=-k+'1b'}H 6(o=='1T'&&a=='1e'){B='1d';6(x>y){1g=-k+'1b'}H{1g=i+'1b'}}H 6(o=='1T'&&a=='1I'){B=-(l-j)+'1b';6(x>y){1g=-k+'1b'}H{1g=i+'1b'}}H{6(x>y){1g=-k+'1b'}H{1g=i+'1b'}6(z>A){B=-(l-j)+'1b'}H{B='1d'}}g.J.1e=B;g.J.1x=1g;7 C='5B'5C 8.1r?'5E':'2g';6(8.2f){8.2f(C,E(){6(D){1W(E(){5.2c(c)},4v)}},M)}H 6(8.2m){8.2m(\"5J\"+C,E(){6(D){1W(E(){5.2c(c)},4v)}})}H{8.V=E(){5.2c(c)}}}}},2c:E(f){7 a=$d(f);7 b=$d(f+'-G');6(a&&b){6(D&&b.J.L=='1U'){1W(\"5.32('\"+f+\"');\",3F)}}},3P:E(){5.2c(2t)},32:E(f){7 a=$d(f);7 b=$d(f+'-G');6(a&&b){a.W=a.W.1l(/5-3c/1u,'');b.J.L='F';b.J.3N=''}},3H:E(){D=P},3L:E(){7 a=33;7 b=8.1Z('*');1G(7 d=0;d<b.1p;d+=1){6(5.Q(b[d],'5-G')||5.Q(b[d],'5K-G')){7 c=5.35(b[d],'z-2j');6(!5L(5M(c))&&5N(c)){c=1k(c);6(c>a){a=c}}}}a++;19 a},4y:E(){7 w=0,h=0,y=0,x=0;6(5O(1c.4o)=='5R'){w=1c.4o;h=1c.5S}H 6(8.1r&&(8.1r.2y||8.1r.30)){w=8.1r.2y;h=8.1r.30}H 6(8.1F&&(8.1F.2y||8.1F.30)){w=8.1F.2y;h=8.1F.30}6(8.4K){x=(8.1r.3n)?8.1r.3n:8.1F.3n;y=(8.1r.3o)?8.1r.3o:8.1F.3o}H{x=1c.5Y;y=1c.5Z}19 w+'/'+h+'/'+x+'/'+y},4k:E(a){7 x=0,y=0;6(a.4e){x=a.48;y=a.44;3Z(a=a.4e){x+=a.48;y+=a.44}}19 x+'/'+y},35:E(a,b){7 x=a;7 y;6(x.3W){y=x.3W[b]}H 6(1c.3S){y=8.67.3S(x,4l).68(b)}19 y},4j:E(f){7 b=2Z.2W;7 c=P;7 d=f;7 e=d.1p;6(e==20){7 a=d.1X(0,1);7 z=d.1X(9,10);7 m=d.1X(17,18);6(a!='a'){c=M}6(z!='z'){c=M}6(m!='m'){c=M}}H{c=M}6(b.3G('5.1h')==-1&&d=='6c'){c=M}19 c},6d:E(){7 a=8.1Z('*');1G(7 d=0;d<a.1p;d+=1){6(5.Q(a[d],'5-G')){a[d].W=a[d].W.1l(/5-G/1u,'');a[d].W=a[d].W.1l(/5/1u,'');a[d].W=a[d].W+' 5'}}2F=M;5.1E()},6e:E(f){1P=f},6f:E(l,t){7 x=l.4t();6(x=='1i'){2b=t}6(x=='1n'){2a=t}6(x=='1m'){29=t}6(x=='1o'){2u=t}6(x=='6h'){2i=t}},6i:E(c){6(c.3K!=I){2S=c.3K}6(c.2B!=I){6(c.2B){2k='P'}H{2k='M';5.49()}}6(c.4c!=I){2Q=c.4c}6(c.1i!=I){6(c.1i.12!=I){2O=c.1i.12}}6(c.1n!=I){6(c.1n.12!=I){2N=c.1n.12}}6(c.1m!=I){6(c.1m.12!=I){2L=c.1m.12}}6(c.1q!=I){6(c.1q.12!=I){2K=c.1q.12}}6(c.1o!=I){6(c.1o.12!=I){2J=c.1o.12}}6(c.1j!=I){6(c.1j.12!=I){2I=c.1j.12}}6(c.1i!=I){6(c.1i.N!=I){2b=c.1i.N}}6(c.1n!=I){6(c.1n.N!=I){2a=c.1n.N}}6(c.1m!=I){6(c.1m.N!=I){29=c.1m.N}}6(c.1q!=I){6(c.1q.N!=I){2A=c.1q.N}}6(c.1o!=I){6(c.1o.N!=I){2u=c.1o.N}}6(c.1j!=I){6(c.1j.N!=I){2i=c.1j.N}}6(c.3y!=I){6(c.3y.3B!=I){1D=c.3y.3B}}6(c.4G!=I){1P=c.4G}},Q:E(e,c){19 2q 6p('(\\\\s|^)'+c+'(\\\\s|$)').6q(e.W)},13:E(a){7 b=a.1l(/<6r\\s*[\\/]?>/1u,\"\\n\");b=b.1l(/<(?:.|\\n)*?>/6s,'');b=b.1l(/(^\\s+|\\s+$)/g,'');7 c=8.2h(\"6t\");7 d=8.3a(b);c.1L(d);19 c.T},4w:E(a){7 b=8.3M(a);6(b.2g){b.2g()}H 6(8.4p){7 c=8.4p('6v');c.6w('2g',P,P);b.6x(c)}},22:E(a){7 b=2q 6y(1,1);7 d=2q 38();7 c=d.4g();7 e=X(1c.2Z.2W);b.6A=1f+'//22.6B.1h/6C/?6D='+a.2T+'&6E='+a.2V+'&6F='+5.42()+'&2D='+e+'&6H='+c},42:E(){7 a=\"3U=\",2e='';7 b=8.4m.31(';');1G(7 i=0;i<b.1p;i++){7 c=b[i];3Z(c.6L(0)==' '){c=c.1X(1,c.1p)}6(c.3G(a)==0){2e=c.1X(a.1p,c.1p)}}6(2e==''){7 d=(5.1v()+5.1v()+\"-\"+5.1v()+\"-4\"+5.1v().6N(0,3)+\"-\"+5.1v()+\"-\"+5.1v()+5.1v()+5.1v()).4t();7 e=2q 38();e.6O(e.4g()+(6P*24*60*60*6R));7 f=\"6S=\"+e.6T();8.4m=\"3U=\"+d+\"; \"+f;2e=d}19 2e},1v:E(){19(((1+6U.6V())*6W)|0).6X(16).1X(1)}}}();6(1c.2f){1c.2f(\"6Y\",E(){2H=P;5.2l();5.1E()},M);1c.2f(\"6Z\",E(){5.1E()},M)}H 6(1c.2m){1c.2m(\"70\",E(){2H=P;5.2l();5.1E()});1c.2m(\"3Q\",E(){5.1E()})}H{1c.3Q=E(){5.1E()}}6(!2H){1W(\"5.2l();5.1E();\",20)}", 62, 436, "|||||addthisevent|if|var|document||||||||||||||||||||||||||||||||function|none|drop|else|undefined|style|span|display|false|text|ref|true|hasclass|data|1px|innerHTML|dropzcx|onclick|className|encodeURIComponent|this|border||cli|show|htmlencode|htmx|||||return|class|px|window|0px|left|proc|dropy|com|outlook|facebook|parseInt|replace|yahoo|google|ical|length|hotmail|documentElement|solid|font|gi|s4|try|top|addthisevent_dropdown|catch|color|background|2px|_ate_dropdown|generate|body|for|important|right|webkit|6px|appendChild|service|shadow|reference|_ate_callback|box|em|rgba|auto|block|position|setTimeout|substring|moz|getElementsByTagName||decoration|track|3px||create|radius|select|getAttribute|_ate_lbl_yahoo|_ate_lbl_google|_ate_lbl_outlook|force|Calendar|coov|addEventListener|click|createElement|_ate_lbl_fb_event|index|_ate_css|trycss|attachEvent|id|9px|fbevent|new|_image_path|user|olddrop|_ate_lbl_ical|size|padding|nw|clientWidth|10px|_ate_lbl_hotmail|css|direct|url|atecllink|_ate_btn_expo|absolute|_d_rd|_ate_show_facebook|_ate_show_ical|_ate_show_hotmail|_ate_show_yahoo|fff|_ate_show_google|_ate_show_outlook|bebebe|_ate_mouse|height|_ate_license|typ|margin|cal|href|width|styleSheet|location|clientHeight|split|hide|99999|12px|getstyle|calendar|hdx|Date|hover|createTextNode|atedrop|selected|home|frs|200px|_ate_btn_found|dropmousetim|css1|weight|css2|_facebook_event|align|scrollLeft|scrollTop|_all_day_event|_organizer_email|_organizer|_location|_description|_summary|_zonecode|_end|cursor|dropdown|_start|_url|order|relative|png|setAttribute|350|indexOf|tim|up|f4f4f4|license|topzindex|getElementById|zIndex|down|out|onload|ateoutlook|getComputedStyle|555|addevent_track_cookie|bold|currentStyle|14px|gfx|while|8px|applycss|getguid|ategoogle|offsetTop|ateyahoo|_attendees|atehotmail|offsetLeft|removecss|head|ateical|mouse|cssText|offsetParent|icon|getTime|copyx|brx|glicense|elementposition|null|cookie|eval|innerWidth|createEvent|c8c8c8|bottom|a8a8a8|toLowerCase|target|300|eclick|t1|viewport|pointer|line|offsetWidth|110|6d84b4|offsetHeight|ate_css|callback|type|normal|hidden|all|overflow|100|5px|180px|101|cacaca|999|default|21px|15px|f7f7f7|active|aab9d4|ms|visibility||jsinit|khtml|callout|parentNode|removeChild|touch|35px|d9d9d9|blur|repeat|333|arial|family|inline|description|alert|_self|_blank|link|ghost|external|rel|ate|FACEBOOK|ICAL|HOTMAIL|YAHOO|GOOGLE|OUTLOOK|now|exposure|200|onmouseout|clearTimeout|onmouseover|title|ontouchstart|in|AddThisEvent|touchstart|atefacebook|credits|uid|_uid|on|addeventstc|isNaN|parseFloat|isFinite|typeof|drule|_recurring|number|innerHeight|alarm|_alarm_reminder|e0e0e0|dateformat|_date_format|pageXOffset|pageYOffset||dallday|datte|dorgaem|dorga|dloca|ddesc|defaultView|getPropertyValue|dsum|dzone|dend|aao8iuet5zp9iqw5sm9z|refresh|callcack|setlabel|dstart|facebookevent|settings|str|_css|_mouse|_license|Event|Facebook|RegExp|test|br|gm|div|iCal|MouseEvents|initEvent|dispatchEvent|Image|Hotmail|src|addevent|atc|trktyp|trkcal|guid|Yahoo|cache|Google|Outlook|http|charAt|https|substr|setTime|365|protocol|1000|expires|toUTCString|Math|random|0x10000|toString|DOMContentLoaded|load|onreadystatechange|no".split("|"), 0, {})), ! function(e) {
    "use strict";
    var t = function() {
        this.defined = "undefined" != typeof localStorage
    };
    t.prototype = {
        constructor: t,
        get: function(e, t) {
            return localStorage.getItem(e) ? localStorage.getItem(e) : "undefined" != typeof t ? t : null
        },
        has: function(e) {
            return localStorage.getItem(e) ? !0 : !1
        },
        set: function(e, t, i) {
            return "string" == typeof t && ("" === t ? this.destroy(e) : localStorage.setItem(e, t)), "function" == typeof i ? i() : !0
        },
        destroy: function(e, t) {
            return localStorage.removeItem(e), "function" == typeof t ? t() : !0
        },
        clean: function(e) {
            for (var t = localStorage.length - 1; t >= 0; t--) "undefined" == typeof Array.indexOf && -1 !== localStorage.key(t).indexOf("garlic:") && localStorage.removeItem(localStorage.key(t));
            return "function" == typeof e ? e() : !0
        },
        clear: function(e) {
            return localStorage.clear(), "function" == typeof e ? e() : !0
        }
    };
    var i = function(e, t, i) {
        this.init("garlic", e, t, i)
    };
    i.prototype = {
        constructor: i,
        init: function(t, i, n, a) {
            this.type = t, this.$element = e(i), this.options = this.getOptions(a), this.storage = n, this.path = this.options.getPath(this.$element) || this.getPath(), this.parentForm = this.$element.closest("form"), this.$element.addClass("garlic-auto-save"), this.expiresFlag = this.options.expires ? (this.$element.data("expires") ? this.path : this.getPath(this.parentForm)) + "_flag" : !1, this.$element.on(this.options.events.join("." + this.type + " "), !1, e.proxy(this.persist, this)), this.options.destroy && e(this.parentForm).on("submit reset", !1, e.proxy(this.destroy, this)), this.retrieve()
        },
        getOptions: function(t) {
            return e.extend({}, e.fn[this.type].defaults, t, this.$element.data())
        },
        persist: function() {
            this.val !== this.getVal() && (this.val = this.getVal(), this.options.expires && this.storage.set(this.expiresFlag, ((new Date).getTime() + 1e3 * this.options.expires).toString()), this.storage.set(this.path, this.getVal()), this.options.onPersist(this.$element, this.getVal()))
        },
        getVal: function() {
            return this.$element.is("input[type=checkbox]") ? this.$element.prop("checked") ? "checked" : "unchecked" : this.$element.val()
        },
        retrieve: function() {
            if (this.storage.has(this.path)) {
                if (this.options.expires) {
                    var e = (new Date).getTime();
                    if (this.storage.get(this.expiresFlag) < e.toString()) return void this.storage.destroy(this.path);
                    this.$element.attr("expires-in", Math.floor((parseInt(this.storage.get(this.expiresFlag)) - e) / 1e3))
                }
                var t = this.storage.get(this.path);
                return this.options.conflictManager.enabled && this.detectConflict() ? this.conflictManager() : this.$element.is("input[type=radio], input[type=checkbox]") ? "checked" === t || this.$element.val() === t ? this.$element.attr("checked", !0) : void("unchecked" === t && this.$element.attr("checked", !1)) : (this.$element.val(t), this.$element.trigger("input"), void this.options.onRetrieve(this.$element, t))
            }
        },
        detectConflict: function() {
            var t = this;
            if (this.$element.is("input[type=checkbox], input[type=radio]")) return !1;
            if (this.$element.val() && this.storage.get(this.path) !== this.$element.val()) {
                if (this.$element.is("select")) {
                    var i = !1;
                    return this.$element.find("option").each(function() {
                        return 0 !== e(this).index() && e(this).attr("selected") && e(this).val() !== t.storage.get(this.path) ? void(i = !0) : void 0
                    }), i
                }
                return !0
            }
            return !1
        },
        conflictManager: function() {
            return "function" != typeof this.options.conflictManager.onConflictDetected || this.options.conflictManager.onConflictDetected(this.$element, this.storage.get(this.path)) ? (this.options.conflictManager.garlicPriority ? (this.$element.data("swap-data", this.$element.val()), this.$element.data("swap-state", "garlic"), this.$element.val(this.storage.get(this.path))) : (this.$element.data("swap-data", this.storage.get(this.path)), this.$element.data("swap-state", "default")), this.swapHandler(), this.$element.addClass("garlic-conflict-detected"), void this.$element.closest("input[type=submit]").attr("disabled", !0)) : !1
        },
        swapHandler: function() {
            var t = e(this.options.conflictManager.template);
            this.$element.after(t.text(this.options.conflictManager.message)), t.on("click", !1, e.proxy(this.swap, this))
        },
        swap: function() {
            var t = this.$element.data("swap-data");
            this.$element.data("swap-state", "garlic" === this.$element.data("swap-state") ? "default" : "garlic"), this.$element.data("swap-data", this.$element.val()), e(this.$element).val(t)
        },
        destroy: function() {
            this.storage.destroy(this.path)
        },
        remove: function() {
            return this.remove(), this.$element.is("input[type=radio], input[type=checkbox]") ? void e(this.$element).prop("checked", !1) : void this.$element.val("")
        },
        getPath: function(t) {
            if ("undefined" == typeof t && (t = this.$element), this.options.getPath(t)) return this.options.getPath(t);
            if (1 != t.length) return !1;
            for (var i = "", n = t.is("input[type=checkbox]"), a = t; a.length;) {
                var r = a[0],
                    o = r.nodeName;
                if (!o) break;
                o = o.toLowerCase();
                var s = a.parent(),
                    l = s.children(o);
                if (e(r).is("form, input, select, textarea") || n) {
                    if (o += e(r).attr("name") ? "." + e(r).attr("name") : "", l.length > 1 && !e(r).is("input[type=radio]"), i = o + (i ? ">" + i : ""), "form" == r.nodeName.toLowerCase()) break;
                    a = s
                } else a = s
            }
            return "garlic:" + document.domain + (this.options.domain ? "*" : window.location.pathname) + ">" + i
        },
        getStorage: function() {
            return this.storage
        }
    }, e.fn.garlic = function(n, a) {
        function r(t) {
            var a = e(t),
                r = a.data("garlic"),
                l = e.extend({}, o, a.data());
            if (("undefined" == typeof l.storage || l.storage) && "password" !== e(t).attr("type")) return r || a.data("garlic", r = new i(t, s, l)), "string" == typeof n && "function" == typeof r[n] ? r[n]() : void 0
        }
        var o = e.extend(!0, {}, e.fn.garlic.defaults, n, this.data()),
            s = new t,
            l = !1;
        return s.defined ? (this.each(function() {
            if (e(this).is("form")) e(this).find(o.inputs).each(function() {
                e(this).is(o.excluded) || (l = r(e(this)))
            });
            else if (e(this).is(o.inputs)) {
                if (e(this).is(o.excluded)) return;
                l = r(e(this))
            }
        }), "function" == typeof a ? a() : l) : !1
    }, e.fn.garlic.Constructor = i, e.fn.garlic.defaults = {
        destroy: !1,
        inputs: "input, textarea, select",
        excluded: 'input[type="file"], input[type="hidden"]',
        events: ["DOMAttrModified", "textInput", "input", "change", "click", "keypress", "paste", "focus"],
        domain: !0,
        expires: !1,
        conflictManager: {
            enabled: !1,
            garlicPriority: !0,
            template: '<span class="garlic-swap"></span>',
            message: "This is your saved data. Click here to see default one",
            onConflictDetected: function() {
                return !0
            }
        },
        getPath: function() {},
        onRetrieve: function() {},
        onPersist: function() {}
    }, e(window).on("load", function() {
        e('[data-persist="garlic"]').each(function() {
            e(this).garlic()
        }), e('.elInput:visible[name!="custom_type"]').each(function() {
            e(this).garlic()
        }), e('.elInput:visible[name="custom_type"]').each(function() {
            e(this).garlic({
                getPath: function(t) {
                    return e(t).attr("data-custom-type")
                }
            })
        }), e(".o2step_step1 .elInput").each(function() {
            e(this).garlic()
        }), e(".containerModal .elInput").each(function() {
            e(this).garlic()
        })
    })
}(window.jQuery || window.Zepto);
var cfpeorders;
1 != cfpeorders && ($(function() {
    $('input[name="purchase[product_id]"], input[name="order[product_ids][]"], input[name="purchase[product_ids][]"]').on("click", function() {
        var e = $(this).parents("[data-cf-product-template=true]"),
            t = $(e).find("[data-cf-product-name='true']").html();
        $(".product-name").html(t);
        var i = $(e).find("[data-cf-product-price='true']").html();
        $(".product-price").html(i), $(".product-price").attr("taxamo-currency", $(e).find("[data-cf-product-price='true']").attr("taxamo-currency"));
        try {
            if ($("#bump-offer").length > 0 && $(".product-price").length > 0 && "on" != $("#bump-offer").val()) {
                var n = $("#bump-offer").val(),
                    a = $(".elOrderProductOptinProductName").find("input[value='" + n + "']").next(".elOrderProductOptinPrice").html().replace(/\D/g, ""),
                    r = $(".elOrderProductOptinProductName").find("input[value='" + n + "']").next(".elOrderProductOptinPrice").html(),
                    o = $(".elOrderProductOptinProductName").find("input[value='" + n + "']").nextAll("label:first").text(),
                    s = $(".product-price").html().replace(/\D/g, ""),
                    l = parseInt(a) + parseInt(s);
                $("#bump-offer").is(":checked") ? (0 == $("#product-price-with-bump").length ? $("<div id='product-price-with-bump' style='display: none'>" + l + "</div>").insertAfter(".product-price") : $("#product-price-with-bump").html(l), 0 == $("#product-bump-name").length && ($("<div id='product-bump-name' class='pull-left elOrderProductOptinProductName'>" + o + "</div><div class='pull-right elOrderProductOptinPrice' id='product-bump-price'>" + r + "</div>").insertAfter(".product-price"), $("#product-bump-name").css("clear", "both"), $("#product-bump-name").css("width", "auto"))) : ($("#product-price-with-bump").length && $("#product-price-with-bump").remove(), $("#product-bump-name").length && $("#product-bump-name").remove(), $("#product-bump-price").length && $("#product-bump-price").remove()), $("#product-price-original").html(i)
            }
        } catch (c) {}
        try {
            calcTaxamo()
        } catch (c) {}
    }), $('input[name="purchase[product_id]"], input[name="order[product_ids][]"], input[name="purchase[product_ids][]"]').on("change", function() {
        $('input[name="purchase[product_id]"]:not(:checked), input[name="purchase[product_ids][]"]:not(:checked)').not("#cfAR input").each(function() {
            $('#cfAR input[name="purchase[product_ids][]"]:checkbox[value=' + $(this).val() + "]").attr("checked", !1)
        }), $(this).attr("checked") && ($('#cfAR input[name="' + $(this).attr("name") + '"]:checkbox[value=' + $(this).val() + "]").attr("checked", !0), $('#cfAR input[name="purchase[product_ids][]"]:checkbox[value=' + $(this).val() + "]").attr("checked", !0))
    }), $('input[name="purchase[product_id]"], input[name="order[product_ids][]"], input[name="purchase[product_ids][]"]').first().click(), $('input[name="order_upsell[unique_order_token]"]').val(getURLParameter("unique_token"))
}), jQuery(function(e) {
    e("#cfAR").submit(function() {
        e(this).find("[data-stripe=number]").val(e("[data-stripe=number]").first().val()), e(this).find("[data-stripe=exp-month]").val(e("[data-stripe=exp-month]").first().val()), e(this).find("[data-stripe=exp-year]").val(e("[data-stripe=exp-year]").first().val()), e(this).find("[data-stripe=cvc]").val(e("[data-stripe=cvc]").first().val()), address_line1 = e("[name=address],[name=shipping_address]").filter(":visible:first"), 0 == address_line1.size() && (address_line1 = e("[name=address],[name=shipping_address]")), e(this).find("[data-stripe=address_line1]").val(address_line1.val()), address_city = e("[name=city],[name=shipping_city]").filter(":visible:first"), 0 == address_city.size() && (address_city = e("[name=city],[name=shipping_city]")), e(this).find("[data-stripe=address_city]").val(address_city.val()), address_state = e("[name=state],[name=shipping_state]").filter(":visible:first"), 0 == address_state.size() && (address_state = e("[name=state],[name=shipping_state]")), e(this).find("[data-stripe=address_state]").val(address_state.val()), address_zip = e("[name=zip],[name=shipping_zip]").filter(":visible:first"), 0 == address_zip.size() && (address_zip = e("[name=zip],[name=shipping_zip]")), e(this).find("[data-stripe=address_zip]").val(address_zip.val()), address_country = e("[name=country],[name=shipping_country]").filter(":visible:first"), 0 == address_country.size() && (address_country = e("[name=country],[name=shipping_country]")), e(this).find("[data-stripe=address_country]").val(address_country.val()), shipping_address = e("[name=shipping_address]").filter(":visible:first"), 0 == shipping_address.size() && (shipping_address = e("[name=shipping_address]")), e(this).find("[data-stripe=shipping_address]").val(shipping_address.val()), shipping_city = e("[name=shipping_city]").filter(":visible:first"), 0 == shipping_city.size() && (shipping_city = e("[name=shipping_city]")), e(this).find("[data-stripe=shipping_city]").val(shipping_city.val()), shipping_state = e("[name=shipping_state]").filter(":visible:first"), 0 == shipping_state.size() && (shipping_state = e("[name=shipping_state]")), e(this).find("[data-stripe=shipping_state]").val(shipping_state.val()), shipping_zip = e("[name=shipping_zip]").filter(":visible:first"), 0 == shipping_zip.size() && (shipping_zip = e("[name=shipping_zip]")), e(this).find("[data-stripe=shipping_zip]").val(shipping_zip.val()), shipping_country = e("[name=shipping_country]").filter(":visible:first"), 0 == shipping_country.size() && (shipping_country = e("[name=shipping_country]")), e(this).find("[data-stripe=shipping_country]").val(shipping_country.val());
        var t = e(this).find("[data-stripe=name]");
        if (0 == t.size() && (e(this).append("<input type='hidden' data-stripe='name'/>"), t = e(this).find("[data-stripe=name]")), 0 === t.val().length) {
            var i = e("[name=first_name]").filter(":visible:first");
            0 == i.size() && (i = e("[name=first_name]"));
            var n = e("[name=last_name]").filter(":visible:first");
            0 == n.size() && (n = e("[name=last_name]"));
            var a = "";
            i.size() > 0 && (a = i.val().trim()), n.size() > 0 && (a += " " + n.val().trim()), a = a.trim(), a.length > 0 && t.val(a)
        }
        return e("button").prop("disabled", !0), e("[href=#submit-form], [href=#submit-form-2step-order]").text("Submitting..."), e("[href=#submit-form], [href=#submit-form-2step-order]").prop("disabled", !0), "undefined" != typeof Stripe ? ("undefined" != typeof stripeResponseHandler && Stripe.card.createToken(e("#cfAR"), stripeResponseHandler), !1) : e("#btform")[0] && "" == e("#cfAR").find('[name="purchase[payment_method_nonce]"]').val() ? (e("#btform input[type=submit]").first().click(), setTimeout(function() {
            if (e("#cfAR").find('[name="purchase[payment_method_nonce]"]').val(e('[name="purchase[payment_method_nonce]"]').first().val()), "" == e("#cfAR").find('[name="purchase[payment_method_nonce]"]').val()) return e("[data-href-original]").each(function() {
                e(this).attr("href", e(this).data("href-original")), e(this).removeAttr("data-href-original")
            }), e("#order-declined-message").html("Error with card"), e("#order-declined-message").show(), window.location = "#order-declined-message", e("button").prop("disabled", !1), e("[href=#submit-form], [href=#submit-form-2step-order]").text("Submit and Retry"), e("[href=#submit-form], [href=#submit-form-2step-order]").prop("disabled", !1), !1;
            var t = e("#cfAR");
            return t.get(0).submit(), !0
        }, 2e3), !1) : !0
    })
}), $(document).ready(function() {
    function e() {
        getVars = void 0, getVars = document.location.search.length > 1 ? document.location.search.substring(1).split("&") : new Array(0);
        for (var e = 0; e < getVars.length; e++) tempArray = getVars[e].split("="), getVars[tempArray[0]] = decodeURIComponent(tempArray[1]), delete tempArray
    }
    try {
        $("form").each(function() {
            $(this).parsley()
        })
    } catch (t) {}
    if (e(), "true" == getVars.declined && (location.href = "#order-declined-message", $("#order-declined-message").show(), $("#add-to-cart-form").fadeIn(), $stepOrderWrapper = $("[href=#submit-form-2step]").closest(".elOrder2Step"))) {
        $stepOrderWrapper.find(".o2step_step1").hide(), $stepOrderWrapper.find(".o2step_step2").show();
        try {
            braintree_setup()
        } catch (t) {}
        $stepOrderWrapper.find(".order2Step-step").removeClass("order2StepActive"), $stepOrderWrapper.find(".order2Step-step-2").addClass("order2StepActive"), $stepOrderWrapper.find(".order2StepProgress").removeClass("order2Step25"), $stepOrderWrapper.find(".order2StepProgress").addClass("order2Step75"), $(".o2step_step2").prepend('<a href="#" class="goBacktoStepOneOrderBump" style="display: block; color: #888 !important; text-none: underline;font-size: 11px; color: #333; padding: 5px; padding-top: 0;padding-bottom: 15px; margin-top: 0;"><i class="fa fa-arrow-left" style="padding-right: 7px;"></i><span class="goBacktoStepOneOrderBumpSpan">Edit Shipping Details</span></a>')
    }
}), $(function() {
    $('[href*="#yes-link"], [href*="#no-link"], [data-cf-id=yes-link], [data-cf-id=yes-link-2], [data-cf-id=no-link]').click(function(e) {
        return $(this).data("clicked") ? (e.preventDefault(), !1) : ($(".otoloading").show(), !0)
    })
}), cfpeorders = !0), $(document).ready(function() {
    function e(e) {
        var t = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return e.match(t) ? RegExp.$1 : !1
    }

    function t(e, t) {
        setTimeout(function() {
            u(e, "fade", 0), $("#" + e + " .de-video-block").each(function() {
                $videoType = $(this).attr("data-video-type"), "evp" == $videoType && ($video = $(this).attr("data-evp-url"), $(".elVideo", this).html("" == $video || void 0 == $video ? "No Video Set..." : $video))
            })
        }, t)
    }

    function i(e, t) {
        setTimeout(function() {
            u(e, "scale", 0), $("#" + e + " .de-video-block").each(function() {
                $videoType = $(this).attr("data-video-type"), "evp" == $videoType && ($video = $(this).attr("data-evp-url"), $(".elVideo", this).html("" == $video || void 0 == $video ? "No Video Set..." : $video))
            })
        }, t)
    }

    function n(e, t) {
        var i = 0;
        $("#" + e).css("opacity", 0), $("#" + e).hasClass("containerModal") ? $("#" + e).css("top", i + "px") : $("#" + e).css("position", "relative"), $("#" + e).delay(t).velocity({
            opacity: 1
        }, 200)
    }

    function a(e, t) {
        var i = 0;
        $("#" + e).css("opacity", 0), $("#" + e).hasClass("containerModal") ? $("#" + e).css("top", i + "px") : $("#" + e).css("position", "relative"), $("#" + e).delay(t).velocity({
            opacity: 1,
            scaleX: 1.1,
            scaleY: 1.1
        }, 200, function() {
            $("#" + e).velocity({
                scaleX: 1,
                scaleY: 1
            }, 200)
        })
    }

    function r(e, t) {
        $("#" + e).css("opacity", 0), $("#" + e).css("position", "relative"), $("#" + e).css("left", "-800px").delay(t).velocity({
            opacity: 1,
            left: 30
        }, 200, function() {
            $(this).velocity({
                left: 0
            }, 200)
        })
    }

    function o(e, t) {
        $("#" + e).css("opacity", 0), $("#" + e).css("position", "relative"), $("#" + e).css("right", "-800px").delay(t).velocity({
            opacity: 1,
            right: 30
        }, 200, function() {
            $(this).velocity({
                right: 0
            }, 200)
        })
    }

    function s(e, t) {
        $("#" + e).css("opacity", 0), $("#" + e).hasClass("containerModal") || $("#" + e).css("position", "relative"), $("#" + e).css("top", "-800px").delay(t).velocity({
            opacity: 1
        }, 200, function() {
            $(this).velocity({
                top: 0
            }, 200)
        })
    }

    function l(e, t) {
        $("#" + e).css("opacity", 0), $("#" + e).css("position", "relative"), $("#" + e).css("bottom", "-800px").delay(t).velocity({
            opacity: 1
        }, 200, function() {
            $(this).velocity({
                bottom: 0
            }, 200)
        })
    }

    function c() {
        $ID = "modalPopup", $type = $("#" + $ID).attr("data-animate"), $delay = $("#" + $ID).attr("data-delay"), u($ID, $type, $delay)
    }

    function u(e, t, i) {
        $("#" + e).show(), $("#" + e).hasClass("containerModal") && ($windowHeight = $(window).height(), $scrollPosition = $(window).scrollTop(), $popupHeight = $("#" + e).outerHeight(), $popupMarginTop = $("#" + e).css("marginTop"), $popupMarginTop = $popupMarginTop.replace("px", ""), $popupMarginTop = parseInt($popupMarginTop), $popupHeight = $popupHeight + $popupMarginTop + $popupMarginTop, $popupHeight > $windowHeight ? ($(".containerWrapper").css("overflow", "hidden"), $(".containerWrapper").css("height", $popupHeight + "px"), $("#" + e).css("position", "absolute"), $windowScroll = $(window).scrollTop(), $(window).scrollTop(0).promise().done(function() {
            $modalscrolltop = 0, $(".modalBackdropWrapper").show(), $(".modalBackdropWrapper").css({
                opacity: 1,
                top: 0
            }), d(e, t, i, $modalscrolltop)
        })) : ($("#" + e).css("position", "fixed"), $modalscrolltop = $scrollPosition, $(".containerWrapper").css("overflow", "hidden"), $(".modalBackdropWrapper").show(), $(".modalBackdropWrapper").css({
            opacity: 1,
            top: 0
        }), d(e, t, i, $modalscrolltop)))
    }

    function d(e, t, i, c) {
        "fadex" == t || "fade" == t ? n(e, i, c) : "scale" == t ? a(e, i, c) : "left" == t ? r(e, i) : "right" == t ? o(e, i) : "top" == t ? s(e, i, c) : "bottom" == t && l(e, i)
    }

    function p(e) {
        var t = e.toString()[0];
        if ("-" == t) {
            e = e.toString(), e = e.replace("-", "");
            var i = (10 > e ? "0" : "") + e;
            return "-" + i
        }
        var i = (10 > e ? "0" : "") + e;
        return "+" + i
    }

    function h(e, t) {
        "undefined" == typeof e && "" != t ? "undefined" != typeof t && $("#" + t.replace(",", ", #")).fadeOut() : "undefined" == typeof t && "" != e ? "undefined" != typeof e && $("#" + e.replace(",", ", #")).fadeIn() : "" != e && "" != t && "undefined" != typeof e && "undefined" != typeof t && ($("#" + t.replace(",", ", #")).hide(), $("#" + e.replace(",", ", #")).fadeIn())
    }

    function f(e) {
        e = $.trim(e);
        var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return t.test(e)
    }

    function m(e) {
        if (document.createEvent) {
            var t = document.createEvent("MouseEvents");
            t.initMouseEvent("mousedown", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), e[0].dispatchEvent(t)
        } else element.fireEvent && e[0].fireEvent("onmousedown")
    }

    function g() {
        date = $('.selectAW-date[data-cf-name="webinar-date"]').val(), time = $('.selectAW-date[data-cf-name="webinar-time"]').val(), webinar_datetime = moment(date + " " + time, "YYYY-MM-DD HH:mm"), webinar_datetime_offset = moment.unix(webinar_datetime), now = moment(), now_offset = moment.unix(now), webinar_delay = webinar_datetime.diff(now), webinar_delay_offset = moment.unix(webinar_delay), webinar_delay_offset = moment.unix(webinar_delay), $("#webinar_delay").attr("value", webinar_delay)
    }

    function _(e, t) {
        "hide" == e ? $("#" + t).hide() : "submit" == e ? $("a[href='#submit-form']").trigger("click") : "popup" == e ? c() : "hideshow" == e && ($("#" + t).hide(), $show = $("#" + t).attr("data-show-ids"), $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).show()
        })))
    }

    function y(e) {
        if ($affiliateID = $("body").attr("data-affiliate-id"), $affiliateLink = $("#" + e + " .affLinkBuilderCustomLinks").val(), $affiliateParam = $("body").attr("data-affiliate-param"), "#" == $affiliateLink) alert("no affiliate link selected...");
        else {
            $subID1 = $("#" + e + " .affiliateLinkAffSubID1").val(), $subID2 = $("#" + e + " .affiliateLinkAffSubID2").val(), $popup = $("#" + e + " .affLinkPopups").is(":checked") ? !0 : !1, $autoplay = $("#" + e + " .affLinkAutoplay").is(":checked") ? !0 : !1;
            var t = $affiliateLink; - 1 == $affiliateLink.indexOf($affiliateParam) && (t = "cf_affiliate_id" == $affiliateParam ? $affiliateLink + "?" + $affiliateParam + "=" + $affiliateID + "&affiliate_id=" + $affiliateID : $affiliateLink + "?" + $affiliateParam + "=" + $affiliateID), t += "&aff_sub=" + encodeURIComponent($subID1) + "&aff_sub2=" + encodeURIComponent($subID2) + "&nopopup=" + $popup + "&noautoplay=" + $autoplay, $("#" + e + " .affiliateLinkAffOutput").val(t)
        }
    }
    if (parent.postMessage) {
        var v = $("head").html();
        parent.postMessage({
            meta: v
        }, "*")
    }
    $(".containerWrapper .elInput[name='email'].required0").removeClass("required0").addClass("required1"), $("a").each(function() {
            target = $(this).attr("target"), "undefined" != typeof target && target.indexOf("_self") >= 0 && $(this).attr("target", "_parent"), str = $(this).attr("href"), "undefined" != typeof str && (str.indexOf("http") >= 0 || str.indexOf("www.") >= 0) && (target = $(this).attr("href"), "undefined" != typeof target && 0 == target.indexOf("_blank") && $(this).attr("target", "_parent"))
        }), $(".affLinkSideOptions").length && $(".affLinkSideOptions").each(function() {
            $(this).find(".affLinkExtraOptions").first().html('<input type="checkbox" class="affLinkPopups garlic-auto-save" value=""> Turn OFF Popups'), $(this).find(".affLinkExtraOptions").last().html('<input type="checkbox" class="affLinkAutoplay garlic-auto-save" value=""> Turn OFF AutoPlay')
        }), $(".elProductOptionsBox").length && ($(".elProductOptionsBox .elOrderProductOptinProductName").each(function() {
            $(this).find("input").is(":checked") && ($(".elProductOptionsBox .elOrderProductOptinProductName").removeClass("activeRadioProduct"), $(this).addClass("activeRadioProduct"))
        }), $(".elProductOptionsBox .elOrderProductOptinProductName input").change(function() {
            $(this).is(":checked") && ($(".elProductOptionsBox .elOrderProductOptinProductName").removeClass("activeRadioProduct"), $(this).parent().addClass("activeRadioProduct"))
        }), $(".elProductOptionsBox select").empty(), $(".elProductOptionsBox .elOrderProductOptinProducts").each(function() {
            title = $(this).find("label").text(), id = $(this).find("input").val(), price = $(this).find(".elOrderProductOptinPrice").text(), $(this).hasClass("hide") || $(".elProductOptionsBox select").append('<option value="' + id + '">' + title + " " + price + "</option>")
        }), $(".elProductOptionsBox select").change(function() {
            id = $(this).val(), $(".elOrderProductOptinProducts input").filter(function() {
                return $(this).val() === id
            }).prop("checked", !0).trigger("click")
        })),
        function(e, t) {
            var i = {
                    ratio: 16 / 9,
                    videoId: "ZCAnLxRvNNc",
                    mute: !0,
                    repeat: !0,
                    width: e(t).width(),
                    wrapperZIndex: 99,
                    playButtonClass: "tubular-play",
                    pauseButtonClass: "tubular-pause",
                    muteButtonClass: "tubular-mute",
                    volumeUpClass: "tubular-volume-up",
                    volumeDownClass: "tubular-volume-down",
                    increaseVolumeBy: 10,
                    start: 0
                },
                n = function(n, a) {
                    var a = e.extend({}, i, a),
                        r = e("body");
                    $node = e(n);
                    var o = '<div id="tubular-container" style="overflow: hidden; display: none; position: fixed; z-index: -1; top: 0;margin-top: 0;width: 100%; height: 100%"><div id="tubular-player" style="position: absolute"></div></div><div id="tubular-shield" style="width: 100%; height: 100%; z-index: 0; position: absolute; left: 0; top: 0;"></div>';
                    e("html,body").css({
                        width: "100%",
                        height: "100%"
                    }), r.prepend(o), $node.css({
                        position: "relative",
                        "z-index": a.wrapperZIndex
                    }), t.player, t.onYouTubeIframeAPIReady = function() {
                        player = new YT.Player("tubular-player", {
                            width: a.width,
                            height: Math.ceil(a.width / a.ratio),
                            videoId: a.videoId,
                            playerVars: {
                                controls: 0,
                                showinfo: 0,
                                rel: 0,
                                iv_load_policy: 3,
                                modestbranding: 1,
                                wmode: "transparent"
                            },
                            events: {
                                onReady: onPlayerReady,
                                onStateChange: onPlayerStateChange
                            }
                        })
                    }, t.onPlayerReady = function(t) {
                        if (s(), a.mute && t.target.mute(), t.target.seekTo(a.start), t.target.playVideo(), setTimeout(function() {
                                e("#tubular-container").fadeIn(1500)
                            }, 500), "undefined" != typeof e(".modalBackdropWrapper").attr("data-youtube-volume") && "fadein" == e(".modalBackdropWrapper").attr("data-youtube-volume") && (vol_number = 0, t.target.unMute(), t.target.setVolume(0), fadeVolumeIn = setInterval(function() {
                                vol_number += 5, t.target.setVolume(vol_number)
                            }, 500), setTimeout(function() {
                                clearInterval(fadeVolumeIn)
                            }, 1e4)), "undefined" != typeof e(".modalBackdropWrapper").attr("data-youtube-hours") && "undefined" != e(".modalBackdropWrapper").attr("data-youtube-minutes") && "undefined" != e(".modalBackdropWrapper").attr("data-youtube-seconds")) {
                            var i = parseInt(e(".modalBackdropWrapper").attr("data-youtube-hours")),
                                n = parseInt(e(".modalBackdropWrapper").attr("data-youtube-minutes")),
                                r = parseInt(e(".modalBackdropWrapper").attr("data-youtube-seconds"));
                            i = 3600 * i, n = 60 * n, totalSeconds = i + n + r, t.target.seekTo(totalSeconds, !0)
                        }
                    }, t.onPlayerStateChange = function(i) {
                        if (0 === i.data && a.repeat) {
                            var n = e(".modalBackdropWrapper").attr("data-youtube-endaction");
                            if ("loop" == n || "" == n || void 0 === n) player.seekTo(a.start);
                            else if ("hidevideo" == n) e("#tubular-container").hide();
                            else if ("redirect" == n) {
                                e("#tubular-container").hide();
                                var r = e(".modalBackdropWrapper").attr("data-youtube-redirecturl");
                                t.location = r
                            } else "popup" == n && (e("#tubular-container").hide(), c())
                        }
                    };
                    var s = function() {
                        var i, n, r = e(t).width(),
                            o = e(t).height(),
                            s = e("#tubular-player");
                        r / a.ratio < o ? (i = Math.ceil(o * a.ratio), s.width(i).height(o).css({
                            left: (r - i) / 2,
                            top: 0
                        })) : (n = Math.ceil(r / a.ratio), s.width(r).height(n).css({
                            left: 0,
                            top: (o - n) / 2
                        }))
                    };
                    e(t).on("resize.tubular", function() {
                        s()
                    }), e("body").on("click", "." + a.playButtonClass, function(e) {
                        e.preventDefault(), player.playVideo()
                    }).on("click", "." + a.pauseButtonClass, function(e) {
                        e.preventDefault(), player.pauseVideo()
                    }).on("click", "." + a.muteButtonClass, function(e) {
                        e.preventDefault(), player.isMuted() ? player.unMute() : player.mute()
                    }).on("click", "." + a.volumeDownClass, function(e) {
                        e.preventDefault();
                        var t = player.getVolume();
                        t < a.increaseVolumeBy && (t = a.increaseVolumeBy), player.setVolume(t - a.increaseVolumeBy)
                    }).on("click", "." + a.volumeUpClass, function(e) {
                        e.preventDefault(), player.isMuted() && player.unMute();
                        var t = player.getVolume();
                        t > 100 - a.increaseVolumeBy && (t = 100 - a.increaseVolumeBy), player.setVolume(t + a.increaseVolumeBy)
                    })
                },
                a = document.createElement("script");
            a.src = "//www.youtube.com/iframe_api";
            var r = document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(a, r), e.fn.tubular = function(t) {
                return this.each(function() {
                    e.data(this, "tubular_instantiated") || e.data(this, "tubular_instantiated", n(this, t))
                })
            }
        }(jQuery, window), checkVideoAttr = $(".modalBackdropWrapper").attr("data-youtube-background"), showVideoBG = $(".modalBackdropWrapper").attr("data-youtube-selectbox"), "undefined" == typeof checkVideoAttr || 0 == e(checkVideoAttr) || "youtube" == showVideoBG && (videoid = checkVideoAttr.replace("https://www.youtube.com/watch?v=", ""), videoid = videoid.replace("https://youtu.be/", ""), $("html").tubular({
            videoId: videoid
        }));
    var T = navigator.userAgent.toLowerCase(); - 1 != T.indexOf("safari") && (T.indexOf("chrome") > -1 || ($(".social-likes__icon").hide(), $(".social-likes__button").attr("style", "padding-left: 10px !important"))), $url = window.location.href, $queries = $.parseParams($url), $.each($queries, function(e, t) {
        $(".elInput[name='" + e + "']").val(t)
    }), $utm_source = $queries.nodo_source, $pID = $("#page-id").val(), $rootID = $("#root-id").val(), $variantcheck = $("#variant-check").val(), $userID = $("#user-id").val(), $cookieCheck = $.cookie("uniq-nodo-" + $rootID), void 0 == $cookieCheck && $.cookie("uniq-nodo-" + $rootID, "x", {
        expires: .5
    }), setTimeout(function() {
        $(".addthisevent-drop").append("Add to Calendar")
    }, 1e3), $(".containerWrapper .de-video-block").each(function() {
        $videoType = $(this).attr("data-video-type"), "evp" == $videoType && ($video = $(this).attr("data-evp-url"), $visible = $(this).is(":visible"), 0 == $visible || $(".elVideo", this).html("" == $video || void 0 == $video ? "No Video Set..." : $video))
    }), $(".editor-video-holder").hide(), $.velocity.defaults.easing = "easeInOutsine";
    var b = function() {
        $("[data-trigger='load']").each(function() {
            $(this).attr("data-trigger", "ran"), $ID = $(this).attr("id"), $type = $(this).attr("data-animate"), $delay = $(this).attr("data-delay"), d($ID, $type, $delay, 0)
        })
    };
    $iframeCheck = $("#iframeCheck").val(), "true" == $iframeCheck || b(), $("[data-trigger='scroll']").waypoint(function() {
        $ID = $(this).attr("id"), $type = $(this).attr("data-animate"), $delay = $(this).attr("data-delay"), $(this).css("opacity", 0), $(this).css("position", "relative"), d($ID, $type, $delay, 0), $(this).attr("data-trigger", "done")
    }, {
        offset: "75%",
        triggerOnce: !0
    }), $("[data-timed-style='fade']").each(function() {
        $ID = $(this).attr("id"), $(this).css("display", ""), $(this).attr("data-timed-minutes") ? ($minutes = $(this).attr("data-timed-minutes"), $minutes = "" == $minutes ? 0 : $(this).attr("data-timed-minutes")) : $minutes = 0, $minutes = 6e4 * $minutes, $(this).attr("data-timed-seconds") ? ($seconds = $(this).attr("data-timed-seconds"), $seconds = "" == $seconds ? 0 : $(this).attr("data-timed-seconds")) : $seconds = 0, $seconds = 1e3 * $seconds, $total_ms = $minutes + $seconds, 0 == $total_ms ? "modalPopup" == $ID ? u($ID, "fade", 0) : $("#" + $ID).show() : t($ID, $total_ms)
    }), $("[data-timed-style='scale']").each(function() {
        $ID = $(this).attr("id"), $(this).css("display", ""), $(this).attr("data-timed-minutes") ? ($minutes = $(this).attr("data-timed-minutes"), $minutes = "" == $minutes ? 0 : $(this).attr("data-timed-minutes")) : $minutes = 0, $minutes = 6e4 * $minutes, $(this).attr("data-timed-seconds") ? ($seconds = $(this).attr("data-timed-seconds"), $seconds = "" == $seconds ? 0 : $(this).attr("data-timed-seconds")) : $seconds = 0, $seconds = 1e3 * $seconds, $total_ms = $minutes + $seconds, 0 == $total_ms ? "modalPopup" == $ID ? u($ID, "scale", 0) : $("#" + $ID).show() : i($ID, $total_ms)
    }), $(".swipebox").magnificPopup({
        type: "image"
    }), $(".elVideoModalWrapper .swipebox").magnificPopup({
        type: "iframe",
        iframe: {
            patterns: {
                dailymotion: {
                    index: "dailymotion.com",
                    id: function(e) {
                        var t = e.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                        return null !== t ? void 0 !== t[4] ? t[4] : t[2] : null
                    },
                    src: "http://www.dailymotion.com/embed/video/%id%"
                },
                wistia: {
                    index: "wistia.com",
                    id: function(e) {
                        return $url = e, "" != $url && void 0 !== $url ? ($url = $url.split("/"), $url = $url[$url.length - 1]) : void($url = "fqiy4bjdu8")
                    },
                    src: "//fast.wistia.net/embed/iframe/%id%?autoPlay=1&playerPreference=html5&wmode=transparent"
                }
            }
        }
    }), $(document).on("click", ".elIMG", function() {
        $(this).attr("data-imagelink") && ($url = $(this).attr("data-imagelink"), "#open-popup" == $url || "#close-popup" == $url || "#submit-form" == $url || ($(this).attr("target") ? ($target = $(this).attr("target"), "_self" == $target ? window.location.href = $url : window.open($url, "_blank")) : window.location.href = $url))
    }), $(".wideCountdown-demo").remove(), $(".wideCountdown").removeClass("hide"), $(".wideCountdown").each(function() {
        var e = $(this).attr("data-date");
        if ("undefined" != typeof e) $date = e.split("/"), $time = $(this).attr("data-time"), $tz = $(this).attr("data-tz"), $lang = $(this).attr("data-lang"), $countdownDate = new Date($date[2], $date[0] - 1, $date[1], $time, 0, 0), $countdownDateZone = moment.tz(new Date($date[2], $date[0] - 1, $date[1], $time, 0, 0), $tz).zone(), $countdownDateZone /= 60, $countdownDateZone = $countdownDateZone *= -1, $countdownDateZone = p($countdownDateZone), $.countdown.setDefaults($.countdown.regionalOptions[$lang]), $(this).countdown({
            until: $countdownDate,
            timezone: $countdownDateZone,
            padZeroes: !0,
            alwaysExpire: !0,
            onExpiry: function() {
                $action = $(this).closest(".elCountdown").attr("data-expire-type"), "showhide" == $action ? ($hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), $hide && ($hide = $hide.split(","), $.each($hide, function() {
                    $("#" + this).hide()
                })), $show && ($show = $show.split(","), $.each($show, function() {
                    $("#" + this).show()
                }))) : ($url = $(this).attr("data-url"), "" == $url || "#" == $url || (window.location.href = $url))
            }
        });
        else if ($(".countdown-time").text()) {
            $date = $(".countdown-time").text(), console.log("countdown time: " + $date);
            var t = $date.split(" ");
            if (void 0 === t[1]) var t = $date.split("T");
            "" != t[0] && ($date = t[0], $date = $date.split("/"), $time = t[1], $time = "" == $time ? [0, 0] : $time.split(":"), $countdownDate = new Date($date[0], $date[1] - 1, $date[2], $time[0], 0, 0), $lang = $(this).attr("data-lang"), $.countdown.setDefaults($.countdown.regionalOptions[$lang]), $(this).countdown({
                until: $.countdown.UTCDate(0, $date[0], $date[1] - 1, $date[2], $time[0], 0, 0),
                padZeroes: !0,
                alwaysExpire: !0,
                onExpiry: function() {
                    location.reload()
                }
            }))
        } else $action = $(this).closest(".elCountdown").attr("data-expire-type"), "showhide" == $action ? ($hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), $hide && ($hide = $hide.split(","), $.each($hide, function() {
            $("#" + this).hide()
        })), $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).show()
        })), $(this).hide()) : ($url = $(this).attr("data-url"), "" == $url || "#" == $url ? $(this).hide() : window.location.href = $url)
    }), $(".wideCountdownEvergreenDaily-demo").remove(), $(".wideCountdownEvergreenDaily").removeClass("hide"), $(".wideCountdownEvergreenDaily").each(function() {
        $date = moment().format("MM/DD/YYYY"), $date = $date.split("/"), $time = $(this).attr("data-time"), console.log($time), $tz = $(this).attr("data-tz"), $lang = $(this).attr("data-lang"), $countdownDate = new Date($date[2], $date[0] - 1, $date[1], $time, 0, 0), $countdownDateZone = moment.tz(new Date($date[2], $date[0] - 1, $date[1], $time, 0, 0), $tz).zone(), $countdownDateZone /= 60, $countdownDateZone = $countdownDateZone *= -1, $countdownDateZone = p($countdownDateZone), $.countdown.setDefaults($.countdown.regionalOptions[$lang]), $thisID = $(this).closest(".elCountdownEvergreenDaily").attr("id"), $.cookie("cf-eg-" + $thisID) ? $countdownDate = 0 : $.cookie("cf-eg-nd-" + $thisID) && ($countdownDate = 1e44, $(this).hide(), $hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), $hide && ($hide = $hide.split(","), $.each($hide, function() {
            $("#" + this).hide()
        })), $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).hide()
        })), $show = $(this).attr("data-show-ids-extra"), $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).show()
        }))), $revisitAction = $(this).closest(".elCountdownEvergreenDaily").attr("data-revisit-action"), "expirecookie" == $revisitAction ? ($cookieDays = $(this).attr("data-expire-cookie"), $.cookie("cf-eg-" + $thisID, "x", {
            expires: parseInt($cookieDays)
        })) : "newdiv" == $revisitAction ? ($cookieDays = $(this).attr("data-expire-cookie-nd"), $.cookie("cf-eg-nd-" + $thisID, "x", {
            expires: parseInt($cookieDays)
        })) : ($.removeCookie("cf-eg-" + $thisID), $.removeCookie("cf-eg-ng-" + $thisID)), $(this).countdown({
            until: $countdownDate,
            timezone: $countdownDateZone,
            padZeroes: !0,
            alwaysExpire: !0,
            onExpiry: function() {
                $action = $(this).closest(".elCountdownEvergreenDaily").attr("data-expire-type"), "showhide" == $action ? ($hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), $hide && ($hide = $hide.split(","), $.each($hide, function() {
                    $("#" + this).hide()
                })), $show && ($show = $show.split(","), $.each($show, function() {
                    $("#" + this).show()
                }))) : ($url = $(this).attr("data-url"), "" == $url || "#" == $url || (window.location.href = $url))
            }
        })
    }), $(".wideCountdownEvergreen-demo").remove(), $(".wideCountdownEvergreen").removeClass("hide"), $(".wideCountdownEvergreen").each(function() {
        $hours = $(this).attr("data-hours"), $minutes = $(this).attr("data-minutes"), $seconds = $(this).attr("data-seconds"), $hours = "" == $hours || void 0 == $hours ? 0 : 3600 * parseInt($hours), $minutes = "" == $minutes || void 0 == $minutes ? 0 : 60 * parseInt($minutes), $seconds = "" == $seconds || void 0 == $seconds ? 0 : parseInt($seconds), $countdownDate = $hours + $minutes + $seconds, $lang = $(this).attr("data-lang"), $.countdown.setDefaults($.countdown.regionalOptions[$lang]), $thisID = $(this).closest(".elCountdownEvergreen").attr("id"), $.cookie("cf-eg-" + $thisID) ? $countdownDate = 0 : $.cookie("cf-eg-nd-" + $thisID) && ($countdownDate = 1e44, $(this).hide(), $hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), "undefined" != typeof $hide && ($hide = $hide.split(","), $.each($hide, function() {
            $("#" + this).hide()
        })), "undefined" != typeof $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).hide()
        })), $show = $(this).attr("data-show-ids-extra"), "undefined" != typeof $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).show()
        }))), $revisitAction = $(this).closest(".elCountdownEvergreen").attr("data-revisit-action"), "expirecookie" == $revisitAction ? ($cookieDays = $(this).attr("data-expire-cookie"), $.cookie("cf-eg-" + $thisID, "x", {
            expires: parseInt($cookieDays)
        })) : "newdiv" == $revisitAction ? ($cookieDays = $(this).attr("data-expire-cookie-nd"), $.cookie("cf-eg-nd-" + $thisID, "x", {
            expires: parseInt($cookieDays)
        })) : ($.removeCookie("cf-eg-" + $thisID), $.removeCookie("cf-eg-ng-" + $thisID)), $(this).countdown({
            until: +$countdownDate,
            padZeroes: !0,
            alwaysExpire: !0,
            onExpiry: function() {
                $action = $(this).closest(".elCountdownEvergreen").attr("data-expire-type"), "showhide" == $action ? ($hide = $(this).attr("data-hide-ids"), $show = $(this).attr("data-show-ids"), "undefined" != typeof $hide && ($hide = $hide.split(","), $.each($hide, function() {
                    $("#" + this).hide()
                })), "undefined" != typeof $show && ($show = $show.split(","), $.each($show, function() {
                    $("#" + this).show()
                }))) : ($url = $(this).attr("data-url"), "" == $url || "#" == $url || (window.location.href = $url))
            }
        })
    }), $(document).on("click", ".modalBackdropWrapper", function() {
        return $(".containerModal").delay(0).velocity({
            opacity: 0,
            top: -800
        }, 200, function() {
            $(".modalBackdropWrapper").css({
                opacity: 0,
                top: -800
            }), $(".modalBackdropWrapper").hide(), $(".containerModal").hide()
        }), $(".containerWrapper").css("overflow", "initial"), $(".containerWrapper").css("height", ""), !1
    }), $(document).on("click", ".closeLPModal", function() {
        return $(".containerModal").delay(0).velocity({
            opacity: 0,
            top: -800
        }, 200, function() {
            $(".modalBackdropWrapper").css({
                opacity: 0,
                top: -800
            }), $(".modalBackdropWrapper").hide(), $(".containerModal").hide()
        }), $(".containerWrapper").css("overflow", "initial"), $(".containerWrapper").css("height", ""), !1
    }), $(document).on("click", "div[data-elbuttontype='2'] a", function(e) {
        e.stopPropagation();
        var t = $(this).attr("data-show-button-ids"),
            i = $(this).attr("data-hide-button-ids");
        return h(t, i), !1
    }), $(document).on("click", ".elButton", function(e) {
        var t = $(this).parent().attr("data-elbuttontype");
        return "2" == t ? (e.preventDefault(), !1) : void 0
    }), $(document).on("click", "a[href='#close-popup'], .elIMG[data-imagelink='#close-popup']", function() {
        return $(".closeLPModal").trigger("click"), !1
    }), $(document).on("click", "a[href='#open-popup'], .elIMG[data-imagelink='#open-popup']", function() {
        var e = $(this).parent().attr("data-elbuttontype");
        return ("undefined" == typeof e || "2" != e) && (c(), $("#" + $ID + " .de-video-block").each(function() {
            $videoType = $(this).attr("data-video-type"), "evp" == $videoType && ($video = $(this).attr("data-evp-url"), $(".elVideo", this).html("" == $video || void 0 == $video ? "No Video Set..." : $video))
        }), $("#" + $ID + " .de-video-block .elVideo iframe").each(function() {
            $autoplaycheck = $(this).attr("data-popup-autoplay"), "true" == $autoplaycheck && ($src = $(this).attr("src"), $src = $src.replace("autoplay=0", "autoplay=1"), $src = $src.replace("autoPlay=0", "autoPlay=1"), $(this).attr("src", $src), $(this).attr("data-popup-autoplay", "played"))
        })), !1
    }), $(document).on("click", "a[href='#print'], .elIMG[data-imagelink='#print']", function() {
        return window.print(), !1
    }), $(document).on("click", ".btnToggle", function() {
        return $(this).is(".elB1") ? ($showThis = $(this).attr("data-show"), $root = $(this).closest(".de-editable").attr("id"), $hideThis = $("#" + $root + " .elB2").attr("data-show"), $($showThis).show(), $($hideThis).hide(), $(this).hasClass("btnToggleActive") || ($getB1Color = $("#" + $root + " .elB1").css("color"), $getB2Color = $("#" + $root + " .elB2").css("color"), $(this).css("color", $getB2Color), $("#" + $root + " .elB2").css("color", $getB1Color)), $("#" + $root + " .btnToggle").removeClass("btnToggleActive"), $("#" + $root + " .btnToggle").removeClass("btnToggleDeactive"), $("#" + $root + " .elB1").addClass("btnToggleActive"), $("#" + $root + " .elB2").addClass("btnToggleDeactive")) : ($showThis = $(this).attr("data-show"), $root = $(this).closest(".de-editable").attr("id"), $hideThis = $("#" + $root + " .elB1").attr("data-show"), $($.trim($showThis)).show(), $($.trim($hideThis)).hide(), $(this).hasClass("btnToggleActive") || ($getB1Color = $("#" + $root + " .elB1").css("color"), $getB2Color = $("#" + $root + " .elB2").css("color"), $(this).css("color", $getB1Color), $("#" + $root + " .elB1").css("color", $getB2Color)), $("#" + $root + " .btnToggle").removeClass("btnToggleActive"), $("#" + $root + " .btnToggle").removeClass("btnToggleDeactive"), $("#" + $root + " .elB2").addClass("btnToggleActive"), $("#" + $root + " .elB1").addClass("btnToggleDeactive")), !1
    }), $(".stickyTop").sticky(), $(document).on("click", "a[href*='#scroll-'], .elIMG[data-imagelink*='#scroll-']", function() {
        return $getHref = $(this).attr("href"), $getTitle = $getHref.split("#scroll-"), $getTitle = $getTitle[1], $getTitle = $getTitle.replace(/%20/g, " "), $('.container[data-title="' + $getTitle + '"]').velocity("scroll", {
            duration: 500
        }), !1
    }), $pID = $("#page-id").val(), $requiredCheck = "", $(document).on("keypress", ":input:not(textarea):not([type=submit])", function(e) {
        13 == e.keyCode && ($(this).hasClass("noEnterSubmitForm") || $("a[href='#submit-form']").trigger("click"))
    }), $(document).on("click", "a[href='#submit-form'], .elIMG[data-imagelink='#submit-form'], a[href='#submit-form-2step'], a[href='#submit-form-2step-order']", function() {
        var e = $(this);
        return $action = $(this).attr("href"), $(".elInput").each(function(e, t) {
            name = $(this).attr("name"), t = $(this).val(), "" == name || "not-set" == name || "" == t || ("custom_type" == name ? ($customType = $(this).attr("data-custom-type"), void 0 != $customType && ($customType = $customType.toLowerCase(), $customType = $customType.replace(/\s+/g, "_"), $("#cf_contact_" + $customType).remove(), $("#cfAR").append("<input id='cf_contact_" + $customType + "' name='" + $customType + "' data-cf-form-field='" + $customType + "' data-param='" + $customType + "' value='" + t + "' data-storage='false' >"))) : $("#cf_contact_" + name).val(t))
        }).promise().done(function() {
            $requiredCheck = "", $elementPathSelector = "", $popupVisibleCheck = $("#modalPopup").is(":visible"), $elementPathSelector = 1 == $popupVisibleCheck ? "#modalPopup .elInput.required1" : ".elInput.required1", $($elementPathSelector).each(function() {
                $thisInput = $(this), $visible = $(this).is(":visible"), 0 == $visible || ("" == $thisInput.val() ? ($requiredCheck = "fail", $thisInput.css("border-color", "#B91517"), $thisInput.css("border-width", "3px")) : "email" == $thisInput.attr("name") ? (email = $thisInput.val(), f(email) ? ($thisInput.css("border-color", "#4a8920"), $thisInput.css("border-width", "3px")) : ($requiredCheck = "fail", $thisInput.css("border-color", "#B91517"), $thisInput.css("border-width", "3px"))) : ($thisInput.css("border-color", "#4a8920"), $thisInput.css("border-width", "3px")))
            }).promise().done(function() {
                if ($(".elInput.required0").css("border-color", "#4a8920"), $(".elInput.required0").css("border-width", "3px"), "fail" == $requiredCheck);
                else if ($arService = $("#submit-form-action").attr("data-ar-service"), "HTML" == $arService) $(".containerWrapper .de-input-block").each(function() {
                    $ID = $(this).attr("id"), $value = $(".elInput", this).val(), $(".nodoCustomHTML input[data-sync='" + $ID + "']").val($value)
                }).promise().done(function() {
                    $("input[name=payment_method_nonce]").each(function() {
                        $value = $(this).val(), $(".nodoCustomHTML input[data-sync='payment_method_nonce']").val($value), $("input[name='purchase[payment_method_nonce]']").val($value)
                    }), $(".nodoHiddenFormFields .elInput").each(function() {
                        $ID = $(this).attr("id"), $value = $(this).val(), $(".nodoCustomHTML input[data-sync='" + $ID + "']").val($value)
                    }).promise().done(function() {
                        e.text("Submitting..."), e.prop("disabled", !0), e.prop("href", "javascript:return false;"), $.ajax({
                            type: "POST",
                            url: $("head").attr("data-this-url") || window.location,
                            data: $("#cfAR").serialize()
                        }).always(function() {
                            "#submit-form-2step" == $action ? ($stepOrderWrapper = $(this).closest(".elOrder2Step"), $stepOrderWrapper.find(".o2step_step1").hide(), $stepOrderWrapper.find(".o2step_step2").show(), $stepOrderWrapper.find(".order2Step-step").removeClass("order2StepActive"), $stepOrderWrapper.find(".order2Step-step-2").addClass("order2StepActive"), $stepOrderWrapper.find(".order2StepProgress").removeClass("order2Step25"), $stepOrderWrapper.find(".order2StepProgress").addClass("order2Step75")) : ($(".nodoCustomHTML input[type='submit']").remove(), $(".nodoCustomHTML form").submit())
                        })
                    })
                });
                else {
                    $("#cfAR input[type='submit']").remove();
                    try {
                        "https://www.backpackcrm.com/orders" == $("#cfAR").attr("action") && SendData(SendData("cfAR", $("#cfAR")[0].onsubmit))
                    } catch (t) {}
                    if ("#submit-form-2step" == $action) {
                        $stepOrderWrapper = $(this).closest(".elOrder2Step"), $stepOrderWrapper.find(".o2step_step1").hide(), $stepOrderWrapper.find(".o2step_step2").show();
                        try {
                            braintree_setup()
                        } catch (i) {}
                        $stepOrderWrapper.find(".order2Step-step").removeClass("order2StepActive"), $stepOrderWrapper.find(".order2Step-step-2").addClass("order2StepActive"), $stepOrderWrapper.find(".order2StepProgress").removeClass("order2Step25"), $stepOrderWrapper.find(".order2StepProgress").addClass("order2Step75"), $("#bump-offer").attr("style", "margin: 4px 0px 0px -20px; cursor: pointer; float: left;");
                        var n = $(".checkbox.inline").attr("style");
                        $(".checkbox.inline").attr("style", n + "; cursor: auto !important;"), $(".goBacktoStepOneOrderBump").length || $(".o2step_step2").prepend('<a href="#" class="goBacktoStepOneOrderBump" style="display: block; color: #888 !important; text-none: underline;font-size: 11px; color: #333; padding: 5px; padding-top: 0;padding-bottom: 15px; margin-top: 0;"><i class="fa fa-arrow-left" style="padding-right: 7px;"></i><span class="goBacktoStepOneOrderBumpSpan">Edit Shipping Details</span></a>'), $.ajax({
                            type: "POST",
                            url: window.location,
                            data: $("#cfAR").serialize()
                        })
                    } else $("#cfAR").submit(function() {
                        "javascript:void(0)" != e.attr("href") && e.attr("data-href-original", e.attr("href")), e.attr("href", "javascript:void(0)")
                    }), $("#cfAR").submit()
                }
            })
        }), !1
    }), $(document).on("click", ".goBacktoStepOneOrderBump", function() {
        $stepOrderWrapper = $(this).closest(".elOrder2Step"), $stepOrderWrapper.find(".o2step_step2").hide(), $stepOrderWrapper.find(".o2step_step1").show(), $stepOrderWrapper.find(".order2Step-step").addClass("order2StepActive"), $stepOrderWrapper.find(".order2Step-step-2").removeClass("order2StepActive"), $stepOrderWrapper.find(".order2StepProgress").addClass("order2Step25"), $stepOrderWrapper.find(".order2StepProgress").removeClass("order2Step75")
    }), $("input, textarea").placeholder(), $("#modalPopup").hasClass("bounce") && ("true" == $queries.nopopup || ouibounce(!1, {
        aggressive: !0,
        timer: 500,
        sensitivity: 40,
        callback: function() {
            c()
        }
    })), "true" == $queries.noautoplay && $(".elVideoWrapper").each(function() {
        $elem = $(this), $videoType = $elem.attr("data-video-type"), "youtube" == $videoType ? ($src = $(".elVideo iframe", this).attr("src"), $src = $src.replace("autoplay=1", "autoplay=0"), $(".elVideo iframe", this).attr("src", $src)) : "vimeo" == $videoType ? ($src = $(".elVideo iframe", this).attr("src"), $src = $src.replace("autoplay=1", "autoplay=0"), $(".elVideo iframe", this).attr("src", $src)) : "wistia" == $videoType && ($src = $(".elVideo iframe", this).attr("src"), $src = $src.replace("autoPlay=1", "autoPlay=0"), $(".elVideo iframe", this).attr("src", $src))
    }), $(".elSelect").click(function() {
        m($("select", this))
    }).children().click(function() {
        return !1
    }), $localTime = moment().format("h:mm A"), $(".awLocalTime").text($localTime), setInterval(function() {
        $localTime = moment().format("h:mm A"), $(".awLocalTime").text($localTime)
    }, 6e4), $('.selectAW-date[data-cf-name="webinar-date"]').find("option").remove(), $autoWebinarDay1 = moment().add("days", 1).format("dddd, MMM Do, YYYY"), $autoWebinarDay1_raw = moment().add("days", 1).format("YYYY-MM-DD"), $selectText = $('.selectAW-date[data-cf-name="webinar-date"]').attr("data-selecttext"), $selectText || ($selectText = "Select Desired Date..."), $('.selectAW-date[data-cf-name="webinar-date"]').append('<option value="' + $autoWebinarDay1_raw + '">' + $selectText + "</option>"), $autoWebinarDay0 = moment().subtract("days", 1).format("dddd, MMM Do, YYYY"), $autoWebinarDay0_raw = moment().subtract("days", 1).format("YYYY-MM-DD"), $replayText = $('.selectAW-date[data-cf-name="webinar-date"]').attr("data-replaytext"), $replayText || ($replayText = "Watch Yesterday's Replay Now"), $('.selectAW-date[data-cf-name="webinar-date"]').append('<option value="' + $autoWebinarDay0_raw + '">' + $replayText + "</option>"), $('.selectAW-date[data-cf-name="webinar-date"]').append('<option value="' + $autoWebinarDay1_raw + '">' + $autoWebinarDay1 + "</option>"), $autoWebinarDay2 = moment().add("days", 2).format("dddd, MMM Do, YYYY"), $autoWebinarDay2_raw = moment().add("days", 2).format("YYYY-MM-DD"), $('.selectAW-date[data-cf-name="webinar-date"]').append('<option value="' + $autoWebinarDay2_raw + '">' + $autoWebinarDay2 + "</option>"), $autoWebinarDay3 = moment().add("days", 3).format("dddd, MMM Do, YYYY"), $autoWebinarDay3_raw = moment().add("days", 3).format("YYYY-MM-DD"), $('.selectAW-date[data-cf-name="webinar-date"]').append('<option value="' + $autoWebinarDay3_raw + '">' + $autoWebinarDay3 + "</option>"), $('.selectAW-date[data-cf-name="webinar-time"]').find("option").remove(), $('.selectAW-date[data-cf-name="webinar-time"]').each(function() {
        $11am = $(this).attr("data-time-11"), $2pm = $(this).attr("data-time-2"), $4pm = $(this).attr("data-time-4"), $6pm = $(this).attr("data-time-6"), $8pm = $(this).attr("data-time-8"), "off" != $11am && $(this).append('<option value="11:00">@ 11 am</option>'), "off" != $2pm && $(this).append('<option value="14:00">@ 2 pm</option>'), "off" != $4pm && $(this).append('<option value="16:00">@ 4 pm</option>'), "off" != $6pm && $(this).append('<option value="18:00">@ 6 pm</option>'), "off" != $8pm && $(this).append('<option value="20:00">@ 8 pm</option>')
    }).promise().done(function() {
        $('.selectAW-date[data-cf-name="webinar-time"]').val() || $('.selectAW-date[data-cf-name="webinar-time"]').append('<option value="18:00">@ 6 pm</option>'), g()
    }), $('.de-editable[data-de-type="awdtt"]').hide(), $removeSelectDateOnAutoWebinar = !1, $(document).on("change", '.selectAW-date[data-cf-name="webinar-date"]', function() {
        g(), $dateSelected = $(this).val(), $autoWebinarDay0_raw == $dateSelected ? $('.de-editable[data-de-type="awdtt"]').hide() : $('.de-editable[data-de-type="awdtt"]').show(), 0 == $removeSelectDateOnAutoWebinar && ($("option:first-child", this).remove(), $removeSelectDateOnAutoWebinar = !0)
    }), $(document).on("change", '.selectAW-date[data-cf-name="webinar-time"]', function() {
        g()
    }), $(document).on("load", function() {
        $('.selectAW-date[data-cf-name="webinar-date"]').size() > 0 && g()
    }), $("body").load(function() {
        $('.selectAW-date[data-cf-name="webinar-date"]').size() > 0 && g()
    }), $(".de-video-block").fitVids({
        customSelector: "iframe[src*='fast.wistia.net']"
    });
    try {
        $("video,audio").mediaelementplayer()
    } catch (S) {}
    $(document).on("click", "#closeCFPOPUP", function() {
        parent.postMessage("closeCF", "*")
    }), $(document).on("click", "html", function(e) {
        var t = $(e.target);
        (t.is(".container") || t.is(".containerWrapper") || t.is("html")) && parent.postMessage("closeCF", "*")
    });
    var w = window.addEventListener ? "addEventListener" : "attachEvent",
        k = window[w],
        C = "attachEvent" == w ? "onmessage" : "message";
    k(C, function(e) {
        "reanimate" == e.data && b()
    }, !1), $(".iframeblocked").append("<div class='iframeBlocker' ></div>"), $(document).on("keyup", ".elInput", function() {
        $input = $(this), $val = $input.val(), $attr = $input.attr("name"), "custom_type" == $attr || $(".elInput[name='" + $attr + "']").not($(this)).val($val)
    }), $(document).on("click", ".smsCheckArea", function() {
        return $(".smsExtras").is(":visible") ? ($(".smsCheck", this).prop("checked", !1), $(".smsExtras").hide(), $(".smsRecieveText", this).removeClass("smsRecieveTextActive")) : ($(".smsCheck", this).prop("checked", !0), $(".smsExtras").show(), $(".smsRecieveText", this).addClass("smsRecieveTextActive")), !1
    }), $(document).on("change", ".smsCountryCode", function() {
        $countryCode = $(this).val(), $(".mobileSMSPhoneInput").val($countryCode)
    }), $(document).on("click", ".elAffCopyPasteImage", function() {
        $html = $.trim($(".elAffiliateImageAsset", this).html()), $(this).find(" .elAffiliateCopyPopup").fadeIn(), $(this).find(" .elAffiliateCopyPopup").find("textarea").eq(0).val($html), $(this).find(" .elAffiliateCopyPopup").find("textarea").eq(0).select()
    }), $(document).on("click", ".elAffCopyPasteText", function() {
        $html = $.trim($(".elAffiliateTextAsset", this).html()), $(this).find(" .elAffiliateCopyPopup").fadeIn(), $(this).find(" .elAffiliateCopyPopup").find("textarea").eq(0).val($html), $(this).find(" .elAffiliateCopyPopup").find("textarea").eq(0).select()
    }), $(document).on("click", ".elAffiliateCopyPopup .closeAffiliateCopy", function(e) {
        $(this).parent().fadeOut(), e.stopPropagation()
    }), $(".elAffCopyPaste").each(function() {
        $customURL = $(this).attr("data-custom-url"), $customURL && ($affiliateID = $("body").attr("data-affiliate-id"), $affiliateParam = $("body").attr("data-affiliate-param"), $("a", this).each(function() {
            "cf_affiliate_id" == $affiliateParam ? $(this).attr("href", $customURL + "?" + $affiliateParam + "=" + $affiliateID + "&affiliate_id=" + $affiliateID) : $(this).attr("href", $customURL + "?" + $affiliateParam + "=" + $affiliateID)
        }))
    }), $(".elAffiliate[data-de-type='affiliate-link']").each(function() {
        $customURL = $(this).attr("data-custom-url"), $customURL && ($affiliateID = $("body").attr("data-affiliate-id"), $affiliateParam = $("body").attr("data-affiliate-param"), $(".elInput", this).val("cf_affiliate_id" == $affiliateParam ? $customURL + "?" + $affiliateParam + "=" + $affiliateID + "&affiliate_id=" + $affiliateID : $customURL + "?" + $affiliateParam + "=" + $affiliateID))
    }), $(document).on("click", ".surveyRadioOption", function() {
        $(this).closest(".surveyStep").find(".surveyRadioOption").removeClass("surveyStepSelectedAnswer"), $(this).addClass("surveyStepSelectedAnswer"), $("input", this).prop("checked", !0).promise().done(function() {
            $stepNumber = $(this).closest(".surveyStep").attr("data-survey-step"), $thisAnswer = $(this).next("span").text(), $thisAnswer = $thisAnswer.trim(), $surveyID = $(this).closest(".elSurvey").attr("id"), $surveyID = $surveyID.split("-"), $surveyID = $surveyID[1], $("#cfAR input[name='answer_" + $surveyID + "_" + $stepNumber + "']").val($thisAnswer), $(this).closest(".surveyStep").find(".surveyStepNextButton").is(":visible") || ($root = $(this).closest(".surveyStep"), $next = $root.next(), 0 == $next.length ? ($action = $root.closest(".elSurvey").attr("data-complete"), $ID = $root.closest(".elSurvey").attr("id"), _($action, $ID)) : ($root.hide(), $next.show(), $getprogress = $next.find(".surveyStepProgressCounter").attr("data-progress-width"), $(this).closest(".elSurvey").find(".surveyStepProgressCounter").css("width", $getprogress + "%")))
        })
    }), $(".elSurvey").each(function() {
        $action = $(this).attr("data-complete"), "hideshow" == $action && ($show = $(this).attr("data-show-ids"), $show && ($show = $show.split(","), $.each($show, function() {
            $("#" + this).hide()
        }))), $ID = $(this).attr("id"), $totalSurveySteps = 0, $(".surveyStep", this).each(function() {
            $totalSurveySteps += 1, $(this).attr("data-survey-step", $totalSurveySteps)
        }).promise().done(function() {
            $("#" + $ID + " .surveyStep").each(function() {
                $stepNumber = $(this).attr("data-survey-step"), $surveyID = $(this).closest(".elSurvey").attr("id"), $surveyID && ($surveyID = $surveyID.split("-"), $surveyID = $surveyID[1]), $question = "question_" + $surveyID + "_" + $stepNumber, $questionTitle = $(".surveyStepHeadline", this).text(), $questionTitle = $questionTitle.trim(), $("#cfAR").append("<input id='" + $question + "' name='" + $question + "' data-cf-form-field='" + $question + "' data-param='" + $question + "' value='" + $questionTitle + "' data-storage='false' >"), $answer = "answer_" + $surveyID + "_" + $stepNumber, $("#cfAR").append("<input id='" + $answer + "' name='" + $answer + "' data-cf-form-field='" + $answer + "' data-param='" + $answer + "' placeholder='" + $answer + "' data-storage='false' >"), $progress = $stepNumber / $totalSurveySteps * 100, $(".surveyStepProgressCounter", this).attr("data-progress-width", $progress)
            }).promise().done(function() {
                $getprogress = $("#" + $ID + " .surveyStep .surveyStepProgressCounter").first().attr("data-progress-width"), $(".surveyStepProgressCounter").css("width", $getprogress + "%")
            })
        })
    }), $(document).on("click", ".surveyStepNextButton a", function() {
        return $answerSelected = "NA", $(this).closest(".surveyStep").find(".surveyRadioOption").each(function() {
            $(this).hasClass("surveyStepSelectedAnswer") && ($answerSelected = "FOUND")
        }).promise().done(function() {
            "FOUND" == $answerSelected ? ($root = $(this).closest(".surveyStep"), $next = $root.next(), 0 == $next.length ? ($action = $root.closest(".elSurvey").attr("data-complete"), $ID = $root.closest(".elSurvey").attr("id"), _($action, $ID)) : ($root.hide(), $next.show(), $getprogress = $next.find(".surveyStepProgressCounter").attr("data-progress-width"), $(this).closest(".elSurvey").find(".surveyStepProgressCounter").css("width", $getprogress + "%"))) : ($(this).closest(".surveyStep").find(".surveyRadioOption").addClass("noanswer"), $this = $(this), setTimeout(function() {
                $this.closest(".surveyStep").find(".surveyRadioOption").removeClass("noanswer")
            }, 800))
        }), !1
    }), $(".elCustomJS_code").each(function() {
        $getJS = $(this).attr("data-custom-js"), $(this).html($getJS)
    }), $carContestProgress = $(".affCarContestProgressBar").attr("data-progress"), $(".affCarContestProgressBar .affCarContestCar img").delay(500).velocity({
        left: Math.max($carContestProgress - 12, 0) + "%"
    }, 500), $(".affCarContestProgressBar .affCarContestNumbersInner").delay(500).velocity({
        left: Math.max($carContestProgress - 12, 0) + "%"
    }, 500), $(".affCarContestProgressBar .affCarContestInnerBar").delay(500).velocity({
        width: $carContestProgress + "%"
    }, 500), $(".elAffiliateFunnelLinkBuilder").each(function() {
        $elem = $(this), $link1 = $elem.attr("data-link1-name"), "undefined" == typeof $link1 || 0 !== $link1.length && ($link1url = $elem.attr("data-link1-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link1url,
            text: $link1
        }))), $link2 = $elem.attr("data-link2-name"), "undefined" == typeof $link2 || 0 !== $link2.length && ($link2url = $elem.attr("data-link2-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link2url,
            text: $link2
        }))), $link3 = $elem.attr("data-link3-name"), "undefined" == typeof $link3 || 0 !== $link3.length && ($link3url = $elem.attr("data-link3-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link3url,
            text: $link3
        }))), $link4 = $elem.attr("data-link4-name"), "undefined" == typeof $link4 || 0 !== $link4.length && ($link4url = $elem.attr("data-link4-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link4url,
            text: $link4
        }))), $link5 = $elem.attr("data-link5-name"), "undefined" == typeof $link5 || 0 !== $link5.length && ($link5url = $elem.attr("data-link5-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link5url,
            text: $link5
        }))), $link6 = $elem.attr("data-link6-name"), "undefined" == typeof $link6 || 0 !== $link6.length && ($link6url = $elem.attr("data-link6-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link6url,
            text: $link6
        }))), $link7 = $elem.attr("data-link7-name"), "undefined" == typeof $link7 || 0 !== $link7.length && ($link7url = $elem.attr("data-link7-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link7url,
            text: $link7
        }))), $link8 = $elem.attr("data-link8-name"), "undefined" == typeof $link8 || 0 !== $link8.length && ($link8url = $elem.attr("data-link8-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link8url,
            text: $link8
        }))), $link9 = $elem.attr("data-link9-name"), "undefined" == typeof $link9 || 0 !== $link9.length && ($link9url = $elem.attr("data-link9-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link9url,
            text: $link9
        }))), $link10 = $elem.attr("data-link10-name"), "undefined" == typeof $link10 || 0 !== $link10.length && ($link10url = $elem.attr("data-link10-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link10url,
            text: $link10
        }))), $link11 = $elem.attr("data-link11-name"), "undefined" == typeof $link11 || 0 !== $link11.length && ($link11url = $elem.attr("data-link11-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link11url,
            text: $link11
        }))), $link12 = $elem.attr("data-link12-name"), "undefined" == typeof $link12 || 0 !== $link12.length && ($link12url = $elem.attr("data-link12-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link12url,
            text: $link12
        }))), $link13 = $elem.attr("data-link13-name"), "undefined" == typeof $link13 || 0 !== $link13.length && ($link13url = $elem.attr("data-link13-url"), $(".affLinkBuilderCustomLinks", this).append($("<option>", {
            value: $link13url,
            text: $link13
        })))
    }), $(".affiliateLinkAffSubID1").garlic("destroy"), $(".affiliateLinkAffSubID2").garlic("destroy"), $(".affLinkBuilderCustomLinks").garlic("destroy"), $(".affiliateLinkAffOutput").garlic("destroy"), $(".affLinkPopups").garlic("destroy"), $(".affLinkAutoplay").garlic("destroy"), $(document).on("change", ".affLinkBuilderCustomLinks", function() {
        $value = $(this).val(), $position = $("option[value='" + $value + "']", this).index(), $getElementID = $(this).closest(".elAffiliateFunnelLinkBuilder").attr("id"), 1 == $position ? y($getElementID, "true") : y($getElementID)
    }), $(document).on("keyup", ".affiliateLinkAffSubID1", function() {
        $getElementID = $(this).closest(".elAffiliateFunnelLinkBuilder").attr("id"), y($getElementID)
    }), $(document).on("keyup", ".affiliateLinkAffSubID2", function() {
        $getElementID = $(this).closest(".elAffiliateFunnelLinkBuilder").attr("id"), y($getElementID)
    }), $(document).on("change", ".affLinkPopups", function() {
        $getElementID = $(this).closest(".elAffiliateFunnelLinkBuilder").attr("id"), y($getElementID)
    }), $(document).on("change", ".affLinkAutoplay", function() {
        $getElementID = $(this).closest(".elAffiliateFunnelLinkBuilder").attr("id"), y($getElementID)
    }), $(".affLinkBuilderCustomLinks").garlic("destroy"), $(".affiliateLinkAffSubID1").garlic("destroy"), $(".affiliateLinkAffSubID2").garlic("destroy"), $(".affiliateLinkAffOutput").garlic("destroy"), $(".affLinkPopups").garlic("destroy"), $(".affLinkAutoplay").garlic("destroy"), $(".elOrderProductOptinProductName:not(:has(>div))").css("width", "inherit")
}), $(function() {
    $('.selectAW-date[data-cf-name="webinar-date"]').size() > 0 && webinarDelay()
}), $(function() {
    $(".elVideo iframe").each(function() {
        $(this).attr("src", $(this).attr("src"))
    })
});