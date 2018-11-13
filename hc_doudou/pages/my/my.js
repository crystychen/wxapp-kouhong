var orderId, noauthorAdd, app = getApp();

Page({
    data: {
        shadow: !0,
        getmoney: !0
    },
    onLoad: function(a) {
        var t = app.globalData.screenHeight, e = app.globalData.screenWidth, s = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: s.basic.fontcolor,
            backgroundColor: s.basic.color
        }), wx.setNavigationBarTitle({
            title: s.basic.title
        });
        var o = wx.getStorageSync("user");
        this.setData({
            user: o,
            sys: s,
            screenWidth: e,
            Lwidth: e / 4,
            screenHeight: t
        });
    },
    onShow: function() {
        Promise.all([ this.sys(), this.Mymoney(), this.Myrouge(), this.Canmoney() ]).then(function(a) {});
    },
    getaddress: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                null == a.authSetting["scope.address"] ? t.getAddress() : a.authSetting["scope.address"] ? t.getAddress() : t.setData({
                    shadow: !1
                });
            }
        });
    },
    sys: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/sys",
            method: "POST",
            success: function(a) {
                console.log(a.data.data);
                var t = a.data.data;
                e.setData({
                    sys: t
                });
            }
        });
    },
    getmoney: function() {
        this.setData({
            getmoney: !1
        });
        var t = this;
        app.util.request({
            url: "entry/wxapp/Cash",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                wx.showModal({
                    title: "温馨提示",
                    content: a.data.message,
                    showCancel: !1
                }), t.Canmoney();
            }
        }), setTimeout(function() {
            t.setData({
                getmoney: !0
            });
        }, 3e3);
    },
    getAddress: function() {
        var o = this;
        wx.chooseAddress({
            success: function(a) {
                var t = a.provinceName + "," + a.cityName + "," + a.countyName + a.detailInfo, e = a.telNumber, s = a.userName;
                o.setData({
                    address: t,
                    telphone: e,
                    userName: s
                }), o.submitaddress(t, e, s);
            }
        });
    },
    order: function() {
        wx.navigateTo({
            url: "order/order"
        });
    },
    detail: function() {
        wx.navigateTo({
            url: "distribution/distribution"
        });
    },
    vip: function(a) {
        var t = a.currentTarget.dataset.level;
        wx.navigateTo({
            url: "distribution/detail?vip=" + t
        });
    },
    cash: function() {
        wx.navigateTo({
            url: "cash/cash"
        });
    },
    Qrcode: function() {
        wx.navigateTo({
            url: "share"
        });
    },
    group: function() {
        wx.navigateTo({
            url: "group/group"
        });
    },
    index: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    Myrouge: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Myrouge",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.setData({
                    Myrouge: a.data.data
                });
            }
        });
    },
    Canmoney: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Canmoney",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.setData({
                    fenxiaomoney: a.data.data.money,
                    level: a.data.data.level,
                    levelno: a.data.data.levelno
                });
            }
        });
    },
    Mymoney: function() {
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
    close: function() {
        this.setData({
            shadow: !0
        });
    },
    submitaddress: function(a, t, e) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Address",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                username: e,
                mobile: t,
                address: a
            },
            success: function(a) {
                wx.showToast({
                    title: "地址获取成功"
                }), s.setData({
                    Allmoney: a.data.data
                });
            }
        });
    },
    share: function() {
        wx.navigateTo({
            url: "share/share"
        });
    },
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