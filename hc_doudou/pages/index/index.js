var videoPlay, videoPause, videoContext, closevoice, closeV, video, WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        login: !1,
        shadow: !0,
        pay: !0,
        notice: !0,
        nomoney: !0,
        balance: !0,
        level: !0,
        videoPlay: !0,
        videoPause: !0
    },
    onLoad: function(a) {
        var t = app.globalData.screenHeight, e = app.globalData.screenWidth;
        this.setData({
            system: app.globalData.system,
            screenWidth: e,
            screenHeight: t
        });
    },
    Jine: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Jine",
            method: "POST",
            success: function(a) {
                t.setData({
                    sysmoney: a.data.data
                });
            }
        });
    },
    goods: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/goods",
            method: "POST",
            success: function(a) {
                t.setData({
                    goods: a.data.data
                });
            }
        });
    },
    onShow: function() {
        Promise.all([ this.check(), this.Jine(), this.goods() ]).then(function(a) {});
        var a = app.globalData.sys, t = a.basic.explain;
        WxParse.wxParse("article", "html", t, this, 5), wx.setNavigationBarColor({
            frontColor: a.basic.fontcolor,
            backgroundColor: a.basic.color
        }), wx.setNavigationBarTitle({
            title: a.basic.title
        }), closeV = wx.getStorageSync("closevoice"), this.audioCtx = wx.createAudioContext("myAudio"), 
        closeV && (this.audioCtx.setSrc(a.basic.bgm), this.audioCtx.play()), this.setData({
            sys: a,
            closeV: closeV
        });
    },
    closevoice: function(a) {
        var t = a.currentTarget.dataset.voice;
        closeV ? (closeV = !1, this.audioCtx.setSrc(t), wx.setStorageSync("closevoice", !1), 
        this.audioCtx.pause()) : (closeV = !0, this.audioCtx.setSrc(t), this.audioCtx.play(), 
        wx.setStorageSync("closevoice", !0)), this.setData({
            closeV: closeV
        });
    },
    goplay: function(a) {
        app.util.request({
            url: "entry/wxapp/Play",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                gid: a
            },
            success: function(a) {
                console.log("asdas", a), wx.navigateTo({
                    url: "../play/play?orderId=" + a.data.data.trade_no
                });
            }
        });
    },
    detail: function(a) {
        var t = this.data.system;
        if (1 == app.globalData.sys.pay.ios && "And" != t) return wx.showToast({
            title: "IOS暂不能体验，请耐心等待",
            icon: "none"
        }), !1;
        var e, o, s = a.currentTarget.dataset.need, n = a.currentTarget.dataset.id;
        s <= parseInt(this.data.Allmoney) ? (this.goplay(n), o = e = !0) : o = e = !1, this.setData({
            shadow: o,
            balance: e
        });
    },
    goMoney: function() {
        this.setData({
            balance: !0,
            pay: !1
        });
    },
    level: function() {
        this.setData({
            shadow: !1,
            level: !1,
            balance: !0
        });
    },
    closeLevel: function() {
        this.setData({
            shadow: !0,
            level: !0
        });
    },
    notice: function() {
        this.setData({
            shadow: !1,
            notice: !1
        });
    },
    closePay: function() {
        this.setData({
            shadow: !0,
            pay: !0,
            notice: !0
        });
    },
    onUnload: function() {
        this.audioCtx.pause();
    },
    check: function() {
        var t = this;
        wx.checkSession({
            success: function(a) {
                if (!wx.getStorageSync("user")) return console.log("go"), !1;
                console.log("未过期"), t.register();
            },
            fail: function(a) {
                console.log("已过期"), t.setData({
                    login: !1
                });
            }
        });
    },
    buy: function(a) {
        var t = this, e = a.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Recharge",
            method: "POST",
            data: {
                money: e,
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.pay(a.data.data);
            }
        });
    },
    pay: function(a) {
        wx.requestPayment({
            timeStamp: "" + a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.sign,
            success: function(a) {
                wx.redirectTo({
                    url: "../get/get"
                });
            },
            fail: function(a) {}
        });
    },
    getUserInfo: function(t) {
        this.setData({
            disabled: !0
        });
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && e.login(t);
            }
        }), setTimeout(function() {
            e.setData({
                disabled: !1
            });
        }, 2e3);
    },
    play: function() {
        wx.navigateTo({
            url: "../try/try"
        });
    },
    my: function() {
        wx.reLaunch({
            url: "../my/my"
        });
    },
    login: function(e) {
        var o = this;
        wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t, app.util.request({
                    url: "entry/wxapp/Getopenid",
                    method: "post",
                    dataType: "json",
                    data: {
                        code: a.code
                    },
                    success: function(a) {
                        0 == a.data.errno && (t.session_key = a.data.data.session_key, t.openid = a.data.data.openid, 
                        app.globalData.userInfo = t, wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        o.register());
                    }
                });
            },
            fail: function(a) {}
        });
    },
    register: function(a) {
        var t = this, e = (t.data.selfuid, t.data.selflevel, t.data.wechat, t.data.getreward, 
        wx.getStorageSync("user").detail), o = e.session_key, s = e.openid, n = e.iv, i = e.encryptedData;
        app.util.request({
            url: "entry/wxapp/Getuserinfo",
            method: "post",
            dataType: "json",
            data: {
                session_key: o,
                encryptedData: i,
                iv: n,
                openid: s
            },
            success: function(a) {
                app.globalData.user_id = a.data.data, Promise.all([ t.Mymoney(a.data.data), t.Bindnexus(a.data.data) ]).then(function(a) {}), 
                t.setData({
                    login: !0
                });
            }
        });
    },
    Bindnexus: function(a) {
        var t = wx.getStorageSync("pid");
        console.log("绑定分销关系", t);
        t && app.util.request({
            url: "entry/wxapp/Bindnexus",
            method: "POST",
            data: {
                uid: a,
                pid: t
            },
            success: function(a) {
                console.log("绑定分销关系");
            }
        });
    },
    Mymoney: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Mymoney",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.setData({
                    Allmoney: a.data.data
                });
            }
        });
    },
    onShareAppMessage: function() {
        var a = app.globalData.sys, t = app.globalData.user_id;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + t
        };
    }
});