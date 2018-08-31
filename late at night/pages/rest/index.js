const app = getApp();
Page({
    data: {
    
    },
    imgload:  function(e){
        let that=this;
        console.log(e)
        let imgwidth=e.detail.width;
        let imgheight=e.detail.height;
        let rate=imgwidth/imgheight;
        let width=450;
        let top = -(width/rate/2);
        console.log(top)
        that.setData({
            width: width,
            top: top,
        })
    }
})