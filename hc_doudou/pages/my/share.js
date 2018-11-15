var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var a = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: a.basic.fontcolor,
            backgroundColor: a.basic.color
        }), wx.setNavigationBarTitle({
            title: "生成海报"
        });
    },
    download: function(o) {
        var a = o.currentTarget.dataset.src, t = [];
        t.push(a), wx.previewImage({
            urls: t,
            current: t[0]
        }), wx.showToast({
            title: "下载中...",
            icon: "none"
        }), wx.downloadFile({
            url: a,
            success: function(o) {
                wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        wx.hideToast(), console.log("Qrcode", o), wx.showToast({
                            icon: "success",
                            title: "保存成功"
                        });
                    }
                });
            }
        });
    },
    onShow: function() {
        var o = app.globalData.user_id, a = this;
        app.util.request({
            url: "entry/wxapp/Qrcode",
            method: "post",
            dataType: "json",
            data: {
                uid: o
            },
            success: function(o) {
                wx.showToast({
                    title: "点击预览，长按保存到手机",
                    icon: "none"
                }), a.setData({
                    src: o.data.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var o = app.globalData.sys, a = app.globalData.user_id;
        return {
            title: o.forward.title,
            imageUrl: o.forward.img,
            path: "hc_doudou/pages/login/login?pid=" + a
        };
    }
});