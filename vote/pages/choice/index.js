const app = getApp()
var util = require('../../utils/util.js');  
Page({
  data: {
    lists:[ 
      { description:'' },
      { description:'' },
  ],
    final: true,
  },
  onLoad: function (option) {
    let time = util.formatTime(new Date()); 
    let timeNum=time.split(' '); 
    var timeData = timeNum[0];
    var timeMS = timeNum[1];
    let DataPicker = timeData.split('/');
    let Picker = parseInt(DataPicker[0])+1;
    DataPicker = timeData.replace(DataPicker[0], Picker);
    let timeM = timeMS.slice(0,5);
    console.log(DataPicker)
    this.setData({
      choice: option.choice,
      timeData: timeData,
      timeMS: timeMS,
      timeDataPicker: DataPicker,
      timeM: timeM,
    })
  },
  increase: function() {
    var arr = this.data.lists;
    var obj = {
      description: ''
    }
    arr.push(obj)
    this.setData({
      lists: arr
    })
  },
  reduce: function(e) {
    var arr = this.data.lists;
    var index = e.currentTarget.dataset.index
    arr.splice(index,1)
    this.setData({
      lists: arr
    })
  },
  titInput: function(e){
    let that = this;
    let tit = e.detail.value;
    wx.setStorage({
      key:  "tit",
      data: tit,
    })
    that.setData({
      tit: tit,
    })
  },
  describeInput:  function(e){
    let that = this;
    let describe = e.detail.value;
    that.setData({
      describe: describe,
    })

  },
  optionsInput: function(e){
    console.log(e)
      
    var arr = this.data.lists
    var obj = arr[e.currentTarget.dataset.index]
    let a=/ [a - zA - z] +: \/\/\s*/ ;
    console.log(a.test(obj)+'regexp')
    obj.description = e.detail.value
    this.setData({
      lists:arr
    })
  },
  bindDateChange: function(e) {
    this.setData({
      timeDataPicker: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      timeM: e.detail.value
    })
  },
  optionsRequest: function() {
    var userId = wx.getStorageSync("user")
    wx.clearStorageSync()
    wx.request({
      url: 'https://zcy.s1.natapp.cc/wechat/selections',
      method: 'post',
      data: {
        id: userId,
        title: this.data.tit,
        description: this.data.describe,
        options: this.data.lists,
        end_at: `${this.data.timeDataPicker} ${this.data.timeM}`
      },
      success: function (res) {
        console.log(res.data)
        let formId = res.data.id
        wx.setStorageSync('formId', formId)
        console.log(formId)
      }
    })
    wx.navigateTo({
      url: "../options/index?choice=" + this.data.choice
    })
  },
})