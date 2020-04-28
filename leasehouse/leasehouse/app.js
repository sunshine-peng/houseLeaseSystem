//app.js
const util = require('./utils/util.js')
const appid = 'wx40e8c2fedf786ebc'
const appsceret = '2f4245a9b873c9d6e1407d5b0cf15e2f'
App({
  globalData: {
    userInfo: null, // 用户微信信息
    hasRegister: false, //是否注册
    openid: "",
    session_key: '',
    myInfo: null, //读取用户注册的信息
    util ,//工具函数,
    orderInfo:[]

  },
  onLaunch: function() {
    // 展示本地存储能力
    var user = wx.getStorageSync("user") || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',

            data: {
              appid: appid,
              secret: appsceret,
              js_code: res.code,
              grant_type: 'authorization_code',

            },
            method: "GET",
            success: res => {
              //  console.log( res)
              var objusInfo = {}
              this.globalData.openid = res.data.openid
              objusInfo.openid = res.data.openid
              this.globalData.session_key = res.data.session_key
              objusInfo.sessionkey = res.data.session_key
              wx.setStorageSync('userInfo', objusInfo)

              this.globalData.util.getUserInfo(util, this.globalData.openid)
                .then(res => { //已经注册
                  console.log('已经注册')
                  this.globalData.hasRegister = true
                  this.globalData.myInfo = res.data
                  console.log('res.data.dat66a')
                  console.log(res)
                  if (res.data.state == 0) {
                    wx.showModal({
                      title: '提示',
                      content: '你已被拉黑，请联系管理员处理',
                      confirmColor: '#000080',
                      success: res => {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/service/service'
                          })
                        } else if (res.cancel) {
                          wx.showToast({

                            title: '拉黑状态将无法使用部分功能',
                            icon: "none",
                            duration: 2000
                  
                          })
                        }
                      }
                    }) 
                  }
                  console.log(res.data)
                  var user = {}
                  user.user_name = res.data.nickname
                  user.user_tel = res.data.tel
                  this.globalData.util.getOrderInfo(user)
                    .then(res => {
                      console.log('res.dat66666a.data')
                      console.log(res)
                      this.globalData.orderInfo=res
                      res.forEach(item =>{
                        if(item.lease_money==null){
                          wx.showModal({
                            title: '提示',
                            content: '您有未支付的新订单，请前往支付',
                            confirmColor: '#000080',
                            success: res => {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '/pages/userOrder/userOrder',
                                })
                              } else if (res.cancel) {
                                wx.showToast({
                                  title: '请及时支付',
                                  duration: 2000
                                })
                              }
                            }
                          })
                        }
                      })
                    },
                    () => {

                    })

                }, () => {

                  wx.showModal({
                    title: '提示',
                    content: '请完善个人信息',
                    success: res => {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/myInfo/myInfo',
                        })
                      } else if (res.cancel) {
                        wx.showToast({
                          title: '信息不完整不能使用某些功能',
                          icon: "none",
                          duration: 2000
                        })
                      }
                    }
                  })
                })
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              var obju = {}
              obju.username = res.userInfo.nickName;
              obju.gender = res.userInfo.gender
              this.globalData.userInfo = res.userInfo
              obju.avatarUrl = res.userInfo.avatarUrl
              wx.setStorageSync('user', obju)

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
  }

})