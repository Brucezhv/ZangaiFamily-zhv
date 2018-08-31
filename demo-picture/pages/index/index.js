//index.js
//获取应用实例
const app = getApp()
var startOX;
var startOY;
var startTX;
var startTY;
var startDistance;
var startAngle;
var moveOX;
var moveOY;
var moveTX;
var moveTY;
var moveDistance;
var translateTop = 0;
var translatLeft = 0;
var scale=1;
var changeAngle=0;
Page({
  data: {
    imgDispose: "/pages/images/demo.png",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageImg: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    },
    animationImg: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  imgload: function(e) {
    let that = this;
    let width=e.detail.width;
    let height=e.detail.height;
    let ratio = width / height;
    let left;
    let top;
    if(ratio>1){
      width= 750*ratio;
      height=750;
      left = (750-width)/2;
      top = 0;
      console.log(ratio)
    } else {
      width = 750;
      height = 750/ratio;
      left = 0;
      top = (750-height)/2;
      console.log(ratio)
    }
    that.setData({
      "pageImg.width": width,
      "pageImg.height": height,
      "pageImg.left": left,
      "pageImg.top": top,
    }, function() {
      console.log("this is setData callback") 
    }),
    this.animation = wx.createAnimation({
      duration: 0
    })
  },
  disposeStart: function(e){
    console.log(e)
    let that = this;
    let touch = e.touches;
    if(touch.length==1){
      startOX= touch[0].clientX;
      startOY= touch[0].clientY;
      console.log(startOX+"startX")
      console.log(startOY+"startY")
    } else {
      startTX= touch[0].clientX-touch[1].clientX;
      startTY=touch[0].clientY-touch[1].clientY;
      startDistance = this.distance(startTX,startTY);
      console.log(startDistance);
      startAngle = this.angle(startTX,startTY);
      console.log(startAngle);
    }
  },
  disposeMove:  function(e){
    let that = this;
    let touch = e.touches;
    if(touch.length==1){
      moveOX=touch[0].clientX;
      moveOY=touch[0].clientY;
      let translateX = moveOX-startOX;
      let translateY = moveOY-startOY;
      console.log(translateX+"translateX");
      console.log(translateY+"translateY");
      translateTop = translateY+translateTop;
      translatLeft = translateX +translatLeft;
      console.log(translateTop+"translateTop");
      console.log(translatLeft+"translateLeft");
      that.animation.translate(translatLeft,translateTop).step();
    } else {
      moveTX=touch[0].clientX-touch[1].clientX;
      moveTY=touch[0].clientY-touch[1].clientY;
      moveDistance= this.distance(moveTX,moveTY);
      scale = moveDistance/startDistance*scale;
      console.log(scale)
      if (scale*that.data.pageImg.width>=4320||scale*that.data.pageImg.height>=4320) {
        console.log(4320)
        return;
      } else if (scale*that.data.pageImg.width<=375||scale*that.data.pageImg.height<=375) {
        console.log(375)
        return;
      }
      changeAngle = (this.angle(moveTY,moveTX)-startAngle+changeAngle)%365;
      console.log(changeAngle+"changeAngle")
      that.animation.skew(changeAngle).step();
      that.animation.scale(scale).step();
    }
    that.setData({
      animationImg: that.animation.export()
    })
  },
  distance: function(x,y){
    let distance=Math.sqrt(x*x+y*y);
    return distance;
  },
  angle: function(x,y){
    let angle=Math.atan2(y,x)* 180 / Math.PI;
    return  angle;
  },
  choosePic: function (e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imgDispose: res.tempFilePaths[0]
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
