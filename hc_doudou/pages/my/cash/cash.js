var app = getApp(), page = 1;

Page({
    data: {
        cashlist: []
    },
    onLoad: function(a) {
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), page = 1, wx.setNavigationBarTitle({
            title: "提现记录"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.cash(), 1 == app.globalData.sys.basic.seal ? wx.onUserCaptureScreen(function(a) {
            console.log("res", a), wx.setStorageSync("screen", !0), wx.navigateBack({
                delta: 2
            });
        }) : wx.setStorageSync("screen", !1);
    },
    cash: function() {
        var e = this, s = e.data.cashlist;
        app.util.request({
            url: "entry/wxapp/CashList",
            method: "POST",
            data: {
                page: page,
                uid: app.globalData.user_id
            },
            success: function(a) {
                console.log("cash", a);
                var t = a.data.data;
                if (0 < t.length) for (var o in page++, t) s.push(t[o]);
                e.setData({
                    cashlists: s
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.cash();
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