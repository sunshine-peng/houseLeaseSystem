const app = getApp()

var openid = app.globalData.util.openid;
Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
  },
  doAuthorization: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })

  },
  getInfo() { //获取用户的信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // app.globalData.util.getUserInfo(app.globalData.util, app.globalData.openId).then((res) => {
    //   this.setData({
    //     userInfo: res.data.data,
    //     defaults: res.data.data.majorDTO
    //   })
    // }, () => {

    // })
  },

  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    // var that = this;
    // console.log("openid:", openid);
    // that.loadUserInfo();
  },
  onLoad: function(e) {
    this.getInfo()
  }
})