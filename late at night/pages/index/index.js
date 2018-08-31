//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');  
Page({
  data: {
    department:[
      {
        "content": "恋爱科"
      },
      {
        "content": "家庭科"
      },
      {
        "content": "工作科"
      },
      {
        "content": "交际科"
      },
      {
        "content": "学习科"
      },
      {
        "content": "敬请期待"
      }
    ],
    choiceDepartment: 4,
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let time = util.formatTime(new Date()); 
    let timeT=time.split(" ");
    let timeMS = timeT[1];
    let timeD=timeT[0].split("/");
    console.log(timeD)
    let timeM = timeMS.slice(0,2)+timeMS.slice(3,5).toString();
    app.globalData.timeD=timeD;
    timeM = " 0600"
    this.setData({
      timeM: timeM,
    })
  },
  onShow: function(){
    app.globalData.time=""
  },
  bindKeyInput: function(e) {
    let that=this;
    let inputValue="  "+e.detail.value;
    that.setData({
      inputValue: inputValue
    })
  },
  gameStart:  function(e) {
    let that=this;
    console.log(e);
    let choiceDepartment=e.target.dataset.choice;
    that.setData({
      choiceDepartment: choiceDepartment,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.time=""
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  toast: function(){
    let that=this;
    that.setData({
      x: false,
    })
  },
  gameCome: function(){
    let that=this;
    let timeM = that.data.timeM;
    let inputValue = that.data.inputValue;
    app.globalData.inputValue=inputValue;
    app.globalData.choiceDepartment=that.data.choiceDepartment;
    if(timeM>=1600||timeM<=700){
      if(inputValue!=undefined){
        wx.navigateTo({
          url: "../game/index",
        })
      } else {
       that.setData({
         x: true,
       })
      }
    } else {
      wx.navigateTo({
        url: "../rest/index",
      })
    }
  }
})
