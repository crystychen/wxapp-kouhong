var siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = siteinfo.siteroot + "?i=" + siteinfo.acid + "&c=entry&m=hc_doudou&do=games&game=1";
        this.setData({
            url: o
        });
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), wx.setNavigationBarTitle({
            title: t.basic.title
        });
    },
    Test: function(a) {
        a.detail.data;
        console.log(a);
    },
    onShareAppMessage: function() {
        var a = app.globalData.sys;
        return {
            title: a.forward.title,
            imageUrl: a.forward.img,
            path: "hc_doudou/pages/login/login"
        };
    }
});