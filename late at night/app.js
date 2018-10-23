//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    choice: [
      {
        id: "恋爱科",
        choiceId: [
          {
            content: "想脱单",
            check: "白日妄想症",
            reslove: "钱",
          },
          {
            content: "喜欢的人不喜欢我",
            check: "低姿态者",
            reslove: "别勉强",
          },
          {
            content: "劈腿",
            check: "渣人恐惧症",
            reslove: "留着过年?",
          },
          {
            content: "异地恋",
            check: "最艰难的维系",
            reslove: "勇气与信任",
          },
          {
            content: "越来越敷衍",
            check: "漠不关心",
            reslove: "结束才是拥有了一切",
          },
          {
            content: "可怕的控制欲",
            check: "求放过",
            reslove: "不要在乎对方多过自己",
          }
        ]
      },
      {
        id: "家庭科",
        choiceId: [
          {
            content: "争吵",
            check: "沟通不畅",
            reslove: "多点同理心",
          },
          {
            content: "重男轻女",
            check: "渴望被爱",
            reslove: "这不是你的错",
          },
          {
            content: "对自己期望过高",
            check: "清单式人生",
            reslove: "沟通再沟通",
          },
          {
            content: "想家",
            check: "异地漂泊",
            reslove: "常回家看看",
          },
          {
            content: "被忽视",
            check: "渴望被爱",
            reslove: "更要学会爱自己",
          }
        ]
      },
      {
        id: "工作科",
        choiceId: [
          {
            content: "找不到工作",
            check: "焦虑迷茫症",
            reslove: "一切都会有的",
          },
          {
            content: "同事无法交心",
            check: "过于在乎",
            reslove: "勿交浅言深",
          },
          {
            content: "前途渺茫不知何去何从",
            check: "孤独的时光",
            reslove: "不要安于现状",
          },
          {
            content: "不被重视",
            check: "不善于表现",
            reslove: "壮大自己",
          }
        ]
      },
      {
        id: "友谊科",
        choiceId: [
          {
            content: "三个人的友谊",
            check: "不被重视",
            reslove: "退一步海阔天空",
          },
          {
            content: "一个不说，一个不问",
            check: "死傲娇",
            reslove: "鲁迅和闰土也会疏远",
          },
          {
            content: "TA也是别人的朋友",
            check: "心酸",
            reslove: "同路者中寻找朋友",
          },
          {
            content: "从我闺蜜到我的一个同学",
            check: "遗憾",
            reslove: "聚散不由你我",
          },
          {
            content: "圈子的交集越来越小",
            check: "无能改变",
            reslove: "圈子不同别硬融",
          }
        ]
      },
      {
        id: "学习科",
        choiceId: [
          {
            content: "学不进去",
            check: "心神不定",
            reslove: "有计划的休息",
          },
          {
            content: "再怎么努力也没用",
            check: "得不到进步",
            reslove: "要找到合适的方法",
          },
          {
            content: "偏科",
            check: "没兴趣",
            reslove: "培养学习兴趣",
          }
        ]
      },
    ]
  }
})