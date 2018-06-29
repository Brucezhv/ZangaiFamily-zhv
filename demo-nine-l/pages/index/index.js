//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    pageimg: "/images/pic3.jpg",
    animationData: {},
    touch: {
      distance: 0,
      scale: 1,
      scaleWidth: 0,
      scaleHeight: 0,
      left: 0,
      top: 0,
      angle: 0
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
    // 单手指缩放开始，也不做任何处理
    if (e.touches.length == 1) return
    console.log('双手指触发开始')
    // 注意touchstartCallback 真正代码的开始
    // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug
    // 当两根手指放上去的时候，就将distance 初始化。
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    console.log(distance)
    let angle = Math.atan(yMove / xMove) * 180 / Math.PI
    console.log(angle)
    this.setData({
      'touch.distance': distance,
      'touch.angle': angle
    })
  },

touchmoveCallback: function (e) {
  let that = this
  let touch = that.data.touch
  // 单手指缩放我们不做任何操作
  if (e.touches.length == 1) return
  console.log('双手指运动')
  try{
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      console.log(distance)
      let angle = Math.atan(yMove / xMove) * 180 / Math.PI
      angle=Math.abs(touch.angle-angle)
      console.log(angle)

      let newScale = distance/touch.distance*touch.scale
      this.setData({
        'touch.distance': distance,
        'touch.angle': angle
      }) 
      if (newScale*touch.scaleWidth>=4320||newScale*touch.scaleHeight>=4320) {
        return;
      } else if (newScale*touch.scaleWidth<=750||newScale*touch.scaleHeight<=750) {
        return;
      }
      console.log(newScale)
      console.log(angle)
      that.animation.rotate(angle).scale(newScale).step()
      that.setData({
        'touch.scale': newScale,
        animationData: that.animation.export()
      })
  } catch(e){
    console.log(e)
  }
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
