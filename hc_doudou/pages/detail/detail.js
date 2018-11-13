var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = app.globalData.screenHeight, e = app.globalData.screenWidth, i = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: i.basic.fontcolor,
            backgroundColor: i.basic.color
        }), wx.setNavigationBarTitle({
            title: i.basic.title
        }), this.setData({
            screenHeight: t,
            screenWidth: e
        }), this.detail(a.id);
    },
    detail: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Checkgoods_detail",
            method: "POST",
            data: {
                gid: a
            },
            success: function(a) {
                t.setData({
                    detail: a.data.data
                });
            }
        });
    }
});