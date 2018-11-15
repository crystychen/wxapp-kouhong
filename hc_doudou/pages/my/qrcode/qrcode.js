var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, app = getApp();

Page({
    data: {
        showexample: !1,
        getdanmoney: !0
    },
    onLoad: function(o) {
        var t = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: t.basic.fontcolor,
            backgroundColor: t.basic.color
        }), wx.setNavigationBarTitle({
            title: "提现"
        }), "" != o.code && this.setData({
            logo: o.code,
            showexample: !0
        });
    },
    chooseImg: function() {
        var t = this;
        wx.chooseImage({
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o), t.setData({
                    logo: o.tempFilePaths,
                    showexample: !0
                });
            }
        });
    },
    delpic: function() {
        this.setData({
            logo: void 0,
            showexample: !1
        });
    },
    upImg: function() {
        this.data.dan_idss;
        var o = this.data.logo;
        if (console.log(void 0 === o ? "undefined" : _typeof(o)), wx.showToast({
            title: "上传中..."
        }), null == o) return wx.showToast({
            title: "请选择照片"
        }), !1;
        if ("string" == typeof o) return this.cash(), !1;
        var a = this;
        wx.uploadFile({
            url: app.util.url("entry/wxapp/Uploadimg"),
            filePath: o[0],
            name: "image",
            formData: {
                m: "hc_doudou"
            },
            success: function(o) {
                wx.hideLoading(), console.log("上传图片", o);
                var t = o.data;
                t = JSON.parse(t), a.Uploadmoneycode(t.data);
            }
        });
    },
    Uploadmoneycode: function(o) {
        var t = app.globalData.user_id, a = this;
        app.util.request({
            url: "entry/wxapp/Uploadmoneycode",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                moneycode: o
            },
            success: function(o) {
                wx.showToast({
                    title: o.data.message
                }), a.cash();
            }
        });
    },
    cash: function() {
        app.util.request({
            url: "entry/wxapp/cash",
            method: "post",
            dataType: "json",
            data: {
                uid: app.globalData.user_id
            },
            success: function(o) {
                console.log("cash", o), wx.showToast({
                    title: o.data.message,
                    icon: "none"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "../my"
                    });
                }, 1e3);
            }
        });
    }
});