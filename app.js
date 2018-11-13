var util = require("we7/resource/js/util.js");

App({
    onLaunch: function(e) {
        var n = this;
        wx.getSystemInfo({
            success: function(e) {
                n.globalData.system = e.system.slice(0, 3), n.globalData.screenWidth = e.screenWidth, 
                n.globalData.screenHeight = e.screenHeight;
            }
        }), wx.setStorageSync("closevoice", !0);
        var o = wx.getUpdateManager();
        o.onCheckForUpdate(function(e) {
            console.log(e.hasUpdate);
        }), o.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                showCancel: !1,
                success: function(e) {
                    e.confirm && o.applyUpdate();
                }
            });
        }), o.onUpdateFailed(function() {});
    },
    onShow: function(e) {},
    onHide: function() {},
    onError: function(e) {
        console.log(e);
    },
    util: util,
    userInfo: {
        sessionid: null
    },
    globalData: {},
    siteInfo: require("siteinfo.js")
});