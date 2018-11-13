var page, app = getApp();

Page({
    data: {
        order: []
    },
    onLoad: function(a) {
        page = 1;
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), wx.setNavigationBarTitle({
            title: t.basic.title
        });
    },
    onShow: function() {
        this.order();
    },
    order: function() {
        var r = this, e = this.data.order;
        app.util.request({
            url: "entry/wxapp/Order",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                page: page
            },
            success: function(a) {
                var t = a.data.data;
                if (0 < t.length) {
                    for (var o in t) e.push(t[o]);
                    page++;
                }
                console.log(e), r.setData({
                    order: e
                });
            }
        });
    },
    copy: function(a) {
        var t = a.currentTarget.dataset.copy;
        wx.setClipboardData({
            data: t,
            success: function(a) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    onReachBottom: function() {
        this.order();
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