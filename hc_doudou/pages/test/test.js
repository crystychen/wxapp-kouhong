var width, height, Path, app = getApp();

Page({
    data: {},
    onLoad: function() {
        var t = this;
        wx.authorize({
            scope: "scope.writePhotosAlbum"
        });
        var o = app.globalData.sys;
        wx.setNavigationBarColor({
            frontColor: o.basic.fontcolor,
            backgroundColor: o.basic.color
        }), wx.setNavigationBarTitle({
            title: "生成海报"
        }), wx.showToast({
            title: "加载图片..."
        }), console.log("bgimg", o.fenxiao.bgimg), wx.getImageInfo({
            src: o.fenxiao.bgimg,
            success: function(o) {
                wx.hideToast(), console.log("download", o.path), wx.setStorageSync("logoBg", o.path), 
                t.drawImg();
            },
            fail: function(o) {
                console.log(o), wx.showToast({
                    title: "加载失败"
                });
            }
        }), wx.getSystemInfo({
            success: function(o) {
                width = o.windowWidth, height = o.windowHeight, t.setData({
                    width: o.windowWidth,
                    height: o.windowHeight
                });
            }
        });
    },
    drawImg: function() {
        var o = wx.createCanvasContext("firstCanvas");
        Path = wx.getStorageSync("logoBg"), o.save(), o.drawImage(Path, 0, 0, width, height), 
        o.restore(), o.save(), o.translate(-100, -100), o.drawImage("../../resource/images/scan.jpg", width / 2, height / 2, 200, 200), 
        o.restore(), o.draw();
    },
    down: function() {
        console.log("保存图片"), wx.canvasToTempFilePath({
            canvasId: "firstCanvas",
            success: function(o) {
                console.log("保存生成的二维码", o);
                var t = o.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(o) {
                        console.log("保存成功"), wx.showToast({
                            icon: "success",
                            title: "保存成功"
                        });
                    },
                    fail: function(o) {
                        console.log("保存失败", o);
                    }
                });
            },
            fail: function(o) {
                console.log(o);
            }
        });
    },
    onShareAppMessage: function() {}
});