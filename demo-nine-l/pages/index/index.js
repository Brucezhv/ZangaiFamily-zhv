//index.js
//获取应用实例
const app = getApp();
var canOnePointMove = false;
var startxMove;
var startyMove;
var startDistance;
var startAngle;
var finishxMove = 0;
var finishyMove = 0;
var translateFx;
var translateFy;
var finishAngle;
var finishScale=1;
var count = 0;
Page({
  data: {
    pageimg: "/images/pic3.jpg",
    animationData: {},
    touch: {
      scaleWidth: 0,
      scaleHeight: 0,
      left: 0,
      top: 0,
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
touchstartCallback: function (e) {
  let xMove;
  let yMove;
if (e.touches.length == 1) {
  console.log("lllstart")
  xMove = e.touches[0].clientX;
  yMove = e.touches[0].clientY;
  console.log('startxMove',xMove)
  console.log('startyMove',yMove)
  console.log("lllfinsh")
  startxMove = xMove;
  startyMove = yMove;
  canOnePointMove =  true;   
} else  {
      xMove = e.touches[1].clientX - e.touches[0].clientX;
      yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      console.log("startdistance",distance)
      let angle = Math.atan(yMove / xMove) * 180 / Math.PI
      console.log('startAngle',angle)
      startDistance = distance;
      startAngle = angle;
  }
},
touchmoveCallback: function (e) {
  let that = this;
  let touch = that.data.touch;
  let xMove;
  let yMove;
  let translateX;
  let translateY;
  if (e.touches.length == 1&&canOnePointMove) {
    console.log("kkkstart")
    xMove = e.touches[0].clientX;
    yMove = e.touches[0].clientY;
    translateX = xMove - startxMove;
    translateY = yMove - startyMove;
    if (count>0){
      translateX = translateX + finishxMove;
      translateY =  translateY + finishyMove;
    }
    console.log('transx',translateX)
    console.log('transy',translateY)
    translateFx = translateX;
    translateFy = translateY;
    console.log("kkkfinish")
    that.animation.translate(translateX,translateY).step();
  } else {
    try{
      xMove = e.touches[1].clientX - e.touches[0].clientX;
      yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      console.log('finishDistance',distance)
      let newScale = distance/startDistance*finishScale
      finishScale = newScale;
      let angle = Math.atan(yMove / xMove) * 180 / Math.PI;
      angle=Math.abs(touch.angle-angle);
      finishAngle = angle;
      if (newScale*touch.scaleWidth>=4320||newScale*touch.scaleHeight>=4320) {
        return;
      } else if (newScale*touch.scaleWidth<=375||newScale*touch.scaleHeight<=375) {
        return;
      }
      console.log('Scale',newScale)
      console.log('finishAngle',angle)
      that.animation.scale(finishScale).step()
    } catch(e){
      console.log(e)
    }
  }

  that.setData({
    animationData: that.animation.export()
  })
},
touchendll: function(e){
  let that = this
  count++;
  canOnePointMove = false;
  finishxMove = translateFx;
  finishyMove = translateFy;
},
choosePic: function (e) {
  let that = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      that.setData({
        pageimg: res.tempFilePaths[0]
      })
    }
  })
  },
  imgload: function(e) {
    let width = e.detail.width;
    let height = e.detail.height;
    let str = width/height;
    let left;
    let top;
    if(str > 1) {
      height = 750;  
      width = 750*str;
      left = (750 - width) / 2
      top = 0
    } else{
      width = 750;
      height=750/str;
      left=0;
      top=(750-height)/2
    }
    this.animation = wx.createAnimation({
      duration: 0
    })
    this.setData({
      "touch.scaleHeight": height,
      "touch.scaleWidth": width,
      'touch.left': left,
      'touch.top': top
    })    
    console.log(this.data.touch.left)
    console.log(this.data.touch.top)
  },
  savaPic: function () {
    this.drawCanvas(0)
  },
  count: function(imgWidth,imgHeight,boxWidth,boxHeight){
    return { 
          width: imgWidth,
          height: imgHeight,
          left: (750-imgWidth)/2,
          top: (750-imgHeight)/2
    }
  },
  drawCanvas: function (indexdata){
    if (indexdata >= 9) {
      return
    }
    let that = this
    let touch = that.data.touch
    let imgSize = this.count(touch.scaleWidth* touch.scale, touch.scaleHeight * touch.scale, 750, 750)
    let ctx = wx.createCanvasContext("canvas-cut")
    console.log(that.data.imgPath)
    ctx.drawImage(that.data.pageimg, imgSize.left,imgSize.top,imgSize.width,imgSize.height)
    let startx = (indexdata % 3) * 250
    let starty = indexdata > 2 && indexdata <= 5 ? 250 : indexdata > 5 ? 500 : 0
    ctx.draw(false, function (e) {
      console.log('draw callback')
      wx.canvasToTempFilePath({
        x: startx,
        y: starty,
        width: 250,
        height: 250,
        canvasId: 'canvas-cut',
        success(res) {
          console.log(res)
          var tempFilePaths1 = res.tempFilePath
          indexdata += 1
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
          that.drawCanvas(indexdata)
          
        },
      })

    })
    
},

  getUserInfo: function(e) {
    
  }
})
