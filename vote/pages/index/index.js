//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  ChoiceStart: function(e){
    console.log(e)
    this.setData({
      choice: e.currentTarget.dataset.choice
    })
    wx.navigateTo({
      url: "../choice/index?choice="+this.data.choice
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var user = wx.getStorageSync("user")
    console.log(user)
    console.log(this.data.userInfo);
    wx.request({
      url: 'https://zcy.s1.natapp.cc/wechat/users/'+user,
      method: 'PUT',
      data: {
        avatar_url: this.data.userInfo.avatarUrl,
        nick_name: this.data.userInfo.nickName,
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    
  }
})
