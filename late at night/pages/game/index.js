const app = getApp();
var time=[];
Page({
    data: {
        show: [
            {
                content: "您好"
            },
            {
                content: "请您描述下您的病症"
            }
        ],
        bol: true,
    },
    onLoad: function(){
        let choiceDepartment = app.globalData.choiceDepartment;
        let inputValue=app.globalData.inputValue;
        let userInfo = app.globalData.userInfo;
        // choiceDepartment=2;
        let choice = app.globalData.choice[choiceDepartment];
        // inputValue="dlwjd";
        this.setData({
            choiceDepartment: choiceDepartment,
            inputValue: inputValue,
            userInfo: userInfo,
            choice: choice,
        })
    },
    onShow: function(){
        time=[];
    },
    gameChoice: function(){
        let that=this;
        that.setData({
            bol: false,
        })
    },
    choiceOn: function(){
        let that=this;
        that.setData({
            bol: true,
        })
    },
    choiceClick: function(e){
        let that=this;
        let num= e.currentTarget.dataset.choice;
        let choice = that.data.choice.choiceId[num];
        // time.push({"num": num,"content": content});
        time.push(choice);
        app.globalData.time=time;
        that.setData({
            choiceContent: time,
        })
    },
    checkResult:  function(e){
        console.log(e)
        wx.navigateTo({
            url: '../check/index?check='+e.currentTarget.dataset.check,
        })
    }
})