var pid, video, videoPlay, videoPause, examine, noexamine, app = getApp();

Page({
    data: {
        videoPlay: !0,
        examine: !0,
        noexamine: !0
    },
    pass: function() {
        this.setData({
            videoPlay: !0
        }), wx.reLaunch({
            url: "../index/index"
        });
    },
    end: function() {
        this.setData({
            videoPlay: !0
        }), wx.reLaunch({
            url: "../index/index"
        });
    },
    onLoad: function(e) {
        console.log("options", e), e.pid && wx.setStorageSync("pid", e.pid), e.scene && wx.setStorageSync("pid", e.scene);
        var a = app.globalData.screenHeight, t = app.globalData.screenWidth;
        this.setData({
            screenWidth: t,
            screenHeight: a
        });
    },
    sys: function() {
        var t = this, i = this;
        app.util.request({
            url: "entry/wxapp/sys",
            method: "POST",
            success: function(e) {
                var a = e.data.data;
                wx.setNavigationBarColor({
                    frontColor: a.basic.fontcolor,
                    backgroundColor: a.basic.color
                }), wx.setNavigationBarTitle({
                    title: a.basic.title
                }), app.globalData.sys = a, noexamine = 0 == a.stake ? !(examine = !1) : !(examine = !0), 
                0 == a.basic.video_status ? (t.videoContext = wx.createVideoContext("myVideo"), 
                t.videoContext.play(), videoPlay = !1) : wx.reLaunch({
                    url: "../index/index"
                }), i.setData({
                    sys: a,
                    examine: examine,
                    noexamine: noexamine,
                    videoPlay: videoPlay
                });
            }
        });
    },
    Checkgoods: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Checkgoods",
            method: "POST",
            success: function(e) {
                a.setData({
                    goodss: e.data.data
                });
            }
        });
    },
    details: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?id=" + a
        });
    },
    onShow: function() {
        Promise.all([ this.sys(), this.Checkgoods() ]).then(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this.data.sys;
        return {
            title: e.forward.title,
            imageUrl: e.forward.img,
            path: "hc_doudou/pages/login/login"
        };
    }
});