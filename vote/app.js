//app.js
var userId;
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          wx.request({
            url: 'https://zcy.s1.natapp.cc/wechat/sessions',
            method: 'POST',
            data: {
              code: res.code
            },

          success: function (res) {
              console.log(res.data)
              userId = res.data.openid;
              wx.setStorageSync("user",userId)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },
  globalData: {
    userInfo: null
  }
})