Page({
    data: {},
    scan: function(n) {
        wx.scanCode({
            success: function(n) {
                console.log("scan", n);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});