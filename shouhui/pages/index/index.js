//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    choiceHead: "choice-hover-img",
    choiceHalf: "choice-center",
    choiceFull: "choice-center",
    choiceSayHeadLeft: "choice-hover-true-say",
    choiceSayHeadRight: "choice-hover-false-say",
    CheckFirst: "check-hover-false-say",
    CheckSecond:  "check-hover-false-say",
    CheckThird: "choice-hover-true-say",
    CheckFourth: "choice-hover-true-say",
    choiceFirstBoolean: "choice-hover-false-say",
    choiceSecondBoolean: "choice-hover-true-say",
    choiceThirdBoolean: "choice-hover-true-say",
    choiceFourthBoolean:  "choice-hover-false-say",
    count: 5,
    choiceImg: {
      choiceHead: true,
      choiceHalf: false,
      choiceFull: false,
    },
    choiceShow: {
      choiceSayHeadLeft: true,
      choiceSayHeadRight: false,
      choiceSayFirstBoolean: false,
      choiceSaySecondBoolean: true,
      choiceSayThirdBoolean:  true,
      choiceSayFourthBoolean: false,
    },
    checkShow: {
      First: false,
      Second: false,
      Third:  true,
      Fourth: true,
    },
    moneyChina: "¥",
    keepNumMoney: 10,
    numAccountMoney: -20,
    finalCountMoney: 39.9,
    population: 2,
    disabledNumMax: true,
    disabledNumMin: false,
    choiceLeftImg: "/images/defaultimg.png",
    choiceRightImg: "/images/confirmimg.png",
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
    let that = this;
    let choice = that.data.choiceImg;
    let choiceHd = choice.choiceHead;
    let choiceHf = choice.choiceHalf;
    let choiceFl = choice.choiceFull;
    console.log(choiceHd)
    console.log(that.data.choiceHead)
    if(choiceHd==false) {
      that.setData({
        choiceHead: "choice-hover-img",
        choiceHalf: "choice-center",
        choiceFull: "choice-center",
        choiceHd: true,
        choiceHf: false,
        choiceFl: false,
       })  
    } else {
       that.setData({
        choiceHead: "choice-center",
        choiceHd: false,
       })
    }

  },
  choiceImgHf: function(){
    let that = this;
    let choice = that.data.choiceImg;
    let choiceHd = choice.choiceHead;
    let choiceHf = choice.choiceHalf;
    let choiceFl = choice.choiceFull;
    if(choiceHf==false) {
      that.setData({
        choiceHalf: "choice-hover-img",
        choiceHead: "choice-center",
        choiceFull: "choice-center",
        choiceHd: false,
        choiceHf: true,
        choiceFl: false,
      })
    } else {
      that.setData({
       choiceHalf: "choice-center",
       choiceHf: false,
      })
   }
  },
  choiceImgFl: function(){
    let that = this;
    let choice = that.data.choiceImg;
    let choiceHd = choice.choiceHead;
    let choiceHf = choice.choiceHalf;
    let choiceFl = choice.choiceFull;
    if(choiceFl==false){
      that.setData({
        choiceFull: "choice-hover-img",
        choiceHalf: "choice-center",
        choiceHead: "choice-center",
        choiceHd: false,
        choiceHf: false,
        choiceFl: true,
    })
   }  else {
    that.setData({
     choiceFull: "choice-center",
     choiceFl: false,
    })
 }
  },
  countNum: function(e){
      let that = this;
      let peopleNum = e.detail.value;
      console.log(peopleNum)
      console.log(that.data.choiceHead)
      let disabledNum = (peopleNum < 2) ? false : true && (peopleNum > 5) ? false : true;
      if(disabledNum){
          that.setData({
          population: peopleNum,
        })
      } else {
        that.setData({
          population: 2,
        })       
        wx.showToast({
          title: "请输入值:2～5",
          icon: "none",
        })
      }
  },
  choiceMinus: function(){
      let that = this;
      let peopleNum = that.data.population;
      peopleNum--;
      let disabledNum = (peopleNum < 2) ? false : true;
      console.log(peopleNum)
      if(disabledNum){
        that.setData({
          population: peopleNum,
        })
      }
  },
  choiceCount: function(){
    let that = this;
    let peopleNum = that.data.population;
    peopleNum++;
    let disabledNum = (peopleNum > 5) ? false : true;
    console.log(peopleNum)
    if(disabledNum){
      that.setData({
        population: peopleNum,
      })
    }
},
choiceImgLeft: function(){
  let that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      that.setData({
        choiceLeftImg: res.tempFilePaths[0],
      })
    }
  })
},
choiceImgRight: function(){
  let that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 
      console.log(res.tempFilePaths);
      that.setData({
        choiceRightImg: res.tempFilePaths[0],
      })
    }
  })
},
choiceSayHeadLeft: function(){
  var that = this;
  var headLeft = "choiceShow.choiceSayHeadLeft";
  var countNum = that.data.count;
  if(that.data.choiceShow.choiceSayHeadLeft&&countNum<=5){
    countNum--;
    that.setData({
      choiceSayHeadLeft: "choice-hover-false-say",
      [headLeft]: false,
      count: countNum,
    }) 
  } else {
    if(countNum<5){
      countNum++;
      that.setData({
        choiceSayHeadLeft: "choice-hover-true-say",
        [headLeft]: true,
        count: countNum,
      }) 
    }
  }
},
choiceSayHeadRight: function(){
  var that = this;
  let countNum = that.data.count;
  var headRight = "choiceShow.choiceSayHeadRight";
  if(that.data.choiceShow.choiceSayHeadRight&&that.data.count<=5){
    countNum--;
    that.setData({
      choiceSayHeadRight: "choice-hover-false-say",
      [headRight]: false,
      count: countNum,
    }) 
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      choiceSayHeadRight: "choice-hover-true-say",
      [headRight]: true,
      count: countNum,
    }) 
  }
}
},
checkSayFirst: function() {
  var that = this;
  let countNum = that.data.count;
  if(that.data.checkShow.First&&that.data.count<=5){
    countNum--;
    that.setData({
      CheckFirst: "check-hover-false-say",
      "checkShow.First": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      CheckFirst: "choice-hover-true-say",
      "checkShow.First": true,
      count: countNum,
    })
  }
  }
},
checkSaySecond: function() {
  var that = this;
  let countNum = that.data.count;
  if(that.data.checkShow.Second&&that.data.count<=5){
    countNum--;
    that.setData({
      CheckSecond: "check-hover-false-say",
      "checkShow.Second": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      CheckSecond: "choice-hover-true-say",
      "checkShow.Second": true,
      count: countNum,
    })
  }
  }
},
checkSayThird: function() {
  var that = this;
  let countNum = that.data.count;
  if(that.data.checkShow.Third&&that.data.count<=5){
    countNum--;
    that.setData({
      CheckThird: "check-hover-false-say",
      "checkShow.Third": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      CheckThird: "choice-hover-true-say",
      "checkShow.Third": true,
      count: countNum,
    })
  }
  }
},
checkSayFourth: function() {
  var that = this;
  let countNum = that.data.count;
  if(that.data.checkShow.Fourth&&that.data.count<=5){
    countNum--;
    that.setData({
      CheckFourth: "check-hover-false-say",
      "checkShow.Fourth": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      CheckFourth: "choice-hover-true-say",
      "checkShow.Fourth": true,
      count: countNum,
    })
  }
  }
},
choiceSayFirstBoolean: function(){
  let that = this;
  let countNum = that.data.count;
  if(that.data.choiceShow.choiceSayFirstBoolean&&that.data.count<=5) {
    countNum--;
    that.setData({
      choiceFirstBoolean: "choice-hover-false-say",
      choiceSecondBoolean:  "choice-hover-true-say",
      "choiceShow.choiceSayFirstBoolean": false,
      "choiceShow.choiceSaySecondBoolean": true,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      choiceFirstBoolean: "choice-hover-true-say",
      choiceSecondBoolean:  "choice-hover-false-say",
      "choiceShow.choiceSayFirstBoolean": true,
      "choiceShow.choiceSaySecondBoolean": false,
      count: countNum,
    })
  }   
}
},
choiceSaySecondBoolean: function(){
  let that = this;
  let countNum = that.data.count;
  if(that.data.choiceShow.choiceSaySecondBoolean&&that.data.count<=5) {
     countNum--;
    that.setData({
      choiceFirstBoolean: "choice-hover-true-say",
      choiceSecondBoolean:  "choice-hover-false-say",
      "choiceShow.choiceSayFirstBoolean": true,
      "choiceShow.choiceSaySecondBoolean": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      choiceFirstBoolean: "choice-hover-false-say",
      choiceSecondBoolean:  "choice-hover-true-say",
      "choiceShow.choiceSayFirstBoolean": false,
      "choiceShow.choiceSaySecondBoolean": true,
      count: countNum,
    })
  }
  }   
},
choiceSayThirdBoolean: function(){
  let that = this;
  let countNum = that.data.count;
  if(that.data.choiceShow.choiceThirdBoolean&&that.data.count<=5) {
    countNum--;
    that.setData({
      choiceThirdBoolean: "choice-hover-false-say",
      choiceFourthBoolean:  "choice-hover-true-say",
      "choiceShow.choiceThirdBoolean": false,
      "choiceShow.choiceFourthBoolean": true,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      choiceThirdBoolean: "choice-hover-true-say",
      choiceFourthBoolean:  "choice-hover-false-say",
      "choiceShow.choiceThirdBoolean": true,
      "choiceShow.choiceFourthBoolean": false,
      count: countNum,
    })
  }
  }   
},
choiceSayFourthBoolean: function(){
  let that = this;
  let countNum = that.data.count;
  if(that.data.choiceShow.choiceFourthBoolean&&that.data.count<=5) {
    countNum--;
    that.setData({
      choiceThirdBoolean: "choice-hover-true-say",
      choiceFourthBoolean:  "choice-hover-false-say",
      "choiceShow.choiceThirdBoolean": true,
      "choiceShow.choiceFourthBoolean": false,
      count: countNum,
    })
  } else {
    if(countNum<5){
    countNum++;
    that.setData({
      choiceThirdBoolean: "choice-hover-false-say",
      choiceFourthBoolean:  "choice-hover-true-say",
      "choiceShow.choiceThirdBoolean": false,
      "choiceShow.choiceFourthBoolean": true,
      count: countNum,
    })
  }
  }   
  console.log(countNum)
},
finalCountMoney:  function(){
  wx.requestPayment({
    'timeStamp': '',
    'nonceStr': '',
    'package': '',
    'signType': 'MD5',
    'paySign': '',
    'success':function(res){
    },
    'fail':function(res){
    }
 })
},
  getUserInfo: function(e) {

  }
})
