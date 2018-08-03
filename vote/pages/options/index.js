const app = getApp()

Page({
    data:{
        choice: 1,
    },
    onLoad: function() {
      let formId = wx.getStorageSync('formId')
      wx.request({
        url: 'https://zcy.s1.natapp.cc/wechat/selections/?formId='+formId,
        method: 'get',
        success: function (res) {
          console.log(res.data)
          let data = res.data;
          let title=data.title;
          let description= data.description;
          let endAt=data.end_at;
          let options = data.wechat_options;
          wx.setStorageSync("title",title);
          wx.setStorageSync("description",description);
          wx.setStorageSync("formId",formId);
          wx.setStorageSync("endAt",endAt);
          wx.setStorageSync("options", options);
        }
      })
      let formtitle = wx.getStorageSync('title');
      let formDescription = wx.getStorageSync('description');
      let endAt = wx.getStorageSync('endAt')
      let options = wx.getStorageSync('options')
      let user = wx.getStorageSync("user");
      this.setData({
        title: formtitle,
        description: formDescription,
        user: user,
        endAt: endAt,
        options: options,
      })
    },
    showVote: function(){
        console.log('')
    },
    shareVote: function(res) {
        if (res.from === 'button') {
            console.log(res.target)
          }

        }
})