var status, app = getApp(), page = 1;

Page({
    data: {
        orderstatus: [ "一级", "二级", "三级" ],
        selindex: 0,
        Teamlist: []
    },
    onLoad: function(a) {
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), page = 1, wx.setNavigationBarTitle({
            title: "分销明细"
        }), this.setData({
            windowWidth: app.globalData.screenWidth
        });
    },
    click: function(a) {
        var t = a.currentTarget.dataset.index;
        page = 1, status = 0 == t ? "" : 3 == t ? 3 : parseInt(t) - 1, this.setData({
            selindex: t,
            Teamlist: []
        }), this.CommissionList(), this.CommissionCount();
    },
    onReady: function() {},
    onShow: function() {
        var a = app.globalData.sys.fenxiao.level;
        this.setData({
            level: a
        }), this.CommissionCount(), this.CommissionList(), 1 == app.globalData.sys.basic.seal ? wx.onUserCaptureScreen(function(a) {
            wx.setStorageSync("screen", !0), wx.navigateBack({
                delta: 2
            });
        }) : wx.setStorageSync("screen", !1);
    },
    CommissionCount: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/CommissionCount",
            method: "POST",
            data: {
                uid: app.globalData.user_id
            },
            success: function(a) {
                t.setData({
                    CommissionCount: a.data.data
                });
            }
        });
    },
    CommissionList: function() {
        var i = this.data.Teamlist, o = this, a = parseInt(o.data.selindex) + 1;
        app.util.request({
            url: "entry/wxapp/CommissionList",
            method: "POST",
            data: {
                uid: app.globalData.user_id,
                level: a,
                page: page
            },
            success: function(a) {
                var t = a.data.data;
                if (0 < t.length) {
                    for (var s in t) i.push(t[s]);
                    page++;
                }
                o.setData({
                    Teamlist: i
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.CommissionList();
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