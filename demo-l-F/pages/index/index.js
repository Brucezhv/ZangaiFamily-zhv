//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ee: "Bones",
    qq: "So very long",
    cc: "Pay the Man",
    vv: "What you mean"
  },

  add: function(){
    this.setData({
      qq: "ll",
      vv: "ll",
    })
  },

  aa: function () {
    var that = this
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
    //将对象转为string
    var queryBean = JSON.stringify(that.data.queryList[index])
    wx.navigateTo({
    url: "/pages/aa/aa?path=cc&path=vv"
    
  })}

  ,  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
