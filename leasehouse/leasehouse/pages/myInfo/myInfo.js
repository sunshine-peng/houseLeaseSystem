const app = getApp()

var openid = app.globalData.util.openid;
Page({
  data: {
    dates: '2016-11-08',
    inputShowed: true,
    hasRegister: null,
    fromInfo: "",
    items: [{
        gender: 1,
        value: '男',
        checked: 'true'
      },
      {
        gender: 0,
        value: '女'
      },

    ],
    birthday: null,
    gender: 1,
    state: 1,
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
  //性别单选框
  radioChange: function(e) {

    this.setData({
      gender: e.detail.value
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
  //表单提交功能
  myInfoSubmit: function(e) {

    var myInfo = e.detail.value
    myInfo.birthday = this.data.dates
    myInfo.state = this.data.state
    myInfo.openid = app.globalData.openid
    myInfo.gender = this.data.gender
    if (!/^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/.test(myInfo.nickname)) {
      wx.showToast({
        title: '请输入正确的名字',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (myInfo.nickname.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证电话
    if (myInfo.tel.length == 0) {
      wx.showToast({
        title: '电话号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(myInfo.tel)) {
      wx.showToast({
        title: '请输入正确格式的电话号码',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // wx.showLoading({
    //   title: '上传中',
    //   mask: true
    // })
    const _this = this

    if (!app.globalData.hasRegister) {
      wx.request({
        method: 'post',
        url: app.globalData.util.BASE_URL + '/users/register',
        data: myInfo,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: res => {
          console.log('res.data')
          console.log(res.data)
          if (res.data.success) {
            wx.hideLoading()
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000,
              success() {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/mine/mine'
                  })
                }, 1000)
              }
            })


          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
    } else {
      wx.request({
        method: 'post',
        url: app.globalData.util.BASE_URL + '/users/updateInfo',
        data: myInfo,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: res => {
          console.log('res.data')
          console.log(res.data)
          if (res.data.success) {
            wx.hideLoading()
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success() {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/mine/mine'
                  })
                }, 1000)
              }
            })


          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
    }

  },
  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  onShow: function() {
    // var that = this;
    // console.log("openid:", openid);
    // that.loadUserInfo();
  },
  onLoad: function(e) {
    this.getInfo()
    this.setData({
      hasRegister: app.globalData.hasRegister
    })
  }
})