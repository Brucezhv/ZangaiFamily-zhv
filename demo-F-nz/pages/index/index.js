//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dogimg: '/images/gfd_index_dogHead.png',
    showDogFoot: 1
  }, 
  bindKeyInput: function (e) {
    let that = this
    if(e.detail.cursor==0){
      
    }
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
})
