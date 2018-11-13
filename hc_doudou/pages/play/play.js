var siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var a = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: a.basic.fontcolor,
            backgroundColor: a.basic.color
        }), wx.setNavigationBarTitle({
            title: a.basic.title
        });
        var e = siteinfo.siteroot + "?i=" + siteinfo.acid + "&c=entry&m=hc_doudou&do=games&game=2&orderId=" + o.orderId + "&userId=" + app.globalData.user_id;
        this.setData({
            url: e
        });
    },
    Test: function(o) {
        var a = JSON.parse(o.detail.data);
        this.order(a);
    },
    order: function(o) {
        console.log("orderdata", o), app.util.request({
            url: "entry/wxapp/Result",
            method: "POST",
            data: {
                uid: o.openid,
                orderid: o.orderId,
                result: o.results,
                level: o.level
            },
            success: function(o) {
                console.log("order", o);
            },
            fail: function(o) {
                console.log("fail", o);
            }
        });
    },
    onShareAppMessage: function() {
        var o = app.globalData.sys;
        return {
            title: o.forward.title,
            imageUrl: o.forward.img,
            path: "hc_doudou/pages/login/login"
        };
    }
});