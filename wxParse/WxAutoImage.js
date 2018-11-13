function wxAutoImageCal(e, t) {
    var i = 0, g = 0, a = 0, n = {};
    return wx.getSystemInfo({
        success: function(o) {
            console.dir(o), i = o.windowWidth, o.windowHeight, console.log("windowWidth" + i), 
            i < e ? (g = i, console.log("autoWidth" + g), a = g * t / e, console.log("autoHeight" + a), 
            n.imageWidth = g, n.imageheight = a) : (n.imageWidth = e, n.imageheight = t);
        }
    }), n;
}

module.exports = {
    wxAutoImageCal: wxAutoImageCal
};