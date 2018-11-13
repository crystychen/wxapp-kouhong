var status, app = getApp(), page = 1;

Page({
    data: {
        orderstatus: [ "超级会员", "运营总监" ],
        selindex: 0
    },
    onLoad: function(a) {
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        });
        var e = app.globalData.sys.fenxiao.level;
        wx.setNavigationBarTitle({
            title: "升级代理"
        }), console.log("options.vip", a.vip), this.setData({
            windowWidth: app.globalData.screenWidth,
            level: e,
            vip: a.vip
        });
    },
    click: function(a) {
        var t = a.currentTarget.dataset.index;
        page = 1, status = 0 == t ? "" : 3 == t ? 3 : parseInt(t) - 1, this.setData({
            selindex: t,
            orders: []
        });
    },
    onReady: function() {},
    onShow: function() {
        1 == app.globalData.sys.basic.seal ? wx.onUserCaptureScreen(function(a) {
            wx.setStorageSync("screen", !0), wx.navigateBack({
                delta: 2
            });
        }) : wx.setStorageSync("screen", !1), this.Upgrade();
    },
    Upgrade: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Upgrade",
            method: "POST",
            success: function(a) {
                console.log("Upgrade", a), t.setData({
                    Upgrade: a.data.data
                });
            }
        });
    },
    pay: function(a) {
        var t = a.currentTarget.dataset.uplevel + 2, e = this;
        app.util.request({
            url: "entry/wxapp/Uplevel",
            method: "POST",
            data: {
                level: t,
                uid: app.globalData.user_id
            },
            success: function(a) {
                e.setData({
                    payData: a.data.data
                }), e.gopay(a.data.data);
            }
        });
    },
    gopay: function(a) {
        console.log("selindex", this.data.selindex);
        wx.requestPayment({
            timeStamp: "" + a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.sign,
            success: function(a) {
                console.log("支付完成"), wx.redirectTo({
                    url: "../my"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "支付取消"
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = app.globalData.sys, t = app.globalData.user_id;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + t
        };
    }
});