//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    choiceHead: "choice-center",
    choiceHalf: "choice-center",
    choiceFull: "choice-center"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  choiceImgHd: function(){
    let that=this;
    that.setData({
      choiceHead: "choice-hover-img",
      choiceHalf: "choice-center",
      choiceFull: "choice-center"
    })
  },
  choiceImgHf: function(){
    let that=this;
    that.setData({
      choiceHalf: "choice-hover-img",
      choiceHead: "choice-center",
      choiceFull: "choice-center"
    })
  },
  choiceImgFl: function(){
    let that=this;
    that.setData({
      choiceFull: "choice-hover-img",
      choiceHalf: "choice-center",
      choiceHead: "choice-center"
    })
  },
  getUserInfo: function(e) {

  }
})
