const app = getApp();
Page({
  data: {

  },
  onLoad: function(option) {
    console.log(option)
    let inputValue=app.globalData.inputValue;
    let check=app.globalData.time[option.check];
    let timeD=app.globalData.timeD;
    let time=timeD[0]+"年"+timeD[1]+"月"+timeD[2]+"日";
    console.log(app.globalData)
    this.setData({
      check: app.globalData.time[option.check],
      inputValue: inputValue,
    })
    let con=inputValue.length*15+98;
    console.log(con)
    var context = wx.createCanvasContext("checkCanvas");
    context.drawImage("../images/post.png",0,0,346,433);
    context.drawImage("../images/nameshadow.png",20,50,con,30);
    context.drawImage("../images/code.png",279,379,52,54);
    context.setFontSize(15);
    context.setFillStyle("#DF4D98");
    context.fillText(inputValue,110,72);
    context.setFontSize(40);
    context.setFillStyle("#FDFDFD");
    context.fillText(check.check,15,186);
    context.fillText(check.reslove.slice(0,6),15,290);
    if(check.reslove.length>6){

      context.fillText(check.reslove.slice(6,12),15,330);
    }
    context.setFillStyle("#5DDDF2");
    context.setFontSize(12);
    context.fillText(time,15,393);
    context.save();
    context.draw();
  },
  nav:  function(){
    console.log(app.globalData)

    wx.navigateTo({
      url: '../index/index'
    })
  },
  save: function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 346,
      height: 433,
      destWidth: 346,
      destHeight: 433,
      canvasId: 'checkCanvas',
      success: function(res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
              console.log("保存成功")
              wx.showToast({
                title: '图片保存成功',
                icon: 'success',
                duration: 2000
              })
          }
      })
      } 
    })
  }
})