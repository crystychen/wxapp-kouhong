var orderId, noauthorAdd, _Checkmoneycode, app = getApp();

Page({
    data: {
        shadow: !0,
        getmoney: !0,
        change: !0
    },
    onLoad: function(a) {
        var e = app.globalData.screenHeight, t = app.globalData.screenWidth, o = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: o.basic.fontcolor,
            backgroundColor: o.basic.color
        }), wx.setNavigationBarTitle({
            title: o.basic.title
        });
        var s = wx.getStorageSync("user");
        this.setData({
            user: s,
            sys: o,
            screenWidth: t,
            Lwidth: t / 4,
            screenHeight: e
        });
    },
    onShow: function() {
        Promise.all([ this.sys(), this.Mymoney(), this.Myrouge(), this.Checkmoneycode(), this.Canmoney() ]).then(function(a) {});
    },
    Checkmoneycode: function() {
        app.util.request({
            url: "entry/wxapp/Checkmoneycode",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                console.log("res", a), _Checkmoneycode = a.data.data;
            }
        });
    },
    getaddress: function() {
        var e = this;
        wx.getSetting({
            success: function(a) {
                null == a.authSetting["scope.address"] ? e.getAddress() : a.authSetting["scope.address"] ? e.getAddress() : e.setData({
                    shadow: !1
                });
            }
        });
    },
    sys: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/sys",
            method: "POST",
            success: function(a) {
                app.globalData.sys = a.data.data;
                var e = a.data.data;
                t.setData({
                    sys: e
                });
            }
        });
    },
    getmoney: function() {
        this.setData({
            getmoney: !1
        });
        var e = this;
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
                }), e.Canmoney();
            }
        }), setTimeout(function() {
            e.setData({
                getmoney: !0
            });
        }, 3e3);
    },
    changecash: function() {
        var e = this;
        if (0 == parseFloat(this.data.fenxiaomoney)) return wx.showToast({
            title: "余额不足"
        }), !1;
        wx.showModal({
            title: "温馨提示",
            content: "推广收益转进余额可以继续游戏，但不能直接提现。",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/Yuetomoney",
                    method: "POST",
                    data: {
                        uid: app.globalData.user_id
                    },
                    success: function(a) {
                        console.log("转余额success", a.data.message), wx.showToast({
                            title: a.data.message,
                            icon: "none"
                        }), setTimeout(function() {
                            Promise.all([ e.Mymoney(), e.Canmoney() ]).then(function(a) {});
                        }, 1e3);
                    },
                    fail: function(a) {
                        console.log("转余额fail", a);
                    }
                });
            }
        });
    },
    getAddress: function() {
        var s = this;
        wx.chooseAddress({
            success: function(a) {
                var e = a.provinceName + "," + a.cityName + "," + a.countyName + a.detailInfo, t = a.telNumber, o = a.userName;
                s.setData({
                    address: e,
                    telphone: t,
                    userName: o
                }), s.submitaddress(e, t, o);
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
        var e = a.currentTarget.dataset.level;
        wx.navigateTo({
            url: "distribution/detail?vip=" + e
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
    qrcode: function() {
        wx.navigateTo({
            url: "qrcode/qrcode?code=" + _Checkmoneycode
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
        var e = this;
        app.util.request({
            url: "entry/wxapp/Myrouge",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                e.setData({
                    Myrouge: a.data.data
                });
            }
        });
    },
    Canmoney: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Canmoney",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                e.setData({
                    fenxiaomoney: a.data.data.money,
                    level: a.data.data.level,
                    levelno: a.data.data.levelno
                });
            }
        });
    },
    Mymoney: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Mymoney",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                e.setData({
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
    submitaddress: function(a, e, t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Address",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                username: t,
                mobile: e,
                address: a
            },
            success: function(a) {
                wx.showToast({
                    title: "地址获取成功"
                }), o.setData({
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
    onShareAppMessage: function() {
        var a = app.globalData.sys, e = app.globalData.user_id;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + e
        };
    }
});