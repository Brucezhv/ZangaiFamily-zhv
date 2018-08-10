//index.js
//获取应用实例
const app = getApp()
var choiceOne = true;
var choiceTwo = false;
var choiceParentChild = false;
var choicePeople = false;
var  choiceDouble = false;
var all='1';
Page({
  data: {
    choiceOneFocus: "choice-true-page",
    choiceTwoFocus: "choice-false-page",
    choiceParentChildFocus: "choice-false-page",
    choicePeopleFocus: "choice-false-page",
    choiceDoubleFocus: "choice-false-page",
    GoodsList: "pageFirstList",
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this; 
           
    wx.request({
      url: "https://sh.gongfudou.com/Api/Goods/slideShow", 
      method: "POST",
      data: {
        index: '' ,
        img: ''
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          slideShow: res.data.data, 
        })
      }
    })
    wx.request({
      url: "https://sh.gongfudou.com/Api/Goods/recommendGoodsList", 
      method: "POST",
      data: {
          tabType: all
      }
      ,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          pageFirstList: res.data.data.content.shopList, 
          pageFirstTabType: res.data.data.tabType,
          pageFirstListSpreadContent: res.data.data.content.spreadContent,
        })
      }
    })
  },
  oneChoice: function(e){
    let that = this;
    let choiceFocus = "choice-true-page";
    let choiceUnfocus = "choice-false-page";
    all = '1';
    that.setData({
        choiceOneFocus: choiceFocus,
        choiceTwoFocus: choiceUnfocus,
        choiceParentChildFocus: choiceUnfocus,
        choicePeopleFocus: choiceUnfocus,
        choiceDoubleFocus: choiceUnfocus,
    })
  },
  twoChoice: function(e){
    let that = this;
    let choiceFocus = "choice-true-page";
    let choiceUnfocus = "choice-false-page";
    all = '2';
    that.setData({
        choiceOneFocus: choiceUnfocus,
        choiceTwoFocus: choiceFocus,
        choiceParentChildFocus: choiceUnfocus,
        choicePeopleFocus: choiceUnfocus,
        choiceDoubleFocus: choiceUnfocus,
      })

  },
  parentChildChoice: function(e){
    let that = this;
    let choiceFocus = "choice-true-page";
    let choiceUnfocus = "choice-false-page";
    all = '3';
    that.setData({
        choiceOneFocus: choiceUnfocus,
        choiceTwoFocus: choiceUnfocus,
        choiceParentChildFocus: choiceFocus,
        choicePeopleFocus: choiceUnfocus,
        choiceDoubleFocus: choiceUnfocus,
      })
  },
  peopleChoice: function(e){
    let that = this;
    let choiceFocus = "choice-true-page";
    let choiceUnfocus = "choice-false-page";
    all = '4';
    that.setData({
        choiceOneFocus: choiceUnfocus,
        choiceTwoFocus: choiceUnfocus,
        choiceParentChildFocus: choiceUnfocus,
        choicePeopleFocus: choiceFocus,
        choiceDoubleFocus: choiceUnfocus,
      })
  },
  doubleChoice: function(e){
    let that = this;
    let choiceFocus = "choice-true-page";
    let choiceUnfocus = "choice-false-page";
    all = '5';
    that.setData({
        choiceOneFocus: choiceUnfocus,
        choiceTwoFocus: choiceUnfocus,
        choiceParentChildFocus: choiceUnfocus,
        choicePeopleFocus: choiceUnfocus,
        choiceDoubleFocus: choiceFocus,
      })
  },
  all: function(e){
    let that = this;
    wx.request({
      url: "https://sh.gongfudou.com/Api/Goods/recommendGoodsList",
      method: "POST",
      data: {
        tabType: all
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          pageFirstList: res.data.data.content.shopList,
          pageFirstTabType: res.data.data.tabType,
          pageFirstListSpreadContent: res.data.data.content.spreadContent,
        })
      }
    })
  },
  getUserInfo: function(e) {

  }
})
